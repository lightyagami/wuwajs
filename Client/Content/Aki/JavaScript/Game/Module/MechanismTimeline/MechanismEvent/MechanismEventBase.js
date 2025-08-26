"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MechanismEventBase = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class MechanismEventBase {
  constructor(t, s, e, i) {
    this.EventInfo = t;
    this.Context = s;
    this.EventListenerComponent = e;
    this.IsServerAction = i;
  }
  get Type() {
    return this.EventInfo.Info.Action.Name;
  }
  get SeqGuid() {
    return this.EventInfo.SeqGuid;
  }
  get EventName() {
    return this.EventInfo.Info.EventName;
  }
  get PlayerId() {
    return this.EventListenerComponent.GetPlayerId();
  }
  get CreatureDataId() {
    return this.EventListenerComponent.GetCreatureDataId();
  }
  Dispose() {
    this.OnDispose();
  }
  Trigger() {
    this.OnTrigger(this.EventInfo.Info.Action.Params);
    if (this.IsServerAction) {
      ControllerHolder_1.ControllerHolder.MechanismTimelineController.RequestSceneItemSequenceFrameStart(this.PlayerId, this.CreatureDataId, this.SeqGuid, this.EventName);
    }
  }
  Start() {
    this.OnStart(this.EventInfo.Info.Action.Params);
    if (this.IsServerAction) {
      ControllerHolder_1.ControllerHolder.MechanismTimelineController.RequestSceneItemSequenceFrameStart(this.PlayerId, this.CreatureDataId, this.SeqGuid, this.EventName);
    }
  }
  Tick() {
    this.OnTick();
  }
  End() {
    this.OnEnd(this.EventInfo.Info.Action.Params);
    if (this.IsServerAction) {
      ControllerHolder_1.ControllerHolder.MechanismTimelineController.RequestSceneItemSequenceFrameEnd(this.PlayerId, this.CreatureDataId, this.SeqGuid, this.EventName);
    }
  }
  OnTrigger(t) {}
  OnStart(t) {}
  OnTick() {}
  OnEnd(t) {}
  OnDispose() {}
}
exports.MechanismEventBase = MechanismEventBase;
//# sourceMappingURL=MechanismEventBase.js.map