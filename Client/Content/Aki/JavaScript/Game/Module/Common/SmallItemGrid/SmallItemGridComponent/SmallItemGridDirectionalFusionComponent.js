"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridDirectionalFusionComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridDirectionalFusionComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  GetResourceId() {
    return "UiItem_ItemIconTag";
  }
  OnRefresh(e) {
    var t;
    if (e === undefined || e < 0) {
      this.SetActive(false);
    } else {
      t = this.GetTexture(0);
      if (e) {
        if (!(e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e)) || (e = e.FetterElementPath) === "" || e.length === 0) {
          this.SetActive(false);
        } else {
          this.SetTextureByPath(e, t);
          this.SetActive(true);
        }
      } else {
        e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_IconElementAttriNone");
        this.SetTextureByPath(e, t);
        this.SetActive(true);
      }
    }
  }
}
exports.SmallItemGridDirectionalFusionComponent = SmallItemGridDirectionalFusionComponent;
//# sourceMappingURL=SmallItemGridDirectionalFusionComponent.js.map