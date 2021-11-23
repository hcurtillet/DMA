import { Container } from 'react-bootstrap';

function CenterContainer({ children }) {
    return (
        <Container className="d-flex algin-items-center justify-content-center" >
            <div className="w-100" style={{ marginTop: "50px", maxWidth: "400px" }}>
                {children}
            </div>
        </Container>
    );
}

export default CenterContainer