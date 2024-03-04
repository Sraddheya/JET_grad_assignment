const ENDPOINT = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/";
const NUMTOPRINT = 10;

// Class to store restaurant data as an object
class restaurant {
    constructor(name = null, rating = null, cuisines = null, city = null, firstLine = null, postCode = null) {
        this.name = name;
        this.rating = rating ;
        this.cuisines = cuisines;
        this.city = city;
        this.firstLine = firstLine;
        this.postCode = postCode;
    }
}

function getCleanPostCode(postCode){
    return postCode.toUpperCase().replace(/[^0-9a-z]/gi, '');
}

function isValidPostCode(postCode){
    // Valid UK postcode formats as regular expressions
    regex1 = /[A-Z]{1}[0-9]{2}[A-Z]{2}/;
    regex2 = /[A-Z]{1}[0-9]{3}[A-Z]{2}/;
    regex3 = /[A-Z]{2}[0-9]{2}[A-Z]{2}/;
    regex4 = /[A-Z]{2}[0-9]{3}[A-Z]{2}/;
    regex5 = /[A-Z]{1}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{2}/;
    regex6 = /[A-Z]{2}[0-9]{1}[A-Z]{1}[0-9]{1}[A-Z]{2}/;

    if (regex1.test(postCode) || regex2.test(postCode) || regex3.test(postCode) || regex4.test(postCode) || regex5.test(postCode) || regex6.test(postCode)){
        return true;
    } else {
        return false;
    }
}

async function getData(postalCode) {
    let restaurantData = [];

    try {
        // Fetch data from API endpoint
        const response = await fetch(ENDPOINT + encodeURIComponent(postalCode));
        if (!response.ok){
            throw new Error(`HTTP error status ${response.status}`);
        }
        
        // Extract desired data in json form
        const data = await response.json();
        if (data.restaurants.length === 0){
            throw new Error(`There is no restaurant data for this post code.`);
        }
        for (const r of data.restaurants){
            let cuisinesArray = [];
            for (const c of r.cuisines){
                cuisinesArray.push(c.name);
            }
            const restaurantObject = new restaurant(r.name, r.rating.starRating, cuisinesArray, r.address.city, r.address.firstLine, r.address.postalCode);
            restaurantData.push(restaurantObject);
        }

        // Output first x number of resturants
        printLimit = Math.min(NUMTOPRINT, restaurantData.length);
        if (restaurantData.length < NUMTOPRINT){
            console.log(`There are only ${restaurantData.length} restaurants in this area`);
        }
        for (let i = 0; i < printLimit; i ++){
            console.log(`\n---RESTAURANT ${i + 1}---`);
            console.log(`Name: ${restaurantData[i].name}`);
            console.log(`Rating: ${restaurantData[i].rating}`);
            console.log(`Cuisines: ${restaurantData[i].cuisines}`);
            console.log(`Address: ${restaurantData[i].firstLine}, ${restaurantData[i].city}, ${restaurantData[i].postCode}`);
        }
    } catch (error) {
        console.error('ERROR FETCHING DATA:', error);
    }
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

async function processInput() {
    console.log("\nINPUT REQUEST ------------------------------------------")
    readline.question('Enter a UK post code or type "exit" to quite: ', async (input) => {
        if (input.toLowerCase() === 'exit') {
            readline.close();
        } else {
            postCode = getCleanPostCode(input);
            if (isValidPostCode(postCode)) {
                await getData(postCode);
                await processInput();
            } else {
                console.error('ERROR GETTING POST CODE: Invalid UK post code. Please try again.');
                await processInput();
            }
        }
    });
  }
  
processInput();