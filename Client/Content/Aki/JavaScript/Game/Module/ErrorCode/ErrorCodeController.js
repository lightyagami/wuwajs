"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCodeController = undefined;
const Cpp = require("cpp");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const PublicUtil_1 = require("../../Common/PublicUtil");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const LoginModel_1 = require("../Login/LoginModel");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class MessageDecodeData extends LogReportDefine_1.CommonLogData {
  constructor() {
    super();
    this.event_id = "1022";
    this.i_kcp_conv = 0;
    this.i_seq_no = 0;
    this.i_message_id = 0;
    this.i_crc = 0;
    this.i_error_code = 0;
    this.s_channel_id = "";
    this.s_client_ip = "";
    this.s_before_hexdump = "";
    this.s_after_hexdump = "";
  }
}
class ErrorCodeController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    Net_1.Net.SetExceptionHandle(ErrorCodeController.X5t);
    Cpp.FKuroPuertsBridget.RegisterSeriousErrorCallback(this.OpenConfirmBoxByText);
    return true;
  }
  static OnClear() {
    Cpp.FKuroPuertsBridget.RegisterSeriousErrorCallback(this.OpenConfirmBoxByText);
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19961, this.$5t);
    Net_1.Net.Register(29714, this.Y5t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19961);
    Net_1.Net.UnRegister(29714);
  }
  static OpenErrorCodeScrollingTipsView(r, o) {
    var e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(r);
    if (r === Protocol_1.Aki.Protocol.Q4n.Proto_PropRewardTips) {
      r = o[0];
      o[0] = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexLocalName(Number(r));
    }
    var r = ErrorCodeController.J5t(e, o);
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(r);
    if (Info_1.Info.IsBuildDevelopmentOrDebug && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ErrorCode", 10, "服务器错误信息", ["error", r], ["errorParams", o]);
    }
  }
  static OpenErrorCodeTipView(o, e, t = undefined, i = true, n = true) {
    if (o !== Protocol_1.Aki.Protocol.Q4n.Proto_ErrorBanInteractEntity) {
      var l = ConfigManager_1.ConfigManager.ErrorCodeConfig;
      var C = l.GetTextByErrorId(o);
      let r = ErrorCodeController.J5t(C, t);
      C = l.IsTipsOnly(o);
      l = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault(LoginModel_1.STREAM) === LoginModel_1.STREAM_MAINLINE;
      if (i && ErrorCodeController.IsErrorCodeOpen) {
        if (C && !l) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [r]);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("ErrorCode", 8, "服务器错误信息", ["error", r], ["errorCode", o], ["errorParams", t]);
          }
          return;
        }
        if (n) {
          r = e > 0 ? `[${e}][${o}]:${r}` : `[-][${o}]:${r}`;
        }
        this.OpenConfirmBoxByText(r);
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ErrorCode", 8, "服务器错误信息", ["error", r], ["errorParams", t]);
      }
    }
  }
  static LogOnlyErrorCode(r, o = undefined) {
    var e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(r);
    var r = `[${r}]:${ErrorCodeController.J5t(e, o)}`;
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ErrorCode", 8, "服务器错误信息", ["error", r], ["errorParams", o]);
    }
  }
  static J5t(r, o) {
    let e = r;
    if (o) {
      for (let r = 0; r < o.length; r++) {
        var t = o[r];
        var i = `{${r}}`;
        e = e.split(i).join(t);
      }
    }
    return e;
  }
  static OpenLoginStatusCodeTipView(r) {
    if (ErrorCodeController.IsErrorCodeOpen) {
      this.OpenErrorCodeTipView(r, 0);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ErrorCode", 8, "Http登录返回错误码", ["code", r]);
    }
  }
  static OpenConfirmBoxByTextId(r) {
    var o;
    if (ErrorCodeController.IsErrorCodeOpen) {
      r = ConfigManager_1.ConfigManager.TextConfig.GetTextById(r);
      (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33)).SetTextArgs(r);
      o.NotAddChildToTopStackView = true;
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
    }
  }
  static CheckErrorCode(r, o, e = true) {
    return !r || r.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && (Log_1.Log.CheckInfo() && Log_1.Log.Info("ErrorCode", 69, "CheckErrorCode", ["ErrorCode", r.Q4n], ["MsgId", o]), e && this.OpenErrorCodeTipView(r.Q4n, o), true);
  }
}
exports.ErrorCodeController = ErrorCodeController;
(_a = ErrorCodeController).IsErrorCodeOpen = true;
ErrorCodeController.$5t = r => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Net", 30, "服务端通知客户端消息解码失败:", ["notify", r]);
  }
  var o = new MessageDecodeData();
  o.s_channel_id = r.VVn;
  o.i_kcp_conv = r.Dbs;
  o.i_error_code = r.Cvs;
  o.i_seq_no = r.Abs;
  o.s_client_ip = PublicUtil_1.PublicUtil.GetLocalHost();
  [o.i_message_id, o.i_crc, o.s_before_hexdump, o.s_after_hexdump] = Net_1.Net.GetCachedMessageData(r.Abs);
  LogReportController_1.LogReportController.LogReport(o);
};
ErrorCodeController.Y5t = r => {
  var o = r.lvs;
  var r = r.Q4n;
  ErrorCodeController.OpenErrorCodeScrollingTipsView(r, o);
};
ErrorCodeController.X5t = (r, o, e, t, i) => {
  if (o === Protocol_1.Aki.Protocol.Q4n.Proto_MsgFunctionClose) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("FunctionClose"));
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ErrorCode", 37, "服务器异常: 功能关闭", ["errorCode", o], ["RpcId", r], ["msgId", e], ["message", t], ["errorMessage", i]);
    }
  } else {
    if (!Info_1.Info.IsBuildShipping) {
      _a.OpenErrorCodeTipView(o, e);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ErrorCode", 8, "服务器异常", ["errorCode", o], ["RpcId", r], ["msgId", e], ["message", t], ["errorMessage", i]);
    }
  }
};
ErrorCodeController.OpenConfirmBoxByText = r => {
  var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33);
  o.SetTextArgs(r);
  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
}; //# sourceMappingURL=ErrorCodeController.js.map