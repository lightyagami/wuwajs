"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskMarkItemRangeHandle = undefined;
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
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
    var a = Vector2D_1.Vector2D.Create(this.Context.MarkItem.UiPosition.X, this.Context.MarkItem.UiPosition.Y);
    e.GetRootItem().SetAnchorOffset(a.ToUeVector2D(true));
    e.GetRootItem().SetAsFirstHierarchy();
  }
}
exports.TaskMarkItemRangeHandle = TaskMarkItemRangeHandle;
//# sourceMappingURL=TaskMarkItemRangeHandle.js.map