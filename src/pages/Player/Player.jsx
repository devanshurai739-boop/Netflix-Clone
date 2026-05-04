import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeof: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_TMDB_API_URL}/movie/${id}/videos?language=en-US`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setApiData(response.results[0]))
      .catch((err) => console.error(err));
  });

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" onClick={() => {navigate("/")}}/>
      <iframe
        height="90%"
        width="90%"
        src={`https://youtube.com/embed/${apiData.key}`}
        frameBorder="0"
        title="trailer"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
