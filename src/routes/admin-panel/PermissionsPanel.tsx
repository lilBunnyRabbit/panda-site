import React from "react";
import { usePermissionsPanelStyles } from "./AdminPanelStyle";
import { useQuery } from "react-query";
import { Chip, IconButton, Paper, Typography } from "@material-ui/core";
import { permissionsRequests } from "../../utils/requests";
import { ErrorCard } from "../../components/error/ErrorCard";
import { Loading } from "../../components/loading/Loading";
import AddIcon from "@material-ui/icons/Add";
import { routesConfigs } from "../Routes";
import { AddItem } from "../../components/add-item/AddItem";

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
      const icon: any = routesConfigs.find(
        (routeConfig: any) => routeConfig.permission == permission._id
      )?.icon;
      return (
        <Chip
          variant="outlined"
          color="primary"
          onDelete={() => handleRemovePermission(permission._id)}
          label={permission.name}
          icon={
            icon &&
            React.createElement(icon, {
              fontSize: "small",
            })
          }
          style={icon && { paddingLeft: "5px" }}
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
          <AddItem
            title="Add Permission"
            handleAdd={(state: any) => {
              if (!state.name || state.name.trim() == "")
                return {
                  errors: { name: true },
                };

              return permissionsRequests
                .ADD({ name: state.name })
                .then(() => refetch())
                .catch(() => ({ errors: {} }));
            }}
            inputs={[
              {
                type: "search",
                id: "name",
                label: "Name",
              },
            ]}
            button={
              <IconButton
                color="secondary"
                size="small"
                style={{ border: "1px solid" }}
                children={<AddIcon />}
              />
            }
          />
        </Paper>
      </div>
    </div>
  );
}
