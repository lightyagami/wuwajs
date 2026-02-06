"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var h;
  var o = arguments.length;
  var a = o < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, i, e, s);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (h = t[r]) {
        a = (o < 3 ? h(a) : o > 3 ? h(i, e, a) : h(i, e)) || a;
      }
    }
  }
  if (o > 3 && a) {
    Object.defineProperty(i, e, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterCaughtNewComponent = exports.CaughtBindingInfo = exports.CaughtTriggerInfo = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const BulletController_1 = require("../../../Bullet/BulletController");
const BulletUtil_1 = require("../../../Bullet/BulletUtil");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const SkillUtils_1 = require("./Skill/SkillUtils");
const DEFAULT_CAUGHT_LEVEL = 10;
const ZOOM_PRECENTAGE = 0.1;
const ADD_LENGTH = 5;
const IS_DEBUG = false;
const PROFILE_KEY2 = "FightCameraLogicComponent_CheckCollision_Camera";
const DISABLE_CORRECT_MONSTER_ID = 125850038;
class CaughtTriggerInfo {
  constructor() {
    this.Jh = undefined;
    this.Index = 0;
    this.CaughtId = "";
    this.AYo = undefined;
    this.TriggerInfo = undefined;
    this.BulletEntity = undefined;
    this.BulletActorComponent = undefined;
    this.Handle = undefined;
  }
  Init(t, i, e, s, h) {
    this.Jh = e.Entity;
    this.CaughtId = t;
    this.AYo = i;
    this.TriggerInfo = this.AYo.TriggerInfo;
    t = BulletUtil_1.BulletUtil.CreateBulletFromAN(e.Actor, this.TriggerInfo.BulletId, e.ActorTransform, h, false, s.CaughtTriggerAnsMessageId);
    this.BulletEntity = ModelManager_1.ModelManager.BulletModel?.GetBulletEntityById(t);
    this.BulletActorComponent = this.BulletEntity?.GetComponent(180);
    if (this.BulletEntity) {
      this.BulletEntity.GetBulletInfo().AddTagId(1481010069);
      this.Handle = t => {
        var i = t?.Target;
        if (this.BulletEntity && i?.Valid && this.BulletEntity.Id === t.BulletEntityId) {
          if ((t = i.GetComponent(0)).GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player || t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
            s.TryCaught(this, i);
          }
        }
      };
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharHitLocal, this.Handle);
    }
  }
  Clear() {
    if (this.BulletEntity) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharHitLocal, this.Handle);
    }
    BulletController_1.BulletController.DestroyBullet(this.BulletEntity.Id, false);
    this.Index = 0;
    this.CaughtId = "";
    this.TriggerInfo = undefined;
    this.AYo = undefined;
    this.BulletEntity = undefined;
    this.BulletActorComponent = undefined;
    this.Handle = undefined;
  }
}
exports.CaughtTriggerInfo = CaughtTriggerInfo;
class CaughtBindingInfo {
  constructor(t, i, e, s, h) {
    this.CaughtId = "";
    this.AYo = undefined;
    this.BindingInfo = undefined;
    this.BulletEntityId = undefined;
    this.BulletActorComponent = undefined;
    this.Targets = [];
    this.CaughtId = t;
    this.AYo = i;
    this.BindingInfo = this.AYo.BindingInfo;
    if (this.BindingInfo.BulletId) {
      this.BulletEntityId = BulletUtil_1.BulletUtil.CreateBulletFromAN(e.Actor, this.BindingInfo.BulletId, e.ActorTransform, h, false, s.CaughtBindingAnsMessageId);
    }
    this.BulletActorComponent = this.BulletEntity?.GetComponent(180);
  }
  get BulletEntity() {
    if (this.BulletEntityId) {
      return EntitySystem_1.EntitySystem.Get(this.BulletEntityId);
    }
  }
  Clear() {
    this.CaughtId = "";
    this.BindingInfo = undefined;
    this.AYo = undefined;
    this.BulletEntityId = undefined;
    this.BulletActorComponent = undefined;
  }
}
exports.CaughtBindingInfo = CaughtBindingInfo;
let CharacterCaughtNewComponent = class CharacterCaughtNewComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.m1t = undefined;
    this.Xte = undefined;
    this.HBr = undefined;
    this.Gce = undefined;
    this.cBe = undefined;
    this.Hte = undefined;
    this.t4r = undefined;
    this.i4r = undefined;
    this.o4r = undefined;
    this.r4r = undefined;
    this.nWl = 0;
    this.n4r = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.s4r = new Map();
    this.a4r = new Map();
    this.h4r = undefined;
    this.Bv1 = TimeUtil_1.TimeUtil.Millisecond;
    this.l4r = new Map();
    this._4r = (t, i) => {
      if (i && (this.sWl && this.EndCaught(), this.aWl)) {
        this.EndBeCaught();
      }
    };
    this.sWl = false;
    this.aWl = false;
    this.XZu = false;
    this.hWl = false;
    this.PendingCaughtList = new Map();
    this.lWl = new Map();
    this.wmo = 0;
    this.CaughtTriggerAnsMessageId = undefined;
    this.CaughtBindingAnsMessageId = undefined;
    this.Fse = undefined;
    this.c4r = Vector_1.Vector.Create();
    this.uae = Vector_1.Vector.Create();
    this.Wxr = false;
    this.m4r = false;
    this.k0m = Vector_1.Vector.Create();
    this.n5t = Vector_1.Vector.Create();
    this.OnCatcherForceRemove = (t, i) => {
      if (t === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce || t === Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeNormal) {
        if (this.aWl) {
          this.EndBeCaught();
        }
      }
      if (EventSystem_1.EventSystem.HasWithTarget(i, EventDefine_1.EEventName.RemoveEntity, this.OnCatcherForceRemove)) {
        EventSystem_1.EventSystem.RemoveWithTarget(i, EventDefine_1.EEventName.RemoveEntity, this.OnCatcherForceRemove);
      }
    };
  }
  OnInit() {
    this.Xte = this.Entity.GetComponent(217);
    this.m1t = this.Entity.GetComponent(185);
    return true;
  }
  OnStart() {
    this.HBr = this.Entity.GetComponent(186);
    this.Gce = this.Entity.GetComponent(189);
    this.cBe = this.Entity.GetComponent(43);
    this.Hte = this.Entity.GetComponent(3);
    var t = this.Entity.GetComponent(0);
    this.t4r = t?.GetEntityPropertyConfig();
    this.f4r();
    this.p4r();
    this.i4r = this.Xte.ListenForTagAddOrRemove(1008164187, this._4r);
    this.ewr();
    return true;
  }
  OnEnd() {
    this.v4r();
    if (this.Xte?.Valid) {
      this.Xte.RemoveTag(665255436);
      this.Xte.RemoveTag(-648310348);
      this.Xte.RemoveTag(-1697149502);
    }
    if (this.i4r) {
      this.i4r.EndTask();
    }
    this.i4r = undefined;
    for (var [, t] of this.s4r) {
      t.Clear();
    }
    this.s4r.clear();
    for (var [, i] of this.a4r) {
      i.Clear();
    }
    this.a4r.clear();
    return true;
  }
  OnActivate() {
    this.h4r = ConfigManager_1.ConfigManager.WorldConfig.GetCaughtDataInfo();
  }
  OnChangeTimeDilation(t) {
    var i = this.Entity.GetComponent(133)?.CurrentTimeScale ?? 1;
    this.Bv1 = t * i * TimeUtil_1.TimeUtil.Millisecond;
  }
  OnTick(t) {
    var i = t * this.Bv1;
    if (this.PendingCaughtList.size > 0) {
      var e;
      var s;
      var h;
      var o;
      var a;
      var r;
      var n = [];
      for ([e, s] of this.PendingCaughtList) {
        if (s && (s[2] > 1 ? (n.push(e), CombatLog_1.CombatLog.Info("Caught", this.Entity, "超时移除抓取搁置", ["caught id", e])) : s[2] += i, (h = s[0]?.GetComponent(55))?.aWl) && IS_DEBUG && (o = this.a4r.get(e)) && o.BulletActorComponent) {
          a = (r = o.BulletActorComponent.Owner).D_K2_GetActorLocation();
          this.c1u(r, a, e.toString(), 8, new UE.LinearColor(1, 1, 0, 1));
          r = h.d1u(o.BindingInfo.TargetBoneName, 0)?.GetLocation();
          this.c1u(h.Hte?.Actor, r, `id:${o.CaughtId.toString()},caught bone:${o.BindingInfo.TargetBoneName}`, 4, new UE.LinearColor(0, 1, 1, 1));
        }
      }
      for (const c of n) {
        this.PendingCaughtList.delete(c);
      }
    }
    if (this.lWl.size > 0) {
      var _;
      var l;
      var C;
      var g;
      var u;
      var m;
      var v = [];
      for ([_, l] of this.lWl) {
        if (l && (l[2] > 1 ? (v.push(_), CombatLog_1.CombatLog.Info("Caught", this.Entity, "超时移除远端抓取搁置", ["caught id", _])) : l[2] += i, (C = l[0]?.GetComponent(55))?.aWl) && IS_DEBUG && (g = this.a4r.get(_)) && g.BulletActorComponent) {
          u = (m = g.BulletActorComponent.Owner).D_K2_GetActorLocation();
          this.c1u(m, u, _.toString(), 8, new UE.LinearColor(1, 0, 1, 1));
          m = C.d1u(g.BindingInfo.TargetBoneName, 0)?.GetLocation();
          this.c1u(C.Hte?.Actor, m, `id:${g.CaughtId.toString()},caught bone:${g.BindingInfo.TargetBoneName}`, 4, new UE.LinearColor(0, 1, 1, 1));
        }
      }
      for (const d of v) {
        this.lWl.delete(d);
      }
    }
    if (this.aWl && !this.XZu) {
      this.CorrectPosition();
    }
  }
  p4r() {
    for (let t = 0; t < 33; t++) {
      var i = this.Hte.Actor.CapsuleComponent.GetCollisionResponseToChannel(t);
      this.l4r.set(t, i);
    }
  }
  f4r() {
    switch (this.Entity.GetComponent(0).GetEntityType()) {
      case Protocol_1.Aki.Protocol.kks.Proto_Player:
      case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        this.r4r = this.t4r?.CaughtLevel;
        break;
      default:
        this.r4r = DEFAULT_CAUGHT_LEVEL;
    }
  }
  M4r(i, t) {
    if (!i) {
      return true;
    }
    if (i.Num() === 0) {
      return true;
    }
    var e = t.GetComponent(217);
    for (let t = 0; t < i.Num(); t++) {
      var s = i.Get(t);
      if (s && e.HasTag(s.TagId)) {
        return true;
      }
    }
    return false;
  }
  E4r(t, i) {
    return !t || this.Entity.GetComponent(43).SkillTarget?.Id === i;
  }
  S4r(t, i) {
    this.Hte.Actor.CapsuleComponent.SetCollisionResponseToChannel(t, i);
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取设置对象碰撞通道", ["通道", t], ["应答", i]);
  }
  y4r(i) {
    if (i) {
      for (let t = i.Num() - 1; t >= 0; t--) {
        var e = i.GetKey(t);
        this.S4r(e, i.Get(e));
      }
    }
  }
  I4r() {
    if (this.l4r) {
      var t;
      var i;
      var e = this.Hte.Actor.CapsuleComponent;
      for ([t, i] of this.l4r) {
        e.SetCollisionResponseToChannel(t, i);
      }
    }
  }
  T4r() {
    var t;
    var i;
    if (this.o4r) {
      if ((i = this.o4r.BindingInfo.TargetMontagePath) !== "" && (t = this.Entity?.GetComponent(25)) && (i = t.CreateTaskWithName(i))) {
        t.PlayMontageTaskWhenReady(i, 0, undefined);
      }
    } else {
      CombatLog_1.CombatLog.Warn("Caught", this.Entity, "[Caught.PlayCaughtMontage] 没有CaughtInfoInternal数据", ["EntityID:", this.Entity.Id]);
    }
  }
  D4r(t) {
    var i = Vector_1.Vector.Create();
    var e = Vector_1.Vector.Create();
    if (this.nWl !== 0) {
      var s = EntitySystem_1.EntitySystem.Get(this.nWl);
      this.Gue.Reset();
      var h = this.Hte;
      e.DeepCopy(h.Actor.D_K2_GetActorLocation());
      switch (t.BindingInfo.CaughtDirectionType) {
        case 0:
          i.DeepCopy(s.GetComponent(3).ActorLocationProxy);
          i.SubtractionEqual(e);
          MathUtils_1.MathUtils.LookRotationUpFirst(i, this.Gce.GravityUp, this.Gue);
          break;
        case 1:
          if (!t.BulletActorComponent) {
            return;
          }
          i.FromUeVector(t.BulletActorComponent.ActorLocationProxy);
          i.SubtractionEqual(e);
          MathUtils_1.MathUtils.LookRotationUpFirst(i, this.Gce.GravityUp, this.Gue);
          break;
        case 2:
          if (!t.BulletActorComponent) {
            return;
          }
          i.FromUeVector(t.BulletActorComponent.ActorLocationProxy);
          i.Subtraction(this.n4r, i);
          i.Set(-i.X, -i.Y, 0);
          MathUtils_1.MathUtils.LookRotationUpFirst(i, this.Gce.GravityUp, this.Gue);
          break;
        case 3:
          return;
      }
      h.SetActorRotation(this.Gue.ToUeRotator(), "抓取", false);
    }
  }
  d1u(t, i) {
    return SkillUtils_1.SkillUtils.GetTargetSocketTransform(this.Entity, t, i, "抓取");
  }
  Rkd(t) {
    return this.Hte.SkeletalMesh.GetRefBoneWorldPosition(FNameUtil_1.FNameUtil.GetDynamicFName(t));
  }
  BeginCaughtTrigger(i, e) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "开始抓取触发器", ["skillId", e], ["caughtIds", i]);
    if (i) {
      for (let t = 0; t < i.Num(); t++) {
        var s = i.Get(t);
        var h = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.h4r, s.toString());
        if (!h) {
          CombatLog_1.CombatLog.Warn("Caught", this.Entity, "抓取失败，配置不存在", ["caughtId", s]);
          return;
        }
        this.wmo = e;
        var o = new CaughtTriggerInfo();
        o.Init(s, h, this.Hte, this, this.wmo);
        CombatLog_1.CombatLog.Info("Caught", this.Entity, "创建抓取触发器信息", ["id", s]);
        this.s4r.set(s, o);
      }
    }
  }
  EndCaughtTrigger() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束抓取触发器", ["caughtIds", [...this.s4r.keys()]]);
    for (var [, t] of this.s4r) {
      t.Clear();
    }
    this.s4r.clear();
  }
  CheckCaught(t, i) {
    var e = this.Xte;
    var s = i.GetComponent(217);
    var h = i.GetComponent(55);
    var o = s.HasTag(501201000);
    var a = s.HasTag(-1800191060);
    var e = e.HasTag(1105662407);
    if (s.HasTag(-648310348) || !this.M4r(t.TriggerInfo.CaughtTargetTag, i) || !this.E4r(t.TriggerInfo.CaughtAimTarget, i.Id) || s.HasTag(943579542)) {
      return 2;
    } else if ((!o || !a || !e) && (o || s.HasTag(627353781) || h.A4r(this.Entity) || t.TriggerInfo.CaughtLevel < h.r4r)) {
      return 1;
    } else {
      return 0;
    }
  }
  SetCaughtTriggerAnsInfo(t) {
    this.CaughtTriggerAnsMessageId = t;
  }
  SetCaughtBindingAnsInfo(t) {
    this.CaughtBindingAnsMessageId = t;
  }
  TryCaught(t, i) {
    switch (this.CheckCaught(t, i)) {
      case 0:
        var e = this.a4r.get(t.CaughtId);
        if (this.sWl && e) {
          if (e.Targets.length >= t.TriggerInfo.CaughtMxNumber) {
            return;
          }
          this.CaughtTarget(e, i);
        } else {
          CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取目标至搁置", ["target EntityId", i.Id], ["target CreatureDataId", ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(i.Id)], ["CaughtId", t.CaughtId]);
          this.PendingCaughtList.set(t.CaughtId, [i, Time_1.Time.NowSeconds, 0]);
        }
        GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(this.Entity.Id, i.Id, t.CaughtId, 0);
        this.Entity.GetComponent(125)?.SetTakeOverTick(true);
        break;
      case 1:
        GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(this.Entity.Id, i.Id, t.CaughtId, 1);
        break;
      case 2:
        GlobalData_1.GlobalData.BpEventManager.CaughtEntity.Broadcast(this.Entity.Id, i.Id, t.CaughtId, 2);
    }
  }
  BeginCaught(i, e) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "开始抓取绑定器", ["skillId", e], ["caughtIds", i]);
    this.sWl = true;
    this.Xte?.AddTag(665255436);
    for (let t = 0; t < i.Num(); t++) {
      var s = i.Get(t);
      var h = DataTableUtil_1.DataTableUtil.GetDataTableRow(this.h4r, s.toString());
      if (!h) {
        CombatLog_1.CombatLog.Warn("Caught", this.Entity, "抓取失败，配置不存在", ["caughtId", s]);
        return;
      }
      this.wmo = e;
      var h = new CaughtBindingInfo(s, h, this.Hte, this, this.wmo);
      this.a4r.set(s, h);
      var o = this.PendingCaughtList.get(s);
      CombatLog_1.CombatLog.Info("Caught", this.Entity, "创建抓取绑定信息", ["CaughtId", s], ["target EntityId", o?.[0].Id]);
      if (o) {
        this.CaughtTarget(h, o[0]);
      }
      var o = this.lWl.get(s);
      if (o) {
        CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取远端搁置目标", ["id", s], ["remote id", o[0].Id]);
        o[0].GetComponent(55).P4r(h, this.Entity, true);
      }
    }
  }
  CaughtTarget(i, t) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "抓取目标", ["CaughtId", i.CaughtId], ["target EntityId", t.Id]);
    var e = this.Entity.GetComponent(185);
    for (let t = 0; t < i.BindingInfo.SourceBuffIds.Num(); t++) {
      e.AddBuff(Number(i.BindingInfo.SourceBuffIds.Get(t)), {
        InstigatorId: e.CreatureDataId,
        PreMessageId: this.CaughtBindingAnsMessageId,
        Reason: "抓取目标添加buff"
      });
    }
    t.GetComponent(55).BeginBeCaught(i, this.Entity);
  }
  EndCaught() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束抓取绑定器");
    this.sWl = false;
    for (var [, t] of this.a4r) {
      for (const i of t.Targets) {
        i.GetComponent(55).EndBeCaught();
      }
      if (t.BindingInfo.EndBulletId !== "") {
        BulletUtil_1.BulletUtil.CreateBulletFromAN(this.Hte.Actor, t.BindingInfo.EndBulletId, this.Hte.ActorTransform, this.wmo, false, this.CaughtBindingAnsMessageId);
      }
      if (t.BulletEntityId && t.BindingInfo.DestroyBullet) {
        BulletController_1.BulletController.DestroyBullet(t.BulletEntityId, t.BindingInfo.SummonChildBullet);
      }
      t.Clear();
    }
    this.a4r.clear();
    this.Xte.RemoveTag(665255436);
  }
  BeginBeCaught(i, t) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "此对象开始被抓取", ["CaughtId", i.CaughtId]);
    var e = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(t);
    if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.OnCatcherForceRemove)) {
      EventSystem_1.EventSystem.AddWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.OnCatcherForceRemove);
    }
    this.cBe.StopAllSkills("CharacterCaughtNewComponent.BeginBeCaught");
    this.P4r(i, t);
    var s = t.GetComponent(55);
    for (let t = 0; t < i.BindingInfo.TargetBuffIds.Num(); t++) {
      this.m1t.AddBuff(Number(i.BindingInfo.TargetBuffIds.Get(t)), {
        InstigatorId: this.m1t.CreatureDataId,
        PreMessageId: s.CaughtBindingAnsMessageId,
        Reason: "被抓取者添加buff"
      });
    }
    e = Protocol_1.Aki.Protocol.Le_.create();
    e.YVn = Protocol_1.Aki.Protocol.L4s.create();
    e.YVn.Zjn = MathUtils_1.MathUtils.NumberToLong(t.GetComponent(0).GetCreatureDataId());
    e.YVn._Wn = MathUtils_1.MathUtils.BigIntToLong(BigInt(i.CaughtId));
    e.YVn.uWn = false;
    CombatMessage_1.CombatNet.Send(22261, this.Entity, e);
  }
  Vh1(t, i) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "远端被抓取");
    var e = i.GetComponent(55);
    var s = e.a4r.get(t);
    if (e.sWl && s) {
      this.P4r(s, i, true);
    } else {
      CombatLog_1.CombatLog.Info("Caught", this.Entity, "远端被抓取至搁置", ["CaughtId", t], ["InCaught", e.sWl], ["bindingInfo", !!s]);
      e.lWl.set(t, [this.Entity, Time_1.Time.NowSeconds, 0]);
    }
  }
  P4r(t, i, e = false) {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "开始被抓取", ["CaughtId", t.CaughtId], ["位置", this.Hte?.Actor.D_K2_GetActorLocation()], ["速度", this.Hte?.ActorVelocity]);
    t.Targets.push(this.Entity);
    this.n5t.Reset();
    this.aWl = true;
    this.hWl = e;
    this.o4r = t;
    this.nWl = i.Id;
    this.Gce.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
    this.Hte?.Actor.KuroSetMovementMode({
      Mode: 5,
      CustomMode: 0,
      Context: "[CharacterCaughtNewComponent.BeginBeCaughtInternal]"
    });
    this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Captured);
    this.XZu = i.GetComponent(0)?.GetPbDataId() === DISABLE_CORRECT_MONSTER_ID;
    this.Hte?.SetEnableVoxelDetection(false, "被抓取者关闭体素检测，防止因为穿地导致误检测");
    this.y4r(t.BindingInfo.CollisionResponseToChannel);
    this.T4r();
    this.Xte.AddTag(-648310348);
    this.Xte.AddTag(-1697149502);
    var s;
    var h;
    var o;
    var a;
    var e = t.BulletEntity;
    if (e?.Valid) {
      h = (s = t.BulletActorComponent.Owner).D_K2_GetActorLocation();
      (o = BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(14)).IsParentActor = false;
      o.Actor = this.Hte.Actor;
      o.LocationRule = 2;
      o.RotationRule = 2;
      o.ScaleRule = 2;
      o.WeldSimulatedBodies = true;
      o.RelativeRotation = e.GetBulletInfo().BulletDataMain?.Data.基础设置.初始旋转;
      if (t.BindingInfo.TargetBoneName && (a = this.Rkd(t.BindingInfo.TargetBoneName))) {
        a = this.Hte.ActorTransform.InverseTransformPosition(a);
        o.RelativeLocation = a.op_Multiply(-1);
      }
      if (IS_DEBUG) {
        this.c1u(s, h, t.CaughtId.toString(), 16, new UE.LinearColor(1, 1, 0, 1));
        this.m1u(t);
      }
      BulletController_1.BulletController.GetActionRunner().AddAction(e.GetBulletInfo(), o);
    } else {
      CombatLog_1.CombatLog.Warn("Caught", this.Entity, "抓取绑定失败");
    }
    this.D4r(t);
    if ((0, RegisterComponent_1.isComponentInstance)(this.Hte, 3)) {
      this.Hte.SetRadiusAndHalfHeight(this.Hte.Radius * ZOOM_PRECENTAGE, this.Hte.HalfHeight * ZOOM_PRECENTAGE, false);
    }
    GlobalData_1.GlobalData.BpEventManager.抓取目标成功时.Broadcast(i.Id, this.Entity.Id, t.CaughtId);
  }
  EndBeCaught() {
    var t;
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束被抓取");
    this.EndBeCaughtInternal();
    if (!this.hWl) {
      (t = Protocol_1.Aki.Protocol.Le_.create()).YVn = Protocol_1.Aki.Protocol.L4s.create();
      t.YVn.uWn = true;
      CombatLog_1.CombatLog.Info("Caught", this.Entity, "此对象结束被抓取,若联机通知远端", ["CaughtId", this.o4r?.CaughtId]);
      CombatMessage_1.CombatNet.Send(22261, this.Entity, t);
    }
  }
  EndBeCaughtHandle() {
    CombatLog_1.CombatLog.Info("Caught", this.Entity, "远端结束被抓取");
    this.EndBeCaughtInternal();
  }
  EndBeCaughtInternal() {
    var t;
    if (this.aWl) {
      this.aWl = false;
      this.XZu = false;
      this.Xte.RemoveTag(-648310348);
      this.Xte.RemoveTag(-1697149502);
      if (t = this.Hte) {
        t.ResetCapsuleRadiusAndHeight();
        MathUtils_1.MathUtils.LookRotationUpFirst(t.ActorForwardProxy, this.Gce.GravityUp, this.Gue);
        t.SetActorRotation(this.Gue.ToUeRotator(), "EndBeCaught", false);
      }
      if (this.nWl) {
        t?.Actor.K2_DetachFromActor(1, 1, 1);
        this.I4r();
      }
      t?.Actor.KuroSetMovementMode({
        Mode: 3,
        CustomMode: 0,
        Context: "[CharacterCaughtNewComponent.EndBeCaughtInternal]"
      });
      this.HBr.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Other);
      this.x4r();
      this.o4r = undefined;
      t?.SetEnableVoxelDetection(true, "被抓取者结束被抓取状态，恢复体素检测");
      this.nWl = 0;
      CombatLog_1.CombatLog.Info("Caught", this.Entity, "结束被抓取后状态信息", ["位置", t?.Actor.D_K2_GetActorLocation()], ["速度", t?.ActorVelocity]);
    }
  }
  x4r() {
    var t = this.Hte;
    var i = EntitySystem_1.EntitySystem.Get(this.nWl);
    if (i) {
      var e = ModelManager_1.ModelManager.CharacterModel.GetHandleByEntity(i);
      if (EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.OnCatcherForceRemove)) {
        EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.OnCatcherForceRemove);
      }
      this.Fse.HitResult?.Clear();
      this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
      const s = i.GetComponent(3).ActorLocation;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, s);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, t.ActorLocation);
      this.Fse.Radius = 0.3;
      this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY2);
      if (this.Wxr) {
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Fse.HitResult, 0, this.n5t);
        e = s.op_Subtraction(t.ActorLocation);
        this.k0m.DeepCopy(e);
        this.n5t = this.SetAddRadiusLocation(this.k0m, this.n5t, t.Radius + ADD_LENGTH);
        if (!this.n5t.IsZero()) {
          CombatLog_1.CombatLog.Info("Caught", this.Entity, "被抓取结束时与抓取者碰撞检测修正", ["FixPos", this.n5t], ["StartTrace", s], ["EndTrace", t.ActorLocation], ["Radius", t.Radius]);
          t.SetActorLocation(this.n5t.ToUeVector(), "抓取.结束被抓取", false);
        }
      }
    } else {
      CombatLog_1.CombatLog.Error("Caught", this.Entity, "该实体被抓取结束时无法找到抓取者！", ["BeCaughtEntity", this.Entity.Id]);
    }
    this.Fse.HitResult?.Clear();
    this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
    const s = Vector_1.Vector.Create(t.ActorLocation.X, t.ActorLocation.Y, t.ActorLocation.Z + t.ScaledHalfHeight + ADD_LENGTH);
    i = Vector_1.Vector.Create(t.ActorLocation.X, t.ActorLocation.Y, t.ActorLocation.Z - t.ScaledHalfHeight - ADD_LENGTH);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, s);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, i);
    this.Fse.Radius = 0.3;
    this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY2);
    if (this.Wxr) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Fse.HitResult, 0, this.n5t);
      this.n5t.Addition(Vector_1.Vector.Create(0, 0, t.ScaledHalfHeight + ADD_LENGTH), this.n5t);
      if (!this.n5t.IsZero()) {
        CombatLog_1.CombatLog.Info("Caught", this.Entity, "被抓取结束时地面碰撞检测修正", ["FixPos", this.n5t], ["StartTrace", s], ["EndTrace", t.ActorLocation], ["ScaledHalfHeight", t.ScaledHalfHeight]);
        t.SetActorLocation(this.n5t.ToUeVector(), "抓取.结束被抓取", false);
      }
    }
  }
  w4r(t, i) {
    var e = t.GetComponent(188);
    if (e) {
      e.GetCameraPosition(i);
    } else {
      i.DeepCopy(t.GetComponent(1).ActorLocationProxy);
    }
  }
  A4r(t) {
    this.Fse.HitResult?.Clear();
    this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
    this.w4r(t, this.c4r);
    this.w4r(this.Entity, this.uae);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, this.c4r);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, this.uae);
    this.Fse.Radius = 0.3;
    this.Wxr = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY2);
    this.m4r = this.Wxr;
    return this.m4r;
  }
  CorrectPosition() {
    var t = EntitySystem_1.EntitySystem.Get(this.nWl);
    if (!t || !t.Valid) {
      if (this.aWl) {
        this.EndBeCaught();
      }
    }
  }
  ewr() {
    this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Fse.bIsSingle = true;
    this.Fse.bIgnoreSelf = true;
    this.Fse.bTraceComplex = true;
    if ((0, RegisterComponent_1.isComponentInstance)(this.Hte, 3)) {
      this.Fse.Radius = this.Hte.DefaultRadius;
    }
    if (IS_DEBUG) {
      this.Fse.DrawTime = 5;
      this.Fse.SetDrawDebugTrace(1);
    }
    this.Fse.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.Fse.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
  }
  v4r() {
    if (this.Fse) {
      this.Fse.Dispose();
      this.Fse = undefined;
    }
  }
  SetAddRadiusLocation(t, i, e) {
    var s = Vector_1.Vector.Create();
    var h = Vector_1.Vector.Create();
    h.DeepCopy(i);
    s.DeepCopy(t);
    s.Normalize();
    s.Multiply(e, s);
    h.Addition(s, h);
    return h;
  }
  static CaughtNotify(t, i) {
    var e = MathUtils_1.MathUtils.LongToBigInt(i.YVn._Wn).toString();
    CombatLog_1.CombatLog.Info("Caught", t, "收到抓取Notify", ["抓取Id", e], ["is end", i.YVn.uWn]);
    var t = t?.GetComponent(55);
    if (t) {
      if (i.YVn.uWn) {
        t.EndBeCaughtHandle();
      } else {
        i = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(i.YVn.Zjn));
        t.Vh1(e, i.Entity);
      }
    }
  }
  m1u(i) {
    i = i.BulletEntity;
    if (i?.Valid) {
      var i = i.GetBulletInfo();
      var e = i.BulletDataMain?.Data.移动设置.骨骼名字;
      i.BulletDataMain?.Data.移动设置.骨骼网格体名字;
      i.BulletDataMain?.Data.移动设置.子弹跟随类型;
      let t = undefined;
      if (t = i.Attacker && e ? SkillUtils_1.SkillUtils.GetTargetSocketTransform(i.Attacker, e.toString(), 0, "抓取") : t) {
        i = t.GetLocation();
        e = t.GetRotation().Rotator();
        UE.KismetSystemLibrary.D_DrawDebugCoordinateSystem(GlobalData_1.GlobalData.World, i, e, 64, 16, 4);
      }
    }
  }
  c1u(t, i, e, s, h) {
    UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, i, s, 16, h, 16);
    s = i && new UE.Vector(i.X, i.Y, i.Z);
    UE.KismetSystemLibrary.DrawDebugString(GlobalData_1.GlobalData.World, s, e, t, h, 16);
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("zFn", true)], CharacterCaughtNewComponent, "CaughtNotify", null);
CharacterCaughtNewComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(55)], CharacterCaughtNewComponent);
exports.CharacterCaughtNewComponent = CharacterCaughtNewComponent; //# sourceMappingURL=CharacterCaughtNewComponent.js.map