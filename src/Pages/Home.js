import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Typed from 'typed.js';
import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs, FaPython, FaDatabase, FaJava, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiPostgresql, SiMongodb } from 'react-icons/si';
import image1 from '../Images/image1.webp';
import SkillCard from '../Components/Card';
import 'typeface-fira-code';

const PageContainer = styled.div`
    min-height: 100vh;
    background-color: rgb(0, 0, 0); /* Fondo negro */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    font-family: 'Fira Code', monospace;
`;

const BannerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin-bottom: 3rem;
`;

const TextSection = styled.div`
    text-align: left;
    position: relative;
    min-width: 50%; /* Asegura espacio para los textos animados */
`;

const Name = styled.h1`
    font-size: 5rem;
    margin: 0;
    color: #dfdfdf;
    font-weight: bold;
    font-family: 'Fira Code', monospace;
    height: 6rem; /* Reserva espacio para evitar desplazamientos */
`;

const Description = styled.p`
    font-size: 2.5rem;
    margin: 0.5rem 0;
    color: #acc53d;
    font-family: 'Fira Code', monospace;
    height: 3rem; /* Reserva espacio para evitar desplazamientos */
`;

const DescriptionParagraph = styled.p`
    font-size: 1.2rem;
    margin-top: 4rem;
    color: #ddd;
    font-family: 'Fira Code', monospace;
    line-height: 1.8;
    max-width: 600px;
    position: relative;
`;

const IconButtonContainer = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
`;

const IconButton = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #1a1a1a;
    color: #acc53d;
    font-size: 1.5rem;
    text-decoration: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #acc53d;
        color: #1a1a1a;
        transform: scale(1.1);
    }
`;

const Image = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #ddd;
`;

const Arrow = styled(motion.div)`
    font-size: 3rem;
    color: #acc53d;
    cursor: pointer;
    animation: bounce 2s infinite;

    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;

const ArrowContainer = styled(motion.div)`
    position: fixed; /* Mantenerla visible en la pantalla */
    bottom: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const SectionTitle = styled(motion.h2)`
    font-size: 2.5rem;
    margin: 2rem 0;
    color: #acc53d;
    text-align: center;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    padding: 2rem;
`;

const SkillsSection = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #000; /* Fondo negro */
    padding-top: 12rem; /* Incrementamos aún más el espacio superior */
    margin-top: 12rem; /* Añadimos un margen dinámico para ocultar el título */
`;

const Home = () => {
    const [showCards, setShowCards] = useState(false);
    const [showArrow, setShowArrow] = useState(true);
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);

    const scrollToCards = () => {
        document.getElementById('skills-section').scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        // Animación para el nombre
        if (nameRef.current) {
            new Typed(nameRef.current, {
                strings: ['Gastón Metzger'],
                typeSpeed: 50,
                backSpeed: 30,
                showCursor: false,
            });
        }

        // Animación para el cargo
        if (descriptionRef.current) {
            new Typed(descriptionRef.current, {
                strings: ['FULLSTACK DEVELOPER'],
                typeSpeed: 50,
                backSpeed: 30,
                startDelay: 800, // Retraso para que comience después del nombre
                showCursor: false,
            });
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 100) {
                setShowArrow(false);
            } else {
                setShowArrow(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShowCards(true);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const section = document.getElementById('skills-section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <PageContainer>
            <BannerContainer>
                <TextSection>
                    <Name>
                        <span ref={nameRef}></span>
                    </Name>
                    <Description>
                        <span ref={descriptionRef}></span>
                    </Description>
                    <DescriptionParagraph>
                        Soy un desarrollador fullstack apasionado por construir aplicaciones web robustas y escalables.
                        Me especializo en tecnologías modernas como React, Node.js y bases de datos relacionales y no relacionales.
                        Estoy comprometido con la mejora continua y siempre busco aprender nuevas herramientas y tecnologías
                        para ofrecer soluciones innovadoras.
                    </DescriptionParagraph>
                    <IconButtonContainer>
                        <IconButton
                            href="https://www.linkedin.com/in/gast%C3%B3n-alessandro-metzger-arce-a8113b15b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="LinkedIn"
                        >
                            <FaLinkedin />
                        </IconButton>
                        <IconButton
                            href="https://github.com/AlessoMTZ/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="GitHub"
                        >
                            <FaGithub />
                        </IconButton>
                    </IconButtonContainer>
                </TextSection>
                <Image src={image1} alt="Foto de Gastón Metzger" />
            </BannerContainer>

            {showArrow && (
                <ArrowContainer
                    initial={{ opacity: 1 }}
                    animate={{ opacity: showArrow ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Arrow onClick={scrollToCards} aria-label="Desplázate hacia abajo">&#x2193;</Arrow>
                </ArrowContainer>
            )}

            <SkillsSection id="skills-section">
                <SectionTitle
                    initial={{ opacity: 0, y: -20 }}
                    animate={showCards ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                >
                    Mis Habilidades
                </SectionTitle>
                <CardGrid>
                    <SkillCard
                        title="Frontend"
                        icons={[
                            { icon: FaReact, label: 'React' },
                            { icon: FaHtml5, label: 'HTML5' },
                            { icon: FaCss3Alt, label: 'CSS3' },
                            { icon: SiJavascript, label: 'JavaScript' },
                        ]}
                    />
                    <SkillCard
                        title="Backend"
                        icons={[
                            { icon: FaNodeJs, label: 'Node.js' },
                            { icon: FaPython, label: 'Python' },
                            { icon: FaJava, label: 'Java' },
                        ]}
                    />
                    <SkillCard
                        title="Database"
                        icons={[
                            { icon: SiPostgresql, label: 'PostgreSQL' },
                            { icon: SiMongodb, label: 'MongoDB' },
                            { icon: FaDatabase, label: 'SQL' },
                        ]}
                    />
                </CardGrid>
            </SkillsSection>
        </PageContainer>
    );
};

export default Home;
