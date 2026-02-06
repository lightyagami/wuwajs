"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionHasBuff = undefined;
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionHasBuff extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    if (!e) {
      return false;
    }
    var l = e.BuffId;
    var t = Global_1.Global.BaseCharacter;
    if (!t) {
      return false;
    }
    var t = t.CharacterActorComponent.Entity;
    var a = t.CheckGetComponent(185);
    if (!a) {
      return false;
    }
    let s = a.GetBuffTotalStackById(l) > 0;
    a = t.CheckGetComponent(202);
    if (a) {
      s ||= (a.GetFormationBuffComp()?.GetBuffTotalStackById(l) ?? 0) > 0;
    }
    if (e.Compare === "Eq") {
      return s;
    } else {
      return !s;
    }
  }
}
exports.LevelConditionHasBuff = LevelConditionHasBuff;
//# sourceMappingURL=LevelConditionHasBuff.js.map