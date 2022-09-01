const loadMobile =(search, dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${search}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMobile(data.data,dataLimit))
}
// loadMobile()

const displayMobile =(mobile,dataLimit)=>{
const displayContainer=document.getElementById('display-container');
displayContainer.innerHTML=''


// .......Show All....................
const showAll = document.getElementById('show-all')
if(dataLimit && mobile.length>6){
    mobile =mobile.slice(0, 6)
    showAll.classList.remove('d-none')
}
else{
    showAll.classList.add('d-none')
}


// ...........mobile found......
const mobileFound= document.getElementById('no-found-message')
if(mobile.length===0){
    mobileFound.classList.remove('d-none')
}
else{
    mobileFound.classList.add('d-none')
}




mobile.forEach(mobiles => {
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML=`
    <div class="card h-100">
    <img src="${mobiles.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${mobiles.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button onclick="idButton('${mobiles.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
    </div>
  </div>
    `
 displayContainer.appendChild(div)
});
toggleSpinner(false)
}

// ..........ProcessSearch....................

const processSearch =(dataLimit)=>{
    toggleSpinner(true)
    const inputField= document.getElementById('input-field')
    const inputValue = inputField.value;

    loadMobile(inputValue, dataLimit);
}
// ........Search Button....................

document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(6)
})

document.getElementById('input-field').addEventListener('keypress',function(e){
    if(e.key==='Enter')
    processSearch(6)
})

// ......Spinner Loading....................

const toggleSpinner =(isLoading)=>{
const loadingContainer = document.getElementById('loading-container');
if(isLoading){
    loadingContainer.classList.remove('d-none')
}
else{
    loadingContainer.classList.add('d-none')
}
}

// ..........load show all.................

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch()
})

const idButton=(id)=>{
 const url=`https://openapi.programming-hero.com/api/phone/${id}`
 fetch(url)
 .then(res=>res.json())
 .then(data=>displayMobileModel(data.data))
}

const displayMobileModel=(mobiles)=>{
const modelTittle = document.getElementById('exampleModalLabel')
modelTittle.innerText = mobiles.name
const mobileDetails = document.getElementById('mobile-details')
mobileDetails.innerHTML=`
<img src="${mobiles.image}" class="card-img-top" alt="...">

<h5>Release Date: ${mobiles.releaseDate ? mobiles.releaseDate : 'No releas date found'}</h5>
<h5>Display Size: ${mobiles.mainFeatures.displaySize}</h5>
<h5>Storage: ${mobiles.mainFeatures.storage}</h5>
`
}
