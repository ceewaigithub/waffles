import React, { useEffect, useRef } from "react";
import "./styles/DJPlayer.css";

const DJPlayer = () => {
  let context, analyser, dataArray;
  const audioRef = useRef(null);
  const circleLowRef = useRef(null);
  const circleMediumRef = useRef(null);
  const circleHighRef = useRef(null);
  const plateRef = useRef(null);


  const togglePlayer = () => {
    if (!context) {
      preparation();
    }
    if (audioRef.current.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  const playAudio = () => {
    audioRef.current.play();
    loop();
    plateRef.current.style.animationPlayState = "running";
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    plateRef.current.style.animationPlayState = "paused";
  };

  const preparation = () => {
    context = new AudioContext();
    analyser = context.createAnalyser();
    const src = context.createMediaElementSource(audioRef.current);
    src.connect(analyser);
    analyser.connect(context.destination);
    loop();
  };

  const loop = () => {
    if (audioRef.current.paused) {
      return;
    }

    window.requestAnimationFrame(loop);

    dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    changeCircles(circleLowRef.current, 20);
    changeCircles(circleMediumRef.current, 40);
    changeCircles(circleHighRef.current, 60);

    setTimeout(() => {
      resetBorder(
        circleLowRef.current,
        circleMediumRef.current,
        circleHighRef.current
      );
    }, 200);
  };

  const changeCircles = (circle, frequency) => {
    circle.style.height = `calc(50% + ${dataArray[frequency]}px)`;
    circle.style.backgroundColor = `rgba(${
      dataArray[frequency] / 2
    }, 58, 183, .55)`;
    circle.style.borderRadius = generateBorderRadius();
  };

  const resetBorder = (...circles) => {
    circles.forEach((circle) => (circle.style.borderRadius = "50%"));
  };

  const generateBorderRadius = () => {
    const randomizeAngle = () => Math.floor(Math.random() * (85 - 15) + 15);

    const top = randomizeAngle();
    const bottom = randomizeAngle();
    const left = randomizeAngle();
    const right = randomizeAngle();

    return `${top}% ${100 - top}% ${bottom}% ${
      100 - bottom
    }% / ${left}% ${right}% ${100 - right}% ${100 - left}%`;
  };

  useEffect(() => {
    plateRef.current.addEventListener("click", togglePlayer);
    return () => {
      plateRef.current.removeEventListener("click", togglePlayer);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="https://raw.githubusercontent.com/zadvorsky/three.bas/master/examples/_audio/song.mp3"
        crossOrigin="anonymous"
        type="audio/mp3"
        loop="loop"
        id="djPlayer-audio"
      ></audio>

      <div className="djPlayer-plane-block">
        <div className="djPlayer-circle" ref={circleLowRef} id="djPlayer-lowCircle"></div>
        <div className="djPlayer-circle" ref={circleMediumRef} id="djPlayer-mediumCircle"></div>
        <div className="djPlayer-circle" ref={circleHighRef} id="djPlayer-highCircle"></div>
        <div ref={plateRef} id="djPlayer-plate"></div>
      </div>
    </>
  );
};

export default DJPlayer;
