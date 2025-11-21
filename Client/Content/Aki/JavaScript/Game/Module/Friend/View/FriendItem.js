"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ChatController_1 = require("../../Chat/ChatController");
const ButtonAndSpriteItem_1 = require("../../Common/Button/ButtonAndSpriteItem");
const ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const OnlineController_1 = require("../../Online/OnlineController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FriendController_1 = require("../FriendController");
const FriendModel_1 = require("../FriendModel");
class FunctionButtonInfo {
  constructor(e, t, i) {
    this.SpritePath = e;
    this.StateFunc = t;
    this.CallBack = i;
  }
}
class FriendItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e, t) {
    super();
    this.m8t = undefined;
    this.d8t = undefined;
    this.FriendInstanceId = 0;
    this.BelongView = undefined;
    this.C8t = undefined;
    this.g8t = undefined;
    this.gLt = undefined;
    this.Het = [];
    this.A8t = [];
    this.SLc = false;
    this.sOt = () => {
      if (this.f8t().PlayerIsOnline && this.p8t()) {
        OnlineController_1.OnlineController.ApplyJoinWorldRequest(this.f8t().PlayerId, Protocol_1.Aki.Protocol.J8s.Proto_LobbyJoin);
      }
    };
    this.v8t = () => ModelManager_1.ModelManager.FriendModel.IsMyFriend(this.f8t().PlayerId);
    this.M8t = () => this.BelongView === "FriendBlackListView";
    this.E8t = () => ModelManager_1.ModelManager.FriendModel.FilterState === 2 && this.BelongView === "FriendView" || this.BelongView === "FriendSearchView" && !!ModelManager_1.ModelManager.FriendModel.HasFriendApplication(this.f8t().PlayerId);
    this.S8t = () => !ModelManager_1.ModelManager.FriendModel.IsMyFriend(this.f8t().PlayerId) && !ModelManager_1.ModelManager.FriendModel.HasFriendApplication(this.f8t().PlayerId) && (this.BelongView === "FriendSearchView" || ModelManager_1.ModelManager.FriendModel.FilterState === 3 && this.BelongView === "FriendView");
    this.y8t = () => ModelManager_1.ModelManager.FriendModel.FilterState === 2 && this.BelongView === "FriendView" || this.BelongView === "FriendSearchView" && !!ModelManager_1.ModelManager.FriendModel.HasFriendApplication(this.f8t().PlayerId);
    this.I8t = () => {
      var e;
      if (!ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(this.FriendInstanceId)?.Debug) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Friend", 27, "点击拒绝添加好友");
        }
        if (e = this.f8t()) {
          this.C8t = [];
          this.C8t.push(e.PlayerId);
          FriendController_1.FriendController.RequestFriendApplyHandle(this.C8t, Protocol_1.Aki.Protocol.A6s.Proto_Reject);
        } else {
          FriendController_1.FriendController.LocalRemoveApplicationFriend(this.FriendInstanceId);
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendRequestOutOfDate");
        }
      }
    };
    this.T8t = () => {
      var e;
      var t = this.f8t();
      if (ModelManager_1.ModelManager.FriendModel.HasFriend(this.FriendInstanceId) && (FriendController_1.FriendController.LocalRemoveApplicationFriend(this.FriendInstanceId), t)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ApplicationHandled, 2, [t.PlayerId]);
      }
      if (!ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(this.FriendInstanceId)?.Debug) {
        if (t) {
          e = ModelManager_1.ModelManager.FriendModel.GetFriendListCount();
          if (ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(1) < e + 1) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendListFull");
          } else {
            this.C8t = [];
            this.C8t.push(t.PlayerId);
            FriendController_1.FriendController.RequestFriendApplyHandle(this.C8t, Protocol_1.Aki.Protocol.A6s.Proto_Approve);
          }
        } else {
          FriendController_1.FriendController.LocalRemoveApplicationFriend(this.FriendInstanceId);
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendRequestOutOfDate");
        }
      }
    };
    this.L8t = () => {
      if (!ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(this.FriendInstanceId)?.Debug) {
        let e = Protocol_1.Aki.Protocol.D6s.Proto_Search;
        if (this.BelongView === "FriendView" && ModelManager_1.ModelManager.FriendModel.FilterState === 3) {
          e = Protocol_1.Aki.Protocol.D6s.Proto_RecentlyTeam;
        }
        var t;
        var i = this.f8t();
        if (i) {
          t = ModelManager_1.ModelManager.FriendModel.GetFriendListCount();
          if (ConfigManager_1.ConfigManager.FriendConfig.GetFriendLimitByViewType(1) < t + 1) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendListFull");
          } else {
            FriendController_1.FriendController.RequestFriendApplyAddSend(i.PlayerId, e);
          }
        }
      }
    };
    this.D8t = () => {
      var e;
      if (!ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(this.FriendInstanceId)?.Debug) {
        if (e = this.f8t()) {
          FriendController_1.FriendController.RequestUnBlockPlayer(e.PlayerId);
        } else {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("IsNotBlockedPlayer");
        }
      }
    };
    this.Ize = () => {
      var e = this.f8t();
      if (e) {
        ChatController_1.ChatController.OpenFriendChat(e.PlayerId);
      }
    };
    this.R8t = () => {
      var e;
      if (!ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(this.FriendInstanceId)?.Debug) {
        if (e = this.f8t()) {
          e = e.PlayerId;
          ControllerHolder_1.ControllerHolder.FriendController.RequestPlayerCurrentDeactivationState(e, e => {
            if (e) {
              e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PlayerDeleteSelf");
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(9, undefined, undefined, [e]);
            } else {
              ModelManager_1.ModelManager.FriendModel.SelectedPlayerId = this.FriendInstanceId;
              ModelManager_1.ModelManager.FriendModel.SetCurrentOperationPlayerId(this.FriendInstanceId);
              ModelManager_1.ModelManager.FriendModel.ShowingView = this.BelongView;
              UiManager_1.UiManager.OpenView("FriendProcessView");
            }
          });
        } else {
          this.U8t();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFriendViewShow);
        }
      }
    };
    this.BelongView = e;
    ModelManager_1.ModelManager.FriendModel.ShowingView = this.BelongView;
    if (t) {
      this.CreateThenShowByActor(t.GetOwner());
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIText], [19, UE.UIItem], [20, UE.UIItem]];
    this.BtnBindInfo = [[12, this.R8t]];
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(20).GetOwner());
  }
  OnStart() {
    this.m8t = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(11));
    this.d8t = new TeamItem(this.GetItem(10));
    this.m8t.BindCallback(this.sOt);
    this.g8t = new PlayerHeadItem_1.PlayerHeadItem(this.GetItem(0).GetOwner());
    var t = [];
    t.push(this.GetItem(6));
    t.push(this.GetItem(7));
    t.push(this.GetItem(14));
    t.push(this.GetItem(15));
    t.push(this.GetItem(16));
    var i = t.length;
    for (let e = 0; e < i; e++) {
      this.Het.push(new ButtonAndSpriteItem_1.ButtonAndSpriteItem(t[e]));
    }
    this.A8t.push(new FunctionButtonInfo("SP_RefuseFriend", this.E8t, this.I8t));
    this.A8t.push(new FunctionButtonInfo("SP_RemoveFriend", this.M8t, this.D8t));
    this.A8t.push(new FunctionButtonInfo("SP_AddFriend", this.S8t, this.L8t));
    this.A8t.push(new FunctionButtonInfo("SP_AgreeFriend", this.y8t, this.T8t));
    this.A8t.push(new FunctionButtonInfo("SP_ChatFriend", this.v8t, this.Ize));
  }
  Refresh(e, t, i) {
    this.Xqe(e.Id);
    if (e.OperationType === 1) {
      this.P8t();
    } else if (e.OperationType === 2 || e.OperationType === 3) {
      this.x8t();
    }
  }
  RefreshMute() {
    var e = ModelManager_1.ModelManager.ChatModel.IsInMute(this.f8t().PlayerId);
    this.GetItem(1).SetUIActive(e);
  }
  Xqe(e) {
    this.FriendInstanceId = e;
    e = this.f8t();
    this.w8t();
    if (e) {
      this.g8t.RefreshByHeadPhotoId(e.PlayerHeadPhoto);
      this.GetText(3).SetText("Lv." + e.PlayerLevel.toString());
      if (this.SLc) {
        this.gLt?.GetRootItem().SetUIActive(false);
      } else {
        this.gLt?.Refresh(e.PlayerTitleId, e.PlayerTitleStarLevel, e.PlayerSex);
      }
    }
    this.B8t();
  }
  w8t() {
    this.RefreshMute();
    this._Ge();
    this.P5e();
    this.b8t();
    this.q8t();
    this.x8t();
    this.G8t();
    this.N8t();
    this.O8t();
    this.Nxa();
    this.sPa();
  }
  N8t() {
    this.GetText(9).SetText(this.f8t().Signature);
    this.GetItem(13).SetUIActive(this.f8t().Signature.length > 0);
  }
  O8t() {
    var e = this.f8t().CurCard;
    if (e > 0) {
      e = BackgroundCardById_1.configBackgroundCardById.GetConfig(e);
      this.SetTextureByPath(e.LongCardPath, this.GetTexture(8));
    }
  }
  G8t() {
    if (ModelManager_1.ModelManager.FriendModel.FilterState !== 3) {
      this.d8t.SetActive(false);
    } else {
      this.d8t.SetActive(true);
      this.d8t.RefreshView(this.f8t());
    }
  }
  k8t(e, t) {
    return !!t.StateFunc() && (e.RefreshSprite(t.SpritePath), e.BindCallback(t.CallBack), true);
  }
  x8t() {
    for (let e = 0; e < this.Het.length; e++) {
      var t = this.Het[e];
      var i = this.A8t[e];
      this.k8t(t, i);
      var i = i.StateFunc();
      t.GetRootItem().SetUIActive(i);
    }
  }
  q8t() {
    let e = false;
    if (this.BelongView === "FriendView" && (ModelManager_1.ModelManager.FriendModel.FilterState === 1 || ModelManager_1.ModelManager.FriendModel.FilterState === 3)) {
      e = true;
    }
    this.m8t.SetActive(e);
    if (e) {
      this.F8t();
    }
  }
  F8t() {
    this.m8t.RefreshEnable(this.f8t().PlayerIsOnline && this.p8t() && ModelManager_1.ModelManager.FunctionModel.IsOpen(10021));
  }
  b8t() {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)) {
      if (this.f8t().PlayerIsOnline) {
        if (this.p8t()) {
          this.m8t.RefreshText("FriendApplyJoin");
        } else {
          this.m8t.RefreshText("ApplyBtnDisable", this.f8t().WorldLevel - ModelManager_1.ModelManager.OnlineModel.EnterDiff);
        }
      } else {
        this.m8t.RefreshText("OfflineText");
      }
    } else {
      this.m8t.RefreshText("FriendOnlineDisable");
    }
  }
  p8t() {
    return ModelManager_1.ModelManager.OnlineModel.CanJoinOtherWorld(ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel, this.f8t().WorldLevel);
  }
  P5e() {
    var e = this.GetText(2);
    if (FriendController_1.FriendController.CheckRemarkIsValid(this.f8t()?.FriendRemark ?? "")) {
      e.SetText(`(${this.f8t().FriendRemark})`);
    } else {
      e.SetText(this.f8t()?.PlayerName ?? "");
    }
  }
  _Ge() {}
  B8t() {
    var e;
    var t = this.f8t().PlayerIsOnline;
    var i = this.GetText(5);
    if (this.BelongView === "FriendBlackListView") {
      i.SetText("");
    } else if (t) {
      LguiUtil_1.LguiUtil.SetLocalText(i, "FriendOnline");
    } else if ((e = this.f8t()).PlayerLastOfflineTime === 0) {
      i.SetText("");
    } else {
      e = FriendModel_1.FriendModel.GetOfflineStrAndGap(e.PlayerLastOfflineTime);
      LguiUtil_1.LguiUtil.SetLocalText(i, e[0], e[1]);
    }
    this.GetText(2).useChangeColor = !t;
    this.GetText(3).useChangeColor = !t;
    i.useChangeColor = !t;
    this.V8t();
  }
  V8t() {
    var e;
    var t = this.GetSprite(4);
    let i = true;
    let r = undefined;
    if (this.BelongView === "FriendBlackListView") {
      i = false;
    } else {
      r = this.f8t().PlayerIsOnline ? "SP_FriendOnline" : "SP_FriendOffline";
    }
    t.SetUIActive(i);
    if (r) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(r);
      this.SetSpriteByPath(e, t, false);
    }
  }
  f8t() {
    return ModelManager_1.ModelManager.FriendModel.GetSelectedPlayerOrItemInstance(this.FriendInstanceId, this.BelongView);
  }
  sPa() {
    if (!PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId() || this.f8t()?.GetSdkUserId() !== "") {
      this.GetItem(19)?.SetUIActive(false);
    } else {
      this.GetItem(19)?.SetUIActive(true);
    }
  }
  Nxa() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = this.f8t()?.GetSdkUserId() !== "";
      this.GetItem(17)?.SetUIActive(e);
      this.GetText(18)?.SetUIActive(e);
      if (e) {
        e = this.f8t()?.GetSdkOnlineId() ?? "";
        this.GetText(18)?.SetText(e);
      }
    } else {
      this.GetItem(17)?.SetUIActive(false);
      this.GetText(18)?.SetUIActive(false);
    }
  }
  U8t() {
    var e = ModelManager_1.ModelManager.FriendModel.FilterState;
    if (e === 1) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendDeleteEach");
    } else if (e === 2) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FriendRequestOutOfDate");
    }
  }
  P8t() {
    if (ModelManager_1.ModelManager.FriendModel.CurrentApplyFriendListHasPlayer(this.FriendInstanceId)) {
      this.x8t();
    }
  }
  SetIsInBlackList(e) {
    this.SLc = e;
  }
}
exports.FriendItem = FriendItem;
class TeamItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  RefreshView(e) {
    this.GetItem(1).SetUIActive(false);
    this.GetItem(2).SetUIActive(false);
    if (e.TeamMemberCount >= 2) {
      this.GetItem(1).SetUIActive(true);
    }
    if (e.TeamMemberCount >= 3) {
      this.GetItem(2).SetUIActive(true);
    }
  }
}
//# sourceMappingURL=FriendItem.js.map