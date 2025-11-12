import { ChangeEvent, useState } from 'react';
import { Container, Form } from 'react-bootstrap';

// Моковые данные для заявки
const mockFlyRequestItems = [
  {
    id: 1,
    direction: 'Север',
    image: 'http://localhost:9000/rumbs/arrow-north-west.svg',
    distance: '50',
    speed: '7',
  },
  {
    id: 2,
    direction: 'Запад',
    image: 'http://localhost:9000/rumbs/arrow-west.svg',
    distance: '150',
    speed: '10',
  },
];

function FlyRequestPage() {
  const [items, setItems] = useState(mockFlyRequestItems);

  const handleInputChange = (id: number, field: 'distance' | 'speed', value: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const calculateTotalTime = () => {
    let totalHours = 0;

    items.forEach(item => {
      const dist = parseFloat(item.distance);
      const spd = parseFloat(item.speed);
      if (dist > 0 && spd > 0) {
        totalHours += dist / spd;
      }
    });

    const h = Math.floor(totalHours);
    const minutes = (totalHours - h) * 60;
    const m = Math.floor(minutes);
    const seconds = (minutes - m) * 60;
    const s = Math.floor(seconds);

    return { hours: h, minutes: m, seconds: s };
  };

  const totalTime = calculateTotalTime();

  return (
    <Container className='py-5' style={{ maxWidth: '800px' }}>
      {/* Заголовок */}
      <div className='text-center mb-4'>
        <h2 style={{ fontSize: '24px', fontWeight: '400', marginBottom: '8px' }}>
          Заявка #-1
        </h2>
        <div style={{ fontSize: '16px', color: '#666' }}>
          0 услуг
        </div>
      </div>
    </Container>
  );
}

export default FlyRequestPage;
