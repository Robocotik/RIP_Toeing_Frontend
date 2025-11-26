import {Badge, Container, Nav, Navbar} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';

function NavigationBar() {
  const location = useLocation();

  const flyRequestItemsCount = flyRequest.reduce((sum, item) => sum + 1, 0);

  return (
    <Navbar bg='white' expand='lg' className='border-bottom shadow-sm'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='toeing-logo'>
          Toeing
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link as={Link} to='/rumbs' active={location.pathname === '/'}>
              Главная
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
