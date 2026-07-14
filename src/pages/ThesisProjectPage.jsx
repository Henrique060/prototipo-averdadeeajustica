import React, { useState } from 'react';
import './Tutorial.css';
import PageHeader from '../components/PageHeader';
import NavBar from '../components/NavBar';
import LogoHeader from '../components/LogoHeader';
import LearnMorePopUp from '../components/LearnMorePopUp';
import './ThesisProjectPage.css';

//dados para substituir no useState da navbar topo
const NAVBAR_DATA = {
    tese: {
        header:' A Tese lorem ipsum - falar o que preciso sobre introdução',
        imageSrc: '/images/henriquematos.webp',
        description: 'WebAR Experiences for Museums',
        author: 'Henrique Matos, 2026',
        popUpTitle: 'A Tese de Mestrado',
        shortQuote: 'Tenho o prazer de apresentar a web app "A Verdade e a J-u-s-t-i-ç-a", do mesmo nome que o projeto artístico associado, dirigido pela fantástica artista Ana Fonseca. Esta aplicação foi concebida no âmbito de tese, em Engenharia Informática, da Faculdade de Ciências da Universidade de Lisboa. \nEsta web app',
        popUpDescription: 'Descrição da tese lorem ipsum'
    },

    projeto: {
        header: 'No ambito (....) lorem ipsum',
        imageSrc: 'images/anafonseca.png',
        description: 'A Verdade e a J-u-s-t-i-ç-a',
        author: 'Ana Fonseca, 2026',
        popUpTitle: 'O Projeto Artístico',
        shortQuote: 'A verdade e a justiça são conceitos e ideais morais que foram considerados ao longo dos tempos como sendo virtudes aos quais deveríamos querer atingir. \n O que tem variado ao longo dos tempos e das sociedades são os conceitos de verdade e justiça, mas não a sua própria existência. Com a inteligência artificial, a separação entre narrativas e factos (era da pós-verdade) os próprios conceitos de verdade e justiça já não tem o mesmo peso social. \n A partir do conjunto escultórico de homenagem a Eça de Queirós, “A verdade”, onde o escritor está acompanhado pela verdade e onde se lê: "Sobre a nudez forte da Verdade o manto diáphano da phantasia." (citação da sua obra “A relíquia”) surge a ideia de abordar as virtudes, juntando à verdade a justiça. Tema que Ana Fonseca tem vindo a explorar. \nA coleção do Museu de Lisboa do Palácio Pimenta aborda a evolução do território de Lisboa através dos tempos. A importância da atual Praça do Comércio como alegoria da própria cidade é muito interessante. O período do século XVII ao estado novo, mostra-nos uma Lisboa pré-terremoto, mas pós restauração até ao fim do estado novo. Nesta imensidão histórica, podemos reconhecer a cidade de Lisboa, no entanto, muito foi se reconfigurando. A pesquisa e mergulho histórico criam fascínio pois é como redescobrir um território que parecia conhecido.  \nA sua intervenção foca-se nas salas do século XVII ao Estado Novo e no jardim junto à referida estátua, pontuando os espaços com experiências de realidade aumentada que aparecem sobre as obras da coleção, criando uma leitura das mesmas. A artista interroga-se sobre o lugar da Justiça no espaço público: utilização, representatividade, arquitetura efémera e propõe o uso da realidade aumentada como arte urbana não invasiva, mas interventiva.',
        popUpDescription: 'A verdade e a justiça são conceitos e ideias morais'
    }
};

function ThesisProjectPage() {
  const [activeTab, setActiveTab] = useState('tese')
  const [activePopUp, setActivePopUp] = useState(null);

  //conteudo atualmente ativo
  const currentContent = NAVBAR_DATA[activeTab];

  const handleTabChange = (tabKey, e) => {
    e.preventDefault();
    setActiveTab(tabKey);
  }


  return (
    <div className="page-wrapper">
        <LogoHeader />
        
        <NavBar />

        <PageHeader title={<span>A Verdade e a J-u-s-t-i-ç-a & <br />WebAR Experiences for Museums</span>} />

        <div className="project-topnav">
            <a href="#tese"
                className={activeTab === 'tese' ? 'active':''}
                onClick={(e) => handleTabChange('tese', e)}
            > Sobre a Tese 
            </a>
            <a href="#projeto"
                className={activeTab === 'projeto' ? 'active' : ''}
                onClick={(e) => handleTabChange('projeto', e)}
            >Sobre o Projeto
            </a>
        </div>

        

        <h3 className="project-description">
            {currentContent.description}
      </h3>

        <div className="project-container">
            <div className="project-container-image-author-row">
                <div className="project-container-image">
                    <img src={currentContent.imageSrc} alt={currentContent.description} />
                </div>
                <div className="project-container-author">
                    <p className="project-container-author-name">{currentContent.author}</p>
                </div>
            </div>
            <div className="project-container-description">
                <p>{currentContent.shortQuote}</p>
                <button onClick={() => setActivePopUp('active-info')} className="project-container-learn-more">
                  Saiba Mais
                </button>
                {activePopUp === currentContent && (
                    <LearnMorePopUp
                        headerName={currentContent.description}
                        onClose={() => setActivePopUp(null)}
                        imgSrc={currentContent.imageSrc}
                        description={currentContent.popUpDescription}
                    />
                )}
            </div>
        </div>
    </div>
  );
}

export default ThesisProjectPage;