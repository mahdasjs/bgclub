import { Grid } from '@material-ui/core';
import React ,{Component} from 'react';
import HorizontalScroll from 'react-scroll-horizontal'
import Axios from "axios";
import BgPage from './bgPage'
class search extends Component{
    constructor(props){
        super(props)
        this.state={
            search : JSON.stringify (window.location.search.split('_')[1]).replace(/^"(.*)"$/, '$1').replace('%20'," ")||null,
            post:[]
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
          this.setState({ post: updatedBG });          
      })
    }
    render(){
        let boardGames = this.state.post.map(post => {
            return <BgPage
              name={post.name}
              />;
          });
        return(
            <div className='searchR' >
            <Grid container>
                    <Grid item xs={12} sm={12} lg={11}>
                <div style={{fontFamily:'Open Sans', textAlign:'center'}} >
                 <h2>Search results for “{this.state.search}”</h2>
                </div>
                </Grid>
                <Grid item xs={12} sm={12} lg={11}>
                      <div style={{height:'250px',marginLeft:'20px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>boardGames </h2>
                          <HorizontalScroll  >
                              {boardGames}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={11}>
                      <div style={{height:'250px',marginLeft:'20px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>Cafes </h2>
                          <HorizontalScroll >
                              {boardGames}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={11}>
                      <div style={{height:'250px',marginLeft:'20px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>Producers </h2>
                          <HorizontalScroll  >
                              {boardGames}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  </Grid>
            </div>
        )
    }
}
export default search