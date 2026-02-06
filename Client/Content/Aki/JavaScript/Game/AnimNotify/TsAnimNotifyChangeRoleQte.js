"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
const PanelQteController_1 = require("../Module/PanelQte/PanelQteController");
class TsAnimNotifyChangeRoleQte extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.QteId = 0;
    this.QteDistance = 0;
  }
  Constructor() {}
  K2_Notify(r, t) {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
      if (o?.EntityHandle?.Entity?.GetComponent(217)?.HasTag(-1697149502)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PanelQte", 17, "当前角色不能下场，不触发换人QTE");
        }
      } else {
        if (this.QteDistance > 0) {
          var a = r.GetOwner()?.D_K2_GetActorLocation();
          var n = o?.EntityHandle?.Entity?.GetComponent(3).ActorLocationProxy;
          if (!a || !n) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("PanelQte", 17, "读取不到坐标，不触发换人QTE");
            }
            return true;
          }
          if (Math.pow(a.X - n.X, 2) + Math.pow(a.Y - n.Y, 2) + Math.pow(a.Z - n.Z, 2) > this.QteDistance * this.QteDistance) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("PanelQte", 17, "距离太远，不触发换人QTE");
            }
            return true;
          }
        }
        let e = undefined;
        a = r.GetOwner();
        if (a instanceof TsBaseCharacter_1.default) {
          n = a?.CharacterActorComponent?.Entity;
          e = n?.GetComponent(222).CreateAnimNotifyContent(t.GetName(), this.exportIndex);
        }
        for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          if (s.GetCreatureDataId() !== o?.GetCreatureDataId() && s.CanGoBattle() === 0) {
            PanelQteController_1.PanelQteController.StartAnimNotifyQte(this.QteId, r, e);
            return true;
          }
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("PanelQte", 17, "没有后台角色能上场，不触发换人QTE");
        }
      }
    }
    return true;
  }
  GetNotifyName() {
    return "换人QTE";
  }
}
exports.default = TsAnimNotifyChangeRoleQte;
//# sourceMappingURL=TsAnimNotifyChangeRoleQte.js.map