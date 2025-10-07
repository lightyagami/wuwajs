"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackScreenController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const UiLayer_1 = require("../../Ui/UiLayer");
const BlackScreenGlobalData_1 = require("./BlackScreenGlobalData");
const BlackScreenTransitionView_1 = require("./BlackScreenTransitionView");
class BlackScreenController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UiManagerInit, this.i0t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsAddBlackScreen, this.yKd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsNotifyTsRemoveBlackScreen, this.SKd);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UiManagerInit, this.i0t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsAddBlackScreen, this.yKd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsNotifyTsRemoveBlackScreen, this.SKd);
  }
  static AddBlackScreen(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BlackScreen", 10, "触发开始黑屏", ["标签", t]);
    }
    if (this.o0t.size === 0) {
      this.r0t.ShowTemp(e);
    }
    e = this.o0t.get(t);
    if (e) {
      this.o0t.set(t, ++e);
    } else {
      this.o0t.set(t, 1);
    }
  }
  static async AddBlackScreenAsync(e, t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("BlackScreen", 10, "触发开始黑屏async", ["标签", t]);
    }
    if (this.o0t.size === 0) {
      this.r0t.ShowTemp(e);
    }
    e = this.o0t.get(t);
    if (e) {
      this.o0t.set(t, ++e);
    } else {
      this.o0t.set(t, 1);
    }
    await BlackScreenGlobalData_1.BlackScreenGlobalData.ShowPromise.Promise;
  }
  static RemoveBlackScreen(e, t) {
    var n;
    if (this.r0t && (n = this.o0t.get(t)) && (Log_1.Log.CheckInfo() && Log_1.Log.Info("BlackScreen", 10, "触发结束黑屏", ["标签", t]), n === 1 ? this.o0t.delete(t) : this.o0t.set(t, --n), this.o0t.size === 0)) {
      this.r0t.HideTemp(e);
    }
  }
  static IsBlackScreenActive() {
    return this.r0t?.IsUiActiveInHierarchy() ?? false;
  }
  static OnClear() {
    if (this.r0t) {
      this.r0t.Destroy();
      this.r0t = undefined;
    }
    return true;
  }
  static async MKd(e, t) {
    await this.AddBlackScreenAsync(e, t);
    EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsNotifyCsAddBlackScreenFinish);
  }
}
exports.BlackScreenController = BlackScreenController;
(_a = BlackScreenController).r0t = undefined;
BlackScreenController.o0t = new Map();
BlackScreenController.i0t = () => {
  if (!_a.r0t) {
    _a.r0t = new BlackScreenTransitionView_1.BlackScreenTransitionView();
    _a.r0t.CreateByResourceIdAsync("UiView_BlackScreen_Prefab", UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.CG), true);
  }
};
BlackScreenController.yKd = (e, t) => {
  _a.MKd(e, t);
};
BlackScreenController.SKd = (e, t) => {
  _a.RemoveBlackScreen(e, t);
}; //# sourceMappingURL=BlackScreenController.js.map