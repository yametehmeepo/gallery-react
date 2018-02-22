import React, { Component } from 'react';
//导入图片json数据
import imagesDatas from './data/imagesdata.json';
import './App.less';


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
        <div className="is-back">
            {imgdata.desc}
          </div>
      </figure>
    )
  }
}

//随机打乱数组排序
function shuffle(arr){
    var finalArr = [];
    var len = arr.length;
    for(var i =0;i<len;i++){
      var randomnum = Math.floor(Math.random()*arr.length);
      finalArr.push(arr[randomnum]);
      arr.splice(randomnum,1);
    }
    return finalArr;
  }
//随机取min-max之间的整数
function randomNum(max,min){
  return Math.round( Math.random()*( max - min ) + min );
}

//定义居中图片的css样式
const centerclass = {
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%) rotate(0)',
  zIndex: 999
}
var newimagesDatas=[],//存储原始数据的
    shuffledata=[],//存储除去居中图片后再打乱排序的数组
    halfimglen = 0;//存储除去居中图片后剩下图片个数的一半

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      stageWidth: 0,
      stageHeight: 0,
      centerImgIndex: 0,
      centerImg: null,
      imageWidth: 0,
      imageHeight: 0
    }
    this.handlerResize = this.handlerResize.bind(this);
    this.get30DegRandom = this.get30DegRandom.bind(this);
  }
  //浏览器窗口大小变化时调用函数
  handlerResize(e){
    this.setState({
      stageWidth: this.stage.scrollWidth,
      stageHeight: this.stage.scrollHeight
    })
  }
  get30DegRandom(){
    return ((Math.random() > 0.5?'':'-') + Math.ceil(Math.random()*30));
  }
  componentWillMount(){
    //将图片的fileName转化成imageurl作为图片的url，添加到各图片对象中
    newimagesDatas = (function getImageData(imglist){
    imglist.map(function(imageItem,index){
      imageItem.imageurl = require('./images/' + imageItem.fileName);
      return imageItem;
    });
    return imglist;
    })(imagesDatas);
    //1:定义一个newimagesDatas长度中的随机数作为居中图片的索引
    var r = Math.floor(Math.random() * newimagesDatas.length);
    console.log('居中的index: '+ r);
    //2:剔除居中的图片
    var centerItem = newimagesDatas.splice(r,1);  
    centerItem[0].pos = centerclass; 
    console.log('componentWillMount, 居中图片数据 : ');
    console.log(centerItem[0]);
    //3:调用打乱数组函数shuffle,newimagesDatas原始数据经过shuffle函数处理已经为空
    shuffledata = shuffle(newimagesDatas);
    console.log('shuffledata:');
    console.log(shuffledata);
    this.setState({
      centerImgIndex: r,
      centerImg: centerItem[0],
    })
    halfimglen = shuffledata.length%2===0?shuffledata.length/2:Math.round(Math.random()+Math.floor(shuffledata.length/2));
    console.log("图片数量的一半是: " + halfimglen);
  }
  componentDidMount(){
    //在组件加载完成后添加resize事件句柄,当发生resize事件时调用handlerResize函数
    window.addEventListener('resize',this.handlerResize);
    //获取figure宽度和高度
    var iw = this.stage.getElementsByClassName('img-figure')[0].scrollWidth;
    var ih = this.stage.getElementsByClassName('img-figure')[0].scrollHeight;  
    
    this.setState({
      stageWidth: this.stage.scrollWidth,//通过ref回调函数获取class为stage的div的宽度
      stageHeight: this.stage.scrollHeight,//通过ref回调函数获取class为stage的div的高度
      imageWidth: iw,
      imageHeight: ih
    })
    
    
  }
  componentWillUnmount(){
    //组件卸载时解绑resize
    window.removeEventListener('resize',this.handlerResize);
  }
  render() {
    var firgureimglist =[],
        imgstyleObj = {},
        halfimgwidth = Math.round(this.state.imageWidth/2),
        halfimgheight = Math.round(this.state.imageHeight/2),
        halfstagewidth = Math.round(this.state.stageWidth/2),
        randomLeft =0,
        randomTop=0;
    shuffledata.forEach((item,index) => {
      //为每一个图片生成随机的left和top的值
      if(index<halfimglen){//设置前半部分图片位置信息
        randomLeft = randomNum(Math.floor(halfstagewidth-halfimgwidth*3),-halfimgwidth);
        randomTop = randomNum(this.state.stageHeight-halfimgheight,-halfimgheight);
        imgstyleObj = {
          left: randomLeft,
          top: randomTop,
          transform: 'rotate(' + this.get30DegRandom() + 'deg)',
        }
        item.pos = imgstyleObj;
      }else{//设置后半部分图片位置信息
        randomLeft = randomNum(this.state.stageWidth-halfimgwidth,halfstagewidth+halfimgwidth);
        randomTop = randomNum(this.state.stageHeight-halfimgheight,-halfimgheight);
        imgstyleObj = {
          left: randomLeft,
          top: randomTop,
          transform: 'rotate(' + this.get30DegRandom() + 'deg)'
        }
        item.pos = imgstyleObj;
      }
      firgureimglist.push(<FigureImg data={item} key={item.fileName} imgstyle={item.pos}/>)
    });
    //将居中的那张图片的信息插到firgureimglist数组的最后
    firgureimglist.push(<FigureImg data={this.state.centerImg} key={this.state.centerImg.fileName} imgstyle={this.state.centerImg.pos}/>)
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
