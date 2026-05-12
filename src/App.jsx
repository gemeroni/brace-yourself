import { useState, useEffect } from "react";
// DM Sans via Google Fonts
const _font = document.createElement("link");
_font.rel = "stylesheet";
_font.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap";
document.head.appendChild(_font);

const G="#1DB954",GDARK="#0d8a3a",GMID="#14a845";

const eps=[
  {id:1,t:"Unbreak My Patella",g:"Toni Braxton",d:"42:17",p:"2.1M",tag:"S1 E1",hot:true,s:"Toni walks through the emotional stages of patellar dislocation: denial, anger, bargaining, and finally a hinged brace and a referral. Un-brace, un-brace my patella is now the official anthem of every physio waiting room in the southern hemisphere."},
  {id:2,t:"Bad ROM-ance",g:"Lady Gaga",d:"38:44",p:"3.4M",tag:"S1 E2",hot:true,s:"She wants your Range Of Motion. Your full 0-135 degrees of knee flexion. Gaga on the toxic relationship with skipping her warm-up, and why her orthotist is on speed dial. Ra-ra-knee brace, ah-ah ROM-ance."},
  {id:3,t:"You Give Knees a Bad Name",g:"Jon Bon Jovi",d:"51:02",p:"1.8M",tag:"S1 E3",hot:false,s:"Shattered the joint with air to blame. Darling, you give knees a bad name. Jon on four decades of stadium slides on synthetic turf and what bilateral chondromalacia actually feels like at 3am."},
  {id:4,t:"Total Eclipse of the Kneecap",g:"Bonnie Tyler",d:"44:55",p:"967K",tag:"S1 E4",hot:false,s:"Every now and then she gets a little bit of lateral patellar tracking disorder. Every now and then she falls apart. Turn around - her physio's instructions, verbatim."},
  {id:5,t:"Cruciate Me Baby One More Time",g:"Britney Spears",d:"39:18",p:"4.1M",tag:"S2 E1",hot:true,s:"A searingly honest account of a non-contact ACL rupture during a choreographed pivot. My loneliness is killing me, and so is this valgus collapse."},
  {id:6,t:"MCL to Heaven",g:"Jimmy Page (telephonically)",d:"1:02:18",p:"1.2M",tag:"S2 E2",hot:false,s:"All that glitters is a medial collateral ligament, and she is buying a stairway. A winding exploration of Grade II MCL sprains, valgus stress testing, and why the guitar solo is structurally identical to a good rehab protocol."},
  {id:7,t:"Pour Some Synovial on Me",g:"Joe Elliott, Def Leppard",d:"47:33",p:"2.3M",tag:"S2 E3",hot:true,s:"Synovial fluid: the knee's natural lubricant. When it accumulates post-injury, that is an effusion. In the name of love, drain it. Unexpectedly educational on joint aspiration, and somehow remains an absolute banger."},
  {id:8,t:"Knee-d You Tonight",g:"Michael Hutchence (archival)",d:"36:52",p:"1.6M",tag:"S2 E4",hot:false,s:"I knee-d you tonight. My VMO is wasting and my brace has come loose. The most accurate description of quadriceps atrophy ever committed to pop music."},
  {id:9,t:"Don't Go Brace-King My Cartilage",g:"Elton John and Kiki Dee",d:"41:08",p:"1.1M",tag:"S3 E1",hot:false,s:"Articular cartilage has no blood supply and cannot regenerate itself. So don't go brace-king my cartilage, I couldn't if I tried. A devastating clarification of basic joint biology."},
  {id:10,t:"Patella, Don't Preach",g:"Madonna",d:"29:55",p:"892K",tag:"S3 E2",hot:false,s:"Against all clinical advice she is keeping her patellar tendinopathy. Patella, don't preach, I'm in trouble deep. Guest: a very tired orthopaedic surgeon."},
  {id:11,t:"Don't Stop Brace-lievin'",g:"Journey (Steve Perry, spiritually)",d:"47:29",p:"1.6M",tag:"S3 E3",hot:true,s:"She took the midnight train, planted badly, blew her ACL. The long road back: surgery to walking, walking to jogging, jogging to trusting that hinge brace one more time."},
  {id:12,t:"Running Up That Hill (Has Destroyed My Knees)",g:"Kate Bush",d:"53:40",p:"2.7M",tag:"S3 E4",hot:true,s:"It doesn't hurt me. You wanna feel how it feels? Yes, Kate. That is exactly what repetitive hill running does to the anterior knee. Recorded live from a treadmill set to 12% incline."},
  {id:13,t:"Let the Kneecaps Hit the Floor",g:"Drowning Pool",d:"31:14",p:"3.8M",tag:"S4 E1",hot:true,s:"Nothing in this song has been changed except the one word that needed changing, and it needed changing very badly. An episode entirely dedicated to patellar instability, the moment of dislocation, and why 'let the body hit the floor' is actually a clinically accurate description of what happens next. Features a live re-enactment using a skeleton model and poor decision-making."},
  {id:14,t:"Patella",g:"Rihanna",d:"44:02",p:"5.1M",tag:"S4 E2",hot:true,s:"Under my patella, ella, ella, eh, eh. Rihanna's 2007 megahit recontextualised entirely as an ode to the patellar tendon -- that heroic strip of connective tissue sheltering the knee from the full catastrophic consequences of leg day. When the squats fall, when the DOMS falls, you'll be sheltered under my patella, ella, ella. The extended outro is just the word 'ella' repeated until it becomes 'patellar'. This was intentional."},
  {id:15,t:"Solid Patella Salad",g:"The Ross Sisters (archival, very carefully)",d:"38:22",p:"1.9M",tag:"S4 E3",hot:true,s:"The year is 1944. Three sisters are singing about potato salad. Then the skeleton leaves the building entirely. This episode uses the Ross Sisters' legendary performance as the founding document of hypermobility education -- specifically, the moment at 1:47 where a human body does something a human body has no business doing, and everyone in the audience simultaneously files a mental note to ask their GP about Ehlers-Danlos Syndrome. A tender exploration of ligamentous laxity, proprioceptive deficits, and why 'but I've always been flexible' is not a clinical defence. Features an extended discussion on why hypermobile patients are the most likely to be told they are fine, and the least likely to be fine. The potato salad in the title is load-bearing and we will not be elaborating further."},
  {id:43,t:"They Tried to Make Me Go to Rehab",g:"Amy Winehouse (discussed with her family and treating clinician)",d:"51:44",p:"6.2M",tag:"S4 E4",hot:true,s:"She said no, no, no. Her knee said yes, yes, yes. The most clinically significant three-word refusal in pop music history, examined from both sides of the treatment room. This episode explores what happens when a patient has the range, the talent, and the absolute categorical refusal to engage with the rehabilitation process -- and what that costs. Handled with the tenderness and respect the subject deserves. No, no, no is not a clinical discharge plan."},
  {id:16,t:"Moves Like Jagger (Too Many Degrees of Freedom)",g:"Maroon 5",d:"41:55",p:"3.2M",tag:"S5 E1",hot:true,s:"Mick Jagger's stage mobility has been retrospectively assessed by three separate physiotherapists in this episode and the Beighton Score is not good. Or rather, it is very good, which is the problem. An expansive conversation about hypermobility spectrum disorder, the difference between being impressively bendy and being structurally compromised, and why the joints that move the most are often the ones that hurt the most. Adam Levine declined to comment but his guitar solo did most of the talking."},
  {id:17,t:"I Will Always Loose You",g:"Whitney Houston (ligamentous laxity special)",d:"46:18",p:"2.8M",tag:"S5 E2",hot:true,s:"Not a typo. L-O-O-S-E. The ligaments are loose, Whitney knew, and this episode is a full clinical deep-dive into why lax ligaments feel like a betrayal by your own connective tissue. Covers the spectrum from benign joint hypermobility to hEDS, the chronic pain experience, the diagnostic odyssey, and why 'you're just double-jointed' is a phrase that needs to be retired immediately and without ceremony."},
  {id:18,t:"Bendy and I Know It",g:"LMFAO",d:"29:44",p:"4.4M",tag:"S5 E3",hot:true,s:"I work out -- but it makes my joints worse and nobody warned me. LMFAO's 2011 banger repurposed as an anthem for the hypermobile person who has spent forty years being praised for their flexibility and is now having a very difficult conversation with a rheumatologist. When I walk on by, joints pop and they cry. I'm bendy and I know it. Features a frank discussion on why stretching is not always the answer and is sometimes specifically the problem."},
  {id:19,t:"Under Pressure (Which Is All Of It)",g:"Queen and David Bowie",d:"52:07",p:"2.1M",tag:"S5 E4",hot:true,s:"Connective tissue is, structurally speaking, everywhere. It holds everything together. When it does not hold everything together especially well, pressure -- atmospheric, mechanical, emotional, barometric -- becomes a whole-body event. Queen and Bowie somehow wrote the hEDS experience in 1981 without knowing they were doing it. This is the episode about fatigue, systemic impact, the weight of managing a body that is working harder than it looks, and why this song's bassline is the most accurate sonification of chronic pain ever recorded."},
  {id:20,t:"Don't You Want Me (To Have Normal Joint Proprioception)",g:"The Human League",d:"37:33",p:"1.6M",tag:"S5 E5",hot:false,s:"Proprioception -- the body's ability to sense where its joints are in space -- is significantly impaired in hypermobility. Don't you want me, baby? Don't you want me -- to know where my knee is without looking at it? A deceptively catchy episode on neuromuscular retraining, the five years of physiotherapy nobody told you about, and why the Human League's synthesisers sound exactly like a joint that cannot find its neutral position."},
  {id:21,t:"Spandex Ballet",g:"Spandau Ballet",d:"43:11",p:"2.2M",tag:"S6 E1",hot:true,s:"Tooooold you -- compression helps. A love letter to the compression garment: its role in proprioceptive feedback, joint stability, and why the 1983 power-shoulder silhouette was, in retrospect, a structural support solution that fashion accidentally got right. Features a frank assessment of why every hypermobile person owns seven pairs of compression leggings and calls it a personality."},
  {id:22,t:"Tears for Fears",g:"Tears for Fears",d:"38:55",p:"3.1M",tag:"S6 E2",hot:true,s:"This episode required no parody intervention whatsoever because Tears for Fears in 1985 had apparently already documented the chronic pain experience in full. Shout, shout, let it all out -- specifically at the rheumatologist who told you it was growing pains. Everybody wants to rule the world. Nobody wants bilateral knee effusions."},
  {id:23,t:"Femur Femur",g:"Duran Duran",d:"41:07",p:"2.7M",tag:"S6 E3",hot:true,s:"To the tune of Hungry Like the Wolf. Darkroom. Darkness. A cortical fracture in the night. The femur is the longest bone in the body and it is tonight hungry for calcium, for fixation, for someone to finally take the x-ray seriously. Femur femur. An episode on bone density, post-ORIF rehabilitation, and why the 1982 music video holds up better than most discharge summaries."},
  {id:24,t:"Fade to Brace",g:"Visage",d:"36:22",p:"1.4M",tag:"S6 E4",hot:false,s:"Steve Strange understood something the medical establishment is still catching up on: the brace is not the failure. The brace is the look. A meditation on the aesthetics of adaptive equipment, the politics of visibility, and why fading into the background is not an option when your hinged ROM brace keeps setting off the airport scanner. Fade to brace, fade to brace."},
  {id:25,t:"The Lexicon of Ligaments",g:"ABC",d:"49:03",p:"1.8M",tag:"S6 E5",hot:false,s:"Martin Fry put on a gold lame suit and delivered the most emotionally devastating album about romantic disappointment of 1982. This episode contends he was singing about the anterior cruciate ligament the whole time. When you said you'd always hold me, I didn't think you meant my knee joint. A full glossary of connective tissue terminology delivered with full orchestral backing and an inappropriate level of glamour."},
  {id:26,t:"Visions of Chondria",g:"Japan",d:"44:18",p:"1.2M",tag:"S6 E6",hot:false,s:"David Sylvian's glacial, melancholy art-rock as the definitive soundtrack to patellofemoral syndrome. Visions of chondria -- the cartilage is breaking down and it is doing so beautifully, coldly, with excellent cheekbones. An episode on chondromalacia, the creeping erosion of articular cartilage, and why this diagnosis always feels like it should be delivered in a kimono while staring out a rain-streaked window."},
  {id:27,t:"What Is ROM Anyway?",g:"Howard Jones",d:"37:45",p:"986K",tag:"S6 E7",hot:false,s:"Does ROM even matter? Does flexion? Does any of it mean anything without proprioception? Howard Jones asked the big questions in 1984 and nobody gave him a satisfactory answer. This episode asks them again, this time with a goniometer and a clinical outcomes framework. Spoiler: ROM matters enormously. Howard Jones was right to be concerned."},
  {id:28,t:"Tainted Cartilage",g:"Soft Cell",d:"33:59",p:"2.9M",tag:"S6 E8",hot:true,s:"Marc Almond's desolate, magnificent sleaze-synth classic recontextualised entirely as an elegy for articular cartilage that has been through things. Tainted cartilage -- touch me baby, tainted cartilage. An unflinching episode on degenerative joint changes, the irreversibility of certain decisions, and why the New York nightclub scene of 1981 and a Grade III chondral lesion have more in common than you'd think."},
  {id:29,t:"Karma Chameleon Syndrome",g:"Culture Club",d:"46:31",p:"3.3M",tag:"S6 E9",hot:true,s:"Dedicated to the hypermobile patient who presents differently at every single appointment. One day you're walking fine, the next you can't manage the stairs, and the physio is looking at you with that expression. Karma karma karma karma karma chameleon -- you come and go, you come and go. A rigorous episode on the fluctuating, unpredictable, deeply misunderstood symptom pattern of hypermobility spectrum disorder and why 'but you looked fine last Tuesday' is not a clinical assessment."},
  {id:30,t:"White Knee-ing",g:"Billy Idol",d:"40:14",p:"2.4M",tag:"S6 E10",hot:true,s:"In the midnight hour she cried MORE MORE MORE -- range of motion, active control, neuromuscular retraining. Billy Idol's magnificent sneer applied to the rehabilitation process. An episode about the specific fury of being told your recovery will take eighteen months when you were promised six, and why white-knuckling through a rehab protocol with the energy of a man who has gel in his hair and axes to grind is, actually, clinically indicated."},
  {id:31,t:"Don't You (Forget About My Meniscus)",g:"Simple Minds",d:"52:07",p:"4.1M",tag:"S6 E11",hot:true,s:"The meniscus has been overlooked, dismissed, and told it probably just needs rest. This is its Breakfast Club moment. Don't you forget about me. Don't, don't, don't, don't. An episode on meniscal tears, the diagnostic delay, and why the meniscus deserved better from all of us, particularly from that one weekend football incident in 2019."},
  {id:32,t:"And I Ran (And My Patella Did Not Survive It)",g:"A Flock of Seagulls",d:"38:44",p:"1.7M",tag:"S6 E12",hot:true,s:"She ran. She ran so far away. She could not get away -- because her patella had subluxed at the 400m mark and she was now sitting on the track wondering if she'd remembered to renew her health insurance. A triumphant, wind-swept, magnificently hair-based finale on return-to-running protocols, patellar taping, and the importance of not doing too much too soon just because you feel invincible in the right pair of trainers."},
  {id:33,t:"What About Me",g:"Shannon Noll / Moving Pictures",d:"44:18",p:"3.7M",tag:"S7 E1",hot:true,s:"An episode entirely about the physio who has spent forty-five minutes doing manual therapy on a non-compliant patient who also has opinions about everything, while their own rotator cuff quietly lodges a formal grievance. What about me? It isn't fair. I've had my brace on for three years and nobody asked."},
  {id:34,t:"I Can't Make You Love Rehab",g:"Bonnie Raitt",d:"41:02",p:"2.1M",tag:"S7 E2",hot:true,s:"She can't make you do your home exercises. She has tried. She has demonstrated. She has laminated the instruction sheet. She has sent three follow-up messages. The exercises remain undone. A devastating episode on therapeutic non-compliance and the grief of watching a perfectly good rehabilitation plan die of neglect."},
  {id:35,t:"Don't You Know Who I Think I Am",g:"Fall Out Boy",d:"38:55",p:"1.6M",tag:"S7 E3",hot:true,s:"The patient who Googled their diagnosis before the appointment, disagrees with the assessment, has a second opinion from their brother-in-law who did a weekend first aid course, and would like to speak to someone more senior. A frank discussion on clinical boundaries, professional identity under siege, and why the foam roller does not go there."},
  {id:36,t:"Somebody That I Used to Loa... Load",g:"Gotye",d:"46:33",p:"2.8M",tag:"S7 E4",hot:true,s:"You can get addicted to a certain kind of load management. An episode about the patient who was doing so well, followed the protocol beautifully, achieved full return to sport -- and then came back six months later having done absolutely everything they were told not to do. Features extended silence from the clinician while they process this information."},
  {id:37,t:"Comfortably Numb (To Patient Feedback)",g:"Pink Floyd",d:"52:19",p:"3.2M",tag:"S7 E5",hot:true,s:"After enough years in clinical practice, something changes. The complaints about the car park, the opinions about the ultrasound machine, the insistence that the problem is the cold weather -- they wash over you now. Not because you don't care. Because you have developed a protective dissociative response that keeps you functional. Pink Floyd, it turns out, wrote the burnout arc."},
  {id:38,t:"Under My Thumb (On the Treatment Table)",g:"Rolling Stones",d:"39:44",p:"1.4M",tag:"S7 E6",hot:false,s:"Manual therapy. Boundaries. The complex power dynamic of clinical touch. A surprisingly rigorous episode on informed consent, therapeutic alliance, and why Mick Jagger's most problematic song is also an inadvertent masterclass in what NOT to do as a practitioner. With apologies to the Rolling Stones and also to manual therapy as a discipline."},
  {id:39,t:"I Still Haven't Found What I'm Looking For (On This MRI)",g:"U2",d:"49:07",p:"2.3M",tag:"S7 E7",hot:false,s:"The MRI came back. It shows something. Possibly. The radiologist report uses the word 'unremarkable' four times and 'cannot exclude' twice. Bono has been searching and has not found it. The clinician has been searching this scan for twenty minutes and also has not found it. A compassionate episode on diagnostic uncertainty, imaging limitations, and why 'the scan is clear' is not the same as 'nothing is wrong.'"},
  {id:40,t:"Hit Me With Your Best Shot (Please, I Need the CPD Hours)",g:"Pat Benatar",d:"33:28",p:"987K",tag:"S7 E8",hot:false,s:"Continuing Professional Development. The mandatory annual courses. The conference in a regional convention centre with the catering that is somehow always slightly wrong. Pat Benatar's war cry recontextualised as a hymn to the clinician who shows up anyway, takes the notes, does the quiz, and files the certificate. Hit me. I need the points."},
  {id:41,t:"Don't Stand So Close to Me",g:"The Police",d:"37:11",p:"1.8M",tag:"S7 E9",hot:false,s:"Sting wrote this about something else entirely and we will not be elaborating. This episode is about personal space in clinical settings, the patient who arrives fifteen minutes early and stands in the doorway, and the quiet devastation of a room that smells like Deep Heat at 8am on a Monday. A measured conversation on professional boundaries and olfactory trauma."},
  {id:42,t:"Simply the Best (At Ignoring Discharge Criteria)",g:"Tina Turner",d:"44:55",p:"4.2M",tag:"S7 E10",hot:true,s:"You have discharged them. They are better. The goals have been met, the outcomes measured, the discharge summary written. They have booked again. They are back. They feel they are not quite ready. Tina Turner's anthem of excellence repurposed as a meditation on discharge anxiety, patient dependency, and the clinician who must hold the line."},
];



const seasons=[
  {num:1,title:"Acute Onset",       sub:"The Classics Ward"},
  {num:2,title:"Ligament Years",    sub:"Structural Disappointments"},
  {num:3,title:"Recovery Arc",      sub:"The Long Road Back"},
  {num:4,title:"Kneecap Chronicles",sub:"Patellar Instability Sessions"},
  {num:5,title:"The Bendy Edition", sub:"Hypermobility Spectrum"},
  {num:7,title:"Occupational Hazards",sub:"The Clinician Wellness Sessions"},
];

export default function App() {
  const [playing,setPlaying]=useState(null);
  const [hov,setHov]=useState(null);
  const [liked,setLiked]=useState({});
  const [activeSzn,setActiveSzn]=useState(null);
  const [isMobile,setIsMobile]=useState(window.innerWidth<600);
  useEffect(()=>{
    const handle=()=>setIsMobile(window.innerWidth<600);
    window.addEventListener("resize",handle);
    return ()=>window.removeEventListener("resize",handle);
  },[]);
  const cur=eps.find(e=>e.id===playing);
  const visibleEps=activeSzn?eps.filter(e=>e.tag.startsWith("S"+activeSzn)):eps;
  const activeSznData=seasons.find(s=>s.num===activeSzn);

  return (
    <div style={{background:"linear-gradient(180deg,#1a3a1a 0%,#121212 300px)",minHeight:"100vh",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",color:"#fff",overflowX:"hidden"}}>

      <div style={{background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",padding:"12px 28px",gap:"14px",position:"sticky",top:0,zIndex:100,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
        {/* Vertebral column parody logo - three progressively degenerated disc arcs */}
        <svg height="32" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer circle */}
          <circle cx="40" cy="40" r="38" fill={G}/>
          {/* Vertebral body - central block */}
          <rect x="28" y="34" width="24" height="14" rx="3" fill="#000" opacity="0.85"/>
          {/* Top disc - healthy, full height, nicely curved */}
          <path d="M22 32 Q40 24 58 32" stroke="#000" strokeWidth="4.5" strokeLinecap="round" fill="none" opacity="0.85"/>
          {/* Middle disc - slightly narrowed, a little uneven */}
          <path d="M25 42 Q40 38 55 42" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85"/>
          {/* Bottom disc - severely degenerated, nearly flat, osteophyte spike on right */}
          <path d="M27 52 Q40 51 53 52" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.85"/>
          {/* Osteophyte - little bony spur bottom right, the detail that makes it */}
          <path d="M51 51 L56 56" stroke="#000" strokeWidth="2" strokeLinecap="round" opacity="0.85"/>
          <path d="M53 52 L57 53" stroke="#000" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        </svg>
        <span style={{fontSize:"10px",color:"#777",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"monospace"}}>Podcast</span>
        <div style={{marginLeft:"auto",fontSize:"11px",color:"#555",fontStyle:"italic"}}>Recommended by 4 out of 5 physios. The 5th one quit.</div>
      </div>

      <div style={{display:"flex",flexDirection:isMobile?"column":"row",gap:"28px",padding:isMobile?"24px 20px 20px":"36px 28px 28px",alignItems:isMobile?"center":"center",background:"linear-gradient(180deg,#2a5e2a 0%,transparent 100%)"}}>
        <div style={{width:"210px",height:"210px",flexShrink:0,borderRadius:"8px",background:"linear-gradient(135deg,#0a1f0a,#0f2a0f,#1a1a1a)",border:"2px solid "+G,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.9),0 0 40px rgba(29,185,84,0.14)",position:"relative",overflow:"hidden",gap:"4px"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 16px,rgba(29,185,84,0.03) 16px,rgba(29,185,84,0.03) 17px),repeating-linear-gradient(90deg,transparent,transparent 16px,rgba(29,185,84,0.03) 16px,rgba(29,185,84,0.03) 17px)"}}/>
          <div style={{position:"absolute",width:"110px",height:"150px",background:"radial-gradient(ellipse,rgba(29,185,84,0.1) 0%,transparent 70%)",borderRadius:"50%",top:"20px"}}/>
          <div style={{fontSize:"72px",lineHeight:1,filter:"drop-shadow(0 0 16px rgba(29,185,84,0.5))",zIndex:1}}>🦿</div>
          <div style={{fontSize:"16px",fontWeight:"900",color:G,textAlign:"center",textShadow:"0 0 18px rgba(29,185,84,0.5)",zIndex:1,letterSpacing:"-0.5px"}}>BRACE YOURSELF</div>
          <div style={{fontSize:"7px",color:"#4a7a55",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"monospace",zIndex:1}}>A KNEE HEALTH PODCAST</div>
        </div>

        <div style={{flex:1,textAlign:isMobile?"center":"left",minWidth:0}}>
          <div style={{fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:G,fontFamily:"monospace",marginBottom:"8px"}}>Podcast</div>
          <h1 style={{fontSize:isMobile?"clamp(32px,8vw,48px)":"clamp(36px,5vw,72px)",fontWeight:"900",margin:"0 0 12px",lineHeight:0.95,letterSpacing:"-2px",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>Brace Yourself</h1>
          <p style={{color:"#aaa",fontSize:"14px",margin:"0 0 4px",maxWidth:"540px",lineHeight:1.6}}>A talkback podcast where knee health meets the songs that knew too much - conversations with guests, clinicians, and the artists who documented the whole experience, knowingly or not.</p>
          <p style={{color:"#666",fontSize:"12px",margin:"0 0 14px",fontFamily:"monospace",fontStyle:"italic"}}>
            Hosted by <span style={{color:G}}>The Notorious G.A.P.</span> &middot; ORIF Rebel &middot; Health team still in therapy
          </p>
          <div style={{display:"flex",gap:"8px",fontSize:"11px",color:"#555",fontFamily:"monospace",justifyContent:isMobile?"center":"flex-start",flexWrap:"wrap"}}>
            <span style={{color:G,fontWeight:"700"}}>43 episodes</span><span>&middot;</span><span>7 Seasons</span><span>&middot;</span><span>All knees. No exceptions.</span>
          </div>
          <div style={{display:"flex",gap:"12px",marginTop:"22px",justifyContent:isMobile?"center":"flex-start"}}>
            <button onClick={()=>setPlaying(playing?null:1)} style={{background:G,border:"none",borderRadius:"500px",padding:"13px 30px",color:"#000",fontWeight:"800",fontSize:"13px",cursor:"pointer",textTransform:"uppercase",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif",letterSpacing:"1.5px"}}>
              {playing?"Pause":"Play"}
            </button>
            <button style={{background:"transparent",border:"2px solid #444",borderRadius:"500px",padding:"11px 22px",color:"#fff",fontWeight:"600",fontSize:"12px",cursor:"pointer",fontFamily:"'DM Sans','Helvetica Neue',Arial,sans-serif"}}>Follow</button>
          </div>
        </div>
      </div>

      {/* Season Selector */}
      <div style={{padding:isMobile?"16px 16px 0":"24px 28px 0"}}>
        <div style={{fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",color:"#555",fontFamily:"monospace",marginBottom:"14px",paddingTop:"20px",borderTop:"1px solid #222"}}>Seasons</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"10px",marginBottom:"28px"}}>
          {seasons.map(s=>{
            const on=activeSzn===s.num;
            return (
              <button key={s.num} onClick={()=>setActiveSzn(on?null:s.num)}
                style={{background:on?G:"transparent",border:"1.5px solid "+(on?G:"#333"),borderRadius:"8px",padding:"12px 18px",cursor:"pointer",textAlign:"left",transition:"all 0.15s",minWidth:"150px",flex:"1 1 150px",maxWidth:"230px"}}>
                <div style={{fontSize:"9px",letterSpacing:"3px",textTransform:"uppercase",color:on?"rgba(0,0,0,0.55)":"#555",fontFamily:"monospace",marginBottom:"4px"}}>Season {s.num}</div>
                <div style={{fontSize:"14px",fontWeight:"800",color:on?"#000":"#fff",letterSpacing:"-0.3px",lineHeight:1.1}}>{s.title}</div>
                <div style={{fontSize:"11px",color:on?"rgba(0,0,0,0.45)":"#555",marginTop:"3px"}}>{s.sub}</div>
              </button>
            );
          })}
        </div>
        {activeSznData&&(
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"4px"}}>
            <div style={{height:"1px",background:"linear-gradient(90deg,"+G+",transparent)",flex:1}}/>
            <div style={{fontSize:"11px",fontWeight:"700",color:G,letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace",whiteSpace:"nowrap"}}>
              S{activeSznData.num} &middot; {activeSznData.title} &middot; {activeSznData.sub}
            </div>
            <div style={{height:"1px",background:"linear-gradient(90deg,transparent,"+G+")",flex:1}}/>
          </div>
        )}
      </div>

      <div style={{display:"flex",padding:"8px 42px 8px",fontSize:"10px",color:"#444",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"monospace",borderBottom:"1px solid #222",gap:"16px"}}>
        <span style={{width:"28px"}}>#</span><span style={{flex:1}}>Episode</span>
        <span style={{width:"52px",textAlign:"right"}}>Plays</span>
        <span style={{width:"44px",textAlign:"right"}}>Time</span>
        <span style={{width:"28px"}}/>
      </div>

      <div style={{padding:"8px 14px",paddingBottom:playing?"88px":"48px"}}>
        {visibleEps.map((ep,i)=>(
          <div key={ep.id} onMouseEnter={()=>setHov(ep.id)} onMouseLeave={()=>setHov(null)}
            onClick={()=>setPlaying(playing===ep.id?null:ep.id)}
            style={{display:"flex",gap:"14px",padding:"13px 14px",borderRadius:"6px",
              background:playing===ep.id?"rgba(29,185,84,0.08)":hov===ep.id?"rgba(255,255,255,0.05)":"transparent",
              cursor:"pointer",transition:"background 0.15s",
              borderLeft:playing===ep.id?"3px solid "+G:"3px solid transparent",alignItems:"flex-start"}}>
            <div style={{width:"26px",flexShrink:0,paddingTop:"2px",textAlign:"center",color:playing===ep.id?G:"#555",fontSize:"12px",fontFamily:"monospace"}}>
              {playing===ep.id?"\u25B6":i+1}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px",flexWrap:"wrap"}}>
                <span style={{fontSize:"15px",fontWeight:"700",color:playing===ep.id?G:"#fff"}}>{ep.t}</span>
                {ep.hot&&<span style={{fontSize:"8px",background:G,color:"#000",borderRadius:"3px",padding:"2px 5px",fontWeight:"900",fontFamily:"monospace"}}>HOT</span>}
              </div>
              <div style={{fontSize:"11px",color:"#555",marginBottom:"6px",fontFamily:"monospace"}}>{ep.tag} &middot; <span style={{color:"#888"}}>feat. {ep.g}</span></div>
              <div style={{fontSize:"13px",color:"#999",lineHeight:1.5,maxWidth:"660px"}}>{ep.s}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"8px",flexShrink:0}}>
              <span style={{fontSize:"11px",color:"#444",fontFamily:"monospace"}}>{ep.p}</span>
              <span style={{fontSize:"11px",color:"#444",fontFamily:"monospace"}}>{ep.d}</span>
              <span onClick={e=>{e.stopPropagation();setLiked(l=>({...l,[ep.id]:!l[ep.id]}));}}
                style={{color:liked[ep.id]?G:"#333",cursor:"pointer",fontSize:"16px"}}>
                {liked[ep.id]?"\u2665":"\u2661"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {playing&&cur&&(
        <div style={{position:"fixed",bottom:0,left:0,right:0,background:"linear-gradient(90deg,#162e16,#1c1c1c 60%)",borderTop:"2px solid "+G,padding:"11px 28px",display:"flex",alignItems:"center",gap:"18px",zIndex:200,boxShadow:"0 -6px 28px rgba(0,0,0,0.7)"}}>
          <span style={{fontSize:"26px"}}>🦿</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:"13px",fontWeight:"700",color:G,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{cur.t}</div>
            <div style={{fontSize:"10px",color:"#555",fontFamily:"monospace"}}>feat. {cur.g}</div>
          </div>
          <div style={{display:"flex",gap:"14px",alignItems:"center"}}>
            <span onClick={()=>setPlaying(p=>Math.max(1,p-1))} style={{color:"#777",cursor:"pointer",fontSize:"20px"}}>&#9664;&#9664;</span>
            <span onClick={()=>setPlaying(null)} style={{background:G,borderRadius:"50%",width:"34px",height:"34px",color:"#000",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px"}}>&#9646;&#9646;</span>
            <span onClick={()=>setPlaying(p=>Math.min(43,p+1))} style={{color:"#777",cursor:"pointer",fontSize:"20px"}}>&#9654;&#9654;</span>
          </div>
          <div style={{fontSize:"10px",color:"#3a3a3a",fontStyle:"italic",textAlign:"right",lineHeight:1.4,maxWidth:"160px"}}>Produced to assist with clinical desensitisation therapy.</div>
        </div>
      )}
    </div>
  );
}