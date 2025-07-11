"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkLoginView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PlatformSdkConfig_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkConfig");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const PlatformSdkReportData_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkReportData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const SdkViewData_1 = require("../SdkViewData");
class SdkLoginView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eDo = () => {
      ModelManager_1.ModelManager.LoginModel.SetSdkLoginState(0);
      this.CloseMe();
    };
    this.E7e = () => {
      var e = new SdkViewData_1.SdkPopUpViewData();
      e.ViewType = 0;
      e.NeedMask = true;
      e.Text = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CreatingAccount");
      UiManager_1.UiManager.OpenView("SdkTipsMiddlePopUpView", e, () => {
        var e = new PlatformSdkReportData_1.PlatformReportCreateNewAccount();
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(e);
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().BindAccountThenLogin((e, r, a, i) => {
          UiManager_1.UiManager.CloseView("SdkTipsMiddlePopUpView");
          if (i) {
            UiManager_1.UiManager.CloseView("SdkLoginView");
            ControllerHolder_1.ControllerHolder.LoginController.OnSdkLoginResult(i.code, i.cuid, i.username);
          } else if (i || e === "" || e === "HttpFail") {
            if (!i) {
              i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(214);
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(i);
            }
          } else {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e);
          }
        });
      });
    };
    this.Onl = () => {
      const e = new PlatformSdkReportData_1.PlatformReportClickOldAccount();
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(e);
      var r = new SdkViewData_1.SdkMailViewData();
      var a = PlatformSdkConfig_1.PlatformSdkConfig.GetPrivacyPolicy();
      var i = PlatformSdkConfig_1.PlatformSdkConfig.GetTermsOfService();
      var o = PlatformSdkConfig_1.PlatformSdkConfig.GetChildPolicy();
      if (i && i !== "") {
        var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MenuConfig_114_Name");
        const e = SdkViewData_1.SdkProtocolData.Create(i, t);
        r.ProtocolData.push(e);
      }
      if (a && a !== "") {
        i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MenuConfig_115_Name");
        const e = SdkViewData_1.SdkProtocolData.Create(a, i);
        r.ProtocolData.push(e);
      }
      if (o && o !== "") {
        t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("MenuConfig_116_Name");
        const e = SdkViewData_1.SdkProtocolData.Create(o, t);
        r.ProtocolData.push(e);
      }
      UiManager_1.UiManager.OpenView("SdkMailView", r);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIVerticalLayout], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.eDo], [1, this.E7e], [4, this.Onl]];
  }
  OnAfterShow() {
    var e = new PlatformSdkReportData_1.PlatformReportSelectLogin();
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().ReportToThirdParty(e);
  }
}
exports.SdkLoginView = SdkLoginView;
//# sourceMappingURL=SdkLoginView.js.map