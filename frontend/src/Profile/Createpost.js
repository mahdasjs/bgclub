import React from "react";
import TextField from '@material-ui/core/TextField';
import "./Profile.css";
import Button from "@material-ui/core/Button";
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Cookie from 'js-cookie'
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
        value:'sell'
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
      handleChangeSell=(e)=> {
        this.setState({
          value: e.target.value
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
        console.log(name,value)
      }
      handleChangeDescreption=(event)=>{
        this.setState({description:event.target.value})
        console.log(this.state.description)
      }
      handleChangeSellPrice=(event)=>{
        this.setState({sell_price:event.target.value})
      }
      handleChangeRentPrice=(event)=>{
        this.setState({rent_price:event.target.value})
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
        console.log( this.state.bg_name,this.state.description, this.state.rent_price, this.state.sell_price, this.state.number, this.state.post_pic)
        axios({
        method: "post",
        url: "http://localhost:8000/api/v1/posts/profile/create/",
        headers: { 
          "Content-type": "multipart/form-data",
          'Authorization':`Token ${Cookie.get('token')}`},
          data:formData
      }).then((response) => {
        this.props.onSuccessFullySave();
        this.props.onCreate();
          })
          .catch((error) => {
            
             });
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
      <div >
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
      <div >
      <TextareaAutosize       
      type="text"
      value={this.state.description}
      onChange={this.handleChangeDescreption}
      rowsMin={3} placeholder="descreption" style={{marginLeft:0,marginTop:20,width:'95%'}} />
      </div>
      <div>
      <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={this.state.value} onChange={this.handleChangeSell} >
        <FormControlLabel value="sell" control={<Radio />} label="Sell" />
        <FormControlLabel value="rent" control={<Radio />} label="Rent" />
      </RadioGroup>
    </FormControl>
    {this.state.value=='sell'?
    <TextField 
    style={{marginTop:15,marginLeft:30}}
    onChange={this.handleChangeSellPrice} rowsMin={3} aria-label="caption" placeholder="price" />
    :<TextField 
    style={{marginTop:15,marginLeft:30}}
    onChange={this.handleChangeRentPrice} rowsMin={3} aria-label="caption" placeholder="price" />

    }

      </div>

      {/* <div className="description">
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
        </div> */}
        { content1 }
        <Button style={{ color: "#303f9f",marginLeft:"240px" }} onClick={this.handlePost}>
            SAVE
          </Button>
      </div>;
      }
    }
    