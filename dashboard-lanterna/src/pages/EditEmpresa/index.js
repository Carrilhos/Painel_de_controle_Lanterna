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
  const [description, setDescription] = useState();
  const [cep, setCep] = useState();
  const [bairro, setBairro] = useState();
  const [rua, setRua] = useState();
  const [numero, setNumero] = useState();
  const [whatsapp, setWhatsapp] = useState();
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();
  const [call, setCall] = useState();
  const [category, setCategory] = useState();
  const [sub_category, setSub_category] = useState();
  const [sub_category_two, setSub_category_two] = useState();

  async function loadBusiness() {
    const response = await api.get(
      `business/${decodeURIComponent(match.params.id)}`
    );
    setName(response.data.name);
    setDescription(response.data.description);
    setCep(response.data.cep);
    setBairro(response.data.bairro);
    setRua(response.data.rua);
    setNumero(response.data.numero);
    setWhatsapp(response.data.whatsapp);
    setFacebook(response.data.facebook);
    setInstagram(response.data.instagram);
    setCall(response.data.call);
    setCategory(response.data.category);
    setSub_category(response.data.Sub_category);
    setSub_category_two(response.data.sub_category_two);
  }

  useEffect(() => {
    loadBusiness();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = {
        name,
        description,
        cep,
        bairro,
        rua,
        numero,
        whatsapp,
        facebook,
        instagram,
        call,
        category,
        sub_category,
        sub_category_two
      };

      await api.put(`business/${decodeURIComponent(match.params.id)}`, data);
      goToNegocios();
    } catch (err) {
      console.log("deu pau, vai sentar?");
    }
  }

  function goToNegocios() {
    history.push("/Negocios");
  }

  return (
    <div className={classes.root}>
      <Menu mensagem="Editar empresa" />
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
              <div className="enunciado">Descrição</div>
              <input
                className="boxinput"
                placeholder="Descrição"
                onChange={e => setDescription(e.target.value)}
                value={description}
              />
              <div className="enunciado">CEP</div>
              <input
                className="boxinput"
                placeholder="CEP"
                onChange={e => setCep(e.target.value)}
                value={cep}
              />
              <div className="enunciado">Bairro</div>
              <input
                className="boxinput"
                placeholder="Bairro"
                onChange={e => setBairro(e.target.value)}
                value={bairro}
              />
              <div className="enunciado">Rua</div>
              <input
                className="boxinput"
                placeholder="Rua"
                onChange={e => setRua(e.target.value)}
                value={rua}
              />
              <div className="enunciado">Numero</div>
              <input
                className="boxinput"
                placeholder="Número"
                onChange={e => setNumero(e.target.value)}
                value={numero}
              />

              <div className="enunciado">Whatsapp</div>
              <input
                className="boxinput"
                placeholder="Whatsapp"
                onChange={e => setWhatsapp(e.target.value)}
                value={whatsapp}
              />
            </div>
            <div>
              <div>
                <div className="enunciado">Facebook</div>
                <input
                  className="placeHolder"
                  placeholder="Link após o facebook/!"
                  onChange={e => setFacebook(e.target.value)}
                  value={facebook}
                />
              </div>

              <div className="enunciado">Instagram</div>
              <input
                className="placeHolder"
                placeholder="Link após o instagram/"
                onChange={e => setInstagram(e.target.value)}
                value={instagram}
              />
              <div className="enunciado">Telefone</div>
              <input
                className="placeHolder"
                placeholder="Telefone para ligação!"
                onChange={e => setCall(e.target.value)}
                value={call}
              />
              <div className="enunciado">Categoria</div>
              <input
                className="boxinput"
                placeholder="Nome"
                onChange={e => setCategory(e.target.value)}
                value={category}
              />
              <div className="enunciado">Sub-categoria</div>
              <input
                className="boxinput"
                placeholder="Sub-categoria"
                onChange={e => setSub_category(e.target.value)}
                value={sub_category}
              />
              <div className="enunciado">Sub-categoria</div>
              <input
                className="boxinput"
                placeholder="Segunda sub-categoria"
                onChange={e => setSub_category_two(e.target.value)}
                value={sub_category_two}
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
