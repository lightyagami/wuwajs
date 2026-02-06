"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerStageBase = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class GuessJokerStageBase {
  constructor(e) {
    this.IsActive = false;
    this.StageFsm = undefined;
    this.StageFsm = e;
  }
  Create() {
    this.OnCreate();
  }
  Enter() {
    this.IsActive = true;
    this.OnEnter();
    this.OnAddEventListener();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, `Enter ${this.constructor.name} stage`);
    }
  }
  Tick(e) {
    if (this.IsActive) {
      this.OnTick(e);
    }
  }
  Exit() {
    this.OnRemoveEventListener();
    this.OnExit();
    this.IsActive = false;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("GuessJokerCard", 78, `Exit ${this.constructor.name} stage`);
    }
  }
  OnCreate() {}
  OnEnter() {}
  OnAddEventListener() {}
  OnTick(e) {}
  OnRemoveEventListener() {}
  OnExit() {}
}
exports.GuessJokerStageBase = GuessJokerStageBase;
//# sourceMappingURL=GuessJokerStageBase.js.map