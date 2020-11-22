import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import { Grid, hexToRgb } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import './responsive.css';
import {selectedData} from './actions/index'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

class boardgames extends React.Component{
      constructor(){
        super()
        this.state={
          value:2,
          hover:-1
        }
      }
      componentDidMount(){
          this.props.dispatch( selectedData(window.location.pathname.split('/')[2]))
      }
    render(){
      console.log(this.state.value)
        const selections = this.props.selections || []
        return(
            <div className='homepage'>
              <Grid container>
                        <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
          </Grid>
          <Grid xs={12} sm={12} lg={5}
                                            style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >
                  
                    <img
                    src={this.props.select.image}
                    style={{
                      justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                      maxWidth:'100%',
                      height:'auto',
                      maxHeight:350          
                    }}
                  />
                </Grid>
                <Grid xs={12} sm={12} lg={6}
                                                            style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left' ,marginTop:'30px',marginLeft:'30px'}} >

                  <Typography className='bgname'>
                {this.props.select.name}
                </Typography>
                <Typography className='bgprice'>
                {this.props.select.price}
                <div >
      <Rating
        name="hover-feedback"
        value={this.state.value}
        precision={0.5}
        onChange={(event, newValue) => {
          this.setState({value:newValue});
        }}

      />
      {/* {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>} */}
    </div>
                </Typography>
                <Typography className='bgdescription'>
                {this.props.select.description}
                </Typography>
                                </Grid>
                                <Grid xs={12} sm={12} lg={5}
                                            style={{ justifyContent: 'left', alignItems: 'left', textAlign: 'left',backgroundColor:'#fff' ,marginTop:'30px',marginLeft:'30px'}} >
                  
                  <Rating name="read-only" value={2} readOnly size="large"  />

                </Grid>
                                </Grid>

             </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      select: state.select,
    }
  }
export default connect(mapStateToProps, null)(boardgames);