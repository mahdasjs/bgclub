import React from "react";
import TextField from '@material-ui/core/TextField';
import "./Profile.css";
export default class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = { checked: false };
      this.state = { checked1: false };
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
    