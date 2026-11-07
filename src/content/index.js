// To add a new day: create dayN.js (copy day5.js as a template),
// import it here, add it to LESSONS, and remove N from LOCKED.
import day1 from "./day1.js";
import day2 from "./day2.js";
import day3 from "./day3.js";
import day4 from "./day4.js";
import day5 from "./day5.js";
import day6 from "./day6.js";
import day7 from "./day7.js";
import day8 from "./day8.js";
import day9 from "./day9.js";
import day10 from "./day10.js";
import day11 from "./day11.js";
import day12 from "./day12.js";
import day13 from "./day13.js";
import day14 from "./day14.js";
import day15 from "./day15.js";
import day16 from "./day16.js";
import day17 from "./day17.js";
import day18 from "./day18.js";
import day19 from "./day19.js";
import day20 from "./day20.js";

export const LESSONS = [day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20];
export const LOCKED = [21];

LESSONS.forEach((L) => {
  L.qs.forEach((q, i) => { q.id = L.id + "q" + i; q.lesson = L.id; });
});
