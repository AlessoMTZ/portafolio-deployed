import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import 'typeface-fira-code';
import Typed from 'typed.js';

const PageContainer = styled.div`
    min-height: 100vh;
    background-color: rgb(0, 0, 0); /* Fondo negro */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    font-family: 'Fira Code', monospace;
    color: #acc53d;
`;

const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #999;
    font-family: 'Fira Code', monospace;
`;

const ContactForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    background-color: #1a1a1a;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 600px;
`;

const Label = styled.label`
    font-size: 1rem;
    color: #999;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    border: none;
    background-color: #333;
    color: #acc53d;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    border: none;
    background-color: #333;
    color: #acc53d;
    resize: none;
    height: 150px;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    background-color: #acc53d;
    color: #1a1a1a;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #1a1a1a;
        color: #acc53d;
        transform: scale(1.1);
    }
`;

const ContactInfo = styled.div`
    margin-top: 2rem;
    color: #999;
    text-align: center;
`;

const ContactItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 1.2rem;
`;

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const formRef = useRef(null);
    const titleRef = useRef(null); // Referencia para el título animado

    useEffect(() => {
        // Configura Typed.js para el título
        if (titleRef.current) {
            new Typed(titleRef.current, {
                strings: ['Contacto'], // Texto a animar
                typeSpeed: 50, // Velocidad de escritura
                backSpeed: 30, // Velocidad de borrado
                showCursor: false, // Oculta el cursor parpadeante
            });
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Mensaje enviado con éxito');
            formRef.current.reset();
            setFormData({ name: '', email: '', message: '' });
        } else {
            alert('Hubo un problema al enviar el mensaje.');
        }
    };

    return (
        <PageContainer>
            <Title ref={titleRef}></Title>
            <ContactForm ref={formRef} onSubmit={handleSubmit}>
                <Label htmlFor="name">Nombre</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />

                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                <Label htmlFor="message">Mensaje</Label>
                <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                ></TextArea>

                <Button type="submit">Enviar</Button>
            </ContactForm>
            <ContactInfo>
                <ContactItem>
                    <FaPhone /> +573106287308
                </ContactItem>
                <ContactItem>
                    <FaEnvelope /> gastonmetzgera@gmail.com
                </ContactItem>
            </ContactInfo>
        </PageContainer>
    );
};

export default Contact;
