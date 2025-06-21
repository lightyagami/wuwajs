"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventRunDemoActorCustomEvent = void 0;
const Info_1 = require("../../../../Core/Common/Info"),
  TestModuleBridge_1 = require("../../../Bridge/TestModuleBridge"),
  LevelGeneralBase_1 = require("../../LevelGeneralBase");
class LevelEventRunDemoActorCustomEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    var r;
    Info_1.Info.IsPlayInEditor && (r = (r = (e = e).ActorRef.PathName.split("."))[1] + "." + r[2], TestModuleBridge_1.TestModuleBridge.TryGetLoadedTestModuleExports()?.KuroDemoInteractController.CallDemoInteractiveActorMemberFunctionOrDelegate(r, !0, e.EventName))
  }
}
exports.LevelEventRunDemoActorCustomEvent = LevelEventRunDemoActorCustomEvent;
//# sourceMappingURL=LevelEventRunDemoActorCustomEvent.js.map