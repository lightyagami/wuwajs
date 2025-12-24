"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckGamePlayTag = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckGamePlayTag extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    var l;
    var r;
    return !!e && !!(l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity) && !!(l = l.GetComponent(215)) && (r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.GameplayTag), e.Compare === "Eq" && !!l.HasTag(r) || e.Compare === "Ne" && !l.HasTag(r));
  }
}
exports.LevelConditionCheckGamePlayTag = LevelConditionCheckGamePlayTag;
//# sourceMappingURL=LevelConditionCheckGamePlayTag.js.map