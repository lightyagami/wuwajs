"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTaskDynamicItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
class ActivityRegressTaskDynamicItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetItemSize(e) {
    if (e.ItemType === 1) {
      const s = this.GetItem(0);
      return new UE.Vector2D(s.GetWidth(), s.GetHeight());
    }
    const s = this.GetItem(1);
    return new UE.Vector2D(s.GetWidth(), s.GetHeight());
  }
  ClearItem() {}
}
exports.ActivityRegressTaskDynamicItem = ActivityRegressTaskDynamicItem;
//# sourceMappingURL=ActivityRegressTaskDynamicItem.js.map