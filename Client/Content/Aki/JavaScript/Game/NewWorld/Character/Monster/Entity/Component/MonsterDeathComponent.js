"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var n = arguments.length;
  var h = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        h = (n < 3 ? o(h) : n > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterDeathComponent = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const Json_1 = require("../../../../../../Core/Common/Json");
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const IEntity_1 = require("../../../../../../UniverseEditor/Interface/IEntity");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const EffectContext_1 = require("../../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../../../GlobalData");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RenderConfig_1 = require("../../../../../Render/Config/RenderConfig");
const BaseDeathComponent_1 = require("../../../Common/Component/Abilities/BaseDeathComponent");
const CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const DIE_IN_AIE_REMOVE_DELAY = 5000;
const DEATH_EFFECT_MAX_TIME = 10000;
const DEATH_MATERIAL_TOLERANCE_TIME = 500;
let MonsterDeathComponent = class MonsterDeathComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments);
    this.Xte = undefined;
    this.sDe = undefined;
    this.s7r = undefined;
    this.DeathTagTask = undefined;
    this.DeathTimerTask = undefined;
    this.OnDeathEnded = () => {
      this.ClearDeathTasks();
      if (this.Xte?.Valid) {
        this.Xte.AddTag(1963731483);
        this.Xte.AddTag(-208062360);
      }
      this.Entity.Disable("[DeathComponent.SetActive] 死亡隐藏");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DropItemStarted, this.Entity?.Id);
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    };
    this.zpe = () => {
      if (!this.IsDeadInternal) {
        this.Bml();
      }
    };
    this.Nql = 0;
    this.Fql = -1;
    this.Vql = 0;
    this.Hql = undefined;
    this.jql = undefined;
    this.oud = undefined;
    this.z4l = undefined;
    this.Wql = (t, e) => {
      if (t === this.Nql) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效播放结束, 继续执行死亡流程", ["handleId", t]);
        }
        if (e) {
          EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.Wql);
        }
        this.OnDeathEnded();
        this.Qql();
        this.Nql = 0;
      }
    };
    this.Kql = (t, e) => {
      if (t === this.Fql) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡材质播放结束, 继续执行死亡流程", ["materialId", t]);
        }
        this.OnDeathEnded();
        this.$ql();
        this.Qql();
        this.Fql = -1;
        this.Hql = undefined;
      }
    };
  }
  OnInit() {
    this.Xte = this.Entity.CheckGetComponent(206);
    return true;
  }
  OnStart() {
    var t;
    var e;
    return !!super.OnStart() && (this.Entity.CheckGetComponent(0)?.GetLivingStatus() === Protocol_1.Aki.Protocol.JEs.Proto_Dead && this.ExecuteDeath(undefined), (t = this.Entity.GetComponent(1)?.Owner)?.IsValid() && (t = t.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass()), e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id), t) && e && (this.sDe = e, EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.zpe)), true);
  }
  OnClear() {
    this.ClearDeathTasks();
    if (this.sDe) {
      if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
      this.sDe = undefined;
    }
    this.Xql();
    return true;
  }
  ExecuteDeath(t) {
    return !!super.ExecuteDeath(t) && (this.Entity.GetComponent(175)?.RemoveBuffByEffectType(36, "实体死亡移除冰冻buff"), this.Xte.AddTag(1008164187), this.Entity.GetComponent(181)?.DetachFromHost(true, false, false), this.Entity.GetComponent(40)?.StopAllSkills("MonsterDeathComponent.ExecuteDeath"), this.Entity.GetComponent(102)?.ResetCharState(), this.Entity.GetComponent(175)?.RemoveAllDurationBuffs("实体死亡清理持续型buff"), this.PlayDeathAnimation(t), this.Bml(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnRoleDead, this.Entity.Id), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf), true);
  }
  PlayDeathAnimation(i) {
    if (!ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim && !this.Xte?.HasTag(-1943786195) && this.MontageComponent?.Valid && this.Entity.IsInit && this.Entity.Active) {
      var t = this.Entity.GetComponent(0)?.GetMonsterComponent();
      if (t) {
        t = t.PerformConfig?.ShowOnDeath?.EffectId;
        if (t) {
          t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterDeathEffectConfig(t);
          if (t) {
            var e;
            var t = Json_1.Json.Parse(t.Data);
            if (t) {
              e = [];
              if (t.ParticleEffect) {
                e.push({
                  Path: t.ParticleEffect,
                  EndRule: t.EndRule ?? 0
                });
              }
              if (t.MaterialEffect) {
                e.push({
                  Path: t.MaterialEffect,
                  EndRule: t.EndRule ?? 0
                });
              }
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效流程开始");
              }
              this.J4l(e);
              return;
            }
          }
        }
      }
      t = this.Entity.GetComponent(102)?.PositionState;
      if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
        this.PlayDeathMontageWithType(1, this.OnDeathEnded, i);
      } else {
        if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
          if (this.Xte?.HasTag(31862857)) {
            this.DeathTagTask = this.Xte.ListenForTagAddOrRemove(31862857, (t, e) => {
              if (!e) {
                if (this.HasDeathMontage(3)) {
                  this.PlayDeathMontageWithType(3, this.OnDeathEnded, i);
                } else {
                  this.OnDeathEnded();
                }
              }
            });
            this.DeathTimerTask = TimerSystem_1.TimerSystem.Delay(this.OnDeathEnded, DIE_IN_AIE_REMOVE_DELAY);
            return;
          }
          if (this.HasDeathMontage(2)) {
            this.PlayDeathMontageWithType(2, this.OnDeathEnded, i);
            return;
          }
        } else if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.HasDeathMontage(0)) {
          this.PlayDeathMontageWithType(0, this.OnDeathEnded, i);
          return;
        }
        this.OnDeathEnded();
      }
    } else {
      this.OnDeathEnded();
    }
  }
  ClearDeathTasks() {
    this.s7r?.EndTask();
    this.s7r = undefined;
    this.DeathTagTask?.EndTask();
    this.DeathTagTask = undefined;
    this.DeathTimerTask?.Remove();
    this.DeathTimerTask = undefined;
  }
  Bml() {
    var t = this.Entity.GetComponent(1)?.Owner;
    if (t?.IsValid() && (t = t.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass()))) {
      t.ResetEventTargets();
    }
  }
  async J4l(t) {
    var e = [];
    for (const o of t) {
      e.push(this.Yql(o));
    }
    await Promise.all(e);
    let i = false;
    let s = false;
    if (this.z4l) {
      this.z4l.sort((t, e) => e.CallbackPriority - t.CallbackPriority);
      for (const n of this.z4l) {
        if (n.DataAsset instanceof UE.EffectModelGroup_C) {
          i = this.Jql(n.Path, n.DataAsset, n.NeedCallback && !s) || i;
        } else if (n.DataAsset instanceof UE.PD_CharacterControllerData_C || n.DataAsset instanceof UE.PD_CharacterControllerDataGroup_C) {
          i = this.Zql(n.Path, n.DataAsset, n.NeedCallback && !s) || i;
        } else if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效播放失败, 请检查资源类型", ["path", n.Path], ["type", typeof n.DataAsset]);
        }
        if (i && n.NeedCallback) {
          s = true;
        }
      }
    }
    if (i) {
      this.eGl();
      this.tGl();
    } else {
      this.OnDeathEnded();
    }
  }
  async Yql(e) {
    const i = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e.Path, UE.Object, t => {
      if (t) {
        this.nud(e, t);
        this.z4l ||= [];
        this.z4l.push(e);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效加载失败, 请检查资源路径", ["path", e.Path]);
      }
      i.SetResult();
    });
    return i.Promise;
  }
  nud(t, e) {
    t.DataAsset = e;
    t.CallbackPriority = 0;
    t.NeedCallback = false;
    if (t.EndRule === IEntity_1.EMonsterDeathEffectEndRule.Any) {
      if (e instanceof UE.EffectModelGroup_C) {
        t.CallbackPriority = 2;
        if (e.StartTime > 0 && e.LoopTime === 0) {
          t.NeedCallback = true;
        }
      } else if (e instanceof UE.PD_CharacterControllerData_C) {
        t.CallbackPriority = 1;
        if (e.LoopTime.Loop === 0) {
          t.NeedCallback = true;
        }
      } else if (e instanceof UE.PD_CharacterControllerDataGroup_C) {
        t.CallbackPriority = 1;
        t.NeedCallback = true;
      }
    } else if (t.EndRule === IEntity_1.EMonsterDeathEffectEndRule.Particle && e instanceof UE.EffectModelGroup_C || t.EndRule === IEntity_1.EMonsterDeathEffectEndRule.Material && (e instanceof UE.PD_CharacterControllerData_C || e instanceof UE.PD_CharacterControllerDataGroup_C)) {
      t.CallbackPriority = 10;
      t.NeedCallback = true;
    }
  }
  Jql(t, e, i) {
    var s = this.Entity.GetComponent(3);
    var o = s?.Owner;
    var n = new EffectContext_1.EffectContext();
    n.SourceObject = o;
    n.EntityId = this.Entity.Id;
    var o = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, o?.D_GetTransform(), t, "[MonsterDeathComponent.PlayDeathEffect]", n, 0);
    if (o !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效开始播放", ["handleId", o]);
      }
      EffectSystem_1.EffectSystem.GetEffectActor(o).K2_AttachToComponent(s?.SkeletalMesh, RenderConfig_1.RenderConfig.RootName, 2, 1, 1, false);
      this.Nql = o;
      if (i) {
        EffectSystem_1.EffectSystem.AddFinishCallback(o, this.Wql);
      }
      return true;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效播放失败, 请检查特效参数", ["path", t]);
      }
      return false;
    }
  }
  Zql(i, s, o) {
    var n = this.Entity.GetComponent(3)?.Actor.CharRenderingComponent;
    if (n) {
      this.Hql = n;
      let t = -1;
      if (s instanceof UE.PD_CharacterControllerData_C) {
        t = n.AddMaterialControllerData(s);
      } else if (s instanceof UE.PD_CharacterControllerDataGroup_C) {
        t = n.AddMaterialControllerDataGroup(s);
      }
      let e = false;
      if (o && t !== -1) {
        e = this.iGl(s, t);
      }
      if (o && !e && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡材质设置回调失败", ["path", i]);
      }
      if (t !== -1) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡材质开始播放", ["materialId", t]);
        }
        this.Fql = t;
        return true;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡材质播放失败, 请检查资源类型", ["path", i], ["type", typeof s]);
      }
    } else {
      this.OnDeathEnded();
    }
    return false;
  }
  iGl(s, t) {
    if (this.Hql) {
      if (s instanceof UE.PD_CharacterControllerData_C) {
        var e = this.Hql.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
        if (e) {
          if (s.DataType === 0) {
            e.AddEffectFinishCallback(this.Kql);
            this.Vql = 1;
            return true;
          }
          e = s.LoopTime.Start + s.LoopTime.End;
          if (e > 0) {
            this.oud = TimerSystem_1.TimerSystem.Delay(() => {
              this.Kql(t);
            }, e * TimeUtil_1.TimeUtil.InverseMillisecond + DEATH_MATERIAL_TOLERANCE_TIME);
            this.Vql = 3;
            return true;
          }
        }
      } else if (s instanceof UE.PD_CharacterControllerDataGroup_C) {
        let e = 0;
        let i = false;
        for (let t = 0; t < s.DataMap.Num(); t++) {
          var o = s.DataMap.GetKey(t);
          if (o.DataType !== 0 || o.LoopTime.Loop > 0) {
            i = true;
          }
          if (o.LoopTime.Loop === 0) {
            e = Math.max(e, o.LoopTime.Start + o.LoopTime.End);
          }
        }
        if (!i) {
          EventSystem_1.EventSystem.AddWithTarget(this.Hql, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.Kql);
          this.Vql = 2;
          return true;
        }
        if (e > 0) {
          this.oud = TimerSystem_1.TimerSystem.Delay(() => {
            this.Kql(t);
          }, e * TimeUtil_1.TimeUtil.InverseMillisecond + DEATH_MATERIAL_TOLERANCE_TIME);
          this.Vql = 3;
          return true;
        }
      }
    }
    this.Vql = 0;
    return false;
  }
  $ql() {
    var t;
    if (this.Hql) {
      if (this.Vql === 1) {
        if (t = this.Hql.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2)) {
          t.RemoveEffectFinishCallback(this.Kql);
        }
      } else if (this.Vql === 2) {
        if (EventSystem_1.EventSystem.HasWithTarget(this.Hql, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.Kql)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.Hql, EventDefine_1.EEventName.OnRemoveMaterialControllerGroup, this.Kql);
        }
      } else if (this.Vql === 3 && this.oud) {
        TimerSystem_1.TimerSystem.Remove(this.oud);
        this.oud = undefined;
      }
    }
    this.Vql = 0;
  }
  eGl() {
    this.TimeScaleComponent?.SetTimeScale(100, 0, undefined, DEATH_EFFECT_MAX_TIME, 12);
  }
  tGl() {
    this.Qql();
    this.jql = TimerSystem_1.TimerSystem.Delay(() => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "[MonsterDeathComponent]怪物特殊死亡特效播放超时, 执行保底逻辑, 请检查特效参数", ["handleId", this.Nql], ["materialId", this.Fql]);
      }
      this.jql = undefined;
      if (this.Nql !== 0) {
        this.Wql(this.Nql, true);
      } else if (this.Fql !== -1) {
        this.Kql(this.Fql, true);
      } else {
        this.OnDeathEnded();
      }
    }, DEATH_EFFECT_MAX_TIME);
  }
  Qql() {
    if (this.jql) {
      TimerSystem_1.TimerSystem.Remove(this.jql);
      this.jql = undefined;
    }
  }
  Xql() {
    this.Qql();
    if (this.Vql !== 0) {
      this.$ql();
    }
    if (this.Nql !== 0) {
      EffectSystem_1.EffectSystem.RemoveFinishCallback(this.Nql, this.Wql);
    }
    this.z4l = undefined;
    this.Hql = undefined;
    this.Nql = 0;
    this.Fql = -1;
  }
};
MonsterDeathComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(184)], MonsterDeathComponent);
exports.MonsterDeathComponent = MonsterDeathComponent; //# sourceMappingURL=MonsterDeathComponent.js.map