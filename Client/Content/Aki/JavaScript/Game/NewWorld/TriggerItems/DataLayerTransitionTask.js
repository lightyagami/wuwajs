"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataLayersTransitionTask = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const LoadModeManager_1 = require("../../../Core/Performance/LoadMode/LoadModeManager");
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
    this.Tnf = undefined;
    this.n3f = undefined;
    this.s3f = undefined;
    this.a3f = undefined;
    this.h3f = undefined;
    this.k6f = false;
    this.vhf = undefined;
    this.eqf = 0;
    this.tqf = () => {
      this.eqf++;
      switch (this.eqf) {
        case 1:
          this.iqf(this.tqf);
          break;
        case 2:
          this.rqf(this.tqf);
          break;
        case 3:
          this.oqf(this.tqf);
          break;
        case 4:
          this.nqf(this.tqf);
          break;
        case 5:
          this.sqf(this.tqf);
          break;
        case 6:
          this.aqf(this.tqf);
          break;
        case 7:
          this.StopTask(true);
      }
    };
    this.vrl = undefined;
    this.ayg = undefined;
    this.BOe = ++DataLayersTransitionTask.q6f;
  }
  yhf() {
    if (!this.vhf?.IsValid() && !(this.vhf = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroSceneModifierSubsystem.StaticClass()), this.vhf?.IsValid())) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 39, "[DataLayersTransitionTask] 获取KuroSceneModifierSubsystem失败", ["TaskId", this.BOe]);
      }
      this.vhf = undefined;
    }
    return this.vhf;
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
            this.Shf();
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
            this.Shf();
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
            this.Shf();
          });
        } else {
          this.SeqDataLoaded = true;
        }
      }
      this.Shf();
    } else {
      this.StopTask(true);
    }
  }
  l3f(t, a) {
    for (const i of t) {
      var e = (0, puerts_1.$ref)(undefined);
      UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldPartitionDataLayerNameByLabel(GlobalData_1.GlobalData.World, i, e);
      var e = (0, puerts_1.$unref)(e);
      if (e) {
        a.add(e);
      }
    }
  }
  _3f(t, a) {
    a.Empty();
    for (const e of t) {
      a.Add(e);
    }
  }
  Ehf(t, a) {
    for (const i of t) {
      var e = i.toString();
      if (RenderModuleController_1.RenderModuleController.IsWorldPartitionDataLayerEnable(e) !== a) {
        RenderModuleController_1.RenderModuleController.SetWorldPartitionDataLayerState(e, a, false);
      }
    }
  }
  Shf() {
    if (this.MatDataForActivatingLoaded && this.MatDataForDeactivatingLoaded && this.SeqDataLoaded) {
      if (!this.k6f) {
        this.vKi();
      }
    }
  }
  vKi() {
    this.k6f = true;
    if (this.ToActivateDataLayerLabels) {
      this.n3f = new Set();
      this.l3f(this.ToActivateDataLayerLabels, this.n3f);
      this.a3f = UE.NewSet(UE.BuiltinName);
      this._3f(this.n3f, this.a3f);
    }
    if (this.ToDeactivateDataLayerLabels) {
      this.s3f = new Set();
      this.l3f(this.ToDeactivateDataLayerLabels, this.s3f);
      this.h3f = UE.NewSet(UE.BuiltinName);
      this._3f(this.s3f, this.h3f);
    }
    if (this.ToActivateDataLayerLabels?.size || this.ToDeactivateDataLayerLabels?.size) {
      this.Ihf();
      this.tqf();
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] 没有实际需要操作的DataLayer", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
      }
      this.StopTask(true);
    }
  }
  Ihf() {
    if (this.n3f?.size && this.s3f?.size && this.MatDataForActivating && this.MatDataForDeactivating && this.SeqData && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 39, "[DataLayersTransitionTask] 同时控制DataLayer显示的过渡和DataLayer隐藏的过渡，可能导致表现问题", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
    if ((this.n3f?.size && this.MatDataForActivating || this.s3f?.size && this.MatDataForDeactivating) && !this.SeqData && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Level", 39, "[DataLayersTransitionTask] 要处理的DataLayer和过渡材质DA, 但是没有过渡Seq, 可能导致表现问题", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
  }
  iqf(t) {
    if ((Log_1.Log.CheckDebug() && Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartPlaySeqToBeforeModifyMatMark", ["TaskId", this.BOe], ["SeqData", this.SeqData ? UE.KismetSystemLibrary.GetPathName(this.SeqData) : undefined], ["SeqMarkBeforeModifyMat", this.SeqMarkBeforeModifyMat]), this.SeqData?.IsValid() && ModelManager_1.ModelManager.GameModeModel && ModelManager_1.ModelManager.TeleportModel && !ModelManager_1.ModelManager.TeleportModel.IsTeleport && !ModelManager_1.ModelManager.GameModeModel.Loading) && (this.Tnf ||= new SimpleLevelSequenceActor_1.default(this.SeqData), this.SeqMarkBeforeModifyMat?.length)) {
      this.Tnf.AddOnPauseCallback(() => {
        this.Tnf?.ClearOnPausedCallback();
        TimerSystem_1.TimerSystem.Next(() => {
          t();
        });
      });
      this.Tnf.PlayToMark(this.SeqMarkBeforeModifyMat, undefined, undefined, new RefCompDefine_1.PlayRateStruct(), false);
      return;
    }
    t();
  }
  rqf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartModifyMat", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels], ["MatDataForActivating", UE.KismetSystemLibrary.GetPathName(this.MatDataForActivating)], ["MatDataForDeactivating", UE.KismetSystemLibrary.GetPathName(this.MatDataForDeactivating)]);
    }
    if (this.MatDataForActivating?.IsValid()) {
      this.yhf()?.ModifyMaterialsByDataLayer(this.a3f, this.MatDataForActivating, false);
    }
    if (this.MatDataForDeactivating?.IsValid()) {
      this.yhf()?.ModifyMaterialsByDataLayer(this.h3f, this.MatDataForDeactivating, true);
    }
    t();
  }
  oqf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartLoadDataLayer", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToActivateDataLayerNames", this.n3f]);
    }
    if (this.ToActivateDataLayerLabels?.size && this.n3f?.size) {
      this.Ehf(this.ToActivateDataLayerLabels, true);
      this.hyg(t);
    } else {
      t();
    }
  }
  hyg(t) {
    this.lyg();
    if (this.ShouldWaitDataLayersActivateFinish && ModelManager_1.ModelManager.GameModeModel?.UseWorldPartition && this.n3f?.size) {
      const e = ModelManager_1.ModelManager.GameModeModel?.StreamingSource?.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass());
      if (e) {
        const i = UE.NewArray(UE.BuiltinName);
        this._3f(this.n3f, i);
        if (this.ShouldModifyBudgetDuringWaitDataLayerActivateFinish) {
          LoadModeManager_1.LoadModeManager.SetLoadModeByReason("InGameLoading", "DataLayerTransition");
        }
        const s = () => {
          if (this.ShouldModifyBudgetDuringWaitDataLayerActivateFinish) {
            LoadModeManager_1.LoadModeManager.ResetLoadModeByReason("DataLayerTransition");
          }
          this.lyg();
          t();
        };
        var a;
        this.vrl = TimerSystem_1.TimerSystem.Forever(() => {
          if (e.IsStreamingCompletedForLayers(i, false, this.WaitDataLayerStreamingRadius, false, undefined, false)) {
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
            this.ayg = TimerSystem_1.TimerSystem.Delay(() => {
              if (Log_1.Log.CheckWarn()) {
                Log_1.Log.Warn("Level", 39, "[DataLayersTransitionTask] 等待DataLayer加载超时，强行结束", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["WaitDataLayerStreamingMaxTime", this.MaxTimeForWaitDataLayerActivateFinish]);
              }
              s();
            }, a);
            if (!this.ayg) {
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
  lyg() {
    if (this.vrl && TimerSystem_1.TimerSystem.Has(this.vrl)) {
      TimerSystem_1.TimerSystem.Remove(this.vrl);
    }
    this.vrl = undefined;
    if (this.ayg && TimerSystem_1.TimerSystem.Has(this.ayg)) {
      TimerSystem_1.TimerSystem.Remove(this.ayg);
    }
    this.ayg = undefined;
  }
  sqf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartUnloadDataLayer", ["TaskId", this.BOe], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
    if (this.ToDeactivateDataLayerLabels?.size) {
      this.Ehf(this.ToDeactivateDataLayerLabels, false);
    }
    t();
  }
  aqf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartResetMat", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToActivateDataLayerNames", this.n3f]);
    }
    this.yhf()?.ResetMaterialsByDataLayer(this.a3f);
    this.yhf()?.ResetMaterialsByDataLayer(this.h3f);
    t();
  }
  nqf(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Level", 39, "[DataLayersTransitionTask] TransitionPartPlaySeqToEnd", ["TaskId", this.BOe], ["SeqData", this.SeqData]);
    }
    if (this.SeqData?.IsValid() && ModelManager_1.ModelManager.GameModeModel && ModelManager_1.ModelManager.TeleportModel && !ModelManager_1.ModelManager.TeleportModel.IsTeleport && !ModelManager_1.ModelManager.GameModeModel.Loading) {
      this.Tnf ||= new SimpleLevelSequenceActor_1.default(this.SeqData);
      this.Tnf.AddOnStopCallback(() => {
        this.Tnf?.ClearOnStopCallback();
        TimerSystem_1.TimerSystem.Next(() => {
          t();
        });
      });
      this.Tnf.PlayLoop(false, 0, undefined, undefined, new RefCompDefine_1.PlayRateStruct());
    } else {
      t();
    }
  }
  StopTask(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Level", 39, "[DataLayersTransitionTask] DataLayer过渡结束", ["TaskId", this.BOe], ["ToActivateDataLayerLabels", this.ToActivateDataLayerLabels], ["ToDeactivateDataLayerLabels", this.ToDeactivateDataLayerLabels]);
    }
    this.Tnf?.Clear();
    this.Tnf = undefined;
    this.TaskFinishCallback?.(this, t);
  }
}
(exports.DataLayersTransitionTask = DataLayersTransitionTask).q6f = 0;
//# sourceMappingURL=DataLayerTransitionTask.js.map