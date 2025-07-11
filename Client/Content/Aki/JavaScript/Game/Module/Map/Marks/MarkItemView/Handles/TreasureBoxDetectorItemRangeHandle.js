"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreasureBoxDetectorItemRangeHandle = undefined;
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const MarkDetectorRangeImageComponent_1 = require("../Components/MarkDetectorRangeImageComponent");
const MarkItemComponentHandle_1 = require("./MarkItemComponentHandle");
class TreasureBoxDetectorItemRangeHandle extends MarkItemComponentHandle_1.MarkItemComponentHandle {
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkDetectorRangeImageComponent_1.MarkDetectorRangeImageComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_ProbeArea", this.Context.MarkParentItem);
    }
    return this.ComponentInternal;
  }
  GetOrCreateComponent() {
    if (this.ComponentInternal === undefined) {
      this.LoadComponentAsync().then(() => {
        var e = this.ComponentInternal;
        var t = Vector2D_1.Vector2D.Create(this.Context.MarkItem.UiPosition.X, this.Context.MarkItem.UiPosition.Y);
        e.GetRootItem().SetAnchorOffset(t.ToUeVector2D(true));
        var t = CommonParamById_1.configCommonParamById.GetIntConfig("TreasureBoxDetectionMaxDistance");
        e.RangeImage.SetWidth(t / 100 * 2);
        e.RangeImage.SetHeight(t / 100 * 2);
        e.GetRootItem().SetHierarchyIndex(0);
        this.ApplyModified();
      });
    }
    return this.ComponentInternal;
  }
  OnSetVisible(e) {
    this.Context.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(2, e);
  }
  UpdateRangeScale() {
    var e;
    var t;
    if (this.Context.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(2)) {
      (e = this.GetOrCreateComponent()).SetRangeScale(1, 1, 1);
      t = Vector2D_1.Vector2D.Create(this.Context.MarkItem.UiPosition.X, this.Context.MarkItem.UiPosition.Y);
      e.GetRootItem()?.SetAnchorOffset(t.ToUeVector2D(true));
    }
  }
  OnApplyModified() {
    var e;
    var t;
    var o = this.Context.MarkItemEntity.ViewLifeCircle;
    if (o.IsChildViewStateDirty(2) && (e = this.GetOrCreateComponent(), this.IsComponentValid(e))) {
      t = o.IsChildViewVisible(2);
      o.SetChildViewVisibleClean(2);
      this.UpdateRangeScale();
      e.SetActive(t);
    }
  }
}
exports.TreasureBoxDetectorItemRangeHandle = TreasureBoxDetectorItemRangeHandle;
//# sourceMappingURL=TreasureBoxDetectorItemRangeHandle.js.map