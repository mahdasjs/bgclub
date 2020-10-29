import React, { Component } from "react";
import Axios from "axios";
import BgPage from './bgPage';
import { Grid, hexToRgb } from "@material-ui/core";
class Homepage extends Component{
  constructor(props){
    super(props);
    this.state={
      producers:[],
    }
  }
  componentDidMount(){
    Axios
    .get("https://reqres.in/api/products")
    .then(response => {
      const producers = response.data.data||[];
      const updated = producers.map(post => {
          return {
              ...post,
          }
        })
      this.setState({ producers: updated });
      console.log(this.state.producers);
      
  })
  }
  render(){
    let producers = this.state.producers.map(post => {
      return <BgPage
        name={post.name}
        />;
    });
    return(
      <div>
        <Grid container >
        <Grid xs={12} sm={12} lg={12}  style={{height:'60px'}}>
          </Grid>
          <Grid xs={12} sm={12} lg={3}>
          </Grid>
          <Grid xs={12} sm={12} lg={9}>
            <div className='Lists'>
          <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>List of producers </h2>

            <div style={{display:'flex',flexWrap:'wrap'}}>
          {producers}
          </div>
          </div>
          </Grid> 
        </Grid>
      </div>
    )
  }
}

export default Homepage;
