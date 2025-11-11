import {useEffect, useState} from 'react';
import {Alert, Col, Container, Row, Spinner} from 'react-bootstrap';
import {getServices} from '../api/services';
import Breadcrumbs from '../components/Breadcrumbs';
import ServiceCard from '../components/ServiceCard';
import ServiceFilters from '../components/ServiceFilters';

function HomePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
  });

  // Функция для загрузки услуг
  const loadServices = async (appliedFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getServices(appliedFilters);
      setServices(data);
    } catch (err) {
      setError('Ошибка при загрузке услуг');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadServices();
  }, []);

  // Обработчик изменения фильтров
  const handleFilterChange = newFilters => {
    setFilters(newFilters);
  };

  // Обработчик применения фильтров
  const handleSearch = () => {
    loadServices(filters);
  };

  // Обработчик сброса фильтров
  const handleReset = () => {
    const resetFilters = {
      search: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(resetFilters);
    loadServices(resetFilters);
  };

  const breadcrumbItems = [{label: 'Главная', path: null}];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <Container className='py-4'>
        <div className='text-center mb-5'>
          <h1 className='display-4 mb-3'>Румбы ветров</h1>
          <p className='lead text-muted'>
            Вы можете выбрать необходимую румбу и получить расчет
            <br />
            длительности полета Boeing-737 между Лондоном и Парижем
          </p>
        </div>

        <ServiceFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {loading && (
          <div className='text-center py-5'>
            <Spinner animation='border' variant='info' />
            <p className='mt-3'>Загрузка услуг...</p>
          </div>
        )}

        {error && <Alert variant='danger'>{error}</Alert>}

        {!loading && !error && services.length === 0 && (
          <Alert variant='info'>Услуги не найдены</Alert>
        )}

        {!loading && !error && services.length > 0 && (
          <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
            {services.map(service => (
              <Col key={service.id}>
                <ServiceCard service={service} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default HomePage;
