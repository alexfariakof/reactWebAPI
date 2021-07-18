import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import  api  from '../../services/api';
import './styles.css';

function FormComodidade() {
    const { idComodidade } = useParams();
    const [id, setId] = useState(null);
    const [descricao, setDescricao] = useState('');
    const history = useHistory();

    useEffect(() => {
        if (idComodidade === '0') return;
        else LoadComodidade();
    }, idComodidade);

    async function LoadComodidade() {
        try {
            const response = await api.get(`api/Comodidade/${idComodidade}`,);
            setId(response.data.id);
            setDescricao(response.data.descricao);
        }
        catch (err) {
            alert('Não foi possível editar o resgistro.');
            history.push('/listComodidade');
        }
    }

    async function SaveorUpdate(e) {
        e.preventDefault();

        const data = {
            descricao
        }
        
        try {
            if (idComodidade === '0') {
                const responseData = await api.post('api/Comodidade', data);
                history.push('/listComodidade');
            }
            else {
                data.id = idComodidade;
                const responseData = await api.put(`api/Comodidade/${idComodidade}`, data);
                history.push('/listComodidade');                
            }            
        } catch (err) {
            alert('Erro durante gravação! Tente Novamente.');
        }
    }

    return (
        <div className="new-comodidade-container">
            <div className="content">
                <header>
                    <Link className="back-link pull-right" to="/listComodidade" >
                        <FiArrowLeft size={16} color="#251fc5" />
                        <span>Voltar </span>
                    </Link>
                    <br />
                    <h2> Cadastro de Comodidades </h2>
                </header>
                <form onSubmit={SaveorUpdate}>
                    <div className="form-group">
                        <label >Descrição</label>
                        <input
                            type="text"
                            placeholder="Digite uma descrição"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            className="form-control"
                            
                            title="Por favor preencher o campo descrição!"
                            required
                        />
                    </div>
                    <button className="btn btn-primary" type="submit" value="ok">  Salvar  </button>
                </form>
            </div>
        </div>
    );
}
export default FormComodidade;