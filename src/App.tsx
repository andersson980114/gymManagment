import { useEffect, useRef, useState } from "react";
import CamerasTest from "./camera/CameraTest";

function App(): JSX.Element {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const getCameraAccess = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        setStream(mediaStream);
        streamRef.current = mediaStream;
      } catch (error) {
        alert('Error al acceder a la cámara: ' + error);
      }
    };

    getCameraAccess();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>camera test</h1>
      {stream && <CamerasTest />}
    </div>
  );
}

export default App;
