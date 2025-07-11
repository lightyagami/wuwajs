"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEntityCommonTag = undefined;
const UE = require("ue");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityCommonTag extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var t = UE.KismetStringLibrary.Conv_StringToInt64(e.LimitParams.get("CreatureGen"));
    var n = parseInt(e.LimitParams.get("EntityConfigId"));
    var a = e.LimitParams.get("EntityCommonTag");
    var e = new Array();
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(t, e);
    for (const i of e) {
      var o = i.Entity.GetComponent(0);
      if (o.GetPbDataId() === n) {
        if (!i.Entity.GetComponent(196)?.ContainsTagByName(a)) {
          return false;
        }
      }
    }
    return true;
  }
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    let t = false;
    var n = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(e.EntityId);
    if (n &&= EntitySystem_1.EntitySystem.GetComponent(n.Id, 196)) {
      t = n.HasTag(e.TagId);
    }
    if (e.IsContain) {
      return t;
    } else {
      return !t;
    }
  }
}
exports.LevelConditionCheckEntityCommonTag = LevelConditionCheckEntityCommonTag;
//# sourceMappingURL=LevelConditionCheckEntityCommonTag.js.map