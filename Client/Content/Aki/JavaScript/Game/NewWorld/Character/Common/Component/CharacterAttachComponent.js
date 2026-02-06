"use strict";

var CharacterAttachComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, a) {
  var r;
  var h = arguments.length;
  var o = h < 3 ? e : a === null ? a = Object.getOwnPropertyDescriptor(e, i) : a;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, a);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (r = t[s]) {
        o = (h < 3 ? r(o) : h > 3 ? r(e, i, o) : r(e, i)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAttachComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../Utils/CombatLog");
let CharacterAttachComponent = CharacterAttachComponent_1 = class CharacterAttachComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.r4a = undefined;
    this.o4a = undefined;
    this.Mql = 0;
    this.n4a = undefined;
    this.s4a = Vector_1.Vector.Create();
    this.a4a = 2;
    this.EIe = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.Lie = undefined;
    this.h4a = undefined;
    this.l4a = undefined;
    this.lpu = false;
    this.hJl = () => {
      this.DetachFromHost(true, false, false);
    };
  }
  OnStart() {
    this.l4a = [];
    this.o4a = undefined;
    this.r4a = undefined;
    this.n4a = undefined;
    this.a4a = 2;
    this.h4a = undefined;
    this.EIe = this.Entity.GetComponent(0);
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(189);
    this.Lie = this.Entity.GetComponent(217);
    this.lpu = true;
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.hJl);
    return true;
  }
  OnActivate() {
    this.yql();
    this.Eql();
  }
  yql() {
    var t;
    var e;
    var i;
    var a;
    if (this.EIe?.Valid && this.EIe.PbCombineTargetServerId && (i = this.EIe.PbCombineTargetServerId, e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(i), (e = EntitySystem_1.EntitySystem.Get(e))?.Valid) && (t = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(e), (e = e.GetComponent(191))?.Valid) && !e.HasFollower(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity)) && (e = e.GetFollowerAttachInfo(i)) && (i = t.Entity.GetComponent(74))?.Valid && (i = i.GetPartByIndex(e.jjn)) && !FNameUtil_1.FNameUtil.IsNothing(i.CombinePartSocketName)) {
      a = new UE.Vector(e.Iql?.X ?? 0, e.Iql?.Y ?? 0, e.Iql?.Z ?? 0);
      this.StartAttachToTarget(t, i.CombinePartSocketName, a, e.jjn, undefined);
      this.AttachToTarget(t, undefined, false);
    }
  }
  Eql() {
    if (this.EIe?.Valid && this.EIe.PbCombinePartInfoList) {
      var i = this.EIe.PbCombinePartInfoList;
      if (i) {
        for (let t = 0, e = i.length; t < e; ++t) {
          var a = i[t];
          var r = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(a.Tql));
          var r = EntitySystem_1.EntitySystem.Get(r);
          if (r?.Valid) {
            var h = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity);
            var o = r.GetComponent(191);
            if (o?.Valid && !this.HasFollower(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(r))) {
              r = r.GetComponent(74);
              if (!r?.Valid) {
                return;
              }
              r = r.GetPartByIndex(a.jjn);
              if (!r || FNameUtil_1.FNameUtil.IsNothing(r.CombinePartSocketName)) {
                return;
              }
              var s = new UE.Vector(a.Iql?.X ?? 0, a.Iql?.Y ?? 0, a.Iql?.Z ?? 0);
              o.StartAttachToTarget(h, r.CombinePartSocketName, s, a.jjn, undefined);
              o.AttachToTarget(h, undefined, false);
            }
          }
        }
      }
    }
  }
  StartAttachToTarget(t, e, i, a, r) {
    var h;
    if (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[CharacterAttach]开始绑定到目标：开始绑定", ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
    }
    if (this.o1h() && (this.DetachFromHost(false, false, true), (h = t.Entity?.GetComponent(3))?.Valid) && (this.r4a = t, this.o4a = r, this.Mql = a, this.n4a = e, this.s4a.DeepCopy(i), this.a4a = 0, this.h4a = this.Gce?.Disable("CharacterAttachComponent Disable"), this.Hte?.Valid && (this.Hte.Actor.KuroSetMovementMode({
      Mode: 0,
      Context: "[CharacterAttachComponent.StartAttachToTarget]"
    }), this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(h.Actor, true), h.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.Hte.Actor, true)), CharacterAttachComponent_1.Lql) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[CharacterAttach]开始绑定到目标：开始绑定成功", ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
    }
  }
  AttachToTarget(t, e, i) {
    var a;
    if (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[CharacterAttach]绑定到目标身上：开始绑定", ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
    }
    if (this.o1h() && (a = t.Entity?.GetComponent(3))?.Valid && a.SkeletalMesh) {
      if (this.a4a !== 0 || this.r4a !== t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 57, "Attach到目标失败");
        }
      } else if (this.Hte?.Valid && this.Lie?.Valid && (this.Hte.Owner.K2_AttachToComponent(a.SkeletalMesh, this.n4a, 1, 1, 1, false), this.o4a && this.Lie.AddTag(this.o4a.TagId), this.a4a = 1, this._4a(), i && this.Uql(e), CharacterAttachComponent_1.Lql) && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[CharacterAttach]绑定到目标身上：绑定成功", ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
      }
    }
  }
  DetachFromHost(t, e, i, a = undefined) {
    var r;
    if (this.o1h()) {
      if (this.a4a === 1 && (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Character", 57, "[CharacterAttach]从目标身上解除绑定：开始解绑", ["isNotifyServer", i], ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]), this.Hte?.Owner.K2_DetachFromActor(1, 1, 1), (r = this.r4a?.Entity?.GetComponent(3))?.Valid ? this.Hte?.Owner?.K2_SetActorRotation(r.ActorRotation, true) : (CharacterAttachComponent_1.Gue.Pitch = 0, CharacterAttachComponent_1.Gue.Yaw = this.Hte?.ActorRotationProxy.Yaw ?? 0, CharacterAttachComponent_1.Gue.Roll = 0, this.Hte?.Owner?.K2_SetActorRotation(CharacterAttachComponent_1.Gue, true)), i && this.Aql(a), CharacterAttachComponent_1.Lql) && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[CharacterAttach]从目标身上解除绑定：解绑成功", ["isNotifyServer", i], ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
      }
      if (t) {
        this.u4a(e, i);
      }
      this.c4a();
      this.m4a();
    }
  }
  u4a(e, i, a = undefined) {
    for (let t = this.l4a.length - 1; t >= 0; --t) {
      var r = this.l4a[t];
      if (r.Entity?.Valid && (r = r.Entity.GetComponent(191))?.Valid) {
        r.DetachFromHost(e, e, i, a);
      }
    }
    this.l4a.length = 0;
  }
  _4a() {
    var t;
    if (this.r4a?.Valid && (t = this.r4a.Entity.GetComponent(191))?.Valid) {
      t.d4a(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity));
    }
  }
  m4a() {
    var t;
    if (this.r4a?.Valid && (t = this.r4a.Entity.GetComponent(191))?.Valid) {
      t.C4a(ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(this.Entity));
    }
  }
  d4a(t) {
    if (t?.Valid && !this.l4a.includes(t)) {
      this.l4a.push(t);
    }
  }
  C4a(t) {
    if (!!t?.Valid && !((t = this.l4a.indexOf(t)) < 0)) {
      this.l4a.splice(t, 1);
    }
  }
  HasFollower(t) {
    return !!this.o1h() && !!t?.Valid && this.l4a.includes(t);
  }
  GetFollowerAttachInfo(i) {
    if (this.o1h() && this.EIe?.Valid && this.EIe.PbCombinePartInfoList) {
      var a = this.EIe.PbCombinePartInfoList;
      if (!(a?.length <= 0)) {
        for (let t = 0, e = a.length; t < e; ++t) {
          var r = a[t];
          if (r.Tql !== i) {
            return r;
          }
        }
      }
    }
  }
  o1h() {
    return this.lpu;
  }
  Uql(t) {
    if (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[CharacterAttach]发起请求合体：开始合体", ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
    }
    var e = Protocol_1.Aki.Protocol.efl.create();
    var i = Protocol_1.Aki.Protocol.Dql.create();
    i.Tql = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this.Entity.Id));
    i.Iql = Protocol_1.Aki.Protocol.Gks.create();
    i.Iql.X = this.s4a.X;
    i.Iql.Y = this.s4a.Y;
    i.Iql.Z = this.s4a.Z;
    i.Rql = Protocol_1.Aki.Protocol.D2s.create();
    i.Rql.Pitch = 0;
    i.Rql.Yaw = 0;
    i.Rql.Roll = 0;
    i.jjn = this.Mql;
    e.Dql = i;
    e.Pql = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this.r4a.Id));
    CombatMessage_1.CombatNet.Call(28043, this.Entity, e, t => {
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (CharacterAttachComponent_1.Lql) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Character", 57, "[CharacterAttach]发起请求合体：合体失败", ["ErrorCode", t.Q4n], ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
          }
          CombatLog_1.CombatLog.Warn("Request", this.Entity, "执行合体失败", ["ErrorCode", t.Q4n], ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
        }
        this.DetachFromHost(false, false, false);
      } else if (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[CharacterAttach]发起请求合体：合体成功", ["ErrorCode", t.Q4n], ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
      }
    }, t);
  }
  static AddCombineEntitiesRelationNotify(t, e) {
    var i;
    var a;
    var r;
    var h;
    var o;
    if (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[CharacterAttach]同步请求合体：开始合体", ["EntityId", t?.Id], ["TargetEntityId", MathUtils_1.MathUtils.LongToNumber(e.Pql ?? 0)]);
    }
    if (t && (i = t.GetComponent(191))?.Valid && (a = e.Dql)) {
      r = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(e.Pql));
      if ((r = EntitySystem_1.EntitySystem.Get(r))?.Valid) {
        if ((h = (r = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(r)).Entity.GetComponent(74))?.Valid && (h = h.GetPartByIndex(a.jjn)) && !FNameUtil_1.FNameUtil.IsNothing(h.CombinePartSocketName) && (o = new UE.Vector(a.Iql?.X ?? 0, a.Iql?.Y ?? 0, a.Iql?.Z ?? 0), i.StartAttachToTarget(r, h.CombinePartSocketName, o, a?.jjn, undefined), i.AttachToTarget(r, undefined, false), CharacterAttachComponent_1.Lql) && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 57, "[CharacterAttach]同步请求合体：合体成功", ["EntityId", t?.Id], ["TargetEntityId", MathUtils_1.MathUtils.LongToNumber(e.Pql ?? 0)]);
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 57, "同步合体失败，因为合体目标非法");
      }
    }
  }
  Aql(t) {
    if (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[CharacterAttach]发起请求解体：开始解体", ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
    }
    var e = Protocol_1.Aki.Protocol.tfl.create();
    e.xql = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this.Entity.Id));
    e.wql = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this.r4a.Id));
    CombatMessage_1.CombatNet.Call(24351, this.Entity, e, t => {
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 57, "[CharacterAttach]发起请求解体：解体失败", ["ErrorCode", t.Q4n], ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
        }
        CombatLog_1.CombatLog.Warn("Request", this.Entity, "执行解体失败", ["ErrorCode", t.Q4n], ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
      } else if (CharacterAttachComponent_1.Lql && CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 57, "[CharacterAttach]发起请求解体：解体成功", ["ErrorCode", t.Q4n], ["EntityId", this.Entity.Id], ["TargetEntityId", this.r4a?.Id]);
      }
    }, t);
  }
  static RemoveCombineRelationNotify(t, e) {
    var i;
    if (CharacterAttachComponent_1.Lql && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[CharacterAttach]同步请求解体：开始解体", ["EntityId", t?.Id], ["TargetEntityId", MathUtils_1.MathUtils.LongToNumber(e.Pql ?? 0)]);
    }
    if (t && (i = t.GetComponent(191))?.Valid && (i.DetachFromHost(false, false, false), CharacterAttachComponent_1.Lql) && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 57, "[CharacterAttach]同步请求解体：解体成功", ["EntityId", t?.Id], ["TargetEntityId", MathUtils_1.MathUtils.LongToNumber(e.Pql ?? 0)]);
    }
  }
  SetEnableDebugLog(t) {
    CharacterAttachComponent_1.Lql = t;
  }
  c4a() {
    var t;
    if (this.o4a) {
      this.Lie?.RemoveTag(this.o4a.TagId);
      this.o4a = undefined;
    }
    if (this.h4a) {
      this.Gce?.Enable(this.h4a, "CharacterAttachComponent Enable");
      this.h4a = undefined;
    }
    if (this.Hte?.Valid && (this.Hte.Actor.CharacterMovement.SetDefaultMovementMode(), (t = this.r4a?.Entity?.GetComponent(3))?.Valid)) {
      this.Hte.Actor.CapsuleComponent.IgnoreActorWhenMoving(t.Actor, false);
      t.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.Hte.Actor, false);
    }
    this.r4a = undefined;
    this.n4a = undefined;
    this.a4a = 2;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharOnRoleDeadTargetSelf, this.hJl);
    this.DetachFromHost(true, false, false);
    this.Hte = undefined;
    this.Gce = undefined;
    this.Lie = undefined;
    return !(this.lpu = false);
  }
};
CharacterAttachComponent.Lql = false;
CharacterAttachComponent.Gue = new UE.Rotator();
__decorate([CombatMessage_1.CombatNet.Listen("Jpl", true)], CharacterAttachComponent, "AddCombineEntitiesRelationNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("Zpl", true)], CharacterAttachComponent, "RemoveCombineRelationNotify", null);
CharacterAttachComponent = CharacterAttachComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(191)], CharacterAttachComponent);
exports.CharacterAttachComponent = CharacterAttachComponent; //# sourceMappingURL=CharacterAttachComponent.js.map