import React, { useState } from 'react';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import LearnMorePopUp from '../components/LearnMorePopUp';
import { TbArrowBackUp } from "react-icons/tb";
import './ThesisProjectPage.css';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import GoTop from "../components/GoTop";

function ThesisProjectPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projeto');
  const [activePopUp, setActivePopUp] = useState(false);

  const handleTabChange = (tabKey, e) => {
    e.preventDefault();
    setActiveTab(tabKey);
  };

  return (
    <div className="page-wrapper">
        <div className="header-container">
        <LogoHeader />
        <div className="title-btn-wrapper">
            {/* <button className="title-btn-back-btn"
                    onClick={goBack}
                    style={{color:currentIndex === 0? inactiveColor:btnActiveColor }}>
              <IoArrowBackOutline />
            </button> */}
            <button className="title-btn-back-btn"
                    onClick={() => navigate(-1)}>
              <TbArrowBackUp size={18} />
            </button>
       </div>
      </div>
        
        <NavBar />

        <PageHeader title={<span>A Verdade e a J-u-s-t-i-ç-a <br/> & <br />WebAR Experiences for Museums</span>} />

        <div className="project-topnav">
            <a href="#projeto"
                className={activeTab === 'projeto' ? 'active' : ''}
                onClick={(e) => handleTabChange('projeto', e)}
            >
                Sobre o Projeto
            </a>
            <a href="#equipa"
                className={activeTab === 'equipa' ? 'active' : ''}
                onClick={(e) => handleTabChange('equipa', e)}
            >
                A Equipa
            </a>
        </div>

        {activeTab === 'projeto' && (
            <>
                <h3 className="project-description">
                    A Verdade e a J-u-s-t-i-ç-a
                </h3>

                <div className="project-container">
                    <div className="project-container-image-author-row">
                        <div className="project-container-image">
                            <img src="images/miratecnica-transparente.webp" alt="A Verdade e a J-u-s-t-i-ç-a" />
                        </div>
                        
                    </div>
                    <div className="project-container-description">
                        <p>
                            A verdade e a justiça são conceitos e ideais morais que foram considerados ao longo dos tempos como sendo virtudes aos quais deveríamos querer atingir.
                        </p>
                        <br />
                        <p>
                            O que tem variado ao longo dos tempos e das sociedades são os conceitos de verdade e justiça, mas não a sua própria existência. Com a inteligência artificial, a separação entre narrativas e factos (era da pós-verdade) os próprios conceitos de verdade e justiça já não tem o mesmo peso social.
                        </p>
                        <br />
                        <div className="project-container-author">
                            <p className="project-container-author-name">Ana Fonseca, 2026</p>
                        </div>
                        <br/>
                        <button onClick={() => setActivePopUp(true)} className="project-container-learn-more">
                            Saiba Mais
                        </button>
                        
                        {activePopUp && (
                            <LearnMorePopUp
                                headerName="O Projeto Artístico"
                                onClose={() => setActivePopUp(false)}
                                imgSrc="images/miratecnica-transparente.webp"
                                descriptionHeader={"A Verdade e a J-u-s-t-i-ç-a"}
                                description={'A partir do conjunto escultórico de homenagem a Eça de Queirós, “A verdade”, onde o escritor está acompanhado pela verdade e onde se lê: "Sobre a nudez forte da Verdade o manto diáphano da phantasia." (citação da sua obra “A relíquia”) surge a ideia de abordar as virtudes, juntando à verdade a justiça. Tema que Ana Fonseca tem vindo a explorar.\n\nA coleção do Museu de Lisboa do Palácio Pimenta aborda a evolução do território de Lisboa através dos tempos. A importância da atual Praça do Comércio como alegoria da própria cidade é muito interessante. O período do século XVII ao estado novo, mostra-nos uma Lisboa pré-terramoto, mas pós restauração até ao fim do estado novo. Nesta imensidão histórica, podemos reconhecer a cidade de Lisboa, no entanto, muito foi se reconfigurando. A pesquisa e mergulho histórico criam fascínio pois é como redescobrir um território que parecia conhecido.\n\nA sua intervenção foca-se nas salas do século XVII ao Estado Novo e no jardim junto à referida estátua, pontuando os espaços com experiências de realidade aumentada que aparecem sobre as obras da coleção, criando uma leitura das mesmas. A artista interroga-se sobre o lugar da Justiça no espaço público: utilização, representatividade, arquitetura efémera e propõe o uso da realidade aumentada como arte urbana não invasiva, mas interventiva.'}
                            />
                        )}
                    </div>
                </div>
            </>
        )}

        {activeTab === 'equipa' && (
            <>
                <h3 className="project-description">
                    A Equipa
                </h3>
                
                <div className="project-container">
                    <div className="team-member">
                        <div className="team-member-header">
                            <img src="/images/henriquematos.webp" alt="Membro 2" />
                            <h4 className="team-member-name">Henrique Matos</h4>
                        </div>
                        <p>
                            Desenvolvedor da aplicação, em âmbito de tese de mestrado na Faculdade de Ciências da Universidade de Lisboa, Henrique tem uma grande paixão por desenvolvimento de aplicações, websites e experiências interativas com foco no utilizador.
                        </p>
                    </div>

                    <div className="team-member reverse">
                        <div className="team-member-header">
                            <img src="/images/anafonseca.png" alt="Membro 1" />
                            <h4 className="team-member-name">Ana Fonseca</h4>
                        </div>
                        <p>
                            Ana Fonseca (São Paulo, Brasil, 1978) vive e trabalha em Lisboa. Artista visual. Licenciou-se na Middlesex University, Londres (2003), estudou na Chelsea College of Arts Foundation in Art and Design, Londres (1999-00).
Artista plástica cuja prática multidisciplinar tem quase sempre como ponto de partida o desenho.
Debruçando-se sobre os paradigmas sociológicos, psicológicos e históricos que marcaram ou marcam os locais por onde tem passado (“velho” mundo e “novo” mundo), o registo e o traço interliga-os de forma anacrónica, transparecendo um humor que é patente em todas as suas obras.
                        </p>
                    </div>

                    

                    <div className="team-member">
                        <div className="team-member-header">
                            <img src="/images/beatriz.webp" alt="Membro 3" />
                            <h4 className="team-member-name">Mª Beatriz Carmo</h4>
                        </div>
                        <p>
Maria Beatriz Carmo é professora associada no Departamento de Informática, da Faculdade  de Ciências, da Universidade de Lisboa, e investigadora do LASIGE. As suas principais áreas de investigação são Realidade Aumentada, Realidade Virtual, Herança Cultural Digital e Visualização.
                        </p>
                    </div>

                    <div className="acknowledgments-section">
                        <h4><b>Agradecimentos</b></h4>
                        <p>
                            Um especial agradecimento a todos os envolvidos neste projeto, cujo apoio e colaboração foram fundamentais para a realização do mesmo. Deixamos aqui o nosso reconhecimento ao Museu de Lisboa e aos seus constituintes por acolherem a aplicação web e ao LASIGE e FCUL pelas tecnologias fornecidas e pelo suporte contínuo dado à equipa.
                        </p>
                        <p>
                            Agradecimentos especiais também à fabulosa artista Renata B. Oliveira pelas fotografias fornecidas, ajudando aos processos de fotogrametria e registos ao longo da conceção deste projeto.
                        </p>
                        <p>

                            Agradecimentos ao fantástico talento da Faculdade de Ciências da Universidade de Lisboa, pela modelação e animação das experiências incidentes no quadro de Dirk Stoop <i>Terreiro do Paço no séc. XVII</i>. 
                            A Rita Dias, Maria Guerreiro e Tiago Rodrigues, agradecemos pelo vídeo desenvolvido, sobre o quadro de Dirk Stoop;     
                            a Nita Pereira, José Brás e João da Silva, agradecemos pelo modelo do Chafariz de Apolo construído. 

                        </p>
                        <div className="acknowledgments-images">
                            <img src="/images/ciencias.webp" alt="Apoio 1" />
                            <img src="/images/lasige.webp" alt="Apoio 2" />
                            <img src="/images/museulisboa.webp" alt="Apoio 3" />
                        </div>
                    </div>
                </div>
            </>
        )}

        <GoTop/>
    </div>
  );
}

export default ThesisProjectPage;