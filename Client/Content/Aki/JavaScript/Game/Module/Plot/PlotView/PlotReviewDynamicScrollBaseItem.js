"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotReviewDynamicScrollBaseItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PlotReviewDynamicScrollBaseItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  GetItemSize(e) {
    let s = undefined;
    switch (e.Type) {
      case 0:
        s = 0;
        break;
      case 1:
        s = 1;
    }
    e = this.GetItem(s);
    return new UE.Vector2D(e.GetWidth(), e.GetHeight());
  }
  ClearItem() {}
}
exports.PlotReviewDynamicScrollBaseItem = PlotReviewDynamicScrollBaseItem;
//# sourceMappingURL=PlotReviewDynamicScrollBaseItem.js.map