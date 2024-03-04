const ENDPOINT = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/";
const NUMTOPRINT = 10;

class restaurant {
    constructor(name = null, rating = null, cuisines = null, city = null, firstLine = null, postalCode = null) {
        this.name = name;
        this.rating = rating ;
        this.cuisines = cuisines;
        this.city = city;
        this.firstLine = firstLine;
        this.postalCode = postalCode;
    }
}

function getCleanPostalCode(postalCode){
    return postalCode.toUpperCase().replace(/[^0-9a-z]/gi, '');
}

function isValidPostCode(postalCode){
    regex1 = /[A-Z]{1}[0-9]{2}[A-Z]{2}/;
    regex2 = /[A-Z]{1}[0-9]{3}[A-Z]{2}/;
    regex3 = /[A-Z]{2}[0-9]{2}[A-Z]{2}/;
    regex4 = /[A-Z]{2}[0-9]{3}[A-Z]{2}/;
    regex5 = /[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{2}/;
    regex6 = /[A-Z]{2}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{2}/;

    if (regex1.test(postalCode) || regex2.test(postalCode) || regex3.test(postalCode) || regex4.test(postalCode) || regex5.test(postalCode) || regex6.test(postalCode)){
        return true;
    } else {
        return false;
    }
}

async function getData(postalCode) {
    let rests = [];

    try {
        // Fetch data from API endpoint
        const response = await fetch(ENDPOINT + encodeURIComponent(postalCode));
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Extract desired data in json form
        const data = await response.json();
        if (data.restaurants.length === 0){
            throw new Error(`There is no restaurant data for this post code.`);
        }
        for (const r of data.restaurants){
            let cui = [];
            for (const c of r.cuisines){
                cui.push(c.name);
            }
            const s = new restaurant(r.name, r.rating.starRating, cui, r.address.city, r.address.firstLine, r.address.postalCode);
            rests.push(s);
        }

        // Output first x number of resturants
        printLimit = Math.min(NUMTOPRINT, rests.length);
        if (rests.length < NUMTOPRINT){
            console.log(`There are only ${rests.length} restaurants in this area`)
        }
        for (let i = 0; i < printLimit; i ++){
            console.log(rests[i]);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function processInput() {
    readline.question('Enter a valid UK post code or type "exit" to quite: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
            readline.close();
        } else {
            postCode = getCleanPostalCode(input);
            if (isValidPostCode(postCode)) {
                await getData(postCode);
                await processInput();
            } else {
                console.error('Invalid input. Please try again.');
                await processInput();
            }
        }
    });
  }
  
processInput();