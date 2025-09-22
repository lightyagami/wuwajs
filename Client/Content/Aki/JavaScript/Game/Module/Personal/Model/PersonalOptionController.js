"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalOptionController = undefined;
const UE = require("ue");
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
    this.v5i.set(15, this.mSd);
  }
  static GetOptionFunc(e) {
    if (this.v5i.size === 0) {
      this.InitOptionMap();
    }
    return this.v5i.get(e);
  }
  static GetPersonalData() {
    var e = new PersonalDefine_1.PersonalInfoData();
    var r = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
    if (r) {
      e.RoleShowList = r.RoleShowList;
      e.CardShowList = r.CardShowList;
      e.CurCardId = r.CurCard;
      e.Birthday = r.Birthday;
      e.IsBirthdayDisplay = r.IsBirthdayDisplay;
      e.CardDataList = r.CardUnlockList;
      e.Signature = r.Signature;
      e.HeadPhotoId = r.PlayerHeadPhoto;
      e.IsOtherData = true;
      e.Name = r.PlayerName;
      e.PlayerId = r.PlayerId;
      e.Level = r.PlayerLevel;
      e.WorldLevel = r.WorldLevel;
      e.CurPlayerTitleId = r.PlayerTitleId;
      e.CurPlayerTitleLevel = r.PlayerTitleStarLevel;
      e.Sex = r.PlayerSex;
      e.PsnUserId = r.GetSdkUserId();
      e.PsnOnlineId = r.GetSdkOnlineId();
    } else {
      r = ModelManager_1.ModelManager.OnlineModel.CachePlayerData.PlayerDetails;
      e.RoleShowList = r.MSs;
      e.CardShowList = r.SSs;
      e.CurCardId = r.ESs ?? undefined;
      e.Birthday = r.ZVn ?? 0;
      e.IsBirthdayDisplay = r.ySs ?? false;
      e.CardDataList = ModelManager_1.ModelManager.OnlineModel.CachePlayerData.CardUnlockList;
      e.Signature = r.zVn ?? "";
      e.HeadPhotoId = r.dSs ?? undefined;
      e.IsOtherData = true;
      e.Name = r.H8n ?? "";
      e.PlayerId = r.W5n ?? 0;
      e.Level = r.F6n ?? 0;
      e.WorldLevel = r.cSs ?? 0;
      e.PsnUserId = r.Jxa ?? undefined;
      e.PsnOnlineId = r.Qxa ?? undefined;
      e.CurPlayerTitleId = r.tnc ?? undefined;
      e.CurPlayerTitleLevel = r.inc ?? 0;
      e.Sex = r.v7n ?? 0;
    }
    return e;
  }
}
(exports.PersonalOptionController = PersonalOptionController).v5i = new Map();
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
  const r = (UiManager_1.UiManager.IsViewOpen("OnlineProcessView") ? ModelManager_1.ModelManager.OnlineModel : e).CachePlayerData;
  if (!e.HasFriend(r.PlayerId)) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotOnFriendList");
    UiManager_1.UiManager.CloseView("FriendProcessView");
  }
  e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(56);
  e.SetTextArgs(r.PlayerName);
  e.FunctionMap.set(2, () => {
    FriendController_1.FriendController.RequestFriendDelete(r.PlayerId);
  });
  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
};
PersonalOptionController.E5i = () => {
  const e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
  var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(57);
  r.SetTextArgs(e.PlayerName);
  r.FunctionMap.set(2, () => {
    FriendController_1.FriendController.RequestBlockPlayer(e.PlayerId);
  });
  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
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
PersonalOptionController.mSd = () => {
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
}; //# sourceMappingURL=PersonalOptionController.js.map