import React from "react";
import Icons from "../images/icons.svg";

const Icon = props => (
  <svg
    className={`icon icon-${props.icon}`}
    role="img"
    height={props.height}
    width={props.width}
    aria-label={props.icon + " icon"}
  >
    <title>{props.title || props.icon}</title>
    <use xlinkHref={`${Icons}#${props.icon}`} />
  </svg>
);

export default Icon;
