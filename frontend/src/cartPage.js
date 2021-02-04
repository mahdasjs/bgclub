import React, { Component } from "react";
import HorizontalScroll from 'react-scroll-horizontal'
import Axios from "axios";
import CartItem from './cartItems';
import Cartpost from './cartpost';
import News from './news'
import { Grid, hexToRgb } from "@material-ui/core";
import FreeScrollBar from 'react-free-scrollbar';
import './responsive.css';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

const mapStateToProps = state => {
  return {
      News: state.News,
      cartsssss:state.cartsssss,
      cartPost:state.cartPost
  };
};
class Homepage extends Component{
  render(){
    var value=0
    const values = [...this.props.cartsssss.reduce( (mp, o) => {
      if (!mp.has(o.data.bgid))
      mp.set(o.data.bgid, { ...o, count: 0 });mp.get(o.data.bgid).count++;
      return mp;
  }, new Map).values()];
  const posts = [...this.props.cartPost.reduce( (mp, o) => {
    if (!mp.has(o.data.postid)) 
    mp.set(o.data.postid, { ...o, count: 0 });
    mp.get(o.data.postid).count++;
    return mp;
}, new Map).values()];
  // for(var i=0; i<values.length; i++){
  //   value=value+values[i].data.rent_price*values[i].count
  // }
  for(var i=0; i<posts.length; i++){
    if(posts[i].data.sell_price==""){
      value=value+posts[i].data.rent_price*posts[i].count
    }
    else{
      value=value+posts[i].data.sell_price*posts[i].count
    }
  }
    let boardGames = values.map(post => {
      return <CartItem
        id={post.data.bgid}
        name={post.data.name}
        data={post.data}
        count={post.count}

        />;
    });
    console.log(posts[0].data.number)

    let post = posts.map(post => {
      return <Cartpost
      id={post.data.postid}
      number={post.data.number}
      name={post.data.name}
        data={post.data}
        count={post.count}

        />;
    });
    let news = this.props.News.map((term, index)=>{
      return<News
      title={term.title}
      image={term.image}
      />
    })
    return(
      <div className='homepage'>
        <Grid container >
        <Grid xs={12} sm={12} lg={12}  style={{height:'70px'}}>
          </Grid>
          <Grid xs={12} sm={12} lg={10}>
          <div  style={{marginLeft:'20px'}}>
            <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>BoardGames items</h2>
                {boardGames}
            </div>
            <div  style={{marginLeft:'20px'}}>
            <h2 style={{fontFamily:'Open Sans' ,fontSize: 30, lineHeight: 0.1 }}>Cart items</h2>
                {post}
            </div>
            <div  style={{display:'flex',marginLeft:'20px' ,flexWrap:'nowrap',boxShadow: `1px 1px 1px rgba(0, 0, 0, 0.1) `,border:'1px solid rgba(0, 0, 0, 0.1) ',marginTop:5}}>
            <Typography className='totalCost'>
                    Total cost
                    </Typography>
                    <Typography className='priceCart'>
                    ${value}
                    </Typography>
                    <Button style={{marginTop:15,marginLeft:20}} onClick={this.handlePostComment} disabled color="primary">
                        pay
                      </Button>
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
export default connect(mapStateToProps, null)(Homepage);