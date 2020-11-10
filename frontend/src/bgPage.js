import React from 'react';
import {BrowserRouter as Router, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg';
import { connect } from 'react-redux';
import {saveSelectValue} from './actions/index'
class boardgames extends React.Component{
    render(){
        return(
            <div>
                <Card
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.dispatch(saveSelectValue({data:this.props.data}))}}               
                    style={{marginTop:15, maxWidth:160,minWidth:160,maxHeight:200,minHeight:200,marginleft:10,marginRight:10 }}>
                    <CardContent>
                    <CardMedia
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='/bgpage/' + this.props.id;
                                }}
                        image={headerImage}
                        style={{display:'flex',maxHeight: 130, maxWidth: 130, minWidth: 130, minHeight: 130}}/>  
                        {this.props.name}
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
