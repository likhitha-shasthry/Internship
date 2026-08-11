import { useState } from 'react';
import './index.css';

const modules=[['BEFORE YOU BEGIN','Connectomics','🔗','gold','Connect waves to oscillations, energy transfer, and the behaviour of particles in a medium.'],['START HERE','Introduction','☀️','blue','Understand what a wave is, how disturbances travel, and why waves carry energy without transporting matter.'],['THE LANGUAGE','Terminology','📖','teal','Learn amplitude, wavelength, frequency, period, phase, crest, trough, and wavefront.'],['CORE PRACTICE','Skills','🎯','purple','Explore transverse and longitudinal waves, progressive-wave displacement, wave speed, and superposition.'],['TEST READY','Exam Edge','🏆','red','Practice reflection of waves, beats, numerical problems, and chapter exercises with confidence.']];

const prereqs=[['Periodic Motion & S.H.M.','🌀','Comfort with periodic motion, the restoring force F = −kx, and angular frequency ω — waves are S.H.M. handed from particle to particle.'],['Trigonometric Functions','📐','Reading and manipulating sin(kx − ωt) — recognising amplitude, argument, and how a phase shift moves a graph.'],['Elastic Restoring Forces','🔗','Springs, coupled particles, and how a push on one element creates a force that pulls the next one back into place.']];

const prereqsCheckpoint=[['Periodic motion & S.H.M.','Waves are just S.H.M. handed on from one particle to the next.'],['Amplitude, phase & angular frequency','a, ω and φ describe every oscillation you meet again here.'],['Restoring force, F = −kx','The reason a disturbed particle snaps back and passes the push along.'],["Elastic moduli (Young's & Bulk)",'These decide exactly how fast a disturbance can travel.'],['Density and pressure, δρ / δp','Needed to see why sound is a wave of compressions and rarefactions.'],['sin A + sin B identities','The trig tool that unlocks superposition, interference and beats.']];

const webLinks=[
  ['↻','Mirror','Oscillations','Ch.13','oscillation','Simple Harmonic Motion is the seed of wave motion. The wave equation y = a sin(kx − ωt) is literally S.H.M. with the swing repeated at every point along x.'],
  ['🧱','Direct','Elasticity','Ch.8','elasticity',"Wave speed is set entirely by the medium: v = √(T/μ) on a string, v = √(Y/ρ) in a solid bar, v = √(B/ρ) in a fluid — the stiffer the medium, the faster the wave."],
  ['🔊','Direct','Speed of Sound','§14.4.2','sound',"Newton's isothermal guess gave 280 m/s for air; Laplace's adiabatic fix, v = √(γP/ρ), lands on the measured 331 m/s — one wave idea correcting another."],
  ['🌈','Fundamental','Wave Optics','Ch.16','optics','Superposition, interference and standing waves return unchanged when light is treated as a wave — the same y₁ + y₂ explains bright and dark fringes.'],
];

const realWorld=[
  ['IMPACT: ESSENTIAL','Medical Ultrasound','A hospital scanner sends waves at a few MHz into tissue; the speed of sound in that tissue fixes the wavelength, which in turn limits how small a tumour the scan can resolve.'],
  ['IMPACT: HIGH','Musical Instruments','Sitar and violin strings set up standing waves with fixed nodes and antinodes. The mix of harmonics excited — not the fundamental frequency alone — is what lets your ear tell the two apart.'],
  ['IMPACT: EMERGING','Bat Echolocation & Sonar','Bats emit ultrasonic pulses and read the reflected wave for distance, direction and size of obstacles — reflection of waves at a boundary, running in real time, without any eyes at all.'],
];

const bigQuestions=[
  ['blue','❓','What','is a Wave?','A wave is a disturbance that propagates through a medium — or, for light, even through empty space — without transporting matter as a whole. Drop a pebble in still water and the ripples travel outward, but the water itself only bobs up and down where it stands.'],
  ['teal','💡','Why','do waves carry energy, not matter?','Cork pieces floating on disturbed water move up and down but never drift outward with the ripples — proof the water itself doesn\u2019t travel. What actually moves outward is energy, and the pattern of disturbance carries information from one point to another.'],
  ['purple','👤','Who','first analysed wave motion?','Christiaan Huygens (1629–1695), Robert Hooke and Isaac Newton laid the groundwork. Wave theory grew directly out of their earlier work on oscillating springs and the simple pendulum — oscillations of one particle, extended to a whole coupled medium.'],
  ['gold','📍','Where','do waves show up?','Water ripples, sound in air, vibrations in a stretched string, seismic waves through rock — all mechanical waves needing a medium. Light and other electromagnetic waves are the exception: they cross a vacuum at c = 299,792,458 m/s.'],
  ['red','⏰','When','does a wave need a medium?','Mechanical waves — sound, water, string waves — always need a medium of elastic, coupled particles to carry them. Electromagnetic waves don\u2019t. A third kind, matter waves, are tied to particles like electrons and show up in devices such as electron microscopes.'],
  ['pink','⚙️','How','does a disturbance actually travel?','Picture springs joined end to end: pull one and release it, and it stretches its neighbour, which stretches the next, and so on. Each spring only oscillates about its own equilibrium position, but the disturbance itself walks all the way down the line.'],
];

function Header(){return <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">◔</span><b>skill<span>100</span>.ai</b></a><nav>{['Home','Skill Discovery','IDY 2026','WYSD 2026','WYSD Maths','NEET','Rapid Math'].map(x=><a key={x} href="#modules">{x}</a>)}</nav><button className="logout">Logout</button></header>}

function DetailNav({active,onBack,onGo}){
  return <div className="detail-nav">
    <button onClick={onBack} className="detail-back">← Back to Dashboard</button>
    <div className="nav-pills">
      {modules.map(([,title,icon,colour])=>
        <button key={title} className={`nav-pill ${colour} ${active===title?'active':''}`} onClick={()=>onGo(title)}>
          <span>{icon}</span>{title}
        </button>)}
    </div>
  </div>
}

function Connectomics({onBack,onGo}){
  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Connectomics" onBack={onBack} onGo={onGo}/>
    <div className="connect-label">WAVES · CONNECTOMICS</div>
    <h1>See how <span>waves connect</span></h1>
    <p className="connect-intro">A wave is a travelling disturbance that carries energy, not matter. This map links what you already know to the ideas — and the everyday devices — you're about to master.</p>

    <section className="checkpoint-panel">
      <h2>✅ You must be comfortable with:</h2>
      <div className="checkpoint-grid">
        {prereqsCheckpoint.map(([title,text])=><div className="checkpoint-item" key={title}><span className="check-mark">✓</span><div><b>{title}</b><small>{text}</small></div></div>)}
      </div>
    </section>

    <div className="chapter-link-box">
      <p>🔗 CHAPTER LINK</p>
      <span>This chapter connects directly to Oscillations (Ch.13), Elasticity (Ch.8) and Wave Optics (Ch.16). A wave is motion borrowed from a spring and handed from particle to particle — every later chapter on sound, light, or radiation either applies or extends it.</span>
    </div>

    <h2 className="section-heading">The Web of Physics</h2>
    <section className="web-grid">
      {webLinks.map(([icon,tag,title,chap,cls,text])=>
        <article className={`web-card ${cls}`} key={title}>
          <div className="web-card-top"><span className="web-icon">{icon}</span><span className="web-tag">{tag}</span></div>
          <h3>Waves <small>(Ch.14)</small> <b>→</b> {title} <small>({chap})</small></h3>
          <p>{text}</p>
        </article>)}
    </section>

    <h2 className="section-heading">Real World Systems</h2>
    <section className="realworld-grid">
      {realWorld.map(([impact,title,text])=>
        <article className="realworld-card" key={title}>
          <p>{impact}</p>
          <h3>{title}</h3>
          <span>{text}</span>
        </article>)}
    </section>

    <section className="infinite-panel">
      <div className="infinite-icon">⛓️</div>
      <h2>Infinite Connections</h2>
      <p>Waves aren't just ripples on a string — they're the language of sound, music, medical imaging, and eventually light itself. Every note you hear and every scan a doctor reads relies on the physics in this chapter.</p>
      <button onClick={()=>onGo('Introduction')}>Next Topic: Introduction <b>→</b></button>
    </section>

  </main></div>
}

function QuestionCard({colour,icon,word,subtitle,detail}){
  const[open,setOpen]=useState(false);
  return <article className={`question-card ${colour}`}>
    <button className="question-top" onClick={()=>setOpen(o=>!o)}>
      <div className="question-icon">{icon}</div>
      <div className="question-text"><b>{word}</b><small>{subtitle}</small></div>
      <span className={`question-chevron ${open?'open':''}`}>▾</span>
    </button>
    {open&&<p className="question-detail">{detail}</p>}
  </article>
}

function Introduction({onBack,onGo}){
  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Introduction" onBack={onBack} onGo={onGo}/>

    <section className="intro-hero">
      <h1><span className="intro-lead">Dive into</span> Waves</h1>
      <p>Get started with the 6 big questions and check your prerequisites.</p>
    </section>

    <h2 className="section-heading center">Prerequisites</h2>
    <section className="prereq-grid">
      {prereqs.map(([title,icon,text])=>
        <article className="prereq-card" key={title}>
          <div className="prereq-icon">{icon}</div>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>)}
    </section>

    <h2 className="section-heading center">6 Big Questions</h2>
    <section className="question-grid">
      {bigQuestions.map(q=><QuestionCard key={q[2]} colour={q[0]} icon={q[1]} word={q[2]} subtitle={q[3]} detail={q[4]}/>)}
    </section>

    <section className="ready-panel">
      <div><p>READY TO LEARN THE LANGUAGE?</p><h2>Next up: amplitude, wavelength, frequency, and phase.</h2></div>
      <button onClick={()=>onGo('Terminology')}>Terminology <b>→</b></button>
    </section>

  </main></div>
}

function App(){
  const[view,setView]=useState(null);
  const goDashboard=()=>setView(null);
  const goTo=(title)=>{
    if(title==='Connectomics')setView('connectomics');
    else if(title==='Introduction')setView('introduction');
    else goDashboard();
  };
  if(view==='connectomics')return <Connectomics onBack={goDashboard} onGo={goTo}/>;
  if(view==='introduction')return <Introduction onBack={goDashboard} onGo={goTo}/>;
  return <div className="chapter-page"><Header/><main id="top" className="chapter-layout"><section className="chapter-hero"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><a href="#modules" className="back-link">← Grade 11 Physics</a><div className="hero-copy"><p className="chapter-kicker">CHAPTER FOURTEEN</p><h1>Master<br/><span>Waves</span></h1><p>Discover how disturbances travel through matter and space. From ripples on water to sound and communication, master the physics of waves.</p></div><div className="stats"><div><strong>7</strong><small>CORE TOPICS</small></div><div><strong>20+</strong><small>PRACTICE PROBLEMS</small></div><div><strong>12</strong><small>CHAPTER LINKS</small></div><div><strong>0%</strong><small>MASTERY</small></div></div></section><section id="modules" className="module-list">{modules.map(([eyebrow,title,icon,colour,text])=><article className={`module-card ${colour}`} key={title} onClick={()=>goTo(title)}><div className="module-icon">{icon}</div><div><p>{eyebrow}</p><h2>{title}</h2><span>{text}</span></div><button aria-label={`Open ${title}`}>→</button></article>)}</section></main></div>
};export default App;