"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItem = undefined;
const UE = require("ue");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const WorldMapSecondaryUiDefine_1 = require("../../../WorldMap/WorldMapSecondaryUiDefine");
const MarkPanelPoolFactory_1 = require("../../Container/MarkPanelPoolFactory");
const MapController_1 = require("../../Controller/MapController");
const MapDefine_1 = require("../../MapDefine");
const MapUtil_1 = require("../../MapUtil");
const MarkDefine_1 = require("../../Mark/MarkDefine");
const MapLogger_1 = require("../../Misc/MapLogger");
class MarkItem {
  constructor(t, i, e, s = 1) {
    this.IsVisible = false;
    this.wDl = undefined;
    this.MapType = 2;
    this.kDi = 1;
    this.ShowPriority = 0;
    this.IsDestroy = false;
    this.IsIgnoreScaleShow = false;
    this.ConfigScale = 1;
    this.mfc = 1;
    this.CornerScaleVector = new UE.Vector(1, 1, 1);
    this.TrackFxScale = 1;
    this.FDi = undefined;
    this.WorldPositionVector = undefined;
    this.X__ = Vector2D_1.Vector2D.Create(0, 0);
    this.GridId = 0;
    this.NeedPlayShowOrHideSeq = undefined;
    this.h5l = undefined;
    this.IsStreaming = true;
    this.gql = undefined;
    this.EnableCachePosition = true;
    this.TrackSourceInner = 2;
    this.QDi = undefined;
    this.InnerView = undefined;
    this.xbt = "";
    this.XDi = false;
    this.IsCanShowViewFinally = false;
    this.MapType = i;
    this.kDi = e;
    this.QDi = t;
    this.TrackSourceInner = s;
    this.FDi = undefined;
    this.WorldPositionVector = Vector_1.Vector.Create();
  }
  get MarkItemEntity() {
    if (this.wDl === undefined) {
      MapLogger_1.MapLogger.ErrorOnce(this.MarkId ?? 0, 63, "没有初始化标记逻辑实体，请检查代码逻辑!", ["MarkId", this.MarkId], ["MarkType", this.MarkType]);
    }
    return this.wDl;
  }
  set MarkItemEntity(t) {
    this.wDl = t;
  }
  get MarkItemType() {
    return 0;
  }
  set CornerScale(t) {
    this.mfc = t;
    this.CornerScaleVector.Set(this.CornerScale, this.CornerScale, this.CornerScale);
  }
  get CornerScale() {
    return this.mfc;
  }
  get VDi() {
    return ModelManager_1.ModelManager.TeleportModel.IsTeleport ?? false;
  }
  get MapId() {
    return 0;
  }
  get InstanceDungeonId() {}
  get RelativeInstanceDungeonId() {
    return this.InstanceDungeonId;
  }
  get InstanceDungeonOrMapConfigId() {
    if (this.InstanceDungeonId === undefined || this.InstanceDungeonId === 0) {
      return this.MapId;
    } else {
      return this.InstanceDungeonId;
    }
  }
  get MarkScale() {
    return this.kDi;
  }
  get UiPosition() {
    return this.FDi || MapUtil_1.MapUtil.WorldPosition2UiPosition(this.WorldPosition, this.FDi);
  }
  get InitUiPosition() {
    return this.h5l || this.UiPosition;
  }
  SetAnchorOffset(t) {
    var i;
    if ((t.X !== this.h5l?.X || t.Y !== this.h5l?.Y) && !(i = this.View?.GetRootItem(), this.h5l = Vector_1.Vector.Create(t.X, t.Y, 0), i === undefined)) {
      t = t.ToUeVector2D(true);
      i.SetAnchorOffset(t);
    }
  }
  IsMultiMap() {
    return false;
  }
  LocateInGround() {
    return true;
  }
  ConnectGround() {
    return true;
  }
  GetMultiMapId() {
    return 0;
  }
  ShowSecondaryUiMultiMapIcon() {
    return this.IsMultiMap() && !this.LocateInGround();
  }
  get IsSelectThisFloor() {
    return this.MarkItemEntity.MultiFloor.IsSelectThisFloor;
  }
  set IsSelectThisFloor(t) {
    this.MarkItemEntity.MultiFloor.IsSelectThisFloor = t;
  }
  GetIsSelectThisFloor() {
    var t;
    return !!this.IsMultiMap() && (t = this.GetMultiMapId(), this.MapType === 1 ? this.InMultiMapArea(t) : ModelManager_1.ModelManager.WorldMapModel.WorldMapCurrentMultiMapId === t);
  }
  InMultiMapArea(t) {
    var i = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId();
    var t = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(t);
    return !!t && !!t.Area.includes(i);
  }
  $Di(t, i) {
    i = i.Tuple;
    t = t.Tuple;
    return Math.pow(t[0] - i[0], 2) + Math.pow(t[1] - i[1], 2);
  }
  get WorldPosition() {
    var t;
    if (this.MapType !== 2 && this.TrackTarget instanceof Vector2D_1.Vector2D && (t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation(), this.$Di(t, this.TrackTarget) * MapDefine_1.FLOAT_0_01 * MapDefine_1.FLOAT_0_01 < 3600) && !this.VDi) {
      t = MapUtil_1.MapUtil.WorldPosition2UiPosition(Vector_1.Vector.Create(this.TrackTarget.X, this.TrackTarget.Y, 0));
      if (t = MapController_1.MapController.GetMarkPosition(t.X, -t.Y)) {
        this.UpdateCustomMapMarkPosition(t);
      } else {
        this.TrackTarget = Vector_1.Vector.Create(this.TrackTarget.X, this.TrackTarget.Y, 0);
      }
    }
    if (this.WorldPositionVector === undefined || !this.EnableCachePosition) {
      this.WorldPositionVector = MapUtil_1.MapUtil.GetTrackPositionByTrackTargetConfig(this.TrackTarget, this.MapId, this.WorldPositionVector);
      this.WorldPositionVector = this.WorldPositionVector ?? Vector_1.Vector.ZeroVectorProxy;
      this.FDi = MapUtil_1.MapUtil.WorldPosition2UiPosition(this.WorldPositionVector, this.FDi);
    }
    return this.WorldPositionVector;
  }
  UpdateCustomMapMarkPosition(t) {
    var i;
    if (this.MarkType === 9) {
      i = Vector_1.Vector.Create(t.X, -t.Y, t.Z);
      t = Vector_1.Vector.Create(t.X, t.Y, t.Z);
      i = MapUtil_1.MapUtil.UiPosition2WorldPosition(i);
      this.TrackTarget = i;
      MapController_1.MapController.UpdateCustomMapMarkPosition(this.MarkId, t);
      i = Vector_1.Vector.Create();
      this.TrackTarget.Multiply(MapDefine_1.FLOAT_0_01, i);
      ModelManager_1.ModelManager.MapModel.UpdateCustomMarkInfo(this.MarkId, i);
      ModelManager_1.ModelManager.TrackModel.UpdateTrackData(this.TrackSourceInner, this.MarkId, this.TrackTarget);
    }
  }
  OnLoad() {}
  OnUnload() {}
  GetPreloadThreshold() {
    return this.X__;
  }
  GetUiPosition() {
    return this.UiPosition;
  }
  Initialize() {
    this.MarkItemEntity.Init();
    this.IsOutOfBound = false;
    this.IsInAoiRange = false;
    this.OnInitialize();
  }
  OnInitialize() {}
  SetTrackData(t) {
    this.TrackTarget = t;
  }
  LogicUpdate(t) {
    this.OnUpdate(t);
    this.UpdateVisibleRelativeState();
  }
  async ViewUpdateAsync(t, i = false, e = false) {
    this.CreateOrCycleView();
    await this.View?.LoadingPromise;
    if (!this.IsDestroy) {
      this.InnerView?.OnUpdate(t, i, e);
    }
  }
  Destroy(t = true) {
    MapLogger_1.MapLogger.Debug(63, "标记系统->MarkItem.Destroy", ["markType", this.MarkType], ["MarkId", this.MarkId], ["InstanceDungeonId", this.InstanceDungeonId], ["MapId", this.MapId]);
    this.IsDestroy = true;
    this.OnDestroy();
    this.Ah_(t);
    this.MarkItemEntity.Dispose();
    this.QDi = undefined;
  }
  get IsInAoiRange() {
    return this.MarkItemEntity.ViewLifeCircle.IsInAoiRange;
  }
  set IsInAoiRange(t) {
    this.MarkItemEntity.ViewLifeCircle.IsInAoiRange = t;
  }
  u8_() {
    var t;
    if (this.InnerView === undefined) {
      t = this.GetMarkItemViewType();
      if ((t = MarkPanelPoolFactory_1.MarkItemViewPoolFactory.Get(t + "_" + this.MapType)) !== undefined) {
        this.InnerView = t;
        this.UYc();
      } else {
        this.InnerView = this.CreateView();
        t = this.InnerView;
        this.WRm(t);
      }
    } else {
      this.UYc();
    }
  }
  async WRm(t) {
    await this.InnerView.InitializeMarkItemViewNewAsync(() => {
      if (this.InnerView === t) {
        this.UYc();
      }
    });
  }
  UYc() {
    if (this.InnerView !== undefined && !this.InnerView.LoadingPromise && !this.IsDestroy) {
      this.MarkItemEntity.ViewLifeCircle.SetAllChildViewStateDirty();
      this.InnerView.InitializeData(this);
      this.InnerView.InitializeView();
      this.InnerView.RefreshView();
    }
  }
  Ah_(t = false) {
    var i;
    if (this.InnerView) {
      this.MarkItemEntity.ViewLifeCircle.SetAllChildViewStateDirty();
      i = this.GetMarkItemViewType();
      if (this.InnerView.ViewInitialized) {
        this.InnerView.RecycleView(t);
        if (!t) {
          MarkPanelPoolFactory_1.MarkItemViewPoolFactory.Recycle(i + "_" + this.MapType, this.InnerView);
        }
      } else {
        this.InnerView.RecycleToPool();
      }
      this.InnerView = undefined;
    }
  }
  get TrackTarget() {
    return this.gql;
  }
  set TrackTarget(t) {
    this.gql = t;
    this.FDi = undefined;
    this.WorldPositionVector = undefined;
    this.h5l = undefined;
  }
  get TrackAreaId() {}
  get TrackSource() {
    return this.TrackSourceInner;
  }
  get IsTracked() {
    return this.MarkItemEntity.ViewLifeCircle.IsTracked;
  }
  set IsTracked(t) {
    this.MarkItemEntity.ViewLifeCircle.IsTracked = t;
    if (this.MarkItemEntity.ViewLifeCircle.IsTrackedDirty) {
      if (t) {
        this.OnStartTrack();
      } else {
        this.OnEndTrack();
      }
    }
  }
  get PermanentUpdate() {
    return this.IsTracked || MarkDefine_1.permanentUpdateTypeSet.has(this.MarkType) || this.MarkItemEntity.ViewLifeCircle.IsSelected;
  }
  get CanOutOfBound() {
    return this.IsTracked || MarkDefine_1.canOutOfBoundUpdateTypeSet.has(this.MarkType);
  }
  UpdateVisibleRelativeState() {
    var t = !this.IsInConsistentDistrict();
    var i = this.CheckCanShowInGravityLayer();
    var t = t && i;
    var i = this.MarkItemEntity.ViewLifeCircle.IsSelected;
    var i = this.CheckCanShowView() || i;
    let e = t && i;
    if (this.MarkItemType !== 1) {
      e &&= this.IsTempMapMarkShow();
    }
    this.IsCanShowView = e;
    this.IsTracked = this.IsTracking();
    let s = true;
    s = !!e && !!t && (this.MapType === 1 && !this.IsTracked || (this.IsInAoiRange = true), this.IsTracked || this.IsInAoiRange);
    this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(9, this.MarkItemEntity.GamePlay.CanShowGravityChildIcon);
    this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(0, s);
  }
  CreateOrCycleView() {
    var t;
    if (this.MarkItemEntity.ViewLifeCircle.IsChildViewStateDirty(0)) {
      t = this.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(0);
      this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibleClean(0);
      if (t) {
        this.u8_();
      } else {
        this.Ah_();
      }
    }
  }
  IsTempMapMarkShow() {
    return this.MapType !== 1 || !this.MarkItemEntity.IsTempMapMark || this.IsTracked;
  }
  IsTracking() {
    return ModelManager_1.ModelManager.TrackModel.IsTracking(this.TrackSource, this.MarkId);
  }
  OnStartTrack() {
    this.View?.OnStartTrack();
  }
  OnEndTrack() {
    this.View?.OnEndTrack();
  }
  OnUpdate(t) {}
  OnDestroy() {}
  get ViewRoot() {
    return this.QDi;
  }
  get View() {
    return this.InnerView;
  }
  get IconPath() {
    return this.xbt;
  }
  set IconPath(t) {
    if (this.xbt !== t) {
      this.xbt = t;
    }
  }
  get IsOutOfBound() {
    return this.MarkItemEntity.ViewLifeCircle.IsChildViewVisible(4);
  }
  set IsOutOfBound(t) {
    this.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(4, t);
    if (this.View && this.View.IsViewReady) {
      this.View.ApplyOutOfBoundActive();
    }
  }
  SetSelected(t) {
    this.MarkItemEntity.ViewLifeCircle.IsSelected = t;
    if (this.InnerView && !this.IsDestroy) {
      this.View.IsSelected = t;
    }
  }
  async GetRootItemAsync() {
    if (this.View) {
      if (this.View.IsCreating) {
        await this.View.LoadingPromise;
      }
      return this.View.GetRootItem();
    }
  }
  GetTitleText() {}
  SetTitleText(t) {
    var i = this.GetTitleText();
    if (i) {
      t.SetText(i);
    }
  }
  GetStateIconPath() {
    var t = this.IsMultiMap();
    if (t && (!this.LocateInGround() || !this.IsSelectThisFloor)) {
      return ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.IsSelectThisFloor ? WorldMapDefine_1.MULTI_MAP_SELECT_ICON_PATH : WorldMapDefine_1.MULTI_MAP_ICON_PATH);
    }
  }
  GetLocaleDesc() {}
  SetConfigScale(t) {
    this.ConfigScale = t;
  }
  SetCornerScale(t) {
    this.CornerScale = t;
  }
  get JDi() {
    return ModelManager_1.ModelManager.MapModel.GetMarkForceVisible(this.MarkType, this.MarkId);
  }
  get IsCanShowViewIntermediately() {
    return this.XDi && this.JDi;
  }
  get IsCanShowView() {
    return this.IsCanShowViewIntermediately || this.IsCanShowViewFinally;
  }
  set IsCanShowView(t) {
    this.XDi = t;
  }
  CheckCanShowView() {
    return this.MapType === 2;
  }
  IsInConsistentDistrict(t = false) {
    let i = undefined;
    var e;
    var s = ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapConfigId;
    return (i = t || this.MapType === 1 ? ModelManager_1.ModelManager.MapModel.GetDungeonMapConfigId(this.InstanceDungeonOrMapConfigId) : ModelManager_1.ModelManager.MapModel.GetDungeonLocateWorldMapId(this.InstanceDungeonOrMapConfigId)) !== s || (t = ModelManager_1.ModelManager.WorldMapModel.IsPlayerInActivityInstanceDungeon(), s = ModelManager_1.ModelManager.MapModel.CurrentMapConfigId, e = ModelManager_1.ModelManager.WorldMapModel.EnableInstanceDungeonFilterMark, t && e && s === i && this.MarkType !== 1 ? this.InstanceDungeonId === undefined || this.PW_() : ModelManager_1.ModelManager.WorldMapModel.IsPlayerInStoryInstanceDungeon() ? this.WMc() : (t = ConfigManager_1.ConfigManager.WorldMapConfig.IsMapInWorld(this.InstanceDungeonOrMapConfigId), this.MapType === 1 ? t ? this.AW_() : this.InstanceDungeonId !== undefined && this.PW_() : ModelManager_1.ModelManager.WorldMapModel.IsPlayerInWorldInstanceDungeon() ? this.Klc(t) : this.AW_()));
  }
  AW_() {
    return this.InstanceDungeonId !== 0 && this.InstanceDungeonId !== undefined && this.InstanceDungeonId !== ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapInstanceId;
  }
  Klc(t) {
    return this.InstanceDungeonId !== 0 && this.InstanceDungeonId !== undefined && this.InstanceDungeonId !== ModelManager_1.ModelManager.WorldMapModel.GetCurrentLocateWorldMapInstanceId(t);
  }
  PW_() {
    return this.InstanceDungeonId !== ModelManager_1.ModelManager.WorldMapModel.CurrentWorldMapInstanceId;
  }
  WMc() {
    if (this.MapType === 1) {
      return this.PW_();
    } else {
      return this.MarkType !== 12 && this.AW_();
    }
  }
  CheckCanShowInGravityLayer() {
    return !!this.IsTracking() || !!MarkDefine_1.permanentShowInGravityLayerTypeSet.has(this.MarkType) || this.MarkItemEntity.GamePlay.InGravityLayer;
  }
  GetShowScale() {
    var t = this.GetCurrentMapShowScale();
    return Math.max(0, t);
  }
  GetCurrentMapShowScale() {
    return ModelManager_1.ModelManager.WorldMapModel.MapScale * 100 - 100;
  }
  OnLevelSequenceStart(t) {
    if (t === "ShowView" || t === "HideView") {
      this.IsCanShowViewFinally = true;
    }
  }
  OnLevelSequenceStop(t) {
    if (t === "ShowView" || t === "HideView") {
      this.IsCanShowViewFinally = false;
    }
  }
  GetInteractiveFlag() {
    return this.IsCanShowView ?? false;
  }
  GamePlayIsDiscover() {
    return false;
  }
  GetSecondaryUiType() {
    return WorldMapSecondaryUiDefine_1.markPanelTypeMap.get(this.MarkType) ?? WorldMapDefine_1.ESecondaryPanel.GeneralPanel;
  }
  GetIsStrictConfigMark() {
    return this.MarkItemEntity.IsConfigMark && this.MarkItemType === 1;
  }
}
exports.MarkItem = MarkItem;
//# sourceMappingURL=MarkItem.js.map