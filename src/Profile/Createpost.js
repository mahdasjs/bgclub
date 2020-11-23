import React from "react";
import TextField from '@material-ui/core/TextField';
import "./Profile.css";
import Button from "@material-ui/core/Button";
export default class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checked: false,
        checked1: false,
        post_picture: null,
        postpic: "",
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleChange1 = this.handleChange1.bind(this);
      };
      handleChange() {
        this.setState({
          checked: !this.state.checked
        })
      }
      handleChange1() {
        this.setState({
          checked1: !this.state.checked1
        })
      }
      fileSelectedHandler = (event) => {
        event.preventDefault();
        this.setState({
          post_picture: event.target.files[0],
          postpic: URL.createObjectURL(event.target.files[0]),
        });
      };
      render() {
        const content = this.state.checked 
          ? <div className="sell">   <TextField
          id="outlined-textarea"
          label="Your bid price"
          placeholder="price $"
          price $
          variant="outlined"
          size="small"
        /> </div>
          : null;
          const content1 = this.state.checked1
          ? <div className="rent">   <TextField
          id="outlined-textarea"
          label="Your bid price"
          placeholder="price $"
          price $
          variant="outlined"
          size="small"
        /> </div>
          : null;
    
        return  <div>
          <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectedHandler}
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <div className="img">
          <img
            variant="square"
            src={this.state.postpic} 
            style={{
              width: 300,
              height: 100,
            }}/>
            </div>
          <Button
              variant="outlined"
              size="small"
              style={{
                fontSize: 12,
                backgroundColor: "white",
                color: "black",
               marginLeft:"112px",
               marginTop:"5px"
              }}
              onClick={(event) => this.fileInput.click()}
            >
              Add pic 
            </Button>
      <br/>
      <div className="description">
      <TextField id="standard-secondary" label="Your description" color="default" />
      </div>
          <div>
            <label>Sell</label>
            <input 
              type="checkbox" 
              checked={ this.state.checked } 
              onChange={ this.handleChange } />
          </div>
          { content }
        <div>
          <label>Rent</label>
          <input 
            type="checkbox" 
            checked1={ this.state.checked1 } 
            onChange={ this.handleChange1 } />
        </div>
        { content1 }
      </div>;
      }
    }
    