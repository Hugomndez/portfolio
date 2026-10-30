import { Ring } from '../Ring';

const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: 'relative', overflowX: 'clip' }}>
    <Ring position="top" />
    <Ring position="middle" />
    <Ring position="bottom" />
    {children}
  </div>
);

export default Container;
