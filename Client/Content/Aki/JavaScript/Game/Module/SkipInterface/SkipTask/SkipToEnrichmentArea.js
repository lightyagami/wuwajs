"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipToEnrichmentArea = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MapController_1 = require("../../Map/Controller/MapController");
const SkipTask_1 = require("./SkipTask");
class SkipToEnrichmentArea extends SkipTask_1.SkipTask {
  OnRun(e, o, r, t) {
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SkipInterface", 63, "跳转富集区失败,道具Id为空->", ["itemId:", t]);
      }
    } else {
      MapController_1.MapController.RequestTrackEnrichmentArea(t);
    }
  }
}
exports.SkipToEnrichmentArea = SkipToEnrichmentArea;
//# sourceMappingURL=SkipToEnrichmentArea.js.map