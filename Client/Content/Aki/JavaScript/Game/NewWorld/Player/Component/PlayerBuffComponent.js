"use strict";

var PlayerBuffComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, n) {
  var r;
  var f = arguments.length;
  var i = f < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(t, e, o, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        i = (f < 3 ? r(i) : f > 3 ? r(e, o, i) : r(e, o)) || i;
      }
    }
  }
  if (f > 3 && i) {
    Object.defineProperty(e, o, i);
  }
  return i;
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
    this.oim = undefined;
    this.xie = () => {
      this.BuffLock++;
      var t = new Set();
      for (const n of this.TagListenerDict.values()) {
        for (const r of n) {
          t.add(r);
        }
      }
      for (const f of t) {
        var e;
        var o = this.GetBuffByHandle(f);
        if (o) {
          if (this.CheckRemove(o.Config, o.GetInstigator())) {
            this.RemoveBuffInner(f, -1, true, "因为切人导致不满足tag条件");
          } else if ((e = this.CheckActivate(o.Config, o.GetInstigator())) !== o.IsActive()) {
            this.OnBuffActiveChanged(o, e);
          }
        }
      }
      this.BuffLock--;
    };
    this.dLe = () => {
      if (this.oim) {
        for (const e of this.oim) {
          var t = this.GetBuffById(e);
          if (t?.IsValid()) {
            this.nim(t);
          }
        }
        this.oim = undefined;
      }
    };
  }
  OnCreate() {
    this.BuffEffectManager = new ExtraEffectManager_1.PlayerExtraEffectManager(this);
    return true;
  }
  OnInit() {
    super.OnInit();
    this.TimeScaleComponent = this.Entity.GetComponent(131);
    return true;
  }
  OnInitData(t) {
    var e = this.Entity.CheckGetComponent(0);
    this.PlayerId = e?.GetPlayerId() ?? 0;
    return this.PlayerId !== 0 || (CombatLog_1.CombatLog.Error("Actor", this.Entity, "PlayerId为0", ["EntityId", this.Entity.Id]), false);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
    return true;
  }
  OnActivate() {
    this.InitBornBuff();
  }
  OnClear() {
    this.TriggerMap.clear();
    for (const t of this.BuffContainer.values()) {
      t.Destroy();
    }
    this.oim = undefined;
    super.OnClear();
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateSceneTeam, this.dLe);
    return true;
  }
  IsPaused() {
    return this.GetCurrentBuffComponent()?.IsPaused() ?? false;
  }
  InitBornBuff() {
    var t = this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("vys")?.vys;
    if (t) {
      var e = t.EIs;
      if (e) {
        for (const a of e) {
          var o = MathUtils_1.MathUtils.LongToNumber(a.b6n);
          for (let t = 0; t < a.GTs.length; t++) {
            this.SetBuffEffectCd(o, t, a.GTs[t] * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          }
        }
      }
      e = t.SIs;
      if (e) {
        for (const s of e) {
          var n = s;
          var r = MathUtils_1.MathUtils.LongToNumber(n.b6n ?? -1);
          var f = MathUtils_1.MathUtils.LongToNumber(n.Rjn);
          var i = n.cVn ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
          this.AddBuffRemote(r, i, {
            Level: n.F6n,
            InstigatorId: f,
            ApplyType: n.xjn,
            Duration: n.n5n,
            RemainDuration: n.QEs,
            IsActive: n.WHn,
            ServerId: n.wjn,
            OuterStackCount: n.Bjn,
            Reason: "服务器通过通知FightBuffComponent恢复PlayerBuff",
            MessageId: MathUtils_1.MathUtils.LongToBigInt(n.$8n),
            BornBuff: true
          });
          this.BuffContainer.get(i)?.SetRemainDuration(n.QEs);
        }
      }
    }
  }
  OnAnyBuffInhibitionChanged(t) {
    if (t.Config.FormationPolicy !== 5 || ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady) {
      this.nim(t);
    } else {
      this.oim ||= [];
      this.oim.push(t.Id);
    }
  }
  nim(t) {
    PlayerBuffComponent_1.aim.Start();
    if (t.IsActive()) {
      this.CreateGameplayCueByBuff(t);
    } else {
      this.DestroyGameplayCueByBuff(t);
    }
    PlayerBuffComponent_1.aim.Stop();
  }
  GetDebugName() {
    return "player_" + this.PlayerId;
  }
  GetEntity() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(this.PlayerId)?.GetCurrentGroup()?.GetCurrentRole()?.CreatureDataId;
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(t ?? 0)?.Entity;
  }
  GetTimeScale() {
    return this.Entity?.TimeDilation * (this.TimeScaleComponent?.CurrentTimeScale ?? 1);
  }
  GetLogicTimeScale() {
    return this.Entity.TimeDilation * (this.TimeScaleComponent?.GetTopForeverTimeScale(0) ?? 1);
  }
  GetCurrentBuffComponent() {
    return this.GetEntity()?.GetComponent(183);
  }
  GetSkillComponent() {
    return this.GetEntity()?.GetComponent(40);
  }
  GetAttributeComponent() {
    return this.GetEntity()?.GetComponent(182);
  }
  GetTagComponent() {
    return this.GetEntity()?.GetComponent(215);
  }
  CheckAdd(t, e, o) {
    return !this.GetTagComponent() || super.CheckAdd(t, e, o);
  }
  CheckActivate(t, e) {
    return !this.GetTagComponent() || super.CheckActivate(t, e);
  }
  HasBuffRoutineExpirationLock(t) {
    return (this.BuffRoutineExpirationLock.get(t) ?? 0) > 0 || (this.GetCurrentBuffComponent()?.BuffRoutineExpirationLock.get(t) ?? 0) > 0;
  }
  GetActorComponent() {
    return this.GetEntity()?.GetComponent(1);
  }
  GetBuffLevel(t) {
    return this.GetEntity()?.GetComponent(183)?.GetBuffLevel(t);
  }
  GetCueComponent() {
    return this.Entity.GetComponent(238);
  }
  GetFormationBuffTotalStackById(t, e = false) {
    return super.GetBuffTotalStackById(t, e);
  }
  GetBuffTotalStackById(t, e = false) {
    return (this.GetCurrentBuffComponent()?.GetBuffTotalStackById(t, e) ?? 0) + super.GetBuffTotalStackById(t, e);
  }
  HasBuffAuthority() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.PlayerId;
  }
  AddBuffInner(t, e, o, n, r, f, i, a, s, u, h, C, m, l, B, _, p, c) {
    if (e.FormationPolicy !== 5 && t !== ActiveBuffConfigs_1.DYNAMIC_BUFF_ID) {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "暂不支持对编队实体增删非编队buff", ["buffId", t], ["reason", C]);
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    } else {
      return super.AddBuffInner(t, e, o, n, r, f, i, a, s, u, h, C, m, l, B, _, p, c);
    }
  }
  OnBuffAdded(t, e, o, n, r, f, i, a, s, u, h) {
    if (t) {
      PlayerBuffComponent_1.q__.Start();
      this.BroadcastAddBuff(t, o, u, a, h);
      var C = t.Config;
      super.OnBuffAdded(t, e, o, n, r, f, i, a, s, u, h);
      var e = ModelManager_1.ModelManager.SceneTeamModel?.GetTeamItemsByPlayer(this.PlayerId) ?? [];
      for (const B of e) {
        var m = B.EntityHandle?.Entity;
        if (B.EntityHandle?.Valid && m) {
          var l = m?.GetComponent(183);
          if (l && C.RemoveBuffWithTags && C.RemoveBuffWithTags.length > 0) {
            const h = `因为buff${t.Id}(handle=${t.Handle})的RemoveBuffWithTags导致移除`;
            for (const _ of C.RemoveBuffWithTags) {
              if (l.HasBuffAuthority()) {
                l.RemoveBuffByTag(_, h);
              }
              l.TagComponent.RemoveTag(_);
            }
          }
        }
      }
      PlayerBuffComponent_1.q__.Stop();
    }
  }
  OnBuffRemoved(t, e, o, n, r) {
    if (t) {
      PlayerBuffComponent_1.O__.Start();
      this.BroadcastRemoveBuff(t, e, r, n);
      super.OnBuffRemoved(t, e, o, n, r);
      this.DestroyGameplayCueByBuff(t);
      if (Info_1.Info.IsBuildDevelopmentOrDebug) {
        this.Entity.GetComponent(27)?.OnBuffRemoved(t);
        this.Entity.GetComponent(22)?.OnBuffRemoved(t);
      }
      PlayerBuffComponent_1.O__.Stop();
    }
  }
  OnBuffStackIncreased(t, e, o, n, r, f, i, a, s, u, h, C, m, l = 0, B = 0) {
    if (t) {
      PlayerBuffComponent_1.G__.Start();
      super.OnBuffStackIncreased(t, e, o, n, r, f, i, a, s, u, h, C, m, l, B);
      this.BroadcastBuffStackChanged(t, e, o, false, l, B, m, n);
      PlayerBuffComponent_1.G__.Stop();
    }
  }
  OnBuffStackDecreased(t, e, o, n, r, f = 0) {
    if (t) {
      PlayerBuffComponent_1.F__.Start();
      super.OnBuffStackDecreased(t, e, o, n, r, f);
      this.BroadcastBuffStackChanged(t, e, o, n, 0, f, r);
      PlayerBuffComponent_1.F__.Stop();
    }
  }
  OnBuffActiveChanged(t, e) {
    PlayerBuffComponent_1.N__.Start();
    if (t && t.IsActive() !== e) {
      this.BroadcastActivateBuff(t, e);
      super.OnBuffActiveChanged(t, e);
    }
    PlayerBuffComponent_1.N__.Stop();
  }
  BroadcastAddBuff(t, e, o, n, r) {
    if (!!t && !(t.Id < 0) && !!this.NeedBroadcastBuff(t, n) && (!!t.IsInstantBuff() || !(t.Handle < 0))) {
      (n = Protocol_1.Aki.Protocol.ie_.create()).uVn = t.Handle;
      n.s5n = MathUtils_1.MathUtils.NumberToLong(t.Id);
      n.F6n = t.Level;
      n.Rjn = t.InstigatorId ?? 0;
      n.xjn = e;
      n.n5n = t.Duration;
      n.Bjn = t.StackCount;
      n.WHn = t.IsActive();
      CombatMessage_1.CombatNet.Send(29439, this.Entity, Protocol_1.Aki.Protocol.ie_.create(n), t.PreMessageId, t.MessageId, o);
    }
  }
  BroadcastActivateBuff(t, e) {
    var o;
    PlayerBuffComponent_1.R__.Start();
    if (!!t && !(t.Id < 0) && !!this.NeedBroadcastBuff(t)) {
      (o = Protocol_1.Aki.Protocol.pe_.create()).uVn = t.Handle;
      o.qjn = e;
      CombatMessage_1.CombatNet.Send(28202, this.Entity, o);
    }
    PlayerBuffComponent_1.R__.Stop();
  }
  BroadcastBuffStackChanged(t, e, o, n, r, f, i, a) {
    var s;
    if (!!t && !(t.Id < 0) && !!this.NeedBroadcastBuff(t)) {
      (s = Protocol_1.Aki.Protocol.Re_.create()).cVn = t.Handle;
      s.Gjn = o;
      s.Ojn = n;
      s.Rjn = a ?? 0;
      s.$L1 = r === 1;
      s.WL1 = f === 1;
      if ((o = t.GetRemainDuration()) > 0) {
        s.n5n = o;
      }
      CombatMessage_1.CombatNet.Send(20056, this.Entity, s, undefined);
    }
  }
  BroadcastRemoveBuff(t, e, o, n) {
    var r;
    var f;
    if (!!t && !(t.Id < 0) && !!this.NeedBroadcastBuff(t)) {
      r = this.Entity.GetComponent(0)?.GetCreatureDataId();
      (f = Protocol_1.Aki.Protocol.re_.create()).uVn = t.Handle;
      f.F4n = MathUtils_1.MathUtils.NumberToLong(r);
      f.Ojn = e;
      CombatMessage_1.CombatNet.Send(29211, this.Entity, f, o, undefined, n);
    }
  }
  AddBuffOrder(t, e) {
    CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[buffComp] 客户端暂不能给其它玩家添加队伍buff", ["buffId", t], ["持有者", this.GetDebugName()], ["原因", e.Reason]);
  }
  RemoveBuffOrder(t, e, o) {
    CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[buffComp] 客户端暂不能给其它玩家移除队伍buff", ["buffId", t], ["持有者", this.GetDebugName()], ["原因", o]);
  }
  RefreshBuffDurationOrder(t, e) {
    CombatLog_1.CombatLog.Warn("Buff", this.Entity, "[buffComp] 客户端暂不能刷新其他玩家队伍buff的持续时长", ["buffId", t], ["持有者", this.GetDebugName()], ["原因", e]);
  }
  FormationBuffApplyRequest() {}
  CalculateDurationExtraRate(t, e) {
    let o = super.CalculateDurationExtraRate(t, e);
    var n = this.GetCurrentBuffComponent();
    if (n) {
      e = (e ? n.InstigatorBuffTimeModifiers : n.OwnerBuffTimeModifiers).get(t);
      if (e) {
        for (var [, r] of e.values()) {
          o += r;
        }
      }
    }
    return o;
  }
  CalculatePeriodExtraRate(t, e) {
    let o = super.CalculatePeriodExtraRate(t, e);
    var n = this.GetCurrentBuffComponent();
    if (n) {
      e = (e ? n.InstigatorBuffTimeModifiers : n.OwnerBuffTimeModifiers).get(t);
      if (e) {
        for (var [r] of e.values()) {
          o += r;
        }
      }
    }
    return o;
  }
};
PlayerBuffComponent.aim = Stats_1.Stat.Create("PlayerBuffComponent.OnAnyBuffInhibitionChangedInternal");
PlayerBuffComponent.q__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffAdded");
PlayerBuffComponent.O__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffRemoved");
PlayerBuffComponent.G__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffStackIncreased");
PlayerBuffComponent.F__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffStackDecreased");
PlayerBuffComponent.N__ = Stats_1.Stat.Create("PlayerBuffComponent.OnBuffActiveChanged");
PlayerBuffComponent.R__ = Stats_1.Stat.Create("PlayerBuffComponent.BroadcastActivateBuff");
PlayerBuffComponent = PlayerBuffComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(209)], PlayerBuffComponent);
exports.PlayerBuffComponent = PlayerBuffComponent; //# sourceMappingURL=PlayerBuffComponent.js.map