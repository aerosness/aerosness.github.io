import { skillGroups } from '../../data/portfolio';

const AboutContent = () => (
  <section className="about-page window-page" aria-labelledby="about-heading">
    <header className="about-header">
      <p className="section-eyebrow">A little more context</p>
      <h1 id="about-heading">About me</h1>
    </header>

    <section className="about-story aero-glass" aria-labelledby="about-story-heading">
      <h2 id="about-story-heading">Developer with a creative starting point</h2>
      <p>
        I’m a developer based in Fort Collins, Colorado. I started by making
        games, then followed that curiosity into full-stack web development.
        Today I work mostly in React while continuing to build with Python,
        Django, Flask, and Unity.
      </p>
      <p>
        I’m drawn to projects where the interface has a point of view. This
        portfolio is a good example: it translates the Windows 7 desktop into
        an interactive React experience instead of treating the theme as a
        static coat of paint.
      </p>
    </section>

    <div className="about-columns">
      <section className="about-panel aero-glass" aria-labelledby="interests-heading">
        <h2 id="interests-heading">What I like building</h2>
        <ul className="about-list">
          <li>Interactive front-end experiences</li>
          <li>Lightweight full-stack tools</li>
          <li>Open-source experiments</li>
          <li>Unity games and prototypes</li>
        </ul>
      </section>

      <section className="about-panel aero-glass" aria-labelledby="creative-heading">
        <h2 id="creative-heading">Beyond code</h2>
        <ul className="about-list">
          <li>Game development and gaming</li>
          <li>Music production</li>
          <li>Visual and video editing</li>
          <li>Photography</li>
        </ul>
      </section>
    </div>

    <section className="skills-panel aero-glass" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Tools I use</h2>
      <div className="skill-groups">
        {skillGroups.map((group) => (
          <div key={group.label} className="skill-group">
            <h3>{group.label}</h3>
            <ul className="skill-chips" aria-label={`${group.label} skills`}>
              {group.skills.map((skill) => (
                <li key={skill} className="skill-chip">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  </section>
);

export default AboutContent;
