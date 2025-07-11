"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneTeamCooperationHandler = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const SceneTeamController_1 = require("../../../SceneTeam/SceneTeamController");
const SceneTeamDefine_1 = require("../../../SceneTeam/SceneTeamDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
class SceneTeamCooperationHandler {
  Trigger(e, r) {
    var o = r.EntityHandle;
    var n = o.Entity.GetComponent(98).IsInQte;
    var o = o.Entity.CheckGetComponent(93).IsChangeRoleCoolDown();
    if (!n) {
      if (o) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamInCD");
        return false;
      }
      n = e.EntityHandle.Entity.GetComponent(205);
      if (n.HasTag(-2044964178) && n.HasAnyTag(SceneTeamDefine_1.beHitTagList)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneTeam", 48, "被击硬直时间无法换人", ["roleId", e.GetConfigId]);
        }
        return false;
      }
    }
    SceneTeamController_1.SceneTeamController.RequestChangeRole(r.GetCreatureDataId(), {
      FilterSameRole: true,
      GoDownWaitSkillEnd: true,
      ForceInheritTransform: false
    });
    return true;
  }
  Clear() {}
}
exports.SceneTeamCooperationHandler = SceneTeamCooperationHandler;
//# sourceMappingURL=SceneTeamCooperationHandler.js.map