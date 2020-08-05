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

  const [business, setBusiness] = useState([]);
  const [id, setID] = useState("");

  async function loadBusiness() {
    const response = await api.get("/business");
    setBusiness(response.data);
    setID([...id, ...response.data]);
  }

  async function handleDeleteBusiness(id) {
    try {
      await api.delete(`business/${id}`);

      setBusiness(business.filter(business => business.id !== id));
    } catch (err) {
      alert("Erro ao deletar usuário, tente novamente");
    }
  }

  async function handleUpdateBusiness(id) {
    history.push(`/EmpresaEdit/${encodeURIComponent(id)}`);
  }

  useEffect(() => {
    loadBusiness();
  }, []);

  return (
    <div className={classes.root}>
      <Menu mensagem="Empresas" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className="mainContainer">
          <button className="buttonAdd">
            <Link className="linkAdd" to="/EmpresaCadastro">
              Adicionar empresa
            </Link>
          </button>
        </div>
        <div className="mainContainer">
          <div className="listaDeUsuarios">Lista de empresas</div>
          <div className="userList">
            {business.map(business => (
              <div className="listContainer">
                <div className="userEnunciated">Nome</div>
                <div>{business.name}</div>
                <div className="userEnunciated">Descrição</div>
                <div>{business.description}</div>
                <div className="userEnunciated">cep</div>
                <div>{business.cep}</div>
                <div className="userEnunciated">Endereço</div>
                <div>
                  {business.rua} - {business.numero} - {business.bairro}
                </div>
                <div className="userEnunciated">Whatsapp</div>
                <div>{business.whatsapp}</div>
                <div className="userEnunciated">Telefone</div>
                <div>{business.call}</div>
                <div className="userEnunciated">Nome</div>
                <div>{business.name}</div>
                <div className="userEnunciated">Facebook</div>
                <div>facebook/{business.facebook}</div>
                <div className="userEnunciated">Instagram</div>
                <div>instagram/{business.instagram}</div>
                <div className="userEnunciated">Categoria</div>
                <div>{business.category}</div>
                <div className="userEnunciated">Sub Categoria</div>
                <div>{business.sub_category}</div>

                <div className="userIcon">
                  <button onClick={() => handleUpdateBusiness(business.id)}>
                    <FaPen />
                  </button>
                  <button onClick={() => handleDeleteBusiness(business.id)}>
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
