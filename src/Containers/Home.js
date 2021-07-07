/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { deleteAirplaneWithFeed, login } from "../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getAirplanes, getOne, deleteAirplane, getAirplanesPerPage } from "../Actions/userActions";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Snackbar,
  TablePagination,
} from "@material-ui/core";
import {
  Add,
  AddAlert,
  AddOutlined,
  ContactSupportOutlined,
  DeleteOutline,
  Edit,
} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Delete";
import InputForm from "./InputForm";
import MuiAlert from "@material-ui/lab/Alert";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Home({ role }) {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const airplanes = useSelector((state) => state.airplaneReducer.airplanes);
  const error = useSelector((state) => state.airplaneReducer.error);
  const [color, setColor] = useState("info");
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const allairplanes = useSelector((state) => state.airplaneReducer.allairplanes)
  const [total, setTotal] = useState(0)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // getAirplanesPerPage(page, rowsPerPage).then(response => setAirplanes(response));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    // getAirplanesPerPage(page, rowsPerPage).then(response => setAirplanes(response));
    setPage(0);
  };

  const onDelete = (id) => {
    dispatch(deleteAirplaneWithFeed(id)).then(
      (response) => {
        setTotal(total - 1);
        setColor("success");
        setText("You have deleted airplane successfully");
        setOpen(true);
      },
      (status) => {
        if (status == 400) {
          setColor("error");
          setText("Bad request");
          setOpen(true);
        } else if (status == 403) {
          setColor("warning");
          setText("Not authorized");
          setOpen(true);
        }
      }
    );
  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      background: "#3f51b5",
      color: "white",
    },
  }))(TableCell);

  useEffect(() => {
    
    dispatch(getAirplanes());
    setTotal(allairplanes.length)
  }, []);

  useEffect(() => {
    
    dispatch(getAirplanesPerPage(page + 1, rowsPerPage))
  }, [page, rowsPerPage]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={color}>
          {text}
        </Alert>
      </Snackbar>

      <div className={classes.paper}>
        <Container style={{ marginBottom: "3rem" }}>
          <InputForm
            total = {total}
            setTotal={setTotal}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setOpen={setOpen}
            setColor={setColor}
            setText={setText}
          />
        </Container>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width="30%">Name</StyledTableCell>
                <StyledTableCell width="30%">Model</StyledTableCell>
                <StyledTableCell width="20%">Compnay</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {airplanes
                //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.model}</TableCell>
                      <TableCell>{item.company}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            area-label="edit"
                            onClick={() => setCurrentId(item.airplaneId)}
                          >
                            <Edit color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            area-label="delete"
                            onClick={() => onDelete(item.airplaneId)}
                          >
                            <DeleteIcon color="secondary" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </Container>
  );
}
