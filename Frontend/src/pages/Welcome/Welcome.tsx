import { useState, useRef, useEffect } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("pause", () => {
        console.log("Video paused, navigating to /login");
        navigate("/login", { replace: true });
      });
    }
  }, []);
  return (
    <Layout>
        {/* <video ref={videoRef} controls={false} autoPlay={true} preload="auto" muted={muted}/> */}
        <video autoPlay muted={muted} id="welcomeVideo" className="video-background" ref={videoRef} >
            <source src="/welcome.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </Layout>
  );
}