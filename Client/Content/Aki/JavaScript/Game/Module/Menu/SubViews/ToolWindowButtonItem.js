"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolWindowButtonItem = undefined;
const UE = require("ue");
const ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem");
class ToolWindowButtonItem extends ButtonAndTextItem_1.ButtonAndTextItem {
  OnRegisterComponent() {
    super.OnRegisterComponent();
    this.ComponentRegisterInfos.push([2, UE.UISprite]);
  }
  OnStart() {
    this.SetIconVisible(false);
  }
  RefreshIcon(t, e) {
    this.SetSpriteByPath(t, this.GetSprite(2), false, undefined, e);
  }
  SetIconVisible(t) {
    this.GetSprite(2).SetUIActive(t);
  }
}
exports.ToolWindowButtonItem = ToolWindowButtonItem;
//# sourceMappingURL=ToolWindowButtonItem.js.map