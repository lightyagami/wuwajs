"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemAutoPilotTrackHandle = undefined;
const MarkAutoPilotTrackComponent_1 = require("../Components/MarkAutoPilotTrackComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemAutoPilotTrackHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    var t;
    if (this.ComponentInternal === undefined) {
      t = new MarkAutoPilotTrackComponent_1.MarkAutoPilotTrackComponent();
      this.ComponentInternal = t;
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_AutocruiseMark", this.Context.MarkComponentContainer);
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
  OnSetVisible(t) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(10, t);
  }
  OnApplyModified() {
    var t;
    var e;
    var o = this.Context.MarkItemEntity.ViewLifeCircle;
    if (o.IsChildViewStateDirty(10) && (t = this.GetOrCreateComponent(), this.IsComponentValid(t))) {
      e = o.IsChildViewVisible(10);
      o.SetChildViewVisibleClean(10);
      t.SetActive(e);
    }
  }
}
exports.MarkItemAutoPilotTrackHandle = MarkItemAutoPilotTrackHandle;
//# sourceMappingURL=MarkItemAutoPilotTrackHandle.js.map