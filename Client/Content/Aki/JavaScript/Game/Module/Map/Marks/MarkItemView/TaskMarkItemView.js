"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskMarkItemView = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
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
  OnViewRefresh() {
    this.GetSprite(1).SetUIActive(true);
    this.MarkItemRangeHandle.SetVisible(false);
    this.bl();
  }
  bl() {
    this.VRi();
    this.OnIconPathChanged(this.Holder.IconPath);
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
    if (this.Holder?.MapType === 2) {
      this.bl();
    }
    this.HRi(e, t);
  }
  IsRangeImageActive() {
    return this.Holder.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(2);
  }
  HRi(r, e = false) {
    if (this.NRi) {
      if (this.Holder.IsCanShowView) {
        var a;
        var s = this.Holder;
        var n = s.RangeMarkShowDis;
        var h = n + 2;
        let e = 0;
        let t = false;
        let i = true;
        t = s.RangeMarkShowDisUp !== 0 || s.RangeMarkShowDisDown !== 0 ? (a = (r.Z - this.Holder.WorldPosition.Z) * MapDefine_1.FLOAT_0_01, e = Vector_1.Vector.Dist2D(r, this.Holder.WorldPosition) * MapDefine_1.FLOAT_0_01, i = a < s.RangeMarkShowDisUp && a > s.RangeMarkShowDisDown, e > n && a > s.RangeMarkShowDisUp && a < s.RangeMarkShowDisDown) : (e = Vector_1.Vector.Dist(r, this.Holder.WorldPosition) * MapDefine_1.FLOAT_0_01) > n;
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
    var t = this.Holder?.RawInstanceDungeonId;
    let i = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    var r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(i);
    var t = t !== (i = r.EntranceEntities.length > 0 ? r.EntranceEntities[0].DungeonId : i);
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