const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const videoElement = document.getElementById("videoElement");

// opacity
const opacity = document.getElementById("opacity");
const toDraw = document.getElementById("toDraw");

startButton.addEventListener("click", async () => {
    console.log("start");
    try {
        videoElement.style.backgroundColor = "#4cd137";
        toDraw.style.opacity = `0.3`;
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;
    } catch (error) {
        console.error("Error accessing camera:", error);
    }
});

stopButton.addEventListener("click", async () => {
    console.log("stop");
    videoElement.style.backgroundColor = "tomato";
    try {
        toDraw.style.opacity = `0`;
        const stream = videoElement.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoElement.srcObject = null;
        }
    } catch (error) {
        console.error("Error stopping camera:", error);
  }
});

opacity.addEventListener("input", updateNumber);

function updateNumber() {
  const inputNumber = parseFloat(opacity.value);
  if (!isNaN(inputNumber)) {
    toDraw.style.opacity = `${inputNumber}`;
    if (inputNumber > 0) {
      numberElement.style.color = "green";
    } else if (inputNumber < 0) {
      numberElement.style.color = "red";
    } else {
      numberElement.style.color = "black";
    }
  }
}

// Feature to add custom files
const custom_image = document.getElementById("custom_image");

custom_image.addEventListener("change", function (event) {
    const file = event.target.files[0];
  
    if (file && (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg")) {
        const reader = new FileReader();
    
        reader.onload = function (e) {
            const imgData = e.target.result;
            const img = new Image();
      
            img.onload = function () {
                toDraw.src = imgData;
            };
      
            img.src = imgData;
        };
    
        reader.readAsDataURL(file);
    } else {
        alert("Please select a valid JPEG or PNG image.");
    }
});
