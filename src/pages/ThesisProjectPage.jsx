import React, { useState } from 'react';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import LearnMorePopUp from '../components/LearnMorePopUp';
import './ThesisProjectPage.css';

function ThesisProjectPage() {
  const [activePopUp, setActivePopUp] = useState(null);

  return (
    <div className="page-wrapper">
        <LogoHeader />
        <PageHeader title={<span>Nota artística do projeto</span>} />
        <NavBar />

        <h3 className="project-description">
            No âmbito de tese de Mestrado em Engenharia Informática, em parceria com a artista Ana Fonseca, concebeu-se o projeto artístico "A Verdade e a J-u-s-t-i-ç-a". Aplicada à coleção do Museu de Lisboa, a o projeto artístico propõe uma reflexão sobre as peças, expandindo as alegorias representadas em Realidade Aumentada.
            <br />  
            Abaixo, lê-se a nota da artista, sobre os ideais em que o projeto se assenta.
      </h3>

        <div className="project-container">
            <div className="project-container-image-author-row">
                <div className="project-container-image">
                    <img src="/images/anafonseca.png" alt="Project" />
                </div>
                <div className="project-container-author">
                    <p className="project-container-author-name">Ana Fonseca, 2026</p>
                </div>
            </div>
            <div className="project-container-description">
                <p>"A verdade e a justiça são conceitos e ideais morais que foram considerados ao longo dos tempos como sendo virtudes aos quais deveríamos querer atingir. 
                    O que tem variado ao longo dos tempos e das sociedades são os conceitos de verdade e justiça, mas não a sua própria existência. Com a inteligência artificial, a separação entre narrativas e factos (era da pós-verdade) os próprios conceitos de verdade e justiça já não tem o mesmo peso social."
                </p>
                <button onClick={() => setActivePopUp('projeto')} className="project-container-learn-more">
                  Saiba Mais
                </button>
                {activePopUp === 'projeto' && (
                    <LearnMorePopUp
                        headerName="O Projeto Artístico"
                        onClose={() => setActivePopUp(null)}
                        imgSrc="/images/anafonseca.png"
                        description={` "A verdade e a justiça são conceitos e ideais morais que foram considerados ao longo dos tempos como sendo virtudes aos quais deveríamos querer atingir. 
                            
O que tem variado ao longo dos tempos e das sociedades são os conceitos de verdade e justiça, mas não a sua própria existência. Com a inteligência artificial, a separação entre narrativas e factos (era da pós-verdade) os próprios conceitos de verdade e justiça já não tem o mesmo peso social. 

A partir do conjunto escultórico de homenagem a Eça de Queirós, “A verdade”, onde o escritor está acompanhado pela verdade e onde se lê: "Sobre a nudez forte da Verdade o manto diáphano da phantasia." (citação da sua obra “A relíquia”) surge a ideia de abordar as virtudes, juntando à verdade a justiça. Tema que Ana Fonseca tem vindo a explorar.

A coleção do Museu de Lisboa do Palácio Pimenta aborda a evolução do território de Lisboa através dos tempos. A importância da atual Praça do Comércio como alegoria da própria cidade é muito interessante. O período do século XVII ao estado novo, mostra-nos uma Lisboa pré-terremoto, mas pós restauração até ao fim do estado novo. Nesta imensidão histórica, podemos reconhecer a cidade de Lisboa, no entanto, muito foi se reconfigurando. A pesquisa e mergulho histórico criam fascínio pois é como redescobrir um território que parecia conhecido. 

A sua intervenção foca-se nas salas do século XVII ao Estado Novo e no jardim junto à referida estátua, pontuando os espaços com experiências de realidade aumentada que aparecem sobre as obras da coleção, criando uma leitura das mesmas. A artista interroga-se sobre o lugar da Justiça no espaço público: utilização, representatividade, arquitetura efémera e propõe o uso da realidade aumentada como arte urbana não invasiva, mas interventiva."
     `}
                    />
                )}
            </div>
        </div>
    </div>
  );
}

export default ThesisProjectPage;