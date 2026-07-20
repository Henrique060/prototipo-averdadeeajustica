import FormsMonumento from "../components/FormsMonumento";
import LogoHeader from "../components/LogoHeader"
import PageHeader from "../components/PageHeader";
import { IoArrowBackOutline } from "react-icons/io5";


function MonumentoQuestionario() {
    return(
    <div className="page-wrapper">
      <LogoHeader />
        <div className="quadro-container">
            <div className="title-wrapper">
                <div className="title-btn-wrapper">
                    <button className="title-btn-back-btn" onClick={() => window.history.back()}>
                        <IoArrowBackOutline />
                    </button>
                    <PageHeader title={"Monumento à Justiça"} />
                </div>
            </div>

            <FormsMonumento/>
        </div>     
    </div>
    )
}

export default MonumentoQuestionario