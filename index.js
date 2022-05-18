/* eslint-disable */
function rand(min, max)
{
    min -= 1;
    return Math.round(Math.random()*(max-min)+min);
}
let operators = ["+", "-", "*", "ERROR"];


function make_0()
{
    let equation;
    let answer;

    let rh = rand(0, 25);
    let m = rand(1, 10);
    let third = rand(0, 10);
    let op = operators[rand(0,2)];
    
    answer = (rh - (op==="+" ? third : -third)) / m;
    answer = Math.floor(answer*100)/100;
    equation = m+"x "+op+" "+third+" = "+rh;

    return {equation, answer};
}
function make_1()
{
    let equation, answer;
    // String.fromCharCode();  "t".charCodeAt(0)
    let num = rand(0, 26);
    if (rand(0,2)==0)
        num += 97;
    else
        num += 65;
    

    let str = num.toString(2);
    while(str.length < 8)
        str = "0" + str;
    equation = "0b"+str;
    answer = String.fromCharCode(num);

    return {equation, answer};
}


function make_equation()
{
    return make_1();
    // let equation;
    // let answer;
    // if (type === "normal")
    // {
    //     let num0 = rand(0,25);
    //     let op = operators[rand(0,3)];
    //     let num1 = rand(0,25);
        
    //     if (op === "+") { answer = num0 + num1; }
    //     else if (op === "-") { answer = num0 - num1; }
    //     else if (op === "*") { answer = num0 * num1; }
    
    //     equation = num0+" "+op+" "+num1;
    // }
    // else if (type === "linear")
    // {
    // let rh = rand(0, 25);
    // let m = rand(1, 10);
    // let third = rand(0, 10);
    // let op = operators[rand(0,2)];
    
    // answer = (rh - (op==="+" ? third : -third)) / m;
    // answer = Math.floor(answer*100)/100;
    // equation = m+"x "+op+" "+third+" = "+rh;
    // }
    // else alert("error");
    // return {"equation":equation, "answer":answer}
}
let questions = [];
function new_question()
{
    let i = questions.length;
    questions[i] = make_equation();

    ui_for_question(i);
}
function ui_for_question(i)
{
    let div = document.createElement("div");
    div.classList.add("question");
    document.body.appendChild(div);
    
    let questionNum = document.createElement("p");
    questionNum.classList.add("header");
    questionNum.innerHTML = "Question "+(i+1);
    div.appendChild(questionNum);
    
    let equation = document.createElement("p");
    equation.classList.add("text");
    equation.innerHTML = questions[i].equation;
    div.appendChild(equation);
    
    let input = document.createElement("input");
    input.placeholder = "Enter your answer here";
    input.addEventListener("input", input_changed);
    input.answer = questions[i].answer;
    div.appendChild(input);
}
function input_changed(evt)
{
    let input = evt.currentTarget;
    
    if (isNaN(input.value))
    {
        if (input.value==input.answer)
        {
            input.style.color = "#0000ff";
            if (!input.answered)
            {
                input.answered = true;
                new_question();
            }
        }
        else
        {
            input.style.color = "#ff0000";
        }
    }
    else if (Math.abs(input.value - input.answer) < 0.01)
    {
        input.style.color = "#0000ff";
        if (!input.answered)
        {
            input.answered = true;
            new_question();
        }
    }
    else
    {
        input.style.color = "#ff0000";
    }
}
new_question();