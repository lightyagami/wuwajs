"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnChangeBossRushBuff = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnChangeBossRushBuff extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s, ...n) {
    e = e.LimitParams.get("Tab");
    return e !== undefined && n[0] === e;
  }
}
exports.LevelConditionOnChangeBossRushBuff = LevelConditionOnChangeBossRushBuff;
//# sourceMappingURL=LevelConditionOnChangeBossRushBuff.js.map