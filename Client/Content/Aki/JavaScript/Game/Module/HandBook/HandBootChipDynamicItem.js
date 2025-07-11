"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBootChipDynamicItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class HandBootChipDynamicItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetItemSize(e) {
    if (e.HandBookChipConfigId) {
      const t = this.GetItem(1);
      return new UE.Vector2D(t.GetWidth(), t.GetHeight());
    }
    const t = this.GetItem(0);
    return new UE.Vector2D(t.GetWidth(), t.GetHeight());
  }
  ClearItem() {}
}
exports.HandBootChipDynamicItem = HandBootChipDynamicItem;
//# sourceMappingURL=HandBootChipDynamicItem.js.map