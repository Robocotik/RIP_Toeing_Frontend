import {useEffect, useState} from 'react';
import {Alert, Col, Container, Row, Spinner} from 'react-bootstrap';
import {getRumbs} from '../api/rumbs';
import Breadcrumbs from '../components/Breadcrumbs';
import RumbCard from '../components/RumbCard';
import RumbFilters from '../components/RumbFilters';

function HomePage() {
  const [rumbs, setRumbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
  });

  // Функция для загрузки румбов
  const loadRumbs = async (appliedFilters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRumbs(appliedFilters);
      setRumbs(data);
    } catch (err) {
      setError('Ошибка при загрузке румбов');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    loadRumbs();
  }, []);

  // Обработчик изменения фильтров
  const handleFilterChange = newFilters => {
    setFilters(newFilters);
  };

  // Обработчик применения фильтров
  const handleSearch = () => {
    loadRumbs(filters);
  };

  // Обработчик сброса фильтров
  const handleReset = () => {
    const resetFilters = {
      search: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(resetFilters);
    loadRumbs(resetFilters);
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

        <RumbFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        {loading && (
          <div className='text-center py-5'>
            <Spinner animation='border' variant='info' />
            <p className='mt-3'>Загрузка румбов...</p>
          </div>
        )}

        {error && <Alert variant='danger'>{error}</Alert>}

        {!loading && !error && rumbs.length === 0 && <Alert variant='info'>Румбы не найдены</Alert>}

        {!loading && !error && rumbs.length > 0 && (
          <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
            {rumbs.map(rumb => (
              <Col key={rumb.id}>
                <RumbCard rumb={rumb} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default HomePage;
