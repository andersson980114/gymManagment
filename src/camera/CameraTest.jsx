import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
    width: 1280,
    height: 720, 
  };

const CamerasTest = () => {
    const [devices, setDevices] = useState([]);
    const [url, setUrl] = useState(null)
    const [facingMode, setFacingMode] = useState('user');
    const [key, setKey] = useState(Math.random())
    const webcamRef = useRef(null);

    const handleDevices = useCallback((mediaDevices) => {
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
    }, [setDevices]);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    const capture = useCallback(
        async() => {
          const imageSrc = webcamRef.current.getScreenshot();
          setUrl(imageSrc)
          console.log(imageSrc)
        },
        [webcamRef]
      );


    const handleClick = () => {
        setFacingMode(prevState => prevState === 'user' ? 'environment' : 'user');
        setKey(Math.random())
    };
    return (
        <>
        <button onClick={capture}>Capture photo</button>
        <button onClick={handleClick}>Cambiar cámara</button>
        <Webcam
            audio={false}
            videoConstraints={{ ...videoConstraints, facingMode}}
            key={key}
        />
        <Webcam
            audio={false}
            videoConstraints={{ ...videoConstraints, facingMode: 'user'}}
        />
        
        {
            url && (
                <div>
                    <img src={url} alt="photo" />
                </div>
            )
        }
        </>
    );
}

export default CamerasTest;
