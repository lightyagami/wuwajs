"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const DataLayerTransitionTask_1 = require("./DataLayerTransitionTask");
class TsTransitionWorldPartitionTriggerVolume extends UE.WorldPartitionTriggerVolume {
  constructor() {
    super(...arguments);
    this.FunctionEnable = true;
    this.UseTransitionWhenTeleport = false;
    this.MatForActivatingDataLayers = undefined;
    this.MatPathForActivatingDataLayers = undefined;
    this.MatForActivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    this.MatForDeactivatingDataLayers = undefined;
    this.MatPathForDeactivatingDataLayers = undefined;
    this.MatForDeactivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    this.SeqForSourceIn = undefined;
    this.SeqMarkBeforeModifyMatForSourceIn = "";
    this.SeqPathForSourceIn = undefined;
    this.SeqForSourceInLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    this.SeqForSourceOut = undefined;
    this.SeqMarkBeforeModifyMatForSourceOut = "";
    this.SeqPathForSourceOut = undefined;
    this.SeqForSourceOutLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    this.WaitDataLayerStreamingRadius = 10;
    this.MaxTimeForWaitDataLayerActivateFinish = 5;
    this.TransitionTaskQueue = new Queue_1.Queue();
    this.ExecutingTransitionTasks = new Set();
    this.OnTransitionTaskFinish = t => {
      this.ExecutingTransitionTasks.delete(t);
      this.TryStartNextTask();
    };
  }
  Constructor() {
    this.MatPathForActivatingDataLayers = undefined;
    this.MatForActivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    this.MatPathForDeactivatingDataLayers = undefined;
    this.MatForDeactivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    this.SeqPathForSourceIn = undefined;
    this.SeqForSourceInLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    this.SeqPathForSourceOut = undefined;
    this.SeqForSourceOutLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    this.TransitionTaskQueue = new Queue_1.Queue();
    this.ExecutingTransitionTasks = new Set();
    this.OnTransitionTaskFinish = t => {
      this.ExecutingTransitionTasks.delete(t);
      this.TryStartNextTask();
    };
  }
  SetMatForActivatingDataLayers(t) {
    this.MatForActivatingDataLayers = t;
    this.MatPathForActivatingDataLayers = undefined;
    if (this.MatForActivatingDataLayersLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MatForActivatingDataLayersLoadingHandle);
      this.MatForActivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  SetMatForActivatingDataLayersByPath(t) {
    this.MatForActivatingDataLayers = undefined;
    this.MatPathForActivatingDataLayers = t;
    if (this.MatForActivatingDataLayersLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MatForActivatingDataLayersLoadingHandle);
      this.MatForActivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (t) {
      let e = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.KuroSceneMatModifyDataAsset, t => {
        e = true;
        this.MatForActivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
        this.SetMatForActivatingDataLayers(t);
      });
      if (!e) {
        this.MatForActivatingDataLayersLoadingHandle = t;
      }
    }
  }
  WasMatForActivatingDataLayersSet() {
    if (this.MatForActivatingDataLayersLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      return !!this.MatPathForActivatingDataLayers?.length;
    } else {
      return !!this.MatForActivatingDataLayers?.IsValid();
    }
  }
  SetMatForDeactivatingDataLayers(t) {
    this.MatForDeactivatingDataLayers = t;
    this.MatPathForDeactivatingDataLayers = undefined;
    if (this.MatForDeactivatingDataLayersLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MatForDeactivatingDataLayersLoadingHandle);
      this.MatForDeactivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  SetMatForDeactivatingDataLayersByPath(t) {
    this.MatForDeactivatingDataLayers = undefined;
    this.MatPathForDeactivatingDataLayers = t;
    if (this.MatForDeactivatingDataLayersLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.MatForDeactivatingDataLayersLoadingHandle);
      this.MatForDeactivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (t) {
      let e = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.KuroSceneMatModifyDataAsset, t => {
        e = true;
        this.MatForDeactivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
        this.SetMatForDeactivatingDataLayers(t);
      });
      if (!e) {
        this.MatForDeactivatingDataLayersLoadingHandle = t;
      }
    }
  }
  WasMatForDeactivatingDataLayersSet() {
    if (this.MatForDeactivatingDataLayersLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      return !!this.MatPathForDeactivatingDataLayers?.length;
    } else {
      return !!this.MatForDeactivatingDataLayers?.IsValid();
    }
  }
  SetSeqForSourceIn(t, e) {
    this.SeqForSourceIn = t;
    this.SeqPathForSourceIn = undefined;
    this.SeqMarkBeforeModifyMatForSourceIn = e;
    if (this.SeqForSourceInLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SeqForSourceInLoadingHandle);
      this.SeqForSourceInLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  SetSeqForSourceInByPath(t, s = "") {
    this.SeqForSourceIn = undefined;
    this.SeqPathForSourceIn = t;
    this.SeqMarkBeforeModifyMatForSourceIn = s;
    if (this.SeqForSourceInLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SeqForSourceInLoadingHandle);
      this.SeqForSourceInLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (t) {
      let e = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LevelSequence, t => {
        e = true;
        this.SeqForSourceInLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
        this.SetSeqForSourceIn(t, s);
      });
      if (!e) {
        this.SeqForSourceInLoadingHandle = t;
      }
    }
  }
  WasSeqForSourceInSet() {
    if (this.SeqForSourceInLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      return !!this.SeqPathForSourceIn?.length;
    } else {
      return !!this.SeqForSourceIn?.IsValid();
    }
  }
  SetSeqForSourceOut(t, e) {
    this.SeqForSourceOut = t;
    this.SeqPathForSourceOut = undefined;
    this.SeqMarkBeforeModifyMatForSourceOut = e;
    if (this.SeqForSourceOutLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SeqForSourceOutLoadingHandle);
      this.SeqForSourceOutLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  SetSeqForSourceOutByPath(t, s = "") {
    this.SeqForSourceOut = undefined;
    this.SeqPathForSourceOut = t;
    this.SeqMarkBeforeModifyMatForSourceOut = s;
    if (this.SeqForSourceOutLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SeqForSourceOutLoadingHandle);
      this.SeqForSourceOutLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (t) {
      let e = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LevelSequence, t => {
        e = true;
        this.SeqForSourceOutLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
        this.SetSeqForSourceOut(t, s);
      });
      if (!e) {
        this.SeqForSourceOutLoadingHandle = t;
      }
    }
  }
  WasSeqForSourceOutSet() {
    if (this.SeqForSourceOutLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      return !!this.SeqPathForSourceOut?.length;
    } else {
      return !!this.SeqForSourceOut?.IsValid();
    }
  }
  OnStateChanged() {
    if (this.FunctionEnable) {
      var e;
      var s;
      var i = new Set();
      var r = new Set();
      for (let t = 0; t <= this.DatalayerStateMap.GetMaxIndex(); t++) {
        if (this.DatalayerStateMap.IsValidIndex(t)) {
          e = this.DatalayerStateMap.GetKey(t);
          s = this.DatalayerStateMap.Get(e);
          ((this.State === 1 ? s : !s) ? i : r).add(e);
          if (!(s = e.toString()).includes("DLV")) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("TriggerVolume", 39, "[TsTransitionWorldPartitionTriggerVolume] 使用TsTransitionWorldPartitionTriggerVolume控制非DLV的Datalayer, 可能存在冲突, 请检查配置", ["Volume", UE.KismetSystemLibrary.GetPathName(this)], ["State", this.State], ["DatalayerLabel", s]);
            }
          }
        }
      }
      if (i.size && r.size && this.WasMatForActivatingDataLayersSet() && this.WasMatForDeactivatingDataLayersSet() && (this.State === 1 ? this.WasSeqForSourceInSet() : this.WasSeqForSourceOutSet()) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("TriggerVolume", 39, "[TsTransitionWorldPartitionTriggerVolume] 暂时不支持同时控制DataLayer显示的过渡和DataLayer隐藏的过渡, 可能存在表现问题, 请检查配置", ["Volume", UE.KismetSystemLibrary.GetPathName(this)], ["State", this.State]);
      }
      if ((i.size && this.WasMatForActivatingDataLayersSet() || r.size && this.WasMatForDeactivatingDataLayersSet()) && !(this.State === 1 ? this.WasSeqForSourceInSet() : this.WasSeqForSourceOutSet()) && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("TriggerVolume", 39, "[TsTransitionWorldPartitionTriggerVolume] 设置了过渡DA和DataLayer, 但是没有设置过渡Seq, 可能存在表现问题, 请检查配置", ["Volume", UE.KismetSystemLibrary.GetPathName(this)], ["State", this.State]);
      }
      let t = true;
      if (ModelManager_1.ModelManager.TeleportModel?.IsTeleport || ModelManager_1.ModelManager.GameModeModel?.Loading) {
        t = this.UseTransitionWhenTeleport ? (Log_1.Log.CheckWarn() && Log_1.Log.Warn("TriggerVolume", 39, "[TsTransitionWorldPartitionTriggerVolume] 正在进行传送或加载, 根据配置仍使用过渡效果, 可能存在表现问题, 请检查配置", ["Volume", UE.KismetSystemLibrary.GetPathName(this)], ["State", this.State]), true) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("TriggerVolume", 39, "[TsTransitionWorldPartitionTriggerVolume] 正在进行传送或加载, 根据配置忽略过渡效果", ["Volume", UE.KismetSystemLibrary.GetPathName(this)], ["State", this.State]), false);
      }
      var o = new DataLayerTransitionTask_1.DataLayersTransitionTask();
      o.ToActivateDataLayerLabels = i;
      o.ToDeactivateDataLayerLabels = r;
      if (t) {
        o.MatDataForActivating = this.MatForActivatingDataLayers;
        o.MatPathForActivating = this.MatPathForActivatingDataLayers;
        o.MatDataForActivatingLoaded = this.MatForActivatingDataLayersLoadingHandle === ResourceSystem_1.ResourceSystem.InvalidId;
        o.MatDataForDeactivating = this.MatForDeactivatingDataLayers;
        o.MatPathForDeactivating = this.MatPathForDeactivatingDataLayers;
        o.MatDataForDeactivatingLoaded = this.MatForDeactivatingDataLayersLoadingHandle === ResourceSystem_1.ResourceSystem.InvalidId;
        if (this.State === 1) {
          o.SeqData = this.SeqForSourceIn;
          o.SeqPath = this.SeqPathForSourceIn;
          o.SeqDataLoaded = this.SeqForSourceInLoadingHandle === ResourceSystem_1.ResourceSystem.InvalidId;
          o.SeqMarkBeforeModifyMat = this.SeqMarkBeforeModifyMatForSourceIn;
        } else {
          o.SeqData = this.SeqForSourceOut;
          o.SeqPath = this.SeqPathForSourceOut;
          o.SeqDataLoaded = this.SeqForSourceOutLoadingHandle === ResourceSystem_1.ResourceSystem.InvalidId;
          o.SeqMarkBeforeModifyMat = this.SeqMarkBeforeModifyMatForSourceOut;
        }
      }
      o.ShouldWaitDataLayersActivateFinish = this.WaitDataLayerStreamingRadius > 0;
      o.WaitDataLayerStreamingRadius = MathUtils_1.MathUtils.Clamp(this.WaitDataLayerStreamingRadius, 0, ResourceSystem_1.STREAMING_SOURCE_RADIUS);
      o.MaxTimeForWaitDataLayerActivateFinish = this.MaxTimeForWaitDataLayerActivateFinish;
      o.ShouldModifyBudgetDuringWaitDataLayerActivateFinish = true;
      o.TaskFinishCallback = this.OnTransitionTaskFinish;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TriggerVolume", 39, "[TsTransitionWorldPartitionTriggerVolume] 添加DataLayer过渡切换Task", ["Volume", UE.KismetSystemLibrary.GetPathName(this)], ["State", this.State], ["DataLayersToActivate", o.ToActivateDataLayerLabels], ["DataLayersToDeactivate", o.ToDeactivateDataLayerLabels]);
      }
      this.TransitionTaskQueue.Push(o);
      this.TryStartNextTask();
    }
  }
  TryStartNextTask() {
    if (!this.ExecutingTransitionTasks.size) {
      let t = undefined;
      while (!this.TransitionTaskQueue.Empty && !t) {
        t = this.TransitionTaskQueue.Pop();
      }
      if (t) {
        this.ExecutingTransitionTasks.add(t);
        t.StartTask();
      }
    }
  }
}
exports.default = TsTransitionWorldPartitionTriggerVolume;
//# sourceMappingURL=TsTransitionWorldPartitionTriggerVolume.js.map