import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import headerImage from './back.jpg'
class boardgames extends React.Component{
    render(){
        return(
            <div>
                <Card
                    style={{marginTop:15, maxWidth:160,minWidth:160,maxHeight:200,minHeight:200,marginleft:10,marginRight:10 }}>
                    <CardContent>
                    <CardMedia
                        image={headerImage}
                        style={{display:'flex',maxHeight: 130, maxWidth: 130, minWidth: 130, minHeight: 130}}/>  
                        {this.props.name}
                    </CardContent> 
                </Card>
             </div>
        )
    }
}
export default boardgames
