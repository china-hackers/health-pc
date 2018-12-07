<template lang="pug">
.comp-render(:style="{height:`${this.height}px`}")
    canvas(ref="canvas")
</template>

<script>
import zrender from "zrender";
import bus from "@/lib/bus";
import { chartData } from "../mock/data";
export default {
    props: {
        height: {
            type: Number,
            default: 400
        },
        xSplit: {
            type: Number,
            default: 6
        },
        heightCount: {
            type: Number,
            default: 50
        }
    },
    data() {
        return {
            width: 0
        };
    },
    methods: {
        getX(time) {
            return time * (this.width / (24 * 7));
        },
        getY(value, cellMin, cellSplit) {
            let max = cellMin + cellSplit * this.heightCount;
            let realY =
                ((max - value) / cellSplit) * (this.height / this.heightCount);
            return realY;
        },
        drawGrid() {
            let xCount =
                (this.width - (this.xSplit * 7 - 1)) / (this.xSplit * 7);
            for (let i = 1; i < this.xSplit * 7; i++) {
                let line = new zrender.Line({
                    shape: {
                        x1: i * xCount + i - 1,
                        y1: 0,
                        x2: i * xCount + i - 1,
                        y2: this.height
                    },
                    style: {
                        stroke: "#000"
                    }
                });
                this.zr.add(line);
            }

            let yCount =
                (this.height - (this.heightCount - 1)) / this.heightCount;
            for (let i = 1; i < 50; i++) {
                let line = new zrender.Line({
                    shape: {
                        x1: 0,
                        y1: i * yCount + i - 1,
                        x2: this.width,
                        y2: i * yCount + i - 1
                    },
                    style: {
                        stroke: "#000"
                    }
                });
                this.zr.add(line);
            }
        },
        drawLine(data) {
            let cellMin = data.cellMin;
            let cellSplit = data.cellSplit;
            let color = data.color;
            data.array.forEach((item, index) => {
                let circle = new zrender.Circle({
                    shape: {
                        cx: this.getX(item.time),
                        cy: this.getY(item.value, cellMin, cellSplit),
                        r: 3
                    },
                    style: {
                        fill: color
                    }
                });
                this.zr.add(circle);
                if (index >= 1) {
                    let preItem = data.array[index - 1];
                    if (preItem.break !== true) {
                        let line = new zrender.Line({
                            shape: {
                                x1: this.getX(preItem.time),
                                y1: this.getY(
                                    preItem.value,
                                    cellMin,
                                    cellSplit
                                ),
                                x2: this.getX(item.time),
                                y2: this.getY(item.value, cellMin, cellSplit)
                            },
                            style: {
                                stroke: color
                            }
                        });
                        this.zr.add(line);
                    }
                }
            });
        },
        drawArea(data) {
            let cellMin = data.cellMin;
            let cellSplit = data.cellSplit;
            let color = data.color;
            let bgColor = data.bgColor;
            let array = data.array;
            let points = [];
            array.forEach(item => {
                let x = this.getX(item.time);
                let y = this.getY(item.v1, cellMin, cellSplit);
                let y2 = this.getY(item.v2, cellMin, cellSplit);
                let circle = new zrender.Circle({
                    shape: {
                        cx: x,
                        cy: y,
                        r: 3
                    },
                    style: {
                        fill: color
                    }
                });
                let circle2 = new zrender.Circle({
                    shape: {
                        cx: x,
                        cy: y2,
                        r: 3
                    },
                    style: {
                        fill: color
                    }
                });
                let line = new zrender.Line({
                    shape: {
                        x1: x,
                        y1: y,
                        x2: x,
                        y2: y2
                    },
                    style: {
                        stroke: color
                    }
                });
                this.zr.add(circle);
                this.zr.add(circle2);
                this.zr.add(line);
                points.push([x, y]);
            });
            array.reverse().forEach(item => {
                let x = this.getX(item.time);
                let y = this.getY(item.v2, cellMin, cellSplit);
                points.push([x, y]);
            });
            let poly = new zrender.Polygon({
                shape: {
                    points: points
                },
                style: {
                    fill: bgColor
                }
            });
            let polyline = new zrender.Polyline({
                shape: {
                    points: points
                },
                style: {
                    stroke: color
                }
            });
            this.zr.add(poly);
            this.zr.add(polyline);
        },
        drawTag(data) {
            let cellMin = data.cellMin;
            let cellSplit = data.cellSplit;
            let color = data.color;
            let text = data.text;
            let array = data.array;
            let y = data.y;
            array.forEach(item => {
                var g = new zrender.Group();
                g.position[0] = this.getX(item.time) - 5;
                g.position[1] = this.getY(y, cellMin, cellSplit) - 5;
                g.add(
                    new zrender.Circle({
                        shape: {
                            cx: 5,
                            cy: 5,
                            r: 8
                        },
                        style: {
                            fill: `rgba(255,255,255,1)`,
                            stroke: color
                        }
                    })
                );
                g.add(
                    new zrender.Text({
                        style: {
                            text: text,
                            textAlign: "center",
                            textVerticalAlign: "middle",
                            textFill: color
                        },
                        position: [5, 5]
                    })
                );
                this.zr.add(g);
            });
        },
        drawText(data) {
            let text = new zrender.Text({
                style: {
                    text: data.text,
                    textAlign: "left",
                    textVerticalAlign: "middle",
                    textFill: data.color,
                    textStroke: "#fff",
                    fontWeight: "bold",
                    textShadowColor: "#fff"
                },
                position: [this.getX(data.time), 50]
            });
            this.zr.add(text);
        },
        async getData() {
            // try {
            //     let { data } = await this.$http.get("");
            // } catch (error) {
            //     console.log(error);
            // }
            let data = chartData;
            this.drawGrid();
            data.forEach(item => {
                if (item.type === "line") {
                    this.drawLine(item);
                } else if (item.type === "area") {
                    this.drawArea(item);
                } else if (item.type === "tag") {
                    this.drawTag(item);
                } else if (item.type === "text") {
                    this.drawText(item);
                }
            });
        }
    },
    mounted() {
        let canvas = this.$refs["canvas"];
        this.width = canvas.offsetWidth;
        this.zr = zrender.init(canvas, {
            devicePixelRatio: window.devicePixelRatio,
            width: this.width,
            height: this.height
        });
        bus.$on("config_data_ready", () => {
            this.getData();
        });
    }
};
</script>

<style lang="scss" scoped>
.comp-render {
    height: 100%;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
