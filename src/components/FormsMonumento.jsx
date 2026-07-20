import React, { useState } from 'react';
import { useNavigate } from "react-router";
import ModelViewerPopUp from './ModelViewerPopUp'; // Adjust the import path as needed
import './FormsMonumento.css'
import { warn } from 'three';

// Grouping the questions into an array makes it easy to step through them
const QUESTIONS = [
    {
        id: "q1",
        question: "Acha que a justiça deve ter alguma separação do espaço público?", 
        options: [
            { value: "d1a1", label: "Sim, para preservar a privacidade de quem a quiser explorar/visitar/habitar" },
            { value: "d1a2", label: "Sim, a Justiça deve ser protegida e defendida. Cabe apenas à Justiça saber o que lá se passa" },
            { value: "d1a3", label: "Não, a justiça deve ser transparente e sem fronteiras" },
            { value: "d1a4", label: "Não, a Justiça deve ser permeável e refletir as ideologias, valores políticos e manifestações sociais de cada lugar e de cada tempo" }
        ]
    },
    {
        id: "q2",
        question: "Já vimos as fronteiras da justiça no espaço público, na nossa vida. Vamos iniciar uma reflexão sobre a ideia de Justiça!",
        options: [
            { value: "d2a1", label: "A justiça está presente em todas as nossas interações pessoais e sociais. A justiça, sendo assim, a pluralidade de pensamento sobre a Justiça é reflexo de si mesma" },
            { value: "d2a2", label: "A Justiça, pressupõe ordem e reflexão. A Justiça ordeira e igual para todos" },
            { value: "d2a3", label: "A justiça é um conceito inerente ao ser humano, independentemente das circunstâncias e perspetivas" },
            { value: "d2a4", label: "Pensar sobre a Justiça é muito complexo e abstrato, apesar de se refletir no dia-a-dia de todos, requer rigor e distanciamento" }
        ]
    },
    {
        id: "q3",
        question: "Prosseguindo na reflexão sobre a Justiça, como a Justiça se apresenta à sociedade",
        options: [
            { value: "d3a1", label: "A justiça é um valor nobre, se chama atenção é pela sua ausência e não pela sua presença" },
            { value: "d3a2", label: "A Justiça deve impor-se de forma discreta e despojada" },
            { value: "d3a3", label: "A Justiça é um dos valores mais importantes em sociedade, a sua presença deve ser celebrada" },
            { value: "d3a4", label: "A Justiça, é um valor superior e deve ter um estatuto singular e que faça jus à sua relevância" }
        ]
    },
    {
        id: "q4",
        question: "Até agora estivemos a pensar sobre o que achamos da relação da Justiça com os indivíduos e com as sociedades. Vamos agora aprofundar sobre a natureza da justiça que queremos",
        options: [
            { value: "d4a1", label: "Uma Justiça ideal e universal é uma utopia, mas serve de inspiração para as nossas vidas" },
            { value: "d4a2", label: "A utopia da Justiça é um objetivo concreto a alcançar através de uma reestruturação profunda e planeada da sociedade" },
            { value: "d4a3", label: "Pensamentos utópicos sobre a natureza da Justiça podem desresponsabilizar as ações no presente" },
            { value: "d4a4", label: "A projeção de uma Justiça ideal idealizada gera expectativas irrealistas e descredibiliza as instituições reais que servem cada cultura" }
        ]
    }
];

function FormsMonumento() {
    const navigate = useNavigate();
    
    // State to track our position and data
    const [currentStep, setCurrentStep] = useState(0);
    const [currentSelection, setCurrentSelection] = useState(""); // Holds selection for current step
    const [allAnswers, setAllAnswers] = useState({}); // Stores all chosen answers { q1: "d1a1", q2: "d2a3"... }
    
    // State for the PopUp
    const [showPopUp, setShowPopUp] = useState(false);

    const handleChange = (e) => {
        setCurrentSelection(e.target.value);
    };

    const handleContinuar = (e) => {
        e.preventDefault();
        
        if (!currentSelection){
            //alert("Por favor selecione uma opção.") //ver porque é que nao funciona
            return;
        } ; // Prevent advancing if no option is selected

        // Save the answer for the current question
        const currentQuestionId = QUESTIONS[currentStep].id;
        setAllAnswers(prev => ({
            ...prev,
            [currentQuestionId]: currentSelection
        }));

        // Trigger the popup
        setShowPopUp(true);
    };

    const handlePopUpProceed = () => {
        // Close the pop-up
        setShowPopUp(false);

        // Check if we are on the last question
        if (currentStep === QUESTIONS.length - 1) {
            // If it's the last question, log all answers (optional) and redirect
            console.log("Respostas finais: ", allAnswers);
            navigate("/final-page");
        } else {
            // Otherwise, advance to the next question and reset the radio selection
            setCurrentStep(prev => prev + 1);
            setCurrentSelection("");
        }
    };

    // Grab the data for the step we are currently displaying
    const currentQ = QUESTIONS[currentStep];

    return (
        
        <div className="forms-monumento-wrapper">
            <div className="forms-img-wrapper">
                <img className="forms-img" src="/images/miratecnica-transparente.webp"/>
            </div>
            
            <form onSubmit={handleContinuar}>
                <div className="form-data" key={currentQ.id}>
                    <p className="question">{currentQ.question}</p>
                    <br/>
                    <div className="options-container">
                        {currentQ.options.map((option, index) => (
                            <label key={index} style={{ display: 'block', marginBottom: '10px' }}>
                                <input 
                                    type="radio"
                                    value={option.value}
                                    checked={currentSelection === option.value}
                                    onChange={handleChange}
                                /> 
                                {" "+option.label}
                            </label>
                        ))}
                    </div>
                    <button 
                        type="submit" 
                        className="btn-continue-form" 
                        disabled={!currentSelection} // Disable button until an answer is picked
                    >
                        Continuar
                    </button>
                </div>
            </form>

            {/* Render the PopUp when triggered */}
            {showPopUp && (
                <ModelViewerPopUp 
                    headerName="Monumento à Justiça"
                    onClose={() => setShowPopUp(false)}
                    onProceed={handlePopUpProceed}
                    modelViewerSrc="/models/monumentoajustica.glb" // Or map this based on 'currentSelection'
                    description="O monumento reflete a sua visão de justiça, atual. Pretende continuar?"
                    arButtonEnabled={false}
                />
            )}
        </div>
    );
}

export default FormsMonumento;