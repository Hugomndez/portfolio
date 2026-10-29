import styles from './skills-test.module.css';

type Experience = {
  id: number;
  skill: string;
  years: number;
};

const data: Experience[] = [
  { id: 1, skill: 'SEO', years: 10 },
  { id: 2, skill: 'JAMstack', years: 3 },
  { id: 3, skill: 'Performance', years: 3 },
  { id: 4, skill: 'TypeScript', years: 2 },
  { id: 5, skill: 'React', years: 2 },
  { id: 6, skill: 'NextJS', years: 2 },
];

const Skills = () => (
  <section className={styles.section}>
    <hr className={styles.hrTop} />
    <div className={styles.container}>
      {data.map((item) => (
        <div
          key={item.id}
          className={styles.card}>
          <p className={styles.skill}>{item.skill}</p>
          <p className={styles.years}>{item.years} Years Experience</p>
        </div>
      ))}
    </div>
    <hr className={styles.hrBottom} />
  </section>
);

export default Skills;
