import React from "react";
import { useUserPanelStyles } from "./AdminPanelStyle";
import { useQuery } from "react-query";
import { DataGrid, ColDef, ValueFormatterParams } from "@material-ui/data-grid";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TransferList from "../../components/transfer-list/TransferList";
import {
  permissionsRequests,
  userRequests,
  householdsRequests,
} from "../../utils/requests";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export function UsersPanel() {
  const classes = useUserPanelStyles();
  const { isLoading, error, data, refetch } = useQuery<any, any, any>(
    "users-panel-all-users",
    () => userRequests.ALL(),
    {
      refetchOnMount: true,
    }
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
          onClick={() => setSelectedUser(params.row._id)}
          children={<EditIcon />}
        />
      ),
    },
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "household", headerName: "Household", flex: 1 },
    { field: "permissions", headerName: "Permissions", flex: 1 },
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

  const rows = data
    ? data.map((user: any, i: number) => ({ ...user, id: i }))
    : [];

  if (selectedUser)
    return (
      <EditUser
        userId={selectedUser}
        classes={classes}
        goBack={() => {
          setSelectedUser(undefined);
          refetch();
        }}
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
          showToolbar
        />
      </div>
    </div>
  );
}

function EditUser({ userId, classes, goBack }: any) {
  const { isLoading, error, data, refetch, remove } = useQuery<any>(
    "users-panel-get-user-" + userId,
    () =>
      Promise.all([
        userRequests.GET(userId),
        permissionsRequests.ALL(),
        householdsRequests.ALL(),
      ]).then((values) => ({
        user: values[0],
        permissions: values[1],
        households: values[2],
      })),
    {
      refetchOnMount: true,
    }
  );

  const [name, setName] = React.useState("");
  const [household, setHousehold] = React.useState("");
  const [permissions, setPermissions] = React.useState<number[]>([]);
  const [missingPermissions, setMissingPermissions] = React.useState<string[]>(
    []
  );

  React.useEffect(() => {
    if (!isLoading && data) {
      setName(data.user.name);
      setHousehold(data.user.household);
      setPermissions(data.user.permissions || []);
      setMissingPermissions(
        data.permissions
          .map((perm: any) => perm._id)
          .filter((perm: any) => !(data.user.permissions || []).includes(perm))
      );
    }
  }, [isLoading]);

  if (isLoading) return <div>loading</div>;
  if (error) return <div>{JSON.stringify(error)}</div>;

  const handleGoBack = () => {
    remove();
    goBack();
  };

  const isEmpty = (value: any) => !value || value.trim() == "";

  const handleSubmit = () => {
    const send_data: any = {};

    if (!isEmpty(name) && name !== data.user?.name) send_data.name = name;
    if (household !== data.user?.household) {
      send_data.household = household == "none" ? "" : household;
    }
    if (permissions && permissions !== data.user?.permissions)
      send_data.permissions = permissions;

    if (Object.keys(send_data).length == 0) return;

    userRequests
      .UPDATE(userId, send_data)
      .then(handleGoBack)
      .catch(console.log);
  };

  const checkChanges = (): boolean => {
    if (!isEmpty(name) && name !== data.user?.name) return true;
    if (household !== data.user?.household) return true;
    if (permissions && permissions !== data.user?.permissions) return true;
    return false;
  };

  const DataTitle = (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5" component="h2" children={data.user.email} />
      </AccordionSummary>
      <Divider />
      <AccordionDetails className={classes.userDataBox}>
        <SyntaxHighlighter
          wrapLines={true}
          language="json"
          style={a11yDark}
          children={JSON.stringify(data.user, null, 2)}
          className={classes.userData}
        />
      </AccordionDetails>
    </Accordion>
  );

  const DataInput = (
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
        className={classes.inputName}
      />
      <FormControl className={classes.inputHouseholdForm}>
        <InputLabel className={classes.inputHousehold} children="Households" />
        <Select
          value={household}
          onChange={(e: any) => setHousehold(e.target.value)}
          className={classes.inputHousehold}
          fullWidth
          displayEmpty={true}
        >
          <MenuItem value="none" children="None" />
          {(data.households || []).map((h: any) => (
            <MenuItem value={h._id} children={h._id} />
          ))}
        </Select>
      </FormControl>
      <TransferList
        left={missingPermissions}
        setLeft={setMissingPermissions}
        right={permissions}
        setRight={setPermissions}
      />
    </List>
  );

  return (
    <Card className={classes.card}>
      <CardContent>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          children="Back"
          className={classes.backButton}
          onClick={handleGoBack}
        />
        {DataTitle}
        {DataInput}
      </CardContent>
      <CardActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
          children="Update user"
          className={classes.updateUserButton}
          disabled={!checkChanges()}
        />
      </CardActions>
    </Card>
  );
}
