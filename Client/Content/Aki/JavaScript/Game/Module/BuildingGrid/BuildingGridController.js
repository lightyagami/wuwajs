"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingGridController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
class BuildingGridController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(24210, BuildingGridController.HKu);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(24210);
    return true;
  }
  static Hnd(e, r, t, o, l) {
    UE.KuroBuildingGridSubsystem.K2_ForEachIntersectingCell(GlobalData_1.GlobalData.World, e.ToUeVector(), r, t, o, (0, puerts_1.toManualReleaseDelegate)(l));
    (0, puerts_1.releaseManualReleaseDelegate)(l);
  }
  static LandFireGrids(e, r, o, l) {
    this.Hnd(e, r, true, 1, (e, r, t) => {
      if (!o || !(ModelManager_1.ModelManager.BuildingGridModel.IsCellPolluted(e, t) > 0)) {
        l(e, r);
      }
    });
  }
  static PolluteGrids(e, r) {
    const o = [];
    this.Hnd(e, r, true, 7, (e, r, t) => {
      if (!(ModelManager_1.ModelManager.BuildingGridModel.IsCellPolluted(e, t) > 0)) {
        (t = Protocol_1.Aki.Protocol.jfu.create()).bPu = e;
        t.iPs = r.X;
        t.rPs = r.Y;
        t.Nfu = 0;
        o.push(t);
      }
    });
    return o;
  }
}
(exports.BuildingGridController = BuildingGridController).HKu = e => {
  ModelManager_1.ModelManager.BuildingGridModel.UpdateGridCell(e);
};
//# sourceMappingURL=BuildingGridController.js.map