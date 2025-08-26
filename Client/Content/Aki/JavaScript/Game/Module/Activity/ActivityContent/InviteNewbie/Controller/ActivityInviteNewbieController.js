"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityInviteNewbieController = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Net_1 = require("../../../../../../Core/Net/Net");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../../Common/PublicUtil");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityControllerBase_1 = require("../../../ActivityControllerBase");
const InviteNewbieDefine_1 = require("../InviteNewbieDefine");
const InviteNewbieSubView_1 = require("../View/InviteNewbieSubView");
class ActivityInviteNewbieController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.g5c = e => {
      ModelManager_1.ModelManager.InviteNewbieModel.SyncActivityNotify(e);
    };
    this.HandleOnRewardClick = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InviteNewbie", 64, "打开奖励页面（H5）");
      }
      e?.SetCurrentLoginClickState(true);
      this.mIi();
    };
    this.HandleOnEnterClick = e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InviteNewbie", 64, "打开活动页面（H5）");
      }
      e?.SetCurrentLoginClickState(true);
      this.mIi();
    };
    this.HandleOnCopyInviteCodeClick = () => {
      var e = ModelManager_1.ModelManager.InviteNewbieModel.InviteCode;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InviteNewbie", 64, "复制邀请码", ["inviteCode", e]);
      }
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(InviteNewbieDefine_1.COPY_INVITE_CODE);
      UE.LGUIBPLibrary.ClipBoardCopy(e);
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ReferralCampaignMain";
  }
  OnCreateSubPageComponent(e) {
    return new InviteNewbieSubView_1.InviteNewbieSubView();
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.InviteNewbieModel.ActivityData;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(26801, this.g5c);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26801);
  }
  mIi() {
    let e = undefined;
    var t = ModelManager_1.ModelManager.InviteNewbieModel.RootUrl;
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InviteNewbie", 64, "无法获取根链接");
      }
    } else {
      e = PublicUtil_1.PublicUtil.GetExternalUrl(t, 1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("InviteNewbie", 64, "打开外部链接", ["url", e]);
      }
      if (e !== undefined) {
        ModelManager_1.ModelManager.InviteNewbieModel.SaveClickState();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.InviteNewbieEntered);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, ModelManager_1.ModelManager.InviteNewbieModel.CurrentActivityId);
        if (ModelManager_1.ModelManager.InviteNewbieModel.IsInternalBrowser) {
          if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
            e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(e, true);
            ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView("", e, true, true);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("InviteNewbie", 64, "打开外部链接【带sdk，内部】", ["url", e]);
            }
          } else {
            e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(e, false);
            ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(e);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("InviteNewbie", 64, "打开外部链接【不带sdk，外部】", ["url", e]);
            }
          }
        } else {
          e = PublicUtil_1.PublicUtil.GetExtendExternalUrl(e, false);
          ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(e);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("InviteNewbie", 64, "打开外部链接【走配置，外部】", ["url", e]);
          }
        }
      }
    }
  }
}
exports.ActivityInviteNewbieController = ActivityInviteNewbieController;
//# sourceMappingURL=ActivityInviteNewbieController.js.map