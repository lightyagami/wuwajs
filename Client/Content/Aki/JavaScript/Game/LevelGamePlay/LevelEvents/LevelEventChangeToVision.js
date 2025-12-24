"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventChangeToVision = undefined;
const Global_1 = require("../../Global");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventChangeToVision extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    var s;
    if (e && ((s = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity).GetComponent(3).ClearInput(), s.GetComponent(215)?.AddTag(-1697149502), s = s.GetComponent(41))) {
      s.EndOwnerAndFollowSkills();
      s.BeginSkillAsync(e.Id, {
        Reason: "LevelEventChangeToVision.ExecuteNew"
      });
    }
  }
}
exports.LevelEventChangeToVision = LevelEventChangeToVision;
//# sourceMappingURL=LevelEventChangeToVision.js.map