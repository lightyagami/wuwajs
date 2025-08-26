"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridSubIconComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridSubIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemAIcon";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  OnRefresh(e) {
    var t = !!e;
    this.SetActive(t);
    if (t) {
      this.SetTextureShowUntilLoaded(e, this.GetTexture(0));
    }
  }
  GetLayoutLevel() {
    return 2;
  }
}
exports.MediumItemGridSubIconComponent = MediumItemGridSubIconComponent;
//# sourceMappingURL=MediumItemGridSubIconComponent.js.map