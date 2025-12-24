"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnrichmentAreaItemView = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EnrichmentAreaItemRangeHandle_1 = require("./Handles/EnrichmentAreaItemRangeHandle");
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class EnrichmentAreaItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e);
    this.Zbn = e => {
      var t = this.Holder;
      t.IsSelectThisFloor = t.GetMultiMapId() === e;
      this.OnIconPathChanged(t.IconPath);
    };
    this.lZm = () => {
      var e = this.Holder;
      this.OnIconPathChanged(e.IconPath);
    };
  }
  OnViewRefresh() {
    this.Holder.MarkItemEntity.ViewLifeCircle.EnableVerticalPointer = false;
    var e = this.Holder.CheckCanShowView();
    this.MarkItemRangeHandle.SetVisible(e);
    this.UpdateMultiMapFloorSelectedState();
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSelectMultiMap, this.Zbn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMapMark, this.lZm);
  }
  UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSelectMultiMap, this.Zbn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMapMark, this.lZm);
  }
  OnIconPathChanged(e) {
    var t = this.Holder.CheckCanShowIcon();
    var n = this.GetSprite(1);
    if (t) {
      this.LoadIcon(n, e);
    } else {
      n.SetUIActive(t);
    }
    this.MarkItemChildIconHandle.Update();
  }
  UpdateMultiMapFloorSelectedState() {
    var e = this.Holder;
    var t = this.Holder.IsSelectThisFloor;
    this.Holder.IsSelectThisFloor = e.GetIsSelectThisFloor();
    if (t !== this.Holder.IsSelectThisFloor) {
      this.OnIconPathChanged(e.IconPath);
    }
  }
  CreateRangeHandle(e) {
    return new EnrichmentAreaItemRangeHandle_1.EnrichmentAreaItemRangeHandle(e);
  }
}
exports.EnrichmentAreaItemView = EnrichmentAreaItemView;
//# sourceMappingURL=EnrichmentAreaItemView.js.map