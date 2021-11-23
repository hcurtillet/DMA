import { Container } from 'react-bootstrap';
import './style.css'

function CenterContainer({ children }) {
    return (
        <Container className="center-container d-flex algin-items-center justify-content-center" >
            <div className="w-100" style={{ marginTop: "50px", maxWidth: "400px" }}>
                {children}
            </div>
        </Container>
    );
}

export default CenterContainer