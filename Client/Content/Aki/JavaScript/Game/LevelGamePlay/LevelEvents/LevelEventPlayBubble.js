"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayBubble = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterFlowComponent_1 = require("../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent");
const DynamicFlowController_1 = require("../../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayBubble extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, o) {
    var a;
    if (e) {
      a = e.EntityId;
      e = this.BTe(a, e.Flow);
      ControllerHolder_1.ControllerHolder.DynamicFlowController.AddDynamicFlow(e);
      if (r?.Type === 6) {
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(r.TreeIncId)?.AddDynamicFlowNpc(a);
      }
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
  BTe(e, r) {
    var o = new DynamicFlowController_1.CharacterDynamicFlowData();
    var e = {
      EntityIds: [e],
      EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
      LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      Flow: r,
      WaitTime: 0
    };
    o.BubbleData = e;
    o.Type = 2;
    return o;
  }
}
exports.LevelEventPlayBubble = LevelEventPlayBubble;
//# sourceMappingURL=LevelEventPlayBubble.js.map