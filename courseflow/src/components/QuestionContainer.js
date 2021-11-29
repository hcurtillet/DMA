import { Container } from 'react-bootstrap';
import './style.css'

function QuestionContainer({ children }) {
    return (
        <Container className="center-container d-flex algin-items-center justify-content-center" >
            <div className="w-100" style={{ marginTop: "0px", width: "100%", minWidth: "100vw"}}>
                {children}
            </div>
        </Container>
    );
}

export default QuestionContainer