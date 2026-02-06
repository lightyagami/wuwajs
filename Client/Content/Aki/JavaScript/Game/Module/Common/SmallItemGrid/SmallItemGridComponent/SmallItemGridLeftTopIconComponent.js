"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmallItemGridLeftTopIconComponent = undefined;
const UE = require("ue");
const SmallItemGridComponent_1 = require("./SmallItemGridComponent");
class SmallItemGridLeftTopIconComponent extends SmallItemGridComponent_1.SmallItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_AddtionIcon";
  }
  OnRefresh(e) {
    this.SetSpriteByPath(e, this.GetSprite(0), false);
    this.SetActive(true);
  }
}
exports.SmallItemGridLeftTopIconComponent = SmallItemGridLeftTopIconComponent;
//# sourceMappingURL=SmallItemGridLeftTopIconComponent.js.map