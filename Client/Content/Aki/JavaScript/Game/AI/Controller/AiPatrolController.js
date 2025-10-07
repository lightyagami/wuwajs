"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PatrolPoint = exports.AiPatrolController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const Net_1 = require("../../../Core/Net/Net");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const AiPatrolConfig_1 = require("./AiPatrolConfig");
const PATROL_ANGLE_LIMIT = 15;
const TRACE_DISTANCE = 500;
const PROFILE_KEY = "AiPatrolController_GenerateNavigationPoint";
const INDEX_KEY = "PatrolIndex";
const TIMES_KEY = "PatrolTimes";
const END_KEY = "PatrolEnd";
class AiPatrolController {
  constructor() {
    this.Hte = undefined;
    this.Xie = new Array();
    this.$ie = undefined;
    this.Yie = undefined;
    this.Jie = undefined;
    this.zie = undefined;
    this.Zie = false;
    this.eoe = undefined;
    this.E0 = 0;
    this.toe = 0;
    this.ioe = 0;
    this.ooe = false;
    this.StartWithInversePath = undefined;
    this.roe = undefined;
  }
  Init(t) {
    this.Hte = t;
    if (!Info_1.Info.IsBuildDevelopmentOrDebug) {
      AiPatrolController.OpenNpcPatrolDebugMode = false;
    }
  }
  get IsInitialized() {
    return this.Zie;
  }
  HasPatrolConfig() {
    return !!this.$ie && !!this.Zie && this.Xie.length !== 0;
  }
  ResetPatrol(t) {
    var i = this.Hte.Entity.GetComponent(47);
    var i = ConfigManager_1.ConfigManager.AiConfig.LoadAiPatrolConfig(i.AiController.AiBase, t);
    this.ResetConfig(i);
  }
  ResetPatrolById(t) {
    t = ConfigManager_1.ConfigManager.AiConfig.LoadAiPatrolConfigById(t);
    this.ResetConfig(t);
  }
  ResetConfig(t) {
    var i;
    if (t && t !== this.$ie && (this.$ie = t, this.Yie ||= new AiPatrolConfig_1.AiPatrolConfig(), this.Yie.Init(t), this.Zie = false, t = this.Hte.CreatureData?.GetPbEntityInitData()) && ((t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent")) && (t.Patrol !== undefined ? (t.Patrol.SplineEntityId && (this.Yie.SplineEntityId = t.Patrol.SplineEntityId), t.Patrol.SplineEntityId || (this.Yie.Id = 0), t.Patrol.IsCircle ? (this.Yie.Loop = true, this.Yie.CirclePatrol = true) : this.Yie.CirclePatrol = false, (t = Protocol_1.Aki.Protocol.Xes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.Hte.CreatureData.GetCreatureDataId()), Net_1.Net.Call(16952, t, () => {})) : this.Yie.Id = 0), this.Yie.Id !== 0) && (t = this.Hte.Entity.GetComponent(206)) && !t.HasTag(i = 2003306528)) {
      t.AddTag(i);
    }
  }
  GetConfig() {
    return this.Yie;
  }
  GeneratePatrol(t) {
    if (this.Yie) {
      if (!this.Zie) {
        if (this.Yie.SplineEntityId && (this.Zie = true, this.HC(t), (t = this.Hte.CreatureData.ComponentDataMap.get("kys")?.kys?.V4n) !== undefined)) {
          this.StartWithInversePath = !t;
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("AI", 42, "[AiPatrolController] NewPatrolConfig没有正确初始化", ["EntityId", this.E0]);
    }
  }
  HC(t) {
    var i;
    var e;
    var r = this.Yie.SplineEntityId;
    var o = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r);
    if (o) {
      if (i = (0, IComponent_1.getComponent)(o.ComponentsData, "SplineComponent")) {
        o = Vector_1.Vector.Create(o.Transform?.Pos.X ?? 0, o.Transform?.Pos.Y ?? 0, o.Transform?.Pos.Z ?? 0);
        if (i.Option.Type !== IComponent_1.ESplineType.Patrol) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Level", 31, "[AiPatrolController.InitSplineNew] SplineComponent配置类型不是Patrol", ["SplineEntityId", r]);
          }
        } else {
          i = ModelManager_1.ModelManager.GameSplineModel.LoadAndGetSplineComponent(r, this.Hte.CreatureData.GetPbDataId());
          e = ModelManager_1.ModelManager.GameSplineModel.GetSplineActorBySplineId(r);
          if (ObjectUtils_1.ObjectUtils.IsValid(e)) {
            e.D_K2_SetActorLocation(o.ToUeVector(), false, undefined, false);
            this.zie = i;
            this.Jie = e;
            this.noe("新样条实体" + r, t);
            this.soe();
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 31, "[AiPatrolController.InitSplineNew] Spline获取失败", ["SplineEntityId", r]);
          }
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Level", 31, "[AiPatrolController.InitSplineNew] 无法找到SplineComponent配置", ["SplineEntityId", r]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 31, "[AiPatrolController.InitSplineNew] 无法找到Spline Entity", ["SplineEntityId", r]);
    }
  }
  noe(t, r) {
    if (this.Yie && this.zie) {
      var o = this.Hte.CreatureData?.GetPbEntityInitData();
      let i = undefined;
      if (o) {
        o = (0, IComponent_1.getComponent)(o.ComponentsData, "AiComponent");
        i = o?.Patrol;
      }
      var s = this.zie;
      var h = this.Jie;
      var n = this.Yie.IsNavigation;
      var l = this.Yie.Sampling;
      var o = s.GetNumberOfSplinePoints();
      var a = GlobalData_1.GlobalData.World;
      var _ = this.Xie;
      _.length = 0;
      _.splice(0, _.length);
      for (let t = 0, e = o; t < e; t++) {
        var C = s.D_GetLocationAtSplinePoint(t, 1);
        if (n && a) {
          this.aoe(C, a);
        }
        var d = new PatrolPoint();
        d.IsMain = true;
        d.Point = Vector_1.Vector.Create(C);
        this.hoe(h);
        this.loe(t, d, h);
        _.push(d);
        if (i && !i.Disabled) {
          this._oe(t, d, h);
        }
        if (r) {
          let i = s.GetDirectionAtSplinePoint(t, 1);
          if (l > 0 && t < e - 1) {
            var C = s.GetDistanceAlongSplineAtSplinePoint(t);
            var E = s.GetDistanceAlongSplineAtSplinePoint(t + 1);
            for (let t = C + l; t < E; t += l) {
              var P;
              var p = s.GetDirectionAtDistanceAlongSpline(t, 1);
              if (!(MathUtils_1.MathUtils.GetAngleByVectorDot(i, p) < PATROL_ANGLE_LIMIT)) {
                i = p;
                p = s.D_GetLocationAtDistanceAlongSpline(t, 1);
                if (n && a) {
                  this.aoe(p, a);
                }
                (P = new PatrolPoint()).IsMain = false;
                P.Point = Vector_1.Vector.Create(p);
                _.push(P);
              }
            }
          }
        }
      }
      if (_.length === 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 29, "Spline初始化移动点为空", ["Path", t]);
      }
    }
  }
  aoe(t, i) {
    if (!AiPatrolController.uoe) {
      const e = UE.NewObject(UE.TraceLineElement.StaticClass());
      e.bIsSingle = true;
      e.bIgnoreSelf = true;
      e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
      AiPatrolController.uoe = e;
    }
    const e = AiPatrolController.uoe;
    e.WorldContextObject = i;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, t);
    e.SetEndLocation(t.X, t.Y, t.Z - TRACE_DISTANCE);
    var i = TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY);
    var r = e.HitResult;
    if (i || (e.SetEndLocation(t.X, t.Y, t.Z + TRACE_DISTANCE), TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY))) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(r, 0, t);
    }
  }
  hoe(t) {
    if (t.SplineData.Type === IComponent_1.ESplineType.Patrol && ((t = t.SplineData).CycleOption && (t.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop ? (this.Yie.Loop = true, this.Yie.CirclePatrol = t.CycleOption.IsCircle) : this.Yie.Loop = false), t.IsFloating && (this.Yie.ContainZ = t.IsFloating), t.IsNavigation && (this.Yie.IsNavigation = t.IsNavigation), t.TurnSpeed)) {
      this.Yie.TurnSpeed = t.TurnSpeed;
    }
  }
  loe(t, i, e) {
    e = e.SplineData;
    i.MoveState = e.Points[t].MoveState;
    i.MoveSpeed = e.Points[t].MoveSpeed;
    i.IsIgnorePoint = e.Points[t].IgnorePoint ?? false;
    i.StayTime = e.Points[t].StayTime ?? 0;
    i.IsHide = e.Points[t].IsHide ?? false;
  }
  _oe(t, i, e) {
    e = e.SplineData.Points[t].Actions;
    if (e) {
      i.Actions = e;
    }
  }
  GetNearestPatrolPointIndex(e) {
    let r = 0;
    let o = Number.MAX_VALUE;
    for (let t = 0, i = this.Xie.length; t < i; t++) {
      var s = this.Xie[t];
      if (s.IsMain && (s = Vector_1.Vector.DistSquared(e, s.Point)) < o) {
        o = s;
        r = t;
      }
    }
    return r;
  }
  ResetBaseInfoByMainPoint(e, r, o) {
    var s = this.ioe;
    if (this.Xie.length !== 0 && !(this.Xie.length <= s)) {
      let i = this.Xie[s];
      if (!i?.IsMain) {
        for (let t = s; t > -1; t--) {
          var h = this.Xie[t];
          if (h?.IsMain) {
            i = h;
            break;
          }
        }
      }
      let t = o;
      if (i?.IsMain && i.MoveState > 0) {
        t = i.MoveState;
      }
      this.ChangeMoveState(r, t);
      if (i?.IsMain && (this.ChangeMoveSpeed(e, r, i.MoveSpeed), (s = this.Hte).SkeletalMesh?.SetVisibility(!i.IsHide), o = s.Entity.GetComponent(206))) {
        e = -841499802;
        if (i.IsHide) {
          if (!o.HasTag(e)) {
            o.AddTag(e);
          }
        } else if (o.HasTag(e)) {
          o.RemoveTag(e);
        }
      }
    }
  }
  ChangeMoveSpeed(t, i, e) {
    if (t) {
      if (e > 0) {
        t.SetMaxSpeed(e);
      } else if (i) {
        e = i.MoveState;
        t.ResetMaxSpeed(e);
      }
    }
  }
  CheckMoveStateChanged(t, i) {
    let e = CharacterUnifiedStateTypes_1.ECharMoveState.Stand;
    switch (i) {
      case 1:
        e = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
        break;
      case 2:
        e = CharacterUnifiedStateTypes_1.ECharMoveState.Run;
    }
    if (t && (i = t.MoveState) !== e && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 29, "巡逻过程中MoveState发生改变", ["PbDataId", this.Hte.CreatureData.GetPbDataId()], ["CorrectState", e], ["NowState", i]);
    }
    return false;
  }
  ChangeMoveState(t, i) {
    let e = CharacterUnifiedStateTypes_1.ECharMoveState.Stand;
    switch (i) {
      case 1:
        e = CharacterUnifiedStateTypes_1.ECharMoveState.Walk;
        break;
      case 2:
        e = CharacterUnifiedStateTypes_1.ECharMoveState.Run;
    }
    if (t && t.MoveState !== e) {
      t.SetMoveState(e);
    }
  }
  AddPerformanceTags(e) {
    this.eoe ||= new Array();
    for (let t = 0, i = e.length; t < i; t++) {
      this.eoe.push(e[t]);
    }
    var t;
    var i = this.Hte.Entity.GetComponent(206);
    if (i && !i.HasTag(t = -1645015979)) {
      i.AddTag(t);
    }
  }
  GetNextPerformanceTag() {
    if (this.eoe && this.eoe.length !== 0) {
      return this.eoe.shift();
    }
  }
  soe() {
    if (this.Yie?.SplineEntityId && this.Jie?.IsValid()) {
      this.Jie = undefined;
      ModelManager_1.ModelManager.GameSplineModel.ReleaseSpline(this.Yie.SplineEntityId, this.Hte.CreatureData.GetPbDataId());
    }
    this.zie = undefined;
  }
  StartPatrol(t, i) {
    var e = this.Hte;
    this.E0 = e.Entity.Id;
    this.roe = i;
    ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, END_KEY, 0);
    var i = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.E0, TIMES_KEY);
    if (i) {
      this.toe = i;
      if (this.toe % 2 != 0) {
        this.ooe = true;
      }
    } else {
      this.toe = 0;
      this.ooe = !!this.StartWithInversePath;
    }
    if (t) {
      if ((i = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.E0, INDEX_KEY)) !== undefined && i < this.Xie.length) {
        this.coe(i);
      } else {
        t = this.GetNearestPatrolPointIndex(e.ActorLocationProxy);
        this.coe(t);
      }
    } else {
      i = this.GetNearestPatrolPointIndex(e.ActorLocationProxy);
      this.coe(i);
    }
    ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, INDEX_KEY, this.ioe);
  }
  coe(t) {
    this.ioe = t;
    if (this.roe) {
      this.roe();
    }
  }
  CheckPatrolEnd() {
    if (this.$ie.CirclePatrol) {
      return this.moe();
    } else {
      return this.doe();
    }
  }
  SetPatrolIndex(t) {
    if (this.ioe !== t && (this.ioe = t, this.Yie.CirclePatrol ? (this.ioe + 1) % this.Xie.length === this.Yie.StartIndex && (++this.toe, ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, TIMES_KEY, this.toe), this.Yie.Loop || ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, END_KEY, 1)) : this.ooe ? this.ioe === 0 && (this.ooe = false, ++this.toe, ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, TIMES_KEY, this.toe)) : this.ioe === this.Xie.length - 1 && (++this.toe, ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, TIMES_KEY, this.toe), this.Yie.Loop ? this.ooe = true : ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, END_KEY, 1)), this.roe)) {
      this.roe();
    }
  }
  moe() {
    this.coe((this.ioe + 1) % this.Xie.length);
    if (this.ioe === this.$ie.StartIndex) {
      if (!this.$ie.Loop) {
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, END_KEY, 1);
        return true;
      }
      ++this.toe;
      ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, TIMES_KEY, this.toe);
    }
    return false;
  }
  doe() {
    if (this.ooe) {
      if (this.ioe === 0) {
        this.ooe = false;
        this.coe(0);
        ++this.toe;
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, TIMES_KEY, this.toe);
      } else {
        this.coe(this.ioe - 1);
      }
    } else if (this.ioe === this.Xie.length - 1) {
      ++this.toe;
      ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, TIMES_KEY, this.toe);
      if (!this.$ie.Loop) {
        ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, END_KEY, 1);
        return true;
      }
      this.ooe = true;
      this.coe(this.Xie.length - 2);
    } else {
      this.coe(this.ioe + 1);
    }
    return false;
  }
  PatrolFinish() {
    if (ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.E0, INDEX_KEY) !== this.ioe) {
      ControllerHolder_1.ControllerHolder.BlackboardController.SetIntValueByEntity(this.E0, INDEX_KEY, this.ioe);
    }
    this.roe = undefined;
  }
  GetPatrolPoint(t) {
    if (this.Xie && this.Xie.length !== 0 && !(this.Xie.length <= t)) {
      return this.Xie[t];
    }
  }
  get PatrolIndex() {
    return this.ioe;
  }
  get PatrolPoint() {
    return this.GetPatrolPoint(this.ioe);
  }
  get AllPatrolPoints() {
    return this.Xie;
  }
  GetLastPatrolPoint() {
    var t = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.E0, INDEX_KEY);
    if (t) {
      t = this.GetPatrolPoint(t);
      if (t) {
        return t.Point;
      }
    }
  }
  Clear() {
    this.Xie.length = 0;
    this.$ie = undefined;
    this.Yie = undefined;
    this.roe = undefined;
    this.soe();
  }
}
(exports.AiPatrolController = AiPatrolController).OpenNpcPatrolDebugMode = true;
AiPatrolController.uoe = undefined;
class PatrolPoint {
  constructor() {
    this.IsMain = false;
    this.Point = undefined;
    this.MoveState = 0;
    this.MoveSpeed = 0;
    this.CharPositionState = undefined;
    this.IsIgnorePoint = false;
    this.StayTime = 0;
    this.IsHide = false;
    this.Actions = undefined;
  }
}
exports.PatrolPoint = PatrolPoint;
//# sourceMappingURL=AiPatrolController.js.map