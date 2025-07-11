"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridCheckTickComponent = undefined;
const UE = require("ue");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCheckTickComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite]];
  }
  GetResourceId() {
    return "UiItem_ItemSelTick";
  }
  OnRefresh(e) {
    var t = e.IsCheckTick;
    if (t !== undefined && (this.SetActive(t), (t = e.HexColor) !== undefined && this.SetSpriteColor(t), (t = e.Alpha) !== undefined && this.SetSpriteAlpha(t), (t = e.TickHexColor) !== undefined)) {
      this.SetSpriteTickColor(t);
    }
  }
  SetSpriteColor(e) {
    e = UE.Color.FromHex(e);
    this.GetSprite(0).SetColor(e);
  }
  SetSpriteAlpha(e) {
    this.GetSprite(0).SetAlpha(e);
  }
  SetSpriteTickColor(e) {
    e = UE.Color.FromHex(e);
    this.GetSprite(1).SetColor(e);
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.MediumItemGridCheckTickComponent = MediumItemGridCheckTickComponent;
//# sourceMappingURL=MediumItemGridCheckTickComponent.js.map