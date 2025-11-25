import {Badge, Container, Nav, Navbar} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
import {useFlyRequest} from '../context/FlyRequestContext';

function NavigationBar() {
  const location = useLocation();
  const {flyRequest} = useFlyRequest();

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
            <Nav.Link as={Link} to='/' active={location.pathname === '/'}>
              Главная
            </Nav.Link>
            <Nav.Link as={Link} to='/flyRequest' active={location.pathname === '/flyRequest'}>
              Заявка
              {flyRequestItemsCount > 0 && (
                <Badge bg='info' className='ms-2'>
                  {flyRequestItemsCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
