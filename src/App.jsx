import React, { useState, useMemo, useRef, useEffect } from "react";
import { LESSONS, LOCKED } from "./content/index.js";

const h = React.createElement;


/* ---------- utilities ---------- */
function shuffle(a){ var b=a.slice(); for(var i=b.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=b[i]; b[i]=b[j]; b[j]=t; } return b; }
function pct(x){ return Math.round(x*100); }
function rich(s){
  var parts=String(s).split(/(\*\*[^*]+\*\*|`[^`]+`)/);
  return parts.map(function(p,i){
    if(p.indexOf("**")===0) return h("strong",{key:i},p.slice(2,-2));
    if(p.charAt(0)==="`") return h("code",{key:i},p.slice(1,-1));
    return p;
  });
}
var KEY="cyber-trainer-v1";
var API="/api/progress";
function emptyProg(){ return {ans:{},match:{},open:{}}; }
function norm(o){ o=o||{}; return {ans:o.ans||{},match:o.match||{},open:o.open||{}}; }
function hasData(p){ return Object.keys(p.ans).length+Object.keys(p.match).length+Object.keys(p.open).length>0; }
function loadLocal(){ try{ var r=localStorage.getItem(KEY); if(r) return norm(JSON.parse(r)); }catch(e){} return null; }
function saveLocal(p){ try{ localStorage.setItem(KEY,JSON.stringify(p)); }catch(e){} }
function pushServer(p){
  return fetch(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)})
    .then(function(r){ if(!r.ok) throw new Error("save failed"); return r.json(); });
}
function fmtTime(iso){ try{ return new Date(iso).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}); }catch(e){ return ""; } }

function lessonStats(L,prog){
  var total=L.qs.length;
  var right=L.qs.filter(function(q){return prog.ans[q.id]&&prog.ans[q.id].last;}).length;
  var seen=L.qs.filter(function(q){return prog.ans[q.id];}).length;
  var missed=L.qs.filter(function(q){return prog.ans[q.id]&&!prog.ans[q.id].last;});
  var ord=L.order||[];
  var mTotal=L.match.length+ord.length;
  var mDone=L.match.filter(function(m,i){return prog.match[L.id+"m"+i];}).length+ord.filter(function(m,i){return prog.match[L.id+"o"+i];}).length;
  var eGot=L.open.filter(function(e,i){return prog.open[L.id+"e"+i]==="got";}).length;
  var mcq=total?right/total:0, mt=mTotal?mDone/mTotal:0, et=L.open.length?eGot/L.open.length:0;
  return {total:total,right:right,seen:seen,missed:missed,mDone:mDone,mTotal:mTotal,eGot:eGot,mcq:mcq,mt:mt,et:et,
    mastery:0.6*mcq+0.2*mt+0.2*et, ready: mcq>=0.85 && mDone===mTotal && et>=0.8};
}

/* ---------- components ---------- */
function Bar(props){ return h("div",{className:"bar"+(props.good?" good":""),role:"progressbar","aria-valuenow":pct(props.v),"aria-valuemin":0,"aria-valuemax":100},h("i",{style:{width:pct(props.v)+"%"}})); }

function Sidebar(props){
  var prog=props.prog, view=props.view;
  return h("aside",{className:"side","aria-label":"Course days"},
    h("button",{className:"brand",onClick:function(){props.go({page:"home"});}},h("b",null,"Cyber Trainer"),h("span",null,"Software engineering elective")),
    h("nav",{className:"days"},
      LESSONS.map(function(L){
        var s=lessonStats(L,prog);
        var cur=(view.page==="lesson"&&view.id===L.id);
        return h("button",{key:L.id,className:"day","aria-current":cur?"true":"false",onClick:function(){props.go({page:"lesson",id:L.id,tab:"learn"});}},
          h("span",{className:"dn"},"DAY "+("0"+L.day).slice(-2)),
          h("span",{className:"dt"},L.short),
          h("span",{className:"ds"},h("span",{className:"mini"},h("i",{style:{width:pct(s.mastery)+"%"}})),s.ready?h("span",{className:"tag ok"},"Ready"):pct(s.mastery)+"%"));
      }),
      LOCKED.map(function(d){
        return h("button",{key:"l"+d,className:"day",disabled:true,"aria-label":"Day "+d+" locked"},
          h("span",{className:"dn"},"DAY "+("0"+d).slice(-2)),
          h("span",{className:"dt"},"Locked"),
          h("span",{className:"ds"},"Not unlocked yet"));
      })),
    h(SaveBar,{st:props.st,mode:props.mode,onSave:props.onSave}));
}

function SaveBar(props){
  var st=props.st, mode=props.mode;
  var tone="ok", label;
  if(mode==="browser"){ tone="warn"; label="Saved in this browser only. Run npm run dev to save to a file."; }
  else if(st.state==="saving"){ tone="warn"; label="Saving…"; }
  else if(st.state==="unsaved"){ tone="warn"; label="Unsaved changes"; }
  else if(st.state==="error"){ tone="bad"; label="Could not save to data/progress.json. Press Save now to retry."; }
  else if(st.at){ label="Saved to data/progress.json at "+fmtTime(st.at); }
  else label="Nothing saved yet";
  return h("div",{className:"savebar",role:"status","aria-live":"polite"},
    h("span",{className:"dot "+tone,"aria-hidden":"true"}),
    h("span",{className:"savetext"},label),
    h("button",{className:"savebtn",onClick:props.onSave},"Save now"));
}

function Home(props){
  var prog=props.prog;
  var stats=LESSONS.map(function(L){return lessonStats(L,prog);});
  var avg=stats.reduce(function(a,s){return a+s.mastery;},0)/stats.length;
  var readyN=stats.filter(function(s){return s.ready;}).length;
  var totalQ=LESSONS.reduce(function(a,L){return a+L.qs.length;},0);
  var seenQ=stats.reduce(function(a,s){return a+s.seen;},0);
  /* cracks: topics with currently missed questions */
  var topics={};
  LESSONS.forEach(function(L){ L.qs.forEach(function(q){ var a=prog.ans[q.id]; if(a&&!a.last){ var k=L.id+"|"+q.t; if(!topics[k]) topics[k]={t:q.t,lesson:L,qs:[]}; topics[k].qs.push(q);} }); });
  var cracks=Object.keys(topics).map(function(k){return topics[k];}).sort(function(a,b){return b.qs.length-a.qs.length;});
  function mixed(){
    var all=[]; LESSONS.forEach(function(L){ all=all.concat(L.qs); });
    var miss=shuffle(all.filter(function(q){return prog.ans[q.id]&&!prog.ans[q.id].last;}));
    var fresh=shuffle(all.filter(function(q){return !prog.ans[q.id];}));
    var rest=shuffle(all.filter(function(q){return prog.ans[q.id]&&prog.ans[q.id].last;}));
    var pick=miss.concat(fresh).concat(rest).slice(0,15);
    props.go({page:"quiz",title:"Mixed review",qs:pick,key:Date.now(),back:{page:"home"}});
  }
  return h("main",null,
    h("div",{className:"panel",style:{display:"flex",flexDirection:"column",gap:"14px"}},
      h("span",{className:"kicker"},"Diploma in Software Engineering · Cybersecurity elective"),
      h("h1",null,"Find the cracks before the interview does."),
      h("p",{className:"lede"},"Days 1 to "+LESSONS.length+" are unlocked. Each lesson has theory with interview-ready answers, a scored drill, matching exercises and open questions you answer from memory. A lesson counts as ready at 85% on the drill, every matching and ordering set done, and 80% of the open questions marked as nailed."),
      h("div",{className:"row"},
        h("button",{className:"btn pri",onClick:mixed},"Mixed review (15 questions)"),
        h("span",{className:"pill"},seenQ+" of "+totalQ+" questions attempted"),
        h("span",{className:"pill "+(readyN===LESSONS.length?"good":"")},readyN+" of "+LESSONS.length+" lessons ready")),
      h("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},
        h("div",{className:"qhead"},h("span",null,"Overall mastery"),h("span",null,pct(avg)+"%")),
        h(Bar,{v:avg,good:readyN===LESSONS.length}))),
    h("div",{className:"grid2"},
      LESSONS.map(function(L,i){
        var s=stats[i];
        return h("button",{key:L.id,className:"card",onClick:function(){props.go({page:"lesson",id:L.id,tab:"learn"});}},
          h("div",{className:"meta"},h("span",null,"DAY "+("0"+L.day).slice(-2)),s.ready?h("span",{className:"tag ok"},"Ready"):h("span",null,pct(s.mastery)+"%")),
          h("h3",null,L.title),
          h(Bar,{v:s.mastery,good:s.ready}),
          h("div",{className:"stat3"},
            h("div",null,h("span",null,"Drill"),h("b",{style:{color:"var(--ink)",fontSize:"15px"}},s.right+"/"+s.total)),
            h("div",null,h("span",null,"Matching"),h("b",{style:{color:"var(--ink)",fontSize:"15px"}},s.mDone+"/"+s.mTotal)),
            h("div",null,h("span",null,"Explain"),h("b",{style:{color:"var(--ink)",fontSize:"15px"}},s.eGot+"/"+L.open.length))));
      })),
    h("div",{className:"panel",style:{display:"flex",flexDirection:"column",gap:"6px"}},
      h("h2",null,"Cracks in your knowledge"),
      cracks.length===0
        ? h("p",{className:"lede"},seenQ===0?"Nothing yet. Answer some drill questions and the topics you miss will show up here.":"No missed questions at the moment. Run a mixed review to keep it that way.")
        : h("div",null,cracks.slice(0,8).map(function(c,i){
            return h("div",{key:i,className:"crack"},
              h("div",null,h("b",null,c.t),h("div",{className:"kicker"},"Day "+c.lesson.day+" · "+c.qs.length+" missed")),
              h("button",{className:"btn sm",onClick:function(){props.go({page:"quiz",title:c.t+" (missed)",qs:c.qs,key:Date.now(),back:{page:"home"}});}},"Drill these"));
          }))),
    h("div",{className:"foot"},
      h("span",null,"Day "+LOCKED[0]+" onwards is not in the app yet. Add each new lesson as a content file (see the README)."),
      h(Reset,{onReset:props.onReset})));
}

function Reset(props){
  var s=useState(false), ask=s[0], setAsk=s[1];
  if(!ask) return h("button",{className:"btn sm",onClick:function(){setAsk(true);}},"Reset progress");
  return h("span",{className:"row"},"This clears all your scores.",
    h("button",{className:"btn sm",onClick:function(){props.onReset(); setAsk(false);}},"Yes, reset"),
    h("button",{className:"btn sm",onClick:function(){setAsk(false);}},"Cancel"));
}

function Learn(props){
  var L=props.L;
  return h("div",{style:{display:"flex",flexDirection:"column",gap:"26px"}},
    L.theory.map(function(sec,i){
      return h("section",{key:i,className:"sec"},
        h("h2",null,sec.h),
        sec.p&&sec.p.map(function(t,j){return h("p",{key:"p"+j},rich(t));}),
        sec.bullets&&h("ul",null,sec.bullets.map(function(b,j){return h("li",{key:j},rich(b));})),
        sec.code&&h("pre",{className:"codeblock",tabIndex:0},h("code",null,sec.code)),
        sec.beyond&&h("div",{className:"beyond"},h("span",{className:"kicker"},"Beyond the course"),h("p",null,rich(sec.beyond))),
        sec.say&&h("div",{className:"say"},h("span",{className:"kicker"},"Say it in an interview"),h("p",null,rich(sec.say))));
    }),
    h("div",{className:"row"},h("button",{className:"btn pri",onClick:function(){props.setTab("drill");}},"Test yourself on this lesson")));
}

function Quiz(props){
  var qs=props.qs;
  var deckState=useState(function(){ return shuffle(qs).map(function(q){ return {q:q,opts:shuffle([{t:q.c,ok:true}].concat(q.w.map(function(t){return {t:t,ok:false};})))}; }); });
  var deck=deckState[0];
  var iS=useState(0), i=iS[0], setI=iS[1];
  var pS=useState(null), pick=pS[0], setPick=pS[1];
  var lS=useState([]), log=lS[0], setLog=lS[1];
  var done=i>=deck.length;
  if(done){
    var right=log.filter(function(x){return x.ok;}).length;
    var frac=deck.length?right/deck.length:0;
    var missed=log.filter(function(x){return !x.ok;});
    var verdict=frac>=0.9?"Solid. You know this one.":frac>=0.7?"Close. Patch the gaps below, then run it again.":"Not there yet. Re-read the Learn tab for the topics below, then retry.";
    var byTopic={}; log.forEach(function(x){ var t=x.q.t; if(!byTopic[t]) byTopic[t]={r:0,n:0}; byTopic[t].n++; if(x.ok) byTopic[t].r++; });
    return h("div",{style:{display:"flex",flexDirection:"column",gap:"18px"}},
      h("span",{className:"kicker"},props.title+" · result"),
      h("div",{className:"score"},right+"/"+deck.length),
      h("p",{className:"lede"},pct(frac)+"%. "+verdict),
      h("div",{className:"list"},Object.keys(byTopic).map(function(t){
        var b=byTopic[t]; return h("div",{key:t,style:{display:"grid",gridTemplateColumns:"minmax(0,1fr) 90px",gap:"10px",alignItems:"center"}},
          h("span",null,t),h("span",{style:{display:"flex",gap:"8px",alignItems:"center"}},h("span",{style:{flex:1}},h(Bar,{v:b.r/b.n,good:b.r===b.n})),h("span",{className:"kicker"},b.r+"/"+b.n)));
      })),
      missed.length>0&&h("div",{className:"list"},
        h("h3",null,"What you missed"),
        missed.map(function(x,k){
          return h("div",{key:k,className:"miss"},
            h("span",{className:"kicker"},x.q.t),
            h("b",null,rich(x.q.q)),
            h("p",{className:"y"},"You chose: ",rich(x.picked)),
            h("p",{className:"c"},"Correct: ",rich(x.q.c)),
            h("p",null,rich(x.q.why)));
        })),
      h("div",{className:"row"},
        missed.length>0&&h("button",{className:"btn pri",onClick:function(){props.onRetry(missed.map(function(x){return x.q;}));}},"Retry the "+missed.length+" missed"),
        h("button",{className:"btn",onClick:props.onExit},"Back")));
  }
  var cur=deck[i];
  var letters=["A","B","C","D","E"];
  function choose(o){
    if(pick!==null) return;
    setPick(o);
    props.onRecord(cur.q.id,o.ok);
    setLog(log.concat([{q:cur.q,ok:o.ok,picked:o.t}]));
  }
  return h("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},
    h("div",{className:"qhead"},h("span",null,props.title+" · "+(i+1)+" of "+deck.length),h("span",null,cur.q.t)),
    h(Bar,{v:i/deck.length}),
    h("div",{className:"q"},rich(cur.q.q)),
    h("div",{className:"opts"},cur.opts.map(function(o,k){
      var cls="opt";
      if(pick!==null){ if(o.ok) cls+=" right"; else if(o===pick) cls+=" wrong"; else cls+=" dim"; }
      return h("button",{key:k,className:cls,disabled:pick!==null,onClick:function(){choose(o);}},h("span",{className:"l"},letters[k]),h("span",null,rich(o.t)));
    })),
    pick!==null&&h("div",{className:"fb "+(pick.ok?"good":"bad"),role:"status"},h("b",null,pick.ok?"Correct":"Not quite"),h("p",null,rich(cur.q.why))),
    pick!==null&&h("div",{className:"row"},h("button",{className:"btn pri",onClick:function(){setI(i+1);setPick(null);}},i+1>=deck.length?"See result":"Next question")),
    h("div",null,h("button",{className:"btn sm",onClick:props.onExit},"Quit drill")));
}

function DrillTab(props){
  var L=props.L, prog=props.prog, s=lessonStats(L,prog);
  return h("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},
    h("h2",null,"Lesson drill"),
    h("p",{className:"lede"},L.qs.length+" questions in random order, with the answer and reason after each one. Your score for a question is whatever you got the last time you answered it, so a missed question stays a crack until you fix it."),
    h("div",{className:"stat3"},
      h("div",null,h("span",null,"Currently right"),h("b",{style:{color:"var(--ink)",fontSize:"20px"}},s.right+"/"+s.total)),
      h("div",null,h("span",null,"Attempted"),h("b",{style:{color:"var(--ink)",fontSize:"20px"}},s.seen+"/"+s.total)),
      h("div",null,h("span",null,"Missed now"),h("b",{style:{color:s.missed.length?"var(--bad)":"var(--ink)",fontSize:"20px"}},String(s.missed.length)))),
    h(Bar,{v:s.mcq,good:s.mcq>=0.85}),
    h("div",{className:"row"},
      h("button",{className:"btn pri",onClick:function(){props.start("Day "+L.day+" drill",L.qs);}},"Start full drill"),
      s.missed.length>0&&h("button",{className:"btn",onClick:function(){props.start("Day "+L.day+" missed",s.missed);}},"Drill the "+s.missed.length+" missed")));
}

function MatchSet(props){
  var set=props.set;
  var options=useMemo(function(){ var u=[]; set.pairs.forEach(function(p){ if(u.indexOf(p[1])<0) u.push(p[1]); }); return shuffle(u); },[]);
  var sS=useState({}), sel=sS[0], setSel=sS[1];
  var cS=useState(false), checked=cS[0], setChecked=cS[1];
  var allChosen=set.pairs.every(function(p,i){return sel[i];});
  var correct=set.pairs.filter(function(p,i){return sel[i]===p[1];}).length;
  function check(){ setChecked(true); if(correct===set.pairs.length) props.onDone(); }
  return h("div",{className:"panel",style:{display:"flex",flexDirection:"column",gap:"8px"}},
    h("div",{className:"row",style:{justifyContent:"space-between"}},h("h3",null,set.title),props.done&&h("span",{className:"pill good"},"Completed")),
    h("p",{className:"lede"},set.intro),
    h("div",null,set.pairs.map(function(p,i){
      var st=checked?(sel[i]===p[1]?"right":"wrong"):"";
      return h("div",{key:i,className:"mrow"},
        h("span",{className:"term"},p[0]),
        h("select",{id:"m-"+props.uid+"-"+i,"aria-label":p[0],className:st,value:sel[i]||"",onChange:function(e){var v=e.target.value; var n={}; for(var k in sel) n[k]=sel[k]; n[i]=v; setSel(n); setChecked(false);}},
          h("option",{value:""},"Choose…"),
          options.map(function(o,k){return h("option",{key:k,value:o},o);})),
        checked&&sel[i]!==p[1]&&h("span",{className:"ans"},"Correct answer: "+p[1]));
    })),
    h("div",{className:"row"},
      h("button",{className:"btn pri",disabled:!allChosen,onClick:check},"Check answers"),
      checked&&h("span",{className:"pill "+(correct===set.pairs.length?"good":"bad")},correct+" of "+set.pairs.length+" correct"),
      checked&&correct<set.pairs.length&&h("button",{className:"btn",onClick:function(){setSel({});setChecked(false);}},"Clear and retry")));
}

function OrderSet(props){
  var set=props.set;
  var init=useMemo(function(){ var a; var n=0; do{ a=shuffle(set.items); n++; }while(set.items.length>1&&a.join("|")===set.items.join("|")&&n<20); return a; },[]);
  var oS=useState(init), order=oS[0], setOrder=oS[1];
  var cS=useState(false), checked=cS[0], setChecked=cS[1];
  function move(i,d){ var j=i+d; if(j<0||j>=order.length) return; var a=order.slice(); var t=a[i]; a[i]=a[j]; a[j]=t; setOrder(a); setChecked(false); }
  var correct=order.filter(function(x,i){return x===set.items[i];}).length;
  function check(){ setChecked(true); if(correct===set.items.length) props.onDone(); }
  return h("div",{className:"panel",style:{display:"flex",flexDirection:"column",gap:"10px"}},
    h("div",{className:"row",style:{justifyContent:"space-between"}},h("h3",null,set.title),props.done&&h("span",{className:"pill good"},"Completed")),
    h("p",{className:"lede"},set.intro),
    h("ol",{className:"ord"},order.map(function(x,i){
      var st=checked?(x===set.items[i]?"right":"wrong"):"";
      return h("li",{key:x,className:"ordrow "+st},
        h("span",{className:"ordn"},String(i+1)),
        h("span",{className:"ordt"},rich(x)),
        h("span",{className:"ordb"},
          h("button",{className:"btn sm","aria-label":"Move up: "+x,disabled:i===0,onClick:function(){move(i,-1);}},"Up"),
          h("button",{className:"btn sm","aria-label":"Move down: "+x,disabled:i===order.length-1,onClick:function(){move(i,1);}},"Down")));
    })),
    h("div",{className:"row"},
      h("button",{className:"btn pri",onClick:check},"Check order"),
      checked&&h("span",{className:"pill "+(correct===set.items.length?"good":"bad")},correct+" of "+set.items.length+" in the right place"),
      checked&&correct<set.items.length&&h("button",{className:"btn",onClick:function(){setOrder(shuffle(set.items));setChecked(false);}},"Shuffle and retry")),
    checked&&correct<set.items.length&&h("p",{className:"kicker"},"Keep reordering. The answer stays hidden until you get it right."));
}

function MatchTab(props){
  var L=props.L, prog=props.prog;
  var ord=L.order||[];
  return h("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},
    h("h2",null,"Matching and ordering"),
    h("p",{className:"lede"},"These mirror the 'mix and match' and 'reorder the flow' exercises in the course. Get a set fully right to mark it done."),
    L.match.map(function(m,i){
      var id=L.id+"m"+i;
      return h(MatchSet,{key:id,uid:id,set:m,done:!!prog.match[id],onDone:function(){props.onMatch(id);}});
    }),
    ord.map(function(o,i){
      var id=L.id+"o"+i;
      return h(OrderSet,{key:id,set:o,done:!!prog.match[id],onDone:function(){props.onMatch(id);}});
    }));
}

function ExplainCard(props){
  var e=props.e, id=props.id, status=props.status;
  var tS=useState(""), txt=tS[0], setTxt=tS[1];
  var rS=useState(false), shown=rS[0], setShown=rS[1];
  return h("div",{className:"panel",style:{display:"flex",flexDirection:"column",gap:"12px"}},
    h("div",{className:"row",style:{justifyContent:"space-between"}},
      h("span",{className:"kicker"},"Question "+(props.n+1)),
      status==="got"&&h("span",{className:"pill good"},"Nailed"),
      status==="miss"&&h("span",{className:"pill bad"},"Needs work")),
    h("h3",null,e.q),
    h("label",{htmlFor:"t-"+id,className:"kicker"},"Your answer, from memory"),
    h("textarea",{id:"t-"+id,value:txt,placeholder:"Write or say it first. Then reveal the model answer and compare.",onChange:function(ev){setTxt(ev.target.value);}}),
    !shown&&h("div",null,h("button",{className:"btn",onClick:function(){setShown(true);}},"Reveal model answer")),
    shown&&h("div",{className:"model"},
      h("span",{className:"kicker"},"Model answer"),
      h("ul",null,e.model.map(function(m,i){return h("li",{key:i},rich(m));})),
      e.tip&&h("p",{className:"kicker"},e.tip)),
    shown&&h("div",{className:"row"},
      h("span",null,"How did yours compare?"),
      h("button",{className:"btn sm",onClick:function(){props.onMark("got");}},"I nailed it"),
      h("button",{className:"btn sm",onClick:function(){props.onMark("miss");}},"I missed parts")));
}

function ExplainTab(props){
  var L=props.L, prog=props.prog;
  return h("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},
    h("h2",null,"Explain it yourself"),
    h("p",{className:"lede"},"Interviews and the course's written exercises ask you to explain, not pick from options. Answer each one in your own words before you reveal the model answer, then mark it honestly."),
    L.open.map(function(e,i){
      var id=L.id+"e"+i;
      return h(ExplainCard,{key:id,id:id,n:i,e:e,status:prog.open[id],onMark:function(v){props.onOpen(id,v);}});
    }));
}

function LessonPage(props){
  var L=props.L, prog=props.prog, tab=props.tab;
  var s=lessonStats(L,prog);
  var tabs=[["learn","Learn"],["drill","Drill"],["match","Match & order"],["explain","Explain it"]];
  function setTab(t){ props.go({page:"lesson",id:L.id,tab:t}); }
  return h("main",null,
    h("div",{className:"panel",style:{display:"flex",flexDirection:"column",gap:"14px"}},
      h("div",{className:"row",style:{justifyContent:"space-between"}},
        h("span",{className:"kicker"},"Day "+L.day+" · Lesson "+L.id),
        s.ready?h("span",{className:"tag ok"},"Ready to move on"):h("span",{className:"pill"},pct(s.mastery)+"% mastery")),
      h("h1",null,L.title),
      h("p",{className:"lede"},L.outcome),
      h("div",{className:"tabs",role:"tablist"},tabs.map(function(t){
        return h("button",{key:t[0],role:"tab","aria-selected":tab===t[0]?"true":"false",className:"tab",onClick:function(){setTab(t[0]);}},t[1]);
      }))),
    h("div",{className:"panel"},
      tab==="learn"&&h(Learn,{L:L,setTab:setTab}),
      tab==="drill"&&h(DrillTab,{L:L,prog:prog,start:props.startQuiz}),
      tab==="match"&&h(MatchTab,{L:L,prog:prog,onMatch:props.onMatch}),
      tab==="explain"&&h(ExplainTab,{L:L,prog:prog,onOpen:props.onOpen})),
    h("div",{className:"panel",style:{display:"flex",flexDirection:"column",gap:"8px"}},
      h("div",{className:"qhead"},h("span",null,"Readiness for this lesson"),h("span",null,s.ready?"Ready":"Keep going")),
      h("div",{className:"stat3"},
        h("div",null,h("span",null,"Drill 85%+"),h(Bar,{v:s.mcq,good:s.mcq>=0.85})),
        h("div",null,h("span",null,"All match & order"),h(Bar,{v:s.mt,good:s.mt===1})),
        h("div",null,h("span",null,"Explain 80%+"),h(Bar,{v:s.et,good:s.et>=0.8})))));
}

function App(){
  var pS=useState(emptyProg), prog=pS[0], setProg=pS[1];
  var rS=useState(false), ready=rS[0], setReady=rS[1];
  var mS=useState("checking"), mode=mS[0], setMode=mS[1];
  var sS=useState({state:"idle",at:null}), st=sS[0], setSt=sS[1];
  var vS=useState({page:"home"}), view=vS[0], setView=vS[1];
  var latest=useRef(prog), dirty=useRef(false), timer=useRef(null), modeRef=useRef("checking");

  function flush(){
    if(modeRef.current!=="file"||!dirty.current) return Promise.resolve();
    clearTimeout(timer.current);
    setSt({state:"saving",at:null});
    var snap=latest.current; dirty.current=false;
    return pushServer(snap).then(function(j){
      setSt(dirty.current?{state:"unsaved",at:null}:{state:"saved",at:j.updatedAt});
    }).catch(function(){ dirty.current=true; setSt({state:"error",at:null}); });
  }
  function markDirty(){
    dirty.current=true;
    if(modeRef.current==="file"){
      setSt({state:"unsaved",at:null});
      clearTimeout(timer.current);
      timer.current=setTimeout(flush,700);
    }
  }
  function update(fn){
    var n=fn(JSON.parse(JSON.stringify(latest.current)));
    latest.current=n; setProg(n); saveLocal(n); markDirty();
  }
  function onSave(){
    saveLocal(latest.current);
    if(modeRef.current==="file"){ dirty.current=true; flush(); }
  }

  /* On start: load saved progress from data/progress.json */
  useEffect(function(){
    var cancelled=false;
    fetch(API,{cache:"no-store"}).then(function(r){ if(!r.ok) throw new Error("no api"); return r.json(); })
    .then(function(j){
      if(cancelled) return;
      modeRef.current="file"; setMode("file");
      var local=loadLocal();
      if(j.saved){
        var p=norm(j.data); latest.current=p; setProg(p); setSt({state:"saved",at:j.updatedAt});
      } else if(local&&hasData(local)){
        latest.current=local; setProg(local); dirty.current=true; flush();
      }
      setReady(true);
    }).catch(function(){
      if(cancelled) return;
      modeRef.current="browser"; setMode("browser");
      var local=loadLocal(); if(local){ latest.current=local; setProg(local); }
      setSt({state:"browser",at:null}); setReady(true);
    });
    return function(){ cancelled=true; };
  },[]);

  /* When the tab is closed or hidden, send any unsaved changes immediately */
  useEffect(function(){
    function beacon(){
      if(modeRef.current!=="file"||!dirty.current) return;
      var body=JSON.stringify(latest.current), ok=false;
      try{ ok=navigator.sendBeacon(API,new Blob([body],{type:"application/json"})); }catch(e){}
      if(!ok){ try{ fetch(API,{method:"POST",keepalive:true,headers:{"Content-Type":"application/json"},body:body}); ok=true; }catch(e){} }
      if(ok) dirty.current=false;
    }
    function vis(){ if(document.visibilityState==="hidden") beacon(); }
    window.addEventListener("pagehide",beacon);
    document.addEventListener("visibilitychange",vis);
    return function(){ window.removeEventListener("pagehide",beacon); document.removeEventListener("visibilitychange",vis); };
  },[]);

  function go(v){ setView(v); try{ window.scrollTo(0,0); }catch(e){} }
  function record(id,ok){ update(function(p){ var a=p.ans[id]||{right:0,wrong:0}; if(ok) a.right++; else a.wrong++; a.last=ok; p.ans[id]=a; return p; }); }
  function onMatch(id){ update(function(p){ p.match[id]=true; return p; }); }
  function onOpen(id,v){ update(function(p){ p.open[id]=v; return p; }); }
  function onReset(){ update(function(){ return emptyProg(); }); flush(); go({page:"home"}); }
  function startQuiz(L){ return function(title,qs){ go({page:"quiz",title:title,qs:qs,key:Date.now(),back:{page:"lesson",id:L.id,tab:"drill"}}); }; }

  if(!ready) return h("div",{className:"loading"},"Loading your saved progress…");

  var body;
  if(view.page==="home"){
    body=h(Home,{prog:prog,go:go,onReset:onReset});
  } else if(view.page==="lesson"){
    var L=LESSONS.filter(function(x){return x.id===view.id;})[0];
    body=h(LessonPage,{L:L,prog:prog,tab:view.tab,go:go,startQuiz:startQuiz(L),onMatch:onMatch,onOpen:onOpen});
  } else {
    body=h("main",null,h("div",{className:"panel"},
      h(Quiz,{key:view.key,qs:view.qs,title:view.title,onRecord:record,
        onExit:function(){go(view.back);},
        onRetry:function(qs){ go({page:"quiz",title:"Retry: "+view.title,qs:qs,key:Date.now(),back:view.back}); }})));
  }
  return h("div",{className:"app"},h(Sidebar,{prog:prog,view:view,go:go,st:st,mode:mode,onSave:onSave}),body);
}

export default App;
