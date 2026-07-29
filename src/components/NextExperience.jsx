import { useNavigate } from 'react-router-dom';
import { IoArrowForwardOutline } from "react-icons/io5";

function NextExperience({routeTo}) {
    const navigate = useNavigate()
    return (
       
                <button className="ar-back-btn" onClick={() => navigate(routeTo)}>
                  <IoArrowForwardOutline style={{ marginRight: '8px' }} /> Próxima Experiência
                </button>
       
    )
}

export default NextExperience