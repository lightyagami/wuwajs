"use strict";
var __decorate = this && this.__decorate || function(t, e, i, s) {
  var h, o = arguments.length,
    r = o < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(t, e, i, s);
  else
    for (var a = t.length - 1; 0 <= a; a--)(h = t[a]) && (r = (o < 3 ? h(r) : 3 < o ? h(e, i, r) : h(e, i)) || r);
  return 3 < o && r && Object.defineProperty(e, i, r), r
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RangeComponent = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  Queue_1 = require("../../../../../Core/Container/Queue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Net_1 = require("../../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RoleTriggerController_1 = require("../../Role/RoleTriggerController"),
  RangeComponentConfigHelper_1 = require("../RangeComponentConfigHelper"),
  RangeComponentMessageManager_1 = require("../RangeComponentMessageManager"),
  FULL_COLLISION_PRESET = new UE.FName("TriggerComponent"),
  ROLETRIGGER_COLLISION_PRESET = new UE.FName("RangeComp_RoleTriggerOnly"),
  DEBUG_DETAIL_KEY = "RangeComponent",
  CYLINDER_COMMON_PARAM_ID = "BaseCylinderStaticMeshForRange",
  CONE_COMMON_PARAM_ID = "BaseConeStaticMeshForRange";
let RangeComponent = class RangeComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.Kua = void 0, this.Xua = void 0, this.Dzl = void 0, this.EIe = void 0, this.Hte = void 0, this.Men = void 0, this.bjo = void 0, this.Een = void 0, this.aln = void 0, this.kA1 = new Array, this.yen = void 0, this.Ien = void 0, this.tOl = void 0, this.Den = !1, this.Ren = !1, this.Uen = 0, this.OA1 = void 0, this.Pen = void 0, this.F0a = void 0, this.xen = !1, this.wen = !1, this.joh = !1, this.jKs = !1, this.Ben = void 0, this.ben = void 0, this.qen = void 0, this.Nen = void 0, this.Oen = void 0, this.ken = void 0, this.eoh = void 0, this.$Tl = void 0, this.Fen = !1, this.Ven = !1, this.Hen = void 0, this.jen = void 0, this.Wen = void 0, this.WKs = !1, this.KKs = !1, this.toh = !1, this.sxr = void 0, this.x7a = !1, this.P7a = void 0, this.w7a = void 0, this.jKl = !1, this.HKl = void 0, this.ioh = Vector_1.Vector.Create(), this.Ken = t => {
      t && (this.Ien?.IsValid() || this.Ren) ? (t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id))?.Valid ? (this.ht_(), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.Xen), EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe), RoleTriggerController_1.RoleTriggerController.IsInitTrigger || EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleTriggerInit, this.Woh), this.roh("RangeComp初始化关闭Tick"), this.wen = !0, this.QKs()) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] 查询自身实体Handle失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 29, "[RangeComponent] RangeActor初始化失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()])
    }, this.Woh = () => {
      this.QKs()
    }, this.QKs = () => {
      this.GetIsLocalSetupComplete() || this.Qoh() && (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY) && Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItem", 39, "[RangeComponent] 完成初始化(开始)", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()]), this.Yen(), this.zen(!1), this.GetIsNotServerRange() || this.$Ks(), this.joh = !0, ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY)) && Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItem", 39, "[RangeComponent] 完成初始化(结束)", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()])
    }, this.Zen = void 0, this.Rhl = void 0, this.InitRangeAsyncCallback = void 0, this.eP1 = (t, e, i) => {
      t && (t.SetCollisionProfileName(this.HKl, i), e) && (t.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = !0, t.KuroSetPassiveCollision(!0, !1))
    }, this.otn = (t, e) => {
      this.Kua?.Start(), this.ttn(e, !0), this.Kua?.Stop()
    }, this.rtn = (t, e) => {
      this.Xua?.Start(), this.ttn(e, !1), this.Xua?.Stop()
    }, this.B7a = () => {
      for (this.w7a && TimerSystem_1.TimerSystem.Has(this.w7a) && TimerSystem_1.TimerSystem.Remove(this.w7a), this.w7a = void 0; this.P7a && !this.P7a.Empty;) {
        var [t, e, ...i] = this.P7a.Pop();
        t ? EventSystem_1.EventSystem.EmitWithTarget(t, e, ...i) : EventSystem_1.EventSystem.Emit(e, ...i)
      }
    }, this.Xen = (t, e) => {
      t?.Valid && this.Fen !== this.Ven && this.ntn(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), t, this.Fen)
    }, this.GUe = (t, e, i) => {
      var s;
      e?.Valid && (e = e.Entity?.GetComponent(0)?.GetCreatureDataId()) && this.Wen?.has(e) && (s = !!this.Wen.get(e), this.ServerUpdateEntitiesInRangeOnline(s, e))
    }, this.zpe = (t, e) => {
      e?.Valid && (e.Id === this.Entity.Id ? (EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.zpe), this.stn(!1), this.atn()) : this.Oen?.has(e.Id) && this.htn(e, !1, !1))
    }, this.ltn = t => {
      this.ttn(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), t)
    }
  }
  GetRangeActor() {
    return this.Ien?.IsValid() ? this.Ien : void 0
  }
  GetShapeComp() {
    return !(this.kA1.length < 1) && this.kA1[0]?.IsValid() ? this.kA1[0] : void 0
  }
  GetMeshComp() {
    return this.yen?.IsValid() ? this.yen : void 0
  }
  GetRangeType() {
    return this.bjo?.Type
  }
  GetShapeCompTransform() {
    return !(this.kA1.length < 1) && this.kA1[0]?.IsValid() ? this.kA1[0].D_GetRelativeTransform() : void 0
  }
  GetEntitiesInRangeLocal() {
    return this.Oen
  }
  GetActorsInRangeLocal() {
    return this.ken
  }
  GetEntitiesInRangeOnline() {
    return this.Hen
  }
  GetPlayerInRangeOnline() {
    return this.jen
  }
  GetIsLocalSetupComplete() {
    return this.joh
  }
  GetIsSetupComplete() {
    return this.GetIsNotServerRange() ? this.joh : this.joh && this.jKs
  }
  GetIsNotServerRange() {
    return !this.WKs && !this.KKs
  }
  GetShapeConfig() {
    return this.bjo
  }
  OnInitData() {
    this.EIe = this.Entity.GetComponent(0), this.Hte = this.Entity.GetComponent(1), this.Men = this.Entity.GetComponent(163);
    var t = this.EIe?.GetPbEntityInitData();
    return !!t && (this.XKs(t) ? (this.YKs(t), this.b7a(t), this.ooh(t), this.WKl(t), ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY) && Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItem", 39, "[RangeComponent] 初始化网络节省配置完成", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["ReqEntityAccessRange", this.WKs], ["ReqPlayerAccessRange", this.KKs]), this.Oen = new Map, this.Fen = !1, this.ken = new Set, this.eoh = new Set, this.$Tl = new Map, this.Hen = new Map, this.jen = new Set, this.ben = [], this.qen = [], this.Nen = [], this.wen = !1, this.xen = !1, this.Wen = new Map, this.EIe.PbInRangeEntityCreatureDataIds && this.ServerUpdateEntitiesInRangeOnline(!0, this.EIe.PbInRangeEntityCreatureDataIds), this.EIe.PbInRangePlayerIds && this.ServerUpdatePlayerInRangeOnline(!0, this.EIe.PbInRangePlayerIds), this.Kua = Stats_1.Stat.CreateNoFlameGraph("[RangeComp.BeginOverlap] CfgId:" + this.EIe?.GetPbDataId()), this.Xua = Stats_1.Stat.CreateNoFlameGraph("[RangeComp.EndOverlap] CfgId:" + this.EIe?.GetPbDataId()), this.Dzl = Stats_1.Stat.CreateNoFlameGraph("[RangeComp.SetupRangeActor] CfgId:" + this.EIe?.GetPbDataId()), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 29, "[RangeComponent] 范围数据出错", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), !1))
  }
  XKs(t) {
    var e = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent"),
      i = (0, IComponent_1.getComponent)(t.ComponentsData, "BeamCastComponent"),
      s = (0, IComponent_1.getComponent)(t.ComponentsData, "FanComponent"),
      h = (0, IComponent_1.getComponent)(t.ComponentsData, "MonitorComponent");
    return e ? this.bjo = e.Shape : i ? (i = {
      Type: "Cylinder",
      ...i.Range
    }, this.bjo = i) : s ? (i = {
      Type: "Box",
      Center: Vector_1.Vector.ZeroVectorProxy,
      Size: Vector_1.Vector.OneVectorProxy
    }, this.bjo = i) : h && (s = {
      Type: "Cone",
      ...h.Range
    }, this.bjo = s), !!this.bjo && (void 0 !== e?.ExtraRange ? this.Uen = e.ExtraRange : !(i = (0, IComponent_1.getComponent)(t.ComponentsData, "TriggerComponent")) || "Box" !== this.bjo.Type && "Cylinder" !== this.bjo.Type && "Sphere" !== this.bjo.Type || (this.Uen = i.ExitConfig?.ExtraRange ?? 0), !0)
  }
  YKs(e) {
    if ((0, IComponent_1.getComponent)(e.ComponentsData, "RangeComponent")) {
      let t = !1;
      for (var [i, s] of RangeComponentConfigHelper_1.RangeComponentConfigHelper.Instance.CompConfig)(0, IComponent_1.getComponent)(e.ComponentsData, i) && (t = !0, this.WKs ||= "boolean" == typeof s.NeedReqEntityAccessRange ? s.NeedReqEntityAccessRange : s.NeedReqEntityAccessRange(e), this.KKs ||= "boolean" == typeof s.NeedReqPlayerAccessRange ? s.NeedReqPlayerAccessRange : s.NeedReqPlayerAccessRange(e));
      t || (this.KKs = !0)
    } else this.WKs = !1, this.KKs = !1
  }
  b7a(t) {
    for (var [e, i] of RangeComponentConfigHelper_1.RangeComponentConfigHelper.Instance.CompConfig)(0, IComponent_1.getComponent)(t.ComponentsData, e) && (this.x7a ||= "boolean" == typeof i.NeedPendingEmitEvent ? i.NeedPendingEmitEvent : i.NeedPendingEmitEvent(t))
  }
  ooh(t) {
    (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent") && (t = this.bjo?.Type) ? "HollowCylinder" !== t && "HollowSphere" !== t || (this.toh = !0): this.toh = !1
  }
  WKl(t) {
    let e = !1;
    for (var [i, s] of RangeComponentConfigHelper_1.RangeComponentConfigHelper.Instance.CompConfig)(0, IComponent_1.getComponent)(t.ComponentsData, i) && (this.jKl ||= "boolean" == typeof s.NeedDisablePassiveCollision ? s.NeedDisablePassiveCollision : s.NeedDisablePassiveCollision(t), e ||= "boolean" == typeof s.NeedUseFullCollisionPreset ? s.NeedUseFullCollisionPreset : s.NeedUseFullCollisionPreset(t));
    this.HKl = e ? FULL_COLLISION_PRESET : ROLETRIGGER_COLLISION_PRESET
  }
  OnStart() {
    return this.InitRangeAsyncCallback = t => {
      this.InitRangeAsyncCallback = void 0, this.Ken(t)
    }, this.InitRangeActorAsync(), !0
  }
  OnActivate() {
    this.xen = !0, this.QKs()
  }
  OnTick() {
    if (this.toh) {
      for (const e of this.ken) {
        var t = this.noh(e);
        this.soh(e, t) && (t ? this.aoh(e, !1) : this.aoh(e, !0))
      }
      this.hoh()
    }
  }
  OnEnd() {
    return (this.InitRangeAsyncCallback = void 0) !== this.Ben && (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ben), this.Ben = void 0), this.Een?.IsValid() && this.Zen && (this.Een.OnTriggerVolumeAddToSubsystem.Remove(this.Zen), this.Een = void 0, this.Zen = void 0), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.Xen) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.Xen), EventSystem_1.EventSystem.RemoveAllTargetUseKey(this), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.GUe) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RoleTriggerInit, this.Woh) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleTriggerInit, this.Woh), this.w7a && TimerSystem_1.TimerSystem.Has(this.w7a) && (TimerSystem_1.TimerSystem.Remove(this.w7a), this.w7a = void 0), this.atn(), this.kA1.length = 0, this.OA1 && (this.OA1.length = 0), this.yen = void 0, this.Den && (this.Ien?.IsValid() && (this.Ien.SetActorEnableCollision(!1), ActorSystem_1.ActorSystem.Put("RangeComponent.OnEnd1", this.Ien)), this.F0a?.IsValid()) && (this.F0a.SetActorEnableCollision(!1), ActorSystem_1.ActorSystem.Put("RangeComponent.OnEnd2", this.F0a)), this.Ien = void 0, this.F0a = void 0, this.tOl = void 0, this.Den = !1, this.Wen?.clear(), !0
  }
  ht_() {
    var t = this.bjo;
    "Volume" !== t.Type && "ActorRefVolume" !== t.Type && "ActorCollision" !== t.Type && (this.Dzl?.Start(), this.Qen(), this.Bzl(), this.lt_(), this.Dzl?.Stop())
  }
  Qoh() {
    return !(!this.xen || !this.wen || this.Entity.IsEnd || !RoleTriggerController_1.RoleTriggerController.IsInitTrigger)
  }
  InitRangeActorAsync() {
    this.Ren = !1;
    const i = this.bjo;
    switch (i.Type) {
      case "Box":
      case "Sphere":
      case "HollowSphere":
        this.InitRangeAsyncCallback?.(this.qA1(i));
        break;
      case "Combination":
        this.InitRangeAsyncCallback?.(this.GA1(i));
        break;
      case "Cylinder":
      case "HollowCylinder":
      case "Cone": {
        const s = "Cone" === i.Type ? CommonParamById_1.configCommonParamById.GetStringConfig(CONE_COMMON_PARAM_ID) : CommonParamById_1.configCommonParamById.GetStringConfig(CYLINDER_COMMON_PARAM_ID);
        if (this.Ben && ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ben), !s) {
          this.InitRangeAsyncCallback?.(!1);
          break
        }
        this.Ben = ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.Object, t => {
          this.Ben = void 0, t instanceof UE.StaticMesh ? this.InitRangeAsyncCallback?.(this.Jua(i, t)) : (Log_1.Log.CheckError() && Log_1.Log.Error("Entity", 39, "[RangeComponent] 基础静态网格体配置错误", ["MeshPath", s]), this.InitRangeAsyncCallback?.(!1))
        });
        break
      }
      case "Volume":
        this.Een = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroTriggerVolumeManager.StaticClass()), this.Zen && (this.Een.OnTriggerVolumeAddToSubsystem.Remove(this.Zen), this.Zen = void 0);
        var t = this.Een?.GetKuroTriggerVolume(new UE.FName(i.VolumeKey));
        t ? this.InitRangeAsyncCallback?.(this.mtn(i, t)) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Entity", 39, "[RangeComponent] KuroTriggerVolume未找到，等待加载", ["VolumeKey", i?.VolumeKey], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), this.Zen = t => {
          t?.toString() === i.VolumeKey && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Entity", 39, "[RangeComponent] KuroTriggerVolume已加载", ["VolumeKey", i?.VolumeKey], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), t = this.Een?.GetKuroTriggerVolume(t), this.InitRangeAsyncCallback?.(!!t && this.mtn(i, t)), this.Zen) && (this.Een?.OnTriggerVolumeAddToSubsystem.Remove(this.Zen), this.Zen = void 0)
        }, this.Een.OnTriggerVolumeAddToSubsystem.Add(this.Zen));
        break;
      case "ActorRefVolume":
        this.Ren = !0, this.InitRangeAsyncCallback?.(!0);
        break;
      case "ActorCollision":
        this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass()), this.Rhl && (this.aln.OnAddToSubsystem.Remove(this.Rhl), this.Rhl = void 0);
        var t = i.ActorRef.PathName.split(".")[1] + "." + i.ActorRef.PathName.split(".")[2],
          e = this.aln.GetActor(new UE.FName(t));
        e ? this.InitRangeAsyncCallback?.(this.Uhl(e)) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Entity", 31, "[RangeComponent] Actor未找到，等待加载", ["Key", t], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), this.Rhl = t => {
          var e = i.ActorRef.PathName.split(".")[1] + "." + i.ActorRef.PathName.split(".")[2];
          t?.toString() === e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Entity", 31, "[RangeComponent] Actor已加载", ["Key", e], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), e = this.aln?.GetActor(t), this.InitRangeAsyncCallback?.(!!e && this.Uhl(e)), this.Rhl) && (this.aln?.OnAddToSubsystem.Remove(this.Rhl), this.Rhl = void 0)
        }, this.aln.OnAddToSubsystem.Add(this.Rhl));
        break;
      default:
        this.InitRangeAsyncCallback?.(!1)
    }
  }
  qA1(t) {
    this.Ien = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.Den = !0;
    var e = this.NA1(t);
    if (!e) return !1;
    if (this.kA1.push(e), this.Uen) {
      this.F0a = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
      e = this.VA1(t);
      if (!e) return !1;
      this.OA1 = [e]
    }
    return !0
  }
  GA1(t) {
    this.Ien = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.Ien?.AddComponentByClass(UE.SceneComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1), this.Den = !0, this.kA1 = [];
    for (const s of t.CombinationShapes) {
      var e = this.NA1(s);
      if (!e) return !1;
      e.bEditableWhenInherited = !0, this.kA1.push(e)
    }
    if (this.Uen) {
      this.F0a = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.F0a?.AddComponentByClass(UE.SceneComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1), this.OA1 = [];
      for (const h of t.CombinationShapes) {
        var i = this.VA1(h);
        if (!i) return !1;
        this.OA1.push(i)
      }
    }
    return !this.Uen || this.kA1.length === t.CombinationShapes.length
  }
  NA1(t) {
    t = this.FA1(t, this.Ien);
    if (t?.IsValid()) return t;
    Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] ShapeComp创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()])
  }
  VA1(t) {
    t = this.FA1(t, this.F0a);
    if (t?.IsValid()) return t.SetCollisionEnabled(0), t;
    Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] BoxShape(ExpandedExit)创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()])
  }
  FA1(t, e) {
    t = ("Box" === t.Type ? UE.BoxComponent : UE.SphereComponent).StaticClass(), e = e?.AddComponentByClass(t, !1, MathUtils_1.MathUtils.DefaultTransform, !1);
    if (e?.IsValid()) return e.SetCollisionEnabled(0), e
  }
  Jua(t, e) {
    if (this.Ien = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.Den = !0, this.yen = this.Ien?.AddComponentByClass(UE.StaticMeshComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1, new UE.FName("MeshComp")), !this.yen?.IsValid()) return Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] MeshComp创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), !1;
    if (this.yen.SetCollisionEnabled(0), this.yen.SetStaticMesh(e), this.yen.SetHiddenInGame(!0), this.yen.SetVisibility(!1), this.Uen) {
      if (this.F0a = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble), this.Pen = this.F0a?.AddComponentByClass(UE.StaticMeshComponent.StaticClass(), !1, MathUtils_1.MathUtils.DefaultTransform, !1, new UE.FName("ExpandedExitMeshComp")), !this.Pen?.IsValid()) return Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] MeshComp(ExpandedExit)创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), !1;
      this.Pen.SetCollisionEnabled(0), this.Pen.SetStaticMesh(e), this.Pen.SetHiddenInGame(!0), this.Pen.SetVisibility(!1)
    }
    return !0
  }
  mtn(t, e) {
    var i, s;
    return this.Ien = e, this.Den = !1, e?.IsValid() ? (GlobalData_1.GlobalData.IsPlayInEditor && (i = (0, puerts_1.$ref)(void 0), s = (0, puerts_1.$ref)(void 0), e.D_GetActorBounds(!1, i, s), 27e9 < (e = (0, puerts_1.$unref)(s)).X * e.Y * e.Z) && Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 29, "[RangeComponent] TriggerVolume配置过大，请联系相关人员", ["ConfigId", this.EIe.GetPbDataId()]), !0) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 29, "[RangeComponent] KuroTriggerVolume非Valid", ["VolumeKey", t?.VolumeKey], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), !1)
  }
  Uhl(t) {
    return this.Ien = t, this.Den = !1, !!t?.IsValid() || (Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 29, "[RangeComponent] CollisionActor非Valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), !1)
  }
  Qen() {
    this.Ren || this.Den && this.Izl()
  }
  Izl() {
    if (this.Ien && this.Den && !this.Ren) {
      var t = this.bjo;
      if ("Volume" !== t.Type && "ActorRefVolume" !== t.Type && "ActorCollision" !== t.Type) {
        this.tOl?.IsValid() || (this.tOl = this.Entity.GetComponent(1)?.Owner);
        var e = Transform_1.Transform.Create(this.tOl?.D_GetTransform() ?? this.EIe.D_GetTransform()),
          i = Transform_1.Transform.Create(),
          s = this.Uen && this.F0a?.IsValid() ? Transform_1.Transform.Create() : void 0;
        switch (t.Type) {
          case "Combination":
            this.YA1(t, e, i, s);
            break;
          case "Cylinder":
          case "HollowCylinder":
          case "Cone":
            this.iO1(t, e, i, s);
            break;
          default:
            this.JA1(t, e, i, s)
        }
      }
    }
  }
  YA1(e, i, s, h) {
    this.Ien.D_K2_SetActorTransform(i.ToUeTransform(), !1, void 0, !0), this.F0a?.D_K2_SetActorTransform(i.ToUeTransform(), !1, void 0, !0);
    for (let t = 0; t < e.CombinationShapes.length; t++) {
      var o = e.CombinationShapes[t],
        r = this.kA1[t],
        a = this.OA1?.[t];
      this.zA1(o, i, s, h), this.XA1(o, r, a), r?.D_K2_SetWorldTransform(s.ToUeTransform(), !1, void 0, !0), h && a && a?.IsValid() && a.D_K2_SetWorldTransform(h.ToUeTransform(), !1, void 0, !0)
    }
  }
  JA1(t, e, i, s) {
    this.kA1.length < 1 || this.OA1 && this.OA1.length < 1 || (this.zA1(t, e, i, s), this.XA1(t, this.kA1[0], this.OA1?.[0]), this.rO1(i, s))
  }
  iO1(t, e, i, s) {
    this.yen && this.yen.IsValid() && (this.zA1(t, e, i, s), this.oO1(t, i, s), this.rO1(i, s))
  }
  zA1(t, e, i, s) {
    this.WA1(t, e, i, s), this.QA1(t, e, i, s)
  }
  WA1(t, e, i, s) {
    "Volume" !== t.Type && "ActorRefVolume" !== t.Type && "ActorCollision" !== t.Type && "Combination" !== t.Type && (MathUtils_1.MathUtils.CommonTempVector.Set(t.Center.X ?? 0, t.Center.Y ?? 0, t.Center.Z ?? 0), e.TransformPositionNoScale(MathUtils_1.MathUtils.CommonTempVector, MathUtils_1.MathUtils.CommonTempVector), i.SetLocation(MathUtils_1.MathUtils.CommonTempVector), s?.SetLocation(MathUtils_1.MathUtils.CommonTempVector))
  }
  QA1(t, e, i, s) {
    MathUtils_1.MathUtils.CommonTempRotator.Set(0, 0, 0), "Box" === t.Type && t.Rotator && MathUtils_1.MathUtils.CommonTempRotator.Set(t.Rotator.Y ?? 0, t.Rotator.Z ?? 0, t.Rotator.X ?? 0), e.TransformRotation(MathUtils_1.MathUtils.CommonTempRotator, MathUtils_1.MathUtils.CommonTempQuat), i.SetRotation(MathUtils_1.MathUtils.CommonTempQuat), s?.SetRotation(MathUtils_1.MathUtils.CommonTempQuat)
  }
  XA1(t, e, i) {
    switch (t.Type) {
      case "Box":
        this.jA1(t, e, i || void 0);
        break;
      case "HollowSphere":
      case "Sphere":
        this.HA1(t, e, i || void 0)
    }
  }
  oO1(t, e, i) {
    switch (t.Type) {
      case "Cylinder":
      case "HollowCylinder":
      case "Cone":
        this.$A1(t, e, i)
    }
  }
  jA1(t, e, i) {
    t = new UE.VectorDouble(t.Size.X ?? 0, t.Size.Y ?? 0, t.Size.Z ?? 0);
    e?.D_SetBoxExtent(t, !1), this.Uen && i?.D_SetBoxExtent(t.op_Addition(this.Uen), !1)
  }
  HA1(t, e, i) {
    e?.SetSphereRadius(t.Radius, !1), this.Uen && i?.SetSphereRadius(t.Radius + this.Uen, !1)
  }
  $A1(t, e, i) {
    var s, h;
    this.yen?.StaticMesh && (h = this.yen.StaticMesh.GetBounds().BoxExtent, s = t.Radius / h.X, h = t.Height / (2 * h.Z), MathUtils_1.MathUtils.CommonTempVector.Set(s, s, h), e.SetScale3D(MathUtils_1.MathUtils.CommonTempVector), this.Uen) && this.Pen?.StaticMesh && (s = this.Pen.StaticMesh.GetBounds().BoxExtent, h = (t.Radius + this.Uen) / s.X, e = (t.Height + this.Uen) / (2 * s.Z), MathUtils_1.MathUtils.CommonTempVector.Set(h, h, e), i?.SetScale3D(MathUtils_1.MathUtils.CommonTempVector))
  }
  rO1(t, e) {
    this.Ien.D_K2_SetActorTransform(t.ToUeTransform(), !1, void 0, !0), e && this.F0a.D_K2_SetActorTransform(e.ToUeTransform(), !1, void 0, !0)
  }
  Bzl() {
    var t;
    this.Ien && this.Den && !this.Ren && "Volume" !== (t = this.bjo).Type && "ActorRefVolume" !== t.Type && "ActorCollision" !== t.Type && (t = this.tOl)?.IsValid() && (this.Ien?.K2_AttachToActor(t, void 0, 1, 1, 1, !1), this.F0a?.K2_AttachToActor(t, void 0, 1, 1, 1, !1))
  }
  tfu(t) {
    return !!t?.op_Equality(ROLETRIGGER_COLLISION_PRESET)
  }
  lt_() {
    var t = this.bjo;
    "Volume" !== t.Type && "ActorRefVolume" !== t.Type && "ActorCollision" !== t.Type && (this.jKl ? this.ifu(this.eP1, !1, !0) : (t = !this.tfu(this.HKl), this.ifu(this.eP1, !0, t), t || RoleTriggerController_1.RoleTriggerController.UpdateOverlaps()))
  }
  ifu(t, ...e) {
    if (this.kA1?.length)
      for (const i of this.kA1) t(i, ...e);
    else this.yen && t(this.yen, ...e);
    if (this.OA1?.length)
      for (const s of this.OA1) t(s, ...e);
    else this.Pen && t(this.Pen, ...e)
  }
  Yen() {
    switch (this.bjo.Type) {
      case "ActorCollision":
      case "Volume":
      case "Box":
      case "Sphere":
      case "HollowSphere":
      case "Cylinder":
      case "HollowCylinder":
      case "Cone":
      case "Combination":
        this.Ien?.IsValid() ? this.Uen ? this.F0a?.IsValid() ? (this.Ien.OnActorBeginOverlap.Add(this.otn), this.F0a.OnActorEndOverlap.Add(this.rtn)) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] ExpandedExitRangeActor Not Valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]) : (this.Ien.OnActorBeginOverlap.Add(this.otn), this.Ien.OnActorEndOverlap.Add(this.rtn)) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] RangeActor Not Valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
        break;
      case "ActorRefVolume":
        this.Men ? this.Men.AddOnPlayerOverlapCallback(this.ltn, !1) : Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] RefComponent Not Valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
        break;
      default:
        Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] 不支持的配置类型", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()])
    }
  }
  atn() {
    var t = this.bjo;
    this.Ien?.IsValid() && (this.Ien.OnActorBeginOverlap.Remove(this.otn), this.Ien.OnActorEndOverlap.Remove(this.rtn)), this.F0a?.IsValid() && this.F0a.OnActorEndOverlap.Remove(this.rtn), "ActorRefVolume" === t.Type && this.Men && this.Men.RemoveOnPlayerOverlapCallback(this.ltn)
  }
  rP1(t, e, i, s = !0) {
    var h;
    this.toh && (h = this.noh(t), this.soh(t, h), e || (this.eoh?.delete(t), i?.Valid && this.$Tl?.delete(i.Id)), h = !(h && e), this.oP1(t, e, i, s && h, h), this.hoh())
  }
  oP1(t, e, i, s, h = !0) {
    t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() && (this.Fen = e), this.ptn(t, e, h), i?.Valid && (this.htn(i, e, s, h), this.ntn(t, i, e, s, h))
  }
  nP1(t) {
    var e;
    return t.Id === this.Entity.Id || (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), !!(((t = t.Entity.GetComponent(0))?.IsRole() && t.GetPlayerId() !== e) ?? (t?.IsVision() && t.GetSummonerPlayerId() !== e)))
  }
  ttn(t, e, i = !0) {
    if (t?.IsValid()) {
      var s = this.ftn(t);
      if (s?.Valid) {
        if (this.nP1(s)) return;
        var h = s.Entity?.GetComponent(202);
        if (h && !h.IsReadyForOverlap && (t === h?.Owner || t === h.GetMainCollisionActor())) return
      }
      switch (this.bjo?.Type) {
        case "HollowSphere":
        case "HollowCylinder":
          this.rP1(t, e, s, i);
          break;
        default:
          this.oP1(t, e, s, i)
      }
    }
  }
  aoh(t, e) {
    var i;
    t?.IsValid() && (i = this.ftn(t), this.rfu(e, t), this.q7a(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, e, t), i?.Valid) && (e ? this.$Tl?.has(i.Id) && this.$Tl?.delete(i.Id) : this.$Tl?.set(i.Id, i), this.ofu(e, i), this.q7a(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, e, i), this.ReqEntityAccessRange(e, [i]), this.ReqMyPlayerAccessRange(e, i), this.ntn(t, i, e, !1))
  }
  zen(e) {
    if (this.Ren) this.Men?.IsPlayerOverlappedRefVolume() && this.ttn(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), !0, e);
    else if (this.Ien?.IsValid()) {
      var t = (0, puerts_1.$ref)(void 0),
        i = (this.Ien.GetOverlappingActors(t), (0, puerts_1.$unref)(t)),
        s = i?.Num() ?? 0;
      if (0 < s)
        for (let t = 0; t < s; t++) {
          var h = i.Get(t);
          this.ttn(h, !0, e)
        }
    } else Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] ForceCheckOverlapAndCallbackEnter失败 Actor not valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()])
  }
  stn(t) {
    var e;
    this.Ven && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ?? 0)) && this.ntn(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), e, !1, t);
    const i = [],
      s = (this.Oen?.forEach(t => {
        i.push(t)
      }), this.htn(i, !1, t), []);
    this.ken?.forEach(t => {
      s.push(t)
    }), s.forEach(t => {
      this.ptn(t, !1)
    }), this.Ven = !1, this.Oen.clear(), this.ken.clear()
  }
  $Ks() {
    var t = [],
      e = this.Ven;
    if (this.WKs)
      for (var [, i] of this.Oen) {
        i = (i.Entity?.GetComponent(0))?.GetCreatureDataId();
        if (!i) break;
        t.push(i)
      }
    this.ReqInitRange(t, e, t => {
      if (t && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        this.jKs = !0;
        var e = MathUtils_1.MathUtils.LongToNumber(t.zWn),
          i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e),
          s = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
        if (i.Valid && i.Entity?.Valid) {
          if (s?.Valid)
            for (const n of Object.keys(t.dL_._L_)) {
              var h = t.dL_._L_[n];
              RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.EmitMessage(i.Entity, t.dL_.i6n, Number(n), s, h)
            }
          for (const l of t.cL_) {
            var o = MathUtils_1.MathUtils.LongToNumber(l.g6n),
              r = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
            if (r?.Valid && r.Entity?.Valid)
              for (const _ of Object.keys(l._L_)) {
                var a = l._L_[_];
                RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.EmitMessage(i.Entity, l.i6n, Number(_), r.Entity, a)
              }
          }
        }
      } else Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[RangeComponent] ReqInitRange出错", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["PbDataId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()])
    })
  }
  ftn(t) {
    if (t?.IsValid()) return t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() ? Global_1.Global.BaseCharacter?.IsValid() ? ModelManager_1.ModelManager.CreatureModel?.GetEntityById(Global_1.Global.BaseCharacter.EntityId) : void 0 : ModelManager_1.ModelManager.CreatureModel?.GetEntityByChildActor(t)
  }
  htn(e, i, s = !0, h = !0) {
    if (e) {
      let t = e;
      if (Array.isArray(t)) {
        if (!t.length) return
      } else t = [t];
      var o = [];
      for (const r of t) {
        let t = !1;
        i ? r.Entity?.GetComponent(0)?.GetRemoveState() || this.Oen.has(r.Id) || (this.Oen.set(r.Id, r), EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.zpe), t = !0) : this.Oen.has(r.Id) && (this.Oen.delete(r.Id), EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, r, EventDefine_1.EEventName.RemoveEntity, this.zpe), t = !0), t && h && (this.ofu(i, r), this.q7a(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, i, r)), t && s && o.push(r)
      }
      s && 0 < o.length && this.ReqEntityAccessRange(i, o)
    }
  }
  ntn(t, e, i, s = !0, h = !0) {
    if (t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() && e.Id === Global_1.Global.BaseCharacter?.EntityId) {
      let t = !1;
      if (i ? this.Ven || (this.Ven = !0, t = !0) : this.Ven && (this.Ven = !1, t = !0), t && h) {
        for (let t = this.ben.length - 1; 0 <= t; t--) {
          var o = this.ben[t];
          try {
            o?.(i)
          } catch {
            Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[RangeComp] 范围组件回调异常，请检查之前的报错")
          }
        }
        this.q7a(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, i)
      }
      t && s && this.ReqMyPlayerAccessRange(i, e)
    }
  }
  ptn(t, e, i = !0) {
    if (e) {
      if (this.ken.has(t)) return;
      this.ken.add(t)
    } else {
      if (!this.ken.has(t)) return;
      this.ken.delete(t)
    }
    i && (this.rfu(e, t), this.q7a(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, e, t))
  }
  ofu(e, i) {
    for (let t = this.qen.length - 1; 0 <= t; t--) {
      var s = this.qen[t];
      try {
        s?.(e, i)
      } catch {
        Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[RangeComp] 范围组件回调异常，请检查之前的报错", ["PbDataId", this.EIe?.GetPbDataId()], ["IsEnter", e])
      }
    }
  }
  rfu(e, i) {
    for (let t = this.Nen.length - 1; 0 <= t; t--) {
      var s = this.Nen[t];
      try {
        s?.(e, i)
      } catch {
        Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[RangeComp] 范围组件回调异常，请检查之前的报错")
      }
    }
  }
  q7a(...t) {
    var e, i;
    this.x7a ? (this.P7a || (this.P7a = new Queue_1.Queue), this.P7a.Push(t), this.w7a && TimerSystem_1.TimerSystem.Has(this.w7a) || (this.w7a = TimerSystem_1.TimerSystem.Next(this.B7a))) : ([t, e, ...i] = t, t ? EventSystem_1.EventSystem.EmitWithTarget(t, e, ...i) : EventSystem_1.EventSystem.Emit(e, ...i))
  }
  AddOnPlayerOverlapCallback(t) {
    this.ben?.push(t)
  }
  RemoveOnPlayerOverlapCallback(t) {
    void 0 === this.ben || (t = this.ben.indexOf(t)) < 0 || this.ben.splice(t, 1)
  }
  AddOnEntityOverlapCallback(t) {
    this.qen?.push(t)
  }
  RemoveOnEntityOverlapCallback(t) {
    void 0 === this.qen || (t = this.qen.indexOf(t)) < 0 || this.qen.splice(t, 1)
  }
  AddOnActorOverlapCallback(t) {
    this.Nen?.push(t)
  }
  RemoveOnActorOverlapCallback(t) {
    void 0 === this.Nen || (t = this.Nen.indexOf(t)) < 0 || this.Nen.splice(t, 1)
  }
  ServerUpdateEntitiesInRangeOnline(i, t) {
    let e = void 0;
    if (Array.isArray(t)) {
      if (!t.length) return;
      e = t
    } else e = [t];
    e.forEach(t => {
      this.Wen?.has(t) && this.Wen.delete(t);
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t);
      e ? (i ? this.Hen?.set(e.Id, e) : this.Hen?.delete(e.Id), this.GetIsLocalSetupComplete() && EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeOnline, i, e)) : this.Wen.set(t, i)
    })
  }
  ServerUpdatePlayerInRangeOnline(e, t) {
    let i = void 0;
    if (Array.isArray(t)) {
      if (!t.length) return;
      i = t
    } else i = [t];
    i.forEach(t => {
      e ? this.jen?.add(t) : this.jen?.delete(t), this.GetIsLocalSetupComplete() && EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnPlayerInOutRangeOnline, e, t)
    })
  }
  ReqMyPlayerAccessRange(t, e) {
    var i, s, h;
    this.KKs && (h = (s = e.Entity?.GetComponent(0))?.GetCreatureDataId()) && (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY) && (i = e.Entity?.GetComponent(1), Log_1.Log.CheckInfo()) && Log_1.Log.Info("SceneItem", 39, "[RangeComp] 本机玩家进出:(发起PlayerAccessRange)", ["PbDataId", this.EIe?.GetPbDataId()], ["CreatureDataId", this.EIe?.GetCreatureDataId()], ["IsEnter", t], ["OtherPbDataId", s?.GetPbDataId()], ["OtherCreatureId", h], ["OtherLocation", i?.ActorLocationProxy]), (e.Entity?.GetComponent(3))?.ResetLocationCachedTime(), (s = e.Entity?.GetComponent(68))?.GetEnableMovementSync() && s.CollectSampleAndSend(!0), (h = Protocol_1.Aki.Protocol.Ugs.create()).zWn = this.EIe.GetCreatureDataId(), h.i6n = t ? Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter : Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave, Net_1.Net.Call(28654, h, t => {
      if (t && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        var e = MathUtils_1.MathUtils.LongToNumber(t.zWn),
          i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e),
          s = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
        if (i.Valid && i.Entity?.Valid && s?.Valid)
          for (const o of Object.keys(t.uL_._L_)) {
            var h = t.uL_._L_[o];
            RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.EmitMessage(i.Entity, t.uL_.i6n, Number(o), s, h)
          }
      }
    }))
  }
  ReqEntityAccessRange(t, e) {
    if (this.WKs && e?.length) {
      var i = [];
      for (const r of e) {
        var s, h = r.Entity?.GetComponent(0),
          o = h?.GetCreatureDataId();
        o && (i.push(o), ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY) && (s = r.Entity?.GetComponent(1), Log_1.Log.CheckInfo()) && Log_1.Log.Info("SceneItem", 39, "[RangeComp] 实体进出:(加入EntityAccessRange队列)", ["PbDataId", this.EIe?.GetPbDataId()], ["CreatureDataId", this.EIe?.GetCreatureDataId()], ["IsEnter", t], ["OtherPbDataId", h?.GetPbDataId()], ["OtherCreatureId", o], ["OtherPos", s?.ActorLocationProxy]), (r.Entity?.GetComponent(1))?.ResetLocationCachedTime(), (h = r.Entity?.GetComponent(67))?.GetEnableMovementSync()) && h.CollectSampleAndSend(!0)
      }
      e = Protocol_1.Aki.Protocol.Ags.create();
      e.zWn = this.EIe.GetCreatureDataId(), e.HKs = i, e.i6n = t ? Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter : Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave, Net_1.Net.Call(28309, e, t => {
        if (t && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          var e = MathUtils_1.MathUtils.LongToNumber(t.zWn),
            i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
          if (i.Valid && i.Entity?.Valid)
            for (const r of t.cL_) {
              var s = MathUtils_1.MathUtils.LongToNumber(r.g6n),
                h = ModelManager_1.ModelManager.CreatureModel.GetEntity(s);
              if (h?.Valid && h.Entity?.Valid)
                for (const a of Object.keys(r._L_)) {
                  var o = r._L_[a];
                  RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.EmitMessage(i.Entity, r.i6n, Number(a), h.Entity, o)
                }
            }
        }
      })
    }
  }
  ReqInitRange(t, e, i = () => {}) {
    var s = Protocol_1.Aki.Protocol.v$s.create();
    s.zWn = this.EIe.GetCreatureDataId(), s.JKs = t, s.zKs = e, Net_1.Net.Call(29596, s, i)
  }
  IsOverlappingPlayer() {
    return this.Ven
  }
  IsEntityInRange(t, e = !1) {
    let i = void 0;
    return i = e ? (this.Oen?.has(t) && !this.$Tl?.has(t)) ?? !1 : this.Oen?.has(t) ?? !1
  }
  UpdateBoxRange(t, e) {
    !this.Ien || this.kA1.length < 1 || !this.kA1[0] || (1 < this.kA1.length ? Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 79, "[RangeComponent] 风扇实体不支持组合范围", ["ConfigId", this.EIe.GetPbDataId()]) : "Box" === this.bjo.Type && (this.Ien.D_K2_SetActorRelativeLocation(t, !1, void 0, !0), this.kA1[0]?.D_SetBoxExtent(e, !0), GlobalData_1.GlobalData.IsPlayInEditor && 216e9 < e.X * e.Y * e.Z && Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 29, "[RangeComponent] Trigger Box配置过大，请联系相关人员", ["ConfigId", this.EIe.GetPbDataId()]), this.Uen) && (this.F0a?.D_K2_SetActorRelativeLocation(t, !1, void 0, !0), this.OA1) && 0 < this.OA1.length && this.OA1[0]?.D_SetBoxExtent(e.op_Addition(this.Uen), !0))
  }
  SetRangeActorParent(t) {
    if (this.tOl = t?.IsValid() ? t : this.Entity.GetComponent(1)?.Owner, this.Ien?.IsValid() && this.Den && !this.Ren && this.wen) {
      if (this.Ien?.K2_DetachFromActor(1, 1, 1), this.F0a?.K2_DetachFromActor(1, 1, 1), 0 < this.kA1.length)
        for (const e of this.kA1) e.bKuroPassiveCollision && e?.KuroSetPassiveCollision(!1, !1);
      else this.yen?.bKuroPassiveCollision && this.yen?.KuroSetPassiveCollision(!1, !1);
      if (this.OA1 && 0 < this.OA1.length)
        for (const i of this.OA1) i.bKuroPassiveCollision && i?.KuroSetPassiveCollision(!1, !1);
      else this.Pen?.bKuroPassiveCollision && this.Pen?.KuroSetPassiveCollision(!1, !1);
      this.ht_()
    }
  }
  roh(t) {
    void 0 === this.sxr && (this.sxr = this.Disable(t))
  }
  loh(t) {
    void 0 !== this.sxr && (this.Enable(this.sxr, t), this.sxr = void 0)
  }
  hoh() {
    void 0 !== this.sxr ? this.ken && 0 < this.ken.size && this.loh("Range范围内有实体或Actor") : this.ken && 0 !== this.ken.size || this.roh("Range范围内没有实体或Actor")
  }
  noh(t) {
    var e = this.bjo?.Type;
    if (!e) return !1;
    let i = !1;
    this.ioh.FromUeVector(t.D_K2_GetActorLocation());
    var s = this.Hte.ActorLocationProxy;
    switch (e) {
      case "HollowSphere":
        var h = Vector_1.Vector.DistSquared(this.ioh, s);
        i = h < this.bjo.InnerRadius * this.bjo.InnerRadius;
        break;
      case "HollowCylinder":
        h = Vector_1.Vector.DistSquared2D(this.ioh, s);
        i = h < this.bjo.InnerRadius * this.bjo.InnerRadius;
        break;
      default:
        return !1
    }
    return i
  }
  soh(t, e) {
    return e && !this.eoh?.has(t) ? (this.eoh?.add(t), !0) : !(e || !this.eoh?.has(t) || (this.eoh?.delete(t), 0))
  }
};
RangeComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(86)], RangeComponent), exports.RangeComponent = RangeComponent;
//# sourceMappingURL=RangeComponent.js.map