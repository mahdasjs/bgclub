import React, { Component } from "react";
import HorizontalScroll from 'react-scroll-horizontal'
import Axios from "axios";
import BgPage from './bgPage';
import News from './news'
import { Grid, hexToRgb } from "@material-ui/core";
import FreeScrollBar from 'react-free-scrollbar';
import './responsive.css';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
      News: state.News,
      boardGames: state.boardGames,
      cartsssss:state.cartsssss,
  };
};
class Homepage extends Component{
  render(){

    let posts = this.props.boardGames.map((post) => {
      return <BgPage
        id={post.id}
        name={post.name}
        data={post}
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
            {/* <div  style={{height:'300px',marginLeft:'20px'}}>
            <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>Top Boardgames </h2>
              <HorizontalScroll  >
                {boardGames}
              </HorizontalScroll>
            </div> */}
            <div  style={{height:'430px',marginLeft:'20px',marginBottom:140}}>
            <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>Top Posts </h2>
              <HorizontalScroll style={{marginLeft:-40}}  >
                {posts}
              </HorizontalScroll>
            </div>
          </Grid> 
          <Grid xs={12} sm={12} lg={2}>
          <div className="news" style={{ borderLeft:'1px groove rgba(0, 0, 0, 0.1)', position:'fixed',marginTop:0,marginLeft:20,paddingLeft:10 , width: '23%', height: '100%'}}>
          <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>News </h2>
          
                <FreeScrollBar  >
                  
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
