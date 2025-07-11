"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatRoomItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PrivateChatRoom_1 = require("../PrivateChatRoom");
const TeamChatRoom_1 = require("../TeamChatRoom");
const WorldTeamChatRoom_1 = require("../WorldTeamChatRoom");
class ChatRoomItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Eyt = undefined;
    this.fye = 0;
    this.pSt = undefined;
    this.oSt = undefined;
    this.oft = undefined;
    this.Syt = t => {
      if (t === 1 && this.oft) {
        this.oft(this.Eyt, this.fye);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Syt]];
  }
  OnStart() {
    var t = this.GetItem(4);
    this.oSt = new PlayerHeadItem_1.PlayerHeadItem(t.GetOwner());
  }
  OnBeforeDestroy() {
    this.pSt = undefined;
    this.Eyt = undefined;
    this.fye = 0;
  }
  Clear() {}
  Refresh(t, i, e) {
    this.GetItem(6).SetUIActive(false);
    this.GetItem(7).SetUIActive(false);
    this.GetSprite(5).SetIsGray(false);
    if (t instanceof PrivateChatRoom_1.PrivateChatRoom) {
      var s = t.GetTargetPlayerId();
      this.pSt = ModelManager_1.ModelManager.FriendModel.GetFriendById(s);
      if (!this.pSt) {
        return;
      }
      this.Eyt = 1;
      this.fye = this.pSt.PlayerId;
      this.RefreshIsOnline(t);
    } else if (t instanceof TeamChatRoom_1.TeamChatRoom) {
      this.pSt = undefined;
      this.Eyt = 2;
      this.fye = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    } else if (t instanceof WorldTeamChatRoom_1.WorldChatRoom) {
      this.pSt = undefined;
      this.Eyt = 3;
      this.fye = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    }
    s = t.GetIsShowRedDot();
    this.GetItem(2)?.SetUIActive(s);
    this.RefreshPlayerTexture();
    this.K7e();
    this.RefreshMuteItem();
    this.Nxa();
    this.sPa();
    if (i) {
      this.SetToggleState(1);
    } else {
      this.SetToggleState(0);
    }
  }
  Nxa() {
    var t;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      t = this.pSt !== undefined && this.pSt?.GetSdkUserId() !== "";
      this.GetItem(8)?.SetUIActive(t);
    } else {
      this.GetItem(8)?.SetUIActive(false);
    }
  }
  sPa() {
    var t;
    if (this.Eyt !== undefined && this.Eyt === 1 && PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      t = this.pSt !== undefined && this.pSt?.GetSdkUserId() !== "";
      this.GetItem(9)?.SetUIActive(!t);
    } else {
      this.GetItem(9)?.SetUIActive(false);
    }
  }
  OnSelected(t) {
    this.SetToggleState(1);
    this.GetItem(2)?.SetUIActive(false);
  }
  OnDeselected(t) {
    this.SetToggleState(0);
  }
  RefreshIsOnline(t) {
    var i = this.GetItem(6);
    var t = t.IsOnline();
    i.SetUIActive(!t);
    this.GetSprite(5).SetIsGray(!t);
    this.GetItem(7).SetUIActive(t);
    this.oSt.SetIsGray(!t);
  }
  RefreshPlayerTexture() {
    var t;
    var i = this.GetSprite(5);
    if (this.Eyt === 2 || this.Eyt === 3) {
      i.SetUIActive(true);
      this.oSt.SetActive(false);
    } else {
      i?.SetUIActive(false);
      if (i = this.pSt?.PlayerId ?? ModelManager_1.ModelManager.PlayerInfoModel.GetId()) {
        if (t = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(i)?.GetPlayerIcon()) {
          this.oSt.RefreshByRoleIdUseCard(t);
        } else {
          this.oSt.RefreshByPlayerId(i, true);
        }
      } else {
        this.oSt.SetActive(false);
      }
    }
  }
  K7e() {
    var t;
    var i;
    var e = this.GetText(1);
    if (this.Eyt === 2 || this.Eyt === 3) {
      LguiUtil_1.LguiUtil.SetLocalText(e, "CurrentTeam");
    } else {
      t = this.pSt.FriendRemark;
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        i = this.pSt.PlayerName;
        e.SetText(i);
      } else {
        e.SetText(t);
      }
    }
  }
  RefreshMuteItem() {
    var t;
    var i = this.GetItem(3);
    if (this.pSt) {
      t = ModelManager_1.ModelManager.ChatModel.IsInMute(this.pSt.PlayerId);
      i.SetUIActive(t);
    } else {
      i.SetUIActive(false);
    }
  }
  BindOnClicked(t) {
    this.oft = t;
  }
  SetToggleState(t) {
    var i = this.GetExtendToggle(0);
    if (i && i.GetToggleState() !== t) {
      i.SetToggleState(t, false);
    }
  }
}
exports.ChatRoomItem = ChatRoomItem;
//# sourceMappingURL=PrivateChatFriendItem.js.map