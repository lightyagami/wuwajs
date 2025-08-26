"use strict";

var CharacterBuffComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, r) {
  var f;
  var i = arguments.length;
  var a = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, o, r);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (f = t[s]) {
        a = (i < 3 ? f(a) : i > 3 ? f(e, o, a) : f(e, o)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(e, o, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterBuffComponent = undefined;
const Info_1 = require("../../../../../../Core/Common/Info");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const BaseBuffComponent_1 = require("./BaseBuffComponent");
const ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterBuffController_1 = require("./CharacterBuffController");
const ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes");
const ExtraEffectManager_1 = require("./ExtraEffect/ExtraEffectManager");
const NO_BROADCAST_CD_THRESHOLD = 10000;
let CharacterBuffComponent = CharacterBuffComponent_1 = class CharacterBuffComponent extends BaseBuffComponent_1.BaseBuffComponent {
  constructor() {
    super(...arguments);
    this.ActorComponent = undefined;
    this.AttributeComponent = undefined;
    this.DeathComponent = undefined;
    this.TagComponent = undefined;
    this.TimeScaleComponent = undefined;
    this.CueComponent = undefined;
    this.PauseLocks = new Set();
    this.BuffEffectManager = undefined;
    this.Vbr = false;
    this.Hbr = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
  }
  GetDebugName() {
    return (this.CreatureDataComponent?.GetCreatureDataId() ?? "非正常实体(entity id=" + this.Entity?.Id) + "";
  }
  GetEntity() {
    return this.Entity;
  }
  AddPauseLock(t) {
    this.PauseLocks.add(t);
    this.RefreshTimeScale();
  }
  RemovePauseLock(t) {
    this.PauseLocks.delete(t);
    this.RefreshTimeScale();
  }
  IsPaused() {
    return this.PauseLocks.size > 0;
  }
  GetTimeScale() {
    return this.Entity.TimeDilation * (this.TimeScaleComponent?.CurrentTimeScale ?? 1);
  }
  GetLogicTimeScale() {
    return this.Entity.TimeDilation * (this.TimeScaleComponent?.GetTopForeverTimeScale(0) ?? 1);
  }
  GetAttributeComponent() {
    return this.AttributeComponent;
  }
  GetTagComponent() {
    return this.TagComponent;
  }
  GetSkillComponent() {
    return this.Entity.GetComponent(39);
  }
  GetActorComponent() {
    return this.ActorComponent;
  }
  GetCueComponent() {
    return this.CueComponent;
  }
  get CreatureDataId() {
    return this.CreatureDataComponent.GetCreatureDataId();
  }
  OnInitData() {
    this.BuffEffectManager = new ExtraEffectManager_1.ExtraEffectManager(this);
    return true;
  }
  OnInit() {
    super.OnInit();
    this.ActorComponent = this.Entity.CheckGetComponent(1);
    this.AttributeComponent = this.Entity.CheckGetComponent(174);
    this.TagComponent = this.Entity.CheckGetComponent(206);
    this.CueComponent = this.Entity.GetComponent(21);
    this.DeathComponent = this.Entity.GetComponent(15);
    this.TimeScaleComponent = this.Entity.GetComponent(123);
    return true;
  }
  OnStart() {
    this.BuffEffectManager?.Clear();
    return true;
  }
  InitBornBuff() {
    CharacterBuffComponent_1.jbr.Start();
    var t = this.CreatureDataComponent.ComponentDataMap;
    var e = t.get("mys")?.mys?.MIs;
    if (e && this.HasBuffAuthority()) {
      for (const _ of e) {
        var o = MathUtils_1.MathUtils.LongToNumber(_.Rjn);
        var r = _.$8n ? MathUtils_1.MathUtils.LongToBigInt(_.$8n) : undefined;
        var f = MathUtils_1.MathUtils.LongToNumber(_.b6n);
        this.AddBuffLocal(f, {
          InstigatorId: o,
          Level: _.F6n,
          ApplyType: _.xjn,
          PreMessageId: r,
          Duration: _.n5n,
          IsIterable: _.Pjn,
          OuterStackCount: _.Bjn,
          ServerId: _.wjn,
          IsServerOrder: true,
          Reason: "服务端或其它客户端请求添加Buff(缓冲) messageId=" + r,
          BornBuff: true
        });
      }
    }
    e = t.get("vys")?.vys;
    if (e !== undefined) {
      var t = e.EIs;
      var i = e.SIs;
      if (t) {
        for (const B of t) {
          var a = MathUtils_1.MathUtils.LongToNumber(B.b6n);
          for (let t = 0; t < B.GTs.length; t++) {
            this.SetBuffEffectCd(a, t, B.GTs[t] * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          }
        }
      }
      if (i) {
        for (const l of i) {
          var s = l;
          var n = MathUtils_1.MathUtils.LongToNumber(s.b6n ?? -1);
          var u = MathUtils_1.MathUtils.LongToNumber(s.Rjn);
          var h = s.cVn ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
          this.AddBuffRemote(n, h, {
            Level: s.F6n,
            InstigatorId: u,
            ApplyType: s.xjn,
            Duration: s.n5n,
            RemainDuration: s.QEs,
            IsActive: s.WHn,
            ServerId: s.wjn,
            OuterStackCount: s.Bjn,
            Reason: "服务器通过通知FightBuffComponent恢复Buff",
            MessageId: MathUtils_1.MathUtils.LongToBigInt(s.$8n),
            BornBuff: true
          });
          this.BuffContainer.get(h)?.SetRemainDuration(s.QEs);
        }
      }
      var t = e.Zzc;
      var C = MathUtils_1.MathUtils.LongToBigInt(e.Znd);
      if (t) {
        for (const d of t) {
          var c = MathUtils_1.MathUtils.LongToNumber(d ?? -1);
          this.AddBuff(c, {
            InstigatorId: this.CreatureDataId,
            Reason: "客户端出生buff",
            PreMessageId: C
          });
        }
      }
    }
    CharacterBuffComponent_1.jbr.Stop();
  }
  OnClear() {
    this.TriggerMap.clear();
    for (const t of [...this.BuffContainer.values()]) {
      t.Destroy();
    }
    this.PauseLocks.clear();
    super.OnClear();
    return true;
  }
  OnActivate() {
    for (const t of this.GetAllBuffs()) {
      this.CreateGameplayCueByBuff(t);
    }
    this.Vbr = true;
    this.InitBornBuff();
  }
  HasBuffAuthority() {
    var t;
    return !this.CreatureDataComponent || this.CreatureDataComponent.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster && !!this.DeathComponent?.IsDead() || (t = this.CreatureDataComponent?.GetSummonerPlayerId(), ModelManager_1.ModelManager.PlayerInfoModel.GetId() === t);
  }
  NeedAddBuffOrder(t) {
    t = CharacterBuffController_1.default.GetBuffDefinition(t);
    return !!t && (t.FormationPolicy !== 5 || !this.CreatureDataComponent?.IsMonster() || this.CreatureDataComponent?.GetSummonerPlayerId() !== 0);
  }
  AddBuffWithServerId(e, o, r, f, i) {
    if (!(e <= ActiveBuffConfigs_1.NULL_BUFF_ID)) {
      for (let t = 0; t < r; t++) {
        var a = this.AddBuffLocal(e, {
          InstigatorId: this.CreatureDataId,
          Level: o,
          Duration: ActiveBuffConfigs_1.DEFAULT_SERVER_GE_DURATION,
          ServerId: f,
          Reason: i
        });
        var s = CharacterBuffController_1.default.GetBuffDefinition(e);
        if (a === ActiveBuffConfigs_1.INVALID_BUFF_HANDLE) {
          CombatLog_1.CombatLog.Error("Buff", this.Entity, "系统buff添加失败", ["buffId", e], ["serverId", f], ["持有者", this.GetDebugName()], ["说明", s?.Desc]);
        }
      }
    }
  }
  RemoveBuffByServerIdLocal(t, e) {
    if (this.HasBuffAuthority()) {
      for (const r of [...this.BuffContainer.values()]) {
        var o = r.Handle;
        if (!this.BuffGarbageSet.has(o)) {
          if (r.ServerId === t) {
            this.RemoveBuffInner(o, -1, true, e);
          }
        }
      }
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "[buffComp] 服务端通知移除非本客户端控制角色持有的系统Buff，需要服务端检查协议是否下发正确", ["buffId", t], ["持有者", this.GetDebugName()]);
    }
  }
  RemoveBuffByTagName(t, e = undefined) {
    t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
    if (t !== undefined) {
      this.RemoveBuffByTag(t, e);
    }
  }
  RemoveBuffByTag(r, f = undefined) {
    var t;
    if (r !== undefined) {
      if (this.HasBuffAuthority()) {
        this.RemoveBuffByTagLocal(r, f);
      } else {
        (t = Protocol_1.Aki.Protocol.Y3n.create()).bjn = [r];
        CombatMessage_1.CombatNet.Call(15831, this.Entity, t, t => {
          if (t?.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist) {
            var e = GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(r);
            for (const o of this.BuffContainer.values()) {
              if (o.Config.GrantedTags?.some(t => GameplayTagUtils_1.GameplayTagUtils.IsChildTag(t, r))) {
                this.RemoveBuffInner(o.Handle, -1, true, f ?? "移除tag " + e);
              }
            }
          }
        });
      }
    }
  }
  RemoveAllBuffs(t) {
    if (this.HasBuffAuthority()) {
      for (const e of [...this.BuffContainer.keys()]) {
        this.RemoveBuffByHandle(e, -1, t);
      }
    } else {
      for (const o of this.BuffContainer.values()) {
        if (o?.IsValid()) {
          this.RemoveBuffOrder(o.Id, -1, t);
        }
      }
    }
  }
  RemoveAllBuffsByInstigator(t, e) {
    var o = t?.CreatureDataId;
    var t = [...this.BuffContainer.keys()];
    if (this.HasBuffAuthority()) {
      for (const f of t) {
        if (this.GetBuffByHandle(f)?.InstigatorId === o) {
          this.RemoveBuffByHandle(f, -1, e);
        }
      }
    } else {
      for (const i of t) {
        var r = this.GetBuffByHandle(i);
        if (r?.InstigatorId === o) {
          this.RemoveBuffOrder(r.Id, -1, e);
        }
      }
    }
  }
  RemoveAllDurationBuffs(t) {
    var e = [];
    for (const o of this.BuffContainer.values()) {
      if (o.Config.DurationPolicy === 2 && o.Config.DeadRemove) {
        e.push(o.Handle);
      }
    }
    for (const r of e) {
      this.RemoveBuffByHandle(r, -1, t);
    }
  }
  GetBuffLevel(t) {
    var e = this.Entity.GetComponent(96)?.GetSkillLevelByBuffId(t);
    if (e !== undefined && e > 0 || (e = this.Entity.GetComponent(43)?.GetVisionLevelByBuffId(t)) !== undefined && e > 0) {
      return e;
    } else {
      return undefined;
    }
  }
  OnBuffAdded(t, e, o, r, f, i, a, s, n, u, h) {
    if (t) {
      CharacterBuffComponent_1.T__.Start();
      this.BroadcastAddBuff(t, o, u, s, h);
      var C = t.Config;
      super.OnBuffAdded(t, e, o, r, f, i, a, s, n, u, h);
      if (C.RemoveBuffWithTags && C.RemoveBuffWithTags.length > 0) {
        const h = `因为buff${t.Id}(handle=${t.Handle})的RemoveBuffWithTags导致移除`;
        for (const c of C.RemoveBuffWithTags) {
          if (this.HasBuffAuthority()) {
            this.RemoveBuffByTag(c, h);
          }
          this.TagComponent.RemoveTag(c);
        }
      }
      if (this.Vbr) {
        this.CreateGameplayCueByBuff(t);
      }
      if (n) {
        this.ShareApplyBuffInner(t, e, o, t.MessageId, f, a);
      }
      CharacterBuffComponent_1.T__.Stop();
    }
  }
  ShareApplyBuffInner(t, e, o, r, f, i) {
    var a;
    var s;
    var n;
    if (this.HasBuffAuthority() && (a = this.CreatureDataComponent?.GetSummonerId()) && t.Config?.FormationPolicy === 4 && (a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a)?.Entity?.GetComponent(175))) {
      s = t.Id;
      n = t.Handle;
      a.AddBuffLocal(s, {
        InstigatorId: t.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
        Level: t.Level,
        OuterStackCount: e,
        ApplyType: o,
        PreMessageId: r,
        Duration: f,
        ServerId: i,
        IsIterable: false,
        Reason: `因为buff${s}(handle=${n})的队伍共享机制导致的buff添加`
      });
    }
  }
  OnBuffRemoved(t, e, o, r, f) {
    if (t) {
      CharacterBuffComponent_1.b__.Start();
      this.BroadcastRemoveBuff(t, e, r, f);
      super.OnBuffRemoved(t, e, o, r, f);
      if (this.Vbr) {
        this.DestroyGameplayCueByBuff(t);
      }
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        this.Entity.GetComponent(27)?.OnBuffRemoved(t);
        this.Entity.GetComponent(22)?.OnBuffRemoved(t);
      }
      CharacterBuffComponent_1.b__.Stop();
    }
  }
  OnBuffStackIncreased(t, e, o, r, f, i, a, s, n, u, h, C, c, _ = 0, B = 0) {
    if (t) {
      CharacterBuffComponent_1.L__.Start();
      this.BroadcastBuffStackChanged(t, e, o, false, _, B, c, r);
      super.OnBuffStackIncreased(t, e, o, r, f, i, a, s, n, u, h, C, c, _, B);
      if (this.HasBuffAuthority() && h) {
        this.ShareApplyBuffInner(t, i, a, t.MessageId, n, u);
      }
      CharacterBuffComponent_1.L__.Stop();
    }
  }
  OnBuffStackDecreased(t, e, o, r, f, i = 0) {
    if (t) {
      CharacterBuffComponent_1.A__.Start();
      this.BroadcastBuffStackChanged(t, e, o, r, 0, i, f);
      super.OnBuffStackDecreased(t, e, o, r, f, i);
      CharacterBuffComponent_1.A__.Stop();
    }
  }
  OnBuffActiveChanged(t, e) {
    CharacterBuffComponent_1.x__.Start();
    if (t && t.IsActive() !== e) {
      this.BroadcastActivateBuff(t, e);
      super.OnBuffActiveChanged(t, e);
    }
    CharacterBuffComponent_1.x__.Stop();
  }
  BroadcastAddBuff(t, e, o, r, f) {
    if (!!t && !(t.Id < 0) && !!this.NeedBroadcastBuff(t, r) && (!!t.IsInstantBuff() || !(t.Handle < 0))) {
      (r = Protocol_1.Aki.Protocol.ie_.create()).uVn = t.Handle;
      r.s5n = MathUtils_1.MathUtils.NumberToLong(t.Id);
      r.F6n = t.Level;
      if (t.InstigatorId) {
        r.Rjn = MathUtils_1.MathUtils.NumberToLong(t.InstigatorId);
      }
      r.xjn = e;
      r.n5n = t.GetRemainDuration();
      r.wjn = t.ServerId;
      r.Bjn = t.StackCount;
      CombatMessage_1.CombatNet.Send(17778, this.Entity, Protocol_1.Aki.Protocol.ie_.create(r), t.PreMessageId, t.MessageId, o);
    }
  }
  BroadcastActivateBuff(t, e) {
    var o;
    CharacterBuffComponent_1.R__.Start();
    if (!!t && !(t.Id < 0) && !!this.NeedBroadcastBuff(t)) {
      (o = Protocol_1.Aki.Protocol.pe_.create()).uVn = t.Handle;
      o.qjn = e;
      CombatMessage_1.CombatNet.Send(22908, this.Entity, o);
    }
    CharacterBuffComponent_1.R__.Stop();
  }
  BroadcastBuffStackChanged(t, e, o, r, f, i, a, s) {
    var n;
    if (!!t && !(t.Id < 0) && !!this.NeedBroadcastBuff(t)) {
      (n = Protocol_1.Aki.Protocol.Re_.create()).cVn = t.Handle;
      n.Gjn = o;
      n.Ojn = r;
      n.Rjn = s ?? 0;
      n.$L1 = f === 1;
      n.WL1 = i === 1;
      CombatMessage_1.CombatNet.Send(29370, this.Entity, n);
    }
  }
  BroadcastRemoveBuff(t, e, o, r) {
    var f;
    if (!!t && !(t.Id < 0) && !!this.NeedBroadcastBuff(t)) {
      (f = Protocol_1.Aki.Protocol.re_.create()).uVn = t.Handle;
      f.F4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureDataId);
      f.Ojn = e;
      CombatMessage_1.CombatNet.Send(25163, this.Entity, f, r, undefined, o);
    }
  }
  RemoveBuffOrder(e, o, r) {
    var t;
    if (!(e <= 0)) {
      CharacterBuffController_1.default.GetBuffDefinition(e);
      (t = Protocol_1.Aki.Protocol.X3n.create()).s5n = MathUtils_1.MathUtils.NumberToLong(e);
      t.Bjn = o;
      CombatMessage_1.CombatNet.Call(29323, this.Entity, t, t => {
        if (t?.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist && (t = this.GetBuffById(e))) {
          this.RemoveBuffInner(t.Handle, o, true, r, undefined, false);
        }
      });
    }
  }
  AddBuffOrder(o, {
    InstigatorId: r,
    Level: f = ActiveBuffConfigs_1.DEFAULT_BUFF_LEVEL,
    OuterStackCount: i = 0,
    ApplyType: a = Protocol_1.Aki.Protocol.uFs.Proto_Common,
    PreMessageId: s = undefined,
    Duration: n = ActiveBuffConfigs_1.USE_INTERNAL_DURATION,
    ServerId: u = undefined,
    IsIterable: h = true,
    Reason: C,
    BulletMessageId: c = undefined
  }) {
    var t;
    if (!(o <= 0)) {
      (t = Protocol_1.Aki.Protocol.Q3n.create()).s5n = MathUtils_1.MathUtils.NumberToLong(o);
      t.F6n = f;
      t.Bjn = i;
      t.Rjn = MathUtils_1.MathUtils.NumberToLong(r);
      t.xjn = a;
      t.n5n = n;
      t.wjn = u ?? 0;
      t.Pjn = h;
      if (c) {
        t.ZG1 = {
          JG1: MathUtils_1.MathUtils.BigIntToLong(c)
        };
      }
      CombatMessage_1.CombatNet.Call(17316, this.Entity, t, t => {
        var e;
        if (t?.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist) {
          this.AddBuffInner(o, CharacterBuffController_1.default.GetBuffDefinition(o), r, f, i, a, s, undefined, n, undefined, u ?? 0, C, h, false, false, undefined, c);
        }
        if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && r !== ActiveBuffConfigs_1.NULL_INSTIGATOR_ID && (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(r)?.Entity, e = CharacterBuffController_1.default.GetBuffDefinition(o), t) && e) {
          SceneTeamController_1.SceneTeamController.EmitAbilityEvent(t, 2, o, o, this.Entity, t, i && i > 0 ? i : e.DefaultStackCount, c);
        }
      }, s);
    }
  }
  RefreshBuffDurationOrder(t, e) {
    var o = Protocol_1.Aki.Protocol.GG1.create();
    o.$As = t;
    CombatMessage_1.CombatNet.Send(23237, this.Entity, o);
  }
  UpdateSysGrowBuff(t) {
    CharacterBuffComponent_1.Kbr.Start();
    if (this.Hbr >= 0) {
      this.RemoveBuffByHandleLocal(this.Hbr, -1, "更新系统成长值");
    }
    const o = CharacterBuffController_1.default.CreateDynamicBuffRef();
    o.StackingType = 0;
    o.DurationPolicy = 1;
    o.Modifiers = [];
    o.Desc = "系统成长buff";
    t.forEach((t, e) => {
      if (t !== 0) {
        o.Modifiers.push({
          AttributeId: e,
          Value1: [t],
          Value2: [0],
          CalculationPolicy: [0]
        });
      }
    });
    this.Hbr = this.AddBuffInner(ActiveBuffConfigs_1.DYNAMIC_BUFF_ID, o, this.CreatureDataId, 1, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, ActiveBuffConfigs_1.USE_INTERNAL_DURATION, undefined, ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID, "更新系统成长值", false, true, false, undefined);
    CharacterBuffComponent_1.Kbr.Stop();
  }
  AddAttributeRateModifierLocal(t, e, o) {
    if (e === 0) {
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    CharacterBuffComponent_1.Qbr.Start();
    var r = CharacterBuffController_1.default.CreateDynamicBuffRef();
    r.StackingType = 0;
    r.DurationPolicy = 1;
    r.Modifiers = [];
    r.Desc = o;
    r.Modifiers.push({
      AttributeId: t,
      Value1: [e * CharacterAttributeTypes_1.PER_TEN_THOUSAND],
      Value2: [0],
      CalculationPolicy: [1]
    });
    var t = this.AddBuffInner(ActiveBuffConfigs_1.DYNAMIC_BUFF_ID, r, this.CreatureDataId, 1, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, ActiveBuffConfigs_1.USE_INTERNAL_DURATION, undefined, ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID, o, false, true, false, undefined);
    CharacterBuffComponent_1.Qbr.Stop();
    return t;
  }
  AddTagWithReturnHandle(t, e = -1) {
    if (!t || t.length <= 0) {
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    }
    CharacterBuffComponent_1.Xbr.Start();
    var o = CharacterBuffController_1.default.CreateDynamicBuffRef();
    o.GrantedTags = [...t];
    o.StackingType = 0;
    o.DurationPolicy = 1;
    if (e > 0) {
      o.DurationPolicy = 2;
      o.DurationCalculationPolicy = [0];
      o.DurationMagnitude = [e];
    }
    o.Desc = "AddTagWithReturnHandle";
    var t = this.AddBuffInner(ActiveBuffConfigs_1.DYNAMIC_BUFF_ID, o, this.CreatureDataId, 1, undefined, Protocol_1.Aki.Protocol.uFs.Proto_Common, undefined, undefined, e, undefined, ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID, "添加tag", false, true, false, undefined);
    CharacterBuffComponent_1.Xbr.Stop();
    return t;
  }
  SetBuffEffectCd(t, e, o) {
    super.SetBuffEffectCd(t, e, o);
    t = this.GetBuffById(t)?.Handle ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    if (this.HasBuffAuthority() && t !== ActiveBuffConfigs_1.INVALID_BUFF_HANDLE && o > NO_BROADCAST_CD_THRESHOLD) {
      (o = Protocol_1.Aki.Protocol.Ge_.create()).cVn = t;
      o.c5n = e;
      CombatMessage_1.CombatNet.Send(28496, this.Entity, o);
    }
  }
  GetDebugBuffString(t = "") {
    let o = "";
    var e = [...t.matchAll(/[0-9]+/g)].map(t => t[0] ?? "");
    for (const f of this.BuffContainer.values()) {
      const i = String(f.Id);
      if (!(e.length > 0) || e.some(t => i.startsWith(t))) {
        let e = `${f.Id === ActiveBuffConfigs_1.DYNAMIC_BUFF_ID ? "系统buff" : (this.HasBuffAuthority() ? "RemoteBuff_" : "Buff_") + i}(${this.BuffGarbageSet.has(f.Handle) ? "销毁" : f.IsActive() ? "激活" : "失效"})  handle: ${f.Handle},  层数: ${f.StackCount},  等级: ${f.Level} 
    施加者: ${f.GetInstigatorActorComponent()?.Actor.GetName()},  时长: ${f.Duration < 0 ? "无限" : f.GetRemainDuration().toFixed(1) + "/" + f.Duration.toFixed(1)},  ${f.Period > 0 ? `周期: ${f.GetRemainPeriod()?.toFixed(1)}/${f.Period.toFixed(1)}` : ""}
    说明: ${f.Config?.Desc}
`;
        f.Config.GrantedTags?.forEach(t => {
          e += `    +附加标签 ${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)}
`;
        });
        for (const a of this.BuffEffectManager.GetEffectsByHandle(f.Handle)) {
          e += `    +持续效果 (cd:${(this.GetBuffEffectCd(f.Id, a.Index) / CommonDefine_1.MILLIONSECOND_PER_SECOND).toFixed(1)}s)
`;
        }
        for (const s of f.Config.EffectInfos) {
          var r = s.ExecutionEffect;
          if (ExtraEffectBaseTypes_1.periodExecutionIds.has(s.ExtraEffectId) && r) {
            e += "    +周期效果 \n";
          }
        }
        o += e + "\n";
      }
    }
    return o;
  }
};
CharacterBuffComponent.jbr = Stats_1.Stat.Create("AddBuff_Born");
CharacterBuffComponent.T__ = Stats_1.Stat.Create("CharacterBuffComponent.OnBuffAdded");
CharacterBuffComponent.b__ = Stats_1.Stat.Create("CharacterBuffComponent.OnBuffRemoved");
CharacterBuffComponent.L__ = Stats_1.Stat.Create("CharacterBuffComponent.OnBuffStackIncreased");
CharacterBuffComponent.A__ = Stats_1.Stat.Create("CharacterBuffComponent.OnBuffStackDecreased");
CharacterBuffComponent.x__ = Stats_1.Stat.Create("CharacterBuffComponent.OnBuffActiveChanged");
CharacterBuffComponent.R__ = Stats_1.Stat.Create("CharacterBuffComponent.BroadcastActivateBuff");
CharacterBuffComponent.Kbr = Stats_1.Stat.Create("AddBuff_SysGrow");
CharacterBuffComponent.Qbr = Stats_1.Stat.Create("AddBuff_AttributeRateModifier");
CharacterBuffComponent.Xbr = Stats_1.Stat.Create("AddBuff_AddTag");
CharacterBuffComponent = CharacterBuffComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(175)], CharacterBuffComponent);
exports.CharacterBuffComponent = CharacterBuffComponent; //# sourceMappingURL=CharacterBuffComponent.js.map