"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckUIShowDone = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckUIShowDone extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, o, ...s) {
    return !(s.length < 1) && !(s = s[0], !(e = e.LimitParams.get("UIName"))) && s === e;
  }
}
exports.LevelConditionCheckUIShowDone = LevelConditionCheckUIShowDone;
//# sourceMappingURL=LevelConditionCheckUIShowDone.js.map