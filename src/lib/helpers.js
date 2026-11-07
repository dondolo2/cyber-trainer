// Content helpers. Q = multiple choice, M = matching set, E = explain-it question.
// Q(topic, question, correctAnswer, [three wrong answers], whyItsRight)
export function Q(t, q, c, w, why) { return { t, q, c, w, why }; }
// M(title, intro, [[term, definition], ...])
export function M(title, intro, pairs) { return { title, intro, pairs }; }
// E(question, [model answer bullets], optionalTip)
export function E(q, model, tip) { return { q, model, tip }; }
// O(title, intro, [items in the CORRECT order])
export function O(title, intro, items) { return { title, intro, items }; }
