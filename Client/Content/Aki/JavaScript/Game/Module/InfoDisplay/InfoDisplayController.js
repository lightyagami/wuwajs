"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfoDisplayController = exports.INFO_DISPLAY_ITEM_TYPE = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
exports.INFO_DISPLAY_ITEM_TYPE = 12;
class InfoDisplayController extends ControllerBase_1.ControllerBase {
  static OpenInfoDisplay(e, o, r, n = false, i) {
    if (UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeOneView") || UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeTwoView") || UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeThreeView") || UiManager_1.UiManager.IsViewOpen("InfoDisplayTypeFourNewView")) {
      return false;
    }
    var a = CommonParamById_1.configCommonParamById.GetIntConfig("infodisplay_use_item_cd");
    if (InfoDisplayController.njt !== 0 && Time_1.Time.Now - InfoDisplayController.njt <= a * 1000) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("InDisplayCd");
      return false;
    }
    let t = undefined;
    ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationId(e);
    a = ConfigManager_1.ConfigManager.InfoDisplayModuleConfig.GetInfoDisplayType(e);
    if (a === 1) {
      t = "InfoDisplayTypeOneView";
    } else if (a === 2) {
      t = "InfoDisplayTypeTwoView";
    } else if (a === 3) {
      t = "InfoDisplayTypeThreeView";
    } else if (a === 4) {
      t = "InfoDisplayTypeFourNewView";
    }
    if (n) {
      UiManager_1.UiManager.OpenViewByPlot(t, r, o);
    } else if (i) {
      UiManager_1.UiManager.OpenViewWithLayer(t, i, undefined, o);
    } else {
      UiManager_1.UiManager.OpenView(t, undefined, o);
    }
    InfoDisplayController.njt = Time_1.Time.Now;
    return true;
  }
  static OpenInfoDisplayImgView() {
    UiManager_1.UiManager.OpenView("InfoDisplayImgView");
  }
  static OpenInfoDisplayAttachmentBigImgView() {
    UiManager_1.UiManager.OpenView("InfoDisplayAttachmentBigImgView");
  }
  static OnInit() {
    this.OnAddEvents();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.OnItemUse);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, this.OnItemUse);
  }
  static RequestReadDisplayInfo(e) {
    var o = new Protocol_1.Aki.Protocol.bos();
    o.T9n = e;
    Net_1.Net.Call(18925, o, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("InfoDisplay", 27, "协议接收", ["协议id", "10162"]);
      }
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23410);
      }
    });
  }
}
(exports.InfoDisplayController = InfoDisplayController).njt = 0;
InfoDisplayController.OnItemUse = (e, o) => {
  var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
  if (e.Parameters.size > 0 && (e = e.Parameters.get(exports.INFO_DISPLAY_ITEM_TYPE)) !== undefined && e !== 0) {
    InfoDisplayController.OpenInfoDisplay(e);
  }
}; //# sourceMappingURL=InfoDisplayController.js.map