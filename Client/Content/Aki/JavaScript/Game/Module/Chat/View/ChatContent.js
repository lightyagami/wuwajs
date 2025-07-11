"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatContent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const PlayerHeadItem_1 = require("../../Common/PlayerHeadItem");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ChatContentBase_1 = require("./ChatContentBase");
class ChatContent extends ChatContentBase_1.ChatContentBase {
  constructor() {
    super(...arguments);
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
    this.bl();
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
  bl() {
    this.nSt();
    this.Dke();
    this.Oac();
    this.sSt();
    this.LOn();
    this.Nxa();
  }
  nSt() {
    var e = ModelManager_1.ModelManager.PersonalModel;
    var t = this.ChatContentData.SenderPlayerId;
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
    var r = this.GetItem(5);
    const s = this.GetItem(3);
    if (this.ChatContentData.ContentType === Protocol_1.Aki.Protocol.p8n.DIs) {
      e = this.GetText(1);
      t = this.ChatContentData.Content;
      e.SetText(t);
      r.SetUIActive(true);
      s.SetUIActive(false);
    }
    if (this.ChatContentData.ContentType === Protocol_1.Aki.Protocol.p8n.Proto_Emoji) {
      e = this.GetTexture(4);
      t = Number(this.ChatContentData.Content);
      ((i = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(t)) ? (i = i.ExpressionTexturePath, this.SetTextureByPath(i, e, undefined, e => {
        s.SetUIActive(e);
      }), r) : (Log_1.Log.CheckWarn() && Log_1.Log.Warn("Chat", 5, "表情表找不到对应的Id", ["expressionId", t]), r.SetUIActive(false), s)).SetUIActive(false);
    }
  }
  Nxa() {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      let e = this.ChatContentData.PsOnlineId;
      var i = ModelManager_1.ModelManager.PersonalModel;
      var r = this.ChatContentData.SenderPlayerId;
      var s = i.GetPersonalInfoData();
      let t = undefined;
      if (s && s.PlayerId === r) {
        t = i.GetPsnUserId();
      } else if (s = ModelManager_1.ModelManager.FriendModel.GetFriendById(r)) {
        t = s.GetSdkUserId();
        e = s.GetSdkOnlineId();
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
    var e = this.ChatContentData.SenderPlayerId;
    var t = this.GetText(6);
    var i = this.ChatContentData.ChatRoomType;
    if (i === 2 || i === 3) {
      i = ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData();
      if (i && i.PlayerId === e) {
        t.SetText(i.Name);
        this.gLt?.Refresh(i.CurPlayerTitleId, i.CurPlayerTitleLevel, i.Sex);
      } else {
        i = ModelManager_1.ModelManager.FriendModel.GetFriendById(e);
        if (i) {
          var r = i.FriendRemark;
          if (StringUtils_1.StringUtils.IsEmpty(r)) {
            t.SetText(i.PlayerName);
          } else {
            t.SetText(r);
          }
          this.gLt?.Refresh(i.PlayerTitleId, i.PlayerTitleStarLevel, i.PlayerSex);
        } else {
          r = ModelManager_1.ModelManager.ChatModel.GetChatPlayerData(e);
          if (!r) {
            t.SetUIActive(false);
            this.gLt?.GetRootItem().SetUIActive(false);
            return;
          }
          t.SetText(r.GetPlayerName());
          this.gLt?.Refresh(r.GetPlayerTitleId(), r.GetPlayerTitleStarLevel(), r.GetSex());
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
    var t = this.ChatContentData.TimeStamp;
    var i = this.ChatContentData.LastTimeStamp;
    var r = TimeUtil_1.TimeUtil.GetServerTime();
    if (t - i < ModelManager_1.ModelManager.ChatModel.ShowTimeDifferent && i !== 0) {
      e.SetUIActive(false);
    } else {
      i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(t);
      t = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(r);
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
}
exports.ChatContent = ChatContent;
//# sourceMappingURL=ChatContent.js.map