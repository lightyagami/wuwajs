"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemTrackHandle = undefined;
const MarkTrackComponent_1 = require("../Components/MarkTrackComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemTrackHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    var e;
    if (this.ComponentInternal === undefined) {
      (e = new MarkTrackComponent_1.MarkTrackComponent()).MapType = this.Context.MarkItem.MapType;
      e.TrackFxScale = this.Context.MarkItem.TrackFxScale;
      this.ComponentInternal = e;
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkTrackNia_Prefab", this.Context.MarkComponentContainer);
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
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(6, e);
  }
  OnApplyModified() {
    var e;
    var t;
    var n = this.Context.MarkItemEntity.ViewLifeCircle;
    if (n.IsChildViewStateDirty(6) && (e = this.GetOrCreateComponent(), this.IsComponentValid(e))) {
      t = n.IsChildViewVisible(6);
      n.SetChildViewVisibleClean(6);
      e.SetActive(t);
    }
  }
}
exports.MarkItemTrackHandle = MarkItemTrackHandle;
//# sourceMappingURL=MarkItemTrackHandle.js.map