import React, { Component } from "react";
import HorizontalScroll from 'react-scroll-horizontal'
import Axios from "axios";
import BgPage from './bgPage';
import { Grid, hexToRgb } from "@material-ui/core";
import Navbar from './navbar';
import { connect } from 'react-redux';
import News from './news'
import FreeScrollBar from 'react-free-scrollbar';

const mapStateToProps = state => {
  return {
      boardGames: state.boardGames,
      News: state.News,

  };
};

class Homepage extends Component{
  render(){
    let boardGames = this.props.boardGames.map(post => {
      return <BgPage
        name={post.name}
        id={post.id}
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
          <div className='boardgames' >

          <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>List of boardgames </h2>

            <div style={{display:'flex',flexWrap:'wrap'}}>
          {boardGames}
          </div>
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
