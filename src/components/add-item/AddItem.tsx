import React from "react";
import { useAddItemStyles } from "./AddItemStyle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Rating } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Reducers } from "../../redux/reducer";
import { PandaRating } from "../ratings/PandaRating";

interface AddItemInterface {
  title: string;
  handleAdd: Function;
  inputs: {
    type: "text" | "number" | "rating" | "search";
    id: string;
    label: string;
  }[];
  button?: any;
  buttonWidth?: string;
  style?: any;
  className?: any;
}

export function AddItem(props: AddItemInterface) {
  const classes = useAddItemStyles();
  const config = useSelector((state: Reducers) => state.config);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState<any>({});
  const [errors, setErrors] = React.useState<any>({});

  const handleAddWrapper = () => {
    const response = props.handleAdd(state);
    if (response?.errors) return setErrors(response.errors);
    return handleClose();
  };

  const handleClose = () => setOpen(false);

  const Inputs = props.inputs.map((input, i) => {
    switch (input.type) {
      case "text":
      case "search":
      case "number":
        return (
          <TextField
            autoFocus
            margin="dense"
            id={input.id}
            label={input.label}
            type={input.type}
            fullWidth
            variant="outlined"
            error={input.id in errors}
            onChange={(e: any) =>
              setState({
                ...state,
                [input.id]:
                  input.type == "number"
                    ? parseInt(e.target.value)
                    : e.target.value,
              })
            }
            className={classes.textInput}
          />
        );

      case "rating":
        return (
          <div className={classes.ratingInput}>
            <Typography
              color="textSecondary"
              children={input.label + ":"}
              style={{ marginRight: "10px" }}
            />
            <PandaRating
              name={`add-item-rating-${input.id}`}
              value={state[input.id] || 0}
              onChange={(event: any, newValue: any) =>
                setState({ ...state, [input.id]: newValue || 0 })
              }
              size="large"
              theme={config.theme}
            />
          </div>
        );

      default:
        return <div />;
    }
  });

  const ButtonOpen = props?.button ? (
    React.cloneElement(props.button, {
      onClick: () => setOpen(true),
    })
  ) : (
    <Button
      className={classes.addButton}
      children="Add"
      variant="contained"
      color="secondary"
      onClick={() => setOpen(true)}
    />
  );

  return (
    <div style={props.style} className={props.className}>
      {ButtonOpen}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle children={props.title} />
        <DialogContent children={Inputs} />
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddWrapper} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
