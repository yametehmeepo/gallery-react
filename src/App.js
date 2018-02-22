import React, { Component } from 'react';
//导入图片json数据
import imagesDatas from './data/imagesdata.json';
import './App.less';
//将图片的fileName转化成imageurl作为图片的url，添加到各图片对象中

var newimagesDatas = (function getImageData(imglist){
imglist.map(function(imageItem,index){
  imageItem.imageurl = require('./images/' + imageItem.fileName);
  return imageItem;
});
return imglist;
})(imagesDatas);

//定义每个图片的组件
class FigureImg extends Component{
  render(){
    var imgdata = this.props.data;
    return (
      <figure className="img-figure" style={this.props.imgstyle}>
        <img src={imgdata.imageurl} alt={imgdata.title} />
        <figcaption>
          <h2 className="img-title">{imgdata.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

//定义居中图片的css样式
const centerclass = {
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  zIndex: 999
}


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      stageWidth: 0,
      stageHeight: 0,
      centerImgIndex: 0,
      imageWidth: 0,
      imageHeight: 0
    }
    this.handlerResize = this.handlerResize.bind(this);
  }
  //浏览器窗口大小变化时调用函数
  handlerResize(e){
    this.setState({
      stageWidth: this.stage.scrollWidth,
      stageHeight: this.stage.scrollHeight
    })
  }
  componentWillMount(){

  }
  componentDidMount(){
    //在组件加载完成后添加resize事件句柄,当发生resize事件时调用handlerResize函数
    window.addEventListener('resize',this.handlerResize);
    //定义一个newimagesDatas长度中的随机数作为居中图片的索引
    var r = Math.floor(Math.random() * newimagesDatas.length);
    var iw = this.stage.getElementsByClassName('img-figure')[0].scrollWidth;
    var ih = this.stage.getElementsByClassName('img-figure')[0].scrollHeight;  
      
    
    this.setState({
      stageWidth: this.stage.scrollWidth,
      stageHeight: this.stage.scrollHeight,
      centerImgIndex: r,
      imageWidth: iw,
      imageHeight: ih
    })
    console.log(ih);
  }
  componentWillUnmount(){
    //组件卸载时解绑resize
    window.removeEventListener('resize',this.handlerResize);
  }
  render() {
    var firgureimglist = [],
        imgstyleObj = {},
        halfimgwidth = Math.round(this.state.imageWidth/2),
        halfimgheight = Math.round(this.state.imageHeight/2),
        randomLeft =0,
        randomTop=0;
    newimagesDatas.forEach((item,index) => {
      //为每一个图片生成随机的left和top的值
      randomLeft = Math.round( Math.random() * this.state.stageWidth - halfimgwidth );
      randomTop = Math.round( Math.random() * this.state.stageHeight - halfimgheight );
      imgstyleObj = {
        left: randomLeft,
        top: randomTop
      }
      if(index === this.state.centerImgIndex){
        firgureimglist.push(<FigureImg data={item} key={item.fileName} imgstyle={centerclass}/>)
      }else{
        firgureimglist.push(<FigureImg data={item} key={item.fileName} imgstyle={imgstyleObj}/>)
      }
      
    });
    return (
      <div className="stage" ref={(width)=>{this.stage = width}}>
        <div className="img-sec">
          {firgureimglist}
        </div>
        <div className="control-nav">

        </div>
      </div>
    );
  }
}

export default App;
