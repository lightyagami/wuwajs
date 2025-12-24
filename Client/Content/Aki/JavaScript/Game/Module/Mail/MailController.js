"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MailController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ErrorCodeById_1 = require("../../../Core/Define/ConfigQuery/ErrorCodeById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class MailController extends UiControllerBase_1.UiControllerBase {
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("MailBoxView", MailController.CanOpenView, "MailController.CanOpenView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("EditFormationView", MailController.CanOpenView);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.dyi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestSelectMail, this.bbm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestPickMailAttachment, this.Rbm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestDeleteMail, this.wbm);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.dyi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestSelectMail, this.bbm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestPickMailAttachment, this.Rbm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestDeleteMail, this.wbm);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(24551, this.Cyi);
    Net_1.Net.Register(15551, this.gyi);
    Net_1.Net.Register(29086, this.fyi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(24551);
    Net_1.Net.UnRegister(15551);
    Net_1.Net.UnRegister(29086);
  }
  static SelectedMail(e) {
    if (e) {
      if (e.GetWasScanned()) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SelectedMail, e.Id, e.ConfigId);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchUnfinishedFlag);
      } else {
        this.RequestReadMail(e.Id, e.ConfigId);
      }
    }
  }
  static RequestReadMail(e, t) {
    var o = new Protocol_1.Aki.Protocol.Nss();
    o.s5n = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件控制器：RequestReadMail 未阅读邮件，申请阅读", ["mailId", e]);
    }
    Net_1.Net.Call(25715, Protocol_1.Aki.Protocol.Nss.create(o), e => {
      var o;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29158);
        } else if (o = ModelManager_1.ModelManager.MailModel.GetMailInstanceById(e.s5n)) {
          o.ReadTime = MathUtils_1.MathUtils.LongToNumber(e.ebs);
          o.ExpiryTime = MathUtils_1.MathUtils.LongToNumber(e.jb_);
          ModelManager_1.ModelManager.MailModel.SetMailStatusByStatusCode(e.Y4n, o);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Mail", 27, "邮件控制器：阅读选中，状态码", ["response.State", e.Y4n]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SelectedMail, e.s5n, t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchUnfinishedFlag);
        }
        o = Protocol_1.Aki.Protocol.Fss.encode(e).finish().slice().buffer;
        EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsOnReadMailResponse, o);
      }
    });
  }
  static RequestPickAttachment(e, t) {
    var o = new Protocol_1.Aki.Protocol.Vss();
    var a = CommonParamById_1.configCommonParamById.GetIntConfig("mail_take_limit");
    o.I7n = e.slice(0, a);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件控制器：RequestPickAttachment 申请领取附件", ["attachmentIds", o.I7n]);
    }
    Net_1.Net.Call(26940, Protocol_1.Aki.Protocol.Vss.create(o), o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          let e = "";
          switch (ErrorCodeById_1.configErrorCodeById.GetConfig(o.Q4n).Id) {
            case 10008:
            case 400012:
              e = "MailOverLimit";
              break;
            case 10000:
              e = "MailOutOfDate";
          }
          if (e !== "") {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(e);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 23247);
          }
        } else {
          ModelManager_1.ModelManager.MailModel.SetLastPickedAttachments(o.lbs, t);
        }
        o = Protocol_1.Aki.Protocol.$ss.encode(o).finish().slice().buffer;
        EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsOnPickMailAttachmentResponse, o, t);
      }
    });
  }
  static RequestDeleteMail(e) {
    var o = new Protocol_1.Aki.Protocol.Hss();
    o.I7n = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件控制器：RequestDeleteMail请求删除邮件", ["mailId", e]);
    }
    Net_1.Net.Call(27588, Protocol_1.Aki.Protocol.Hss.create(o), e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21470);
        } else if (e._bs.length > 0) {
          for (const o of e._bs) {
            ModelManager_1.ModelManager.MailModel.DeleteMail(o);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Mail", 27, "邮件控制器：删除邮件", ["邮件id", e._bs]);
          }
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MailDelete");
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DeletingMail, e._bs);
        }
        e = Protocol_1.Aki.Protocol.jss.encode(e).finish().slice().buffer;
        EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsOnDeleteMailResponse, e);
      }
    });
  }
}
exports.MailController = MailController;
(_a = MailController).CanOpenView = e => ModelManager_1.ModelManager.FunctionModel.IsOpen(10020);
MailController.Cyi = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Mail", 27, "邮件控制器：OnMailInfosNotify [Mail]6100 Mails response, length: ", ["response.MailInfos.length", e.sbs.length]);
  }
  for (const t of e.sbs) {
    if (ModelManager_1.ModelManager.MailModel.GetMailListLength() >= ModelManager_1.ModelManager.MailModel.GetMailCapacity() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Mail", 27, "[MailError]MailBox is fulfilled");
    }
    var o = new Protocol_1.Aki.Protocol.L5s(t);
    ModelManager_1.ModelManager.MailModel.AddMail(o, false);
  }
  ModelManager_1.ModelManager.MailModel.ReloadMailList();
  ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap();
  _a.dyi();
};
MailController.gyi = e => {
  if (Log_1.Log.CheckDebug()) {
    Log_1.Log.Debug("Mail", 27, "[MailMessage]6100:MailDeleteNotify");
  }
  var o = e.s5n;
  ModelManager_1.ModelManager.MailModel.DeleteMail(o);
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Mail", 27, "邮件控制器：OnMailDeleteNotify A mail was deleted, id: ", ["deletingMailId", o]);
  }
  if (UiManager_1.UiManager.IsViewShow("MailContentView")) {
    UiManager_1.UiManager.CloseView("MailContentView");
  }
  if (e.x9n === Protocol_1.Aki.Protocol.I5s.Proto_PublicCancelled) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MailRecall");
  } else {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("MailDelete");
  }
  ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap();
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DeletingMailPassively);
};
MailController.fyi = e => {
  var o;
  if (e.hbs !== undefined && e.hbs !== undefined) {
    if (ModelManager_1.ModelManager.MailModel.GetMailListLength() >= ModelManager_1.ModelManager.MailModel.GetMailCapacity() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Mail", 27, "邮件控制器：MailBox is fulfilled!");
    }
    o = new Protocol_1.Aki.Protocol.L5s(e.hbs);
    if (ModelManager_1.ModelManager.MailModel.GetMailInstanceById(o.s5n) !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Mail", 27, "邮件控制器：This mail exist! id: ", ["newMailInfo.Id", o.s5n]);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Mail", 27, "邮件控制器：OnMailAddNotify New mail added, id: ", ["newMailInfo.Id", o.s5n]);
      }
      ModelManager_1.ModelManager.MailModel.AddMail(o);
      ModelManager_1.ModelManager.MailModel.RefreshLocalNewMailMap();
      if (e.x9n === Protocol_1.Aki.Protocol.R5s.Proto_BagFull) {
        _a.dyi("BagOverLimit");
      } else {
        _a.dyi("NewMail");
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddingNewMail);
    }
  }
};
MailController.dyi = (e = "NewMail") => {
  var o;
  if (ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed) {
    if ((o = Time_1.Time.NowSeconds - ModelManager_1.ModelManager.MailModel.LastTimeShowNewMailTipsTime > ConfigManager_1.ConfigManager.CommonConfig.GetNewMailGap()) && ModelManager_1.ModelManager.MailModel.IfNeedShowNewMail()) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(e);
      ModelManager_1.ModelManager.MailModel.SaveShowNewMailMap();
      ModelManager_1.ModelManager.MailModel.LastTimeShowNewMailTipsTime = Time_1.Time.NowSeconds;
    } else if (!o && ModelManager_1.ModelManager.MailModel.IfNeedShowNewMail()) {
      ModelManager_1.ModelManager.MailModel.SaveShowNewMailMap();
    }
  }
};
MailController.bbm = (e, o) => {
  _a.SelectedMail(ModelManager_1.ModelManager.MailModel.GetMailInstanceById(e));
};
MailController.Rbm = (e, o) => {
  _a.RequestPickAttachment(e, o);
};
MailController.wbm = e => {
  _a.RequestDeleteMail(e);
}; //# sourceMappingURL=MailController.js.map