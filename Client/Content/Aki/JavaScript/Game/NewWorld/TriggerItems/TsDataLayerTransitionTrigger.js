"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const DataLayerTransitionTask_1 = require("./DataLayerTransitionTask");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class TsDataLayerTransitionTrigger extends UE.Actor {
  constructor() {
    super(...arguments);
    this.FunctionEnable = true;
    this.TriggerState = false;
    this.UseTransitionWhenTeleport = false;
    this.Volume = undefined;
    this.DatalayerStateMap = UE.NewMap(UE.BuiltinName, UE.BuiltinBool);
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
    this.TransitionTaskQueue = new Queue_1.Queue();
    this.ExecutingTransitionTasks = new Set();
    this.OnVolumeEndPlayHandle = (t, s) => {
      this.Volume?.OnActorBeginOverlap.Remove(this.OnVolumeActorBeginOverlapHandle);
      this.Volume?.OnActorEndOverlap.Remove(this.OnVolumeActorEndOverlapHandle);
    };
    this.OnVolumeActorBeginOverlapHandle = (t, s) => {
      if (s === ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined()) {
        this.TriggerState = true;
        this.OnTriggerStateChanged();
      }
    };
    this.OnVolumeActorEndOverlapHandle = (t, s) => {
      if (s === ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined()) {
        this.TriggerState = false;
        this.OnTriggerStateChanged();
      }
    };
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
    this.OnVolumeEndPlayHandle = (t, s) => {
      this.Volume?.OnActorBeginOverlap.Remove(this.OnVolumeActorBeginOverlapHandle);
      this.Volume?.OnActorEndOverlap.Remove(this.OnVolumeActorEndOverlapHandle);
    };
    this.OnVolumeActorBeginOverlapHandle = (t, s) => {
      if (s === ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined()) {
        this.TriggerState = true;
        this.OnTriggerStateChanged();
      }
    };
    this.OnVolumeActorEndOverlapHandle = (t, s) => {
      if (s === ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined()) {
        this.TriggerState = false;
        this.OnTriggerStateChanged();
      }
    };
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
      let s = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.KuroSceneMatModifyDataAsset, t => {
        s = true;
        this.MatForActivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
        this.SetMatForActivatingDataLayers(t);
      });
      if (!s) {
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
      let s = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.KuroSceneMatModifyDataAsset, t => {
        s = true;
        this.MatForDeactivatingDataLayersLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
        this.SetMatForDeactivatingDataLayers(t);
      });
      if (!s) {
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
  SetSeqForSourceIn(t, s) {
    this.SeqForSourceIn = t;
    this.SeqPathForSourceIn = undefined;
    this.SeqMarkBeforeModifyMatForSourceIn = s;
    if (this.SeqForSourceInLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SeqForSourceInLoadingHandle);
      this.SeqForSourceInLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  SetSeqForSourceInByPath(t, e = "") {
    this.SeqForSourceIn = undefined;
    this.SeqPathForSourceIn = t;
    this.SeqMarkBeforeModifyMatForSourceIn = e;
    if (this.SeqForSourceInLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SeqForSourceInLoadingHandle);
      this.SeqForSourceInLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (t) {
      let s = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LevelSequence, t => {
        s = true;
        this.SeqForSourceInLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
        this.SetSeqForSourceIn(t, e);
      });
      if (!s) {
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
  SetSeqForSourceOut(t, s) {
    this.SeqForSourceOut = t;
    this.SeqPathForSourceOut = undefined;
    this.SeqMarkBeforeModifyMatForSourceOut = s;
    if (this.SeqForSourceOutLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SeqForSourceOutLoadingHandle);
      this.SeqForSourceOutLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
  }
  SetSeqForSourceOutByPath(t, e = "") {
    this.SeqForSourceOut = undefined;
    this.SeqPathForSourceOut = t;
    this.SeqMarkBeforeModifyMatForSourceOut = e;
    if (this.SeqForSourceOutLoadingHandle !== ResourceSystem_1.ResourceSystem.InvalidId) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.SeqForSourceOutLoadingHandle);
      this.SeqForSourceOutLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
    }
    if (t) {
      let s = false;
      t = ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LevelSequence, t => {
        s = true;
        this.SeqForSourceOutLoadingHandle = ResourceSystem_1.ResourceSystem.InvalidId;
        this.SetSeqForSourceOut(t, e);
      });
      if (!s) {
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
  ReceiveBeginPlay() {
    var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(this);
    if (t === 1 || t === 3) {
      this.InitVolume();
    }
  }
  InitVolume() {
    if (this.Volume && (this.Volume?.OnActorBeginOverlap.Add(this.OnVolumeActorBeginOverlapHandle), this.Volume?.OnActorEndOverlap.Add(this.OnVolumeActorEndOverlapHandle), this.Volume.OnEndPlay.Add(this.OnVolumeEndPlayHandle), this.Volume.IsOverlappingActor(ControllerHolder_1.ControllerHolder.RoleTriggerController.GetMyRoleTriggerOrUndefined()))) {
      this.TriggerState = true;
      this.OnTriggerStateChanged();
    }
  }
  OnTriggerStateChanged() {
    if (this.FunctionEnable) {
      var s;
      var e;
      var i = new Set();
      var h = new Set();
      for (let t = 0; t <= this.DatalayerStateMap.GetMaxIndex(); t++) {
        if (this.DatalayerStateMap.IsValidIndex(t)) {
          s = this.DatalayerStateMap.GetKey(t);
          e = this.DatalayerStateMap.Get(s);
          ((this.TriggerState ? e : !e) ? i : h).add(s);
        }
      }
      if (i.size && h.size && this.WasMatForActivatingDataLayersSet() && this.WasMatForDeactivatingDataLayersSet() && (this.TriggerState ? this.WasSeqForSourceInSet() : this.WasSeqForSourceOutSet()) && Log_1.Log.CheckError()) {
        Log_1.Log.Error("TriggerVolume", 39, "[TsDataLayerTransitionTrigger] 暂时不支持同时控制DataLayer显示的过渡和DataLayer隐藏的过渡, 可能存在表现问题, 请检查配置", ["Volume", UE.KismetSystemLibrary.GetPathName(this.Volume)], ["TriggerState", this.TriggerState]);
      }
      if ((i.size && this.WasMatForActivatingDataLayersSet() || h.size && this.WasMatForDeactivatingDataLayersSet()) && !(this.TriggerState ? this.WasSeqForSourceInSet() : this.WasSeqForSourceOutSet()) && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("TriggerVolume", 39, "[TsDataLayerTransitionTrigger] 设置了过渡DA和DataLayer, 但是没有设置过渡Seq, 可能存在表现问题, 请检查配置", ["Volume", UE.KismetSystemLibrary.GetPathName(this.Volume)], ["TriggerState", this.TriggerState]);
      }
      var t = new DataLayerTransitionTask_1.DataLayersTransitionTask();
      t.ToActivateDataLayerLabels = i;
      t.ToDeactivateDataLayerLabels = h;
      if (!!this.UseTransitionWhenTeleport || !ModelManager_1.ModelManager.TeleportModel?.IsTeleport && !ModelManager_1.ModelManager.GameModeModel?.Loading) {
        t.MatDataForActivating = this.MatForActivatingDataLayers;
        t.MatPathForActivating = this.MatPathForActivatingDataLayers;
        t.MatDataForActivatingLoaded = this.MatForActivatingDataLayersLoadingHandle === ResourceSystem_1.ResourceSystem.InvalidId;
        t.MatDataForDeactivating = this.MatForDeactivatingDataLayers;
        t.MatPathForDeactivating = this.MatPathForDeactivatingDataLayers;
        t.MatDataForDeactivatingLoaded = this.MatForDeactivatingDataLayersLoadingHandle === ResourceSystem_1.ResourceSystem.InvalidId;
        if (this.TriggerState) {
          t.SeqData = this.SeqForSourceIn;
          t.SeqPath = this.SeqPathForSourceIn;
          t.SeqDataLoaded = this.SeqForSourceInLoadingHandle === ResourceSystem_1.ResourceSystem.InvalidId;
          t.SeqMarkBeforeModifyMat = this.SeqMarkBeforeModifyMatForSourceIn;
        } else {
          t.SeqData = this.SeqForSourceOut;
          t.SeqPath = this.SeqPathForSourceOut;
          t.SeqDataLoaded = this.SeqForSourceOutLoadingHandle === ResourceSystem_1.ResourceSystem.InvalidId;
          t.SeqMarkBeforeModifyMat = this.SeqMarkBeforeModifyMatForSourceOut;
        }
      }
      t.ShouldWaitDataLayersActivateFinish = true;
      t.TaskFinishCallback = this.OnTransitionTaskFinish;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TriggerVolume", 39, "[TsDataLayerTransitionTrigger] 添加DataLayer过渡切换Task", ["Volume", UE.KismetSystemLibrary.GetPathName(this.Volume)], ["TriggerState", this.TriggerState], ["DataLayersToActivate", t.ToActivateDataLayerLabels], ["DataLayersToDeactivate", t.ToDeactivateDataLayerLabels]);
      }
      this.TransitionTaskQueue.Push(t);
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
exports.default = TsDataLayerTransitionTrigger;
//# sourceMappingURL=TsDataLayerTransitionTrigger.js.map