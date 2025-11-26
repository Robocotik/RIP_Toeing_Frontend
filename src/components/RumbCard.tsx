import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Rumb} from '../types';

interface RumbCardProps {
  rumb: Rumb;
}

function RumbCard({rumb}: RumbCardProps) {
  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='200' height='150' fill='%2317a2b8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='white'%3EToeing%3C/text%3E%3C/svg%3E";

  return (
    <Card className='h-100 shadow-sm hover-shadow' style={{cursor: 'pointer'}}>
      <Link to={`/rumb/${rumb.ID}`} style={{textDecoration: 'none', color: 'inherit'}}>
        <Card.Img
          variant='top'
          src={rumb.Image || defaultImage}
          alt={rumb.Title}
          style={{height: '200px', objectFit: 'contain', padding: '20px'}}
        />
        <Card.Body className='d-flex flex-column align-items-center'>
          <Card.Title>{rumb.Title}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default RumbCard;
