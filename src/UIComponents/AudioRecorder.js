import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../CSSComponents/AudioRecorder.css';
import axios from 'axios';
import spinner from '../images/LCPT.gif'
import TypeWriterEffect from 'react-typewriter-effect';
import loadingAnimation from '../images/Wedges-3s-200px.svg'


const AudioRecorder = () => {
 const mediaRecorderRef = useRef(null);
 const chunksRef = useRef([]);
 const [isRecording, setIsRecording] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
 const [imgURL, setImgURL] = useState('');
 const [userRequest, setUserRequest] = useState('');
 const isMobile = window.innerWidth <= 767;

 const handleMouseDown = () => {
   navigator.mediaDevices
     .getUserMedia({ audio: true })
     .then((stream) => {
       const mediaRecorder = new MediaRecorder(stream);
       mediaRecorder.ondataavailable = (event) => {
         if (event.data && event.data.size > 0) {
           chunksRef.current.push(event.data);
         }
       };
       mediaRecorder.start();
       mediaRecorderRef.current = mediaRecorder;
       setIsRecording(true);
     })
     .catch((error) => {
       console.error('Error accessing media devices:', error);
     });
 };

 const handleImageRequest = (transcription) => {
   try {
       const requestData = {
           prompt: transcription,
           n: 1,
           size: "512x512"
         }; 
       axios.post(
           'https://api.openai.com/v1/images/generations',
           requestData,
           {
           headers: {
               Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
               'Content-Type': 'application/json',
           },
           }
       ).then (response => {
           console.log(response.data.data[0].url)
           setImgURL(response.data.data[0].url)
           setIsLoading(false);
       });
   } catch (error) {
       console.log('Error Generating Image:', error);
       setIsLoading(false);
   }
 }

 const handleMouseUp = useCallback(() => {
   if (isRecording) {
     if (mediaRecorderRef.current) {
       mediaRecorderRef.current.onstop = () => {
         const blob = new Blob(chunksRef.current, { type: 'audio/mp3' });
         const file = new File([blob], 'recording.mp4', { type: 'audio/mp3' });
       try {
           const formData = new FormData();
           formData.append('file', file);
           formData.append('model', 'whisper-1');      
           axios.post(
               'https://api.openai.com/v1/audio/translations',
               formData,
               {
               headers: {
                   Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                   'Content-Type': 'multipart/form-data',
               },
               }
           ).then (response => {
               setUserRequest(response.data.text)
               setIsLoading(true)
               handleImageRequest(response.data.text);
           });
       } catch (error) {
           console.log('Error Transcribing Audio:', error);
       }
       };
       mediaRecorderRef.current.stop();
     }
     chunksRef.current = [];
     setTimeout(setIsRecording(false), 3000);
   }
 }, [isRecording]);

 useEffect(() => {
   // Add event listener to handle mouseup on document level
   document.addEventListener('mouseup', handleMouseUp);
   // Cleanup the event listener on component unmount
   return () => {
     document.removeEventListener('mouseup', handleMouseUp);
   };
 }, [handleMouseUp]);

 return (
   <div>
     {isLoading ? (
       <div className="image-container">
           <div style={{
             width: '60px',
             height: '60px',
             zIndex: -1,
             backgroundImage: `url(${loadingAnimation})`,
             backgroundSize: 'cover',
             backgroundRepeat: 'repeat',
           }}/>
       </div>
       ) : (
       <div className="image-container">
         <img className="image-border" alt="" src={imgURL}/>
         <TypeWriterEffect
           textStyle={{ 
             color: "#FFFFFF", 
             fontFamily: 'Mulish', 
             position:'absolute', 
             fontSize: isMobile ? '15px' : '25px', 
             top: isMobile ? '62.5vh': '60vh',
             left: isMobile ? '35vw' : ''
            }}
           className="typewriter"
           startDelay={0}
           cursorColor= {"transparent"}
           loop="false"
           text={userRequest}
           typeSpeed={60}
           eraseSpeed={0}
           />
       </div>
     )}
     <button
       className="button-container"
       onMouseDown={handleMouseDown}
       disabled={isRecording}
     >
     <div className="record-button">
       <img className="spinner-gif" alt='' src={spinner}/>
     </div>
     </button>
   </div>
 );
};


export default AudioRecorder;