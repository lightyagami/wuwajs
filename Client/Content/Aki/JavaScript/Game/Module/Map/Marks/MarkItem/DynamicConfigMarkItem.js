"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicConfigMarkItem = undefined;
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const DynamicConfigMarkItemView_1 = require("../MarkItemView/DynamicConfigMarkItemView");
const MarkItem_1 = require("./MarkItem");
class DynamicConfigMarkItem extends MarkItem_1.MarkItem {
  constructor(t, e, i, r, s, h = 1) {
    super(i, r, s, h);
    this.MarkConfig = undefined;
    this.ODi = 0;
    this.z3_ = undefined;
    this.ConditionShouldShow = true;
    this.ODi = t;
    this.ShowPriority = e.ShowPriority;
    this.MarkConfig = e;
    this.IconPath = this.MarkConfig.LockMarkPic;
  }
  get IsFogUnlock() {
    return this.MarkConfig.FogShow === 1 || ModelManager_1.ModelManager.MapModel.CheckFogUnlocked(this.MarkConfig.FogHide);
  }
  get MarkId() {
    return this.ODi;
  }
  get MarkConfigId() {
    return this.MarkConfig.MarkId;
  }
  get MarkType() {
    return this.MarkConfig.ObjectType;
  }
  set OverrideMapId(t) {
    this.z3_ = t;
  }
  get OverrideMapId() {
    return this.z3_;
  }
  get MapId() {
    return this.OverrideMapId ?? this.MarkConfig.MapId;
  }
  get InstanceDungeonId() {
    return this.MarkConfig.InstanceDungeonId;
  }
  OnInitialize() {
    if (this.MarkConfig.Scale) {
      this.SetConfigScale(this.MarkConfig.Scale);
    }
    this.InitPosition(this.MarkConfig);
    this.InitShowCondition();
  }
  InitPosition(t) {
    if (t.EntityConfigId) {
      this.SetTrackData(t.EntityConfigId);
      this.UpdateVisibleRelativeState();
    } else if (t.MarkVector) {
      this.SetTrackData(Vector_1.Vector.Create(t.MarkVector));
      this.UpdateVisibleRelativeState();
    }
  }
  GetMarkItemViewType() {
    return 5;
  }
  CreateView() {
    return new DynamicConfigMarkItemView_1.DynamicConfigMarkItemView(this);
  }
  GetLocaleDesc() {
    return this.MarkConfig.MarkDesc;
  }
  GetTitleText() {
    return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(this.MarkConfig.MarkTitle);
  }
  get TrackAreaId() {
    if (typeof this.TrackTarget == "number" && this.TrackTarget !== 0) {
      return ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(this.TrackTarget, this.MapId);
    }
  }
  GetAreaText() {
    if (typeof this.TrackTarget == "number") {
      if (this.TrackAreaId) {
        return ModelManager_1.ModelManager.MapModel.GetMarkAreaTextByAreaId(this.TrackAreaId);
      } else {
        return ModelManager_1.ModelManager.MapModel.GetMarkAreaText(this.MapId, this.TrackTarget);
      }
    }
  }
  GDi(t) {
    return this.MarkConfig.ShowRange[0] < t && this.MarkConfig.ShowRange[1] > t;
  }
  InitShowCondition() {
    this.ConditionShouldShow = true;
  }
  CheckCanShowView() {
    var t;
    var e = this.MapType;
    return (this.MarkConfig.MapShow !== 1 || e === 1) && (this.MarkConfig.MapShow !== 2 || e !== 1) && !!this.ConditionShouldShow && !!this.IsFogUnlock && (t = this.GetCurrentMapShowScale(), t = this.GDi(t) || this.IsTracked, e !== 2 || (this.IsCanShowViewIntermediately !== (e = t || this.IsIgnoreScaleShow) && (this.NeedPlayShowOrHideSeq = e ? "ShowView" : "HideView"), e));
  }
  GetShowScale() {
    return this.MarkConfig.ShowRange[0] + this.MarkConfig.ShowRange[1] / 2;
  }
}
exports.DynamicConfigMarkItem = DynamicConfigMarkItem;
//# sourceMappingURL=DynamicConfigMarkItem.js.map