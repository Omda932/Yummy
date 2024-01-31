let searchContainer= $("#searchContainer")
let rowData= $("#rowData")
let submitBtn 

$(document).ready(() => {
  $(".inner-loading-screen").fadeIn(300)
      $(".loading-screen").fadeOut(500)
      $("body").css("overflow", "visible")
      getDefalutData()
      $(".inner-loading-screen").fadeOut(300) 
     
})

function closeSideNav(){
  $(".side-nav-menu").animate({left:"-256.562px"},500)
  $(".open-close-icon").removeClass("fa-x");
  $(".open-close-icon").addClass("fa-align-justify");
  $(".links li").animate({
    top: 500
}, 500)
  
}
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav()
  } 
  else {
   $(".side-nav-menu").animate({left:"0px"},500)
   $(".open-close-icon").removeClass("fa-align-justify");
   $(".open-close-icon").addClass("fa-x");
   for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({
        top: 0
    }, (i + 5) * 100)
}
  }
})

async function getDefalutData(){
  let response= await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s")
  response = await response.json()
  displayData(response.meals)
}
function displayData(arr){
  let cartoona = ""
for (let i = 0; i <arr.length ; i++) {
  cartoona+=` <div class="col-md-3">
  <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
      <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${arr[i].strMeal}</h3>
      </div>
  </div>
</div>`
  
}
rowData.html(cartoona)
}


function showSearchInputs(){
  rowData.html("")
  searchContainer.html(`<div class="row py-4 ">
  <div class="col-md-6 ">
      <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white " type="text" placeholder="Search By Name">
  </div>
  <div class="col-md-6">
      <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
  </div>
</div>`);
closeSideNav()

}

async function searchByName(word){
  rowData.html("")
  $(".inner-loading-screen").fadeIn(300)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
  response = await response.json()
  displayData(response.meals)
  $(".inner-loading-screen").fadeOut(300)

}

async function searchByFLetter(letter) {
  rowData.html("")
  $(".inner-loading-screen").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
  response = await response.json()
  displayData(response.meals)
  $(".inner-loading-screen").fadeOut(300)

}

async function getCategories() {
  rowData.html("")
  searchContainer.html("")
  $(".inner-loading-screen").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  response = await response.json()
  displayCategories(response.categories)
  // console.log(response.categories);
  $(".inner-loading-screen").fadeOut(300)

}

function displayCategories(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute text-center text-black p-2">
                      <h3>${arr[i].strCategory}</h3>
                      <p>${arr[i].strCategoryDescription}</p>
                  </div>
              </div>
      </div>
      `
  }

  rowData.html(cartoona)
}
async function getCategoryMeals(category){
  rowData.html("")
  $(".inner-loading-screen").fadeIn(300)
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  response = await response.json();
  displayData(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}


async function getArea() {
  rowData.html("")
  searchContainer.html("")
  $(".inner-loading-screen").fadeIn(300)
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  respone = await respone.json()
  displayArea(respone.meals)
  $(".inner-loading-screen").fadeOut(300)

}
function displayArea(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                      <i class="fa-solid fa-house-laptop fa-4x"></i>
                      <h3>${arr[i].strArea}</h3>
              </div>
      </div>
      `
  }
  rowData.html(cartoona)
}

async function getAreaMeals(area) {
  rowData.html("")
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  response = await response.json();
  displayData(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

async function getIngredients() {
  rowData.html("")
  searchContainer.html("")
  $(".inner-loading-screen").fadeIn(300)
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  respone = await respone.json()
  displayIngredients(respone.meals.slice(0, 20))
  $(".inner-loading-screen").fadeOut(300)

}
function displayIngredients(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
      cartoona += `
      <div class="col-md-3">
              <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                      <h3>${arr[i].strIngredient}</h3>
                      <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
              </div>
      </div>
      `
  }
  rowData.html(cartoona)
}

async function getIngredientsMeals(ingredients) {
  rowData.html("")
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  response = await response.json();
  displayData(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
async function getMealDetails(id){
  rowData.html("")
  $(".inner-loading-screen").fadeIn(300);
  let response= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  response = await response.json();
  displayDetailsById(response.meals)
  $(".inner-loading-screen").fadeOut(300);

}
function displayDetailsById(arr){
  searchContainer.html("")
  let strMeasures = ``;

  for (let i = 1; i <= 20; i++) {
    if(arr[0][`strIngredient${i}`]){
      strMeasures += `<li class="alert alert-info m-2 p-1">${arr[0][`strMeasure${i}`]} ${arr[0][`strIngredient${i}`]}</li>`;
    }}
    let strTags= arr[0][`strTags`]
if(arr[0][`strTags`] !== null){
  strTags= strTags.split(",")
  var allStrTags=""
  for( let i=0; i< strTags.length; i++){
    allStrTags+=` <li class="alert alert-danger m-2 p-1">${strTags[i]}</li>`;
}
}else{
  allStrTags=""
}
    $(".inner-loading-screen").fadeIn(300);
    let cartoona=`<div class="col-md-4">
    <img class="w-100 rounded-3" src="${arr[0].strMealThumb}" alt="">
        <h2>${arr[0].strMeal}</h2>
  </div>
  <div class="col-md-8">
                  <h2>Instructions</h2>
                  <p>${arr[0].strInstructions}</p>
                  <h3><span class="fw-bolder">Area : </span>${arr[0].strArea}</h3>
                  <h3><span class="fw-bolder">Category : </span>${arr[0].strCategory}</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${strMeasures}
                  </ul>
  
                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${allStrTags}
          
                  </ul>
  
                  <a target="_blank" href=${arr[0].strSource} class="btn btn-success">Source</a>
                  <a target="_blank" href=${arr[0].strYoutube} class="btn btn-danger">Youtube</a>
              </div>
  `
  rowData.html(cartoona)
  }
function showContacts(){
  rowData.html("")
  searchContainer.html("")
  closeSideNav()
let cartoona = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-75 text-center">
    <div class="row g-4">
        <div class="col-md-6">
            <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                Special characters and numbers not allowed
            </div>
        </div>
        <div class="col-md-6">
            <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                Email not valid *exemple@yyy.zzz
            </div>
        </div>
        <div class="col-md-6">
            <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid Phone Number
            </div>
        </div>
        <div class="col-md-6">
            <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid age
            </div>
        </div>
        <div class="col-md-6">
            <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid password *Minimum eight characters, at least one letter and one number:*
            </div>
        </div>
        <div class="col-md-6">
            <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                Enter valid repassword 
            </div>
        </div>
    </div>
    <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>
</div>`
rowData.html(cartoona)

submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });

}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}





