"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRunDemoActorCustomEvent = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const TestModuleBridge_1 = require("../../../Bridge/TestModuleBridge");
const LevelGeneralBase_1 = require("../../LevelGeneralBase");
class LevelEventRunDemoActorCustomEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    var r;
    if (Info_1.Info.IsPlayInEditor) {
      r = (r = (e = e).ActorRef.PathName.split("."))[1] + "." + r[2];
      TestModuleBridge_1.TestModuleBridge.TryGetLoadedTestModuleExports()?.KuroDemoInteractController.CallDemoInteractiveActorMemberFunctionOrDelegate(r, true, e.EventName);
    }
  }
}
exports.LevelEventRunDemoActorCustomEvent = LevelEventRunDemoActorCustomEvent;
//# sourceMappingURL=LevelEventRunDemoActorCustomEvent.js.map