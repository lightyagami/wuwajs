"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckAiState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckAiState extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, o, n) {
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 29, "参数不合法");
      }
      return false;
    }
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 29, "上下文不合法");
      }
      return false;
    }
    n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n.EntityId);
    if (!n?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 29, "对象Entity不合法");
      }
      return false;
    }
    var i = n.Entity.GetComponent(205);
    let r = false;
    switch (e.StateType) {
      case ICondition_1.EAiStateType.AnimalRandomAction:
        r = i?.HasTag(502364103) || false;
        break;
      case ICondition_1.EAiStateType.AnimalStandUp:
        r = i?.HasTag(1900394806) || i?.HasTag(379545977) || false;
        break;
      case ICondition_1.EAiStateType.AnimalSitDown:
        r = i?.HasTag(393622611) || i?.HasTag(276015887) || false;
    }
    if (e.Compare === "Eq") {
      return r;
    } else {
      return !r;
    }
  }
}
exports.LevelConditionCheckAiState = LevelConditionCheckAiState;
//# sourceMappingURL=LevelConditionCheckAiState.js.map