import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import React from "react";

import Home from "./pages/home";
import Empresas from "./pages/Empresas";
import Negocios from "./pages/Negocios";
import CadastrarUser from "./pages/CadastrarUser";
import CadastrarEmpresa from "./pages/CadastrarEmpresa";
import UserEdit from "./pages/EditUser";
import EmpresaEdit from "./pages/EditEmpresa";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Empresas" component={Empresas} />
        <Route path="/Negocios" component={Negocios} />
        <Route path="/UserCadastro" component={CadastrarUser} />
        <Route path="/EmpresaCadastro" component={CadastrarEmpresa} />
        <Route path="/UserEdit/:id" component={UserEdit} />
        <Route path="/EmpresaEdit/:id" component={EmpresaEdit} />
      </Switch>
    </Router>
  );
}
