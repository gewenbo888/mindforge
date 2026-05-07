// ============ i18n + theme ============
const root = document.documentElement;
const LANG_KEY = "mf-lang";
const THEME_KEY = "mf-theme";

function applyLang(lang) {
  root.setAttribute("data-lang", lang);
  document.querySelectorAll(".lang-toggle button").forEach(b => {
    b.classList.toggle("active", b.dataset.langSet === lang);
  });
  document.querySelectorAll("[data-en-placeholder]").forEach(el => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`) || el.placeholder;
  });
  try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  document.querySelectorAll(".theme-toggle button").forEach(b => {
    b.classList.toggle("active", b.dataset.themeSet === theme);
  });
  try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
}

const initialLang = (() => {
  try { const s = localStorage.getItem(LANG_KEY); if (s) return s; } catch (_) {}
  return (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";
})();
applyLang(initialLang);

const initialTheme = (() => {
  try { const s = localStorage.getItem(THEME_KEY); if (s) return s; } catch (_) {}
  return "dark";
})();
applyTheme(initialTheme);

document.querySelectorAll(".lang-toggle button").forEach(btn => {
  btn.addEventListener("click", () => applyLang(btn.dataset.langSet));
});
document.querySelectorAll(".theme-toggle button").forEach(btn => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.themeSet));
});

// ============ Cognitive Atlas ============
const ATLAS = {
  attention: {
    title: { en: "Attention", zh: "注意" },
    sub: { en: "the spotlight that selects experience", zh: "选择经验的聚光灯" },
    desc: {
      en: "Attention is the gate. Whatever passes the gate gets to be processed by everything else — memory, emotion, reasoning. The mind you actually have is downstream of where attention has been pointed.",
      zh: "注意是闸门。穿过闸门的内容才会被记忆、情绪、推理处理。你"实际拥有"的心智，是注意被指向之处的下游产物。"
    },
    cells: [
      { k: { en: "Bottleneck", zh: "瓶颈" }, v: { en: "1 conscious task at a time", zh: "一次只能处理一个有意识任务" } },
      { k: { en: "Damages", zh: "伤害" }, v: { en: "Notifications, multitasking, sleep loss", zh: "通知、多任务、睡眠不足" } },
      { k: { en: "Strengthens", zh: "强化" }, v: { en: "Single-task blocks, sleep, stillness", zh: "单任务时段、充足睡眠、安静" } },
      { k: { en: "Failure mode", zh: "失败模式" }, v: { en: "Fragmentation: 100 starts, 0 finishes", zh: "碎片化：开了 100 个头，零个完成" } }
    ]
  },
  memory: {
    title: { en: "Memory", zh: "记忆" },
    sub: { en: "what survives the night", zh: "能在夜里活下来的部分" },
    desc: {
      en: "Memory is reconstructive, not a recording. It's edited every time it's retrieved. What you remember about your past partly tells you what you currently believe about yourself.",
      zh: "记忆是重建的，不是录像。每次被取回都会被编辑一次。你关于过去的记忆，部分地告诉你"你现在如何看待自己"。"
    },
    cells: [
      { k: { en: "Forms", zh: "形式" }, v: { en: "Working · Episodic · Semantic · Procedural", zh: "工作 · 情景 · 语义 · 程序" } },
      { k: { en: "Damages", zh: "伤害" }, v: { en: "Sleep deprivation, chronic stress, screens before bed", zh: "睡眠不足、慢性压力、睡前屏幕" } },
      { k: { en: "Strengthens", zh: "强化" }, v: { en: "Active recall, spacing, sleep, novelty", zh: "主动回忆、间隔、睡眠、新奇" } },
      { k: { en: "Failure mode", zh: "失败模式" }, v: { en: "Highlighting masquerading as learning", zh: "把划线当作学习" } }
    ]
  },
  reasoning: {
    title: { en: "Reasoning", zh: "推理" },
    sub: { en: "the slow circuit", zh: "慢速回路" },
    desc: {
      en: "Reasoning is expensive. The brain runs intuition first and rationalizes second. Trained reasoning means catching that handoff in motion — and asking, 'is this conclusion mine, or is it just the cheapest one?'",
      zh: "推理很昂贵。大脑先用直觉，再用理性来合理化。受过训练的推理，是在切换发生的当下抓住它，并问："这个结论是我得出的，还是只是最便宜的那个？""
    },
    cells: [
      { k: { en: "Two systems", zh: "两个系统" }, v: { en: "Fast (intuitive) · Slow (deliberative)", zh: "快（直觉） · 慢（深思）" } },
      { k: { en: "Damages", zh: "伤害" }, v: { en: "Time pressure, exhaustion, ideology", zh: "时间压力、疲劳、意识形态" } },
      { k: { en: "Strengthens", zh: "强化" }, v: { en: "Steel-manning, premortems, slow-down rituals", zh: "为对方观点找最强论证、事前剖析、放慢的仪式" } },
      { k: { en: "Failure mode", zh: "失败模式" }, v: { en: "Confident reasoning from a wrong premise", zh: "在错误前提上展开自信推理" } }
    ]
  },
  emotion: {
    title: { en: "Emotion", zh: "情绪" },
    sub: { en: "fast inference about what matters", zh: "对"什么重要"的快速推断" },
    desc: {
      en: "Emotion is the body's prediction about whether something is good or bad for you. It's not the enemy of reason — it's the prior that reason updates. Suppressed emotion is information that doesn't disappear.",
      zh: "情绪是身体对"这件事对我是好是坏"的预测。它不是理性的敌人 —— 它是理性需要更新的先验。被压抑的情绪不会消失，它只是变成了不能阅读的信息。"
    },
    cells: [
      { k: { en: "Two roles", zh: "两个角色" }, v: { en: "Signal (information) · Driver (action)", zh: "信号（信息） · 驱动（行动）" } },
      { k: { en: "Damages", zh: "伤害" }, v: { en: "Suppression, performative positivity", zh: "压抑、表演式积极" } },
      { k: { en: "Strengthens", zh: "强化" }, v: { en: "Naming, somatic awareness, repair", zh: "命名、身体觉察、修复" } },
      { k: { en: "Failure mode", zh: "失败模式" }, v: { en: "Acting it out instead of feeling it through", zh: "把它演出来，而不是把它感受过去" } }
    ]
  },
  motivation: {
    title: { en: "Motivation", zh: "动机" },
    sub: { en: "the question 'why bother?'", zh: ""为什么要费这个力？"" },
    desc: {
      en: "Motivation isn't the cause of action — it's the byproduct of values, identity, and momentum. Asking 'how do I feel motivated?' usually keeps you stuck. The better question: 'what would I do if I were already the kind of person I'm trying to become?'",
      zh: "动机不是行动的原因 —— 它是价值、身份与势能的副产物。"我怎样才有动力？"通常让人原地打转。更好的问题是："如果我已经是我想成为的那种人，我现在会做什么？""
    },
    cells: [
      { k: { en: "Two engines", zh: "两个发动机" }, v: { en: "Wanting (drive) · Liking (savoring)", zh: "想要（驱动） · 喜欢（品味）" } },
      { k: { en: "Damages", zh: "伤害" }, v: { en: "Dopamine flooding, value confusion", zh: "多巴胺过度刺激、价值混乱" } },
      { k: { en: "Strengthens", zh: "强化" }, v: { en: "Identity-based goals, autonomy, mastery, purpose", zh: "基于身份的目标、自主、精通、意义" } },
      { k: { en: "Failure mode", zh: "失败模式" }, v: { en: "Waiting to feel motivated before doing the thing", zh: "等"有动力"再做" } }
    ]
  },
  habit: {
    title: { en: "Habit", zh: "习惯" },
    sub: { en: "what you become by default", zh: "你"默认"成为的样子" },
    desc: {
      en: "Habit is the brain compressing a frequently-run sequence into a single chunk so it can save energy for novelty. You don't rise to your goals; you fall to the level of your defaults.",
      zh: "习惯是大脑把高频运行的序列压缩成一个块，以便把能量留给新奇。你不会"升到"你的目标；你会"落到"你默认行为的水平。"
    },
    cells: [
      { k: { en: "Loop", zh: "回路" }, v: { en: "Cue → craving → response → reward", zh: "线索 → 渴望 → 行为 → 奖励" } },
      { k: { en: "Damages", zh: "伤害" }, v: { en: "Frictionless temptations, mood-driven start times", zh: "无摩擦的诱惑、情绪驱动的开始时间" } },
      { k: { en: "Strengthens", zh: "强化" }, v: { en: "Anchor to existing routine, environment design", zh: "锚定已有作息，设计环境" } },
      { k: { en: "Failure mode", zh: "失败模式" }, v: { en: "Relying on willpower instead of design", zh: "靠意志力而不是靠设计" } }
    ]
  },
  social: {
    title: { en: "Social cognition", zh: "社会认知" },
    sub: { en: "modeling other minds", zh: "建模他人之心" },
    desc: {
      en: "We don't see other people directly — we see our model of them. Mostly the model is wrong. Asking 'what is the most generous interpretation that fits the evidence?' costs nothing and changes which relationships survive.",
      zh: "我们其实看不到"他人"——我们看到的是自己关于他人的模型。模型多半是错的。问一句"在所有解释中，最善意但仍能解释证据的版本是什么？"几乎不费力，却决定了哪些关系能活下来。"
    },
    cells: [
      { k: { en: "Modules", zh: "模块" }, v: { en: "Theory of mind · Mirror system · Trust calibration", zh: "心智理论 · 镜像系统 · 信任校准" } },
      { k: { en: "Damages", zh: "伤害" }, v: { en: "Online communication, parasocial inputs, isolation", zh: "纯线上沟通、单向"亚社交"输入、孤立" } },
      { k: { en: "Strengthens", zh: "强化" }, v: { en: "Slow conversation, conflict-then-repair, weak ties", zh: "慢速对话、冲突-修复循环、弱关系" } },
      { k: { en: "Failure mode", zh: "失败模式" }, v: { en: "Mistaking your model of someone for the person", zh: "把"对某人的模型"误认成那个人" } }
    ]
  }
};

function renderAtlas(key) {
  const d = ATLAS[key];
  if (!d) return;
  const el = document.getElementById("atlas-detail");
  el.innerHTML = `
    <div class="tag"><span lang="en">${d.sub.en}</span><span lang="zh">${d.sub.zh}</span></div>
    <h3>
      <span lang="en">${d.title.en}</span>
      <span lang="zh">${d.title.zh}</span>
    </h3>
    <p>
      <span lang="en">${d.desc.en}</span>
      <span lang="zh">${d.desc.zh}</span>
    </p>
    <div class="atlas-detail-grid">
      ${d.cells.map(c => `
        <div class="atlas-detail-cell">
          <h4><span lang="en">${c.k.en}</span><span lang="zh">${c.k.zh}</span></h4>
          <p><span lang="en">${c.v.en}</span><span lang="zh">${c.v.zh}</span></p>
        </div>
      `).join("")}
    </div>
  `;
  document.querySelectorAll("#atlas-svg .atlas-node").forEach(n => {
    n.classList.toggle("active", n.dataset.key === key);
  });
}
renderAtlas("attention");
document.querySelectorAll("#atlas-svg .atlas-node").forEach(node => {
  node.addEventListener("click", () => renderAtlas(node.dataset.key));
  node.addEventListener("mouseenter", () => renderAtlas(node.dataset.key));
});

// ============ Emotion wheel ============
const EMOTIONS = [
  { key: "joy",      color: "#f0a868", angle: 0,    label: { en: "Joy",       zh: "喜悦" }, cause: { en: "needs met · belonging", zh: "需求被满足 · 被接纳" }, reg: "savor" },
  { key: "love",     color: "#e98aa6", angle: 45,   label: { en: "Love",      zh: "爱" },   cause: { en: "deep connection signal", zh: "深度连接的信号" },           reg: "express" },
  { key: "sadness",  color: "#7d9bff", angle: 90,   label: { en: "Sadness",   zh: "悲伤" }, cause: { en: "loss · meaning of what mattered", zh: "失去 · 重要之物的意义" },   reg: "feel" },
  { key: "fear",     color: "#9ba3b8", angle: 135,  label: { en: "Fear",      zh: "恐惧" }, cause: { en: "threat detection (real or imagined)", zh: "威胁检测（真实或想象）" }, reg: "ground" },
  { key: "anger",    color: "#c97f3f", angle: 180,  label: { en: "Anger",     zh: "愤怒" }, cause: { en: "boundary violated · injustice", zh: "边界被侵犯 · 不公" },         reg: "channel" },
  { key: "shame",    color: "#b88ad9", angle: 225,  label: { en: "Shame",     zh: "羞愧" }, cause: { en: "fear of disconnection from group", zh: "害怕与群体失去连接" },     reg: "name" },
  { key: "disgust",  color: "#4ed8b8", angle: 270,  label: { en: "Disgust",   zh: "厌恶" }, cause: { en: "value violated · contamination", zh: "价值被违背 · 被污染感" },     reg: "clarify" },
  { key: "surprise", color: "#a5acc4", angle: 315,  label: { en: "Surprise",  zh: "惊讶" }, cause: { en: "world doesn't match prediction", zh: "世界没有按预测发生" },     reg: "update" },
];
const REG_SCRIPTS = {
  savor:    [["Notice the body","Feel where in the body the pleasure lives — chest, face, throat. Stay with it 20 seconds longer than is comfortable."], ["Remember future-you","Mark the moment so the memory has a hook to retrieve later."], ["Share, don't capture","Tell someone briefly. Don't reach for a phone first."], ["Don't grasp","Joy diminishes when grasped at. The container is fragile by design."]],
  express:  [["Speak it","Love unspoken decays into unmet need. Use a sentence that doesn't ask for anything in return."], ["Embody","Touch, presence, slow attention. The body believes what it does, not what it hears."], ["Repair fast","If there's a small open loop, close it today."], ["Receive","Letting it land in you is part of giving. Many of us only practice one direction."]],
  feel:     [["Don't manage it","Sadness is a sign something mattered. Trying to fix it is often a way to dismiss it."], ["Move slowly","Walk, water, tea. Slow inputs match the inner tempo."], ["Talk to one person","Not to feel better — to feel less alone."], ["Wait","Sadness has a half-life. You don't have to do anything for it to move."]],
  ground:   [["Body before story","Five long exhales. Feet on floor. Cold water on hands."], ["Ask: real or imagined?","Is this fear about what is happening or what could?"], ["Right-size the threat","Name the worst plausible (not catastrophic) outcome. Plan for that."], ["Move toward, not away","Avoidance feeds fear; one small step toward it shrinks it."]],
  channel:  [["Don't suppress, don't perform","Anger is data. Acting it out and pushing it down both lose the data."], ["Locate the line","What boundary has been crossed? Whose? Is it still there?"], ["Use it once","Compose one calm sentence that names the line. Send or speak it."], ["Drain the residue","Walk, lift, run. Anger held without movement becomes resentment."]],
  name:     [["Distinguish from guilt","Guilt = I did a bad thing. Shame = I am bad. Most healing is converting shame to guilt."], ["Speak it to one safe person","Shame survives in silence; it wilts in being witnessed without rejection."], ["Examine the audience","Whose judgment, exactly? Often a parent, a teacher, a younger version of the group."], ["Repair if real, release if not","If you did harm, repair. If not, the shame is borrowed — return it."]],
  clarify:  [["Look for the value","Disgust marks contact with something that violates a value. Which value?"], ["Distinguish person from action","Are you disgusted by a behavior or by a person? They're different problems."], ["Don't generalize","Disgust expands fast. Keep it precisely sized."], ["Choose distance, not destruction","You don't have to fix or punish to protect what you value."]],
  update:   [["Stay open one beat longer","Surprise is the brain saying 'my model was wrong.' Don't close it too fast."], ["Ask what you missed","What information was already there that you didn't weigh enough?"], ["Update gently","One data point doesn't overturn a belief. But it should move it."], ["Tell yourself the new story","If the new evidence is real, what version of reality fits it?"]]
};

(function buildWheel() {
  const wheelG = document.getElementById("wheel-sectors");
  const R = 175, R2 = 65;
  EMOTIONS.forEach((e, i) => {
    const a0 = (e.angle - 22.5) * Math.PI / 180;
    const a1 = (e.angle + 22.5) * Math.PI / 180;
    const x0 = Math.cos(a0) * R, y0 = Math.sin(a0) * R;
    const x1 = Math.cos(a1) * R, y1 = Math.sin(a1) * R;
    const xi0 = Math.cos(a0) * R2, yi0 = Math.sin(a0) * R2;
    const xi1 = Math.cos(a1) * R2, yi1 = Math.sin(a1) * R2;
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${xi0} ${yi0} L ${x0} ${y0} A ${R} ${R} 0 0 1 ${x1} ${y1} L ${xi1} ${yi1} A ${R2} ${R2} 0 0 0 ${xi0} ${yi0} Z`);
    path.setAttribute("fill", e.color);
    path.setAttribute("opacity", "0.62");
    path.setAttribute("stroke", "var(--bg)");
    path.setAttribute("stroke-width", "1.5");
    path.dataset.key = e.key;
    path.addEventListener("click", () => selectEmotion(e.key));
    path.addEventListener("mouseenter", () => selectEmotion(e.key));
    wheelG.appendChild(path);

    // label arc
    const aMid = e.angle * Math.PI / 180;
    const xL = Math.cos(aMid) * (R - 28);
    const yL = Math.sin(aMid) * (R - 28);
    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", xL); t.setAttribute("y", yL + 4);
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("font-family", "Geist Mono");
    t.setAttribute("font-size", "10");
    t.setAttribute("fill", "var(--bg)");
    t.setAttribute("opacity", ".8");
    t.style.pointerEvents = "none";
    t.textContent = e.key.toUpperCase();
    wheelG.appendChild(t);
  });
})();

function selectEmotion(key) {
  const e = EMOTIONS.find(x => x.key === key);
  if (!e) return;
  document.querySelectorAll("#wheel-svg path").forEach(p => p.classList.toggle("active", p.dataset.key === key));
  document.getElementById("wheel-center").innerHTML =
    `<tspan lang="en">${e.label.en.toLowerCase()}</tspan><tspan lang="zh">${e.label.zh}</tspan>`;
  document.getElementById("emotion-label").innerHTML =
    `<em><span lang="en">${e.label.en}</span><span lang="zh">${e.label.zh}</span></em>`;
  document.getElementById("emotion-cause").innerHTML =
    `<span lang="en">${e.cause.en}</span><span lang="zh">${e.cause.zh}</span>`;
  // regulation
  const steps = REG_SCRIPTS[e.reg];
  const sub = document.getElementById("regulation-sub");
  sub.innerHTML = `<span lang="en">for · ${e.label.en.toLowerCase()}</span><span lang="zh">针对 · ${e.label.zh}</span>`;
  const body = document.getElementById("regulation-body");
  body.innerHTML = steps.map((s, i) => `
    <div class="reg-step">
      <div class="num">0${i+1}</div>
      <div>
        <h5><span lang="en">${s[0]}</span><span lang="zh">${REG_ZH[e.reg][i][0]}</span></h5>
        <p><span lang="en">${s[1]}</span><span lang="zh">${REG_ZH[e.reg][i][1]}</span></p>
      </div>
    </div>
  `).join("");
}

const REG_ZH = {
  savor: [["看见身体里的喜悦","感觉喜悦在身体里的位置 —— 胸口、面部、喉咙。比舒适时多停留 20 秒。"],["留下一个未来的钩子","标记这一刻，让记忆未来有可以勾住的地方。"],["分享，不要"截屏"","简单地告诉一个人。先别去拿手机。"],["不要紧握","紧握会让喜悦减少。它的容器天生脆弱。"]],
  express:  [["把它说出来","没说出口的爱会衰减成未被满足的需要。用一句不要求回应的话。"],["用身体表达","触摸、在场、慢慢的注意。身体相信它做的，而不是它听到的。"],["快速修复","如果有未关闭的小回路，今天就关上。"],["也练习接收","让它落在你身上是给予的一部分。许多人只练了一头。"]],
  feel:     [["不要"管理"它","悲伤是某事曾经重要的标记。试图修复它，常常是在否认它。"],["放慢动作","散步、喝水、喝茶。慢的输入和内在节奏匹配。"],["告诉一个人","不是为了感觉更好，而是为了感觉不那么孤单。"],["等","悲伤有半衰期，你不需要为它做什么，它自己会动。"]],
  ground:   [["先身体，再故事","五次长长的呼气，脚踏地，冷水洗手。"],["问：真实还是想象？","这份恐惧是关于"正在发生的"，还是"可能发生的"？"],["把威胁尺寸放对","说出最坏但合理（不是灾难化）的版本，并为它做准备。"],["走向，而不是远离","回避会喂养恐惧；朝它走一小步会缩小它。"]],
  channel:  [["不压抑，也不表演","愤怒是数据。把它演出来或压下去都会丢失数据。"],["定位那条线","哪条边界被越过了？是谁的？还在那里吗？"],["用它一次","写一句平静、明确说出边界的话。讲出去或发出去。"],["让残余流走","散步、举重、跑步。不动身体的愤怒会变成怨。"]],
  name:     [["把它和"内疚"分开","内疚 = 我做了一件坏事；羞愧 = 我是坏的。修复多半是把羞愧转成内疚。"],["告诉一个安全的人","羞愧在沉默中存活，在被见证而不被拒绝时枯萎。"],["看见那个评判者","到底是谁的目光？常常是一个父母、一个老师、一个童年群体的更小版本。"],["真就修复，假就归还","如果你确实造成了伤害，去修复；如果不是，这羞愧是借来的，归还它。"]],
  clarify:  [["寻找那个价值","厌恶标记着接触到了违背价值的东西。是哪个价值？"],["把人和行为分开","你厌恶的是某个行为，还是一个人？这是两个不同的问题。"],["不要泛化","厌恶扩散得很快，要让它保持精确大小。"],["选择距离，不一定要破坏","为了保护你重视的东西，你不必去修复或惩罚。"]],
  update:   [["多保持一拍开放","惊讶是大脑在说："我的模型错了。"不要太快关上它。"],["问：我漏掉了什么？","其实早就有的信息里，是什么没被你足够重视？"],["温柔地更新","一个数据点不该推翻一个信念，但它应该让信念移动。"],["对自己讲新故事","如果新证据是真的，什么样的现实版本能容纳它？"]]
};

selectEmotion("joy");

// ============ Decision simulator ============
const DECISIONS = {
  take: {
    en: [
      ["Month 1",  "Excitement, status bump, validation from people who optimize the same way."],
      ["Year 1",   "Income up; you start adjusting lifestyle to it. Meaning gap shows up as low-grade Sunday-night dread."],
      ["Year 3",   "Lifestyle now requires the higher salary. Pivoting back is now expensive — not impossible, just expensive."],
      ["Year 10",  "Either: you've built a second life on the side and use the money to fund it; or you're competent, comfortable, and quiet."]
    ],
    zh: [
      ["第 1 个月",  "兴奋，地位提升，被同样优化路径的人肯定。"],
      ["第 1 年",    "收入上升，你的生活方式开始向它靠拢。意义上的缺口表现为周日晚上隐隐的不安。"],
      ["第 3 年",    "生活方式开始依赖这份更高的工资。转回头变贵了 —— 不是不可能，只是变贵了。"],
      ["第 10 年",   "要么：你在主线之外建起了第二条生命，并用这笔钱供养它；要么：你能胜任、舒适，并安静下来。"]
    ]
  },
  reject: {
    en: [
      ["Month 1",  "Some grief about the road not taken. Identity remains coherent."],
      ["Year 1",   "Money is tighter than it could have been. The work that gives you meaning compounds in skill and reputation."],
      ["Year 3",   "Better deals now find you because you stayed visible in the work that you actually love."],
      ["Year 10",  "You are unusually clear about who you are. Worth: very high. Optionality: medium. Risk: did you confuse identity with stuckness?"]
    ],
    zh: [
      ["第 1 个月",  "对"没走的那条路"会有一点哀悼。身份仍然连贯。"],
      ["第 1 年",    "钱比另一条路更紧。给你意义的工作在技能与名声上开始复利。"],
      ["第 3 年",    "更好的机会主动找上来，因为你留在了真正热爱的工作里、被看见。"],
      ["第 10 年",   "你对自己是谁异常清楚。价值：非常高。可选性：中等。风险：是否把"坚守身份"和"卡住"搞混了？"]
    ]
  },
  negotiate: {
    en: [
      ["Month 1",  "Hard conversation: you propose a re-shaped scope. Some friction; some respect."],
      ["Year 1",   "If they said yes, you have rare leverage. If they said no, you've learned what they actually wanted from this hire."],
      ["Year 3",   "You've installed a habit of redesigning roles instead of accepting them. The skill compounds across every future negotiation."],
      ["Year 10",  "The strongest of the three trajectories on average — but it requires being able to walk away. Without that, this collapses into 'take it.'"]
    ],
    zh: [
      ["第 1 个月",  "一次困难的对话：你提议重新塑造岗位。有一些摩擦，也有一些尊重。"],
      ["第 1 年",    "如果他们答应了，你拿到了罕见的杠杆；如果他们拒绝了，你弄清了他们其实想要什么样的人。"],
      ["第 3 年",    "你内化了"重新设计岗位"而不是"被动接受"的习惯。这种能力会在未来每一次谈判中复利。"],
      ["第 10 年",   "三条路里平均最强 —— 但前提是你能真的走开。没有这一条，它会塌陷成"接受"。"]
    ]
  }
};

function renderDecision(key) {
  const d = DECISIONS[key];
  const el = document.getElementById("decision-outcome");
  el.innerHTML = `
    <div class="head"><span lang="en">PROJECTED TRAJECTORY</span><span lang="zh">推演轨迹</span></div>
    ${d.en.map((row, i) => `
      <div class="outcome-row">
        <div class="horizon"><span lang="en">${row[0]}</span><span lang="zh">${d.zh[i][0]}</span></div>
        <div class="text"><span lang="en">${row[1]}</span><span lang="zh">${d.zh[i][1]}</span></div>
      </div>
    `).join("")}
  `;
}
renderDecision("take");
document.querySelectorAll("#choice-list .choice").forEach(b => {
  b.addEventListener("click", () => {
    document.querySelectorAll("#choice-list .choice").forEach(c => c.classList.toggle("active", c === b));
    renderDecision(b.dataset.choice);
  });
});

// ============ Coach ============
const COACH = {
  overthinking: {
    q: { en: "I can't stop overthinking everything.", zh: "我无法停止过度思考。" },
    a: {
      en: [
        "<strong>What this often is:</strong> overthinking is rarely a thinking problem. It's usually unfelt feeling, processed cognitively because the body is harder to enter. The mind is doing your emotional work — badly.",
        "<strong>The diagnostic question:</strong> 'If I knew the answer right now, what would I have to feel?' That answer is what the thinking is actually about.",
        "<strong>What to try this week:</strong> when you notice a loop, name the body sensation underneath (tight chest, hollow stomach, jaw). Stay with that for 90 seconds before going back to the thought. Most loops shrink when the underlying signal is heard."
      ],
      zh: [
        "<strong>它通常是什么：</strong>过度思考很少是"思考的问题"，多半是"未被感受的情绪"，因为身体更难进入，所以转用认知去处理。心智在替身体做情绪的活儿 —— 而且做得不好。",
        "<strong>诊断性提问：</strong>"如果我现在就知道答案，我会不得不感受到什么？"——那个答案，才是这场思考真正关于的东西。",
        "<strong>本周可以试试：</strong>当你发现自己陷入循环，先命名底下的身体感觉（胸口紧、胃发空、下颌紧）。在那里停留 90 秒，再回到想法上。多数循环在底下的信号被听见之后会缩小。"
      ]
    }
  },
  motivation: {
    q: { en: "I lost motivation for things I used to love.", zh: "我对从前喜爱的事失去了动力。" },
    a: {
      en: [
        "<strong>Three different things hide here:</strong> burnout (the system is exhausted), anhedonia (the reward circuitry is suppressed, often by chronic stress or grief), or value drift (you outgrew what used to give meaning).",
        "<strong>How to tell:</strong> if rest restores it → burnout. If nothing brings pleasure for weeks → see someone, this can be depression. If only this one thing feels flat → value drift, and the loss is real but informative.",
        "<strong>What's almost always part of the answer:</strong> sleep, sunlight, real conversation, and reducing high-spike inputs (short-form video, news, alerts). They aren't motivational — they're maintenance for the machinery that produces motivation."
      ],
      zh: [
        "<strong>这里其实藏着三件不同的事：</strong>倦怠（系统耗尽）、快感缺失（奖励回路被压抑，常因长期压力或哀伤）、价值漂移（你长出去了，原本给意义的东西不再适配）。",
        "<strong>如何区分：</strong>休息后能恢复 → 倦怠；连续数周对所有事都无快感 → 请寻求帮助，可能是抑郁；只有这一件事变平 → 价值漂移，损失是真的，但它在告诉你一些事。",
        "<strong>几乎总是答案的一部分：</strong>睡眠、阳光、真实的对话、减少高峰值输入（短视频、新闻、提醒）。这些不是"励志"的内容 —— 它们是产出动力的机器的维修。"
      ]
    }
  },
  comparison: {
    q: { en: "I always compare myself to others.", zh: "我总是和别人比较。" },
    a: {
      en: [
        "<strong>What it tells you:</strong> comparison is the mind trying to answer the question 'am I OK?' through proxies, because the direct question feels too dangerous to ask.",
        "<strong>Reframe:</strong> the comparison isn't really to that other person — it's to a curated frame of them you assembled in 20 seconds. You're losing to a highlight reel.",
        "<strong>Practice:</strong> when comparison fires, notice <em>which</em> dimension. Money? Looks? Status? That dimension is telling you what you currently believe is the source of being OK. Choose, with intention, whether you want to keep believing that."
      ],
      zh: [
        "<strong>它在告诉你：</strong>比较是心智在用代理变量回答"我可以吗？"这个问题，因为直接问太危险。",
        "<strong>换个视角：</strong>你比的并不是那个人 —— 是你在 20 秒内拼出来的"她/他的精选画面"。你在和高光集锦比输赢。",
        "<strong>练习：</strong>当比较启动时，注意是<em>哪个维度</em>。钱？外貌？地位？那个维度告诉你：你目前以为"可以"等于什么。然后有意识地选择是否要继续这样相信。"
      ]
    }
  },
  "people-pleasing": {
    q: { en: "I can't say no.", zh: "我说不出"不"。" },
    a: {
      en: [
        "<strong>What's underneath:</strong> people-pleasing is rarely about kindness. It's usually a strategy learned early — 'I am safe when others are not upset with me.' The cost is a self that disappears in proportion to others' moods.",
        "<strong>The reframe:</strong> a 'yes' you couldn't say 'no' to is not a real yes. You don't owe people the version of yes that costs you yourself.",
        "<strong>Concrete script:</strong> 'Let me think about it and get back to you.' Buy 24 hours every time. Most yeses you regret are given inside the first 30 seconds. The pause itself is most of the work."
      ],
      zh: [
        "<strong>底下是什么：</strong>讨好很少是关于善良的，多半是一个早年学会的策略 —— "只要别人不生我的气，我就安全。"代价是：自我会随着别人的情绪而消失。",
        "<strong>换个视角：</strong>一个你说不出"不"的"是"，不是真正的"是"。你不欠别人那种"以失去自己为代价"的"是"。",
        "<strong>具体脚本：</strong>"让我想一下，再回复你。"每次都买 24 小时。多数你日后后悔的"是"，都是在前 30 秒内说出口的。那个暂停本身，已经做了大部分工作。"
      ]
    }
  },
  numb: {
    q: { en: "I feel emotionally numb.", zh: "我情感上麻木。" },
    a: {
      en: [
        "<strong>Numbness is rarely 'no feeling.'</strong> It's usually too much feeling — long enough that the system turned the volume down to protect itself. The numbness is intelligent.",
        "<strong>What it doesn't need:</strong> being forced. Pushing into intense feelings before the system trusts you to handle them deepens the numbness.",
        "<strong>Smaller doors:</strong> body before story (warm shower, slow walk, weight). One sentence to one trusted person. Music you used to love before any of this. Don't try to feel — try to thaw."
      ],
      zh: [
        "<strong>麻木很少是"没有感觉"。</strong>多半是感觉太多、太久，系统为了保护自己把音量调低了。这种麻木是聪明的。",
        "<strong>它不需要的：</strong>被强迫。在系统还没准备好之前硬去触碰强烈情绪，反而会让麻木更深。",
        "<strong>更小的门：</strong>先身体，再故事（热水澡、慢走、负重）。对一个信任的人说一句话。听一首"这一切之前你曾喜欢的音乐"。不要试图"感受"，试着"解冻"。"
      ]
    }
  }
};

const stream = document.getElementById("coach-stream");
function pushMsg(role, en, zh) {
  const msg = document.createElement("div");
  msg.className = "msg" + (role === "user" ? " user" : "");
  msg.innerHTML = `
    <div class="role">${role === "user"
      ? '<span lang="en">You</span><span lang="zh">你</span>'
      : '<span lang="en">Coach</span><span lang="zh">教练</span>'}</div>
    <div class="bubble">
      <div lang="en">${en}</div>
      <div lang="zh">${zh}</div>
    </div>
  `;
  stream.appendChild(msg);
  stream.scrollTo({ top: stream.scrollHeight, behavior: "smooth" });
}

function answer(key) {
  const item = COACH[key];
  if (!item) return;
  pushMsg("user", item.q.en, item.q.zh);
  setTimeout(() => {
    const en = item.a.en.map(p => `<p>${p}</p>`).join("");
    const zh = item.a.zh.map(p => `<p>${p}</p>`).join("");
    pushMsg("coach", en, zh);
  }, 320);
}

document.querySelectorAll(".coach-pill").forEach(p => {
  p.addEventListener("click", () => answer(p.dataset.q));
});

document.getElementById("coach-send").addEventListener("click", sendCustom);
document.getElementById("coach-input").addEventListener("keydown", e => {
  if (e.key === "Enter") sendCustom();
});

function sendCustom() {
  const input = document.getElementById("coach-input");
  const text = input.value.trim();
  if (!text) return;
  pushMsg("user", text, text);
  input.value = "";

  const t = text.toLowerCase();
  let key = null;
  if (/(overthink|loop|rumin|anxious thinking)/.test(t) || /反复想|过度思考|想太多|停不下来/.test(text)) key = "overthinking";
  else if (/(motivat|tired|burnt? ?out|don't care|nothing matters|无聊)/.test(t) || /没动力|失去动力|没兴趣|提不起|倦怠/.test(text)) key = "motivation";
  else if (/(compare|envy|jealous)/.test(t) || /比较|嫉妒|羡慕/.test(text)) key = "comparison";
  else if (/(can'?t say no|please|guilt)/.test(t) || /不会拒绝|讨好|内疚/.test(text)) key = "people-pleasing";
  else if (/(numb|empty|nothing|disconnected|flat)/.test(t) || /麻木|空|抽离|没有感觉/.test(text)) key = "numb";

  if (key) {
    setTimeout(() => {
      const item = COACH[key];
      const en = item.a.en.map(p => `<p>${p}</p>`).join("");
      const zh = item.a.zh.map(p => `<p>${p}</p>`).join("");
      pushMsg("coach", en, zh);
    }, 320);
  } else {
    setTimeout(() => {
      pushMsg("coach",
        "<p>I can work with this. Tell me one more layer: <strong>when</strong> does this show up most — alone, in conflict, after sleep loss, on Sundays? Patterns are where the answer is.</p>",
        "<p>我可以从这里展开。再给我一层：这件事最常在<strong>什么时刻</strong>出现 —— 独处时、冲突时、睡眠不足之后、周日？模式所在之处，就是答案所在之处。</p>"
      );
    }, 320);
  }
}

// ============ Reveal on scroll ============
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll(".section-head, .bias-card, .social-card, .metacog-item, .stage-row, .trait, .reg-step").forEach(el => {
  el.classList.add("fade-in");
  io.observe(el);
});
