"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayStationNetWorkMaskView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ReconnectDefine_1 = require("../ReconnectDefine");
const RETRYMAXCOUNT = 15;
const CHECKGAP = 1000;
class PlayStationNetWorkMaskView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Hso = 0;
    this.Vso = 0;
    this.oUe = 0;
    this.rbt = 0;
    this.pfd = CHECKGAP;
    this.vfd = 0;
    this.yfd = true;
    this.Sfd = () => {
      this.CloseMe();
    };
    this.Mfd = () => {
      this.yfd = false;
      this.Xso();
    };
    this.jso = () => {
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.PsnUnAvailable);
    };
    this.Wso = () => {
      this.vfd = 0;
      this.yfd = true;
      this.$so();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UISprite]];
  }
  OnStart() {
    this.oUe = 0;
    this.Vso = 0;
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("network_mask_time");
    this.rbt = e;
    this.GetItem(0).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.$so();
  }
  $so() {
    if (this.Hso) {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseNetWorkConfirmBoxView(this.Hso);
      this.Hso = undefined;
    }
  }
  OnTick(e) {
    if (this.yfd) {
      this.Efd(e);
      this.Yso(e);
      this.Ifd(e);
    }
  }
  Ifd(e) {
    this.pfd += e;
    if (this.pfd > CHECKGAP) {
      this.pfd = 0;
      if (this.Tfd()) {
        this.Sfd();
      } else {
        this.vfd++;
        if (this.vfd > RETRYMAXCOUNT) {
          this.Mfd();
        }
      }
    }
  }
  Xso() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(364);
    e.FunctionMap.set(0, this.Wso);
    e.FunctionMap.set(1, this.jso);
    e.FunctionMap.set(2, this.Wso);
    e.IsEscViewTriggerCallBack = false;
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e, (e, i) => {
      this.Hso = i;
    });
  }
  Efd(e) {
    this.oUe += e;
    if (this.oUe > CHECKGAP && (this.oUe -= CHECKGAP, this.GetText(1).IsUIActiveSelf())) {
      this.Vso++;
      if (this.Vso >= ReconnectDefine_1.ellipsis.length) {
        this.Vso = 0;
      }
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ReconnectingInfo", ReconnectDefine_1.ellipsis[this.Vso]);
    }
  }
  Yso(e) {
    if (!(this.rbt < 0)) {
      this.rbt -= e;
      if (this.rbt < 0) {
        this.GetItem(0).SetUIActive(true);
      }
    }
  }
  Tfd() {
    return !!Platform_1.Platform.IsPs5Platform() && !!PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().IsPlatformNetworkReachable();
  }
}
exports.PlayStationNetWorkMaskView = PlayStationNetWorkMaskView;
//# sourceMappingURL=PlayStationNetWorkMaskView.js.map