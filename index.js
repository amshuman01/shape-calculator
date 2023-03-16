const step1 = document.querySelector("#step-1");
const step2 = document.querySelector("#step-2");
const step3 = document.querySelector("#step-3");
const totalArea = document.querySelector("#result-area");
const shapeSelection = document.querySelectorAll("#shape");
const inputValues = document.querySelector("#shape-values");

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

function setInputValues(text) {
  inputValues.innerText = text;
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

//calculate area and set input values in result page
function calculateArea() {
  switch (shapeValues.shape) {
    case "rectangle":
      setInputValues(
        `length ${shapeValues.values[0]} units and breadth ${shapeValues.values[1]} units`
      );
      return shapeValues.values[0] * shapeValues.values[1];

    case "circle":
      setInputValues(`radius ${shapeValues.values[0]} units`);
      return 3.14 * shapeValues.values[0] * shapeValues.values[0];
    case "square":
      setInputValues(`sides ${shapeValues.values[0]} units`);
      return shapeValues.values[0] ** 2;
    case "ellipse":
      setInputValues(
        `Minor-Axis ${shapeValues.values[0]} units and Major-Axis ${shapeValues.values[1]} units`
      );
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
    shapeSelection.forEach((node) => (node.innerText = shapeValues.shape));

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
  hideBlock(document.querySelector(`#${shapeValues.shape}`));
  document.querySelector(`#${screen}`).style.display = "none";
  displayBlock(step1);
  shapeValues = { shape: "", values: [], area: null };
}
