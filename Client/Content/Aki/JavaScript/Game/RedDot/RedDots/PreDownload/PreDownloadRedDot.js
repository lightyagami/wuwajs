"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPreDownloadComplete = exports.RedDotPreDownload = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPreDownload extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.PreDownloadStateUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PreDownloadModel.HasClickBtnCheck() && !ModelManager_1.ModelManager.PreDownloadModel.IsComplete();
  }
}
exports.RedDotPreDownload = RedDotPreDownload;
class RedDotPreDownloadComplete extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.PreDownloadStateUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PreDownloadModel.IsComplete();
  }
}
exports.RedDotPreDownloadComplete = RedDotPreDownloadComplete;
//# sourceMappingURL=PreDownloadRedDot.js.map