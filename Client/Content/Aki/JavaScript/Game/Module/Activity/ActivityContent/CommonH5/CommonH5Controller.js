"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonH5Controller = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const CommonH5Data_1 = require("./CommonH5Data");
const CommonH5SubView_1 = require("./View/CommonH5SubView");
class CommonH5Controller extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.g5c = e => {
      ModelManager_1.ModelManager.CommonH5Model.OnActivityDataNotify(e);
    };
    this.HandleOnEnterClick = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Activity", 27, "打开活动页面（H5）");
      }
      e?.SetCurrentLoginClickState(true);
      this.mIi(e);
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_H5Main";
  }
  OnCreateActivityData(e) {
    CommonH5Controller.ActivityId = e.s5n;
    return new CommonH5Data_1.CommonH5Data();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnCreateSubPageComponent(e) {
    return new CommonH5SubView_1.CommonH5SubView();
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(23798, this.g5c);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23798);
  }
  uuf() {
    var e = new Protocol_1.Aki.Protocol.l4f();
    Net_1.Net.Call(26599, e, e => {});
  }
  mIi(t) {
    if (t !== undefined) {
      let e = t.GetRootUrl();
      if (e === undefined) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Activity", 27, "无法获取根链接");
        }
      } else {
        e = PublicUtil_1.PublicUtil.GetExternalUrl(e, 3);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Activity", 27, "打开外部链接", ["url", e]);
        }
        if (e !== undefined) {
          ModelManager_1.ModelManager.CommonH5Model.SaveClickRedDotState();
          this.uuf();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonH5ActivityRedDot);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
          if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
            e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(e, true);
            ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView("", e, true, true);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Activity", 27, "打开外部链接【带sdk，内部】", ["url", e]);
            }
          } else {
            e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(e, false);
            ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(e);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Activity", 27, "打开外部链接【不带sdk，外部】", ["url", e]);
            }
          }
        }
      }
    }
  }
}
(exports.CommonH5Controller = CommonH5Controller).ActivityId = 0;
//# sourceMappingURL=CommonH5Controller.js.map