const loadPhones = async (searchText, datalimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const response = await fetch(url);
  const data = await response.json();
  displayPhone(data.data, datalimit);
};
const displayPhone = (phone, datalimit) => {
  loadSpiner(false);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = " ";
  //limiting the phone showcase
  const showAll = document.getElementById("showAll");
  if (datalimit && phone.length > 10) {
    phone = phone.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  //   if search is invalid
  const notFound = document.getElementById("not-found");
  if (phone.length === 0) {
    notFound.classList.remove("d-none");
  } else {
    notFound.classList.add("d-none");
  }
  //Show all phone Phones
  phone.forEach((element) => {
    console.log(element);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card">
      <img src="${element.image}" class="card-img-top" alt="...">
       <div class="card-body">
       <h5 class="card-title">${element.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in
        to additional content. This content is a little bit longer.</p>
        
        <button onclick="loadDetail('${element.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailModal">Show Detail</button>

        


        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });

  console.log(phone);
};
function processSearch(datalimit) {
  const searchFeild = document.getElementById("search-feild");
  const searchText = searchFeild.value;
  console.log(searchText);
  loadPhones(searchText, datalimit);
  loadSpiner(true);
}
// mouse click
document.getElementById("search-btn").addEventListener("click", function () {
  processSearch(10);
});
// enter clicked
document
  .getElementById("search-feild")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      processSearch(10);
    }
  });
// show all btn
document.getElementById("showall-btn").addEventListener("click", function () {
  processSearch();
});

const spinner = document.getElementById("spinner");
//
const loadSpiner = (isLoading) => {
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else spinner.classList.add("d-none");
};

const loadDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  displayPhoneDetail(data.data);
};
const displayPhoneDetail = (detail) => {
  console.log(detail);
  document.getElementById("showDetailModalLabel").innerText = `${detail.name}`;
  document.getElementById("modal-body").innerHTML = `
  <h4>Main Feature</h4>
  <hr>
  <p>Storage :${
    detail.mainFeatures ? detail.mainFeatures.storage : "No data found"
  }</p>
  <p>Display Size : ${
    detail.mainFeatures ? detail.mainFeatures.displaySize : "No data found"
  }</p>
  <p>Chipset : ${
    detail.mainFeatures ? detail.mainFeatures.chipSet : "No data found"
  }</p>
  <p>Memory : ${
    detail.mainFeatures ? detail.mainFeatures.memory : "No data found"
  }</p>
  `;
};
loadPhones("apple");
