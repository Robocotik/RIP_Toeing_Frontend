import { ChangeEvent, useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getRumbById } from '../api/rumbs';
import Breadcrumbs from '../components/Breadcrumbs';
import { useFlyRequest } from '../context/FlyRequestContext';
import { Rumb } from '../types';

function RumbDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToFlyRequest } = useFlyRequest();

  const [rumb, setRumb] = useState<Rumb | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [distance, setDistance] = useState<string>('');
  const [speed, setSpeed] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    loadRumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadRumb = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await getRumbById(id);
      if (data) {
        setRumb(data);
        setDistance(data.distance.toString());
        setSpeed(data.speed.toString());
      } else {
        setError('Румб не найден');
      }
    } catch (err) {
      setError('Ошибка при загрузке румба');
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

  const handleAddToFlyRequest = () => {
    if (rumb && distance && speed) {
      addToFlyRequest(rumb, { distance, speed });
      navigate('/flyRequest');
    }
  };

  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%2317a2b8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='40' fill='white'%3EToeing%3C/text%3E%3C/svg%3E";

  const breadcrumbItems = [
    { label: 'Главная', path: '/' },
    { label: 'Румб ветра', path: null },
  ];

  if (loading) {
    return (
      <Container className='py-5 text-center'>
        <Spinner animation='border' variant='info' />
        <p className='mt-3'>Загрузка...</p>
      </Container>
    );
  }

  if (error || !rumb) {
    return (
      <Container className='py-5'>
        <Alert variant='danger'>{error || 'Румб не найден'}</Alert>
      </Container>
    );
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Container className='py-4'>
        <h2 className='text-center mb-4'>Румб ветра</h2>
        <h3 className='text-center mb-5'>{rumb.direction}</h3>

        <Row className='justify-content-center d-flex'>
          <Col style={{ height: '300px', width: '300px' }} md={8}>
            <Card className='shadow-sm p-4'>
              <Card.Img
                variant='top'
                src={rumb.image || defaultImage}
                alt={rumb.direction}
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default RumbDetailPage;
