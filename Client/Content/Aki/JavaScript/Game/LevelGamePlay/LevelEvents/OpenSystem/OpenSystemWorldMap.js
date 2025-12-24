"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemWorldMap = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemWorldMap extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    const o = new CustomPromise_1.CustomPromise();
    let s = false;
    e = {
      MarkType: 0,
      MarkId: undefined,
      RegionalTerminalBarItemParams: {
        IsUnfold: e.MapConfig?.ExpandAreaTerminal
      }
    };
    ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, e, (e, r) => {
      s = e;
      o.SetResult();
    });
    await o.Promise;
    return s;
  }
  GetViewName(e, r) {
    return "WorldMapView";
  }
}
exports.OpenSystemWorldMap = OpenSystemWorldMap;
//# sourceMappingURL=OpenSystemWorldMap.js.map