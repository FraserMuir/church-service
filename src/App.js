import React, { useEffect, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const App = () => {
  const [latestVideoId, setLatestVideoId] = useState(null);

  const opts = {
    height: window.screen.height,
    width: window.screen.width,
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}&channelId=${process.env.REACT_APP_CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`)
      .then((d) => d.json())
      .then((d) => setLatestVideoId(d.items[0].id.videoId));
  }, []);

  if (!latestVideoId) return null;

  return (
    <StyledContainer>
      <YouTube videoId={latestVideoId} opts={opts} />
    </StyledContainer>
  );
};

//
