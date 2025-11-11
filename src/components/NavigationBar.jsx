import {Badge, Container, Nav, Navbar} from 'react-bootstrap';
import {Link, useLocation} from 'react-router-dom';
import {useCart} from '../context/CartContext';

function NavigationBar() {
  const location = useLocation();
  const {cart} = useCart();

  const cartItemsCount = cart.reduce((sum, item) => sum + 1, 0);

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
            <Nav.Link as={Link} to='/cart' active={location.pathname === '/cart'}>
              Корзина
              {cartItemsCount > 0 && (
                <Badge bg='info' className='ms-2'>
                  {cartItemsCount}
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
