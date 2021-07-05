import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Context } from '../../context/authContext';
import { Layout } from 'antd';
import { Spinner, ListGroup, Button, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ModalCompanies from '../../components/ModalCompanies';
import Reservation from '../../components/Reservation';
import api from '../../services/api';
import formatValue from '../../functions/formatReal';
import './styles.css';

function GeneralInfo() {
    const { isLogged } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [companies, setCompanies] = useState([]);
    const [companyInfo, setCompanyInfo] = useState();
    const [services, setServices] = useState();
    const [prices, setPrices] = useState();
    const [loadingCompanyInfo, setLoadingCompanyInfo] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showReservation, setShowReservation] = useState(false);
    const { Content } = Layout;

    useEffect(() => {
        const getCompanies = async () => {
            try {
                const { data } = await api.get("/empresas/");
                setCompanies(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        getCompanies();
    }, []);

    const getCompanyInfo = async (id) => {
        setLoadingCompanyInfo(true);

        try {
            const { data } = await api.get(`/empresas/${id}`);

            setCompanyInfo(data);
        } catch (error) {
            toast.error("Ocorreu um erro ao buscar informações da empresa");
        }
        setLoadingCompanyInfo(false);
    }

    const getServices = async (id) => {
        setServices(null);
        try {
            const { data } = await api.get(`/servicos/${id}/`);
            setServices(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPrices = async (id) => {
        setPrices(null);
        try {
            const { data } = await api.get(`/precos/${id}/`);
            setPrices(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            {!loading ? (
                <Content>
                    {companies.length ? (
                        <div className="centered-content">
                            <ListGroup variant="flush">
                                {companies.map(company => (
                                    <ListGroup.Item
                                        className="item"
                                        style={{fontSize: 20}}
                                        onClick={() => {
                                            getCompanyInfo(company.id);
                                            setShowModal(true);
                                        }}
                                    >
                                        {company.nome}
                                    </ListGroup.Item>
                                ))
                                }
                            </ListGroup>
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
            {showModal && (
                <ModalCompanies
                    show={true}
                    onHide={() => setShowModal(false)}
                    title={companyInfo?.nome}
                >
                    {loadingCompanyInfo ? (
                        <span className="spinner-modal">
                            <Spinner animation="border" />
                        </span>
                    ) : (
                        <span className="info">
                            {companyInfo &&
                                <Fragment>
                                    <Col>
                                        <p>Endereço: {companyInfo.endereço}</p>
                                        <p>Telefone: {companyInfo.telefone}</p>
                                        <p>Categoria: {companyInfo.categoria}</p>
                                        <p>E-mail: {companyInfo.email}</p>
                                    </Col>
                                    <Button block variant="success" onClick={() => getServices(companyInfo.id)}>
                                        Consultar serviços
                                    </Button>
                                    {services && (
                                        <Col>
                                            <p>{services.alojamento ? "Alojamento" : ""}</p>
                                            <p>{services.almoço ? "Almoço" : ""}</p>
                                        </Col>
                                    )}
                                    <Button block variant="info" onClick={() => getPrices(companyInfo.id)}>
                                        Consultar Preços
                                    </Button>
                                    {prices && (
                                        <Col>
                                            <p>Padrão - {formatValue.format(prices.preco_padrao)}</p>
                                            <p>Feriados e datas comemorativas - {formatValue.format(prices.preco_data_especial)}</p>
                                            <p>Múltiplo - {formatValue.format(prices.preco_multiplo)}</p>
                                            <p>Múltiplo Especial - {formatValue.format(prices.preco_especial_multiplo)}</p>
                                        </Col>
                                    )}
                                    {isLogged && (
                                        <Button block variant="light" onClick={() => {
                                            setShowModal(false);
                                            setShowReservation(true);
                                        }}>
                                            Realizar Reserva
                                        </Button>
                                    )}
                                </Fragment>
                            }
                        </span>
                    )}
                </ModalCompanies>
            )}
            {showReservation && (
                <Reservation
                    show={true}
                    onHide={() => setShowReservation(false)}
                    companyId={companyInfo?.id}
                />
            )}
        </Fragment>
    );
}

export default GeneralInfo;