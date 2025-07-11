"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerTeamRoleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class BabelTowerTeamRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UITexture]];
  }
  Refresh(e, r, t) {
    var s;
    if (e === 0) {
      this.GetTexture(2).SetUIActive(false);
    } else {
      this.GetTexture(2).SetUIActive(true);
      s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      this.SetRoleIcon(s.RoleHeadIconCircle, this.GetTexture(2), e);
    }
  }
}
exports.BabelTowerTeamRoleItem = BabelTowerTeamRoleItem;
//# sourceMappingURL=BabelTowerTeamRoleItem.js.map