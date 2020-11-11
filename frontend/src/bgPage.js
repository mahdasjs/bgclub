import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import {saveSelectValue} from './actions/index'
import Typography from '@material-ui/core/Typography';

class boardgames extends React.Component{
    render(){
        return(
            <div>
                <Card
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.dispatch(saveSelectValue({data:this.props.data}))}}               
                    style={{marginTop:15, maxWidth:223,minWidth:223,maxHeight:260,minHeight:260,marginleft:10,marginRight:10 }}>
                    <CardContent>
                    <CardMedia
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/bgpage/' + this.props.id;
                                }}
                        image={this.props.data.image}
                        style={{
                            justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                            display:'flex'
                        ,maxHeight: 250, maxWidth: 180, minWidth: 180, minHeight: 175}}/>  
                                          <Typography className='name'>

                        {this.props.name.substring(0,30)}
                        </Typography>
                    </CardContent> 
                </Card>
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
