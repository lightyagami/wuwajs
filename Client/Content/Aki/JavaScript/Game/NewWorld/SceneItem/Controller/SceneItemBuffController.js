"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemBuffController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
class SceneItemBuffController extends ControllerBase_1.ControllerBase {
  static BuffOperate(e, r, t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e);
    var o = Protocol_1.Aki.Protocol.ces.create();
    o.oKn = MathUtils_1.MathUtils.NumberToLong(e);
    o.nKn = r;
    Net_1.Net.Call(20702, o, e => {
      let r = false;
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        r = true;
      }
      var o = MathUtils_1.MathUtils.LongToNumber(e.oKn);
      if (ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.IsInit && t) {
        t(e.nKn, r);
      }
    });
  }
}
exports.SceneItemBuffController = SceneItemBuffController;
//# sourceMappingURL=SceneItemBuffController.js.map