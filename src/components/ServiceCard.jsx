import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function ServiceCard({service}) {
  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='200' height='150' fill='%2317a2b8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='white'%3EToeing%3C/text%3E%3C/svg%3E";

  return (
    <Card className='h-100 shadow-sm hover-shadow' style={{cursor: 'pointer'}}>
      <Link to={`/service/${service.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <Card.Img
          variant='top'
          src={service.image || defaultImage}
          alt={service.name}
          style={{height: '200px', objectFit: 'cover'}}
        />
        <Card.Body className='d-flex flex-column'>
          <Card.Title>{service.direction}</Card.Title>
          <Card.Text className='flex-grow-1'>
            <small className='text-muted'>{service.description || 'Описание услуги'}</small>
          </Card.Text>
          <div className='mt-2'>
            <strong>Цена:</strong> {service.price} ₽
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ServiceCard;
