"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackRewardController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const SplashScreenController_1 = require("../SplashScreen/SplashScreenController");
const SplashScreenTask_1 = require("../SplashScreen/SplashScreenTask");
class FeedbackRewardController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18567, this.s0g);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18567);
  }
  static OnAddEvents() {
    super.OnAddEvents();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, FeedbackRewardController.xkt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, FeedbackRewardController.$5e);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, FeedbackRewardController.xkt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, FeedbackRewardController.$5e);
    super.OnRemoveEvents();
  }
  static async GivebackInfoRequest() {
    var e = new Protocol_1.Aki.Protocol.pCg();
    var e = await Net_1.Net.CallAsync(20712, e);
    this.a0g(e);
  }
  static async GivebackRewardRequest() {
    var e;
    var r = ModelManager_1.ModelManager.FeedbackRewardModel.GetCanClaimRewardIds();
    if (!(r.length <= 0)) {
      (e = new Protocol_1.Aki.Protocol.yCg()).pBg = r;
      r = await Net_1.Net.CallAsync(18854, e);
      this.h0g(r);
    }
  }
}
exports.FeedbackRewardController = FeedbackRewardController;
(_a = FeedbackRewardController).xkt = () => {
  _a.GivebackInfoRequest();
};
FeedbackRewardController.$5e = () => {
  var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FeedbackRewardHaveShowRewardId, 0) ?? 0;
  const r = ModelManager_1.ModelManager.FeedbackRewardModel.GetMaxFinishRewardId();
  if (e < r) {
    e = new SplashScreenTask_1.SplashScreenTask(7, 0, () => {
      UiManager_1.UiManager.OpenView("FeedbackRewardStartView", r);
    });
    SplashScreenController_1.SplashScreenController.PushSplashScreenTask(e);
  }
};
FeedbackRewardController.a0g = e => {};
FeedbackRewardController.h0g = e => {};
FeedbackRewardController.s0g = e => {
  e = e.ICg;
  if (e) {
    ModelManager_1.ModelManager.FeedbackRewardModel.CurrentPointCount = e.Yma;
    ModelManager_1.ModelManager.FeedbackRewardModel.CurrentLoginDayCount = e.ECg;
    ModelManager_1.ModelManager.FeedbackRewardModel.RefreshFeedBackRewardMapState(e.H91);
    ModelManager_1.ModelManager.FeedbackRewardModel.RefreshFeedBackTask(e.vlu);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FeedbackRewardRefresh);
  }
}; //# sourceMappingURL=FeedbackRewardController.js.map