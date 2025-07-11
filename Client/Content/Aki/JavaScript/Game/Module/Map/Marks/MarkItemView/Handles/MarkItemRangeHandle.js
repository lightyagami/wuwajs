"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemRangeHandle = undefined;
const MarkRangeImageComponent_1 = require("../Components/MarkRangeImageComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemRangeHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkRangeImageComponent_1.MarkRangeImageComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkArea_Prefab", this.Context.MarkComponentContainer);
    }
    return this.ComponentInternal;
  }
  GetOrCreateComponent() {
    if (this.ComponentInternal === undefined) {
      this.LoadComponentAsync().then(() => {
        this.ApplyModified();
      });
    }
    return this.ComponentInternal;
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(2, e);
  }
  OnApplyModified() {
    var e;
    var t;
    var n = this.Context.MarkItemEntity.ViewLifeCircle;
    if (n.IsChildViewStateDirty(2) && (e = this.GetOrCreateComponent(), this.IsComponentValid(e))) {
      t = n.IsChildViewVisible(2);
      n.SetChildViewVisibleClean(2);
      this.ResetRangeComponent(e);
      e.SetActive(t);
    }
  }
  ResetRangeComponent(e) {
    var t = this.Context.MarkItemEntity.GetComponent(11).RangeSize;
    e.RangeArea?.SetWidth(t * 2);
    e.RangeArea?.SetHeight(t * 2);
    e.RangeImage?.SetWidth(t * 2);
    e.RangeImage?.SetHeight(t * 2);
    this.OnResetRangeComponent(e);
  }
  OnResetRangeComponent(e) {}
}
exports.MarkItemRangeHandle = MarkItemRangeHandle;
//# sourceMappingURL=MarkItemRangeHandle.js.map