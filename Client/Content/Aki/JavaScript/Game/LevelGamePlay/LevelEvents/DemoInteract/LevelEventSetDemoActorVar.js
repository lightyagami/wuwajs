"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventSetDemoActorVar = void 0;
const Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  TestModuleBridge_1 = require("../../../Bridge/TestModuleBridge"),
  LevelGamePlayUtils_1 = require("../../LevelGamePlayUtils"),
  LevelGeneralBase_1 = require("../../LevelGeneralBase");
class LevelEventSetDemoActorVar extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var o, l;
    Info_1.Info.IsPlayInEditor && (o = (o = (e = e).ActorRef.PathName.split("."))[1] + "." + o[2], l = e.VarLeft, void 0 === (e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e.VarRight, r)) ? Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "[LevelEventSetDemoActorVar] 获取目标变量值失败") : TestModuleBridge_1.TestModuleBridge.TryGetLoadedTestModuleExports()?.KuroDemoInteractController.UpdateDemoInteractiveActorMemberProperty(o, !0, l, e))
  }
}
exports.LevelEventSetDemoActorVar = LevelEventSetDemoActorVar;
//# sourceMappingURL=LevelEventSetDemoActorVar.js.map