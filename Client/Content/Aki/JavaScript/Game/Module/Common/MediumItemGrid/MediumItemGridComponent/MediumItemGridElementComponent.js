"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridElementComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridElementComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  GetResourceId() {
    return "UiItem_ItemElement";
  }
  OnRefresh(e) {
    var t;
    var n;
    if (e === undefined || !(e = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) || (t = e.Icon5) === "" || t.length === 0) {
      this.SetActive(false);
    } else {
      n = this.GetTexture(0);
      this.SetTextureShowUntilLoaded(t, n);
      n.SetColor(UE.Color.FromHex(e.ElementColor));
      this.SetActive(true);
    }
  }
}
exports.MediumItemGridElementComponent = MediumItemGridElementComponent;
//# sourceMappingURL=MediumItemGridElementComponent.js.map