"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowGenerate = exports.GenerateGroup = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const KscData_1 = require("../KscData");
const KscEnv_1 = require("../KscEnv");
const KscLog_1 = require("../KscLog");
const KscSubControllerBase_1 = require("../KscSubControllerBase");
const KscUtil_1 = require("../KscUtil");
const MotorcycleArrowSubModel_1 = require("./MotorcycleArrowSubModel");
class GenerateGroup {
  constructor() {
    this.GenerateList = [];
    this.CurGenerateIndex = 0;
    this.GroupStartDistance = 0;
    this.GroupEndDistance = 0;
    this.WaveGroupIndex = 0;
    this.WaveGroupId = 0;
    this.BossFightTime = 0;
    this.AliveEntityMap = new Map();
  }
  IsGenerateFinish() {
    return this.CurGenerateIndex >= this.GenerateList.length;
  }
  IsFinish() {
    return this.IsGenerateFinish() && this.AliveEntityMap.size === 0;
  }
  OnEntityRemove(t) {
    var s;
    if (this.AliveEntityMap.has(t) && (s = this.AliveEntityMap.get(t), this.AliveEntityMap.delete(t), t = this.GenerateList[s])) {
      return [t.GenerateType, t.RefreshId, t.BuffGateBornGroup];
    } else {
      return [0, 0, 0];
    }
  }
  GetEndDistance() {
    var t = this.GenerateList[this.GenerateList.length - 1]?.BornDistance ?? 0;
    return this.GroupStartDistance + t;
  }
}
exports.GenerateGroup = GenerateGroup;
class MotorcycleArrowGenerate {
  constructor() {
    this.GenerateGroupList = [];
    this.CurGenerateGroupIndex = 0;
    this.BornPos = Vector_1.Vector.Create(0, 0, 0);
    this.BornRotation = Rotator_1.Rotator.Create(0, 0, 0);
    this.RightDirection = Vector_1.Vector.Create(0, 0, 0);
    this.ForwardDirection = Vector_1.Vector.Create(0, 0, 0);
    this.EntityMap = new Map();
    this.IsStartGenerate = false;
    this.EndDistance = 0;
    this.EntityDeadLocationMap = new Map();
    this.DropBuffGateMap = new Map();
    this.CreatureIdToSplineId = new Map();
    this.BuffGateDescInfoMap = new Map();
    this.WaitCollectionSelect = new Set();
    this.WaitToNextSubLevel = false;
    this.BuffGateBornGroup = new Set();
    this._A = 1;
    this.OnSceneMoveThreshold = () => {
      var t = KscEnv_1.KscEnv.KscWorld.SceneMovement;
      var s = t.MoveDistance;
      this.GenerateByDistance(s);
      if (this.IsGenerateFinish()) {
        this.StopGenerate();
      } else {
        this.YOf(t);
      }
    };
    this.OnSceneMoveEnd = () => {
      KscEnv_1.KscEnv.KscWorld?.SceneMovement?.OnSceneMoveThreshold.Unbind();
      this.WaitToNextSubLevel = false;
      if (this.WaitCollectionSelect.size !== 0) {
        KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]等待藏品选择完毕再进入下一个子关卡", ["Wait", this.WaitCollectionSelect]);
      } else {
        this.SubController.EnterNextSubLevel();
      }
    };
  }
  SetBornRotation(t, s, e) {
    this.BornRotation.Set(t, s, e);
    this.BornRotation.Quaternion().RotateVector(Vector_1.Vector.ForwardVectorProxy, this.ForwardDirection);
    this.BornRotation.Quaternion().RotateVector(Vector_1.Vector.RightVectorProxy, this.RightDirection);
  }
  GetSpawnUid() {
    this._A += 2;
    return this._A;
  }
  Clear() {
    this.GenerateGroupList.length = 0;
    this.CurGenerateGroupIndex = 0;
    this.EntityMap.clear();
    this.BuffGateDescInfoMap.clear();
    this.DropBuffGateMap.clear();
    this.EntityDeadLocationMap.clear();
    this.WaitCollectionSelect.clear();
    this.WaitToNextSubLevel = false;
    this.BuffGateBornGroup.clear();
    KscEnv_1.KscEnv.KscWorld?.SceneMovement?.OnSceneMoveThreshold.Unbind();
    this.StopGenerate();
  }
  IsGenerateFinish() {
    return this.CurGenerateGroupIndex >= this.GenerateGroupList.length;
  }
  IsFinish() {
    return this.IsGenerateFinish() && this.EntityMap.size === 0;
  }
  GetLastGenerateGroup() {
    return this.GenerateGroupList[this.GenerateGroupList.length - 1];
  }
  GetStartDistance() {
    return this.GenerateGroupList[0]?.GroupStartDistance;
  }
  CreateGenerateGroup() {
    var t = new GenerateGroup();
    this.GenerateGroupList.push(t);
    return t;
  }
  get SubController() {
    return ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubController;
  }
  get SubModel() {
    return this.SubController.GetModel();
  }
  YOf(t) {
    var s = this.GenerateGroupList[this.CurGenerateGroupIndex];
    var s = s.GenerateList[s.CurGenerateIndex].BornDistance + s.GroupStartDistance;
    t.MoveDistanceThreshold = s;
  }
  StartGenerate() {
    var t;
    if (!this.IsStartGenerate && !this.IsGenerateFinish()) {
      this.IsStartGenerate = true;
      if (t = KscEnv_1.KscEnv.KscWorld?.SceneMovement) {
        t.OnSceneMoveThreshold.Bind(this.OnSceneMoveThreshold);
        this.YOf(t);
        this.NotifyFightRefreshNextWaveGroup();
      } else {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]场景移动组件为空");
      }
    }
  }
  StopGenerate() {
    if (this.IsStartGenerate) {
      this.IsStartGenerate = false;
      KscEnv_1.KscEnv.KscWorld?.SceneMovement?.OnSceneMoveThreshold.Unbind();
    }
  }
  GenerateByDistance(e) {
    if (!this.IsGenerateFinish()) {
      var r = this.GenerateGroupList[this.CurGenerateGroupIndex];
      for (let s = r.CurGenerateIndex; s < r.GenerateList.length; s++) {
        var i = r.GenerateList[s];
        var o = i.BornDistance + r.GroupStartDistance;
        if (!(o <= e)) {
          break;
        }
        {
          let t = 0;
          var n = MathUtils_1.MathUtils.CommonTempVector;
          this.ForwardDirection.Multiply(e - o, n);
          var o = i.BornTrack === 2 ? 0 : i.BornTrack === 1 ? -1 : 1;
          this.RightDirection.Multiply(o * MotorcycleArrowSubModel_1.TRACK_HALF_WIDTH, MathUtils_1.MathUtils.CommonTempVector2);
          if (i.GenerateType === 2) {
            n.FromUeVector(this.SubController.GetModel().PlayerDirect);
            o = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightWaveGroupById(r.WaveGroupId);
            n.MultiplyEqual(o?.BossFightDistance ?? 0);
            n.AdditionEqual(this.SubController.GetModel().PlayerBornPos);
            o = new UE.TransformDouble(this.BornRotation.ToUeRotator(), n.ToUeVector(), Vector_1.Vector.OneVectorDouble);
            t = this.SpawnMonsterBoss(i, o, r);
          } else {
            n.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector2).AdditionEqual(this.BornPos);
            o = new UE.TransformDouble(this.BornRotation.ToUeRotator(), n.ToUeVector(), Vector_1.Vector.OneVectorDouble);
            if (i.GenerateType === 1) {
              t = this.SpawnMonster(i, o, r);
            } else if (i.GenerateType === 4) {
              t = this.SpawnMonster(i, o, r, true);
            } else if (i.GenerateType === 3) {
              t = this.SpawnBuffGate(i.RefreshId, o, r.WaveGroupId);
            }
          }
          this.EntityMap.set(t, r);
          r.AliveEntityMap.set(t, s);
          r.CurGenerateIndex++;
          this.SendBossBornNotify(i);
        }
      }
      if (r.IsGenerateFinish()) {
        this.CurGenerateGroupIndex++;
        this.NotifyFightRefreshNextWaveGroup();
      }
    }
  }
  SpawnMonster(t, s, e, r = false) {
    var i = this.GetSpawnUid();
    let o = undefined;
    if (o = r ? ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBossRefreshById(t.RefreshId) : ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMonsterRefreshById(t.RefreshId)) {
      if (this.SpawnMonsterByMonsterId(i, o.MonsterId, s, e)) {
        return i;
      } else {
        return 0;
      }
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]怪物刷新配置不存在", ["Id", t.RefreshId], ["isElite", r]);
      return 0;
    }
  }
  SpawnMonsterByMonsterId(t, s, e, r) {
    var i;
    var o;
    var n;
    var h;
    var a = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMonsterConfigById(s);
    if (a) {
      i = a.MonsterTemptId;
      o = a.AttrConfig;
      if (n = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.GetEntityPathById(i)) {
        (h = MathUtils_1.MathUtils.CommonTempVector).Set(0, 0, a.Height);
        e.AddToTranslation(h.ToUeVector());
        h = this.SubController.GetMonsterExtraBuffs();
        ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AsyncAddEntity({
          CreatureId: t,
          SimpleCombatId: i,
          AssetPath: n,
          PropertyId: o,
          Transform: e,
          Buffs: KscUtil_1.KscUtil.ToBuffParam(a.BornBuff, h),
          AttributeMap: this.SubController.GetOverrideAttrs(r, o)
        });
        return true;
      } else {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]实体资产路径不存在", ["simpleCombatId", i]);
        return false;
      }
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]怪物配置不存在", ["monsterId", s]);
      return false;
    }
  }
  SpawnMonsterBoss(t, s, e) {
    var r = this.GetSpawnUid();
    var i = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBossRefreshById(t.RefreshId);
    if (!i) {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]Boss刷新配置不存在", ["Id", t.RefreshId]);
      return 0;
    }
    t = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMonsterConfigById(i.MonsterId);
    if (!t) {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]Boss配置不存在", ["monsterId", i.MonsterId]);
      return 0;
    }
    var i = t.MonsterTemptId;
    var o = t.AttrConfig;
    var n = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.GetEntityPathById(i);
    if (!n) {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]实体资产路径不存在", ["simpleCombatId", i]);
      return 0;
    }
    let h = undefined;
    if (t.SplineId && (h = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(t.SplineId, r, 2))?.IsValid()) {
      this.CreatureIdToSplineId.set(r, t.SplineId);
    }
    var a = MathUtils_1.MathUtils.CommonTempVector;
    a.Set(0, 0, t.Height);
    s.AddToTranslation(a.ToUeVector());
    var a = this.SubController.GetMonsterExtraBuffs();
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AsyncAddEntity({
      CreatureId: r,
      SimpleCombatId: i,
      AssetPath: n,
      PropertyId: o,
      Transform: s,
      Buffs: KscUtil_1.KscUtil.ToBuffParam(t.BornBuff, a),
      AttributeMap: this.SubController.GetOverrideAttrs(e, o),
      Spline: h,
      FinishCallback: t => {
        var s = t.GetMoveComponent();
        if (this.SubController.Model?.KscPlayerEntity) {
          if (s && s.IsA(UE.KSC_Move_MultiStage.StaticClass())) {
            s.SetTargetEntity(this.SubController.Model.KscPlayerEntity);
          } else {
            KscLog_1.KscLog.Error("Load", 20, t, "Boss移动组件不是MultiStage");
          }
        } else {
          KscLog_1.KscLog.Error("Load", 20, t, "Boss设置玩家为目标时玩家还未创建???");
        }
      }
    });
    this.SubController.OnBossCreate(r, e.BossFightTime, t.Desc);
    return r;
  }
  SpawnBuffGate(t, r, s) {
    var e = this.GetSpawnUid();
    var i = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBuffRefreshByRefreshId(t);
    if (!i) {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]buff门刷新配置不存在", ["Id", t]);
      return 0;
    }
    t = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBuffGateConfigById(i.BuffGateId);
    if (!t) {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]buff门配置不存在", ["BuffGateId", i.BuffGateId]);
      return 0;
    }
    var i = t.GateTemptId;
    var o = ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.CurSubModel.GetEntityPathById(i);
    if (!o) {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]实体资产路径不存在", ["simpleCombatId", i]);
      return 0;
    }
    var n = MathUtils_1.MathUtils.CommonTempVector;
    n.Set(0, 0, t.Height);
    r.AddToTranslation(n.ToUeVector());
    const h = KscEnv_1.KscEnv.KscWorld.SceneMovement;
    const a = h.MoveDistance;
    ControllerHolder_1.ControllerHolder.KuroSimpleCombatController.AsyncAddEntity({
      CreatureId: e,
      SimpleCombatId: i,
      AssetPath: o,
      PropertyId: 0,
      Transform: r,
      Buffs: KscUtil_1.KscUtil.ToBuffParam(t.BornBuff),
      FinishCallback: t => {
        var s;
        var e = t.GetMoveComponent();
        if (e && e.IsA(UE.KSC_Move_Approach.StaticClass()) && (s = this.SubController.Model?.KscPlayerEntity)) {
          e.SetTargetEntity(s);
        }
        if (!!h.IsValid() && !((e = h.MoveDistance) - a <= 0)) {
          s = MathUtils_1.MathUtils.CommonTempVector;
          this.ForwardDirection.Multiply(e - a, s);
          r.AddToTranslation(s.ToUeVector());
          t.SetTransformByWorld(r);
        }
      }
    });
    if (t.AffectedByRate !== 0 && s) {
      n = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightWaveGroupById(s);
      i = this.MultiplyStringValues(t.DescArgs, n.Amplify);
      this.BuffGateDescInfoMap.set(e, {
        Desc: [t.Desc, i],
        BuffGateId: t.Id,
        IsDropBuffGate: s === undefined
      });
    } else {
      this.BuffGateDescInfoMap.set(e, {
        Desc: [t.Desc, t.DescArgs],
        BuffGateId: t.Id,
        IsDropBuffGate: s === undefined
      });
    }
    return e;
  }
  SendBossBornNotify(t) {
    var s;
    if (t.GenerateType === 2 || t.GenerateType === 4) {
      (s = Protocol_1.Aki.Protocol.V6g.create()).pjf = this.CurGenerateGroupIndex;
      s.F6g = t.RefreshId;
      s.vjf = this.SubController.GetModel().SubLevelIndex;
      Net_1.Net.Send(19205, s);
    }
  }
  MultiplyStringValues(t, e) {
    if ((e *= KscSubControllerBase_1.DIVIDED_TEN_THOUSAND) === 1) {
      return t;
    } else {
      return t.map(t => {
        var s = t.includes("%");
        var t = s ? t.split("%")[0] : t;
        var t = parseInt(t);
        var t = Math.ceil(t * e);
        if (s) {
          return t + "%";
        } else {
          return t.toString();
        }
      });
    }
  }
  NotifyFightRefreshNextWaveGroup() {
    if (!this.IsGenerateFinish()) {
      const s = Protocol_1.Aki.Protocol.cjf.create();
      s.pjf = this.CurGenerateGroupIndex;
      Net_1.Net.Call(25697, s, t => {
        if (t && t.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]通知服务端刷新下一波次组失败", ["ErrCode", t.G9n], ["GroupIndex", s.pjf]);
        }
      });
    }
  }
  OnEntityRemove(t, s, e) {
    this.OnBuffDropGateRemove(t);
    if (this.EntityMap.has(t)) {
      var r = this.EntityMap.get(t);
      this.EntityMap.delete(t);
      var [i, o, n] = r.OnEntityRemove(t);
      this.UpdateCurrentGroupWaveIndex(r);
      if (i === 2) {
        this.SubController.OnBossRemove();
        this.RequestMotorFightKill(r, o, true, s !== KscData_1.KscEntityRemoveReason.Destroy, e);
        var h = this.CreatureIdToSplineId.get(t);
        if (h) {
          ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(h, t, 2);
          this.CreatureIdToSplineId.delete(t);
        }
      } else if (i === 4) {
        this.RequestMotorFightKill(r, o, true, s !== KscData_1.KscEntityRemoveReason.Destroy, e);
      } else if (i === 1) {
        this.RequestMotorFightKill(r, o, false, s === KscData_1.KscEntityRemoveReason.Dead, e);
      } else if (i === 3) {
        this.SubController.EffectManager.UpdateWaveDamageAmplify(r.WaveGroupId);
        this.AddBuffByBuffGate(this.BuffGateDescInfoMap.get(t), r.WaveGroupIndex, o, s, this.SubController.GetModel().SubLevelIndex, n);
      } else if (i === 0) {
        return;
      }
      this.BuffGateDescInfoMap.delete(t);
      if (this.IsFinish() && !this.SubController.GetModel().IsGameOver) {
        (h = KscEnv_1.KscEnv.KscWorld.SceneMovement).OnSceneMoveThreshold.Bind(this.OnSceneMoveEnd);
        this.WaitToNextSubLevel = true;
        h.MoveDistanceThreshold = h.MoveDistance + this.EndDistance;
      }
    }
  }
  RequestMotorFightKill(t, s, e, r, i) {
    var o = Protocol_1.Aki.Protocol.lPf.create();
    o.F4n = s;
    o.pjf = t.WaveGroupIndex;
    o.Ksg = e;
    o.Xsg = r;
    var r = this.SubController.GetModel().SubLevelIndex;
    var r = this.GenerateUniqueId(r, t.WaveGroupIndex, s);
    this.EntityDeadLocationMap.set(r, Vector_1.Vector.Create(i));
    if (e) {
      this.WaitCollectionSelect.add(r);
    }
    Net_1.Net.Call(28048, o, t => {
      if (t && t.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]通知服务端怪物死亡失败", ["ErrCode", t.G9n]);
      }
    });
  }
  AddBuffByBuffGate(s, t, e, r, i, o = 0) {
    if (r === KscData_1.KscEntityRemoveReason.Dead) {
      r = KscEnv_1.KscEnv.KscWorld.GetWorldAttr(5);
      if (o !== 0 && r <= 0) {
        if (this.BuffGateBornGroup.has(o)) {
          return;
        }
        this.BuffGateBornGroup.add(o);
      }
      var r = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBuffGateByRefreshId(e);
      if (r) {
        KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]请求选择buff门", ["buffGateId", e]);
        o = r.buffEffect;
        (r = Protocol_1.Aki.Protocol.BZf.create()).pjf = t;
        r.$As = o;
        r.GZf = e;
        r.vjf = i;
        Net_1.Net.Call(26364, r, t => {
          if (t) {
            if (t.G9n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
              KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]请求选择buff门失败", ["ErrCode", t.G9n], ["buffGateId", e]);
            } else {
              KscLog_1.KscLog.Info("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]请求选择buff门成功", ["buffGateId", e]);
              this.SubModel?.HeadStateManager.CreateMotorcycleBuffItem(s);
            }
          }
        });
      } else {
        KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]buff门刷新配置不存在", ["BuffGateId", e]);
      }
    }
  }
  UpdateCurrentGroupWaveIndex(t) {
    if (t.IsFinish() && this.GetLastGenerateGroup() !== t) {
      this.SubController.GetModel().CurrentGroupWaveIndex = t.WaveGroupIndex + 1;
      this.SubController.EffectManager.OnEnterNextWaveGroup();
    }
  }
  GenerateUniqueId(t, s, e) {
    return e * 1000000 + t * 1000 + s;
  }
  CreateBuffDropGate(s, e, r, i) {
    var t = this.GenerateUniqueId(s, e, r);
    var o = this.EntityDeadLocationMap.get(t);
    if (o) {
      var n = this.SubController.GetModel();
      var h = n.PlayerBornPos;
      var a = this.SubController.GetModel().PlayerDirect;
      var _ = MathUtils_1.MathUtils.CommonTempVector;
      _.Set(o.X - h.X, o.Y - h.Y, o.Z - h.Z);
      var _ = MathUtils_1.MathUtils.DotProduct(a, _);
      let t = MathUtils_1.MathUtils.CommonTempVector2;
      if (_ < n.MotorArrowDropThreshold) {
        a.Multiply(n.MotorArrowDropThreshold - _, t);
        t.AdditionEqual(o);
      } else {
        t = o;
      }
      t.Z = h.Z;
      a = new UE.TransformDouble(this.BornRotation.ToUeRotator(), t.ToUeVector(), Vector_1.Vector.OneVectorDouble);
      n = this.SpawnBuffGate(i, a);
      this.DropBuffGateMap.set(n, {
        SubLevelIndex: s,
        WaveGroupIndex: e,
        MonsterId: r,
        BuffGateId: i
      });
    } else {
      KscLog_1.KscLog.Error("Common", 85, KscEnv_1.KscEnv.KscWorld, "[摩托战斗]buff门位置不存在", ["RecordId", t]);
    }
  }
  OnBuffDropGateRemove(t) {
    var s;
    if (this.DropBuffGateMap.has(t)) {
      s = this.DropBuffGateMap.get(t);
      this.AddBuffByBuffGate(this.BuffGateDescInfoMap.get(t), s.WaveGroupIndex, s.BuffGateId, KscData_1.KscEntityRemoveReason.Dead, s.SubLevelIndex);
      this.DropBuffGateMap.delete(t);
    }
  }
  GetCurGenerateGroup() {
    return this.GenerateGroupList[this.CurGenerateGroupIndex];
  }
}
exports.MotorcycleArrowGenerate = MotorcycleArrowGenerate;
//# sourceMappingURL=MotorcycleArrowGenerate.js.map