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
          Заявка #1
        </h2>
        <div style={{ fontSize: '16px', color: '#666' }}>
          {items.length} {items.length === 1 ? 'услуга' : items.length > 1 && items.length < 5 ? 'услуги' : 'услуг'}
        </div>
      </div>

      {/* Карточки услуг */}
      <div className='d-flex flex-column gap-3 mb-4'>
        {items.map((item) => (
          <div
            key={item.id}
            className='bg-white p-4'
            style={{
              borderRadius: '20px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            }}>
            <div className='d-flex align-items-center gap-4'>
              {/* Иконка направления */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src={item.image}
                  alt={item.direction}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                  }}
                />
              </div>

              {/* Название направления */}
              <div style={{ minWidth: '100px', fontSize: '18px', fontWeight: '500' }}>
                {item.direction}
              </div>

              {/* Поле расстояние */}
              <div className='d-flex align-items-center gap-2' style={{ flex: 1 }}>
                <Form.Control
                  type='number'
                  value={50}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   handleInputChange(item.id, 'distance', e.target.value)
                  // }
                  style={{
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f5f5f5',
                    padding: '10px 16px',
                    fontSize: '16px',
                    textAlign: 'center',
                  }}
                />
                <span style={{ fontSize: '14px', color: '#666', minWidth: '30px' }}>км</span>
              </div>

              {/* Поле скорость */}
              <div className='d-flex align-items-center gap-2' style={{ flex: 1 }}>
                <Form.Control
                  type='number'
                  value={60}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   handleInputChange(item.id, 'speed', e.target.value)
                  // }
                  style={{
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f5f5f5',
                    padding: '10px 16px',
                    fontSize: '16px',
                    textAlign: 'center',
                  }}
                />
                <span style={{ fontSize: '14px', color: '#666', minWidth: '40px' }}>км/ч</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Результат */}
      <div className='text-center mt-5'>
        <div style={{ fontSize: '20px', fontWeight: '400', color: '#333' }}>
          Результат : {totalTime.hours} ч. {totalTime.minutes}мин. {totalTime.seconds}сек.
        </div>
      </div>
    </Container>
  );
}

export default FlyRequestPage;
