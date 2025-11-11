import { useEffect, useState } from 'react';
import { Badge, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FlyRequestItem } from '../types';

function NavigationBar() {
  const location = useLocation();
  const [flyRequestItemsCount, setFlyRequestItemsCount] = useState<number>(0);

  useEffect(() => {
    // Функция для обновления счетчика из localStorage
    const updateCount = () => {
      const saved = localStorage.getItem('flyRequest');
      if (saved) {
        const items: FlyRequestItem[] = JSON.parse(saved);
        setFlyRequestItemsCount(items.length);
      } else {
        setFlyRequestItemsCount(0);
      }
    };

    // Обновляем при монтировании
    updateCount();

    // Слушаем изменения localStorage
    window.addEventListener('storage', updateCount);

    // Кастомное событие для обновления счетчика
    window.addEventListener('flyRequestUpdated', updateCount);

    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('flyRequestUpdated', updateCount);
    };
  }, []);

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
