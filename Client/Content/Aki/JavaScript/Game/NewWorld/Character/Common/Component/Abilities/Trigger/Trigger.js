"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trigger = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../../../Core/Common/Time");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const Macro_1 = require("../../../../../../../Core/Preprocessor/Macro");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../../../../Module/Abilities/FormationAttributeController");
const SceneTeamEvent_1 = require("../../../../../../Module/SceneTeam/SceneTeamEvent");
const ActorUtils_1 = require("../../../../../../Utils/ActorUtils");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const ConditionFormula_1 = require("../../../../../../Utils/Trigger/ConditionFormula");
const CampUtils_1 = require("../../../Blueprint/Utils/CampUtils");
const AbilityEvent_1 = require("../AbilityEvent");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const TriggerType_1 = require("./TriggerType");
function getTarget(t, e) {
  switch (e) {
    case 0:
      return t;
    case 1:
      return SceneTeamEvent_1.SceneTeam.Local;
    case 2:
      return SceneTeamEvent_1.SceneTeam.All;
    case 3:
      return;
  }
}
class Trigger {
  constructor(t, e, i, s, r, n) {
    this.Config = t;
    this.Handle = e;
    this.OwnerTriggerComp = i;
    this.Callback = r;
    this.Checker = n;
    this.Rgr = undefined;
    this.TriggerType = undefined;
    this.dce = false;
    this.fYo = 0;
    this.DebugName = undefined;
    this.IterationLock = -1;
    if (!t) {
      throw new Error("找不到对应的Trigger配置");
    }
    this.TriggerType = TriggerType_1.ETriggerEvent[t.Type];
    if (this.TriggerType === undefined) {
      throw new Error("找不到对应的Trigger触发器类型");
    }
    e = t.Formula;
    r = t.Params?.length ? JSON.parse(t.Params) : {};
    r.Owner = i?.Entity;
    this.Rgr = new ConditionFormula_1.Formula(e).SetBuiltinFunctions(s).AddBuiltinFunction("Accumulate", (t, e, i = true) => !!i && (this.fYo += t, this.fYo >= e) && !(this.fYo = 0)).SetDefaultParams(r);
  }
  OnInitParams(t) {}
  SetActive(t) {
    if (this.dce !== t) {
      if (this.dce = t) {
        this.OnActive();
      } else {
        this.OnInactive();
      }
    }
  }
  Destroy() {
    this.SetActive(false);
    this.OwnerTriggerComp = undefined;
    this.Config = undefined;
    this.Callback = undefined;
  }
  static GetClass(t) {
    switch (t) {
      case TriggerType_1.ETriggerEvent.HitTrigger:
        return HitTrigger;
      case TriggerType_1.ETriggerEvent["temp_hittrigger1.0"]:
        return HitTriggerIncludingVision;
      case TriggerType_1.ETriggerEvent.BeHitTrigger:
        return BeHitTrigger;
      case TriggerType_1.ETriggerEvent.AttributeChangedTrigger:
        return AttributeChangedTrigger;
      case TriggerType_1.ETriggerEvent.TeamAttributeChangeTrigger:
        return TeamAttributeChangedTrigger;
      case TriggerType_1.ETriggerEvent.TagTrigger:
        return TagTrigger;
      case TriggerType_1.ETriggerEvent.TagStackTrigger:
        return TagStackTrigger;
      case TriggerType_1.ETriggerEvent.LimitDodgeTrigger:
        return LimitDodgeTrigger;
      case TriggerType_1.ETriggerEvent.SkillTrigger:
        return SkillTrigger;
      case TriggerType_1.ETriggerEvent.DamageTrigger:
        return DamageTrigger;
      case TriggerType_1.ETriggerEvent.BeDamageTrigger:
        return BeDamageTrigger;
      case TriggerType_1.ETriggerEvent.GlobalDamageTrigger:
        return GlobalDamageTrigger;
      case TriggerType_1.ETriggerEvent.DeathTrigger:
        return DeathTrigger;
      case TriggerType_1.ETriggerEvent.KillTrigger:
        return KillTrigger;
      case TriggerType_1.ETriggerEvent.GameplayEventTrigger:
        return GameplayEventTrigger;
      case TriggerType_1.ETriggerEvent.QteGoBattleTrigger:
        return QteGoBattleTrigger;
      case TriggerType_1.ETriggerEvent.QteGoDownTrigger:
        return QteGoDownTrigger;
      case TriggerType_1.ETriggerEvent.BuffInstigatorTrigger:
        return BuffInstigatorTrigger;
      case TriggerType_1.ETriggerEvent.BuffVictimTrigger:
        return BuffVictimTrigger;
      case TriggerType_1.ETriggerEvent.VisionTrigger:
        return VisionTrigger;
      case TriggerType_1.ETriggerEvent.DamageIdTrigger:
        return DamageIdTrigger;
      case TriggerType_1.ETriggerEvent.BuffAddFailureTrigger:
        return BuffAddFailureTrigger;
      case TriggerType_1.ETriggerEvent.ShieldTrigger:
        return ShieldTrigger;
      case TriggerType_1.ETriggerEvent.ShowTargetTrigger:
        return ShowTargetTrigger;
      case TriggerType_1.ETriggerEvent.RegionDetectTrigger:
        return RegionDetectTrigger;
      case TriggerType_1.ETriggerEvent.BreakWeaknessTrigger:
        return BreakWeaknessTrigger;
    }
  }
  EvaluateAndExecute(t) {
    if (this.Rgr.Evaluate(t)) {
      try {
        if (this.TryLock()) {
          this.Callback?.(this.Rgr.Params, t);
          this.Unlock();
        } else {
          CombatLog_1.CombatLog.Error("PassiveSkill", this.OwnerTriggerComp?.Entity, "被动技能不能在同一个调用栈中递归触发", ["触发器", ""], ["Formula", ""]);
        }
      } catch (t) {
        this.Unlock();
        if (t instanceof Error) {
          CombatLog_1.CombatLog.ErrorWithStack("PassiveSkill", this.OwnerTriggerComp?.Entity, "触发器回调函数执行错误", t, ["触发器", ""], ["Formula", ""], ["错误信息", t.message]);
        } else {
          CombatLog_1.CombatLog.Error("PassiveSkill", this.OwnerTriggerComp?.Entity, "触发器回调函数执行错误", ["触发器", ""], ["Formula", ""], ["错误信息", t]);
        }
      }
    } else {
      ;
    }
  }
  TryLock() {
    return this.IterationLock !== Time_1.Time.Frame && (this.IterationLock = Time_1.Time.Frame, true);
  }
  Unlock() {
    this.IterationLock = -1;
  }
}
exports.Trigger = Trigger;
const INVALID_HIT_COUNT = 9999;
class BeHitTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnHitLocal = (t, e) => {
      this.OnEvent(e);
    };
    this.OnHitRemote = t => {
      this.OnEvent(t);
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeHitLocal, this.OnHitLocal)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharBeHitLocal, this.OnHitLocal);
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeHitRemote, this.OnHitRemote)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharBeHitRemote, this.OnHitRemote);
      }
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeHitLocal, this.OnHitLocal) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharBeHitLocal, this.OnHitLocal), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeHitRemote, this.OnHitRemote))) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharBeHitRemote, this.OnHitRemote);
    }
  }
  OnEvent(t) {
    if (!this.Checker || !!this.Checker()) {
      t = {
        Attacker: t.Attacker,
        Victim: t.Target,
        SkillID: t.SkillId,
        SkillType: t.SkillGenre,
        BulletID: Number(t.BulletId),
        CounterType: t.CounterAttackType,
        SkillHitCount: t.SkillHitCount ?? INVALID_HIT_COUNT,
        BulletHitCount: t.BulletHitCount ?? INVALID_HIT_COUNT,
        BattleFlags: t.BattleFlags
      };
      this.EvaluateAndExecute(t);
    }
  }
}
class HitTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnHitLocal = (t, e) => {
      this.OnEvent(e);
    };
    this.OnHitRemote = t => {
      this.OnEvent(t);
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal);
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharHitRemote, this.OnHitRemote);
      }
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharHitLocal, this.OnHitLocal);
    }
  }
  OnEvent(t) {
    if (!this.Checker || !!this.Checker()) {
      t = {
        Attacker: t.Attacker,
        Victim: t.Target,
        SkillID: t.SkillId,
        SkillType: t.SkillGenre,
        BulletID: Number(t.BulletId),
        CounterType: t.CounterAttackType,
        SkillHitCount: t.SkillHitCount ?? INVALID_HIT_COUNT,
        BulletHitCount: t.BulletHitCount ?? INVALID_HIT_COUNT,
        BattleFlags: t.BattleFlags
      };
      this.EvaluateAndExecute(t);
    }
  }
}
class HitTriggerIncludingVision extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnEvent = (t, e) => {
      if (!this.Checker || !!this.Checker()) {
        e = {
          Attacker: e.Attacker,
          Victim: e.Target,
          SkillID: e.SkillId,
          SkillType: e.SkillGenre,
          BulletID: Number(e.BulletId),
          CounterType: e.CounterAttackType
        };
        this.EvaluateAndExecute(e);
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharHitIncludingVision, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharHitIncludingVision, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharHitIncludingVision, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharHitIncludingVision, this.OnEvent);
    }
  }
}
class AttributeChangedTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.AttributeId = CharacterAttributeTypes_1.EAttributeId.Proto_EAttributeType_None;
    this.OnEvent = (t, e, i, s) => {
      if (!this.Checker || !!this.Checker()) {
        this.EvaluateAndExecute({
          NewValue: i,
          OldValue: s,
          Target: e
        });
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
    this.AttributeId = Number(t[1] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      AbilityEvent_1.AbilityEvent.Add(t, 5, this.AttributeId, this.OnEvent);
    }
    switch (this.TargetType) {
      case 0:
        this.BPm(this.OwnerTriggerComp?.Entity);
        break;
      case 1:
      case 2:
        var e = this.TargetType === 1;
        for (const i of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(e)) {
          this.BPm(i.Entity);
        }
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      AbilityEvent_1.AbilityEvent.Remove(t, 5, this.AttributeId, this.OnEvent);
    }
  }
  BPm(t) {
    var e = t?.GetComponent(184);
    if (e) {
      e = e.GetCurrentValue(this.AttributeId);
      this.OnEvent(this.AttributeId, t, e, e);
    }
  }
}
class TeamAttributeChangedTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.AttributeId = 1;
    this.OnEvent = (t, e, i) => {
      if (!this.Checker || !!this.Checker()) {
        e = {
          NewValue: e,
          OldValue: i,
          MaxValue: FormationAttributeController_1.FormationAttributeController.GetMax(t)
        };
        this.EvaluateAndExecute(e);
      }
    };
  }
  OnInitParams(t) {
    this.AttributeId = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = FormationAttributeController_1.FormationAttributeController.GetValue(this.AttributeId);
    this.OnEvent(this.AttributeId, t, t);
    FormationAttributeController_1.FormationAttributeController.AddValueListener(this.AttributeId, this.OnEvent);
  }
  OnInactive() {
    FormationAttributeController_1.FormationAttributeController.RemoveValueListener(this.AttributeId, this.OnEvent);
  }
}
class TagTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.CheckRemove = false;
    this.TargetType = 0;
    this.InitBehavior = 0;
    this.TagId = 0;
    this.OnEvent = (t, e) => {
      if (!this.Checker || !!this.Checker()) {
        if (e !== this.CheckRemove) {
          this.EvaluateAndExecute({});
        }
      }
    };
  }
  OnInitParams(t) {
    this.TagId = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t[0].trim());
    if (this.TagId === undefined) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.OwnerTriggerComp?.Entity, "被动技能的tag找不到对应的tagId", ["tag", t[1]]);
    }
    this.CheckRemove = !!Number(t[1] ?? 0);
    this.TargetType = Number(t[2] ?? 0);
    this.InitBehavior = Number(t[3] ?? 0);
  }
  OnActive() {
    if (this.TagId !== undefined) {
      var t = this.OwnerTriggerComp?.Entity.GetComponent(217);
      if (t) {
        switch (this.InitBehavior) {
          case 1:
            if (t.HasTag(this.TagId)) {
              this.OnEvent(this.TagId, true);
            }
            break;
          case 2:
            if (!t.HasTag(this.TagId)) {
              this.OnEvent(this.TagId, false);
            }
        }
        t.AddTagAddOrRemoveListener(this.TagId, this.OnEvent);
      }
    }
  }
  OnInactive() {
    if (this.TagId !== undefined) {
      this.OwnerTriggerComp?.Entity.GetComponent(217)?.RemoveTagAddOrRemoveListener(this.TagId, this.OnEvent);
    }
  }
}
class TagStackTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TagId = 0;
    this.OldCount = 0;
    this.InitBehavior = 0;
    this.OnEvent = (t, e) => {
      var i;
      if (!this.Checker || !!this.Checker()) {
        i = {
          NewStack: t,
          OldStack: this.OldCount
        };
        this.OldCount = t;
        this.EvaluateAndExecute(i);
      }
    };
  }
  OnInitParams(t) {
    this.TagId = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t[0].trim());
    if (this.TagId === undefined) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.OwnerTriggerComp?.Entity, "被动技能的tag找不到对应的tagId", ["tag", t[0]]);
    }
    this.InitBehavior = Number(t[1] ?? 0);
  }
  OnActive() {
    if (this.TagId !== undefined) {
      var t = this.OwnerTriggerComp?.Entity.GetComponent(217);
      if (t) {
        var e = t.GetTagCount(this.TagId);
        switch (this.InitBehavior) {
          case 1:
            if (e > 0) {
              this.OnEvent(e, this.TagId);
            }
            break;
          case 2:
            if (e <= 0) {
              this.OnEvent(e, this.TagId);
            }
        }
        this.OldCount = e;
        t.AddTagChangedListener(this.TagId, this.OnEvent);
      }
    }
  }
  OnInactive() {
    if (this.TagId !== undefined) {
      this.OwnerTriggerComp?.Entity.GetComponent(217)?.RemoveTagChangedListener(this.TagId, this.OnEvent);
    }
  }
}
class LimitDodgeTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnEvent = (t, e, i, s) => {
      if (!this.Checker || !!this.Checker()) {
        e = {
          Attacker: t,
          Victim: e,
          SkillID: i,
          SkillType: EntitySystem_1.EntitySystem.Get(t.Id)?.GetComponent(43)?.GetSkillInfo(i)?.SkillGenre,
          BulletID: s
        };
        this.EvaluateAndExecute(e);
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharLimitDodge, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharLimitDodge, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharLimitDodge, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharLimitDodge, this.OnEvent);
    }
  }
}
class SkillTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.SkillIds = [];
    this.AllSKill = false;
    this.CheckEnd = false;
    this.OnSelfEvent = (t, e) => {
      if ((!this.Checker || this.Checker()) && (this.AllSKill || this.SkillIds.includes(e))) {
        var t = EntitySystem_1.EntitySystem.Get(t);
        var i = t?.GetComponent(43);
        var s = i?.GetSkillInfo(e);
        if (i && s) {
          var r = [];
          for (let t = 0; t < s.SkillTag.Num(); t++) {
            var n = s?.SkillTag.Get(t)?.TagName;
            if (n !== undefined) {
              r.push(n);
            }
          }
          i = i.GetSkill(e);
          if (i) {
            e = {
              SkillType: s?.SkillGenre,
              SkillTags: r,
              SkillID: e,
              BattleFlags: i.BattleContext?.BattleFlags ?? [],
              Attacker: t
            };
            this.EvaluateAndExecute(e);
          }
        }
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
    if (t[1]) {
      this.SkillIds = t[1].split("#").map(t => Number(t));
      this.AllSKill = this.SkillIds.includes(-1);
    } else {
      this.AllSKill = true;
    }
    this.CheckEnd = !!Number(t[2] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      if (this.CheckEnd) {
        if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnSkillEnd, this.OnSelfEvent)) {
          EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnSkillEnd, this.OnSelfEvent);
        }
      } else {
        if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharUseSkill, this.OnSelfEvent)) {
          EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharUseSkill, this.OnSelfEvent);
        }
        if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharUseSkillRemote, this.OnSelfEvent)) {
          EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharUseSkillRemote, this.OnSelfEvent);
        }
      }
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      if (this.CheckEnd) {
        if (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnSkillEnd, this.OnSelfEvent)) {
          EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnSkillEnd, this.OnSelfEvent);
        }
      } else {
        if (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharUseSkill, this.OnSelfEvent)) {
          EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharUseSkill, this.OnSelfEvent);
        }
        if (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharUseSkillRemote, this.OnSelfEvent)) {
          EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharUseSkillRemote, this.OnSelfEvent);
        }
      }
    }
  }
}
class DamageTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.CalculateType = 0;
    this.OnEvent = (t, e, i, s) => {
      var r;
      var n;
      if (!this.Checker || !!this.Checker()) {
        r = s.Damage;
        if ((n = s.DamageData).CalculateType === this.CalculateType) {
          t = {
            Attacker: t,
            Victim: e,
            DamageID: n.Id,
            SkillID: i?.SkillId ?? 0,
            SkillType: i?.SkillGenre,
            DamageType: n.Type,
            DamageSubType: n.SubType,
            ElementType: s.Element,
            DamageValue: -r,
            IsCritical: i.IsCritical,
            SkillDamageCount: i?.SkillDamageCount ?? INVALID_HIT_COUNT,
            BattleFlags: i.BattleFlags,
            CounterType: i.CounterType ?? 0
          };
          this.EvaluateAndExecute(t);
        }
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
    this.CalculateType = Number(t[1] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent);
    }
  }
}
class GlobalDamageTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.CalculateType = 0;
    this.DistSquared = 0;
    this.OnEvent = (t, e, i, s) => {
      var r;
      var n;
      var h;
      var a;
      if (!this.Checker || !!this.Checker()) {
        r = s.Damage;
        if ((n = s.DamageData).CalculateType === this.CalculateType && this.OwnerTriggerComp?.Entity.Valid && (a = this.OwnerTriggerComp?.Entity.GetComponent(3)?.ActorLocationProxy, h = e.GetComponent(3)?.ActorLocationProxy, a) && h) {
          if (!(Vector_1.Vector.DistSquared(a, h) > this.DistSquared)) {
            a = {
              Attacker: t,
              Victim: e,
              DamageID: n.Id,
              SkillID: i?.SkillId ?? 0,
              SkillType: i?.SkillGenre,
              DamageType: n.Type,
              DamageSubType: n.SubType,
              ElementType: s.Element,
              DamageValue: -r,
              IsCritical: i.IsCritical,
              SkillDamageCount: i?.SkillDamageCount ?? INVALID_HIT_COUNT,
              BulletDamageCount: i?.BulletDamageCount ?? INVALID_HIT_COUNT,
              BattleFlags: i.BattleFlags,
              CounterType: i.CounterType ?? 0
            };
            this.EvaluateAndExecute(a);
          }
        }
      }
    };
  }
  OnInitParams(t) {
    this.CalculateType = Number(t[0] ?? 0);
    t = Number(t[1] ?? 0);
    this.DistSquared = t * t;
  }
  OnActive() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GlobalCharDamage, this.OnEvent);
  }
  OnInactive() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GlobalCharDamage, this.OnEvent);
  }
}
class BeDamageTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.CalculateType = 0;
    this.OnEvent = (t, e, i, s) => {
      var r;
      var n;
      if (!this.Checker || !!this.Checker()) {
        r = s.Damage;
        if ((n = s.DamageData).CalculateType === this.CalculateType) {
          t = {
            Attacker: t,
            Victim: e,
            DamageID: n.Id,
            SkillID: i?.SkillId ?? 0,
            SkillType: i?.SkillGenre,
            DamageType: n.Type,
            DamageSubType: n.SubType,
            ElementType: s.Element,
            DamageValue: -r,
            IsCritical: i.IsCritical,
            SkillDamageCount: i?.SkillDamageCount ?? INVALID_HIT_COUNT,
            BulletDamageCount: i?.BulletDamageCount ?? INVALID_HIT_COUNT,
            BattleFlags: i.BattleFlags,
            CounterType: i.CounterType ?? 0
          };
          this.EvaluateAndExecute(t);
        }
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
    this.CalculateType = Number(t[1] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent);
    }
  }
}
class DeathTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.ListenDeathType = 0;
    this.OnEvent = (t, e, i, s) => {
      var r;
      var n;
      if (!this.Checker || !!this.Checker()) {
        r = s.Damage;
        n = s.DamageData;
        if (i.IsTargetKilled) {
          t = {
            Attacker: t,
            Victim: e,
            DamageID: n.Id,
            SkillID: i?.SkillId ?? 0,
            SkillType: i?.SkillGenre,
            DamageType: n.Type,
            DamageSubType: n.SubType,
            ElementType: s.Element,
            DamageValue: -r,
            IsCritical: i.IsCritical
          };
          this.EvaluateAndExecute(t);
        }
      }
    };
    this.OnDeathBefore = () => {
      if (!this.Checker || !!this.Checker()) {
        this.EvaluateAndExecute({});
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
    this.ListenDeathType = Number(t[1] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      if (this.ListenDeathType !== 0 || EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent)) {
        if (this.ListenDeathType === 1 && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharOnRoleDeadBefore, this.OnDeathBefore)) {
          EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharOnRoleDeadBefore, this.OnDeathBefore);
        }
      } else {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent);
      }
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      if (this.ListenDeathType === 0 && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent)) {
        EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent);
      } else if (this.ListenDeathType === 1 && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharOnRoleDeadBefore, this.OnDeathBefore)) {
        EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharOnRoleDeadBefore, this.OnDeathBefore);
      }
    }
  }
}
class KillTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnEvent = (t, e, i, s) => {
      var r;
      var n;
      if (!this.Checker || !!this.Checker()) {
        r = s.Damage;
        n = s.DamageData;
        if (i.IsTargetKilled) {
          t = {
            Attacker: t,
            Victim: e,
            DamageID: n.Id,
            SkillID: i?.SkillId ?? 0,
            SkillType: i?.SkillGenre,
            DamageType: n.Type,
            DamageSubType: n.SubType,
            ElementType: s.Element,
            DamageValue: -r,
            IsCritical: i.IsCritical
          };
          this.EvaluateAndExecute(t);
        }
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharDamage, this.OnEvent);
    }
  }
}
class GameplayEventTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TagId = 0;
    this.OnEvent = (t, e) => {
      if (!this.Checker || !!this.Checker()) {
        e = {
          Target: e.Target ? ActorUtils_1.ActorUtils.GetEntityByActor(e.Target)?.Entity : undefined
        };
        this.EvaluateAndExecute(e);
      }
    };
  }
  OnInitParams(t) {
    this.TagId = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t[0].trim());
    if (this.TagId === undefined) {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.OwnerTriggerComp?.Entity, "被动技能的GameplayEvent找不到对应的tagId", ["GameplayEvent", t[1]]);
    }
  }
  OnActive() {
    if (this.TagId !== undefined) {
      this.OwnerTriggerComp?.Entity.GetComponent(17)?.AddGameplayEventListener(this.TagId, this.OnEvent);
    }
  }
  OnInactive() {
    if (this.TagId !== undefined) {
      this.OwnerTriggerComp?.Entity.GetComponent(17)?.RemoveGameplayEventListener(this.TagId, this.OnEvent);
    }
  }
}
class QteGoBattleTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnEvent = (t, e) => {
      if (!this.Checker || this.Checker()) {
        switch (this.TargetType) {
          case 0:
            if (t !== this.OwnerTriggerComp?.Entity.Id) {
              return;
            }
            break;
          case 1:
            var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(t, {
              ParamType: 1
            });
            if (i && i.IsMyRole()) {
              break;
            }
            return;
        }
        var s = EntitySystem_1.EntitySystem.Get(t);
        var e = EntitySystem_1.EntitySystem.Get(e);
        this.EvaluateAndExecute({
          GoBattleEntity: s,
          GoDownEntity: e
        });
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteQte, this.OnEvent)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharExecuteQte, this.OnEvent);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteMultiQte, this.OnEvent)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharExecuteMultiQte, this.OnEvent);
    }
  }
  OnInactive() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteQte, this.OnEvent)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharExecuteQte, this.OnEvent);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteMultiQte, this.OnEvent)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharExecuteMultiQte, this.OnEvent);
    }
  }
}
class QteGoDownTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnEvent = (t, e) => {
      if (!this.Checker || this.Checker()) {
        switch (this.TargetType) {
          case 0:
            if (e !== this.OwnerTriggerComp?.Entity.Id) {
              return;
            }
            break;
          case 1:
            var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
              ParamType: 1
            });
            if (i && i.IsMyRole()) {
              break;
            }
            return;
        }
        var t = EntitySystem_1.EntitySystem.Get(t);
        var s = EntitySystem_1.EntitySystem.Get(e);
        this.EvaluateAndExecute({
          GoBattleEntity: t,
          GoDownEntity: s
        });
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteQte, this.OnEvent)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharExecuteQte, this.OnEvent);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteMultiQte, this.OnEvent)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharExecuteMultiQte, this.OnEvent);
    }
  }
  OnInactive() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteQte, this.OnEvent)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharExecuteQte, this.OnEvent);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteMultiQte, this.OnEvent)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharExecuteMultiQte, this.OnEvent);
    }
  }
}
class BuffInstigatorTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.ListenBuffIds = new Set();
    this.NotIncludeBornBuff = false;
    this.OnEvent = (t, e, i, s) => {
      if ((!this.Checker || !!this.Checker()) && (!this.NotIncludeBornBuff || !s)) {
        this.EvaluateAndExecute({
          BuffId: t,
          Victim: e,
          Attacker: i
        });
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
    var e = t[1]?.split("#");
    if (e) {
      for (const s of e) {
        var i = Number(s);
        if (Number.isInteger(i) && i > 0) {
          this.ListenBuffIds.add(i);
        }
      }
      this.NotIncludeBornBuff = t[2] === "1";
    }
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      for (const e of this.ListenBuffIds) {
        AbilityEvent_1.AbilityEvent.Add(t, 1, e, this.OnEvent);
      }
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      for (const e of this.ListenBuffIds) {
        AbilityEvent_1.AbilityEvent.Remove(t, 1, e, this.OnEvent);
      }
    }
  }
}
class BuffVictimTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.ListenBuffIds = new Map();
    this.OnEvent = (e, i, s, r) => {
      if (!this.Checker || this.Checker()) {
        let t = false;
        var n = this.ListenBuffIds.get(e);
        if (n) {
          for (var [h, a] of n) {
            if (h === 0 && s >= a && i < a || h === 1 && s <= a && i > a || h === 2 && s >= a || h === 3 && s <= a) {
              t = true;
              break;
            }
          }
          if (t) {
            this.EvaluateAndExecute({
              BuffId: e,
              OldStack: i,
              NewStack: s,
              Victim: r
            });
          }
        }
      }
    };
  }
  OnInitParams(e) {
    this.TargetType = Number(e[0] ?? 0);
    for (let t = 1; t < e.length; t++) {
      var i = e[t]?.split("#");
      if (i) {
        var s = Number(i[0]);
        var r = Number(i[1]);
        var i = Number(i[2]);
        if (!Number.isInteger(r) || !Number.isInteger(i) || !Number.isInteger(s)) {
          CombatLog_1.CombatLog.Error("PassiveSkill", this.OwnerTriggerComp?.Entity, "BuffVictimTrigger参数错误", ["triggerName", ""], ["params", e]);
          return;
        }
        let t = this.ListenBuffIds.get(r);
        if (!t) {
          this.ListenBuffIds.set(r, t = []);
        }
        t.push([s, i]);
      }
    }
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      for (const e of this.ListenBuffIds.keys()) {
        AbilityEvent_1.AbilityEvent.Add(t, 0, e, this.OnEvent);
      }
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      for (const e of this.ListenBuffIds.keys()) {
        AbilityEvent_1.AbilityEvent.Remove(t, 0, e, this.OnEvent);
      }
    }
  }
}
class VisionTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.kXo = 0;
    this.Au1 = [];
    this.Pu1 = false;
    this.KCc = 0;
    this.XCc = -1;
    this.YCc = new Map();
    this.OnEvent = t => {
      var e;
      if (!this.Checker || !!this.Checker()) {
        if ((this.Pu1 || this.Au1.includes(t)) && (e = this.YCc.get(t) ?? 0, this.YCc.set(t, e + 1), this.XCc < 0 || e < this.XCc)) {
          this.KCc++;
          t = {
            TriggerCount: this.KCc
          };
          this.EvaluateAndExecute(t);
        }
      }
    };
  }
  OnInitParams(t) {
    this.kXo = Number(t[0] ?? 0);
    this.Au1 = t[1].split("#").map(t => Number(t));
    this.Pu1 = this.Au1.includes(-1);
    this.XCc = Number(t[2] ?? -1);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.kXo);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.ActivateAbilityVision, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.ActivateAbilityVision, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.kXo);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.ActivateAbilityVision, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.ActivateAbilityVision, this.OnEvent);
    }
  }
}
class DamageIdTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.kXo = 0;
    this.qpi = 0;
    this.ListenDamageIds = [];
    this.OnEvent = (t, e, i, s) => {
      if (this.ListenDamageIds.includes(s.DamageData.Id) && (!this.Checker || this.Checker()) && this.OwnerTriggerComp?.Entity.Valid) {
        if (this.kXo === 3) {
          var s = this.OwnerTriggerComp?.Entity.GetComponent(3)?.Actor.Camp;
          var r = e.GetComponent(3)?.Actor.Camp;
          if (CampUtils_1.CampUtils.GetCampRelationship(s, r) !== 2) {
            return;
          }
        }
        s = this.OwnerTriggerComp?.Entity.GetComponent(3)?.ActorLocationProxy;
        r = e.GetComponent(3)?.ActorLocationProxy;
        if (s && r) {
          if (!(Vector_1.Vector.DistSquared(s, r) > this.qpi)) {
            this.EvaluateAndExecute();
          }
        }
      }
    };
  }
  OnInitParams(t) {
    this.kXo = Number(t[0] ?? 0);
    var e = Number(t[1] ?? 0);
    this.qpi = e * e;
    this.ListenDamageIds = t[2]?.split("#").map(t => Number(t));
  }
  OnActive() {
    var t;
    if (this.kXo === 3) {
      if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.GlobalCharDamage, this.OnEvent)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GlobalCharDamage, this.OnEvent);
      }
    } else if ((t = getTarget(this.OwnerTriggerComp?.Entity, this.kXo)) && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent);
    }
  }
  OnInactive() {
    var t;
    if (this.kXo === 3) {
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.GlobalCharDamage, this.OnEvent)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GlobalCharDamage, this.OnEvent);
      }
    } else if ((t = getTarget(this.OwnerTriggerComp?.Entity, this.kXo)) && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharBeDamage, this.OnEvent);
    }
  }
}
class BuffAddFailureTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.ListenBuffIds = [];
    this.ContextIds = [];
    this.VicTimIds = [];
    this.TriggerOncePerContext = false;
    this.OnEvent = (t, e, i, s, r) => {
      if (!this.Checker || this.Checker()) {
        if (this.TriggerOncePerContext) {
          const n = r ?? 0n;
          r = this.ContextIds.findIndex(t => t === n);
          if (r === -1) {
            this.ContextIds.push(n);
            this.VicTimIds.push(e.Id);
            if (this.ContextIds.length > BuffAddFailureTrigger.ContextCapacity) {
              this.ContextIds.shift();
              this.VicTimIds.shift();
            }
          } else if (this.VicTimIds[r] !== e.Id) {
            return;
          }
        }
        r = {
          BuffId: t,
          Victim: e,
          Attacker: i,
          StackCount: s,
          Listener: this.OwnerTriggerComp?.Entity
        };
        this.EvaluateAndExecute(r);
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
    this.ListenBuffIds = t[1]?.split("#").map(t => Number(t));
    this.TriggerOncePerContext = Number(t[2] ?? 0) === 1;
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      for (const e of this.ListenBuffIds) {
        AbilityEvent_1.AbilityEvent.Add(t, 2, e, this.OnEvent);
      }
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      for (const e of this.ListenBuffIds) {
        AbilityEvent_1.AbilityEvent.Remove(t, 2, e, this.OnEvent);
      }
    }
  }
}
BuffAddFailureTrigger.ContextCapacity = 15;
class ShieldTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnEvent = (t, e, i, s, r) => {
      if (!this.Checker || !!this.Checker()) {
        this.EvaluateAndExecute({
          Victim: t,
          OldShieldValue: e,
          NewShieldValue: i,
          UpdateType: s,
          ShieldId: r
        });
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      AbilityEvent_1.AbilityEvent.Add(t, 4, AbilityEvent_1.DEFAULT_KEY, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t) {
      AbilityEvent_1.AbilityEvent.Remove(t, 4, AbilityEvent_1.DEFAULT_KEY, this.OnEvent);
    }
  }
}
class ShowTargetTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnEvent = (t, e, i) => {
      if (!this.Checker || !!this.Checker()) {
        t = EntitySystem_1.EntitySystem.Get(t);
        this.EvaluateAndExecute({
          ShowTarget: t,
          TargetSocket: e,
          IsHardLock: i
        });
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharSetShowTarget, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharSetShowTarget, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.CharSetShowTarget, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharSetShowTarget, this.OnEvent);
    }
  }
}
class RegionDetectTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.$1m = new Set();
    this.W1m = 0;
    this.Q1m = new Map();
    this.K1m = undefined;
    this.RefreshDetectRoles = () => {
      if (this.X1m) {
        var t = UE.NewArray(UE.Actor);
        for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          var e;
          var i = s.EntityHandle;
          if (i?.Valid && (e = ControllerHolder_1.ControllerHolder.CharacterController.GetActor(i))) {
            this.Q1m.set(e, i.Id);
            t.Add(e);
          }
        }
        this.X1m.SetEventTargets(t, this.W1m);
      }
    };
  }
  get X1m() {
    var t;
    return this.K1m || (t = this.OwnerTriggerComp?.Entity.GetComponent(2)?.Actor?.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass()), this.K1m = t);
  }
  OnInitParams(t) {
    this.$1m = new Set(t[0].split("#"));
  }
  OnActive() {
    this.mSe();
    var t = this.X1m;
    if (t) {
      this.W1m = t.GetRegionDetectId();
      this.RefreshDetectRoles();
      for (const i of this.$1m) {
        var e = t.GetRegionEvent(i, this.W1m);
        if (e) {
          e.Callback.Add((t, e) => {
            if (e &&= this.Q1m.get(e)) {
              this.OnEvent(e, i, t);
            }
          });
        }
      }
    } else {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.OwnerTriggerComp?.Entity, "[被动]RegionDetectTrigger regionDetect为空");
    }
  }
  OnInactive() {
    this.dSe();
    var t = this.X1m;
    if (t) {
      if (this.W1m > 0) {
        t.RemoveRegionDetect(this.W1m);
      }
    } else {
      CombatLog_1.CombatLog.Error("PassiveSkill", this.OwnerTriggerComp?.Entity, "[被动]RegionDetectTrigger regionDetect为空");
    }
  }
  mSe() {
    var t = this.OwnerTriggerComp?.Entity;
    if (t) {
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnChangeRole, this.RefreshDetectRoles)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnChangeRole, this.RefreshDetectRoles);
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnOtherChangeRole, this.RefreshDetectRoles)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnOtherChangeRole, this.RefreshDetectRoles);
      }
      if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnUpdateSceneTeam, this.RefreshDetectRoles)) {
        EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.OnUpdateSceneTeam, this.RefreshDetectRoles);
      }
    }
  }
  dSe() {
    var t = this.OwnerTriggerComp?.Entity;
    if (t && (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnChangeRole, this.RefreshDetectRoles) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnChangeRole, this.RefreshDetectRoles), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnOtherChangeRole, this.RefreshDetectRoles) && EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnOtherChangeRole, this.RefreshDetectRoles), EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.OnUpdateSceneTeam, this.RefreshDetectRoles))) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.OnUpdateSceneTeam, this.RefreshDetectRoles);
    }
  }
  OnEvent(t, e, i) {
    if (!this.Checker || !!this.Checker()) {
      t = EntitySystem_1.EntitySystem.Get(t);
      this.EvaluateAndExecute({
        Target: t,
        IsInRegion: i,
        RegionName: e
      });
    }
  }
}
class BreakWeaknessTrigger extends Trigger {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.OnEvent = (t, e, i) => {
      if (!this.Checker || !!this.Checker()) {
        this.EvaluateAndExecute({
          Attacker: t,
          Target: e,
          TargetSocket: i
        });
      }
    };
  }
  OnInitParams(t) {
    this.TargetType = Number(t[0] ?? 0);
  }
  OnActive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.TriggerBreakWeakness, this.OnEvent)) {
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.TriggerBreakWeakness, this.OnEvent);
    }
  }
  OnInactive() {
    var t = getTarget(this.OwnerTriggerComp?.Entity, this.TargetType);
    if (t && EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.TriggerBreakWeakness, this.OnEvent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.TriggerBreakWeakness, this.OnEvent);
    }
  }
}
//# sourceMappingURL=Trigger.js.map