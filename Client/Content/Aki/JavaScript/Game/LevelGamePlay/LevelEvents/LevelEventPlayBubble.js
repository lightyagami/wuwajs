"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayBubble = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterFlowComponent_1 = require("../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent");
const DynamicFlowController_1 = require("../../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayBubble extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(o, t, e) {
    if (o) {
      let r = undefined;
      if (o.EntityId) {
        if (t?.Type === 6) {
          ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(t.TreeIncId)?.AddDynamicFlowNpc(o.EntityId);
        }
        r = this.ejf(o.EntityId, o.Flow);
      } else {
        let e = 0;
        if (t?.Type === 1) {
          e = t.EntityId ?? 0;
        } else if (t?.Type === 5) {
          e = t.TriggerEntityId ?? 0;
        }
        var l = EntitySystem_1.EntitySystem.Get(e ?? 0)?.GetComponent(1)?.CreatureData.GetCreatureDataId();
        if (l) {
          r = this.tjf(l, o.Flow);
        }
      }
      if (r) {
        ControllerHolder_1.ControllerHolder.DynamicFlowController.AddDynamicFlow(r);
        this.FinishExecute(true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 50, "添加动态冒泡失败,无法创建动态冒泡数据", ["EntityId", o.EntityId], ["FlowId", o.Flow.FlowId], ["FlowName", o.Flow.FlowListName], ["State", o.Flow.StateId], ["ContextType", t.Type]);
        }
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ejf(e, r) {
    var o = new DynamicFlowController_1.CharacterDynamicFlowData();
    var r = {
      EntityIds: [e],
      EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
      LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      Flow: r,
      WaitTime: 0
    };
    const t = new DynamicFlowController_1.DynamicFlowActorInfo();
    t.PbDataId = e;
    o.MasterInfo = t;
    o.BubbleData = r;
    o.Type = 2;
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
exports.LevelEventPlayBubble = LevelEventPlayBubble;
//# sourceMappingURL=LevelEventPlayBubble.js.map