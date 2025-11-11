import {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, ListGroup, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import {useCart} from '../context/CartContext';

function CartPage() {
  const {cart, removeFromCart, clearCart} = useCart();
  const [totalTime, setTotalTime] = useState({hours: 0, minutes: 0, seconds: 0});

  useEffect(() => {
    calculateTotalTime();
  }, [cart]);

  const calculateTotalTime = () => {
    let totalHours = 0;

    cart.forEach(item => {
      const dist = parseFloat(item.params.distance);
      const spd = parseFloat(item.params.speed);
      if (dist > 0 && spd > 0) {
        totalHours += dist / spd;
      }
    });

    const h = Math.floor(totalHours);
    const minutes = (totalHours - h) * 60;
    const m = Math.floor(minutes);
    const seconds = (minutes - m) * 60;
    const s = Math.floor(seconds);

    setTotalTime({hours: h, minutes: m, seconds: s});
  };

  const calculateItemTime = (distance, speed) => {
    const dist = parseFloat(distance);
    const spd = parseFloat(speed);

    if (dist > 0 && spd > 0) {
      const hours = dist / spd;
      const h = Math.floor(hours);
      const minutes = (hours - h) * 60;
      const m = Math.floor(minutes);
      const seconds = (minutes - m) * 60;
      const s = Math.floor(seconds);

      return `${h} ч. ${m} мин. ${s} сек.`;
    }
    return '0 ч. 0 мин. 0 сек.';
  };

  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%2317a2b8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='white'%3EToeing%3C/text%3E%3C/svg%3E";

  const breadcrumbItems = [
    {label: 'Главная', path: '/'},
    {label: 'Корзина', path: null},
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Container className='py-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h2>Заявка #{cart.length > 0 ? '1' : '0'}</h2>
          {cart.length > 0 && (
            <div className='text-muted'>
              В корзине {cart.length} {cart.length === 1 ? 'услуга' : 'услуги'}
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <Alert variant='info'>
            Корзина пуста. <Link to='/'>Перейти к услугам</Link>
          </Alert>
        ) : (
          <>
            <Row className='g-4 mb-4'>
              {cart.map((item, index) => (
                <Col md={12} key={item.id}>
                  <Card className='shadow-sm'>
                    <Card.Body>
                      <Row className='align-items-center'>
                        <Col md={2}>
                          <img
                            src={item.image || defaultImage}
                            alt={item.direction}
                            className='img-fluid rounded'
                            style={{maxHeight: '100px', objectFit: 'cover'}}
                          />
                        </Col>
                        <Col md={7}>
                          <h5>{item.direction}</h5>
                          <ListGroup variant='flush'>
                            <ListGroup.Item className='px-0 border-0'>
                              <Row>
                                <Col xs={4}>
                                  <strong>Расстояние:</strong>
                                </Col>
                                <Col xs={8}>{item.params.distance} км</Col>
                              </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='px-0 border-0'>
                              <Row>
                                <Col xs={4}>
                                  <strong>Скорость:</strong>
                                </Col>
                                <Col xs={8}>{item.params.speed} км/ч</Col>
                              </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className='px-0 border-0'>
                              <Row>
                                <Col xs={4}>
                                  <strong>Время:</strong>
                                </Col>
                                <Col xs={8}>
                                  {calculateItemTime(item.params.distance, item.params.speed)}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          </ListGroup>
                        </Col>
                        <Col md={3} className='text-end'>
                          <Button
                            variant='outline-danger'
                            size='sm'
                            onClick={() => removeFromCart(item.id)}>
                            Удалить
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <Card className='shadow-sm bg-light'>
              <Card.Body>
                <Row className='align-items-center'>
                  <Col md={8}>
                    <h4 className='mb-0'>Общее время полета:</h4>
                  </Col>
                  <Col md={4} className='text-end'>
                    <h3 className='mb-0 text-info'>
                      {totalTime.hours} ч. {totalTime.minutes} мин. {totalTime.seconds} сек.
                    </h3>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className='text-center mt-4'>
              <Button variant='outline-secondary' className='me-2' onClick={clearCart}>
                Очистить корзину
              </Button>
              <Button variant='info' className='text-white'>
                Оформить заказ
              </Button>
            </div>
          </>
        )}
      </Container>
    </>
  );
}

export default CartPage;
