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

class FigureImg extends Component{
  render(){
    var imgdata = this.props.data;
    return (
      <figure className="img-figure" style={this.props.imgstyle}>
        <img src={imgdata.imageurl} alt={imgdata.title}/>
        <figcaption>
          <h2 className="img-title">{imgdata.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

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
      centerImgIndex: 0
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
    this.setState({
      stageWidth: this.stage.scrollWidth,
      stageHeight: this.stage.scrollHeight,
      centerImgIndex: Math.floor(Math.random() * newimagesDatas.length)
    })
    console.log(Math.floor(Math.random() * newimagesDatas.length));
  }
  render() {
    var firgureimglist = [],
        imgstyleObj = {},
        randomLeft =0,
        randomTop=0;
    newimagesDatas.forEach((item,index) => {
      randomLeft = Math.round(Math.random() * this.state.stageWidth);
      randomTop = Math.round(Math.random() * this.state.stageHeight);
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
