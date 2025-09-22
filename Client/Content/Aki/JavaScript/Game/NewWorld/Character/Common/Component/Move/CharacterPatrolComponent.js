"use strict";

var __decorate = this && this.__decorate || function (t, i, e, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, e) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, i, e, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        h = (r < 3 ? o(h) : r > 3 ? o(i, e, h) : o(i, e)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(i, e, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPatrolComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../../Core/Net/Net");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../../UniverseEditor/Interface/IComponent");
const GameSplineComponent_1 = require("../../../../../LevelGamePlay/Common/GameSplineComponent");
const LevelGeneralContextDefine_1 = require("../../../../../LevelGamePlay/LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const CharacterUnifiedStateTypes_1 = require("../Abilities/CharacterUnifiedStateTypes");
class PatrolRecord {
  constructor(t) {
    this.IsActive = false;
    this.PatrolState = 0;
    this.LastPointIndex = -1;
    this.OnArrivePointHandle = undefined;
    this.OnTriggerActionsHandle = undefined;
    this.OnPatrolEndHandle = undefined;
    this.OnArrivePointHandle = t.OnArrivePointHandle;
    this.OnTriggerActionsHandle = t.OnTriggerActionsHandle;
    this.OnPatrolEndHandle = t.OnPatrolEndHandle;
  }
}
class SplineInfo {
  constructor() {
    this.SplineId = 0;
    this.SplineComp = undefined;
    this.VirtualSplinePoints = undefined;
    this.SegmentsMoveConfig = undefined;
    this.IsLoop = false;
    this.IsCircle = false;
  }
}
let CharacterPatrolComponent = class CharacterPatrolComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.MoveComp = undefined;
    this.CreatureData = undefined;
    this.RecordList = undefined;
    this.SplineInfoList = undefined;
    this.CurrentPatrol = undefined;
    this.CurrentSplineInfo = undefined;
    this.PauseKeyMap = new Map();
    this.CacheVector = undefined;
    this.CacheVector2 = undefined;
    this.DebugMode = false;
    this.OnSegmentPatrolFinished = t => {
      switch (t) {
        case 2:
          var i = this.CurrentPatrol?.OnPatrolEndHandle;
          if (i) {
            i(2);
          }
          break;
        case 1:
          var i = this.GetPointActions(this.CurrentPatrol.LastPointIndex);
          if (i && i.length) {
            this.OnTriggerSplineActions(i);
          } else if (i = this.GetNextPointMoveConfig()) {
            i.StartIndex = 0;
            i.NavigateToStartPos = false;
            this.MoveComp.MoveAlongPath(i);
          } else {
            this.OnPatrolFinished();
          }
      }
    };
    this.OnPatrolFinished = () => {
      var t = this.CurrentPatrol.OnPatrolEndHandle;
      this.StopPatrol(this.CurrentSplineInfo.SplineId);
      if (t) {
        t(1);
      }
    };
    this.OnTriggerSplineActions = t => {
      var i = this.CurrentSplineInfo.SplineId;
      var e = this.GetRawIndexInSpline(this.CurrentPatrol.LastPointIndex);
      var s = this.CurrentPatrol.OnTriggerActionsHandle;
      switch (this.CurrentSplineInfo.SplineComp.Option.Type) {
        case IComponent_1.ESplineType.LevelAI:
          if (s) {
            s(t);
          }
          break;
        case IComponent_1.ESplineType.Patrol:
          this.CurrentPatrol.PatrolState = 2;
          this.PausePatrol(i, "ExecuteSplineAction");
          if (s) {
            s(t);
          }
          this.SplineActionRunner(i, e, t);
      }
    };
    this.pKl = false;
  }
  OnStart() {
    this.CreatureData = this.Entity.GetComponent(0);
    this.ActorComp = this.Entity.GetComponent(1);
    this.MoveComp = this.Entity.GetComponent(45);
    this.RecordList = new Map();
    this.SplineInfoList = new Map();
    this.CacheVector = Vector_1.Vector.Create();
    this.CacheVector2 = Vector_1.Vector.Create();
    return true;
  }
  OnActivate() {}
  OnClear() {
    return true;
  }
  StartPatrol(t, i) {
    var e;
    if (!this.CurrentPatrol?.IsActive) {
      if ((e = this.SplineInfoList.get(t) ?? this.InitSplineInfo(t, i)) && this.PartitionSplineAndCreateMoveConfig(e, i)) {
        this.Pih(e, i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 50, "初始化样条失败，无法开始巡逻", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["SplineId", t]);
      }
    }
  }
  StartSplineCurvePatrol(t, i, e, s) {
    if (!this.CurrentPatrol?.IsActive) {
      if ((i = this.SplineInfoList.get(t) ?? this.InitSplineInfoWithCurve(t, i, e, s, true)) && this.PartitionSplineAndCreateMoveConfig(i, s)) {
        this.Pih(i, s);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 50, "初始化样条失败，无法开始巡逻", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["SplineId", t]);
      }
    }
  }
  Pih(t, i) {
    var e = t.SplineId;
    var s = new PatrolRecord(i);
    s.IsActive = true;
    s.PatrolState = 1;
    this.CurrentPatrol = s;
    this.CurrentSplineInfo = t;
    this.RecordList.set(e, s);
    this.SplineInfoList.set(e, t);
    this.pKl = i.NoRequestServer ?? false;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 50, "[CharacterPatrolComp.StartPatrol] 开始样条巡逻", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Actor", this.ActorComp?.Owner?.GetName()], ["SplineId", e], ["LastPoint", this.CurrentPatrol?.LastPointIndex]);
    }
    let o = this.GetNextPointIndex();
    if (i.UseNearestPoint) {
      o = i.IgnorePointDirection ? this.GetNearestDistancePointIndex() : this.GetNearestPatrolPointIndex();
    }
    s = this.GetSegmentInfo(o);
    t = this.CurrentSplineInfo.SegmentsMoveConfig[s.SegmentIndex];
    if (t) {
      t.StartIndex = s.IndexInSegment;
      t.NavigateToStartPos = true;
      this.MoveComp.MoveAlongPath(t);
      this.PatrolBeginRequest();
    }
  }
  PausePatrol(i, e) {
    var s = this.RecordList.get(i);
    if (s) {
      let t = this.PauseKeyMap.get(i);
      if (!t) {
        t = new Set();
        this.PauseKeyMap.set(i, t);
      }
      if (t.has(e)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 50, "[CharacterPlanComponent] 重复使用暂停巡逻的Key", ["PbDataId", this.CreatureData?.GetPbDataId()], ["SplineId", i], ["context", this.constructor.name], ["Key", e]);
        }
      } else {
        t.add(e);
        if (t.size === 1 && (Log_1.Log.CheckInfo() && Log_1.Log.Info("AI", 50, "[CharacterPatrolComp.PausePatrol] 暂停样条巡逻", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Actor", this.ActorComp?.Owner?.GetName()], ["SplineId", this.CurrentSplineInfo?.SplineId], ["LastPoint", this.CurrentPatrol?.LastPointIndex]), s.IsActive = false, this.CurrentSplineInfo?.SplineId === i)) {
          this.MoveComp.StopMoveNew();
          this.PatrolEndRequest();
        }
      }
    }
  }
  ResumePatrol(t, i) {
    var e;
    var s;
    if (!this.CurrentPatrol?.IsActive) {
      if (e = this.RecordList.get(t)) {
        if ((s = this.PauseKeyMap.get(t))?.delete(i)) {
          if (!s.size) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("AI", 50, "[CharacterPatrolComp.ResumePatrol] 继续样条巡逻", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Actor", this.ActorComp?.Owner?.GetName()], ["SplineId", this.CurrentSplineInfo?.SplineId], ["LastPoint", this.CurrentPatrol?.LastPointIndex]);
            }
            e.IsActive = true;
            this.RestoreState(t);
            this.MoveAlongPathWithRecord();
            this.PatrolBeginRequest();
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 50, "[CharacterPatrolComp] 继续巡逻使用了未定义的Key", ["PbDataId", this.CreatureData?.GetPbDataId()], ["SplineId", t], ["context", this.constructor.name], ["Key", i]);
        }
      }
    }
  }
  StopPatrol(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 50, "[CharacterPatrolComp.StopPatrol] 停止样条巡逻", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Actor", this.ActorComp?.Owner?.GetName()], ["SplineId", this.CurrentSplineInfo?.SplineId], ["LastPoint", this.CurrentPatrol?.LastPointIndex]);
    }
    if (t === this.CurrentSplineInfo?.SplineId) {
      this.MoveComp.StopMoveNew();
      this.PatrolEndRequest();
    }
    this.ResetState(t);
  }
  GetLastPointRawIndex() {
    if (this.CurrentPatrol) {
      return this.GetRawIndexInSpline(this.CurrentPatrol.LastPointIndex);
    } else {
      return -1;
    }
  }
  GetLastPointLocation() {
    if (this.CurrentPatrol && this.CurrentSplineInfo) {
      return this.CurrentSplineInfo.VirtualSplinePoints[this.CurrentPatrol.LastPointIndex].Point;
    }
  }
  GetCurrentPatrolSplineId() {
    if (this.CurrentPatrol && this.CurrentSplineInfo) {
      return this.CurrentSplineInfo.SplineId;
    } else {
      return 0;
    }
  }
  HasPatrolRecord(t) {
    if (t) {
      return !!this.RecordList?.has(t);
    } else {
      return !!this.CurrentPatrol;
    }
  }
  GetIsPauseState(t) {
    return !!this.PauseKeyMap.get(t) && this.PauseKeyMap.get(t).size > 0;
  }
  IsInPatrol() {
    return this.CurrentPatrol?.IsActive ?? false;
  }
  IsPositiveDirection() {
    return !this.CurrentSplineInfo || !this.CurrentPatrol || !this.CurrentSplineInfo.IsLoop || !this.CurrentSplineInfo.IsCircle || this.CurrentPatrol.LastPointIndex < this.CurrentSplineInfo.SplineComp.PathPoint.length - 1;
  }
  SplineActionRunner(i, e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("AI", 50, "开始执行同步事件", ["PbDataId", this.CreatureData?.GetPbDataId()], ["SplineId", i], ["PointIndex", e]);
    }
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t, LevelGeneralContextDefine_1.EntityContext.Create(this.ActorComp.Entity.Id), t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("AI", 50, "同步事件执行完毕", ["PbDataId", this.CreatureData?.GetPbDataId()], ["SplineId", i], ["PointIndex", e]);
      }
      this.RecordList.get(i).PatrolState = 1;
      this.ResumePatrol(i, "ExecuteSplineAction");
    });
  }
  InitSplineInfo(t, i) {
    var e = new GameSplineComponent_1.GameSplineComponent(t);
    if (this.TryInitSplineFromAiPatrol(e) || e.InitializeWithSubPoints(t) || e.Initialize()) {
      return this.InitSplineInfoFromSplineComp(e, i);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelAi", 42, "[CharacterPatrolComp.InitSpline] GameSplineComponent初始化失败", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["SplinePbDataId", t]);
    }
  }
  InitSplineInfoWithCurve(t, i, e, s, o) {
    t = new GameSplineComponent_1.GameSplineComponent(t);
    t.InitializeWithSplineCurve(i, e, o);
    return this.InitSplineInfoFromSplineComp(t, s);
  }
  InitSplineInfoFromSplineComp(i, t) {
    if (i.Option.Type === IComponent_1.ESplineType.LevelAI || i.Option.Type === IComponent_1.ESplineType.Patrol) {
      var e;
      var s = i.SplineId;
      var o = new SplineInfo();
      o.SplineId = s;
      switch (i.Option.Type) {
        case IComponent_1.ESplineType.Patrol:
          o.IsLoop = false;
          o.IsCircle = false;
          if (i.Option.CycleOption && i.Option.CycleOption.Type === IComponent_1.EPatrolCycleMode.Loop) {
            o.IsLoop = true;
            o.IsCircle = i.Option.CycleOption.IsCircle;
          }
          break;
        case IComponent_1.ESplineType.LevelAI:
          o.IsLoop = false;
          o.IsCircle = false;
          if (i.Option.CycleOption && i.Option.CycleOption.Type === IComponent_1.ELevelAiCycleMode.Loop) {
            o.IsLoop = true;
            o.IsCircle = i.Option.CycleOption.IsCircle;
          }
      }
      if (t.StartPointIndex !== undefined || t.EndPointIndex !== undefined) {
        s = i.PathPoint.length;
        e = t.StartPointIndex ? MathUtils_1.MathUtils.Clamp(t.StartPointIndex, 0, s - 1) : 0;
        t = t.EndPointIndex ? MathUtils_1.MathUtils.Clamp(t.EndPointIndex, 0, s - 1) : s - 1;
        i.PathPoint = i.PathPoint.slice(e, t + 1);
      }
      o.SplineComp = i;
      o.VirtualSplinePoints = i.PathPoint.slice(0);
      if (o.IsCircle && o.VirtualSplinePoints.length > 2) {
        for (let t = i.PathPoint.length - 2; t > 0; --t) {
          o.VirtualSplinePoints.push(i.PathPoint[t]);
        }
      }
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelAi", 50, "[CharacterPatrolComp.InitSpline] 非巡逻样条或关卡Ai样条，无法初始化", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["SplinePbDataId", i.SplineId]);
    }
  }
  PartitionSplineAndCreateMoveConfig(s, o) {
    if (!s.VirtualSplinePoints.length) {
      return false;
    }
    if (!s.SegmentsMoveConfig) {
      s.SegmentsMoveConfig = new Array();
      let i = [];
      let e = 0;
      var r = s.VirtualSplinePoints.length;
      for (let t = 0; t < r; ++t) {
        var h = s.VirtualSplinePoints[t];
        i.push(h);
        if (t === r - 1 || h.Actions && h.Actions.length !== 0) {
          this.CreateMoveConfig(s, i, e, o);
          e += i.length;
          i = [];
        }
      }
    }
    return true;
  }
  CreateMoveConfig(t, i, e, s) {
    if (t.SplineComp && i.length) {
      var o = [];
      for (let t = 0; t < i.length; t++) {
        const n = i[t];
        var r = {
          Index: t,
          Position: n.Point,
          Actions: new Array(),
          MoveState: n.MoveState,
          MoveSpeed: n.MoveSpeed,
          PosState: n.CharPositionState ? this.GetPosStateType(n.CharPositionState) : undefined,
          Callback: () => {
            this.UpdatePatrolRecord(t + e);
            if (n.IsMain && this.CurrentPatrol?.OnArrivePointHandle) {
              this.CurrentPatrol.OnArrivePointHandle();
            }
          }
        };
        if (!this.ActorComp?.CreatureData.IsRole() && r.MoveState === IComponent_1.EPatrolMoveState.Sprint) {
          r.MoveState = IComponent_1.EPatrolMoveState.Run;
        }
        o.push(r);
      }
      var h = t.SplineComp.Option;
      var h = {
        Points: o,
        Navigation: h.IsNavigation ?? false,
        IsFly: s.IsFollowStrictly ?? h.IsFloating ?? false,
        DebugMode: s.DebugMode ?? false,
        Loop: false,
        CircleMove: false,
        UsePreviousIndex: false,
        UseNearestPoint: false,
        ReturnFalseWhenNavigationFailed: false
      };
      h.Callback = this.OnSegmentPatrolFinished;
      t.SegmentsMoveConfig.push(h);
    }
  }
  UpdatePatrolRecord(t) {
    if (this.CurrentPatrol?.IsActive && (this.CurrentSplineInfo.IsLoop && this.CurrentSplineInfo.IsCircle && this.DirectionChangeRequest(t), this.CurrentPatrol.LastPointIndex = t, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("AI", 50, "到达点巡逻点", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Actor", this.ActorComp?.Owner?.GetName()], ["SplineId", this.CurrentSplineInfo?.SplineId], ["PointIndex", this.CurrentPatrol.LastPointIndex]);
    }
  }
  MoveAlongPathWithRecord() {
    var t;
    var i;
    var e;
    if (this.CurrentPatrol?.IsActive && this.CurrentSplineInfo) {
      t = (e = this.CurrentPatrol.PatrolState === 2) ? this.CurrentPatrol.LastPointIndex : this.GetNextPointIndex();
      i = this.GetSegmentInfo(t);
      if (e || i.SegmentIndex !== -1) {
        (e = this.CurrentSplineInfo.SegmentsMoveConfig[i.SegmentIndex]).StartIndex = i.IndexInSegment;
        e.NavigateToStartPos = true;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 50, "[CharacterPatrolComp.MoveAlongPathWithRecord] 依据历史选择下个目标点", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Actor", this.ActorComp?.Owner?.GetName()], ["SplineId", this.CurrentSplineInfo?.SplineId], ["StartIndex", t]);
        }
        this.MoveComp.MoveAlongPath(e);
      } else if ((i = this.GetSegmentInfo(this.CurrentPatrol.LastPointIndex)).SegmentIndex !== -1 && i.IsEnd) {
        this.OnPatrolFinished();
      }
    }
  }
  ResetState(t) {
    this.RecordList?.delete(t);
    this.PauseKeyMap.delete(t);
    if (t === this.CurrentSplineInfo?.SplineId) {
      this.CurrentPatrol = undefined;
      this.CurrentSplineInfo = undefined;
    }
  }
  RestoreState(t) {
    return this.RestorePatrolState(t) && this.RestoreSplineState(t);
  }
  RestorePatrolState(t) {
    t = this.RecordList.get(t);
    return !!t && (this.CurrentPatrol = t, true);
  }
  RestoreSplineState(t) {
    t = this.SplineInfoList.get(t);
    return !!t && (this.CurrentSplineInfo = t, true);
  }
  PatrolBeginRequest() {
    var t;
    if (this.CreatureData.IsMonster() && !this.pKl) {
      (t = Protocol_1.Aki.Protocol.Kes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureData.GetCreatureDataId());
      t.V4n = this.CurrentPatrol.LastPointIndex < this.CurrentSplineInfo.SplineComp.PathPoint.length - 1;
      Net_1.Net.Call(21731, t, () => {});
    }
  }
  PatrolEndRequest() {
    var t;
    if (this.CreatureData.IsMonster() && !this.pKl) {
      (t = Protocol_1.Aki.Protocol.Xes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureData.GetCreatureDataId());
      Net_1.Net.Call(16952, t, () => {});
    }
  }
  DirectionChangeRequest(t) {
    var i;
    if (this.CreatureData.IsMonster() && !this.pKl) {
      if (t === 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 50, "往返式巡逻：回到起点", ["PbDataID", this.ActorComp.CreatureData.GetPbDataId()]);
        }
        (i = Protocol_1.Aki.Protocol.Jes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.CreatureData.GetCreatureDataId());
        i.V4n = true;
        Net_1.Net.Call(16730, i, () => {});
      } else if (t === this.CurrentSplineInfo.SplineComp.PathPoint.length - 1) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 50, "往返式巡逻：走到终点", ["PbDataID", this.ActorComp.CreatureData.GetPbDataId()]);
        }
        (i = Protocol_1.Aki.Protocol.Jes.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.ActorComp.CreatureData.GetCreatureDataId());
        i.V4n = false;
        Net_1.Net.Call(16730, i, () => {});
      }
    }
  }
  GetSegmentInfo(e) {
    if (!!this.CurrentSplineInfo?.SegmentsMoveConfig && !(e < 0) && !(e >= this.CurrentSplineInfo.VirtualSplinePoints.length)) {
      let i = 0;
      var s = this.CurrentSplineInfo.SegmentsMoveConfig.length;
      for (let t = 0; t < s; ++t) {
        var o = this.CurrentSplineInfo.SegmentsMoveConfig[t].Points.length;
        if (e >= i && e < i + o) {
          return {
            SegmentIndex: t,
            IndexInSegment: e - i,
            IsEnd: e - i == o - 1
          };
        }
        i += o;
      }
    }
    return {
      SegmentIndex: -1,
      IndexInSegment: -1,
      IsEnd: false
    };
  }
  GetPointActions(t) {
    if (!!this.CurrentSplineInfo?.VirtualSplinePoints && !(t < 0) && !(t >= this.CurrentSplineInfo.VirtualSplinePoints.length)) {
      return this.CurrentSplineInfo.VirtualSplinePoints[t].Actions;
    }
  }
  GetNearestPatrolPointIndex() {
    if (!this.CurrentSplineInfo?.VirtualSplinePoints?.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 50, "获取最近点失败", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()]);
      }
      return 0;
    }
    var i = this.CurrentSplineInfo.VirtualSplinePoints;
    let e = 0;
    let s = Number.MAX_VALUE;
    var o = this.ActorComp.ActorLocationProxy;
    var r = Vector_1.Vector.Create();
    var h = Vector_1.Vector.Create();
    for (let t = 0; t < i.length - 1; t++) {
      r.DeepCopy(i[t].Point);
      h.DeepCopy(i[t + 1].Point);
      this.CacheVector.Set(h.X, h.Y, h.Z);
      this.CacheVector.Subtraction(r, this.CacheVector);
      var n = this.CacheVector.Size();
      this.CacheVector2.Set(o.X, o.Y, o.Z);
      this.CacheVector2.Subtraction(h, this.CacheVector2);
      if (!(this.CacheVector.DotProduct(this.CacheVector2) > 0) && !(this.CacheVector2.Set(o.X, o.Y, o.Z), this.CacheVector2.Subtraction(r, this.CacheVector2), this.CacheVector.DotProduct(this.CacheVector2) < 0) && !(this.CacheVector.DotProduct(this.ActorComp.ActorForwardProxy) < 0)) {
        this.CacheVector.CrossProduct(this.CacheVector2, this.CacheVector);
        if ((n = this.CacheVector.Size() / n) < s) {
          s = n;
          e = t + 1;
        }
      }
    }
    return e;
  }
  GetNearestDistancePointIndex() {
    if (!this.CurrentSplineInfo?.VirtualSplinePoints?.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 50, "获取最近点失败", ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()]);
      }
      return 0;
    }
    var i = this.CurrentSplineInfo.VirtualSplinePoints;
    let e = 0;
    let s = Number.MAX_VALUE;
    var o = this.ActorComp.ActorLocationProxy;
    for (let t = 0; t < i.length - 1; t++) {
      var r = Vector_1.Vector.DistSquared(o, i[t].Point);
      if (r < s) {
        e = t;
        s = r;
      }
    }
    return e;
  }
  GetRawIndexInSpline(t) {
    var i;
    if (this.CurrentSplineInfo) {
      i = this.CurrentSplineInfo.SplineComp.PathPoint.length;
      if (!this.CurrentSplineInfo.IsCircle && i <= t || this.CurrentSplineInfo.IsCircle && t >= this.CurrentSplineInfo.VirtualSplinePoints.length) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelAi", 50, "[CharacterPatrolComp.GetRawIndexInSpline] 索引越界", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["SplineId", this.CurrentSplineInfo?.SplineId]);
        }
        return -1;
      } else {
        return this.CurrentSplineInfo.SplineComp.GetLastMainPointIndex(t < i ? t : i * 2 - 2 - t);
      }
    } else {
      return -1;
    }
  }
  GetNextPointIndex(t) {
    if (this.CurrentPatrol && this.CurrentSplineInfo && ((t = t ?? this.CurrentPatrol.LastPointIndex) !== this.CurrentSplineInfo.VirtualSplinePoints.length - 1 || this.CurrentSplineInfo.IsLoop)) {
      return (t + 1) % this.CurrentSplineInfo.VirtualSplinePoints.length;
    } else {
      return -1;
    }
  }
  GetNextPointMoveConfig() {
    if (this.CurrentPatrol && this.CurrentSplineInfo?.SegmentsMoveConfig) {
      var t = this.GetNextPointIndex();
      var t = this.GetSegmentInfo(t);
      if (t.SegmentIndex !== -1) {
        return this.CurrentSplineInfo.SegmentsMoveConfig[t.SegmentIndex];
      }
    }
  }
  GetSymmetryPointIndex(t) {
    if (this.CurrentSplineInfo?.IsLoop && this.CurrentSplineInfo.IsCircle) {
      if (t === 0) {
        return t;
      } else {
        return this.CurrentSplineInfo.VirtualSplinePoints.length - t;
      }
    } else {
      return -1;
    }
  }
  GetPosStateType(t) {
    switch (t) {
      case 0:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
      case 2:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Air;
      default:
        return CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
    }
  }
  TryInitSplineFromAiPatrol(i) {
    var t = this.Entity.GetComponent(47)?.AiController.AiPatrol;
    if (!t?.AllPatrolPoints || !t.AllPatrolPoints.length) {
      return false;
    }
    if (!i.InitializeWithSubPoints(this.CreatureData.GetPbDataId())) {
      return false;
    }
    i.PathPoint.length = 0;
    for (const e of t.AllPatrolPoints) {
      i.PathPoint.push(e);
    }
    i.MainPointIndexArray = new Array();
    for (let t = 0; t < i.PathPoint.length; t++) {
      if (i.PathPoint[t].IsMain) {
        i.MainPointIndexArray.push(t);
      }
    }
    return true;
  }
};
CharacterPatrolComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(48)], CharacterPatrolComponent);
exports.CharacterPatrolComponent = CharacterPatrolComponent; //# sourceMappingURL=CharacterPatrolComponent.js.map