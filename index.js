/* eslint-disable */
function rand(min, max)
{
    return Math.floor(Math.random()*(max-min)+min);
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
function gen_ascii()
{
    let num = rand(0, 26);
    if (rand(0,2)==0)
        num += 97;
    else
        num += 65;
    return num;
}
function make_1()
{
    let equation, answer;
    let num = gen_ascii();
    

    let str = num.toString(2);
    while(str.length < 8)
        str = "0" + str;
    equation = str;
    answer = String.fromCharCode(num);

    let choices = [];
    for (let i = 0; i < 4; ++i)
    {
        let cur;
        do cur = String.fromCharCode(gen_ascii());            
        while (cur==answer || choices.includes(cur));
        choices[i] = cur;
    }
    choices[rand(0,4)] = answer;
    return {
        equation, answer,
        desc:"Convert binary to ascii",
        choices
    };
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
    let q = questions[i];
    let div = document.createElement("div");
    div.classList.add("question");
    
    let questionNum = document.createElement("p");
    questionNum.classList.add("header");
    questionNum.innerHTML = "Question "+(i+1);
    div.appendChild(questionNum);

    let desc = document.createElement("p");
    desc.classList.add("text");
    desc.innerHTML = q.desc;
    div.appendChild(desc);
    
    let equation = document.createElement("p");
    equation.classList.add("text");
    equation.innerHTML = q.equation;
    div.appendChild(equation);
    
    if (q.choices)
    {
        let choicesDiv = document.createElement("div");
        choicesDiv.classList.add("choices");
        choicesDiv.style.setProperty("--choiceWidth", (100.0/q.choices.length) + "%");
        for (let i = 0; i < q.choices.length; ++i)
        {
            let choice = document.createElement("span");
            choice.innerHTML = q.choices[i];
            
            choice.addEventListener("click", function()
            {
                if (choicesDiv.answered) return;
                if (choice.innerHTML == q.answer)
                    choice.style.backgroundColor = "#008000";
                else
                {
                    choice.style.backgroundColor = "#800000";
                    let index = q.choices.findIndex((e) => e==q.answer);
                    choicesDiv.childNodes[index].style.backgroundColor = "#008000";
                }
                new_question();
                choicesDiv.answered = true;
            });
            choicesDiv.appendChild(choice);
        }
        div.appendChild(choicesDiv);
    }
    else
    {
        let input = document.createElement("input");
        input.placeholder = "Enter your answer here";
        input.addEventListener("input", input_changed);
        input.answer = q.answer;
        div.appendChild(input);
    }

    document.body.appendChild(div);
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