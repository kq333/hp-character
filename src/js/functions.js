const BtnsName = [
  "All students",
  "Gryffindor",
  "Slytherin",
  "Hufflepuff",
  "Ravenclaw",
  "Favorites",
];
const favBtn = ['home'];

async function getFetchData(param) {
  try {
    return await axios.get(param);
  } catch (error) {
    console.log(error);
  }
}

function createElement(node, elemType, className, text) {
  const getElem = document.querySelector(node);
  const createElem = document.createElement(elemType);
  createElem.innerText = text;
  createElem.classList = className;
  getElem.appendChild(createElem);
}

function createImage(node, className, path) {
  const getElem = document.querySelector(node);
  const createElem = document.createElement("img");
  createElem.src = path;
  createElem.classList = className;
  getElem.appendChild(createElem);
}

const findHouse = (arr, param, elem) => arr.filter((e) => e[param] === elem);

const sortByNumbers = (arr, param, boolean) =>
  arr.sort((a, b) => (boolean ? a[param] - b[param] : b[param] - a[param]));

const sortByString = (arr, param, boolean) =>
  arr.sort((a, b) =>
    boolean
      ? a[param].localeCompare(b[param])
      : b[param].localeCompare(a[param])
  );

function validateApiObject(arr, param, name) {
  const checkValue = arr.map((elem) =>
    elem[param] == "" ? { ...elem, [param]: name } : elem
  );
  return checkValue;
}

function removeChildNodesHtmlElement(elem) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

function validateClickedCharacter(arr1, arr2) {
  let clickedModalName = "";
  let isValuesTrue = false;

  arr1.forEach((e) => (clickedModalName = e.name));
  const isNameTheSame = arr2.flat().map((e) => e.name === clickedModalName);

  const isActive = isNameTheSame.filter((e) => (e === true ? true : false));

  isActive.forEach((e) => (isValuesTrue = e));

  return isValuesTrue;
}

const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

function createCard(
  node,
  cardClass,
  ImgWrapperClass,
  imageName,
  image,
  nameWrapperClass,
  name,
  btnClass,
  btnName
) {
  const list = document.querySelector(node);
  const createCard = document.createElement("div");

  const createImgWrapper = document.createElement("div");
  const createNameWrapper = document.createElement("div");

  const createImg = document.createElement("img");
  const createBtn = document.createElement("button");

  list.appendChild(createCard);
  createCard.classList = cardClass;

  createCard.appendChild(createImgWrapper);
  createImgWrapper.appendChild(createImg);

  createImgWrapper.classList = ImgWrapperClass;
  createImg.alt = imageName;
  createImg.src = image;

  createCard.appendChild(createNameWrapper);
  createNameWrapper.classList = nameWrapperClass;
  createNameWrapper.innerHTML = name;

  createCard.appendChild(createBtn);
  createBtn.classList = btnClass;
  createBtn.innerHTML = btnName;
  createBtn.type = "button";
}

function removeAllNodeList(nodeList) {
  for (const elem of nodeList) {
    elem.remove();
  }
}

function dropdownList(id, arr, num) {
  let select, option;

  select = document.getElementById(id);
  for (let i = 0; i < arr.length; ++i) {
    option = document.createElement("option");
    option.value = option.text = arr[i];
    select.add(option);

    [...document.getElementById("number").options].map(
      (e) => (e.selected = e.value == num)
    );
  }
}

export {
  createElement,
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
  getFetchData,
  createCard,
  removeAllNodeList,
  dropdownList,
  favBtn
};
