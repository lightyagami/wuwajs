"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigMarkItem = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfigMarkItemView_1 = require("../MarkItemView/ConfigMarkItemView");
const MarkItem_1 = require("./MarkItem");
class ConfigMarkItem extends MarkItem_1.MarkItem {
  constructor(t, e, i, r, s, n = 1) {
    super(i, r, s, n);
    this.MarkConfig = undefined;
    this.InnerMarkId = 0;
    this.IsServerSaveShowState = false;
    this.ConditionShouldShow = true;
    this.OnSubMapChanged = t => {
      var e = this.LocateInGround();
      let i = false;
      i = e && t === 0 ? t === 0 : this.GetMultiMapId() === ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId;
      if (this.IsSelectThisFloor !== i) {
        this.IsSelectThisFloor = i;
        this.UpdateViewIcon();
      }
    };
    this.InnerMarkId = t;
    this.ShowPriority = e.ShowPriority;
    this.MarkConfig = e;
    this.IconPath = this.MarkConfig.LockMarkPic;
  }
  get IsFogUnlock() {
    return ModelManager_1.ModelManager.MapModel.IsMarkFogUnlock(this.MarkConfigId);
  }
  get IsLocked() {
    return this.MarkItemEntity.GamePlay.IsTeleportLocked;
  }
  get MarkItemType() {
    return 1;
  }
  IsMultiMap() {
    return this.GetMultiMapId() !== 0 || this.LocateInGround();
  }
  LocateInGround() {
    return this.MarkConfig.MultiMapFloorId === 0 && this.GetConnectMultiMapIds().length > 0;
  }
  ConnectGround() {
    if (this.IsMultiMap()) {
      var t = this.MarkConfig.MultiMapFloorId;
      if (t !== 0) {
        if (ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(t)?.Floor === 0) {
          return true;
        }
      }
      for (const e of this.GetConnectMultiMapIds()) {
        if (ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(e)?.Floor === 0) {
          return true;
        }
      }
      return false;
    }
    return true;
  }
  GetMultiMapId() {
    if (this.MarkConfig.MultiMapFloorId === 0 && this.GetConnectMultiMapIds().length > 0) {
      return this.GetConnectMultiMapIds()[0];
    } else {
      return this.MarkConfig.MultiMapFloorId;
    }
  }
  GetConnectMultiMapIds() {
    return this.MarkConfig.ConnetMultiMapFloorId;
  }
  get MarkId() {
    return this.InnerMarkId;
  }
  get MarkConfigId() {
    return this.MarkConfig.MarkId;
  }
  get MarkType() {
    return this.MarkConfig.ObjectType;
  }
  get MapId() {
    return this.MarkConfig.MapId;
  }
  get InstanceDungeonId() {
    return this.MarkConfig.InstanceDungeonId;
  }
  get RelativeInstanceDungeonId() {
    return this.MarkConfig.RelativeDungeonId;
  }
  OnInitialize() {
    if (this.MarkConfig.Scale) {
      this.SetConfigScale(this.MarkConfig.Scale);
    }
    if (this.MarkConfig.CornerScale) {
      this.SetCornerScale(this.MarkConfig.CornerScale);
    }
    this.InitShowCondition();
    this.InitPosition();
    this.InitIcon();
    if (this.MapType === 2) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, this.OnSubMapChanged);
    }
  }
  OnDestroy() {
    if (this.MapType === 2) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, this.OnSubMapChanged);
    }
  }
  InitPosition() {
    this.SetTrackData(ModelManager_1.ModelManager.MapModel.GetConfigMarkTrackTarget(this.MarkId));
    this.UpdateVisibleRelativeState();
  }
  InitIcon() {
    if (!(this.MarkConfig.RelativeSubType <= 0)) {
      this.IconPath = this.MarkConfig.LockMarkPic;
    }
  }
  IsRelativeFunctionOpen() {
    var t;
    return this.MarkConfig.RelativeSubType <= 0 || !(t = ConfigManager_1.ConfigManager.MapConfig?.GetMapMarkFuncTypeConfigById(this.MarkConfig.RelativeSubType)) || !(t.FunctionId > 0) || ModelManager_1.ModelManager.FunctionModel.IsOpen(t.FunctionId);
  }
  GetMarkItemViewType() {
    return 3;
  }
  CreateView() {
    return new ConfigMarkItemView_1.ConfigMarkItemView(this);
  }
  GetLocaleDesc() {
    return this.MarkConfig.MarkDesc;
  }
  GetTitleText() {
    return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(this.MarkConfig.MarkTitle);
  }
  GetAreaText() {
    if (typeof this.TrackTarget == "number") {
      return ModelManager_1.ModelManager.MapModel.GetMarkAreaText(this.MapId, this.TrackTarget);
    }
  }
  GDi(t) {
    return this.MarkConfig.ShowRange[0] < t && this.MarkConfig.ShowRange[1] > t;
  }
  get IsConditionShouldShow() {
    return !!this.ConditionShouldShow && (!this.IsServerSaveShowState || !!ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(this.MarkId).IsShow) && this.ConditionShouldShow;
  }
  get IsConditionShouldShowWithoutServerState() {
    return this.ConditionShouldShow;
  }
  InitShowCondition() {
    var t = this.MarkConfig.ShowCondition;
    if (t < 0) {
      this.IsServerSaveShowState = true;
    } else if (t === 0) {
      this.ConditionShouldShow = true;
    } else {
      this.IsServerSaveShowState = false;
      this.ConditionShouldShow = ModelManager_1.ModelManager.MapModel.IsMarkUnlockedByServer(this.MarkId);
    }
  }
  CheckCanShowView() {
    var t;
    if (this.CanConditionShowView()) {
      t = this.GetCurrentMapShowScale();
      t = this.GDi(t) || this.IsTracked;
      return this.MapType !== 2 || (this.IsCanShowViewIntermediately !== (t = t || this.IsIgnoreScaleShow) && (this.NeedPlayShowOrHideSeq = t ? "ShowView" : "HideView"), t);
    } else {
      return this.IsTracked;
    }
  }
  R3l() {
    return !this.GamePlayIsFinish() || this.MarkConfig?.FinishIsShow === 1 || !!ModelManager_1.ModelManager.WorldMapModel.CompletedPlayPointMarkIsShow;
  }
  GamePlayIsFinish() {
    return this.MarkItemEntity.GamePlay.IsFinish;
  }
  GamePlayIsDiscover() {
    var t = this.MarkConfig?.RelativeDungeonId ?? 0;
    var e = this.MarkConfig?.RelativeId ?? 0;
    return ModelManager_1.ModelManager.LevelPlayReportModel.IsCommonLevelPlayDiscover(t, e);
  }
  CanConditionShowView() {
    var t = this.MapType;
    return (this.MarkConfig.MapShow !== 1 || t === 1) && (this.MarkConfig.MapShow !== 2 || t !== 1) && (!!this.MarkItemEntity.IsTempMapMark && !!this.IsTempMapMarkShow() || !(this.InitShowCondition(), !this.ConditionShouldShow || this.IsServerSaveShowState && !ModelManager_1.ModelManager.MapModel.GetMarkExtraShowState(this.MarkId).IsShow || !this.IsFogUnlock || !this.R3l()));
  }
  GetShowScale() {
    return this.MarkConfig.ShowRange[0] + this.MarkConfig.ShowRange[1] / 2;
  }
  IsLordGym() {
    return this.MarkConfig.RelativeSubType === 3;
  }
  IsNewLordGym() {
    return this.MarkConfig.RelativeSubType === 8;
  }
  IsMoraleFlag() {
    return this.MarkConfig.RelativeSubType === 6;
  }
  UpdateViewIcon() {
    var t;
    if (this.InnerView && (t = this.InnerView)) {
      t.UpdateIcon();
    }
  }
}
exports.ConfigMarkItem = ConfigMarkItem;
//# sourceMappingURL=ConfigMarkItem.js.map