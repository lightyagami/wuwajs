"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnKingShipAllAttrShown = exports.LevelConditionOnKingShipFirstAttrShow = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnKingShipFirstAttrShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...t) {
    var [t, r] = t;
    return t === 1 && r;
  }
}
exports.LevelConditionOnKingShipFirstAttrShow = LevelConditionOnKingShipFirstAttrShow;
class LevelConditionOnKingShipAllAttrShown extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...t) {
    var [t] = t;
    return t;
  }
}
exports.LevelConditionOnKingShipAllAttrShown = LevelConditionOnKingShipAllAttrShown;
//# sourceMappingURL=LevelConditionKingShipGuide.js.map