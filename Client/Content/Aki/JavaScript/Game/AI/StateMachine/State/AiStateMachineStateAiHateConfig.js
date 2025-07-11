"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineStateAiHateConfig = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const AiStateMachine_1 = require("../AiStateMachine");
const AiStateMachineState_1 = require("./AiStateMachineState");
class AiStateMachineStateAiHateConfig extends AiStateMachineState_1.AiStateMachineState {
  constructor() {
    super(...arguments);
    this.Mne = 0;
    this.Ene = undefined;
  }
  OnInit(t) {
    this.Mne = t.BindAiHateConfig.ConfigId;
    return true;
  }
  OnActivate() {
    this.Ene = this.Node.AiController.AiHateList?.AiHate?.Id;
    if (this.Mne) {
      this.Node.AiController.AiHateList.AiHate = ConfigManager_1.ConfigManager.AiConfig.LoadAiHate(this.Mne);
    } else {
      this.Node.AiController.AiHateList.AiHate = ConfigManager_1.ConfigManager.AiConfig.LoadAiHateByController(this.Node.AiController, undefined);
    }
  }
  OnDeactivate() {
    if (this.Ene) {
      this.Node.AiController.AiHateList.AiHate = ConfigManager_1.ConfigManager.AiConfig.LoadAiHate(this.Ene);
    } else {
      this.Node.AiController.AiHateList.AiHate = ConfigManager_1.ConfigManager.AiConfig.LoadAiHateByController(this.Node.AiController, undefined);
    }
    this.Ene = undefined;
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
  }
}
exports.AiStateMachineStateAiHateConfig = AiStateMachineStateAiHateConfig;
//# sourceMappingURL=AiStateMachineStateAiHateConfig.js.map