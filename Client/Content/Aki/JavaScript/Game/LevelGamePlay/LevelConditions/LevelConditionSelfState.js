"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionSelfState = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const ActorUtils_1 = require("../../Utils/ActorUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionSelfState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, t) {
    if (!e) {
      return false;
    }
    let l = undefined;
    if (r) {
      l = ActorUtils_1.ActorUtils.GetEntityByActor(r);
    }
    return !!(l = t && t.Type === 1 ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId) : l)?.Valid && !!(r = l.Entity.GetComponent(206)) && (t = r.ContainsTagByName(e.State), e.Compare === "Eq" ? t : !t);
  }
}
exports.LevelConditionSelfState = LevelConditionSelfState;
//# sourceMappingURL=LevelConditionSelfState.js.map