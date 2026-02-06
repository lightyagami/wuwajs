"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var r;
  var n = arguments.length;
  var o = n < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(e, t, i, s);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (r = e[h]) {
        o = (n < 3 ? r(o) : n > 3 ? r(t, i, o) : r(t, i)) || o;
      }
    }
  }
  if (n > 3 && o) {
    Object.defineProperty(t, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterDeathComponent = undefined;
const UE = require("ue");
const Json_1 = require("../../../../../../Core/Common/Json");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const IEntity_1 = require("../../../../../../UniverseEditor/Interface/IEntity");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const BaseDeathComponent_1 = require("../../../Common/Component/Abilities/BaseDeathComponent");
const CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes");
const MonsterDeathEffectMachine_1 = require("../../Logics/MonsterDeathEffectMachine");
const DIE_IN_AIE_REMOVE_DELAY = 5000;
let MonsterDeathComponent = class MonsterDeathComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments);
    this.Xte = undefined;
    this.sDe = undefined;
    this.s7r = undefined;
    this.Sim = undefined;
    this.DeathTagTask = undefined;
    this.DeathTimerTask = undefined;
    this.OnDeathEnded = () => {
      this.ClearDeathTasks();
      if (this.Xte?.Valid) {
        this.Xte.AddTag(1963731483);
        this.Xte.AddTag(-208062360);
      }
      this.Entity.Disable("[DeathComponent.SetActive] 死亡隐藏");
      this.Entity.GetComponent(47)?.CancelForceDisableAnimOptimization(6);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DropItemStarted, this.Entity?.Id);
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    };
    this.zpe = () => {
      if (!this.IsDeadInternal) {
        this.Bml();
      }
    };
  }
  OnInit() {
    this.Xte = this.Entity.CheckGetComponent(217);
    return true;
  }
  OnStart() {
    var e;
    var t;
    return !!super.OnStart() && (this.Entity.CheckGetComponent(0)?.GetLivingStatus() === Protocol_1.Aki.Protocol.JEs.Proto_Dead && this.ExecuteDeath(undefined), (e = this.Entity.GetComponent(1)?.Owner)?.IsValid() && (e = e.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass()), t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.Entity.Id), e) && t && (this.sDe = t, EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.zpe)), true);
  }
  OnClear() {
    this.ClearDeathTasks();
    if (this.sDe) {
      if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
      this.sDe = undefined;
    }
    if (this.Sim) {
      this.Sim.Clear();
      this.Sim = undefined;
    }
    return true;
  }
  ExecuteDeath(e) {
    return !!super.ExecuteDeath(e) && (SceneTeamController_1.SceneTeamController.EmitEvent(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadBefore), this.Entity.GetComponent(185)?.RemoveBuffByEffectType(36, "实体死亡移除冰冻buff"), this.Xte.AddTag(1008164187), this.Entity.GetComponent(191)?.DetachFromHost(true, false, false), this.Entity.GetComponent(43)?.StopAllSkills("MonsterDeathComponent.ExecuteDeath"), this.Entity.GetComponent(111)?.ResetCharState(), this.Entity.GetComponent(185)?.RemoveAllDurationBuffs("实体死亡清理持续型buff"), this.PlayDeathAnimation(e), this.Bml(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharOnRoleDead, this.Entity.Id), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf), true);
  }
  PlayDeathAnimation(i) {
    if (!ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim && !this.Xte?.HasTag(-1943786195) && this.MontageComponent?.Valid && this.Entity.IsInit && this.Entity.Active) {
      if (!this.xzd()) {
        var e = this.Entity.GetComponent(111)?.PositionState;
        if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Water) {
          this.PlayDeathMontageWithType(1, this.OnDeathEnded, i, true);
        } else {
          if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
            if (this.Xte?.HasTag(31862857)) {
              this.DeathTagTask = this.Xte.ListenForTagAddOrRemove(31862857, (e, t) => {
                if (!t) {
                  if (this.HasDeathMontage(3)) {
                    this.PlayDeathMontageWithType(3, this.OnDeathEnded, i, true);
                  } else {
                    this.OnDeathEnded();
                  }
                }
              });
              this.DeathTimerTask = TimerSystem_1.TimerSystem.Delay(this.OnDeathEnded, DIE_IN_AIE_REMOVE_DELAY);
              return;
            }
            if (this.HasDeathMontage(2)) {
              this.PlayDeathMontageWithType(2, this.OnDeathEnded, i, true);
              return;
            }
          } else if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground && this.HasDeathMontage(0)) {
            this.PlayDeathMontageWithType(0, this.OnDeathEnded, i, true);
            return;
          }
          this.OnDeathEnded();
        }
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
    var e = this.Entity.GetComponent(1)?.Owner;
    if (e?.IsValid() && (e = e.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass()))) {
      e.ResetEventTargets();
    }
  }
  xzd() {
    var e = this.Bzd();
    return !!e && (this.Sim = new MonsterDeathEffectMachine_1.MonsterDeathEffectMachine(), this.Sim.Init(this.Entity, e, this.OnDeathEnded), this.Sim.Play(), true);
  }
  Bzd() {
    var t = this.Entity.GetComponent(0)?.GetMonsterComponent();
    if (t) {
      t = t.PerformConfig?.ShowOnDeath?.EffectId;
      if (t) {
        t = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterDeathEffectConfig(t);
        if (t) {
          t = Json_1.Json.Parse(t.Data);
          if (t.Type === IEntity_1.EEffectConfigType.Death) {
            return t;
          }
          var i = t;
          let e = -1;
          for (const s of i.EffectGroup) {
            if (s.Tag.length === 0) {
              if (e === -1) {
                e = i.EffectGroup.indexOf(s);
              }
            } else if (this.Xte?.HasTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s.Tag))) {
              return s.EffectConfig;
            }
          }
          if (e !== -1) {
            return i.EffectGroup[e].EffectConfig;
          } else {
            return undefined;
          }
        }
      }
    }
  }
};
MonsterDeathComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(194)], MonsterDeathComponent);
exports.MonsterDeathComponent = MonsterDeathComponent; //# sourceMappingURL=MonsterDeathComponent.js.map