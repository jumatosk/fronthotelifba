import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Form, Col, Button, Spinner } from 'react-bootstrap';
import { Layout, Menu } from 'antd';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import './styles.css';
import api from '../../services/api';

function Login() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { Header, Content } = Layout;

    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        try {
            const { status } = await api.post("rest-auth/login/", {
                username: data.username,
                email: data.email,
                password: data.password
            });

            if(status === 200) {
                history.push('/');
            }
        } catch (error) {
            toast.error("Erro ao fazer login, tente novamente!");
        }
        setLoading(true);
        console.log(data);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    return (
        <Fragment>
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1" onClick={() => history.replace('/')}>
                        Início
                    </Menu.Item>
                    <Menu.Item className="login-btn" key="1" onClick={() => history.replace('/cadastro')}>
                        Cadastrar-se
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout style={{ height: '80vh' }}>
                <Content style={{ padding: 100 }}>
                    <Container className="container-custom-login">
                        <div className="card-login">
                            <span className="login-title">Olá, bem vindo&#40;a&#41; :&#41;</span>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Username
                                        </Form.Label>
                                        <Form.Control
                                            {...register("username")}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Email
                                        </Form.Label>
                                        <Form.Control
                                            {...register("email")}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Senha
                                        </Form.Label>
                                        <Form.Control
                                            {...register("password")}
                                            type="password"
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Button type="submit" className="button-custom" variant="secondary" block>
                                            {loading ? <Spinner size="sm" animation="border" /> : "Entrar"}
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </div>
                    </Container>
                </Content>
            </Layout>
            <Footer />
        </Fragment >
    );
}

export default Login;