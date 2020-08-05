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
  },
  paper: {
    position: "absolute",
    width: 500,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    flexDirection: "row",
    display: "flex"
  }
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

export default function Empresas() {
  const history = useHistory();

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [users, setUsers] = useState([]);
  const [id, setID] = useState("");
  const [open, setOpen] = useState(false);

  async function loadUsers() {
    const response = await api.get("/users");
    setUsers(response.data);
    setID([...id, ...response.data]);
  }

  async function handleDeleteUser(id) {
    try {
      await api.delete(`users/${id}`);

      setUsers(users.filter(users => users.id !== id));
    } catch (err) {
      alert("Erro ao deletar usuário, tente novamente");
    }
  }

  async function handleUpdateUser(id) {
    history.push(`/UserEdit/${encodeURIComponent(id)}`);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className={classes.root}>
      <Menu mensagem="Usuários" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="mainContainer">
          <button className="buttonAdd">
            <Link className="linkAdd" to="/UserCadastro">
              Adicionar usuário
            </Link>
          </button>
        </div>
        <div className="mainContainer">
          <div className="listaDeUsuarios">Lista de usuário</div>
          <div className="userList">
            {users.map(users => (
              <div className="listContainer">
                <div className="userEnunciated">Nome</div>
                <div>{users.name}</div>
                <div className="userEnunciated">Email</div>
                <div>{users.email}</div>
                <div className="userEnunciated">Email</div>
                <div>{users.whatsapp}</div>
                <div className="userEnunciated">whatsapp</div>
                <div>{users.whatsapp}</div>
                <div className="userIcon">
                  <button onClick={() => handleUpdateUser(users.id)}>
                    <FaPen />
                  </button>
                  <button onClick={() => handleDeleteUser(users.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
