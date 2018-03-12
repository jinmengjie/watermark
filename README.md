### H5页面水印

#### 使用方法

下载源脚本文件`./src/watermark.js`

```javascript
    import watermark from './src/watermark';
    // 自定义配置参数
    let config = {
        text: 'jinmengjie watermark',
        width: 400,
        height: 150,
        x: 80,
        y: 10,
        rotationAngle: 20
    };
    // 实例化
    new watermark(config);
```

#### 可配置参数

`container`配置暂时没有实现，目前只支持body全部水印

| 参数名 | 描述 | 默认值 | 类型 |
| :---- | :---- | :---- | :---- |
| container | 需要添加水印的容器 | 默认值'body',其他容器需要传入id | String |
| font | 水印文字大小及字体 | '28px microsoft yahei' | String |
| fillStyle | 水印颜色 | 'rgba(255,0,0,0.3)' | String |
| text | 水印内容 | '这是一个水印' | String |
| x | x轴起始位置 | 20 | Number |
| y | y轴起始位置 | 30 | Number |
| width | 单个文字容器的宽度 | 200 | Number |
| height | 单个文字容器的高度 | 120 | Number |
| rotationAngle | 文字旋转角度 | 20 | Number |

#### Demo

demo源码详见`example`目录

```
    npm install
    npm start
```

