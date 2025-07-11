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
    var i;
    if (e === undefined || !(t = ConfigManager_1.ConfigManager.CommonConfig.GetElementConfig(e)) || (n = t.Icon5) === "" || n.length === 0) {
      this.SetActive(false);
    } else {
      i = this.GetTexture(0);
      this.SetElementIcon(n, i, e);
      i.SetColor(UE.Color.FromHex(t.ElementColor));
      this.SetActive(true);
    }
  }
}
exports.MediumItemGridElementComponent = MediumItemGridElementComponent;
//# sourceMappingURL=MediumItemGridElementComponent.js.map