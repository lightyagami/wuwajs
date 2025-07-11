"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionPlayMovie = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const VideoLauncher_1 = require("../../Video/VideoLauncher");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionPlayMovie extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    var o = ControllerHolder_1.ControllerHolder.FlowController.GetNextAction()?.Name === "PlayMovie";
    VideoLauncher_1.VideoLauncher.ShowVideoCg(e.VideoName, () => {
      ControllerHolder_1.ControllerHolder.FlowController.EnableSkip(false);
      this.FinishExecute(true);
    }, e.BackgroundFade, o, true);
  }
  OnInterruptExecute() {
    VideoLauncher_1.VideoLauncher.CloseVideoCg();
    this.FinishExecute(true);
  }
}
exports.FlowActionPlayMovie = FlowActionPlayMovie;
//# sourceMappingURL=FlowActionPlayMovie.js.map