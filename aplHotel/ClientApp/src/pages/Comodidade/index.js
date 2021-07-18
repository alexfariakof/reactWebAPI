import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit, FiTrash, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

function ListComodidade() {
    const [comodidades, setComodidades] = useState([]);
    const [pesquisa, setPesquisa] = useState('');

    const history = useHistory();

    useEffect(() => {
        api.get('api/Comodidade',)
            .then(response => {
                setComodidades(response.data);
            });
    }, [setComodidades]);

    async function PesquisarComodidade(e) {

        const data = {
            pesquisa
        }

        await api.get(`api/Comodidade/?${pesquisa}`,)
            .then(response => {
                setComodidades(response.data);
            });
    }

    async function EditComodidade(id) {
        try {
            history.push(`formComodidade/${id}`);
        }
        catch (err) {
            alert('Erro durante a edição! Tente novamente.');
        }
    }
    async function DeleteComodidade(id) {
        try {
            await api.delete(`api/Comodidade/${id}`,);
        }
        catch (err) {
            alert('Erro durante a exclusão! Tente novamente.');
        }
    }

    return (
        <div className="comodidade-container">
            <header>
                <h2> Registro de Comodidades </h2>
                <div className="form-inline">
                    <div className="form-group pull-left">
                        <label ><button type="button" className="btn btn-warning" onClick={PesquisarComodidade} >Pesquisar</button></label>
                        <input
                            type="text"
                            placeholder="Pesquisar por nome."
                            value={pesquisa}
                            onChange={e => setPesquisa(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <Link className="btn btn-primary pull-right" to="/formComodidade/0"> Adicionar </Link>
                </div>
            </header>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Id</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {comodidades.map(comodidade =>
                        <tr key={comodidade.id}>
                            <td  >
                                <button type="button" onClick={() => EditComodidade(comodidade.id)} >
                                    <FiEdit size={10} color="#251FC5" />
                                </button>
                            </td>
                            <td className="pull-left">
                                <button type="button" onClick={() => DeleteComodidade(comodidade.id)} >
                                    <FiTrash2 size={10} color="#251FC5" />
                                </button>
                            </td>
                            <td>{comodidade.id}</td>
                            <td className="text-uppercase">{comodidade.descricao}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default ListComodidade;