"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingQteController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
class FishingQteController extends ControllerBase_1.ControllerBase {
  static OpenGameplay(e, r) {
    var o = e.GetComponent(0).GetPbDataId();
    var a = e.GetComponent(0).GetCreatureDataId();
    var t = e => {
      if (e) {
        UiManager_1.UiManager.OpenView("FishingQteView");
        r?.(e);
      } else if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 37, "[FishingQte] 无法进入捕鱼玩法");
      }
    };
    if (e.GetComponent(0).GetBaseInfo()?.Category?.FishingMechanismType === "FishingPoint") {
      ModelManager_1.ModelManager.FishingQteModel.GameplayStart(o, a).then(t);
    } else {
      t(ModelManager_1.ModelManager.FishingQteModel.GameplayStartByTempFishPoint(a));
    }
  }
  static FishingGetRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.Hv_.create();
    r.F4n = e;
    Net_1.Net.Call(27724, r, e => {
      var r;
      if (e) {
        if (r = e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.FishingQteModel.SetTempGetDataListFromServer(e.bMs, 0);
          ModelManager_1.ModelManager.FishingQteModel.SetTempGetDataListFromServer(e.YP_, 1);
          ModelManager_1.ModelManager.FishingQteModel.SetTempGetDataListFromServer(e.GBs, 2);
          o?.(r, e.bMs.length);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15004);
          o?.(false);
        }
      } else {
        o?.(false);
      }
    });
  }
  static OpenFishingSuccessView(e, r) {
    UiManager_1.UiManager.OpenView("FishingQteSuccessView", e, r);
  }
}
exports.FishingQteController = FishingQteController;
//# sourceMappingURL=FishingQteController.js.map