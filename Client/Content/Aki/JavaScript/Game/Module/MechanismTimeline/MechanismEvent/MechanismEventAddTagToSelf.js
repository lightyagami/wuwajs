"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MechanismEventAddTagToSelf = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MechanismEventBase_1 = require("./MechanismEventBase");
class MechanismEventAddTagToSelf extends MechanismEventBase_1.MechanismEventBase {
  OnTrigger(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 18, "MechanismEventAddTagToSelf.Trigger", ["eventType", this.Type], ["context", this.Context]);
    }
  }
  OnStart(e) {
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 18, "MechanismEventAddTagToSelf.Start", ["eventType", this.Type], ["context", this.Context], ["eventName", this.EventName]);
      }
      this.EventListenerComponent.AddTags(e.Tags);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "MechanismEventAddTagToSelf.参数类型错误", ["context", this.Context], ["eventName", this.EventName]);
    }
  }
  OnEnd(e) {
    if (e) {
      this.EventListenerComponent.RemoveTags(e.Tags);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 18, "MechanismEventAddTagToSelf.End", ["eventType", this.Type], ["context", this.Context], ["eventName", this.EventName]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "MechanismEventAddTagToSelf.参数类型错误", ["context", this.Context], ["eventName", this.EventName]);
    }
  }
}
exports.MechanismEventAddTagToSelf = MechanismEventAddTagToSelf;
//# sourceMappingURL=MechanismEventAddTagToSelf.js.map