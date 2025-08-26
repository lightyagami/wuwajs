"use strict";

var BaseBuffComponent_1;
var __decorate = this && this.__decorate || function (t, e, f, o) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, f) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, f, o);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (i = t[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(e, f, s) : i(e, f)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, f, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseBuffComponent = undefined;
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
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const SkillMessageController_1 = require("../../../../../Module/CombatMessage/SkillMessageController");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const ActiveBuff_1 = require("./Buff/ActiveBuff");
const ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterBuffController_1 = require("./CharacterBuffController");
const CharacterBuffIds_1 = require("./CharacterBuffIds");
const ExtraEffectDefine_1 = require("./ExtraEffect/ExtraEffectDefine");
const GameplayCueController_1 = require("./GameplayCueSFX/Controller/GameplayCueController");
const clientForceRemoveBuffId = [1607210102, 1607210103, 1607210203];
let BaseBuffComponent = BaseBuffComponent_1 = class BaseBuffComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.CreatureDataComponent = undefined;
    this.DeathComponent = undefined;
    this.BuffContainer = new Map();
    this.BuffIdToHandleMap = new Map();
    this.BuffGarbageSet = new Set();
    this.BuffEffectManager = undefined;
    this.TagListenerDict = new Map();
    this.TagImmuneListenerDict = new Map();
    this.VictimTagListenerDict = new Map();
    this.VictimBuffListenerDict = new Map();
    this.BuffRoutineExpirationLock = new Map();
    this.EffectTimeoutMap = new Map();
    this.iWc = new Set();
    this.Mbr = 0;
    this.TriggerMap = new Map();
    this.OwnerBuffTimeModifiers = new Map();
    this.InstigatorBuffTimeModifiers = new Map();
    this.BuffStackModifiers = new Map();
    this.Buff2CueMap = new Map();
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
    this.iWc.clear();
    return true;
  }
  OnTick(t) {
    this.BuffLock = 0;
    this.iWc.clear();
    return true;
  }
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
    let o = t.get(e);
    if (!o) {
      t.set(e, o = new Set());
    }
    o.add(f);
  }
  EUi(t, e, f, o) {
    let i = t.get(e);
    if (!i) {
      t.set(e, i = new Map());
    }
    let r = i.get(f);
    if (!r) {
      i.set(f, r = new Set());
    }
    r.add(o);
  }
  _Sa(t, e, f) {
    var o = t.get(e);
    if (o && (o.delete(f), o.size <= 0)) {
      t.delete(e);
    }
  }
  uSa(t, e, f, o) {
    var i;
    var r = t.get(e);
    if (r && (i = r.get(f)) && (i.delete(o), i.size <= 0) && (r.delete(f), r.size <= 0)) {
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
        for (const r of this.GetInvolvedTags(e)) {
          this.lSa(this.TagListenerDict, r, f);
        }
        if (e.ImmuneTags) {
          for (const s of e.ImmuneTags.values()) {
            this.lSa(this.TagImmuneListenerDict, s, f);
          }
        }
        var o = t.GetInstigatorBuffComponent();
        var i = this.CreatureDataComponent?.GetCreatureDataId();
        if (o && i) {
          for (const a of this.GetInvolvedInstigatorTags(e)) {
            o.EUi(o.VictimTagListenerDict, a, i, f);
          }
          for (const n of this.GetInvolvedInstigatorBuffIds(e)) {
            o.EUi(o.VictimBuffListenerDict, n, i, f);
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
        for (const r of this.GetInvolvedTags(e)) {
          this._Sa(this.TagListenerDict, r, f);
        }
        if (e.ImmuneTags) {
          for (const s of e.ImmuneTags.values()) {
            this._Sa(this.TagImmuneListenerDict, s, f);
          }
        }
        var o = t.GetInstigatorBuffComponent();
        var i = this.CreatureDataComponent?.GetCreatureDataId();
        if (o && i) {
          for (const a of this.GetInvolvedInstigatorTags(e)) {
            o.uSa(o.VictimTagListenerDict, a, i, f);
          }
          for (const n of this.GetInvolvedInstigatorBuffIds(e)) {
            o.uSa(o.VictimBuffListenerDict, n, i, f);
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
      for (const c of [...e]) {
        var o = this.GetBuffByHandle(c);
        if (o && this.CheckRemove(o.Config, o.GetInstigator())) {
          this.RemoveBuffInner(c, -1, true, `因为tag ${f}的变化触发`);
        }
      }
      for (const l of [...e]) {
        var i;
        var r = this.GetBuffByHandle(l);
        if (r) {
          if ((i = this.CheckActivate(r.Config, r.GetInstigator())) !== r.IsActive()) {
            this.OnBuffActiveChanged(r, i);
          }
        } else {
          this._Sa(this.TagListenerDict, t, l);
        }
      }
    }
    var s = this.VictimTagListenerDict.get(t);
    if (s) {
      for (const [d, e] of [...s]) {
        for (const _ of [...e]) {
          var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(d)?.Entity?.GetComponent(210);
          var n = a?.GetBuffByHandle(_);
          if (a && n && a.CheckRemove(n.Config, n.GetInstigator())) {
            a.RemoveBuffInner(_, -1, true, `因为施加者的tag ${f}的变化触发`);
          }
        }
      }
      for (const [C, e] of [...s]) {
        for (const v of [...e]) {
          var u;
          var h = ModelManager_1.ModelManager.CreatureModel.GetEntity(C)?.Entity?.GetComponent(210);
          var B = h?.GetBuffByHandle(v);
          if (h && B) {
            if ((u = h.CheckActivate(B.Config, B.GetInstigator())) !== B.IsActive()) {
              h?.OnBuffActiveChanged(B, u);
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
    var e = this.VictimBuffListenerDict.get(t);
    if (e) {
      this.BuffLock++;
      for (var [f, o] of [...e]) {
        for (const B of [...o]) {
          var i = ModelManager_1.ModelManager.CreatureModel.GetEntity(f)?.Entity?.GetComponent(210);
          var r = i?.GetBuffByHandle(B);
          if (i && r && i.CheckRemove(r.Config, r.GetInstigator())) {
            i.RemoveBuffInner(B, -1, true, `因为施加者的buff ${t}的变化触发`);
          }
        }
      }
      for (var [s, a] of [...e]) {
        for (const c of [...a]) {
          var n;
          var u = ModelManager_1.ModelManager.CreatureModel.GetEntity(s)?.Entity?.GetComponent(210);
          var h = u?.GetBuffByHandle(c);
          if (u && h) {
            if ((n = u.CheckActivate(h.Config, h.GetInstigator())) !== h.IsActive()) {
              u?.OnBuffActiveChanged(h, n);
            }
          } else {
            this.uSa(this.VictimBuffListenerDict, t, s, c);
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
      const o = this.GetTagComponent();
      f = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity;
      const i = f?.GetComponent(206);
      if (t.Probability < CharacterAttributeTypes_1.PER_TEN_THOUSAND && RandomSystem_1.default.GetRandomPercent() > t.Probability) {
        return false;
      }
      if (!o) {
        return false;
      }
      if (t.AddTagIgnores?.some(t => o.HasTag(t)) || t.AddTagRequirements?.some(t => !o.HasTag(t))) {
        return false;
      }
      if (this.CheckRemove(t, f)) {
        return false;
      }
      if (t.RemoveTagIgnores && t.RemoveTagIgnores.length > 0 && !t.RemoveTagIgnores.some(t => o.HasTag(t))) {
        return false;
      }
      e = t.RemoveTagExistAll ?? [];
      if (e.length > 0 && e.every(t => o.HasTag(t))) {
        return false;
      }
      f = t.RemoveTagExistAny ?? [];
      if (f.length > 0 && f.some(t => o.HasTag(t))) {
        return false;
      }
      if (i && (t.AddInstigatorTagIgnores?.some(t => i.HasTag(t)) || t.AddInstigatorTagRequirements?.some(t => !i.HasTag(t)))) {
        return false;
      }
    }
    return !this.CheckImmune(t);
  }
  CheckImmune(t) {
    for (const o of this.TagImmuneListenerDict.keys()) {
      if (t.GrantedTags?.some(t => GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, o))) {
        for (const i of this.TagImmuneListenerDict.get(o).keys()) {
          var e = this.BuffContainer.get(i);
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
    return !!t.RemoveTagIgnores?.length || !!t.RemoveTagExistAll?.length || !!t.RemoveTagExistAny?.length || !!t.BuffAction?.some(t => t.Type === 2 || t.Type === 1 || t.Type === 4 || t.Type === 3);
  }
  CheckRemoveAction(t, e) {
    if (t.BuffAction) {
      const f = e?.GetComponent(206);
      const o = e?.GetComponent(210);
      for (const i of t.BuffAction) {
        switch (i.Type) {
          case 2:
            if (f && i.Tags.every(t => f.HasTag(t))) {
              return true;
            }
            break;
          case 1:
            if (f && i.Tags.some(t => f.HasTag(t))) {
              return true;
            }
            break;
          case 4:
            if (f && i.Tags.every(t => !f.HasTag(t))) {
              return true;
            }
            break;
          case 3:
            if (f && i.Tags.some(t => !f.HasTag(t))) {
              return true;
            }
            break;
          case 10:
            if (o && i.Buffs.every(t => o.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 9:
            if (o && i.Buffs.some(t => o.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 12:
            if (o && i.Buffs.every(t => !o.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 11:
            if (o && i.Buffs.some(t => !o.HasActiveBuff(t))) {
              return true;
            }
        }
      }
    }
    return false;
  }
  CheckInactivateAction(t, e) {
    if (t.BuffAction) {
      const f = e?.GetComponent(206);
      const o = e?.GetComponent(210);
      for (const i of t.BuffAction) {
        switch (i.Type) {
          case 6:
            if (f && i.Tags.every(t => f.HasTag(t))) {
              return true;
            }
            break;
          case 5:
            if (f && i.Tags.some(t => f.HasTag(t))) {
              return true;
            }
            break;
          case 8:
            if (f && i.Tags.every(t => !f.HasTag(t))) {
              return true;
            }
            break;
          case 7:
            if (f && i.Tags.some(t => !f.HasTag(t))) {
              return true;
            }
            break;
          case 14:
            if (o && i.Buffs.every(t => o.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 13:
            if (o && i.Buffs.some(t => o.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 16:
            if (o && i.Buffs.every(t => !o.HasActiveBuff(t))) {
              return true;
            }
            break;
          case 15:
            if (o && i.Buffs.some(t => !o.HasActiveBuff(t))) {
              return true;
            }
        }
      }
    }
    return false;
  }
  CheckRemove(t, e) {
    const f = this.GetTagComponent();
    var o;
    var i;
    if (f) {
      return !!this.CheckRemoveAction(t, e) || (e = !!t.RemoveTagIgnores?.length && !t.RemoveTagIgnores.some(t => f.HasTag(t)), o = !!t.RemoveTagExistAll?.length && t.RemoveTagExistAll.every(t => f.HasTag(t)), i = !!t.RemoveTagExistAny?.length && t.RemoveTagExistAny.some(t => f.HasTag(t)), e) || o || i;
    } else {
      return !!this.HasTagRemoveCheck(t) && (CombatLog_1.CombatLog.Warn("Buff", this.Entity, "检查buff移除条件时找不到Tag组件，默认移除", ["buffId", t.Id]), true);
    }
  }
  CheckActivate(t, e) {
    const f = this.GetTagComponent();
    return !!f && !t.ActivateTagIgnores?.some(t => f.HasTag(t)) && !t.ActivateTagRequirements?.some(t => !f.HasTag(t)) && !this.CheckInactivateAction(t, e);
  }
  SetBuffEffectCd(t, e, f) {
    let o = this.EffectTimeoutMap.get(t);
    if (!o) {
      this.EffectTimeoutMap.set(t, o = new Map());
    }
    if (f <= 0) {
      o.delete(e);
    } else {
      o.set(e, Time_1.Time.ServerCombatStopTime + f);
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
    var o = this.GetSkillComponent()?.CurrentSkill;
    var i = o?.MNc;
    if (t !== -1) {
      if (i) {
        f = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
        SkillMessageController_1.SkillMessageController.AnimNotifyRequest(this.Entity, o ? o.SkillId : 0, -1, t, i, f);
        return f;
      }
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "CreateANCWithAnimBp Error", ["anIndex", t], ["animName", e], ["SkillId", o?.SkillId], ["contextId", i]);
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
    var o;
    var i = this.GetSkillComponent()?.GetSkill(t.SkillId);
    if (i && t.MontageIndex !== undefined && t.MontageTaskMessageId && e !== -1) {
      i = i.SkillId;
      f = t.MontageTaskMessageId;
      o = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
      SkillMessageController_1.SkillMessageController.AnimNotifyRequest(this.Entity, i, t.MontageIndex, e, f, o);
      return o;
    }
    CombatLog_1.CombatLog.Error("Buff", this.Entity, "CreateANCWithSkill Error", ["ANIndex", e], ["montageInfo", t]);
  }
  CreateAnimNotifyContent(t, e) {
    var f = this.Entity.GetComponent(25)?.GetMontageInfo(t);
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
        e.Level = e.Level ?? ModelManager_1.ModelManager.CreatureModel.GetEntity(e.InstigatorId)?.Entity?.GetComponent(210).GetBuffLevel(t);
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
    OuterStackCount: o,
    ApplyType: i = Protocol_1.Aki.Protocol.uFs.Proto_Common,
    PreMessageId: r = undefined,
    MessageId: s = undefined,
    Duration: a = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
    ServerId: n = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
    IsIterable: u = true,
    IsServerOrder: h = false,
    Reason: B,
    BulletMessageId: c = undefined,
    BornBuff: l = false
  }) {
    var d;
    var _;
    if (this.HasBuffAuthority()) {
      if (d = CharacterBuffController_1.default.GetBuffDefinition(t)) {
        _ = ModelManager_1.ModelManager.CreatureModel.GetEntity(e)?.Entity?.GetComponent(210);
        f = f ?? _?.GetBuffLevel(t) ?? ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL;
        return this.AddBuffInner(t, d, e, f, o, i, r, s, a, undefined, n, B, false, u, h, undefined, c, l);
      } else {
        return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      }
    } else {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[local] 模拟端不本地添加buff", ["buffId", t], ["施加者", e], ["持有者", this.GetDebugName()], ["前置行为id", r], ["原因", B]);
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
  }
  AddBuffOrder(t, e) {}
  AddBuffRemote(t, e, {
    InstigatorId: f = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
    Level: o = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
    OuterStackCount: i = undefined,
    ApplyType: r = Protocol_1.Aki.Protocol.uFs.Proto_Common,
    PreMessageId: s = undefined,
    MessageId: a = undefined,
    Duration: n = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
    RemainDuration: u,
    ServerId: h = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID,
    IsActive: B,
    Reason: c,
    BornBuff: l = false
  }) {
    t = this.AddBuffInner(t, CharacterBuffController_1.default.GetBuffDefinition(t), f, o, i, r, s, a, n, B, h, c, true, true, false, e, undefined, l);
    f = this.BuffContainer.get(t);
    if (f && u !== undefined) {
      f.SetRemainDuration(u);
    }
  }
  AddIterativeBuff(t, e, f, o, i, r) {
    if (e) {
      this.AddBuff(t, {
        InstigatorId: e.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
        Level: e.Level,
        PreMessageId: e.MessageId,
        ServerId: e.ServerId,
        OuterStackCount: f,
        IsIterable: o,
        Reason: i,
        BulletMessageId: r
      });
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "尝试添加迭代buff失败，未找到前置buff", ["buffId", t], ["持有者", this.GetDebugName()], ["原因", i]);
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
  AddBuffInner(e, f, o, i, r, s, a, n, u, h, B, c, l, d, _, C, v, t) {
    var m = BaseBuffComponent_1.GetBuffStat(e);
    m?.Start();
    this.BuffLock++;
    var g = [["buffId", e], ["创建者id", o], ["持有者", this.GetDebugName()], ["初始激活", h], ["原因", c]];
    if (!f) {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "[local] 添加buff时找不到配置", ...g);
      this.BuffLock--;
      m?.Stop();
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    s = s ?? Protocol_1.Aki.Protocol.uFs.Proto_Common;
    let p = undefined;
    if (o && o !== ActiveBuffConfigs_1.NULL_INSTIGATOR_ID && !(p = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.Entity)) {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[local] 添加buff时找不到施加者，将被丢弃", ...g);
      this.BuffLock--;
      m?.Stop();
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    let y = r && r > 0 ? r : f.DefaultStackCount;
    if (!this.CheckAdd(f, o ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, l)) {
      if (p) {
        SceneTeamController_1.SceneTeamController.EmitAbilityEvent(p, 2, e, e, this.Entity, p, y, v);
      }
      this.BuffLock--;
      m?.Stop();
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    if (p) {
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(p, 1, e, e, this.Entity, p, t);
    }
    var b = this.GetStackableBuff(o ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, e, f.StackingType);
    var t = this.CalculateBuffStackMax(e);
    if (!b) {
      let t = undefined;
      if (f.DurationPolicy === 0) {
        C = ActiveBuffConfigs_1.SUCCESS_INSTANT_BUFF_HANDLE;
        u = ActiveBuffConfigs_1.INFINITY_DURATION;
      } else {
        C = C ?? CharacterBuffController_1.default.GenerateHandle();
      }
      try {
        t = ActiveBuff_1.ActiveBuffInternal.AllocBuff(f, C, o, this, B, a, n, i, y, u, s);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff初始过程中发生异常", t, ...g);
      }
      if (!t) {
        this.BuffLock--;
        m?.Stop();
        return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
      }
      if (!BaseBuffComponent_1.NoLogBuffSet.has(e)) {
        CombatLog_1.CombatLog.Info("Buff", this.Entity, "本地添加buff", ...g, ["handle", C], ["前置行为id", a], ["说明", f.Desc], ["是否迭代", d], ["层数", y], ["bulletMessage", v]);
      }
      try {
        this.OnBuffAdded(t, r, s, a, u, h, B, l, d, _, c);
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
    if (b.Config && (t <= 0 || !b.Config.DenyOverflowAdd || b.StackCount < t)) {
      if (f.StackAppendCount > 0) {
        y = f.StackAppendCount;
      }
      n = b.StackCount;
      v = Math.min(n + y, t);
      try {
        this.OnBuffStackIncreased(b, n, v, o ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, i, r, s, a, u, B, d, _, c);
        for (const M of b.Config.EffectInfos) {
          M.ExecutionEffect?.OnBuffAddedCallback(b, d);
        }
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff层数改变中发生异常", t, ...g);
      }
    }
    SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 3, e, e, b.Handle);
    this.BuffLock--;
    m?.Stop();
    return b.Handle;
  }
  RemoveBuff(t, e, f, o, i) {
    if (this.HasBuffAuthority()) {
      this.RemoveBuffLocal(t, e, f, o, i);
    } else {
      this.RemoveBuffOrder(t, e, f);
      if (clientForceRemoveBuffId.includes(t) && (o = this.GetBuffById(t))) {
        this.RemoveBuffInner(o.Handle, -1, true, "客户端特判提前移除buff");
      }
    }
  }
  RemoveBuffOrder(t, e, f) {}
  RemoveBuffLocal(t, e, f, o, i) {
    if (t <= ActiveBuffConfigs_1.NULL_BUFF_ID) {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "尝试本地移除buff时传入了不合法的buffId", ["buffId", t], ["持有者", this.GetDebugName()], ["原因", f]);
      return 0;
    }
    if (!this.HasBuffAuthority()) {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "无法直接移除非本端控制实体持有的buff，请换用RemoveBuff接口", ["buffId", t], ["持有者", this.GetDebugName()], ["原因", f]);
      return 0;
    }
    let r = 0;
    for (const s of [...this.GetAllBuffById(t)]) {
      r = this.RemoveBuffInner(s.Handle, e, true, f, o, i);
    }
    return r;
  }
  RemoveBuffByTagLocal(e, t) {
    if (this.HasBuffAuthority()) {
      var f = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e);
      for (const o of this.BuffContainer.values()) {
        if (o.Config.GrantedTags?.some(t => GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, e))) {
          this.RemoveBuffInner(o.Handle, -1, true, t ?? "移除tag " + f);
        }
      }
    } else {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "尝试根据tag移除非本地控制的实体的buff，移除操作将不被执行", ["tagId", e], ["tagName", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)], ["持有者", this.GetDebugName()], ["原因", t]);
    }
  }
  RemoveBuffByEffectType(t, e) {
    var f = new Set();
    var o = (0, ExtraEffectDefine_1.getBuffEffectClass)(t);
    if (o) {
      for (const i of this.BuffEffectManager.GetAllEffects()) {
        if (i instanceof o) {
          f.add(i.BuffId);
        }
      }
      for (const r of f.values()) {
        this.RemoveBuff(r, -1, e);
      }
    }
  }
  RemoveBuffByHandle(t, e = -1, f, o, i) {
    var r;
    if (!this.HasBuffAuthority()) {
      if ((r = this.GetBuffByHandle(t)) && r.Id > 0) {
        CombatLog_1.CombatLog.Warn("Buff", this.Entity, "尝试直接通过handle移除非本端控制buff，后续需要新增协议", ["buffId", r?.Id], ["handle", t], ["持有者", this.GetDebugName()], ["说明", r?.Config?.Desc], ["原因", f]);
      }
    }
    return this.RemoveBuffByHandleLocal(t, e, f, o, i);
  }
  RemoveBuffByHandleLocal(t, e = -1, f, o, i) {
    return this.RemoveBuffInner(t, e, true, f, o, i);
  }
  RemoveBuffWhenTimeout(t) {
    var e = t.Config.StackExpirationRemoveNumber;
    this.RemoveBuffInner(t.Handle, e, false, "时间结束自然移除");
    if (e > 0 && t.IsValid()) {
      t.SetDuration();
    }
  }
  RemoveBuffInner(t, e, f, o, i, r) {
    t = this.GetBuffByHandle(t);
    if (!t) {
      return 0;
    }
    this.BuffLock++;
    var s = [["buffId", t.Id], ["持有者", this.GetDebugName()], ["handle", t?.Handle], ["说明", t?.Config.Desc], ["原因", o]];
    if (!BaseBuffComponent_1.NoLogBuffSet.has(t.Id)) {
      CombatLog_1.CombatLog.Info("Buff", this.Entity, "本地移除buff", ...s);
    }
    var a = t.StackCount;
    let n = e <= 0 ? 0 : Math.max(0, a - e);
    if (n <= 0) {
      try {
        this.OnBuffRemoved(t, f, o, r, i);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff移除时发生异常", t, ...s);
      }
    } else {
      if (!f && this.HasBuffRoutineExpirationLock(t.Id)) {
        n = a;
      }
      try {
        this.OnBuffStackDecreased(t, a, n, f, o);
      } catch (t) {
        CombatLog_1.CombatLog.ErrorWithStack("Buff", this.Entity, "Buff层数降低时发生异常", t, ...s);
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
  HasBuff(t) {
    return this.GetBuffById(t) !== undefined;
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
        for (const o of e) {
          var f = this.BuffContainer.get(o);
          if (f) {
            if (f.IsActive() && !this.BuffGarbageSet.has(f.Handle)) {
              return f;
            }
          } else {
            e.delete(o);
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
        for (const o of e) {
          var f = this.BuffContainer.get(o);
          if (f) {
            if (!this.BuffGarbageSet.has(f.Handle)) {
              return f;
            }
          } else {
            e.delete(o);
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
        for (const o of e) {
          var f = this.BuffContainer.get(o);
          if (f) {
            if (!this.BuffGarbageSet.has(f.Handle)) {
              yield f;
            }
          } else {
            e.delete(o);
          }
        }
      }
    }
  }
  GetBuffHandleByEffectId(t) {
    var e;
    var f;
    var o = new Set();
    for ([e, f] of this.BuffContainer.entries()) {
      if (!this.BuffGarbageSet.has(e)) {
        for (const i of f.Config.EffectInfos) {
          if (i.ExtraEffectId === t) {
            o.add(e);
            break;
          }
        }
      }
    }
    return o;
  }
  GetBuffLevel(t) {}
  GetStackableBuff(t, e, f) {
    BaseBuffComponent_1.pu_.Start();
    switch (f) {
      case 2:
        var o = this.GetBuffById(e);
        BaseBuffComponent_1.pu_.Stop();
        return o;
      case 1:
        var i = this.BuffIdToHandleMap.get(e);
        if (i) {
          if (i.size === 0) {
            this.BuffIdToHandleMap.delete(e);
          } else {
            for (const s of i) {
              var r = this.BuffContainer.get(s);
              if (r) {
                if (!this.BuffGarbageSet.has(r.Handle) && r.InstigatorId === t) {
                  BaseBuffComponent_1.pu_.Stop();
                  return r;
                }
              } else {
                i.delete(s);
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
    let o = 0;
    for (const r of f) {
      var i = this.BuffContainer.get(r);
      if (i) {
        if (!this.BuffGarbageSet.has(i.Handle) && (!e || !!i.IsActive())) {
          o += i.StackCount;
        }
      } else {
        f.delete(r);
      }
    }
    return o;
  }
  OnBuffAdded(e, t, f, o, i, r, s, a, n, u, h) {
    if (e) {
      var B = e.Config;
      if (e.IsInstantBuff()) {
        this.ApplyPeriodExecution(e);
      } else {
        var c = e.Handle;
        this.BuffContainer.set(c, e);
        let t = this.BuffIdToHandleMap.get(e.Id);
        if (!t) {
          this.BuffIdToHandleMap.set(e.Id, t = new Set());
        }
        t.add(c);
        this.MarkListenerBuff(e);
        this.BuffEffectManager.OnBuffAdded(e);
      }
      if (this.NeedCheck(e.Config)) {
        this.OnBuffActiveChanged(e, r ?? this.CheckActivate(e.Config, e.GetInstigator()));
      } else if (r === undefined) {
        CombatLog_1.CombatLog.Error("Buff", this.Entity, "buff激活状态未知", ["buffId", e.Id], ["handle", e.Handle]);
      } else {
        this.OnBuffActiveChanged(e, r);
      }
      if (e.IsActive() && B && B.Period > 0 && B.ExecutePeriodicOnAdd) {
        e.ResetPeriodTimer(TimerSystem_1.MIN_TIME * CommonDefine_1.SECOND_PER_MILLIONSECOND);
      }
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        this.Entity.GetComponent(27)?.OnBuffAdded(e);
        this.Entity.GetComponent(22)?.OnBuffAdded(e);
      }
      this.CheckWhenBuffChanged(e.Id);
      for (const l of e.Config.EffectInfos) {
        l.ExecutionEffect?.OnBuffAddedCallback(e, n);
      }
      e.OnTimeScaleChanged(this.GetTimeScale(), this.IsPaused());
    }
  }
  ApplyPeriodExecution(t) {
    var e = t.Config;
    var f = t.GetInstigatorAttributeSet();
    if (e.Modifiers && e.Modifiers.length > 0) {
      var o = this.GetAttributeComponent();
      if (o) {
        var i;
        var r;
        var s = this.GetTimeScale();
        for ([i, r] of t.StateModifiers) {
          if (this.HasBuffAuthority()) {
            ActiveBuff_1.ActiveBuffInternal.ModifyStateAttribute(f, o, i, t.Level, s, t.StackCount, r);
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
  OnBuffRemoved(t, e, f, o, i) {
    if (t) {
      var r = t.Handle;
      var s = t.StackCount;
      this.RemoveListenerBuff(t);
      this.BuffGarbageSet.add(r);
      t.Destroy();
      this.CheckWhenBuffChanged(t.Id);
      this.BuffEffectManager.OnBuffRemoved(t, e);
      var r = t.GetInstigatorBuffComponent();
      if ((r === undefined || r.Valid) && this.HasBuffAuthority()) {
        r = e ? t.Config?.PrematureExpirationEffects : t.Config?.RoutineExpirationEffects;
        if (r) {
          for (const a of r) {
            this.AddIterativeBuff(a, t, undefined, true, `因为Buff${t.Id}移除导致的添加`);
          }
        }
        r = t.Config.BuffsAddedByStackCountOnRemoved;
        if (e && r && (e = r[s - 1])) {
          this.AddIterativeBuff(e, t, undefined, true, `buff${t.Id}移除时根据buff层数获取指定buff`);
        }
      }
    }
  }
  OnBuffStackDecreased(t, e, f, o, i, r = 0) {
    if (t) {
      BaseBuffComponent_1.m__.Start();
      t.SetStackCount(f, r);
      this.CheckWhenBuffChanged(t.Id);
      this.BuffEffectManager.OnStackDecreased(t, f, e, o);
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(this.Entity, 0, t.Id, t.Id, e, f, this.Entity);
      BaseBuffComponent_1.m__.Stop();
    }
  }
  OnBuffStackIncreased(t, e, f, o, i, r, s, a, n, u, h, B, c, l = 0, d = 0) {
    if (t) {
      BaseBuffComponent_1.C__.Start();
      t.SetStackCount(f, d);
      if (l === 0 && t.Config.StackDurationRefreshPolicy === 0 && (!!this.NeedCheck(t.Config) || s !== Protocol_1.Aki.Protocol.uFs.Proto_Common)) {
        t.SetDuration(n);
      }
      var d = t.Config;
      var _ = t.Handle;
      if (d) {
        t.Id;
        this.BuffEffectManager.OnStackIncreased(t, f, e, o);
        if (this.HasBuffAuthority()) {
          l = d.StackLimitCount > 0 ? d.StackLimitCount : Infinity;
          if (l <= e && l <= f) {
            s = d.OverflowEffects;
            if (s && s.length > 0) {
              for (const C of s) {
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
    if (this.iWc.has(t)) {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "Tag变更循环派发", ["tagId", t]);
    } else {
      this.iWc.add(t);
      this.CheckWhenTagChanged(t);
      this.iWc.delete(t);
    }
  }
  get BuffLock() {
    return this.Mbr;
  }
  set BuffLock(t) {
    if ((this.Mbr = t) <= 0 && this.BuffGarbageSet.size > 0) {
      for (const o of this.BuffGarbageSet) {
        var e;
        var f = this.BuffContainer.get(o);
        this.BuffContainer.delete(o);
        if (f) {
          if ((e = this.BuffIdToHandleMap.get(f.Id)) && (e.delete(o), e.size === 0)) {
            this.BuffIdToHandleMap.delete(f.Id);
          }
          ActiveBuff_1.ActiveBuffInternal.ReleaseBuff(f);
        }
      }
      this.BuffGarbageSet.clear();
    }
  }
  AddTrigger(t, e, f) {
    let o = this.TriggerMap.get(e);
    if (!o) {
      this.TriggerMap.set(e, o = []);
    }
    o.push(f);
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
      for (const o of [...t]) {
        o.TryExecute(f, e);
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
    var o = CharacterBuffController_1.default.CreateDynamicBuffRef();
    o.GameplayCueIds = t;
    o.Desc = f;
    o.DurationPolicy = e === 0 ? 0 : e < 0 ? 1 : 2;
    if (e > 0) {
      o.DurationCalculationPolicy = [0];
      o.DurationMagnitude = [e];
    }
    var t = this.AddBuffInner(ActiveBuffConfigs_1.DYNAMIC_BUFF_ID, o, undefined, 1, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, e, undefined, ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID, f, false, true, false, undefined);
    BaseBuffComponent_1.Sbr.Stop();
    return t;
  }
  static BroadcastAddBuffNotify(t, e, f) {
    BaseBuffComponent_1.Wbr.Start();
    var o = e.uVn;
    var i = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    var r = MathUtils_1.MathUtils.LongToNumber(e.Rjn);
    var t = t?.GetComponent(210);
    var s = MathUtils_1.MathUtils.LongToBigInt(f?.X8n ?? -1);
    var f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
    if (t?.Valid) {
      var a = CharacterBuffController_1.default.GetBuffDefinition(i);
      if (t && a && o !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
        const n = t.GetTagComponent();
        if (n) {
          a.RemoveBuffWithTags?.forEach(t => {
            n.RemoveTag(t);
          });
        }
        t.AddBuffRemote(i, o, {
          IsActive: e.WHn,
          InstigatorId: r,
          Level: e.F6n,
          ApplyType: e.xjn,
          PreMessageId: s,
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
    var o = MathUtils_1.MathUtils.LongToNumber(e.b6n);
    if (t && f) {
      SceneTeamController_1.SceneTeamController.EmitAbilityEvent(f, 2, o, o, t, f, e.Bjn, MathUtils_1.MathUtils.LongToBigInt(e.ZG1?.JG1 ?? 0));
    }
  }
  static BroadcastBuffStackChangedNotify(t, e) {
    var f;
    var o;
    var i = e.cVn;
    var r = e.Gjn;
    var s = t?.GetComponent(210);
    var a = s?.GetBuffByHandle(i);
    if (s && a && (a.StackCount > r ? s.OnBuffStackDecreased(a, a.StackCount, r, true, "远端Buff层数变化通知", e.WL1 ? 1 : 0) : a.StackCount <= r && (f = MathUtils_1.MathUtils.LongToNumber(e.Rjn ?? 0), o = undefined, (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(f)?.Entity) && SceneTeamController_1.SceneTeamController.EmitAbilityEvent(o, 1, a.Id, a.Id, s.Entity, o), SceneTeamController_1.SceneTeamController.EmitAbilityEvent(t, 3, a.Id, a.Id, i), s.OnBuffStackIncreased(a, a.StackCount, r, a.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, a.Level, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, a.ServerId, false, false, "远端Buff层数变化通知", e.$L1 ? 1 : 0, e.WL1 ? 1 : 0)), (f = e.n5n) !== undefined && a.SetDuration(f), (o = e.QEs) !== undefined)) {
      a.SetRemainDuration(o);
    }
  }
  static BroadcastRemoveBuffNotify(t, e) {
    var f = e.uVn;
    var o = t?.GetComponent(210);
    if (o?.Valid) {
      o?.RemoveBuffInner(f, -1, true, "远端通知移除buff");
    } else {
      CombatLog_1.CombatLog.Warn("Buff", t, "Invalid entity when processing RemoveGameplayEffectNotify", ["entity id", e.F4n], ["handle", e.uVn]);
    }
  }
  static BuffDurationNotify(t, e) {
    var f = e.cVn;
    var t = t?.GetComponent(210);
    var f = t?.GetBuffByHandle(f);
    if (t && f && (t = e.n5n, e = e.QEs, t !== undefined && f.SetDuration(t), e !== undefined)) {
      f.SetRemainDuration(e);
    }
  }
  static OrderAddBuffS2cNotify(t, e, f) {
    var o = t?.GetComponent(210);
    var i = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    var r = MathUtils_1.MathUtils.LongToNumber(e.Rjn);
    var f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
    var s = CharacterBuffController_1.default.GetBuffDefinition(i);
    var a = new Protocol_1.Aki.Protocol.G4n();
    if (t && o?.Valid && s) {
      const n = o.GetTagComponent();
      if (n) {
        s.RemoveBuffWithTags?.forEach(t => {
          n.RemoveTag(t);
        });
      }
      s = o.AddBuffInner(i, CharacterBuffController_1.default.GetBuffDefinition(i), r, e.F6n, e.Bjn, e.xjn, f, undefined, e.n5n, undefined, e.wjn, "远端请求添加玩家Buff(s2c)", false, e.Pjn, true, undefined);
      i = o.BuffContainer.get(s);
      a.uVn = s;
      a.WHn = !!i?.IsActive();
      a.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs;
    } else {
      a.Q4n = Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
    }
    CombatMessage_1.CombatNet.Send(NetDefine_1.ECombatPushDataMessage.G4n, t, a, f, undefined, true);
  }
  static OrderRemoveBuffS2cNotify(t, e, f) {
    var o = t?.GetComponent(210);
    var f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
    o?.RemoveBuffByHandle(e.uVn, e.Bjn, "远端请求移除buff(s2c)", f, true);
    var o = new Protocol_1.Aki.Protocol.O4n();
    o.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs;
    CombatMessage_1.CombatNet.Send(NetDefine_1.ECombatPushDataMessage.O4n, t, o, f, undefined, true);
  }
  static OrderRemoveBuffByIdS2cNotify(t, e, f) {
    var o = t?.GetComponent(210);
    var i = MathUtils_1.MathUtils.LongToNumber(e.b6n);
    var f = MathUtils_1.MathUtils.LongToBigInt(f?.$8n ?? -1);
    var r = new Protocol_1.Aki.Protocol.N4n();
    if (o?.Valid) {
      o.RemoveBuff(i, e.Bjn, "远端移除buff(s2c) reason=" + e.x9n, f, true);
      r.Q4n = Protocol_1.Aki.Protocol.Q4n.KRs;
    } else {
      CombatLog_1.CombatLog.Warn("Buff", t, "Invalid entity when processing RemoveBuffByIdS2cRequestNotify", ["entity id", t?.Id], ["buffId", i]);
      r.Q4n = Protocol_1.Aki.Protocol.Q4n.Proto_UnKnownError;
    }
    CombatMessage_1.CombatNet.Send(NetDefine_1.ECombatPushDataMessage.N4n, t, r, f, undefined, true);
  }
  static OrderAddBuffNotify(t, e, f) {
    var o;
    var i = t?.CheckGetComponent(210);
    if (i) {
      if (i) {
        o = MathUtils_1.MathUtils.LongToNumber(e.s5n);
        i.AddBuffLocal(o, {
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
    var f = t?.GetComponent(210);
    var o = MathUtils_1.MathUtils.LongToNumber(e.s5n);
    if (f) {
      f.RemoveBuffLocal(o, e.Bjn, "服务端或其它客户端请求本端移除buff");
    } else {
      f = CharacterBuffController_1.default.GetBuffDefinition(o);
      CombatLog_1.CombatLog.Error("Buff", t, "[order] 移除Buff请求找不到对应实体", ["buffId", o], ["持有者", t?.Id], ["说明", f?.Desc]);
    }
  }
  static OrderRemoveBuffByTagsNotify(t, e) {
    var f = t?.GetComponent(210);
    if (f) {
      for (const i of e.bjn) {
        var o = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(i);
        f.RemoveBuffByTagLocal(i, `远端请求根据tag ${o} 移除buff`);
      }
    } else {
      CombatLog_1.CombatLog.Error("Buff", t, "[order] 根据tag移除Buff请求找不到对应实体", ["tagId", e?.bjn.map(t => GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t))]);
    }
  }
  static BroadcastActivateBuffNotify(t, e) {
    var f = t?.GetComponent(210);
    var o = e.uVn;
    var i = e.qjn;
    var r = f?.GetBuffByHandle(o);
    if (!f || f.HasBuffAuthority()) {
      CombatLog_1.CombatLog.Warn("Buff", t, "主端收到了非主控端发来的buff激活状态变更请求，或找不到Buff持有者，将不做处理", ["handle", o], ["buffId", r?.Id], ["本地激活状态", i], ["远端激活状态", e.qjn]);
    } else {
      f.OnBuffActiveChanged(r, i);
    }
  }
  AddBuffTimeModifier(e, f, o, i, r) {
    if (o !== 0 || i !== 0) {
      r = r ? this.InstigatorBuffTimeModifiers : this.OwnerBuffTimeModifiers;
      let t = r.get(e);
      if (!t) {
        r.set(e, t = new Map());
      }
      t.set(f, [o, i]);
    }
  }
  RemoveBuffTimeModifier(t, e, f) {
    var f = f ? this.InstigatorBuffTimeModifiers : this.OwnerBuffTimeModifiers;
    var o = f.get(t);
    if (o && (o.delete(e), o.size <= 0)) {
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
    let o = 0;
    for ([, f] of e.values()) {
      o += f;
    }
    return o;
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
    let o = 0;
    for ([f] of e.values()) {
      o += f;
    }
    return o;
  }
  OnRefreshBuffDuration(t, e) {
    var f = Protocol_1.Aki.Protocol.GG1.create();
    f.$As = t;
    CombatMessage_1.CombatNet.Send(23237, this.Entity, f);
    for (const o of t) {
      for (const i of this.GetAllBuffById(o)) {
        i.SetDuration();
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
  AddBuffStackModifier(e, f, o) {
    if (this.CheckBuffStackChangeable(e) && o !== 0) {
      let t = this.BuffStackModifiers.get(e);
      if (!t) {
        this.BuffStackModifiers.set(e, t = new Map());
      }
      t.set(f, o);
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
      for (const o of t.values()) {
        f += o;
      }
    }
    return Math.max(1, e.Config.StackLimitCount + f);
  }
  RefreshBuffStack(t) {
    var e;
    var f = this.GetBuffById(t);
    if (f && (e = f.StackCount, (t = this.CalculateBuffStackMax(t)) < e)) {
      this.OnBuffStackDecreased(f, e, t, true, "buff层数修改器导致");
    }
  }
  CheckBuffStackChangeable(t) {
    t = CharacterBuffController_1.default.GetBuffDefinition(t);
    return !!t && t.StackLimitCount > 0;
  }
  ChangeBuffStack(t, e, f, o, i) {
    if (this.HasBuffAuthority()) {
      for (const a of this.GetAllBuffById(t)) {
        var r = a.StackCount;
        var s = this.CalculateBuffStackMax(t);
        var s = Math.min(r + o, s);
        if (s <= 0) {
          this.RemoveBuffInner(a.Handle, -1, true, i);
        } else if (s < r) {
          this.OnBuffStackDecreased(a, r, s, true, i, f);
        } else if (r < s) {
          this.OnBuffStackIncreased(a, r, s, a.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, a.Level, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, a.ServerId, false, false, i, e, f);
        }
      }
    }
  }
  CreateGameplayCueByBuff(t) {
    const f = this.GetCueComponent();
    if (f && t.IsActive()) {
      const o = t.Handle;
      if (!this.Buff2CueMap.has(o)) {
        t.Config.GameplayCueIds?.forEach(e => {
          e = f.AddCue(e, {
            Buff: t,
            Instant: t.IsInstantBuff(),
            Instigator: ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t.GetInstigator())
          });
          if (![GameplayCueController_1.INSTANT_CUE_HANDLE, GameplayCueController_1.INVALID_CUE_HANDLE].includes(e)) {
            let t = this.Buff2CueMap.get(o);
            if (!t) {
              this.Buff2CueMap.set(o, t = []);
            }
            t.push(e);
          }
        });
      }
    }
  }
  DestroyGameplayCueByBuff(t) {
    const e = this.GetCueComponent();
    var f;
    if (e && (t = t.Handle, f = this.Buff2CueMap.get(t))) {
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
__decorate([CombatMessage_1.CombatNet.Listen("HFn", false)], BaseBuffComponent, "OrderAddBuffNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("jFn", false)], BaseBuffComponent, "OrderRemoveBuffNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("KFn", false)], BaseBuffComponent, "OrderRemoveBuffByTagsNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("WFn", false)], BaseBuffComponent, "BroadcastActivateBuffNotify", null);
BaseBuffComponent = BaseBuffComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(210)], BaseBuffComponent);
exports.BaseBuffComponent = BaseBuffComponent; //# sourceMappingURL=BaseBuffComponent.js.map