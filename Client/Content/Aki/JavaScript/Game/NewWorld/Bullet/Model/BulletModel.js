"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletPersistentTimeScale = exports.BulletModel = exports.BulletInitParams = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const StatDefine_1 = require("../../../Common/StatDefine");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const CombatLog_1 = require("../../../Utils/CombatLog");
const WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
const BulletActorPool_1 = require("../BulletActorPool");
const BulletConstant_1 = require("../BulletConstant");
const BulletController_1 = require("../BulletController");
const BulletLog_1 = require("../BulletStaticMethod/BulletLog");
const BulletUtil_1 = require("../BulletUtil");
const BulletInfo_1 = require("./BulletInfo");
const BulletMoveInfo_1 = require("./BulletMoveInfo");
const BulletPool_1 = require("./BulletPool");
const BulletTraceElementPool_1 = require("./BulletTraceElementPool");
class BulletInitParams {
  constructor(t, e, l, i, o = 0, s = 0, r = 0, n = 0, u = 0, h = undefined, a = false, _ = 0, B = undefined, d = undefined, v = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource, f = undefined, c = undefined, m = -1, g = undefined, M = 0) {
    this.Owner = t;
    this.BulletRowName = e;
    this.InitialTransform = l;
    this.InitTargetLocation = i;
    this.SkillId = o;
    this.ParentId = s;
    this.TargetId = r;
    this.BaseTransformId = n;
    this.BaseVelocityId = u;
    this.Size = h;
    this.FromRemote = a;
    this.SyncType = _;
    this.ContextId = B;
    this.SkillContextId = d;
    this.Source = v;
    this.LocationOffset = f;
    this.BeginRotatorOffset = c;
    this.DtType = m;
    this.BattleFlags = g;
    this.CreateSource = M;
  }
}
exports.BulletInitParams = BulletInitParams;
class BulletModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ZHo = new Map();
    this.ejo = new Array();
    this.tjo = new Map();
    this.ijo = new Set();
    this.ojo = undefined;
    this.Y$s = 0;
    this.nSa = true;
    this.nye = () => {
      BulletModel.rjo.Start();
      ConfigManager_1.ConfigManager.BulletConfig.PreloadCommonBulletData();
      BulletActorPool_1.BulletActorPool.Preload();
      BulletModel.rjo.Stop();
    };
    this.njo = new Map();
    this.sjo = t => {
      this.njo.set(t.BulletEntityId, true);
    };
    this.ajo = new Map();
    this.hjo = new Map();
    this.ljo = new Map();
    this._jo = new Map();
    this.ujo = new Map();
    this.SelfAdaptBeHitAnim = undefined;
    this.HeavyHitAnim = undefined;
    this.Index2LightHitAnimMap = undefined;
    this.Index2HeavyHitAnimMap = undefined;
    this.cjo = new Set();
    this.mjo = false;
    this.djo = t => {
      if (t.PlotLevel === "LevelA" || t.PlotLevel === "LevelB" || t.PlotLevel === "LevelC") {
        this.mjo = true;
        for (const e of this.cjo) {
          this.DestroyBullet(e, false, 0);
        }
        this.cjo.clear();
        this.Y8a(true);
      }
    };
    this.Cjo = () => {
      if (this.mjo) {
        this.Y8a(false);
        this.mjo = false;
      }
    };
    this.PersistentTimeScaleMap = new Map();
    this.PersistentTimeScaleId = 0;
    this.Jaa = 0;
    this.IsSceneBulletOwnerCreated = false;
    this.ala = undefined;
    this.Aal = undefined;
    this.a$d = undefined;
    this.h$d = undefined;
    this.zpe = (t, e) => {
      var l;
      var e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e.Id);
      if (this.h$d.has(e) && (l = this.h$d.get(e), this.h$d.delete(e), this.a$d.has(l))) {
        this.a$d.get(l).delete(e);
      }
    };
  }
  GetBulletEntityMap() {
    return this.ZHo;
  }
  GetBulletEntityById(t) {
    return this.ZHo.get(t);
  }
  GetBulletSetByAttacker(t) {
    return this.tjo.get(t);
  }
  GetAttackerBulletIterator() {
    return this.tjo.values();
  }
  get OnHitMaterialMsDelay() {
    return this.Y$s;
  }
  get OpenHitMaterial() {
    return this.nSa;
  }
  set OpenHitMaterial(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, "Set Bullet Func OpenHitMaterial", ["val", t]);
    }
    this.nSa = t;
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet", UE.BulletCommonDataAsset_C, t => {
      this.ojo = t;
      this.Y$s = t.OnHitMaterialDelay * MathUtils_1.MathUtils.SecondToMillisecond;
    });
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 5, "BulletManagerTs Init Finish");
    }
    for (let t = 0; t < 20; t++) {
      this.ejo.push(new Set());
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.djo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BulletHit, this.sjo);
    }
    this.gjo();
    this.a$d = new Map();
    this.h$d = new Map();
    return true;
  }
  IsBulletHit(t) {
    return this.njo.get(t) ?? false;
  }
  Hk_() {
    for (const t of this.ZHo.values()) {
      BulletPool_1.BulletPool.RecycleBulletEntity(t);
    }
    this.ZHo.clear();
    for (const e of this.tjo.values()) {
      e.clear();
      this.ejo.push(e);
    }
    this.tjo.clear();
    this.ajo.clear();
    this.hjo.clear();
  }
  OnLeaveLevel() {
    this.Hk_();
    BulletActorPool_1.BulletActorPool.Clear();
    BulletTraceElementPool_1.BulletTraceElementPool.Clear();
    BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace = undefined;
    BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace = undefined;
    BulletMoveInfo_1.BulletMoveInfo.StickWaterSphereTrace = undefined;
    this.fjo();
    this.SceneBulletOwnerId = 0;
    this.hla();
    return true;
  }
  OnChangeMode() {
    this.Hk_();
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.djo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkEnd, this.Cjo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BulletHit, this.sjo);
    }
    BulletModel.DefaultBulletSceneInteraction = undefined;
    this.ojo = undefined;
    BulletActorPool_1.BulletActorPool.Clear();
    BulletTraceElementPool_1.BulletTraceElementPool.Clear();
    this.ljo.clear();
    this.ejo.length = 0;
    this.pjo();
    this.SceneBulletOwnerId = 0;
    this.hla();
    this.a$d?.clear();
    this.a$d = undefined;
    this.h$d?.clear();
    return !(this.h$d = undefined);
  }
  CreateBullet(t, e, l, i, o = 0, s, r = false, n = 0, u, h, a, _, B = 0, d = undefined, v = undefined, f = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource, c = undefined, m = undefined, g = -1, M = undefined, y = undefined, S = undefined, C = undefined, E = 0) {
    var L = this.vjo(e);
    if (!this.mjo || !L) {
      if (t?.Valid) {
        _ = _ ?? ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(t, e, true, g);
        if (_) {
          if (!r) {
            var I = t.GetComponent(206);
            var p = _.Base.BornForbidTagIds;
            if (p) {
              for (const P of p) {
                if (I.HasTag(P)) {
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("Bullet", 17, "BulletModel.InitBullet 中止，攻击者存在该子弹禁止生成Tag ", ["子弹名称:", e]);
                  }
                  return;
                }
              }
            }
            p = _.Base.BornRequireTagIds;
            if (p) {
              for (const w of p) {
                if (!I.HasTag(w)) {
                  if (Log_1.Log.CheckDebug()) {
                    Log_1.Log.Debug("Bullet", 17, "BulletModel.InitBullet 中止，攻击者不存在该子弹生成所需Tag", ["子弹名称:", e]);
                  }
                  return;
                }
              }
            }
          }
          p = new BulletInitParams(t, e, l, i, o, s, n, _.Base.BornPositionStandard !== 3 && _.Base.BornPositionStandard !== 2 ? u : 0, h, a, r, B, d, v, f, c, m, g, S, E);
          BulletModel.Mjo.Start();
          l = BulletPool_1.BulletPool.CreateBulletEntity();
          if (l?.Valid) {
            var D = l.GetBulletInfo();
            if (C) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Bullet", 20, "打印父子弹链", ["", Array.from(C).join(",")], ["当前子弹", e]);
              }
              if (C.has(e)) {
                CombatLog_1.CombatLog.Error("Bullet", t, "父子弹链中存在当前子弹ID", ["父子弹链", Array.from(C).join(",")], ["当前子弹", e]);
                BulletModel.Mjo.Stop();
                return;
              }
              if (D.ParentIds) {
                for (const s of C) {
                  D.ParentIds.add(s);
                }
              } else {
                D.ParentIds = C;
              }
            }
            if (r && (M && D.RandomPosOffset.FromUeVector(M), y)) {
              D.RandomInitSpeedOffset.FromUeVector(y);
            }
            D.Init(p, _);
            D.InitEntity(l);
            this.ZHo.set(l.Id, l);
            if (BulletConstant_1.BulletConstant.OpenCreateLog && Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Bullet", 17, "创建子弹", ...BulletLog_1.BulletLog.ToPairs(D));
            }
            i = D.AttackerId;
            o = this.tjo.get(i);
            (o || (s = this.ejo.pop() ?? new Set(), this.tjo.set(i, s), s)).add(l);
            this.rMc(t, e, D);
            EntitySystem_1.EntitySystem.Start(l);
            EntitySystem_1.EntitySystem.Activate(l);
            EntitySystem_1.EntitySystem.PostActive(l);
            BulletModel.Mjo.Stop();
            BulletController_1.BulletController.AddSimpleAction(D, 1);
            if (L) {
              this.cjo.add(l.Id);
            }
            return l;
          }
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 5, "BulletModel.InitBullet error, 子弹创建 失败!", ["子弹创建者:", t.GetComponent(1)?.Owner.GetName()], ["子弹名称:", e]);
          }
          BulletModel.Mjo.Stop();
        }
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Bullet", 5, "BulletModel.InitBullet 中止，攻击者已不存在", ["子弹名称:", e]);
      }
    }
  }
  rMc(s, r, n) {
    s = s.GetComponent(175)?.BuffEffectManager;
    if (s) {
      let t = 0;
      let e = 0;
      let l = 0;
      for (const a of s.FilterById(72)) {
        var u = a.GetBulletSizeScale(r);
        if (u) {
          t += u[0];
          e += u[1];
          l += u[2];
        }
      }
      let i = 0;
      for (const _ of s.FilterById(73)) {
        i += _.GetBulletDuration(r);
      }
      let o = 0;
      for (const B of s.FilterById(74)) {
        o += B.GetBulletInterval(r);
      }
      var h;
      var s = t === 0 && e === 0 && l === 0;
      if (!s || i !== 0 || o !== 0) {
        (h = new BulletInfo_1.BulletAdditionInfo()).Init();
        if (!s) {
          h.SizeScale.Set(t, e, l);
          h.SizeScale.AdditionEqual(Vector_1.Vector.OneVectorProxy);
        }
        h.DurationAddition = i;
        h.IntervalScale = 1 + o;
        n.AdditionInfo = h;
      }
    }
  }
  DestroyBullet(t, e, l = 0, i = false) {
    var o;
    var s;
    var r = this.ZHo.get(t);
    if (r) {
      r = r.GetBulletInfo();
      ModelManager_1.ModelManager.CombatMessageModel?.OnBulletRemoved(r.BulletInitParams.SkillContextId, r.ContextId);
      if (!r.NeedDestroy) {
        r.NeedDestroy = true;
        if (BulletConstant_1.BulletConstant.OpenDestroyLog) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 17, "销毁子弹开始", ...BulletLog_1.BulletLog.ToPairs(r));
          }
        } else if (BulletConstant_1.BulletConstant.OpenCreateLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 17, "销毁子弹开始", ...BulletLog_1.BulletLog.ToPairs(r));
        }
        o = r.BulletRowName;
        if (StatDefine_1.BATTLESTAT_ENABLED) {
          BulletController_1.BulletController.GetBulletDestroyStat(o).Start();
        }
        (s = BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(13)).SummonChild = e;
        s.DestroyReason = l;
        s.DestroyEffectImmediately = i;
        this.ijo.add(t);
        BulletController_1.BulletController.GetActionRunner().AddAction(r, s);
        if (StatDefine_1.BATTLESTAT_ENABLED) {
          BulletController_1.BulletController.GetBulletDestroyStat(o).Stop();
        }
      }
    }
  }
  DestroyAllBullet(t = false) {
    for (var [e] of this.ZHo) {
      this.DestroyBullet(e, t, 0);
    }
  }
  ClearDestroyedBullets() {
    BulletModel.Ejo.Start();
    for (const o of this.ijo) {
      var t;
      var e;
      var l;
      var i = this.ZHo.get(o);
      if (i) {
        l = (t = i.GetBulletInfo()).AttackerId;
        if (e = this.tjo.get(l)) {
          e.delete(i);
          if (!e.size) {
            this.tjo.delete(l);
            this.ejo.push(e);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Bullet", 5, "BulletModel.DestroyBullet Warn, 获取被销毁子弹所在集合 失败！ ", ["子弹创建者Id:", l], ["子弹:", i]);
        }
        if (e = this.GetBulletHandleById(o)) {
          (l = Protocol_1.Aki.Protocol.te_.create()).uVn = e;
          CombatMessage_1.CombatNet.Send(24734, t.Attacker, l);
          if (BulletConstant_1.BulletConstant.OpenCreateLog && Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Bullet", 20, "销毁子弹 发送协议", ...BulletLog_1.BulletLog.ToPairs(t));
          }
          this.DeregisterBullet(e);
        }
        if (BulletConstant_1.BulletConstant.OpenCreateLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 17, "销毁子弹完成", ["BulletId", t.BulletRowName], ["EntityId", t.BulletEntityId]);
        }
        this.ZHo.delete(o);
        BulletModel.Sjo.Start();
        BulletPool_1.BulletPool.RecycleBulletEntity(i);
        BulletModel.Sjo.Stop();
      }
    }
    this.ijo.clear();
    BulletModel.Ejo.Stop();
  }
  GetFastMoveTrace(t, e) {
    switch (t) {
      case "Bullet_Type1":
        return this.ojo.FastMoveTraceBullet_Type1;
      case "Bullet_Type2":
        return this.ojo.FastMoveTraceBullet_Type2;
      case "Bullet_Type3":
        return this.ojo.FastMoveTraceBullet_Type3;
      case "Bullet_Type1_Special":
        return this.ojo.FastMoveTraceBullet_Type1_Special;
      case "Bullet_Type2_Special":
        return this.ojo.FastMoveTraceBullet_Type2_Special;
      case "Bullet_OnlyBullet":
        return this.ojo.FastMoveTraceBullet_Only_Bullet;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Bullet", 20, "找不到快速移动对应的检测类型配置", ["bulletRowName", e], ["profileName", t]);
    }
  }
  get ObjectTypeTakeAim() {
    return this.ojo.TakeAim;
  }
  get ObjectTypeObstacles() {
    return this.ojo.Obstacles;
  }
  get ObjectTypeHitPoint() {
    return this.ojo.HitPoint;
  }
  RegisterBullet(t, e) {
    var l;
    var i;
    if (t) {
      ({
        W5n: l,
        cVn: i
      } = t);
      this.hjo.set(e, t);
      if (!this.ajo.has(l)) {
        this.ajo.set(l, new Map());
      }
      this.ajo.get(l).set(i, e);
    }
  }
  DeregisterBullet(t) {
    var e;
    var l;
    if (t && (e = this.GetIdByBulletHandle(t), this.hjo.has(e) && this.hjo.delete(e), this.ajo.has(t.W5n)) && ({
      W5n: e,
      cVn: t
    } = t, (l = this.ajo.get(e)).delete(t), l.size <= 0)) {
      this.ajo.delete(e);
    }
  }
  GetIdByBulletHandle(t) {
    var e;
    if (t) {
      ({
        W5n: t,
        cVn: e
      } = t);
      return this.ajo.get(t)?.get(e) ?? 0;
    } else {
      return 0;
    }
  }
  GetBulletHandleById(t) {
    return this.hjo.get(t);
  }
  DestroyBulletRemote(t, e) {
    var l;
    if (t && this.ajo.has(t.W5n) && (l = this.GetIdByBulletHandle(t)) !== 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 17, "销毁子弹 服务端 找到需要销毁的子弹", ["handle", t], ["entityId", l]);
      }
      this.DeregisterBullet(t);
      this.DestroyBullet(l, e, 2);
    }
  }
  NewTraceElement(t, e, l, i = 0) {
    var o = UE.NewObject(t.StaticClass());
    o.WorldContextObject = GlobalData_1.GlobalData.World;
    if (e) {
      for (let t = 0; t < e.Num(); t++) {
        var s = e.Get(t);
        if (!l?.has(s)) {
          o.AddObjectTypeQuery(s);
        }
      }
    }
    o.bTraceComplex = false;
    o.bIgnoreSelf = true;
    return o;
  }
  GetEntityIdByCustomKey(t, e, l) {
    e = e.concat(t.toString());
    t = this.ljo.get(e);
    return t || (Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 20, "获取自定义目标失败", ["Bullet", l], ["Key", e], ["Entity", t]), 0);
  }
  SetEntityIdByCustomKey(t, e, l) {
    e = e.concat(t.toString());
    this.ljo.set(e, l);
    if (!l) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 20, "设置自定义目标失败", ["Key", e], ["Entity", l]);
      }
    }
  }
  ShowBulletCollision(t = 0) {
    return this._jo.has(t) && (this._jo.get(t) ?? false);
  }
  ShowBulletTrace(t = 0) {
    return this.ujo.has(t) && (this.ujo.get(t) ?? false);
  }
  SetBulletCollisionDraw(t, e) {
    this._jo.set(t, e);
  }
  SetBulletTraceDraw(t, e) {
    this.ujo.set(t, e);
  }
  gjo() {
    this.SelfAdaptBeHitAnim = new Set([0, 1, 2, 3, 8, 9, 10, 11]);
    this.HeavyHitAnim = new Set([2, 3, 10, 11]);
    this.Index2LightHitAnimMap = [8, 1, 9, 0];
    this.Index2HeavyHitAnimMap = [10, 3, 11, 2];
  }
  pjo() {
    this.SelfAdaptBeHitAnim = undefined;
    this.HeavyHitAnim = undefined;
    this.Index2LightHitAnimMap = undefined;
    this.Index2HeavyHitAnimMap = undefined;
  }
  vjo(t) {
    return t === "310000001";
  }
  SetAllBulletTimeScale(t, e, l, i, o, s, r) {
    this.PersistentTimeScaleId--;
    var n = this.PersistentTimeScaleId;
    for (const a of this.GetBulletEntityMap().values()) {
      var u = a.GetBulletInfo();
      if (u.IsInit && !u.NeedDestroy && !u.BulletDataMain.TimeScale.TimeScaleWithAttacker) {
        if (t) {
          var h = u.CollisionInfo.LastFramePosition;
          if (!h) {
            continue;
          }
          if (Math.abs(h.X - t.X) > e || Math.abs(h.Y - t.Y) > e || Math.abs(h.Z - t.Z) > e) {
            continue;
          }
        }
        BulletUtil_1.BulletUtil.SetTimeScale(u, l, i, o, s, 5, 0, n);
      }
    }
    if (r) {
      this.PersistentTimeScaleMap.set(n, new BulletPersistentTimeScale(t, e, Time_1.Time.WorldTimeSeconds, l, i, o, s, 5, n));
    }
    return n;
  }
  RemoveAllBulletTimeScale(t, e) {
    for (const i of this.GetBulletEntityMap().values()) {
      var l = i.GetBulletInfo();
      if (l.IsInit) {
        BulletUtil_1.BulletUtil.RemoveTimeScale(l, t);
      }
    }
    if (e) {
      this.PersistentTimeScaleMap.delete(t);
    }
  }
  fjo() {
    this.PersistentTimeScaleId = 0;
    this.PersistentTimeScaleMap.clear();
  }
  get SceneBulletOwnerId() {
    return this.Jaa;
  }
  set SceneBulletOwnerId(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 17, "设置场景子弹owner", ["CreatureDataId", t]);
    }
    this.Jaa = t;
  }
  WaitSceneBulletOwnerInit() {
    const e = this.SceneBulletOwnerId;
    if (e === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "等待场景子弹owner创建失败, creatureDataId为0");
      }
    } else if (this.Aal) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "重复调用WaitSceneBulletOwnerInit");
      }
    } else {
      this.Aal = new CustomPromise_1.CustomPromise();
      this.hla();
      this.ala = WaitEntityTask_1.WaitEntityTask.Create("BulletModel.WaitSceneBulletOwnerInit", e, t => {
        if (t) {
          if (this.SceneBulletOwnerId !== e) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Bullet", 17, "等待场景子弹owner创建返回时，creatureDataId已改变");
            }
            this.Aal?.SetResult(false);
          } else {
            this.ala = undefined;
            this.IsSceneBulletOwnerCreated = true;
            this.Aal?.SetResult(true);
            this.Aal = undefined;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SceneBulletOwnerCreated);
          }
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Bullet", 17, "等待场景子弹owner创建失败");
          }
          this.Aal?.SetResult(false);
        }
      }, -1);
      if (!this.IsSceneBulletOwnerCreated) {
        return this.Aal;
      }
      this.ala = undefined;
    }
  }
  hla() {
    this.IsSceneBulletOwnerCreated = false;
    if (this.ala) {
      this.ala.Cancel();
      this.ala = undefined;
    }
  }
  Y8a(t) {
    for (var [e] of this.ZHo) {
      e = this.ZHo.get(e);
      this.z8a(e, t);
    }
  }
  z8a(t, e) {
    if (t?.Valid) {
      t = t.GetBulletInfo();
      EffectSystem_1.EffectSystem.SetEffectHidden(t.EffectInfo.Effect, e, "演出子弹特效清场");
    }
  }
  SummonerSummon(t, e) {
    if (!this.a$d.has(t)) {
      this.a$d.set(t, new Set());
    }
    this.a$d.get(t).add(e);
    this.h$d.set(e, t);
  }
  GetSummonEntityIds(t) {
    const l = [];
    if (this.a$d.has(t)) {
      this.a$d.get(t).forEach(t => {
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntityId(t);
        if (e) {
          l.push(e);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 72, "[BulletModel] 不存在实体Id", ["CreatureDataId", t]);
        }
      });
    }
    return l;
  }
}
(exports.BulletModel = BulletModel).DefaultBulletSceneInteraction = undefined;
BulletModel.rjo = Stats_1.Stat.Create("BulletPreload");
BulletModel.Mjo = Stats_1.Stat.Create("BulletCreateEntity");
BulletModel.Ejo = Stats_1.Stat.Create("BulletClearDestroyed");
BulletModel.Sjo = Stats_1.Stat.Create("BulletRecycleBulletEntity");
class BulletPersistentTimeScale {
  constructor(t, e, l, i, o, s, r, n, u) {
    this.CenterLocation = t;
    this.Radius = e;
    this.StartTime = l;
    this.Priority = i;
    this.TimeDilation = o;
    this.Curve = s;
    this.Duration = r;
    this.SourceType = n;
    this.TimeScaleId = u;
  }
}
exports.BulletPersistentTimeScale = BulletPersistentTimeScale;
//# sourceMappingURL=BulletModel.js.map