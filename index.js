const step1 = document.querySelector("#step-1");
const step2 = document.querySelector("#step-2");
const step3 = document.querySelector("#step-3");
const totalArea = document.querySelector("#result-area");

let shapeValues = {
  shape: "",
  values: [],
  area: null,
};

console.log(shapeValues);

function hideBlock(node) {
  node.style.display = "none";
}

function displayBlock(node) {
  node.style.display = "flex";
}

//to check if the fields are empty
function checkValues() {
  const blankChecker = (value) => value !== "";
  const inputValue1 = document.querySelector(
    `#${shapeValues.shape}-val1`
  ).value;
  console.log(shapeValues.shape);
  if (shapeValues.shape === "circle" || shapeValues.shape === "square") {
    blankChecker(inputValue1) && shapeValues.values.push(inputValue1); //get input value1
  } else {
    const inputValue2 = document.querySelector(
      `#${shapeValues.shape}-val2`
    ).value; // get input value2
    blankChecker(inputValue1) &&
      blankChecker(inputValue2) &&
      shapeValues.values.push(inputValue1, inputValue2);
  }
  console.log(shapeValues.values);
  return shapeValues.values.length > 0;
}

//calculate area
function calculateArea() {
  switch (shapeValues.shape) {
    case "rectangle":
      return shapeValues.values[0] * shapeValues.values[1];

    case "circle":
      return 3.14 * shapeValues.values[0] * shapeValues.values[0];
    case "square":
      return shapeValues.values[0] ** 2;
    case "ellipse":
      return 3.14 * shapeValues.values[1] * shapeValues.values[0];
    default:
      return 0;
  }
}

function toStepTwo(event) {
  event.preventDefault();
  const selectedRadioB = document.querySelector(`input[name='shape']:checked`);
  const selectedShape = selectedRadioB?.value;

  if (selectedShape) {
    shapeValues.shape = selectedShape;
    selectedRadioB.checked = false;
    hideBlock(step1);
    displayBlock(document.querySelector(`#${selectedShape}`));
    displayBlock(step2);
  } else {
    alert("select a shape");
  }
}

function toStepThree(event) {
  event.preventDefault();
  //check values

  if (checkValues()) {
    hideBlock(step2);
    shapeValues.area = calculateArea().toFixed(2);
    totalArea.innerText = shapeValues.area;
    displayBlock(step3);
  } else {
    alert(`Please check the value`);
  }
}

function toHome(event) {
  event.preventDefault();
  const screen = event.target.id;
  document.querySelector(`#${screen}`).style.display = "none";
  step1.style.display = "flex";
  shapeValues = { shape: "", values: [], area: null };
}
