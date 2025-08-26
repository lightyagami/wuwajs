"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckAnimalParts = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckAnimalParts extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, o, r) {
    var n = e;
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 39, "参数不合法");
      }
      return false;
    }
    let a = undefined;
    if (n.TargetAnimal) {
      a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n.TargetAnimal);
    } else {
      if (r?.Type !== 1 || !r.EntityId) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 39, "找不到对应的实体id");
        }
        return false;
      }
      a = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r.EntityId);
    }
    if (!a?.Valid) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 39, "对象Entity不合法");
      }
      return false;
    }
    var i = a.Entity.GetComponent(172);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 39, "对象Entity缺少AnimalPerformComponent");
      }
      return false;
    }
    let t = false;
    switch (n.CheckType) {
      case 0:
        t = true;
        for (const l of n.Slots) {
          if (!(t &&= i.GetIsPartShow(l))) {
            break;
          }
        }
        break;
      case 1:
        t = false;
        for (const s of n.Slots) {
          if (t ||= i.GetIsPartShow(s)) {
            break;
          }
        }
        break;
      case 2:
        t = true;
        for (const L of n.Slots) {
          if (!(t &&= !i.GetIsPartShow(L))) {
            break;
          }
        }
    }
    return t;
  }
}
exports.LevelConditionCheckAnimalParts = LevelConditionCheckAnimalParts;
//# sourceMappingURL=LevelConditionCheckAnimalParts.js.map