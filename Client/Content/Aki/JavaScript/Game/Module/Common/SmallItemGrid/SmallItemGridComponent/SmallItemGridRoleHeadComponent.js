"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridRoleHeadComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridRoleHeadComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite]];
  }
  OnStart() {
    this.qwt();
    this.Gwt();
  }
  GetResourceId() {
    return "UiItem_ItemRoleS";
  }
  OnRefresh(e) {
    if (e) {
      const i = this.GetTexture(0);
      var t = ConfigManager_1.ConfigManager.SkinConfig.GetRoleSkinConfig(e)?.Card;
      if (t) {
        i.SetUIActive(false);
        this.SetRoleSkinIcon(t, i, e, undefined, () => {
          i.SetUIActive(true);
        });
        this.SetActive(true);
      } else {
        this.SetActive(false);
      }
    } else {
      this.SetActive(false);
    }
  }
  qwt() {
    var e = this.GetSprite(2);
    e.SetUIActive(true);
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadSprBgA();
    this.SetSpriteByPath(t, e, false);
  }
  Gwt() {
    var e = this.GetSprite(1);
    e.SetUIActive(true);
    var t = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionHeadLightBgA();
    this.SetSpriteByPath(t, e, false);
  }
}
exports.SmallItemGridRoleHeadComponent = SmallItemGridRoleHeadComponent;
//# sourceMappingURL=SmallItemGridRoleHeadComponent.js.map