"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridVisionRoleHeadComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridVisionRoleHeadComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemRole";
  }
  OnRefresh(e) {
    var i = e.RoleConfigId;
    if (i) {
      i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
      if (i) {
        const r = this.GetTexture(0);
        var i = i.GetRoleSkinId();
        var t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(i)?.Card;
        if (t) {
          r.SetUIActive(false);
          this.SetRoleSkinIcon(t, r, i, undefined, () => {
            r.SetUIActive(true);
          });
          this.qwt(e);
          this.Gwt(e);
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
  qwt(i) {
    i = i.VisionUniqueId;
    if (ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i)) {
      i = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i);
      let e = "";
      e = i ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadSprBgB() : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadSprBgA();
      this.SetSpriteByPath(e, this.GetSprite(2), false);
    }
    this.GetSprite(2).SetUIActive(true);
  }
  Gwt(i) {
    i = i.VisionUniqueId;
    if (ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i)) {
      i = ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsMain(i);
      let e = "";
      e = i ? ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadLightBgB() : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadLightBgA();
      this.SetSpriteByPath(e, this.GetSprite(1), false);
    }
    this.GetSprite(1).SetUIActive(true);
  }
}
exports.MediumItemGridVisionRoleHeadComponent = MediumItemGridVisionRoleHeadComponent;
//# sourceMappingURL=MediumItemGridVisionRoleHeadComponent.js.map