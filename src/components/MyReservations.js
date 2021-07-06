import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Spinner, ListGroup, Button, Col } from 'react-bootstrap';
import api from '../services/api';

function MyReservations() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);
    const [company, setCompany] = useState([]);
    const [companyReservations, setCompanyReservations] = useState([]);

    const { Content } = Layout;

    const getMyReservations = async () => {
        try {
            const { data } = await api.get(`reservas/`);
            data.map(item => {
                if (item.cliente.endsWith(`/${user.id}/`)) {
                    data.length ? setReservations(data) : setReservations([]);
                }
            })
            await getCompany(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getCompany = async (data) => {
        if (data) {
            var dataValues = [];
            try {
                for (var i = 0, iLen = data.length; i < iLen; i++) {
                    const response = await api.get(data[i].empresa);
                    response.data ? dataValues.push(response.data) : setCompany([]);
                    ;
                }
                setCompany(dataValues)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const groupByCompanyId = (reservationsCompanies, companies) => {
        if (companies.length) {
            for (var i = 0, iLen = reservationsCompanies.length; i < iLen; i++) {
                console.log('aaaa', companies, reservationsCompanies[i].empresa.endsWith(`/${companies[i].id}/`))
                if (reservationsCompanies[i].empresa.endsWith(`/${companies[i].id}/`)) {
                    setCompanyReservations([...companyReservations, companies[i]]);
                }
            }
        }
    }

    useEffect(() => {
        getMyReservations();

        setTimeout(() => setLoading(false), 2000);
    }, []);

    useEffect(() => {
        groupByCompanyId(reservations, company);
    }, [reservations, company]);

    return (
        <Content className="container-custom">
            {!loading && reservations && company ? (
                <>
                    {reservations.length > 0 ? (
                        <>
                            {reservations.map(reservation => companyReservations.map(company => (
                                <>
                                    <span className="reservations-container">
                                        <>
                                            <p>
                                                Empresa: {company.nome}
                                            </p>
                                            <p>
                                                Endereço: {company.endereço}
                                            </p>
                                            <p>
                                                Telefone: {company.telefone}
                                            </p>
                                            <p>
                                                Categoria: {company.categoria}
                                            </p>
                                            <p>
                                                Nº de Pessoas: 
                                                {reservation.n_pessoas}
                                            </p>
                                        </>
                                    </span>
                                </>
                            )))}
                        </>
                    ) : (
                        <p className="empty-reservation">Não há reservas feitas ainda</p>
                    )}
                </>
            ) : (
                <span className="loader">
                    <Spinner animation="border" />
                </span>
            )}
        </Content>
    );
}

export default MyReservations;