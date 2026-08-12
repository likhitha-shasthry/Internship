import { useMemo, useState } from 'react';
import './index.css';

const modules=[['START HERE','Introduction','☀️','blue','Understand what a wave is, how disturbances travel, and why waves carry energy without transporting matter.'],['THE LANGUAGE','Terminology','📖','teal','Learn amplitude, wavelength, frequency, period, phase, crest, trough, and wavefront.'],['CORE PRACTICE','Skills','🎯','purple','Explore transverse and longitudinal waves, progressive-wave displacement, wave speed, and superposition.'],['BIG PICTURE','Connectomics','🔗','gold','Connect waves to oscillations, energy transfer, and the behaviour of particles in a medium.'],['TEST READY','Exam Edge','🏆','red','Practice reflection of waves, beats, numerical problems, and chapter exercises with confidence.'],['VISUAL FLOW','Mind Map','🧠','indigo','Interactive flow mapping every section, idea, and equation in the Waves chapter.']];

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

<<<<<<< Updated upstream
const examTabs=[['neet','NEET','green'],['jee','JEE Main','blue'],['cet','Karnataka CET','orange'],['puc','PUC / Boards','purple']];

const examData={
  neet:{title:'NEET',weightage:'2 - 3',marks:'8 - 12',difficulty:'Medium',
    focus:"Wave speed formulas (v = √(T/μ), v = √(B/ρ)), the principle of superposition, and beat frequency (Δf = |f₁ − f₂|) are asked almost every year. Expect one direct numerical and one conceptual question.",
    pyqs:[
      ['NEET 2023','Two tuning forks of frequency 256 Hz and 260 Hz are sounded together. The number of beats heard in 4 seconds is:','Beat frequency = |f₁ − f₂| = |260 − 256| = 4 Hz. Beats in 4 s = 4 × 4 = 16 beats.'],
      ['NEET 2022','A transverse wave y = 0.02 sin(4πt − 0.02πx) (SI units) travels along a stretched string. The wave speed is:','Compare with y = a sin(ωt − kx): ω = 4π rad/s, k = 0.02π rad/m. v = ω/k = 4π / 0.02π = 200 m/s.'],
      ['NEET 2021','A wave pulse on a string reflects from a rigid boundary. The phase change on reflection is:','A rigid (fixed) end forces zero displacement, so the reflected pulse is inverted — a phase change of π (180°). A free end gives no phase change.'],
    ]},
  jee:{title:'JEE Main',weightage:'1 - 2',marks:'4 - 8',difficulty:'Hard',
    focus:'Questions combine superposition with standing waves on strings or pipes, or mix wave speed with elasticity (Ch.8). Multi-step numericals involving harmonics and resonance length are common.',
    pyqs:[
      ['JEE Main 2023','A string of length 1 m, fixed at both ends, vibrates in its 3rd harmonic at 300 Hz. Find the wave speed on the string.','nth harmonic: fₙ = nv/2L → 300 = 3v/(2×1) → v = 300×2/3 = 200 m/s.'],
      ['JEE Main 2022','Two waves y₁ = a sin(ωt) and y₂ = a sin(ωt + π/3) superpose. Find the amplitude of the resultant wave.','A = √(a² + a² + 2a²cos(π/3)) = √(3)·a ≈ 1.73a.'],
    ]},
  cet:{title:'Karnataka CET',weightage:'2 - 3',marks:'2 - 3',difficulty:'Easy to Medium',
    focus:'Formula recall and short conceptual definitions dominate — amplitude, wavelength, the frequency-period relation, and the basic wave equation v = fλ. Expect direct one-line numericals.',
    pyqs:[
      ['Karnataka CET 2021','The relation between wave velocity v, frequency f and wavelength λ is:','v = f × λ — the wave equation relating speed, frequency and wavelength.'],
      ['Karnataka CET 2019','A wave has a frequency of 500 Hz and travels at 350 m/s in air. Its wavelength is:','λ = v/f = 350/500 = 0.7 m.'],
    ]},
  puc:{title:'PUC / Boards',weightage:'7 - 10%',marks:'5 - 7',difficulty:'Medium',
    focus:'Derivations (speed of a transverse wave on a stretched string, the progressive wave equation) and short definition questions on amplitude, phase and beats are the safest scoring areas.',
    pyqs:[
      ['PUC / Boards 2020','Derive an expression for the speed of a transverse wave on a stretched string.',"Consider an element of string under tension T and linear density μ. Applying Newton's second law to a small curved element and simplifying for small displacements gives v = √(T/μ)."],
      ['PUC / Boards 2018','What are beats? Derive an expression for beat frequency.','Superposing y₁ = a sin(ω₁t) and y₂ = a sin(ω₂t) gives a resultant whose amplitude is modulated at frequency |f₁ − f₂|/2, so beats are heard at frequency |f₁ − f₂|.'],
    ]},
};
=======
const mindMapBranches=[
  {id:'intro',label:'Introduction',ref:'§14.1',colour:'blue',icon:'🌊',points:[
    'A wave is a disturbance that propagates through a medium (or space) without transporting matter as a whole.',
    'Waves transport energy and information, not matter — cork on water bobs up and down but never drifts outward.',
    'Mechanical waves (sound, water, string) need a material, elastic medium.',
    'Electromagnetic waves need no medium — all travel at c = 299,792,458 m/s in vacuum.',
    'Matter waves are tied to particles like electrons — used in electron microscopes.',
    'Huygens, Hooke & Newton linked wave theory to oscillating springs and the simple pendulum.',
    'Spring-chain analogy: pulling one end disturbs the next spring, and the next — the disturbance walks down the line while each spring only oscillates locally.',
  ]},
  {id:'types',label:'Transverse & Longitudinal',ref:'§14.2',colour:'teal',icon:'↕️',points:[
    'Transverse wave: particles oscillate perpendicular to the direction of propagation (e.g. a wave on a string).',
    'Longitudinal wave: particles oscillate parallel to the direction of propagation (e.g. sound in a pipe of air).',
    'Transverse waves need a shear modulus — they propagate only in solids, not fluids.',
    'Longitudinal waves need a bulk modulus — they propagate in solids, liquids AND gases.',
    'Steel can carry both transverse and longitudinal waves; air only longitudinal.',
    'Water surface waves are a mix: capillary waves (short λ, surface tension) and gravity waves (long λ, gravity restoring force).',
  ]},
  {id:'displacement',label:'Displacement Relation',ref:'§14.3',colour:'purple',icon:'📈',points:[
    'y(x,t) = a sin(kx − ωt + φ) describes a sinusoidal travelling wave.',
    'a = amplitude — maximum displacement from equilibrium.',
    '(kx − ωt + φ) = phase; φ = initial phase angle (phase at x=0, t=0).',
    'k = angular wave number = 2π/λ, unit rad·m⁻¹.',
    'ω = angular frequency = 2π/T = 2πν, unit rad·s⁻¹.',
    'λ = wavelength — distance between two points of the same phase.',
    'T = period, ν = frequency = 1/T, measured in hertz.',
  ]},
  {id:'speed',label:'Speed of a Wave',ref:'§14.4',colour:'gold',icon:'⚡',points:[
    'v = ω/k = λ/T = λν — general speed relation for any progressive wave.',
    'Transverse wave on a stretched string: v = √(T/μ)  (T = tension, μ = linear mass density).',
    'Longitudinal wave in a fluid: v = √(B/ρ)  (B = bulk modulus, ρ = density).',
    'Longitudinal wave in a solid bar: v = √(Y/ρ)  (Y = Young\u2019s modulus).',
    'Newton\u2019s formula for sound (isothermal): v = √(P/ρ) → predicts 280 m/s in air at STP.',
    'Laplace\u2019s correction (adiabatic, B = γP): v = √(γP/ρ) → gives 331.3 m/s, matching experiment.',
    'Wave speed depends only on the medium\u2019s elastic + inertial properties, never on the source\u2019s motion.',
  ]},
  {id:'superposition',label:'Superposition',ref:'§14.5',colour:'red',icon:'➕',points:[
    'Principle of superposition: y(x,t) = y₁(x,t) + y₂(x,t) — net displacement is the algebraic sum.',
    'Each wave moves as if the others were not present; pulses retain their identity after crossing.',
    'Two equal-amplitude waves differing by phase φ combine to: y = [2a cos(φ/2)] sin(kx − ωt + φ/2).',
    'Constructive interference: φ = 0 (or multiple of 2π) → resultant amplitude 2a (maximum).',
    'Destructive interference: φ = π → resultant amplitude 0 everywhere, at all times.',
    'This principle is the basis of interference, standing waves, and beats.',
  ]},
  {id:'reflection',label:'Reflection & Standing Waves',ref:'§14.6',colour:'pink',icon:'🪞',points:[
    'At a rigid boundary a travelling wave reflects with a phase change of π (180°) — like an echo.',
    'At an open (free) boundary, reflection happens with no phase change.',
    'A wave + its own reflection superpose into a standing wave: y = 2a sin(kx) cos(ωt).',
    'Nodes = fixed points of zero amplitude; antinodes = fixed points of maximum amplitude; spacing = λ/2.',
    'String fixed at both ends: v_n = nv/2L, n = 1,2,3,… → ALL harmonics allowed.',
    'Pipe closed at one end, open at the other: v_n = (n+½)v/2L → only ODD harmonics.',
    'Pipe open at both ends: generates all harmonics, same as a string.',
    'Sitar and violin timbre differs because different modes are excited to different strengths.',
  ]},
  {id:'beats',label:'Beats',ref:'§14.7',colour:'indigo',icon:'🎵',points:[
    'Beats arise from superposing two waves of close (but not equal) frequencies ν₁ and ν₂.',
    'The resultant oscillates at the average frequency, but its amplitude waxes and wanes.',
    'Beat frequency: ν_beat = |ν₁ − ν₂|.',
    'Musicians use beats to tune instruments — adjusting a string until the beats slow down and vanish.',
    'Example: 11 Hz + 9 Hz waves superpose to give an audible beat of 2 Hz.',
  ]},
];
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
function ExamEdge({onBack,onGo}){
  const[tab,setTab]=useState('neet');
  const d=examData[tab];
  const colour=examTabs.find(t=>t[0]===tab)[2];
  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Exam Edge" onBack={onBack} onGo={onGo}/>

    <section className="examedge-hero">
      <h1>Waves <span>Exam Edge</span></h1>
      <p>See how Waves is tested across major competitive exams and clear your conceptual hurdles.</p>
    </section>

    <div className="examedge-tabs">
      {examTabs.map(([key,label,c])=>
        <button key={key} className={`exam-tab ${c} ${tab===key?'active':''}`} onClick={()=>setTab(key)}>{label}</button>)}
    </div>

    <section className="examedge-panel">
      <h2 className={`examedge-strat-title ${colour}`}><span className="examedge-bar"/>{d.title} <b>Strategy</b></h2>
      <div className="examedge-stats">
        <div><small>WEIGHTAGE</small><strong className={colour}>{d.weightage} <em>Qs</em></strong></div>
        <div><small>MARKS</small><strong className={colour}>{d.marks}</strong></div>
        <div><small>DIFFICULTY</small><strong>{d.difficulty}</strong></div>
      </div>

      <h3>What to Focus On</h3>
      <div className={`examedge-focus ${colour}`}>{d.focus}</div>

      <h3 className="examedge-pyq-title">📝 Previous Year Questions (Trend)</h3>
      <div className="examedge-pyq-list">
        {d.pyqs.map(([tag,q,sol])=>
          <div className="pyq-card" key={tag+q.slice(0,12)}>
            <span className="pyq-tag">{tag}</span>
            <p>{q}</p>
            <div className={`pyq-solution ${colour}`}>
              <small>SOLUTION OUTLINE</small>
              <span>{sol}</span>
            </div>
          </div>)}
      </div>
    </section>
=======
function polarPoint(cx,cy,r,angleDeg){
  const a=(angleDeg-90)*(Math.PI/180);
  return {x:cx+r*Math.cos(a), y:cy+r*Math.sin(a)};
}

function MindMap({onBack,onGo}){
  const[active,setActive]=useState(null);
  const size=620, center=size/2, radius=225;

  const nodes=useMemo(()=>mindMapBranches.map((b,i)=>{
    const angle=(360/mindMapBranches.length)*i;
    const pos=polarPoint(center,center,radius,angle);
    return {...b, x:pos.x, y:pos.y};
  }),[]);

  const activeBranch=mindMapBranches.find(b=>b.id===active)||null;

  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Mind Map" onBack={onBack} onGo={onGo}/>

    <section className="intro-hero">
      <h1><span className="intro-lead">The whole chapter,</span> at a glance</h1>
      <p>Click a branch to expand it. Click the centre — or the branch again — to collapse.</p>
    </section>

    <div className="mindmap-canvas-wrap">
      <div className="mindmap-canvas" style={{width:size,height:size}}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mindmap-svg">
          {nodes.map(n=>
            <line key={n.id} x1={center} y1={center} x2={n.x} y2={n.y}
              className={`mindmap-line ${active===n.id?'active '+n.colour:''}`}/>)}
        </svg>

        <button className="mindmap-hub" onClick={()=>setActive(null)}>WAVES<small>Ch.14</small></button>

        {nodes.map(n=>{
          const isActive=active===n.id;
          return <button key={n.id}
            className={`mindmap-node ${n.colour} ${isActive?'active':''}`}
            style={{left:n.x,top:n.y}}
            onClick={()=>setActive(isActive?null:n.id)}>
            <span className="mindmap-node-icon">{n.icon}</span>
            <span className="mindmap-node-text"><b>{n.label}</b><small>{n.ref}</small></span>
          </button>
        })}
      </div>
    </div>

    <div className="mindmap-legend">
      {mindMapBranches.map(b=>
        <button key={b.id} className={`mindmap-chip ${b.colour} ${active===b.id?'active':''}`}
          onClick={()=>setActive(active===b.id?null:b.id)}>
          {b.icon} {b.label}
        </button>)}
    </div>

    {activeBranch ? (
      <section className={`mindmap-detail-panel ${activeBranch.colour}`}>
        <div className="mindmap-detail-head">
          <span className="mindmap-detail-icon">{activeBranch.icon}</span>
          <div><h3>{activeBranch.label}</h3><p>{activeBranch.ref}</p></div>
        </div>
        <ul className="mindmap-detail-list">
          {activeBranch.points.map((pt,i)=><li key={i}>{pt}</li>)}
        </ul>
      </section>
    ) : (
      <div className="mindmap-detail-empty">Select a branch above to see its key ideas and equations.</div>
    )}
>>>>>>> Stashed changes

  </main></div>
}

function App(){
  const[view,setView]=useState(null);
  const goDashboard=()=>setView(null);
  const goTo=(title)=>{
    if(title==='Connectomics')setView('connectomics');
    else if(title==='Introduction')setView('introduction');
<<<<<<< Updated upstream
    else if(title==='Exam Edge')setView('examedge');
=======
    else if(title==='Mind Map')setView('mindmap');
>>>>>>> Stashed changes
    else goDashboard();
  };
  if(view==='connectomics')return <Connectomics onBack={goDashboard} onGo={goTo}/>;
  if(view==='introduction')return <Introduction onBack={goDashboard} onGo={goTo}/>;
<<<<<<< Updated upstream
  if(view==='examedge')return <ExamEdge onBack={goDashboard} onGo={goTo}/>;
=======
  if(view==='mindmap')return <MindMap onBack={goDashboard} onGo={goTo}/>;
>>>>>>> Stashed changes
  return <div className="chapter-page"><Header/><main id="top" className="chapter-layout"><section className="chapter-hero"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><a href="#modules" className="back-link">← Grade 11 Physics</a><div className="hero-copy"><p className="chapter-kicker">CHAPTER FOURTEEN</p><h1>Master<br/><span>Waves</span></h1><p>Discover how disturbances travel through matter and space. From ripples on water to sound and communication, master the physics of waves.</p></div><div className="stats"><div><strong>7</strong><small>CORE TOPICS</small></div><div><strong>20+</strong><small>PRACTICE PROBLEMS</small></div><div><strong>12</strong><small>CHAPTER LINKS</small></div><div><strong>0%</strong><small>MASTERY</small></div></div></section><section id="modules" className="module-list">{modules.map(([eyebrow,title,icon,colour,text])=><article className={`module-card ${colour}`} key={title} onClick={()=>goTo(title)}><div className="module-icon">{icon}</div><div><p>{eyebrow}</p><h2>{title}</h2><span>{text}</span></div><button aria-label={`Open ${title}`}>→</button></article>)}</section></main></div>
};export default App;