//const endPoint = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/";

function restaurant(name, rating, cuisines, city, firstLine, postalCode){
    this.name = name;
    this.rating = rating;
    this.cuisines = cuisines;
    this.city = city;
    this.firstLine = firstLine;
    this.postalCode = postalCode;
}

function cleanPostalCode(postalCode){
    console.log(postalCode);
    // Turn to upper case and remove non alphanumeric characters
    newPostalCode = postalCode.toUpperCase().replace(/[^0-9a-z]/gi, '');
    console.log(newPostalCode);
    //Matches length
    if (newPostalCode.length < 5 || newPostalCode > 7){return null;}
    // Matches UK postal code pattern
    regex1 = /[A-Z]{1,2}[0-9]{2,3}[A-Z]{2}/;
    regex2 = /[A-Z]{1,2}[0-9][A-Z][0-9][A-Z]{2}/;
    if (regex1.test(newPostalCode) || regex2.test(newPostalCode)){
        return newPostalCode;
    } else {
        return none;
    }
}

console.log(cleanPostalCode("EC4M7RF") === "EC4M7RF");
console.log(cleanPostalCode("EC4M7rf") === "EC4M7RF");
console.log(cleanPostalCode("EC4M 7RF") === "EC4M7RF");
console.log(cleanPostalCode("EC4M7RF~!@#$%^&*()-_+=[]{}|;:'\",.<>?/`") === "EC4M7RF");
console.log(cleanPostalCode("EC4M\n7RF") === "EC4M7RF");


async function getData() {
    let rests = [];

    try {
        const response = await fetch("https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF");
        
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        for (const r of data.restaurants){
            let cui = [];
            for (const c of r.cuisines){
                cui.push(c.name);
            }
            const s = new restaurant(r.name, r.rating.starRating, cui, r.address.city, r.address.firstLine, r.address.postalCode);
            rests.push(s);
        }

        console.log(rests);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//getData();