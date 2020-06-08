// document.querySelector("select[name=uf]");
// document.addEventListener("change", () => {
//     console.log("mudei");
// });

function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then( res =>  res.json())
    .then( states => {

            for( const state of states ) {
                ufSelect.innerHTML += `<option value ="${state.id}">${state.nome} </option>`
            }
            
        })
    
}

populateUfs();

function getCities(event) {
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    // target é uma das informações do evento (onde foi executado)
    const ufValue = event.target.value;
    
    
    const indexOfSelectedState = event.target.selectedIndex;
    
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade </option>";
    citySelect.disabled = true;

    fetch(url).then((res) => {
    
        return res.json().then( cities => {
            
            
            for( city of cities ) {
                citySelect.innerHTML += `<option value ="${city.nome}">${city.nome} </option>`;
                

            }
            citySelect.disabled = false;
            
        })
    })

}

document
.querySelector("select[name=uf]")
.addEventListener("change",getCities);
// passando getCities por referencia para que ela nao seja chamada automaticamente


// itens de coleta

// pegar todos os Lis

//pega o li e os filhos do li
const itemsToCollect = document.querySelectorAll(".items-grid li");

for( const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
    const itemLi = event.target
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;
    
    
    // verificar se existem itens selecionados e quais itens
    const alredySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId;
        return itemFound;
    })

    if(alredySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        selectedItems = filteredItems;
    } else {
        selectedItems.push(itemId);
    }
    
    
    collectedItems.value = selectedItems;

}

