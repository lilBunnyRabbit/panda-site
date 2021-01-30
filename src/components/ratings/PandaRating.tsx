import React from "react";
import { Rating } from "@material-ui/lab";
import { PandaEmptyIcon } from "../icons/PandaEmptyIcon";
import { PandaIcon } from "../icons/PandaIcon";

export function PandaRating(props: any) {
  return (
    <Rating
      {...props}
      icon={
        <PandaIcon
          theme={props.theme}
          fontSize="medium"
          style={{ marginLeft: "3px", marginRight: "3px" }}
        />
      }
      emptyIcon={
        <PandaEmptyIcon
          theme={props.theme}
          fontSize="medium"
          style={{ marginLeft: "3px", marginRight: "3px" }}
        />
      }
    />
  );
}
