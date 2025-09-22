"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventOpenQte = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const PanelQteController_1 = require("../../Module/PanelQte/PanelQteController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventOpenQte extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, l) {
    var n = e;
    if (n) {
      let e = false;
      switch (n.Config.Type) {
        case "PanelQte":
          e = this.Uxl(n, t);
          break;
        case "LevelQte":
          e = this.Axl(n, t);
          break;
        default:
          e = false;
      }
      this.FinishExecute(e);
    } else {
      this.FinishExecute(false);
    }
  }
  Uxl(e, t) {
    return e.Config.Type === "PanelQte" && (PanelQteController_1.PanelQteController.StartLevelEventQte(e.Config.Id), true);
  }
  Axl(e, t) {
    return e.Config.Type === "LevelQte" && ((e = this.Dxl(e.Config.LevelQteEntity, t))?.Valid ? (t = e.GetComponent(270)) ? t.StartQte() : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "[LevelEventOpenQte] 实体缺少LevelQte组件"), false) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "[LevelEventOpenQte] 找不到对应的QTE实体"), false));
  }
  Dxl(e, t) {
    let l = undefined;
    switch (e.Type) {
      case "Player":
        l = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
        break;
      case "Triggered":
        if (t instanceof LevelGeneralContextDefine_1.TriggerContext && t.OtherEntityId) {
          l = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t.OtherEntityId)?.Entity;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 39, "[LevelEventOpenQte] context数据异常");
        }
        break;
      case "Self":
        if (t instanceof LevelGeneralContextDefine_1.TriggerContext && t.TriggerEntityId) {
          l = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t.TriggerEntityId)?.Entity;
        } else if (t instanceof LevelGeneralContextDefine_1.EntityContext && t.EntityId) {
          l = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t.EntityId)?.Entity;
        }
        break;
      case "Target":
        l = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e.EntityId)?.Entity;
    }
    return l;
  }
}
exports.LevelEventOpenQte = LevelEventOpenQte;
//# sourceMappingURL=LevelEventOpenQte.js.map