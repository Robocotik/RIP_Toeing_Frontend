import {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Row, Spinner} from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {getServiceById} from '../api/services';
import Breadcrumbs from '../components/Breadcrumbs';
import {useCart} from '../context/CartContext';

function ServiceDetailPage() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {addToCart} = useCart();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState('');
  const [speed, setSpeed] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServiceById(id);
      if (data) {
        setService(data);
        setDistance(data.distance.toString());
        setSpeed(data.speed.toString());
      } else {
        setError('Услуга не найдена');
      }
    } catch (err) {
      setError('Ошибка при загрузке услуги');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTime = () => {
    const dist = parseFloat(distance);
    const spd = parseFloat(speed);

    if (dist > 0 && spd > 0) {
      const hours = dist / spd;
      const h = Math.floor(hours);
      const minutes = (hours - h) * 60;
      const m = Math.floor(minutes);
      const seconds = (minutes - m) * 60;
      const s = Math.floor(seconds);

      setResult(`${h} ч. ${m} мин. ${s} сек.`);
    }
  };

  const handleAddToCart = () => {
    if (service && distance && speed) {
      addToCart(service, {distance, speed});
      navigate('/cart');
    }
  };

  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2317a2b8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='40' fill='white'%3EToeing%3C/text%3E%3C/svg%3E";

  const breadcrumbItems = [
    {label: 'Главная', path: '/'},
    {label: 'Румб ветра', path: null},
  ];

  if (loading) {
    return (
      <Container className='py-5 text-center'>
        <Spinner animation='border' variant='info' />
        <p className='mt-3'>Загрузка...</p>
      </Container>
    );
  }

  if (error || !service) {
    return (
      <Container className='py-5'>
        <Alert variant='danger'>{error || 'Услуга не найдена'}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Container className='py-4'>
        <h2 className='text-center mb-4'>Румб ветра</h2>
        <h3 className='text-center mb-5'>{service.direction}</h3>

        <Row className='justify-content-center'>
          <Col md={8}>
            <Card className='shadow-sm'>
              <Card.Img
                variant='top'
                src={service.image || defaultImage}
                alt={service.direction}
                style={{height: '300px', objectFit: 'cover'}}
              />
              <Card.Body>
                <Card.Text className='mb-4'>{service.description}</Card.Text>

                <Form>
                  <Row className='mb-3'>
                    <Col md={4}>
                      <Form.Label>{service.direction}</Form.Label>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type='number'
                        value={distance}
                        onChange={e => setDistance(e.target.value)}
                        placeholder='50'
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Text className='text-muted'>км</Form.Text>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type='number'
                        value={speed}
                        onChange={e => setSpeed(e.target.value)}
                        placeholder='7'
                      />
                    </Col>
                    <Col md={12} className='text-end mt-1'>
                      <Form.Text className='text-muted'>км/ч</Form.Text>
                    </Col>
                  </Row>

                  <div className='text-center mt-4'>
                    <Button variant='info' className='me-2 text-white' onClick={calculateTime}>
                      Рассчитать время
                    </Button>
                    <Button variant='success' onClick={handleAddToCart}>
                      Добавить в корзину
                    </Button>
                  </div>

                  {result && (
                    <div className='text-center mt-4'>
                      <h5>Результат: {result}</h5>
                    </div>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ServiceDetailPage;
