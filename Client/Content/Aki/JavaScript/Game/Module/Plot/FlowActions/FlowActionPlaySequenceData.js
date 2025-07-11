"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionPlaySequenceData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TeleportController_1 = require("../../Teleport/TeleportController");
const FlowNetworks_1 = require("../Flow/FlowNetworks");
const PlotController_1 = require("../PlotController");
const SequenceController_1 = require("../Sequence/SequenceController");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionPlaySequenceData extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.owt = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "PlaySequenceData Seq开始播放允许跳过");
      }
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(true);
    };
    this.Mxe = () => {
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotSequencePlay, this.owt)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequencePlay, this.owt);
      }
      this.FinishExecute(true);
    };
  }
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (StringUtils_1.StringUtils.IsEmpty(e.Path)) {
      ControllerHolder_1.ControllerHolder.FlowController.LogError("SequenceData路径为空");
      this.FinishExecute(true);
    } else {
      if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelA") {
        ModelManager_1.ModelManager.SequenceModel.Type = 0;
      } else if (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel === "LevelB") {
        ModelManager_1.ModelManager.SequenceModel.Type = 1;
      }
      if (this.Context.IsBackground) {
        SequenceController_1.SequenceController.LoadData(e, () => {
          this.Q$i().finally(() => {
            this.FinishExecute(true);
          });
        });
      } else {
        EventSystem_1.EventSystem.Once(EventDefine_1.EEventName.PlotSequencePlay, this.owt);
        SequenceController_1.SequenceController.Play(e, [], this.Mxe, true, true, this.Context.IsWaitRenderData, 1);
      }
    }
  }
  OnInterruptExecute() {
    ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlotSequencePlay, this.owt)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotSequencePlay, this.owt);
    }
    this.Q$i().finally(() => {
      this.FinishExecute(true);
    });
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  async Q$i() {
    var e = ModelManager_1.ModelManager.SequenceModel.IsFadeEnd.length - 1;
    ModelManager_1.ModelManager.PlotModel.IsFadeIn = e >= 0 && ModelManager_1.ModelManager.SequenceModel.IsFadeEnd[e];
    var e = ModelManager_1.ModelManager.SequenceModel.CurFinalPos.length - 1;
    var t = e >= 0 ? ModelManager_1.ModelManager.SequenceModel.CurFinalPos[e] : undefined;
    if (e > 0 && !t && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Plot", 26, "SequenceData内缺失FinalPos");
    }
    SequenceController_1.SequenceController.ManualFinish();
    await PlotController_1.PlotController.CheckSwitchSubLevel();
    await PlotController_1.PlotController.CheckFormation();
    if (t && !ModelManager_1.ModelManager.AutoRunModel.IsInLogicTreeGmMode()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Plot", 26, "SaveFinalPos", ["transform", t]);
      }
      await TeleportController_1.TeleportController.TeleportToPositionNoLoading(t.GetLocation().ToUeVector(), t.GetRotation().Rotator().ToUeRotator(), "FlowActionPlaySequenceData.OnInterruptExecute");
      FlowNetworks_1.FlowNetworks.RequestSeqEndPosition(this.Context, t.GetLocation(), t.GetRotation().Rotator());
    }
  }
}
exports.FlowActionPlaySequenceData = FlowActionPlaySequenceData;
//# sourceMappingURL=FlowActionPlaySequenceData.js.map