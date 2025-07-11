"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatOption = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const FriendController_1 = require("../../Friend/FriendController");
const PersonalOptionController_1 = require("../../Personal/Model/PersonalOptionController");
const ReportController_1 = require("../../Report/ReportController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ChatController_1 = require("../ChatController");
class ChatOption extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.j8 = undefined;
    this.pSt = undefined;
    this.vSt = undefined;
    this.MSt = e => {
      if (e === this.j8) {
        this.ESt();
      }
    };
    this.SSt = () => {
      if (ModelManager_1.ModelManager.ChatModel.IsInMute(this.j8)) {
        ChatController_1.ChatController.ChatMutePlayerRequest(this.j8, false);
      } else {
        ChatController_1.ChatController.ChatMutePlayerRequest(this.j8, true);
      }
      UiManager_1.UiManager.CloseView("ChatOption");
    };
    this.ySt = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(57);
      e.SetTextArgs(this.pSt.PlayerName);
      e.FunctionMap.set(2, () => {
        FriendController_1.FriendController.RequestBlockPlayer(this.j8);
        UiManager_1.UiManager.CloseView("ChatOption");
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.ISt = () => {
      UiManager_1.UiManager.CloseView("ChatOption");
      var e = ModelManager_1.ModelManager.FriendModel.GetFriendById(this.j8);
      ReportController_1.ReportController.OpenReportView(e, 1);
    };
    this.uYa = () => {
      UiManager_1.UiManager.CloseView("ChatOption");
      UiManager_1.UiManager.CloseView("ChatView");
      var e = ModelManager_1.ModelManager.FriendModel;
      e.SelectedPlayerId = this.j8;
      e.ShowingView = "OnlineWorldHallView";
      var e = PersonalOptionController_1.PersonalOptionController.GetPersonalData();
      UiManager_1.UiManager.OpenView("PersonalRootView", e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.ySt], [4, this.ISt], [1, this.uYa]];
  }
  OnStart() {
    var e;
    this.vSt = new ChatOptionButton(this.GetItem(2));
    this.vSt.SetClickCallBack(this.SSt);
    this.j8 = this.OpenParam;
    this.pSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(this.j8);
    if (this.pSt) {
      e = this.GetText(0);
      LguiUtil_1.LguiUtil.SetLocalText(e, "OptionTitle", this.pSt.PlayerName);
      this.ESt();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddMutePlayer, this.MSt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveMutePlayer, this.MSt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddMutePlayer, this.MSt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveMutePlayer, this.MSt);
  }
  OnBeforeDestroy() {
    this.j8 = undefined;
    this.pSt = undefined;
  }
  ESt() {
    var e;
    if (ModelManager_1.ModelManager.ChatModel.IsInMute(this.j8)) {
      e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("CancelMuteText");
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
      this.vSt.RefreshButtonText(e);
    } else {
      e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("MuteText");
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
      this.vSt.RefreshButtonText(e);
    }
  }
}
exports.ChatOption = ChatOption;
class ChatOptionButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.rMt = undefined;
    this.nqe = () => {
      if (this.rMt) {
        this.rMt();
      }
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  RefreshButtonText(e) {
    this.GetText(1).SetText(e);
  }
  SetClickCallBack(e) {
    this.rMt = e;
  }
}
//# sourceMappingURL=ChatOption.js.map