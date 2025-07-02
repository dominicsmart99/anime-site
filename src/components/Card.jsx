import React from "react";

const Card = ({ anime }) => {
  const airedDate = anime.aired?.from
    ? new Date(anime.aired.from).toLocaleDateString()
    : "Unknown";

  return (
    <div className="movie-card">
      <img
        src={anime.images.jpg.large_image_url}
        alt={anime.title}
        width={500}
      />
      <div className="mt-4">
        <h3>{anime.title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{anime.score ?? "Unreleased"}</p>
          </div>
          <p className="lang">{airedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
