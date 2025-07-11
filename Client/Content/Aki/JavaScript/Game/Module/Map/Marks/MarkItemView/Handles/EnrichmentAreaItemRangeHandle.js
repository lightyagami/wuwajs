"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnrichmentAreaItemRangeHandle = undefined;
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const MarkBlueRangeImageComponent_1 = require("../Components/MarkBlueRangeImageComponent");
const MarkItemRangeHandle_1 = require("./MarkItemRangeHandle");
class EnrichmentAreaItemRangeHandle extends MarkItemRangeHandle_1.MarkItemRangeHandle {
  async LoadComponentAsync() {
    if (this.ComponentInternal === undefined) {
      this.ComponentInternal = new MarkBlueRangeImageComponent_1.MarkBlueRangeImageComponent();
      await this.ComponentInternal.CreateByPoolResourceIdAsync("UiItem_ProbeArea", this.Context.MarkParentItem);
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
  OnResetRangeComponent(e) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TakeMarkComponentExitContainer, this.Context.MarkItemEntity.GamePlay.MarkType, 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TakeMarkComponentEnterContainer, this.ComponentInternal.GetRootItem(), this.Context.MarkItemEntity.GamePlay.MarkType, 0);
    super.OnResetRangeComponent(e);
    var t = Vector2D_1.Vector2D.Create(this.Context.MarkItem.UiPosition.X, this.Context.MarkItem.UiPosition.Y);
    e.GetRootItem().SetAnchorOffset(t.ToUeVector2D(true));
  }
  DestroyComponent() {
    if (this.ComponentInternal) {
      this.ComponentInternal.RecycleToPool();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TakeMarkComponentExitContainer, this.Context.MarkItemEntity.GamePlay.MarkType, 0);
      this.ComponentInternal = undefined;
    }
  }
}
exports.EnrichmentAreaItemRangeHandle = EnrichmentAreaItemRangeHandle;
//# sourceMappingURL=EnrichmentAreaItemRangeHandle.js.map