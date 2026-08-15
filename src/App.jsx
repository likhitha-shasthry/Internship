import { useMemo, useState, useRef, useEffect } from 'react';
import './index.css';
import waveData from '../writing-block.json';

const modules=[['BEFORE YOU BEGIN','Connectomics','🔗','gold','Connect waves to oscillations, energy transfer, and the behaviour of particles in a medium.'],['START HERE','Introduction','☀️','blue','Understand what a wave is, how disturbances travel, and why waves carry energy without transporting matter.'],['THE LANGUAGE','Terminology','📖','teal','Learn amplitude, wavelength, frequency, period, phase, crest, trough, and wavefront.'],['CORE PRACTICE','Skills','🎯','purple','Explore transverse and longitudinal waves, progressive-wave displacement, wave speed, and superposition.'],['VISUAL FLOW','Mind Map','🧠','indigo','Interactive flow mapping every section, idea, and equation in the Waves chapter.'],['WATCH & LEARN','Videos','🎬','green','The Demystifying Waves video, cut into five short topic chapters you can watch one at a time.'],['TEST READY','Exam Edge','🏆','red','Practice reflection of waves, beats, numerical problems, and chapter exercises with confidence.'],['QUICK REFERENCE','Derivations & Formulas','📐','pink','Step-by-step derivations for wave speed and the wave equation, plus a quick-revision formula sheet.']];

const videoTopics=[
  {n:'01',id:'what-are-waves',title:'What Are Waves?',time:'0:00 – 2:12',colour:'blue',icon:'🌊',file:'01-what-are-waves.mp4',poster:'01-what-are-waves.jpg',blurb:'Why the water itself never travels with a ripple — a moving disturbance versus moving matter.'},
  {n:'02',id:'transverse-longitudinal',title:'Transverse & Longitudinal',time:'2:12 – 4:00',colour:'teal',icon:'↕️',file:'02-transverse-longitudinal.mp4',poster:'02-transverse-longitudinal.jpg',blurb:'How a string wave and a sound wave move their particles — sideways versus back-and-forth.'},
  {n:'03',id:'math-behind-waves',title:'The Math Behind Waves',time:'4:00 – 6:24',colour:'purple',icon:'📐',file:'03-math-behind-waves.mp4',poster:'03-math-behind-waves.jpg',blurb:'Amplitude, wavelength and angular frequency build up to y(x,t) = a sin(kx − ωt).'},
  {n:'04',id:'calculating-wave-speed',title:'Calculating Wave Speed',time:'6:24 – 8:04',colour:'gold',icon:'⚡',file:'04-calculating-wave-speed.mp4',poster:'04-calculating-wave-speed.jpg',blurb:'Speed in strings, gases and solids, plus Newton and Laplace on the speed of sound.'},
  {n:'05',id:'when-waves-collide',title:'When Waves Collide',time:'8:04 – 10:04',colour:'red',icon:'➕',file:'05-when-waves-collide.mp4',poster:'05-when-waves-collide.jpg',blurb:'Superposition in action, and whether noise is just an invisible web of overlapping waves.'},
];

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

// Which small diagram (if any) best illustrates a given term. Grouped by
// diagram type so one visual can serve every term it's genuinely relevant to.
const visualGroups = {
  transverse: ['Wave Function','Wave Travelling in Negative Direction','Amplitude','Phase','Initial Phase','Wavelength','Angular Wave Number','Time Period','Angular Frequency','Frequency','Transverse Waves','Progressive Waves','Wave Speed','Fundamental Wave Relation'],
  longitudinal: ['Longitudinal Waves','Compressions and Rarefactions','Longitudinal Wave Displacement'],
  standing: ['Standing Wave Formation','Nodes','Antinodes','Distance Between Successive Nodes','Distance Between Successive Antinodes','String Fixed at Both Ends','Harmonics'],
  interference: ['Superposition Principle','Multiple Waves','Interference','Constructive Interference','Destructive Interference','Resultant Amplitude'],
  reflection: ['Reflection at a Rigid Boundary','Reflection at an Open Boundary','Rigid Boundary','Open Boundary','Echo'],
  beats: ['Formation of Beats','Beat Frequency','Nature of Beats'],
  resonance: ['Air Column Closed at One End','Open Pipe','Resonance'],
};
const visualKeyForTitle = {};
Object.entries(visualGroups).forEach(([key,titles])=>titles.forEach(t=>{visualKeyForTitle[t]=key;}));

// Samples a sine curve into an SVG path string.
function sinePath(width,height,cycles,amp,phase=0,points=64){
  const midY=height/2; let d='';
  for(let i=0;i<=points;i++){
    const x=(i/points)*width;
    const y=midY-amp*Math.sin((i/points)*cycles*2*Math.PI+phase);
    d+=(i===0?'M':'L')+x.toFixed(1)+' '+y.toFixed(1)+' ';
  }
  return d.trim();
}

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
      items.push({key:`${section.id}::${topic.title}`,sectionId:section.id,sectionNumber:section.number,sectionTitle:section.title,parentSectionTitle:null,...topic});
    });
    (section.subsections||[]).forEach(sub=>{
      const subNumber=`${section.number}.${(sub.id||'').split('-').pop()}`;
      if(Array.isArray(sub.topics)&&sub.topics.length){
        sub.topics.forEach(topic=>{
          items.push({key:`${sub.id}::${topic.title}`,sectionId:sub.id,sectionNumber:subNumber,sectionTitle:sub.title,parentSectionTitle:section.title,...topic});
        });
      }else{
        items.push({key:sub.id,sectionId:sub.id,sectionNumber:subNumber,sectionTitle:section.title,parentSectionTitle:null,...sub});
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

// ---- Quiz question bank, generated entirely from terminologyItems ----
// Every prompt and every option (correct + distractors) is a real symbol,
// formula, title, or definition already present in writing-block.json —
// nothing here is invented, just re-presented as multiple-choice.
function shuffled(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

function buildQuizBank(items){
  const bank=[];
  const symbolPool=items.filter(t=>t.symbol);
  const formulaPool=items.filter(t=>t.formula);
  const defPool=items.filter(t=>t.definition||t.content);

  symbolPool.forEach(t=>{
    const distractors=shuffled(symbolPool.filter(x=>x.symbol!==t.symbol).map(x=>x.symbol)).slice(0,3);
    if(distractors.length===3){
      let explanation=`"${t.title}" is denoted by the symbol ${t.symbol}.`;
      if(t.definition||t.content)explanation+=` ${t.definition||t.content}`;
      else if(t.formula)explanation+=` Formula: ${t.formula}.`;
      bank.push({type:'symbol',prompt:`Which symbol represents "${t.title}"?`,correct:t.symbol,options:shuffled([t.symbol,...distractors]),source:t.title,explanation});
    }
  });
  formulaPool.forEach(t=>{
    const distractors=shuffled(formulaPool.filter(x=>x.formula!==t.formula).map(x=>x.formula)).slice(0,3);
    if(distractors.length===3){
      let explanation=`${t.title}: ${t.formula}.`;
      if(t.definition||t.content)explanation+=` ${t.definition||t.content}`;
      if(t.unit)explanation+=` Unit: ${t.unit}.`;
      bank.push({type:'formula',prompt:`Which formula corresponds to "${t.title}"?`,correct:t.formula,options:shuffled([t.formula,...distractors]),source:t.title,explanation});
    }
  });
  defPool.forEach(t=>{
    const text=t.definition||t.content;
    const distractors=shuffled(defPool.filter(x=>x.title!==t.title).map(x=>x.title)).slice(0,3);
    if(distractors.length===3){
      let explanation=`"${t.title}" is defined as: ${text}`;
      if(t.symbol)explanation+=` (Symbol: ${t.symbol})`;
      if(t.formula)explanation+=` Formula: ${t.formula}.`;
      bank.push({type:'term',prompt:`Which term does this describe: "${text}"`,correct:t.title,options:shuffled([t.title,...distractors]),source:t.title,explanation});
    }
  });
  return bank;
}

const quizBank=buildQuizBank(terminologyItems);
function pickQuizSet(n=5){return shuffled(quizBank).slice(0,Math.min(n,quizBank.length));}

// ---- Skills: one skill per top-level chapter section (14.1 – 14.7) ----
// Every skill's Learn content, Practice bank and Assess bank is generated
// straight from writing-block.json — nothing here is hand-written trivia.
// Each real item (symbol / formula / definition / unit / key point / example /
// variable) is turned into MULTIPLE question phrasings so a 6-topic section
// can still yield 15+ distinct, genuinely different questions for Practice
// and another 15 different ones for Assess.

function pickDistractors(pool,mapper,excludeVal,count,fallbackPool){
  const seen=new Set([excludeVal]);
  const out=[];
  const tryPool=(p)=>{
    shuffled(p).forEach(item=>{
      if(out.length>=count)return;
      const val=mapper(item);
      if(val&&!seen.has(val)){seen.add(val);out.push(val);}
    });
  };
  tryPool(pool);
  if(out.length<count&&fallbackPool)tryPool(fallbackPool);
  return out;
}

const genericUnits=['m','s','Hz','rad','kg','N','m/s','rad/s','rad m^-1'];

function buildQuestionPool(items,allItems){
  const bank=[];
  const push=(o)=>bank.push(o);

  const symbolPool=items.filter(t=>t.symbol);
  const formulaPool=items.filter(t=>t.formula);
  const defPool=items.filter(t=>t.definition||t.content||t.description);
  const unitPool=items.filter(t=>t.unit);
  const ipPool=items.filter(t=>t.importantPoint);
  const exPool=items.filter(t=>Array.isArray(t.examples)&&t.examples.length);
  const varPool=items.filter(t=>t.variables&&Object.keys(t.variables).length);

  const allSymbols=allItems.filter(t=>t.symbol);
  const allFormulas=allItems.filter(t=>t.formula);
  const allDefs=allItems.filter(t=>t.definition||t.content||t.description);
  const allIp=allItems.filter(t=>t.importantPoint);
  const allEx=[];
  allItems.forEach(t=>(t.examples||[]).forEach(ex=>allEx.push({title:t.title,ex})));
  const allVars=[];
  allItems.forEach(t=>{if(t.variables)Object.entries(t.variables).forEach(([sym,mean])=>allVars.push({title:t.title,sym,mean}));});

  const factLine=(t)=>{
    let line=`"${t.title}"`;
    if(t.symbol)line+=` (symbol ${t.symbol})`;
    line+=t.definition?`: ${t.definition}`:t.content?`: ${t.content}`:t.description?`: ${t.description}`:'.';
    if(t.formula)line+=` Formula: ${t.formula}.`;
    if(t.unit)line+=` Unit: ${t.unit}.`;
    return line;
  };

  symbolPool.forEach(t=>{
    const d=pickDistractors(symbolPool,x=>x.symbol,t.symbol,3,allSymbols);
    if(d.length>=1){
      push({prompt:`Which symbol represents "${t.title}"?`,correct:t.symbol,options:shuffled([t.symbol,...d]),source:t.title,explanation:factLine(t)});
    }
    const dRev=pickDistractors(symbolPool,x=>x.title,t.title,3,allSymbols);
    if(dRev.length>=1){
      push({prompt:`In this topic, what does the symbol "${t.symbol}" stand for?`,correct:t.title,options:shuffled([t.title,...dRev]),source:t.title,explanation:factLine(t)});
    }
  });

  formulaPool.forEach(t=>{
    const d=pickDistractors(formulaPool,x=>x.formula,t.formula,3,allFormulas);
    if(d.length>=1){
      push({prompt:`Which formula corresponds to "${t.title}"?`,correct:t.formula,options:shuffled([t.formula,...d]),source:t.title,explanation:factLine(t)});
    }
    const dRev=pickDistractors(formulaPool,x=>x.title,t.title,3,allFormulas);
    if(dRev.length>=1){
      push({prompt:`The relation "${t.formula}" describes:`,correct:t.title,options:shuffled([t.title,...dRev]),source:t.title,explanation:factLine(t)});
    }
  });

  defPool.forEach(t=>{
    const text=t.definition||t.content||t.description;
    const d=pickDistractors(defPool,x=>x.title,t.title,3,allDefs);
    if(d.length>=1){
      push({prompt:`Which term does this describe: "${text}"`,correct:t.title,options:shuffled([t.title,...d]),source:t.title,explanation:factLine(t)});
    }
    const dRev=pickDistractors(defPool,x=>x.definition||x.content||x.description,text,3,allDefs);
    if(dRev.length>=1){
      push({prompt:`What best describes "${t.title}"?`,correct:text,options:shuffled([text,...dRev]),source:t.title,explanation:factLine(t)});
    }
  });

  unitPool.forEach(t=>{
    const d=pickDistractors(unitPool,x=>x.unit,t.unit,3,genericUnits.map(u=>({unit:u})));
    push({prompt:`What is the SI unit of "${t.title}"?`,correct:t.unit,options:shuffled([t.unit,...d]),source:t.title,explanation:factLine(t)});
  });

  ipPool.forEach(t=>{
    const d=pickDistractors(ipPool,x=>x.importantPoint,t.importantPoint,3,allIp);
    if(d.length>=1){
      push({prompt:`Which is the key thing to remember about "${t.title}"?`,correct:t.importantPoint,options:shuffled([t.importantPoint,...d]),source:t.title,explanation:factLine(t)});
    }
    const dRev=pickDistractors(ipPool,x=>x.title,t.title,3,allIp);
    if(dRev.length>=1){
      push({prompt:`This key point — "${t.importantPoint}" — is about:`,correct:t.title,options:shuffled([t.title,...dRev]),source:t.title,explanation:factLine(t)});
    }
  });

  exPool.forEach(t=>{
    const ex=t.examples[0];
    const d=pickDistractors(items.filter(x=>x.title!==t.title&&Array.isArray(x.examples)&&x.examples.length),x=>x.examples[0],ex,3,allEx.map(e=>({examples:[e.ex]})));
    if(d.length>=1){
      push({prompt:`Which of these is a real example of "${t.title}"?`,correct:ex,options:shuffled([ex,...d]),source:t.title,explanation:factLine(t)});
    }
  });

  varPool.forEach(t=>{
    Object.entries(t.variables).forEach(([sym,mean])=>{
      const otherVarMeanings=allVars.filter(v=>!(v.title===t.title&&v.sym===sym)).map(v=>v.mean);
      const d=pickDistractors(otherVarMeanings.map(mean=>({mean})),x=>x.mean,mean,3,null);
      if(d.length>=1){
        push({prompt:`In the formula for "${t.title}" (${t.formula||''}), what does "${sym}" represent?`,correct:mean,options:shuffled([mean,...d]),source:t.title,explanation:factLine(t)});
      }
    });
  });

  defPool.forEach(t=>{
    const text=t.definition||t.content||t.description;
    push({prompt:`True or False: "${text}" — this is about ${t.title}.`,correct:'True',options:['True','False'],source:t.title,explanation:factLine(t)});
    const others=defPool.filter(x=>x.title!==t.title);
    if(others.length){
      const other=shuffled(others)[0];
      const otherText=other.definition||other.content||other.description;
      push({prompt:`True or False: "${otherText}" — this is about ${t.title}.`,correct:'False',options:['True','False'],source:t.title,explanation:`Actually, that statement describes "${other.title}", not "${t.title}". ${factLine(t)}`});
    }
  });

  // dedupe identical prompts (can happen when a title repeats a template)
  const seenPrompts=new Set();
  return bank.filter(q=>{
    if(seenPrompts.has(q.prompt))return false;
    seenPrompts.add(q.prompt);
    return true;
  });
}

function padTo(arr,n){
  if(arr.length===0)return [];
  const out=[];
  let i=0;
  while(out.length<n){out.push(arr[i%arr.length]);i++;}
  return shuffled(out);
}

// Builds two genuinely different 15-question sets (Practice vs Assess) from
// one skill's question pool. If the underlying content is thin, the two
// sets are built from independent shuffles so their order and mix differ
// even where some repetition is unavoidable.
function splitPracticeAssess(pool,n=15){
  const s1=shuffled(pool);
  if(s1.length>=2*n)return {practice:s1.slice(0,n),assess:s1.slice(n,2*n)};
  if(s1.length>=n){
    const practice=s1.slice(0,n);
    const remainder=s1.slice(n);
    const filler=shuffled(practice).slice(0,n-remainder.length);
    return {practice,assess:shuffled([...remainder,...filler])};
  }
  return {practice:padTo(s1,n),assess:padTo(shuffled(pool),n)};
}

const skillMeta=[
  {number:'14.1',id:'intro',icon:'🌊',colour:'blue',blurb:'What a wave actually is, how a disturbance propagates, and the difference between mechanical, electromagnetic and matter waves.'},
  {number:'14.2',id:'types',icon:'↕️',colour:'teal',blurb:'Tell transverse from longitudinal waves, spot compressions and rarefactions, and classify real wave motion.'},
  {number:'14.3',id:'displacement',icon:'📈',colour:'purple',blurb:'Read and build the progressive wave equation y(x,t) = a sin(kx − ωt + φ) — amplitude, phase, wavelength and frequency.'},
  {number:'14.4',id:'speed',icon:'⚡',colour:'gold',blurb:'Calculate wave speed on strings and in solids, liquids and gases — including Newton and Laplace on the speed of sound.'},
  {number:'14.5',id:'superposition',icon:'➕',colour:'red',blurb:'Apply the principle of superposition to predict constructive and destructive interference.'},
  {number:'14.6',id:'reflection',icon:'🪞',colour:'pink',blurb:'Reflection at rigid and open boundaries, standing waves, nodes, antinodes, harmonics and resonance.'},
  {number:'14.7',id:'beats',icon:'🎵',colour:'indigo',blurb:'How beats arise from two close frequencies, and how to calculate beat frequency.'},
];

const skillsData=skillMeta.map(meta=>{
  const section=chapterData.sections.find(s=>s.number===meta.number);
  const items=terminologyItems.filter(t=>t.sectionNumber.split('.').slice(0,2).join('.')===meta.number);
  const pool=buildQuestionPool(items,terminologyItems);
  const{practice,assess}=splitPracticeAssess(pool,15);
  return {...meta,title:section?section.title:meta.number,items,pool,practiceBank:practice,assessBank:assess};
});

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

const examTabs=[['neet','NEET','green'],['jee','JEE Main','blue'],['cet','Karnataka CET','orange'],['puc','PUC / Boards','purple']];

const examData={
  neet:{title:'NEET',weightage:'2 - 3',marks:'8 - 12',difficulty:'Medium',
    focus:"Wave speed formulas (v = √(T/μ), v = √(B/ρ)), the principle of superposition, and beat frequency (Δf = |f₁ − f₂|) are asked almost every year. Expect one direct numerical and one conceptual question.",
    pyqs:[
      ['NEET 2023','Two tuning forks of frequency 256 Hz and 260 Hz are sounded together. The number of beats heard in 4 seconds is:','Beat frequency = |f₁ − f₂| = |260 − 256| = 4 Hz. Beats in 4 s = 4 × 4 = 16 beats.'],
      ['NEET 2022','A transverse wave y = 0.02 sin(4πt − 0.02πx) (SI units) travels along a stretched string. The wave speed is:','Compare with y = a sin(ωt − kx): ω = 4π rad/s, k = 0.02π rad/m. v = ω/k = 4π / 0.02π = 200 m/s.'],
      ['NEET 2021','A wave pulse on a string reflects from a rigid boundary. The phase change on reflection is:','A rigid (fixed) end forces zero displacement, so the reflected pulse is inverted — a phase change of π (180°). A free end gives no phase change.'],
      ['NEET 2020','A closed organ pipe of length 20 cm resonates in its fundamental mode with a tuning fork of frequency 425 Hz. The speed of sound in air is:','Fundamental of a closed pipe: f₁ = v/4L → v = 4Lf₁ = 4 × 0.20 × 425 = 340 m/s.'],
      ['NEET 2019','A stationary wave is given by y = 4 sin(0.5πx) cos(200πt) (x, y in cm, t in s). The distance between two successive nodes is:','Compare 0.5πx with kx: k = 0.5π rad/cm → λ = 2π/k = 4 cm. Nodes repeat every λ/2, so successive-node spacing = 2 cm.'],
      ['NEET 2018','A source emitting sound at 500 Hz moves towards a stationary listener at 34 m/s (speed of sound = 340 m/s). The frequency heard is:','f′ = f × v/(v − vₛ) = 500 × 340/(340 − 34) = 500 × 340/306 ≈ 556 Hz.'],
    ]},
  jee:{title:'JEE Main',weightage:'1 - 2',marks:'4 - 8',difficulty:'Hard',
    focus:'Questions combine superposition with standing waves on strings or pipes, or mix wave speed with elasticity (Ch.8). Multi-step numericals involving harmonics and resonance length are common.',
    pyqs:[
      ['JEE Main 2023','A string of length 1 m, fixed at both ends, vibrates in its 3rd harmonic at 300 Hz. Find the wave speed on the string.','nth harmonic: fₙ = nv/2L → 300 = 3v/(2×1) → v = 300×2/3 = 200 m/s.'],
      ['JEE Main 2022','Two waves y₁ = a sin(ωt) and y₂ = a sin(ωt + π/3) superpose. Find the amplitude of the resultant wave.','A = √(a² + a² + 2a²cos(π/3)) = √(3)·a ≈ 1.73a.'],
      ['JEE Main 2021','In a resonance-tube experiment (neglecting end correction), the first resonance length is 17 cm for a tuning fork of frequency 500 Hz. The speed of sound in air is:','First resonance in a closed tube: L₁ = λ/4 → λ = 4 × 0.17 = 0.68 m. v = fλ = 500 × 0.68 = 340 m/s.'],
      ['JEE Main 2020','Waves y₁ = A sin(kx − ωt) and y₂ = A sin(kx + ωt) superpose to form a stationary wave. The positions of the nodes are:','y = y₁ + y₂ = 2A sin(kx)cos(ωt). Nodes occur where sin(kx) = 0 → kx = nπ → x = nλ/2, for n = 0, 1, 2…'],
      ['JEE Main 2024','A car horn at 400 Hz approaches a stationary wall at 20 m/s (v_sound = 340 m/s). Find the frequency of the reflected sound heard by the driver.','Frequency hitting the wall (moving source): f₁ = f·v/(v − vₛ) = 400×340/320 = 425 Hz. Driver (moving observer, approaching wall) hears: f₂ = f₁·(v + v₀)/v = 425×360/340 = 450 Hz.'],
    ]},
  cet:{title:'Karnataka CET',weightage:'2 - 3',marks:'2 - 3',difficulty:'Easy to Medium',
    focus:'Formula recall and short conceptual definitions dominate — amplitude, wavelength, the frequency-period relation, and the basic wave equation v = fλ. Expect direct one-line numericals.',
    pyqs:[
      ['Karnataka CET 2021','The relation between wave velocity v, frequency f and wavelength λ is:','v = f × λ — the wave equation relating speed, frequency and wavelength.'],
      ['Karnataka CET 2019','A wave has a frequency of 500 Hz and travels at 350 m/s in air. Its wavelength is:','λ = v/f = 350/500 = 0.7 m.'],
      ['Karnataka CET 2018','The type of wave used in SONAR for underwater detection is:','Ultrasonic waves — longitudinal mechanical waves of frequency above 20,000 Hz.'],
      ['Karnataka CET 2017','A wave is represented by y = A sin(ωt − kx). The direction of propagation of this wave is:','The (ωt − kx) form travels in the +x direction; (ωt + kx) would travel in −x.'],
      ['Karnataka CET 2022','If the tension in a stretched string is made four times its original value, the wave speed becomes:','v ∝ √T, so quadrupling T doubles v — the new speed is 2× the original.'],
    ]},
  puc:{title:'PUC / Boards',weightage:'7 - 10%',marks:'5 - 7',difficulty:'Medium',
    focus:'Derivations (speed of a transverse wave on a stretched string, the progressive wave equation) and short definition questions on amplitude, phase and beats are the safest scoring areas.',
    pyqs:[
      ['PUC / Boards 2020','Derive an expression for the speed of a transverse wave on a stretched string.',"Consider an element of string under tension T and linear density μ. Applying Newton's second law to a small curved element and simplifying for small displacements gives v = √(T/μ)."],
      ['PUC / Boards 2018','What are beats? Derive an expression for beat frequency.','Superposing y₁ = a sin(ω₁t) and y₂ = a sin(ω₂t) gives a resultant whose amplitude is modulated at frequency |f₁ − f₂|/2, so beats are heard at frequency |f₁ − f₂|.'],
      ['PUC / Boards 2019','Distinguish between progressive waves and stationary waves (any two points).','Progressive waves transport energy and every particle has the same amplitude; stationary waves transport no net energy and amplitude varies with position, from zero at nodes to maximum at antinodes.'],
      ['PUC / Boards 2021','State the principle of superposition of waves.',"When two or more waves overlap at a point, the resultant displacement is the vector (algebraic) sum of the displacements each wave would produce individually — y = y₁ + y₂ + …"],
      ['PUC / Boards 2017',"Derive Newton's formula for the speed of sound in a gas and state Laplace's correction.",'Newton assumed an isothermal process, giving v = √(P/ρ); this underestimates the actual speed. Laplace corrected it to an adiabatic process, giving v = √(γP/ρ), which matches experiment.'],
    ]},
};

const derivations=[
  {title:'Speed of a Transverse Wave on a Stretched String',icon:'🎻',colour:'blue',
   subtitle:'From tension and linear mass density to v = √(T/μ)',
   steps:[
     'Consider a small curved element of a string under tension T, with linear mass density μ (mass per unit length), carrying a transverse pulse.',
     'The two tension forces at the ends of the element are tangential to the string. For a gently curved element, their vertical components do not cancel — this net vertical force is what restores the element toward its equilibrium position.',
     "For a small angle θ subtended by the element, the net restoring force works out to F = T·(Δx/R), where R is the local radius of curvature and Δx is the element's length.",
     'Applying Newton\'s second law (F = ma) to the element and comparing with the standard wave equation ∂²y/∂t² = v²·∂²y/∂x² shows that v² = T/μ.',
     'Taking the square root gives the final result: v = √(T/μ). A tighter string (higher T) or a lighter string (lower μ) carries waves faster.',
   ]},
  {title:'The Progressive (Travelling) Wave Equation',icon:'〰️',colour:'teal',
   subtitle:'Building y(x,t) = A sin(kx − ωt) from first principles',
   steps:[
     'A wave moving in the +x direction repeats the same displacement pattern, just shifted in position as time passes — so displacement depends on both x and t together, through the combination (x − vt).',
     'For a sinusoidal source, the displacement at the origin is y(0,t) = A sin(ωt), where ω = 2π/T is the angular frequency.',
     'Replacing t with (t − x/v) accounts for the time delay a disturbance takes to reach point x: y(x,t) = A sin(ω(t − x/v)).',
     'Defining the wave number k = ω/v = 2π/λ, this simplifies to the standard form y(x,t) = A sin(ωt − kx), or equivalently A sin(kx − ωt) for a wave moving in −x.',
     'This single equation captures everything about the wave: amplitude A, angular frequency ω (→ frequency f = ω/2π), and wave number k (→ wavelength λ = 2π/k).',
   ]},
  {title:'Beat Frequency from Superposition',icon:'🎵',colour:'purple',
   subtitle:'Why two close frequencies produce a throbbing loudness pattern',
   steps:[
     'Take two waves of equal amplitude but slightly different frequencies: y₁ = a sin(2πf₁t) and y₂ = a sin(2πf₂t).',
     'By the principle of superposition, the resultant displacement is y = y₁ + y₂.',
     'Using the sum-to-product identity, y = 2a cos(2π·((f₁−f₂)/2)·t) · sin(2π·((f₁+f₂)/2)·t).',
     'This is a wave at the average frequency (f₁+f₂)/2, whose amplitude itself oscillates slowly at frequency |f₁−f₂|/2.',
     'Loudness is maximum whenever the amplitude term is at its peak — which happens twice per amplitude cycle — so the beat frequency actually heard is |f₁ − f₂|.',
   ]},
  {title:"Newton's Formula & Laplace's Correction for Speed of Sound",icon:'💨',colour:'gold',
   subtitle:'Why sound in air travels faster than Newton first calculated',
   steps:[
     "Newton assumed sound propagates through air isothermally (constant temperature), giving v = √(P/ρ), where P is pressure and ρ is density.",
     'Using standard air values, this formula predicts about 280 m/s at STP — roughly 15% lower than the experimentally measured ~332 m/s.',
     'Laplace corrected the assumption: compressions and rarefactions in a sound wave happen too fast for heat to escape, so the process is adiabatic, not isothermal.',
     'For an adiabatic process, PVᵞ = constant (γ = Cp/Cv), which modifies the bulk modulus used in the speed formula from P to γP.',
     'This gives the corrected formula v = √(γP/ρ), which matches experimental values closely (γ ≈ 1.4 for air).',
   ]},
];

const formulaGroups=[
  {title:'Basic Wave Quantities',items:[
    ['v = f λ','Wave speed = frequency × wavelength'],
    ['T = 1 / f','Time period is the reciprocal of frequency'],
    ['ω = 2π / T = 2π f','Angular frequency in rad/s'],
    ['k = 2π / λ','Wave number (angular spatial frequency)'],
  ]},
  {title:'Wave Speed',items:[
    ['v = √(T / μ)','Speed of a transverse wave on a stretched string (T = tension, μ = linear mass density)'],
    ['v = √(B / ρ)','General speed of a longitudinal wave in a medium of bulk modulus B, density ρ'],
    ['v = √(γP / ρ)',"Speed of sound in a gas — Laplace's adiabatic correction"],
  ]},
  {title:'Superposition & Beats',items:[
    ['Δf = |f₁ − f₂|','Beat frequency heard when two close frequencies superpose'],
    ['A = √(a₁² + a₂² + 2a₁a₂cosφ)','Resultant amplitude of two superposed waves with phase difference φ'],
  ]},
  {title:'Standing Waves',items:[
    ['fₙ = n v / 2L','Harmonics on a string fixed at both ends, or in an open pipe (n = 1, 2, 3…)'],
    ['fₙ = (2n − 1) v / 4L','Harmonics in a pipe closed at one end (only odd harmonics, n = 1, 2, 3…)'],
  ]},
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

const visualCaptions = {
  transverse: 'Transverse Wave Snapshot',
  longitudinal: 'Longitudinal Wave — Compressions & Rarefactions',
  standing: 'Standing Wave — String Fixed at Both Ends',
  interference: 'Superposition — Constructive vs Destructive',
  reflection: 'Reflection at a Boundary',
  beats: 'Beats — Amplitude Envelope',
  resonance: 'Standing Wave in an Air Column',
};

function TermVisual({title}){
  const key=visualKeyForTitle[title];
  if(!key)return null;
  const W=300,H=110;
  let body=null;

  if(key==='transverse'){
    body=<>
      <line x1="0" y1={H/2} x2={W} y2={H/2} stroke="#c7cfe6" strokeDasharray="3 4"/>
      <path d={sinePath(W,H,1.5,30)} fill="none" stroke="#4566df" strokeWidth="2.5"/>
      <line x1={W*0.17} y1={H/2} x2={W*0.17} y2={H/2-30} stroke="#e5a406" strokeWidth="1.5"/>
      <text x={W*0.17+6} y={H/2-14} fontSize="11" fill="#b07d00" fontWeight="700">a</text>
      <line x1={W*0.17} y1={H-8} x2={W*0.17+W/1.5} y2={H-8} stroke="#7b43ea" strokeWidth="1.3" markerEnd="url(#arrowP)" markerStart="url(#arrowP)"/>
      <text x={W*0.17+W/3} y={H-13} fontSize="11" fill="#7b43ea" fontWeight="700">λ</text>
      <defs><marker id="arrowP" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#7b43ea"/></marker></defs>
    </>;
  } else if(key==='longitudinal'){
    const spacings=[8,8,10,14,20,26,20,14,10,8,8,10,14,20,26,20,14,10,8,8];
    let x=6; const lines=[];
    spacings.forEach((s,i)=>{lines.push(<line key={i} x1={x} y1="14" x2={x} y2={H-14} stroke="#4566df" strokeWidth="2"/>); x+=s;});
    body=<>
      {lines}
      <text x="14" y="12" fontSize="10.5" fill="#4566df" fontWeight="700">compression</text>
      <text x="120" y="12" fontSize="10.5" fill="#7b8296" fontWeight="700">rarefaction</text>
    </>;
  } else if(key==='standing'){
    body=<>
      <circle cx="6" cy={H/2} r="4" fill="#37436b"/>
      <circle cx={W-6} cy={H/2} r="4" fill="#37436b"/>
      <path d={sinePath(W,H,1,26)} fill="none" stroke="#4566df" strokeWidth="2"/>
      <path d={sinePath(W,H,1,-26)} fill="none" stroke="#4566df" strokeWidth="2" opacity="0.35"/>
      {[0,0.5,1].map((f,i)=><circle key={'n'+i} cx={f*W} cy={H/2} r="3.5" fill="#dc4744"/>)}
      {[0.25,0.75].map((f,i)=><circle key={'a'+i} cx={f*W} cy={H/2-26} r="3.5" fill="#e5a406"/>)}
      <text x="2" y={H-4} fontSize="10" fill="#dc4744" fontWeight="700">● node</text>
      <text x="70" y={H-4} fontSize="10" fill="#b07d00" fontWeight="700">● antinode</text>
    </>;
  } else if(key==='interference'){
    body=<>
      <text x="4" y="12" fontSize="10.5" fill="#419d90" fontWeight="800">CONSTRUCTIVE</text>
      <path d={sinePath(W/2-6,40,1.5,10)} fill="none" stroke="#4566df" strokeWidth="1.3" opacity="0.55" transform="translate(0,16)"/>
      <path d={sinePath(W/2-6,40,1.5,10)} fill="none" stroke="#7b43ea" strokeWidth="1.3" opacity="0.55" transform="translate(0,16)"/>
      <path d={sinePath(W/2-6,40,1.5,19)} fill="none" stroke="#419d90" strokeWidth="2.4" transform="translate(0,16)"/>
      <line x1={W/2+3} y1="0" x2={W/2+3} y2={H} stroke="#e1e6f2" strokeWidth="1"/>
      <text x={W/2+9} y="12" fontSize="10.5" fill="#dc4744" fontWeight="800">DESTRUCTIVE</text>
      <path d={sinePath(W/2-9,40,1.5,14,0)} fill="none" stroke="#4566df" strokeWidth="1.3" opacity="0.55" transform={`translate(${W/2+9},16)`}/>
      <path d={sinePath(W/2-9,40,1.5,14,Math.PI)} fill="none" stroke="#7b43ea" strokeWidth="1.3" opacity="0.55" transform={`translate(${W/2+9},16)`}/>
      <line x1={W/2+9} y1="36" x2={W-6} y2="36" stroke="#dc4744" strokeWidth="2.4" transform="translate(0,16)"/>
    </>;
  } else if(key==='reflection'){
    body=<>
      <line x1={W-14} y1="6" x2={W-14} y2={H-6} stroke="#37436b" strokeWidth="4"/>
      <text x="4" y="14" fontSize="10.5" fill="#4566df" fontWeight="800">RIGID → inverted</text>
      <path d={`M6,28 Q30,10 50,28 T94,28`} fill="none" stroke="#4566df" strokeWidth="2"/>
      <path d={`M6,28 Q30,46 50,28 T94,28`} fill="none" stroke="#dc4744" strokeWidth="2" strokeDasharray="4 3"/>
      <text x="4" y="66" fontSize="10.5" fill="#419d90" fontWeight="800">OPEN → upright</text>
      <path d={`M6,82 Q30,64 50,82 T94,82`} fill="none" stroke="#4566df" strokeWidth="2"/>
      <path d={`M6,82 Q30,64 50,82 T94,82`} fill="none" stroke="#419d90" strokeWidth="2" strokeDasharray="4 3" transform="translate(4,0)"/>
    </>;
  } else if(key==='beats'){
    body=<>
      <path d={sinePath(W,H,10,32)} fill="none" stroke="#4566df" strokeWidth="1.4"/>
      <path d={`M0,${H/2} `+Array.from({length:65},(_,i)=>{const x=(i/64)*W;const env=32*Math.abs(Math.cos((i/64)*2*Math.PI));return `L${x.toFixed(1)},${(H/2-env).toFixed(1)}`;}).join(' ')} fill="none" stroke="#e5a406" strokeWidth="1.8" strokeDasharray="2 3"/>
      <path d={`M0,${H/2} `+Array.from({length:65},(_,i)=>{const x=(i/64)*W;const env=32*Math.abs(Math.cos((i/64)*2*Math.PI));return `L${x.toFixed(1)},${(H/2+env).toFixed(1)}`;}).join(' ')} fill="none" stroke="#e5a406" strokeWidth="1.8" strokeDasharray="2 3"/>
      <text x="4" y="12" fontSize="10.5" fill="#b07d00" fontWeight="700">amplitude envelope</text>
    </>;
  } else if(key==='resonance'){
    body=<>
      <line x1="10" y1="10" x2="10" y2={H-10} stroke="#37436b" strokeWidth="4"/>
      <path d={`M10,${H/2} Q ${W*0.55},14 ${W-10},${H/2}`} fill="none" stroke="#4566df" strokeWidth="2"/>
      <path d={`M10,${H/2} Q ${W*0.55},${H-14} ${W-10},${H/2}`} fill="none" stroke="#4566df" strokeWidth="2" opacity="0.35"/>
      <circle cx="10" cy={H/2} r="3.5" fill="#dc4744"/>
      <circle cx={W-10} cy={H/2} r="3.5" fill="#e5a406"/>
      <text x="0" y={H-2} fontSize="10" fill="#dc4744" fontWeight="700">closed = node</text>
      <text x={W-92} y={H-2} fontSize="10" fill="#b07d00" fontWeight="700">open = antinode</text>
    </>;
  }

  return <div className="term-visual">
    <p className="term-block-label">{visualCaptions[key]}</p>
    <svg viewBox={`0 0 ${W} ${H}`} className="term-visual-svg" preserveAspectRatio="xMidYMid meet">{body}</svg>
  </div>;
}

function TermDetail({term,hideCrumb}){
  const examples=examplesForTerm(term.title);
  const extraFormulas=Object.keys(extraFormulaLabels).filter(k=>term[k]);
  const extraVariables=Object.keys(extraVariableLabels).filter(k=>term[k]);
  return <div className="term-detail">
    {!hideCrumb&&<p className="term-detail-crumb">{term.parentSectionTitle?`${term.parentSectionTitle} · `:''}{term.sectionTitle}</p>}
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

    <TermVisual title={term.title}/>

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

function Quiz({onGo}){
  const[questions,setQuestions]=useState(()=>pickQuizSet(5));
  const[index,setIndex]=useState(0);
  const[selected,setSelected]=useState(null);
  const[score,setScore]=useState(0);
  const[finished,setFinished]=useState(false);

  const q=questions[index];

  const choose=(opt)=>{
    if(selected)return;
    setSelected(opt);
    if(opt===q.correct)setScore(s=>s+1);
  };

  const next=()=>{
    if(index+1<questions.length){setIndex(index+1);setSelected(null);}
    else setFinished(true);
  };

  const restart=()=>{
    setQuestions(pickQuizSet(5));
    setIndex(0);setSelected(null);setScore(0);setFinished(false);
  };

  if(!q)return <div className="quiz-card"><p>Not enough terminology data to build a quiz yet.</p></div>;

  if(finished)return <div className="quiz-card quiz-finished">
    <p className="quiz-eyebrow">QUIZ COMPLETE</p>
    <h3>You scored {score} / {questions.length}</h3>
    <p className="quiz-result-note">{score===questions.length?'Perfect score — great grasp of the terminology!':score>=Math.ceil(questions.length/2)?'Solid work — a quick review of the missed terms will lock it in.':'Worth another pass through Key Terms before you try again.'}</p>
    <div className="quiz-actions">
      <button className="quiz-restart" onClick={restart}>↻ Try Again</button>
      <button className="quiz-next-topic" onClick={()=>onGo('Skills')}>Next Topic: Skills →</button>
    </div>
  </div>;

  return <div className="quiz-card">
    <div className="quiz-top">
      <div>
        <p className="quiz-eyebrow">QUESTION {index+1} OF {questions.length}</p>
        <h3>Quiz Mode</h3>
      </div>
      <div className="quiz-score" aria-label={`Score ${score}`}>{score}</div>
    </div>
    <p className="quiz-question">{q.prompt}</p>
    <div className="quiz-options">
      {q.options.map(opt=>{
        let cls='quiz-option';
        if(selected){
          if(opt===q.correct)cls+=' correct';
          else if(opt===selected)cls+=' incorrect';
        }
        return <button key={opt} className={cls} onClick={()=>choose(opt)} disabled={!!selected} aria-pressed={opt===selected}>{opt}</button>;
      })}
    </div>
    {selected&&q.explanation&&
      <div className="quiz-explanation">
        <strong>Explanation:</strong> {q.explanation}
      </div>}
    <div className="quiz-actions">
      <button className="quiz-next" disabled={!selected} onClick={next}>
        {index+1<questions.length?'Next Question →':'See Results →'}
      </button>
    </div>
  </div>;
}

function KeyTermsBrowser(){
  const[query,setQuery]=useState('');
  const[selectedKey,setSelectedKey]=useState(terminologyItems[0]?.key);
  const listRef=useRef(null);

  useEffect(()=>{
    if(!listRef.current)return;
    const el=listRef.current.querySelector(`[data-key="${CSS.escape(selectedKey||'')}"]`);
    if(el)el.scrollIntoView({block:'nearest'});
  },[selectedKey]);

  const filtered=query.trim()
    ?terminologyItems.filter(t=>t.title.toLowerCase().includes(query.trim().toLowerCase()))
    :terminologyItems;

  const activeInFiltered=filtered.find(t=>t.key===selectedKey);
  const active=activeInFiltered||filtered[0]||terminologyItems.find(t=>t.key===selectedKey);
  const activeIndex=activeInFiltered?filtered.indexOf(activeInFiltered):-1;

  const goRelative=(delta)=>{
    if(activeIndex<0||filtered.length===0)return;
    const next=filtered[(activeIndex+delta+filtered.length)%filtered.length];
    setSelectedKey(next.key);
  };

  return <section className="lexicon-layout">
    <div className="term-list-panel">
      <div className="term-search">
        <span>🔍</span>
        <input type="text" placeholder="Search terms…" value={query}
          onChange={e=>setQuery(e.target.value)} aria-label="Search terminology"/>
      </div>
      <nav className="term-list" ref={listRef} aria-label="Terminology list">
        {filtered.length===0&&<p className="term-empty">No terms match "{query}".</p>}
        {filtered.map(item=>
          <button key={item.key} data-key={item.key} className={`term-list-item ${item.key===active?.key?'active':''}`}
            aria-selected={item.key===active?.key} onClick={()=>setSelectedKey(item.key)}>
            {item.symbol&&<span className="term-list-symbol">{item.symbol}</span>}
            <span>{item.title}</span>
          </button>)}
      </nav>
    </div>
    <div className="term-detail-card">
      {active&&<>
        <TermDetail term={active}/>
        <div className="term-nav">
          <button onClick={()=>goRelative(-1)} disabled={filtered.length<2}>← Previous</button>
          <span>{activeIndex>=0?`${activeIndex+1} of ${filtered.length}`:''}</span>
          <button onClick={()=>goRelative(1)} disabled={filtered.length<2}>Next →</button>
        </div>
      </>}
    </div>
  </section>;
}

// The 7 top-level sections (14.1–14.7), each already carrying its own
// blurb + topic list via skillsData. This drives a section-by-section
// walkthrough that's deliberately a different interaction than the flat
// Key Terms glossary: pick a section, then expand each topic one at a
// time, with a small progress readout as you go.
function SectionExplorer(){
  const[activeNum,setActiveNum]=useState(skillsData[0]?.number);
  const[openKey,setOpenKey]=useState(null);
  const[seen,setSeen]=useState({});
  const section=skillsData.find(s=>s.number===activeNum)||skillsData[0];

  const selectSection=(num)=>{
    setActiveNum(num);
    setOpenKey(null);
  };

  const toggleTopic=(item)=>{
    const willOpen=openKey!==item.key;
    setOpenKey(willOpen?item.key:null);
    if(willOpen)setSeen(prev=>{
      const set=new Set(prev[activeNum]||[]);
      set.add(item.key);
      return {...prev,[activeNum]:set};
    });
  };

  const exploredCount=seen[activeNum]?.size||0;
  const totalCount=section?.items.length||0;
  const progressPct=totalCount?Math.round((exploredCount/totalCount)*100):0;

  return <div className="sections-explorer">
    <nav className="sections-rail" aria-label="Chapter sections">
      {skillsData.map(s=>{
        const done=seen[s.number]?.size||0;
        return <button key={s.number} className={`sections-rail-btn ${s.colour} ${activeNum===s.number?'active':''}`} onClick={()=>selectSection(s.number)}>
          <span className="sections-rail-icon">{s.icon}</span>
          <span className="sections-rail-body">
            <b>{s.title}</b>
            <small>{done}/{s.items.length} explored</small>
          </span>
        </button>;
      })}
    </nav>

    <div className={`sections-panel ${section?.colour||''}`}>
      <p className="sections-panel-eyebrow">CHAPTER WALKTHROUGH</p>
      <div className="sections-panel-heading"><span>{section?.icon}</span><h2>{section?.title}</h2></div>
      <p className="sections-panel-blurb">{section?.blurb}</p>

      <div className="sections-progress">
        <div className="sections-progress-track"><div className="sections-progress-fill" style={{width:`${progressPct}%`}}/></div>
        <span>{exploredCount} of {totalCount} topics explored</span>
      </div>

      <div className="sections-accordion">
        {section?.items.map(item=>{
          const open=openKey===item.key;
          const done=seen[activeNum]?.has(item.key);
          return <div key={item.key} className={`sections-accordion-item ${open?'open':''}`}>
            <button className="sections-accordion-head" onClick={()=>toggleTopic(item)} aria-expanded={open}>
              {item.symbol&&<span className="term-list-symbol">{item.symbol}</span>}
              <span className="sections-accordion-title">{item.title}</span>
              {done&&!open&&<span className="sections-accordion-check">✓</span>}
              <span className="sections-accordion-chevron">⌄</span>
            </button>
            {open&&<div className="sections-accordion-body"><TermDetail term={item} hideCrumb/></div>}
          </div>;
        })}
      </div>
    </div>
  </div>;
}

function Terminology({onBack,onGo}){
  const[tab,setTab]=useState('terms');

  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Terminology" onBack={onBack} onGo={onGo}/>

    <section className="lexicon-hero">
      <h1>Physics <span>Lexicon</span></h1>
      <p>{tab==='quiz'?'Test your vocabulary and formula knowledge!':tab==='sections'?'Walk through the chapter section by section — expand each topic as you go.':`Search and browse all ${terminologyItems.length} key terms in one place.`}</p>
      <div className="nav-pills lexicon-pills">
        <button className={`nav-pill ${tab==='terms'?'active':''}`} onClick={()=>setTab('terms')}>📖 Key Terms</button>
        <button className={`nav-pill ${tab==='sections'?'active':''}`} onClick={()=>setTab('sections')}>🌊 Wave Sections</button>
        <button className={`nav-pill ${tab==='quiz'?'active':''}`} onClick={()=>setTab('quiz')}>✏️ Quiz Time</button>
      </div>
    </section>

    {tab==='quiz' && <section className="quiz-wrap"><Quiz onGo={onGo}/></section>}
    {tab==='terms' && <KeyTermsBrowser/>}
    {tab==='sections' && <SectionExplorer/>}

    {tab!=='quiz'&&<div className="mastered-wrap">
      <button className="mastered-btn" onClick={()=>onGo('Skills')}>I've mastered the language! 🎉</button>
    </div>}

  </main></div>
}

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

  </main></div>
}

function Videos({onBack,onGo}){
  const[active,setActive]=useState(0);
  const v=videoTopics[active];
  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Videos" onBack={onBack} onGo={onGo}/>

    <section className="intro-hero">
      <h1><span className="intro-lead">Watch</span> Demystifying Waves</h1>
      <p>The full video, cut into five topic-wise chapters. Pick a chapter below to jump straight to it.</p>
    </section>

    <div className="video-stage">
      <video key={v.file} className="video-player" controls autoPlay poster={`/videos/${v.poster}`} src={`/videos/${v.file}`}/>
      <div className={`video-now ${v.colour}`}>
        <span className="video-now-num">{v.n}</span>
        <div><b>{v.icon} {v.title}</b><small>{v.time}</small></div>
      </div>
    </div>

    <h2 className="section-heading">All Chapters</h2>
    <section className="video-grid">
      {videoTopics.map((t,i)=>
        <article key={t.id} className={`video-card ${t.colour} ${active===i?'active':''}`} onClick={()=>setActive(i)}>
          <div className="video-card-thumb" style={{backgroundImage:`url(/videos/${t.poster})`}}>
            <span className="video-card-num">{t.n}</span>
            <span className="video-card-play">▶</span>
          </div>
          <div className="video-card-body">
            <h3>{t.icon} {t.title}</h3>
            <p>{t.blurb}</p>
            <small>{t.time}</small>
          </div>
        </article>)}
    </section>

  </main></div>
}

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

  </main></div>
}

function DerivationsFormulas({onBack,onGo}){
  const[open,setOpen]=useState(null);
  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Derivations & Formulas" onBack={onBack} onGo={onGo}/>
    <p className="connect-label">WAVES · QUICK REFERENCE</p>
    <h1>Derivations & <span>Formulas</span></h1>
    <p className="connect-intro">Step-by-step derivations for the key results in Waves, plus a quick-revision formula sheet you can scan right before an exam.</p>

    <h2 className="section-heading">Key Derivations</h2>
    <div className="derivation-grid">
      {derivations.map((d,i)=>
        <article className={`question-card ${d.colour}`} key={d.title}>
          <button className="question-top" onClick={()=>setOpen(open===i?null:i)}>
            <span className="question-icon">{d.icon}</span>
            <span className="question-text"><b>{d.title}</b><small>{d.subtitle}</small></span>
            <span className={`question-chevron ${open===i?'open':''}`}>⌄</span>
          </button>
          {open===i && <ol className="derivation-steps">{d.steps.map((s,j)=><li key={j}>{s}</li>)}</ol>}
        </article>)}
    </div>

    <h2 className="section-heading">Formula Sheet</h2>
    {formulaGroups.map(g=>
      <div className="formula-group" key={g.title}>
        <h3>{g.title}</h3>
        <div className="formula-grid">
          {g.items.map(([f,desc])=><div className="formula-card" key={f}><code>{f}</code><span>{desc}</span></div>)}
        </div>
      </div>)}

  </main></div>
}

// ---- Skills: Learn ----
function SkillOverview({skill}){
  return <div className="term-detail">
    <p className="term-detail-crumb">{skill.title}</p>
    <div className="term-detail-heading"><h2>{skill.title}</h2></div>
    <p className="term-detail-text">{skill.blurb}</p>
    <div className="term-box quick-memory">
      <p className="term-block-label">What You'll Cover</p>
      <ul className="term-kv-list">{skill.items.map(t=><li key={t.key}>{t.title}</li>)}</ul>
    </div>
  </div>
}

function SkillLearn({skill,onExit}){
  const topics=useMemo(()=>[{key:'overview',isOverview:true,title:'Overview'},...skill.items],[skill]);
  const[idx,setIdx]=useState(0);
  const current=topics[idx];
  return <div className="connect-page"><Header/><main className="connect-main">
    <button className="detail-back skill-exit-top" onClick={onExit}>← Back to Skills</button>
    <div className={`skill-learn-layout ${skill.colour}`}>
      <aside className="skill-learn-sidebar">
        <div className="skill-learn-sidebar-head"><span className="skill-learn-sidebar-icon">{skill.icon}</span><h3>{skill.title}</h3></div>
        <nav>
          {topics.map((t,i)=>
            <button key={t.key} className={`skill-learn-nav-item ${i===idx?'active':''}`} onClick={()=>setIdx(i)}>
              <span className="skill-learn-nav-dot"/>{t.title}
            </button>)}
        </nav>
      </aside>
      <section className={`skill-learn-card ${skill.colour}`}>
        <p className="skill-learn-eyebrow">{current.isOverview?'OVERVIEW':`TOPIC ${idx}`}</p>
        {current.isOverview?<SkillOverview skill={skill}/>:<TermDetail term={current}/>}
        <div className="skill-learn-footer">
          <button className="skill-nav-btn" disabled={idx===0} onClick={()=>setIdx(i=>i-1)}>← Previous</button>
          {idx<topics.length-1
            ?<button className={`skill-nav-btn primary ${skill.colour}`} onClick={()=>setIdx(i=>i+1)}>Next Topic →</button>
            :<button className={`skill-nav-btn primary ${skill.colour}`} onClick={onExit}>Got It ✓</button>}
        </div>
      </section>
    </div>
  </main></div>
}

// ---- Skills: Practice ----
function SkillPractice({skill,onExit}){
  const bank=skill.practiceBank;
  const[idx,setIdx]=useState(0);
  const[answers,setAnswers]=useState({});
  const q=bank[idx];
  const selected=answers[idx];

  const choose=(opt)=>{ if(selected)return; setAnswers(a=>({...a,[idx]:opt})); };

  if(!q)return <div className="connect-page"><Header/><main className="connect-main">
    <button className="detail-back skill-exit-top" onClick={onExit}>← Exit Practice</button>
    <p className="skill-empty">Not enough content in {skill.title} to build practice questions yet.</p>
  </main></div>;

  return <div className="connect-page"><Header/><main className="connect-main">
    <div className="skill-practice-wrap">
      <div className={`skill-practice-card ${skill.colour}`}>
        <div className="skill-practice-top">
          <button className="skill-exit-link" onClick={onExit}>← Exit Practice</button>
          <span className="skill-practice-counter">Practice {idx+1}/{bank.length}</span>
        </div>
        <p className="skill-source-tag">{skill.icon} {q.source}</p>
        <h3 className="skill-question-text">{q.prompt}</h3>
        <div className="skill-options">
          {q.options.map(opt=>{
            let cls='skill-option';
            if(selected){
              if(opt===q.correct)cls+=' correct';
              else if(opt===selected)cls+=' incorrect';
              else cls+=' muted';
            }
            return <button key={opt} className={cls} onClick={()=>choose(opt)} disabled={!!selected}>{opt}</button>;
          })}
        </div>
        {selected&&<div className={`skill-feedback ${selected===q.correct?'correct':'incorrect'}`}>
          <p>{selected===q.correct?'🎉 Correct!':'❌ Not quite'}</p>
          <small>{q.explanation}</small>
        </div>}
        <div className="skill-practice-footer">
          <button className="skill-nav-btn" disabled={idx===0} onClick={()=>setIdx(i=>i-1)}>← Previous</button>
          {idx<bank.length-1
            ?<button className={`skill-nav-btn primary ${skill.colour}`} disabled={!selected} onClick={()=>setIdx(i=>i+1)}>Next Question →</button>
            :<button className={`skill-nav-btn primary ${skill.colour}`} disabled={!selected} onClick={onExit}>Finish Practice ✓</button>}
        </div>
      </div>
    </div>
  </main></div>
}

// ---- Skills: Assess ----
function formatClock(totalSeconds){
  const m=Math.floor(totalSeconds/60), s=totalSeconds%60;
  return `${m}:${String(s).padStart(2,'0')}`;
}

function SkillAssess({skill,onExit}){
  const questions=skill.assessBank;
  const[phase,setPhase]=useState('test'); // 'test' | 'report'
  const[idx,setIdx]=useState(0);
  const[answers,setAnswers]=useState({});
  const[answeredAt,setAnsweredAt]=useState({});
  const[marked,setMarked]=useState({});
  const[seconds,setSeconds]=useState(0);
  const[showBreakdown,setShowBreakdown]=useState(null);

  useEffect(()=>{
    if(phase!=='test')return;
    const t=setInterval(()=>setSeconds(s=>s+1),1000);
    return ()=>clearInterval(t);
  },[phase]);

  if(!questions.length)return <div className="connect-page"><Header/><main className="connect-main">
    <button className="detail-back skill-exit-top" onClick={onExit}>← Back to Skills</button>
    <p className="skill-empty">Not enough content in {skill.title} to build an assessment yet.</p>
  </main></div>;

  const q=questions[idx];
  const selected=answers[idx];
  // During the test, choosing an option only records the answer — no
  // correctness or explanation is revealed until Submit Assessment.
  const choose=(opt)=>{
    setAnswers(a=>({...a,[idx]:opt}));
    setAnsweredAt(t=>({...t,[idx]:seconds}));
  };
  const toggleMark=()=>setMarked(m=>({...m,[idx]:!m[idx]}));

  const answeredCount=questions.filter((_,i)=>answers[i]!==undefined).length;
  const score=questions.reduce((n,qq,i)=>n+(answers[i]===qq.correct?1:0),0);
  const accuracy=Math.round((score/questions.length)*100);

  const submit=()=>setPhase('report');

  if(phase==='report'){
    const tier=accuracy===100?{emoji:'🏆',title:'Mastered!'}:accuracy>=60?{emoji:'💪',title:'Keep Learning!'}:{emoji:'📘',title:'Needs Practice'};
    return <div className="connect-page"><Header/><main className="connect-main">
      <button className="detail-back skill-exit-top" onClick={onExit}>← Back to Skills</button>

      <section className="skill-report-hero">
        <div className="skill-score-ring" style={{'--pct':`${accuracy}%`}}>
          <span>{score}<small>/{questions.length}</small></span>
        </div>
        <h2>{tier.emoji} {tier.title}</h2>
        <p>{accuracy===100?'Perfect score — you\'ve mastered this skill!':accuracy>=60?'Review the concepts and try again for 100%.':'Revisit the Learn tab before your next attempt.'}</p>
        <div className="skill-report-actions">
          <button className="skill-nav-btn" onClick={onExit}>Back to Skills</button>
          <button className={`skill-nav-btn primary ${skill.colour}`} onClick={()=>{setAnswers({});setAnsweredAt({});setMarked({});setSeconds(0);setIdx(0);setShowBreakdown(null);setPhase('test');}}>↻ Retake Assessment</button>
        </div>
      </section>

      <h2 className="section-heading">📊 Assessment Report</h2>
      <div className="skill-report-stats">
        <div><small>TOTAL SCORE</small><strong>{score}<em>/{questions.length}</em></strong></div>
        <div><small>ACCURACY</small><strong className={accuracy>=60?'good':'bad'}>{accuracy}%</strong></div>
        <div><small>TIME TAKEN</small><strong>⏱ {formatClock(seconds)}</strong></div>
      </div>

      <h3 className="skill-breakdown-title">Question Breakdown</h3>
      <div className="skill-breakdown-list">
        {questions.map((qq,i)=>{
          const wasAnswered=answers[i]!==undefined;
          const correct=wasAnswered&&answers[i]===qq.correct;
          const status=!wasAnswered?'skipped':correct?'right':'wrong';
          const statusLabel=status==='skipped'?'⏭ Skipped':status==='right'?'✓ Correct':'✕ Wrong';
          const open=showBreakdown===i;
          return <div className={`skill-breakdown-item ${status} ${open?'open':''}`} key={i}>
            <div className="skill-breakdown-top">
              <span className={`skill-breakdown-num ${status}`}>{i+1}</span>
              <div className="skill-breakdown-qtext">
                <p>{qq.prompt}</p>
              </div>
              <div className="skill-breakdown-status">
                <span className={`skill-breakdown-tag ${status}`}>{statusLabel}</span>
                <small className="skill-breakdown-time">🕒 {answeredAt[i]!==undefined?answeredAt[i]:0}s</small>
              </div>
            </div>
            <div className="skill-breakdown-options">
              {qq.options.map(opt=>{
                let cls='skill-breakdown-opt';
                if(opt===qq.correct)cls+=' correct';
                else if(opt===answers[i])cls+=' incorrect';
                return <span key={opt} className={cls}>{opt}</span>;
              })}
            </div>
            <button className="skill-check-solution" onClick={()=>setShowBreakdown(open?null:i)}>{open?'^ Hide Solution':'v Check Solution'}</button>
            {open&&<div className="skill-solution-box">
              <p className="skill-solution-title">💡 Step-by-Step Logic</p>
              <p>{qq.explanation}</p>
            </div>}
          </div>;
        })}
      </div>

      <div className="skill-report-bottom">
        <button className={`skill-nav-btn primary ${skill.colour}`} onClick={onExit}>Back to Skills</button>
      </div>
    </main></div>
  }

  return <div className="connect-page"><Header/><main className="connect-main">
    <div className={`skill-assess-layout ${skill.colour}`}>
      <div className="skill-assess-card">
        <p className="skill-assess-qnum">QUESTION {idx+1} OF {questions.length}</p>
        <h3 className="skill-question-text">{q.prompt}</h3>
        <div className="skill-options vertical">
          {q.options.map(opt=>
            <button key={opt} className={`skill-option ${selected===opt?'selected':''}`} onClick={()=>choose(opt)}>{opt}</button>)}
        </div>
        <div className="skill-assess-footer">
          <button className="skill-nav-btn" disabled={idx===0} onClick={()=>setIdx(i=>i-1)}>← Previous</button>
          <button className={`skill-nav-btn mark ${marked[idx]?'active':''}`} onClick={toggleMark}>{marked[idx]?'★ Marked':'☆ Mark for Review'}</button>
          <button className={`skill-nav-btn primary ${skill.colour}`} disabled={idx===questions.length-1} onClick={()=>setIdx(i=>i+1)}>Next →</button>
        </div>
      </div>

      <aside className="skill-assess-side">
        <div className="skill-assess-timer">⏱ {formatClock(seconds)}</div>
        <p className="skill-palette-label">Question Palette</p>
        <div className="skill-palette-grid">
          {questions.map((_,i)=>{
            let cls='skill-palette-btn';
            if(marked[i])cls+=' marked';
            else if(answers[i]!==undefined)cls+=' answered';
            if(i===idx)cls+=' current';
            return <button key={i} className={cls} onClick={()=>setIdx(i)}>{i+1}</button>;
          })}
        </div>
        <div className="skill-palette-legend">
          <span><i className="answered"/>Answered</span>
          <span><i className="unanswered"/>Not Answered</span>
          <span><i className="marked"/>Marked for Review</span>
        </div>
        <p className="skill-assess-progress">{answeredCount} of {questions.length} answered</p>
        <button className="skill-submit-btn" onClick={submit}>Submit Assessment</button>
      </aside>
    </div>
  </main></div>
}

// ---- Skills: Hub ----
function SkillsHub({onBack,onGo}){
  const[sub,setSub]=useState('list');
  const[activeId,setActiveId]=useState(null);
  const skill=skillsData.find(s=>s.id===activeId);

  const open=(id,mode)=>{ setActiveId(id); setSub(mode); };
  const exitToList=()=>setSub('list');

  if(skill&&sub==='learn')return <SkillLearn skill={skill} onExit={exitToList}/>;
  if(skill&&sub==='practice')return <SkillPractice skill={skill} onExit={exitToList}/>;
  if(skill&&sub==='assess')return <SkillAssess skill={skill} onExit={exitToList}/>;

  return <div className="connect-page"><Header/><main className="connect-main">
    <DetailNav active="Skills" onBack={onBack} onGo={onGo}/>

    <section className="intro-hero">
      <h1><span className="intro-lead">Core</span> Skills</h1>
      <p>Choose a skill below. Read the lesson, practice to build confidence, and take the assessment to earn your mastery!</p>
    </section>

    <div className="skills-list">
      {skillsData.map(s=>
        <article className={`skill-card ${s.colour}`} key={s.id}>
          <div className="skill-card-icon">{s.icon}</div>
          <div className="skill-card-body">
            <h2>{s.title}</h2>
            <p>{s.blurb}</p>
          </div>
          <div className="skill-card-actions">
            <button className="skill-btn outline" onClick={()=>open(s.id,'learn')}>📘 Learn</button>
            <button className="skill-btn outline" onClick={()=>open(s.id,'practice')}>✏️ Practice</button>
          </div>
          <button className={`skill-assess-btn ${s.colour}`} onClick={()=>open(s.id,'assess')}>🏆 Assess</button>
        </article>)}
    </div>

  </main></div>
}

function App(){
  const[view,setView]=useState(null);
  const goDashboard=()=>setView(null);
  const goTo=(title)=>{
    if(title==='Connectomics')setView('connectomics');
    else if(title==='Introduction')setView('introduction');
    else if(title==='Terminology')setView('terminology');
    else if(title==='Skills')setView('skills');
    else if(title==='Mind Map')setView('mindmap');
    else if(title==='Videos')setView('videos');
    else if(title==='Exam Edge')setView('examedge');
    else if(title==='Derivations & Formulas')setView('derivations');
    else goDashboard();
  };
  if(view==='connectomics')return <Connectomics onBack={goDashboard} onGo={goTo}/>;
  if(view==='introduction')return <Introduction onBack={goDashboard} onGo={goTo}/>;
  if(view==='terminology')return <Terminology onBack={goDashboard} onGo={goTo}/>;
  if(view==='skills')return <SkillsHub onBack={goDashboard} onGo={goTo}/>;
  if(view==='mindmap')return <MindMap onBack={goDashboard} onGo={goTo}/>;
  if(view==='videos')return <Videos onBack={goDashboard} onGo={goTo}/>;
  if(view==='examedge')return <ExamEdge onBack={goDashboard} onGo={goTo}/>;
  if(view==='derivations')return <DerivationsFormulas onBack={goDashboard} onGo={goTo}/>;
  return <div className="chapter-page"><Header/><main id="top" className="chapter-layout"><section className="chapter-hero"><div className="hero-orb orb-one"/><div className="hero-orb orb-two"/><a href="#modules" className="back-link">← Grade 11 Physics</a><div className="hero-copy"><p className="chapter-kicker">CHAPTER FOURTEEN</p><h1>Master<br/><span>Waves</span></h1><p>Discover how disturbances travel through matter and space. From ripples on water to sound and communication, master the physics of waves.</p></div><div className="stats"><div><strong>7</strong><small>CORE TOPICS</small></div><div><strong>20+</strong><small>PRACTICE PROBLEMS</small></div><div><strong>12</strong><small>CHAPTER LINKS</small></div><div><strong>0%</strong><small>MASTERY</small></div></div></section><section id="modules" className="module-list">{modules.map(([eyebrow,title,icon,colour,text])=><article className={`module-card ${colour}`} key={title} onClick={()=>goTo(title)}><div className="module-icon">{icon}</div><div><p>{eyebrow}</p><h2>{title}</h2><span>{text}</span></div><button aria-label={`Open ${title}`}>→</button></article>)}</section></main></div>
};export default App;