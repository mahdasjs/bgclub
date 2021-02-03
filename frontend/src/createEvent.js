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
import {eventsData} from './actions/index'
import Mapir from "mapir-react-component";
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
  const Map = Mapir.setToken({
    transformRequest: url => {
      return {
        url: url,
        headers: {
          "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVkMjhhOGY5YzRlMzBlZmM3NTFhYjRkYWQ1Y2QyMDczNzllMTViM2ZjOTg3MzljYzIxNTYyYjYwNWRkMzc2YmFlZmIxNWZhY2ZlYjUyNmYwIn0.eyJhdWQiOiI2OTgwIiwianRpIjoiNWQyOGE4ZjljNGUzMGVmYzc1MWFiNGRhZDVjZDIwNzM3OWUxNWIzZmM5ODczOWNjMjE1NjJiNjA1ZGQzNzZiYWVmYjE1ZmFjZmViNTI2ZjAiLCJpYXQiOjE1NzU5NTYyNzUsIm5iZiI6MTU3NTk1NjI3NSwiZXhwIjoxNTc4NDYxODc1LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.Fx_r1Rguxm3Gtp_RDGxSbjhm67w-f_tldO0AHAyr1-L9JkGKgnaVBNWv4_x1qdjk6I6biCXAKpB5jafrUsp8bRS11pz2Tg0G80vaGb891_XF97pT-WGVV3J_H447tiC5JHj7ZSRodOsiVc8EblsX2BmxgewKyHYqs-6YGHYrVro_-xzNRl8EoXzDZtV34HqUWA0IQ5nqhVW39eIWzu6dmySKfSFoLRcOL9-8qC8p2jk9_siki9k3RBt5NVJyl8rOPHASy6yuqABWyeZZV5N8qELqiipP-Ka_zjc0DgrxwSE1AdvxdNDhZO7x7v72X0eM3oWvFMpwGqI5pRzIOpASiw", //Mapir api key
          "Mapir-SDK": "reactjs"
        }
      };
    }
  });
export default class Create extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: "",
        name: "",
        price: '',
        description:"",
        address:"",
        post_pic: null,
        postpic: "",
        number:'',
        value:'sell',
        startDate: '2017-05-24T10:30',
        markerArray: [],
        lat: 35.72,
        lon: 51.42
      };
      this.handlePost = this.handlePost.bind(this);
      this.handleStartDate=this.handleStartDate.bind(this);
      this.reverseFunction = this.reverseFunction.bind(this);
      };
      handleStartDate = (e) => {
        this.setState({
            startDate: e.target.value
        });
        console.log(this.state.startDate)
      };
      handleChangeName=(event)=>{
        this.setState({name:event.target.value})
        console.log(this.state.name)
      }
      handleChangeDescreption=(event)=>{
        this.setState({description:event.target.value})
        console.log(this.state.description)
      }
      handleChangeAddress=(event)=>{
        this.setState({address:event.target.value})
        console.log(this.state.address)

      }
      handleChangeNum=(event)=>{
        this.setState({number:event.target.value})
        console.log(this.state.number)
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
        formData.append("title", this.state.name);
          formData.append("description", this.state.description);
          formData.append("address", this.state.address);
          formData.append("event_date", this.state.startDate.split('T')[0]);
          formData.append("event_time", this.state.startDate.split('T')[1]);
          formData.append("number",this.state.number);
          formData.append("event_pic", this.state.post_pic);
          formData.append("event_len", this.state.lat);
          formData.append("event_lon", this.state.lon);
          console.log( this.state.lon)
          axios({
          method: "post",
          url: "http://localhost:8000/api/v1/events/create/",
          headers: { 
            "Content-type": "multipart/form-data",
            'Authorization':`Token ${Cookie.get('token')}`},
            data:formData
        }).then((response) => {
          console.log(response)
          this.props.onSuccessFullySave();
          this.props.onCreate();
          this.props.dispatch(eventsData(window.location.pathname.split('/')[2]))

            })
            .catch((error) => {
              
               });
            }
        reverseFunction(map, e) {

          var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`
          fetch(url,
            {
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVkMjhhOGY5YzRlMzBlZmM3NTFhYjRkYWQ1Y2QyMDczNzllMTViM2ZjOTg3MzljYzIxNTYyYjYwNWRkMzc2YmFlZmIxNWZhY2ZlYjUyNmYwIn0.eyJhdWQiOiI2OTgwIiwianRpIjoiNWQyOGE4ZjljNGUzMGVmYzc1MWFiNGRhZDVjZDIwNzM3OWUxNWIzZmM5ODczOWNjMjE1NjJiNjA1ZGQzNzZiYWVmYjE1ZmFjZmViNTI2ZjAiLCJpYXQiOjE1NzU5NTYyNzUsIm5iZiI6MTU3NTk1NjI3NSwiZXhwIjoxNTc4NDYxODc1LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.Fx_r1Rguxm3Gtp_RDGxSbjhm67w-f_tldO0AHAyr1-L9JkGKgnaVBNWv4_x1qdjk6I6biCXAKpB5jafrUsp8bRS11pz2Tg0G80vaGb891_XF97pT-WGVV3J_H447tiC5JHj7ZSRodOsiVc8EblsX2BmxgewKyHYqs-6YGHYrVro_-xzNRl8EoXzDZtV34HqUWA0IQ5nqhVW39eIWzu6dmySKfSFoLRcOL9-8qC8p2jk9_siki9k3RBt5NVJyl8rOPHASy6yuqABWyeZZV5N8qELqiipP-Ka_zjc0DgrxwSE1AdvxdNDhZO7x7v72X0eM3oWvFMpwGqI5pRzIOpASiw'
      
              }
            })
            .then(response => response.json())
            .then(data => { console.log(data) })
      
          const array = [];
          array.push(<Mapir.Marker
            coordinates={[e.lngLat.lng, e.lngLat.lat]}
            anchor="bottom">
          </Mapir.Marker>);
          this.setState({ markerArray: array, lat: e.lngLat.lat,lon: e.lngLat.lng });
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
      <TextField id="standard-secondary" placeholder="name" 
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChangeName} style={{width:'190px'}} />
             <TextField 
    style={{marginTop:0,width:'70px',marginLeft:'30px'}}
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
      value={this.state.address}
      onChange={this.handleChangeAddress}
      rowsMin={2} placeholder="address" style={{marginLeft:0,marginTop:15,width:'95%'}} />
      </div>
      <div>
      <form noValidate>
      <TextField
        id="datetime-local"
        label="Starts at"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        style={{width:300}}
        onChange={this.handleStartDate}
        InputLabelProps={{
          shrink: true,
        }}
      />
              <Mapir
                center={[this.state.lon, this.state.lat]}
                Map={Map}
                onClick={this.reverseFunction}
                >
                {this.state.markerArray}
              </Mapir>
</form>
</div>
        <Button style={{ color: "#303f9f",marginLeft:"240px" }} onClick={this.handlePost}>
            SAVE
          </Button>
      </div>;
      }
    }
    