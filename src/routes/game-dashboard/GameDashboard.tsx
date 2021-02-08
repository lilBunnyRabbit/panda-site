import React from "react";
import { useGameDashboardStyles } from "./GameDashboardStyle";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TextField } from "@material-ui/core";

export function GameDashboard() {
  const classes = useGameDashboardStyles();

  return (
    <div className={classes.root}>
      <BasicTable />
    </div>
  );
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function BasicTable() {
  const [data, setData] = React.useState({
    rows: 3,
    users: new Array(5).fill(0).map((a: any, i: number) => {
      const rows: any = {};
      for (let i = 0; i < 3; i++) rows[i] = Math.floor(Math.random() * 500);
      return {
        username: `User ${i}`,
        rows,
      };
    }),
  })

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {data.users.map((user) => (
              <TableCell align="center" children={user.username} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {new Array(data.rows + 1).fill(0).map((a: any, i: number) => (
            <TableRow key={`row_${i}`}>
              {data.users.map((user, j) => (
                <TableCell align="center">
                  <TextField
                    variant="outlined"
                    type="number"
                    size="small"
                    onChange={(e: any) => {
                      const isNew = i == data.rows && e.target.value;
                      const d = { ...data };
                      d.users[j].rows[i] = parseInt(e.target.value || 0);
                      if(isNew) d.rows++;
                      setData(d);
                    }}
                    defaultValue={user.rows[i] || 0}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}

          <TableRow key={`row_sum`}>
            {data.users.map((user) => (
              <TableCell
                align="center"
                children={Object.keys(user.rows).reduce(
                  (total: any, current: any) => total + user.rows[current],
                  0
                )}
              />
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
