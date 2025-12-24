"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterGroupInfo = exports.MonsterPatrolInfo = exports.MonsterGroupPatrolModel = exports.MONSTER_GROUP_PATROL_KEY = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const LogAnalyzer_1 = require("../../../Core/Common/LogAnalyzer");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Net_1 = require("../../../Core/Net/Net");
const SplineCurve_1 = require("../../../Core/Utils/Curve/SplineCurve");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CombatDebugController_1 = require("../../Utils/CombatDebugController");
const REPARAM_STEPS = 6;
const END_DISTANCE = 30;
const DEFAULT_TURN_SPEED = 120;
const IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : undefined;
exports.MONSTER_GROUP_PATROL_KEY = "MonsterGroupPatrol";
class MonsterGroupPatrolModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.MonsterPbDataIdList = new Set();
    this.MonsterEntityInfoMap = new Map();
    this.MonsterGroups = new Map();
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.MonsterPbDataIdList.clear();
    this.MonsterEntityInfoMap.clear();
    this.MonsterGroups.clear();
    return true;
  }
  RecordGroupMonsterPbDataId(t) {
    for (const o of t) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 42, "[GroupAi.Patrol] 记录群组巡逻实体PbDataId", ["Id", o]);
      }
      this.MonsterPbDataIdList.add(o);
    }
  }
  IsMonsterInGroup(t) {
    return this.MonsterPbDataIdList.has(t);
  }
  RemoveMonsterGroup(t) {
    if (this.MonsterGroups.has(t)) {
      var o = this.MonsterGroups.get(t);
      for (const e of o.GroupInfo) {
        this.MonsterPbDataIdList.delete(e[1].EntityId);
      }
      o.Clear();
      this.MonsterGroups.delete(t);
    }
  }
  GetMonsterGroup(t) {
    if (this.MonsterGroups.size) {
      return this.MonsterGroups.get(t);
    }
  }
  GetMonsterInfoByEntityId(t) {
    return this.MonsterEntityInfoMap.get(t);
  }
  GenerateAddMonsterGroup(t, o) {
    o = this.k2l(t, o);
    if (o) {
      this.MonsterGroups.set(t, o);
      return true;
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 42, "[GroupAi.Patrol] 等实体加载完后没有GroupInfo");
      }
      return false;
    }
  }
  k2l(t, o) {
    var e = new MonsterGroupInfo(t);
    if (e.Init(o)) {
      for (const r of e.GroupInfo) {
        this.MonsterEntityInfoMap.set(r[1].EntityId, r[1]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGeneratedMonsterPatrolGroup, t);
      return e;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 初始化失败，不进行群组游荡");
    }
  }
}
exports.MonsterGroupPatrolModel = MonsterGroupPatrolModel;
class MonsterPatrolInfo {
  constructor(t, o, e) {
    this.PbDataId = 0;
    this.EntityId = 0;
    this.IsCaptain = false;
    this.EntityType = Protocol_1.Aki.Protocol.kks.Proto_Monster;
    this.PauseLocation = Vector_1.Vector.Create();
    this.PauseDirection = Vector_1.Vector.Create();
    this.RelativeLocation = Vector_1.Vector.Create();
    this.Group = undefined;
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.PatrolComp = undefined;
    this.Tih = 0;
    this.PbDataId = t;
    this.EntityId = o.Entity.Id;
    this.EntityType = o.CreatureData.GetEntityType();
    this.ActorComp = o;
    this.MoveComp = this.ActorComp.Entity.GetComponent(46);
    this.Group = e;
  }
  get GroupPatrolState() {
    return this.Tih;
  }
  set GroupPatrolState(t) {
    if (t !== this.Tih) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] ChangeInfoPatrolStateInternal", ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()], ["EntityId", this.ActorComp?.Entity?.Id], ["val", t]);
      }
      this.Group.ChangeInfoPatrolStateInternal(this.Tih, t);
      this.Tih = t;
    }
  }
  IsNpc() {
    return this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Npc;
  }
  IsMonster() {
    return this.EntityType === Protocol_1.Aki.Protocol.kks.Proto_Monster;
  }
  ResetRelativeLocation() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(this.PbDataId);
    this.RelativeLocation.Set(t?.Transform?.Pos.X ?? 0, t?.Transform?.Pos.Y ?? 0, t?.Transform?.Pos.Z ?? 0);
  }
  SetIsCaptain() {
    this.IsCaptain = true;
    this.PatrolComp = this.ActorComp.Entity.GetComponent(49);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 更新群组队长", ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()], ["EntityId", this.ActorComp?.Entity?.Id]);
    }
  }
  CalculateRelativeLocation(t, o) {
    if (!this.IsCaptain) {
      MonsterPatrolInfo.Lih.Set(t, o, Vector_1.Vector.OneVectorProxy);
      MonsterPatrolInfo.Lih.InverseTransformPosition(this.RelativeLocation, this.RelativeLocation);
      this.RelativeLocation.Z = 0;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 更新相对队长坐标", ["PbDataId", this.ActorComp?.CreatureData?.GetPbDataId()], ["EntityId", this.ActorComp?.Entity?.Id], ["RelativeLocation", this.RelativeLocation]);
      }
    }
  }
}
(exports.MonsterPatrolInfo = MonsterPatrolInfo).Lih = Transform_1.Transform.Create();
class MonsterGroupInfo {
  constructor(t) {
    this.O2l = 0;
    this.wih = -1;
    this.GAl = 0;
    this.kAl = 0;
    this.Aih = [];
    this.GroupInfo = new Map();
    this.xKl = false;
    this._Dt = 0;
    this.RKl = undefined;
    this.N2l = 0;
    this.Htn = 0;
    this.md = undefined;
    this.$ie = undefined;
    this.F2l = false;
    this.OAl = 0;
    this.V2l = false;
    this.wKl = false;
    this._Dt = t;
  }
  get CaptainInfo() {
    if (this.GroupInfo.has(this.wih)) {
      return this.GroupInfo.get(this.wih);
    }
  }
  Init(t) {
    this.N2l = t.Option.Leader;
    this.kih(t.Entities);
    return !!this.Oih(t.Option.SplineEntityId) && (this.RKl = EntitySystem_1.EntitySystem.GetComponent(this._Dt, 1), this.H2l());
  }
  H2l() {
    this.j2l();
    return !!this.W2l() && (this.Q2l(), this.K2l(), true);
  }
  Clear() {
    this.ExitPatrol();
    this.GroupInfo.clear();
    this.$ie = undefined;
    this.md = undefined;
  }
  CheckMonsterValid() {
    MonsterGroupInfo.$2l.length = 0;
    for (const o of this.GroupInfo) {
      var t = o[1];
      if (!t.ActorComp?.Valid || !t.MoveComp?.Valid) {
        MonsterGroupInfo.$2l.push(t.EntityId);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 实体不合法了去掉", ["PbDataId", t.PbDataId]);
        }
      }
    }
    if (MonsterGroupInfo.$2l.length > 0) {
      for (const e of MonsterGroupInfo.$2l) {
        this.GroupInfo.delete(e);
      }
      if (this.GroupInfo.size === 0) {
        return false;
      }
      this.H2l();
    }
    return true;
  }
  GetAllMonsterInState() {
    for (let t = 0; t < 4; t++) {
      if (this.Aih[t] === this.GAl) {
        return t;
      }
    }
    return 4;
  }
  ChangeInfoPatrolStateInternal(t, o) {
    this.Aih[t]--;
    this.Aih[o]++;
  }
  ReadyToStartPatrol() {
    for (const o of this.GroupInfo) {
      var t = o[1];
      this.NAl(t);
    }
  }
  PausePatrol() {
    for (const o of this.GroupInfo) {
      var t = o[1];
      if (t.GroupPatrolState === 2) {
        t.GroupPatrolState = 1;
        this.X2l(t);
        if (t.IsCaptain) {
          t.PatrolComp?.PausePatrol(this.Htn, exports.MONSTER_GROUP_PATROL_KEY);
        } else {
          t.MoveComp?.MoveController.StopMove();
        }
      }
    }
    this.PKl();
  }
  ExitPatrol() {
    for (const o of this.GroupInfo) {
      var t = o[1];
      if (t.GroupPatrolState === 2) {
        t.GroupPatrolState = 3;
        if (t.IsCaptain) {
          t.PatrolComp?.StopPatrol(this.Htn);
        } else {
          t.MoveComp?.MoveController.StopMove();
        }
      }
    }
    this.PKl();
  }
  CheckMonsterMoveSpeed() {
    for (const i of this.GroupInfo) {
      const s = i[1];
      var t;
      var o;
      var e;
      var r;
      if (s.IsCaptain) {
        this.FAl(s);
      } else if (o = s.MoveComp?.MoveController) {
        t = Math.min(END_DISTANCE, s.ActorComp.Radius * 0.5);
        r = o.GetMoveToLocationLogic()?.GetCurrentDistance() ?? -1;
        e = (this.$ie?.Option.Type === IComponent_1.ESplineType.Patrol ? this.$ie.Option.TurnSpeed : DEFAULT_TURN_SPEED) ?? DEFAULT_TURN_SPEED;
        if (r < 0) {
          e = {
            Position: this.STl(s),
            ReferencePosition: () => this.STl(s),
            Distance: END_DISTANCE + t,
            MoveState: CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
            ReturnTimeoutFailed: 3,
            TurnSpeed: e
          };
          o.NavigateMoveToLocation(e);
        } else {
          o = MathUtils_1.MathUtils.Clamp(r - 50 - t, -50, 300) * 0.02 * 0.125 + 0.875;
          if (s.IsNpc()) {
            e = s.Group?.CaptainInfo?.MoveComp?.CharacterMovement?.GetMaxSpeed() ?? 100;
            s.MoveComp?.SetMaxSpeed(e * o);
          } else if ((r = s.ActorComp?.Owner) instanceof UE.Character) {
            r.SetAnimRootMotionTranslationScale(o);
          }
        }
      }
    }
  }
  kih(t) {
    var o = new Array();
    for (const s of t) {
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithPbDataId(s, o);
      var e = o[0]?.Entity;
      var r = e?.GetComponent(3);
      var i = e?.GetComponent(46);
      if (e && r) {
        if (i) {
          i = new MonsterPatrolInfo(s, r, this);
          this.GroupInfo.set(e.Id, i);
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 42, "[GroupAi.Patrol] 实体没有移动组件", ["PbDataId", s]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("AI", 42, "[GroupAi.Patrol] 没有实体", ["PbDataId", s]);
      }
    }
  }
  Oih(t) {
    var o;
    var e;
    var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
    if (r) {
      if ((o = (0, IComponent_1.getComponent)(r.ComponentsData, "SplineComponent")) && o.Option.Points) {
        if (o.Option.Points.length < 2) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("AI", 42, "[GroupAi.Patrol] 群组巡逻样条点数量小于2", ["SplineEntityId", t]);
          }
          return false;
        } else {
          (e = new SplineCurve_1.SplineCurve(REPARAM_STEPS)).InitPoints(o.Option.Points);
          if (r.Transform) {
            e.SetSplineTransform(r.Transform, false);
          }
          this.Htn = t;
          this.md = e;
          if ((this.$ie = o).Option.Type === IComponent_1.ESplineType.Patrol && o.Option.CycleOption?.Type === IComponent_1.EPatrolCycleMode.Loop) {
            this.F2l = o.Option.CycleOption.IsCircle;
          }
          return true;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("AI", 42, "[GroupAi.Patrol] 无法找到样条组件配置", ["SplineEntityId", t]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 42, "[GroupAi.Patrol] 无法找到SplineEntityData", ["SplineEntityId", t]);
      }
      return false;
    }
  }
  j2l() {
    for (let t = this.Aih.length = 0; t < 4; t++) {
      this.Aih.push(0);
    }
    for (const o of this.GroupInfo) {
      var t = o[1];
      this.Aih[t.GroupPatrolState] = this.Aih[t.GroupPatrolState] + 1;
    }
    this.GAl = this.GroupInfo.size;
  }
  W2l() {
    this.wih = -1;
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityData(this.N2l)?.Transform?.Pos;
    MonsterGroupInfo.jye.Set(t?.X ?? 0, t?.Y ?? 0, t?.Z ?? 0);
    let o = MathUtils_1.MathUtils.MaxFloat;
    let e = 0;
    for (const s of this.GroupInfo) {
      var r = s[1];
      r.IsCaptain = false;
      r.ResetRelativeLocation();
      var i = Vector_1.Vector.DistSquared(r.RelativeLocation, MonsterGroupInfo.jye);
      if (o > i) {
        o = i;
        e = r.EntityId;
      }
    }
    return !!this.GroupInfo.has(e) && (this.GroupInfo.get(e).SetIsCaptain(), this.wih = e, true);
  }
  Q2l() {
    if (this.CaptainInfo?.ActorComp) {
      let t = 0;
      let o = 0;
      this.kAl = 0;
      for (const i of this.GroupInfo) {
        var e;
        var r = i[1];
        if (!r.IsCaptain && (e = ModelManager_1.ModelManager.CreatureModel.GetEntityData(this.N2l)?.Transform?.Rot, MonsterGroupInfo.Gco.Set(e?.Y ?? 0, e?.Z ?? 0, e?.X ?? 0), MonsterGroupInfo.Gco.Quaternion(MonsterGroupInfo.jJo), r.CalculateRelativeLocation(this.CaptainInfo.RelativeLocation, MonsterGroupInfo.jJo), (t === 0 || t > r.RelativeLocation.X) && (t = r.RelativeLocation.X), o === 0 || o < r.RelativeLocation.X)) {
          o = r.RelativeLocation.X;
        }
      }
      this.kAl = t + o;
    }
  }
  K2l() {
    for (const o of this.GroupInfo) {
      var t = o[1];
      this.X2l(t);
    }
  }
  X2l(t) {
    let o = this.O2l;
    if (o < 0 || o >= this.md.GetSplinePointsNum()) {
      o = 0;
    }
    this.md.GetDirectionAtSplinePoint(o, 1, MonsterGroupInfo.jye);
    MonsterGroupInfo.jye.Z = 0;
    if (this.V2l) {
      MonsterGroupInfo.jye.UnaryNegation(MonsterGroupInfo.jye);
    }
    t.PauseDirection.DeepCopy(MonsterGroupInfo.jye);
    if (t.IsCaptain) {
      this.md.GetLocationAtSplinePoint(o, 1, MonsterGroupInfo.jye);
    } else {
      MonsterGroupInfo.jye.Rotation(MonsterGroupInfo.Gco);
      MonsterGroupInfo.Lih.SetRotation(MonsterGroupInfo.Gco.Quaternion(MonsterGroupInfo.jJo));
      this.md.GetLocationAtSplinePoint(o, 1, MonsterGroupInfo.jye);
      MonsterGroupInfo.Lih.SetLocation(MonsterGroupInfo.jye);
      MonsterGroupInfo.Lih.SetScale3D(Vector_1.Vector.OneVectorProxy);
      MonsterGroupInfo.Lih.TransformPosition(t.RelativeLocation, MonsterGroupInfo.jye);
    }
    t.PauseLocation.DeepCopy(MonsterGroupInfo.jye);
  }
  NAl(t) {
    if (t.MoveComp && !t.MoveComp.MoveController.IsMoving()) {
      t.MoveComp.MoveController.MoveToLocation({
        Position: t.PauseLocation,
        CallbackList: [() => {
          t.GroupPatrolState = 2;
        }],
        Distance: END_DISTANCE,
        MoveState: CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
        ReturnTimeoutFailed: 3
      });
    }
  }
  VAl(t) {
    if (this.OAl !== t) {
      this.OAl = t;
      for (const e of this.GroupInfo) {
        var o = e[1];
        if (!o.IsCaptain) {
          o.RelativeLocation.X *= -1;
          o.RelativeLocation.Y *= -1;
          o.RelativeLocation.X += this.kAl;
        }
      }
      this.V2l = !this.V2l;
    }
  }
  STl(t) {
    MonsterGroupInfo.Lih.FromUeTransform(this.CaptainInfo.ActorComp.ActorTransform);
    MonsterGroupInfo.Lih.TransformPosition(t.RelativeLocation, MonsterGroupInfo.jye);
    MonsterGroupInfo.jye.Z -= this.CaptainInfo.ActorComp.HalfHeight;
    return MonsterGroupInfo.jye;
  }
  FAl(o) {
    const e = o.PatrolComp;
    var t;
    if (e && !e.IsInPatrol()) {
      if (!e || e.GetIsPauseState(this.Htn)) {
        o.GroupPatrolState = 2;
        e.ResumePatrol(this.Htn, exports.MONSTER_GROUP_PATROL_KEY);
        t = e.IsPositiveDirection();
        this.UKl(t);
      } else {
        t = {
          DebugMode: false,
          UseNearestPoint: true,
          IgnorePointDirection: true,
          ReturnFalseWhenNavigationFailed: false,
          NoRequestServer: true,
          OnArrivePointHandle: () => {
            var t = this.md.GetSplinePointsNum() - 1;
            this.O2l = o.PatrolComp.GetLastPointRawIndex();
            if (this.F2l && this.O2l % t == 0) {
              this.VAl(this.O2l);
              t = e.IsPositiveDirection();
              this.DKl(t);
            }
            this.BJo();
          },
          OnPatrolEndHandle: () => {
            this.ExitPatrol();
          }
        };
        o.GroupPatrolState = 2;
        e.StartSplineCurvePatrol(this.Htn, this.md, this.$ie, t);
        this.wKl = e.IsPositiveDirection();
        this.UKl(this.wKl);
      }
    }
  }
  UKl(t) {
    var o;
    var e;
    if (!this.xKl) {
      this.xKl = true;
      o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this._Dt);
      (e = Protocol_1.Aki.Protocol.Kes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(o);
      e.V4n = t;
      Net_1.Net.Call(22211, e, () => {});
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 开始群组巡逻，通知服务器", ["管理器PbDataId", this._Dt], ["巡逻方向", t ? "正" : "逆"]);
      }
    }
  }
  PKl() {
    var t;
    var o;
    if (this.xKl && (this.xKl = false, t = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this._Dt), (o = Protocol_1.Aki.Protocol.Xes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(t), Net_1.Net.Call(21531, o, () => {}), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 中止群组巡逻，通知服务器", ["管理器PbDataId", this._Dt]);
    }
  }
  DKl(t) {
    var o;
    var e;
    if (this.xKl && t !== this.wKl && (this.wKl = t, o = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(this._Dt), (e = Protocol_1.Aki.Protocol.Jes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(o), e.V4n = t, Net_1.Net.Call(23106, e, () => {}), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 切换群组巡逻方向，通知服务器", ["管理器PbDataId", this._Dt], ["巡逻方向", t ? "正" : "逆"]);
    }
  }
  BJo() {
    if (this.xKl) {
      for (const i of this.GroupInfo) {
        var t;
        var o;
        var e;
        var r = i[1];
        if (r.IsCaptain) {
          this.RKl?.SetActorLocation(r.ActorComp.ActorLocation, "设置群组AI管理器位置到队长位置", false);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 设置群组AI管理器位置到队长位置", ["EntityId", this._Dt], ["ActorLocation", r.ActorComp.ActorLocation]);
          }
        } else if (r.MoveComp?.MoveController && r.IsMonster() && ((t = (o = r.ActorComp.Entity.GetComponent(71)).GetCurrentMoveSample()).P5n = r.ActorComp.ActorLocationProxy, o.PendingMoveInfos.push(t), (e = Protocol_1.Aki.Protocol.Yus.create()).uhh = ModelManager_1.ModelManager.GameModeModel.IsMulti ? ModelManager_1.ModelManager.OnlineModel.OwnerId : ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), e.WRs.push(o.CollectPendingMoveInfos()), Net_1.Net.Send(18891, e), Info_1.Info.IsBuildDevelopmentOrDebug && (o = {
          scene_id: ModelManager_1.ModelManager.CreatureModel.GetSceneId(),
          instance_id: ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          msg_id: 18891,
          immediately: true,
          sub_count: e.WRs.length,
          is_multi: ModelManager_1.ModelManager.GameModeModel.IsMulti,
          ed: IS_WITH_EDITOR,
          br: LogAnalyzer_1.LogAnalyzer.GetBranch()
        }, e = JSON.stringify(o), CombatDebugController_1.CombatDebugController.DataReport("COMBAT_MESSAGE_COUNT", e)), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("AI", 42, "[GroupAi.Patrol] 向服务器同步怪物位置", ["EntityId", r.EntityId], ["PbDataId", r.PbDataId], ["X", t.P5n.X], ["Y", t.P5n.Y], ["Z", t.P5n.Z]);
        }
      }
    }
  }
}
(exports.MonsterGroupInfo = MonsterGroupInfo).$2l = [];
MonsterGroupInfo.jye = Vector_1.Vector.Create();
MonsterGroupInfo.Lih = Transform_1.Transform.Create();
MonsterGroupInfo.Gco = Rotator_1.Rotator.Create();
MonsterGroupInfo.jJo = Quat_1.Quat.Create(); //# sourceMappingURL=MonsterGroupPatrolModel.js.map