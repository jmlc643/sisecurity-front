// Referencias a los interruptores y botones
const cam1Switch = document.getElementById("cam1");
const cam2Switch = document.getElementById("cam2");
const cam3Switch = document.getElementById("cam3");
const humiditySwitch = document.getElementById("humidity-check");
const humidityLevelDisplay = document.getElementById("humidity-level");
const lcdLine1 = document.getElementById("lcd-line1");
const lcdLine2 = document.getElementById("lcd-line2");

const backendUrl = 'https://sisecurity.onrender.com/'; // Reemplaza con tu URL del backend

function updateSensorState() {
  axios.get(`${backendUrl}componente-estado/pir`)
    .then(response => {
      const stateSensor = document.getElementById("state-sensor");
      const data = response.data;
      if (data.state === true) {
        stateSensor.textContent = 'Persona sospechosa detectada';
      } else if (data.state === false) {
        stateSensor.textContent = 'Apagado';
      } else {
        stateSensor.textContent = 'Estado desconocido';
      }
    })
    .catch(error => {
      console.error('Error al obtener el estado:', error);
    });
}

// Llama a la función cada 1 segundo
setInterval(updateSensorState, 1000);

function updateRFIDState() {
  axios.get(`${backendUrl}componente-estado/rfid`)
    .then(response => {
      const stateSensor = document.getElementById("state-rfid");
      const data = response.data;
      if (data.state === true) {
        stateSensor.textContent = 'Desactivado';
      } else if (data.state === false) {
        stateSensor.textContent = 'Activado';
      } else {
        stateSensor.textContent = 'Estado desconocido';
      }
    })
    .catch(error => {
      console.error('Error al obtener el estado:', error);
    });
}

// Llama a la función cada 1 segundo
setInterval(updateRFIDState, 1000);




// Funciones de activación/desactivación de cámaras
function toggleCamera(camera, isActive) {
    console.log(`${camera} ${isActive ? "Activada" : "Desactivada"}`);
    // Actualizar LCD (ejemplo de mensaje)
    lcdLine1.textContent = `Estado: ${camera}`;
    lcdLine2.textContent = isActive ? "Activada" : "Desactivada";
}

// Función para activar/desactivar sensor de humedad
function toggleHumiditySensor(isActive) {
    if (isActive) {
        const humidityLevel = Math.floor(Math.random() * 100) + 1;
        humidityLevelDisplay.textContent = `Nivel de Humedad: ${humidityLevel}%`;
        lcdLine1.textContent = "Sensor de Humedad";
        lcdLine2.textContent = `Humedad: ${humidityLevel}%`;
    } else {
        humidityLevelDisplay.textContent = "Nivel de Humedad: --%";
        lcdLine1.textContent = "Sensor de Humedad";
        lcdLine2.textContent = "Desactivado";
    }
}


// Event listeners para interruptores de cámaras y humedad
cam1Switch.addEventListener("change", () => toggleCamera("Cámara 1", cam1Switch.checked));
cam2Switch.addEventListener("change", () => toggleCamera("Cámara 2", cam2Switch.checked));
cam3Switch.addEventListener("change", () => toggleCamera("Cámara 3", cam3Switch.checked));
humiditySwitch.addEventListener("change", () => toggleHumiditySensor(humiditySwitch.checked));