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
const UiModel_1 = require("../../Ui/UiModel");
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleViewActiveSequenceFinish, this.elf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNewPhoneMsgNeedShowTips, this.elf);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleViewActiveSequenceFinish, this.elf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNewPhoneMsgNeedShowTips, this.elf);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15174, PhoneMsgController.ilf);
    Net_1.Net.Register(15808, PhoneMsgController.rlf);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15174);
    Net_1.Net.UnRegister(15808);
  }
  static OpenPhoneMsgTipView() {
    var e = ModelManager_1.ModelManager.PhoneMsgModel.CurrentToBeNotifiedMsgArray;
    if (ModelManager_1.ModelManager.PhoneMsgModel.IsChatShowInitDone) {
      for (const a of e) {
        var n = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(a);
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
              var r = {
                ShortMessage: n,
                NeedShowTips: true,
                OpenWay: 6,
                ViewType: 2
              };
              UiManager_1.UiManager.OpenView("PhoneMsgPanelViewSmall", r);
              break;
            case 4:
              r = {
                ShortMessage: n,
                NeedShowTips: false,
                OpenWay: 6,
                ViewType: 2
              };
              UiManager_1.UiManager.OpenView("PhoneMsgPanelViewSmall", r);
          }
        }
      }
      e.length = 0;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhoneSystem", 43, "聊天气泡&背景未初始化完成，不能弹出短信弹窗提示");
    }
  }
  static TopPanelCheckAndPlayPhoneSequence() {
    var e = UiManager_1.UiManager.GetViewByName("BattleView");
    if ((e &&= e.OpenParam) && (e = e.GetTopPanelPhoneMsgButton()) && ModelManager_1.ModelManager.PhoneMsgModel.CurrentToBeNotifiedMsgInSmallHeadQueue.length !== 0) {
      e.CheckAndPlayPhoneSequence();
    }
  }
  static TopPanelCheckAndPopHead(e) {
    var n;
    var r = UiManager_1.UiManager.GetViewByName("BattleView");
    if ((r &&= r.OpenParam) && r.GetTopPanelPhoneMsgButton() && ((n = (r = ModelManager_1.ModelManager.PhoneMsgModel.CurrentToBeNotifiedMsgInSmallHeadQueue).indexOf(e)) !== -1 && r.splice(n, 1), e === ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead)) {
      ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead = 0;
    }
  }
  static RequestAllMsg() {
    var e = new Protocol_1.Aki.Protocol.laf();
    Net_1.Net.Call(29273, e, e => {
      if (e && e.Taf) {
        ModelManager_1.ModelManager.PhoneMsgModel.InitChatShow(e.Raf, e.Laf, e.baf, e.waf);
        ModelManager_1.ModelManager.PhoneMsgModel.AddMessages(e.Taf, undefined, false);
      }
    });
  }
  static async SetOneMessageAsReadAsync(e) {
    var n = ModelManager_1.ModelManager.PhoneMsgModel.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (n) {
      if (n.IsRead) {
        return true;
      }
      var r = new Protocol_1.Aki.Protocol.uaf();
      r.v9n = e;
      var r = await Net_1.Net.CallAsync(17137, r);
      if (r) {
        if (r.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          n.IsRead = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgSetAsRead, e);
          return true;
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.G9n, 18371);
      }
    }
    return false;
  }
  static async ShortMessageReplyAsync(e, n, r) {
    var a = new Protocol_1.Aki.Protocol.daf();
    a.v9n = e;
    a.Paf = n;
    a.Aaf = r;
    var a = await Net_1.Net.CallAsync(28486, a);
    if (a) {
      if (a.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.PhoneMsgModel.SetShortMsgOptionData(e, n, r);
        return true;
      }
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.G9n, 22793);
    }
    return false;
  }
  static async ShortMessageReceiveAsync(e) {
    var n = ModelManager_1.ModelManager.PhoneMsgModel.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (n) {
      var r = new Protocol_1.Aki.Protocol.daf();
      r.v9n = e;
      var r = await Net_1.Net.CallAsync(28757, r);
      if (r) {
        if (r.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          n.IsReceived = true;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgSetReceived, e);
          return true;
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(r.G9n, 22793);
      }
    }
    return false;
  }
  static async UpdateProgressOfOneMessageAsync(e, n, r) {
    var n = ModelManager_1.ModelManager.PhoneMsgModel.CoverReadIndexToServerProgress(n);
    var a = ModelManager_1.ModelManager.PhoneMsgModel.GetPhoneMsgShortMsgDataByShortMsgId(e);
    if (a) {
      var t = new Protocol_1.Aki.Protocol.paf();
      t.v9n = e;
      t.Eaf = n;
      t.CM_ = r;
      var t = await Net_1.Net.CallAsync(18079, t);
      if (t) {
        if (t.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          a.LatestProgress = n;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgReadProgressUpdate, e, n, r);
          return true;
        }
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.G9n, 22229);
      }
    }
    return false;
  }
  static SendChangeChatDialogAndBgRequest(n, r) {
    var e = new Protocol_1.Aki.Protocol.Saf();
    e.Raf = n;
    e.Laf = r;
    Net_1.Net.Call(23526, e, e => {
      if (e) {
        if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatDialogId = n;
          ModelManager_1.ModelManager.PhoneMsgModel.CurrentUsingChatBgId = r;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhoneMsgChatShowChange);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 25207);
        }
      }
    });
  }
  static OpenAttachmentImgView(e) {
    var a = PhoneMessageAttachmentById_1.configPhoneMessageAttachmentById.GetConfig(e);
    if (a && a.AttachmentPath) {
      var t;
      var o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1;
      let r = a.AttachmentPathMaleVariant;
      switch (a.Type) {
        case "Image":
          ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentShowAttachmentType("Image");
          r = r && o ? a.AttachmentPathMaleVariant : a.AttachmentPath;
          ModelManager_1.ModelManager.InfoDisplayModel.SetCurrentOpenInformationTexture(r);
          break;
        case "Spine":
          {
            let e = "";
            let n = "";
            if (r) {
              r = o ? a.AttachmentPathMaleVariant : a.AttachmentPath;
              t = o ? "nan" : "nv";
              [e, n] = a.AttachmentPath.split(",");
              ModelManager_1.ModelManager.InfoDisplayModel.SetAnimName(t);
            } else {
              [e, n] = a.AttachmentPath.split(",");
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
            Log_1.Log.Error("PhoneSystem", 43, `尚未支持附件类型为 ${a.Type},的放大功能。 附件Id: ${e}`);
          }
          return;
        default:
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("PhoneSystem", 43, `未知的附件类型 ${a.Type}, 附件Id: ${e}`);
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
  var r = ModelManager_1.ModelManager.PhoneMsgModel.CurrentShowingMsgIdInSmallHead;
  let a = {
    ShortMessage: undefined,
    NeedShowTips: false,
    OpenWay: e,
    ViewType: n
  };
  if (r !== 0) {
    r = ConfigManager_1.ConfigManager.PhoneMsgConfig.GetPhoneMsgConfig(r);
    a = {
      ShortMessage: r,
      NeedShowTips: false,
      OpenWay: e,
      ViewType: n
    };
  }
  UiManager_1.UiManager.OpenView("PhoneMsgPanelViewBig", a);
};
PhoneMsgController.ilf = e => {
  if (e) {
    ModelManager_1.ModelManager.PhoneMsgModel.OnPhoneMsgUpdateNotify(e);
  }
};
PhoneMsgController.elf = () => {
  var e = UiModel_1.UiModel.NormalStack.Peek();
  if (e && e.Info.Name === "BattleView") {
    _a.TopPanelCheckAndPlayPhoneSequence();
    _a.OpenPhoneMsgTipView();
  }
};
PhoneMsgController.rlf = e => {
  if (e) {
    ModelManager_1.ModelManager.PhoneMsgModel.OnPhoneMsgDialogAndBgAddNotify(e);
  }
};
PhoneMsgController.nye = () => {
  _a.RequestAllMsg();
}; //# sourceMappingURL=PhoneMsgController.js.map