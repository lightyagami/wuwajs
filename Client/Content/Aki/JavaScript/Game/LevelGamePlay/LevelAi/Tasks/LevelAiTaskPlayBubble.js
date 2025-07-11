"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskPlayBubble = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CharacterFlowComponent_1 = require("../../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent");
const DynamicFlowController_1 = require("../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskPlayBubble extends LevelAiTask_1.LevelAiTask {
  ExecuteTask() {
    var e;
    var r = this.Params;
    if (r) {
      e = r.EntityId;
      e = this.BTe(e, r.Flow);
      ControllerHolder_1.ControllerHolder.DynamicFlowController.AddDynamicFlow(e);
      return 0;
    } else {
      return 1;
    }
  }
  BTe(e, r) {
    var o = new DynamicFlowController_1.CharacterDynamicFlowData();
    var e = {
      EntityIds: [e],
      EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
      LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      Flow: r,
      WaitTime: 0,
      RedDot: false
    };
    o.BubbleData = e;
    o.Type = 1;
    return o;
  }
}
exports.LevelAiTaskPlayBubble = LevelAiTaskPlayBubble;
//# sourceMappingURL=LevelAiTaskPlayBubble.js.map