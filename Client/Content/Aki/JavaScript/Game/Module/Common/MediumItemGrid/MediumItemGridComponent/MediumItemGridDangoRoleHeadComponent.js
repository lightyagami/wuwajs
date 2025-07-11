"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridDangoRoleHeadComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridDangoRoleHeadComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemRole";
  }
  OnRefresh(e) {
    var t;
    var e = e.DangoConfigId;
    if (e && !(e <= 0) && (e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(e))) {
      t = this.GetTexture(0);
      this.SetTextureByPath(e.Icon, t);
      this.GetSprite(1).SetUIActive(false);
      this.SetUiActive(true);
    } else {
      this.SetUiActive(false);
    }
  }
}
exports.MediumItemGridDangoRoleHeadComponent = MediumItemGridDangoRoleHeadComponent;
//# sourceMappingURL=MediumItemGridDangoRoleHeadComponent.js.map