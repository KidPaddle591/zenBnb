fetch("zenbnb.json")
    .then(function(response){
        if (!response.ok){
            throw new Error ("Erreur : le fichier JSON n'a pas pu être chargé");
        }
        return response.json();
    })
    
    .then(function(data){
        let divLogement=document.getElementById("logementsLyon");
        for (let i =0; i<data.listings.length; i++){
            let logement=data.listings[i]
            console.log(logement.city)
            if (logement.city==="Lyon"){
                let title=document.createElement("h2");
                title.textContent=logement.title;
                divLogement.appendChild(title);
                let description=document.createElement("p");
                description.textContent="Description "+logement.description;
                divLogement.appendChild(description);
                let price_per_night=document.createElement("p");
                price_per_night.textContent="Prix par nuit: "+logement.price_per_night;
                divLogement.appendChild(price_per_night);
                let rating=document.createElement("p");
                rating.textContent="Note (sur10) : "+logement.rating;
                divLogement.appendChild(rating);
                let guest_capacity=document.createElement("p");
                guest_capacity.textContent="Capacité :"+logement.guest_capacity;
                divLogement.appendChild(guest_capacity);
                let image=document.createElement("img");
                image.src=logement.image;
                divLogement.appendChild(image);
            }
        }
    })