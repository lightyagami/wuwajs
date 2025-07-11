"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckOnTrap = undefined;
const puerts_1 = require("puerts");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckOnTrap extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var t;
    var s;
    return !!e.LimitParams && !(e = e.LimitParams.get("TrapState"), !(r = r)) && !!e && (s = (t = false, puerts_1.$ref)(false), r.IsPhysicInteracted(s), t = (0, puerts_1.$unref)(s), e === StringUtils_1.ONE_STRING ? t : !t);
  }
}
exports.LevelConditionCheckOnTrap = LevelConditionCheckOnTrap;
//# sourceMappingURL=LevelConditionCheckOnTrap.js.map