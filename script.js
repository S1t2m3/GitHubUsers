const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#btn");
const container = document.querySelector(".container");

async function searchUsers(searchValue) {
  container.innerHTML="<h1>Loading...</h1>";
  try{
    const response=await fetch(
      `https://api.github.com/search/users?q=${searchValue}`);
    if(!response.ok)
      throw new Error("Failed to fetch data");
    const data=await response.json();
    if(data.items.length===0)
      throw new Error("No User Found!");
    
    container.innerHTML="";
    data.items.forEach((user) => {
    const card=document.createElement("div");
    card.classList.add("card");

    card.innerHTML=`
      <img src="${user.avatar_url}" alt="${user.login}">
      <h2 class="name">${user.login}</h2>
      <a href="${user.html_url}" target="_blank">
        ➡️View Profile
      </a>
    `;
    container.appendChild(card);
  });

  }  
  catch(error){
    container.textContent=error.message;
  }
}

searchBtn.addEventListener("click",()=>{
  const value=searchInput.value.trim();
  if (value) {
    searchUsers(value);
  }
});


searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

