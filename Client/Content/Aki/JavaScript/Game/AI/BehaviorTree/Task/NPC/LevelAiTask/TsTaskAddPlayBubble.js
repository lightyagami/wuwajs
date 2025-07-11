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
class TsTaskAddPlayBubble extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.FlowListName = "";
    this.FlowId = 0;
    this.StateId = 0;
    this.PbDataIds = undefined;
    this.EnterRadius = CharacterFlowComponent_1.DEFAULT_BUBBLE_ENTER_RANGE;
    this.LeaveRadius = CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE;
    this.IsInitTsVariables = false;
    this.TsFlowListName = "";
    this.TsFlowId = 0;
    this.TsStateId = 0;
    this.TsPbDataIds = new Array();
    this.TsEnterRadius = 0;
    this.TsLeaveRadius = 0;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsFlowListName = "";
    this.TsFlowId = 0;
    this.TsStateId = 0;
    this.TsPbDataIds = new Array();
    this.TsEnterRadius = 0;
    this.TsLeaveRadius = 0;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsFlowListName = this.FlowListName;
      this.TsFlowId = this.FlowId;
      this.TsStateId = this.StateId;
      this.TsEnterRadius = this.EnterRadius;
      this.TsLeaveRadius = this.LeaveRadius;
      this.TsPbDataIds.length = 0;
      var e = this.PbDataIds?.Num() ?? 0;
      for (let t = 0; t < e; t++) {
        var o = this.PbDataIds.Get(t);
        this.TsPbDataIds.push(o);
      }
    }
  }
  ReceiveExecuteAI(t, e) {
    this.InitTsVariables();
    if (t instanceof TsAiController_1.default) {
      if (this.TsPbDataIds.length) {
        if (this.TsFlowListName) {
          var o = t.AiController.CharActorComp;
          if (o) {
            var s = o.CreatureData.GetPbDataId();
            var r = [s];
            let t = false;
            for (const i of this.TsPbDataIds) {
              if (i === s) {
                t = true;
              } else {
                r.push(i);
              }
            }
            if (t) {
              o = this.CreateCharacterFlowData();
              ControllerHolder_1.ControllerHolder.DynamicFlowController.AddDynamicFlow(o);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelAi", 50, "禁止添加非自身参与的多人冒泡", ["PbDataId", s], ["FlowName", this.TsFlowListName], ["FlowId", this.TsFlowId], ["StateId", this.TsStateId]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("BehaviorTree", 50, "[TsTaskPlayBubble]无效的ActorComp", ["Type", t.GetClass().GetName()]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BehaviorTree", 50, "[TsTaskPlayBubble]无效的FlowListName", ["Type", t.GetClass().GetName()]);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
    }
    this.FinishExecute(true);
  }
  CreateCharacterFlowData() {
    var t = this.TsPbDataIds.slice();
    var e = new DynamicFlowController_1.CharacterDynamicFlowData();
    var o = {
      FlowListName: this.TsFlowListName,
      FlowId: this.TsFlowId,
      StateId: this.TsStateId
    };
    var t = {
      EntityIds: t,
      EnterRadius: this.TsEnterRadius,
      LeaveRadius: this.TsLeaveRadius,
      Flow: o,
      WaitTime: 0,
      RedDot: false
    };
    e.BubbleData = t;
    e.Type = 1;
    return e;
  }
}
exports.default = TsTaskAddPlayBubble;
//# sourceMappingURL=TsTaskAddPlayBubble.js.map