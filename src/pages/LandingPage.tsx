import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LandingPage() {
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
                    backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.7)',
                    zIndex: -1,
                }}
            />

            {/* Контент поверх изображения */}
            <Container className='text-center text-white' style={{ position: 'relative', zIndex: 1 }}>
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
                        Вы можете выбрать необходимую румбу и получить расчет длительности полета Boeing-737 между
                        Лондоном и Парижем
                    </p>
                    <Link
                        to='/rumbs'
                        style={{
                            display: 'inline-block',
                            padding: '18px 50px',
                            fontSize: '20px',
                            fontWeight: '600',
                            backgroundColor: '#00FBFF',
                            color: '#000',
                            textDecoration: 'none',
                            borderRadius: '50px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0, 251, 255, 0.4)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 251, 255, 0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 251, 255, 0.4)';
                        }}>
                        Перейти к румбам
                    </Link>
                </div>
            </Container>
        </div>
    );
}

export default LandingPage;
