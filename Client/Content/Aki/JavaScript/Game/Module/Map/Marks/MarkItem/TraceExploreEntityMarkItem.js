"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceExploreEntityMarkItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ServerMarkItem_1 = require("./ServerMarkItem");
class TraceExploreEntityMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor(e, t, r, i) {
    super(e, t, r, i);
    this.gNa = undefined;
  }
  get MarkConfig() {
    return this.gNa;
  }
  set MarkConfig(e) {
    this.gNa = e;
  }
  get MapId() {
    return this.ServerMarkInfo.MapId;
  }
  get InstanceDungeonId() {
    return this.ServerMarkInfo.InstanceDungeonId;
  }
  OnInitialize() {
    super.OnInitialize();
    var e = this.ServerMarkInfo;
    this.SetTrackData(e.TrackTarget);
    this.SetConfigId(e.MarkConfigId);
    this.UpdateVisibleRelativeState();
  }
  SetConfigId(e) {
    this.ServerMarkInfo.MarkConfigId = e;
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    this.gNa = e;
    this.MarkItemEntity.GetComponent(15).MapMarkConfig = e;
    this.OnAfterSetConfigId({
      ShowRange: e.ShowRange,
      MarkPic: e.UnlockMarkPic,
      ShowPriority: e.ShowPriority,
      Scale: e.Scale,
      CornerScale: e.CornerScale
    });
  }
  CheckCanShowView() {
    var e;
    if (this.CanConditionShowView()) {
      e = this.GetCurrentMapShowScale();
      e = this.CheckInShowRange(e) || this.IsTracked;
      return this.MapType !== 2 || (this.IsCanShowViewIntermediately !== (e = e || this.IsIgnoreScaleShow) && (this.NeedPlayShowOrHideSeq = e ? "ShowView" : "HideView"), e);
    } else {
      return this.IsTracked;
    }
  }
  CanConditionShowView() {
    var e = ModelManager_1.ModelManager.MapModel.GetPendingAddTempMapMarkList();
    this.MarkItemEntity.IsTempMapMark = e.has(this.MarkId);
    return !!this.MarkItemEntity.IsTempMapMark && !!this.IsTempMapMarkShow();
  }
  GetTitleText() {
    return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(this.MarkConfig.MarkTitle);
  }
}
exports.TraceExploreEntityMarkItem = TraceExploreEntityMarkItem;
//# sourceMappingURL=TraceExploreEntityMarkItem.js.map