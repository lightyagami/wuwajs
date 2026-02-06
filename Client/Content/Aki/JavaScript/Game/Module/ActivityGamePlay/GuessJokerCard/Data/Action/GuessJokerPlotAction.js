"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerPlotAction = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GuessJokerUtils_1 = require("../../GuessJokerUtils");
const GuessJokerActionBase_1 = require("./GuessJokerActionBase");
class GuessJokerPlotAction extends GuessJokerActionBase_1.GuessJokerActionBase {
  constructor(e, t, i) {
    super();
    this.vZ1 = undefined;
    this.gDg = undefined;
    this.vMg = undefined;
    this.sZh = undefined;
    this.H2f = undefined;
    this.yMg = false;
    this.SMg = 0;
    this.sZh = t;
    this.H2f = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GuessJokerCard", 78, "GuessJokerPlotAction constructor", ["timing", t], ["playerType", e]);
    }
    var s = GuessJokerUtils_1.GuessJokerUtils.GetPlotConfig(e, t, i);
    if (s) {
      var o = ConfigManager_1.ConfigManager.GuessJokerConfig.GetJokerAiPlotConfig(e, t, i);
      if (o) {
        let e = undefined;
        var r = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(s.FlowListName, s.FlowId, s.StateId);
        if (e = (r &&= r.find(e => e.Name === "ShowTalk")) && (r = r.Params.TalkItems[0]).Type === "Talk" ? r : e) {
          this.vZ1 = e;
          this.gDg = s;
          this.vMg = o;
        } else {
          this.Done = true;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerPlotAction Fail：AiPlotConfig is undefined", ["playerType", e], ["timing", t]);
        }
        this.Done = true;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerPlotAction Fail：PlotConfig is undefined", ["playerType", e], ["timing", t], ["extraParam", i]);
      }
      this.Done = true;
    }
  }
  OnStart() {
    if (this.vZ1) {
      if (this.DelayTime > 0) {
        this.yMg = true;
        this.SMg = 0;
      } else {
        ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetLastUsedPlotId(this.AiPlotId, this.PlotId);
        this.MMg();
      }
    } else {
      this.Done = true;
    }
  }
  OnTick(e) {
    if (this.yMg && (this.SMg += e, this.SMg >= this.DelayTime)) {
      this.yMg = false;
      this.SMg = 0;
      ModelManager_1.ModelManager.GuessJokerGamePlayModel.SetLastUsedPlotId(this.AiPlotId, this.PlotId);
      this.MMg();
    }
  }
  MMg() {
    var e;
    if (this.vZ1) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GuessJokerCard", 78, "猜鬼牌剧情 - GuessJokerPlotAction：开始播放对话", ["AiPlotConfig.Id", this.AiPlotId], ["PlotConfig.Id", this.PlotId]);
      }
      if (e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetActiveDialogLogic()) {
        e.PlayDialog(this.vZ1, () => {
          this.Done = true;
        });
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("GuessJokerCard", 78, "GuessJokerPlotAction：未找到活跃的对话逻辑");
        }
        this.Done = true;
      }
    } else {
      this.Done = true;
    }
  }
  get Timing() {
    return this.sZh;
  }
  get PlayerType() {
    return this.H2f;
  }
  get AiPlotId() {
    return this.vMg?.Id ?? 0;
  }
  get PlotId() {
    return this.gDg?.Id ?? 0;
  }
  get DelayTime() {
    return this.vMg?.DelayTime ?? 0;
  }
  get CanHardCut() {
    return this.vMg?.CanHardCut ?? false;
  }
  get WaitDeleteTime() {
    return this.vMg?.WaitDeleteTime ?? 0;
  }
  get Cd() {
    return this.vMg?.Cd ?? 0;
  }
  get IsInDelay() {
    return this.yMg;
  }
  OnFinish() {
    var e = ModelManager_1.ModelManager.GuessJokerGamePlayModel.GetActiveDialogLogic();
    if (e) {
      e.Clear();
    }
    this.yMg = false;
    this.SMg = 0;
    this.gDg = undefined;
    this.vZ1 = undefined;
    this.vMg = undefined;
  }
}
exports.GuessJokerPlotAction = GuessJokerPlotAction;
//# sourceMappingURL=GuessJokerPlotAction.js.map