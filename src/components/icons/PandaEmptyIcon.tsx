import { SvgIcon } from "@material-ui/core";
import React from "react";

export function PandaEmptyIcon(props: any) {
  console.log({ props });
  
  const color = props.theme == "dark" ? "#6f6f6f" : "#b9b9b9";
  const style = {
    fill: color,
    color: color,
    opacity: 1,
    fillOpacity: 1
  }
  return (
    <SvgIcon {...props} viewBox="0 0 512 512">
      <circle style={style} opacity="1" cx="421.16" cy="90.84" r="90.84" />
      <circle style={style} opacity="1" cx="90.84" cy="90.84" r="90.84" />
      <ellipse
        style={style}
        opacity="1"
        cx="256"
        cy="280.77"
        rx="239.48"
        ry="231.23"
      />
    </SvgIcon>
  );
}
