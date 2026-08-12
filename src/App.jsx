import { useState } from 'react';
import './index.css';
import waveData from '../writing-block.json';

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

// ---- Terminology data, built from writing-block.json (single source of truth for content) ----
const chapterData = waveData.course.chapter;

// Friendly labels for the less-common formula/variable fields found in the JSON,
// so nothing present in the data is silently dropped.
const extraFormulaLabels = {
  frequencyFormula: 'Frequency Formula',
  wavelengths: 'Wavelengths',
  frequencies: 'Frequencies',
  fundamental: 'Fundamental',
  solidBarFormula: 'Formula (Solid Bar)',
  gasFormulaNewton: "Formula (Newton's, Gas)",
  gasFormulaLaplace: "Formula (Laplace's, Gas)",
};
const extraVariableLabels = { solidBarVariables: 'Variables (Solid Bar)' };

// Worked examples in the JSON are attached to a whole section, not a single term.
// This maps each example's title to the term(s) it is worked from, so it only
// surfaces on the term(s) it actually illustrates.
const exampleTopicMap = {
  'Classifying Wave Motion': ['Transverse Waves', 'Longitudinal Waves'],
  'Wave Equation on a String': ['Wave Function'],
  'Speed of Transverse Waves on a Steel Wire': ['Speed of a Transverse Wave on a Stretched String'],
  'Speed of Sound in Air': ['Speed of a Longitudinal Wave'],
  'Resonance in an Open Pipe': ['Resonance'],
  'Beats from Two Sitar Strings': ['Beat Frequency'],
};

// Flatten course.chapter.sections[].topics[] (and any nested subsections) into a
// single list of terminology entries, keeping each entry's section context.
function flattenTerminology(chapter){
  const items=[];
  (chapter.sections||[]).forEach(section=>{
    (section.topics||[]).forEach(topic=>{
      items.push({sectionId:section.id,sectionNumber:section.number,sectionTitle:section.title,parentSectionTitle:null,...topic});
    });
    (section.subsections||[]).forEach(sub=>{
      const subNumber=`${section.number}.${(sub.id||'').split('-').pop()}`;
      if(Array.isArray(sub.topics)&&sub.topics.length){
        sub.topics.forEach(topic=>{
          items.push({sectionId:sub.id,sectionNumber:subNumber,sectionTitle:sub.title,parentSectionTitle:section.title,...topic});
        });
      }else{
        items.push({sectionId:sub.id,sectionNumber:subNumber,sectionTitle:section.title,parentSectionTitle:null,...sub});
      }
    });
  });
  return items;
}

// Collect every worked example defined anywhere in the chapter (section.example
// and section.examples), tagged with the section they came from.
function collectExamples(chapter){
  const examples=[];
  (chapter.sections||[]).forEach(section=>{
    if(section.example)examples.push({...section.example,sectionNumber:section.number,sectionTitle:section.title});
    (section.examples||[]).forEach(ex=>examples.push({...ex,sectionNumber:section.number,sectionTitle:section.title}));
  });
  return examples;
}

const terminologyItems=flattenTerminology(chapterData);
const chapterExamples=collectExamples(chapterData);
function examplesForTerm(title){
  return chapterExamples.filter(ex=>(exampleTopicMap[ex.title]||[]).includes(title));
}

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

// ---- Small presentational helpers for the term detail card ----

function KeyValueList({data}){
  if(!data)return null;
  if(typeof data==='string')return <p className="term-kv-line">{data}</p>;
  if(Array.isArray(data))return <ul className="term-kv-list">{data.map((v,i)=><li key={i}>{v}</li>)}</ul>;
  return <ul className="term-kv-list">{Object.entries(data).map(([k,v])=><li key={k}><b>{k}</b> — {v}</li>)}</ul>;
}

function WorkedExample({example}){
  return <div className="worked-example">
    <p className="worked-example-label">WORKED EXAMPLE {example.number}</p>
    <h4>{example.title}</h4>
    {example.given&&<div className="worked-example-field"><span>Given</span><KeyValueList data={example.given}/></div>}
    {example.find&&<div className="worked-example-field"><span>Find</span><KeyValueList data={example.find}/></div>}
    {example.method&&<div className="worked-example-field"><span>Method</span><p className="term-kv-line">{example.method}</p></div>}
    {example.concepts&&<div className="worked-example-field"><span>Concepts</span><KeyValueList data={example.concepts}/></div>}
    {example.results&&<div className="worked-example-field"><span>Results</span><KeyValueList data={example.results}/></div>}
    {example.result&&<div className="worked-example-field"><span>Result</span><p className="term-kv-line">{example.result}</p></div>}
    {example.questions&&<div className="worked-example-field"><span>Questions</span>
      <ul className="term-kv-list">{example.questions.map((q,i)=><li key={i}>{q.question} — <i>{q.answer}</i></li>)}</ul>
    </div>}
  </div>
}

function TermDetail({term}){
  const examples=examplesForTerm(term.title);
  const extraFormulas=Object.keys(extraFormulaLabels).filter(k=>term[k]);
  const extraVariables=Object.keys(extraVariableLabels).filter(k=>term[k]);
  return <div className="term-detail">
    <p className="term-detail-crumb">{term.sectionNumber} · {term.parentSectionTitle?`${term.parentSectionTitle} · `:''}{term.sectionTitle}</p>
    <div className="term-detail-heading">
      {term.symbol&&<span className="term-symbol-badge">{term.symbol}</span>}
      <h2>{term.title}</h2>
    </div>

    {term.definition&&<p className="term-detail-text">{term.definition}</p>}
    {term.content&&<p className="term-detail-text">{term.content}</p>}
    {term.description&&<p className="term-detail-text">{term.description}</p>}

    {(term.formula||extraFormulas.length>0)&&<div className="term-formula-group">
      {term.formula&&<div className="formula-row"><code>{term.formula}</code></div>}
      {extraFormulas.map(k=><div className="formula-row" key={k}><span>{extraFormulaLabels[k]}</span><code>{term[k]}</code></div>)}
    </div>}

    {term.unit&&<p className="term-meta-line"><b>Unit:</b> {term.unit}</p>}

    {term.variables&&<div className="term-variables"><p className="term-block-label">Variables</p><KeyValueList data={term.variables}/></div>}
    {extraVariables.map(k=><div className="term-variables" key={k}><p className="term-block-label">{extraVariableLabels[k]}</p><KeyValueList data={term[k]}/></div>)}

    {term.condition&&<p className="term-meta-line"><b>Condition:</b> {term.condition}</p>}
    {term.result&&<p className="term-meta-line"><b>Result:</b> {term.result}</p>}

    {(term.examples&&term.examples.length>0||examples.length>0||term.importantPoint)&&<div className="term-side-grid">
      {term.examples&&term.examples.length>0&&<div className="term-box">
        <p className="term-block-label">Examples</p>
        <ul className="term-kv-list">{term.examples.map((ex,i)=><li key={i}>{ex}</li>)}</ul>
      </div>}
      {term.importantPoint&&<div className="term-box quick-memory">
        <p className="term-block-label">Quick Memory</p>
        <p>{term.importantPoint}</p>
      </div>}
    </div>}

    {examples.map((ex,i)=><WorkedExample example={ex} key={i}/>)}
  </div>
}

function Terminology({onBack,onGo}){
  const[selected,setSelected]=useState(0);
  const[tab,setTab]=useState('terms');
  const active=terminologyItems[selected];

  let groups=null;
  if(tab==='sections'){
    groups=[];
    terminologyItems.forEach((item,idx)=>{
      const label=`${item.sectionNumber} ${item.sectionTitle}`;
      let group=groups.find(g=>g.label===label);
      if(!group){group={label,items:[]};groups.push(group);}
      group.items.push({item,idx});
    });
  }

  const termButton=(item,idx)=>
    <button key={item.id||idx} className={`term-list-item ${idx===selected?'active':''}`}
      aria-selected={idx===selected} onClick={()=>setSelected(idx)}>
      {item.symbol&&<span className="term-list-symbol">{item.symbol}</span>}
      <span>{item.title}</span>
    </button>;

  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Terminology" onBack={onBack} onGo={onGo}/>

    <section className="lexicon-hero">
      <h1>Physics <span>Lexicon</span></h1>
      <p>Explore the foundations of Waves with {terminologyItems.length} key terms.</p>
      <div className="nav-pills lexicon-pills">
        <button className={`nav-pill ${tab==='terms'?'active':''}`} onClick={()=>setTab('terms')}>📖 Key Terms</button>
        <button className={`nav-pill ${tab==='sections'?'active':''}`} onClick={()=>setTab('sections')}>🌊 Wave Sections</button>
        <button className="nav-pill disabled" disabled title="Coming soon">🧠 Quiz Time</button>
      </div>
    </section>

    <section className="lexicon-layout">
      <nav className="term-list" aria-label="Terminology list">
        {tab==='sections'
          ?groups.map(g=><div key={g.label} className="term-group">
              <p className="term-group-label">{g.label}</p>
              {g.items.map(({item,idx})=>termButton(item,idx))}
            </div>)
          :terminologyItems.map((item,idx)=>termButton(item,idx))}
      </nav>
      <div className="term-detail-card">
        {active&&<TermDetail term={active}/>}
      </div>
    </section>

  </main></div>
}

function App(){
  const[view,setView]=useState(null);
  const goDashboard=()=>setView(null);
  const goTo=(title)=>{
    if(title==='Connectomics')setView('connectomics');
    else if(title==='Introduction')setView('introduction');
    else if(title==='Terminology')setView('terminology');
    else goDashboard();
  };
  if(view==='connectomics')return <Connectomics onBack={goDashboard} onGo={goTo}/>;
  if(view==='introduction')return <Introduction onBack={goDashboard} onGo={goTo}/>;
  if(view==='terminology')return <Terminology onBack={goDashboard} onGo={goTo}/>;
  return <div className="chapter-page"><Header/><main id="top" className="chapter-layout"><section className="chapter-hero"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><a href="#modules" className="back-link">← Grade 11 Physics</a><div className="hero-copy"><p className="chapter-kicker">CHAPTER FOURTEEN</p><h1>Master<br/><span>Waves</span></h1><p>Discover how disturbances travel through matter and space. From ripples on water to sound and communication, master the physics of waves.</p></div><div className="stats"><div><strong>7</strong><small>CORE TOPICS</small></div><div><strong>20+</strong><small>PRACTICE PROBLEMS</small></div><div><strong>12</strong><small>CHAPTER LINKS</small></div><div><strong>0%</strong><small>MASTERY</small></div></div></section><section id="modules" className="module-list">{modules.map(([eyebrow,title,icon,colour,text])=><article className={`module-card ${colour}`} key={title} onClick={()=>goTo(title)}><div className="module-icon">{icon}</div><div><p>{eyebrow}</p><h2>{title}</h2><span>{text}</span></div><button aria-label={`Open ${title}`}>→</button></article>)}</section></main></div>
};export default App;