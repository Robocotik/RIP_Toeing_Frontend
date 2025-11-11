import { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, ListGroup, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserFlyRequest } from '../api/rumbs';
import Breadcrumbs from '../components/Breadcrumbs';
import { FlyRequestItem } from '../types';

interface TotalTime {
  hours: number;
  minutes: number;
  seconds: number;
}

function FlyRequestPage() {
  const [flyRequest, setFlyRequest] = useState<FlyRequestItem[]>([]);
  const [totalTime, setTotalTime] = useState<TotalTime>({ hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUserFlyRequest();
  }, []);

  useEffect(() => {
    calculateTotalTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyRequest]);

  const loadUserFlyRequest = async () => {
    setLoading(true);
    try {
      const userId = 1; // ID пользователя
      const data = await getUserFlyRequest(userId);

      if (data && data.items) {
        // Обновляем состояние корзины из бэкенда
        setFlyRequest(data.items);
        localStorage.setItem('flyRequest', JSON.stringify(data.items));
      } else {
        // Если бэкенд недоступен, используем localStorage
        const saved = localStorage.getItem('flyRequest');
        if (saved) {
          setFlyRequest(JSON.parse(saved));
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке корзины:', error);
      // Fallback на localStorage
      const saved = localStorage.getItem('flyRequest');
      if (saved) {
        setFlyRequest(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  };

  const removeFromFlyRequest = (id: number) => {
    const updatedFlyRequest = flyRequest.filter(item => item.id !== id);
    setFlyRequest(updatedFlyRequest);
    localStorage.setItem('flyRequest', JSON.stringify(updatedFlyRequest));
    window.dispatchEvent(new Event('flyRequestUpdated'));
  };

  const clearFlyRequest = () => {
    setFlyRequest([]);
    localStorage.setItem('flyRequest', JSON.stringify([]));
    window.dispatchEvent(new Event('flyRequestUpdated'));
  };

  const calculateTotalTime = () => {
    let totalHours = 0;

    flyRequest.forEach(item => {
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

    setTotalTime({ hours: h, minutes: m, seconds: s });
  }; const calculateItemTime = (distance: string, speed: string): string => {
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
    { label: 'Главная', path: '/' },
    { label: 'Заявка', path: null },
  ];

  if (loading) {
    return (
      <Container className='py-5 text-center'>
        <Spinner animation='border' variant='info' />
        <p className='mt-3'>Загрузка корзины...</p>
      </Container>
    );
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Container className='py-4'>
        <div className='d-flex justify-content-between align-items-center mb-4'>
          <h2>Заявка #{flyRequest.length > 0 ? '1' : '0'}</h2>
          {flyRequest.length > 0 && (
            <div className='text-muted'>
              В заявке {flyRequest.length} {flyRequest.length === 1 ? 'румб' : 'румба'}
            </div>
          )}
        </div>

        {flyRequest.length === 0 ? (
          <Alert variant='info'>
            Заявка пуста. <Link to='/'>Перейти к румбам</Link>
          </Alert>
        ) : (
          <>
            <Row className='g-4 mb-4'>
              {flyRequest.map((item) => (
                <Col md={12} key={item.id}>
                  <Card className='shadow-sm'>
                    <Card.Body>
                      <Row className='align-items-center'>
                        <Col md={2}>
                          <img
                            src={item.image || defaultImage}
                            alt={item.direction}
                            className='img-fluid rounded'
                            style={{ maxHeight: '100px', objectFit: 'cover' }}
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
                            onClick={() => removeFromFlyRequest(item.id)}>
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
              <Button variant='outline-secondary' className='me-2' onClick={clearFlyRequest}>
                Очистить заявку
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

export default FlyRequestPage;
