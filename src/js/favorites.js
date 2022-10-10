import {
  setLocalStorage,
  getLocalStorage,
  createCard,
  removeChildNodesHtmlElement,
  removeAllNodeList,
  dropdownList,
  createElement,
  favBtn,
} from "./functions.js";

const getStorage = getLocalStorage("favCharacters");
let arr = [...getStorage];
let rowNum = 3;

favBtn.forEach((e) =>
  createElement(".fav-view__nav", "button", "fav-view__btn", e)
);

function displayItemCard() {
  arr
    .flat()
    .slice(0, `${rowNum}`)
    .forEach((e) => {
      createCard(
        ".fav-view__card-container",
        "fav-view__card-item",
        "fav-view__card-image",
        e.name,
        e.image,
        "fav-view__card-name",
        e.name,
        "fav-view__card-btn",
        "Remove"
      );
    });
}
displayItemCard();

let nodeName = "";
let NodeNum;

function isBtnClicked() {
  document.querySelectorAll("button").forEach((e, i) => {
    e.onclick = () => {
      nodeName = e.nodeName;
      NodeNum = i;
      const getRemoveBtn = document.querySelector(".fav-view__card-container");
      getRemoveBtn.addEventListener("click", removeCharacter);
    };
  });
}

isBtnClicked();

function removeCharacter(e) {
  if (nodeName === "BUTTON") {
    const cardValue = e.path[1].innerText;
    const index = cardValue.indexOf("\nRemove");
    const names = cardValue.slice(0, index);
    const findObj = arr.flat().map((e) => e.name === names);
    const findIndex = findObj.indexOf(true);
    arr.splice(findIndex, 1);
    removeChildNodesHtmlElement(e.path[1]);

    const getItemCard = document.querySelectorAll(".fav-view__card-item");
    getItemCard[`${NodeNum - 1}`].style.display = "none";

    setLocalStorage("favCharacters", arr);
    arr.length === 0 ? (window.location.href = "index.html") : "";

    nodeName = "";
    NodeNum = "";
  }
}

const selectValue = [1, 3, 5];
const selectOption = document.getElementById("number");
dropdownList("number", selectValue, rowNum);

selectOption.addEventListener("change", getSelectOptionValue);

function getSelectOptionValue() {
  const getItemCard = document.querySelectorAll(".fav-view__card-item");

  rowNum = parseInt(selectOption.value);

  removeAllNodeList(getItemCard);
  displayItemCard();
  isBtnClicked();
}

const homeBtn = document.querySelector(".fav-view__btn");

homeBtn.addEventListener("click", backToHomePage);

function backToHomePage() {
  window.location.href = "index.html";
}
