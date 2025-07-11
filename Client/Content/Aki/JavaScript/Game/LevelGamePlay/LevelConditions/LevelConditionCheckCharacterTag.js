"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckCharacterTag = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckCharacterTag extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r;
    return !!e.LimitParams && !!(e = e.LimitParams.get("Tag")) && !!(r = (r = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) && r.Entity.GetComponent(205)) && r.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e));
  }
  CheckNew(e, a) {
    if (!e) {
      return false;
    }
    let r = false;
    var l = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (l &&= l.Entity.GetComponent(205)) {
      r = l.HasTag(e.TagId);
    }
    if (e.IsContain) {
      return r;
    } else {
      return !r;
    }
  }
}
exports.LevelConditionCheckCharacterTag = LevelConditionCheckCharacterTag;
//# sourceMappingURL=LevelConditionCheckCharacterTag.js.map