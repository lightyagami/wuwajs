"use strict";

var __decorate = this && this.__decorate || function (t, e, l, r) {
  var o;
  var i = arguments.length;
  var a = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, l) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, l, r);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        a = (i < 3 ? o(a) : i > 3 ? o(e, l, a) : o(e, l)) || a;
      }
    }
  }
  if (i > 3 && a) {
    Object.defineProperty(e, l, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Entity_1 = require("../../../Core/Entity/Entity");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const PerformanceDecorators_1 = require("../../../Core/Performance/PerformanceDecorators");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const StatDefine_1 = require("../../Common/StatDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CombatMessage_1 = require("../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../Utils/CombatLog");
const CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds");
const BulletActionRunner_1 = require("./Action/BulletActionRunner");
const BulletConfig_1 = require("./BulletConfig");
const BulletConstant_1 = require("./BulletConstant");
const BulletStaticFunction_1 = require("./BulletStaticMethod/BulletStaticFunction");
const BulletPool_1 = require("./Model/BulletPool");
const BulletCollisionSystem_1 = require("./System/BulletCollisionSystem");
const BulletMoveSystem_1 = require("./System/BulletMoveSystem");
class BulletController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      BulletConstant_1.BulletConstant.OpenCreateLog = true;
      BulletConstant_1.BulletConstant.OpenActionStat = true;
    }
    BulletActionRunner_1.BulletActionRunner.InitStat();
    this.Q9o ||= new BulletActionRunner_1.BulletActionRunner();
    this.Q9o.Init();
    BulletPool_1.BulletPool.Init();
    this.X9o.length = 0;
    this.X9o.push(new BulletMoveSystem_1.BulletMoveSystem());
    this.X9o.push(new BulletCollisionSystem_1.BulletCollisionSystem());
    this.sCe();
    return true;
  }
  static OnTick(t) {
    if (this.Q9o) {
      this.Q9o.Pause();
      for (const e of this.X9o) {
        e.OnTick(t);
      }
      this.Q9o.Resume();
      this.Q9o.Run(t);
      ConfigManager_1.ConfigManager.BulletConfig.TickPreload();
    }
  }
  static OnAfterTick(t) {
    if (this.X9o && this.Q9o) {
      this.Q9o.Pause();
      for (const e of this.X9o) {
        e.OnAfterTick(t);
      }
      this.Q9o.Resume();
      this.Q9o.Run(t, true);
      BulletPool_1.BulletPool.CheckAtFrameEnd();
    }
  }
  static OnClear() {
    this.Q9o.Clear();
    this.aCe();
    BulletPool_1.BulletPool.Clear();
    return !(this.X9o.length = 0);
  }
  static OnLeaveLevel() {
    BulletConfig_1.BulletConfig.ClearBulletDataCache();
    ConfigManager_1.ConfigManager.BulletConfig.ClearPreload();
    return true;
  }
  static GetActionCenter() {
    return this.Q9o.GetActionCenter();
  }
  static GetActionRunner() {
    return this.Q9o;
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSkillEnd, BulletController.bJe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, BulletController.zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetNiagaraQuality, BulletController.mna);
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSkillEnd, BulletController.bJe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, BulletController.zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetNiagaraQuality, BulletController.mna);
  }
  static HasAuthority(t) {
    return (t instanceof Entity_1.Entity ? t.GetComponent(3)?.Actor : t)?.IsAutonomousProxy() ?? false;
  }
  static PSu(t) {
    if (StatDefine_1.BATTLESTAT_ENABLED) {
      StatDefine_1.battleStat.BulletCreate?.Start();
      this.GetBulletCreateStat(t).Start();
    }
  }
  static xSu(t) {
    if (StatDefine_1.BATTLESTAT_ENABLED) {
      this.GetBulletCreateStat(t).Stop();
      StatDefine_1.battleStat.BulletCreate?.Stop();
    }
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
    CreateOnAuthority: C = true,
    BattleFlags: g = undefined,
    ParentIds: M = undefined
  } = {}, h = undefined, m = 0) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone) {
      BulletController.PSu(e);
      if (!t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "创建子弹时Owner为空", ["rowName", e]);
        }
      }
      if (h || (0, CharacterBuffIds_1.checkBulletInSpecialList)(e)) {
        var S = t instanceof Entity_1.Entity ? t : t.GetEntityNoBlueprint();
        BulletController.$9o.Start();
        var v = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(S, e, true, d);
        BulletController.$9o.Stop();
        if (v) {
          if (m === 1 && v.Base.DestroyOnSkillEnd) {
            var y = S.GetComponent(39);
            if (!y?.Valid) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Bullet", 20, "勾选了技能结束是否销毁子弹, 技能组件不存在", ["bulletRowName", e], ["SkillId", r]);
              }
              BulletController.xSu(e);
              return;
            }
            if (!y.GetSkill(r)?.Active) {
              BulletController.xSu(e);
              return;
            }
          }
          y = BulletController.sNn(i, v);
          if (!C || y !== 1 || BulletController.HasAuthority(t)) {
            i = this.Y9o(S, v, e, a, n);
            C = this.J9o(S, v, e, a, n);
            t = this.aNn(S, v, e, a, n);
            a = this.CreateBullet(S, e, l, {
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
            }, h, m);
            BulletController.xSu(e);
            return a;
          }
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 17, "等待远端创建同步子弹", ["bulletRowName", e], ["skillId", r]);
          }
        }
      } else {
        CombatLog_1.CombatLog.Error("Bullet", 35, "创建子弹时contextId为空", ["rowName", e]);
      }
      BulletController.xSu(e);
    }
  }
  static aNn(t, e, l, r, o) {
    var i = e.Base.BornPositionStandard;
    if (i === 1) {
      return this.z9o(t, l);
    }
    if (i === 5) {
      return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(t.Id, e.Base.BlackboardKey, l);
    }
    if (i === 7) {
      return r;
    }
    if (i === 8) {
      return o;
    }
    if (i === 10 || i === 11) {
      r = parseInt(e.Base.BlackboardKey);
      return this.Z9o(t, r, l);
    }
    if (i === 4) {
      o = t.GetComponent(32)?.GetCurrentTarget();
      if (o?.Valid) {
        return o.Id;
      }
    } else if (i === 9) {
      return this.hNn();
    }
    return 0;
  }
  static sNn(t, e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && t === 0) {
      if (e.Base.SyncType === 1) {
        return 1;
      }
      var l = e.Base.BornPositionStandard;
      if (l === 4 || l === 9 || l === 10) {
        return 1;
      }
      l = e.Move.InitVelocityDirStandard;
      if (l === 10 || l === 5) {
        return 1;
      }
      l = e.Move.TrackTarget;
      if (l === 4 || l === 3) {
        return 1;
      }
      l = e.Execution;
      l.InitGbGroup();
      if (l.HasRebound) {
        return 1;
      }
    }
    return t;
  }
  static CreateBulletForDebug(t, e) {
    var t = t.GetEntityNoBlueprint()?.Id ?? 0;
    var t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(t);
    var l = new Protocol_1.Aki.Protocol.Gzn();
    l.VVn = 0;
    l.P8n = `@gmcreatebullet ${t} ${e}`;
    Net_1.Net.Call(23520, Protocol_1.Aki.Protocol.Gzn.create(l), () => {});
    return 0;
  }
  static Y9o(t, e, l, r, o) {
    var i = e.Move.TrackTarget;
    if (i === 4 || i === 3) {
      var a = t.GetComponent(32)?.GetCurrentTarget();
      if (a?.Valid) {
        return a.Id;
      }
    } else {
      if (i === 5) {
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(t.Id, e.Move.TrackTargetBlackboardKey, l);
      }
      if (i === 7) {
        if (r) {
          return r;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "父子弹受击者 VictimId为空", ["rowName", l]);
        }
      } else if (i === 8) {
        if (o) {
          return o;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "父子弹目标为空", ["rowName", l]);
        }
      } else {
        if (i === 6) {
          return t.Id;
        }
        if (i === 2 || i === 11) {
          return BulletController.z9o(t, l);
        }
        if (i === 1) {
          if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
            return Global_1.Global.BaseCharacter.GetEntityIdNoBlueprint();
          }
          a = t.GetComponent(0);
          e = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(a.GetPlayerId(), {
            ParamType: 2,
            IsControl: true
          }).EntityHandle;
          if (e?.Valid) {
            return e.Id;
          }
        } else if (i === 9) {
          return this.hNn();
        }
      }
    }
    return 0;
  }
  static z9o(t, e) {
    var l;
    var t = t.GetComponent(40)?.SkillTarget;
    if (BulletConstant_1.BulletConstant.OpenCreateLog && (l = t?.Entity?.GetComponent(1)?.Owner?.GetName(), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Bullet", 20, "获取技能目标", ["BulletId", e], ["Target", l ?? StringUtils_1.NONE_STRING]);
    }
    if (t?.Valid) {
      return t.Id;
    } else {
      return 0;
    }
  }
  static hNn() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(32)?.GetCurrentTarget();
    if (t?.Valid) {
      return t.Id;
    } else {
      return 0;
    }
  }
  static J9o(t, e, l, r, o) {
    var i = e.Move.InitVelocityDirStandard;
    if (i === 5) {
      var a = t.GetComponent(32)?.GetCurrentTarget();
      if (a?.Valid) {
        return a.Id;
      }
    } else {
      if (i === 6) {
        return ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(t.Id, e.Move.TrackTargetBlackboardKey, l);
      }
      if (i === 11 || i === 12) {
        a = parseInt(e.Move.InitVelocityDirParam);
        return this.Z9o(t, a, l);
      }
      if (i === 10) {
        return this.hNn();
      }
      if (i === 8) {
        return r;
      }
      if (i === 9) {
        return o;
      }
    }
    return 0;
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
    RandomPosOffset: M = undefined,
    RandomInitSpeedOffset: h = undefined,
    BattleFlags: m = undefined,
    ParentIds: S = undefined
  } = {}, v = undefined, y = 0) {
    var I = i === 2;
    var t = ModelManager_1.ModelManager.BulletModel.CreateBullet(t, e, l, B, r, a, I, s, u, _, f, n, i, v, o, c, d, C, g, M, h, m, S, y);
    if (t?.Valid) {
      return t;
    }
  }
  static DestroyBullet(t, e, l = 0) {
    if (StatDefine_1.BATTLESTAT_ENABLED) {
      StatDefine_1.battleStat.BulletDestroy?.Start();
    }
    ModelManager_1.ModelManager.BulletModel.DestroyBullet(t, e, l);
    if (StatDefine_1.BATTLESTAT_ENABLED) {
      StatDefine_1.battleStat.BulletDestroy?.Stop();
    }
  }
  static DestroyAllBullet(t = false) {
    ModelManager_1.ModelManager.BulletModel.DestroyAllBullet(t);
  }
  static DestroySpecifiedBullet(e, l, r = false, o = 0, i = 0) {
    if (o === 1) {
      let t = false;
      o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(true);
      for (const a of o) {
        if (a.Id === e) {
          t = true;
          break;
        }
      }
      if (t) {
        for (const n of o) {
          this.DestroyBulletByOwnerIdAndName(n.Id, l, r, i);
        }
      }
    } else {
      this.DestroyBulletByOwnerIdAndName(e, l, r, i);
    }
  }
  static DestroyBulletByOwnerIdAndName(e, l, r = false, o = 0) {
    e = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(e);
    if (e) {
      if (o <= 0) {
        for (const t of e) {
          if (t.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(l)) {
            BulletController.DestroyBullet(t.Id, r);
          }
        }
      } else {
        let t = 0;
        for (const i of e) {
          if (i.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(l)) {
            BulletController.DelayDestroyBullet(i.GetBulletInfo(), r, t * o);
            t++;
          }
        }
      }
    }
  }
  static DelayDestroyBullet(t, e, l) {
    var r;
    if (l <= 0) {
      BulletController.DestroyBullet(t.BulletEntityId, e);
    } else {
      (r = BulletController.GetActionCenter().CreateBulletActionInfo(17)).DelayTime = l * TimeUtil_1.TimeUtil.InverseMillisecond;
      r.SummonChild = e;
      r.IgnoreBulletActorTimeScale = true;
      BulletController.GetActionRunner().AddAction(t, r);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 17, "延迟销毁子弹", ["BulletId", t.BulletRowName], ["EntityId", t.BulletEntityId], ["delayTime", r.DelayTime]);
      }
    }
  }
  static GetSpecifiedBulletCount(t, e) {
    let l = 0;
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t) {
      for (const r of t) {
        if (r.GetBulletInfo().BulletDataMain?.BulletFName.op_Equality(e)) {
          l++;
        }
      }
    }
    return l;
  }
  static AddSimpleAction(t, e) {
    e = this.GetActionCenter().CreateBulletActionInfo(e);
    this.Q9o.AddAction(t, e);
  }
  static SetTimeDilation(t) {
    for (const e of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator()) {
      for (const l of e) {
        l.SetTimeDilation(t);
      }
    }
  }
  static CreateBulletNotify(l, r) {
    if (ModelManager_1.ModelManager.GameModeModel.WorldDone && l) {
      var o = MathUtils_1.MathUtils.LongToNumber(r.r5n);
      var i = String(MathUtils_1.MathUtils.LongToBigInt(r.Mjn));
      var a = r?.rAs;
      let t = false;
      if (a && (s = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(a)))?.Valid) {
        if (s.IsInit) {
          n = s.Entity.GetComponent(1);
          this.Mme.FromUeTransform(n.ActorTransform);
        } else {
          n = s.Entity.GetComponent(0);
          this.Mme.FromUeTransform(n.D_GetTransform());
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 20, "实体未加载完成, 从CreatureData里面获取信息", ["Transform", this.Mme.ToUeTransform().ToString()], ["Bullet", i], ["Creature", a]);
          }
        }
        t = true;
      }
      if (!t) {
        if (r?.P5n !== undefined || r?.g8n !== undefined) {
          this.Mme.Reset();
          s = r.P5n;
          if (n = r.g8n) {
            this.cie.DeepCopy(n);
            this.cie.Quaternion(this.e7o);
            this.Mme.SetRotation(this.e7o);
          }
          if (s) {
            this.Mme.SetLocation(s);
          }
          this.Mme.SetScale3D(Vector_1.Vector.OneVectorProxy);
        } else if (a = l?.CheckGetComponent(3)) {
          this.Mme.SetLocation(a.ActorLocationProxy);
          this.cie.DeepCopy(a.ActorRotationProxy);
          this.Mme.SetRotation(a.ActorQuatProxy);
        }
      }
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(r.Ejn));
      var s = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(r.yjn));
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntityId(MathUtils_1.MathUtils.LongToNumber(r.CVn));
      let e = undefined;
      if (r.iAs) {
        e = new UE.VectorDouble(r.iAs.X, r.iAs.Y, r.iAs.Z);
      }
      l = BulletController.t7o(l, i, this.Mme.ToUeTransform(), o, n, s, a, MathUtils_1.MathUtils.LongToBigInt(r.K8n.$8n), e, r.Tjn, r.Ljn, r.Djn, r.M8n);
      if (l && (ModelManager_1.ModelManager.BulletModel.RegisterBullet(r.uVn, l.Id), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Bullet", 17, "创建子弹Notify", ["bulletRowName", i], ["skillId", o], ["handleId", r.uVn?.cVn], ["playerId", r.uVn?.W5n], ["Location", this.Mme.GetLocation()], ["Rotation", this.cie], ["TargetId", r.CVn], ["CurrentTargetId", a]), l.Data.Render.HandOverParentEffect) && (n = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(r.Sjn), s = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(n)?.GetBulletInfo(), i = l.GetBulletInfo(), s && i && BulletStaticFunction_1.BulletStaticFunction.HandOverEffects(s, i), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Bullet", 17, "接手父子弹特效", ["parentBulletId", n]);
      }
    }
  }
  static DestroyBulletNotify(t, e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 17, "删除子弹Notify", ["handleId", e?.uVn?.cVn], ["playerId", e?.uVn?.W5n]);
    }
    ModelManager_1.ModelManager.BulletModel.DestroyBulletRemote(e.uVn, e.oAs);
  }
  static ModifyBulletParamsNotify(t, e) {
    var l = ModelManager_1.ModelManager.BulletModel.GetIdByBulletHandle(e?.Ajn?.uVn);
    var l = EntitySystem_1.EntitySystem.Get(l);
    var e = MathUtils_1.MathUtils.LongToNumber(e.Ajn.CVn);
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "收到修改子弹目标通知", ["新的目标id", r?.Id], ["CreatureId", e]);
    }
    var e = l?.GetBulletInfo();
    if (e && r?.Valid) {
      e.SetTargetById(r.Id);
    }
  }
  static t7o(t, e, l, r, o, i, a, n, s, u = -1, _ = undefined, f = undefined, B = undefined) {
    BulletController.PSu(e);
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
      Size: B ? Vector_1.Vector.Create(B) : undefined
    }, n);
    BulletController.xSu(e);
    return t;
  }
  static Z9o(t, e, l) {
    if (isNaN(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 20, "pos NAN！", ["bulletRowName", l]);
      }
    } else {
      t = t.GetComponent(0).CustomServerEntityIds;
      if (e > t.length || e === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "pos不合法！", ["bulletRowName", l], ["pos", e], ["serverEntityIds", t]);
        }
      } else {
        var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(t[e - 1]);
        if (r) {
          return r.Id;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 20, "无法找到伴生物实体", ["bulletRowName", l], ["pos", e], ["serverEntityIds", t]);
        }
      }
    }
    return 0;
  }
  static GetBulletCreateStat(t) {
    let e = this.i7o.get(t);
    if (!e) {
      e = Stats_1.Stat.CreateNoFlameGraph("BulletCreate" + t);
      this.i7o.set(t, e);
    }
    return e;
  }
  static GetBulletDestroyStat(t) {
    let e = this.o7o.get(t);
    if (!e) {
      e = Stats_1.Stat.CreateNoFlameGraph("BulletDestroy" + t);
      this.o7o.set(t, e);
    }
    return e;
  }
  static GetBulletMoveTickStat(t) {
    let e = this.r7o.get(t);
    if (!e) {
      e = Stats_1.Stat.CreateNoFlameGraph("BulletMoveTick" + t);
      this.r7o.set(t, e);
    }
    return e;
  }
  static GetBulletCollisionTickStat(t) {
    let e = this.n7o.get(t);
    if (!e) {
      e = Stats_1.Stat.CreateNoFlameGraph("BulletCollisionTick" + t);
      this.n7o.set(t, e);
    }
    return e;
  }
  static GetBulletCollisionAfterTickStat(t) {
    let e = this.s7o.get(t);
    if (!e) {
      e = Stats_1.Stat.CreateNoFlameGraph("BulletCollisionAfterTick" + t);
      this.s7o.set(t, e);
    }
    return e;
  }
  static GetSceneBulletOwner() {
    return ModelManager_1.ModelManager.CreatureModel.GetEntity(ModelManager_1.ModelManager.BulletModel.SceneBulletOwnerId);
  }
  static SetBulletSpeedRatio(t, e) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t)?.GetBulletInfo()?.MoveInfo;
    if (t) {
      t.BulletSpeedRatio = e;
    }
  }
  static SetBulletLiveRatio(t, e) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t)?.GetBulletInfo();
    if (t) {
      t.LiveTimeRatio = e;
    }
  }
}
BulletController.X9o = [];
BulletController.Q9o = undefined;
BulletController.i7o = new Map();
BulletController.o7o = new Map();
BulletController.r7o = new Map();
BulletController.n7o = new Map();
BulletController.s7o = new Map();
BulletController.bJe = (t, e) => {
  if (e) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t) {
      for (const o of t) {
        var l;
        var r = o.GetBulletInfo();
        if (e === r.BulletInitParams.SkillId && ((l = r.BulletDataMain).Move.IsDetachOnSkillEnd && r.Actor.K2_DetachFromActor(1, 1, 1), l.Base.DestroyOnSkillEnd)) {
          r.IsDestroyByCharSkillEnd = true;
          BulletController.DestroyBullet(o.Id, false);
        }
      }
    }
  }
};
BulletController.zpe = (t, e) => {
  if (e) {
    BulletConfig_1.BulletConfig.RemoveCacheBulletDataByEntityId(e.Id);
  }
};
BulletController.mna = () => {
  for (const e of ModelManager_1.ModelManager.BulletModel.GetBulletEntityMap().values()) {
    var t = e.GetBulletInfo();
    if (!t.NeedDestroy) {
      BulletStaticFunction_1.BulletStaticFunction.UpdateEffectQualityLevel(t);
    }
  }
};
BulletController.$9o = Stats_1.Stat.Create("BulletConfigGetData");
BulletController.Mme = Transform_1.Transform.Create();
BulletController.cie = Rotator_1.Rotator.Create();
BulletController.e7o = Quat_1.Quat.Create();
__decorate([CombatMessage_1.CombatNet.Listen("MFn", true)], BulletController, "CreateBulletNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("SFn", true)], BulletController, "DestroyBulletNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("FFn", true)], BulletController, "ModifyBulletParamsNotify", null);
exports.BulletController = BulletController; //# sourceMappingURL=BulletController.js.map