const url = "https://jsonplaceholder.typicode.com/users";
let count = -1;
const div = document.createElement("div");
const buttonPlus = document.querySelector(".buttonPlus");
const buttonMinus = document.querySelector(".buttonMinus");
const getInputValue = document.querySelector("input");
const buttonValueInput = document.querySelector(".getValueInput");

buttonValueInput.addEventListener("click", () => {
  count = Number(getInputValue.value) - 1;
  addDiv();
});

buttonPlus.addEventListener("click", () => {
  count++;
  addDiv();
});
buttonMinus.addEventListener("click", () => {
  count--;
  addDiv();
});

function addDiv() {
  fetch(url)
    .then((data) => data.json())
    .then((result) => createContent(result, objRecurs))
    .catch((error) => console.log("ERROR" + error));
}

const objRecurs = (obj) => {
  const myNewTagP = document.createElement("p");
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      const setNewUl = document.createElement("ul");
      setNewUl.innerHTML = `${key}:`;
      if (count % 2 == 0) {
        setNewUl.classList.add("newClassOne");
      } else {
        setNewUl.classList.add("newClassTwo");
      }
      div.appendChild(setNewUl);
      objRecurs(obj[key]);
    } else {
      const setNewLi = document.createElement("li");
      if (key === "id") {
        myNewTagP.innerHTML = `Number:${obj["id"]}`;
        myNewTagP.style = "text-align: center;";
        setNewLi.style = "display:none";
      } else {
        setNewLi.innerHTML = `${key}:${obj[key]}`;
      }
      div.appendChild(setNewLi);
    }
  }
  div.appendChild(myNewTagP);
};

const createContent = (result, callback) => {
  div.innerHTML = "";
  if (count < 0) count = result.length - 1;
  if (count > result.length - 1) count = 0;
  callback(result[count]);
  document.body.appendChild(div);
};
