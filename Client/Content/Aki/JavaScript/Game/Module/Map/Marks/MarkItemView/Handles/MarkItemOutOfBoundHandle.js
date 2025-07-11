"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemOutOfBoundHandle = undefined;
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MarkOutOfBoundComponent_1 = require("../Components/MarkOutOfBoundComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class MarkItemOutOfBoundHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkOutOfBoundComponent_1.MarkOutOfBoundComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_MarkOut_Prefab", this.Context.MarkComponentContainer);
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
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(4, t);
  }
  OnApplyModified() {
    this.ApplyDirectionModified();
    var t;
    var e;
    var o = this.Context.MarkItemEntity.ViewLifeCircle;
    if (o.IsChildViewStateDirty(4) && (t = this.GetOrCreateComponent(), this.IsComponentValid(t))) {
      e = o.IsChildViewVisible(4);
      o.SetChildViewVisibleClean(4);
      t.SetActive(e);
    }
  }
  ApplyDirectionModified() {
    var t;
    var e;
    var o;
    var n = this.Context.MarkItemEntity.Resource;
    if (n.IsOutOfBoundDirectionDirty && (t = this.GetOrCreateComponent(), this.IsComponentValid(t))) {
      e = this.Context.MarkItem.UiPosition;
      e = Vector2D_1.Vector2D.Create(e.X, e.Y);
      o = n.OutOfBoundDirection;
      e.SubtractionEqual(o);
      t.SetOutOfBoundDirection(e);
      n.SetOutOfBoundDirectionClean();
    }
  }
}
exports.MarkItemOutOfBoundHandle = MarkItemOutOfBoundHandle;
//# sourceMappingURL=MarkItemOutOfBoundHandle.js.map