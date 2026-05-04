import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_TMDB_API_URL}/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.results); // Check API data
        setApiData(res.results ? res.results : []);
      })
      .catch((err) => console.error(err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {(apiData.length > 0 ? apiData : cards_data).map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={
                card.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                  : card.image
              }
              alt={card.original_title || card.name}
            />
            <p>{card.original_title || card.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
