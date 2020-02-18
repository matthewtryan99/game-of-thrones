var container = document.querySelector('.container-fluid');
var houses = []
var characters = [];
for(let i = 1; i < 112; i++)
{
    fetch(`https://anapioficeandfire.com/api/houses?page=${i}&pageSize=4`)
    .then((response)=>response.json())
    .then((e)=>{
        for(let inner = 0; inner < 4; inner++)
        {
            // console.log(e[inner].name);

            houses.push(e[inner].name)

        }
    })
}
for(let i = 1; i < 535; i++)
{
    fetch(`https://anapioficeandfire.com/api/characters?page=${i}&pageSize=4`)
    .then((response)=>response.json())
    .then((e)=>{
        let div = document.createElement('div');
        let outDiv = document.createElement('div')
        outDiv.className = "name column align-items-center justify-content-center m-2"
        let newArray = e.map((element)=>{
            
            characters.push(element);
            
            if(element.name == '' && element.allegiances.length > 0)
            {
                let houseArr = element.allegiances[0].split('/')
                let house = houseArr.pop();
                return `<div class="col-3 d-inline-flex">${element.aliases[0]}-<a href="#">${houses[house-1]}</a></div>`
            }
            else if(element.name != '' && element.allegiances.length > 0)
            {
                let houseArr = element.allegiances[0].split('/')
                let house = houseArr.pop();
                return `<div class="col-3 d-inline-flex">${element.name}-<a href="#">${houses[house-1]}</a></div>`;
            }
            else if(element.name != '' && element.allegiances.length == 0) 
            {
                return `<div class="col-3 d-inline-flex">${element.name}-No House</div>`;
            }
            else 
            {
                return `<div class="col-3 d-inline-flex">${element.aliases[0]}-No House</div>`;
            }
        })

        div.innerHTML = newArray.join('')
        outDiv.append(div)
        container.append(outDiv)
    })
}

console.log(characters);