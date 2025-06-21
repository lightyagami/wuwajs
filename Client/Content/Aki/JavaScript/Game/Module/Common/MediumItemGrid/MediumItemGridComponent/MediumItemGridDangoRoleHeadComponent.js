"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MediumItemGridDangoRoleHeadComponent = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridDangoRoleHeadComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite]
    ]
  }
  GetResourceId() {
    return "UiItem_ItemRole"
  }
  OnRefresh(e) {
    var t, e = e.DangoConfigId;
    e && !(e <= 0) && (e = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoRoleById(e)) ? (t = this.GetTexture(0), this.SetTextureByPath(e.Icon, t), this.GetSprite(1).SetUIActive(!1), this.SetUiActive(!0)) : this.SetUiActive(!1)
  }
}
exports.MediumItemGridDangoRoleHeadComponent = MediumItemGridDangoRoleHeadComponent;
//# sourceMappingURL=MediumItemGridDangoRoleHeadComponent.js.map