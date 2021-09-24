import {Box} from "@mui/material";
import animatedBackground from './assets/technology.mp4';
import styled from "@emotion/styled";
import {appBarHeight, StandardButton, theme, TypographyWhite} from "./util";
import IEEE from './assets/ieee.png';

const Video = styled('video')(() => ({
  position: 'absolute',
  objectFit: 'cover',
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: '100vh',
  zIndex: -2
}));

const VideoOverlay = styled(Box)(() => ({
  position: 'absolute',
  objectFit: 'cover',
  minWidth: '100%',
  maxWidth: '100%',
  minHeight: '100vh',
  background: `linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(19, 19, 40, 0.5) 90%, ${theme.palette.primary['variant4']} 100%)`,
  zIndex: -1
}));

export default function Home() {
  return (
    <Box sx={{minHeight: '100vh', width: '100%'}}>
      <VideoOverlay/>
      <Video autoPlay muted loop>
        <source src={animatedBackground} type="video/mp4"/>
      </Video>
      <Box sx={{paddingTop: appBarHeight}}/>
      <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', paddingTop: '10em'}}>
        <img src={IEEE} style={{width: '20em'}} alt='IEEE Logo'/>
        <TypographyWhite variant='h1' sx={{marginBottom: '3em', textAlign: 'center'}}>Student Professional Awareness Conference</TypographyWhite>
        <TypographyWhite variant='h2'>January ?, 2022</TypographyWhite>
        <TypographyWhite sx={{textAlign: 'center'}}>Insert detail about where event is held</TypographyWhite>
        <Box sx={{marginTop: '5em'}}>
          <StandardButton variant='contained' color='secondary' sx={{marginRight: '2em'}}>Register Now</StandardButton>
          <StandardButton className='GreenButton' variant='contained' sx={{marginLeft: '2em'}}>Sponsor Us</StandardButton>
        </Box>
        <StandardButton sx={{marginTop: '1em'}} variant='contained'>Read More</StandardButton>
      </Box>
    </Box>
  )
}