"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TraceUtils = undefined;
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const PROFILE_KEY = "TraceUtil";
class TraceUtils {
  static LineTraceWithLocation(e, a, r) {
    var o = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    o.Set(e.X, e.Y, e.Z + a);
    var a = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
    a.Set(e.X, e.Y, e.Z + r);
    var e = ModelManager_1.ModelManager.TraceElementModel.GetLineTrace();
    e.WorldContextObject = GlobalData_1.GlobalData.World;
    e.ActorsToIgnore.Empty();
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, o);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, a);
    var r = TraceElementCommon_1.TraceElementCommon.LineTrace(e, PROFILE_KEY);
    var o = e.HitResult;
    e.ClearCacheData();
    return [r, o];
  }
}
exports.TraceUtils = TraceUtils;
//# sourceMappingURL=TraceUtils.js.map