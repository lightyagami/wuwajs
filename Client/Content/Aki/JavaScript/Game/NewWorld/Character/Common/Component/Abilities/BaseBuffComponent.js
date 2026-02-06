"use strict";

var BaseBuffComponent_1;
var __decorate = this && this.__decorate || function (t, e, f, i) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, f) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, f, i);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (o = t[a]) {
        r = (s < 3 ? o(r) : s > 3 ? o(e, f, r) : o(e, f)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(e, f, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseBuffComponent = undefined;
const cpp_1 = require("cpp");
const Info_1 = require("../../../../../../Core/Common/Info");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const NetDefine_1 = require("../../../../../../Core/Define/Net/NetDefine");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const RandomSystem_1 = require("../../../../../../Core/Random/RandomSystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StatDefine_1 = require("../../../../../Common/StatDefine");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const ActiveBuff_1 = require("./Buff/ActiveBuff");
const ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs");
const BuffTypes_1 = require("./Buff/BuffTypes");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterBuffIds_1 = require("./CharacterBuffIds");
const ExtraEffectDefine_1 = require("./ExtraEffect/ExtraEffectDefine");
const GameplayCueController_1 = require("./GameplayCueSFX/Controller/GameplayCueController");
let BaseBuffComponent = BaseBuffComponent_1 = class BaseBuffComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.CreatureDataComponent = undefined;
    this.DeathComponent = undefined;
    this.BuffContainer = new Map();
    this.BuffIdToHandleMap = new Map();
    this.BuffGarbageSet = new Set();
    this.WaitRemoveBuffResponse = new Map();
    this.PendingAddBuff = new Map();
    this.BuffEffectManager = undefined;
    this.TagListenerDict = new Map();
    this.BuffListenerDict = new Map();
    this.TagImmuneListenerDict = new Map();
    this.VictimTagListenerDict = new Map();
    this.VictimBuffListenerDict = new Map();
    this.BuffRoutineExpirationLock = new Map();
    this.EffectTimeoutMap = new Map();
    this.CHu = new Set();
    this.Mbr = 0;
    this.TriggerMap = new Map();
    this.OwnerBuffTimeModifiers = new Map();
    this.InstigatorBuffTimeModifiers = new Map();
    this.BuffStackModifiers = new Map();
    this.E8g = false;
    this.Buff2CueMap = new Map();
    this.L4g = new Set();
    this.I8g = [];
    this.w4g = new Set();
    this.SeamlessTravelBuffCue = undefined;
  }
  get CreatureDataId() {
    return this.CreatureDataComponent.GetCreatureDataId();
  }
  GetDebugName() {
    return "";
  }
  OnInit() {
    super.OnInit();
    this.CreatureDataComponent = this.Entity.GetComponent(0);
    this.DeathComponent = this.Entity.GetComponent(15);
    return true;
  }
  OnClear() {
    ControllerHolder_1.ControllerHolder.BuffController.UnregisterBuffComponent(this);
    var t = this.BuffEffectManager;
    if (t) {
      for (const e of t.GetAllEffects()) {
        e?.OnRemoved(true);
      }
      t.Clear();
    }
    this.BuffContainer.clear();
    this.BuffGarbageSet.clear();
    this.EffectTimeoutMap.clear();
    this.CHu.clear();
    return !(this.SeamlessTravelBuffCue = undefined);
  }
  OnTick(t) {
    this.BuffLock = 0;
    this.CHu.clear();
    return true;
  }
  InitBornBuff() {}
  NeedBroadcastBuff(t, e = false) {
    return !e && this.HasBuffAuthority();
  }
  HasBuffAuthority() {
    return false;
  }
  NeedAddBuffOrder(t) {
    return true;
  }
  GetEntity() {}
  GetExactEntity() {
    return this.Entity;
  }
  GetAttributeComponent() {}
  GetTagComponent() {}
  GetSkillComponent() {}
  GetPassiveSkillComponent() {
    return this.GetEntity()?.GetComponent(26);
  }
  GetActorComponent() {}
  GetCueComponent() {}
  GetTimeScale() {
    return 0;
  }
  GetLogicTimeScale() {
    return 1;
  }
  lSa(t, e, f) {
    let i = t.get(e);
    if (!i) {
      t.set(e, i = new Set());
    }
    i.add(f);
  }
  EUi(t, e, f, i) {
    let o = t.get(e);
    if (!o) {
      t.set(e, o = new Map());
    }
    let s = o.get(f);
    if (!s) {
      o.set(f, s = new Set());
    }
    s.add(i);
  }
  _Sa(t, e, f) {
    var i = t.get(e);
    if (i && (i.delete(f), i.size <= 0)) {
      t.delete(e);
    }
  }
  uSa(t, e, f, i) {
    var o;
    var s = t.get(e);
    if (s && (o = s.get(f)) && (o.delete(i), o.size <= 0) && (s.delete(f), s.size <= 0)) {
      t.delete(e);
    }
  }
  GetInvolvedTags(t) {
    var e = [];
    if (t.ActivateTagRequirements) {
      e.push(...t.ActivateTagRequirements);
    }
    if (t.ActivateTagIgnores) {
      e.push(...t.ActivateTagIgnores);
    }
    if (t.RemoveTagExistAll) {
      e.push(...t.RemoveTagExistAll);
    }
    if (t.RemoveTagExistAny) {
      e.push(...t.RemoveTagExistAny);
    }
    if (t.RemoveTagIgnores) {
      e.push(...t.RemoveTagIgnores);
    }
    if (t.BuffAction) {
      for (const f of t.BuffAction) {
        switch (f.Type) {
          case 101:
          case 102:
          case 103:
          case 104:
          case 105:
          case 106:
          case 107:
          case 108:
            e.push(...f.Tags);
        }
      }
    }
    return e;
  }
  GetInvolvedBuffIds(t) {
    var e = [];
    if (t.BuffAction) {
      for (const f of t.BuffAction) {
        switch (f.Type) {
          case 109:
          case 110:
          case 111:
          case 112:
          case 113:
          case 114:
          case 115:
          case 116:
            e.push(...f.Buffs);
        }
      }
    }
    return e;
  }
  GetInvolvedInstigatorTags(t) {
    var e = [];
    if (t.BuffAction) {
      for (const f of t.BuffAction) {
        switch (f.Type) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
            e.push(...f.Tags);
        }
      }
    }
    return e;
  }
  GetInvolvedInstigatorBuffIds(t) {
    var e = [];
    if (t.BuffAction) {
      for (const f of t.BuffAction) {
        switch (f.Type) {
          case 9:
          case 10:
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
            e.push(...f.Buffs);
        }
      }
    }
    return e;
  }
  MarkListenerBuff(t) {
    if (this.NeedCheck(t.Config)) {
      var e = t.Config;
      if (e) {
        var f = t.Handle;
        for (const s of this.GetInvolvedTags(e)) {
          this.lSa(this.TagListenerDict, s, f);
        }
        for (const r of this.GetInvolvedBuffIds(e)) {
          this.lSa(this.BuffListenerDict, r, f);
        }
        if (e.ImmuneTags) {
          for (const a of e.ImmuneTags.values()) {
            this.lSa(this.TagImmuneListenerDict, a, f);
          }
        }
        var i = t.GetInstigatorBuffComponent();
        var o = this.CreatureDataComponent?.GetCreatureDataId();
        if (i && o) {
          for (const n of this.GetInvolvedInstigatorTags(e)) {
            i.EUi(i.VictimTagListenerDict, n, o, f);
          }
          for (const u of this.GetInvolvedInstigatorBuffIds(e)) {
            i.EUi(i.VictimBuffListenerDict, u, o, f);
          }
        }
      }
    }
  }
  RemoveListenerBuff(t) {
    if (this.NeedCheck(t.Config)) {
      var e = t.Config;
      if (e) {
        var f = t.Handle;
        for (const s of this.GetInvolvedTags(e)) {
          this._Sa(this.TagListenerDict, s, f);
        }
        for (const r of this.GetInvolvedBuffIds(e)) {
          this._Sa(this.BuffListenerDict, r, f);
        }
        if (e.ImmuneTags) {
          for (const a of e.ImmuneTags.values()) {
            this._Sa(this.TagImmuneListenerDict, a, f);
          }
        }
        var i = t.GetInstigatorBuffComponent();
        var o = this.CreatureDataComponent?.GetCreatureDataId();
        if (i && o) {
          for (const n of this.GetInvolvedInstigatorTags(e)) {
            i.uSa(i.VictimTagListenerDict, n, o, f);
          }
          for (const u of this.GetInvolvedInstigatorBuffIds(e)) {
            i.uSa(i.VictimBuffListenerDict, u, o, f);
          }
        }
      }
    }
  }
  CheckWhenTagChanged(t) {
    BaseBuffComponent_1.u__.Start();
    this.BuffLock++;
    const e = this.TagListenerDict.get(t);
    var f = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t);
    if (e) {
      for (const l of [...e]) {
        var i = this.GetBuffByHandle(l);
        if (i && this.CheckRemove(i.Config, i.GetInstigator())) {
          this.RemoveBuffInner(l, -1, true, `因为tag ${f}的变化触发`);
        }
      }
      for (const B of [...e]) {
        var o;
        var s = this.GetBuffByHandle(B);
        if (s) {
          if ((o = this.CheckActivate(s.Config, s.GetInstigator())) !== s.IsActive()) {
            this.OnBuffActiveChanged(s, o);
          }
        } else {
          this._Sa(this.TagListenerDict, t, B);
        }
      }
    }
    var r = this.VictimTagListenerDict.get(t);
    if (r) {
      for (const [d, e] of [...r]) {
        for (const _ of [...e]) {
          var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(d)?.Entity?.GetComponent(222);
          var n = a?.GetBuffByHandle(_);
          if (a && n && a.CheckRemove(n.Config, n.GetInstigator())) {
            a.RemoveBuffInner(_, -1, true, `因为施加者的tag ${f}的变化触发`);
          }
        }
      }
      for (const [C, e] of [...r]) {
        for (const v of [...e]) {
          var u;
          var h = ModelManager_1.ModelManager.CreatureModel.GetEntity(C)?.Entity?.GetComponent(222);
          var c = h?.GetBuffByHandle(v);
          if (h && c) {
            if ((u = h.CheckActivate(c.Config, c.GetInstigator())) !== c.IsActive()) {
              h?.OnBuffActiveChanged(c, u);
            }
          } else {
            this.uSa(this.VictimTagListenerDict, t, C, v);
          }
        }
      }
    }
    this.BuffLock--;
    BaseBuffComponent_1.u__.Stop();
  }
  CheckWhenBuffChanged(t) {
    BaseBuffComponent_1.d__.Start();
    const e = this.BuffListenerDict.get(t);
    if (e) {
      this.BuffLock++;
      for (const c of [...e]) {
        var f = this.GetBuffByHandle(c);
        if (f && this.CheckRemove(f.Config, f.GetInstigator())) {
          this.RemoveBuffInner(c, -1, true, `因为buff ${t}的变化触发`);
        }
      }
      for (const l of [...e]) {
        var i;
        var o = this.GetBuffByHandle(l);
        if (o) {
          if ((i = this.CheckActivate(o.Config, o.GetInstigator())) !== o.IsActive()) {
            this.OnBuffActiveChanged(o, i);
          }
        } else {
          this._Sa(this.BuffListenerDict, t, l);
        }
      }
      this.BuffLock--;
    }
    var s = this.VictimBuffListenerDict.get(t);
    if (s) {
      this.BuffLock++;
      for (const [B, e] of [...s]) {
        for (const d of [...e]) {
          var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(B)?.Entity?.GetComponent(222);
          var a = r?.GetBuffByHandle(d);
          if (r && a && r.CheckRemove(a.Config, a.GetInstigator())) {
            r.RemoveBuffInner(d, -1, true, `因为施加者的buff ${t}的变化触发`);
          }
        }
      }
      for (const [_, e] of [...s]) {
        for (const C of [...e]) {
          var n;
          var u = ModelManager_1.ModelManager.CreatureModel.GetEntity(_)?.Entity?.GetComponent(222);
          var h = u?.GetBuffByHandle(C);
          if (u && h) {
            if ((n = u.CheckActivate(h.Config, h.GetInstigator())) !== h.IsActive()) {
              u?.OnBuffActiveChanged(h, n);
            }
          } else {
            this.uSa(this.VictimBuffListenerDict, t, _, C);
          }
        }
      }
      this.BuffLock--;
    }
    BaseBuffComponent_1.d__.Stop();
  }
  AddBuffRoutineExpirationLock(t) {
    var e = this.BuffRoutineExpirationLock.get(t) ?? 0;
    this.BuffRoutineExpirationLock.set(t, e + 1);
  }
  RemoveBuffRoutineExpirationLock(t) {
    var e = this.BuffRoutineExpirationLock.get(t) ?? 0;
    if (e <= 1) {
      this.BuffRoutineExpirationLock.delete(t);
    } else {
      this.BuffRoutineExpirationLock.set(t, e - 1);
    }
  }
  HasBuffRoutineExpirationLock(t) {
    return (this.BuffRoutineExpirationLock.get(t) ?? 0) > 0;
  }
  IsPaused() {
    return false;
  }
  RefreshTimeScale() {
    var t = this.GetTimeScale();
    var e = this.IsPaused();
    for (const f of this.BuffContainer.values()) {
      f.OnTimeScaleChanged(t, e);
    }
  }
  OnChangeTimeDilation() {
    this.RefreshTimeScale();
    return true;
  }
  NeedCheck(t) {
    return !!t && (t.Id === ActiveBuffConfigs_1.DYNAMIC_BUFF_ID || this.HasBuffAuthority());
  }
  CheckAdd(t, e, f) {
    if (f) {
      return true;
    }
    if (!f && this.NeedCheck(t)) {
      if (this.DeathComponent?.IsDead() && t.EffectInfos?.some(t => t.ExtraEffectId === 36)) {
        return false;
      }
      const i = this.GetTagComponent();
      f = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity;
      const o = f?.GetComponent(217);
      if (t.Probability < CharacterAttributeTypes_1.PER_TEN_THOUSAND && RandomSystem_1.default.GetRandomPercent() > t.Probability) {
        return false;
      }
      if (!i) {
        return false;
      }
      if (t.AddTagIgnores?.some(t => i.HasTag(t)) || t.AddTagRequirements?.some(t => !i.HasTag(t))) {
        return false;
      }
      if (this.CheckRemove(t, f)) {
        return false;
      }
      if (t.RemoveTagIgnores && t.RemoveTagIgnores.length > 0 && !t.RemoveTagIgnores.some(t => i.HasTag(t))) {
        return false;
      }
      e = t.RemoveTagExistAll ?? [];
      if (e.length > 0 && e.every(t => i.HasTag(t))) {
        return false;
      }
      f = t.RemoveTagExistAny ?? [];
      if (f.length > 0 && f.some(t => i.HasTag(t))) {
        return false;
      }
      if (o && (t.AddInstigatorTagIgnores?.some(t => o.HasTag(t)) || t.AddInstigatorTagRequirements?.some(t => !o.HasTag(t)))) {
        return false;
      }
    }
    return !this.CheckImmune(t);
  }
  CheckImmune(t) {
    for (const i of this.TagImmuneListenerDict.keys()) {
      if (t.GrantedTags?.some(t => GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, i))) {
        for (const o of this.TagImmuneListenerDict.get(i).keys()) {
          var e = this.BuffContainer.get(o);
          var f = e?.Config;
          if (f && e && e.IsValid() && e.IsActive() && t.GrantedTags) {
            f = GameplayTagUtils_1.GameplayTagUtils.HasAll(t.GrantedTags, f.ImmuneTags) && !GameplayTagUtils_1.GameplayTagUtils.HasAny(t.GrantedTags, f.ImmuneTagIgnores);
            if (e?.IsActive() && f) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  HasTagRemoveCheck(t) {
    return !!t.RemoveTagIgnores?.length || !!t.RemoveTagExistAll?.length || !!t.RemoveTagExistAny?.length || !!t.BuffAction?.some(t => BuffTypes_1.actionTagRemove.has(t.Type));
  }
  CheckRemoveAction(t, e) {
    if (t.BuffAction) {
      const f = e?.GetComponent(217);
      const i = e?.GetComponent(222);
      const o = this.GetTagComponent();
      for (const s of t.BuffAction) {
        switch (s.Type) {
          case 2:
            if (f && s.Tags.every(t => f.HasTag(t))) {
              return true;
            }
            break;
          case 1:
            if (f && s.Tags.some(t => f.HasTag(t))) {
              return true;
            }
            break;
          case 4:
            if (f && s.Tags.every(t => !f.HasTag(t))) {
              return true;
            }
            break;
          case 3:
            if (f && s.Tags.some(t => !f.HasTag(t))) {
              return true;
            }
            break;
          case 10:
            if (i && s.Buffs.every(t => i.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 9:
            if (i && s.Buffs.some(t => i.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 12:
            if (i && s.Buffs.every(t => !i.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 11:
            if (i && s.Buffs.some(t => !i.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 102:
            if (o && s.Tags.every(t => o.HasTag(t))) {
              return true;
            }
            break;
          case 101:
            if (o && s.Tags.some(t => o.HasTag(t))) {
              return true;
            }
            break;
          case 104:
            if (o && s.Tags.every(t => !o.HasTag(t))) {
              return true;
            }
            break;
          case 103:
            if (o && s.Tags.some(t => !o.HasTag(t))) {
              return true;
            }
            break;
          case 110:
            if (s.Buffs.every(t => this.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 109:
            if (s.Buffs.some(t => this.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 112:
            if (s.Buffs.every(t => !this.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 111:
            if (s.Buffs.some(t => !this.HasActiveBuff(t))) {
              return true;
            }
        }
      }
    }
    return false;
  }
  CheckInactivateAction(t, e) {
    if (t.BuffAction) {
      const f = e?.GetComponent(217);
      const i = e?.GetComponent(222);
      const o = this.GetTagComponent();
      for (const s of t.BuffAction) {
        switch (s.Type) {
          case 6:
            if (f && s.Tags.every(t => f.HasTag(t))) {
              return true;
            }
            break;
          case 5:
            if (f && s.Tags.some(t => f.HasTag(t))) {
              return true;
            }
            break;
          case 8:
            if (f && s.Tags.every(t => !f.HasTag(t))) {
              return true;
            }
            break;
          case 7:
            if (f && s.Tags.some(t => !f.HasTag(t))) {
              return true;
            }
            break;
          case 14:
            if (i && s.Buffs.every(t => i.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 13:
            if (i && s.Buffs.some(t => i.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 16:
            if (i && s.Buffs.every(t => !i.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 15:
            if (i && s.Buffs.some(t => !i.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 106:
            if (o && s.Tags.every(t => o.HasTag(t))) {
              return true;
            }
            break;
          case 105:
            if (o && s.Tags.some(t => o.HasTag(t))) {
              return true;
            }
            break;
          case 108:
            if (o && s.Tags.every(t => !o.HasTag(t))) {
              return true;
            }
            break;
          case 107:
            if (o && s.Tags.some(t => !o.HasTag(t))) {
              return true;
            }
            break;
          case 114:
            if (s.Buffs.every(t => this.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 113:
            if (s.Buffs.some(t => this.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 116:
            if (s.Buffs.every(t => !this.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 115:
            if (s.Buffs.some(t => !this.HasActiveBuff(t))) {
              return true;
            }
        }
      }
    }
    return false;
  }
  CheckRemove(t, e) {
    const f = this.GetTagComponent();
    var i;
    var o;
    if (f) {
      return !!this.CheckRemoveAction(t, e) || (e = !!t.RemoveTagIgnores?.length && !t.RemoveTagIgnores.some(t => f.HasTag(t)), i = !!t.RemoveTagExistAll?.length && t.RemoveTagExistAll.every(t => f.HasTag(t)), o = !!t.RemoveTagExistAny?.length && t.RemoveTagExistAny.some(t => f.HasTag(t)), e) || i || o;
    } else {
      return !!this.HasTagRemoveCheck(t) && (CombatLog_1.CombatLog.Warn("Buff", this.Entity, "检查buff移除条件时找不到Tag组件，默认移除", ["buffId", t.Id]), true);
    }
  }
  CheckActivate(t, e) {
    const f = this.GetTagComponent();
    return !!f && !t.ActivateTagIgnores?.some(t => f.HasTag(t)) && !t.ActivateTagRequirements?.some(t => !f.HasTag(t)) && !this.CheckInactivateAction(t, e);
  }
  SetBuffEffectCd(t, e, f) {
    let i = this.EffectTimeoutMap.get(t);
    if (!i) {
      this.EffectTimeoutMap.set(t, i = new Map());
    }
    if (f <= 0) {
      i.delete(e);
    } else {
      i.set(e, Time_1.Time.ServerCombatStopTime + f);
    }
  }
  GetBuffEffectCd(t, e) {
    t = this.EffectTimeoutMap.get(t)?.get(e);
    if (t === undefined || t <= Time_1.Time.ServerCombatStopTime) {
      return 0;
    } else {
      return t - Time_1.Time.ServerCombatStopTime;
    }
  }
  CreateAnimNotifyContentWithAnimBp(t, e) {
    var f;
    var i = this.GetSkillComponent()?.CurrentSkill;
    var o = i?.MNc;
    if (t !== -1) {
      if (o) {
        f = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
        SkillMessageController_1.SkillMessageController.AnimNotifyRequest(this.Entity, i ? i.SkillId : 0, -1, t, o, f);
        return f;
      }
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "CreateANCWithAnimBp Error", ["anIndex", t], ["animName", e], ["SkillId", i?.SkillId], ["contextId", o]);
    }
  }
  CreateAnimNotifyContentWithoutSkill(t, e) {
    var f;
    if (t.MontageTaskMessageId && e !== -1) {
      f = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
      SkillMessageController_1.SkillMessageController.AnimNotifyRequest(this.Entity, -1, -1, e, t.MontageTaskMessageId, f);
      return f;
    }
    CombatLog_1.CombatLog.Error("Buff", this.Entity, "CreateANCWithoutSkill Error", ["ANIndex", e], ["montageInfo", t]);
  }
  CreateAnimNotifyContentWithSkill(t, e) {
    var f;
    var i;
    var o = this.GetSkillComponent()?.GetSkill(t.SkillId);
    if (o && t.MontageIndex !== undefined && t.MontageTaskMessageId && e !== -1) {
      o = o.SkillId;
      f = t.MontageTaskMessageId;
      i = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
      SkillMessageController_1.SkillMessageController.AnimNotifyRequest(this.Entity, o, t.MontageIndex, e, f, i);
      return i;
    }
    CombatLog_1.CombatLog.Error("Buff", this.Entity, "CreateANCWithSkill Error", ["ANIndex", e], ["montageInfo", t]);
  }
  CreateAnimNotifyContent(t, e) {
    var f = this.Entity.GetComponent(24)?.GetMontageInfo(t);
    if (f) {
      if (this.GetSkillComponent()?.GetSkill(f.SkillId ?? 0)) {
        return this.CreateAnimNotifyContentWithSkill(f, e);
      } else {
        return this.CreateAnimNotifyContentWithoutSkill(f, e);
      }
    } else {
      return this.CreateAnimNotifyContentWithAnimBp(e, t);
    }
  }
  AddBuffFromAi(t, e, f) {
    f.PreMessageId = t;
    this.AddBuff(e, f);
  }
  AddBuffForDebug(t, e) {
    this.AddBuff(t, {
      PreMessageId: -1n,
      ...e
    });
  }
  AddBuff(t, e) {
    var f;
    if (t <= ActiveBuffConfigs_1.NULL_BUFF_ID) {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "尝试添加buff时传入了不合法的buffId", ["buffId", t], ["创建者", e.InstigatorId], ["持有者", this.GetDebugName()]);
    } else {
      f = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.CustomTypes.includes(5);
      if (e.PreMessageId || (0, CharacterBuffIds_1.checkBuffInSpecialList)(t) || f) {
        e.Level = e.Level ?? ModelManager_1.ModelManager.CreatureModel.GetEntity(e.InstigatorId)?.Entity?.GetComponent(222).GetBuffLevel(t);
        if (this.HasBuffAuthority()) {
          this.AddBuffLocal(t, e);
        } else if (this.NeedAddBuffOrder(t)) {
          this.AddBuffOrder(t, e);
        }
      } else {
        CombatLog_1.CombatLog.Error("Buff", this.Entity, "加Buff上文无效", ["原因", e.Reason], ["buffId", t]);
      }
    }
  }
  AddBuffLocal(t, {
    InstigatorId: e = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
    Level: f,
    OuterStackCount: i,
    ApplyType: o = Protocol_1.Aki.Protocol.uFs.Proto_Common,
    PreMessageId: s = undefined,
    MessageId: r = undefined,
    Duration: a = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
    ServerId: n = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
    IsIterable: u = true,
    IsServerOrder: h = false,
    Reason: c,
    BulletMessageId: l = undefined,
    BornBuff: B = false
  }) {
    var d;
    var _;
    if (this.HasBuffAuthority()) {
      if (d = ControllerHolder_1.ControllerHolder.BuffController.GetBuffDefinition(t, c)) {
        _ = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity?.GetComponent(222);
        f = f ?? _?.GetBuffLevel(t) ?? ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL;
        return this.AddBuffInner(t, d, e, f, i, o, s, r, a, undefined, n, c, false, u, h, undefined, l, B);
      } else {
        return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      }
    } else {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[local] 模拟端不本地添加buff", ["buffId", t], ["施加者", e], ["持有者", this.GetDebugName()], ["前置行为id", s], ["原因", c]);
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
  }
  AddBuffOrder(t, e) {}
  AddBuffRemote(t, e, {
    InstigatorId: f = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
    Level: i = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
    OuterStackCount: o = undefined,
    ApplyType: s = Protocol_1.Aki.Protocol.uFs.Proto_Common,
    PreMessageId: r = undefined,
    MessageId: a = undefined,
    Duration: n = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
    RemainDuration: u,
    ServerId: h = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
    IsActive: c,
    Reason: l,
    BornBuff: B = false
  }) {
    t = this.AddBuffInner(t, ControllerHolder_1.ControllerHolder.BuffController.GetBuffDefinition(t, l), f, i, o, s, r, a, n, c, h, l, true, true, false, e, undefined, B);
    f = this.BuffContainer.get(t);
    if (f && u !== undefined) {
      f.SetRemainDuration(u);
    }
  }
  AddIterativeBuff(e, f, i, o, s, r, a) {
    if (f) {
      let t = f.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID;
      if (a) {
        t = a?.CreatureDataId;
      }
      this.AddBuff(e, {
        InstigatorId: t,
        Level: f.Level,
        PreMessageId: f.MessageId,
        ServerId: f.ServerId,
        OuterStackCount: i,
        IsIterable: o,
        Reason: s,
        BulletMessageId: r
      });
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "尝试添加迭代buff失败，未找到前置buff", ["buffId", e], ["持有者", this.GetDebugName()], ["原因", s]);
    }
  }
  static GetBuffStat(t) {
    if (Stats_1.Stat.Enable) {
      if (!this.Ebr.has(t)) {
        this.Ebr.set(t, Stats_1.Stat.CreateNoFlameGraph(t.toString(), "", StatDefine_1.BATTLESTAT_GROUP));
      }
      return this.Ebr.get(t);
    }
  }
  AddBuffInner(e, f, i, o, s, r, a, n, u, h, c, l, B, d, _, C, v, t) {
    var m = BaseBuffComponent_1.GetBuffStat(e);
    m?.Start();
    this.BuffLock++;
    var g = [["buffId", e], ["创建者id", i], ["持有者", this.GetDebugName()], ["初始激活", h], ["原因", l]];
    if (!f) {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "[local] 添加buff时找不到配置", ...g);
      this.BuffLock--;
      m?.Stop();
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    r = r ?? Protocol_1.Aki.Protocol.uFs.Proto_Common;
    let p = undefined;
    if (i && i !== ActiveBuffConfigs_1.NULL_INSTIGATOR_ID && !(p = ModelManager_1.ModelManager.CreatureModel.GetEntity(i)?.Entity)) {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[local] 添加buff时找不到施加者，将被丢弃", ...g);
      this.BuffLock--;
      m?.Stop();
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    let b = s && s > 0 ? s : f.DefaultStackCount;
    if (!this.CheckAdd(f, i ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, B)) {
      if (p) {
        SceneTeamController_1.SceneTeamController.EmitAbilityEvent(p, 2, e, e, this.Entity, p, b, v);
      }
      this.BuffLock--;
      m?.Stop();
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    if (p) {
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(p, 1, e, e, this.Entity, p, t);
    }
    var y = this.GetStackableBuff(i ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, e, f.StackingType);
    var t = this.CalculateBuffStackMax(e);
    if (!y) {
      let t = undefined;
      if (f.DurationPolicy === 0) {
        C = ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE;
        u = ActiveBuffConfigs_1.INFINITY_DURATION;
      } else {
        C = C ?? ControllerHolder_1.ControllerHolder.BuffController.GenerateHandle();
      }
      try {
        t = ActiveBuff_1.ActiveBuffInternal.AllocBuff(f, C, i, this, c, a, n, o, b, u, r);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff初始过程中发生异常", t, ...g);
      }
      if (!t) {
        this.BuffLock--;
        m?.Stop();
        return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      }
      if (!BaseBuffComponent_1.NoLogBuffSet.has(e)) {
        CombatLog_1.CombatLog.Info("Buff", this.Entity, "本地添加buff", ...g, ["handle", C], ["前置行为id", a], ["说明", f.Desc], ["是否迭代", d], ["层数", b], ["bulletMessage", v]);
      }
      try {
        this.OnBuffAdded(t, s, r, a, u, h, c, B, d, _, l);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff添加中发生异常", t, ...g);
      }
      if (f.DurationPolicy === 0) {
        ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(t);
      }
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 3, e, e, C);
      this.BuffLock--;
      m?.Stop();
      return C;
    }
    if (y.Config && (t <= 0 || !y.Config.DenyOverflowAdd || y.StackCount < t)) {
      if (f.StackAppendCount > 0) {
        b = f.StackAppendCount;
      }
      n = y.StackCount;
      v = n + b;
      h = Math.min(v, t);
      try {
        this.OnBuffStackIncreased(y, n, h, i ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, o, s, r, a, u, c, d, _, l);
        for (const M of y.Config.EffectInfos) {
          M.ExecutionEffect?.OnBuffAddedCallback(y, d);
        }
        if (t < v) {
          this.BuffEffectManager?.OnBuffStackOverflow(y, n, v, t);
        }
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff层数改变中发生异常", t, ...g);
      }
    }
    SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 3, e, e, y.Handle);
    this.BuffLock--;
    m?.Stop();
    return y.Handle;
  }
  RemoveBuff(t, e, f, i, o) {
    if (this.HasBuffAuthority()) {
      this.RemoveBuffLocal(t, e, f, i, o);
    } else {
      this.RemoveBuffOrder(t, e, f);
    }
  }
  RemoveBuffOrder(t, e, f) {}
  RemoveBuffLocal(t, e, f, i, o) {
    if (t <= ActiveBuffConfigs_1.NULL_BUFF_ID) {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "尝试本地移除buff时传入了不合法的buffId", ["buffId", t], ["持有者", this.GetDebugName()], ["原因", f]);
      return 0;
    }
    if (!this.HasBuffAuthority()) {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "无法直接移除非本端控制实体持有的buff，请换用RemoveBuff接口", ["buffId", t], ["持有者", this.GetDebugName()], ["原因", f]);
      return 0;
    }
    let s = 0;
    for (const r of [...this.GetAllBuffById(t)]) {
      s = this.RemoveBuffInner(r.Handle, e, true, f, i, o);
    }
    return s;
  }
  RemoveBuffByServerId(t, e, f, i) {
    for (const o of this.GetAllBuffs()) {
      if (o.ServerId === t) {
        this.RemoveBuffInner(o.Handle, e, true, i, f, true);
      }
    }
  }
  RemoveBuffByTagLocal(e, t) {
    if (this.HasBuffAuthority()) {
      var f = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
      for (const i of this.BuffContainer.values()) {
        if (i.Config.GrantedTags?.some(t => GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, e))) {
          this.RemoveBuffInner(i.Handle, -1, true, t ?? "移除tag " + f);
        }
      }
    } else {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "尝试根据tag移除非本地控制的实体的buff，移除操作将不被执行", ["tagId", e], ["tagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["持有者", this.GetDebugName()], ["原因", t]);
    }
  }
  RemoveBuffByEffectType(t, e) {
    var f = new Set();
    var i = (0, ExtraEffectDefine_1.getBuffEffectClass)(t);
    if (i) {
      for (const o of this.BuffEffectManager.GetAllEffects()) {
        if (o instanceof i) {
          f.add(o.BuffId);
        }
      }
      for (const s of f.values()) {
        this.RemoveBuff(s, -1, e);
      }
    }
  }
  RemoveBuffByHandle(t, e = -1, f, i, o) {
    var s;
    if (!this.HasBuffAuthority()) {
      if ((s = this.GetBuffByHandle(t)) && s.Id > 0) {
        CombatLog_1.CombatLog.Warn("Buff", this.Entity, "尝试直接通过handle移除非本端控制buff，后续需要新增协议", ["buffId", s?.Id], ["handle", t], ["持有者", this.GetDebugName()], ["说明", s?.Config?.Desc], ["原因", f]);
      }
    }
    return this.RemoveBuffByHandleLocal(t, e, f, i, o);
  }
  RemoveBuffByHandleLocal(t, e = -1, f, i, o) {
    return this.RemoveBuffInner(t, e, true, f, i, o);
  }
  RemoveBuffWhenTimeout(t) {
    var e = t.Config.StackExpirationRemoveNumber;
    this.RemoveBuffInner(t.Handle, e, false, "时间结束自然移除");
    if (e > 0 && t.IsValid()) {
      t.SetDuration();
    }
  }
  RemoveBuffInner(t, e, f, i, o, s) {
    t = this.GetBuffByHandle(t);
    if (!t) {
      return 0;
    }
    this.BuffLock++;
    var r = [["buffId", t.Id], ["持有者", this.GetDebugName()], ["handle", t?.Handle], ["说明", t?.Config.Desc], ["原因", i]];
    if (!BaseBuffComponent_1.NoLogBuffSet.has(t.Id)) {
      CombatLog_1.CombatLog.Info("Buff", this.Entity, "本地移除buff", ...r);
    }
    var a = t.StackCount;
    let n = e <= 0 ? 0 : Math.max(0, a - e);
    if (n <= 0) {
      try {
        this.OnBuffRemoved(t, f, i, s, o);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff移除时发生异常", t, ...r);
      }
    } else {
      if (!f && this.HasBuffRoutineExpirationLock(t.Id)) {
        n = a;
      }
      try {
        this.OnBuffStackDecreased(t, a, n, f, i);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff层数降低时发生异常", t, ...r);
      }
    }
    this.BuffLock--;
    return a - n;
  }
  GetAllBuffs() {
    var t = [];
    for (const e of this.BuffContainer.values()) {
      if (!this.BuffGarbageSet.has(e.Handle)) {
        t.push(e);
      }
    }
    return t;
  }
  GetBuffByHandle(t) {
    if (!this.BuffGarbageSet.has(t)) {
      return this.BuffContainer.get(t);
    }
  }
  GetPendingBuffByHandle(t) {
    return this.BuffContainer.get(t);
  }
  HasActiveBuff(t) {
    return this.GetActiveBuffById(t) !== undefined;
  }
  HasBuff(t, e = false) {
    return (!e || !this.WaitRemoveBuffResponse.has(t)) && this.GetBuffById(t) !== undefined;
  }
  IsPendingAddBuff(t, e = 200) {
    return !!this.PendingAddBuff.has(t) && Time_1.Time.Now - this.PendingAddBuff.get(t) < e;
  }
  GetBuffApplyTarget(t, e) {
    return this;
  }
  GetActiveBuffById(t) {
    var e = this.BuffIdToHandleMap.get(t);
    if (e) {
      if (e.size === 0) {
        this.BuffIdToHandleMap.delete(t);
      } else {
        for (const i of e) {
          var f = this.BuffContainer.get(i);
          if (f) {
            if (f.IsActive() && !this.BuffGarbageSet.has(f.Handle)) {
              return f;
            }
          } else {
            e.delete(i);
          }
        }
      }
    }
  }
  GetBuffById(t) {
    var e = this.BuffIdToHandleMap.get(t);
    if (e) {
      if (e.size === 0) {
        this.BuffIdToHandleMap.delete(t);
      } else {
        for (const i of e) {
          var f = this.BuffContainer.get(i);
          if (f) {
            if (!this.BuffGarbageSet.has(f.Handle)) {
              return f;
            }
          } else {
            e.delete(i);
          }
        }
      }
    }
  }
  *GetAllBuffById(t) {
    var e = this.BuffIdToHandleMap.get(t);
    if (e) {
      if (e.size === 0) {
        this.BuffIdToHandleMap.delete(t);
      } else {
        for (const i of e) {
          var f = this.BuffContainer.get(i);
          if (f) {
            if (!this.BuffGarbageSet.has(f.Handle)) {
              yield f;
            }
          } else {
            e.delete(i);
          }
        }
      }
    }
  }
  GetBuffHandleByEffectId(t) {
    var e;
    var f;
    var i = new Set();
    for ([e, f] of this.BuffContainer.entries()) {
      if (!this.BuffGarbageSet.has(e)) {
        for (const o of f.Config.EffectInfos) {
          if (o.ExtraEffectId === t) {
            i.add(e);
            break;
          }
        }
      }
    }
    return i;
  }
  GetBuffLevel(t) {}
  GetStackableBuff(t, e, f) {
    BaseBuffComponent_1.pu_.Start();
    switch (f) {
      case 2:
        var i = this.GetBuffById(e);
        BaseBuffComponent_1.pu_.Stop();
        return i;
      case 1:
        var o = this.BuffIdToHandleMap.get(e);
        if (o) {
          if (o.size === 0) {
            this.BuffIdToHandleMap.delete(e);
          } else {
            for (const r of o) {
              var s = this.BuffContainer.get(r);
              if (s) {
                if (!this.BuffGarbageSet.has(s.Handle) && s.InstigatorId === t) {
                  BaseBuffComponent_1.pu_.Stop();
                  return s;
                }
              } else {
                o.delete(r);
              }
            }
          }
        }
        BaseBuffComponent_1.pu_.Stop();
        return;
      default:
        BaseBuffComponent_1.pu_.Stop();
        return;
    }
    BaseBuffComponent_1.pu_.Stop();
  }
  GetBuffTotalStackById(t, e = false) {
    var f = this.BuffIdToHandleMap.get(t);
    if (!f) {
      return 0;
    }
    if (f.size === 0) {
      this.BuffIdToHandleMap.delete(t);
      return 0;
    }
    let i = 0;
    for (const s of f) {
      var o = this.BuffContainer.get(s);
      if (o) {
        if (!this.BuffGarbageSet.has(o.Handle) && (!e || !!o.IsActive())) {
          i += o.StackCount;
        }
      } else {
        f.delete(s);
      }
    }
    return i;
  }
  OnBuffAdded(e, t, f, i, o, s, r, a, n, u, h) {
    if (e) {
      var c = e.Config;
      if (e.IsInstantBuff()) {
        this.ApplyPeriodExecution(e);
      } else {
        var l = e.Handle;
        this.BuffContainer.set(l, e);
        let t = this.BuffIdToHandleMap.get(e.Id);
        if (!t) {
          this.BuffIdToHandleMap.set(e.Id, t = new Set());
        }
        t.add(l);
        this.MarkListenerBuff(e);
        this.BuffEffectManager.OnBuffAdded(e);
      }
      if (this.NeedCheck(e.Config)) {
        this.OnBuffActiveChanged(e, this.CheckActivate(e.Config, e.GetInstigator()));
      } else if (s === undefined) {
        CombatLog_1.CombatLog.Error("Buff", this.Entity, "buff激活状态未知", ["buffId", e.Id], ["handle", e.Handle]);
      } else {
        this.OnBuffActiveChanged(e, s);
      }
      if (e.IsActive() && c && c.Period > 0 && c.ExecutePeriodicOnAdd) {
        e.ResetPeriodTimer(TimerSystem_1.MIN_TIME * CommonDefine_1.SECOND_PER_MILLIONSECOND);
      }
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        this.Entity.GetComponent(27)?.OnBuffAdded(e);
        this.Entity.GetComponent(22)?.OnBuffAdded(e);
      }
      this.CheckWhenBuffChanged(e.Id);
      for (const B of e.Config.EffectInfos) {
        B.ExecutionEffect?.OnBuffAddedCallback(e, n);
      }
      e.OnTimeScaleChanged(this.GetTimeScale(), this.IsPaused());
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 0, e.Id, e.Id, 0, e.StackCount, this.Entity);
    }
  }
  ApplyPeriodExecution(t) {
    var e = t.Config;
    var f = t.GetInstigatorAttributeSet();
    if (e.Modifiers && e.Modifiers.length > 0) {
      var i = this.GetAttributeComponent();
      if (i) {
        var o;
        var s;
        var r = this.GetTimeScale();
        for ([o, s] of t.StateModifiers) {
          if (this.HasBuffAuthority()) {
            ActiveBuff_1.ActiveBuffInternal.ModifyStateAttribute(f, i, o, t.Level, r, t.StackCount, s);
          }
        }
      } else {
        CombatLog_1.CombatLog.Warn("Buff", this.Entity, "周期buff尝试修改属性，但owner不存在", ["buffId", t.Id], ["handle", t.Handle], ["持有者", t.GetOwnerBuffComponent()?.GetDebugName()], ["施加者", t.InstigatorId]);
      }
    }
    for (const a of e.EffectInfos) {
      a.ExecutionEffect?.OnPeriodCallback(t);
    }
    for (const n of this.BuffEffectManager?.GetEffectsByHandle(t.Handle) ?? []) {
      n.OnPeriodCallback();
    }
  }
  OnBuffRemoved(t, e, f, i, o) {
    if (t) {
      var s = t.Handle;
      var r = t.StackCount;
      this.RemoveListenerBuff(t);
      this.BuffGarbageSet.add(s);
      t.Destroy();
      this.CheckWhenBuffChanged(t.Id);
      this.BuffEffectManager.OnBuffRemoved(t, e);
      var s = t.GetInstigatorBuffComponent();
      if ((s === undefined || s.Valid) && this.HasBuffAuthority()) {
        s = e ? t.Config?.PrematureExpirationEffects : t.Config?.RoutineExpirationEffects;
        if (s) {
          for (const a of s) {
            this.AddIterativeBuff(a, t, undefined, true, `因为Buff${t.Id}移除导致的添加`);
          }
        }
        s = t.Config.BuffsAddedByStackCountOnRemoved;
        if (e && s && (e = s[r - 1])) {
          this.AddIterativeBuff(e, t, undefined, true, `buff${t.Id}移除时根据buff层数获取指定buff`);
        }
      }
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 0, t.Id, t.Id, r, 0, this.Entity);
    }
  }
  OnBuffStackDecreased(t, e, f, i, o, s = 0) {
    if (t) {
      BaseBuffComponent_1.m__.Start();
      t.SetStackCount(f, s);
      this.CheckWhenBuffChanged(t.Id);
      this.BuffEffectManager.OnStackDecreased(t, f, e, i);
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 0, t.Id, t.Id, e, f, this.Entity);
      BaseBuffComponent_1.m__.Stop();
    }
  }
  OnBuffStackIncreased(t, e, f, i, o, s, r, a, n, u, h, c, l, B = 0, d = 0) {
    if (t) {
      BaseBuffComponent_1.C__.Start();
      t.SetStackCount(f, d);
      if (B === 0 && t.Config.StackDurationRefreshPolicy === 0 && (!!this.NeedCheck(t.Config) || r !== Protocol_1.Aki.Protocol.uFs.Proto_Common)) {
        t.SetDuration(n);
      }
      var d = t.Config;
      var _ = t.Handle;
      if (d) {
        t.Id;
        this.BuffEffectManager.OnStackIncreased(t, f, e, i);
        if (this.HasBuffAuthority()) {
          B = t.StackLimitCount > 0 ? t.StackLimitCount : Infinity;
          if (B <= e && B <= f) {
            r = d.OverflowEffects;
            if (r && r.length > 0) {
              for (const C of r) {
                this.AddIterativeBuff(C, t, undefined, true, `Buff层数溢出时迭代添加新buff（前置buff Id=${t.Id}, handle=${_}）`);
              }
            }
            if (t.Config.ClearStackOnOverflow) {
              this.RemoveBuffByHandle(_, -1, "Buff层数溢出时清除");
            }
          }
        }
        SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 0, t.Id, t.Id, e, f, this.Entity);
      }
      BaseBuffComponent_1.C__.Stop();
    }
  }
  OnBuffActiveChanged(t, e) {
    if (t) {
      t.SetActivate(e);
      this.CheckWhenBuffChanged(t.Id);
      this.BuffEffectManager.OnBuffInhibitedChanged(t, !e);
      this.OnAnyBuffInhibitionChanged(t);
    }
  }
  OnTagChanged(t) {
    if (this.CHu.has(t)) {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "Tag变更循环派发", ["tagId", t]);
    } else {
      this.CHu.add(t);
      this.CheckWhenTagChanged(t);
      this.CHu.delete(t);
    }
  }
  get BuffLock() {
    return this.Mbr;
  }
  set BuffLock(t) {
    if ((this.Mbr = t) <= 0 && this.BuffGarbageSet.size > 0) {
      for (const i of this.BuffGarbageSet) {
        var e;
        var f = this.BuffContainer.get(i);
        this.BuffContainer.delete(i);
        if (f) {
          if ((e = this.BuffIdToHandleMap.get(f.Id)) && (e.delete(i), e.size === 0)) {
            this.BuffIdToHandleMap.delete(f.Id);
          }
          ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(f);
        }
      }
      this.BuffGarbageSet.clear();
    }
  }
  AddTrigger(t, e, f) {
    let i = this.TriggerMap.get(e);
    if (!i) {
      this.TriggerMap.set(e, i = []);
    }
    i.push(f);
  }
  RemoveTrigger(e, t) {
    var f;
    var t = this.TriggerMap.get(t);
    if (t && (f = t.findIndex(t => t.ActiveHandleId === e)) !== -1) {
      t.splice(f, 1);
    }
  }
  TriggerEvents(t, e, f) {
    t = this.TriggerMap.get(t);
    if (t && e) {
      for (const i of [...t]) {
        i.TryExecute(f, e);
      }
    }
  }
  HasBuffTrigger(t) {
    return this.TriggerMap.has(t);
  }
  AddGameplayCue(t, e, f) {
    if (!t || t.length <= 0) {
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    BaseBuffComponent_1.Sbr.Start();
    var i = ControllerHolder_1.ControllerHolder.BuffController.CreateDynamicBuffRef();
    i.GameplayCueIds = t;
    i.Desc = f;
    i.DurationPolicy = e === 0 ? 0 : e < 0 ? 1 : 2;
    if (e > 0) {
      i.DurationCalculationPolicy = [0];
      i.DurationMagnitude = [e];
    }
    var t = this.AddBuffInner(ActiveBuffConfigs_1.DYNAMIC_BUFF_ID, i, undefined, 1, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, e, undefined, ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID, f, false, true, false, undefined);
    BaseBuffComponent_1.Sbr.Stop();
    return t;
  }
  static BroadcastAddBuffNotify(t, e, f) {
    BaseBuffComponent_1.Wbr.Start();
    var i = e.uVn;
    var o = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    var s = MathUtils_1.MathUtils.LongToNumber(e.Rjn);
    var t = t?.GetComponent(222);
    var r = MathUtils_1.MathUtils.LongToBigInt(f?.X8n ?? -1);
    var f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
    if (t?.Valid) {
      var a = ControllerHolder_1.ControllerHolder.BuffController.GetBuffDefinition(o);
      if (t && a && i !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
        const n = t.GetTagComponent();
        if (n) {
          a.RemoveBuffWithTags?.forEach(t => {
            n.RemoveTag(t);
          });
        }
        t.AddBuffRemote(o, i, {
          IsActive: e.WHn,
          InstigatorId: s,
          Level: e.F6n,
          ApplyType: e.xjn,
          PreMessageId: r,
          MessageId: f,
          ServerId: e.wjn,
          Duration: e.n5n,
          OuterStackCount: e.Bjn,
          RemainDuration: e.QEs,
          Reason: "远端通知添加buff"
        });
      }
    }
    BaseBuffComponent_1.Wbr.Stop();
  }
  static BroadcastAddBuffFailedNotify(t, e) {
    var f = MathUtils_1.MathUtils.LongToNumber(e.Rjn ?? 0);
    var f = ModelManager_1.ModelManager.CreatureModel.GetEntity(f)?.Entity;
    var i = MathUtils_1.MathUtils.LongToNumber(e.b6n);
    if (t && f) {
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(f, 2, i, i, t, f, e.Bjn, MathUtils_1.MathUtils.LongToBigInt(e.ZG1?.JG1 ?? 0));
    }
  }
  static BroadcastBuffStackChangedNotify(t, e) {
    var f;
    var i;
    var o = e.cVn;
    var s = e.Gjn;
    var r = t?.GetComponent(222);
    var a = r?.GetBuffByHandle(o);
    if (r && a && (a.StackCount > s ? r.OnBuffStackDecreased(a, a.StackCount, s, true, "远端Buff层数变化通知", e.WL1 ? 1 : 0) : a.StackCount <= s && (f = MathUtils_1.MathUtils.LongToNumber(e.Rjn ?? 0), i = undefined, (i = ModelManager_1.ModelManager.CreatureModel.GetEntity(f)?.Entity) && SceneTeamController_1.SceneTeamController.EmitAbilityEvent(i, 1, a.Id, a.Id, r.Entity, i), SceneTeamController_1.SceneTeamController.EmitAbilityEvent(t, 3, a.Id, a.Id, o), r.OnBuffStackIncreased(a, a.StackCount, s, a.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, a.Level, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, a.ServerId, false, false, "远端Buff层数变化通知", e.$L1 ? 1 : 0, e.WL1 ? 1 : 0)), (f = e.n5n) !== undefined && a.SetDuration(f), (i = e.QEs) !== undefined)) {
      a.SetRemainDuration(i);
    }
  }
  static BroadcastRemoveBuffNotify(t, e) {
    var f = e.uVn;
    var i = t?.GetComponent(222);
    if (i?.Valid) {
      i?.RemoveBuffInner(f, -1, true, "远端通知移除buff");
    } else {
      CombatLog_1.CombatLog.Warn("Buff", t, "Invalid entity when processing RemoveGameplayEffectNotify", ["entity id", e.F4n], ["handle", e.uVn]);
    }
  }
  static BuffDurationNotify(t, e) {
    var f = e.cVn;
    var t = t?.GetComponent(222);
    var f = t?.GetBuffByHandle(f);
    if (t && f && (t = e.n5n, e = e.QEs, t !== undefined && f.SetDuration(t), e !== undefined)) {
      f.SetRemainDuration(e);
    }
  }
  static OrderAddBuffS2cNotify(t, e, f) {
    var i = t?.GetComponent(222);
    var o = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    var s = MathUtils_1.MathUtils.LongToNumber(e.Rjn);
    var f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
    var r = ControllerHolder_1.ControllerHolder.BuffController.GetBuffDefinition(o);
    var a = new Protocol_1.Aki.Protocol.G4n();
    if (t && i?.Valid && r) {
      const n = i.GetTagComponent();
      if (n) {
        r.RemoveBuffWithTags?.forEach(t => {
          n.RemoveTag(t);
        });
      }
      r = i.AddBuffInner(o, ControllerHolder_1.ControllerHolder.BuffController.GetBuffDefinition(o), s, e.F6n, e.Bjn, e.xjn, f, undefined, e.n5n, undefined, e.wjn, "远端请求添加玩家Buff(s2c)", false, e.Pjn, true, undefined);
      o = i.BuffContainer.get(r);
      a.uVn = r;
      a.WHn = !!o?.IsActive();
      a.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs;
    } else {
      a.Q4n = Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
    }
    CombatMessage_1.CombatNet.Send(NetDefine_1.ECombatPushDataMessage.G4n, t, a, f, undefined, true);
  }
  static OrderRemoveBuffS2cNotify(t, e, f) {
    var i = t?.GetComponent(222);
    var f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
    i?.RemoveBuffByHandle(e.uVn, e.Bjn, "远端请求移除buff(s2c)", f, true);
    var i = new Protocol_1.Aki.Protocol.O4n();
    i.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs;
    CombatMessage_1.CombatNet.Send(NetDefine_1.ECombatPushDataMessage.O4n, t, i, f, undefined, true);
  }
  static OrderRemoveBuffByIdS2cNotify(t, e, f) {
    var i = t?.GetComponent(222);
    var o = MathUtils_1.MathUtils.LongToNumber(e.b6n);
    var f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
    var s = new Protocol_1.Aki.Protocol.N4n();
    if (i?.Valid) {
      i.RemoveBuff(o, e.Bjn, "远端移除buff(s2c) reason=" + e.x9n, f, true);
      s.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs;
    } else {
      CombatLog_1.CombatLog.Warn("Buff", t, "Invalid entity when processing RemoveBuffByIdS2cRequestNotify", ["entity id", t?.Id], ["buffId", o]);
      s.Q4n = Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
    }
    CombatMessage_1.CombatNet.Send(NetDefine_1.ECombatPushDataMessage.N4n, t, s, f, undefined, true);
  }
  static OrderRemoveBuffByServerIdNotify(t, e, f) {
    var i;
    var o;
    var s;
    var r = t?.GetComponent(222);
    if (r && r.HasBuffAuthority()) {
      i = e.wjn;
      o = e.x9n;
      s = e.Bjn;
      f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
      r.RemoveBuffByServerId(i, s, f, "远端移除buff(s2c):" + o);
    } else {
      CombatLog_1.CombatLog.Error("Buff", t, "[buffComp] 服务端通知移除非主控buff", ["serverId", e.wjn], ["reason", e.x9n]);
    }
  }
  static OrderAddBuffNotify(t, e, f) {
    var i;
    var o = t?.CheckGetComponent(222);
    if (o) {
      if (o) {
        i = MathUtils_1.MathUtils.LongToNumber(e.s5n);
        o.AddBuffLocal(i, {
          InstigatorId: MathUtils_1.MathUtils.LongToNumber(e.Rjn),
          Level: e.F6n,
          ApplyType: e.xjn,
          PreMessageId: f?.$8n ? MathUtils_1.MathUtils.LongToBigInt(f.$8n) : undefined,
          Duration: e.n5n,
          IsIterable: e.Pjn,
          OuterStackCount: e.Bjn,
          ServerId: e.wjn,
          IsServerOrder: true,
          Reason: "服务端或其它客户端请求添加Buff"
        });
      }
    } else {
      CombatLog_1.CombatLog.Error("Buff", t, "收到服务端请求添加buff，但找不到对应的entity", ["entity", t], ["buffId", e.s5n], ["InstigatorId", e.Rjn]);
    }
  }
  static OrderRemoveBuffNotify(t, e) {
    var f = t?.GetComponent(222);
    var i = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    if (f) {
      f.RemoveBuffLocal(i, e.Bjn, "服务端或其它客户端请求本端移除buff");
    } else {
      f = ControllerHolder_1.ControllerHolder.BuffController.GetBuffDefinition(i);
      CombatLog_1.CombatLog.Error("Buff", t, "[order] 移除Buff请求找不到对应实体", ["buffId", i], ["持有者", t?.Id], ["说明", f?.Desc]);
    }
  }
  static OrderRemoveBuffByTagsNotify(t, e) {
    var f = t?.GetComponent(222);
    if (f) {
      for (const o of e.bjn) {
        var i = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(o);
        f.RemoveBuffByTagLocal(o, `远端请求根据tag ${i} 移除buff`);
      }
    } else {
      CombatLog_1.CombatLog.Error("Buff", t, "[order] 根据tag移除Buff请求找不到对应实体", ["tagId", e?.bjn.map(t => GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t))]);
    }
  }
  static BroadcastActivateBuffNotify(t, e) {
    var f = t?.GetComponent(222);
    var i = e.uVn;
    var o = e.qjn;
    var s = f?.GetBuffByHandle(i);
    if (!f || f.HasBuffAuthority()) {
      CombatLog_1.CombatLog.Warn("Buff", t, "主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理", ["handle", i], ["buffId", s?.Id], ["本地激活状态", o], ["远端激活状态", e.qjn]);
    } else {
      f.OnBuffActiveChanged(s, o);
    }
  }
  AddBuffTimeModifier(e, f, i, o, s) {
    if (i !== 0 || o !== 0) {
      s = s ? this.InstigatorBuffTimeModifiers : this.OwnerBuffTimeModifiers;
      let t = s.get(e);
      if (!t) {
        s.set(e, t = new Map());
      }
      t.set(f, [i, o]);
    }
  }
  RemoveBuffTimeModifier(t, e, f) {
    var f = f ? this.InstigatorBuffTimeModifiers : this.OwnerBuffTimeModifiers;
    var i = f.get(t);
    if (i && (i.delete(e), i.size <= 0)) {
      f.delete(t);
    }
  }
  CalculateDurationRate(t, e) {
    let f = this.CalculateDurationExtraRate(t, false);
    if (e) {
      f += e.CalculateDurationExtraRate(t, true);
    }
    return Math.max(MathUtils_1.MathUtils.SmallNumber, 1 + f * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
  }
  CalculateDurationExtraRate(t, e) {
    var f;
    var e = (e ? this.InstigatorBuffTimeModifiers : this.OwnerBuffTimeModifiers).get(t);
    if (!e || e.size <= 0) {
      return 0;
    }
    let i = 0;
    for ([, f] of e.values()) {
      i += f;
    }
    return i;
  }
  CalculatePeriodRate(t, e) {
    let f = this.CalculatePeriodExtraRate(t, false);
    if (e) {
      f += e.CalculatePeriodExtraRate(t, true);
    }
    return Math.max(MathUtils_1.MathUtils.SmallNumber, 1 + f * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND);
  }
  CalculatePeriodExtraRate(t, e) {
    var f;
    var e = (e ? this.InstigatorBuffTimeModifiers : this.OwnerBuffTimeModifiers).get(t);
    if (!e || e.size <= 0) {
      return 1;
    }
    let i = 0;
    for ([f] of e.values()) {
      i += f;
    }
    return i;
  }
  OnRefreshBuffDuration(t, e) {
    var f = Protocol_1.Aki.Protocol.GG1.create();
    f.$As = t;
    CombatMessage_1.CombatNet.Send(28006, this.Entity, f);
    for (const i of t) {
      for (const o of this.GetAllBuffById(i)) {
        o.SetDuration();
      }
    }
  }
  RefreshBuffDurationOrder(t, e) {}
  RefreshBuffDuration(t, e) {
    if (this.HasBuffAuthority()) {
      this.OnRefreshBuffDuration(t, e);
    } else {
      this.RefreshBuffDurationOrder(t, e);
    }
  }
  AddBuffStackModifier(e, f, i) {
    if (this.CheckBuffStackChangeable(e) && i !== 0) {
      let t = this.BuffStackModifiers.get(e);
      if (!t) {
        this.BuffStackModifiers.set(e, t = new Map());
      }
      t.set(f, i);
      this.RefreshBuffStack(e);
    }
  }
  RemoveBuffStackModifier(t, e) {
    var f;
    if (this.CheckBuffStackChangeable(t)) {
      if ((f = this.BuffStackModifiers.get(t)) && (f.delete(e), f.size <= 0)) {
        this.BuffStackModifiers.delete(t);
      }
      this.RefreshBuffStack(t);
    }
  }
  CalculateBuffStackMax(t) {
    var e = this.GetBuffById(t);
    if (!e) {
      return 0;
    }
    if (e.Config.StackLimitCount <= 0) {
      return Infinity;
    }
    t = this.BuffStackModifiers.get(t);
    let f = 0;
    if (t) {
      for (const i of t.values()) {
        f += i;
      }
    }
    e.StackLimitCount = Math.max(1, e.Config.StackLimitCount + f);
    return e.StackLimitCount;
  }
  RefreshBuffStack(t) {
    var e;
    var f = this.GetBuffById(t);
    if (f && (e = f.StackCount, (t = this.CalculateBuffStackMax(t)) < e)) {
      if (this.HasBuffAuthority()) {
        this.BuffEffectManager?.OnBuffStackOverflow(f, e, e, t);
      }
      this.OnBuffStackDecreased(f, e, t, true, "buff层数修改器导致");
    }
  }
  CheckBuffStackChangeable(t) {
    t = ControllerHolder_1.ControllerHolder.BuffController.GetBuffDefinition(t);
    return !!t && t.StackLimitCount > 0;
  }
  static BroadcastTransformBuffStackNotify(t, e) {
    var t = t?.GetComponent(222);
    var f = MathUtils_1.MathUtils.LongToNumber(e.b6n);
    var i = MathUtils_1.MathUtils.LongToNumber(e.ITs);
    t?.AddBuffStackModifier(f, i, e.x9f);
  }
  ChangeBuffStack(t, e, f, i, o) {
    if (this.HasBuffAuthority()) {
      for (const a of this.GetAllBuffById(t)) {
        var s = a.StackCount;
        var r = a.StackLimitCount;
        var r = Math.min(s + i, r);
        if (r <= 0) {
          this.RemoveBuffInner(a.Handle, -1, true, o);
        } else if (r < s) {
          this.OnBuffStackDecreased(a, s, r, true, o, f);
        } else if (s < r) {
          this.OnBuffStackIncreased(a, s, r, a.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, a.Level, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, a.ServerId, false, false, o, e, f);
        }
      }
    }
  }
  SetDeferredCueCreationEnable(t) {
    this.E8g = t;
  }
  ProcessPendingCues() {
    while (this.I8g.length > 0 && !ControllerHolder_1.ControllerHolder.BuffController.CueTimeLimit.IsTimeLimitExceeded()) {
      var t = cpp_1.KuroTime.GetMicroseconds64();
      var e = this.I8g.shift();
      if (e && (f = this.GetCueComponent())) {
        f.AddCue(e.CueId, e.Param);
      }
      var f = cpp_1.KuroTime.GetMicroseconds64();
      ControllerHolder_1.ControllerHolder.BuffController.CueTimeLimit.AddCost(f - t);
    }
    while (this.w4g.size > 0 && !ControllerHolder_1.ControllerHolder.BuffController.CueTimeLimit.IsTimeLimitExceeded()) {
      var i = cpp_1.KuroTime.GetMicroseconds64();
      var o = this.w4g.values().next().value;
      if (o !== undefined) {
        this.w4g.delete(o);
        this.DestroyGameplayCueByBuffImmediate(o);
      }
      var o = cpp_1.KuroTime.GetMicroseconds64();
      ControllerHolder_1.ControllerHolder.BuffController.CueTimeLimit.AddCost(o - i);
    }
    while (this.L4g.size > 0 && !ControllerHolder_1.ControllerHolder.BuffController.CueTimeLimit.IsTimeLimitExceeded()) {
      var s;
      var r = cpp_1.KuroTime.GetMicroseconds64();
      var a = this.L4g.values().next().value;
      if (a !== undefined && (this.L4g.delete(a), s = this.GetBuffByHandle(a)) && s.IsActive() && !this.Buff2CueMap.has(a)) {
        this.CreateGameplayCueByBuffImmediate(s);
      }
      var a = cpp_1.KuroTime.GetMicroseconds64();
      ControllerHolder_1.ControllerHolder.BuffController.CueTimeLimit.AddCost(a - r);
    }
    if (this.L4g.size === 0 && this.w4g.size === 0 && this.I8g.length === 0) {
      ControllerHolder_1.ControllerHolder.BuffController.UnregisterBuffComponent(this);
    }
  }
  CreateGameplayCueByBuff(t) {
    if (t.Config.GameplayCueIds && t.Config.GameplayCueIds.length !== 0) {
      if (this.w4g.has(t.Handle)) {
        this.w4g.delete(t.Handle);
      } else if (this.E8g) {
        if (t.IsInstantBuff()) {
          const e = t.GetInstigator();
          t.Config.GameplayCueIds.forEach(t => {
            this.I8g.push({
              CueId: t,
              Param: {
                Instant: true,
                Instigator: ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e)
              }
            });
          });
        } else {
          this.L4g.add(t.Handle);
        }
        ControllerHolder_1.ControllerHolder.BuffController.RegisterBuffComponent(this);
      } else {
        this.CreateGameplayCueByBuffImmediate(t);
      }
    }
  }
  CreateGameplayCueByBuffImmediate(t) {
    const f = this.GetCueComponent();
    if (f && t.IsActive()) {
      const i = t.Handle;
      if (!this.Buff2CueMap.has(i) && !this.CreateSeamlessTravelCue(t, f)) {
        t.Config.GameplayCueIds?.forEach(e => {
          e = f.AddCue(e, {
            Buff: t,
            Instant: t.IsInstantBuff(),
            Instigator: ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t.GetInstigator())
          });
          if (![GameplayCueController_1.INSTANT_CUE_HANDLE, GameplayCueController_1.INVALID_CUE_HANDLE].includes(e)) {
            let t = this.Buff2CueMap.get(i);
            if (!t) {
              this.Buff2CueMap.set(i, t = []);
            }
            t.push(e);
          }
        });
      }
    }
  }
  DestroyGameplayCueByBuff(t) {
    t = t.Handle;
    if (this.L4g.has(t)) {
      this.L4g.delete(t);
    } else if (this.E8g) {
      if (this.Buff2CueMap.has(t)) {
        this.w4g.add(t);
        ControllerHolder_1.ControllerHolder.BuffController.RegisterBuffComponent(this);
      }
    } else {
      this.DestroyGameplayCueByBuffImmediate(t);
    }
  }
  DestroyGameplayCueByBuffImmediate(t) {
    const e = this.GetCueComponent();
    var f;
    if (e && (f = this.Buff2CueMap.get(t))) {
      f.forEach(t => {
        e.RemoveCueByHandle(t);
      });
      this.Buff2CueMap.delete(t);
    }
  }
  OnAnyBuffInhibitionChanged(t) {
    if (t.IsActive()) {
      this.CreateGameplayCueByBuff(t);
    } else {
      this.DestroyGameplayCueByBuff(t);
    }
  }
  CreateSeamlessTravelCue(t, e) {
    var f = this.SeamlessTravelBuffCue?.get(t.Id);
    if (f === undefined || f.length === 0) {
      return false;
    }
    f = f.pop();
    this.Buff2CueMap.set(t.Handle, f);
    CombatLog_1.CombatLog.Info("Buff", this.Entity, "[无缝加载]buff特效复用", ["buffId", t.Id], ["buffHandle", t.Handle], ["cueHandle", f]);
    for (const i of f) {
      e.ChangeBuffHandle(i, t);
    }
    return true;
  }
  SeamlessTravelBuffRetain(t) {
    return t.Id < 0;
  }
  SeamlessTravelingRefresh() {
    CombatLog_1.CombatLog.Info("Buff", this.Entity, "[无缝加载]buff刷新");
    var t = new Set();
    for (const o of this.GetAllBuffs()) {
      if (!this.SeamlessTravelBuffRetain(o)) {
        t.add(o);
      }
    }
    if (this.SeamlessTravelBuffCue === undefined) {
      this.SeamlessTravelBuffCue = new Map();
    }
    for (const s of t) {
      var e = this.Buff2CueMap.get(s.Handle);
      if (e) {
        let t = this.SeamlessTravelBuffCue.get(s.Id);
        if (!t) {
          this.SeamlessTravelBuffCue.set(s.Id, t = []);
        }
        t.push(e);
        this.Buff2CueMap.delete(s.Handle);
      }
      this.RemoveBuffByHandle(s.Handle, -1, "无缝加载移除旧buff");
    }
    this.InitBornBuff();
    const f = this.GetCueComponent();
    if (f) {
      for (var [, i] of this.SeamlessTravelBuffCue) {
        for (const r of i) {
          r.forEach(t => {
            f.RemoveCueByHandle(t);
          });
        }
      }
    }
    this.SeamlessTravelBuffCue.clear();
    this.OnSeamlessTravelingRefreshEnd();
  }
  OnSeamlessTravelingRefreshEnd() {}
};
BaseBuffComponent.NoLogBuffSet = new Set([ActiveBuffConfigs_1.DYNAMIC_BUFF_ID, 1101003012, 800080191, 800100003081, 1302121034, 1304700001, 640007016, 1202803014, 1202002003]);
BaseBuffComponent.u__ = Stats_1.Stat.Create("BaseBuffComponent.CheckWhenTagChanged");
BaseBuffComponent.d__ = Stats_1.Stat.Create("BaseBuffComponent.CheckWhenBuffChanged");
BaseBuffComponent.Ebr = new Map();
BaseBuffComponent.pu_ = Stats_1.Stat.CreateNoFlameGraph("BaseBuffComponent.GetStackableBuff");
BaseBuffComponent.m__ = Stats_1.Stat.Create("BaseBuffComponent.OnBuffStackDecreased");
BaseBuffComponent.C__ = Stats_1.Stat.Create("BaseBuffComponent.OnBuffStackIncreased");
BaseBuffComponent.Sbr = Stats_1.Stat.Create("AddBuff_Cue");
BaseBuffComponent.Wbr = Stats_1.Stat.Create("BaseBuffComponent.BroadcastAddBuffNotify");
__decorate([CombatMessage_1.CombatNet.Listen("yFn", false)], BaseBuffComponent, "BroadcastAddBuffNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("ev1", false)], BaseBuffComponent, "BroadcastAddBuffFailedNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("i3n", false)], BaseBuffComponent, "BroadcastBuffStackChangedNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("IFn", false)], BaseBuffComponent, "BroadcastRemoveBuffNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("W7l", false)], BaseBuffComponent, "BuffDurationNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("d3n", false)], BaseBuffComponent, "OrderAddBuffS2cNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("C3n", false)], BaseBuffComponent, "OrderRemoveBuffS2cNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("M3n", false)], BaseBuffComponent, "OrderRemoveBuffByIdS2cNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("rpm", false)], BaseBuffComponent, "OrderRemoveBuffByServerIdNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("HFn", false)], BaseBuffComponent, "OrderAddBuffNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("jFn", false)], BaseBuffComponent, "OrderRemoveBuffNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("KFn", false)], BaseBuffComponent, "OrderRemoveBuffByTagsNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("WFn", false)], BaseBuffComponent, "BroadcastActivateBuffNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("U9f", false)], BaseBuffComponent, "BroadcastTransformBuffStackNotify", null);
BaseBuffComponent = BaseBuffComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(222)], BaseBuffComponent);
exports.BaseBuffComponent = BaseBuffComponent; //# sourceMappingURL=BaseBuffComponent.js.map