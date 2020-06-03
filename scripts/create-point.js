// document.querySelector("select[name=uf]");
// document.addEventListener("change", () => {
//     console.log("mudei");
// });

function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then((res) => {
        return res.json().then( states => {

            for( state of states ) {
                ufSelect.innerHTML += `<option value ="${state.id}">${state.nome} </option>`
            }
            
        })
    })
}

populateUfs();
