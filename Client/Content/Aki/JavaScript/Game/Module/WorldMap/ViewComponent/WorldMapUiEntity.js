"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapUiEntity = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const MapMark_1 = require("../../../../Core/Define/Config/MapMark");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const MapEntity_1 = require("../../Map/Base/MapEntity");
const MapDefine_1 = require("../../Map/MapDefine");
const MapUtil_1 = require("../../Map/MapUtil");
const MapGamePlayRequestPreemptiveFrameQueue_1 = require("../../Map/View/BaseMap/Assistant/MapFrameTaskQueue/MapGamePlayRequestPreemptiveFrameQueue");
const MapUpdateTaskPreemptiveFrameQueue_1 = require("../../Map/View/BaseMap/Assistant/MapFrameTaskQueue/MapUpdateTaskPreemptiveFrameQueue");
const WorldMapUtil_1 = require("../WorldMapUtil");
const RAD_2_DEG = 180 / Math.PI;
const DEG_PI_4 = 90;
class WorldMapUiEntity extends MapEntity_1.MapEntity {
  constructor() {
    super(...arguments);
    this.jYa = undefined;
    this.WYa = undefined;
    this.QYa = undefined;
    this.ClickedItem = undefined;
    this.du_ = new MapGamePlayRequestPreemptiveFrameQueue_1.MapGamePlayRequestPreemptiveFrameQueue(200);
    this.f8_ = new MapUpdateTaskPreemptiveFrameQueue_1.MapUpdateTaskPreemptiveFrameQueue(1500);
    this.n4o = (s, a, r) => {
      if (this.ClickedItem) {
        this.MoveComponent.PushMap(this.ClickedItem, false);
      } else {
        let t = undefined;
        let e = undefined;
        var h = Vector2D_1.Vector2D.Create(this.Map.GetRootItem().GetAnchorOffset());
        var n = this.MoveComponent.TweenTarget;
        let i = undefined;
        switch (r) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            i = this.s4o();
        }
        r = s === 0 ? 1 : a / s;
        if (i) {
          t = h.SubtractionEqual(i).MultiplyEqual(r).AdditionEqual(i);
          if (n) {
            e = n.SubtractionEqual(i).MultiplyEqual(r).AdditionEqual(i);
          }
        } else {
          t = h.MultiplyEqual(r);
          if (n) {
            e = n.MultiplyEqual(r);
          }
        }
        this.MoveComponent.SetMapPositionCauseByScaling(t, e, 2);
      }
      this.Map?.AutoPilotLine?.RefreshFindPathLine();
    };
    this.MarkEdgeSize = undefined;
    this.OnMarkItemTrackStateChanged = t => {
      if (!t.IsDestroy) {
        this.UpdateSingleMarkItem(t, true);
      }
    };
    this.OnMarkItemAutoPilotTrackStateChanged = (t, e) => {
      t = this.Map.GetMarkItem(t, e);
      if (t && !t.IsDestroy) {
        this.UpdateSingleMarkItem(t, true);
      }
    };
    this.kH_ = (t, e, i) => {
      this.UpdateMarkItems();
    };
    this.UpdateMarkItems = t => {
      var e;
      this.UpdateSelfPlayerMark();
      for ([, e] of this.Map.GetAllMarkItems()) {
        for (var [, i] of e) {
          this.g8_(i, t);
        }
      }
      this.ScaleComponent.FlushScaleDirty();
    };
    this.Fll = (t, e) => {
      t = this.Map.GetMarkItem(t, e);
      if (t && !t.IsDestroy) {
        this.UpdateSingleMarkItem(t);
      }
    };
    this.OnPlayerMarkPositionChanged = () => {
      if (this.Map !== undefined) {
        var t = this.Map.GetMarkItemsByType(11);
        if (t && t.size !== 0) {
          for (var [, e] of t) {
            this.UpdateSingleMarkItem(e);
          }
        }
      }
    };
    this.a4o = () => {
      this.WorldMapStreamingComponent.Update();
      this.UpdateMarkItems(true);
    };
    this.g5l = () => {
      this.MultiFloorComponent.UpdateMultiMap();
    };
  }
  get Map() {
    return this.jYa;
  }
  set Map(t) {
    if ((this.jYa = t) !== undefined) {
      this.RecalculateMapSize();
    }
  }
  RecalculateMapSize() {
    var t = this.Map.GetRootItem();
    this.MapSize = Vector2D_1.Vector2D.Create(t.GetWidth(), t.GetHeight());
  }
  get ViewPortSize() {
    return this.PropertyMap.tryGet(0) ?? Vector2D_1.Vector2D.ZeroVector;
  }
  set ViewPortSize(t) {
    this.PropertyMap.set(0, t);
  }
  get OutOfViewPortSize() {
    return this.PropertyMap.tryGet(1) ?? Vector2D_1.Vector2D.ZeroVector;
  }
  set OutOfViewPortSize(t) {
    this.PropertyMap.set(1, t);
  }
  get MapSize() {
    return this.PropertyMap.tryGet(2) ?? Vector2D_1.Vector2D.ZeroVector;
  }
  set MapSize(t) {
    this.PropertyMap.set(2, t);
  }
  set UiParams(t) {
    this.WYa = t;
  }
  get UiParams() {
    return this.WYa;
  }
  set OpenParams(t) {
    this.QYa = t;
  }
  get OpenParams() {
    return this.QYa;
  }
  get MapId() {
    return this.PropertyMap.tryGet(3) ?? this.OpenParams.MapId ?? MapDefine_1.BIG_WORLD_MAP_ID;
  }
  set MapId(t) {
    this.PropertyMap.set(3, t);
  }
  get IsInPlayerMap() {
    var t = ModelManager_1.ModelManager.MapModel;
    var e = ConfigManager_1.ConfigManager.AreaConfig;
    var i = ModelManager_1.ModelManager.AreaModel;
    var s = i.GetCurrentAreaId(5);
    if (s !== 0) {
      s = e.GetAreaInfo(s);
      if (s?.IsPlayerPosNeedCheck && s.MapConfigId === this.MapId) {
        return true;
      }
    }
    s = i.GetCurrentAreaId(2);
    if (s !== 0) {
      const a = e.GetAreaInfo(s);
      if (a) {
        return a.MapConfigId === this.MapId;
      }
    }
    i = t.LastHighLevelArea;
    if (!i) {
      return t.CurrentWorldMapConfigId === this.MapId;
    }
    const a = e.GetAreaInfo(e.GetLevelOneAreaId(i));
    if (a) {
      return a.MapConfigId === this.MapId;
    } else {
      return t.CurrentWorldMapConfigId === this.MapId;
    }
  }
  get IsInPlayerGravity() {
    return ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity === ModelManager_1.ModelManager.WorldMapModel.WorldMapSelectGravity;
  }
  get SecondaryUiComponent() {
    return this.GetComponent(1);
  }
  get InteractComponent() {
    return this.GetComponent(2);
  }
  get MoveComponent() {
    return this.GetComponent(3);
  }
  get ScaleComponent() {
    return this.GetComponent(4);
  }
  get PlayerComponent() {
    return this.GetComponent(5);
  }
  get MultiFloorComponent() {
    return this.GetComponent(6);
  }
  get QuickNavigateComponent() {
    return this.GetComponent(7);
  }
  get WorldMapStreamingComponent() {
    return this.GetComponent(8);
  }
  get WorldMapAlterMapComponent() {
    return this.GetComponent(9);
  }
  get WorldMapExtraUiPanelComponent() {
    return this.GetComponent(19);
  }
  OnInit() {
    this.Reset();
  }
  Reset(t = true) {
    var e;
    this.ScaleComponent.Initialize();
    this.InitSelfPlayerMark();
    if (!this.SecondaryUiComponent.IsSecondaryUiOpening) {
      if (this.OpenParams && this.OpenParams.IsNotFocusTween && (e = this.Map.GetMarkItem(this.OpenParams.MarkType, this.OpenParams.MarkId))) {
        this.OpenParams.StartScale = this.ScaleComponent.MapScale;
        this.OpenParams.StartWorldPosition = Vector2D_1.Vector2D.Create(-e.UiPosition.X * this.OpenParams.StartScale, -e.UiPosition.Y * this.OpenParams.StartScale);
      }
      if (this.OpenParams?.StartScale) {
        this.ScaleComponent.SetMapScale(this.OpenParams.StartScale, 6, false);
      }
      if (this.OpenParams?.StartWorldPosition || this.OpenParams?.DebugWorldPosition) {
        if (t) {
          if (this.OpenParams?.StartWorldPosition) {
            this.MoveComponent.SetMapPosition(this.OpenParams.StartWorldPosition, false);
          } else if (this.OpenParams?.DebugWorldPosition) {
            this.MoveComponent.PushMapByUiPosition(this.OpenParams.DebugWorldPosition, false);
            this.Map.SetDebugMarkPosition(Vector2D_1.Vector2D.Create(this.OpenParams.DebugWorldPosition.X, this.OpenParams.DebugWorldPosition.Y));
          }
        }
      } else if (ModelManager_1.ModelManager.MapModel.CurrentInWorld) {
        if (this.IsInPlayerMap && (this.UpdateSelfPlayerMark(), t)) {
          this.MoveComponent.FocusPlayer(this.PlayerComponent.PlayerUiPosition, false, 1);
        }
      } else {
        this.fdl(t);
      }
    }
    this.WorldMapStreamingComponent.BindAll(this.Map.GetAllMapTileItems());
    this.WorldMapStreamingComponent.Update();
    this.OnPlayerMarkPositionChanged();
    this.UpdateMarkItems();
    this.SecondaryUiComponent.AllSecondaryPanelsUpdateMap();
  }
  RegisterComponents() {
    this.ViewPortSize = WorldMapUtil_1.WorldMapUtil.GetViewportSize();
    this.AddComponent(1);
    this.AddComponent(2);
    this.AddComponent(3);
    this.AddComponent(5);
    this.AddComponent(6);
    this.AddComponent(7);
    this.AddComponent(8);
    this.AddComponent(9);
    this.AddComponent(19);
    this.AddComponent(4).ScaleChangeEvent = this.n4o;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMarkItemTrackStateChange, this.OnMarkItemTrackStateChanged);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMarkItemAutoPilotTrackStateChange, this.OnMarkItemAutoPilotTrackStateChanged);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MarkForceVisibleChanged, this.kH_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ScenePlayerLocationChanged, this.OnPlayerMarkPositionChanged);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMapMarkTaskComplete, this.Fll);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapPositionChanged, this.a4o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapUpdateMultiMap, this.g5l);
  }
  OnDispose() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMarkItemTrackStateChange, this.OnMarkItemTrackStateChanged);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMarkItemAutoPilotTrackStateChange, this.OnMarkItemAutoPilotTrackStateChanged);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MarkForceVisibleChanged, this.kH_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ScenePlayerLocationChanged, this.OnPlayerMarkPositionChanged);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMapMarkTaskComplete, this.Fll);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapPositionChanged, this.a4o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapUpdateMultiMap, this.g5l);
    this.du_.Dispose();
    this.f8_.Dispose();
    this.Map = undefined;
  }
  OnTick() {
    this.Map?.Tick();
    this.du_.Process();
    this.f8_.Process();
  }
  CancelAllTasks() {
    this.du_.Dispose();
    this.f8_.Dispose();
  }
  s4o() {
    var e = Global_1.Global.CharacterController;
    if (e) {
      let t = undefined;
      if (Info_1.Info.IsInKeyBoard()) {
        t = Vector2D_1.Vector2D.Create(e.GetCursorPosition());
      } else if (Info_1.Info.IsInTouch()) {
        t = this.InteractComponent.MultiTouchOriginCenter;
      }
      if (t) {
        var i;
        var e = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
        if (e) {
          e = e.ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D());
          (i = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool()).Set(e.X - i.X / 2, e.Y - i.Y / 2);
          return i;
        }
      }
    }
  }
  InitSelfPlayerMark() {
    var t;
    var e;
    if (this.WorldMapExtraUiPanelComponent.IsExtraUiViewOpened) {
      this.Map?.SelfPlayerNode?.SetUIActive(this.WorldMapExtraUiPanelComponent.IsShowPlayerMark);
    } else {
      t = this.IsInPlayerMap;
      (e = this.Map.SelfPlayerNode).SetUIActive(t);
      if (t) {
        e.SetAsLastHierarchy();
      }
      this.dBc();
    }
  }
  dBc() {
    var t = ModelManager_1.ModelManager.WorldMapModel.IsGravityMap(this.MapId);
    var e = this.Map.PlayerArrow;
    if (t && !this.IsInPlayerGravity) {
      e.SetAlpha(0.4);
      this.Map.SetPlayerGravityActive(true, ModelManager_1.ModelManager.MapModel.CurrentPlayerGravity);
    } else {
      e.SetAlpha(1);
      this.Map.SetPlayerGravityActive(false);
    }
  }
  UpdateSelfPlayerMark() {
    var t;
    var e;
    var i;
    var s;
    var a;
    if (!this.WorldMapExtraUiPanelComponent.IsExtraUiViewOpened || !!this.WorldMapExtraUiPanelComponent.IsShowPlayerMark) {
      this.PlayerComponent.UpdatePlayerPosition();
      t = this.PlayerComponent.PlayerRotation;
      a = this.PlayerComponent.PlayerUiPosition;
      i = this.ScaleComponent.MapScale;
      this.Map.PlayerArrow.SetUIRelativeRotation(new UE.Rotator(0, t, 0));
      t = this.MoveComponent.MapUiPosition;
      e = Vector2D_1.Vector2D.Create();
      [a, i] = (a.Multiply(i, e).Addition(t, e), this.ClampToMarkEdge(e));
      s = this.Map.PlayerOutOfBoundIndicator;
      if (i) {
        this.PlayerComponent.PlayerOutOfBound = true;
        this.Map.SelfPlayerNode.SetAnchorOffset(a.SubtractionEqual(t).DivisionEqual(this.ScaleComponent.MapScale).ToUeVector2D(true));
        a = Math.atan2(e.Y, e.X) * RAD_2_DEG - DEG_PI_4;
        s.SetUIRelativeRotation(new UE.Rotator(0, a, 0));
      } else {
        this.PlayerComponent.PlayerOutOfBound = false;
        this.Map.SelfPlayerNode.SetAnchorOffset(this.PlayerComponent.PlayerUiPosition.ToUeVector2D());
      }
      s.SetUIActive(i);
    }
  }
  fdl(t = true) {
    this.UpdateSelfPlayerMark();
    if (t) {
      t = MapUtil_1.MapUtil.GetLastBigScenePlayerUiPosition();
      this.MoveComponent.FocusPlayer(t, false, 1);
    }
  }
  ClampToMarkEdge(t) {
    var e;
    var i = this.MarkEdgeSize;
    if (Math.abs(t.X) < i.X && Math.abs(t.Y) < i.Y) {
      return [t, false];
    } else {
      e = Vector2D_1.Vector2D.Create();
      if (Math.abs(t.X / t.Y) > i.X / i.Y) {
        t.Multiply(i.X / Math.abs(t.X), e);
      } else {
        t.Multiply(i.Y / Math.abs(t.Y), e);
      }
      return [e, true];
    }
  }
  async UpdateMarkItemsAsync() {
    var t;
    var e = [];
    for ([, t] of this.Map.GetAllMarkItems()) {
      for (var [, i] of t) {
        if (MapDefine_1.mapLoadDirectlyConfigMarkSet.has(i.MarkType)) {
          e.push(this.UpdateSingleMarkItemAsync(i, true));
        }
      }
    }
    await Promise.all(e);
  }
  pdl(t) {
    return !!t.PermanentUpdate || !!this.WorldMapStreamingComponent.HandleStreamingUpdate(t);
  }
  g8_(t, e = false) {
    if (t.PermanentUpdate || this.ScaleComponent.IsScaleDirty) {
      this.UpdateSingleMarkItem(t, true);
    } else {
      const i = {
        MapUiPosition: this.MoveComponent.MapUiPosition,
        MapScale: this.ScaleComponent.MapScale,
        PlayerWorldPosition: this.PlayerComponent.PlayerWorldPosition,
        IsDragging: this.InteractComponent.IsDragging,
        IsScaleDirty: this.ScaleComponent.IsScaleDirty,
        ForceViewUpdate: e
      };
      e = {
        Priority: 0,
        Execute: () => {
          if (!t.IsDestroy) {
            this.TK_(t, i);
          }
        },
        MarkId: t.MarkId,
        MarkType: t.MarkType
      };
      this.f8_.AddTask(e);
    }
  }
  UpdateSingleMarkItem(t, e = false) {
    e = {
      MapUiPosition: this.MoveComponent.MapUiPosition,
      MapScale: this.ScaleComponent.MapScale,
      PlayerWorldPosition: this.PlayerComponent.PlayerWorldPosition,
      IsDragging: this.InteractComponent.IsDragging,
      IsScaleDirty: this.ScaleComponent.IsScaleDirty,
      ForceViewUpdate: e
    };
    this.TK_(t, e);
  }
  async UpdateSingleMarkItemAsync(t, e = false) {
    e = {
      MapUiPosition: this.MoveComponent.MapUiPosition,
      MapScale: this.ScaleComponent.MapScale,
      PlayerWorldPosition: this.PlayerComponent.PlayerWorldPosition,
      IsDragging: this.InteractComponent.IsDragging,
      IsScaleDirty: this.ScaleComponent.IsScaleDirty,
      ForceViewUpdate: e
    };
    await this.TK_(t, e);
  }
  async TK_(t, e) {
    var i;
    var s;
    var a;
    var r;
    if (this.pdl(t)) {
      t.LogicUpdate(this.PlayerComponent.PlayerWorldPosition);
      if (t.MarkItemEntity.ViewLifeCircle.IsChildViewStateDirty(0) || e.ForceViewUpdate) {
        await t.ViewUpdateAsync(e.PlayerWorldPosition, e.IsDragging, e.IsScaleDirty);
        this.mu_(t);
      }
      if (t.View) {
        i = e.MapScale;
        s = Vector2D_1.Vector2D.Create(t.UiPosition.X, t.UiPosition.Y);
        if (t.CanOutOfBound && (e = e.MapUiPosition, a = Vector2D_1.Vector2D.Create(), [a, r] = (s.Multiply(i, a).Addition(e, a), this.ClampToMarkEdge(a)), r)) {
          t.MarkItemEntity.Resource.OutOfBoundDirection = a;
          t.SetAnchorOffset(a.SubtractionEqual(e).DivisionEqual(i));
          t.IsOutOfBound = true;
        } else {
          t.IsOutOfBound = false;
          t.SetAnchorOffset(s);
        }
      }
    } else {
      t.MarkItemEntity.ViewLifeCircle.SetChildViewVisibility(0, false);
      t.CreateOrCycleView();
    }
  }
  mu_(t) {
    var e = t.MarkItemEntity.GetComponent(14);
    if (e !== undefined && e.NeedRequestGamePlayState()) {
      var i = e.GetRelativeId();
      var s = e.GetRelativeDungeonId();
      if (i !== undefined && s !== undefined) {
        i = {
          Priority: 0,
          Execute: () => {},
          MarkId: t.MarkId,
          GamePlayId: i,
          InstId: s
        };
        this.du_.AddTask(i);
        s = t.MarkItemEntity.GetComponent(15).MapMarkConfig;
        if (s instanceof MapMark_1.MapMark) {
          for (const r of s.AssociatedGameplayMarks) {
            var a = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(r);
            if (a !== undefined) {
              a = {
                Priority: 0,
                Execute: () => {},
                MarkId: t.MarkId,
                GamePlayId: a.RelativeId,
                InstId: a.RelativeDungeonId
              };
              this.du_.AddTask(a);
            }
          }
        }
        e.HasRequestGamePlay = true;
      }
    }
  }
}
exports.WorldMapUiEntity = WorldMapUiEntity;
//# sourceMappingURL=WorldMapUiEntity.js.map