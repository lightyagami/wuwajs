"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowPostAudioEvent = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowPostAudioEvent extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.tzf = "";
  }
  Init(e) {
    this.tzf = e;
    return this;
  }
  OnExecute() {
    AudioSystem_1.AudioSystem.PostEvent(this.tzf);
    this.FinishExecute(true);
  }
}
exports.LevelFlowPostAudioEvent = LevelFlowPostAudioEvent;
//# sourceMappingURL=LevelFlowPostAudioEvent.js.map