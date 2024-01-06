// tableau d'objet qui va contenir les résultats possible de notre app
const bigData = [
    {name : "Maigreur", color :"midnightblue",range: [0,18]},
    {name : "Bonne santé", color :"green",range: [18.5,25]},
    {name : "Surpoids", color :"lightcoral",range: [25,30]},
    {name : "Obésité modérée", color :"orange",range: [30,35]},
    {name : "Obésité sévère", color :"crimson",range: [35,40]},
    {name : "Obésité morbide", color :"purple",range: [40,Infinity]},
];

const resultatContener = document.getElementById("resultatContener");
const bouttonCalculer = document.getElementById("btnCalculerImc");
// on attend l'évenement click pour pouvoir lancer notre fonction 
bouttonCalculer.addEventListener("click", function(event){
    /*permet de ne pas actualiser la page au moment ou l'on click sur le button */
    event.preventDefault();

    var poids  = parseFloat( document.getElementById("poids").value);
    var taille = parseFloat( document.getElementById("taille").value);
    
    // on met dans la constante resultat se que retourne la fonction calculIMC avec la taille et le poids entrer dans les inputs  
    var resultat = calculIMC(taille,poids);

    /*réinitialise le contenu */
    resultatContener.innerHTML = "";
    
    for (let i=0 ;i<=bigData.length;i++ ){
        
        /*
        dans cette condition notre prédicat est la pour traiter les 2 beugs suivant :
        beug 1. l'utilisateur à entré une ou plusieurs valeurs qui ne correspondent pas a des nombres.
        beug 2. lutilisateur à entré une taille et un poids impossible (en gros il existe pas).
        */ 
        if ((isNaN(taille) == true || isNaN(poids) == true) || (taille <= 0) || (poids <= 0) ){
            // on créer une balise p qui va contenir le message d'erreur 
            var texteResultatElement = document.createElement("p");
            // on lui affecte le message d'erreur 
            texteResultatElement.textContent="Remplissez correctement les inputs.";
            // on ajoute au DOM (Document Object Model) notre balise p 
            resultatContener.appendChild(texteResultatElement)

            break;
        }

        // on récupère la  valeur min et max de chaque cas grace au tableau bigData 
        var min = bigData[i].range[0];
        var max = bigData[i].range[1];
        

        if (min <= resultat && max>= resultat){
            /*creation du dom*/
            var valeurIMC = document.createElement("p");
            var texteResultatElement = document.createElement("p");

            //affectations des vonnes valeurs aux bonnes varriables
            valeurIMC.innerHTML=`${resultat}`;
            texteResultatElement.innerHTML= `Résultat : ${bigData[i].name}` ;


            //coloration de la valeur de l'imc
            valeurIMC.style.color = bigData[i].color;

            //on rattache valeurIMC et texteResultatElement à resultatContener
            resultatContener.appendChild(valeurIMC)
            resultatContener.appendChild(texteResultatElement)

            break;//on sort de la boucle car pas besoin de tester les autres valeurs.

        }else if (bigData[i].range[1] == Infinity && resultat>=max){
            /*creation du dom*/
            var valeurIMC = document.createElement("p");
            var texteResultatElement = document.createElement("p");

            //affectations des bonnes valeurs aux bonnes varriables
            valeurIMC.innerHTML=`${resultat}`;
            texteResultatElement.textContent= `Résultat : ${bigData[i].name}` ;


            //coloration de la valeur de l'imc
            valeurIMC.style.color = bigData[i].color;

            //on rattache valeurIMC et texteResultatElement à resultatContener
            resultatContener.appendChild(valeurIMC)
            resultatContener.appendChild(texteResultatElement)

            break;//on sort de la boucle car pas besoin de tester les autres valeurs.
        }
    }
            
    //style du texte
    valeurIMC.style.fontSize= "50px";
    valeurIMC.style.fontWeight ="50px";
    texteResultatElement.style.fontSize = "30px"

});

function calculIMC (taille,poids){
    /*on divise par 100 car on demande la taille de l'individue en cm or on veut du kg/m² et 1cm est un centième de mètre  */
    taille=taille/100;
    var result = Math.round(poids/(taille*taille)*100)/100;
    return result;
}