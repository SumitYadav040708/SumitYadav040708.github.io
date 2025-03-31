let gameseq=[];
let userseq=[];

let started = false;
let level=0;

let btns=["yellow","red","purple","green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress",(event)=>{
    if(started==false){
        started= true;
        levelup();
    }
})


function systemflash(btn){
    btn.classList.add('systemflash');
    setTimeout(()=>{btn.classList.remove("systemflash")},300);
}

function userflash(btn){
    btn.classList.add('userflash');

    setTimeout(()=>{btn.classList.remove("userflash")},200)
}

function checkans(idx){
    //console.log(level);
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
        h2.innerHTML=`Game Over!! <b>Your Score was ${level} </b> <br> Press any Key to Start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
        },100);
        highest(level);
        reset();
    }


}



function levelup(){
    userseq=[];
    level++;
    h2.innerText= `Level ${level}`;

    let randIndx=Math.floor(Math.random()*3);
    let randcolor=btns[randIndx];
    let randbtn = document.querySelector(`.${randcolor}`);
    systemflash(randbtn);
    gameseq.push(randcolor);

}

function btnpress(){
    userflash(this);
    let userpushedbtn=this;
    let usercolor=userpushedbtn.getAttribute("id");
    userseq.push(usercolor);
    console.log(userseq);
    checkans(userseq.length-1);
}
let allbtn = document.querySelectorAll(".btn");

for(let btn of allbtn){
    btn.addEventListener("click",btnpress);
}



function highest(level){
    let damn =document.querySelector(".high");
    damn.innerHTML=`Highest Score Is ${level}`;
    
}


    

function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}

