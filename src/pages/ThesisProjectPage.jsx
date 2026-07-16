import React, { useState } from 'react';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import LearnMorePopUp from '../components/LearnMorePopUp';
import './ThesisProjectPage.css';

function ThesisProjectPage() {
  const [activeTab, setActiveTab] = useState('projeto');
  const [activePopUp, setActivePopUp] = useState(false);

  const handleTabChange = (tabKey, e) => {
    e.preventDefault();
    setActiveTab(tabKey);
  };

  return (
    <div className="page-wrapper">
        <LogoHeader />
        
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
                                description={'A partir do conjunto escultórico de homenagem a Eça de Queirós, “A verdade”, onde o escritor está acompanhado pela verdade e onde se lê: "Sobre a nudez forte da Verdade o manto diáphano da phantasia." (citação da sua obra “A relíquia”) surge a ideia de abordar as virtudes, juntando à verdade a justiça. Tema que Ana Fonseca tem vindo a explorar.\n\nA coleção do Museu de Lisboa do Palácio Pimenta aborda a evolução do território de Lisboa através dos tempos. A importância da atual Praça do Comércio como alegoria da própria cidade é muito interessante. O período do século XVII ao estado novo, mostra-nos uma Lisboa pré-terremoto, mas pós restauração até ao fim do estado novo. Nesta imensidão histórica, podemos reconhecer a cidade de Lisboa, no entanto, muito foi se reconfigurando. A pesquisa e mergulho histórico criam fascínio pois é como redescobrir um território que parecia conhecido.\n\nA sua intervenção foca-se nas salas do século XVII ao Estado Novo e no jardim junto à referida estátua, pontuando os espaços com experiências de realidade aumentada que aparecem sobre as obras da coleção, criando uma leitura das mesmas. A artista interroga-se sobre o lugar da Justiça no espaço público: utilização, representatividade, arquitetura efémera e propõe o uso da realidade aumentada como arte urbana não invasiva, mas interventiva.'}
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
                            <img src="/images/anafonseca.png" alt="Membro 1" />
                            <h4 className="team-member-name">Ana Fonseca</h4>
                        </div>
                        <p>
                            Breve texto sobre o primeiro membro da equipa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    <div className="team-member reverse">
                        <div className="team-member-header">
                            <img src="/images/henriquematos.webp" alt="Membro 2" />
                            <h4 className="team-member-name">Henrique Matos</h4>
                        </div>
                        <p>
                            Breve texto sobre o segundo membro da equipa. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    <div className="team-member">
                        <div className="team-member-header">
                            <img src="/images/beatrizcarmo.webp" alt="Membro 3" />
                            <h4 className="team-member-name">Mª Beatriz Carmo</h4>
                        </div>
                        <p>
                            Breve texto sobre o terceiro membro da equipa. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
                        </p>
                    </div>

                    <div className="acknowledgments-section">
                        <h4>Agradecimentos</h4>
                        <p>
                            Um especial agradecimento a todos os envolvidos neste projeto, cujo apoio e colaboração foram fundamentais para a realização do mesmo. Deixamos aqui o nosso reconhecimento.
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
    </div>
  );
}

export default ThesisProjectPage;