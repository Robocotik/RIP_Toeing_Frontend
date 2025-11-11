import {Button, Col, Form, Row} from 'react-bootstrap';

function ServiceFilters({filters, onFilterChange, onSearch, onReset}) {
  const handleChange = e => {
    const {name, value} = e.target;
    onFilterChange({...filters, [name]: value});
  };

  return (
    <Form className='mb-4 p-3 bg-white rounded shadow-sm'>
      <Row className='g-3'>
        <Col md={4}>
          <Form.Group>
            <Form.Label>Поиск по названию</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите для поиска...'
              name='search'
              value={filters.search}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        <Col md={2} className='d-flex align-items-end'>
          <Button variant='info' className='w-100 me-2 text-white' onClick={onSearch}>
            Поиск
          </Button>
        </Col>
      </Row>

      <Row className='mt-2'>
        <Col>
          <Button variant='outline-secondary' size='sm' onClick={onReset}>
            Сбросить фильтры
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default ServiceFilters;
