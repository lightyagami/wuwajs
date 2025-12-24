"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataLayersTransitionTask = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GlobalData_1 = require("../../GlobalData");
const SimpleLevelSequenceActor_1 = require("../../LevelGamePlay/StaticScene/SimpleLevelSequenceActor");
const ModelManager_1 = require("../../Manager/ModelManager");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const RefCompDefine_1 = require("../SceneItem/RefCompController/RefCompDefine");
const DEFAULT_WAIT_DATALAYER_STREAMING_RADIUS = ResourceSystem_1.STREAMING_SOURCE_RADIUS / 2;
class DataLayersTransitionTask {
  constructor() {
    this.BOe = 0;
    this.MatDataForActivating = undefined;
    this.MatPathForActivating = undefined;
    this.MatDataForActivatingLoaded = false;
    this.MatDataForDeactivating = undefined;
    this.MatPathForDeactivating = undefined;
    this.MatDataForDeactivatingLoaded = false;
    this.SeqData = undefined;
    this.SeqPath = undefined;
    this.SeqDataLoaded = false;
    this.SeqMarkBeforeModifyMat = undefined;
    this.ToActivateDataLayerLabels = undefined;
    this.ToDeactivateDataLayerLabels = undefined;
    this.ShouldWaitDataLayersActivateFinish = false;
    this.WaitDataLayerStreamingRadius = DEFAULT_WAIT_DATALAYER_STREAMING_RADIUS;
    this.MaxTimeForWaitDataLayerActivateFinish = 0;
    this.ShouldModifyBudgetDuringWaitDataLayerActivateFinish = true;
    this.TaskFinishCallback = undefined;
    this.srf = undefined;
    this.mkf = undefined;
    this.fkf = undefined;
    this.gkf = undefined;
    this.Ckf = undefined;
    this.MGf = false;
    this.esf = undefined;
    this.MAf = 0;
    this.EAf = () => {
      this.MAf++;
      switch (this.MAf) {
        case 1:
          this.IAf(this.EAf);
          break;
        case 2:
          this.TAf(this.EAf);
          break;
        case 3:
          this.bAf(this.EAf);
          break;
        case 4:
          this.RAf(this.EAf);
          break;
        case 5:
          this.LAf(this.EAf);
          break;
        case 6:
          this.wAf(this.EAf);
          break;
        case 7:
          this.StopTask(true);
      }
    };
    this.vrl = undefined;
    this.gZf = undefined;
    this.BOe = ++DataLayersTransitionTask.EGf;
  }
  tsf() {
    if (!this.esf?.IsValid() && !(this.esf = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroSceneModifierSubsystem.StaticClass()), this.esf?.IsValid())) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 39, "[DataLayersTransitionTask] 获取KuroSceneModifierSubsystem失败", ["TaskId", this.BOe]);
      }
      this.esf = undefined;
    }
    return this.esf;
  }
  StartTask() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 39, "[DataLayersTransitionTask] DataLayer过渡开始", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
    if (this.ToActivateDataLayerLabels || this.ToDeactivateDataLayerLabels) {
      if (!this.MatDataForActivatingLoaded) {
        if (this.MatPathForActivating?.length) {
          ResourceSystem_1.ResourceSystem.LoadAsync(this.MatPathForActivating, UE.KuroSceneMatModifyDataAsset, t => {
            this.MatDataForActivatingLoaded = true;
            this.MatDataForActivating = t;
            this.isf();
          });
        } else {
          this.MatDataForActivatingLoaded = true;
        }
      }
      if (!this.MatDataForDeactivatingLoaded) {
        if (this.MatPathForDeactivating?.length) {
          ResourceSystem_1.ResourceSystem.LoadAsync(this.MatPathForDeactivating, UE.KuroSceneMatModifyDataAsset, t => {
            this.MatDataForDeactivatingLoaded = true;
            this.MatDataForDeactivating = t;
            this.isf();
          });
        } else {
          this.MatDataForDeactivatingLoaded = true;
        }
      }
      if (!this.SeqDataLoaded) {
        if (this.SeqPath?.length) {
          ResourceSystem_1.ResourceSystem.LoadAsync(this.SeqPath, UE.LevelSequence, t => {
            this.SeqDataLoaded = true;
            this.SeqData = t;
            this.isf();
          });
        } else {
          this.SeqDataLoaded = true;
        }
      }
      this.isf();
    } else {
      this.StopTask(true);
    }
  }
  pkf(t, a) {
    for (const e of t) {
      var i = (0, puerts_1.$ref)(undefined);
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, e, i);
      var i = (0, puerts_1.$unref)(i);
      if (i) {
        a.add(i);
      }
    }
  }
  vkf(t, a) {
    a.Empty();
    for (const i of t) {
      a.Add(i);
    }
  }
  osf(t, a) {
    for (const e of t) {
      var i = e.toString();
      if (RenderModuleController_1.RenderModuleController.IsWorldPartitionDataLayerEnable(i) !== a) {
        RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(i, a, true);
      }
    }
  }
  isf() {
    if (this.MatDataForActivatingLoaded && this.MatDataForDeactivatingLoaded && this.SeqDataLoaded) {
      if (!this.MGf) {
        this.vKi();
      }
    }
  }
  vKi() {
    this.MGf = true;
    if (this.ToActivateDataLayerLabels) {
      this.mkf = new Set();
      this.pkf(this.ToActivateDataLayerLabels, this.mkf);
      this.gkf = UE.NewSet(UE.BuiltinName);
      this.vkf(this.mkf, this.gkf);
    }
    if (this.ToDeactivateDataLayerLabels) {
      this.fkf = new Set();
      this.pkf(this.ToDeactivateDataLayerLabels, this.fkf);
      this.Ckf = UE.NewSet(UE.BuiltinName);
      this.vkf(this.fkf, this.Ckf);
    }
    if (this.ToActivateDataLayerLabels?.size || this.ToDeactivateDataLayerLabels?.size) {
      this.nsf();
      this.EAf();
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] 没有实际需要操作的DataLayer", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
      }
      this.StopTask(true);
    }
  }
  nsf() {
    if (this.mkf?.size && this.fkf?.size && this.MatDataForActivating && this.MatDataForDeactivating && this.SeqData && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 39, "[DataLayersTransitionTask] 同时控制DataLayer显示的过渡和DataLayer隐藏的过渡，可能导致表现问题", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
    if ((this.mkf?.size && this.MatDataForActivating || this.fkf?.size && this.MatDataForDeactivating) && !this.SeqData && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 39, "[DataLayersTransitionTask] 要处理的DataLayer和过渡材质DA, 但是没有过渡Seq, 可能导致表现问题", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
  }
  IAf(t) {
    if ((Log_1.Log.CheckDebug() && Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartPlaySeqToBeforeModifyMatMark", ["TaskId", this.BOe], ["SeqData", this.SeqData ? UE.KismetSystemLibrary.GetPathName(this.SeqData) : undefined], ["SeqMarkBeforeModifyMat", this.SeqMarkBeforeModifyMat]), this.SeqData?.IsValid() && ModelManager_1.ModelManager.GameModeModel && ModelManager_1.ModelManager.TeleportModel && !ModelManager_1.ModelManager.TeleportModel.IsTeleport && !ModelManager_1.ModelManager.GameModeModel.Loading) && (this.srf ||= new SimpleLevelSequenceActor_1.default(this.SeqData), this.SeqMarkBeforeModifyMat?.length)) {
      this.srf.AddOnPauseCallback(() => {
        this.srf?.ClearOnPausedCallback();
        TimerSystem_1.TimerSystem.Next(() => {
          t();
        });
      });
      this.srf.PlayToMark(this.SeqMarkBeforeModifyMat, undefined, undefined, new RefCompDefine_1.PlayRateStruct(), false);
      return;
    }
    t();
  }
  TAf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartModifyMat", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels], ["MatDataForActivating", UE.KismetSystemLibrary.GetPathName(this.MatDataForActivating)], ["MatDataForDeactivating", UE.KismetSystemLibrary.GetPathName(this.MatDataForDeactivating)]);
    }
    if (this.MatDataForActivating?.IsValid()) {
      this.tsf()?.ModifyMaterialsByDataLayer(this.gkf, this.MatDataForActivating, false);
    }
    if (this.MatDataForDeactivating?.IsValid()) {
      this.tsf()?.ModifyMaterialsByDataLayer(this.Ckf, this.MatDataForDeactivating, true);
    }
    t();
  }
  bAf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartLoadDataLayer", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToActivateDataLayerNames", this.mkf]);
    }
    if (this.ToActivateDataLayerLabels?.size && this.mkf?.size) {
      this.osf(this.ToActivateDataLayerLabels, true);
      this.CZf(t);
    } else {
      t();
    }
  }
  CZf(t) {
    this.pZf();
    if (this.ShouldWaitDataLayersActivateFinish && ModelManager_1.ModelManager.GameModeModel?.UseWorldPartition && this.mkf?.size) {
      const i = ModelManager_1.ModelManager.GameModeModel?.StreamingSource?.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      if (i) {
        const e = UE.NewArray(UE.BuiltinName);
        this.vkf(this.mkf, e);
        if (this.ShouldModifyBudgetDuringWaitDataLayerActivateFinish) {
          ResourceSystem_1.ResourceSystem.SetLoadModeInDataLayerTransition(GlobalData_1.GlobalData.World, true);
        }
        const s = () => {
          if (this.ShouldModifyBudgetDuringWaitDataLayerActivateFinish) {
            ResourceSystem_1.ResourceSystem.SetLoadModeInDataLayerTransition(GlobalData_1.GlobalData.World, false);
          }
          this.pZf();
          t();
        };
        var a;
        this.vrl = TimerSystem_1.TimerSystem.Forever(() => {
          if (i.IsStreamingCompletedForLayers(e, false, this.WaitDataLayerStreamingRadius, false, undefined, false)) {
            s();
          }
        }, 100);
        if (this.vrl) {
          if ((a = this.MaxTimeForWaitDataLayerActivateFinish * CommonDefine_1.MILLIONSECOND_PER_SECOND) <= 0) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Level", 39, "[DataLayersTransitionTask] 等待DataLayer加载的超时时间≤0，视作永不超时", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["WaitDataLayerStreamingMaxTime", this.MaxTimeForWaitDataLayerActivateFinish]);
            }
          } else if (a < TimerSystem_1.MIN_TIME) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Level", 39, "[DataLayersTransitionTask] 等待DataLayer加载的超时时间不≤0但又过短，强行结束", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["WaitDataLayerStreamingMaxTime", this.MaxTimeForWaitDataLayerActivateFinish]);
            }
            s();
          } else {
            this.gZf = TimerSystem_1.TimerSystem.Delay(() => {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Level", 39, "[DataLayersTransitionTask] 等待DataLayer加载超时，强行结束", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["WaitDataLayerStreamingMaxTime", this.MaxTimeForWaitDataLayerActivateFinish]);
              }
              s();
            }, a);
            if (!this.gZf) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Level", 39, "[DataLayersTransitionTask] 设置等待DataLayer加载超时的延迟计时器时出错，强行结束", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels]);
              }
              s();
            }
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Level", 39, "[DataLayersTransitionTask] 设置等待DataLayer加载的轮询计时器时出错", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels]);
          }
          s();
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 39, "[DataLayersTransitionTask] 未找到StreamingSourceComponent", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels]);
        }
        t();
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Level", 39, "[DataLayersTransitionTask] 无需等待DataLayer加载", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels]);
      }
      t();
    }
  }
  pZf() {
    if (this.vrl && TimerSystem_1.TimerSystem.Has(this.vrl)) {
      TimerSystem_1.TimerSystem.Remove(this.vrl);
    }
    this.vrl = undefined;
    if (this.gZf && TimerSystem_1.TimerSystem.Has(this.gZf)) {
      TimerSystem_1.TimerSystem.Remove(this.gZf);
    }
    this.gZf = undefined;
  }
  LAf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartUnloadDataLayer", ["TaskId", this.BOe], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
    if (this.ToDeactivateDataLayerLabels?.size) {
      this.osf(this.ToDeactivateDataLayerLabels, false);
    }
    t();
  }
  wAf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartResetMat", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToActivateDataLayerNames", this.mkf]);
    }
    this.tsf()?.ResetMaterialsByDataLayer(this.gkf);
    this.tsf()?.ResetMaterialsByDataLayer(this.Ckf);
    t();
  }
  RAf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartPlaySeqToEnd", ["TaskId", this.BOe], ["SeqData", this.SeqData]);
    }
    if (this.SeqData?.IsValid() && ModelManager_1.ModelManager.GameModeModel && ModelManager_1.ModelManager.TeleportModel && !ModelManager_1.ModelManager.TeleportModel.IsTeleport && !ModelManager_1.ModelManager.GameModeModel.Loading) {
      this.srf ||= new SimpleLevelSequenceActor_1.default(this.SeqData);
      this.srf.AddOnStopCallback(() => {
        this.srf?.ClearOnStopCallback();
        TimerSystem_1.TimerSystem.Next(() => {
          t();
        });
      });
      this.srf.PlayLoop(false, 0, undefined, undefined, new RefCompDefine_1.PlayRateStruct());
    } else {
      t();
    }
  }
  StopTask(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 39, "[DataLayersTransitionTask] DataLayer过渡结束", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
    this.srf?.Clear();
    this.srf = undefined;
    this.TaskFinishCallback?.(this, t);
  }
}
(exports.DataLayersTransitionTask = DataLayersTransitionTask).EGf = 0;
//# sourceMappingURL=DataLayerTransitionTask.js.map