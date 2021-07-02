import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Layout } from 'antd';
import { Spinner } from 'react-bootstrap';
import api from '../../services/api';
import './styles.css';

function GeneralInfo(props) {
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState([]);
    const { Content } = Layout;

    useEffect(() => {
        const getInfo = async () => {
            try {
                const { data } = await api.get("/empresas/");
                setInfo(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        getInfo();
    }, []);

    return (
        <Fragment>
            {!loading ? (
                <Content>
                    {info.length ? (
                        <div className="centered-content">
                            {/* <p>{info.}</p> CRIAR OPÇÃO QUE LISTA TODAS AS EMPRESAS(HOTEIS)*/} 
                        </div>
                    ) : (
                        <div className="centered-content">
                            <p className="no-info-content">Não há informações a serem exibidas</p>
                        </div>
                    )}
                </Content>
            ) : (
                <Content>
                    <span className="loader">
                        <Spinner animation="border" />
                    </span>
                </Content>
            )
            }
        </Fragment>
    );
}

export default GeneralInfo;