"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionEntityState = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionEntityState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    var t;
    return !!e && (e = e, !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId))?.Valid) && !!(t = t.Entity.GetComponent(208)) && (t = t.ContainsTagByName(e.State), e.Compare === "Eq" ? t : !t);
  }
}
exports.LevelConditionEntityState = LevelConditionEntityState;
//# sourceMappingURL=LevelConditionEntityState.js.map