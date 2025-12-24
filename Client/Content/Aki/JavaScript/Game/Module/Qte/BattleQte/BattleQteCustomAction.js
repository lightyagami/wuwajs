"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.battleQteChangeRole = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CooperationController_1 = require("../../Battle/Cooperation/CooperationController");
function battleQteChangeRole(r) {
  var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
  if (!e?.EntityHandle?.Entity?.GetComponent(215)?.HasTag(-1697149502)) {
    var a = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
    var n = a.length;
    var t = a.indexOf(e);
    for (let o = 1; o < n; o++) {
      let e = t + o;
      if (e >= n) {
        e -= n;
      }
      var i = a[e];
      if (r) {
        if (ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(i.GetConfigId) !== r) {
          continue;
        }
      }
      if (i?.CanGoBattle() === 0) {
        CooperationController_1.CooperationController.TryCooperate(i.GetCreatureDataId());
        return;
      }
    }
  }
}
exports.battleQteChangeRole = battleQteChangeRole;
//# sourceMappingURL=BattleQteCustomAction.js.map