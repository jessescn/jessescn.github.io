import { GetStaticProps } from "next";
import { useEffect } from "react";
import { PageContainer } from "../../components/design/PageContainer";
import { Title } from "../../components/design/Title";
import { Content } from "../../styles/projects/styles";

type Project =  {
    id: number,
    description: string,
    name: string,
    link: string,
    languages: string[]
}

interface ProjectsProps {
    projects: Project[],
    setShowMenu: (show: boolean) => void
}

export default function Projects({ projects, setShowMenu }: ProjectsProps){

    useEffect(()=> {
        setShowMenu(false)
    },[])
    
    return(
        <PageContainer>
            <Title fontSize={2.2}>
                What i've been doing
            </Title>
            <Content>
                {projects.map(project => (
                    <a key={project.id} href={project.link} target="_blank">
                        <h1>{project.name}</h1>
                        <strong>{project.description}</strong>
                        <div>
                            <p>Tecnologias</p>
                            <span>{project.languages}</span>
                        </div>
                    </a>
                ))}
            </Content>
        </PageContainer>
    )   
}

export const getStaticProps: GetStaticProps = async() => {

    const validRepos = ["dt-money", "ignews", "custom-notion-template", "portfolio"] 

    const response = await fetch('https://api.github.com/users/jessescn/repos')
    const data = await response.json()

    const projects = data.map(repo => {
        return {
            id: repo.id,
            description: repo.description,
            name: repo.name,
            link: repo.html_url,
            languages: repo.language
        }
    }).filter(elm => validRepos.includes(elm.name))

    return {
        props: {
            projects
        },
        revalidate: 60 * 60
    }
    
}