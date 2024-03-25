import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar() {
    return (
        <Navbar expand="lg" className="bg-danger">
            <Container>
                <Navbar.Brand href="/" style={{fontWeight:"bold",color:"white",}}>AstralSwag</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{borderColor: "white",backgroundColor: "white"}}>
                    <span className="navbar-toggler-icon" style={{backgroundColor: "white"}}></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/" style={{color:"white",}}>Home</Nav.Link>
                        <Nav.Link href="/astromon" style={{color:"white",}}>Astromon</Nav.Link>
                        <Nav.Link href="/dimensional-defense/Fire" style={{color:"white",}}>Dim. Defense</Nav.Link>
                        <Nav.Link href="/dimensional-golem/Fire" style={{color:"white",}}>Dim. Golem</Nav.Link>
                        <Nav.Link href="/titan/Fire" style={{color:"white",}}>Titan</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
