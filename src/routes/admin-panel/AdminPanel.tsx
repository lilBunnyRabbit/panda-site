import React from "react";
import { useAdminPanelStyles, useUserPanelStyles } from "./AdminPanelStyle";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import {
  DataGrid,
  ColDef,
  ValueGetterParams,
  ValueFormatterParams,
} from "@material-ui/data-grid";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  IconButton,
  List,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import EditIcon from "@material-ui/icons/Edit";
import { JsonBox } from "../../components/json-box/JsonBox";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TransferList from "../../components/transfer-list/TransferList";
import { permissionsRequests, userRequests } from "../../utils/requests";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const tabs = [
  {
    label: "Users",
    element: UsersPanel,
  },
];

export function AdminPanel() {
  const classes = useAdminPanelStyles();
  const [value, setValue] = React.useState(0);

  const TabHeader = (tab: any, i: number) => (
    <Tab label={tab.label} id={`tab-${i}`} />
  );

  const TabPanel = (tab: any, i: number) => (
    <div
      className={classes.tabPanel}
      role="tabpanel"
      hidden={value !== i}
      id={`tabpanel-${i}`}
      children={value === i && <tab.element classes={classes} />}
    />
  );

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(e: any, newValue: number) => setValue(newValue)}
        className={classes.tabs}
        indicatorColor="secondary"
        textColor="secondary"
        children={tabs.map(TabHeader)}
        style={{ minWidth: "fit-content" }}
      />
      {tabs.map(TabPanel)}
    </div>
  );
}

function UsersPanel() {
  const classes = useUserPanelStyles();
  const { isLoading, error, data, refetch } = useQuery<any, any, any>(
    "users-panel-all-users",
    () => userRequests.ALL()
  );
  const [selectedUser, setSelectedUser] = React.useState<any>();

  const columns: ColDef[] = [
    {
      field: " ",
      headerName: " ",
      sortable: false,
      renderCell: (params: ValueFormatterParams) => (
        <IconButton
          color="primary"
          onClick={() => {
            console.log({ params });
            setSelectedUser(params.row._id);
          }}
          children={<EditIcon />}
        />
      ),
    },
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "household", headerName: "Household", flex: 1 },
    { field: "permissions", headerName: "Permissions", flex: 1 },
    { field: "time_created", headerName: "Created", flex: 1 },
  ];

  const rows = data
    ? data.map((user: any, i: number) => ({ ...user, id: i }))
    : [];

  if (selectedUser)
    return (
      <EditUser
        userId={selectedUser}
        refetchAll={refetch}
        classes={classes}
        setSelectedUser={setSelectedUser}
      />
    );

  return (
    <div className={classes.root}>
      <div className={classes.titleBox}>
        <Typography variant="h4" children="Users" />
      </div>

      <div className={classes.tableBox}>
        <DataGrid
          rows={rows}
          error={error}
          columns={columns}
          autoPageSize={true}
          loading={isLoading}
          disableSelectionOnClick={true}
        />
      </div>
    </div>
  );
}

function EditUser({ userId, refetchAll, classes, setSelectedUser }: any) {
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: user,
    refetch: refetchUser,
  } = useQuery<any, any, any>("users-panel-get-user-" + userId, () =>
    userRequests.GET(userId)
  );

  const {
    isLoading: isLoadingPermissions,
    error: errorPermissions,
    data: allPermissions,
    refetch: refetchPermissions,
  } = useQuery<any, any, any>("users-panel-get-permissions-" + userId, () =>
    permissionsRequests.ALL()
  );

  const [name, setName] = React.useState("");
  const [household, setHousehold] = React.useState("");
  const [permissions, setPermissions] = React.useState<number[]>([]);
  const [missingPermissions, setMissingPermissions] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    if (!isLoadingUser && user && !isLoadingPermissions && allPermissions) {
      setName(user.name);
      setHousehold(user.household);
      setPermissions(user.permissions || []);
      setMissingPermissions(
        allPermissions
          .map((perm: any) => perm._id)
          .filter((perm: any) => !(user.permissions || []).includes(perm))
      );
    }
  }, [isLoadingUser, isLoadingPermissions]);

  if (isLoadingUser || isLoadingPermissions) return <div>loading</div>;

  const isEmpty = (value: any) => !value || value.trim() == "";

  const handleGoBack = () => {
    refetchUser();
    refetchAll();
    setSelectedUser(undefined);
  };

  const handleSubmit = () => {
    const send_data: any = {};

    if (!isEmpty(name) && name !== user?.name) send_data.name = name;
    if (household !== user?.household) send_data.household = household;
    if (permissions && permissions !== user?.permissions)
      send_data.permissions = permissions;

    console.log({ send_data });
    console.log(Object.keys(send_data).length);

    if (Object.keys(send_data).length == 0) return;
    console.log("updating");

    userRequests
      .UPDATE(userId, send_data)
      .then(handleGoBack)
      .catch(console.log);
  };

  return (
    <Card className={classes.root2}>
      <CardContent>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          children="Back"
          style={{ marginBottom: "20px" }}
          onClick={handleGoBack}
        />
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography
              variant="h5"
              component="h2"
              children={userId}
            />
          </AccordionSummary>
          <Divider />
          <AccordionDetails className={classes.userJson}>
            <TextareaAutosize
                className={classes.userJson}
              defaultValue={JSON.stringify(user, null, 4)}
              style={{
                width: "100%",
                backgroundColor: "rgb(0, 0, 0, 0)",
                outline: "none",
                border: "none",
                resize: "none"
              }}
              spellCheck={false}
            />
          </AccordionDetails>
        </Accordion>

        <List>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            margin="dense"
            id="household"
            label="Household"
            type="text"
            fullWidth
            value={household}
            onChange={(e: any) => setHousehold(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <TransferList
            left={missingPermissions}
            setLeft={setMissingPermissions}
            right={permissions}
            setRight={setPermissions}
          />
        </List>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          color="secondary"
          children="Update user"
          style={{ width: "100%", margin: "8px" }}
        />
      </CardActions>
    </Card>
  );
}
