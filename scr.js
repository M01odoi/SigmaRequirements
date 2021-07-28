function stopDef(event) {
    event.preventDefault();
}

function to16(numb) {
    switch (numb) {
        case '10':
            numb = 'A';
            break;
        case '11':
            numb = 'B';
            break;
        case '12':
            numb = 'C';
            break;
        case '13':
            numb = 'D';
            break;
        case '14':
            numb = 'E';
            break;
        case '15':
            numb = 'F';
            break;
        default:
            numb;
    }
    return numb;
}

function randColor() {
    let mas = ['#'];
    for (let i = 0; i < 6; i++)
        mas[i + 1] = to16((Math.random() * 15).toFixed());
    let color = mas.join('');
    document.getElementById('body').style['background'] = color;
    return color;
}

let listItem = document.getElementsByClassName('list-group-item');
[].forEach.call(listItem, function (el) {
    el.addEventListener('click', stopDef, false);
});
document.getElementById('logo').addEventListener('click', randColor, false);

let question = document.getElementById('articleQ');
let activeQue = document.createElement('div');
let answerList = document.createElement('div');


activeQue.id = 'text';

function activeQue1(obj) {
    obj.target.classList.add('active');
    activeQue.innerHTML = '<h4>' + obj.originalTarget.innerText + '</h4>';
    showForm(JSON.parse(localStorage.getItem(obj.target.id)));
    setTimeout(function () {
        obj.target.classList.remove('active')
    }, 5000);
    let textarea = document.createElement('textarea');
    textarea.setAttribute('placeholder', 'Type your answer...');
    textarea.className = 'textarea';
    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'answer the question');
    button.classList.add('btn','btn-primary');
    button.addEventListener('click', () => {
        saveForm(obj.target.id, textarea.value);
        textarea.value = '';
    });
    activeQue.append(answerList);
    activeQue.append(textarea);
    activeQue.append(button);
    question.append(activeQue);
}

function saveForm(id, textarea) {
    if (textarea !== '') {
        if (localStorage.getItem(id)) {
            let item = localStorage.getItem(id);
            localStorage.removeItem(id);
            let mass = JSON.parse(item);
            mass.push(textarea);
            localStorage.setItem(id, JSON.stringify(mass));
        } else {
            let mas = [];
            mas.push(textarea);
            localStorage.setItem(id, JSON.stringify(mas));
        }
    }
    masAnswer = JSON.parse(localStorage.getItem(id));
    showForm(masAnswer)
}

function showForm(mas) {
    answerList.innerHTML = '';
    let ul = document.createElement('ul');
    ul.classList.add('list-group');
    if (mas)
    for (let i = 0; i < mas.length; i++) {
        let li = document.createElement('li');
        li.textContent = i+1+'. '+mas[i];
        li.classList.add('list-group-item');
        ul.append(li);
    }
    answerList.append(ul);
}

document.getElementById('list-group').addEventListener('click', activeQue1);
