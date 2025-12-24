"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const GlobalData_1 = require("../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const CharacterFlowComponent_1 = require("../../../../../NewWorld/Character/Common/Component/Flow/CharacterFlowComponent");
const DynamicFlowController_1 = require("../../../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const TsAiController_1 = require("../../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskPlayBubble extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.FlowListName = "";
    this.FlowId = 0;
    this.StateId = 0;
    this.IsInitTsVariables = false;
    this.TsFlowListName = "";
    this.TsFlowId = 0;
    this.TsStateId = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsFlowListName = "";
    this.TsFlowId = 0;
    this.TsStateId = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsFlowListName = this.FlowListName;
      this.TsFlowId = this.FlowId;
      this.TsStateId = this.StateId;
    }
  }
  ReceiveExecuteAI(e, o) {
    var t;
    var r;
    this.InitTsVariables();
    if (e instanceof TsAiController_1.default) {
      if (this.TsFlowListName) {
        if (r = e.AiController.CharActorComp) {
          t = {
            FlowListName: this.TsFlowListName,
            FlowId: this.TsFlowId,
            StateId: this.TsStateId
          };
          r = r.CreatureData.GetCreatureDataId();
          r = this.CreateCharacterFlowData(r, t);
          ControllerHolder_1.ControllerHolder.DynamicFlowController.AddDynamicFlow(r);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 50, "[TsTaskPlayBubble]无效的ActorComp", ["Type", e.GetClass().GetName()]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 50, "[TsTaskPlayBubble]无效的FlowListName", ["Type", e.GetClass().GetName()]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
    }
    this.FinishExecute(true);
  }
  CreateCharacterFlowData(e, o) {
    var t = new DynamicFlowController_1.CharacterDynamicFlowData();
    var o = {
      EntityIds: [],
      EnterRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE,
      LeaveRadius: CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      Flow: o,
      WaitTime: 0,
      RedDot: false
    };
    const r = new DynamicFlowController_1.DynamicFlowActorInfo();
    r.CreatureId = e;
    t.MasterInfo = r;
    t.BubbleData = o;
    t.Callback = () => {
      ControllerHolder_1.ControllerHolder.DynamicFlowController.RemoveDynamicFlow(r);
    };
    return t;
  }
}
exports.default = TsTaskPlayBubble;
//# sourceMappingURL=TsTaskPlayBubble.js.map