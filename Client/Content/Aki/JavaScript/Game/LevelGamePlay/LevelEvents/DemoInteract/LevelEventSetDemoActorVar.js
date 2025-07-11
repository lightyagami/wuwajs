"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetDemoActorVar = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const TestModuleBridge_1 = require("../../../Bridge/TestModuleBridge");
const LevelGamePlayUtils_1 = require("../../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../../LevelGeneralBase");
class LevelEventSetDemoActorVar extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var o;
    var l;
    if (Info_1.Info.IsPlayInEditor) {
      o = (o = (e = e).ActorRef.PathName.split("."))[1] + "." + o[2];
      l = e.VarLeft;
      if ((e = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(e.VarRight, r)) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 39, "[LevelEventSetDemoActorVar] 获取目标变量值失败");
        }
      } else {
        TestModuleBridge_1.TestModuleBridge.TryGetLoadedTestModuleExports()?.KuroDemoInteractController.UpdateDemoInteractiveActorMemberProperty(o, true, l, e);
      }
    }
  }
}
exports.LevelEventSetDemoActorVar = LevelEventSetDemoActorVar;
//# sourceMappingURL=LevelEventSetDemoActorVar.js.map