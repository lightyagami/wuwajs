"use strict";

var InteractionSpotComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var s;
  var o = arguments.length;
  var r = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        r = (o < 3 ? s(r) : o > 3 ? s(e, i, r) : s(e, i)) || r;
      }
    }
  }
  if (o > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InteractionSpotComponent = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const CameraController_1 = require("../../Camera/CameraController");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiActorPool_1 = require("../../Ui/UiActorPool");
const UiLayer_1 = require("../../Ui/UiLayer");
const UiManager_1 = require("../../Ui/UiManager");
const UiModel_1 = require("../../Ui/UiModel");
const EnvironmentalPerceptionController_1 = require("../../World/Enviroment/EnvironmentalPerceptionController");
const InteractionSpotView_1 = require("./View/InteractionSpotView");
let InteractionSpotComponent = InteractionSpotComponent_1 = class InteractionSpotComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.xJr = undefined;
    this.BJr = undefined;
    this.Eqi = undefined;
    this.n8 = "";
    this.SpotView = undefined;
    this.Lqi = undefined;
    this.zq1 = undefined;
    this.Jq1 = undefined;
    this.Zq1 = undefined;
    this.Lz = Vector_1.Vector.Create();
    this.FNl = undefined;
    this.Kr = false;
    this.e21 = true;
    this.yB = undefined;
    this.sKe = 0;
    this.M91 = t => {
      if (this.SpotView) {
        if (this.e21) {
          this.Imu();
        }
        this.SpotView.Update();
      }
    };
    this.t21 = t => {
      t = ModelManager_1.ModelManager.InteractionModel?.GetInteractEntityByIndex(t);
      this.SpotView?.SetIsSelect(t === this.Entity.Id);
    };
    this.i21 = t => {
      this.SpotView?.SetIsInEntityInteractRange(t);
    };
    this.DestroyShowSpotEvent = () => {
      if (this.Jq1) {
        EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(this.Jq1);
        this.Jq1 = undefined;
      }
    };
    this.OnSceneItemStateChange = (t, e) => {
      if (t === -1278190765) {
        this.DZs();
        this.Yfe();
        TickSystem_1.TickSystem.Remove(this.sKe);
      }
    };
    this.r21 = (t = false) => {
      var e;
      if (this.SpotView && (e = this.BJr?.GetInteractController()) && ((e = e.HasInteractOptions()) !== this.e21 || t)) {
        this.e21 = e;
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.e21);
        this.SpotView.SetRootItemState(this.e21);
      }
    };
    this.o21 = t => {
      if (t.TrackTarget === this.Hte?.CreatureData?.GetPbDataId()) {
        this.FNl = t;
        this.SpotView?.SetIsTracking(true);
        TimerSystem_1.TimerSystem.Next(() => {
          ControllerHolder_1.ControllerHolder.TrackController.SetInteractSpotOccupied(t.TrackSource, t.Id, !!this.SpotView && this.e21);
        });
      }
    };
    this.n21 = t => {
      if (t.TrackTarget === this.Hte?.CreatureData?.GetPbDataId()) {
        this.FNl = undefined;
        this.SpotView?.SetIsTracking(false);
        TimerSystem_1.TimerSystem.Next(() => {
          ControllerHolder_1.ControllerHolder.TrackController.SetInteractSpotOccupied(t.TrackSource, t.Id, false);
        });
      }
    };
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(1);
    this.xJr = this.Entity.GetComponent(118);
    this.BJr = this.Entity.GetComponent(198);
    var t;
    var e;
    var i = this.Hte?.CreatureData?.GetPbEntityInitData();
    return !!i && ((e = (i = (0, IComponent_1.getComponent)(i.ComponentsData, "InteractComponent"))?.PointIconConfig?.MaxShowDistance) && (t = this.Entity.GameBudgetManagedToken, this.Jq1 = EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent(), this.Jq1.Init(e, t, () => {
      this.s21();
    }, () => {
      this.a21();
    }, this.DestroyShowSpotEvent), t) && cpp_1.FKuroPerceptionInterface.MarkElementDisable(t, !this.Entity.Active), (e = i?.PointIconConfig?.Offset) !== undefined && (this.yB = Vector_1.Vector.Create(), this.yB.FromConfigVector(e)), this.LZs(), this.sKe = TickSystem_1.TickSystem.Add(this.M91, "InteractionSpotComponent", 5, true, undefined, true).Id, true);
  }
  OnEnd() {
    this.DZs();
    this.Yfe();
    TickSystem_1.TickSystem.Remove(this.sKe);
    return true;
  }
  LZs() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectHintChange, this.t21);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, this.i21);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.r21);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.r21);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.o21);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnTrackMark, this.n21);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnSceneItemStateChange);
  }
  DZs() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSelectHintChange, this.t21)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectHintChange, this.t21);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, this.i21)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, this.i21);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.r21)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.r21);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.r21)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.r21);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TrackMark, this.o21)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMark, this.o21);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.UnTrackMark, this.n21)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnTrackMark, this.n21);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnSceneItemStateChange)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.OnSceneItemStateChange);
    }
  }
  s21() {
    if (!this.Zq1) {
      this.Zq1 = new CustomPromise_1.CustomPromise();
      this.l21();
    }
  }
  async l21() {
    this.Kr = false;
    this.e21 = true;
    var t = this.Hte?.CreatureData?.GetPbDataId();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 31, "等待交互点组件创建(开始)", ["pbDataId", t]);
    }
    await this._21();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 31, "等待交互点组件创建(开始)", ["pbDataId", t]);
    }
    if (this.Zq1) {
      this.Zq1.SetResult();
    } else {
      this.Yfe();
    }
  }
  async _21() {
    if (!UiManager_1.UiManager.IsInited) {
      this.Lqi = new CustomPromise_1.CustomPromise();
      this.zq1 = () => {
        this.Lqi.SetResult(undefined);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiManagerInit, this.zq1);
      };
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, this.zq1);
      await this.Lqi.Promise;
    }
    return this.u21();
  }
  a21() {
    if (this.Zq1 && (this.Lqi?.IsPending() && this.Lqi.SetResult(), this.Yfe(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("HudUnit", 31, "交互点组件销毁", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()]);
    }
  }
  async u21() {
    this.n8 = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_InteractionSpot");
    var t = UiLayer_1.UiLayer.GetBattleViewUnit(1);
    this.Eqi = await UiActorPool_1.UiActorPool.GetAsync(this.n8, t);
    if (this.Kr) {
      UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8);
      return false;
    } else {
      this.Eqi.Actor.SetActorHiddenInGame(false);
      this.SpotView = new InteractionSpotView_1.InteractionSpotView();
      this.SpotView?.SetOwnerActor(this.Hte?.Owner);
      UiModel_1.UiModel.AddNpcIconViewUnit(this.SpotView);
      await this.SpotView.CreateByActorAsync(this.Eqi.Actor);
      return !this.Kr && (this._j1(), this.f21(), this.r21(true), true);
    }
  }
  Yfe() {
    this.Kr = true;
    if (this.SpotView) {
      UiModel_1.UiModel.RemoveNpcIconViewUnit(this.SpotView);
      if (this.e21) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, false);
      }
      this.SpotView.DestroySelf(() => {
        if (this.Eqi) {
          this.Eqi.Actor?.DetachRootComponentFromParent();
          UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8);
          this.Eqi = undefined;
        }
        if (this.e21 && this.FNl) {
          ControllerHolder_1.ControllerHolder.TrackController.SetInteractSpotOccupied(this.FNl.TrackSource, this.FNl.Id, false);
        }
        this.SpotView = undefined;
      });
    }
    this.Zq1 = undefined;
  }
  static k7r() {
    var t = UE.NewObject(UE.TraceLineElement.StaticClass());
    t.WorldContextObject = GlobalData_1.GlobalData.World;
    t.bIsSingle = true;
    t.bTraceComplex = false;
    t.bIgnoreSelf = true;
    t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
    t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
    t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    t.DrawTime = 0.5;
    InteractionSpotComponent_1.uoe = t;
  }
  Imu() {
    if (InteractionSpotComponent_1.uoe === undefined) {
      InteractionSpotComponent_1.k7r();
    }
    var t = InteractionSpotComponent_1.uoe;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, CameraController_1.CameraController.CameraLocation);
    var e = this.Hte.ActorTransform.TransformPositionNoScale(this.e1c().ToUeVector());
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, e);
    var e = TraceElementCommon_1.TraceElementCommon.LineTrace(t, "InteractSpotLineTrace" + (this.Hte?.CreatureData.GetPbDataId() ?? 0));
    this.SpotView?.SetIsObstruct(e);
  }
  c21() {
    var t = this.Hte?.CreatureData?.GetEntityType();
    if (t !== undefined) {
      if (t === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
        return this.Hte.GetStaticMeshComponent();
      } else {
        return this.Hte.SkeletalMesh;
      }
    }
  }
  g21() {
    var t = Vector_1.Vector.Create();
    if (this.Hte?.CreatureData?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
      const e = this.Hte;
      const i = e.GetStaticMeshComponent().D_K2_GetComponentLocation();
      t.FromUeVector(i);
    } else {
      const e = this.Hte;
      const i = e.SkeletalMesh.D_K2_GetComponentLocation();
      t.Set(i.X, i.Y, i.Z + e.HalfHeight * 2);
    }
    return t;
  }
  _j1() {
    var t = this.e1c();
    this.SpotView?.SetOffset(t);
  }
  e1c() {
    var t;
    if (this.yB === undefined) {
      if ((t = this.c21()).IsA(UE.StaticMeshComponent.StaticClass())) {
        this.Lz.FromUeVector(t.D_K2_GetComponentLocation());
      } else {
        this.Lz.DeepCopy(this.g21());
      }
      t = (this.xJr?.GetHeadStateOffset() ?? 0) + ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconLocationOffsetZ();
      this.yB = Vector_1.Vector.Create(0, 0, t);
      this.yB.AdditionEqual(this.Lz);
      this.yB.SubtractionEqual(this.Hte.ActorLocationProxy);
    }
    return this.yB;
  }
  f21() {
    var t = this.Hte?.CreatureData?.GetPbDataId();
    if (t && (this.FNl = ModelManager_1.ModelManager.TrackModel?.IsTargetTracking(t), this.SpotView?.SetIsTracking(!!this.FNl), this.FNl)) {
      ControllerHolder_1.ControllerHolder.TrackController.SetInteractSpotOccupied(this.FNl.TrackSource, this.FNl.Id, true);
    }
  }
  IsSpotViewShow() {
    return !!this.SpotView && this.e21;
  }
};
InteractionSpotComponent.uoe = undefined;
InteractionSpotComponent = InteractionSpotComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(297)], InteractionSpotComponent);
exports.InteractionSpotComponent = InteractionSpotComponent; //# sourceMappingURL=InteractionSpotComponent.js.map