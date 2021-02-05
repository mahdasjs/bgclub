import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/TextFields';
import GroupAddIcon from '@material-ui/icons/AddAPhoto';
import VideoLabelIcon from '@material-ui/icons/CheckCircleSharp';
import DateIcon from '@material-ui/icons/DateRange';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Img from './image';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import ImageUploader from 'react-images-upload';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#784af4',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <DateIcon />,
    4: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select name', 'Select picture', 'Select enddate','Select startingprice'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'select name for boardgame';
    case 1:
      return 'select picture for boardgame';
    case 2:
      return 'select endingdate for boardgame';
    case 3:
      return 'select startingprice for boardgame';
    default:
      return 'Unknown step';
  }
}
function valuetext(value) {
    return `${value}°C`;
  }
export default function CustomizedSteppers({fileInput}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [StartDate, setStartDate] = React.useState("2017-05-24T10:30");
  const [post_pic, setPost_pic] = React.useState('');
  const [postpic, setPostpic] = React.useState('');
  const [value, setValue] = React.useState(20);
  const[picture,setPic]=React.useState('')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeName=(event)=>{
    setName(event.target.value)
  }
  const steps = getSteps();
  const handleStartDate = (e) => {
    setStartDate(e.target.value)
    }
  const  fileSelectedHandler = (event) => {
    setPost_pic(event.target.files[0])
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const onDrop=(pictureFiles, pictureDataURLs) =>{
    setPic(pictureFiles)
}
const handlePost = async () => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("value", value);
  formData.append("startdate", StartDate);
    formData.append("presell_pic", picture[0].file);
    console.log(picture[0])
    axios({
    method: "post",
    url: "http://localhost:8000/api/v1/presells/profile/create/",
    headers: { 
      "Content-type": "multipart/form-data",
      'Authorization':`Token ${Cookie.get('token')}`},
      data:formData
  }).then((response) => {
    console.log(response)
    this.props.onSuccessFullySave();
    this.props.onCreate();
    this.props.dispatch(postData(window.location.pathname.split('/')[2]))
      })
      .catch((error) => {
        
         });
      }
  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
      {activeStep ===0 ? (
          <div style={{marginTop:-20}}>
              <div> select name for boardgame</div>
             
             <TextField id="standard-secondary" label="name" 
             type="text"
             name="name"
             value={name}
             onChange={handleChangeName} style={{width:'190px'}} />
          </div>
      )
      :
      null}
        {activeStep ===1 ? (
          <div style={{marginTop:-20}}>
              <div> select picture for boardgame</div>
              <ImageUploader
                singleImage={true}
                withPreview={true}
                withIcon={true}
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
            </div>
      )
      :
      null}
             {activeStep ===2 ? (
           <div>
           <form noValidate>
           <TextField
             id="datetime-local"
             label="Starts at"
             type="datetime-local"
             defaultValue="2017-05-24T10:30"
             value={StartDate}
             style={{width:300}}
             onChange={handleStartDate}
             InputLabelProps={{
               shrink: true,
             }}
           />
     </form>
     </div>
      )
      :
      null}
          {activeStep ===3 ? (
              <div className={classes.root}>
              <Typography id="range-slider" gutterBottom>
                Starting price:${value}
              </Typography>
              <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
              />
            </div>
      )
      :
      null}
      </div>

      <div style={{marginTop:20}}>
        {activeStep === steps.length ? (
          <div>

            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {activeStep === 3 ? 
              <Button
              variant="contained"
              color="primary"
              onClick={handlePost}
              className={classes.button}
            >
              finish
            </Button>:              <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              next
            </Button>
            }
             
            </div>
          </div>
        )}
      </div>
    </div>
  );
}