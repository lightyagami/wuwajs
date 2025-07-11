"use strict";

var __decorate = this && this.__decorate || function (t, e, i, r) {
  var o;
  var s = arguments.length;
  var a = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, r);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        a = (s < 3 ? o(a) : s > 3 ? o(e, i, a) : o(e, i)) || a;
      }
    }
  }
  if (s > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleQteComponent = exports.MAX_MULTI_QTE_DISTANCE = exports.isMultiQte = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FormationDataController_1 = require("../../../../Module/Abilities/FormationDataController");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const GravityUtils_1 = require("../../../../Utils/GravityUtils");
const CharacterBuffIds_1 = require("../../Common/Component/Abilities/CharacterBuffIds");
const PROFILE_KEY = "RoleQteComponent_SetQtePosition";
const DEFAULT_ADD_HEIGHT = -1000;
const SUB_SIZE = 5;
const QTE_LOCKON_CONFIG_ID = 4;
const normalQteTag = -658311908;
function isMultiQte() {
  return (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ? ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize() : ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer().length) > 1;
}
exports.isMultiQte = isMultiQte;
exports.MAX_MULTI_QTE_DISTANCE = 5000;
let RoleQteComponent = class RoleQteComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.bkr = undefined;
    this.Xte = undefined;
    this.m1t = undefined;
    this.gon = undefined;
    this.tRr = undefined;
    this.gFe = undefined;
    this.von = undefined;
    this.Mon = undefined;
    this.cz = Vector_1.Vector.Create();
    this.Eon = new Set();
    this.IsInQte = false;
    this.Zqn = [];
    this.eGn = new Map();
    this.tGn = "";
    this.GoBattleActor = undefined;
    this.Son = (t, e) => {
      EventSystem_1.EventSystem.Emit(e ? EventDefine_1.EEventName.CharQteActive : EventDefine_1.EEventName.CharQteConsume, this.Entity.Id);
    };
    this.yon = t => {
      if (this.Entity.Id !== t) {
        this.Eon.delete(t);
      }
    };
    this.pze = () => {
      this.Eon.clear();
    };
    this.Ion = (t, e) => {
      if (e) {
        this.IsInQte = true;
      } else {
        this.IsInQte = false;
        this.m1t.RemoveBuffByTag(-52094810, "QTE结束移除");
        if (!ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(this.Entity.Id, {
          ParamType: 1
        })?.IsControl()) {
          this.gon.DisableRoleWithEffect();
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharInQteChanged, this.Entity.Id, this.IsInQte);
    };
    this.iGn = (t, e) => {
      if (e) {
        this.eGn.set(t, ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataMap().get(t));
        this.rGn();
      } else {
        e = this.eGn.get(t);
        this.eGn.delete(t);
        if (this.tGn === e) {
          this.rGn();
        }
      }
    };
  }
  OnStart() {
    this.n$t = this.Entity.GetComponent(3);
    this.bkr = this.Entity.CheckGetComponent(18);
    this.Xte = this.Entity.CheckGetComponent(205);
    this.m1t = this.Entity.CheckGetComponent(174);
    this.gon = this.Entity.CheckGetComponent(93);
    this.tRr = this.Entity.CheckGetComponent(40);
    this.gFe = this.Entity.CheckGetComponent(91);
    this.Zqn.push(this.Xte.ListenForTagAddOrRemove(166024319, this.Son));
    this.Zqn.push(this.Xte.ListenForTagAddOrRemove(1674960297, this.Ion));
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterOnlineWorld, this.pze);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharQteConsume, this.yon);
    this.oGn();
    return true;
  }
  OnEnd() {
    for (const t of this.Zqn) {
      t.EndTask();
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterOnlineWorld, this.pze);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharQteConsume, this.yon);
    return true;
  }
  oGn() {
    this.Xte.AddTag(normalQteTag);
    var t = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataMap().values();
    var e = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
    for (const r of t) {
      var i = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, r).QteTag.TagId;
      this.Zqn.push(this.Xte.ListenForTagAddOrRemove(i, this.iGn));
      if (this.Xte.HasTag(i)) {
        this.eGn.set(i, r);
      }
    }
    this.rGn();
  }
  IsQteReady(e) {
    if (this.IsInQte) {
      return false;
    }
    if (!FormationDataController_1.FormationDataController.GlobalIsInFight) {
      return false;
    }
    if (this.Xte.HasTag(1008164187)) {
      return false;
    }
    if (this.Xte.HasTag(-373980873)) {
      return false;
    }
    var t = this.GetQteTagData();
    if (!t) {
      return false;
    }
    if (this.Xte.HasTag(t.NoTag.TagId)) {
      return false;
    }
    t = e.Entity.GetComponent(205);
    if (!t.HasTag(166024319) || t.HasTag(1008164187)) {
      return false;
    }
    if (!t.HasTag(2014048239) && this.Eon.has(e.Id)) {
      return false;
    }
    t = e.Entity.GetComponent(3);
    if (isMultiQte()) {
      if (t.IsAutonomousProxy) {
        return false;
      }
      if (!ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsInRange(this.n$t.ActorLocationProxy, exports.MAX_MULTI_QTE_DISTANCE).some(t => t.EntityHandle === e)) {
        return false;
      }
    }
    return true;
  }
  UseExitSkill(t) {
    var e = t.Entity.GetComponent(98).GetQteTagData();
    if (e && e.ExitSkillTrigger.TagName !== "None") {
      this.GoBattleActor = t.Entity.GetComponent(3).Actor;
      (t = new UE.GameplayEventData()).Instigator = this.n$t.Actor;
      t.Target = this.GoBattleActor;
      this.bkr.SendGameplayEventToActor(e.ExitSkillTrigger, t);
      this.GoBattleActor = undefined;
    }
  }
  ExecuteQte(t) {
    var e = this.GetQteTagData();
    if (!e || e.QteTrigger.TagName === "None") {
      return false;
    }
    var i = this.R7a(t);
    this.QZr(t);
    this.gon.InterruptDisableWithEffect();
    this.gon.SetTeamTag(0);
    this.Entity.EnableByKey(1, true);
    this.bkr.SendGameplayEventToActor(e.QteTrigger);
    for (let t = 0; t < e.QteBuffs.Num(); t++) {
      this.m1t.AddBuff(Number(e.QteBuffs.Get(t)), {
        InstigatorId: this.m1t.CreatureDataId,
        PreMessageId: i,
        Reason: "ExecuteQte"
      });
    }
    var r = t.Entity.GetComponent(91);
    var o = t.Entity.GetComponent(205);
    r.TriggerEvents(this.Entity);
    if (!o.HasTag(2014048239)) {
      for (let t = 0; t < e.ConsumeBuffs.Num(); t++) {
        r.ClearElementEnergy(this.Entity, Number(e.ConsumeBuffs.Get(t)));
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharExecuteQte, this.Entity.Id, t.Id);
    return true;
  }
  ExecuteMultiQte(t) {
    var e = this.GetQteTagData();
    if (!e || e.QteTrigger.TagName === "None") {
      return false;
    }
    var i = this.R7a(t);
    this.bkr.SendGameplayEventToActor(e.QteTrigger);
    for (let t = 0; t < e.QteBuffs.Num(); t++) {
      this.m1t.AddBuff(Number(e.QteBuffs.Get(t)), {
        InstigatorId: this.m1t.CreatureDataId,
        PreMessageId: i,
        Reason: "ExecuteQte"
      });
    }
    var r = t.Entity.GetComponent(91);
    var o = t.Entity.GetComponent(205);
    r.TriggerEvents(this.Entity);
    if (!o.HasTag(2014048239)) {
      if (ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerSize() > 2) {
        r.ClearElementEnergy(this.Entity, CharacterBuffIds_1.buffId.ConsumeQte);
      } else {
        for (let t = 0; t < e.ConsumeBuffs.Num(); t++) {
          r.ClearElementEnergy(this.Entity, Number(e.ConsumeBuffs.Get(t)));
        }
      }
      this.Eon.add(t.Id);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharExecuteMultiQte, this.Entity.Id, t.Id);
    return true;
  }
  Don() {
    if (!this.von) {
      this.von = UE.NewObject(UE.TraceSphereElement.StaticClass());
      this.von.WorldContextObject = GlobalData_1.GlobalData.World;
      this.von.Radius = this.n$t.ScaledRadius;
      this.von.bIsSingle = true;
      this.von.bIgnoreSelf = true;
      this.von.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    }
  }
  Ron() {
    if (!this.Mon) {
      this.Mon = UE.NewObject(UE.TraceLineElement.StaticClass());
      this.Mon.WorldContextObject = GlobalData_1.GlobalData.World;
      this.Mon.bIsSingle = true;
      this.Mon.bIgnoreSelf = true;
      this.Mon.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
      this.Mon.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
    }
  }
  Uon(e, t, i) {
    e.HitResult?.Clear();
    e.ActorsToIgnore.Empty();
    e.ActorsToIgnore.Add(t.Owner);
    e.ActorsToIgnore.Add(i.Actor);
    var r = i.Entity.GetComponent(56)?.GetFollowActor();
    if (r) {
      for (let t = 0; t < r.Num(); t++) {
        e.ActorsToIgnore.Add(r.Get(t));
      }
    }
  }
  SetQtePosition(s) {
    var a = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (a) {
      let t = a;
      var n = Vector_1.Vector.Create();
      n.DeepCopy(t.ActorLocationProxy);
      if (s.ReferenceTarget && (_ = this.tRr.SkillTarget)?.Valid) {
        t = _.Entity.GetComponent(1);
        _ = this.tRr.GetTargetTransform();
        n.DeepCopy(_.GetLocation());
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 48, "Qte设置位置开始", ["targetName", t.Owner?.GetName()], ["currentLocation", this.n$t.ActorLocationProxy], ["targetLocation", n]);
      }
      this.Don();
      this.Uon(this.von, t, a);
      this.Ron();
      this.Uon(this.Mon, t, a);
      let e = 0;
      let i = 0;
      if ((0, RegisterComponent_1.isComponentInstance)(t, 3)) {
        e = t.ScaledRadius;
        i = t.HalfHeight;
      } else if ((0, RegisterComponent_1.isComponentInstance)(t, 202)) {
        _ = t.GetRadius();
        e = _;
        i = _;
      }
      var _ = {
        Location: n,
        Radius: e,
        HalfHeight: i
      };
      let r = undefined;
      let o = undefined;
      o = s.QteType === 1 ? (r = this.Aon(a, s, _), "Qte.设置空中位置") : (r = this.Pon(a, s, _), "Qte.设置地面位置");
      var n = this.n$t;
      var s = n.ActorLocationProxy;
      var _ = this.Mon;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(_, a.ActorLocationProxy);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(_, r);
      var a = TraceElementCommon_1.TraceElementCommon.LineTrace(_, PROFILE_KEY);
      var _ = _.HitResult;
      if (a && _.bBlockingHit) {
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(_, 0, r);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Character", 48, "Qte设置位置，与目标位置间有障碍", ["碰撞位置", r]);
        }
        a = this.cz;
        r.Subtraction(s, a);
        a.Normalize();
        a.Multiply(n.ScaledRadius, a);
        r.Subtraction(a, r);
      }
      var _ = n.ScaledHalfHeight;
      var s = Vector_1.Vector.Create(r);
      var a = Vector_1.Vector.Create(r);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(n, s, _);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(n, a, -_);
      this.von.Radius = n.ScaledRadius;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, s);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, a);
      var s = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.von, PROFILE_KEY);
      var a = this.von.HitResult;
      if (s && a.bBlockingHit) {
        s = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
        TraceElementCommon_1.TraceElementCommon.GetHitLocation(a, 0, s);
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(n, s, _);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 48, "Qte设置位置，地面检测修正位置", ["fixedLocation", s]);
        }
        n.SetActorLocation(s.ToUeVector(), "Qte.修正位置", false);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 48, "Qte设置位置", ["location", r]);
        }
        n.SetActorLocation(r.ToUeVector(), o, false);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 22, "GetQtePosition error, currentRole not found");
    }
  }
  Aon(t, e, i) {
    let r = e.Length;
    var o = Vector_1.Vector.Create();
    t.ActorLocationProxy.Subtraction(i.Location, o);
    if (o.IsNearlyZero()) {
      o.DeepCopy(t.ActorForwardProxy);
    } else {
      r += i.Radius;
    }
    GravityUtils_1.GravityUtils.SetZnInGravityForActor(t, o, 0);
    o.RotateAngleAxis(e.Rotate, t.MoveComp.GravityUp, o);
    o.Normalize();
    o.Multiply(r, o);
    var s = Vector_1.Vector.Create();
    s.DeepCopy(i.Location);
    s.Addition(o, s);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, s, e.Height);
    var o = t.ActorLocationProxy;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, o);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, s, i.HalfHeight / 2);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, s);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 48, "Qte设置空中位置，检测开始", ["开始位置", o], ["结束位置", s]);
    }
    var o = TraceElementCommon_1.TraceElementCommon.ShapeTrace(t.Actor.CapsuleComponent, this.von, PROFILE_KEY, PROFILE_KEY);
    var a = this.von.HitResult;
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, s, -i.HalfHeight / 2);
    if (o && a.bBlockingHit) {
      o = Vector_1.Vector.Create();
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.von.HitResult, 0, o);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 48, "Qte设置空中位置，检测结果", ["障碍物", a.Actors.Get(0)?.GetName()], ["碰撞位置", o]);
      }
      a = this.cz;
      t.ActorLocationProxy.Subtraction(o, a);
      GravityUtils_1.GravityUtils.SetZnInGravityForActor(t, a, 0);
      a.Normalize();
      i = i.Radius + t.GetRadius();
      a.Multiply(i, a);
      s.DeepCopy(o);
      s.Addition(a, s);
      GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, s, e.Height);
    }
    return s;
  }
  Pon(t, e, i) {
    var r = Vector_1.Vector.Create();
    r.DeepCopy(i.Location);
    var o = i.HalfHeight - SUB_SIZE;
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, r, o);
    var s = Vector_1.Vector.Create();
    t.ActorLocationProxy.Subtraction(i.Location, s);
    if (s.IsNearlyZero()) {
      s.DeepCopy(t.ActorForwardProxy);
    }
    GravityUtils_1.GravityUtils.SetZnInGravityForActor(t, s, 0);
    s.RotateAngleAxis(e.Rotate, t.MoveComp.GravityUp, s);
    s.Normalize();
    var o = o + e.Height - DEFAULT_ADD_HEIGHT;
    var a = t.Actor.CharacterMovement.K2_GetWalkableFloorAngle();
    var i = e.Length + i.Radius;
    let n = this.xon(r, s, i, o, a);
    if (!n) {
      s.Normalize();
      s.Multiply(-1, s);
      n = (n = this.xon(r, s, i, o, a)) || Vector_1.Vector.Create(t.ActorLocationProxy);
    }
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, n, e.Height);
    return n;
  }
  xon(t, e, i, r, o) {
    var s = this.n$t.Actor.CapsuleComponent;
    e.Multiply(i, e);
    var a = Vector_1.Vector.Create();
    a.DeepCopy(t);
    var t = Vector_1.Vector.Create();
    t.DeepCopy(a);
    t.Addition(e, t);
    this.von.HitResult?.Clear();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 48, "Qte设置地面位置，延输入方向检测开始", ["开始位置", a], ["结束位置", t]);
    }
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, a);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, t);
    var e = TraceElementCommon_1.TraceElementCommon.ShapeTrace(s, this.von, PROFILE_KEY, PROFILE_KEY);
    let n = this.von.HitResult;
    var _ = Vector_1.Vector.Create();
    var h = Vector_1.Vector.Create();
    a.DeepCopy(t);
    if (e && n.bBlockingHit) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, _);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 48, "Qte设置地面位置，延输入方向检测结果", ["障碍数量", n.Actors.Num()], ["障碍物", n.Actors.Get(0)?.GetName()], ["碰撞位置", _]);
      }
      TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, 0, h);
      if (o < MathUtils_1.MathUtils.GetAngleByVectorDot(h, this.n$t.MoveComp.GravityUp)) {
        return;
      }
      a.DeepCopy(_);
    }
    i = i / Math.tan(o * MathUtils_1.MathUtils.DegToRad) + r;
    t.DeepCopy(a);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.n$t, t, -i);
    this.von.HitResult?.Clear();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Character", 48, "Qte设置地面位置，垂直方向检测开始", ["开始位置", a], ["结束位置", t]);
    }
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.von, a);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.von, t);
    e = TraceElementCommon_1.TraceElementCommon.ShapeTrace(s, this.von, PROFILE_KEY, PROFILE_KEY);
    n = this.von.HitResult;
    _.Reset();
    h.Reset();
    if (e && n.bBlockingHit) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, 0, _);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 48, "Qte设置地面位置，垂直方向检测结果", ["障碍数量", n.Actors.Num()], ["障碍物", n.Actors.Get(0)?.GetName()], ["碰撞位置", _]);
      }
      TraceElementCommon_1.TraceElementCommon.GetImpactNormal(n, 0, h);
      if (o < MathUtils_1.MathUtils.GetAngleByVectorDot(h, this.n$t.MoveComp.GravityUp)) {
        return undefined;
      } else {
        return _;
      }
    }
  }
  QZr(t) {
    var t = t.Entity;
    var e = t.GetComponent(65)?.IsManipulating();
    var i = t.GetComponent(40);
    var r = i.SkillTarget;
    if (!e && r?.Valid && r.Entity?.Active && !r.Entity.GetComponent(205)?.HasTag(1008164187)) {
      this.tRr.SkillTarget = r;
      this.tRr.SkillTargetSocket = i.SkillTargetSocket;
    } else {
      (e = t.GetComponent(32)).DetectSoftLockTarget({
        LockOnConfigId: QTE_LOCKON_CONFIG_ID
      });
      this.tRr.SkillTarget = e.GetCurrentTarget();
      this.tRr.SkillTargetSocket = e.GetCurrentTargetSocketName();
    }
  }
  rGn() {
    const i = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
    let r = 0;
    this.eGn.forEach(t => {
      var e = DataTableUtil_1.DataTableUtil.GetDataTableRow(i, t);
      if (e.Priority >= r) {
        this.tGn = t;
        this.gFe.TriggerEnergy = e.Energy;
        r = e.Priority;
      }
    });
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.CharQteTagRowNameChanged);
  }
  GetQteTagData() {
    var t;
    if (this.tGn) {
      t = ConfigManager_1.ConfigManager.WorldConfig.GetQteTagDataTable();
      return DataTableUtil_1.DataTableUtil.GetDataTableRow(t, this.tGn);
    }
  }
  R7a(t) {
    var e = Protocol_1.Aki.Protocol.$e_.create();
    e.CUs = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t.Entity.Id));
    e.mUs = MathUtils_1.MathUtils.NumberToLong(ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this.Entity.Id));
    e.U7a = UE.GASBPLibrary.FnvHash(this.tGn);
    var t = ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    CombatMessage_1.CombatNet.Send(23225, this.Entity, e, undefined, t);
    return t;
  }
  static ExecuteQteNotify(t, e) {
    var i = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(e.mUs));
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(e.CUs));
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharExecuteMultiQte, i, e);
  }
};
__decorate([CombatMessage_1.CombatNet.Listen("Xsh", true)], RoleQteComponent, "ExecuteQteNotify", null);
RoleQteComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(98)], RoleQteComponent);
exports.RoleQteComponent = RoleQteComponent; //# sourceMappingURL=RoleQteComponent.js.map