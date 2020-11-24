import React, { Component } from "react";
import HorizontalScroll from 'react-scroll-horizontal'
import Axios from "axios";
import CartItem from './cartItems';
import News from './news'
import { Grid, hexToRgb } from "@material-ui/core";
import FreeScrollBar from 'react-free-scrollbar';
import './responsive.css';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
      News: state.News,
      cartsssss:state.cartsssss
  };
};
class Homepage extends Component{
  render(){
    var value=0
    const values = [...this.props.cartsssss.reduce( (mp, o) => {
      if (!mp.has(o.data.id)) mp.set(o.data.id, { ...o, count: 0 });
      mp.get(o.data.id).count++;
      return mp;
  }, new Map).values()];
  for(var i=0; i<values.length; i++){
    value=value+values[i].data.price*values[i].count
  }
    console.log(value)
    let boardGames = values.map(post => {
      return <CartItem
        id={post.data.id}
        name={post.data.name}
        data={post.data}
        count={post.count}
        />;
    });
    let news = this.props.News.map((term, index)=>{
      return<News
      title={term.title}
      image={term.image}
      />
    })
    return(
      <div className='homepage'>
        <Grid container >
        <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
          </Grid>
          <Grid xs={12} sm={12} lg={10}>
            <div  style={{marginLeft:'20px'}}>
            <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>Cart items</h2>
                {boardGames}
            </div>
          </Grid> 
          <Grid xs={12} sm={12} lg={2}>
          <div className="news" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:0,marginLeft:20,paddingLeft:10 , width: '23%', height: '100%'}}>
          <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>News </h2>

                <FreeScrollBar  >
                  {news}
                </FreeScrollBar>
          </div>
          <div className="newsprime" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', marginTop:70,marginLeft:20,paddingLeft:10 , width: '100%', height: '500px',marginBottom:'100px'}}>
          <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>News </h2>

                <FreeScrollBar  >
                  {news}
                </FreeScrollBar>
          </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default connect(mapStateToProps, null)(Homepage);
