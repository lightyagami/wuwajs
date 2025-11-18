"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCompareEntityGroupState = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareEntityGroupState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    var t = e.GroupCondition.Count;
    const o = e.GroupCondition.Compare;
    let i = 0;
    e.GroupCondition.Conditions?.forEach(e => {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId);
      let t = true;
      if (e.State !== undefined) {
        var a = r?.Entity?.GetComponent(200);
        if (!a) {
          return;
        }
        a = a.ContainsTagByName(e.State);
        t = o === "Eq" ? a : !a;
      }
      let n = true;
      if (e.IsLocked !== undefined) {
        a = r?.Entity?.GetComponent(134);
        if (!a) {
          return;
        }
        r = e.IsLocked === a.IsLocked;
        n = o === "Eq" ? r : !r;
      }
      if (t && n) {
        ++i;
      }
    });
    return i === t;
  }
}
exports.LevelConditionCompareEntityGroupState = LevelConditionCompareEntityGroupState;
//# sourceMappingURL=LevelConditionCompareEntityGroupState.js.map