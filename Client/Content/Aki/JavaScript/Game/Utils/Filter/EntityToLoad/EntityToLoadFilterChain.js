"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityToLoadFilterChain = exports.EntityToLoadParam = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FilterChain_1 = require("../Core/FilterChain");
const EntityToLoadFilter_1 = require("./EntityToLoadFilter");
class EntityToLoadParam {
  constructor(t, i, e, s, r) {
    this.MaxLoadingCount = EntityToLoadFilter_1.MAX_LOADING_ENTITY_COUNT;
    this.LoadingInterval = EntityToLoadFilter_1.LOADING_INTERVAL;
    this.MaxLoadingDebugName = "MAX_LOADING_ENTITY_COUNT";
    this.LoadingIntervalDebugName = "LOADING_INTERVAL";
    if (t) {
      this.MaxLoadingCount = t.MaxLoadingCount;
      this.LoadingInterval = t.LoadingInterval;
      this.MaxLoadingDebugName = t.MaxLoadingDebugName;
      this.LoadingIntervalDebugName = t.LoadingIntervalDebugName;
    } else {
      this.MaxLoadingCount = i ?? this.MaxLoadingCount;
      this.LoadingInterval = e ?? this.LoadingInterval;
      this.MaxLoadingDebugName = s ?? this.MaxLoadingDebugName;
      this.LoadingIntervalDebugName = r ?? this.LoadingIntervalDebugName;
    }
  }
}
exports.EntityToLoadParam = EntityToLoadParam;
class EntityToLoadFilterChain extends FilterChain_1.FilterChain {
  constructor() {
    super(...arguments);
    this.IOc = new PriorityQueue_1.PriorityQueue((t, i) => t.Priority === i.Priority ? t.Order - i.Order : t.Priority - i.Priority);
    this.TOc = new Map();
    this.jEa = [];
    this.YEa = Vector_1.Vector.Create();
    this.JEa = Vector_1.Vector.Create();
    this.zEa = Vector_1.Vector.Create();
    this.eya = Vector_1.Vector.Create();
    this.iya = Stats_1.Stat.Create("WaitEntityToLoadTask.UpdatePriority");
    this.bOc = Stats_1.Stat.Create("EntityToLoadFilterChain.RefreshEntityToLoadParamStat");
    this.xHa = 0;
    this.EntityToLoadParam = new EntityToLoadParam();
    this.LOc = t => {
      if (t.MaxLoadingCount < this.EntityToLoadParam.MaxLoadingCount && (this.EntityToLoadParam.MaxLoadingCount = t.MaxLoadingCount, this.EntityToLoadParam.MaxLoadingDebugName = t.MaxLoadingDebugName, ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Preload", 60, "预加载实体:更新最大加载数量", ["MaxLoadingCount", t.MaxLoadingCount], ["DebugName", t.MaxLoadingDebugName]);
      }
      if (t.LoadingInterval > this.EntityToLoadParam.LoadingInterval && (this.EntityToLoadParam.LoadingInterval = t.LoadingInterval, this.EntityToLoadParam.LoadingIntervalDebugName = t.LoadingIntervalDebugName, ModelManager_1.ModelManager.CreatureModel.EnableEntityLog) && Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Preload", 60, "预加载实体:更新帧间隔", ["FrameInterval", t.LoadingInterval], ["DebugName", t.LoadingIntervalDebugName]);
      }
    };
  }
  get QueuedHeap() {
    return this.IOc;
  }
  get QueuedEntitiesLookup() {
    return this.TOc;
  }
  static Create() {
    var t = new EntityToLoadFilterChain();
    t.Init();
    return t;
  }
  OnInit() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EntityToLoadParamUpdated, this.LOc);
  }
  OnCleanup() {
    this.IOc.Clear();
    this.jEa.length = 0;
    this.TOc.clear();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EntityToLoadParamUpdated, this.LOc);
  }
  wOc() {
    this.bOc.Start();
    for (const t of this.GetAllFilters()) {
      this.LOc(t);
    }
    this.bOc.Stop();
  }
  PHa(t) {
    if (this.IOc.Size === 0) {
      this.xHa = 0;
    }
    t.Order = this.xHa++;
  }
  mya(t) {
    var i = t.Handle.Entity.GetComponent(0).GetLocation();
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(i);
    var i = Vector_1.Vector.DistSquared(MathUtils_1.MathUtils.CommonTempVector, this.YEa);
    this.YEa.Subtraction(MathUtils_1.MathUtils.CommonTempVector, this.eya);
    var e = this.eya.Normalize() ? Vector_1.Vector.DotProduct(this.eya, this.zEa) : -1;
    var e = e * 0.5 + 0.5;
    t.AngleRatio = e;
    t.Priority = i * e;
  }
  OnPassedTargetModified(t, i) {
    if (this.TOc.has(t)) {
      t = this.TOc.get(t);
      if (i) {
        this.IOc.Push(t);
      } else {
        this.IOc.Remove(t);
      }
    }
  }
  AddFilter(t) {
    super.AddFilter(t);
    this.LOc(t);
  }
  RemoveFilter(t) {
    this.wOc();
    return super.RemoveFilter(t);
  }
  AddPair(t) {
    this.PHa(t);
    this.TOc.set(t.Handle, t);
    this.jEa.push(t.Handle);
    this.AddTarget(t.Handle);
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 60, "预加载实体:进入加载队列", ["EntityId", t.Handle.Id], ["CreatureDataId", t.CreatureDataId], ["PbDataId", t.PbDataId], ["Priority", t.Priority], ["Order", t.Order], ["Version", t.Version], ["Remain", this.IOc.Size]);
    }
  }
  RemovePair(t) {
    if (this.TOc.delete(t.Handle)) {
      this.IOc.Remove(t);
      this.RemoveTarget(t.Handle);
    }
  }
  PopTopPair() {
    var t;
    if (!this.IOc.Empty) {
      t = this.IOc.Pop();
      if (this.TOc.delete(t.Handle)) {
        this.RemoveTarget(t.Handle);
      }
      return t;
    }
  }
  UpdatePriority(t) {
    var i = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(3);
    if (i) {
      this.iya.Start();
      if (Vector_1.Vector.PointsAreSame(this.YEa, i.ActorLocationProxy) && Vector_1.Vector.PointsAreSame(this.JEa, i.ActorForwardProxy)) {
        if (this.jEa.length > 0) {
          this.jEa.forEach(t => {
            t = this.TOc.get(t);
            if (t) {
              this.mya(t);
            }
          });
          this.jEa.length = 0;
          this.IOc.Heapify();
        }
      } else {
        this.YEa.DeepCopy(i.ActorLocationProxy);
        this.JEa.DeepCopy(i.ActorForwardProxy);
        this.JEa.AdditionEqual(t).GetSafeNormal(this.zEa);
        this.jEa.length = 0;
        for (const e of this.TOc.values()) {
          this.mya(e);
        }
        this.IOc.Heapify();
      }
      this.iya.Stop();
    }
  }
}
exports.EntityToLoadFilterChain = EntityToLoadFilterChain;
//# sourceMappingURL=EntityToLoadFilterChain.js.map