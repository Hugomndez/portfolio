import styles from './Skills.module.css';

type Experience = {
  skill: string;
  years: number;
};

const data: Experience[] = [
  { skill: 'SEO', years: 10 },
  { skill: 'JAMstack', years: 3 },
  { skill: 'Performance', years: 3 },
  { skill: 'TypeScript', years: 2 },
  { skill: 'React', years: 2 },
  { skill: 'NextJS', years: 2 },
];

const Skills = () => {
  return (
    <>
      <section className={styles.section}>
        <hr className={styles.hrTop} />
        <div className={styles.container}>
          {data.map((item, idx) => (
            <div
              key={idx}
              className={styles.card}>
              <p className={styles.skill}>{item.skill}</p>
              <p className={styles.years}>{item.years} Years Experience</p>
            </div>
          ))}
        </div>
        <hr className={styles.hrBottom} />
      </section>
    </>
  );
};

export default Skills;
