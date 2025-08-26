"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskDestroySelf extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.IsPause = false;
    this.IsInitTsVariables = false;
    this.TsIsPause = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsIsPause = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsIsPause = this.IsPause;
    }
  }
  ReceiveExecuteAI(e, s) {
    this.InitTsVariables();
    const r = e.AiController;
    var t;
    var o;
    if (r) {
      t = r.CharActorComp;
      o = r.CharActorComp.Entity.GetComponent(47);
      if (this.TsIsPause) {
        o?.DisableAi("玩家主控权");
        if (t.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
          TimerSystem_1.TimerSystem.Next(e => {
            var s = r.CharActorComp;
            var t = r.CharActorComp.Entity;
            if (t.GetComponent(47)) {
              Global_1.Global.CharacterController.Possess(s.Actor);
              if (s = t.GetComponent(179)) {
                s.StopMove(false);
              }
              (s = t.GetComponent(62)).ClearMoveVectorCache();
              s.SetActive(true);
            }
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "已废弃的行为树任务节点", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskDestroySelf;
//# sourceMappingURL=TsTaskDestroySelf.js.map