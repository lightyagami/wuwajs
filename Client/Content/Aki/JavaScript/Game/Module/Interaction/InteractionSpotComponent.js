"use strict";
var InteractionSpotComponent_1, __decorate = this && this.__decorate || function(t, e, i, n) {
  var o, s = arguments.length,
    r = s < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, n);
  else
    for (var h = t.length - 1; 0 <= h; h--)(o = t[h]) && (r = (s < 3 ? o(r) : 3 < s ? o(e, i, r) : o(e, i)) || r);
  return 3 < s && r && Object.defineProperty(e, i, r), r
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.InteractionSpotComponent = void 0;
const cpp_1 = require("cpp"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  TickSystem_1 = require("../../../Core/Tick/TickSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  CameraController_1 = require("../../Camera/CameraController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiActorPool_1 = require("../../Ui/UiActorPool"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  UiManager_1 = require("../../Ui/UiManager"),
  UiModel_1 = require("../../Ui/UiModel"),
  EnvironmentalPerceptionController_1 = require("../../World/Enviroment/EnvironmentalPerceptionController"),
  InteractionSpotView_1 = require("./View/InteractionSpotView");
let InteractionSpotComponent = InteractionSpotComponent_1 = class InteractionSpotComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Hte = void 0, this.xJr = void 0, this.BJr = void 0, this.Eqi = void 0, this.n8 = "", this.SpotView = void 0, this.Lqi = void 0, this.yq1 = void 0, this.Sq1 = void 0, this.Mq1 = void 0, this.Lz = Vector_1.Vector.Create(), this.FNl = void 0, this.Kr = !1, this.Eq1 = !0, this.yB = void 0, this.sKe = 0, this.G71 = t => {
      this.SpotView && (this.Eq1 && this.kau(), this.SpotView.Update())
    }, this.Iq1 = t => {
      t = ModelManager_1.ModelManager.InteractionModel?.GetInteractEntityByIndex(t);
      this.SpotView?.SetIsSelect(t === this.Entity.Id)
    }, this.Tq1 = t => {
      this.SpotView?.SetIsInEntityInteractRange(t)
    }, this.DestroyShowSpotEvent = () => {
      this.Sq1 && (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(this.Sq1), this.Sq1 = void 0)
    }, this.bq1 = (t = !1) => {
      var e;
      this.SpotView && (e = this.BJr?.GetInteractController()) && ((e = e.HasInteractOptions()) !== this.Eq1 || t) && (this.Eq1 = e, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, this.Eq1), this.SpotView.SetRootItemState(this.Eq1))
    }, this.Rq1 = t => {
      t.TrackTarget === this.Hte?.CreatureData?.GetPbDataId() && (this.FNl = t, this.SpotView?.SetIsTracking(!0), TimerSystem_1.TimerSystem.Next(() => {
        ControllerHolder_1.ControllerHolder.TrackController.SetInteractSpotOccupied(t.TrackSource, t.Id, !!this.SpotView && this.Eq1)
      }))
    }, this.Lq1 = t => {
      t.TrackTarget === this.Hte?.CreatureData?.GetPbDataId() && (this.FNl = void 0, this.SpotView?.SetIsTracking(!1), TimerSystem_1.TimerSystem.Next(() => {
        ControllerHolder_1.ControllerHolder.TrackController.SetInteractSpotOccupied(t.TrackSource, t.Id, !1)
      }))
    }
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(1), this.xJr = this.Entity.GetComponent(117), this.BJr = this.Entity.GetComponent(197);
    var t, e, i = this.Hte?.CreatureData?.GetPbEntityInitData();
    return !!i && ((e = (i = (0, IComponent_1.getComponent)(i.ComponentsData, "InteractComponent"))?.PointIconConfig?.MaxShowDistance) && (t = this.Entity.GameBudgetManagedToken, this.Sq1 = EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent(), this.Sq1.Init(e, t, () => {
      this.wq1()
    }, () => {
      this.Aq1()
    }, this.DestroyShowSpotEvent), t) && cpp_1.FKuroPerceptionInterface.MarkElementDisable(t, !this.Entity.Active), void 0 !== (e = i?.PointIconConfig?.Offset) && (this.yB = Vector_1.Vector.Create(), this.yB.FromConfigVector(e)), this.LZs(), this.sKe = TickSystem_1.TickSystem.Add(this.G71, "InteractionSpotComponent", 5, !0).Id, !0)
  }
  OnEnd() {
    return this.DZs(), this.Yfe(), TickSystem_1.TickSystem.Remove(this.sKe), !0
  }
  LZs() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSelectHintChange, this.Iq1), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, this.Tq1), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.bq1), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.bq1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrackMark, this.Rq1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UnTrackMark, this.Lq1)
  }
  DZs() {
    EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSelectHintChange, this.Iq1) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSelectHintChange, this.Iq1), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, this.Tq1) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, this.Tq1), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.bq1) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnAddDynamicOption, this.bq1), EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.bq1) && EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnRemoveDynamicOption, this.bq1), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TrackMark, this.Rq1) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrackMark, this.Rq1), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.UnTrackMark, this.Lq1) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UnTrackMark, this.Lq1)
  }
  wq1() {
    this.Mq1 || (this.Mq1 = new CustomPromise_1.CustomPromise, this.xq1())
  }
  async xq1() {
    this.Kr = !1, this.Eq1 = !0;
    var t = this.Hte?.CreatureData?.GetPbDataId();
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("HudUnit", 31, "等待交互点组件创建(开始)", ["pbDataId", t]), await this.Dq1(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("HudUnit", 31, "等待交互点组件创建(开始)", ["pbDataId", t]), this.Mq1 ? this.Mq1.SetResult() : this.Yfe()
  }
  async Dq1() {
    return UiManager_1.UiManager.IsInited || (this.Lqi = new CustomPromise_1.CustomPromise, this.yq1 = () => {
      this.Lqi.SetResult(void 0), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiManagerInit, this.yq1)
    }, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, this.yq1), await this.Lqi.Promise), this.Uq1()
  }
  Aq1() {
    this.Mq1 && (this.Lqi?.IsPending() && this.Lqi.SetResult(), this.Yfe(), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("HudUnit", 31, "交互点组件销毁", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()])
  }
  async Uq1() {
    this.n8 = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("UiItem_InteractionSpot");
    var t = UiLayer_1.UiLayer.GetBattleViewUnit(1);
    return this.Eqi = await UiActorPool_1.UiActorPool.GetAsync(this.n8, t), this.Kr ? (UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8), !1) : (this.Eqi.Actor.SetActorHiddenInGame(!1), this.SpotView = new InteractionSpotView_1.InteractionSpotView, this.SpotView?.SetOwnerActor(this.Hte?.Owner), UiModel_1.UiModel.AddNpcIconViewUnit(this.SpotView), await this.SpotView.CreateByActorAsync(this.Eqi.Actor), !this.Kr && (this.x81(), this.Oq1(), this.bq1(!0), !0))
  }
  Yfe() {
    this.Kr = !0, this.SpotView && (UiModel_1.UiModel.RemoveNpcIconViewUnit(this.SpotView), this.SpotView.DestroySelf(() => {
      this.Eqi && (this.Eqi.Actor?.DetachRootComponentFromParent(), UiActorPool_1.UiActorPool.RecycleAsync(this.Eqi, this.n8), this.Eqi = void 0), this.Eq1 && (EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInteractionSpotStateChange, !1), this.FNl) && ControllerHolder_1.ControllerHolder.TrackController.SetInteractSpotOccupied(this.FNl.TrackSource, this.FNl.Id, !1), this.SpotView = void 0
    })), this.Mq1 = void 0
  }
  static k7r() {
    var t = UE.NewObject(UE.TraceLineElement.StaticClass());
    t.WorldContextObject = GlobalData_1.GlobalData.World, t.bIsSingle = !0, t.bTraceComplex = !1, t.bIgnoreSelf = !0, t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic), t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic), t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer), t.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster), t.DrawTime = .5, InteractionSpotComponent_1.uoe = t
  }
  kau() {
    void 0 === InteractionSpotComponent_1.uoe && InteractionSpotComponent_1.k7r();
    var t = InteractionSpotComponent_1.uoe;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, CameraController_1.CameraController.CameraLocation);
    var e = this.Hte.ActorTransform.TransformPositionNoScale(this.e1c().ToUeVector()),
      e = (TraceElementCommon_1.TraceElementCommon.SetEndLocation(t, e), TraceElementCommon_1.TraceElementCommon.LineTrace(t, "InteractSpotLineTrace" + (this.Hte?.CreatureData.GetPbDataId() ?? 0)));
    this.SpotView?.SetIsObstruct(e)
  }
  Bq1() {
    var t = this.Hte?.CreatureData?.GetEntityType();
    if (void 0 !== t) return t === Protocol_1.Aki.Protocol.kks.Proto_SceneItem ? this.Hte.GetStaticMeshComponent() : this.Hte.SkeletalMesh
  }
  qq1() {
    var t = Vector_1.Vector.Create();
    if (this.Hte?.CreatureData?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_SceneItem) {
      const e = this.Hte,
        i = e.GetStaticMeshComponent().D_K2_GetComponentLocation();
      t.FromUeVector(i)
    } else {
      const e = this.Hte,
        i = e.SkeletalMesh.D_K2_GetComponentLocation();
      t.Set(i.X, i.Y, i.Z + 2 * e.HalfHeight)
    }
    return t
  }
  x81() {
    var t = this.e1c();
    this.SpotView?.SetOffset(t)
  }
  e1c() {
    var t;
    return void 0 === this.yB && ((t = this.Bq1()).IsA(UE.StaticMeshComponent.StaticClass()) ? this.Lz.FromUeVector(t.D_K2_GetComponentLocation()) : this.Lz.DeepCopy(this.qq1()), t = (this.xJr?.GetHeadStateOffset() ?? 0) + ConfigManager_1.ConfigManager.NpcIconConfig.GetNpcIconLocationOffsetZ(), this.yB = Vector_1.Vector.Create(0, 0, t), this.yB.AdditionEqual(this.Lz), this.yB.SubtractionEqual(this.Hte.ActorLocationProxy)), this.yB
  }
  Oq1() {
    var t = this.Hte?.CreatureData?.GetPbDataId();
    t && (this.FNl = ModelManager_1.ModelManager.TrackModel?.IsTargetTracking(t), this.SpotView?.SetIsTracking(!!this.FNl), this.FNl) && ControllerHolder_1.ControllerHolder.TrackController.SetInteractSpotOccupied(this.FNl.TrackSource, this.FNl.Id, !0)
  }
  IsSpotViewShow() {
    return !!this.SpotView && this.Eq1
  }
};
InteractionSpotComponent.uoe = void 0, InteractionSpotComponent = InteractionSpotComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(290)], InteractionSpotComponent), exports.InteractionSpotComponent = InteractionSpotComponent;
//# sourceMappingURL=InteractionSpotComponent.js.map