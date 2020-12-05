import React from "react";
import TextField from '@material-ui/core/TextField';
import "./Profile.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
export default class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checked: false,
        checked1: false,
        id: "",
        bg_name: "",
        rent_price: "",
        sell_price: "",
        description:"",
        post_pic: null,
        postpic: "",
        number:"",
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleChange1 = this.handleChange1.bind(this);
      this.handleChange2 = this.handleChange2.bind(this);
      this.handleChange3 = this.handleChange3.bind(this);
      this.handlePost = this.handlePost.bind(this);
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
       handleChange2 = (event) => {
        const name = event.target.name;
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
      };
      handleChange3(event) {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({ [name]: value });
      }
      fileSelectedHandler = (event) => {
        event.preventDefault();
        this.setState({
          post_picture: event.target.files[0],
          postpic: URL.createObjectURL(event.target.files[0]),
        });
      };
      handlePost = async () => {
        const formData = new FormData();
        formData.append("bg_name", this.state.bg_name);
        formData.append("description", this.state.description);
        formData.append("rent_price", this.state.rent_price);
        formData.append("sell_price", this.state.sell_price);
        formData.append("number", this.state.number);
        formData.append("post_pic", this.state.post_pic);
      try {
        const response = await axios.put(
          `https://5fac415503a60500167e7b7f.mockapi.io/api/v1/post/1`,
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // Authorization: "Token " + token,
            },
          }
        );
        
          this.props.onSuccessFullySave();
          this.props.onCreate();
        }
        catch (e) {
          console.log(e)
        }
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
          type="text"
                name="sell_price"
                value={this.state.sell_price}
                onChange={this.handleChange3} 
          
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
          type="text"
                name="rent_price"
                value={this.state.rent_price}
                onChange={this.handleChange3} 
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
      <div className="description1">
      <TextField id="standard-secondary" label="Name" 
                type="text"
                name="bg_name"
                value={this.state.bg_name}
                onChange={this.handleChange3} />
       
      <FormControl style={{ marginLeft: "30px"}} >
        <InputLabel  shrink htmlFor="age-native-label-placeholder">
          number
        </InputLabel>
        <NativeSelect
          value={this.state.number}
          onChange={this.handleChange2}
          inputProps={{
            name: 'number',
            id: 'age-native-label-placeholder',
          }}
        >
          <option value="">1</option>
          <option value={10}>2</option>
          <option value={20}>3</option>
          <option value={30}>4</option>
          <option value={40}>5</option>
          <option value={50}>6</option>
          <option value={60}>7</option>
          <option value={70}>8</option>
          <option value={80}>9</option>
          <option value={90}>10</option>
        </NativeSelect>
      </FormControl>
      </div>
      <div className="description">
      <TextField id="standard-secondary" label="description" color="default" 
      type="text"
      name="description"
      value={this.state.description}
      onChange={this.handleChange3} />
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
        <Button style={{ color: "#303f9f",marginLeft:"240px" }} onClick={this.handlePost}>
            SAVE
          </Button>
      </div>;
      }
    }
    