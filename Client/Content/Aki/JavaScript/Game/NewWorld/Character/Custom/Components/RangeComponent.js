"use strict";

var RangeComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var o = arguments.length;
  var n = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        n = (o < 3 ? h(n) : o > 3 ? h(e, i, n) : h(e, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Queue_1 = require("../../../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleTriggerController_1 = require("../../Role/RoleTriggerController");
const RangeComponentConfigHelper_1 = require("../RangeComponentConfigHelper");
const RangeComponentMessageManager_1 = require("../RangeComponentMessageManager");
const FULL_COLLISION_PRESET = new UE.FName("TriggerComponent");
const ROLETRIGGER_COLLISION_PRESET = new UE.FName("RangeComp_RoleTriggerOnly");
const DEBUG_DETAIL_KEY = "RangeComponent";
const CYLINDER_COMMON_PARAM_ID = "BaseCylinderStaticMeshForRange";
const CONE_COMMON_PARAM_ID = "BaseConeStaticMeshForRange";
let RangeComponent = RangeComponent_1 = class RangeComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Kua = undefined;
    this.Xua = undefined;
    this.Dzl = undefined;
    this.EIe = undefined;
    this.Hte = undefined;
    this.Men = undefined;
    this.bjo = undefined;
    this.AYd = undefined;
    this.DYd = undefined;
    this.Een = undefined;
    this.aln = undefined;
    this._P1 = new Array();
    this.yen = undefined;
    this.Ien = undefined;
    this.tOl = undefined;
    this.Den = false;
    this.Ren = false;
    this.Uen = 0;
    this.uP1 = undefined;
    this.Pen = undefined;
    this.F0a = undefined;
    this.xen = false;
    this.wen = false;
    this.joh = false;
    this.bEd = false;
    this.jKs = false;
    this.Ben = undefined;
    this.ben = undefined;
    this.qen = undefined;
    this.Nen = undefined;
    this.Oen = undefined;
    this.ken = undefined;
    this.eoh = undefined;
    this.$Tl = undefined;
    this.Fen = false;
    this.Ven = false;
    this.Hen = undefined;
    this.jen = undefined;
    this.Wen = undefined;
    this.WKs = false;
    this.KKs = false;
    this.toh = false;
    this.sxr = undefined;
    this.x7a = false;
    this.P7a = undefined;
    this.w7a = undefined;
    this.jKl = false;
    this.HKl = undefined;
    this.ioh = Vector_1.Vector.Create();
    this.Ken = t => {
      if (t && (this.Ien?.IsValid() || this.Ren)) {
        if (ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id)?.Valid) {
          this.ht_();
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.GUe);
          if (!RoleTriggerController_1.RoleTriggerController.IsInitTrigger) {
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleTriggerInit, this.Woh);
          }
          this.roh("RangeComp初始化关闭Tick");
          this.wen = true;
          this.QKs();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] 查询自身实体Handle失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 29, "[RangeComponent] RangeActor初始化失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
      }
    };
    this.Woh = () => {
      this.QKs();
    };
    this.QKs = () => {
      if (!this.GetIsLocalSetupComplete()) {
        if (this.Qoh() && (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY) && Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItem", 39, "[RangeComponent] 完成初始化(开始)", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()]), this.REd(), this.zen(false), this.GetIsNotServerRange() || this.$Ks(), this.joh = true, ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY)) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[RangeComponent] 完成初始化(结束)", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()]);
        }
      }
    };
    this.Zen = undefined;
    this.Rhl = undefined;
    this.InitRangeAsyncCallback = undefined;
    this.LP1 = (t, e, i) => {
      if (t && (t.SetCollisionProfileName(this.HKl, i), e)) {
        t.bKuroPassiveCollisionUpdateOverlapsWhenEnterOverlap = true;
        t.KuroSetPassiveCollision(true, false);
      }
    };
    this.otn = (t, e) => {
      this.Kua?.Start();
      this.ttn(e, true);
      this.Kua?.Stop();
    };
    this.rtn = (t, e) => {
      this.Xua?.Start();
      this.ttn(e, false);
      this.Xua?.Stop();
    };
    this.B7a = () => {
      if (this.w7a && TimerSystem_1.TimerSystem.Has(this.w7a)) {
        TimerSystem_1.TimerSystem.Remove(this.w7a);
      }
      this.w7a = undefined;
      while (this.P7a && !this.P7a.Empty) {
        var [t, e, ...i] = this.P7a.Pop();
        if (t) {
          EventSystem_1.EventSystem.EmitWithTarget(t, e, ...i);
        } else {
          EventSystem_1.EventSystem.Emit(e, ...i);
        }
      }
    };
    this.Xen = (t, e) => {
      if (t?.Valid && this.Fen !== this.Ven) {
        this.ntn(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), t, this.Fen);
      }
    };
    this.GUe = (t, e, i) => {
      var s;
      if (e?.Valid && (e = e.Entity?.GetComponent(0)?.GetCreatureDataId()) && this.Wen?.has(e)) {
        s = !!this.Wen.get(e);
        this.ServerUpdateEntitiesInRangeOnline(s, e);
      }
    };
    this.zpe = (t, e) => {
      if (e?.Valid) {
        if (e.Id === this.Entity.Id) {
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.zpe);
          this.stn(false);
          this.wEd();
        } else if (this.Oen?.has(e.Id)) {
          this.htn(e, false, false);
        }
      }
    };
    this.ltn = t => {
      this.ttn(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), t);
    };
  }
  GetRangeActor() {
    if (this.Ien?.IsValid()) {
      return this.Ien;
    } else {
      return undefined;
    }
  }
  GetShapeComps() {
    var t = [];
    for (const e of this._P1) {
      if (e.IsValid()) {
        t.push(e);
      }
    }
    return t;
  }
  GetMeshComp() {
    if (this.yen?.IsValid()) {
      return this.yen;
    } else {
      return undefined;
    }
  }
  GetExpandedExitShapeComps() {
    var t = [];
    if (this.uP1) {
      for (const e of this.uP1) {
        if (e.IsValid()) {
          t.push(e);
        }
      }
    }
    return t;
  }
  GetExpandedExitMeshComp() {
    if (this.Pen?.IsValid()) {
      return this.Pen;
    } else {
      return undefined;
    }
  }
  GetExpandedExitRangeValue() {
    return this.Uen;
  }
  GetRangeType() {
    return this.bjo?.Type;
  }
  GetShapeCompTransform() {
    if (!(this._P1.length < 1) && this._P1[0]?.IsValid()) {
      return this._P1[0].D_GetRelativeTransform();
    } else {
      return undefined;
    }
  }
  GetEntitiesInRangeLocal() {
    return this.Oen;
  }
  GetActorsInRangeLocal() {
    return this.ken;
  }
  GetEntitiesInRangeOnline() {
    return this.Hen;
  }
  GetPlayerInRangeOnline() {
    return this.jen;
  }
  GetIsLocalSetupComplete() {
    return this.joh;
  }
  GetIsSetupComplete() {
    if (this.GetIsNotServerRange()) {
      return this.joh;
    } else {
      return this.joh && this.jKs;
    }
  }
  GetIsNotServerRange() {
    return !this.WKs && !this.KKs;
  }
  GetShapeConfig() {
    return this.bjo;
  }
  OnInitData() {
    this.EIe = this.Entity.GetComponent(0);
    this.Hte = this.Entity.GetComponent(1);
    this.Men = this.Entity.GetComponent(167);
    var t = this.EIe?.GetPbEntityInitData();
    return !!t && (this.XKs(t) ? (this.YKs(t), this.b7a(t), this.ooh(t), this.WKl(t), ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY) && Log_1.Log.CheckInfo() && Log_1.Log.Info("SceneItem", 39, "[RangeComponent] 初始化网络节省配置完成", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["ReqEntityAccessRange", this.WKs], ["ReqPlayerAccessRange", this.KKs]), this.Oen = new Map(), this.Fen = false, this.ken = new Set(), this.eoh = new Set(), this.$Tl = new Map(), this.Hen = new Map(), this.jen = new Set(), this.ben = [], this.qen = [], this.Nen = [], this.wen = false, this.xen = false, this.Wen = new Map(), this.EIe.PbInRangeEntityCreatureDataIds && this.ServerUpdateEntitiesInRangeOnline(true, this.EIe.PbInRangeEntityCreatureDataIds), this.EIe.PbInRangePlayerIds && this.ServerUpdatePlayerInRangeOnline(true, this.EIe.PbInRangePlayerIds), this.Kua = Stats_1.Stat.CreateNoFlameGraph("[RangeComp.BeginOverlap] CfgId:" + this.EIe?.GetPbDataId()), this.Xua = Stats_1.Stat.CreateNoFlameGraph("[RangeComp.EndOverlap] CfgId:" + this.EIe?.GetPbDataId()), this.Dzl = Stats_1.Stat.CreateNoFlameGraph("[RangeComp.SetupRangeActor] CfgId:" + this.EIe?.GetPbDataId()), true) : (Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 29, "[RangeComponent] 范围数据出错", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), false));
  }
  XKs(t) {
    var e = (0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent");
    var i = (0, IComponent_1.getComponent)(t.ComponentsData, "BeamCastComponent");
    var s = (0, IComponent_1.getComponent)(t.ComponentsData, "FanComponent");
    var h = (0, IComponent_1.getComponent)(t.ComponentsData, "MonitorComponent");
    if (e) {
      this.bjo = e.Shape;
      this.AYd = e.SetRangeActorCollisionResponseToChannels;
    } else if (i) {
      i = {
        Type: "Cylinder",
        ...i.Range
      };
      this.bjo = i;
    } else if (s) {
      i = {
        Type: "Box",
        Center: Vector_1.Vector.ZeroVectorProxy,
        Size: Vector_1.Vector.OneVectorProxy
      };
      this.bjo = i;
    } else if (h) {
      s = {
        Type: "Cone",
        ...h.Range
      };
      this.bjo = s;
    }
    return !!this.bjo && (e?.ExtraRange !== undefined ? this.Uen = e.ExtraRange : !(i = (0, IComponent_1.getComponent)(t.ComponentsData, "TriggerComponent")) || this.bjo.Type !== "Box" && this.bjo.Type !== "Cylinder" && this.bjo.Type !== "Sphere" || (this.Uen = i.ExitConfig?.ExtraRange ?? 0), true);
  }
  YKs(e) {
    if ((0, IComponent_1.getComponent)(e.ComponentsData, "RangeComponent")) {
      let t = false;
      for (var [i, s] of RangeComponentConfigHelper_1.RangeComponentConfigHelper.Instance.CompConfig) {
        if ((0, IComponent_1.getComponent)(e.ComponentsData, i)) {
          t = true;
          this.WKs ||= typeof s.NeedReqEntityAccessRange == "boolean" ? s.NeedReqEntityAccessRange : s.NeedReqEntityAccessRange(e);
          this.KKs ||= typeof s.NeedReqPlayerAccessRange == "boolean" ? s.NeedReqPlayerAccessRange : s.NeedReqPlayerAccessRange(e);
        }
      }
      if (!t) {
        this.KKs = true;
      }
    } else {
      this.WKs = false;
      this.KKs = false;
    }
  }
  b7a(t) {
    for (var [e, i] of RangeComponentConfigHelper_1.RangeComponentConfigHelper.Instance.CompConfig) {
      if ((0, IComponent_1.getComponent)(t.ComponentsData, e)) {
        this.x7a ||= typeof i.NeedPendingEmitEvent == "boolean" ? i.NeedPendingEmitEvent : i.NeedPendingEmitEvent(t);
      }
    }
  }
  ooh(t) {
    if ((0, IComponent_1.getComponent)(t.ComponentsData, "RangeComponent") && (t = this.bjo?.Type)) {
      if (t === "HollowCylinder" || t === "HollowSphere") {
        this.toh = true;
      }
    } else {
      this.toh = false;
    }
  }
  WKl(t) {
    let e = false;
    for (var [i, s] of RangeComponentConfigHelper_1.RangeComponentConfigHelper.Instance.CompConfig) {
      if ((0, IComponent_1.getComponent)(t.ComponentsData, i)) {
        this.jKl ||= typeof s.NeedDisablePassiveCollision == "boolean" ? s.NeedDisablePassiveCollision : s.NeedDisablePassiveCollision(t);
        e ||= typeof s.NeedUseFullCollisionPreset == "boolean" ? s.NeedUseFullCollisionPreset : s.NeedUseFullCollisionPreset(t);
      }
    }
    this.HKl = e ? FULL_COLLISION_PRESET : ROLETRIGGER_COLLISION_PRESET;
  }
  OnStart() {
    this.InitRangeAsyncCallback = t => {
      this.InitRangeAsyncCallback = undefined;
      this.Ken(t);
    };
    this.InitRangeActorAsync();
    return true;
  }
  OnActivate() {
    this.xen = true;
    this.QKs();
  }
  OnTick() {
    if (this.toh) {
      for (const e of this.ken) {
        var t = this.noh(e);
        if (this.soh(e, t)) {
          if (t) {
            this.aoh(e, false);
          } else {
            this.aoh(e, true);
          }
        }
      }
      this.hoh();
    }
  }
  OnEnd() {
    if ((this.InitRangeAsyncCallback = undefined) !== this.Ben) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ben);
      this.Ben = undefined;
    }
    if (this.Een?.IsValid() && this.Zen) {
      this.Een.OnTriggerVolumeAddToSubsystem.Remove(this.Zen);
      this.Een = undefined;
      this.Zen = undefined;
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.Xen)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.Xen);
    }
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.GUe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.GUe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RoleTriggerInit, this.Woh)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleTriggerInit, this.Woh);
    }
    if (this.w7a && TimerSystem_1.TimerSystem.Has(this.w7a)) {
      TimerSystem_1.TimerSystem.Remove(this.w7a);
      this.w7a = undefined;
    }
    this.wEd();
    this._P1.length = 0;
    if (this.uP1) {
      this.uP1.length = 0;
    }
    this.yen = undefined;
    if (this.DYd && this.Ien?.IsValid()) {
      RangeComponent_1.UYd(this.Ien, this.DYd, false);
    }
    if (this.DYd) {
      this.DYd.length = 0;
    }
    if (this.AYd) {
      this.AYd.length = 0;
    }
    if (this.Den && (this.Ien?.IsValid() && (this.Ien.SetActorEnableCollision(false), ActorSystem_1.ActorSystem.Put("RangeComponent.OnEnd1", this.Ien)), this.F0a?.IsValid())) {
      this.F0a.SetActorEnableCollision(false);
      ActorSystem_1.ActorSystem.Put("RangeComponent.OnEnd2", this.F0a);
    }
    this.Ien = undefined;
    this.F0a = undefined;
    this.tOl = undefined;
    this.Den = false;
    this.Wen?.clear();
    return true;
  }
  ht_() {
    var t = this.bjo;
    if (t.Type !== "Volume" && t.Type !== "ActorRefVolume" && t.Type !== "ActorCollision") {
      this.Dzl?.Start();
      this.Qen();
      this.Bzl();
      this.lt_();
      this.Dzl?.Stop();
    }
  }
  Qoh() {
    return !!this.xen && !!this.wen && !this.Entity.IsEnd && !this.EIe?.GetRemoveState() && !!RoleTriggerController_1.RoleTriggerController.IsInitTrigger;
  }
  static UYd(t, e, i) {
    var s = [];
    if (e && e.length !== 0) {
      var h = t.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
      if (h) {
        for (const r of e) {
          var o = r.CollisionChannelType;
          var n = r.CollisionResponseType;
          if (h.GetCollisionResponseToChannel(o) !== r.CollisionResponseType && (h.SetCollisionResponseToChannel(o, n), i)) {
            s.push({
              CollisionChannelType: r.CollisionChannelType,
              CollisionResponseType: r.CollisionResponseType
            });
          }
        }
      }
    }
    return s;
  }
  InitRangeActorAsync() {
    this.Ren = false;
    const i = this.bjo;
    switch (i.Type) {
      case "Box":
      case "Sphere":
      case "HollowSphere":
        this.InitRangeAsyncCallback?.(this.cP1(i));
        break;
      case "Combination":
        this.InitRangeAsyncCallback?.(this.dP1(i));
        break;
      case "Cylinder":
      case "HollowCylinder":
      case "Cone":
        {
          const s = i.Type === "Cone" ? CommonParamById_1.configCommonParamById.GetStringConfig(CONE_COMMON_PARAM_ID) : CommonParamById_1.configCommonParamById.GetStringConfig(CYLINDER_COMMON_PARAM_ID);
          if (this.Ben) {
            ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ben);
          }
          if (!s) {
            this.InitRangeAsyncCallback?.(false);
            break;
          }
          this.Ben = ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.Object, t => {
            this.Ben = undefined;
            if (t instanceof UE.StaticMesh) {
              this.InitRangeAsyncCallback?.(this.Jua(i, t));
            } else {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Entity", 39, "[RangeComponent] 基础静态网格体配置错误", ["MeshPath", s]);
              }
              this.InitRangeAsyncCallback?.(false);
            }
          });
          break;
        }
      case "Volume":
        this.Een = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroTriggerVolumeManager.StaticClass());
        if (this.Zen) {
          this.Een.OnTriggerVolumeAddToSubsystem.Remove(this.Zen);
          this.Zen = undefined;
        }
        var t = this.Een?.GetKuroTriggerVolume(new UE.FName(i.VolumeKey));
        if (t) {
          this.InitRangeAsyncCallback?.(this.mtn(i, t));
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Entity", 39, "[RangeComponent] KuroTriggerVolume未找到，等待加载", ["VolumeKey", i?.VolumeKey], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
          }
          this.Zen = t => {
            if (t?.toString() === i.VolumeKey && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Entity", 39, "[RangeComponent] KuroTriggerVolume已加载", ["VolumeKey", i?.VolumeKey], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), t = this.Een?.GetKuroTriggerVolume(t), this.InitRangeAsyncCallback?.(!!t && this.mtn(i, t)), this.Zen)) {
              this.Een?.OnTriggerVolumeAddToSubsystem.Remove(this.Zen);
              this.Zen = undefined;
            }
          };
          this.Een.OnTriggerVolumeAddToSubsystem.Add(this.Zen);
        }
        break;
      case "ActorRefVolume":
        this.Ren = true;
        this.InitRangeAsyncCallback?.(true);
        break;
      case "ActorCollision":
        this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
        if (this.Rhl) {
          this.aln.OnAddToSubsystem.Remove(this.Rhl);
          this.Rhl = undefined;
        }
        var t = i.ActorRef.PathName.split(".")[1] + "." + i.ActorRef.PathName.split(".")[2];
        var e = this.aln.GetActor(new UE.FName(t));
        if (e?.IsValid()) {
          this.InitRangeAsyncCallback?.(this.Uhl(e));
          this.DYd = RangeComponent_1.UYd(e, this.AYd, true);
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Entity", 31, "[RangeComponent] Actor未找到，等待加载", ["Key", t], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
          }
          this.Rhl = t => {
            var e = i.ActorRef.PathName.split(".")[1] + "." + i.ActorRef.PathName.split(".")[2];
            if (t?.toString() === e && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Entity", 31, "[RangeComponent] Actor已加载", ["Key", e], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), e = this.aln?.GetActor(t), this.InitRangeAsyncCallback?.(!!e && this.Uhl(e)), this.Rhl && (this.aln?.OnAddToSubsystem.Remove(this.Rhl), this.Rhl = undefined), e?.IsValid())) {
              this.DYd = RangeComponent_1.UYd(e, this.AYd, true);
            }
          };
          this.aln.OnAddToSubsystem.Add(this.Rhl);
        }
        break;
      default:
        this.InitRangeAsyncCallback?.(false);
    }
  }
  cP1(t) {
    this.Ien = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    this.Den = true;
    var e = this.fP1(t);
    if (!e) {
      return false;
    }
    this._P1.push(e);
    if (this.Uen) {
      this.F0a = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
      e = this.gP1(t);
      if (!e) {
        return false;
      }
      this.uP1 = [e];
    }
    return true;
  }
  dP1(t) {
    this.Ien = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    this.Ien?.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    this.Den = true;
    this._P1 = [];
    for (const s of t.CombinationShapes) {
      var e = this.fP1(s);
      if (!e) {
        return false;
      }
      e.bEditableWhenInherited = true;
      this._P1.push(e);
    }
    if (this.Uen) {
      this.F0a = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
      this.F0a?.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      this.uP1 = [];
      for (const h of t.CombinationShapes) {
        var i = this.gP1(h);
        if (!i) {
          return false;
        }
        this.uP1.push(i);
      }
    }
    return !this.Uen || this._P1.length === t.CombinationShapes.length;
  }
  fP1(t) {
    t = this.mP1(t, this.Ien);
    if (t?.IsValid()) {
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] ShapeComp创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
    }
  }
  gP1(t) {
    t = this.mP1(t, this.F0a);
    if (t?.IsValid()) {
      t.SetCollisionEnabled(0);
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] BoxShape(ExpandedExit)创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
    }
  }
  mP1(t, e) {
    t = (t.Type === "Box" ? UE.BoxComponent : UE.SphereComponent).StaticClass();
    e = e?.AddComponentByClass(t, false, MathUtils_1.MathUtils.DefaultTransform, false);
    if (e?.IsValid()) {
      e.SetCollisionEnabled(0);
      return e;
    }
  }
  Jua(t, e) {
    this.Ien = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    this.Den = true;
    this.yen = this.Ien?.AddComponentByClass(UE.StaticMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, new UE.FName("MeshComp"));
    if (!this.yen?.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] MeshComp创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
      }
      return false;
    }
    this.yen.SetCollisionEnabled(0);
    this.yen.SetStaticMesh(e);
    this.yen.SetHiddenInGame(true);
    this.yen.SetVisibility(false);
    if (this.Uen) {
      this.F0a = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
      this.Pen = this.F0a?.AddComponentByClass(UE.StaticMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false, new UE.FName("ExpandedExitMeshComp"));
      if (!this.Pen?.IsValid()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] MeshComp(ExpandedExit)创建失败", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
        }
        return false;
      }
      this.Pen.SetCollisionEnabled(0);
      this.Pen.SetStaticMesh(e);
      this.Pen.SetHiddenInGame(true);
      this.Pen.SetVisibility(false);
    }
    return true;
  }
  mtn(t, e) {
    var i;
    var s;
    this.Ien = e;
    this.Den = false;
    if (e?.IsValid()) {
      if (GlobalData_1.GlobalData.IsPlayInEditor && (i = (0, puerts_1.$ref)(undefined), s = (0, puerts_1.$ref)(undefined), e.D_GetActorBounds(false, i, s), (e = (0, puerts_1.$unref)(s)).X * e.Y * e.Z > 27000000000) && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 29, "[RangeComponent] TriggerVolume配置过大，请联系相关人员", ["ConfigId", this.EIe.GetPbDataId()]);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 29, "[RangeComponent] KuroTriggerVolume非Valid", ["VolumeKey", t?.VolumeKey], ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
      }
      return false;
    }
  }
  Uhl(t) {
    this.Ien = t;
    this.Den = false;
    return !!t?.IsValid() || (Log_1.Log.CheckError() && Log_1.Log.Error("SceneGameplay", 29, "[RangeComponent] CollisionActor非Valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]), false);
  }
  Qen() {
    if (!this.Ren) {
      if (this.Den) {
        this.Izl();
      }
    }
  }
  Izl() {
    if (this.Ien && this.Den && !this.Ren) {
      var t = this.bjo;
      if (t.Type !== "Volume" && t.Type !== "ActorRefVolume" && t.Type !== "ActorCollision") {
        if (!this.tOl?.IsValid()) {
          this.tOl = this.Entity.GetComponent(1)?.Owner;
        }
        var e = Transform_1.Transform.Create(this.tOl?.D_GetTransform() ?? this.EIe.D_GetTransform());
        e.SetScale3D(Vector_1.Vector.OneVectorProxy);
        var i = Transform_1.Transform.Create();
        var s = this.Uen && this.F0a?.IsValid() ? Transform_1.Transform.Create() : undefined;
        switch (t.Type) {
          case "Combination":
            this.IP1(t, e, i, s);
            break;
          case "Cylinder":
          case "HollowCylinder":
          case "Cone":
            this.DO1(t, e, i, s);
            break;
          default:
            this.bP1(t, e, i, s);
        }
      }
    }
  }
  IP1(e, i, s, h) {
    this.Ien.D_K2_SetActorTransform(i.ToUeTransform(), false, undefined, true);
    this.F0a?.D_K2_SetActorTransform(i.ToUeTransform(), false, undefined, true);
    for (let t = 0; t < e.CombinationShapes.length; t++) {
      var o = e.CombinationShapes[t];
      var n = this._P1[t];
      var r = this.uP1?.[t];
      this.TP1(o, i, s, h);
      this.EP1(o, n, r);
      n?.D_K2_SetWorldTransform(s.ToUeTransform(), false, undefined, true);
      if (h && r && r?.IsValid()) {
        r.D_K2_SetWorldTransform(h.ToUeTransform(), false, undefined, true);
      }
    }
  }
  bP1(t, e, i, s) {
    if (!(this._P1.length < 1) && (!this.uP1 || !(this.uP1.length < 1))) {
      this.TP1(t, e, i, s);
      this.EP1(t, this._P1[0], this.uP1?.[0]);
      this.UO1(i, s);
    }
  }
  DO1(t, e, i, s) {
    if (this.yen && this.yen.IsValid()) {
      this.TP1(t, e, i, s);
      this.BO1(t, i, s);
      this.UO1(i, s);
    }
  }
  TP1(t, e, i, s) {
    this.yP1(t, e, i, s);
    this.SP1(t, e, i, s);
  }
  yP1(t, e, i, s) {
    if (t.Type !== "Volume" && t.Type !== "ActorRefVolume" && t.Type !== "ActorCollision" && t.Type !== "Combination") {
      MathUtils_1.MathUtils.CommonTempVector.Set(t.Center.X ?? 0, t.Center.Y ?? 0, t.Center.Z ?? 0);
      e.TransformPositionNoScale(MathUtils_1.MathUtils.CommonTempVector, MathUtils_1.MathUtils.CommonTempVector);
      i.SetLocation(MathUtils_1.MathUtils.CommonTempVector);
      s?.SetLocation(MathUtils_1.MathUtils.CommonTempVector);
    }
  }
  SP1(t, e, i, s) {
    MathUtils_1.MathUtils.CommonTempRotator.Set(0, 0, 0);
    if (t.Type === "Box" && t.Rotator) {
      MathUtils_1.MathUtils.CommonTempRotator.Set(t.Rotator.Y ?? 0, t.Rotator.Z ?? 0, t.Rotator.X ?? 0);
    }
    e.TransformRotation(MathUtils_1.MathUtils.CommonTempRotator, MathUtils_1.MathUtils.CommonTempQuat);
    i.SetRotation(MathUtils_1.MathUtils.CommonTempQuat);
    s?.SetRotation(MathUtils_1.MathUtils.CommonTempQuat);
  }
  EP1(t, e, i) {
    switch (t.Type) {
      case "Box":
        this.CP1(t, e, i || undefined);
        break;
      case "HollowSphere":
      case "Sphere":
        this.pP1(t, e, i || undefined);
    }
  }
  BO1(t, e, i) {
    switch (t.Type) {
      case "Cylinder":
      case "HollowCylinder":
      case "Cone":
        this.vP1(t, e, i);
    }
  }
  CP1(t, e, i) {
    t = new UE.VectorDouble(t.Size.X ?? 0, t.Size.Y ?? 0, t.Size.Z ?? 0);
    e?.D_SetBoxExtent(t, false);
    if (this.Uen) {
      i?.D_SetBoxExtent(t.op_Addition(this.Uen), false);
    }
  }
  pP1(t, e, i) {
    e?.SetSphereRadius(t.Radius, false);
    if (this.Uen) {
      i?.SetSphereRadius(t.Radius + this.Uen, false);
    }
  }
  vP1(t, e, i) {
    var s;
    var h;
    if (this.yen?.StaticMesh && (h = this.yen.StaticMesh.GetBounds().BoxExtent, s = t.Radius / h.X, h = t.Height / (h.Z * 2), MathUtils_1.MathUtils.CommonTempVector.Set(s, s, h), e.SetScale3D(MathUtils_1.MathUtils.CommonTempVector), this.Uen) && this.Pen?.StaticMesh) {
      s = this.Pen.StaticMesh.GetBounds().BoxExtent;
      h = (t.Radius + this.Uen) / s.X;
      e = (t.Height + this.Uen) / (s.Z * 2);
      MathUtils_1.MathUtils.CommonTempVector.Set(h, h, e);
      i?.SetScale3D(MathUtils_1.MathUtils.CommonTempVector);
    }
  }
  UO1(t, e) {
    this.Ien.D_K2_SetActorTransform(t.ToUeTransform(), false, undefined, true);
    if (e) {
      this.F0a.D_K2_SetActorTransform(e.ToUeTransform(), false, undefined, true);
    }
  }
  Bzl() {
    var t;
    if (this.Ien && this.Den && !this.Ren && (t = this.bjo).Type !== "Volume" && t.Type !== "ActorRefVolume" && t.Type !== "ActorCollision" && (t = this.tOl)?.IsValid()) {
      this.Ien?.RootComponent?.SetAbsolute(false, false, true);
      this.Ien?.K2_AttachToActor(t, undefined, 1, 1, 1, false);
      this.F0a?.RootComponent?.SetAbsolute(false, false, true);
      this.F0a?.K2_AttachToActor(t, undefined, 1, 1, 1, false);
    }
  }
  Wku(t) {
    return !!t?.op_Equality(ROLETRIGGER_COLLISION_PRESET);
  }
  lt_() {
    var t = this.bjo;
    if (t.Type !== "Volume" && t.Type !== "ActorRefVolume" && t.Type !== "ActorCollision") {
      if (this.jKl) {
        this.Qku(this.LP1, false, true);
      } else {
        t = !this.Wku(this.HKl);
        this.Qku(this.LP1, true, t);
        if (!t) {
          RoleTriggerController_1.RoleTriggerController.UpdateOverlaps();
        }
      }
    }
  }
  Qku(t, ...e) {
    if (this._P1?.length) {
      for (const i of this._P1) {
        t(i, ...e);
      }
    } else if (this.yen) {
      t(this.yen, ...e);
    }
    if (this.uP1?.length) {
      for (const s of this.uP1) {
        t(s, ...e);
      }
    } else if (this.Pen) {
      t(this.Pen, ...e);
    }
  }
  REd() {
    this.Yen();
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.Xen)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.Xen);
    }
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    this.bEd = true;
  }
  wEd() {
    this.atn();
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.Xen)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.Xen);
    }
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    this.roh("DisableInOutRange");
    this.bEd = false;
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
        if (this.Ien?.IsValid()) {
          if (this.Uen) {
            if (this.F0a?.IsValid()) {
              this.Ien.OnActorBeginOverlap.Add(this.otn);
              this.F0a.OnActorEndOverlap.Add(this.rtn);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] ExpandedExitRangeActor Not Valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
            }
          } else {
            this.Ien.OnActorBeginOverlap.Add(this.otn);
            this.Ien.OnActorEndOverlap.Add(this.rtn);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] RangeActor Not Valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
        }
        break;
      case "ActorRefVolume":
        if (this.Men) {
          this.Men.AddOnPlayerOverlapCallback(this.ltn, false);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] RefComponent Not Valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
        }
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] 不支持的配置类型", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
        }
    }
  }
  atn() {
    var t = this.bjo;
    if (this.Ien?.IsValid()) {
      this.Ien.OnActorBeginOverlap.Remove(this.otn);
      this.Ien.OnActorEndOverlap.Remove(this.rtn);
    }
    if (this.F0a?.IsValid()) {
      this.F0a.OnActorEndOverlap.Remove(this.rtn);
    }
    if (t.Type === "ActorRefVolume" && this.Men) {
      this.Men.RemoveOnPlayerOverlapCallback(this.ltn);
    }
  }
  PP1(t, e, i, s = true) {
    var h;
    if (this.toh) {
      h = this.noh(t);
      this.soh(t, h);
      if (!e) {
        this.eoh?.delete(t);
        if (i?.Valid) {
          this.$Tl?.delete(i.Id);
        }
      }
      h = !h || !e;
      this.xP1(t, e, i, s && h, h);
      this.hoh();
    }
  }
  xP1(t, e, i, s, h = true) {
    if (t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()) {
      this.Fen = e;
    }
    this.ptn(t, e, h);
    if (i?.Valid) {
      this.htn(i, e, s, h);
      this.ntn(t, i, e, s, h);
    }
  }
  DP1(t) {
    var e;
    return t.Id === this.Entity.Id || (e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), !!(((t = t.Entity.GetComponent(0))?.IsRole() && t.GetPlayerId() !== e) ?? (t?.IsVision() && t.GetSummonerPlayerId() !== e)));
  }
  ttn(t, e, i = true) {
    if (t?.IsValid()) {
      var s = this.ftn(t);
      if (s?.Valid) {
        if (this.DP1(s)) {
          return;
        }
        var h = s.Entity?.GetComponent(206);
        if (h && !h.IsReadyForOverlap && (t === h?.Owner || t === h.GetMainCollisionActor())) {
          return;
        }
      }
      switch (this.bjo?.Type) {
        case "HollowSphere":
        case "HollowCylinder":
          this.PP1(t, e, s, i);
          break;
        default:
          this.xP1(t, e, s, i);
      }
    }
  }
  aoh(t, e) {
    var i;
    if (t?.IsValid() && (i = this.ftn(t), this.Kku(e, t), this.q7a(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, e, t), i?.Valid)) {
      if (e) {
        if (this.$Tl?.has(i.Id)) {
          this.$Tl?.delete(i.Id);
        }
      } else {
        this.$Tl?.set(i.Id, i);
      }
      this.Xku(e, i);
      this.q7a(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, e, i);
      this.ReqEntityAccessRange(e, [i]);
      this.ReqMyPlayerAccessRange(e, i);
      this.ntn(t, i, e, false);
    }
  }
  zen(e) {
    if (this.bEd) {
      if (this.Ren) {
        if (this.Men?.IsPlayerOverlappedRefVolume()) {
          this.ttn(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), true, e);
        }
      } else if (this.Ien?.IsValid()) {
        var t = (0, puerts_1.$ref)(undefined);
        this.Ien.GetOverlappingActors(t);
        var i = (0, puerts_1.$unref)(t);
        var s = i?.Num() ?? 0;
        if (s > 0) {
          for (let t = 0; t < s; t++) {
            var h = i.Get(t);
            this.ttn(h, true, e);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 39, "[RangeComponent] ForceCheckOverlapAndCallbackEnter失败 Actor not valid", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["ConfigId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
      }
    }
  }
  stn(t) {
    var e;
    if (this.Ven && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter?.GetEntityIdNoBlueprint() ?? 0))) {
      this.ntn(RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger(), e, false, t);
    }
    const i = [];
    this.Oen?.forEach(t => {
      i.push(t);
    });
    this.htn(i, false, t);
    const s = [];
    this.ken?.forEach(t => {
      s.push(t);
    });
    s.forEach(t => {
      this.ptn(t, false);
    });
    this.Ven = false;
    this.Oen.clear();
    this.ken.clear();
  }
  $Ks() {
    var t = [];
    var e = this.Ven;
    if (this.WKs) {
      for (var [, i] of this.Oen) {
        i = i.Entity?.GetComponent(0)?.GetCreatureDataId();
        if (!i) {
          break;
        }
        t.push(i);
      }
    }
    this.ReqInitRange(t, e, t => {
      if (t && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        this.jKs = true;
        var e = MathUtils_1.MathUtils.LongToNumber(t.zWn);
        var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
        var s = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
        if (i.Valid && i.Entity?.Valid) {
          if (s?.Valid) {
            for (const a of Object.keys(t.dL_._L_)) {
              var h = t.dL_._L_[a];
              RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.EmitMessage(i.Entity, t.dL_.i6n, Number(a), s, h);
            }
          }
          for (const _ of t.cL_) {
            var o = MathUtils_1.MathUtils.LongToNumber(_.g6n);
            var n = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
            if (n?.Valid && n.Entity?.Valid) {
              for (const l of Object.keys(_._L_)) {
                var r = _._L_[l];
                RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.EmitMessage(i.Entity, _.i6n, Number(l), n.Entity, r);
              }
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 39, "[RangeComponent] ReqInitRange出错", ["CreatureDataId", this.EIe.GetCreatureDataId()], ["PbDataId", this.EIe.GetPbDataId()], ["PlayerId", this.EIe.GetPlayerId()]);
      }
    });
  }
  ftn(t) {
    if (t?.IsValid()) {
      if (t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger()) {
        if (Global_1.Global.BaseCharacter?.IsValid()) {
          return ModelManager_1.ModelManager.CreatureModel?.GetEntityById(Global_1.Global.BaseCharacter.EntityId);
        } else {
          return undefined;
        }
      } else {
        return ModelManager_1.ModelManager.CreatureModel?.GetEntityByChildActor(t);
      }
    }
  }
  htn(e, i, s = true, h = true) {
    if (e) {
      let t = e;
      if (Array.isArray(t)) {
        if (!t.length) {
          return;
        }
      } else {
        t = [t];
      }
      var o = [];
      for (const n of t) {
        let t = false;
        if (i) {
          if (!n.Entity?.GetComponent(0)?.GetRemoveState() && !this.Oen.has(n.Id)) {
            this.Oen.set(n.Id, n);
            EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, n, EventDefine_1.EEventName.RemoveEntity, this.zpe);
            t = true;
          }
        } else if (this.Oen.has(n.Id)) {
          this.Oen.delete(n.Id);
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, n, EventDefine_1.EEventName.RemoveEntity, this.zpe);
          t = true;
        }
        if (t && h) {
          this.Xku(i, n);
          this.q7a(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeLocal, i, n);
        }
        if (t && s) {
          o.push(n);
        }
      }
      if (s && o.length > 0) {
        this.ReqEntityAccessRange(i, o);
      }
    }
  }
  ntn(t, e, i, s = true, h = true) {
    if (t === RoleTriggerController_1.RoleTriggerController.GetMyRoleTrigger() && e.Id === Global_1.Global.BaseCharacter?.EntityId) {
      let t = false;
      if (i) {
        if (!this.Ven) {
          this.Ven = true;
          t = true;
        }
      } else if (this.Ven) {
        this.Ven = false;
        t = true;
      }
      if (t && h) {
        for (let t = this.ben.length - 1; t >= 0; t--) {
          var o = this.ben[t];
          try {
            o?.(i);
          } catch {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("SceneItem", 39, "[RangeComp] 范围组件回调异常，请检查之前的报错");
            }
          }
        }
        this.q7a(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, i);
      }
      if (t && s) {
        this.ReqMyPlayerAccessRange(i, e);
      }
    }
  }
  ptn(t, e, i = true) {
    if (e) {
      if (this.ken.has(t)) {
        return;
      }
      this.ken.add(t);
    } else {
      if (!this.ken.has(t)) {
        return;
      }
      this.ken.delete(t);
    }
    if (i) {
      this.Kku(e, t);
      this.q7a(this.Entity, EventDefine_1.EEventName.OnActorInOutRangeLocal, e, t);
    }
  }
  Xku(e, i) {
    for (let t = this.qen.length - 1; t >= 0; t--) {
      var s = this.qen[t];
      try {
        s?.(e, i);
      } catch {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "[RangeComp] 范围组件回调异常，请检查之前的报错", ["PbDataId", this.EIe?.GetPbDataId()], ["IsEnter", e]);
        }
      }
    }
  }
  Kku(e, i) {
    for (let t = this.Nen.length - 1; t >= 0; t--) {
      var s = this.Nen[t];
      try {
        s?.(e, i);
      } catch {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 39, "[RangeComp] 范围组件回调异常，请检查之前的报错");
        }
      }
    }
  }
  q7a(...t) {
    var e;
    var i;
    if (this.x7a) {
      this.P7a ||= new Queue_1.Queue();
      this.P7a.Push(t);
      if (!this.w7a || !TimerSystem_1.TimerSystem.Has(this.w7a)) {
        this.w7a = TimerSystem_1.TimerSystem.Next(this.B7a);
      }
    } else {
      [t, e, ...i] = t;
      if (t) {
        EventSystem_1.EventSystem.EmitWithTarget(t, e, ...i);
      } else {
        EventSystem_1.EventSystem.Emit(e, ...i);
      }
    }
  }
  AddOnPlayerOverlapCallback(t) {
    this.ben?.push(t);
  }
  RemoveOnPlayerOverlapCallback(t) {
    if (this.ben !== undefined && !((t = this.ben.indexOf(t)) < 0)) {
      this.ben.splice(t, 1);
    }
  }
  AddOnEntityOverlapCallback(t) {
    this.qen?.push(t);
  }
  RemoveOnEntityOverlapCallback(t) {
    if (this.qen !== undefined && !((t = this.qen.indexOf(t)) < 0)) {
      this.qen.splice(t, 1);
    }
  }
  AddOnActorOverlapCallback(t) {
    this.Nen?.push(t);
  }
  RemoveOnActorOverlapCallback(t) {
    if (this.Nen !== undefined && !((t = this.Nen.indexOf(t)) < 0)) {
      this.Nen.splice(t, 1);
    }
  }
  ServerUpdateEntitiesInRangeOnline(i, t) {
    let e = undefined;
    if (Array.isArray(t)) {
      if (!t.length) {
        return;
      }
      e = t;
    } else {
      e = [t];
    }
    e.forEach(t => {
      if (this.Wen?.has(t)) {
        this.Wen.delete(t);
      }
      var e = ModelManager_1.ModelManager.CreatureModel?.GetEntity(t);
      if (e) {
        if (i) {
          this.Hen?.set(e.Id, e);
        } else {
          this.Hen?.delete(e.Id);
        }
        if (this.GetIsLocalSetupComplete()) {
          EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityInOutRangeOnline, i, e);
        }
      } else {
        this.Wen.set(t, i);
      }
    });
  }
  ServerUpdatePlayerInRangeOnline(e, t) {
    let i = undefined;
    if (Array.isArray(t)) {
      if (!t.length) {
        return;
      }
      i = t;
    } else {
      i = [t];
    }
    i.forEach(t => {
      if (e) {
        this.jen?.add(t);
      } else {
        this.jen?.delete(t);
      }
      if (this.GetIsLocalSetupComplete()) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnPlayerInOutRangeOnline, e, t);
      }
    });
  }
  ReqMyPlayerAccessRange(t, e) {
    var i;
    var s;
    var h;
    if (this.KKs && (h = (s = e.Entity?.GetComponent(0))?.GetCreatureDataId())) {
      if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY) && (i = e.Entity?.GetComponent(1), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("SceneItem", 39, "[RangeComp] 本机玩家进出:(发起PlayerAccessRange)", ["PbDataId", this.EIe?.GetPbDataId()], ["CreatureDataId", this.EIe?.GetCreatureDataId()], ["IsEnter", t], ["OtherPbDataId", s?.GetPbDataId()], ["OtherCreatureId", h], ["OtherLocation", i?.ActorLocationProxy]);
      }
      e.Entity?.GetComponent(3)?.ResetLocationCachedTime();
      if ((s = e.Entity?.GetComponent(68))?.GetEnableMovementSync()) {
        s.CollectSampleAndSend(true);
      }
      (h = Protocol_1.Aki.Protocol.Ugs.create()).zWn = this.EIe.GetCreatureDataId();
      h.i6n = t ? Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter : Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave;
      Net_1.Net.Call(28654, h, t => {
        if (t && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          var e = MathUtils_1.MathUtils.LongToNumber(t.zWn);
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
          var s = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
          if (i?.Valid && i.Entity?.Valid && s?.Valid) {
            for (const o of Object.keys(t.uL_._L_)) {
              var h = t.uL_._L_[o];
              RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.EmitMessage(i.Entity, t.uL_.i6n, Number(o), s, h);
            }
          }
        }
      });
    }
  }
  ReqEntityAccessRange(t, e) {
    if (this.WKs && e?.length) {
      var i = [];
      for (const n of e) {
        var s;
        var h = n.Entity?.GetComponent(0);
        var o = h?.GetCreatureDataId();
        if (o && (i.push(o), ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY) && (s = n.Entity?.GetComponent(1), Log_1.Log.CheckInfo()) && Log_1.Log.Info("SceneItem", 39, "[RangeComp] 实体进出:(加入EntityAccessRange队列)", ["PbDataId", this.EIe?.GetPbDataId()], ["CreatureDataId", this.EIe?.GetCreatureDataId()], ["IsEnter", t], ["OtherPbDataId", h?.GetPbDataId()], ["OtherCreatureId", o], ["OtherPos", s?.ActorLocationProxy]), n.Entity?.GetComponent(1)?.ResetLocationCachedTime(), (h = n.Entity?.GetComponent(67))?.GetEnableMovementSync())) {
          h.CollectSampleAndSend(true);
        }
      }
      e = Protocol_1.Aki.Protocol.Ags.create();
      e.zWn = this.EIe.GetCreatureDataId();
      e.HKs = i;
      e.i6n = t ? Protocol_1.Aki.Protocol.i6n.Proto_RangeEnter : Protocol_1.Aki.Protocol.i6n.Proto_RangeLeave;
      Net_1.Net.Call(28309, e, t => {
        if (t && t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          var e = MathUtils_1.MathUtils.LongToNumber(t.zWn);
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
          if (i.Valid && i.Entity?.Valid) {
            for (const n of t.cL_) {
              var s = MathUtils_1.MathUtils.LongToNumber(n.g6n);
              var h = ModelManager_1.ModelManager.CreatureModel.GetEntity(s);
              if (h?.Valid && h.Entity?.Valid) {
                for (const r of Object.keys(n._L_)) {
                  var o = n._L_[r];
                  RangeComponentMessageManager_1.RangeComponentMessageManager.Instance.EmitMessage(i.Entity, n.i6n, Number(r), h.Entity, o);
                }
              }
            }
          }
        }
      });
    }
  }
  ReqInitRange(t, e, i = () => {}) {
    var s = Protocol_1.Aki.Protocol.v$s.create();
    s.zWn = this.EIe.GetCreatureDataId();
    s.JKs = t;
    s.zKs = e;
    Net_1.Net.Call(29596, s, i);
  }
  IsOverlappingPlayer() {
    return this.Ven;
  }
  IsEntityInRange(t, e = false) {
    let i = undefined;
    return i = e ? (this.Oen?.has(t) && !this.$Tl?.has(t)) ?? false : this.Oen?.has(t) ?? false;
  }
  UpdateBoxRange(t, e) {
    if (!!this.Ien && !(this._P1.length < 1) && !!this._P1[0]) {
      if (this._P1.length > 1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 79, "[RangeComponent] 风扇实体不支持组合范围", ["ConfigId", this.EIe.GetPbDataId()]);
        }
      } else if (this.bjo.Type === "Box" && (this.Ien.D_K2_SetActorRelativeLocation(t, false, undefined, true), this._P1[0]?.D_SetBoxExtent(e, true), GlobalData_1.GlobalData.IsPlayInEditor && e.X * e.Y * e.Z > 216000000000 && Log_1.Log.CheckWarn() && Log_1.Log.Warn("SceneItem", 29, "[RangeComponent] Trigger Box配置过大，请联系相关人员", ["ConfigId", this.EIe.GetPbDataId()]), this.Uen) && (this.F0a?.D_K2_SetActorRelativeLocation(t, false, undefined, true), this.uP1) && this.uP1.length > 0) {
        this.uP1[0]?.D_SetBoxExtent(e.op_Addition(this.Uen), true);
      }
    }
  }
  SetRangeActorParent(t) {
    this.tOl = t?.IsValid() ? t : this.Entity.GetComponent(1)?.Owner;
    if (this.Ien?.IsValid() && this.Den && !this.Ren && this.wen) {
      this.Ien?.K2_DetachFromActor(1, 1, 1);
      this.F0a?.K2_DetachFromActor(1, 1, 1);
      if (this._P1.length > 0) {
        for (const e of this._P1) {
          if (e.bKuroPassiveCollision) {
            e?.KuroSetPassiveCollision(false, false);
          }
        }
      } else if (this.yen?.bKuroPassiveCollision) {
        this.yen?.KuroSetPassiveCollision(false, false);
      }
      if (this.uP1 && this.uP1.length > 0) {
        for (const i of this.uP1) {
          if (i.bKuroPassiveCollision) {
            i?.KuroSetPassiveCollision(false, false);
          }
        }
      } else if (this.Pen?.bKuroPassiveCollision) {
        this.Pen?.KuroSetPassiveCollision(false, false);
      }
      this.ht_();
    }
  }
  roh(t) {
    if (this.sxr === undefined) {
      this.sxr = this.Disable(t);
    }
  }
  loh(t) {
    if (this.sxr !== undefined) {
      this.Enable(this.sxr, t);
      this.sxr = undefined;
    }
  }
  hoh() {
    if (this.sxr !== undefined) {
      if (this.ken && this.ken.size > 0) {
        this.loh("Range范围内有实体或Actor");
      }
    } else if (!this.ken || this.ken.size === 0) {
      this.roh("Range范围内没有实体或Actor");
    }
  }
  noh(t) {
    var e = this.bjo?.Type;
    if (!e) {
      return false;
    }
    let i = false;
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
        return false;
    }
    return i;
  }
  soh(t, e) {
    if (e && !this.eoh?.has(t)) {
      this.eoh?.add(t);
      return true;
    } else {
      return !e && !!this.eoh?.has(t) && !(this.eoh?.delete(t), 0);
    }
  }
};
RangeComponent = RangeComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(86)], RangeComponent);
exports.RangeComponent = RangeComponent; //# sourceMappingURL=RangeComponent.js.map