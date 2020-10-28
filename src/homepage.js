import React, { Component } from "react";
import HorizontalScroll from 'react-scroll-horizontal'
import Axios from "axios";
import BgPage from './bgPage';
import News from './news'
import { Grid, hexToRgb } from "@material-ui/core";
import FreeScrollBar from 'react-free-scrollbar';
import './responsive.css'
class Homepage extends Component{
  constructor(props){
    super(props);
    this.state={
      boardGames:[],
      News:[]
    }
  }
  componentDidMount(){
    Axios
    .get("https://reqres.in/api/products")
    .then(response => {
      const boardGames = response.data.data||[];
      const updatedBG = boardGames.map(post => {
          return {
              ...post,
          }
        })
      this.setState({ boardGames: updatedBG });
      console.log(this.state.boardGames);
  })
    Axios
    .get("https://jsonplaceholder.typicode.com/comments")
    .then(response=>{
      const news = response.data||[];
      const updatedNews = news.map(post=>{
        return{
          ...post,
        }
      }
      )
      this.setState({News:updatedNews})
    })
  }
  render(){
    let boardGames = this.state.boardGames.map(post => {
      return <BgPage
        name={post.name}
        />;
    });
    let news = this.state.News.map(post=>{
      return<News
      title={post.body}
      />
    })
    return(
      <div className='homepage'>
        <Grid container >
        <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
          </Grid>
          <Grid xs={12} sm={12} lg={10}>
            <div  style={{height:'220px',marginLeft:'20px'}}>
            <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>Top Boardgames </h2>
              <HorizontalScroll  >
                {boardGames}
              </HorizontalScroll>
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

export default Homepage;
