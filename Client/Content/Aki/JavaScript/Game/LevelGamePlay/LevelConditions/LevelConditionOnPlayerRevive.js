"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnPlayerRevive = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnPlayerRevive extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...l) {
    var s = l[0];
    var n = l[1];
    var v = l[2];
    var l = l[3];
    return s && n === 1 && v === 1 && l === 2;
  }
}
exports.LevelConditionOnPlayerRevive = LevelConditionOnPlayerRevive;
//# sourceMappingURL=LevelConditionOnPlayerRevive.js.map