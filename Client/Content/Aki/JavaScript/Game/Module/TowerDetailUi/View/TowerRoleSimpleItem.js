"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerRoleSimpleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class TowerRoleSimpleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  Refresh(e, r, t) {
    var s;
    if (e) {
      this.GetTexture(0).SetUIActive(true);
      s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      this.SetRoleIcon(s.RoleHeadIcon, this.GetTexture(0), e);
    } else {
      this.GetTexture(0).SetUIActive(false);
    }
  }
}
exports.TowerRoleSimpleItem = TowerRoleSimpleItem;
//# sourceMappingURL=TowerRoleSimpleItem.js.map