"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemActivitySubView = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ActivityViewNameById_1 = require("../../../../Core/Define/ConfigQuery/ActivityViewNameById");
const ActivityManager_1 = require("../../../Module/Activity/ActivityManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemActivitySubView extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, i) {
    var t;
    var r;
    return !e || ((t = ActivityViewNameById_1.configActivityViewNameById.GetConfig(e.BoardId)) ? (r = t.Type, !!(r = ActivityManager_1.ActivityManager.GetActivityController(r)) && (await r.OpenViewByViewName(t.ViewName, e.BoardId))) : (Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 75, "OpenSystemActivitySubView Error", ["id", e.BoardId]), false));
  }
  GetViewName(e, i) {
    e = ActivityViewNameById_1.configActivityViewNameById.GetConfig(e.BoardId);
    if (e) {
      return e.ViewName;
    }
  }
}
exports.OpenSystemActivitySubView = OpenSystemActivitySubView;
//# sourceMappingURL=OpenSystemActivitySubView.js.map