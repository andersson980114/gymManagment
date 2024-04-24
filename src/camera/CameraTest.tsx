import React, { useCallback, useState } from 'react';
import Webcam from 'react-webcam';

const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";

interface VideoConstraints {
  facingMode: string;
  mirror?: boolean;
}

const videoConstraints: VideoConstraints = {
  facingMode: FACING_MODE_USER,
  mirror: false
};


const CamerasTest: React.FC = () => {
  const [facingMode, setFacingMode] = useState<string>(FACING_MODE_USER);

  const handleClick = useCallback(() => {
    setFacingMode(prevState =>
      prevState === FACING_MODE_USER
        ? FACING_MODE_ENVIRONMENT
        : FACING_MODE_USER
    );
  }, []);

  return (
    <>
      <button onClick={handleClick}>Switch camera</button>
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          ...videoConstraints,
          facingMode
        }}
      />
    </>
  );
};

export default CamerasTest;
