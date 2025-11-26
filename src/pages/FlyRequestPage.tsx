import {useEffect, useState} from 'react';
import {Alert, Card, Col, Container, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useFlyRequest} from '../context/FlyRequestContext';

interface TotalTime {
  hours: number;
  minutes: number;
  seconds: number;
}

function FlyRequestPage() {
  const {flyRequest} = useFlyRequest();
  const [totalTime, setTotalTime] = useState<TotalTime>({hours: 0, minutes: 0, seconds: 0});

  useEffect(() => {
    calculateTotalTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyRequest]);

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

    setTotalTime({hours: h, minutes: m, seconds: s});
  };

  return (
    <Container className='py-5' style={{maxWidth: '800px'}}>
      {/* Заголовок */}
      <div className='text-center mb-4'>
        <h2 style={{fontSize: '24px', fontWeight: '600', marginBottom: '8px'}}>
          Заявка #{flyRequest.length > 0 ? '1' : '0'}
        </h2>
        <p style={{fontSize: '16px', color: '#666', margin: 0}}>
          {flyRequest.length}{' '}
          {flyRequest.length === 1
            ? 'услуга'
            : flyRequest.length > 1 && flyRequest.length < 5
            ? 'услуги'
            : 'услуг'}
        </p>
      </div>

      {flyRequest.length === 0 ? (
        <Alert variant='info'>
          Заявка пуста. <Link to='/rumbs'>Перейти к румбам</Link>
        </Alert>
      ) : (
        <>
          {/* Карточки румбов */}
          <div className='mb-4'>
            {flyRequest.map(item => (
              <Card
                key={item.id}
                className='mb-3 shadow-sm'
                style={{
                  borderRadius: '15px',
                  border: 'none',
                  overflow: 'hidden',
                }}>
                <Card.Body style={{padding: '20px'}}>
                  <Row className='align-items-center'>
                    {/* Изображение */}
                    <Col xs={3} className='text-center'>
                      <img
                        src={item.image || `${import.meta.env.BASE_URL}images/rumbs/arrow-north.svg`}
                        alt={item.direction}
                        style={{
                          maxWidth: '120px',
                          maxHeight: '120px',
                          objectFit: 'contain',
                        }}
                      />
                    </Col>

                    {/* Название и поля */}
                    <Col xs={9}>
                      <Row className='align-items-center'>
                        <Col xs={4}>
                          <div style={{fontSize: '18px', fontWeight: '500'}}>{item.direction}</div>
                        </Col>
                        <Col xs={3}>
                          <div
                            style={{
                              backgroundColor: '#f5f5f5',
                              borderRadius: '10px',
                              padding: '10px',
                              textAlign: 'center',
                              border: '1px solid #e0e0e0',
                            }}>
                            {item.params.distance}
                          </div>
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#666',
                              marginTop: '4px',
                              textAlign: 'center',
                            }}>
                            км
                          </div>
                        </Col>
                        <Col xs={3}>
                          <div
                            style={{
                              backgroundColor: '#f5f5f5',
                              borderRadius: '10px',
                              padding: '10px',
                              textAlign: 'center',
                              border: '1px solid #e0e0e0',
                            }}>
                            {item.params.speed}
                          </div>
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#666',
                              marginTop: '4px',
                              textAlign: 'center',
                            }}>
                            км/ч
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>

          {/* Результат */}
          <div className='text-center mt-5'>
            <h4 style={{fontSize: '20px', fontWeight: '400', color: '#333'}}>
              Результат: {totalTime.hours} ч. {totalTime.minutes}мин. {totalTime.seconds}сек.
            </h4>
          </div>
        </>
      )}
    </Container>
  );
}

export default FlyRequestPage;
