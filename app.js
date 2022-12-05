const getData = fetch("testimonial.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((dataObj) => {
      let parent = document.getElementById("what-they-said");
      let div1 = document.createElement("div");
      div1.setAttribute("class", "said");
      div1.innerHTML = `<div class="said-image-content">
              <img src="${dataObj.image}" alt="Image of Sifat Hasan">
              <div class="said-names">
                <h5>${dataObj.name}</h5>
                <h6>${dataObj.designation}</h6>
              </div>
            </div>
            <p>${dataObj.words}</p>
            `;
      parent.appendChild(div1);
    });
  });




function openNav() {
  document.getElementById("side-bar").style.width = "300px";
}
function closeNav() {
  document.getElementById("side-bar").style.width = "0";
}



function menuPopUp() {
  var dropdown = document.querySelectorAll(".dropdown-sub-menu");
  console.log(dropdown)
  dropdown.forEach(button => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      console.log(dropdownContent)

      dropdownContent.style.display === "block"
        ? (dropdownContent.style.display = "none")
        : (dropdownContent.style.display = "block");

    })
  });
}


let sideMenu = async () => {
  await fetch("side_menu.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      createMainHeader(data);
      createSubMenu(data);

    });
};

sideMenu();

function createMainHeader(data) {
  let parent = document.getElementById("menu-wrapper");
  data.forEach((menuObject) => {
    let div1 = document.createElement("div");
    div1.setAttribute("class", "main-menu-wrapper");
    div1.setAttribute("id", `${menuObject.main_menu}-wrapper-id`);

    const icon = document.createElement("i");
    icon.setAttribute("class", "fa-sharp fa-solid fa-chevron-down dropdown");

    const anchorTag = document.createElement("a");
    anchorTag.setAttribute("class", "main-menu-header dropdown-sub-menu");
    anchorTag.setAttribute("id", `${menuObject.main_menu}-main-menu`);
    menuObject.main_menu === "Our Locations" && anchorTag.setAttribute("href", 'https://ajukrishnan-qburst.github.io/location_page/')
    anchorTag.innerHTML = menuObject.main_menu;
    menuObject.side_menu && anchorTag.appendChild(icon);
    div1.appendChild(anchorTag);
    parent.appendChild(div1);
  });
}

function createSubMenu(data) {
  data.forEach((menuObject) => {
    let parent = document.getElementById(`${menuObject.main_menu}-wrapper-id`);
    let anchorTag;
    let div1 = document.createElement("div");
    div1.setAttribute("class", "sub-menu-container");
    div1.setAttribute("id", `${menuObject.main_menu}-sub-menu-container`);
    menuObject.side_menu &&
      menuObject.side_menu.forEach((subMenuObject) => {
        anchorTag = document.createElement("a");
        anchorTag.setAttribute("class", "sub-item");
        anchorTag.innerHTML = subMenuObject.name;
        div1.appendChild(anchorTag);
      });
    menuObject.side_menu && parent.appendChild(div1);
  });
  menuPopUp();
}
