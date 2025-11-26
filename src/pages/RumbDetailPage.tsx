import {useEffect, useState} from 'react';
import {Alert, Card, Container, Spinner} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {apiService} from '../api/apiService';
import {Rumb} from '../types';

function RumbDetailPage() {
  const {id} = useParams<{id: string}>();

  const [rumb, setRumb] = useState<Rumb | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadRumb = async () => {
    if (!id) return;

    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getRumbById(parseInt(id));
      if (data) {
        setRumb(data);
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
    <Container className='py-5' style={{maxWidth: '600px'}}>
      {/* Заголовки */}
      <div className='text-center mb-4'>
        <h5 style={{fontSize: '18px', fontWeight: '400', color: '#666', marginBottom: '8px'}}>
          Румб ветра
        </h5>
        <h2 style={{fontSize: '32px', fontWeight: '600', color: '#000', marginBottom: '30px'}}>
          {rumb.Title}
        </h2>
      </div>

      {/* Карточка с изображением */}
      <Card
        className='shadow-sm mb-4'
        style={{
          borderRadius: '15px',
          overflow: 'hidden',
          border: 'none',
        }}>
        <Card.Img
          variant='top'
          src={rumb.Image}
          alt={rumb.Title}
          style={{
            height: '300px',
            objectFit: 'contain',
            backgroundColor: '#f8f9fa',
            padding: '40px',
          }}
        />
      </Card>
    </Container>
  );
}

export default RumbDetailPage;
