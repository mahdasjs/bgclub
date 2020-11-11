import { Grid } from '@material-ui/core';
import React ,{Component} from 'react';
import HorizontalScroll from 'react-scroll-horizontal'
import Axios from "axios";
import BgPage from './bgPage';
import { connect } from 'react-redux';
import {resultData} from './actions/index'
const mapStateToProps = state => {
    return {
        results: state.results,
    };
  };
class search extends Component{
    constructor(props){
        super(props);
        this.state={
            search : JSON.stringify (window.location.search.split('_')[1]).replace(/^"(.*)"$/, '$1').replace('%20'," ")||null,
        }
    }
    componentDidMount(){
        this.props.dispatch( resultData(this.state.search))
    }
    render(){
        let results = this.props.results.map(post => {
            return <BgPage
            id={post.id}
            name={post.name}
            data={post}
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
                      <div style={{height:'290px',marginLeft:'20px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>boardGames </h2>
                          <HorizontalScroll  >
                              {results}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  {/* <Grid item xs={12} sm={12} lg={11}>
                      <div style={{height:'250px',marginLeft:'20px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>Cafes </h2>
                          <HorizontalScroll >
                              {results}
                         </HorizontalScroll>
                      </div>
                  </Grid>
                  <Grid item xs={12} sm={12} lg={11}>
                      <div style={{height:'250px',marginLeft:'20px'}}>
                          <h2 style={{fontFamily:'Open Sans', fontSize: 25, lineHeight: 0.1}}>Producers </h2>
                          <HorizontalScroll  >
                              {results}
                         </HorizontalScroll>
                      </div>
                  </Grid> */}
                  </Grid>
            </div>
        )
    }
}
export default connect(mapStateToProps, null)(search);
