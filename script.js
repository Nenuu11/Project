//UTILITIES

// var selectedRadioBtn = (function (btns) {
//     for(var i = 0 ; i<btns.length ; i++){
//         if(btns.item[i].checked){

//         }
//     }
// })();

//DATA
var dataController = (function (){
    var question={} , questionIndex, random=[];
    var questions = [
        Q1={
            question:"What is lord voldemort's real name?",
            choices: [' Tom Marvolo Riddle',' Tom marvilo Riddle',' Tom Marvin Riddle',' Tom Ravolo Riddle'],
            rightAnswer:' Tom Marvolo Riddle'
        },
        Q2={
            question:"According to the durselys, how did harry's parents die?",
            choices: [' in a train crash',' in a car crash',' in a plane crash',' in a bus crash'],
            rightAnswer:' in a car crash'
        },
        Q3={
            question:"A person born into a wizarding family who cannot do magic is called?",
            choices: [' A muggle',' A half-blood',' A mudblood',' A squib'],
            rightAnswer:' A squib'
        },
        Q4={
            question:"Which brothers are supposedly the original possessors the Deathly Hallows? ",
            choices: [' The Percival brothers',' The Principe brothers',' The Possimo brothers',' The Peverell brothers'],
            rightAnswer:' The Percival brothers'
        },
        Q5={
            question:"Who put Harry’s name in the Goblet of Fire? ",
            choices: [' Peter Pettigrew',' Severus Snape',' Barty Crouch,Jr',' Cornelius Fudge'],
            rightAnswer:' Barty Crouch,Jr'
        },
        Q6={
            question:"How many Horcruxes did Voldemort have?",
            choices: [' 7',' 6',' 5',' 4'],
            rightAnswer:' 7'
        },
        Q7={
            question:"What form does Harry Potter’s Patronus take?",
            choices: [' A unicorn',' A stag',' A lion',' A rabbit'],
            rightAnswer:' A stag'
        },
        Q8={
            question:"What position did Harry Potter play on the Gryffindor Quidditch team?",
            choices: [' Seeker',' Beater',' Keeper',' Chaser'],
            rightAnswer:' Seeker'
        },
        Q9={
            question:"Who was Harry Potter’s godfather?",
            choices: [' Albus Dambuldor',' Remus Lupin',' severus Snape',' Sirius Black'],
            rightAnswer:' Sirius Black'
        },
        Q10={
            question:"In which book did Voldemort regain his body again?",
            choices: [' The Goblet of Fire',' Half-blood prince',' Order of pheonix',' Chamber of Secrets'],
            rightAnswer:' The Goblet of Fire'
        }

    ];

    //Generating 5 random questions
    for (var i = 0; i < 5; i++) {
        questionIndex = Math.floor(Math.random() * questions.length);
        for(var j=0 ; j<random.length ; j++){
            //dont repeat the generated random number
            if(random[j]===questionIndex){
                if(random[j] === 9){
                    random[j]--;
                    questionIndex--;
                }
                else{
                    random[j]++;
                    questionIndex++;
                }
            }
        }
        question [i]= questions[questionIndex];
        random.push(questionIndex);
        // console.log(questionIndex);
    }
    
    return{
        questionSet : question,

        calculateScore : function (array , obj) {
            var score = 0;
            if(array === obj){
                score = 1;
            }
            return score;
        }
    };

})();

//UI
var uiController = (function (){

    var domStrings = {
        exam : '.exam__question',
        quesAnsField : '.ans-ques',
        questionField : '.question',
        answerField : '.exam__ans',
        labelField : '.ans',
        nextBtn : '.exam__next',
        prevBtn : '.exam__prev',
        skipBtn : '.exam__skip',
        submitBtn : '.exam__submit',
        btns : '.exam__btns',

        skippedList : '.exam__skipped-list',
        skippedQuestion : '.skipped-question',
        radios : document.getElementsByName('ans-selector'),

        finish : '.exam__finished',
        score : '.exam__score',
        Congratulations : '.exam__finished-content',
        userData1 : '.user-data1',
        userData2 : '.user-data2',
        userData3 : '.user-data3',
    
    };
    
    return{
        DOM: domStrings,
    
        displayQuestions: function (question,i) {
            var questionHtml = domStrings.questionField; 
            var answerHtml = domStrings.answerField;
            var labelField = domStrings.labelField;
            var ques = document.querySelector(questionHtml);
            var answersHtml =document.querySelectorAll(answerHtml);
            var labels = document.querySelectorAll(labelField);
                ques.textContent = (i+1)+') '+question[i].question;
                for(var j = 0 ; j<4 ; j++){
                    answersHtml[j].value = question[i].choices[j];
                    labels[j].textContent = question[i].choices[j];
                    answersHtml[j].checked = false;
                }
            
            document.querySelector(domStrings.prevBtn).style.display = 'block';
            document.querySelector(domStrings.nextBtn).style.display = 'block';
            document.querySelector(domStrings.skipBtn).style.display = 'block';
            document.querySelector(domStrings.submitBtn).style.display = 'none';
            
            if(i === 4){
                document.querySelector(domStrings.nextBtn).style.display = 'none';
                document.querySelector(domStrings.skipBtn).style.display = 'none';
                document.querySelector(domStrings.submitBtn).style.display = 'block';
            }
            if(i === 0){
                document.querySelector(domStrings.prevBtn).style.display = 'none';
            }
        },

    };
    
})();

//LOGIC

var controller = (function (uiCtrl,dataCtrl){
    var nxtcounter = 0;
    var answersArray = ["","","","",""];
    var radiobtns = uiCtrl.DOM.radios;
    var total = 0;


    var prevOrNext = function (flag) {
        //1)check answer
        //2)push  the value into answers array
        for (var i =0 ; i<radiobtns.length ;i++) {
            var item = radiobtns[i];
            if(item.checked){
                answersArray[nxtcounter]= item.value; 
            }
        }
        console.log(answersArray);

        //3)display next or prev question
        if( flag == 'next'){
            nxtcounter++;
        }else{ //flag == 'previous'
            nxtcounter--
        }
        
        uiCtrl.displayQuestions(addqeustion,nxtcounter);

        //check if the question is in the skippedList --> remove from the list
        if(document.getElementById(nxtcounter)!==null){
            document.getElementById(nxtcounter).remove();
        }
        
        //make the radio button always checked on the chosen answer
        for(var i = 0 ; i < answersArray.length ; i++){
            for(var j =0 ; j<radiobtns.length ;j++){
                var item = radiobtns[j];
                if (answersArray[i] === item.value){
                    item.checked = true;
                }
            }
        }
    }
    var next = function () {
        prevOrNext('next');
    };

    var previous = function () {
        prevOrNext('previous');
    };

    var skip = function (){
        var currentQues = dataCtrl.questionSet[nxtcounter];
        console.log(currentQues);
        next();
        if(document.getElementById(nxtcounter)!==null){
            document.getElementById(nxtcounter).remove();
        }
        var x = document.getElementById(nxtcounter);
        console.log(x);

       var skippedHtml = '<button class="btn btn--lightGrey btn--sm skipped-question" id="%id%">%skip%</button>';
       newskippedHtml = skippedHtml.replace ('%skip%', 'Q'+nxtcounter);
       newskippedHtml = newskippedHtml.replace('%id%',nxtcounter-1);
       document.querySelector(uiCtrl.DOM.skippedList).innerHTML += newskippedHtml;

    };

    var submit = function () {
        //make sure the last answer is pushed in the answerArray
        for (var i =0 ; i<radiobtns.length ;i++) {
            var item = radiobtns[i];
            if(item.checked){
                answersArray[nxtcounter]= item.value; 
            }
        }
        console.log(answersArray);

        document.querySelector(uiCtrl.DOM.quesAnsField).style.display = 'none';
        document.querySelector(uiCtrl.DOM.btns).style.display = 'none';
        
        for(var i = 0; i<5 ;i++){
            total += dataCtrl.calculateScore(answersArray[i],dataCtrl.questionSet[i].rightAnswer);
        }
        console.log(total);
        var urlParams = new URLSearchParams(location.search);
        var fName = urlParams.get('fname');
        var lname = urlParams.get('lname');
        var age = urlParams.get('age');
        var email = urlParams.get('email');
        
        document.querySelector(uiCtrl.DOM.Congratulations).textContent = 'Congratulations, ' + fName + ' '+ lname +' !';
        document.querySelector(uiCtrl.DOM.userData1).textContent = 'Full name: '+ fName + ' '+ lname;
        document.querySelector(uiCtrl.DOM.userData2).textContent = 'Age : '+ age;
        document.querySelector(uiCtrl.DOM.userData3).textContent = 'email : '+ email;
        
        
        
        document.querySelector(uiCtrl.DOM.score).textContent = 'YOUR SCORE IS : '+total +'/5';
    }

    //Recieve the random questions from Data Model
    var addqeustion = dataCtrl.questionSet;
    uiCtrl.displayQuestions(addqeustion,0);       
    console.log(addqeustion);
    

    document.querySelector(uiCtrl.DOM.nextBtn).addEventListener('click',next);
    document.querySelector(uiCtrl.DOM.prevBtn).addEventListener('click',previous);
    document.querySelector(uiCtrl.DOM.skipBtn).addEventListener('click',skip);
    document.querySelector(uiCtrl.DOM.submitBtn).addEventListener('click',submit);

    //when pressing on the button of the skipped question display the question
    document.querySelector(uiCtrl.DOM.exam).addEventListener('click',function (e) {
        if(e.target && e.target.classList.contains('skipped-question')){
            var questionID = e.target.id;
            questionID = parseInt(questionID);
            nxtcounter = questionID;
            var delSkipped = document.getElementById(questionID);
            delSkipped.remove();
            for (var i =0 ; i<radiobtns.length ;i++) {
                var item = radiobtns[i];
                if(item.checked){
                    answersArray[nxtcounter]= item.value; 
                }
            }
            
            uiCtrl.displayQuestions(addqeustion,nxtcounter);
            for(var i = 0 ; i < answersArray.length ; i++){
                for(var j =0 ; j<radiobtns.length ;j++){
                    var item = radiobtns[j];
                    if (answersArray[i] === item.value){
                        item.checked = true;
                    }
                }
            }

            console.log('ID of Displayed question from skipped list: '+nxtcounter);

        }
    })

})(uiController, dataController);
