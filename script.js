const cards= document.querySelectorAll('.card');


function showPopup(){
    document.getElementById("popup-1").classList.toggle("active");
  }

function resetGame(){
    location.reload();
}

var audio=document.getElementById('audio');
var counter=0;

function playMusic(){
    console.log(counter);
    if(counter==0){
        counter=1;
        audio.play();
    }else{
        counter=0;
        audio.pause();
    }
}

let firstClick=true;
let firstCard, secondCard;
let lockBoard=false;


function flipCard(){
   
    if (lockBoard) return;

    this.classList.add('show');

    if (firstClick){
        //first click
        firstClick=false;
        firstCard=this;
    } else{
        //second click
        firstClick=true;
        secondCard=this;
        //check if match
        checkMatch();

    }
}


function checkMatch(){
    if (firstCard.dataset.name===secondCard.dataset.name){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }else{
        lockBoard=true;
        setTimeout(()=>{
        firstCard.classList.remove('show');
        secondCard.classList.remove('show');

        lockBoard=false;
        },700);
    }
}

(shuffle =()=>{
    cards.forEach(card => {
        let randomNumber=Math.floor(Math.random()*16);
        card.style.order=randomNumber;
    });
})();

cards.forEach(card =>card.addEventListener('click',flipCard));