import { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { getRumbs } from '../api/rumbs';
import Breadcrumbs from '../components/Breadcrumbs';
import RumbCard from '../components/RumbCard';
import RumbFilters from '../components/RumbFilters';
import { Rumb, RumbFilters as RumbFiltersType } from '../types';

function RumbsPage() {
  const [rumbs, setRumbs] = useState<Rumb[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RumbFiltersType>({
    search: '',
    minPrice: '',
    maxPrice: '',
  });

  // Функция для загрузки румбов
  const loadRumbs = async (appliedFilters: Partial<RumbFiltersType> = {}) => {
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
  const handleFilterChange = (newFilters: RumbFiltersType) => {
    setFilters(newFilters);
  };

  // Обработчик применения фильтров
  const handleSearch = () => {
    loadRumbs(filters);
  };

  // Обработчик сброса фильтров
  const handleReset = () => {
    const resetFilters: RumbFiltersType = {
      search: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(resetFilters);
    loadRumbs(resetFilters);
  };

  const breadcrumbItems = [
    { label: 'Главная', path: '/' },
    { label: 'Румбы', path: null },
  ];

  return (
    <>
      <Container className='py-4'>
        <RumbFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onReset={handleReset}
        />
        <Breadcrumbs items={breadcrumbItems} />
        <div className='text-center mb-5'>
          <h1 className='display-4 mb-3'>Румбы ветров</h1>
          <p className='lead text-muted'>
            Вы можете выбрать необходимую румбу и получить расчет
            <br />
            длительности полета Boeing-737 между Лондоном и Парижем
          </p>
        </div>

        {loading && (
          <div className='text-center py-5'>
            <Spinner animation='border' variant='info' />
            <p className='mt-3'>Загрузка румбов...</p>
          </div>
        )}

        {error && <Alert variant='danger'>{error}</Alert>}

        {!loading && !error && rumbs.length === 0 && <Alert variant='info'>Румбы не найдены</Alert>}

        {!loading && !error && rumbs.length > 0 && (
          <Row xs={1} md={2} lg={3} className='g-4'>
            {rumbs.map((rumb) => {
              if (rumb.id === 5) {
                return (
                  <>
                    <Col key={`${rumb.id}-center`}>
                      <div className='rumb-card-center h-100'>
                        <div className='rumb-card-image-wrapper'>
                          {/* Центральная пустая карточка */}
                        </div>
                      </div>
                    </Col>
                    <Col key={rumb.id}>
                      <RumbCard rumb={rumb} />
                    </Col>
                  </>
                );
              }
              return (
                <Col key={rumb.id}>
                  <RumbCard rumb={rumb} />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </>
  );
}

export default RumbsPage;
