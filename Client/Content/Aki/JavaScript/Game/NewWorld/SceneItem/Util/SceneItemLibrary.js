"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const WorldModel_1 = require("../../../World/Model/WorldModel");
const TsSimpleInteractBase_1 = require("../SimpleBlueprintItem/TsSimpleInteractBase");
class SceneItemLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static FindInteractItemByTypeId(e) {
    var e = WorldModel_1.WorldModel.GetTsSimpleInteractItemById(e);
    var r = UE.NewArray(TsSimpleInteractBase_1.default);
    if (e) {
      for (const t of e) {
        r.Add(t);
      }
    }
    return r;
  }
}
exports.default = SceneItemLibrary;
//# sourceMappingURL=SceneItemLibrary.js.map