"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionShowTalk = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const FormationDataController_1 = require("../../Abilities/FormationDataController");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionShowTalk extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    this.Context.CurShowTalk = this.ActionInfo.Params;
    this.Context.CurShowTalkActionId = this.ActionInfo.ActionId;
    this.Context.OptionsHistory.set(this.Context.CurShowTalkActionId, new Map());
    this.Context.OptionsCollection.push([this.Context.CurShowTalkActionId.toString(), []]);
    switch (ModelManager_1.ModelManager.PlotModel.PlotConfig.PlotLevel) {
      case "LevelA":
      case "LevelB":
        this.aYi();
        break;
      case "LevelC":
        this.hYi();
        break;
      case "LevelD":
      case "Prompt":
        if (FormationDataController_1.FormationDataController.GlobalIsInFight && ModelManager_1.ModelManager.PlotModel.PlotConfig.SkipTalkWhenFighting) {
          this.FinishExecute(true);
        } else {
          this.hYi();
        }
    }
  }
  hYi() {
    var e = this.ActionInfo.Params;
    var t = this.Context;
    var s = this.Runner;
    this.FinishExecute(true, false);
    s.FlowShowTalk.Start(e, t);
  }
  aYi() {
    var e;
    var t;
    var s;
    var i = this.ActionInfo.Params;
    if (i?.SequenceDataAsset) {
      e = this.Runner;
      t = this.Context;
      s = this.Context.SeamlessPlot && this.ActionInfo.ActionId !== this.Context.EndSeamlessShowTalkId;
      this.FinishExecute(true, false);
      e.FlowSequence.Init(i, t);
      e.FlowSequence.Start(s);
    } else {
      this.FinishExecute(true);
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionShowTalk = FlowActionShowTalk;
//# sourceMappingURL=FlowActionShowTalk.js.map