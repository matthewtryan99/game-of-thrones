var fullCharList = [];
var fullHouseList = [];
var ul = document.querySelector('ul');
var x = 0;
var j = 0;
var lis = [];

for(let i = 1; i < 25; i++)
{
    fetch(`https://anapioficeandfire.com/api/houses?page=${i}&pageSize=50`)
    .then((response)=>response.json())
    .then((e)=>{
        fullHouseList = [...fullHouseList, ...e]
    })
}

for(var i = 1; i < 50; i++)
{
    fetch(`https://anapioficeandfire.com/api/characters?page=${i}&pageSize=50`)
    .then((response)=>response.json())
    .then((e)=>{
        fullCharList = [...fullCharList, ...e]
        for(x; x < fullCharList.length; x++){
            let li = document.createElement('li');
            if (fullCharList[x].name == '' && fullCharList[x].allegiances.length > 0)
            {
                let houseURL = fullCharList[x].allegiances[0].split('/');
                let index = houseURL.pop();
                li.innerHTML = `${fullCharList[x].aliases[0]}-<a href='#'data-toggle='modal' data-target='#exampleModalCenter'>${fullHouseList[index - 1].name}</a>`
            }
            else if(fullCharList[x].name != '' && fullCharList[x].allegiances.length > 0)
            {
                let houseURL = fullCharList[x].allegiances[0].split('/');
                let index = houseURL.pop();
                li.innerHTML = `${fullCharList[x].name}-<a href='#' data-toggle='modal' data-target='#exampleModalCenter'>${fullHouseList[index - 1].name}</a>`
            }
            else if(fullCharList[x].name != '')
            {
                li.innerHTML = `${fullCharList[x].name}`
            }
            else
            {
                li.innerHTML = `${fullCharList[x].aliases[0]}`
            }
            ul.append(li);
        }
    })
    .then((e)=>{
        let liList = document.querySelectorAll('li')
        for(j; j < liList.length; j++)
        {
            liList[j].addEventListener('click', (e)=>{
                let exampleModalHeader = document.querySelector('#exampleModalLongTitle')
                let namesOfHouses = fullHouseList.map((e)=>{
                    return e.name;
                })
                let index = namesOfHouses.indexOf(e.target.textContent)
                exampleModalHeader.textContent = fullHouseList[index].name
                let modalBody = document.querySelector('.modal-body')
                let lordIndexArray = fullHouseList[index].currentLord.split('/')
                let lordIndex = lordIndexArray.pop()
                let lord = fullCharList[lordIndex].name
                console.log(lord);
                modalBody.innerHTML = `<div>Region: ${fullHouseList[index].region}</div><div>Coat of Arms: ${fullHouseList[index].coatOfArms}</div><div>Current Lord: ${fullCharList[lordIndex].name}</div>`

            })
        }
    })
}