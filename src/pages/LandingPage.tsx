import {useEffect, useState} from 'react';
import {Carousel, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getRumbs} from '../api/rumbs.ts';
import {Rumb} from '../types';

function LandingPage() {
  const [rumbs, setRumbs] = useState<Rumb[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRumbs();
  }, []);

  const loadRumbs = async () => {
    try {
      const data = await getRumbs();
      setRumbs(data);
    } catch (error) {
      console.error('Ошибка загрузки румбов:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      {/* Фоновое изображение самолета */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7)',
          zIndex: -1,
        }}
      />

      {/* Контент поверх изображения */}
      <Container className='text-center text-white' style={{position: 'relative', zIndex: 1}}>
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '60px 40px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            maxWidth: '900px',
            margin: '0 auto',
          }}>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '30px',
              lineHeight: '1.3',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            }}>
            Время полета Boeing-737 NG между Лондоном и Парижем в зависимости от направления ветра
          </h1>
          <p
            style={{
              fontSize: '24px',
              fontWeight: '400',
              marginBottom: '40px',
              lineHeight: '1.6',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
            }}>
            Вы можете выбрать необходимую румбу и получить расчет длительности полета Boeing-737
            между Лондоном и Парижем
          </p>

          {/* Карусель с румбами */}
          {loading ? (
            <div style={{color: '#fff', fontSize: '18px'}}>Загрузка румбов...</div>
          ) : (
            <Carousel
              interval={3000}
              style={{
                maxWidth: '600px',
                margin: '0 auto',
              }}>
              {rumbs.map(rumb => (
                <Carousel.Item key={rumb.id}>
                  <Link
                    to={`/rumb/${rumb.id}`}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                    }}>
                    <div
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        borderRadius: '20px',
                        padding: '40px 30px',
                        minHeight: '250px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}>
                      {/* Изображение румба */}
                      {rumb.image && (
                        <img
                          src={rumb.image}
                          alt={rumb.direction}
                          style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'contain',
                            marginBottom: '20px',
                          }}
                        />
                      )}

                      {/* Направление */}
                      <h3
                        style={{
                          fontSize: '32px',
                          fontWeight: '700',
                          color: '#000',
                          marginBottom: '15px',
                        }}>
                        {rumb.direction}
                      </h3>

                      {/* Описание */}
                      <p
                        style={{
                          fontSize: '16px',
                          color: '#666',
                          marginBottom: '0',
                          textAlign: 'center',
                        }}>
                        {rumb.description}
                      </p>
                    </div>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
