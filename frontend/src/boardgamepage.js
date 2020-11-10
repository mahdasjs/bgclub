import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import { Grid, hexToRgb } from "@material-ui/core";

class boardgames extends React.Component{
    render(){
        console.log()
        const selections = this.props.selections || []
        console.log( this.props.selections)

        return(
            <div className='homepage'>
                        <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
          </Grid>
          <Grid xs={12} sm={12} lg={12}>

            <Card
                    style={{marginTop:15, maxWidth:160,minWidth:160,maxHeight:200,minHeight:200,marginleft:10,marginRight:10 }}>
                    <CardContent>
                    <CardMedia
                        image={headerImage}
                        style={{display:'flex',maxHeight: 130, maxWidth: 130, minWidth: 130, minHeight: 130}}/>  
                        {this.props.selections.name}
                    </CardContent> 
                </Card>
                </Grid>

             </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      selections: state.selections,
    }
  }
export default connect(mapStateToProps, null)(boardgames);