import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <Navbar bg='white' expand='lg' className='border-bottom shadow-sm'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='toeing-logo'>
          Toeing
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
