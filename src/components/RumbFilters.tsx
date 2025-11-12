import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUserFlyRequest } from '../api/rumbs';
import { SearchIcon } from '../assets/searchIcon';
import { FlyRequestItem, RumbFilters as RumbFiltersType } from '../types';

interface RumbFiltersProps {
  filters: RumbFiltersType;
  onFilterChange: (filters: RumbFiltersType) => void;
  onSearch: () => void;
  onReset: () => void;
}

function RumbFilters({ filters, onFilterChange, onSearch, onReset }: RumbFiltersProps) {
  const [flyRequestItemsCount, setFlyRequestItemsCount] = useState<number>(0);
  const [flyRequestId, setFlyRequestId] = useState<number>(0);

  useEffect(() => {
    loadFlyRequestInfo();

    // Слушаем изменения localStorage
    window.addEventListener('storage', loadFlyRequestInfo);

    // Кастомное событие для обновления счетчика
    window.addEventListener('flyRequestUpdated', loadFlyRequestInfo);

    return () => {
      window.removeEventListener('storage', loadFlyRequestInfo);
      window.removeEventListener('flyRequestUpdated', loadFlyRequestInfo);
    };
  }, []);

  const loadFlyRequestInfo = async () => {
    try {
      const userId = 1; // ID пользователя
      const data = await getUserFlyRequest(userId);

      if (data && data.id !== undefined) {
        // Если получили данные с сервера
        setFlyRequestId(data.id);
        setFlyRequestItemsCount(data.items ? data.items.length : 0);
      } else {
        // Fallback на localStorage
        const saved = localStorage.getItem('flyRequest');
        if (saved) {
          const items: FlyRequestItem[] = JSON.parse(saved);
          setFlyRequestItemsCount(items.length);
          setFlyRequestId(items.length > 0 ? 1 : 0);
        } else {
          setFlyRequestItemsCount(0);
          setFlyRequestId(0);
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке информации о заявке:', error);
      // При ошибке устанавливаем 0
      setFlyRequestItemsCount(0);
      setFlyRequestId(0);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <Form className='mb-4 py-3 bg-white rounded' onSubmit={handleSubmit}>
      <Row className='g-3 justify-content-between align-items-center'>
        <Col md={6} lg={5}>
          <Form.Group className='position-relative'>
            <Form.Control
              type='text'
              placeholder='Введите направление ветра для поиска...'
              name='search'
              value={filters.search}
              onChange={handleChange}
              className='pe-5'
              style={{
                borderRadius: '25px',
                padding: '12px 20px',
                border: '1px solid #e0e0e0',
              }}
            />
            <Button
              variant='info'
              type='submit'
              className='position-absolute text-white border-0'
              style={{
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00FBFF',
              }}>
              <SearchIcon />
            </Button>
          </Form.Group>
        </Col>
        <Col xs='auto'>
          {/* <Link to='/flyRequest' style={{ textDecoration: 'none' }}> */}
          <div
            className='bg-white position-relative'
            style={{
              borderRadius: '15px',
              padding: '16px 24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              minWidth: '200px',
              // cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>
              Заявка #{flyRequestId}
            </div>
            <div style={{ fontSize: '14px', color: '#666' }}>
              В корзине {flyRequestItemsCount} {flyRequestItemsCount === 1 ? 'услуга' : flyRequestItemsCount > 1 && flyRequestItemsCount < 5 ? 'услуги' : 'услуг'}
            </div>
          </div>
          {/* </Link> */}
        </Col>
      </Row>
    </Form>
  );
}

export default RumbFilters;
