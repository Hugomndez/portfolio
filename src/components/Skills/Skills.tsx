import styles from './Skills.module.css';

interface Skills {
  skill: string;
  years: number;
}

type Data = Skills[];

const data: Data = [
  { skill: 'HTML', years: 4 },
  { skill: 'CSS', years: 4 },
  { skill: 'JavaScript', years: 4 },
  { skill: 'Accessibility', years: 4 },
  { skill: 'React', years: 3 },
  { skill: 'Sass', years: 3 },
];

const Skills = () => {
  return (
    <>
      <section className={styles.section}>
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
