"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetSkillButtonEffect = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetSkillButtonEffect extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(l, e) {
    if (l) {
      var t = l.SkillBtnEffectData;
      let e = 0;
      if ((e = t.Type === "MusicBattleBtnEffect" ? 1 : e) !== 0) {
        if (l.SkillBtnType === 1001) {
          ControllerHolder_1.ControllerHolder.BattleUiControl.PlayConcertoExtraEffect(e, l.Time);
        } else {
          ControllerHolder_1.ControllerHolder.SkillButtonUiController.PlayExtraEffect(l.SkillBtnType, e, l.Time);
        }
      }
    }
  }
}
exports.LevelEventSetSkillButtonEffect = LevelEventSetSkillButtonEffect;
//# sourceMappingURL=LevelEventSetSkillButtonEffect.js.map