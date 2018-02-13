import React, { Component } from 'react';
//导入图片json数据
import imagesDatas from './data/imagesdata.json';
import './App.css';
//将图片的fileName转化成imageurl作为图片的url，添加到各图片对象中

var newimagesDatas = (function getImageData(imglist){
imglist.map(function(imageItem,index){
  imageItem.imageurl = require('./images/' + imageItem.fileName);
  return imageItem;
});
return imglist;
})(imagesDatas);


class App extends Component {
  componentWillMount(){
  }
  componentDidMount(){
    console.log(newimagesDatas);     
  }
  render() {
    return (
      <div className="stage">
        <div className="img-sec">

        </div>
        <div className="control-nav">

        </div>
      </div>
    );
  }
}

export default App;
