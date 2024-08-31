import React from "react";

const RatingNumber = ({ rating }) => {
  const borderColors = ["#FF0000", "#FF4C00", "#F28C28", "#FDDA0D", "	#0BDA51"];

  const getBorderColor = (rating) => {
    if (rating < 2) {
      return borderColors[0];
    } else if (rating < 4) {
      return borderColors[1];
    } else if (rating < 6) {
      return borderColors[2];
    } else if (rating < 8) {
      return borderColors[3];
    } else {
      return borderColors[4];
    }
  };

  const borderColor = getBorderColor(rating);

  const Styles = {
    border: `5px solid ${borderColor}`,
    width: "36px",
    height: "36px",
    borderRadius: "30%",
    backgroundColor: "rgba(222, 222, 222, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "rgb(52, 52, 52)",
  };

  return <div style={Styles}>{rating}</div>;
};

export default RatingNumber;
