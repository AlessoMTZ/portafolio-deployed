import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';
import Typed from 'typed.js';
import 'typeface-fira-code';
import project1Image from '../Images/project1.webp';

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
    color:rgb(185, 185, 185);
    font-family: 'Fira Code', monospace;
`;

const ProjectGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    padding: 0 1rem;
`;

const ProjectCard = styled.div`
    background-color: #1a1a1a;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    transition: transform 0.3s ease;
`;

const ProjectImage = styled.img`
    width: 100%;
    height: 600px;
    object-fit: cover;
    border-radius: 8px;
`;

const ProjectTitle = styled.h2`
    font-size: 2rem;
    margin: 0;
    color: #acc53d;
`;

const ProjectDescription = styled.p`
    font-size: 1.2rem;
    color: #999;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const ProjectLink = styled.a`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    background-color: #acc53d;
    color: #1a1a1a;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
        background-color: #1a1a1a;
        color: #acc53d;
        transform: scale(1.1);
    }

    svg {
        margin-left: 0.5rem;
    }
`;

const Projects = () => {
    const projects = [
        {
            title: 'Asociación Cristo Rey',
            description: 'Este es un proyecto que realicé con el fin de brindar visibilidad y mayor información a quienes interese apadrinar o ayudar en esta asociación.',
            githubLink: 'https://github.com/AlessoMTZ/',
            websiteLink: 'https://asociacioncristorey.com/  ', // Enlace al sitio web
            imageUrl: project1Image,
        },
        // Puedes agregar más proyectos aquí
    ];
    
    const mainTitleRef = useRef(null);

    useEffect(() => {
        if (mainTitleRef.current) {
            new Typed(mainTitleRef.current, {
                strings: ['Mis Proyectos'],
                typeSpeed: 50,
                backSpeed: 30,
                showCursor: false,
            });
        }

        return () => {
            if (mainTitleRef.current?._typed) {
                mainTitleRef.current._typed.destroy();
            }
        };
    }, []);

    return (
        <PageContainer>
            <Title ref={mainTitleRef}></Title>
            <ProjectGrid>
                {projects.map((project, index) => (
                    <ProjectCard key={index}>
                        <ProjectImage src={project.imageUrl} alt={project.title} />
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDescription>{project.description}</ProjectDescription>
                        <ButtonContainer>
                            <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                Ver en GitHub <FaGithub />
                            </ProjectLink>
                            <ProjectLink href={project.websiteLink} target="_blank" rel="noopener noreferrer">
                                Ver Sitio Web
                            </ProjectLink>
                        </ButtonContainer>
                    </ProjectCard>
                ))}
            </ProjectGrid>
        </PageContainer>
    );
};

export default Projects;
