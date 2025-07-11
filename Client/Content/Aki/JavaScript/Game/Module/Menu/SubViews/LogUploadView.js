"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogUploadView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Net_1 = require("../../../../Core/Net/Net");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const LauncherLogUpload_1 = require("../../../../Launcher/LogUpload/LauncherLogUpload");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LogController_1 = require("../../../World/Controller/LogController");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
class LogUploadView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.cBi = false;
    this.mBi = 0;
    this.dBi = 0;
    this.CBi = undefined;
    this.gBi = undefined;
    this.fBi = undefined;
    this.ZAt = undefined;
    this.UploadDelegate = undefined;
    this.pBi = undefined;
    this.vBi = 1;
    this.RefreshRedDot = () => {
      var t = ControllerHolder_1.ControllerHolder.KuroSdkController.GetCustomerServiceRedPointState();
      this.fBi?.SetRedDotVisible(t);
    };
    this.MBi = t => {
      this.cBi = t === 1;
    };
    this.EBi = () => {
      if (this.vBi === 2) {
        LogController_1.LogController.RequestOutputDebugInfo();
      }
      ControllerHolder_1.ControllerHolder.KuroSdkController.OpenCustomerService(this.vBi);
    };
    this.Mke = () => {
      switch (this.SBi) {
        case 0:
          if (!this.cBi) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("LogUploadConfirmTip");
            return;
          }
          if (!this.yBi()) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("LogUploadLimited");
            return;
          }
          this.SBi = 1;
          this.IBi();
          break;
        case 1:
          if (this.TBi()) {
            this.SBi = 0;
          }
          break;
        case 2:
          this.m2e();
          break;
        case 3:
          this.SBi = 1;
          this.IBi();
      }
    };
    this.m2e = () => {
      if (this.SBi !== 1 || !!this.TBi()) {
        this.CloseMe();
      }
    };
    this.UploadEventCallBack = (t, e) => {
      var i;
      if (this.SBi === 1) {
        this.pBi = t;
        if (this.pBi === 5 || this.pBi === 4) {
          this.LBi();
        } else if (this.dBi !== e && (this.pBi === 1 || this.pBi === 2)) {
          t = Math.round(e * MathCommon_1.MathCommon.ProgressTotalValue).toString() + "%";
          i = this.pBi === 1 ? "Text_LogCompressing_Text" : "Text_LogUploading_Text";
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.CBi, i, t);
          this.gBi.SetFillAmount(e);
          this.dBi = e;
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIExtendToggle]];
    this.BtnBindInfo = [[6, this.MBi]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SdkCustomerRedPointRefresh, this.RefreshRedDot);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SdkCustomerRedPointRefresh, this.RefreshRedDot);
  }
  OnStart() {
    if (this.OpenParam) {
      this.vBi = this.OpenParam;
    }
    this.CBi = this.GetText(0);
    this.gBi = this.GetSprite(2);
    this.fBi = new ButtonItem_1.ButtonItem(this.GetItem(3));
    this.fBi.SetFunction(this.EBi);
    this.fBi.SetShowText("Text_LogUploadService_Text");
    this.fBi.SetActive(false);
    this.RefreshRedDot();
    this.ZAt = new ButtonItem_1.ButtonItem(this.GetItem(4));
    this.ZAt.SetFunction(this.Mke);
    this.SBi = 0;
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {
      this.m2e();
    });
  }
  OnBeforeDestroy() {
    this.DBi();
    this.CBi = undefined;
    this.gBi = undefined;
    this.fBi?.Destroy();
  }
  RBi(t) {
    if (t && ControllerHolder_1.ControllerHolder.KuroSdkController.NeedShowCustomerService()) {
      this.fBi.SetActive(true);
    } else {
      this.fBi.SetActive(false);
    }
  }
  DBi() {
    UE.KuroTencentCOSLibrary.ClearAllProgressCallback();
    if (this.UploadDelegate) {
      (0, puerts_1.releaseManualReleaseDelegate)(this.UploadEventCallBack);
      this.UploadDelegate = undefined;
    }
  }
  set SBi(t) {
    this.mBi = t;
    var e = this.GetExtendToggle(6);
    var i = this.GetItem(1);
    var o = this.GetSprite(5);
    switch (this.mBi) {
      case 0:
        this.RBi(true);
        this.ZAt.SetShowText("Text_LogUpload_Text");
        this.CBi.ShowTextNew("Text_LogUploadConfirm_Text");
        this.CBi.SetUIActive(true);
        var r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_UploadState1");
        this.SetSpriteByPath(r, o, false);
        e.RootUIComp.SetUIActive(true);
        i.SetUIActive(false);
        break;
      case 1:
        this.RBi(false);
        this.ZAt.SetShowText("Text_LogUploadCancel_Text");
        this.CBi.SetText("");
        r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_UploadState2");
        this.SetSpriteByPath(r, o, false);
        e.RootUIComp.SetUIActive(false);
        i.SetUIActive(true);
        break;
      case 2:
        this.RBi(true);
        this.ZAt.SetShowText("Text_LogUploadYes_Text");
        this.CBi.ShowTextNew("Text_LogUploadSuccess_Text");
        r = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_UploadState3");
        this.SetSpriteByPath(r, o, false);
        e.RootUIComp.SetUIActive(false);
        i.SetUIActive(false);
        break;
      case 3:
        this.RBi(true);
        this.ZAt.SetShowText("Text_LogUploadRetry_Text");
        var r = UE.KuroTencentCOSLibrary.GetAllFileNumNeedToSend();
        var s = r - UE.KuroTencentCOSLibrary.GetSendedFileNum();
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.CBi, "Text_LogUploadFail_Text", s, r);
        var s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_UploadState1");
        this.SetSpriteByPath(s, o, false);
        e.RootUIComp.SetUIActive(false);
        i.SetUIActive(false);
    }
  }
  get SBi() {
    return this.mBi;
  }
  yBi() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("LogUploadTimeInterval");
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    let i = undefined;
    return (i = Net_1.Net.IsServerConnected() ? LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LastTimeUploadStamp) : LocalStorage_1.LocalStorage.GetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LastTimeUploadStamp)) === undefined || e - i > t || (Log_1.Log.CheckInfo() && Log_1.Log.Info("Log", 37, "[LogUpload] 上传时间不合法", ["LastTimeStamp", i], ["CurrentTimeStamp", e]), false);
  }
  IBi() {
    this.dBi = 0;
    this.gBi.SetFillAmount(0);
    this.DBi();
    this.UploadDelegate ||= (0, puerts_1.toManualReleaseDelegate)(this.UploadEventCallBack);
    if (this.vBi === 2) {
      LogController_1.LogController.RequestOutputDebugInfo();
    }
    LauncherLogUpload_1.LauncherLogUpload.SendLog(this.UploadDelegate);
  }
  TBi() {
    if (this.pBi === 1) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("LogUploadCompressingTip");
      return false;
    } else {
      return !!UE.KuroTencentCOSLibrary.IsSending() && (UE.KuroTencentCOSLibrary.InterruptSending(), ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("LogUploadCancelTip"), true);
    }
  }
  LBi() {
    this.DBi();
    var t = this.pBi === 5;
    this.SBi = t ? 2 : 3;
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    var i = Net_1.Net.IsServerConnected();
    if (t) {
      if (i) {
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.LastTimeUploadStamp, e);
      } else {
        LocalStorage_1.LocalStorage.SetGlobal(LocalStorageDefine_1.ELocalStorageGlobalKey.LastTimeUploadStamp, e);
      }
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Log", 37, "[LogUpload] 上传结束", ["IsLogin", i], ["Success", t], ["TimeStamp", e]);
    }
  }
}
exports.LogUploadView = LogUploadView;
//# sourceMappingURL=LogUploadView.js.map