"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefCompControllerBase = exports.PATH_LENGTH = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const GlobalData_1 = require("../../../GlobalData");
exports.PATH_LENGTH = 3;
class RefCompControllerBase {
  constructor(e, o, r) {
    this.Entity = e;
    this.CreatureDataId = o;
    this.PbDataId = r;
    this.ActorSubsystem = undefined;
    this.ActorSubsystem = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
  }
  OnStart() {}
  OnEnd() {}
  TickController(e) {
    try {
      this.OnTick(e);
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("SceneItem", 72, "[RefCompControllerBase:TickController] 执行TickController时出错", e, ["error", e.message], ["Type", this.Type]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 72, "[RefCompControllerBase:TickController] 执行TickController时出错", ["error", e], ["Type", this.Type]);
      }
    }
  }
  OnTick(e) {}
  GetActorByActorRef(e, o) {
    var r = e.PathName.split(".");
    if (!(r.length < exports.PATH_LENGTH)) {
      r = r[1] + "." + r[2];
      r = FNameUtil_1.FNameUtil.GetDynamicFName(r);
      return this.ActorSubsystem?.GetActor(r);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 72, "[RefCompControllerBase:GetActorByActorRef] actor路径错误", ["RefPath", e], ["Reason", o]);
    }
  }
}
exports.RefCompControllerBase = RefCompControllerBase;
//# sourceMappingURL=RefCompControllerBase.js.map