import React from "react";
import TextField from '@material-ui/core/TextField';
import "./Profile/Profile.css";
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
import Cookie from 'js-cookie';

import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
} from "@material-ui/pickers";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
export default class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        bg_name: "",
        price: '',
        description:"",
        post_pic: null,
        postpic: "",
        number:'',
        value:'sell',
        startDate: '2017-05-24T10:30',
        endDate: new Date(),
      };
      this.handleChange2 = this.handleChange2.bind(this);
      this.handlePost = this.handlePost.bind(this);
      this.handleStartDate=this.handleStartDate.bind(this)
      };
      handleStartDate = (e) => {
        this.setState({
            startDate: e.target.value
        });
        console.log(this.state.startDate)
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
      handleChangePrice=(event)=>{
        this.setState({price:event.target.value})
      }
      handleChangeNum=(event)=>{
        this.setState({number:event.target.value})
      }
      handleChangeRentPrice=(event)=>{
        this.setState({rent_price:event.target.value})
      }
      fileSelectedHandler = (event) => {
        event.preventDefault();
        this.setState({
          post_pic: event.target.files[0],
          postpic: URL.createObjectURL(event.target.files[0]),
        });
      };
      handlePost = async () => {
        const formData = new FormData();
        formData.append("bg_name", this.state.bg_name);
          formData.append("description", this.state.description);
          if(this.state.value=='sell'){
            formData.append("sell_price", this.state.price);
          }
          else{
            formData.append("rent_price", this.state.price);
          }
          formData.append("number",this.state.number);
          formData.append("post_pic", this.state.post_pic);
          axios({
          method: "post",
          url: "http://localhost:8000/api/v1/posts/profile/create/",
          headers: { 
            "Content-type": "multipart/form-data",
            'Authorization':`Token ${Cookie.get('token')}`},
            data:formData
        }).then((response) => {
          console.log(response)
          this.props.onSuccessFullySave();
          this.props.onCreate();
            })
            .catch((error) => {
              
               });
            }
      render() {
    
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
      <TextField id="standard-secondary" label="name" 
                type="text"
                name="bg_name"
                value={this.state.bg_name}
                onChange={this.handleChange3} style={{width:'190px'}} />
             <TextField 
    style={{marginTop:16,width:'70px',marginLeft:'30px'}}
    value={this.state.number}
    onChange={this.handleChangeNum} rowsMin={3} aria-label="caption" placeholder="number" />
      </div>
      <div >
      <TextareaAutosize       
      type="text"
      value={this.state.description}
      onChange={this.handleChangeDescreption}
      rowsMin={3} placeholder="descreption" style={{marginLeft:0,marginTop:20,width:'95%'}} />
      </div>
      <div >
      <TextareaAutosize       
      type="text"
      value={this.state.description}
      onChange={this.handleChangeDescreption}
      rowsMin={2} placeholder="address" style={{marginLeft:0,marginTop:15,width:'95%'}} />
      </div>
      <div>
      <form noValidate>
      <TextField
        id="datetime-local"
        label="Starts at"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        onChange={this.handleStartDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
</form>
</div>
        <Button style={{ color: "#303f9f",marginLeft:"240px" }} onClick={this.handlePost}>
            SAVE
          </Button>
      </div>;
      }
    }
    