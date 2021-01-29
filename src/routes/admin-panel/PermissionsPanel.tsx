import React from "react";
import { usePermissionsPanelStyles } from "./AdminPanelStyle";
import { useQuery } from "react-query";
import { DataGrid } from "@material-ui/data-grid";
import { Chip, IconButton, Paper, Typography } from "@material-ui/core";
import { permissionsRequests } from "../../utils/requests";
import { ErrorCard } from "../../components/error/ErrorCard";
import { Loading } from "../../components/loading/Loading";
import FaceIcon from "@material-ui/icons/Face";
import AddIcon from "@material-ui/icons/Add";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { routesConfigs } from "../Routes";

export function PermissionsPanel() {
  const classes = usePermissionsPanelStyles();
  const { isLoading, error, data: permissions, refetch } = useQuery<any>(
    "permissions-panel-get-all-permissions",
    () => permissionsRequests.ALL(),
    {
      refetchOnMount: true,
    }
  );

  if (error) return <ErrorCard error={error} />;
  if (isLoading) return <Loading />;
  if (!permissions) return <ErrorCard />;

  const handleRemovePermission = (id: any) => {
    permissionsRequests.DELETE(id).then(() => refetch());
  };

  const PermissionChips = () => {
    return (permissions || []).map((permission: any) => {
      const icon: any = routesConfigs.find((routeConfig: any) => routeConfig.permission == permission._id)?.icon;
      return (
        <Chip
          variant="outlined"
          color="primary"
          onDelete={() => handleRemovePermission(permission._id)}
          label={permission.name}
          icon={icon && React.createElement(icon, {})}
        />
      );
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.titleBox}>
        <Typography variant="h4" children="Permissions" />
      </div>

      <div className={classes.tableBox}>
        <Paper className={classes.permissionsBox}>
          <PermissionChips />
          <AddPermissionBox refetch={refetch} />
        </Paper>
      </div>
    </div>
  );
}

function AddPermissionBox({ refetch }: any) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleAddPermission = () => {
    if (!name || name.trim() == "") return;
    permissionsRequests.ADD({ name }).then(handleClose);
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
      <IconButton
        color="secondary"
        size="small"
        onClick={handleClickOpen}
        style={{ border: "1px solid" }}
        children={<AddIcon />}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Permission</DialogTitle>
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
