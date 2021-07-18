import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit, FiTrash, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';


function Hotel() {
    const [hoteis, setHoteis] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const history = useHistory();

    useEffect(() => {
        api.get('api/Hotel', )
                .then(response => {
                    setHoteis(response.data);
                });
    }, [setHoteis]);

    async function PesquisarHotel(e) {

        const data = {
            pesquisa
        }

        await api.get(`api/Hotel/?${pesquisa}`, )
            .then(response => {
                setHoteis(response.data);
            });
    }

    async function EditHotel(id) {
        try {
            history.push(`formHotel/${id}`);
        }
        catch (err) {
            alert('Erro durante a edição! Tente novamente.');
        }
    }

    async function DeleteHotel(id) {
        try {
            await api.delete(`api/Hotel/${id}`,);
        }
        catch (err) {
            alert('Erro durante a exclusão! Tente novamente.');
        }
    }

    return (
        <div className="comodidade-container">
            <header>
                <h2> Registro de Hoteis </h2>
                <div className="form-inline">
                    <div className="form-group pull-left">
                        <label ><button type="button" className="btn btn-warning" onClick={PesquisarHotel} >Pesquisar</button></label>
                        <input
                            type="text"
                            placeholder="Pesquisar por nome."
                            value={pesquisa}
                            onChange={e => setPesquisa(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <Link className="btn btn-primary pull-right" to="/formHotel/0"> Adicionar </Link>
                </div>
            </header>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Avaliação</th>
                        <th>Endereço</th>
                    </tr>
                </thead>
                <tbody>
                    {hoteis.map(hotel=>
                        <tr key={hotel.id}>
                            <td size={5}>
                                <button type="button" onClick={() => EditHotel(hotel.id)} >
                                    <FiEdit size={10} color="#251FC5" />
                                </button>
                            </td>
                            <td size={5}>
                                <button type="button" onClick={() => DeleteHotel(hotel.id)} >
                                    <FiTrash2 size={10} color="#251FC5" />
                                </button>
                            </td>
                            <td>{hotel.id}</td>
                            <td>{hotel.nome}</td>
                            <td>{hotel.descricao}</td>
                            <td>{hotel.avaliacao}</td>
                            <td>{hotel.endereco}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
export default Hotel;