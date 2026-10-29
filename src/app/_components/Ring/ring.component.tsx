import styles from './ring-test.module.css';

const Ring = ({ position }: { position: 'top' | 'middle' | 'bottom' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='530'
    height='129'
    aria-hidden='true'
    className={styles.ring}
    data-position={position}>
    <g
      fill='none'
      fillRule='evenodd'
      stroke='#FFF'
      opacity='.25'>
      <ellipse
        cx='265'
        cy='40'
        rx='264.5'
        ry='39.5'
      />
      <ellipse
        cx='265'
        cy='52'
        rx='264.5'
        ry='39.5'
      />
      <ellipse
        cx='265'
        cy='65'
        rx='264.5'
        ry='39.5'
      />
      <ellipse
        cx='265'
        cy='77'
        rx='264.5'
        ry='39.5'
      />
      <ellipse
        cx='265'
        cy='89'
        rx='264.5'
        ry='39.5'
      />
    </g>
  </svg>
);

export default Ring;
