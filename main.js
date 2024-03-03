//const endPoint = "https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/";

function restaurant(name, rating, cuisines, city, firstLine, postalCode){
    this.name = name;
    this.rating = rating;
    this.cuisines = cuisines;
    this.city = city;
    this.firstLine = firstLine;
    this.postalCode = postalCode;
}

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

getData();