/**
 * watermark component by canvas
 */
'use strict';

// 默认配置参数
let defaultParams = {
    container: 'body', // 添加水印的容器，可以配置body或者容器的id
    font: '28px microsoft yahei', // 水印的字体及大小
    fillStyle: 'rgba(255,0,0,0.3)', // 颜色
    text: '这是一个水印', // 水印内容
    x: 20, // x轴起始位置
    y: 30, // y轴起始位置
    width: 200, // 单个文字容器的宽度
    height: 120, // 单个文字容器的高度
    rotationAngle: 20 // 文字旋转角度
};

let Pawatermark = function({
    container = defaultParams.container
    ,font = defaultParams.font
    ,fillStyle = defaultParams.fillStyle
    ,text = defaultParams.text
    ,x = defaultParams.x
    ,y = defaultParams.y
    ,width = defaultParams.width
    ,height = defaultParams.height
    ,rotationAngle = defaultParams.rotationAngle
} = defaultParams) {
    this.config = {
        container: container,
        font: font,
        fillStyle: fillStyle,
        text: text,
        x: x,
        y: y,
        width: width,
        height: height,
        rotationAngle: rotationAngle
    };
    this.init();
};

Pawatermark.prototype.init = function() {
    let el;
    if (this.config.container === 'body') {
        el = document.body;
    } else {
        el = document.getElementById(this.config.container);
    }
    let elRectParams = el.getBoundingClientRect();

    // 创建文档片段
    let docfrag = document.createDocumentFragment();

    // 创建一个小的画布
    let itemCanvas = document.createElement('canvas');
    itemCanvas.style.display = "none";
    itemCanvas.id = "item_canvas";
    itemCanvas.height = this.config.height;
    itemCanvas.width = this.config.width;
    this.ctxItem = itemCanvas.getContext('2d');
    docfrag.appendChild(itemCanvas);

    // 创建一个全局画布，用来重复平铺小签名画布
    let repeatCanvas = document.createElement('canvas');
    repeatCanvas.id = "pa_watermark_canvas";
    repeatCanvas.height = elRectParams.height;
    repeatCanvas.width = elRectParams.width;
    repeatCanvas.style.cssText = "position: absolute; z-index: -1; top: 0; left: 0;"
    this.ctxRepeat = repeatCanvas.getContext("2d");

    this.itemCanvas = itemCanvas;
    this.repeatCanvas = repeatCanvas;

    docfrag.appendChild(repeatCanvas);

    document.body.append(docfrag);

    this.baseWidth = elRectParams.width;
    this.baseHeight = elRectParams.height;

    this.drawText({
        font: this.config.font, 
        fillStyle: this.config.fillStyle, 
        text: this.config.text, 
        x: this.config.x, 
        y: this.config.y, 
        width: this.config.width,
        height: this.config.height,
        rotationAngle: this.config.rotationAngle
    });
}

Pawatermark.prototype.drawText = function(data) {
    let result = Object.assign(this.config, data);
    let cw = this.ctxRepeat, ctxr = this.ctxItem;
    ctxr.clearRect(0, 0, result.width, result.height);
    ctxr.font = result.font;
    ctxr.fillStyle = result.fillStyle;
    ctxr.rotate(result.rotationAngle * Math.PI/180);
    ctxr.fillText(result.text, result.x, result.y);
    ctxr.rotate( -(result.rotationAngle * Math.PI/180));

    cw.clearRect(0, 0, this.baseWidth, this.baseHeight);
    let pat = cw.createPattern(this.itemCanvas, "repeat");
    cw.fillStyle = pat;
    cw.fillRect(0, 0, this.baseWidth, this.baseHeight);
}

let getSingle = (function() {
    let instance;
    return function(config = {}) {
        if (!instance) {
            // 实例化对象
            instance = new Pawatermark(config);
        } else {
            // 实例已存在则只更新状态
            instance.drawText(config);
        }
    }
})();

export default getSingle;
