import { ChangeEvent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { RumbFilters as RumbFiltersType } from '../types';
import { SearchIcon } from '../assets/searchIcon';

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
      <Row className='g-3'>
        <Col md={4}>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Введите для направление ветра для поиска...'
              name='search'
              value={filters.search}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={2} className='d-flex align-items-end'>
          <Button variant='info' className='w-100 h-100 me-2 text-white d-flex align-items-center justify-content-center' onClick={onSearch}>
            <SearchIcon className='my-auto' />
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default RumbFilters;
