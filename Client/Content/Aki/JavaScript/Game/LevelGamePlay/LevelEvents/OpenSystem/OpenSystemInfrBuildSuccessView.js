"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemInfrBuildSuccessView = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const InfrastructureController_1 = require("../../../Module/Infrastructure/InfrastructureController");
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemInfrBuildSuccessView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    var t;
    var e = e.InfrActivityBuildStage;
    let o = undefined;
    return (o = e.Type === "Infrastructure" ? (t = {
      NeedFocusBuildQuest: false,
      NeedPlayBuildSuccessSeq: true,
      SettleInfo: {
        DeliveryType: Protocol_1.Aki.Protocol.a4m.Proto_Observatory,
        RoadId: e.Stage
      }
    }, await InfrastructureController_1.InfrastructureController.OpenInfrastructureMainView(t)) : (t = {
      DeliveryType: Protocol_1.Aki.Protocol.a4m.Proto_Road,
      RoadId: e.Id,
      NeedPlayFinishSeq: true
    }, await UiManager_1.UiManager.OpenViewAsync("InfrRoadNetworkMainView", t))) !== undefined;
  }
  GetViewName(e) {
    if (e.InfrActivityBuildStage.Type === "Infrastructure") {
      return "InfrastructureMainView";
    } else {
      return "InfrRoadNetworkMainView";
    }
  }
}
exports.OpenSystemInfrBuildSuccessView = OpenSystemInfrBuildSuccessView;
//# sourceMappingURL=OpenSystemInfrBuildSuccessView.js.map