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
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.dyi);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15284, this.Cyi);
    Net_1.Net.Register(17155, this.gyi);
    Net_1.Net.Register(18895, this.fyi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15284);
    Net_1.Net.UnRegister(17155);
    Net_1.Net.UnRegister(18895);
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
  static RequestReadMail(e, a) {
    var o = new Protocol_1.Aki.Protocol.Nss();
    o.s5n = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件控制器：RequestReadMail 未阅读邮件，申请阅读", ["mailId", e]);
    }
    Net_1.Net.Call(25740, Protocol_1.Aki.Protocol.Nss.create(o), e => {
      var o;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29972);
        } else if (o = ModelManager_1.ModelManager.MailModel.GetMailInstanceById(e.s5n)) {
          o.ReadTime = MathUtils_1.MathUtils.LongToNumber(e.ebs);
          o.ExpiryTime = MathUtils_1.MathUtils.LongToNumber(e.jb_);
          ModelManager_1.ModelManager.MailModel.SetMailStatusByStatusCode(e.Y4n, o);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Mail", 27, "邮件控制器：阅读选中，状态码", ["response.State", e.Y4n]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SelectedMail, e.s5n, a);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchUnfinishedFlag);
        }
      }
    });
  }
  static RequestPickAttachment(e, a) {
    var o = new Protocol_1.Aki.Protocol.Vss();
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("mail_take_limit");
    o.I7n = e.slice(0, t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件控制器：RequestPickAttachment 申请领取附件", ["attachmentIds", o.I7n]);
    }
    Net_1.Net.Call(22960, Protocol_1.Aki.Protocol.Vss.create(o), o => {
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
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 26324);
          }
        } else {
          ModelManager_1.ModelManager.MailModel.SetLastPickedAttachments(o.lbs, a);
        }
      }
    });
  }
  static RequestDeleteMail(e) {
    var o = new Protocol_1.Aki.Protocol.Hss();
    o.I7n = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Mail", 27, "邮件控制器：RequestDeleteMail请求删除邮件", ["mailId", e]);
    }
    Net_1.Net.Call(20329, Protocol_1.Aki.Protocol.Hss.create(o), e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21769);
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
  for (const a of e.sbs) {
    if (ModelManager_1.ModelManager.MailModel.GetMailListLength() >= ModelManager_1.ModelManager.MailModel.GetMailCapacity() && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Mail", 27, "[MailError]MailBox is fulfilled");
    }
    var o = new Protocol_1.Aki.Protocol.L5s(a);
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
}; //# sourceMappingURL=MailController.js.map