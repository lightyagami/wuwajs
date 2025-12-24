"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatContent = exports.ChatContentItem = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ChatTeamTipsContent_1 = require("./ChatTeamTipsContent");
class ChatContentItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.YGl = undefined;
    this.L8e = undefined;
    this._U1 = undefined;
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
    await this.WZt();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async WZt() {
    this.YGl = new ChatContent();
    this.AddChild(this.YGl);
    this.L8e = new ChatContent();
    this.AddChild(this.L8e);
    this._U1 = new ChatTeamTipsContent_1.ChatTeamTipsContent();
    this.AddChild(this._U1);
    await Promise.all([this.YGl.CreateByActorAsync(this.GetItem(2).GetOwner()), this.L8e.CreateByActorAsync(this.GetItem(1).GetOwner()), this._U1.CreateByActorAsync(this.GetItem(0).GetOwner())]);
  }
  GetUsingItem(e) {
    switch (e.Type) {
      case 0:
        return this.GetItem(1).GetOwner();
      case 1:
        return this.GetItem(2).GetOwner();
      case 2:
        return this.GetItem(0).GetOwner();
      default:
        return this.GetItem(1).GetOwner();
    }
  }
  ClearItem() {
    this.Destroy();
  }
  Update(e, t) {
    this.Data = e;
    this.YGl?.SetUiActive(false);
    this.L8e?.SetUiActive(false);
    this._U1?.SetUiActive(false);
    switch (e.Type) {
      case 0:
        this.L8e?.SetUiActive(true);
        this.L8e?.Refresh(e.ChatContentData);
        break;
      case 1:
        this.YGl?.SetUiActive(true);
        this.YGl?.Refresh(e.ChatContentData);
        break;
      case 2:
        this._U1?.SetUiActive(true);
        this._U1?.Refresh(e.ChatContentData);
    }
  }
  GetInteractItem() {
    return (this.Data?.Type === 0 ? this.L8e : this.YGl).GetBtnItem();
  }
}
exports.ChatContentItem = ChatContentItem;
class ChatContent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.yOd = undefined;
    this.oSt = undefined;
    this.gLt = undefined;
    this.SPe = undefined;
    this.rSt = () => {
      this.nSt();
      this.Oac();
      this.LOn();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UITexture], [5, UE.UIItem], [6, UE.UIText], [8, UE.UIItem], [9, UE.UITexture], [10, UE.UIText], [7, UE.UIItem], [11, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([12, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    this.gLt.SkipDestroyActor = true;
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
  }
  OnStart() {
    var e = this.GetItem(0);
    this.oSt = new PlayerHeadItem_1.PlayerHeadItem(e.GetOwner());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Ore();
  }
  OnBeforeDestroy() {
    this.oSt = undefined;
    this.gLt?.Destroy();
    this.kre();
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChatPlayerInfoChanged, this.rSt);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChatPlayerInfoChanged, this.rSt);
  }
  Refresh(e) {
    this.yOd = e;
    this.nSt();
    this.Dke();
    this.Oac();
    this.sSt();
    this.Nxa();
  }
  nSt() {
    var e = ModelManager_1.ModelManager.PersonalModel;
    var t = this.yOd.SenderPlayerId;
    var i = e.GetPersonalInfoData();
    if (i && i.PlayerId === t) {
      this.oSt.RefreshByRoleIdUseCard(e.GetHeadPhotoId());
    } else if (i = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(t)) {
      if (e = ModelManager_1.ModelManager.FriendModel.GetFriendById(t)) {
        this.oSt?.SetIsGray(!e.PlayerIsOnline);
      }
      if (e = i?.GetPlayerIcon()) {
        this.oSt.RefreshByRoleIdUseCard(e);
      } else {
        this.oSt.RefreshByPlayerId(t, true);
      }
    }
  }
  Dke() {
    var e;
    var t;
    var i;
    var s = this.GetItem(5);
    const r = this.GetItem(3);
    if (this.yOd.ContentType === Protocol_1.Aki.Protocol.p8n.DIs && (e = this.GetText(1), t = this.yOd.Content, e.SetText(t), s.SetUIActive(true), r.SetUIActive(false), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Chat", 5, "表情:" + this.yOd.Content, ["expressionItemActive", r?.IsUIActiveSelf()]);
    }
    if (this.yOd.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
      e = this.GetTexture(4);
      t = Number(this.yOd.Content);
      ((i = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(t)) ? (i = i.ExpressionTexturePath, this.SetTextureByPath(i, e, undefined, e => {
        r.SetUIActive(e);
      }), s) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Chat", 5, "表情表找不到对应的Id", ["expressionId", t]), s.SetUIActive(false), r)).SetUIActive(false);
    }
  }
  Nxa() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      let e = this.yOd.PsOnlineId;
      var i = ModelManager_1.ModelManager.PersonalModel;
      var s = this.yOd.SenderPlayerId;
      var r = i.GetPersonalInfoData();
      let t = undefined;
      if (r && r.PlayerId === s) {
        t = i.GetPsnUserId();
      } else if (r = ModelManager_1.ModelManager.FriendModel.GetFriendById(s)) {
        t = r.GetSdkUserId();
        e = r.GetSdkOnlineId();
      }
      i = (t ?? "") !== "" || (e ?? "") !== "";
      this.GetTexture(9)?.SetUIActive(i);
      this.GetItem(8)?.SetUIActive(true);
      this.GetText(10)?.SetUIActive(i);
      this.GetItem(11)?.SetUIActive(!i);
      if (i) {
        this.GetText(10)?.SetText(e);
      } else {
        this.GetText(10)?.SetText("");
      }
    } else {
      this.GetTexture(9)?.SetUIActive(false);
      this.GetText(10)?.SetUIActive(false);
      this.GetItem(8)?.SetUIActive(false);
      this.GetItem(11)?.SetUIActive(false);
    }
  }
  Oac() {
    var e = this.yOd.SenderPlayerId;
    var t = this.GetText(6);
    var i = this.yOd.ChatRoomType;
    if (i === 2 || i === 3) {
      i = ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData();
      if (i && i.PlayerId === e) {
        t.SetText(i.Name);
        this.gLt?.Refresh(i.CurPlayerTitleId, i.CurPlayerTitleLevel, i.Sex);
      } else {
        i = ModelManager_1.ModelManager.FriendModel.GetFriendById(e);
        if (i) {
          var s = i.FriendRemark;
          if (StringUtils_1.StringUtils.IsEmpty(s)) {
            t.SetText(i.PlayerName);
          } else {
            t.SetText(s);
          }
          this.gLt?.Refresh(i.PlayerTitleId, i.PlayerTitleStarLevel, i.PlayerSex);
        } else {
          s = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(e);
          if (!s) {
            t.SetUIActive(false);
            this.gLt?.GetRootItem().SetUIActive(false);
            return;
          }
          t.SetText(s.GetPlayerName());
          this.gLt?.Refresh(s.GetPlayerTitleId(), s.GetPlayerTitleStarLevel(), s.GetSex());
        }
      }
      t.SetUIActive(true);
    } else {
      t.SetUIActive(false);
      this.gLt?.GetRootItem().SetUIActive(false);
    }
  }
  sSt() {
    var e = this.GetText(2);
    var t = this.yOd.TimeStamp;
    var i = this.yOd.LastTimeStamp;
    var s = TimeUtil_1.TimeUtil.GetServerTime();
    if (t - i < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && i !== 0) {
      e.SetUIActive(false);
    } else {
      i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(t);
      t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(s);
      if (i.Year === t.Year && i.Month === t.Month && i.Day === t.Day) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "HourText", i.Hour, i.Minute);
        e.SetUIActive(true);
      } else if (i.Month === t.Month && i.Day === t.Day || i.Year !== t.Year) {
        if (i.Year !== t.Year) {
          LguiUtil_1.LguiUtil.SetLocalText(e, "YearText", i.Year, i.Month, i.Day, i.Hour, i.Minute);
          e.SetUIActive(true);
        } else {
          e.SetUIActive(false);
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(e, "DayText", i.Month, i.Day, i.Hour, i.Minute);
        e.SetUIActive(true);
      }
    }
  }
  LOn() {
    this.SPe?.PlayLevelSequenceByName("Start");
  }
  GetBtnItem() {
    if (!Info_1.Info.IsInTouch()) {
      return this.GetItem(12);
    }
  }
}
exports.ChatContent = ChatContent;
//# sourceMappingURL=ChatContent.js.map