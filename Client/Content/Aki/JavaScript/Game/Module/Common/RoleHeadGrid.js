"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleHeadGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class RoleHeadGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.dFe = 0;
    this.CreateThenShowByActor(e);
  }
  get Lo() {
    if (this.dFe) {
      return ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.dFe);
    } else {
      return undefined;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  fbt() {
    var e;
    var i = this.Lo;
    if (i && (e = this.GetTexture(0)) && (i = i.RoleHeadIconBig) !== "") {
      this.SetRoleIcon(i, e, this.dFe);
    }
  }
  Refresh(e) {
    this.dFe = e;
    this.fbt();
  }
}
exports.RoleHeadGrid = RoleHeadGrid;
//# sourceMappingURL=RoleHeadGrid.js.map