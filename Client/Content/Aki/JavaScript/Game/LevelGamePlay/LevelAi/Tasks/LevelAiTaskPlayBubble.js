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
    if (!r) {
      return 1;
    }
    let o = undefined;
    if (r.EntityId) {
      o = this.ejf(r.EntityId, r.Flow);
    } else if (e = this.CharacterPlanComponent.Entity.GetComponent(1)?.CreatureData.GetCreatureDataId()) {
      o = this.tjf(e, r.Flow);
    }
    if (o) {
      ControllerHolder_1.ControllerHolder.DynamicFlowController.AddDynamicFlow(o);
      return 0;
    } else {
      return 1;
    }
  }
  ejf(e, r) {
    var o = new DynamicFlowController_1.CharacterDynamicFlowData();
    var r = {
      EntityIds: [e],
      EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
      LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      Flow: r,
      WaitTime: 0,
      RedDot: false
    };
    const t = new DynamicFlowController_1.DynamicFlowActorInfo();
    t.PbDataId = e;
    o.MasterInfo = t;
    o.BubbleData = r;
    o.Type = 1;
    o.Callback = () => {
      ControllerHolder_1.ControllerHolder.DynamicFlowController.RemoveDynamicFlow(t);
    };
    return o;
  }
  tjf(e, r) {
    var o = new DynamicFlowController_1.CharacterDynamicFlowData();
    var r = {
      EntityIds: [],
      EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
      LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      Flow: r,
      WaitTime: 0
    };
    const t = new DynamicFlowController_1.DynamicFlowActorInfo();
    t.CreatureId = e;
    o.MasterInfo = t;
    o.BubbleData = r;
    o.Type = 2;
    o.Callback = () => {
      ControllerHolder_1.ControllerHolder.DynamicFlowController.RemoveDynamicFlow(t);
    };
    return o;
  }
}
exports.LevelAiTaskPlayBubble = LevelAiTaskPlayBubble;
//# sourceMappingURL=LevelAiTaskPlayBubble.js.map