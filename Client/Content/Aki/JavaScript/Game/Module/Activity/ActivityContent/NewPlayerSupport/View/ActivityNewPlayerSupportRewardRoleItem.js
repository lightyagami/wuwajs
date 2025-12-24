"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityNewPlayerSupportRewardRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleUtils_1 = require("../../../../RoleUi/RoleUtils");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
class ActivityNewPlayerSupportRewardRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite]];
  }
  Refresh(e, r, t) {
    var e = ConfigManager_1.ConfigManager.TrialRoleConfig?.GetTrialRoleConfig(e);
    var i = e.ParentId;
    var o = this.GetTexture(0);
    var s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i).Card;
    this.SetRoleIcon(s, o, i);
    var s = RoleUtils_1.RoleUtils.GetTrialRoleLabelIconByType(e.Type);
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    this.SetSpriteByPath(o, this.GetSprite(1), false);
  }
}
exports.ActivityNewPlayerSupportRewardRoleItem = ActivityNewPlayerSupportRewardRoleItem;
//# sourceMappingURL=ActivityNewPlayerSupportRewardRoleItem.js.map