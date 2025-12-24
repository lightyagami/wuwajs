"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QteCooperationHandler = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController");
class QteCooperationHandler {
  Trigger(e, r) {
    if (!r.IsMyRole()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneTeam", 48, "上场角色为其他玩家的角色", ["CreatureDataId", r.GetCreatureDataId()]);
      }
      SceneTeamController_1.SceneTeamController.TryUseMultiQte(r.EntityHandle);
      return true;
    }
    var e = e.EntityHandle;
    var r = r.EntityHandle;
    var o = e.Entity.GetComponent(104);
    var t = r.Entity.GetComponent(104);
    var n = e.Entity.GetComponent(215);
    if (!o || !t) {
      return false;
    }
    var a = t.GetQteTagData();
    if (!a) {
      return false;
    }
    let l = false;
    if (!n.HasAnyTag([504239013, 855966206]) && t.IsQteReady(e)) {
      o.UseExitSkill(r);
      l = t.ExecuteQte(e);
    }
    return !(l ? a.ChangeRoleOnQte : a.ChangeRole);
  }
  Clear() {}
}
exports.QteCooperationHandler = QteCooperationHandler;
//# sourceMappingURL=QteCooperationHandler.js.map