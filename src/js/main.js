import {
  createElement,
  getFetchData,
  BtnsName,
  findHouse,
  sortByNumbers,
  sortByString,
  createImage,
  validateApiObject,
  removeChildNodesHtmlElement,
  validateClickedCharacter,
  setLocalStorage,
  getLocalStorage,
} from "./functions.js";

window.onload = () => {
  const isLocalStorageEmpty = getLocalStorage("favCharacters");

  disableModalBackground();

  isLocalStorageEmpty !== null && savedFavotitesCharacter.length === 0
    ? (savedFavotitesCharacter = isLocalStorageEmpty)
    : "";
};

BtnsName.forEach((e) =>
  createElement(".main-page__nav-btns", "button", "main-page__btn", e)
);

let currentCharactersData = [];
let savedFavotitesCharacter = [];
let modalCharactersData;
let clickedHouse = "";

const getBtnName = document.querySelector(".main-page__nav-btns");

const getFavoritesBtn = document.querySelectorAll(".main-page__nav-btns")[0]
  .lastChild;

getBtnName.addEventListener("click", getNames);

function getNames(e) {
  e.target.innerText === "All students"
    ? (clickedHouse = "hogwartsStudent")
    : (clickedHouse = e.target.innerText);

  e.target.innerText === "Favorites"
    ? getFavoritesBtn / addEventListener("click", goToFavoritesPage)
    : "";

  runFetch();
}

function disabledFavoritesBtn() {
  const localStorageValue = getLocalStorage("favCharacters");

  localStorageValue === null || localStorageValue.length === 0
    ? (getFavoritesBtn.disabled = true)
    : (getFavoritesBtn.disabled = false);
}

disabledFavoritesBtn();

function goToFavoritesPage() {
  window.location.href = "favorites.html";
}

async function runFetch() {
  const getData = await getFetchData(
    "https://hp-api.herokuapp.com/api/characters"
  );

  const charactersData = getData.data;

  const completeApiImageValue = validateApiObject(
    charactersData,
    "image",
    "/src/images/avatarIcon.svg"
  );

  clickedHouse === "hogwartsStudent"
    ? (currentCharactersData = findHouse(
        completeApiImageValue,
        clickedHouse,
        true
      ))
    : (currentCharactersData = findHouse(
        completeApiImageValue,
        "house",
        clickedHouse
      ));

  tableData();
  showTable();
}

const getTableBody = document.querySelector(".main-page__table-data");

function tableData() {
  let dataHTML = "";

  currentCharactersData.forEach((e) => {
    dataHTML += `<tr><td>${e.name}</td><td>${e.yearOfBirth}</td><td>${e.house}</td><td>${e.wizard}</td><td>${e.ancestry}</td><td>${e.hogwartsStudent}</td></tr>`;
  });

  getTableBody.innerHTML = dataHTML;
}

const getTable = document.querySelector(".main-page__table");

function showTable() {
  const isEmpty = currentCharactersData.length;

  isEmpty <= 0
    ? (getTable.style.display = "none")
    : (getTable.style.display = "block");
}

showTable();

getTable.addEventListener("click", sortTable);

const tableHeader = document.querySelectorAll("th");

window.addEventListener("DOMContentLoaded", (event) => {
  [...tableHeader].forEach((el, i) =>
    el.addEventListener("mouseover", function (e) {
      e.target.innerText === "Name"
        ? tableHeader[i].classList.add("hover-style")
        : "";

      e.target.innerText === "Date of birth"
        ? tableHeader[i].classList.add("hover-style")
        : "";

      e.target.innerText === "House"
        ? tableHeader[i].classList.add("hover-style")
        : "";
    })
  );
});

let sortDirection = false;

function sortTable(e) {
  e.target.innerText === "Name"
    ? (currentCharactersData = sortByString(
        currentCharactersData,
        "name",
        sortDirection
      ))
    : "";

  e.target.innerText === "Date of birth"
    ? (currentCharactersData = sortByNumbers(
        currentCharactersData,
        "yearOfBirth",
        sortDirection
      ))
    : "";

  e.target.innerText === "House"
    ? (currentCharactersData = sortByString(
        currentCharactersData,
        "house",
        sortDirection
      ))
    : "";

  sortDirection ? (sortDirection = false) : (sortDirection = true);

  tableData();
}

getTableBody.addEventListener("click", modalData);

function modalData(e) {
  const rowsData = e.target.parentNode.innerText;
  const findIndex = rowsData.indexOf("\t");
  const getClickedName = rowsData.slice(0, findIndex);
  const charactersData = findHouse(
    currentCharactersData,
    "name",
    getClickedName
  );

  modalCharactersData = charactersData;

  charactersData.forEach((e) => {
    createImage(".main-page__modal-content", "main-page__modal-image", e.image);
    createElement(
      ".main-page__modal-content",
      "div",
      "main-page__modal-name",
      e.name
    );
    createElement(
      ".main-page__modal-content",
      "div",
      "main-page__modal-date-of-birth",
      e.yearOfBirth
    );
    createElement(
      ".main-page__modal-content",
      "div",
      "main-page__modal-house",
      e.house
    );
  });

  createElement(
    ".main-page__modal-buttons",
    "button",
    "main-page__modal-to-favorites",
    "save"
  );
  createElement(
    ".main-page__modal-buttons",
    "button",
    "main-page__modal-remove-favorites",
    "remove from fav"
  );
  createElement(
    ".main-page__modal-buttons",
    "button",
    "main-page__modal-close-modal",
    "X"
  );

  const getBtnFavorites = document.querySelector(
    ".main-page__modal-to-favorites"
  );
  const getCloseModalBtn = document.querySelector(
    ".main-page__modal-close-modal"
  );
  const getRemoveFromfavBtn = document.querySelector(
    ".main-page__modal-remove-favorites"
  );

  getBtnFavorites.addEventListener("click", saveCharacterToFavorites);
  getCloseModalBtn.addEventListener("click", closeModal);
  getRemoveFromfavBtn.addEventListener("click", removeDataFromFavorites);

  getLocalStorage("favCharacters") === null
    ? validateClickedCharacter(modalCharactersData, savedFavotitesCharacter)
      ? (getBtnFavorites.disabled = true)
      : (getBtnFavorites.disabled = false)
    : validateClickedCharacter(
        modalCharactersData,
        getLocalStorage("favCharacters")
      )
    ? (getBtnFavorites.disabled = true)
    : (getBtnFavorites.disabled = false);

  getLocalStorage("favCharacters") === null
    ? validateClickedCharacter(modalCharactersData, savedFavotitesCharacter)
      ? (getRemoveFromfavBtn.disabled = false)
      : (getRemoveFromfavBtn.disabled = true)
    : validateClickedCharacter(
        modalCharactersData,
        getLocalStorage("favCharacters")
      )
    ? (getRemoveFromfavBtn.disabled = false)
    : (getRemoveFromfavBtn.disabled = true);

  getModalContainer.style.display = "block";
  getModalContainer.classList.toggle("modal");
}

const getModal = document.querySelector(".main-page__modal-content");
const getModalBnts = document.querySelector(".main-page__modal-buttons");
const getModalContainer = document.querySelector(".main-page__modal");

function disableModalBackground() {
  getModalContainer.style.display = "none";
}

function saveCharacterToFavorites() {
  savedFavotitesCharacter.push(modalCharactersData);
  removeChildNodesHtmlElement(getModal);
  removeChildNodesHtmlElement(getModalBnts);
  setLocalStorage("favCharacters", savedFavotitesCharacter);
  disabledFavoritesBtn();
  getModalContainer.style.display = "none";
}

function closeModal() {
  removeChildNodesHtmlElement(getModal);
  removeChildNodesHtmlElement(getModalBnts);
  modalCharactersData = "";
  getModalContainer.style.display = "none";
}

function removeDataFromFavorites() {
  let characterName = "";
  modalCharactersData.forEach((e) => (characterName = e.name));
  const isCharacterAddedToFav = savedFavotitesCharacter
    .flat()
    .map((e) => e.name === characterName);

  let findIndex = isCharacterAddedToFav.indexOf(true);
  savedFavotitesCharacter.splice(findIndex, 1);
  setLocalStorage("favCharacters", savedFavotitesCharacter);

  closeModal();
  disabledFavoritesBtn();
  getModalContainer.style.display = "none";
}
