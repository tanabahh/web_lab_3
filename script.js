const AVAILABLE_X = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

const xValue = [];
function clickX(x) {

    if (xValue.includes(x)) {
        xValue.splice(xValue.indexOf(x), 1);
        x = Math.min(...xValue);

        if (x === Infinity) {
            x = null;

        }
    } else {
        if (AVAILABLE_X.indexOf(x)!=-1){
            xValue.push(x);
        }
    }

    if (xValue.length > 1) {
        x = null;
    }

    //graphView(r);
}

let redrawGraphView = () => graphView(null);

function graphView(r) {
    const canvas = document.getElementById("graph");
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    context.clearRect(0, 0, width, height);
//прямоугольник
    context.beginPath();
    context.rect(0.5*width, 0.04*height, 0.46*width, 0.46*height);
    context.closePath();
    context.strokeStyle = "yellow";
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();

// сектор
    context.beginPath();
    context.moveTo(0.5*width, 0.5*height);
    context.arc(0.5*width, 0.5*height, 0.46*height, Math.PI , 3*Math.PI / 2);
    context.closePath();
    context.strokeStyle = "yellow";
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();

//треугольник
    context.beginPath();
    context.moveTo(0.5*width, 0.5*height);
    context.lineTo(0.73*width, 0.5*height);
    context.lineTo(0.5*width, 0.96*height);
    context.lineTo(0.5*width, 0.5*height);
    context.closePath();
    context.strokeStyle = "yellow";
    context.fillStyle = "yellow";
    context.fill();
    context.stroke();

//отрисовка осей
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.beginPath();
    context.font = "14px Courier New";
    context.moveTo(0.5*width, 0);
    context.lineTo(0.5*width, height);
    context.moveTo(0.5*width, 0);
    context.lineTo(0.49*width, 0.03*height);
    context.moveTo(0.5*width, 0);
    context.lineTo(0.51*width, 0.03*height);
    context.fillText("Y", 0.52*width, 0.02*height);
    context.moveTo(0, 0.5*height);
    context.lineTo(width, 0.5*height);
    context.moveTo(width, 0.5*height);
    context.lineTo(0.97*width, 0.49*height);
    context.moveTo(width, 0.5*height);
    context.lineTo(0.97*width, 0.51*height);
    context.fillText("X", 0.98*width, 0.47*height);

// деления
    const R = r == null ? "R" : r;
    const halfR = r == null ? "R/2" : r / 2;

    context.moveTo(0.49*width, 0.04*height);
    context.lineTo(0.51*width, 0.04*height);
    context.fillText(R, 0.51*width, 0.05*height);
    context.moveTo(0.49*width, 0.27*height);
    context.lineTo(0.51*width, 0.27*height);
    context.fillText(halfR, 0.51*width, 0.28*height);
    context.moveTo(0.49*width, 0.73*height);
    context.lineTo(0.51*width, 0.73*height);
    context.fillText(`-${halfR}`, 0.51*width, 0.74*height);
    context.moveTo(0.49*width, 0.96*height);
    context.lineTo(0.51*width, 0.96*height);
    context.fillText(`-${R}`, 0.51*width,0.97*height);
    context.moveTo(0.04*width, 0.49*height);
    context.lineTo(0.04*width, 0.51*height);
    context.fillText(`-${R}`, 0.03*width, 0.48*height);
    context.moveTo(0.27*width, 0.49*height);
    context.lineTo(0.27*width, 0.51*height);
    context.fillText(`-${halfR}`, 0.26*width, 0.48*height);
    context.moveTo(0.73*width, 0.49*height);
    context.lineTo(0.73*width, 0.51*height);
    context.fillText(halfR, 0.72*width, 0.48*height);
    context.moveTo(0.96*width, 0.49*height);
    context.lineTo(0.96*width, 0.51*height);
    context.fillText(R, 0.95*width, 0.48*height);

    context.closePath();
    context.strokeStyle = "black";
    context.fillStyle = "black";
    context.stroke();
    alert("Draw");
    drawPoints(r, canvas, context);
    redrawGraphView = () => graphView(r);

    if (r != null) {
        alert("if not null");
        canvas.onclick = (event) => {
            alert("onclick");
            const rect = canvas.getBoundingClientRect();
            const visualX = Math.floor(event.clientX - rect.left);
            const visualY = Math.floor(event.clientY - rect.top);

            let centerX = width/2;
            let centerY = height/2;
            let zoomX = width*0.46 / r;
            let zoomY = height*0.46 / r;

            sendForm((visualX - centerX) / zoomX,
                (centerY - visualY) / zoomY);
        };
    }
}



const correctPawImage = new Image();
correctPawImage.src = 'resources/img/correctPaw.png';
const wrongPawImage = new Image();
wrongPawImage.src = 'resources/img/wrongPaw.png';
let points = [];
function drawPoints(r, canvas, context) {
    alert("In draw point");
    const centerX = 250;
    const centerY = 250;

    function drawPoint(point, zoomX, zoomY) {
        const visualX = centerX + point.x * zoomX;
        const visualY = centerY - point.y * zoomY;

        context.drawImage(point.result ? correctPawImage : wrongPawImage, visualX - 15, visualY - 15, 30, 30);
    }

    if (r != null) {
        alert("if not null in point");
        const zoomX = 230 / r;
        const zoomY = 230 / r;

        points.forEach((point) => {
            if (+point.r !== r) {
                return;
            }

            drawPoint(point, zoomX, zoomY);
        });
    } else {
        alert("if null in point");
        points.forEach((point) => {
            const zoomX = 230 / point.r;
            const zoomY = 230 / point.r;

            drawPoint(point, zoomX, zoomY);
        });
    }
}

function sendForm(x,y) {
    document.getElementById("y-input").value=y;
    document.getElementById("x-input").value=x;
    document.getElementById("sbmt").click();
}


graphView(null);
