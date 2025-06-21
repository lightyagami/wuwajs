"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.TaskGraphVisualizer = void 0;
class TaskGraphVisualizer {
  constructor(t) {
    if (this.eK1 = t, this.tK1 = new Map, this.iK1 = [], this.rK1 = new Map, 0 === t.length) throw new Error("依赖列表不能为空")
  }
  oK1() {
    this.eK1.forEach(([t, r]) => {
      this.tK1.has(t) || this.tK1.set(t, {
        Parents: [],
        Children: []
      }), this.tK1.has(r) || this.tK1.set(r, {
        Parents: [],
        Children: []
      });
      var a = this.tK1.get(t),
        a = (a.Children.includes(r) || a.Children.push(r), this.tK1.get(r));
      a.Parents.includes(t) || a.Parents.push(t)
    })
  }
  nK1() {
    const s = new Map,
      h = t => {
        if (s.has(t)) return s.get(t);
        let r = -1;
        this.tK1.get(t).Parents.forEach(t => {
          r = Math.max(r, h(t))
        });
        var a = r + 1;
        return s.set(t, a), a
      };
    this.tK1.forEach((t, r) => {
      s.has(r) || h(r)
    });
    var t = Math.max(...Array.from(s.values()));
    this.iK1 = Array.from({
      length: t + 1
    }, () => []), s.forEach((t, r) => {
      this.iK1[t].push(r)
    }), this.iK1 = this.iK1.filter(t => 0 < t.length).reverse()
  }
  sK1() {
    var t = this.iK1.map(t => t.reduce((t, r) => t + r.length + 4, 0));
    const h = Math.max(...t, 10);
    this.iK1.forEach((t, a) => {
      var r = t.reduce((t, r) => t + r.length + 4, 0);
      let s = Math.floor((h - r) / 2);
      s = Math.max(s, 0), t.forEach(t => {
        var r = t.length;
        this.rK1.set(t, {
          X: s + Math.ceil(r / 2),
          Y: 3 * a,
          Width: r
        }), s += r + 4
      })
    })
  }
  aK1() {
    var t = 3 * this.iK1.length + 2;
    const r = this.iK1.reduce((t, r) => Math.max(t, ...r.map(t => this.rK1.get(t).X + Math.ceil(t.length / 2) + 2)), 10);
    return Array.from({
      length: t
    }, () => Array(r).fill(" "))
  }
  hK1(h) {
    this.rK1.forEach((a, t) => {
      const s = a.X - Math.floor(a.Width / 2);
      t.split("").forEach((t, r) => {
        r = s + r;
        0 <= r && r < h[0].length && (h[a.Y][r] = t)
      })
    })
  }
  lK1(l) {
    this.eK1.forEach(([r, a]) => {
      var s = this.rK1.get(r),
        h = this.rK1.get(a),
        r = Math.min(s.Y + 1, l.length - 1),
        i = Math.min(h.Y - 1, l.length - 1);
      for (let t = r; t <= i; t++) 0 <= s.X && s.X < l[0].length && (l[t][s.X] = " " === l[t][s.X] ? "│" : "║");
      var e = s.Y + 1;
      if (e < l.length) {
        var a = Math.min(s.X, h.X),
          n = Math.max(s.X, h.X);
        for (let t = a; t <= n; t++) 0 <= t && t < l[0].length && (l[e][t] = t === s.X ? "┬" : t === h.X ? "┐" : "─")
      }
      0 <= h.Y - 1 && h.X < l[0].length && (l[h.Y - 1][h.X] = "┘")
    })
  }
  Visualize() {
    this.oK1(), this.nK1(), this.sK1();
    var t = this.aK1();
    return this.lK1(t), this.hK1(t), "\n" + t.map(t => t.join("").replace(/┬─┐/g, "┬─┬").replace(/┘/g, " ").replace(/\s+$/gm, "")).join("\n")
  }
}
exports.TaskGraphVisualizer = TaskGraphVisualizer;
//# sourceMappingURL=TaskGraphVisualizer.js.map