"use strict";
const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 800;
canvas.height = 500;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

const onMouseMove = function (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

const stopPainting = function (event) {
    painting = false;
}
const startPainting = function (event) {
    painting = true;
}
const onMouseDown = function (event) {
    painting = true;
}
const handleColorClick = function (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}
const handleRangeChange = function (event) {
    const range = event.target.value;
    ctx.lineWidth = range;
}
const handleModeButton = function (event) {

    if (filling == true) {
        filling = false
        mode.innerText = "Fill"

    } else {
        filling = true;
        mode.innerText = "Paint"

    }
}
const handleCM = function (event) {
    event.preventDefault();
}
const handleSaveClick = function () {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.download = "PaintJS[🖌]";
    link.click();
}
if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
    Array.from(colors).forEach((color) =>
        color.addEventListener("click", handleColorClick));
}

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeButton);
}
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}