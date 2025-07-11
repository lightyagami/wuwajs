"use strict";

var PlayerBuffComponent_1;
var __decorate = this && this.__decorate || function (e, t, o, r) {
  var f;
  var n = arguments.length;
  var a = n < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, o, r);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (f = e[i]) {
        a = (n < 3 ? f(a) : n > 3 ? f(t, o, a) : f(t, o)) || a;
      }
    }
  }
  if (n > 3 && a) {
    Object.defineProperty(t, o, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBuffComponent = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Stats_1 = require("../../../../Core/Common/Stats");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../Utils/CombatLog");
const BaseBuffComponent_1 = require("../../Character/Common/Component/Abilities/BaseBuffComponent");
const ActiveBuffConfigs_1 = require("../../Character/Common/Component/Abilities/Buff/ActiveBuffConfigs");
const ExtraEffectManager_1 = require("../../Character/Common/Component/Abilities/ExtraEffect/ExtraEffectManager");
let PlayerBuffComponent = PlayerBuffComponent_1 = class PlayerBuffComponent extends BaseBuffComponent_1.BaseBuffComponent {
  constructor() {
    super(...arguments);
    this.PlayerId = 0;
    this.BuffEffectManager = undefined;
    this.TimeScaleComponent = undefined;
    this.xie = () => {
      this.BuffLock++;
      var e = new Set();
      for (const r of this.TagListenerDict.values()) {
        for (const f of r) {
          e.add(f);
        }
      }
      for (const n of e) {
        var t;
        var o = this.GetBuffByHandle(n);
        if (o) {
          if (this.CheckRemove(o.Config, o.GetInstigator())) {
            this.RemoveBuffInner(n, -1, true, "因为切人导致不满足tag条件");
          } else if ((t = this.CheckActivate(o.Config, o.GetInstigator())) !== o.IsActive()) {
            this.OnBuffActiveChanged(o, t);
          }
        }
      }
      this.BuffLock--;
    };
  }
  OnCreate() {
    this.BuffEffectManager = new ExtraEffectManager_1.PlayerExtraEffectManager(this);
    return true;
  }
  OnInit() {
    super.OnInit();
    this.TimeScaleComponent = this.Entity.GetComponent(122);
    return true;
  }
  OnInitData(e) {
    var t = this.Entity.CheckGetComponent(0);
    this.PlayerId = t?.GetPlayerId() ?? 0;
    return this.PlayerId !== 0 || (CombatLog_1.CombatLog.Error("Actor", this.Entity, "PlayerId为0", ["EntityId", this.Entity.Id]), false);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    return true;
  }
  OnActivate() {
    this.InitBornBuff();
  }
  OnClear() {
    this.TriggerMap.clear();
    for (const e of this.BuffContainer.values()) {
      e.Destroy();
    }
    super.OnClear();
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    return true;
  }
  IsPaused() {
    return this.GetCurrentBuffComponent()?.IsPaused() ?? false;
  }
  InitBornBuff() {
    var e = this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("vys")?.vys;
    if (e) {
      var t = e.EIs;
      if (t) {
        for (const i of t) {
          var o = MathUtils_1.MathUtils.LongToNumber(i.b6n);
          for (let e = 0; e < i.GTs.length; e++) {
            this.SetBuffEffectCd(o, e, i.GTs[e] * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          }
        }
      }
      t = e.SIs;
      if (t) {
        for (const s of t) {
          var r = s;
          var f = MathUtils_1.MathUtils.LongToNumber(r.b6n ?? -1);
          var n = MathUtils_1.MathUtils.LongToNumber(r.Rjn);
          var a = r.cVn ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
          this.AddBuffRemote(f, a, {
            Level: r.F6n,
            InstigatorId: n,
            ApplyType: r.xjn,
            Duration: r.n5n,
            RemainDuration: r.QEs,
            IsActive: r.WHn,
            ServerId: r.wjn,
            OuterStackCount: r.Bjn,
            Reason: "服务器通过通知FightBuffComponent恢复PlayerBuff",
            MessageId: MathUtils_1.MathUtils.LongToBigInt(r.$8n),
            BornBuff: true
          });
          this.BuffContainer.get(a)?.SetRemainDuration(r.QEs);
        }
      }
    }
  }
  GetDebugName() {
    return "player_" + this.PlayerId;
  }
  GetEntity() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(this.PlayerId)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(e ?? 0)?.Entity;
  }
  GetTimeScale() {
    return this.Entity?.TimeDilation * (this.TimeScaleComponent?.CurrentTimeScale ?? 1);
  }
  GetLogicTimeScale() {
    return this.Entity.TimeDilation * (this.TimeScaleComponent?.GetTopForeverTimeScale(1) ?? 1);
  }
  GetCurrentBuffComponent() {
    return this.GetEntity()?.GetComponent(174);
  }
  GetSkillComponent() {
    return this.GetEntity()?.GetComponent(39);
  }
  GetAttributeComponent() {
    return this.GetEntity()?.GetComponent(173);
  }
  GetTagComponent() {
    return this.GetEntity()?.GetComponent(205);
  }
  CheckAdd(e, t, o) {
    return !this.GetTagComponent() || super.CheckAdd(e, t, o);
  }
  CheckActivate(e, t) {
    return !this.GetTagComponent() || super.CheckActivate(e, t);
  }
  HasBuffRoutineExpirationLock(e) {
    return (this.BuffRoutineExpirationLock.get(e) ?? 0) > 0 || (this.GetCurrentBuffComponent()?.BuffRoutineExpirationLock.get(e) ?? 0) > 0;
  }
  GetActorComponent() {
    return this.GetEntity()?.GetComponent(1);
  }
  GetBuffLevel(e) {
    return this.GetEntity()?.GetComponent(174)?.GetBuffLevel(e);
  }
  GetCueComponent() {
    return this.Entity.GetComponent(225);
  }
  GetFormationBuffTotalStackById(e, t = false) {
    return super.GetBuffTotalStackById(e, t);
  }
  GetBuffTotalStackById(e, t = false) {
    return (this.GetCurrentBuffComponent()?.GetBuffTotalStackById(e, t) ?? 0) + super.GetBuffTotalStackById(e, t);
  }
  HasBuffAuthority() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.PlayerId;
  }
  AddBuffInner(e, t, o, r, f, n, a, i, s, u, h, C, m, l, B, _, c, p) {
    if (t.FormationPolicy !== 5 && e !== ActiveBuffConfigs_1.DYNAMIC_BUFF_ID) {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "暂不支持对编队实体增删非编队buff", ["buffId", e], ["reason", C]);
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    } else {
      return super.AddBuffInner(e, t, o, r, f, n, a, i, s, u, h, C, m, l, B, _, c, p);
    }
  }
  OnBuffAdded(e, t, o, r, f, n, a, i, s, u, h) {
    if (e) {
      PlayerBuffComponent_1.q__.Start();
      this.BroadcastAddBuff(e, o, u, i, h);
      var C = e.Config;
      super.OnBuffAdded(e, t, o, r, f, n, a, i, s, u, h);
      var t = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(this.PlayerId) ?? [];
      for (const B of t) {
        var m = B.EntityHandle?.Entity;
        if (B.EntityHandle?.Valid && m) {
          var l = m?.GetComponent(174);
          if (l && C.RemoveBuffWithTags && C.RemoveBuffWithTags.length > 0) {
            const h = `因为buff${e.Id}(handle=${e.Handle})的RemoveBuffWithTags导致移除`;
            for (const _ of C.RemoveBuffWithTags) {
              if (l.HasBuffAuthority()) {
                l.RemoveBuffByTag(_, h);
              }
              l.TagComponent.RemoveTag(_);
            }
          }
          this.CreateGameplayCueByBuff(e);
        }
      }
      PlayerBuffComponent_1.q__.Stop();
    }
  }
  OnBuffRemoved(e, t, o, r, f) {
    if (e) {
      PlayerBuffComponent_1.O__.Start();
      this.BroadcastRemoveBuff(e, t, f, r);
      super.OnBuffRemoved(e, t, o, r, f);
      this.DestroyGameplayCueByBuff(e);
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        this.Entity.GetComponent(27)?.OnBuffRemoved(e);
        this.Entity.GetComponent(22)?.OnBuffRemoved(e);
      }
      PlayerBuffComponent_1.O__.Stop();
    }
  }
  OnBuffStackIncreased(e, t, o, r, f, n, a, i, s, u, h, C, m, l = 0, B = 0) {
    if (e) {
      PlayerBuffComponent_1.G__.Start();
      this.BroadcastBuffStackChanged(e, t, o, false, l, B, m, r);
      super.OnBuffStackIncreased(e, t, o, r, f, n, a, i, s, u, h, C, m, l, B);
      PlayerBuffComponent_1.G__.Stop();
    }
  }
  OnBuffStackDecreased(e, t, o, r, f, n = 0) {
    if (e) {
      PlayerBuffComponent_1.F__.Start();
      this.BroadcastBuffStackChanged(e, t, o, r, 0, n, f);
      super.OnBuffStackDecreased(e, t, o, r, f, n);
      PlayerBuffComponent_1.F__.Stop();
    }
  }
  OnBuffActiveChanged(e, t) {
    PlayerBuffComponent_1.N__.Start();
    if (e && e.IsActive() !== t) {
      this.BroadcastActivateBuff(e, t);
      super.OnBuffActiveChanged(e, t);
    }
    PlayerBuffComponent_1.N__.Stop();
  }
  BroadcastAddBuff(e, t, o, r, f) {
    if (!!e && !(e.Id < 0) && !!this.NeedBroadcastBuff(e, r) && (!!e.IsInstantBuff() || !(e.Handle < 0))) {
      (r = Protocol_1.Aki.Protocol.ie_.create()).uVn = e.Handle;
      r.s5n = MathUtils_1.MathUtils.NumberToLong(e.Id);
      r.F6n = e.Level;
      r.Rjn = e.InstigatorId ?? 0;
      r.xjn = t;
      r.n5n = e.Duration;
      r.Bjn = e.StackCount;
      r.WHn = e.IsActive();
      CombatMessage_1.CombatNet.Send(23961, this.Entity, Protocol_1.Aki.Protocol.ie_.create(r), e.PreMessageId, e.MessageId, o);
    }
  }
  BroadcastActivateBuff(e, t) {
    var o;
    PlayerBuffComponent_1.R__.Start();
    if (!!e && !(e.Id < 0) && !!this.NeedBroadcastBuff(e)) {
      (o = Protocol_1.Aki.Protocol.pe_.create()).uVn = e.Handle;
      o.qjn = t;
      CombatMessage_1.CombatNet.Send(23323, this.Entity, o);
    }
    PlayerBuffComponent_1.R__.Stop();
  }
  BroadcastBuffStackChanged(e, t, o, r, f, n, a, i) {
    var s;
    if (!!e && !(e.Id < 0) && !!this.NeedBroadcastBuff(e)) {
      (s = Protocol_1.Aki.Protocol.Re_.create()).cVn = e.Handle;
      s.Gjn = o;
      s.Ojn = r;
      s.Rjn = i ?? 0;
      s.$L1 = f === 1;
      s.WL1 = n === 1;
      CombatMessage_1.CombatNet.Send(16523, this.Entity, s, undefined);
    }
  }
  BroadcastRemoveBuff(e, t, o, r) {
    var f;
    var n;
    if (!!e && !(e.Id < 0) && !!this.NeedBroadcastBuff(e)) {
      f = this.Entity.GetComponent(0)?.GetCreatureDataId();
      (n = Protocol_1.Aki.Protocol.re_.create()).uVn = e.Handle;
      n.F4n = MathUtils_1.MathUtils.NumberToLong(f);
      n.Ojn = t;
      CombatMessage_1.CombatNet.Send(20851, this.Entity, n, o, undefined, r);
    }
  }
  AddBuffOrder(e, t) {
    CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[buffComp] 客户端暂不能给其它玩家添加队伍buff", ["buffId", e], ["持有者", this.GetDebugName()], ["原因", t.Reason]);
  }
  RemoveBuffOrder(e, t, o) {
    CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[buffComp] 客户端暂不能给其它玩家移除队伍buff", ["buffId", e], ["持有者", this.GetDebugName()], ["原因", o]);
  }
  RefreshBuffDurationOrder(e, t) {
    CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[buffComp] 客户端暂不能刷新其他玩家队伍buff的持续时长", ["buffId", e], ["持有者", this.GetDebugName()], ["原因", t]);
  }
  FormationBuffApplyRequest() {}
  CalculateDurationExtraRate(e, t) {
    let o = super.CalculateDurationExtraRate(e, t);
    var r = this.GetCurrentBuffComponent();
    if (r) {
      t = (t ? r.InstigatorBuffTimeModifiers : r.OwnerBuffTimeModifiers).get(e);
      if (t) {
        for (var [, f] of t.values()) {
          o += f;
        }
      }
    }
    return o;
  }
  CalculatePeriodExtraRate(e, t) {
    let o = super.CalculatePeriodExtraRate(e, t);
    var r = this.GetCurrentBuffComponent();
    if (r) {
      t = (t ? r.InstigatorBuffTimeModifiers : r.OwnerBuffTimeModifiers).get(e);
      if (t) {
        for (var [f] of t.values()) {
          o += f;
        }
      }
    }
    return o;
  }
};
PlayerBuffComponent.q__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffAdded");
PlayerBuffComponent.O__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffRemoved");
PlayerBuffComponent.G__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffStackIncreased");
PlayerBuffComponent.F__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffStackDecreased");
PlayerBuffComponent.N__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffActiveChanged");
PlayerBuffComponent.R__ = Stats_1.Stat.Create("PlayerBuffComponent.BroadcastActivateBuff");
PlayerBuffComponent = PlayerBuffComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(199)], PlayerBuffComponent);
exports.PlayerBuffComponent = PlayerBuffComponent; //# sourceMappingURL=PlayerBuffComponent.js.map