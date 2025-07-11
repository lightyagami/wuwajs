"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendProcessView = undefined;
const UE = require("ue");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ChatController_1 = require("../../Chat/ChatController");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const PersonalOptionItem_1 = require("../../Personal/View/PersonalOptionItem");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FriendController_1 = require("../FriendController");
class FriendProcessView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.H8t = undefined;
    this.j8t = undefined;
    this.W8t = undefined;
    this.K8t = undefined;
    this.Q8t = undefined;
    this.X8t = undefined;
    this.$8t = undefined;
    this.Y8t = undefined;
    this.g8t = undefined;
    this.gLt = undefined;
    this.J8t = (e, t, i) => {
      t = new PersonalOptionItem_1.PersonalOptionItem(t);
      t.Refresh(e, false, i);
      if (e === 1) {
        this.j8t = t;
      } else if (e === 2) {
        this.W8t = t;
      } else if (e === 3) {
        this.K8t = t;
      } else if (e === 4) {
        this.Q8t = t;
      } else if (e === 5) {
        this.X8t = t;
      } else if (e === 12) {
        this.$8t = t;
      } else if (e === 13) {
        this.Y8t = t;
      }
      return {
        Key: i,
        Value: t
      };
    };
    this.z8t = () => {
      var e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
      if (ModelManager_1.ModelManager.FriendModel.HasBlockedPlayer(e.PlayerId)) {
        this.K8t.GetRootItem().SetUIActive(false);
      } else {
        this.K8t.GetRootItem().SetUIActive(true);
      }
    };
    this.Byt = e => {
      this.j8t.GetRootItem().SetUIActive(false);
      this.W8t.GetRootItem().SetUIActive(false);
      var t = ModelManager_1.ModelManager.FriendModel.ShowingView;
      if (t === "FriendView" || t === "FriendSearchView") {
        if (e === (t = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance())?.PlayerId) {
          (ModelManager_1.ModelManager.ChatModel.IsInMute(t.PlayerId) ? this.j8t : this.W8t).GetRootItem().SetUIActive(true);
        }
      }
      this.RefreshMute();
    };
    this.Z8t = () => {
      var e = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
      if (e) {
        UiManager_1.UiManager.CloseView("FriendProcessView");
        if (UiManager_1.UiManager.IsViewShow("FriendSearchView")) {
          UiManager_1.UiManager.CloseView("FriendSearchView");
        }
        ChatController_1.ChatController.OpenFriendChat(e.PlayerId);
      }
    };
    this.e9t = () => {
      if (ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance()) {
        this.t9t();
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIGridLayout], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UITexture], [16, UE.UIItem]];
    this.BtnBindInfo = [[6, this.Z8t]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateFriendViewShow, this.e9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddMutePlayer, this.Byt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveMutePlayer, this.Byt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateBlackListShow, this.z8t);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateFriendViewShow, this.e9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddMutePlayer, this.Byt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveMutePlayer, this.Byt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateBlackListShow, this.z8t);
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(14).GetOwner());
  }
  OnStart() {
    this.g8t = new PlayerHeadItem_1.PlayerHeadItem(this.GetItem(0).GetOwner());
    this.GetText(4).SetText("");
    this.i9t();
    var e = ModelManager_1.ModelManager.FriendModel;
    var t = e.GetSelectedPlayerOrItemInstance();
    e.CachePlayerData = t;
    this.t9t();
  }
  i9t() {
    if (this.H8t) {
      this.H8t.ClearChildren();
    }
    this.H8t = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(9), this.J8t);
    this.H8t.RebuildLayoutByDataNew(this.o9t());
  }
  o9t() {
    var e = [];
    for (const t of ConfigManager_1.ConfigManager.FriendConfig.GetProcessViewFunctionList()) {
      if (t !== 12 || !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)) {
        e.push(t);
      }
    }
    return e;
  }
  t9t() {
    var e = ModelManager_1.ModelManager.FriendModel.CachePlayerData;
    this.w8t();
    this.g8t.RefreshByHeadPhotoId(e.PlayerHeadPhoto);
    this.GetText(5).SetText(e.PlayerLevel.toString());
    this.Byt(e.PlayerId);
    this.gLt.Refresh(e.PlayerTitleId, e.PlayerTitleStarLevel, e.PlayerSex);
  }
  RefreshMute() {
    var e = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance();
    var e = ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId);
    this.GetItem(8).SetUIActive(e);
  }
  P5e() {
    var e = ModelManager_1.ModelManager.FriendModel;
    var t = this.GetText(2);
    if (FriendController_1.FriendController.CheckRemarkIsValid(e.GetSelectedPlayerOrItemInstance().FriendRemark)) {
      t.SetText(`(${e.GetSelectedPlayerOrItemInstance().FriendRemark})`);
      t.useChangeColor = true;
    } else {
      t.SetText(e.GetSelectedPlayerOrItemInstance().PlayerName);
      t.useChangeColor = false;
    }
  }
  Nxa() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance().GetSdkUserId() !== "";
      this.GetItem(12)?.SetUIActive(true);
      this.GetTexture(15)?.SetUIActive(e);
      this.GetItem(16)?.SetUIActive(!e);
      if (e) {
        e = ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance().GetSdkOnlineId();
        this.GetText(13)?.SetText(e);
      } else {
        this.GetText(13)?.SetText("");
      }
    } else {
      this.GetItem(12)?.SetUIActive(false);
      this.GetTexture(15)?.SetUIActive(false);
      this.GetItem(16)?.SetUIActive(false);
    }
  }
  r9t() {
    var e = ModelManager_1.ModelManager.FriendModel;
    var t = e.GetSelectedPlayerOrItemInstance()?.Signature;
    var i = this.GetText(11);
    if (t && t !== "") {
      i.SetText(t);
    } else if (e.GetSelectedPlayerOrItemInstance()?.PlayerId !== ModelManager_1.ModelManager.FunctionModel.PlayerId) {
      i?.SetText("");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(i, "EmptySign");
    }
  }
  w8t() {
    var e = ModelManager_1.ModelManager.FriendModel;
    var t = e.FilterState;
    var i = e.ShowingView;
    this.P5e();
    this.r9t();
    this.Nxa();
    this.Y8t.GetRootItem().SetUIActive(e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId));
    this.W8t.GetRootItem().SetUIActive((i === "FriendView" || i === "FriendSearchView") && t === 1 || t === 2);
    this.X8t.GetRootItem().SetUIActive(true);
    if (i === "FriendView" || i === "FriendSearchView" || i === "FriendBlackListView") {
      this.z8t();
    }
    this.Q8t.GetRootItem().SetUIActive(e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId));
    this.GetButton(6).RootUIComp.SetUIActive(e.IsMyFriend(e.GetSelectedPlayerOrItemInstance().PlayerId));
    this.$8t?.SetActive(true);
  }
  OnBeforeDestroy() {
    if (this.H8t) {
      this.H8t.ClearChildren();
      this.H8t = undefined;
    }
  }
}
exports.FriendProcessView = FriendProcessView;
//# sourceMappingURL=FriendProcessView.js.map