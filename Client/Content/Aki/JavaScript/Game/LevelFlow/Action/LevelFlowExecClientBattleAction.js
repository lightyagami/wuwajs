"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowExecClientBattleAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LevelEventExecClientBattleAction_1 = require("../../LevelGamePlay/LevelEvents/LevelEventExecClientBattleAction");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowExecClientBattleAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.pDe = undefined;
  }
  Init(e) {
    this.pDe = e;
    return this;
  }
  OnExecute() {
    if (this.pDe) {
      switch (this.pDe.ClientBattleOption.Type) {
        case "SendTagEventToControlCharacter":
          LevelEventExecClientBattleAction_1.LevelEventExecClientBattleAction.HandleSendTagEvent(this.pDe.ClientBattleOption, () => {
            this.FinishExecute(true);
          }, () => {
            this.FinishExecute(false);
          });
          break;
        case "TriggerHookPointSkill":
          LevelEventExecClientBattleAction_1.LevelEventExecClientBattleAction.HandleHookPointSkill(this.pDe.ClientBattleOption, () => {
            this.FinishExecute(true);
          }, () => {
            this.FinishExecute(false);
          });
          break;
        case "TriggerMotorSkill":
          LevelEventExecClientBattleAction_1.LevelEventExecClientBattleAction.HandleMotorSkill(this.pDe.ClientBattleOption, () => {
            this.FinishExecute(true);
          }, () => {
            this.FinishExecute(false);
          });
          break;
        case "FollowShooterSkill":
          LevelEventExecClientBattleAction_1.LevelEventExecClientBattleAction.HandleFollowShooterSkill(this.pDe.ClientBattleOption, () => {
            this.FinishExecute(true);
          }, () => {
            this.FinishExecute(false);
          });
      }
    } else {
      this.FinishExecute(false);
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["Param", this.pDe]);
    }
  }
}
exports.LevelFlowExecClientBattleAction = LevelFlowExecClientBattleAction;
//# sourceMappingURL=LevelFlowExecClientBattleAction.js.map