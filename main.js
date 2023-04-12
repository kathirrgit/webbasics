const puzzleBoard=document.querySelector('#puzzle');
const solvebutton=document.querySelector('#solve');
const resetbutton=document.querySelector('#replay');


const r=81;
let sub=[];

function blinkk()
{
    const blink=document.querySelector('#heading');
    if(blink.style.visibility==='visible')
    {
        blink.style.visibility='hidden';
    }
    else{
        blink.style.visibility='visible';
    }

}
    window.setInterval(blinkk,1000);



for(let i=0;i<r;i++)
{
    let inputele=document.createElement('input');
    inputele.setAttribute('type','number');
    inputele.setAttribute('min','0');
    inputele.setAttribute('max','9');
    puzzleBoard.appendChild(inputele); 
}



const joinval=() =>{
    const inputs=document.querySelectorAll('input');
    inputs.forEach(input=>{
        if(input.value)
        {
            sub.push(Number(input.value));
        }
        else{
            sub.push(0);
        }

    })
    console.log(sub);
    return sub;
}

const populatevalues=(solution)=>{

    const inputs=document.querySelectorAll('input');
    if(solution)
    {
        inputs.forEach((input,i)=>{
            input.value=solution[i];
        })
    }
}

const reset=()=>{
    const inputs=document.querySelectorAll('input');
    inputs.forEach(input=>{
        input.value=0;
    })
}

const solve=()=>{

    const ans=joinval();
    console.log(ans);
    console.log('length',ans.length);

    const options = {
      method: 'POST',
      url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'ef9c59d806msh2ef0bdb3c21afa8p18f95bjsnd518c4b53870',
        'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
      },
      data: {input:ans}
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data);
        populatevalues(response.data.answer);
        sub=[];

    }).catch(function (error) {
        console.error(error);
    });
}

resetbutton.addEventListener('click',reset);
solvebutton.addEventListener('click',solve);

