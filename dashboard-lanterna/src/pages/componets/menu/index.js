import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { IoIosBusiness } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { MdBusinessCenter } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";

import "./index.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "#069D52",
    textAlign: "center"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#f5f5f5"
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function Menu(props) {
  const classes = useStyles();

  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <h1 className="toolbar">{props.mensagem}</h1>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />

        <List>
          {[
            <div>
              <Link className="sideBar" to="/Empresas">
                <IoIosBusiness size={25} className="icon" />
                Usuários
              </Link>
            </div>,
            <div>
              <Link className="sideBar" to="/Negocios">
                <MdBusinessCenter size={25} className="icon" />
                Negócios
              </Link>
            </div>,
            <div>
              <Link className="sideBar" onClick={goBack}>
                <IoIosArrowBack size={28} className="icon" />
                Voltar
              </Link>
            </div>
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
