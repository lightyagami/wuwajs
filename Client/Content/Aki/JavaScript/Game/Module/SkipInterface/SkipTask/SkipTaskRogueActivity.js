"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskRogueActivity = undefined;
const RoguelikeController_1 = require("../../Roguelike/RoguelikeController");
const SkipTask_1 = require("./SkipTask");
class SkipTaskRogueActivity extends SkipTask_1.SkipTask {
  OnRun() {
    RoguelikeController_1.RoguelikeController.OpenRoguelikeActivityView();
    this.Finish();
  }
}
exports.SkipTaskRogueActivity = SkipTaskRogueActivity;
//# sourceMappingURL=SkipTaskRogueActivity.js.map