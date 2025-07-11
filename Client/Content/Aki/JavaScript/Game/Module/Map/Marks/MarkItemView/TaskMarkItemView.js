"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskMarkItemView = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapDefine_1 = require("../../MapDefine");
const TaskMarkItemRangeHandle_1 = require("./Handles/TaskMarkItemRangeHandle");
const ServerMarkItemView_1 = require("./ServerMarkItemView");
class TaskMarkItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor() {
    super(...arguments);
    this.QuestStepId = 0;
    this.NRi = false;
    this.ORi = false;
    this.ige = false;
  }
  OnInitialize() {
    super.OnInitialize();
    this.bl();
  }
  bl() {
    this.VRi();
    this.OnIconPathChanged(this.Holder.IconPath);
  }
  OnReset() {
    super.OnReset();
    this.GetSprite(1).SetUIActive(true);
    this.MarkItemRangeHandle.SetVisible(false);
    this.bl();
  }
  VRi() {
    this.ORi = false;
    var e = this.Holder.MarkItemEntity.Resource.RangeSize;
    this.NRi = e > 0;
    if (e) {
      this.HRi(GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation() ?? Vector_1.Vector.ZeroVectorProxy);
      this.ige = true;
    }
  }
  CreateRangeHandle(e) {
    return new TaskMarkItemRangeHandle_1.TaskMarkItemRangeHandle(e);
  }
  OnSafeUpdate(e, t = false) {
    this.HRi(e, t);
  }
  IsRangeImageActive() {
    return this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(2);
  }
  HRi(s, e = false) {
    if (this.NRi) {
      if (this.Holder.IsCanShowView) {
        var r;
        var a = this.Holder;
        var n = a.RangeMarkShowDis;
        var h = n + 2;
        let e = 0;
        let t = false;
        let i = true;
        t = a.RangeMarkShowDisUp !== 0 || a.RangeMarkShowDisDown !== 0 ? (r = (s.Z - this.Holder.WorldPosition.Z) * MapDefine_1.FLOAT_0_01, e = Vector_1.Vector.Dist2D(s, this.Holder.WorldPosition) * MapDefine_1.FLOAT_0_01, i = r < a.RangeMarkShowDisUp && r > a.RangeMarkShowDisDown, e > n && r > a.RangeMarkShowDisUp && r < a.RangeMarkShowDisDown) : (e = Vector_1.Vector.Dist(s, this.Holder.WorldPosition) * MapDefine_1.FLOAT_0_01) > n;
        this.MarkItemTrackHandle.SetVisible(t && this.Holder.IsTracked);
        if (this.ige) {
          this.HQl(!t);
          this.ige = false;
        } else {
          this.HQl(e < h && i);
        }
      } else {
        this.HQl(false);
      }
    } else {
      this.MarkItemTrackHandle.SetVisible(this.Holder.IsTracked && !e);
    }
  }
  HQl(e) {
    var t = this.Holder?.RawInstanceDungeonId !== ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    this.jRi(e && !t);
  }
  jRi(e) {
    var t;
    if (this.NRi && this.ORi !== e) {
      this.ORi = e;
      this.MarkItemRangeHandle.SetVisible(e);
      if (this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewStateDirty(2) && this.Holder.MapType === 1) {
        t = this.Holder;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TaskRangeTrackStateChange, t.TrackSource, t.TreeIncId, t.NodeId, t.MarkId, e);
      }
      t = this.Holder.IsOutOfBound || !e;
      this.GetSprite(1).SetUIActive(t);
      this.IsShowIcon = t;
    }
  }
}
exports.TaskMarkItemView = TaskMarkItemView;
//# sourceMappingURL=TaskMarkItemView.js.map