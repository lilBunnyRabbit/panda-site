import React from "react";
import { useHouseholdsPanelStyles } from "./AdminPanelStyle";
import { useQuery } from "react-query";
import { Chip, IconButton, Paper, Typography } from "@material-ui/core";
import { householdsRequests, permissionsRequests } from "../../utils/requests";
import { ErrorCard } from "../../components/error/ErrorCard";
import { Loading } from "../../components/loading/Loading";
import FaceIcon from "@material-ui/icons/Face";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ClearIcon from "@material-ui/icons/Clear";
import { DataGrid, ColDef, ValueFormatterParams } from "@material-ui/data-grid";

export function HouseholdsPanel() {
  const classes = useHouseholdsPanelStyles();
  const { isLoading, error, data: households, refetch } = useQuery<any>(
    "household-panel-get-all-households",
    () => householdsRequests.ALL_WITH_USERS_COUNT(),
    {
      refetchOnMount: true,
    }
  );

  const handleRemoveHousehold = (id: any) => {
    householdsRequests.DELETE(id).then(() => refetch());
  };

  const columns: ColDef[] = [
    {
      field: " ",
      headerName: " ",
      sortable: false,
      renderCell: (params: ValueFormatterParams) => (
        <IconButton
          className={classes.removeButton}
          color="primary"
          onClick={() => handleRemoveHousehold(params.row._id)}
          children={<ClearIcon />}
        />
      ),
    },
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "users", headerName: "Users", flex: 1 },
    {
      field: "time_created",
      headerName: "Created",
      flex: 1,
      renderCell: (params: ValueFormatterParams) => (
        <>
          {new Date(parseInt(params.row.time_created)).toLocaleString("en-GB")}
        </>
      ),
    },
  ];

  const rows = households
    ? households.map((household: any, i: number) => ({ ...household, id: i }))
    : [];

  return (
    <div className={classes.root}>
      <div className={classes.titleBox}>
        <Typography variant="h4" children="Households" />
        <AddHouseholdBox refetch={refetch} />
      </div>

      <div className={classes.tableBox}>
        <DataGrid
          rows={rows}
          error={error}
          columns={columns}
          autoPageSize={true}
          loading={isLoading}
          disableSelectionOnClick={true}
          showToolbar
        />
      </div>
    </div>
  );
}

function AddHouseholdBox({ refetch }: any) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleAddPermission = () => {
    if (!name || name.trim() == "") return;
    householdsRequests.ADD({ name }).then(handleClose);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    refetch();
    setOpen(false);
  };

  return (
    <div>
      <Button
        children="Add"
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        style={{ width: "10vw" }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Household</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e: any) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPermission} color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
