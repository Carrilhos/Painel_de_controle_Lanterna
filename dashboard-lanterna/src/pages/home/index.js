import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Menu from "../componets/menu";

import "./index.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#f5f5f5"
  },

  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Menu mensagem="Bem vindo!" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Em caso de duvida ou problemas técnicos, entrar em contato com o
          desenvolvedor através do Facebook{" "}
          <a className="link" href="https://www.facebook.com/gabrielcarrilhos/">
            (Clique aqui),
          </a>{" "}
          através do whatsapp (53) 98151 - 1640 ou então pelo email
          gcarrilhos@gmail.com. Falar com Gabriel Carrilhos.
        </Typography>
      </main>
    </div>
  );
}
