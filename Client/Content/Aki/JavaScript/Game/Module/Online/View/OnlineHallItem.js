"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineHallItem = undefined;
const UE = require("ue");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
const TICK_INTERVAL_TIME = 100;
class OnlineHallItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(i) {
    super();
    this.LNi = undefined;
    this.DNi = undefined;
    this.XFt = undefined;
    this.RNi = undefined;
    this.gLt = undefined;
    this.PYt = () => {
      if (this.LNi) {
        if (this.LNi.ApplyTimeLeftTime > 0) {
          this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.LNi.ApplyTimeLeftTime));
        } else {
          this.UNi(true);
          if (this.RNi !== undefined) {
            TimerSystem_1.GameplayTimerSystem.Remove(this.RNi);
          }
          this.RNi = undefined;
        }
      } else {
        if (this.RNi !== undefined) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.RNi);
        }
        this.RNi = undefined;
      }
    };
    this.ANi = () => {
      if (this.DNi === "OnlineWorldHallView") {
        OnlineController_1.OnlineController.ApplyJoinWorldRequest(this.LNi.PlayerId, ModelManager_1.ModelManager.OnlineModel.ShowFriend || ModelManager_1.ModelManager.OnlineModel.HallViewIsShowSearching ? Protocol_1.Aki.Protocol.J8s.Proto_QueryJoin : Protocol_1.Aki.Protocol.J8s.Proto_LobbyJoin);
      } else {
        OnlineController_1.OnlineController.ApplyJoinWorldRequest(this.LNi.PlayerId, Protocol_1.Aki.Protocol.J8s.Proto_QueryJoin);
      }
      this.LNi.SetApplyTime(TimeUtil_1.TimeUtil.GetServerTime() + ModelManager_1.ModelManager.OnlineModel.ApplyCd);
      this.UNi(false);
      this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.LNi.ApplyTimeLeftTime));
      this.RNi = TimerSystem_1.GameplayTimerSystem.Forever(this.PYt, TICK_INTERVAL_TIME);
    };
    this.PNi = () => {
      ModelManager_1.ModelManager.OnlineModel.CachePlayerData = this.LNi;
      UiManager_1.UiManager.OpenView("OnlineProcessView");
    };
    this.DNi = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIInteractionGroup], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UISprite], [20, UE.UIItem], [21, UE.UITexture], [22, UE.UIButtonComponent], [23, UE.UIItem], [24, UE.UIText], [25, UE.UIItem], [26, UE.UIItem]];
    this.BtnBindInfo = [[4, this.ANi], [22, this.PNi]];
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner());
  }
  OnStart() {
    this.GetText(1).SetUIActive(false);
    this.GetSprite(19).SetUIActive(false);
    this.GetButton(16).RootUIComp.SetUIActive(false);
    this.GetButton(14).RootUIComp.SetUIActive(false);
    this.GetButton(15).RootUIComp.SetUIActive(false);
    this.GetItem(18).SetUIActive(true);
    this.XFt = this.GetText(11);
  }
  OnBeforeDestroy() {
    this.LNi = undefined;
    if ((this.DNi = undefined) !== this.RNi) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.RNi);
    }
    this.RNi = undefined;
    this.gLt?.Destroy();
  }
  Refresh(i, t, e) {
    this.LNi = i;
    if (this.LNi.ApplyTimeLeftTime > 0) {
      this.UNi(false);
      this.RNi = TimerSystem_1.GameplayTimerSystem.Forever(this.PYt, TICK_INTERVAL_TIME);
    } else {
      this.UNi(true);
    }
    var r = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(i.HeadId, false);
    if (r) {
      this.SetTextureByPath(r.GetRoleHeadIconCircle(), this.GetTexture(3));
    }
    var r = ModelManager_1.ModelManager.FriendModel.IsMyFriend(i.PlayerId);
    var s = this.GetText(0);
    if (r && (r = ModelManager_1.ModelManager.FriendModel.GetFriendById(i.PlayerId)?.FriendRemark) !== undefined && r !== "") {
      LguiUtil_1.LguiUtil.SetLocalText(s, "NameMark", r);
    } else {
      s.SetText(i.Name);
    }
    this.gLt?.Refresh(i.PlayerTitleId, i.PlayerTitleStarLevel, i.Sex);
    this.GetText(2).SetText("Lv." + i.Level);
    var r = this.GetText(7);
    if (i.Signature && i.Signature !== "") {
      r.SetText(i.Signature);
      this.GetItem(20).SetUIActive(true);
    } else {
      this.GetItem(20).SetUIActive(false);
    }
    var h = this.GetItem(5);
    var a = this.GetItem(6);
    switch (i.PlayerCount) {
      case 2:
        h.SetUIActive(true);
        a.SetUIActive(false);
        break;
      case 3:
        h.SetUIActive(true);
        a.SetUIActive(true);
        break;
      default:
        h.SetUIActive(false);
        a.SetUIActive(false);
    }
    var s = ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel;
    var r = ModelManager_1.ModelManager.OnlineModel.EnterDiff;
    var o = this.GetInteractionGroup(8);
    var l = this.GetText(9);
    if (i.WorldLevel > s + r) {
      o.SetInteractable(false);
      s = i.WorldLevel - r;
      LguiUtil_1.LguiUtil.SetLocalText(l, "ApplyBtnDisable", s);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(l, "ApplyBtnEnable");
      o.SetInteractable(true);
    }
    var r = i.PlayerCard;
    if (r > 0) {
      s = BackgroundCardById_1.configBackgroundCardById.GetConfig(r);
      this.SetTextureByPath(s.LongCardPath, this.GetTexture(21));
    }
    this.Nxa(i);
    this.sPa(i);
  }
  UNi(i) {
    this.GetButton(4).RootUIComp.SetUIActive(i);
    this.GetItem(12).SetUIActive(i);
    this.GetItem(10).SetUIActive(!i);
  }
  Nxa(i) {
    var t;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      t = i.PlayerDetails.Jxa !== "";
      this.GetItem(23)?.SetUIActive(t);
      this.GetText(24)?.SetUIActive(t);
      if (t) {
        t = i.PlayerDetails.Qxa ?? "";
        this.GetText(24)?.SetText(t);
      }
    } else {
      this.GetItem(23)?.SetUIActive(false);
      this.GetText(24)?.SetUIActive(false);
    }
  }
  sPa(i) {
    if (!PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId() || i.PlayerDetails.Jxa !== "") {
      this.GetItem(25)?.SetUIActive(false);
    } else {
      this.GetItem(25)?.SetUIActive(true);
    }
  }
}
exports.OnlineHallItem = OnlineHallItem;
//# sourceMappingURL=OnlineHallItem.js.map