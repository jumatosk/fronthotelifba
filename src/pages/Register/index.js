import React, { useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Container, Form, Col, Button, Spinner } from 'react-bootstrap';
import { Layout, Menu } from 'antd';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { STRINGS } from '../../util/strings';
import Footer from '../../components/Footer';
import './styles.css';
import api from '../../services/api';

registerLocale('pt-BR', ptBR);

function RegisterClient() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const { register, control, handleSubmit, formState } = useForm()
    const { errors } = formState;
    const { Header, Content } = Layout;

    const onSubmit = async (formData) => {
        setLoading(true);

        try {
            const { status } = await api.post("clientes/", {
                nome: formData.name,
                passaporte: formData.passport,
                identidade: formData.identity,
                data_identidade: formData.identityDate,
                nacionalidade: formData.nacionality,
                data_nascimento: expectedDate(formData.birthDate),
                endereço: formData.address,
                email: formData.email,
                telefone: formData.phone
            });
            if (status === 201) {
                toast.success("Cliente cadastrado com sucesso!");
                setTimeout(() => {
                    history.goBack();
                }, 3000);
            }
        } catch (error) {
            toast.error("Ocorreu um erro ao cadastrar!");
        }
        setLoading(false);
    }

    const expectedDate = (date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    return (
        <Fragment>
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item icon={<HomeOutlined style={{ fontSize: 20 }}/>} key="1" onClick={() => history.replace('/')}>
                        Início
                    </Menu.Item>
                    <Menu.Item icon={<LoginOutlined style={{ fontSize: 20 }}/>} className="login-btn">
                        <Link to="/login">
                            Entrar
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Layout>
                <Content style={{ padding: 50 }}>
                    <Container className="container-custom-register">
                        <div className="card-container-register">
                            <div className="card-register">
                                <span className="title-register-client">Cadastro de Cliente</span>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                Nome*
                                            </Form.Label>
                                            <Form.Control
                                                {...register("name", { required: STRINGS.REQUIRED_FIELD })}
                                                placeholder="Informe o nome do cliente"
                                            />
                                            <span className="field-error">
                                                <ErrorMessage errors={errors} name="name" />
                                            </span>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                Nacionalidade*
                                            </Form.Label>
                                            <Form.Control
                                                {...register("nacionality", { required: STRINGS.REQUIRED_FIELD })}
                                                placeholder="Informe a nacionalidade do cliente"
                                            />
                                            <span className="field-error">
                                                <ErrorMessage errors={errors} name="nacionality" />
                                            </span>
                                        </Form.Group>
                                        <Form.Group as={Col} md={2}>
                                            <Form.Label>
                                                Data de nascimento*
                                            </Form.Label>
                                            <br />
                                            <Controller
                                                control={control}
                                                name="birthDate"
                                                rules={{ required: STRINGS.REQUIRED_FIELD }}
                                                render={({ field }) => (
                                                    <DatePicker
                                                        selected={field.value}
                                                        onChange={(e) => field.onChange(e)}
                                                        className="input-custom-to-date"
                                                        locale="pt-BR"
                                                        dateFormat="yyyy/MM/dd"
                                                        placeholderText="Selecionar a data"
                                                        maxDate={new Date()}
                                                    />
                                                )}
                                            />
                                            <span className="field-error">
                                                <ErrorMessage errors={errors} name="birthDate" />
                                            </span>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                Endereço*
                                            </Form.Label>
                                            <Form.Control
                                                {...register("address", { required: STRINGS.REQUIRED_FIELD })}
                                                placeholder="Informe o endereço do cliente"
                                            />
                                            <span className="field-error">
                                                <ErrorMessage errors={errors} name="address" />
                                            </span>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                Telefone*
                                            </Form.Label>
                                            <Form.Control
                                                {...register("phone", { required: STRINGS.REQUIRED_FIELD })}
                                                placeholder="Informe o telefone do cliente"
                                            />
                                            <span className="field-error">
                                                <ErrorMessage errors={errors} name="phone" />
                                            </span>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                Nº de identidade*
                                            </Form.Label>
                                            <Form.Control
                                                {...register("identity", { required: STRINGS.REQUIRED_FIELD })}
                                                placeholder="Informe o numero de identidade do cliente"
                                            />
                                            <span className="field-error">
                                                <ErrorMessage errors={errors} name="phone" />
                                            </span>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                Passaporte
                                            </Form.Label>
                                            <Form.Control
                                                {...register("passport")}
                                                placeholder="Informe o número do passaporte do cliente"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>
                                                E-mail
                                            </Form.Label>
                                            <Form.Control
                                                {...register("email", {required: STRINGS.REQUIRED_FIELD})}
                                                placeholder="Informe o email do cliente"
                                            />
                                            <span className="field-error">
                                                <ErrorMessage errors={errors} name="email" />
                                            </span>
                                        </Form.Group>
                                    </Form.Row>
                                    <div className="container-btns">
                                        <Button block className="button-custom" type="submit">
                                            {loading ? <Spinner size="sm" animation="border" /> : "Cadastrar"}
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Container>
                </Content>
            </Layout>
            <Footer />
        </Fragment>
    )
}

export default RegisterClient