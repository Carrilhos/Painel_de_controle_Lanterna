import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core/";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
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

export default function Empresas() {
  const classes = useStyles();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [whatsapp, setWhatsapp] = useState();

  const history = useHistory();

  async function handleNewUser(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      whatsapp
    };

    try {
      await api.post("users", data);
      goToUsers();
    } catch (err) {
      alert("ocorreu um erro ao cadastrar usuário");
    }
  }

  function goToUsers() {
    history.push("/Empresas");
  }

  return (
    <div className={classes.root}>
      <Menu mensagem="Adicionar usuário" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="container">
          <form className="form">
            <div>
              <div className="enunciado">Nome</div>
              <input
                className="boxinput"
                placeholder="Nome"
                onChange={e => setName(e.target.value)}
                value={name}
              />
              <div className="enunciado">Email</div>
              <input
                className="placeHolder"
                placeholder="Email"
                type="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <div className="enunciado">Senha</div>
              <input
                className="placeHolder"
                placeholder="Senha"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
              <div className="enunciado">whatsapp</div>
              <input
                className="placeHolder"
                placeholder="Whatsapp"
                onChange={e => setWhatsapp(e.target.value)}
                value={whatsapp}
              />
              <div className="buttonPosition">
                <button
                  className="buttonStyle"
                  type="submit"
                  onClick={handleNewUser}
                >
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
