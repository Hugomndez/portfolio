import styles from './Skills.module.css';

interface Skills {
  skill: string;
  years: number;
}

type Data = Skills[];

const data: Data = [
  { skill: 'HTML', years: 6 },
  { skill: 'CSS', years: 6 },
  { skill: 'JavaScript', years: 2 },
  { skill: 'React', years: 2 },
  { skill: 'NextJS', years: 1 },
  { skill: 'TypeScript', years: 2 },
];

const Skills = () => {
  return (
    <>
      <section className={styles.section}>
        <Rings />
        <hr className={styles.hrTop} />
        <div className={styles.container}>
          {data.map((d, i) => (
            <div
              key={i}
              className={styles.card}>
              <p className={styles.skill}>{d.skill}</p>
              <p className={styles.years}>{d.years} Years Experience</p>
            </div>
          ))}
        </div>
        <hr className={styles.hrBottom} />
      </section>
    </>
  );
};

export default Skills;

const Rings = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='530'
      height='129'
      className={styles.rings}>
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
};
