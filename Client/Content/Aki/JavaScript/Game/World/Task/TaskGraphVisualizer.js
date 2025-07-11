"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskGraphVisualizer = undefined;
class TaskGraphVisualizer {
  constructor(t) {
    this.OK1 = t;
    this.qK1 = new Map();
    this.GK1 = [];
    this.FK1 = new Map();
    if (t.length === 0) {
      throw new Error("依赖列表不能为空");
    }
  }
  NK1() {
    this.OK1.forEach(([t, r]) => {
      if (!this.qK1.has(t)) {
        this.qK1.set(t, {
          Parents: [],
          Children: []
        });
      }
      if (!this.qK1.has(r)) {
        this.qK1.set(r, {
          Parents: [],
          Children: []
        });
      }
      var a = this.qK1.get(t);
      if (!a.Children.includes(r)) {
        a.Children.push(r);
      }
      var a = this.qK1.get(r);
      if (!a.Parents.includes(t)) {
        a.Parents.push(t);
      }
    });
  }
  VK1() {
    const s = new Map();
    const h = t => {
      if (s.has(t)) {
        return s.get(t);
      }
      let r = -1;
      this.qK1.get(t).Parents.forEach(t => {
        r = Math.max(r, h(t));
      });
      var a = r + 1;
      s.set(t, a);
      return a;
    };
    this.qK1.forEach((t, r) => {
      if (!s.has(r)) {
        h(r);
      }
    });
    var t = Math.max(...Array.from(s.values()));
    this.GK1 = Array.from({
      length: t + 1
    }, () => []);
    s.forEach((t, r) => {
      this.GK1[t].push(r);
    });
    this.GK1 = this.GK1.filter(t => t.length > 0).reverse();
  }
  jK1() {
    var t = this.GK1.map(t => t.reduce((t, r) => t + r.length + 4, 0));
    const h = Math.max(...t, 10);
    this.GK1.forEach((t, a) => {
      var r = t.reduce((t, r) => t + r.length + 4, 0);
      let s = Math.floor((h - r) / 2);
      s = Math.max(s, 0);
      t.forEach(t => {
        var r = t.length;
        this.FK1.set(t, {
          X: s + Math.ceil(r / 2),
          Y: a * 3,
          Width: r
        });
        s += r + 4;
      });
    });
  }
  HK1() {
    var t = this.GK1.length * 3 + 2;
    const r = this.GK1.reduce((t, r) => Math.max(t, ...r.map(t => this.FK1.get(t).X + Math.ceil(t.length / 2) + 2)), 10);
    return Array.from({
      length: t
    }, () => Array(r).fill(" "));
  }
  $K1(h) {
    this.FK1.forEach((a, t) => {
      const s = a.X - Math.floor(a.Width / 2);
      t.split("").forEach((t, r) => {
        r = s + r;
        if (r >= 0 && r < h[0].length) {
          h[a.Y][r] = t;
        }
      });
    });
  }
  WK1(l) {
    this.OK1.forEach(([r, a]) => {
      var s = this.FK1.get(r);
      var h = this.FK1.get(a);
      var r = Math.min(s.Y + 1, l.length - 1);
      var i = Math.min(h.Y - 1, l.length - 1);
      for (let t = r; t <= i; t++) {
        if (s.X >= 0 && s.X < l[0].length) {
          l[t][s.X] = l[t][s.X] === " " ? "│" : "║";
        }
      }
      var e = s.Y + 1;
      if (e < l.length) {
        var a = Math.min(s.X, h.X);
        var n = Math.max(s.X, h.X);
        for (let t = a; t <= n; t++) {
          if (t >= 0 && t < l[0].length) {
            l[e][t] = t === s.X ? "┬" : t === h.X ? "┐" : "─";
          }
        }
      }
      if (h.Y - 1 >= 0 && h.X < l[0].length) {
        l[h.Y - 1][h.X] = "┘";
      }
    });
  }
  Visualize() {
    this.NK1();
    this.VK1();
    this.jK1();
    var t = this.HK1();
    this.WK1(t);
    this.$K1(t);
    return "\n" + t.map(t => t.join("").replace(/┬─┐/g, "┬─┬").replace(/┘/g, " ").replace(/\s+$/gm, "")).join("\n");
  }
}
exports.TaskGraphVisualizer = TaskGraphVisualizer;
//# sourceMappingURL=TaskGraphVisualizer.js.map