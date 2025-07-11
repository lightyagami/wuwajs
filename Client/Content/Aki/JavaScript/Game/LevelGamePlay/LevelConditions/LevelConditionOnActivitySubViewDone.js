"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnActivitySubViewDone = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnActivitySubViewDone extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t, ...i) {
    e = e.LimitParams.get("ActivityId");
    return e !== undefined && Number(e) === i[0];
  }
}
exports.LevelConditionOnActivitySubViewDone = LevelConditionOnActivitySubViewDone;
//# sourceMappingURL=LevelConditionOnActivitySubViewDone.js.map