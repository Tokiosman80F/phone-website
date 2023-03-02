const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const response = await fetch(url);
  const data = await response.json();
  displayPhone(data.data);
};
const displayPhone = (phone) => {
  loadSpiner(false);
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = " ";
  //limiting the phone showcase
  phone = phone.slice(0, 5);
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
     </div>
    </div>
    `;
    phoneContainer.appendChild(phoneDiv);
  });

  console.log(phone);
};

document.getElementById("search-btn").addEventListener("click", function () {
  const searchFeild = document.getElementById("search-feild");
  const searchText = searchFeild.value;
  console.log(searchText);
  loadPhones(searchText);
  loadSpiner(true);
});

const spinner = document.getElementById("spinner");
//
const loadSpiner = (isLoading) => {
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else spinner.classList.add("d-none");
};
