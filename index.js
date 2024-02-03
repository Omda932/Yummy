let searchContainer = $("#searchContainer");
let rowData = $("#rowData");
$(document).ready(function(){
  getDefalutData();
  $(".loading-screen").fadeOut(500);
  $("body").css("overflow", "visible");
  
});

function closeSideNav() {
  let sidNaveWidth = $(".nav-tab ").innerWidth();

  $(".side-nav-menu").animate({ left: -sidNaveWidth }, 500);
  $(".open-close-icon").removeClass("fa-x");
  $(".open-close-icon").addClass("fa-align-justify");
  $(".links li").animate(
    {
      top: 500,
    },
    500
  );
}
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
    closeSideNav();
  } else {
    $(".side-nav-menu").animate({ left: "0px" }, 500);
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
      $(".links li")
        .eq(i)
        .animate(
          {
            top: 0,
          },
          (i + 5) * 100
        );
    }
  }
});

async function getDefalutData() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s"
  );
  response = await response.json();
  displayData(response.meals);
}
function displayData(arr) {
  let cartoona = "";
  for (let i = 0; i < arr.length; i++) {
    cartoona += ` <div class="col-md-3">
  <div data-id= ${arr[i].idMeal} class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
      <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
      <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
          <h3>${arr[i].strMeal}</h3>
      </div>
  </div>
</div>`;
  }
  rowData.html(cartoona);
  $(".meal").click(function () {
    getMealDetails(this.getAttribute("data-id"));
  });
}

$("#Search").click(function () {
  rowData.html("");
  closeSideNav();
  searchContainer.html(`<div class="row py-4 ">
  <div class="col-md-6 ">
      <input id="sechByname" class="form-control bg-transparent text-white " type="text" placeholder="Search By Name">
  </div>
  <div class="col-md-6">
      <input id="searchByFLetter" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
  </div>
</div>`);

  $("#sechByname").keyup(function () {
    searchByName($("#sechByname").val());
  });

  $("#searchByFLetter").keyup(function () {
    searchByFLetter($("#searchByFLetter").val());
  });
});

async function searchByName(word) {
  rowData.html("");
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
  );
  response = await response.json();
  displayData(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

async function searchByFLetter(letter) {
  rowData.html("");
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  response = await response.json();
  displayData(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

$("#Categories").click(async function getCategories() {
  rowData.html("");
  closeSideNav();
  searchContainer.html("");
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
});

function displayCategories(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-md-3">
              <div data-category= '${arr[i].strCategory}' class="meal_catg meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute text-center text-black p-2">
                      <h3>${arr[i].strCategory}</h3>
                      <p>${arr[i].strCategoryDescription}</p>
                  </div>
              </div>
      </div>
      `;
  }
  rowData.html(cartoona);
  $(".meal_catg").click(function () {
    getCategoryMeals(this.getAttribute("data-category"));
  });
}
async function getCategoryMeals(category) {
  rowData.html("");
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();
  displayData(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

$("#area").click(async function getArea() {
  rowData.html("");
  closeSideNav();
  searchContainer.html("");
  $(".inner-loading-screen").fadeIn(300);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  displayArea(respone.meals);
  $(".inner-loading-screen").fadeOut(300);
});

function displayArea(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-md-3">
              <div data-area=${arr[i].strArea} class="areas rounded-2 text-center cursor-pointer">
                      <i class="fa-solid fa-house-laptop fa-4x"></i>
                      <h3>${arr[i].strArea}</h3>
              </div>
      </div>
      `;
  }
  rowData.html(cartoona);
  $(".areas").click(function () {
    getAreaMeals(this.getAttribute("data-area"));
  });
}

async function getAreaMeals(area) {
  rowData.html("");
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayData(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
$("#ingredients").click(async function getIngredients() {
  rowData.html("");
  closeSideNav();
  searchContainer.html("");
  $(".inner-loading-screen").fadeIn(300);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  displayIngredients(respone.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
});

function displayIngredients(arr) {
  let cartoona = "";

  for (let i = 0; i < arr.length; i++) {
    cartoona += `
      <div class="col-md-3">
              <div data-Ingredients= ${
                arr[i].strIngredient
              } class="ingredient_elments rounded-2 text-center cursor-pointer">
                      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                      <h3>${arr[i].strIngredient}</h3>
                      <p>${arr[i].strDescription
                        .split(" ")
                        .slice(0, 20)
                        .join(" ")}</p>
              </div>
      </div>
      `;
  }
  rowData.html(cartoona);
  $(".ingredient_elments").click(function () {
    getIngredientsMeals(this.getAttribute("data-Ingredients"));
  });
}

async function getIngredientsMeals(ingredients) {
  rowData.html("");
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  displayData(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

async function getMealDetails(id) {
  rowData.html("");
  closeSideNav();
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();
  displayDetailsById(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

function displayDetailsById(arr) {
  searchContainer.html("");
  let strMeasures = ``;

  for (let i = 1; i <= 20; i++) {
    if (arr[0][`strIngredient${i}`]) {
      strMeasures += `<li class="alert alert-info m-2 p-1">${
        arr[0][`strMeasure${i}`]
      } ${arr[0][`strIngredient${i}`]}</li>`;
    }
  }
  let strTags = arr[0][`strTags`];
  if (arr[0][`strTags`] !== null) {
    strTags = strTags.split(",");
    var allStrTags = "";
    for (let i = 0; i < strTags.length; i++) {
      allStrTags += ` <li class="alert alert-danger m-2 p-1">${strTags[i]}</li>`;
    }
  } else {
    allStrTags = "";
  }
  $(".inner-loading-screen").fadeIn(300);
  let cartoona = `<div class="col-md-4">
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
  `;
  rowData.html(cartoona);
}

$("#contact_us").click(function showContacts() {
  rowData.html("");
  searchContainer.html("");
  closeSideNav();
  let cartoona = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
  </div>`;
  rowData.html(cartoona);

  var nameInput = $("#nameInput");
  var emailInput = $("#emailInput");
  var phoneInput = $("#phoneInput");
  var ageInput = $("#ageInput");
  var passwordInput = $("#passwordInput");
  var repasswordInput = $("#repasswordInput");

  nameInput.keyup(function () {
    shoNameMesaage();
  });
  emailInput.keyup(function () {
    showMailMessage();
  });
  ageInput.keyup(function () {
    showAgeMessage();
  });
  phoneInput.keyup(function () {
    showPhoneMessage();
  });
  passwordInput.keyup(function () {
    showpasswordMessage();
  });
  repasswordInput.keyup(function () {
    showRepasswordMessage();
  });
});


function shoNameMesaage () {
  if (nameValidation($("#nameInput").val())== false)
  {
    $("#nameAlert").removeClass("d-none");
    
  } else{
    $("#nameAlert").addClass("d-none");
  }
  inputsValidation()
  }

function showMailMessage(){
  if ( emailValidation($("#emailInput").val())== false)
  {
    $("#emailAlert").removeClass("d-none");
    
  } else{
    $("#emailAlert").addClass("d-none");
  }
  inputsValidation()
}

function showAgeMessage(){
  if ( ageValidation($("#ageInput").val())== false)
{
  $("#ageAlert").removeClass("d-none");
  
} else{
  $("#ageAlert").addClass("d-none");
}
inputsValidation()
}

function showPhoneMessage(){
  if ( phoneValidation($("#phoneInput").val())== false)
  {
    $("#phoneAlert").removeClass("d-none");
    
  } else{
    $("#phoneAlert").addClass("d-none");
  }
  inputsValidation()
}

function showpasswordMessage(){
  if (  passwordValidation($("#passwordInput").val())== false)
  {
    $("#passwordAlert").removeClass("d-none");
    
  } else{
    $("#passwordAlert").addClass("d-none");
  }
  inputsValidation()
}

function showRepasswordMessage(){
  if (  repasswordValidation($("#repasswordInput").val())== false)
  {
    $("#repasswordAlert").removeClass("d-none");
    
  } else{
    $("#repasswordAlert").addClass("d-none");
  }
  inputsValidation()
}


function inputsValidation() {
  if (
    nameValidation($("#nameInput").val()) &&
    emailValidation($("#emailInput").val()) &&
    phoneValidation($("#phoneInput").val()) &&
    ageValidation($("#ageInput").val()) &&
    passwordValidation($("#passwordInput").val()) &&
    repasswordValidation($("#repasswordInput").val())
  ) {
    $("#submitBtn").removeAttr("disabled");
  } else {
    $("#submitBtn").attr("disabled", "true");
  }
}

function nameValidation(value) {
  return /^[a-zA-Z ]+$/.test(value);
}

function emailValidation(value) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );
}

function phoneValidation(value) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    value
  );
}

function ageValidation(value) {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(value);
}

function passwordValidation(value) {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(value);
}

function repasswordValidation(value) {
  return value == $("#passwordInput").val();
}
