"use strict";
var __decorate = this && this.__decorate || function(t, e, l, r) {
  var o, i = arguments.length,
    a = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, l) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, l, r);
  else
    for (var n = t.length - 1; 0 <= n; n--)(o = t[n]) && (a = (i < 3 ? o(a) : 3 < i ? o(e, l, a) : o(e, l)) || a);
  return 3 < i && a && Object.defineProperty(e, l, a), a
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BulletController = void 0;
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Entity_1 = require("../../../Core/Entity/Entity"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  PerformanceDecorators_1 = require("../../../Core/Performance/PerformanceDecorators"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../Common/StatDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds"),
  BulletActionRunner_1 = require("./Action/BulletActionRunner"),
  BulletConfig_1 = require("./BulletConfig"),
  BulletConstant_1 = require("./BulletConstant"),
  BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction"),
  BulletPool_1 = require("./Model/BulletPool"),
  BulletCollisionSystem_1 = require("./System/BulletCollisionSystem"),
  BulletMoveSystem_1 = require("./System/BulletMoveSystem");
class BulletController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return Info_1.Info.IsBuildDevelopmentOrDebug && (BulletConstant_1.BulletConstant.OpenCreateLog = !0, BulletConstant_1.BulletConstant.OpenActionStat = !0), BulletActionRunner_1.BulletActionRunner.InitStat(), this.Q9o || (this.Q9o = new BulletActionRunner_1.BulletActionRunner), this.Q9o.Init(), BulletPool_1.BulletPool.Init(), this.X9o.length = 0, this.X9o.push(new BulletMoveSystem_1.BulletMoveSystem), this.X9o.push(new BulletCollisionSystem_1.BulletCollisionSystem), this.sCe(), !0
  }
  static OnTick(t) {
    if (this.Q9o) {
      this.Q9o.Pause();
      for (const e of this.X9o) e.OnTick(t);
      this.Q9o.Resume(), this.Q9o.Run(t), ConfigManager_1.ConfigManager.BulletConfig.TickPreload()
    }
  }
  static OnAfterTick(t) {
    if (this.X9o && this.Q9o) {
      this.Q9o.Pause();
      for (const e of this.X9o) e.OnAfterTick(t);
      this.Q9o.Resume(), this.Q9o.Run(t, !0), BulletPool_1.BulletPool.CheckAtFrameEnd()
    }
  }
  static OnClear() {
    return this.Q9o.Clear(), this.aCe(), BulletPool_1.BulletPool.Clear(), !(this.X9o.length = 0)
  }
  static OnLeaveLevel() {
    return BulletConfig_1.BulletConfig.ClearBulletDataCache(), ConfigManager_1.ConfigManager.BulletConfig.ClearPreload(), !0
  }
  static GetActionCenter() {
    return this.Q9o.GetActionCenter()
  }
  static GetActionRunner() {
    return this.Q9o
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, BulletController.bJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, BulletController.zpe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetNiagaraQuality, BulletController.mna)
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, BulletController.bJe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, BulletController.zpe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetNiagaraQuality, BulletController.mna)
  }
  static HasAuthority(t) {
    return (t instanceof Entity_1.Entity ? t.GetComponent(3)?.Actor : t)?.IsAutonomousProxy() ?? !1
  }
  static Iuu(t) {
    StatDefine_1.BATTLESTAT_ENABLED && (StatDefine_1.battleStat.BulletCreate?.Start(), this.GetBulletCreateStat(t).Start())
  }
  static Tuu(t) {
    StatDefine_1.BATTLESTAT_ENABLED && (this.GetBulletCreateStat(t).Stop(), StatDefine_1.battleStat.BulletCreate?.Stop())
  }
  static CreateBulletCustomTarget(t, e, l, {
    SkillId: r = 0,
    SkillContextId: o,
    SyncType: i = 0,
    ParentVictimId: a = 0,
    ParentTargetId: n = 0,
    ParentId: s = 0,
    Size: u,
    InitTargetLocation: _,
    Source: f = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource,
    LocationOffset: B,
    BeginRotatorOffset: c,
    DtType: d = -1,
    CreateOnAuthority: C = !0,
    BattleFlags: g = void 0,
    ParentIds: M = void 0
  } = {}, h = void 0, m = 0) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      if (BulletController.Iuu(e), t || Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "创建子弹时Owner为空", ["rowName", e]), h || (0, CharacterBuffIds_1.checkBulletInSpecialList)(e)) {
        var S = t instanceof Entity_1.Entity ? t : t.GetEntityNoBlueprint(),
          v = (BulletController.$9o.Start(), ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(S, e, !0, d));
        if (BulletController.$9o.Stop(), v) {
          if (1 === m && v.Base.DestroyOnSkillEnd) {
            var y = S.GetComponent(39);
            if (!y?.Valid) return Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "勾选了技能结束是否销毁子弹, 技能组件不存在", ["bulletRowName", e], ["SkillId", r]), void BulletController.Tuu(e);
            if (!y.GetSkill(r)?.Active) return void BulletController.Tuu(e)
          }
          y = BulletController.sNn(i, v);
          if (!C || 1 !== y || BulletController.HasAuthority(t)) return i = this.Y9o(S, v, e, a, n), C = this.J9o(S, v, e, a, n), t = this.aNn(S, v, e, a, n), a = this.CreateBullet(S, e, l, {
            SkillId: r,
            SkillContextId: o,
            SyncType: y,
            ParentId: s,
            BulletData: v,
            TargetId: i,
            BaseTransformId: t,
            BaseVelocityId: C,
            Size: u,
            InitTargetLocation: _,
            Source: f,
            LocationOffset: B,
            BeginRotatorOffset: c,
            DtType: d,
            BattleFlags: g,
            ParentIds: M
          }, h, m), BulletController.Tuu(e), a;
          Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 17, "等待远端创建同步子弹", ["bulletRowName", e], ["skillId", r])
        }
      } else CombatLog_1.CombatLog.Error("Bullet", 35, "创建子弹时contextId为空", ["rowName", e]);
      BulletController.Tuu(e)
    }
  }
  static aNn(t, e, l, r, o) {
    var i = e.Base.BornPositionStandard;
    if (1 === i) return this.z9o(t, l);
    if (5 === i) return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(t.Id, e.Base.BlackboardKey, l);
    if (7 === i) return r;
    if (8 === i) return o;
    if (10 === i || 11 === i) return r = parseInt(e.Base.BlackboardKey), this.Z9o(t, r, l);
    if (4 === i) {
      o = t.GetComponent(32)?.GetCurrentTarget();
      if (o?.Valid) return o.Id
    } else if (9 === i) return this.hNn();
    return 0
  }
  static sNn(t, e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && 0 === t) {
      if (1 === e.Base.SyncType) return 1;
      var l = e.Base.BornPositionStandard;
      if (4 === l || 9 === l || 10 === l) return 1;
      l = e.Move.InitVelocityDirStandard;
      if (10 === l || 5 === l) return 1;
      l = e.Move.TrackTarget;
      if (4 === l || 3 === l) return 1;
      l = e.Execution;
      if (l.InitGbGroup(), l.HasRebound) return 1
    }
    return t
  }
  static CreateBulletForDebug(t, e) {
    var t = t.GetEntityNoBlueprint()?.Id ?? 0,
      t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t),
      l = new Protocol_1.Aki.Protocol.Gzn;
    return l.VVn = 0, l.P8n = `@gmcreatebullet ${t} ` + e, Net_1.Net.Call(22424, Protocol_1.Aki.Protocol.Gzn.create(l), () => {}), 0
  }
  static Y9o(t, e, l, r, o) {
    var i = e.Move.TrackTarget;
    if (4 === i || 3 === i) {
      var a = t.GetComponent(32)?.GetCurrentTarget();
      if (a?.Valid) return a.Id
    } else {
      if (5 === i) return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(t.Id, e.Move.TrackTargetBlackboardKey, l);
      if (7 === i) {
        if (r) return r;
        Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "父子弹受击者 VictimId为空", ["rowName", l])
      } else if (8 === i) {
        if (o) return o;
        Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "父子弹目标为空", ["rowName", l])
      } else {
        if (6 === i) return t.Id;
        if (2 === i || 11 === i) return BulletController.z9o(t, l);
        if (1 === i) {
          if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) return Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
          a = t.GetComponent(0), e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(a.GetPlayerId(), {
            ParamType: 2,
            IsControl: !0
          }).EntityHandle;
          if (e?.Valid) return e.Id
        } else if (9 === i) return this.hNn()
      }
    }
    return 0
  }
  static z9o(t, e) {
    var l, t = t.GetComponent(40)?.SkillTarget;
    return BulletConstant_1.BulletConstant.OpenCreateLog && (l = t?.Entity?.GetComponent(1)?.Owner?.GetName(), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Bullet", 20, "获取技能目标", ["BulletId", e], ["Target", l ?? StringUtils_1.NONE_STRING]), t?.Valid ? t.Id : 0
  }
  static hNn() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(32)?.GetCurrentTarget();
    return t?.Valid ? t.Id : 0
  }
  static J9o(t, e, l, r, o) {
    var i = e.Move.InitVelocityDirStandard;
    if (5 === i) {
      var a = t.GetComponent(32)?.GetCurrentTarget();
      if (a?.Valid) return a.Id
    } else {
      if (6 === i) return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(t.Id, e.Move.TrackTargetBlackboardKey, l);
      if (11 === i || 12 === i) return a = parseInt(e.Move.InitVelocityDirParam), this.Z9o(t, a, l);
      if (10 === i) return this.hNn();
      if (8 === i) return r;
      if (9 === i) return o
    }
    return 0
  }
  static CreateBullet(t, e, l, {
    SkillId: r = 0,
    SkillContextId: o = BigInt(0),
    SyncType: i = 0,
    ParentId: a,
    BulletData: n,
    TargetId: s = 0,
    BaseTransformId: u,
    BaseVelocityId: _,
    Size: f,
    InitTargetLocation: B,
    Source: c = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource,
    LocationOffset: d,
    BeginRotatorOffset: C,
    DtType: g = -1,
    RandomPosOffset: M = void 0,
    RandomInitSpeedOffset: h = void 0,
    BattleFlags: m = void 0,
    ParentIds: S = void 0
  } = {}, v = void 0, y = 0) {
    var I = 2 === i,
      t = ModelManager_1.ModelManager.BulletModel.CreateBullet(t, e, l, B, r, a, I, s, u, _, f, n, i, v, o, c, d, C, g, M, h, m, S, y);
    if (t?.Valid) return t
  }
  static DestroyBullet(t, e, l = 0) {
    StatDefine_1.BATTLESTAT_ENABLED && StatDefine_1.battleStat.BulletDestroy?.Start(), ModelManager_1.ModelManager.BulletModel.DestroyBullet(t, e, l), StatDefine_1.BATTLESTAT_ENABLED && StatDefine_1.battleStat.BulletDestroy?.Stop()
  }
  static DestroyAllBullet(t = !1) {
    ModelManager_1.ModelManager.BulletModel.DestroyAllBullet(t)
  }
  static DestroySpecifiedBullet(e, l, r = !1, o = 0, i = 0) {
    if (1 === o) {
      let t = !1;
      o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(!0);
      for (const a of o)
        if (a.Id === e) {
          t = !0;
          break
        } if (t)
        for (const n of o) this.DestroyBulletByOwnerIdAndName(n.Id, l, r, i)
    } else this.DestroyBulletByOwnerIdAndName(e, l, r, i)
  }
  static DestroyBulletByOwnerIdAndName(e, l, r = !1, o = 0) {
    e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(e);
    if (e)
      if (o <= 0)
        for (const t of e) t.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(l) && BulletController.DestroyBullet(t.Id, r);
      else {
        let t = 0;
        for (const i of e) i.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(l) && (BulletController.DelayDestroyBullet(i.GetBulletInfo(), r, t * o), t++)
      }
  }
  static DelayDestroyBullet(t, e, l) {
    var r;
    l <= 0 ? BulletController.DestroyBullet(t.BulletEntityId, e) : ((r = BulletController.GetActionCenter().CreateBulletActionInfo(17)).DelayTime = l * TimeUtil_1.TimeUtil.InverseMillisecond, r.SummonChild = e, r.IgnoreBulletActorTimeScale = !0, BulletController.GetActionRunner().AddAction(t, r), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 17, "延迟销毁子弹", ["BulletId", t.BulletRowName], ["EntityId", t.BulletEntityId], ["delayTime", r.DelayTime]))
  }
  static GetSpecifiedBulletCount(t, e) {
    let l = 0;
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t)
      for (const r of t) r.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(e) && l++;
    return l
  }
  static AddSimpleAction(t, e) {
    e = this.GetActionCenter().CreateBulletActionInfo(e);
    this.Q9o.AddAction(t, e)
  }
  static SetTimeDilation(t) {
    for (const e of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator())
      for (const l of e) l.SetTimeDilation(t)
  }
  static CreateBulletNotify(l, r) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && l) {
      var o = r.r5n,
        i = String(MathUtils_1.MathUtils.LongToBigInt(r.Mjn)),
        a = r?.rAs;
      let t = !1;
      a && (s = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(a)))?.Valid && (s.IsInit ? (n = s.Entity.GetComponent(1), this.Mme.FromUeTransform(n.ActorTransform)) : (n = s.Entity.GetComponent(0), this.Mme.FromUeTransform(n.D_GetTransform()), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 20, "实体未加载完成, 从CreatureData里面获取信息", ["Transform", this.Mme.ToUeTransform().ToString()], ["Bullet", i], ["Creature", a])), t = !0), t || (void 0 !== r?.P5n || void 0 !== r?.g8n ? (this.Mme.Reset(), s = r.P5n, (n = r.g8n) && (this.cie.DeepCopy(n), this.cie.Quaternion(this.e7o), this.Mme.SetRotation(this.e7o)), s && this.Mme.SetLocation(s), this.Mme.SetScale3D(Vector_1.Vector.OneVectorProxy)) : (a = l?.CheckGetComponent(3)) && (this.Mme.SetLocation(a.ActorLocationProxy), this.cie.DeepCopy(a.ActorRotationProxy), this.Mme.SetRotation(a.ActorQuatProxy)));
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(r.Ejn)),
        s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(r.yjn)),
        a = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(r.CVn));
      let e = void 0;
      r.iAs && (e = new UE.VectorDouble(r.iAs.X, r.iAs.Y, r.iAs.Z));
      l = BulletController.t7o(l, i, this.Mme.ToUeTransform(), o, n, s, a, MathUtils_1.MathUtils.LongToBigInt(r.K8n.$8n), e, r.Tjn, r.Ljn, r.Djn, r.M8n);
      l && (ModelManager_1.ModelManager.BulletModel.RegisterBullet(r.uVn, l.Id), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 17, "创建子弹Notify", ["bulletRowName", i], ["skillId", o], ["handleId", r.uVn?.cVn], ["playerId", r.uVn?.W5n], ["Location", this.Mme.GetLocation()], ["Rotation", this.cie], ["TargetId", r.CVn], ["CurrentTargetId", a]), l.Data.Render.HandOverParentEffect) && (n = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(r.Sjn), s = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(n)?.GetBulletInfo(), i = l.GetBulletInfo(), s && i && BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(s, i), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Bullet", 17, "接手父子弹特效", ["parentBulletId", n])
    }
  }
  static DestroyBulletNotify(t, e) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 17, "删除子弹Notify", ["handleId", e?.uVn?.cVn], ["playerId", e?.uVn?.W5n]), ModelManager_1.ModelManager.BulletModel.DestroyBulletRemote(e.uVn, e.oAs)
  }
  static ModifyBulletParamsNotify(t, e) {
    var l = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(e?.Ajn?.uVn),
      l = EntitySystem_1.EntitySystem.Get(l),
      e = MathUtils_1.MathUtils.LongToNumber(e.Ajn.CVn),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e),
      e = (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 20, "收到修改子弹目标通知", ["新的目标id", r?.Id], ["CreatureId", e]), l?.GetBulletInfo());
    e && r?.Valid && e.SetTargetById(r.Id)
  }
  static t7o(t, e, l, r, o, i, a, n, s, u = -1, _ = void 0, f = void 0, B = void 0) {
    BulletController.Iuu(e);
    t = this.CreateBullet(t, e, l, {
      SkillId: r,
      SyncType: 2,
      BaseTransformId: o,
      BaseVelocityId: i,
      TargetId: a,
      InitTargetLocation: s,
      DtType: u,
      RandomPosOffset: _,
      RandomInitSpeedOffset: f,
      Size: B ? Vector_1.Vector.Create(B) : void 0
    }, n);
    return BulletController.Tuu(e), t
  }
  static Z9o(t, e, l) {
    if (isNaN(e)) Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "pos NAN！", ["bulletRowName", l]);
    else {
      t = t.GetComponent(0).CustomServerEntityIds;
      if (e > t.length || 0 === e) Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "pos不合法！", ["bulletRowName", l], ["pos", e], ["serverEntityIds", t]);
      else {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t[e - 1]);
        if (r) return r.Id;
        Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "无法找到伴生物实体", ["bulletRowName", l], ["pos", e], ["serverEntityIds", t])
      }
    }
    return 0
  }
  static GetBulletCreateStat(t) {
    let e = this.i7o.get(t);
    return e || (e = Stats_1.Stat.CreateNoFlameGraph("BulletCreate" + t), this.i7o.set(t, e)), e
  }
  static GetBulletDestroyStat(t) {
    let e = this.o7o.get(t);
    return e || (e = Stats_1.Stat.CreateNoFlameGraph("BulletDestroy" + t), this.o7o.set(t, e)), e
  }
  static GetBulletMoveTickStat(t) {
    let e = this.r7o.get(t);
    return e || (e = Stats_1.Stat.CreateNoFlameGraph("BulletMoveTick" + t), this.r7o.set(t, e)), e
  }
  static GetBulletCollisionTickStat(t) {
    let e = this.n7o.get(t);
    return e || (e = Stats_1.Stat.CreateNoFlameGraph("BulletCollisionTick" + t), this.n7o.set(t, e)), e
  }
  static GetBulletCollisionAfterTickStat(t) {
    let e = this.s7o.get(t);
    return e || (e = Stats_1.Stat.CreateNoFlameGraph("BulletCollisionAfterTick" + t), this.s7o.set(t, e)), e
  }
  static GetSceneBulletOwner() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(ModelManager_1.ModelManager.BulletModel.SceneBulletOwnerId)
  }
  static SetBulletSpeedRatio(t, e) {
    t = (ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t)?.GetBulletInfo())?.MoveInfo;
    t && (t.BulletSpeedRatio = e)
  }
  static SetBulletLiveRatio(t, e) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t)?.GetBulletInfo();
    t && (t.LiveTimeRatio = e)
  }
}
BulletController.X9o = [], BulletController.Q9o = void 0, BulletController.i7o = new Map, BulletController.o7o = new Map, BulletController.r7o = new Map, BulletController.n7o = new Map, BulletController.s7o = new Map, BulletController.bJe = (t, e) => {
  if (e) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t)
      for (const o of t) {
        var l, r = o.GetBulletInfo();
        e === r.BulletInitParams.SkillId && ((l = r.BulletDataMain).Move.IsDetachOnSkillEnd && r.Actor.K2_DetachFromActor(1, 1, 1), l.Base.DestroyOnSkillEnd) && (r.IsDestroyByCharSkillEnd = !0, BulletController.DestroyBullet(o.Id, !1))
      }
  }
}, BulletController.zpe = (t, e) => {
  e && BulletConfig_1.BulletConfig.RemoveCacheBulletDataByEntityId(e.Id)
}, BulletController.mna = () => {
  for (const e of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
    var t = e.GetBulletInfo();
    t.NeedDestroy || BulletStaticFunction_1.BulletStaticFunction.UpdateEffectQualityLevel(t)
  }
}, BulletController.$9o = Stats_1.Stat.Create("BulletConfigGetData"), BulletController.Mme = Transform_1.Transform.Create(), BulletController.cie = Rotator_1.Rotator.Create(), BulletController.e7o = Quat_1.Quat.Create(), __decorate([CombatMessage_1.CombatNet.Listen("MFn", !0)], BulletController, "CreateBulletNotify", null), __decorate([CombatMessage_1.CombatNet.Listen("SFn", !0)], BulletController, "DestroyBulletNotify", null), __decorate([CombatMessage_1.CombatNet.Listen("FFn", !0)], BulletController, "ModifyBulletParamsNotify", null), exports.BulletController = BulletController;
//# sourceMappingURL=BulletController.js.map