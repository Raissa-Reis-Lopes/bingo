/* background-color: rgb(226, 156, 156);
color: rgb(255, 255, 255); */


const buttonIniciar = document.getElementById("start-button");
const createCard = document.getElementById("create-card");
const cardContainer = document.getElementById("card-container");
const drawnItemContainer = document.getElementById("drawn-numbers-container");
const winner = document.getElementById("winner");
const winnerContainer = document.getElementById("winner-container")


//Deixei elas como global, pois vou precisar usar em mais de um local
let drawnNumbers;
let allCards = [];
let intervalId;  // Variável para armazenar o id do intervalo para eu poder pará-lo se a cartela estiver completa


createCard.addEventListener("click", function(){
    
    //Reativo o botão iniciar sorteio que deixei desativado no início do jogo
    buttonIniciar.disabled = false;
    buttonIniciar.style.cursor = "pointer";
    
    let cardValues = [];
    
    const card = document.createElement("div");
    card.classList.add("card");
    
    //Aqui eu vou sortear e colocar os números na cartela
    while (cardValues.length < 10) {
        const cardNumber = Math.floor(Math.random() * 75) + 1;
    
        if (!cardValues.includes(cardNumber)) {
            cardValues.push(cardNumber);
            
            const cardItem = document.createElement("div");
            cardItem.innerText = cardNumber;
            cardItem.classList.add("card-item");
            cardItem.setAttribute("id", "numero_" + cardNumber); //vou colocar um ID em cada item p/ verificar depois se ele já foi sorteado
            card.appendChild(cardItem);
            // console.log(cardNumber);
            // console.log(cardValues);
        }
    }
    
    cardContainer.appendChild(card);    
    allCards.push(cardValues);
    
   
})

// Função para gerar um sorteador
function drawer(min, max) {
    return function () {
        const totalNumbers = 75;
        if (drawnNumbers.length === totalNumbers) {
            console.log('Todos os números foram sorteados. O sorteio será interrompido.');
            clearInterval(intervalId);
            
            buttonIniciar.disabled = false;
            buttonIniciar.style.cursor = "pointer";
            createCard.disabled = false;
                        createCard.style.cursor = "pointer"
            return;  // Retorna para interromper a execução da função
        }

        let drawnNumber;
        do {
            drawnNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (drawnNumbers.includes(drawnNumber));
        
        //Manda o número sorteado para o array de números já sorteados
        drawnNumbers.push(drawnNumber);
        
        //Aqui eu crio a div pra colocar cada item sorteado dentro do container que deixei no html
        const drawnItem = document.createElement("div");
        drawnItem.classList.add("drawn-item");
        drawnItem.innerText= drawnNumber;
        drawnItemContainer.classList.remove("hidden");
        drawnItemContainer.appendChild(drawnItem);

        //Essa função retorna o número que foi sorteado
        return drawnNumber;
    };
}



 
function check(lastNumber) {
    allCards.forEach(card => {
        if (card.includes(lastNumber)) {
            let elemento = document.getElementById('numero_' + lastNumber);

            if (elemento) {
                elemento.style.cursor = "pointer";
                elemento.addEventListener('click', function () {
                    elemento.style.backgroundColor = "white";
                    elemento.style.color = "black"

                    if (card.every(numero => document.getElementById('numero_' + numero).classList.contains('clicado'))) {
                        //Aqui para dar destaque na tabele campeã, eu vou mudar o backgroud para amarelo quando ela for inteira preenchida, se eu só pegasse o elemento ele iria colorir só um quadradinho, então peguei o parentElement, que vai ser o container que contém essa cartela
                        elemento.parentElement.style.backgroundColor = "rgb(28, 0, 104)";
                        winnerContainer.classList.remove("hidden")
                        winner.innerText = "Temos uma cartela campeã!! Parabéns 🌟🌟🌟"
                        clearInterval(intervalId);
                        buttonIniciar.disabled = false;
                        buttonIniciar.style.cursor = "pointer";
                        createCard.disabled = false;
                        createCard.style.cursor = "pointer"
                        
                    }
                });

                elemento.classList.add('clicado');
            }
        }
    });
}

    //O botão de iniciar começa desativado e só vai ser ativado quando criar pelo menos uma cartela
    buttonIniciar.disabled = true;
    buttonIniciar.style.cursor = "not-allowed";

  buttonIniciar.addEventListener("click", function () {
    drawnNumbers = [];

    createCard.disabled = true;
    createCard.style.cursor = "not-allowed"

    buttonIniciar.disabled = true;
    buttonIniciar.style.cursor = "not-allowed";

    // Configura o intervalo para chamar uma função anônima que chama drawer e check
    intervalId =  setInterval(function () {
        const drawnNumber = drawer(1, 75)();
        check(drawnNumber);
    }, 5000);
});


















