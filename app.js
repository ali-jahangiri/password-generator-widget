const generatBtn = document.querySelector('button');
const input = document.querySelector('input')
const lenght = document.querySelector('.lenght');
const up = document.querySelector('.up')
const low = document.querySelector('.low');
const num = document.querySelector('.num');
const sym = document.querySelector('.sym');
const clibord = document.querySelector('.fa-copy');

//regular expretions
const uperReg = /^[A-Z]{0,20}$/;
const lowerReg = /^[a-z]{0,20}$/;
const numbReg = /^[1-9]{0,11}$/;
const symbReg = /[-!$%^&*()_+|~=`{}\@[\]:";'<>?,.\/]/

const cheker = (text, regular) => {
    for (let i = 0; i < text.length; i++)
        if (regular.test(text[i])) return true;
}
const lenghtCheker = (text) => {
    if (text.length >= 8) return true;
    else return false;
}

const classChange = (cheker, element, remove, add) => {
    if (cheker) {
        element.classList.remove(remove);
        element.classList.add(add)
    } else {
        element.classList.remove(add);
        element.classList.add(remove)
    }

}
const showClib = () => {
    const allCheck = document.querySelectorAll('.fa-check');
    if (allCheck.length === 5) {
        clibord.style.visibility = 'visible';
    } else {
        clibord.style.visibility = 'hidden';
    }
}

function rand(length, ...ranges) {
    var str = "";
    while (length--) {
        let ind = Math.floor(Math.random() * ranges.length);
        let min = ranges[ind][0].charCodeAt(0),
            max = ranges[ind][1].charCodeAt(0);
        let c = Math.floor(Math.random() * (max - min + 1)) + min;
        str += String.fromCharCode(c);
    }
    return str;
}
const insertInStraing = (many, text) => {
    let store = [];
    let place = '?><{}[]|//*`-+._-()&^%$@!';
    for (var i = 0; i < text.length; i++) {
        store.push(text[i])
    }
    for (var i = 0; i < many; i++) {
        let number = Math.floor(Math.random() * 9 + 1);
        let index = Math.floor(Math.random() * text.length);
        let randomeCar = Math.floor(Math.random() * place.length);
        store.splice(index, 0, number);
        store.splice(index, 0, place[randomeCar]);
    }
    return store.join('');
}

function doThings(place) {
    classChange(lenghtCheker(place), lenght, 'fa-times', 'fa-check');
    classChange(cheker(place, uperReg), up, 'fa-times', 'fa-check');
    classChange(cheker(place, lowerReg), low, 'fa-times', 'fa-check');
    classChange(cheker(place, numbReg), num, 'fa-times', 'fa-check');
    classChange(cheker(place, symbReg), sym, 'fa-times', 'fa-check');
    showClib();
}
input.addEventListener('input', (e) => {
    let place = e.target.value;
    doThings(place);
});

generatBtn.addEventListener('click', () => {
    let randomLengh = Math.floor(Math.random() * 14 + 1);
    let randomTime = Math.floor(Math.random() * 3 + 1);
    if (randomLengh >= 1 && randomLengh < 8) randomLengh += (8 - randomLengh);
    let beforeLast = rand(randomLengh, ["a", "z"], ["A", "Z"]);
    input.value = insertInStraing(randomTime, beforeLast);
    doThings(input.value);
});
clibord.addEventListener('mouseenter', () => {
    span = document.querySelector('.over');
    span.style.display = 'block';
});
clibord.addEventListener('mouseleave', () => {
    span.style.display = 'none';
});
clibord.addEventListener('click', () => {
    input.select();
    document.execCommand("copy");
});