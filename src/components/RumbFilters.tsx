import { ChangeEvent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { SearchIcon } from '../assets/searchIcon';
import { RumbFilters as RumbFiltersType } from '../types';

interface RumbFiltersProps {
  filters: RumbFiltersType;
  onFilterChange: (filters: RumbFiltersType) => void;
  onSearch: () => void;
  onReset: () => void;
}

function RumbFilters({ filters, onFilterChange, onSearch, onReset }: RumbFiltersProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Form className='mb-4 py-3 bg-white rounded'>
      <Row className='g-3 justify-content-start'>
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
              onClick={onSearch}
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
      </Row>
    </Form>
  );
}

export default RumbFilters;
