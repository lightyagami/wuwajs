"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonPicItem = undefined;
const ue_1 = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class InstanceDungeonPicItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UITexture]];
  }
  RefreshItem(e) {
    this.TrySetTextureByPath(e, this.GetTexture(0));
  }
}
exports.InstanceDungeonPicItem = InstanceDungeonPicItem;
//# sourceMappingURL=InstanceDungeonPicItem.js.map