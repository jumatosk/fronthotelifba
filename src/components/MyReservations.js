import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { Spinner, ListGroup, Button, Col } from 'react-bootstrap';
import api from '../services/api';

function MyReservations() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(true);
    const [reservations, setReservations] = useState([]);

    const { Content } = Layout;

    useEffect(() => {
        const getMyReservations = async () => {
            try {
                const { data } = await api.get(`reservas/${user.id}/`);

                setReservations(data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }

        getMyReservations()
    }, []);

    return (
        <Content>
            {!loading ? (
                <ListGroup>
                    {reservations.length && reservations.map(reservation => (
                        <p>{reservation.id}</p>
                    ))}
                </ListGroup>
            ) : (
                <Spinner animation/>
            )}
        </Content>
    );
}

export default MyReservations;