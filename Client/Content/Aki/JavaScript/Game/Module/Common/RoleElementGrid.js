"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleElementGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class RoleElementGrid extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.ZIt = 0;
    this.CreateThenShowByActor(e);
  }
  get Lo() {
    if (this.ZIt) {
      return ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(this.ZIt);
    } else {
      return undefined;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite]];
  }
  gbt() {
    var e;
    var t;
    var i = this.GetTexture(0);
    var s = this.GetSprite(1);
    if (i && s && (e = this.Lo) && (t = e.ElementColor, t = UE.Color.FromHex(t), s.SetColor(t), (s = e.Icon) !== "") && s.length !== 0) {
      this.SetElementIcon(s, i, this.ZIt);
    }
  }
  Refresh(e) {
    this.ZIt = e;
    this.gbt();
  }
}
exports.RoleElementGrid = RoleElementGrid;
//# sourceMappingURL=RoleElementGrid.js.map