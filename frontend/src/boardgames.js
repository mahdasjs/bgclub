import React, { Component } from "react";
import HorizontalScroll from 'react-scroll-horizontal'
import Axios from "axios";
import BgPage from './bgPage';
import { Grid, hexToRgb } from "@material-ui/core";
import Navbar from './navbar';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
      boardGames: state.boardGames
  };
};
class Homepage extends Component{
  render(){
    let boardGames = this.props.boardGames.map(post => {
      return <BgPage
        name={post.name}
        />;
    });
    return(
      <div>
        <Grid container >

          <Grid xs={12} sm={12} lg={3}>
          </Grid>
          <Grid xs={12} sm={12} lg={9}>
          <div className='Lists'>

          <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>List of boardgames </h2>

            <div style={{display:'flex',flexWrap:'wrap'}}>
          {boardGames}
          </div>
          </div>

          </Grid>
 
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, null)(Homepage);
