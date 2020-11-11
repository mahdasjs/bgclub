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

class boardgames extends React.Component{
      componentDidMount(){
          this.props.dispatch( selectedData(window.location.pathname.split('/')[2]))
      }
    render(){
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
                </Typography>
                <Typography className='bgdescription'>
                {this.props.select.description}
                </Typography>
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