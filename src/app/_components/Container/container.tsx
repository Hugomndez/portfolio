import { Ring } from '../Ring';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', overflowX: 'clip' }}>
      <Ring position='top' />
      <Ring position='middle' />
      <Ring position='bottom' />
      {children}
    </div>
  );
}
