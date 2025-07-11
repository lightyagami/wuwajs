"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBootPlotDynamicItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBootPlotDynamicItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  GetItemSize(e) {
    if (e.NodeText) {
      const t = this.GetItem(2);
      return new UE.Vector2D(t.GetWidth(), t.GetHeight());
    }
    if (e.TalkOption) {
      const t = this.GetItem(1);
      return new UE.Vector2D(t.GetWidth(), t.GetHeight());
    }
    if (e.OptionTalker) {
      const t = this.GetItem(3);
      return new UE.Vector2D(t.GetWidth(), t.GetHeight());
    }
    const t = this.GetItem(0);
    return new UE.Vector2D(t.GetWidth(), t.GetHeight());
  }
  ClearItem() {}
}
exports.HandBootPlotDynamicItem = HandBootPlotDynamicItem;
//# sourceMappingURL=HandBootPlotDynamicItem.js.map