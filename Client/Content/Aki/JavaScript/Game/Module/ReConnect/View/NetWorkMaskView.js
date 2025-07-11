"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NetWorkMaskView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ReconnectDefine_1 = require("../ReconnectDefine");
class NetWorkMaskView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Vso = 0;
    this.oUe = 0;
    this.Hso = 0;
    this.rbt = 0;
    this.jso = () => {
      ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.NetWorkMaskViewBackBtn);
    };
    this.Wso = () => {};
    this.Kso = () => {
      UiManager_1.UiManager.CloseView("NetWorkMaskView");
    };
    this.Qso = () => {
      this.Xso();
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReConnectSuccess, this.Kso);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReConnectFail, this.Qso);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReConnectSuccess, this.Kso);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReConnectFail, this.Qso);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UISprite]];
  }
  OnStart() {
    this.oUe = 0;
    this.Vso = 0;
    var e = ModelManager_1.ModelManager.ReConnectModel.IsRpcEmpty();
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("network_mask_time");
    this.rbt = e ? 100 : i ?? 100;
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
  Yso(e) {
    if (!(this.rbt < 0) && !Net_1.Net.IsNotifyCallbackPaused()) {
      this.rbt -= e;
      if (this.rbt < 0 && (this.GetItem(0).SetUIActive(true), (e = ModelManager_1.ModelManager.ReConnectModel.GetUnResponsedRpcStr()).length > 0) && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Reconnect", 8, "网络遮罩超时, 打开断线重连界面", ["未响应的rpcId", e]);
      }
    }
  }
  OnTick(e) {
    this.oUe += e;
    if (this.oUe > 1000 && (this.oUe -= 1000, this.GetText(1).IsUIActiveSelf())) {
      this.Vso++;
      if (this.Vso >= ReconnectDefine_1.ellipsis.length) {
        this.Vso = 0;
      }
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ReconnectingInfo", ReconnectDefine_1.ellipsis[this.Vso]);
    }
    this.Yso(e);
  }
  Xso() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(30);
    e.FunctionMap.set(0, this.Wso);
    e.FunctionMap.set(1, this.jso);
    e.FunctionMap.set(2, this.Wso);
    e.IsEscViewTriggerCallBack = false;
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(e, (e, i) => {
      this.Hso = i;
    });
  }
}
exports.NetWorkMaskView = NetWorkMaskView;
//# sourceMappingURL=NetWorkMaskView.js.map