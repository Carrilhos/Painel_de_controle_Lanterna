import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core/";
import { FaPen, FaTrash } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

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

export default function Empresas({ match }) {
  const classes = useStyles();

  const history = useHistory();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [whatsapp, setWhatsapp] = useState();

  async function loadUser() {
    const response = await api.get(
      `users/${decodeURIComponent(match.params.id)}`
    );

    setName(response.data.name);
    setEmail(response.data.email);
    setWhatsapp(response.data.whatsapp);
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = {
        name,
        email,
        whatsapp
      };

      await api.put(`/users/${decodeURIComponent(match.params.id)}`, data);
      history.push("/Empresas");
    } catch (err) {
      console.log("deu pau, vai sentar?");
    }
  }

  return (
    <div className={classes.root}>
      <Menu mensagem="Editar usuário" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="container">
          <form className="form">
            <div>
              <div className="enunciado">Nome</div>
              <input
                className="boxinput"
                placeholder="Nome"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <div className="enunciado">Email</div>
              <input
                className="placeHolder"
                placeholder="Email"
                type="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="enunciado">whatsapp</div>
              <input
                className="placeHolder"
                placeholder="Whatsapp"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
              />
              <div className="buttonPosition">
                <button
                  className="buttonStyle"
                  type="submit"
                  onClick={handleSubmit}
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

Empresas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};
