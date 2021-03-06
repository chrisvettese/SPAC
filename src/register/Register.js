import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Snackbar,
  styled,
  TextField,
  Typography,
  Link
} from "@mui/material";
import {StyledDropZone} from 'react-drop-zone'
import 'react-drop-zone/dist/styles.css'
import {BlueButton, DiscordLink, GreenButton, RequiredField} from "../Util";
import {useState} from "react";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {isMobile} from "react-device-detect";
import {submitProfile} from "./SubmitProfile";
import ResumeWarning from "./ResumeWarning";

const DropZone = styled(StyledDropZone)(({theme}) => ({
  fontFamily: `${theme.typography.fontFamily} !important`,
  fontWeight: 'normal !important',
  fontSize: '16px !important',
  color: 'rgb(135, 135, 135) !important',
  '&:focus': {
    borderColor: `${theme.palette.primary.dark} !important`
  }
}));

const Spinner = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: '-12px',
  marginLeft: '-12px'
});

export default function Register({isPortrait, storage}) {
  const [formState, setFormState] = useState({
    firstName: '',
    firstNameError: false,
    lastName: '',
    lastNameError: false,
    phone: '',
    email: '',
    emailError: false,
    university: '',
    universityError: false,
    program: '',
    programError: false,
    file: null,
    errorSummary: ''
  });

  const [alertStatus, setAlertStatus] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [showSnackBar, setSnackBar] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [resumeWarning, setResumeWarning] = useState(false);

  const nameBoxWidthStyle = isMobile && isPortrait ? {width: '100%'} : {width: '210px'};
  const resumeUploadName = isMobile ? 'Upload your resume here' : 'Click or drop your resume here';

  const data = {
    formState,
    setFormState,
    storage,
    setSubmitEnabled,
    setAlertStatus,
    setAlertMessage,
    setSnackBar,
    resumeWarning,
    setResumeWarning
  };

  function setFile(file) {
    const newFormState = {...formState};
    newFormState.file = file;
    setFormState(newFormState);
  }

  function setFormValue(field, event) {
    const newFormState = {...formState};
    newFormState[field] = event.target.value;
    setFormState(newFormState);
  }

  return (
    <Box sx={{paddingTop: '2em', display: 'flex', flexDirection: 'column', pb: '2rem'}}>
      <Box sx={{mb: '1rem'}}>
        <Typography variant='h1'>Register on Hopin</Typography>
        <Typography variant='h5'>1. Get your ticket
          <Link href='https://hopin.com/events/student-professional-awareness-conference-ieee-spac/registration'
                target='_blank' sx={{ml: '0.5rem'}}>here
          </Link>.
        </Typography>
        <Typography variant='h5' sx={{mb: '0.5rem'}}>2. Upload Your Resume</Typography>
        <Typography>Share your resume with the patrons joining us</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'space-evenly',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          justifySelf: 'center'
        }}>
          <Card sx={{width: '29.25rem'}}>
            <CardContent sx={{marginTop: '0.5em', display: 'flex', flexDirection: 'column'}}>
              <Typography variant='h6' sx={{textAlign: 'center', marginBottom: '1em'}}>
                Please fill out your profile:
              </Typography>
              <Box>
                <TextField value={formState.firstName} error={formState.firstNameError} id='registerFirstNameInput'
                           label={RequiredField('First Name')} onChange={event => setFormValue('firstName', event)}
                           sx={{marginBottom: '1em', marginRight: '1em', ...nameBoxWidthStyle}}/>
                <TextField value={formState.lastName} error={formState.lastNameError} id='registerLastNameInput'
                           label={RequiredField('Last Name')} onChange={event => setFormValue('lastName', event)}
                           sx={{marginBottom: '1em', ...nameBoxWidthStyle}}/>
              </Box>
              <TextField value={formState.phone} sx={{width: '100%', marginBottom: '1em'}}
                         id='registerPhoneNumberInput' type='tel' label='Phone Number'
                         onChange={event => setFormValue('phone', event)}/>
              <TextField value={formState.email} error={formState.emailError} sx={{width: '100%', marginBottom: '1em'}}
                         id='registerEmailInput' label={RequiredField('Email Address')}
                         onChange={event => setFormValue('email', event)}/>
              <TextField value={formState.university} error={formState.universityError}
                         sx={{width: '100%', marginBottom: '1em'}} id='registerUniversityInput'
                         label={RequiredField('University')} onChange={event => setFormValue('university', event)}/>
              <TextField value={formState.program} error={formState.programError}
                         sx={{width: '100%', marginBottom: '1em'}} id='registerProgramInput'
                         label={RequiredField('Program')} onChange={event => setFormValue('program', event)}/>
              <DropZone children={resumeUploadName} onDrop={(file) => setFile(file)}/>
              {
                formState.file && (
                  <Box sx={{display: 'flex', marginTop: '1em'}}>
                    <UploadFileIcon/>
                    <Typography>{formState.file.name}</Typography>
                  </Box>
                )
              }
              <Box sx={{justifyContent: 'center', display: 'flex', marginTop: '1em', position: 'relative'}}>
                <BlueButton variant='contained' sx={{width: 'fit-content'}} disabled={!submitEnabled}
                            onClick={() => submitProfile(data)}>Submit</BlueButton>
                {
                  (!submitEnabled && !resumeWarning) && (
                    <Spinner size={24}/>
                  )
                }
              </Box>
              <Box sx={{maxWidth: 'fit-content'}}>
                {
                  formState.errorSummary.length > 0 && (
                    <Typography
                      sx={{marginTop: '1rem', color: 'red', width: '100%'}}>{formState.errorSummary}</Typography>
                  )
                }
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box display='flex' sx={{alignSelf: 'center', mt: '1rem', mb: '1rem'}}>
          <Link href={DiscordLink} target='_blank' sx={{textDecoration: 'none'}}>
            <GreenButton variant='contained' sx={{height: 'max-content'}}>Join our Discord</GreenButton>
          </Link>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={showSnackBar}
        autoHideDuration={5000}
        onClose={() => setSnackBar(false)}
        message='Message sent!'
      >
        <Alert severity={alertStatus} variant="filled">{alertMessage}</Alert>
      </Snackbar>
      <ResumeWarning data={data}/>
    </Box>
  )
}
