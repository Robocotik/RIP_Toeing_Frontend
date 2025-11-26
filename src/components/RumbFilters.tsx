import {ChangeEvent} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {RumbFilters as RumbFiltersType} from '../types';

interface RumbFiltersProps {
  filters: RumbFiltersType;
  onFilterChange: (filters: RumbFiltersType) => void;
  onSearch: () => void;
  onReset: () => void;
}

function RumbFilters({filters, onFilterChange, onSearch}: RumbFiltersProps) {
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
          <div className='text-muted'>Поиск по румбам</div>
        </Col>
      </Row>
    </Form>
  );
}

export default RumbFilters;
