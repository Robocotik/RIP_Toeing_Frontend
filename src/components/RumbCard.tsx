import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/RumbCard.css';
import { Rumb } from '../types';

interface RumbCardProps {
  rumb: Rumb;
}

function RumbCard({ rumb }: RumbCardProps) {
  const defaultImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='150'%3E%3Crect width='200' height='150' fill='%2317a2b8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='20' fill='white'%3EToeing%3C/text%3E%3C/svg%3E";

  return (
    <Link to={`/rumb/${rumb.id}`} style={{ textDecoration: 'none' }}>
      <Card className='rumb-card h-100'>
        <div className='rumb-card-image-wrapper'>
          <Card.Img
            src={rumb.image || defaultImage}
            alt={rumb.direction}
            className='rumb-card-image p-4'
          />
          <div className='rumb-card-overlay'>
            <h5 className='rumb-card-title'>{rumb.direction}</h5>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default RumbCard;
