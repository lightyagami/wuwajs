"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineProcessView = undefined;
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
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
class OnlineProcessView extends UiViewBase_1.UiViewBase {
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
    this.Byt = e => {
      this.j8t.GetRootItem().SetUIActive(false);
      this.W8t.GetRootItem().SetUIActive(false);
      var t = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
      if (e === t?.PlayerId) {
        ModelManager_1.ModelManager.ChatModel.IsInMute(t.PlayerId);
      }
      this.RefreshMute();
    };
    this.Z8t = () => {
      UiManager_1.UiManager.CloseView("OnlineProcessView");
      ChatController_1.ChatController.OpenFriendChat(ModelManager_1.ModelManager.OnlineModel.CachePlayerData.PlayerId);
    };
    this.e9t = () => {
      if (ModelManager_1.ModelManager.OnlineModel.CachePlayerData) {
        this.t9t();
      } else {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIGridLayout], [11, UE.UIText], [10, UE.UIText], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem], [15, UE.UITexture], [16, UE.UIItem], [17, UE.UITexture]];
    this.BtnBindInfo = [[6, this.Z8t]];
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(14).GetOwner());
  }
  OnStart() {
    this.g8t = new PlayerHeadItem_1.PlayerHeadItem(this.GetItem(0).GetOwner());
    this.GetText(4).SetText("");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "OnlineProcessTitle");
    this.i9t();
    this.t9t();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateFriendViewShow, this.e9t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddMutePlayer, this.Byt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRemoveMutePlayer, this.Byt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateFriendViewShow, this.e9t);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddMutePlayer, this.Byt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRemoveMutePlayer, this.Byt);
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
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
    ModelManager_1.ModelManager.FriendModel.SelectedPlayerId = e.PlayerId;
    ModelManager_1.ModelManager.FriendModel.SetCurrentOperationPlayerId(e.PlayerId);
    this.w8t();
    this.g8t.RefreshByHeadPhotoId(e.HeadId);
    this.GetText(5).SetText(e.Level.toString());
    this.Byt(e.PlayerId);
  }
  RefreshMute() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
    var e = ModelManager_1.ModelManager.ChatModel.IsInMute(e.PlayerId);
    this.GetItem(8).SetUIActive(e);
  }
  P5e() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
    var t = ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId);
    var i = this.GetText(2);
    if (t && (t = ModelManager_1.ModelManager.FriendModel.GetFriendById(e.PlayerId)?.FriendRemark) !== undefined && t !== "") {
      i.SetText(`(${t})`);
      i.useChangeColor = true;
    } else {
      i.SetText(e?.Name);
      i.useChangeColor = false;
    }
  }
  r9t() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData?.Signature;
    var t = this.GetText(11);
    if (e && e !== "") {
      t.SetText(e);
    } else {
      t.SetText("");
    }
  }
  Nxa() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData?.PlayerDetails.Jxa !== "";
      this.GetItem(12)?.SetUIActive(e);
      this.GetTexture(15)?.SetUIActive(e);
      this.GetItem(16)?.SetUIActive(!e);
      if (e) {
        e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData.PlayerDetails.Qxa;
        this.GetText(13)?.SetText(e);
      }
    } else {
      this.GetItem(12)?.SetUIActive(false);
      this.GetTexture(15)?.SetUIActive(false);
      this.GetItem(16)?.SetUIActive(false);
    }
  }
  Gac() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
    this.gLt?.Refresh(e?.PlayerTitleId, e?.PlayerTitleStarLevel, e?.Sex);
  }
  Arg() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
    if (e &&= BackgroundCardById_1.configBackgroundCardById.GetConfig(e.CurUsingCardId, false)) {
      this.SetTextureByPath(e.FunctionViewCardPath, this.GetTexture(17));
    }
  }
  w8t() {
    var e = ModelManager_1.ModelManager.OnlineModel.CachePlayerData;
    this.P5e();
    this.r9t();
    this.Nxa();
    this.Gac();
    this.Arg();
    var e = ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId);
    this.Y8t.GetRootItem().SetUIActive(e);
    this.W8t.GetRootItem().SetUIActive(false);
    this.X8t.GetRootItem().SetUIActive(true);
    this.K8t.GetRootItem().SetUIActive(false);
    this.Q8t.GetRootItem().SetUIActive(e);
    this.GetButton(6).RootUIComp.SetUIActive(e);
    this.$8t?.SetActive(true);
  }
  OnBeforeDestroy() {
    if (this.H8t) {
      this.H8t.ClearChildren();
      this.H8t = undefined;
    }
  }
}
exports.OnlineProcessView = OnlineProcessView;
//# sourceMappingURL=OnlineProcessView.js.map