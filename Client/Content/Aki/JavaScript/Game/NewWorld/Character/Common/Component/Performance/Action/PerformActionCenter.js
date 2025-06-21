"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PerformActionPool = void 0;
const PerformPlayMontage_1 = require("./PerformPlayMontage"),
  PerformStopMontage_1 = require("./PerformStopMontage"),
  PerformSwitchState_1 = require("./PerformSwitchState"),
  PerformTurn_1 = require("./PerformTurn"),
  actionClasses = {
    [0]: PerformPlayMontage_1.PerformPlayMontage,
    1: PerformStopMontage_1.PerformStopMontage,
    2: PerformTurn_1.PerformTurn,
    3: PerformSwitchState_1.PerformSwitchState
  };
class PerformActionPool {
  static GetAction(r, t, e, o, i, s, a) {
    let n = void 0;
    return (n = this.RUe[r] && 0 < this.RUe[r].length ? this.RUe[r].pop() : new actionClasses[r](r)).Id = t, n.Param = e, n.PerformComp = o, n.OnFinish = i, n.OnBeforeExecute = s, n.OnAfterExecute = a, n
  }
  static ReturnAction(r) {
    r.Reset();
    var t = r.Name;
    this.RUe[t] || (this.RUe[t] = []), this.RUe[t].push(r)
  }
  static Clear() {
    this.RUe = {}
  }
}(exports.PerformActionPool = PerformActionPool).RUe = {};
//# sourceMappingURL=PerformActionCenter.js.map