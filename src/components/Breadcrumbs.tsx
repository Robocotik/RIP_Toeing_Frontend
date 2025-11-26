import { Breadcrumb, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BreadcrumbItem } from '../types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <Container className='mt-3'>
      <Breadcrumb className='breadcrumb-custom'>
        {items.map((item, index) => (
          <Breadcrumb.Item
            key={index}
            active={index === items.length - 1}
            linkAs={item.path ? Link : 'span'}
            linkProps={item.path ? { to: item.path } : {}}>
            {item.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </Container>
  );
}

export default Breadcrumbs;
