"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTeleControlState = undefined;
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeleControlState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    var n = e;
    var e = undefined;
    if (!(e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n.EntityId))?.Valid) {
      return false;
    }
    e = e.Entity.GetComponent(157);
    if (!e) {
      return false;
    }
    let o = false;
    switch (e.GetState()) {
      case 4:
        o = n.State === ICondition_1.ETeleControlState.Hold;
        break;
      case 11:
        o = n.State === ICondition_1.ETeleControlState.LetGo;
        break;
      case 6:
      case 9:
      case 8:
      case 7:
        o = n.State === ICondition_1.ETeleControlState.Throwing;
    }
    return o;
  }
}
exports.LevelConditionCheckTeleControlState = LevelConditionCheckTeleControlState;
//# sourceMappingURL=LevelConditionCheckTeleControlState.js.map