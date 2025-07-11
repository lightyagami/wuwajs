"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickNavigateDynamicItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class QuickNavigateDynamicItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  GetItemSize(e) {
    if (e.ItemType === 0) {
      const t = this.GetItem(0);
      return new UE.Vector2D(t.GetWidth(), t.GetHeight());
    }
    const t = this.GetItem(1);
    return new UE.Vector2D(t.GetWidth(), t.GetHeight());
  }
  ClearItem() {}
}
exports.QuickNavigateDynamicItem = QuickNavigateDynamicItem;
//# sourceMappingURL=QuickNavigateDynamicItem.js.map