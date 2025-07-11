"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridVisionRoleHeadComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridVisionRoleHeadComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemRoleS";
  }
  OnRefresh(e) {
    if (e) {
      var t = e;
      if (t && t !== 0) {
        const r = this.GetTexture(0);
        var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t)?.Card;
        if (i) {
          r.SetUIActive(false);
          this.SetRoleIcon(i, r, t, undefined, () => {
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
  qwt(e) {
    this.GetSprite(2).SetUIActive(false);
  }
  Gwt(e) {
    this.GetSprite(1).SetUIActive(true);
  }
}
exports.SmallItemGridVisionRoleHeadComponent = SmallItemGridVisionRoleHeadComponent;
//# sourceMappingURL=SmallItemGridVisionRoleHeadComponent.js.map