"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckRogueAbilitySelect = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckRogueAbilitySelect extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    var a;
    var l;
    return !!e && (a = (e = e).IsReceived, l = ModelManager_1.ModelManager.RoguelikeModel.CurRoomCount, (e = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(e.BoardId)) && e.Layer === l ? a ? e.IsSelect : !e.IsSelect : a);
  }
}
exports.LevelConditionCheckRogueAbilitySelect = LevelConditionCheckRogueAbilitySelect;
//# sourceMappingURL=LevelConditionCheckRogueAbilitySelect.js.map