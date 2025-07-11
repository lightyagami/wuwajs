"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskMarkItemRangeHandle = undefined;
const MarkRangeImageComponent_1 = require("../Components/MarkRangeImageComponent");
const MarkItemRangeHandle_1 = require("./MarkItemRangeHandle");
class TaskMarkItemRangeHandle extends MarkItemRangeHandle_1.MarkItemRangeHandle {
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkRangeImageComponent_1.MarkRangeImageComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkArea_Prefab", this.Context.MarkParentItem);
    }
    return this.ComponentInternal;
  }
  OnResetRangeComponent(e) {
    super.OnResetRangeComponent(e);
    var a = this.Context.MarkRootItem.GetAnchorOffset();
    e.GetRootItem().SetAnchorOffset(a);
    e.GetRootItem().SetAsFirstHierarchy();
  }
}
exports.TaskMarkItemRangeHandle = TaskMarkItemRangeHandle;
//# sourceMappingURL=TaskMarkItemRangeHandle.js.map