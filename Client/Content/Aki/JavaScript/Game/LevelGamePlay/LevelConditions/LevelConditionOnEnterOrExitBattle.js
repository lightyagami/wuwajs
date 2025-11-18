"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnEnterOrExitBattle = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnEnterOrExitBattle extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t, ...r) {
    return !!e.LimitParams && !!(e = e.LimitParams.get("CheckValue")) && ([r] = r, r === (e === "TRUE"));
  }
}
exports.LevelConditionOnEnterOrExitBattle = LevelConditionOnEnterOrExitBattle;
//# sourceMappingURL=LevelConditionOnEnterOrExitBattle.js.map