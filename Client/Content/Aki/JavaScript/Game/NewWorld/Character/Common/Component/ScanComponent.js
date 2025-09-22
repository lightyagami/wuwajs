"use strict";

var ScanComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var o;
  var s = arguments.length;
  var a = s < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, n);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        a = (s < 3 ? o(a) : s > 3 ? o(e, i, a) : o(e, i)) || a;
      }
    }
  }
  if (s > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScanComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const LevelGamePlayUtils_1 = require("../../../../LevelGamePlay/LevelGamePlayUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ItemMaterialControllerActorData_1 = require("../../../../Render/Scene/Item/MaterialController/ItemMaterialControllerActorData");
const RoleAudioController_1 = require("../../Role/RoleAudioController");
const M_TO_CM = 100;
const SECONDS_TO_MILLISECONDS = 1000;
class TimerManageContainer {
  constructor(t) {
    this.gzo = undefined;
    this.TDe = undefined;
    this.mYi = () => {
      this.TDe = undefined;
      this.gzo();
    };
    this.gzo = t;
  }
  Delay(t, e = false) {
    if (this.TDe === undefined || !!e) {
      this.Remove();
      e = t < TimerSystem_1.MIN_TIME ? TimerSystem_1.MIN_TIME : t;
      this.TDe = TimerSystem_1.TimerSystem.Delay(this.mYi, e);
    }
  }
  Remove() {
    return this.TDe !== undefined && !!TimerSystem_1.TimerSystem.Has(this.TDe) && !(TimerSystem_1.TimerSystem.Remove(this.TDe), this.TDe = undefined);
  }
  Stop() {
    if (this.Remove()) {
      this.mYi();
    }
  }
}
let ScanComponent = ScanComponent_1 = class ScanComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.Ovr = undefined;
    this.rzr = undefined;
    this.nzr = false;
    this.szr = false;
    this.azr = new Array();
    this.wFd = -1;
    this.jGn = false;
    this.hzr = 0;
    this.lzr = 0;
    this.xC = false;
    this._zr = false;
    this.uzr = undefined;
    this.czr = undefined;
    this.mzr = false;
    this.dzr = 0;
    this.Czr = false;
    this.gzr = new Map();
    this.fzr = undefined;
    this.pzr = undefined;
    this.oQ1 = undefined;
    this.vzr = () => {
      if (!this.Czr) {
        this.Czr = true;
        this.Mzr();
      }
    };
    this.zpe = (t, e) => {
      e = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(e);
      if (e && this.pzr?.includes(e) && (this.pzr.splice(this.pzr.indexOf(e), 1), this.pzr.length <= 0)) {
        for (const i of this.gzr.values()) {
          i.Stop();
        }
      }
    };
  }
  pie() {
    var t;
    if (ScanComponent_1.Ezr === -1) {
      t = ConfigManager_1.ConfigManager.LevelGamePlayConfig.ScanMaxDistance;
      ScanComponent_1.Ezr = t * M_TO_CM * t * M_TO_CM;
    }
    if (ScanComponent_1.Szr === -1) {
      t = ConfigManager_1.ConfigManager.LevelGamePlayConfig.ScanShowInteractionEffectMaxDistance;
      ScanComponent_1.Szr = t * M_TO_CM * t * M_TO_CM;
    }
    if (ScanComponent_1.yzr === -1) {
      t = ConfigManager_1.ConfigManager.LevelGamePlayConfig.ScanDetectConcealedDistance;
      ScanComponent_1.yzr = t * M_TO_CM * t * M_TO_CM;
    }
  }
  OnStart() {
    this.pie();
    this.n$t = this.Entity.GetComponent(1);
    this.Ovr = this.Entity.GetComponent(0);
    this.rzr = this.Entity.GetComponent(122);
    if (this.rzr) {
      this.rzr.SetLogicRange(ConfigManager_1.ConfigManager.LevelGamePlayConfig.ScanDetectConcealedDistance * M_TO_CM);
    }
    this.uzr = LevelGamePlayUtils_1.LevelGamePlayUtils.GetScanCompositeResult(this.Ovr);
    this.czr = this.uzr?.ScanCompositeConfig;
    this.oQ1 = this.Ovr.GetBaseInfo()?.ScanFunction?.SpecificScanType;
    this.xC = false;
    this._zr = !!this.uzr?.ScanInfos && this.uzr.ScanInfos.length > 0;
    if (this._zr) {
      for (const e of this.uzr.ScanInfos) {
        if (e.ResourcePath?.length > 0) {
          this.szr = true;
        }
        if (e.IconPath?.length > 0) {
          this.nzr = true;
        }
        if (this.szr && this.nzr) {
          break;
        }
      }
      var t = this.Ovr.GetPbEntityInitData();
      var t = (0, IComponent_1.getComponent)(t.ComponentsData, "RefreshGroupComponent");
      if (t && t.EntityIds.length > 0) {
        this.fzr = t.EntityIds;
      }
    }
    if (this.Ovr.IsConcealed) {
      t = this.joo();
      this.Czr = t > ScanComponent_1.yzr;
      this.Mzr();
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
      this.mzr = true;
    }
    return true;
  }
  OnEnd() {
    for (var [t, e] of this.gzr) {
      if (t === "InteractionEffect") {
        e.Remove();
      } else {
        e.Stop();
      }
    }
    this.gzr.clear();
    if (EffectSystem_1.EffectSystem.IsValid(this.lzr)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.lzr, "[TimerManageContainer.OnEnd]", false);
      this.lzr = 0;
    }
    if (this.mzr) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
    }
    this.fzr = undefined;
    return !(this.pzr = undefined);
  }
  OnTick(t) {
    var e;
    if (this.Ovr.IsConcealed && !this.xC && this._zr && this.rzr?.IsInLogicRange && (e = this.joo(), this.Czr && e <= ScanComponent_1.yzr || !this.Czr && e > ScanComponent_1.yzr)) {
      this.Czr = !this.Czr;
      this.Mzr();
    }
  }
  joo() {
    if (this.n$t && Global_1.Global.BaseCharacter) {
      var t;
      var e = Global_1.Global.BaseCharacter.CharacterActorComponent;
      if (e) {
        t = this.n$t.ActorLocationProxy;
        e = e.ActorLocationProxy;
        return Vector_1.Vector.DistSquared(t, e);
      }
    }
  }
  Mzr() {
    var t;
    var e;
    if (this.Ovr.IsConcealed && (EffectSystem_1.EffectSystem.IsValid(this.lzr) && (EffectSystem_1.EffectSystem.StopEffectById(this.lzr, "[TimerManageContainer.ChangeVoicePrintEffect]", false), this.lzr = 0), e = this.n$t.Owner) && (t = this.Czr ? this.czr?.FarVoiceEffectPath : this.czr?.NearVoiceEffectPath) && (this.lzr = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, e.D_GetTransform(), t, "[TimerManageContainer.ChangeVoicePrintEffect]", new EffectContext_1.EffectContext(this.Entity.Id)), EffectSystem_1.EffectSystem.IsValid(this.lzr)) && (e = EffectSystem_1.EffectSystem.GetSureEffectActor(this.lzr)) && e.IsValid()) {
      e.RootComponent.D_K2_SetWorldLocation(this.Izr().D_K2_GetComponentLocation(), false, undefined, false);
      e.RootComponent.K2_SetWorldRotation(Rotator_1.Rotator.ZeroRotator, false, undefined, false);
    }
  }
  StartProcess(t) {
    if (!!this._zr && (this.oQ1 === undefined || this.oQ1 === t) && (this.oQ1 !== undefined || t === 0)) {
      if (this.Ovr?.GetPbModelConfig()?.EntityType === "TreasureBox" && (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity)) {
        RoleAudioController_1.RoleAudioController.PlayRoleAudio(t, 1006);
      }
      this.dzr = this.joo();
      if (this.Ovr.IsConcealed && this.dzr > ScanComponent_1.yzr) {
        if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 隐藏物体，超出了取消隐藏的距离", ["PbdataId", this.Ovr.GetPbDataId()], ["DistanceWithPlayerCm", this.dzr], ["ScanDetectConcealedDistanceSquaredCm", ScanComponent_1.yzr]);
        }
      } else if (!this.fzr || !(this.fzr?.length > 0) || !(this.Tzr(), this.pzr.length <= 0)) {
        this.xC = true;
        this.Lzr();
        if (EffectSystem_1.EffectSystem.IsValid(this.lzr)) {
          EffectSystem_1.EffectSystem.StopEffectById(this.lzr, "[TimerManageContainer.StartProcess]", false);
          this.lzr = 0;
        }
        if (this.dzr < ScanComponent_1.Szr && this.czr?.ShowInteractionEffect) {
          if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 显示交互特效", ["PbdataId", this.Ovr.GetPbDataId()]);
          }
          this.Dzr();
        }
        if (this.dzr < ScanComponent_1.Ezr) {
          if (this.szr) {
            if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 显示额外的特效", ["PbdataId", this.Ovr.GetPbDataId()]);
            }
            this.Rzr();
          }
          if (this.nzr) {
            if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 显示Icon", ["PbdataId", this.Ovr.GetPbDataId()]);
            }
            this.Uzr();
          }
          this.Azr();
        }
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnScanStart, this.uzr.Interval);
        if (this.pzr && this.pzr?.length > 0) {
          this.Pzr();
        }
        if (this.Ovr.GetBaseInfo()?.ScanFunction?.TraceEffect) {
          this.xzr();
        }
      }
    }
  }
  Lzr() {
    if (this.Ovr.IsConcealed && (this.Ovr.IsConcealed = false, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnEntityConcealedChange, false), this.czr?.ScanConcealEffectPath) && this.n$t?.Owner) {
      if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 播放扫描显形特效", ["PbdataId", this.Ovr.GetPbDataId()]);
      }
      EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, this.n$t.Owner.D_GetTransform(), this.czr.ScanConcealEffectPath, "[ScanComponent.CancelEntityConcealState]", new EffectContext_1.EffectContext(this.Entity.Id));
    }
    var t = this.Entity.GetComponent(197);
    if (t?.HasTag(1227933697)) {
      t.RemoveTag(1227933697);
    }
  }
  wzr(e, t = false) {
    let i = false;
    var n = (0, puerts_1.$ref)(undefined);
    e.GetAttachedActors(n, true);
    var o = (0, puerts_1.$unref)(n);
    if (o && o.Num() > 0) {
      for (let t = 0; t < o.Num(); t++) {
        var s = o.Get(t);
        if (s) {
          i = this.wzr(s);
        }
      }
    }
    if (e.IsA(UE.StaticMeshActor.StaticClass()) || e.IsA(UE.KuroDestructibleActor.StaticClass())) {
      if (!this.czr?.ItemMaterialDataPath) {
        return false;
      }
      this.hzr++;
      ResourceSystem_1.ResourceSystem.LoadAsync(this.czr.ItemMaterialDataPath, ItemMaterialControllerActorData_1.default, t => {
        if (this.xC) {
          if ((t = ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(t, e)) !== -1) {
            this.azr.push(t);
          }
        } else if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 扫描过程已结束，加载超时", ["pbdataId", this.Ovr.GetPbDataId()]);
        }
      });
    } else {
      if (!this.czr?.ItemMaterialDataPath) {
        return false;
      }
      if (!e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass())) {
        return false;
      }
      i = true;
    }
    n = this.czr?.ItemMaterialDataPath;
    if (t && i && n) {
      this.jGn = true;
      if (this.Ovr?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
        this.Entity.GetComponent(188)?.MaterialController?.ApplySimpleMaterialEffect(n);
        this.hzr++;
      } else if (this.Ovr?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
        let e = this.n$t?.Owner?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
        if (e = e || this.n$t?.Owner?.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)) {
          ResourceSystem_1.ResourceSystem.LoadAsync(n, UE.PD_CharacterControllerData_C, t => {
            if (this.xC) {
              this.wFd = e.AddMaterialControllerData(t);
              this.hzr++;
            } else if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 扫描过程已结束，加载超时", ["pbdataId", this.Ovr.GetPbDataId()]);
            }
          });
        }
      }
    }
    return i;
  }
  Dzr() {
    var e = this.Entity?.GetComponent(1)?.Owner;
    if (e) {
      const i = "InteractionEffect";
      let t = this.gzr.get(i);
      if (t && this.azr.length > 0) {
        t.Delay(this.czr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS, true);
      } else {
        this.hzr = 0;
        this.wzr(e, true);
        if (this.hzr > 0) {
          if (t) {
            t.Remove();
          }
          (t = new TimerManageContainer(() => {
            if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 倒计时结束,关闭特效", ["pbdataId", this.Ovr.GetPbDataId()], ["Delay", this.czr?.InteractionEffectInterval]);
            }
            for (const t of this.azr) {
              ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(t);
            }
            if (this.jGn) {
              if (this.Ovr?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc) {
                this.Entity.GetComponent(188)?.MaterialController?.RemoveSimpleMaterialEffect();
              } else if (this.Ovr?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
                this.n$t?.Owner?.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass())?.RemoveMaterialControllerDataGroupWithEnding(this.wFd);
              }
            }
            this.azr.length = 0;
            this.gzr.delete(i);
          })).Delay(this.czr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS, true);
          this.gzr.set(i, t);
        }
      }
    }
  }
  Uzr() {
    for (const e of this.uzr.ScanInfos) {
      if (e.IconPath.length !== 0) {
        const i = "Icon";
        let t = this.gzr.get(i);
        if (!t) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ScanTrackedStart, this.Entity.Id, this.uzr);
          (t = new TimerManageContainer(() => {
            if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 倒计时结束,触发Icon关闭事件", ["pbdataId", this.Ovr.GetPbDataId()], ["Delay", e.Interval]);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ScanTrackedEnd, this.Entity.Id);
            this.gzr.delete(i);
          })).Delay(e.Interval * SECONDS_TO_MILLISECONDS, true);
          this.gzr.set(i, t);
          break;
        }
        t.Delay(e.Interval * SECONDS_TO_MILLISECONDS, true);
      }
    }
  }
  Azr() {
    var t = this.czr?.ScanAudioEvent;
    var e = this.n$t?.Owner;
    if (t && e) {
      AudioSystem_1.AudioSystem.PostEvent(t, e);
    }
  }
  Rzr() {
    if (this.n$t) {
      var i = this.n$t.Owner;
      if (i) {
        for (const s of this.uzr.ScanInfos) {
          if (s.ResourcePath.length !== 0) {
            let t = s.ResourcePath;
            var n = t.indexOf("'");
            if (n !== -1) {
              t = t.substring(n + 1, t.length - 2);
            }
            const a = "Effect_" + s.UId.toString();
            let e = this.gzr.get(a);
            if (e) {
              e.Delay(s.Interval * SECONDS_TO_MILLISECONDS, true);
            } else {
              const r = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i.D_GetTransform(), t, "[ScanComponent.EffectProcess]", new EffectContext_1.EffectContext(this.Entity.Id));
              if (EffectSystem_1.EffectSystem.IsValid(r)) {
                n = EffectSystem_1.EffectSystem.GetSureEffectActor(r);
                if (n && n.IsValid()) {
                  n.RootComponent.D_K2_SetWorldLocation(this.Izr().D_K2_GetComponentLocation(), false, undefined, false);
                  var o = this.n$t.ActorRotationProxy;
                  o.Set(0, o.Yaw, 0);
                  n.RootComponent.K2_SetWorldRotation(o.ToUeRotator(), false, undefined, false);
                  (e = new TimerManageContainer(() => {
                    if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 倒计时结束,关闭额外特效", ["pbdataId", this.Ovr.GetPbDataId()], ["Delay", s.Interval]);
                    }
                    EffectSystem_1.EffectSystem.StopEffectById(r, "[ScanComponent.EffectProcess]", false);
                    this.gzr.delete(a);
                  })).Delay(s.Interval * SECONDS_TO_MILLISECONDS, true);
                  this.gzr.set(a, e);
                  break;
                }
              }
            }
          }
        }
      }
    }
  }
  xzr() {
    if (this.n$t) {
      var i = this.n$t.Owner;
      if (i) {
        var n = this.Ovr.GetBaseInfo()?.ScanFunction?.TraceEffect;
        var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(n.Target);
        let t = Vector_1.Vector.ZeroVectorProxy;
        t = o ? (o = o.Entity.GetComponent(1), Vector_1.Vector.Create(o.ActorLocationProxy)) : (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 追踪特效找不到对应目标Entity", ["pbdataId", n?.Target]), o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(n.Target), Vector_1.Vector.Create(o?.Transform?.Pos.X ?? 0, o?.Transform?.Pos.Y ?? 0, o?.Transform?.Pos.Z ?? 0));
        const a = "TrackEffect";
        let e = this.gzr.get(a);
        if (e) {
          e.Delay(this.uzr.Interval * SECONDS_TO_MILLISECONDS, true);
        } else {
          var o = Vector_1.Vector.Create();
          t.Subtraction(this.n$t.ActorLocationProxy, o);
          o.Normalize();
          var s = new UE.Rotator();
          o.ToOrientationRotator(s);
          const r = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i.D_GetTransform(), n.Effect, "[ScanComponent.TrackEffectProcess]", new EffectContext_1.EffectContext(this.Entity.Id));
          if (EffectSystem_1.EffectSystem.IsValid(r)) {
            EffectSystem_1.EffectSystem.GetEffectActor(r).K2_SetActorRotation(s, false);
          }
          (e = new TimerManageContainer(() => {
            if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 倒计时结束,关闭追踪特效", ["pbdataId", this.Ovr.GetPbDataId()], ["Delay", this.uzr.Interval]);
            }
            if (EffectSystem_1.EffectSystem.IsValid(r)) {
              EffectSystem_1.EffectSystem.StopEffectById(r, "[ScanComponent.TrackEffectProcess]", false);
            }
            this.gzr.delete(a);
          })).Delay(this.uzr.Interval * SECONDS_TO_MILLISECONDS, true);
          this.gzr.set(a, e);
        }
      }
    }
  }
  Izr() {
    var t = this.Entity.GetComponent(1)?.Owner;
    var e = t?.GetComponentByClass(UE.StaticMeshComponent.StaticClass());
    return e || t?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
  }
  Tzr() {
    if (this.pzr) {
      this.pzr.length = 0;
    } else {
      this.pzr = [];
    }
    for (const t of this.fzr) {
      if (ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)) {
        this.pzr.push(t);
      }
    }
  }
  Pzr() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    const t = "GroupEntityListen";
    const e = this.czr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS;
    let i = this.gzr.get(t);
    if (i) {
      i.Delay(e, true);
    } else {
      (i = new TimerManageContainer(() => {
        if (ScanComponent_1.EnableLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelPlay", 31, "[ScanComponent] 倒计时结束,移除组监听", ["pbdataId", this.Ovr.GetPbDataId()], ["Delay", e]);
        }
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
        this.gzr.delete(t);
      })).Delay(e, true);
      this.gzr.set(t, i);
    }
  }
};
ScanComponent.EnableLog = false;
ScanComponent.Ezr = -1;
ScanComponent.Szr = -1;
ScanComponent.yzr = -1;
ScanComponent = ScanComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(83)], ScanComponent);
exports.ScanComponent = ScanComponent; //# sourceMappingURL=ScanComponent.js.map