"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEntityHasSceneItemAttributeTag = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityHasSceneItemAttributeTag extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, t) {
    var r = e;
    var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r.EntityId)?.Entity?.GetComponent(209);
    if (a) {
      switch (r.CheckType) {
        case 0:
          return a.HasAllTag(r.Tags);
        case 1:
          return a.HasAnyTag(r.Tags);
        case 2:
          return !a.HasAnyTag(r.Tags);
      }
    }
    return false;
  }
}
exports.LevelConditionCheckEntityHasSceneItemAttributeTag = LevelConditionCheckEntityHasSceneItemAttributeTag;
//# sourceMappingURL=LevelConditionCheckEntityHasSceneItemAttributeTag.js.map