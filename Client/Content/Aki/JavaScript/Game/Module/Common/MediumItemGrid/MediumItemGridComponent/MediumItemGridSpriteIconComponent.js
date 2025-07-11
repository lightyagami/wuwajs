"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridSpriteIconComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridSpriteIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemSprite";
  }
  OnRefresh(e) {
    var t;
    if (e === undefined || e === "") {
      this.SetActive(false);
    } else {
      t = this.GetSprite(0);
      this.SetSpriteByPath(e, t, false);
      this.SetActive(true);
    }
  }
}
exports.MediumItemGridSpriteIconComponent = MediumItemGridSpriteIconComponent;
//# sourceMappingURL=MediumItemGridSpriteIconComponent.js.map