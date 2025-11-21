"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationGlobalData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiLayer_1 = require("../../../Ui/UiLayer");
class UiNavigationGlobalData {
  static GetListenerInstanceId() {
    return ++this.KCd;
  }
  static AddBlockListenerFocusTag(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "添加禁止切换导航对象标签", ["标签", a]);
    }
    this.IBo.add(a);
  }
  static DeleteBlockListenerFocusTag(a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiNavigation", 10, "移除禁止切换导航对象标签", ["标签", a]);
    }
    this.IBo.delete(a);
  }
  static get IsBlockNavigation() {
    return this.IBo.size > 0 || ControllerHolder_1.ControllerHolder.BlackScreenController.IsBlackScreenActive() || UiLayer_1.UiLayer.IsInMask();
  }
  static ClearBlockListener() {
    this.IBo.clear();
  }
}
(exports.UiNavigationGlobalData = UiNavigationGlobalData).NeedCalculateCurrentPanel = false;
UiNavigationGlobalData.NeedRefreshPanelId = 0;
UiNavigationGlobalData.IsAllowCrossNavigationGroup = false;
UiNavigationGlobalData.IsAllowLoopScrollInteractHighlight = false;
UiNavigationGlobalData.VisionReplaceViewFindDefault = true;
UiNavigationGlobalData.IBo = new Set();
UiNavigationGlobalData.KCd = 0; //# sourceMappingURL=UiNavigationGlobalData.js.map