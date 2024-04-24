import React, { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

interface DeviceInfo {
  kind: string;
}

const videoConstraints: MediaTrackConstraints = {
  width: 1280,
  height: 720,
};

const CamerasTest: React.FC = () => {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [url, setUrl] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [key, setKey] = useState<number>(Math.random());
  const webcamRef = useRef<Webcam>(null);

  const handleDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
    setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput'));
  }, []);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, []);

  const handleClick = () => {
    setFacingMode((prevState) => (prevState === 'user' ? 'environment' : 'user'));
    setKey(Math.random());
    alert(devices)
  };

  return (
    <>
      <button onClick={capture}>Capture photo</button>
      <button onClick={handleClick}>Cambiar cámara</button>
      <Webcam
        audio={false}
        videoConstraints={{ ...videoConstraints, facingMode }}
        key={key}
        ref={webcamRef}
      />
      <Webcam audio={false} videoConstraints={{ ...videoConstraints, facingMode: 'user' }} />
      {url && (
        <div>
          <img src={url} alt="" />
        </div>
      )}
    </>
  );
};

export default CamerasTest;
