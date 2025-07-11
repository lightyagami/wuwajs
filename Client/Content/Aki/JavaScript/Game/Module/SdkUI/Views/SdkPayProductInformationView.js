"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SdkPayProductInformationView = undefined;
const UE = require("ue");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class SdkPayProductInformationView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.C0t = undefined;
    this.Awe = () => {
      this.CloseMe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SdkPayEnd, 0);
    };
    this.L3e = () => {
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.HidePlayStationStoreIcon();
      if (this.C0t) {
        this.C0t.OnClickConfirmBtn(this.C0t.ProductId);
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.Awe], [3, this.L3e]];
  }
  OnStart() {
    this.C0t = this.OpenParam;
  }
  OnBeforeShow() {
    this.mGe();
    this.Dke();
  }
  mGe() {
    if (this.C0t) {
      this.GetText(0)?.SetText(this.C0t.ProductName);
    }
  }
  Dke() {
    if (this.C0t) {
      this.GetText(1)?.SetText(this.C0t.ContentName);
    }
  }
}
exports.SdkPayProductInformationView = SdkPayProductInformationView;
//# sourceMappingURL=SdkPayProductInformationView.js.map