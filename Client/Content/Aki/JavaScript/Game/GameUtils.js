"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameUtils = undefined;
const ImmutableArray_1 = require("../Core/Container/ImmutableArray");
const ImmutableMap_1 = require("../Core/Container/ImmutableMap");
const TimerSystem_1 = require("../Core/Timer/TimerSystem");
class GameUtils {
  static async WaitFrame() {
    return new Promise(e => {
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        e();
      });
    });
  }
  static ConvertToArray(t, r, a = undefined) {
    if (t === 0) {
      return this.u_i;
    }
    this.xpl.length = t;
    var i = Array.from(this.xpl, this.Ppl);
    for (let e = 0; e < t; e++) {
      i[e] = r.call(a, e);
    }
    return i;
  }
  static ConvertToMap(t, r, a, i = undefined) {
    if (t === 0) {
      return this.eza;
    }
    var s = new Map();
    for (let e = 0; e < t; e++) {
      s.set(r.call(i, e), a.call(i, e));
    }
    return s;
  }
  static InternalizedString(e) {}
}
(exports.GameUtils = GameUtils).u_i = new ImmutableArray_1.ImmutableArray();
GameUtils.eza = new ImmutableMap_1.ImmutableMap();
GameUtils.IsOptimizeDbString = true;
GameUtils.Ppl = () => 0;
GameUtils.xpl = {
  length: 0
}; //# sourceMappingURL=GameUtils.js.map