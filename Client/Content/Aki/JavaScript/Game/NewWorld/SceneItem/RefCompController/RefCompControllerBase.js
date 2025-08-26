"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefCompControllerBase = undefined;
const UE = require("ue");
const GlobalData_1 = require("../../../GlobalData");
class RefCompControllerBase {
  constructor(t, e, o) {
    this.Entity = t;
    this.CreatureDataId = e;
    this.PbDataId = o;
    this.ActorSubsystem = undefined;
    this.ActorSubsystem = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
  }
  OnStart() {}
  OnEnd() {}
}
exports.RefCompControllerBase = RefCompControllerBase;
//# sourceMappingURL=RefCompControllerBase.js.map