const btnAddUser = document.getElementById("adduser");
const main =document.getElementById("main");
const btnDoubleMoney =document.getElementById("doublymoney");
const btnshowMillioniares =document.getElementById("show");
const btnsort =document.getElementById("sort");
const btncalculatewealth =document.getElementById("calculatewealth");
let persons=[];
let addToDom = (person) => {
    let element =document.createElement('div');
    element.classList.add("person");
    element.innerHTML= `<span>${person.name}</span> <span>$${person.wealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`;
    main.appendChild(element);
    removeTotalDiv();
};
let getRandomUser = async () => {
    let res = await (await fetch('https://randomuser.me/api')).json();
    const person = {
        name: `${res.results[0].name.first} ${res.results[0].name.last}`,
        wealth: Math.floor(Math.random() * 1000000)
    };
    persons.push(person);
    addToDom(person);
};
let showMillioniares = () => {
   persons =persons.filter(person => person.wealth >=1000000);
   refreshPersonsTable();
}
let doubleMoney =  async() => {
   persons= persons.map( person => {return {name: person.name , wealth : person.wealth*2 }
    });
    refreshPersonsTable();
}
let sort = async () => {
persons =persons.sort((person1 , person2)=> person2.wealth - person1.wealth);
refreshPersonsTable();
}
let calculateTotal = async ()=> {
    removeTotalDiv();
let totalWealth =persons.reduce((total , person)=>(total +=person.wealth),0);
let element =document.createElement('div');
element.classList.add("total");
element.innerHTML= `<span>Total</span> <span>$${totalWealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>`;
main.appendChild(element);
}
btncalculatewealth.addEventListener('click', calculateTotal);
btnAddUser.addEventListener('click', getRandomUser);
btnDoubleMoney.addEventListener('click', doubleMoney);
btnshowMillioniares.addEventListener('click', showMillioniares);
btnsort.addEventListener('click', sort);
const refreshPersonsTable = () => {
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
    persons.forEach(person => addToDom(person));
};

const removeTotalDiv = () => {
    let totalDiv = document.getElementsByClassName('total')[0];
    if (totalDiv != null) {
        totalDiv.remove();
    }
};

