"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemGravityReverseIconHandle = undefined;
const MarkGravityReverseIconComponent_1 = require("../Components/MarkGravityReverseIconComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemGravityReverseIconHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkGravityReverseIconComponent_1.MarkGravityReverseIconComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkReverse", this.Context.MarkComponentContainer);
    }
    return this.ComponentInternal;
  }
  GetOrCreateComponent() {
    if (this.ComponentInternal === undefined) {
      this.LoadComponentAsync().then(() => {
        this.ComponentInternal?.GetRootItem()?.SetUIRelativeScale3D(this.Context.MarkItem.CornerScaleVector);
        this.ApplyModified();
      });
    }
    return this.ComponentInternal;
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(9, e);
  }
  OnApplyModified() {
    var e;
    var t;
    var n = this.Context.MarkItemEntity.ViewLifeCircle;
    if (n.IsChildViewStateDirty(9) && (e = this.GetOrCreateComponent(), this.IsComponentValid(e))) {
      t = n.IsChildViewVisible(9);
      n.SetChildViewVisibleClean(9);
      e.Gravity = this.Context.MarkItemEntity.GamePlay.Gravity;
      e.SetActive(t);
    }
  }
}
exports.MarkItemGravityReverseIconHandle = MarkItemGravityReverseIconHandle;
//# sourceMappingURL=MarkItemGravityReverseIconHandle.js.map