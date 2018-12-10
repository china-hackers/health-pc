/* eslint-disable */
let div = document.createElement("div");
div.id = "canvas_hover";
document.body.appendChild(div);
let canvas;
export const addHover = (node, zr, text) => {
    node.on("mouseover", function() {
        if (!canvas) {
            canvas = document.querySelector("canvas");
        }
        let pos = canvas.getBoundingClientRect();
        let x;
        let y;
        let left =
            pos.left + document.documentElement.scrollLeft ||
            document.body.scrollLeft;
        let top =
            pos.top + document.documentElement.scrollTop ||
            document.body.scrollTop;
        if (node._rect) {
            x = left + node.shape.cx + "px";
            y = top + node.shape.cy - 5 + "px";
        } else {
            x = left + node.position[0] + "px";
            y = top + node.position[1] - 5 + "px";
        }
        if (text) {
            div.innerHTML = text;
            div.style.left = x;
            div.style.top = y;
            div.style.display = "block";
        }
    });
    node.on("mouseout", function() {
        div.style.display = "none";
    });
};
