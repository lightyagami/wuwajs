"use strict";

var RoleBuffComponent_1;
var __decorate = this && this.__decorate || function (e, t, r, n) {
  var o;
  var f = arguments.length;
  var s = f < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, r, n);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (o = e[i]) {
        s = (f < 3 ? o(s) : f > 3 ? o(t, r, s) : o(t, r)) || s;
      }
    }
  }
  if (f > 3 && s) {
    Object.defineProperty(t, r, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBuffComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const ActiveBuffConfigs_1 = require("../../Common/Component/Abilities/Buff/ActiveBuffConfigs");
const CharacterBuffComponent_1 = require("../../Common/Component/Abilities/CharacterBuffComponent");
const CharacterBuffController_1 = require("../../Common/Component/Abilities/CharacterBuffController");
const CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
let currentRoleId = 0;
const abnormalBuffIds = [10010000, 10020000, 10030000, 10040000, 10050000, 10060000];
let RoleBuffComponent = RoleBuffComponent_1 = class RoleBuffComponent extends CharacterBuffComponent_1.CharacterBuffComponent {
  constructor() {
    super(...arguments);
    this.xie = (e, t) => {
      if (e.Entity && currentRoleId !== e.Entity.Id && this.Entity.Id === e.Entity.Id) {
        if (currentRoleId) {
          this.TriggerEvents(17, this, {});
        }
        currentRoleId = e.Entity.Id;
      }
    };
    this.M2n = () => {
      currentRoleId = 0;
    };
    this.SeamlessTravelRetainBuffPreMessage = 0n;
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DoLeaveLevel, this.M2n);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOnlineWorld, this.M2n);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.M2n);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EnterInstanceDungeon, this.M2n);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LeaveInstanceDungeon, this.M2n);
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DoLeaveLevel, this.M2n);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOnlineWorld, this.M2n);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveOnlineWorld, this.M2n);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EnterInstanceDungeon, this.M2n);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LeaveInstanceDungeon, this.M2n);
    return true;
  }
  GetFormationBuffComp() {
    if (this.HasBuffAuthority()) {
      return FormationDataController_1.FormationDataController.GetPlayerEntity(ModelManager_1.ModelManager.CreatureModel.GetPlayerId())?.GetComponent(200);
    }
    CombatLog_1.CombatLog.Warn("Buff", this.Entity, "暂不支持对其它玩家操作编队buff");
  }
  AddBuffInner(e, t, r, n, o, f, s, i, u, a, l, m, h, C, _, v, c, p) {
    if (abnormalBuffIds.includes(e) && !this.TagComponent?.HasTag(-1384309247)) {
      return ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    } else if (t.FormationPolicy === 5) {
      return this.GetFormationBuffComp()?.AddBuffInner(e, t, r, n, o, f, s, i, u, a, l, m, h, C, _, v, c, p) ?? ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    } else {
      return super.AddBuffInner(e, t, r, n, o, f, s, i, u, a, l, m, h, C, _, v, c, p);
    }
  }
  RemoveBuffLocal(e, t, r) {
    var n = CharacterBuffController_1.default.GetBuffDefinition(e);
    if (n) {
      if (n.FormationPolicy === 5) {
        return this.GetFormationBuffComp()?.RemoveBuffLocal(e, t, r) ?? 0;
      } else {
        return super.RemoveBuffLocal(e, t, r);
      }
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.Entity, "[buffComp] 尝试本地移除buff时找不到合法配置", ["buffId", e], ["持有者", this.GetDebugName()], ["原因", r]);
      return 0;
    }
  }
  RemoveBuffOrder(e, t, r) {
    if (CharacterBuffController_1.default.GetBuffDefinition(e)?.FormationPolicy === 5) {
      CombatLog_1.CombatLog.Warn("Buff", this.Entity, "暂不支持移除远端编队buff", ["buffId", e], ["原因", r]);
    } else {
      super.RemoveBuffOrder(e, t, r);
    }
  }
  RemoveBuffByTagLocal(e, t) {
    if (this.HasBuffAuthority()) {
      this.GetFormationBuffComp()?.RemoveBuffByTagLocal(e, t);
    }
    super.RemoveBuffByTagLocal(e, t);
  }
  RemoveBuffInner(...e) {
    return (this.GetFormationBuffComp()?.RemoveBuffInner(...e) ?? 0) + super.RemoveBuffInner(...e);
  }
  HasBuffAuthority() {
    return this.CreatureDataComponent?.GetPlayerId() === ModelManager_1.ModelManager.CreatureModel?.GetPlayerId();
  }
  ShareApplyBuffInner(e, t, r, n, o, f) {
    if (this.HasBuffAuthority()) {
      if (e.Config?.FormationPolicy === 1) {
        var s = [];
        var i = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true);
        if (i.some(e => e.Entity === this.Entity)) {
          for (const m of i) {
            var u = m.Entity?.GetComponent(175);
            if (m.Entity !== this.Entity && u) {
              s.push(u);
            }
          }
        }
        var a = e.Id;
        var l = e.Handle;
        for (const h of s) {
          h.AddBuffLocal(a, {
            InstigatorId: e.InstigatorId ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
            Level: e.Level,
            OuterStackCount: t,
            ApplyType: r,
            PreMessageId: e.MessageId,
            Duration: o,
            ServerId: f,
            IsIterable: false,
            Reason: `因为buff${a}(handle=${l})的队伍共享机制导致的buff添加`
          });
        }
      } else {
        super.ShareApplyBuffInner(e, t, r, e.MessageId, o, f);
      }
    }
  }
  CheckImmune(e) {
    var t = this.GetFormationBuffComp();
    return !!t && !!t.CheckImmune(e) || !!e.EffectInfos.some(e => e.ExtraEffectId === 36) && !!this.TagComponent?.HasAnyTag(RoleBuffComponent_1.FrozenImmuneTags) || super.CheckImmune(e);
  }
  HasBuffRoutineExpirationLock(e) {
    return (this.BuffRoutineExpirationLock.get(e) ?? 0) > 0 || (this.GetFormationBuffComp()?.BuffRoutineExpirationLock.get(e) ?? 0) > 0;
  }
  TriggerEvents(e, t, r) {
    super.TriggerEvents(e, t, r);
    this.GetFormationBuffComp()?.TriggerEvents(e, t, r);
  }
  AddPauseLock(e) {
    super.AddPauseLock(e);
    this.GetFormationBuffComp()?.RefreshTimeScale();
  }
  RemovePauseLock(e) {
    super.RemovePauseLock(e);
    this.GetFormationBuffComp()?.RefreshTimeScale();
  }
  NeedBroadcastBuff(e, t = false) {
    return (!e || !CharacterBuffIds_1.noBroadCastBuff.has(e.Id ?? 0)) && super.NeedBroadcastBuff(e, t);
  }
  CalculateDurationExtraRate(e, t) {
    let r = super.CalculateDurationExtraRate(e, t);
    var n = this.GetFormationBuffComp();
    if (n) {
      t = (t ? n.InstigatorBuffTimeModifiers : n.OwnerBuffTimeModifiers).get(e);
      if (t) {
        for (var [, o] of t.values()) {
          r += o;
        }
      }
    }
    return r;
  }
  CalculatePeriodExtraRate(e, t) {
    let r = super.CalculatePeriodExtraRate(e, t);
    var n = this.GetFormationBuffComp();
    if (n) {
      t = (t ? n.InstigatorBuffTimeModifiers : n.OwnerBuffTimeModifiers).get(e);
      if (t) {
        for (var [o] of t.values()) {
          r += o;
        }
      }
    }
    return r;
  }
  GetBuffApplyTarget(e, t) {
    if (CharacterBuffController_1.default.GetBuffDefinition(e)?.FormationPolicy === 5) {
      return this.GetFormationBuffComp();
    } else {
      return this;
    }
  }
  NeedAddBuffOrder(e) {
    return true;
  }
  SeamlessTravelBuffRetain(e) {
    return !!CharacterBuffIds_1.noBroadCastBuff.has(e.Id ?? 0) || 0n !== this.SeamlessTravelRetainBuffPreMessage && e.PreMessageId === this.SeamlessTravelRetainBuffPreMessage || super.SeamlessTravelBuffRetain(e);
  }
  SetSeamlessTravelBuffPreMessageId(e) {
    this.SeamlessTravelRetainBuffPreMessage = e;
  }
  OnSeamlessTravelingRefreshEnd() {
    this.SeamlessTravelRetainBuffPreMessage = 0n;
  }
};
RoleBuffComponent.FrozenImmuneTags = [400631093, -2100129479, -1009010563, -1221493771, 1733479717, 855966206, 1918148596, 1918148596];
RoleBuffComponent = RoleBuffComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(191)], RoleBuffComponent);
exports.RoleBuffComponent = RoleBuffComponent; //# sourceMappingURL=RoleBuffComponent.js.map