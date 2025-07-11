"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScoreUpdateManager = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
class ScoreUpdateManager {
  constructor(t = 0.5, e = 5) {
    this.Rte = t;
    this.Ute = e;
    this.Ate = new Array();
    this.Pte = new Map();
    this.xte = 0;
  }
  AddScore(t, e = 1) {
    if (e < 1) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 6, "AddScore is less than 1");
      }
    } else {
      var r = this.Pte.get(t);
      if (r) {
        this.Ate[r].delete(t);
      }
      var o = r ? r + e : e;
      for (this.xte < o && (this.xte = o); this.Ate.length <= o;) {
        this.Ate.push(new Set());
      }
      this.Ate[o].add(t);
      this.Pte.set(t, o);
    }
  }
  RemoveObject(t) {
    var e = this.Pte.get(t);
    if (e) {
      this.Ate[e].delete(t);
    }
    this.Pte.delete(t);
  }
  Update() {
    if (this.xte !== 0) {
      let e = 0;
      let r = 0;
      for (let t = this.xte; t > 0; --t) {
        var o = this.Ate[t];
        var s = 1 / t;
        for (const i of o) {
          ScoreUpdateManager.wte.Start();
          try {
            i.ScoreUpdate();
          } catch (t) {
            if (t instanceof Error) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.ErrorWithStack("AI", 6, "ScoreUpdate执行异常", t, ["ScoreObject", i.constructor.name], ["error", t.message]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AI", 6, "ScoreUpdate执行异常", ["ScoreObject", i.constructor.name], ["error", t]);
            }
          }
          ScoreUpdateManager.wte.Stop();
          this.Pte.set(i, 0);
          o.delete(i);
          e += s;
          ++r;
          if (e >= this.Rte || r >= this.Ute) {
            return;
          }
        }
        this.xte--;
      }
    }
  }
}
(exports.ScoreUpdateManager = ScoreUpdateManager).wte = Stats_1.Stat.Create("ScoreUpdate AiPerception");
//# sourceMappingURL=ScoreUpdateManager.js.map