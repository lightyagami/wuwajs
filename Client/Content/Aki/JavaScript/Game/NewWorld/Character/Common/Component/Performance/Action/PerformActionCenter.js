"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformActionPool = undefined;
const PerformPlayMontage_1 = require("./PerformPlayMontage");
const PerformStopMontage_1 = require("./PerformStopMontage");
const PerformSwitchState_1 = require("./PerformSwitchState");
const PerformTurn_1 = require("./PerformTurn");
const actionClasses = {
  [0]: PerformPlayMontage_1.PerformPlayMontage,
  1: PerformStopMontage_1.PerformStopMontage,
  2: PerformTurn_1.PerformTurn,
  3: PerformSwitchState_1.PerformSwitchState
};
class PerformActionPool {
  static GetAction(r, t, e, o, i, s, a) {
    let n = undefined;
    (n = this.RUe[r] && this.RUe[r].length > 0 ? this.RUe[r].pop() : new actionClasses[r](r)).Id = t;
    n.Param = e;
    n.PerformComp = o;
    n.OnFinish = i;
    n.OnBeforeExecute = s;
    n.OnAfterExecute = a;
    return n;
  }
  static ReturnAction(r) {
    r.Reset();
    var t = r.Name;
    this.RUe[t] ||= [];
    this.RUe[t].push(r);
  }
  static Clear() {
    this.RUe = {};
  }
}
(exports.PerformActionPool = PerformActionPool).RUe = {};
//# sourceMappingURL=PerformActionCenter.js.map