import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import "./Profile.css";
import axios from "axios";
import Cookie from "js-cookie";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import User from "./User";
import Grid from "@material-ui/core/Grid";
const FormData = require("form-data");
const token = Cookie.get("token");
const userid = Cookie.get("userid")
export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_picture: null,
      userpro: "",
      headerpro:"",
      header_picture:null,
      open: true,
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      address:"",
      postal:"",
      phone:"",

    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }
  // handleChange1(event) {
  //   if (this.state.profile_status == "public") {
  //     this.setState({ profile_status: "private" });
  //   } else {
  //     this.setState({ profile_status: "public" });
  //   }
  //   this.setState({
  //     ...this.state,
  //     [event.target.name]: event.target.checked,
  //   });
  // }
  fileSelectedHandler = (event) => {
    event.preventDefault();
    this.setState({
      profile_picture: event.target.files[0],
      userpro: URL.createObjectURL(event.target.files[0]),
    });
  };
  fileSelectedHandler1 = (event) => {
    event.preventDefault();
    this.setState({
      header_picture: event.target.files[0],
      headerpro: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleClick = async () => {
    const formData = new FormData();
    formData.append("profile_picture", this.state.profile_picture);
    formData.append("header_picture", this.state.header_picture);
    formData.append("postal", this.state.postal);
    formData.append("phone", this.state.phone);
    formData.append("address", this.state.address);
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/accounts/users/profile/${userid}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Token " + token,
          },
        }
      );
    } catch (e) {}
    formData.append("first_name", this.state.first_name);
    formData.append("last_name", this.state.last_name);
    formData.append("username", this.state.username);
    formData.append("email", this.state.email);

    axios
    .patch(
      `http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`,
      formData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + token,
        },
        }
      )
      .then(() => {
        this.props.onSuccessFullySave();
        this.props.onEdit();
      })
      .catch((error) => {});
  };

  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/v1/accounts/users/userprofile/${userid}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        this.setState({
          first_name: res.data.first_name,
          email: res.data.email,
          last_name: res.data.last_name,
          username: res.data.username,
        
        });
      })
      .catch((error) => {});
    axios
      .get(`http://localhost:8000/api/v1/accounts/users/profile/${userid}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //"Content-Type": "multipart/form-data",
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        this.setState({
          userpro: res.data.profile_picture,
          headerpro: res.data.header_picture,
          postal: res.data.postal,
          phone: res.data.phone,
          address: res.data.address,
        });
        console.log();
      })
      .catch((error) => {});
  }

  render() {
    return (
      <div style={{ position: "relative" ,maxWidth: "350px"}}>
        <Grid xs>
        <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectedHandler1}
            ref={(fileInput1) => (this.fileInput1 = fileInput1)}
          />
          <div className="img">
          <img
            variant="square"
            src={this.state.headerpro} 
            style={{
              width: 350,
              height: 120,
            }}/>
            </div>
          <Button
              variant="outlined"
              size="small"
              style={{
                fontSize: 12,
                backgroundColor: "white",
                color: "grey",
                bottom: "30px",
               // marginLeft:"-40px"
              }}
              onClick={(event) => this.fileInput1.click()}
            >
              {/* <CameraAltIcon size="small" /> */}
              change 
            </Button>
           <input
            style={{ display: "none" }}
            type="file"
            onChange={this.fileSelectedHandler}
            ref={(fileInput) => (this.fileInput = fileInput)}
          />
          <div className="md">
            <Avatar
              // variant="square"
              src={this.state.userpro}
              style={{
                width: 100,
                height: 100,
              }}
            ></Avatar>
          </div>
          <div className="mh">
            <Button
              variant="outlined"
              size="small"
              style={{
                fontSize: 12,
                backgroundColor: "white",
                color: "grey",
                bottom: "30px",
              }}
              onClick={(event) => this.fileInput.click()}
            >
              {/* <CameraAltIcon size="small" /> */}
              upload
            </Button>
            <br/>
          </div>
        
          <br />
          <div className="inputs">
            <FormControl style={{ marginTop: "-25px" }} variant="outlined">
              <InputLabel shrink htmlFor="component-outlined">
                firstname
              </InputLabel>
              <OutlinedInput
                style={{ fontSize: 13 }}
                className="namm"
                type="text"
                id="component-outlined"
                value={this.state.first_name}
                label="firstnaame"
                name="first_name"
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl style={{ marginTop: "-25px" }} variant="outlined">
              <InputLabel shrink htmlFor="component-outlined">
                lastname
              </InputLabel>
              <OutlinedInput
                className="namm"
                style={{ marginLeft: 7, fontSize: 13 }}
                type="text"
                id="component-outlined"
                value={this.state.last_name}
                label="lastname"
                name="last_name"
                onChange={this.handleChange}
              />
            </FormControl>
            <br />
            <br />
            <FormControl style={{ marginTop: "-15px" }} variant="outlined">
              <InputLabel shrink htmlFor="component-outlined" color="black">
                username
              </InputLabel>
              <OutlinedInput
                className="namm"
                style={{ fontSize: 13 }}
                type="text"
                id="component-outlined"
                value={this.state.username}
                label="username"
                name="username"
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl style={{ marginTop: "-15px" }} variant="outlined">
              <InputLabel shrink htmlFor="bootstrap-input">
                email
              </InputLabel>

              <OutlinedInput
                className="namm"
                style={{ marginLeft: 7, fontSize: 13 }}
                type="text"
                name="email"
                id="component-outlined"
                value={this.state.email}
                label="email"
                onChange={this.handleChange}
              />
            </FormControl>
            <br />
            <br />
            <FormControl style={{ marginTop: "-15px" }} variant="outlined">
              <InputLabel shrink htmlFor="component-outlined" color="black">
                phone number
              </InputLabel>
              <OutlinedInput
                className="namm"
                style={{ fontSize: 13 }}
                type="text"
                id="component-outlined"
                value={this.state.phone}
                label="phone"
                name="phone"
                onChange={this.handleChange}
              />
            </FormControl>

            <FormControl style={{ marginTop: "-15px" }} variant="outlined">
              <InputLabel shrink htmlFor="bootstrap-input">
               postal code
              </InputLabel>

              <OutlinedInput
                className="namm"
                style={{ marginLeft: 7, fontSize: 13 }}
                type="text"
                name="email"
                id="component-outlined"
                value={this.state.postal}
                label="postal code"
                name="postal"
                onChange={this.handleChange}
              />
            </FormControl>
            <br />
            <br />
            <FormControl style={{ marginTop: "-7px" }} variant="outlined">
              <InputLabel shrink htmlFor="component-outlined" color="black">
                address
              </InputLabel>
              <OutlinedInput
                className="nammbio"
                style={{ fontSize: 13 }}
                shrink={true}
                type="text"
                id="component-outlined"
                value={this.state.address}
                label="address"
                name="address"
                onChange={this.handleChange}
              />
            </FormControl>
          </div>
          <br />
          <Button style={{ color: "#303f9f" }} onClick={this.handleClick}>
            SAVE
          </Button>
        </Grid>
      </div>
    );
  }
}