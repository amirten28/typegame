const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEL = document.getElementById('score');
const timeEL = document.getElementById('time');
const endgameEL = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect= document.getElementById('difficulty');
const startMassege = document.getElementById('startMassege');
const settingsBTN = document.getElementById('settings-btn');

 // מציב את הסמן בתיבת הטקס כאשר העמוד נטען 



// list of words for game 

const words = [        // רשימת מילים שייבחרו רנדומלית
    "the","of","and","a","to","in","is","you","that","it","he","was","for","on","are","as","with","his","they","I","at","be","this","have","from","or","one","had","by","word","but","not","what","all","were","we","when","your","can","said","there","use","an","each","which","she","do","how","their","if","will","up","other","about","out","many","then","them","these","so","some","her","would","make","like","him","into","time","has","look","two","more","write","go","see","number","no","way","could","people","my","than","first","water","been","call","who","oil","its","now","find","long","down","day","did","get","come","made","may","part"
];

//init word 
let randomWord;

//init score
let score =0;

//init time
let time =10;

//init start clock
let sec = 5;


//init difficulty
let difficulty = localStorage.getItem('difficulty') !== null ?  // הכנסנו לתוך המשתנה דיפיקולטי את מה שמופיע בלוקל סטורג כלומר בזיכרון שזה בעצם הפעם האחרונה שמישהו שיחק ואמרנו אם  יששם משהו אז תגדיר את המשהו הזה בדיפיקולטי אחרת תגדיר אותו כמדיום  
localStorage.getItem('difficulty') : 'medium';

difficultySelect.value = localStorage.getItem('difficulty') !== null ? // תציג את המדיום בכפתור סלקט
localStorage.getItem('difficulty') : 'medium';


function showStartMassege(){
    startMassege.innerHTML = 'The Game Will Start In ' + sec +' seconds';
}
showStartMassege();



function updateScore(){   // פונקציה שמעדכנת את התוצאה ואז מציגה אותה
 score=score+1;
 scoreEL.innerHTML=score;   
}

 function getRandomWords(){
return words[Math.floor(Math.random()*words.length)] // בוחר מילה רנדומלית מהארי
} 

function addWordToDom(){
randomWord = getRandomWords();  // מציג את המילה הרנדומלית שנבחרה לתוך האלמנט אייץ1
word.innerHTML=randomWord
}

addWordToDom();

text.addEventListener('input',function(e){
    const insertedText = e.target.value; // לוכד את המילה שהמשתמש הכניס באינפוט לתוך משתנה שאותו נשווה למילה הרנדומלית
    if(insertedText===randomWord){   
    addWordToDom(); // קורא לפונקציה שמציגה מילה רנדומלית  חדשה לאחר שהמילה שהכנסנו זהה למילה הרנדומלית
    e.target.value=''; // מוחק את האינפוט כאשר המילה שהכנסתי זהה למילה הרנדומלית
    updateScore();   // קורה לפונקציה שמוסיפה נקודות כמובן בהנחה והמילה זהה
     
    if(difficulty ==='hard'){
        time +=2;
    
    }else if (difficulty === 'medium'){
    
        time +=3;
    }else {
       
        time +=5;
    };
    }
})

 
 

 function gameover(){ // פונקציה שנקרא לה בסוף המשחק כאשר הזמן שווה 0 פונקציה זו תכניס טקסט שמראה גם את התוצאה ובנוסף יופיע כפתור להתחיל מחדש את המשחק 
    endgameEL.innerHTML =
    '<h1>Time run out</h1>'+
    '<p>your final score is'+' '+ score +'</p>'+
    '<button onclick = "location.reload()">Reload</button>'
    endgameEL.style.display='flex';
 }
 

 document.getElementById("text").disabled = true; 

 setTimeout(startGame, 5000);
function startGame(){
    startMassege.innerHTML='';
    document.getElementById("text").disabled = false; 
    const timeInterval = setInterval(updateTime,1000);
    function updateTime(){
    text.focus();   
    time--;
    timeEL.innerHTML = time + 's';
    if(time===0){
     clearInterval(timeInterval);
     gameover();
    }
    }
}

settingsBTN.addEventListener('click',() =>{ // לחיצה על כפתור זה "תחביא" את סטינגס שלמעלה 

settings.classList.toggle('hide')}); // בסי אס אס הגדרנו לסטינגס קלאס הייד בלחיצה על הכפתור הסטינגס יקבלו את ההגדרות סי אס אס  של קלאס הייד 


// settings select 

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty',difficulty);
})


