"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridRoleHeadComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridRoleHeadComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemRole";
  }
  OnRefresh(e) {
    var t = e.RoleConfigId;
    if (t) {
      t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t);
      if (t) {
        const r = this.GetTexture(0);
        var t = t.GetRoleSkinId();
        var i = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(t)?.Card;
        if (i) {
          r.SetUIActive(false);
          this.SetRoleSkinIcon(i, r, t, undefined, () => {
            r.SetUIActive(true);
          });
          this.GetSprite(1).SetUIActive(e.IsLightVisible ?? false);
          this.SetActive(true);
        } else {
          this.SetActive(false);
        }
      } else {
        this.SetActive(false);
      }
    } else {
      this.SetActive(false);
    }
  }
}
exports.MediumItemGridRoleHeadComponent = MediumItemGridRoleHeadComponent;
//# sourceMappingURL=MediumItemGridRoleHeadComponent.js.map