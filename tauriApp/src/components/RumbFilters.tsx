import {ChangeEvent} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useFlyRequest} from '../context/FlyRequestContext';
import {RumbFilters as RumbFiltersType} from '../types';

interface RumbFiltersProps {
  filters: RumbFiltersType;
  onFilterChange: (filters: RumbFiltersType) => void;
  onSearch: () => void;
  onReset: () => void;
}

function RumbFilters({filters, onFilterChange, onSearch}: RumbFiltersProps) {
  const {flyRequest} = useFlyRequest();

  const flyRequestItemsCount = flyRequest.length;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    onFilterChange({...filters, [name]: value});
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
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <circle cx='11' cy='11' r='8' />
                <path d='m21 21-4.35-4.35' />
              </svg>
            </Button>
          </Form.Group>
        </Col>
        <Col xs='auto'>
          <Link
            to='/flyRequest'
            className='position-relative'
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}>
            {/* Иконка корзины */}
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#333'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <circle cx='9' cy='21' r='1' />
              <circle cx='20' cy='21' r='1' />
              <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' />
            </svg>
            {/* Badge с количеством */}
            {flyRequestItemsCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>
                {flyRequestItemsCount}
              </span>
            )}
          </Link>
        </Col>
      </Row>
    </Form>
  );
}

export default RumbFilters;
