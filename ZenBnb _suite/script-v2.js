// JSON
fetch("zenbnb.json")
    .then(function(response){
        if (!response.ok){
            throw new Error ("Erreur : le fichier JSON n'a pas pu être chargé");
        }
        return response.json();
    })
    
    .then(function(data){
        function afficher_logement(){
            let divLogement=document.getElementById("logements");
            for (let i =0; i<data.listings.length; i++){
                let logement=data.listings[i]
                let title=document.createElement("h2");
                title.textContent=logement.title;
                divLogement.appendChild(title);
                let description=document.createElement("p");
                description.textContent="Description "+logement.description;
                divLogement.appendChild(description);
                let city=document.createElement("p");
                city.textContent="Ville: "+logement.city;
                divLogement.appendChild(city);
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

//SCRIPT 
const form = document.querySelector('form');
form.addEventListener('submit', function(e) { /* on lance le script au click sur Submit */
    e.preventDefault(); /* On empeche la réactualisation de la page qui remettrait la variable liste à 0.*/

    const nom = document.getElementById("firstname").value.trim();
    const prenom = document.getElementById("lastname").value.trim();
    const adresse = document.getElementById("adress").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("phone").value.trim();
    const logement = document.getElementById("logement").value;
    const nombre_personnes = document.getElementById("nombre_personnes").value.trim();
    const arrival = document.getElementById("arrival").value;
    const departure = document.getElementById("departure").value;
    let services =[]
    if (document.getElementById("chauffeur").checked)services.push("Chauffeur");
    if (document.getElementById("breakfast").checked)services.push("Petit-Dejeuner");
    if (document.getElementById("guide").checked)services.push("Guide")
    let menus=[]
    if (document.getElementById("vegetarian").checked)menus.push("Vegetarian")
    if (document.getElementById("vegan").checked)menus.push("Vegan")
    
    if (logement.selectedIndex){
        document.getElementById('options_logement').classList.remove("hidden")
        const options_logement= document.getElementById("options_logement").value.trim();
    }


    //Zone de stockage des messages d'erreurs :
    const errors = []

    //Zone de stockage des messages d'erreurs :
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const phoneRegex = /^[0-9\s-/]{10,14}$/;

    //Verification des champs
    if (/\d/.test(adresse)==false) errors.push ("Merci d'indiquer votre numéro de voie")
    if (!emailRegex.test(email)) errors.push("format d'email invalide");
    if (!phoneRegex.test(telephone)) errors.push("format de téléphone invalide");
    console.log(errors);

    //Zone d'affichage
    const errorbox = document.getElementById("result");
    const summaryBox = document.getElementById("summary");

    if (errors.length>0){
        errorbox.innerHTML= errors.join('<br>')
        summaryBox.innerHTML="";
        return
    }else {
        errorbox.innerHTML=""
        summaryBox.innerHTML=`
        <h2>Récapitulatif</h2>
        <p>Réservation au nom de ${prenom}${nom}</p>
        <p>Adresse : ${adresse}</p>
        <p>email : ${email}</p>
        <p>Téléphone : ${telephone}</p>
        <p>Type de logement reservé : ${logement} </p>
        <p>Nombre de personnes : ${nombre_personnes}
        <p>Date d'arrivée : ${arrival}</p>
        <p>Date de départ : ${departure}</p>`
        if (services.length>0){
            summaryBox.innerHTML+=`<p>Services choisis :${services}</p>`
        };
        if (menus.length>0){
            summaryBox.innerHTML+=`<p>Menus choisis :${menus}</p>`
        };
        summaryBox.innerHTML+=`<p>Prix :${Math.random()}</p>`
        ;
    }
});


function toggleLogementOptions() {
    const logement = document.getElementById('logement').value;
    const options = logement ==='maison' || logement === "appartement" || logement==="loft" ;

    document.getElementById('options_logement').classList.toggle('hidden', !options);
  }

  function toggleRegime() {
    const regime = document.getElementById('breakfast').checked;
    if (regime==true){
        document.getElementById('regime_container').classList.remove("hidden")
    } else document.getElementById('regime_container').classList.add("hidden")

    //document.getElementById('options_logement').classList.toggle('hidden', !options);
  }