import { useNavigate } from 'react-router-dom'; 
import { IoArrowBackOutline } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button className="title-btn-back-btn"
                            onClick={handleBack}
                            style={{color:'#003C72', borderRadius:'50px', alignItems:'center', marginLeft: '20px',
                            marginRight:'50px'}}>
                      <IoArrowBackOutline size={18} />
        </button>
  );
};

export default BackButton;
