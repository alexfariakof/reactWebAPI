import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
import './styles.css';

function FormHotel() {
    const { idHotel } = useParams();
    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [avaliacao, setAvaliacao] = useState('');
    const [endereco, setEndereco] = useState('');
    const [comodidades, setComodidades] = useState([]);
    const [selectComodidade, setSelectComodidade] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const history = useHistory();

    useEffect(() => {
        GetComodidades();
        if (idHotel === '0') return;
        else LoadHotel();
    }, idHotel);

    async function LoadHotel() {
        try {
            const response = await api.get(`api/Hotel/${idHotel}`,);
            setId(response.data.id);
            setNome(response.data.nome);
            setDescricao(response.data.descricao);
            setAvaliacao(response.data.avaliacao);
            setEndereco(response.data.endereco);            
            setComodidades(response.data.comodidades);
            GetComodidades();
            
        }
        catch (err) {
            alert('Não foi possível editar o resgistro.');
            history.push('/listHotel');
        }
    }

    async function SaveOrUpdate(e) {
        e.preventDefault();

        const data = {
            nome,
            descricao,
            avaliacao,
            endereco,
            comodidades
        }

        try {
            if (idHotel === '0') {
                const responseData = await api.post('api/Hotel', data);
                history.push('/listHotel');
            }
            else {
                data.id = idHotel;
                const responseData = await api.put(`api/Hotel/${idHotel}`, data);
                history.push('/listHotel');
            }
        } catch (err) {
            alert('Erro durante gravação! Tente Novamente.');
        }
    }

    async function GetComodidades() {
        api.get('api/Comodidade',)
            .then(response => {
                setSelectComodidade(response.data);
            });
    }

    function AddComodidade() {
        let ifExist = false;
        let temp;
        selectComodidade.map(
            c => {
                if (c.id === selectedValue) {
                    ifExist = true;
                    return;
                }
                else {
                    temp = c;
                }
            }
        );
                
        if (ifExist === false) {
            
        }
        else {
            alert('Essa comodidade já foi inserida!');
        }
    }

    function RemoveComodidade() {
        alert('Metodo não implementado');
    }

    return (
        <div className="new-comodidade-container">
            <div className="content">
                <header>
                    <Link className="back-link pull-right" to="/listHotel" >
                        <FiArrowLeft size={16} color="#251fc5" />
                        <span>Voltar </span>
                    </Link>
                    <br />
                    <h2> Cadastro de Hoteis </h2>
                </header>
                <form onSubmit={SaveOrUpdate} value="OK">
                    <div className="form-group">
                        <label >Nome</label>
                        <input
                            type="text"
                            placeholder="Digite o nome do hotel."
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Descrição</label>
                        <input
                            type="text"
                            placeholder="Digite uma descrição."
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Avaliação</label>
                        <input
                            type="number"
                            placeholder="Escolha uma avaliação de 1 a 5."
                            value={avaliacao}
                            onChange={e => setAvaliacao(e.target.value)}
                            className="form-control"
                            min="1" max="5"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Endereço</label>
                        <input
                            type="text"
                            placeholder="Digite o endereço do hotel."
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div >
                        <div className="form-group">
                            <label ><button type="button" className="btn btn-success" onClick={() => AddComodidade()} >Adicionar Comodidade</button></label>
                            <select size="6" className="form-control" onChange={e => setSelectedValue(e.target.value)}>
                                {selectComodidade.map(comodidade =>
                                    <option value={comodidade.id} >{comodidade.descricao}</option>
                                )}                                
                            </select>
                        </div>
                        <div className="form-group">
                            <label><button type="button" className="btn btn-danger" >Remover Comodidade</button></label>
                            <select id="removeSelectComodidade" size="6" multiple className="form-control" >
                                {comodidades.map(comodidade =>
                                    <option value={comodidade.id} >{comodidade.descricao}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">  Salvar  </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default FormHotel;