"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalOptionController = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ChatController_1 = require("../../Chat/ChatController");
const CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const FriendController_1 = require("../../Friend/FriendController");
const ReportController_1 = require("../../Report/ReportController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const PersonalDefine_1 = require("./PersonalDefine");
class PersonalOptionController extends UiControllerBase_1.UiControllerBase {
  static InitOptionMap() {
    this.v5i.set(1, this.M5i);
    this.v5i.set(2, this.M5i);
    this.v5i.set(3, this.E5i);
    this.v5i.set(4, this.qHe);
    this.v5i.set(5, this.S5i);
    this.v5i.set(11, this.z7t);
    this.v5i.set(6, this.y5i);
    this.v5i.set(7, this.I5i);
    this.v5i.set(8, this.W0);
    this.v5i.set(9, this.T5i);
    this.v5i.set(10, this.L5i);
    this.v5i.set(12, this.D5i);
    this.v5i.set(13, this.R5i);
    this.v5i.set(14, this.Kac);
    this.v5i.set(15, this.BEd);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestLookCard, PersonalOptionController._Ef);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestReportPlayer, PersonalOptionController.uEf);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestChangePlayerRemark, PersonalOptionController.OXf);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestLookCard, PersonalOptionController._Ef);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestReportPlayer, PersonalOptionController.uEf);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestChangePlayerRemark, PersonalOptionController.OXf);
  }
  static GetOptionFunc(e) {
    if (this.v5i.size === 0) {
      this.InitOptionMap();
    }
    return this.v5i.get(e);
  }
  static GetPersonalData() {
    var e = new PersonalDefine_1.PersonalInfoData();
    var o = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
    if (o) {
      e.RoleShowList = o.RoleShowList;
      e.CardShowList = o.CardShowList;
      e.CurCardId = o.CurCard;
      e.Birthday = o.Birthday;
      e.IsBirthdayDisplay = o.IsBirthdayDisplay;
      e.CardDataList = o.CardUnlockList;
      e.Signature = o.Signature;
      e.HeadPhotoId = o.PlayerHeadPhoto;
      e.IsOtherData = true;
      e.Name = o.PlayerName;
      e.PlayerId = o.PlayerId;
      e.Level = o.PlayerLevel;
      e.WorldLevel = o.WorldLevel;
      e.CurPlayerTitleId = o.PlayerTitleId;
      e.CurPlayerTitleLevel = o.PlayerTitleStarLevel;
      e.Sex = o.PlayerSex;
      e.PsnUserId = o.GetSdkUserId();
      e.PsnOnlineId = o.GetSdkOnlineId();
    } else {
      o = ModelManager_1.ModelManager.OnlineModel.CachePlayerData.PlayerDetails;
      e.RoleShowList = o.MSs;
      e.CardShowList = o.SSs;
      e.CurCardId = o.ESs ?? undefined;
      e.Birthday = o.ZVn ?? 0;
      e.IsBirthdayDisplay = o.ySs ?? false;
      e.CardDataList = ModelManager_1.ModelManager.OnlineModel.CachePlayerData.CardUnlockList;
      e.Signature = o.zVn ?? "";
      e.HeadPhotoId = o.dSs ?? undefined;
      e.IsOtherData = true;
      e.Name = o.H8n ?? "";
      e.PlayerId = o.W5n ?? 0;
      e.Level = o.F6n ?? 0;
      e.WorldLevel = o.cSs ?? 0;
      e.PsnUserId = o.Jxa ?? undefined;
      e.PsnOnlineId = o.Qxa ?? undefined;
      e.CurPlayerTitleId = o.tnc ?? undefined;
      e.CurPlayerTitleLevel = o.inc ?? 0;
      e.Sex = o.v7n ?? 0;
    }
    return e;
  }
}
exports.PersonalOptionController = PersonalOptionController;
(_a = PersonalOptionController).v5i = new Map();
PersonalOptionController.M5i = () => {
  var e = (UiManager_1.UiManager.IsViewOpen("OnlineProcessView") ? ModelManager_1.ModelManager.OnlineModel : ModelManager_1.ModelManager.FriendModel).CachePlayerData;
  if (ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId)) {
    ChatController_1.ChatController.ChatMutePlayerRequest(e.PlayerId, false);
  } else {
    ChatController_1.ChatController.ChatMutePlayerRequest(e.PlayerId, true);
  }
};
PersonalOptionController.S5i = () => {
  var e = (UiManager_1.UiManager.IsViewOpen("OnlineProcessView") ? ModelManager_1.ModelManager.OnlineModel : ModelManager_1.ModelManager.FriendModel).CachePlayerData;
  ReportController_1.ReportController.OpenReportView(e, 2);
};
PersonalOptionController.qHe = () => {
  var e = ModelManager_1.ModelManager.FriendModel;
  const o = (UiManager_1.UiManager.IsViewOpen("OnlineProcessView") ? ModelManager_1.ModelManager.OnlineModel : e).CachePlayerData;
  if (!e.HasFriend(o.PlayerId)) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotOnFriendList");
    UiManager_1.UiManager.CloseView("FriendProcessView");
  }
  e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(56);
  e.SetTextArgs(o.PlayerName);
  e.FunctionMap.set(2, () => {
    FriendController_1.FriendController.RequestFriendDelete(o.PlayerId);
  });
  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
};
PersonalOptionController.E5i = () => {
  const e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
  var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(57);
  o.SetTextArgs(e.PlayerName);
  o.FunctionMap.set(2, () => {
    FriendController_1.FriendController.RequestBlockPlayer(e.PlayerId);
  });
  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
};
PersonalOptionController.z7t = () => {
  ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CopiedMyUid");
  UE.LGUIBPLibrary.ClipBoardCopy(ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString());
};
PersonalOptionController.y5i = () => {
  UiManager_1.UiManager.OpenView("PersonalEditView", 0);
};
PersonalOptionController.I5i = () => {
  UiManager_1.UiManager.OpenView("PersonalEditView", 1);
};
PersonalOptionController.Kac = () => {
  UiManager_1.UiManager.OpenView("PersonalEditView", 2);
};
PersonalOptionController.BEd = () => {
  UiManager_1.UiManager.OpenView("PersonalRootView", ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData());
  UiManager_1.UiManager.CloseView("PersonalOptionView");
};
PersonalOptionController.W0 = () => {
  CommonInputViewController_1.CommonInputViewController.OpenSetRoleNameInputView();
};
PersonalOptionController.T5i = () => {
  CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView();
};
PersonalOptionController.L5i = () => {
  if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10084)) {
    UiManager_1.UiManager.OpenView("PersonalBirthView");
  } else {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BirthdaySet_OpenCondition_Tips");
  }
};
PersonalOptionController.D5i = () => {
  const e = PersonalOptionController.GetPersonalData();
  if (UiManager_1.UiManager.IsViewOpen("FriendProcessView")) {
    UiManager_1.UiManager.CloseViewAsync("FriendProcessView").then(() => {
      UiManager_1.UiManager.OpenView("PersonalRootView", e);
    }, () => {});
  } else if (UiManager_1.UiManager.IsViewOpen("OnlineProcessView")) {
    UiManager_1.UiManager.CloseViewAsync("OnlineProcessView").then(() => {
      UiManager_1.UiManager.OpenView("PersonalRootView", e);
    }, () => {});
  } else {
    UiManager_1.UiManager.OpenView("PersonalRootView", e);
  }
};
PersonalOptionController.R5i = () => {
  CommonInputViewController_1.CommonInputViewController.OpenSetPlayerRemarkNameInputView();
};
PersonalOptionController._Ef = () => {
  _a.D5i();
};
PersonalOptionController.uEf = e => {
  _a.S5i();
};
PersonalOptionController.OXf = e => {
  ModelManager_1.ModelManager.FriendModel.SetCurrentOperationPlayerId(e);
  _a.R5i();
}; //# sourceMappingURL=PersonalOptionController.js.map