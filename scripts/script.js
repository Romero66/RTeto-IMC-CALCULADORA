class imcEntry {
  constructor(gender, age, weight, height, imc, idealWeight) { // relleno
    this.gender = gender;
    this.age = age;
    this.weight = weight;
    this.height = height;
    this.imc = imc;
    this.idealWeight = idealWeight;
  }
}

const roundNumber = (num, decimals) => { // Función para redondear el número
  let fpoint = parseInt("1" + "0".repeat(decimals));
  return Math.round((num + Number.EPSILON) * fpoint) / fpoint; // Número que retorna
};

const statusBarControl = (imc) => { // Función que genera barra de colores
  const statusBarIndicator = document.querySelector(".status-bar-indicator"); // Localiza div
  const range = [
    [14, 18.5],
    [18.5, 25],
    [25, 30],
    [30, 34.9],
  ];
  const percentajeColor = [
    [0, 21.53],
    [21.53, 52.15],
    [52.15, 75.59],
    [75.59, 100],
  ];
  for (let i = 0; i < range.length; i++) {
    if (imc < 14) {
      statusBarIndicator.style.left = 0; // Asigna posición de la flecha
    }
    else if (imc >= 34.9) {
      statusBarIndicator.style.left = "auto"; // Asigna posición de la flecha
      statusBarIndicator.style.right = 0; // Asigna posición de la flecha
    }
    else if (range[i][0] <= imc && imc < range[i][1]) {
      let innerPercentaje = ((imc - range[i][0]) * 100) / (range[i][1] - range[i][0]);
      let percentaje = (innerPercentaje * (percentajeColor[i][1] - percentajeColor[i][0])) / 100;
      let position = percentajeColor[i][0] + percentaje;

      statusBarIndicator.style.left = `${position}%`; // Asigna posición de la flecha
    }
  }
};

const calcImc = () => { // Función principal
  const resultColors = [
    [14, 18.5, "#1c7ed3"],
    [18.5, 25, "#40bc66"],
    [25, 30, "#faba01"],
    [30, 34.9, "#f3432f"],
  ];
  const resultContainer = document.querySelector(".result-container"); // Localiza el div del resultado
  let gender = document.querySelectorAll(".radio-button"); // Localiza radio-buttoms
  let age = document.getElementById("age").value; // Localiza input age
  let weight = document.getElementById("weight").value; // Localiza input peso
  let height = document.getElementById("height").value; // Localiza input altura

  let resultNumber = document.querySelector(".result-number"); // Localiza el div del resultado
  let idealWeightMessage = document.querySelector(".ideal-weight-message");
  
  let imc = roundNumber(weight / (height * height), 2); // Calcula el imc
  
  let idealWeight = [ // Rango de peso ideal
    roundNumber((height * height) * 18.5, 2), // Peso mínimo ideal
    roundNumber((height * height) * 24.9, 2), // Peso máximo ideal
  ];

  let genderSelected;
  gender.forEach((i) => {
    if (i.checked) { genderSelected = i; } // Asigna el genero seleccionado
  });

  //Este apartado quita el estado oculto de la barra de resultado
  resultContainer.style.display = "block";
  if (imc && imc !== Infinity) { // Valida que imc tenga algún dato y que no sea un número infinito
    statusBarControl(imc); // Llama la función para redondear el número

    for (let i = 0; i < resultColors.length; i++) { // Asigna el color del número del imc
      if (imc < 14) { resultNumber.style.color = resultColors[0][2]; }
      else if (imc > 34.9) { resultNumber.style.color = resultColors[3][2]; }
      else if (resultColors[i][0] <= imc && imc < resultColors[i][1]) { resultNumber.style.color = resultColors[i][2]; }
    }

    resultNumber.innerHTML = imc; // Pasa el número al HTML
    idealWeightMessage.innerHTML = `Peso ideal: ${idealWeight[0]} - ${idealWeight[1]} (KG)`; // Pasa este texto al HTML
    
    if (genderSelected && age) { // Valida que hayan seleccionado un genero y edad
      const imcObject = new imcEntry( // Crea el objeto para guardar en el archivo
        genderSelected.id,
        age,
        weight,
        height,
        imc,
        idealWeight
      );
      const savedData = JSON.parse(localStorage.getItem("dataframe")); // Convierte en un JSON la información existente del archivo de dataFrame
      if (savedData) { // Si el archivo no esta vacio
        savedData.push(imcObject); // Agrega el nuevo objeto a la información anterior
        localStorage.setItem("dataframe", JSON.stringify(savedData)); // Guarda
      }
      else { localStorage.setItem("dataframe", JSON.stringify([imcObject])); } // Si el dataFrame esta vacio, guarda
    }
  } else {
    alert("!!!Mas despacio Velocista¡¡¡, Digita los campos")
    let errorMessage = "Por favor ingrese su estatura y su peso";
    resultNumber.style.color = resultColors[3][2];
    resultNumber.innerHTML = errorMessage;
  }
};

const sendButton = document.querySelector(".send-button"); // Localiza el botón de guardar
sendButton.addEventListener("click", calcImc); // Agrega evento al botón de guardar



function limpiarInput(){
  document.getElementById("gender").value = "";
  document.getElementById("age").value = "";
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
 

}