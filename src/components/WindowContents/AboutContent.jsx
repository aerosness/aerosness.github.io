import { skillGroups } from '../../data/portfolio';

const AboutContent = () => (
  <section className="about-page" aria-labelledby="about-heading">
    <div className="document-bar">
      <img src="/resources/optimized/icons/doc-64.webp" alt="" />
      <span>about-me.txt</span>
      <span className="document-format">Plain text</span>
    </div>
    <div className="about-document">
      <h1 id="about-heading">A little about me</h1>
      <p>
        I’m Semyon Tyo, a computer science freshman at Colorado State
        University in Fort Collins. Online, I go by aerosness.
      </p>
      <p>
        I started with games, then got into web development. These days I
        mostly use React, with Python, Django, or Flask when a project needs
        a backend. I still make games in Unity, too.
      </p>
      <p>
        I like websites that have some personality. That’s why this one
        lives on a Windows 7 desktop. I wanted an excuse to bring back
        Aero glass.
      </p>
      <h2>When I’m not coding</h2>
      <p>
        Gaming, making music, taking photos, and editing images or videos.
        I like having something creative to work on outside of code.
      </p>
      <h2>Tools I use</h2>
      <dl className="tools-list">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.skills.join(', ')}</dd>
          </div>
        ))}
      </dl>
      <p className="document-signoff">Thanks for stopping by.<br />Semyon</p>
    </div>
    <footer className="document-status"><span>about-me.txt</span><span>UTF-8</span></footer>
  </section>
);

export default AboutContent;
