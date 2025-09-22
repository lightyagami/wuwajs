"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeqBaseAssistant = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
class SeqBaseAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.Model = ModelManager_1.ModelManager.SequenceModel;
    this.IsRunning = false;
    this.Callback = undefined;
    this.Promise = undefined;
  }
  DoCallback(s) {
    var e;
    if (this.Callback) {
      e = this.Callback;
      this.Callback = undefined;
      e(s);
    }
  }
  End() {}
  Load(s) {}
  async LoadPromise() {
    return this.Promise.Promise;
  }
  PreAllPlay(s) {}
  async PreAllPlayPromise() {
    return this.Promise.Promise;
  }
  PreEachPlay() {}
  EachStop() {}
  CmdShadowUpdate() {}
  AllStop(s) {}
  async AllStopPromise() {
    return this.Promise.Promise;
  }
  LoadNecessaryData(s) {}
  OnDestroy() {}
}
exports.SeqBaseAssistant = SeqBaseAssistant;
//# sourceMappingURL=SeqBaseAssistant.js.map