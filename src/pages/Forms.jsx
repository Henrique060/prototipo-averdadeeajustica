import PageHeader from '../components/PageHeader';
import LogoHeader from '../components/LogoHeader';
import { IoArrowBackOutline } from "react-icons/io5";

function Forms() {
    return (
    <div className="page-wrapper">
        <LogoHeader />
        <div className="quadro-container">
            <div className="title-wrapper">
                <div className="title-btn-wrapper">
                    <button className="title-btn-back-btn" onClick={() => window.history.back()}>
                        <IoArrowBackOutline />
                    </button>
                    <PageHeader title="Formulários para Estudo com Utilizadores" />
                </div>
            </div>
        </div>

        <p className="experiencie-list-text" >
            No âmbito da tese 'WebAR Experiences for Museums', desenvolvida pelo estudante de mestrado Henrique Matos, na Faculdade de Ciências da Universidade de Lisboa, foi criada a aplicação Web progressiva (Progressive Web App - PWA) chamada 'A Verdade e a J-u-s-t-i-ç-a', em parceria com a artista Ana Fonseca.
          </p>

        <p clasName="experiencie-list-text">
            No formulário de "Consentimento", consentir-se-à que os dados do participante deste estudo sejam visualizados e tratados, de forma sempre anónima, pela equipa, de modo a melhorar a usabilidade desta aplicação.
        </p>

        <p className="experiencie-list-text">
            No formulário de "Estudo com Utilizadores", responder-se-ão aos questionários de estudo de usabilidade da aplicação em questão.
        </p>
        <p className="experiencie-list-text">
            A equipa agradece a participação neste estudo.
        </p>

      <div className="forms-container">
        <a className="project-container-learn-more" href="https://docs.google.com/forms/d/e/1FAIpQLSdLZLd-w-_HmkyJFRl964-n5cmjhtAc5QO6syXgdvGwSZMx-g/viewform?usp=publish-editor" target="_blank">Consentimento</a>
        <a className="project-container-learn-more" href="https://docs.google.com/forms/d/e/1FAIpQLScOkeI39hlLmXAgONEn5Fvtad-b102wOm4irbNiyfKbd3DZdg/viewform?usp=dialog" target="_blank">Estudo com Utilizadores</a>
        
      </div>
    </div>
  );
}

export default Forms;
