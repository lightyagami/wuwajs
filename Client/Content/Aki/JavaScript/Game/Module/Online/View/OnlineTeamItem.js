"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineTeamItem = undefined;
const UE = require("ue");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const FriendController_1 = require("../../Friend/FriendController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
class OnlineTeamItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.dOi = undefined;
    this.COi = false;
    this.gLt = undefined;
    this.gOi = () => {
      FriendController_1.FriendController.RequestFriendApplyAddSend(this.dOi.PlayerId, Protocol_1.Aki.Protocol.D6s.Proto_RecentlyTeam);
      this.COi = true;
    };
    this.DSi = () => {
      let e = undefined;
      (e = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ? new ConfirmBoxDefine_1.ConfirmBoxDataNew(100) : new ConfirmBoxDefine_1.ConfirmBoxDataNew(78)).FunctionMap.set(2, () => {
        OnlineController_1.OnlineController.LeaveWorldTeamRequest(this.dOi.PlayerId);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.fOi = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(79);
      e.FunctionMap.set(2, () => {
        OnlineController_1.OnlineController.KickWorldTeamRequest(this.dOi.PlayerId);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.PNi = () => {
      ModelManager_1.ModelManager.OnlineModel.CachePlayerData = this.dOi;
      UiManager_1.UiManager.OpenView("OnlineProcessView");
    };
    this.oZe = (e, i) => {
      if (this.dOi.PlayerId === e) {
        this.pOi(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [7, UE.UIText], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent], [17, UE.UISprite], [18, UE.UIItem], [19, UE.UISprite], [21, UE.UITexture], [20, UE.UIItem], [22, UE.UIButtonComponent], [23, UE.UIItem], [24, UE.UIText], [25, UE.UIItem], [26, UE.UIItem]];
    this.BtnBindInfo = [[14, this.gOi], [16, this.fOi], [22, this.PNi], [15, this.DSi]];
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner());
  }
  OnStart() {
    this.GetItem(18).SetUIActive(false);
    this.GetItem(13).SetUIActive(true);
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshPlayerPing, this.oZe);
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
    this.gLt?.Destroy();
    this.gLt = undefined;
  }
  Refresh(e, i, r) {
    this.GetButton(22).RootUIComp.SetRaycastTarget(e.PlayerId !== ModelManager_1.ModelManager.FunctionModel.PlayerId);
    let t = false;
    let n = false;
    let o = false;
    let a = false;
    if ((this.dOi = e).IsSelf) {
      o = true;
    } else if (ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId)) {
      if (this.COi) {
        t = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam();
      } else {
        t = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam();
        a = true;
      }
    } else {
      t = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam();
      n = true;
    }
    this.GetButton(16).RootUIComp.SetUIActive(t);
    this.GetButton(14).RootUIComp.SetUIActive(n);
    this.GetButton(15).RootUIComp.SetUIActive(o);
    this.GetText(1).SetUIActive(a);
    var s = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e.HeadId, false);
    if (s) {
      this.SetTextureByPath(s.GetRoleHeadIconCircle(), this.GetTexture(3));
    }
    var s = ModelManager_1.ModelManager.FriendModel.IsMyFriend(e.PlayerId);
    var l = this.GetText(0);
    if (s && (s = ModelManager_1.ModelManager.FriendModel.GetFriendById(e.PlayerId)?.FriendRemark) !== undefined && s !== "") {
      LguiUtil_1.LguiUtil.SetLocalText(l, "NameMark", s);
    } else {
      l.SetText(e.GetRawName());
    }
    this.GetText(2).SetText("Lv." + e.Level);
    var s = this.GetText(7);
    if (e.Signature && e.Signature !== "") {
      s.SetText(e.Signature);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(s, "DefaultSign");
    }
    this.GetItem(20).SetUIActive(true);
    let _ = undefined;
    _ = e.PlayerId === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() ? EditFormationDefine_1.SELF_ONLINE_INDEX : EditFormationDefine_1.OTHER_ONLINE_INDEX;
    var l = this.GetSprite(17);
    var s = StringUtils_1.StringUtils.Format(_, this.dOi.PlayerNumber.toString());
    var s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    if (s) {
      l.SetUIActive(true);
      this.SetSpriteByPath(s, l, false);
    } else {
      l.SetUIActive(false);
    }
    this.pOi(e.PingState);
    var s = e.PlayerDetails.ESs;
    if (s > 0) {
      l = BackgroundCardById_1.configBackgroundCardById.GetConfig(s);
      this.SetTextureByPath(l.LongCardPath, this.GetTexture(21));
    }
    this.Nxa(e.GetOnlineName());
    this.sPa(e.GetOnlineName());
    this.gLt?.Refresh(e.PlayerTitleId, e.PlayerTitleStarLevel, e.Sex);
  }
  sPa(e) {
    if (!PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId() || e !== undefined && e !== "") {
      this.GetItem(25)?.SetUIActive(false);
    } else {
      this.GetItem(25)?.SetUIActive(true);
    }
  }
  Nxa(e) {
    var i;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      i = e !== "" && e !== undefined;
      this.GetItem(23)?.SetUIActive(i);
      this.GetText(24)?.SetUIActive(i);
      if (i) {
        i = e ?? "";
        this.GetText(24)?.SetText(i);
      }
    } else {
      this.GetItem(23)?.SetUIActive(false);
      this.GetText(24)?.SetUIActive(false);
    }
  }
  pOi(e) {
    var i;
    var r = this.GetSprite(19);
    r.SetUIActive(true);
    if (e === Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalUnknown");
      this.SetSpriteByPath(i, r, false);
    } else if (e === Protocol_1.Aki.Protocol.r7s.Proto_GREAT) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalGreat");
      this.SetSpriteByPath(i, r, false);
    } else if (e === Protocol_1.Aki.Protocol.r7s.Proto_GOOD) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalGood");
      this.SetSpriteByPath(i, r, false);
    } else if (e === Protocol_1.Aki.Protocol.r7s.Proto_POOR) {
      i = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalPoor");
      this.SetSpriteByPath(i, r, false);
    }
  }
}
exports.OnlineTeamItem = OnlineTeamItem;
//# sourceMappingURL=OnlineTeamItem.js.map