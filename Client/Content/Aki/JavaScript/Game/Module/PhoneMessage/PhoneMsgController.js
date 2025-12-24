"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneMsgController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const PhoneMessageAttachmentById_1 = require("../../../Core/Define/ConfigQuery/PhoneMessageAttachmentById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
class PhoneMsgController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    InputManager_1.InputManager.RegisterOpenViewFunc("PhoneMsgPanelViewBig", PhoneMsgController.OpenPhoneMsgPanelViewBigByShortKey);
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleViewActiveSequenceFinish, this.Rsf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNewPhoneMsgNeedShowTips, this.Rsf);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleViewActiveSequenceFinish, this.Rsf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNewPhoneMsgNeedShowTips, this.Rsf);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28666, PhoneMsgController.Lsf);
    Net_1.Net.Register(27424, PhoneMsgController.Psf);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28666);
    Net_1.Net.UnRegister(27424);
  }
  static OpenPhoneMsgTipView() {
    var e = ModelManager_1.ModelManager.PhoneMsgModel.CurrentToBeNotifiedMsgArray;
    if (ModelManager_1.ModelManager.PhoneMsgModel.IsChatShowInitDone) {
      for (const r of e) {
        var n = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(r);
        if (n) {
          switch (n.TipType) {
            case 1:
              break;
            case 2:
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("PhoneSystem", 43, "短信弹窗提示类型B未已经弃用,请通知策划更改配置");
              }
              break;
            case 3:
              var a = {
                ShortMessage: n,
                NeedShowTips: true,
                OpenWay: 6,
                ViewType: 2
              };
              UiManager_1.UiManager.OpenView("PhoneMsgPanelViewSmall", a);
              break;
            case 4:
              a = {
                ShortMessage: n,
                NeedShowTips: false,
                OpenWay: 6,
                ViewType: 2
              };
              UiManager_1.UiManager.OpenView("PhoneMsgPanelViewSmall", a);
          }
        }
      }
      e.length = 0;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhoneSystem", 43, "聊天气泡&背景未初始化完成，不能弹出短信弹窗提示");
    }
  }
  static TopPanelCheckAndPlayPhoneSequence() {
    var e = UiManager_1.UiManager.GetViewByName("BattleView").OpenParam;
    if ((e &&= e.GetTopPanelPhoneMsgButton()) && ModelManager_1.ModelManager.PhoneMsgModel.CurrentToBeNotifiedMsgInSmallHeadQueue.length !== 0) {
      e.CheckAndPlayPhoneSequence();
    }
  }
  static TopPanelCheckAndPopHead(e) {
    var n;
    var a = UiManager_1.UiManager.GetViewByName("BattleView").OpenParam;
    if (a && a.GetTopPanelPhoneMsgButton() && ((n = (a = ModelManager_1.ModelManager.PhoneMsgModel.CurrentToBeNotifiedMsgInSmallHeadQueue).indexOf(e)) !== -1 && a.splice(n, 1), e === ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead)) {
      ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead = 0;
    }
  }
  static RequestAllMsg() {
    var e = new Protocol_1.Aki.Protocol.Hof();
    Net_1.Net.Call(27935, e, e => {
      if (e && e.nnf) {
        ModelManager_1.ModelManager.PhoneMsgModel.InitChatShow(e.anf, e.lnf, e.snf, e.hnf);
        ModelManager_1.ModelManager.PhoneMsgModel.AddMessages(e.nnf, undefined, false);
      }
    });
  }
  static async SetOneMessageAsReadAsync(e) {
    var n = ModelManager_1.ModelManager.PhoneMsgModel.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (n) {
      if (n.IsRead) {
        return true;
      }
      var a = new Protocol_1.Aki.Protocol.$of();
      a.v9n = e;
      var a = await Net_1.Net.CallAsync(27264, a);
      if (a) {
        if (a.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          n.IsRead = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgSetAsRead, e);
          return true;
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.G9n, 23939);
      }
    }
    return false;
  }
  static async ShortMessageReplyAsync(e, n, a) {
    var r = new Protocol_1.Aki.Protocol.Qof();
    r.v9n = e;
    r._nf = n;
    r.unf = a;
    var r = await Net_1.Net.CallAsync(16619, r);
    if (r) {
      if (r.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.PhoneMsgModel.SetShortMsgOptionData(e, n, a);
        return true;
      }
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.G9n, 24560);
    }
    return false;
  }
  static async ShortMessageReceiveAsync(e) {
    var n = ModelManager_1.ModelManager.PhoneMsgModel.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (n) {
      var a = new Protocol_1.Aki.Protocol.Qof();
      a.v9n = e;
      var a = await Net_1.Net.CallAsync(25055, a);
      if (a) {
        if (a.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          n.IsReceived = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgSetReceived, e);
          return true;
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.G9n, 24560);
      }
    }
    return false;
  }
  static async UpdateProgressOfOneMessageAsync(e, n, a) {
    var n = ModelManager_1.ModelManager.PhoneMsgModel.CoverReadIndexToServerProgress(n);
    var r = ModelManager_1.ModelManager.PhoneMsgModel.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (r) {
      var t = new Protocol_1.Aki.Protocol.Jof();
      t.v9n = e;
      t.rnf = n;
      t.CM_ = a;
      var t = await Net_1.Net.CallAsync(24899, t);
      if (t) {
        if (t.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          r.LatestProgress = n;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgReadProgressUpdate, e, n, a);
          return true;
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.G9n, 25745);
      }
    }
    return false;
  }
  static SendChangeChatDialogAndBgRequest(n, a) {
    var e = new Protocol_1.Aki.Protocol.tnf();
    e.anf = n;
    e.lnf = a;
    Net_1.Net.Call(26164, e, e => {
      if (e) {
        if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatDialogId = n;
          ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatBgId = a;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgChatShowChange);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 19104);
        }
      }
    });
  }
  static OpenAttachmentImgView(e) {
    var r = PhoneMessageAttachmentById_1.configPhoneMessageAttachmentById.GetConfig(e);
    if (r && r.AttachmentPath) {
      var t;
      var o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1;
      let a = r.AttachmentPathMaleVariant;
      switch (r.Type) {
        case "Image":
          ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentShowAttachmentType("Image");
          a = a && o ? r.AttachmentPathMaleVariant : r.AttachmentPath;
          ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(a);
          break;
        case "Spine":
          {
            let e = "";
            let n = "";
            if (a) {
              a = o ? r.AttachmentPathMaleVariant : r.AttachmentPath;
              t = o ? "nan" : "nv";
              [e, n] = r.AttachmentPath.split(",");
              ModelManager_1.ModelManager.InfoDisplayModel.SetAnimName(t);
            } else {
              [e, n] = r.AttachmentPath.split(",");
              ModelManager_1.ModelManager.InfoDisplayModel.SetAnimName("idle");
            }
            ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentShowSpineAtlasPath(e);
            ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentShowSpineDataPath(n);
            ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentShowAttachmentType("Spine");
            break;
          }
        case "Mp4":
          ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentShowAttachmentType("Mp4");
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhoneSystem", 43, `尚未支持附件类型为 ${r.Type},的放大功能。 附件Id: ${e}`);
          }
          return;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhoneSystem", 43, `未知的附件类型 ${r.Type}, 附件Id: ${e}`);
          }
          return;
      }
      ControllerHolder_1.ControllerHolder.InfoDisplayController.OpenInfoDisplayAttachmentBigImgView();
    }
  }
}
exports.PhoneMsgController = PhoneMsgController;
(_a = PhoneMsgController).OpenPhoneMsgPanelViewBigByShortKey = () => {
  if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10130)) {
    if (UiManager_1.UiManager.IsViewOpen("PhoneMsgPanelViewBig")) {
      UiManager_1.UiManager.CloseView("PhoneMsgPanelViewBig");
    } else {
      _a.OpenAndJumpShowTipShortMessage(4, 1);
    }
  }
};
PhoneMsgController.OpenAndJumpShowTipShortMessage = (e, n) => {
  var a = ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead;
  let r = {
    ShortMessage: undefined,
    NeedShowTips: false,
    OpenWay: e,
    ViewType: n
  };
  if (a !== 0) {
    a = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(a);
    r = {
      ShortMessage: a,
      NeedShowTips: false,
      OpenWay: e,
      ViewType: n
    };
  }
  UiManager_1.UiManager.OpenView("PhoneMsgPanelViewBig", r);
};
PhoneMsgController.Lsf = e => {
  if (e) {
    ModelManager_1.ModelManager.PhoneMsgModel.OnPhoneMsgUpdateNotify(e);
  }
};
PhoneMsgController.Rsf = () => {
  _a.TopPanelCheckAndPlayPhoneSequence();
  _a.OpenPhoneMsgTipView();
};
PhoneMsgController.Psf = e => {
  if (e) {
    ModelManager_1.ModelManager.PhoneMsgModel.OnPhoneMsgDialogAndBgAddNotify(e);
  }
};
PhoneMsgController.nye = () => {
  _a.RequestAllMsg();
}; //# sourceMappingURL=PhoneMsgController.js.map