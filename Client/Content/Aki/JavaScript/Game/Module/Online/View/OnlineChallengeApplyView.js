"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OnlineChallengeApplyView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const OnlineController_1 = require("../OnlineController");
class OnlineChallengeApplyView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.SNi = -1;
    this.yNi = -1;
    this.XFt = undefined;
    this.pNi = undefined;
    this.gIa = false;
    this.MNi = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        if (ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(ModelManager_1.ModelManager.PlayerInfoModel.GetId()) === 0 && ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) {
          OnlineController_1.OnlineController.InviteRechallengeRequest();
          return;
        }
        OnlineController_1.OnlineController.ReceiveRechallengeRequest(true, false);
      } else {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchAcceptInviteRequest(true, false);
      }
      this.CloseMe();
    };
    this.uHe = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        OnlineController_1.OnlineController.ReceiveRechallengeRequest(false, true);
      } else {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchAcceptInviteRequest(false, true);
      }
      this.CloseMe();
    };
    this.EWs = () => {
      var e;
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        this.SNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd;
        this.INi();
      } else {
        e = CommonParamById_1.configCommonParamById.GetIntConfig("match_confirm_time_out_seconds");
        this.SNi = e;
        this.TNi();
      }
    };
    this.M2r = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UISprite], [7, UE.UIText], [8, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIText]];
    this.BtnBindInfo = [[2, this.MNi], [8, this.uHe]];
  }
  OnStart() {
    var e;
    this.GetButton(8).GetRootComponent().SetUIActive(true);
    this.XFt = this.GetText(5);
    this.pNi = this.GetSprite(6);
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      this.SNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd;
      this.yNi = ModelManager_1.ModelManager.OnlineModel.ApplyCd;
      this.INi();
    } else {
      e = CommonParamById_1.configCommonParamById.GetIntConfig("match_confirm_time_out_seconds");
      this.SNi = e;
      this.yNi = e;
      this.TNi();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshSuggestChallengePlayerInfo, this.EWs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.M2r);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshSuggestChallengePlayerInfo, this.EWs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.M2r);
  }
  OnTick(e) {
    if (!this.gIa) {
      this.SNi -= e * TimeUtil_1.TimeUtil.Millisecond;
      if (this.SNi <= 0) {
        if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          OnlineController_1.OnlineController.ReceiveRechallengeRequest(false, false);
        } else {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.TeamMatchAcceptInviteRequest(false, false);
        }
        this.CloseMe();
        this.gIa = true;
      } else {
        this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi));
        this.pNi.SetFillAmount(this.SNi / this.yNi);
      }
    }
  }
  INi() {
    var e = this.GetItem(3);
    var t = this.GetItem(4);
    var i = this.GetText(7);
    e.SetUIActive(true);
    t.SetUIActive(false);
    if (ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()) {
      if (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
        LguiUtil_1.LguiUtil.SetLocalText(i, "SuggestChallengeAgain");
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(i, "InviteChallengeAgain");
      }
    } else if (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
      LguiUtil_1.LguiUtil.SetLocalText(i, "SuggestContinueChallenge");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(i, "InviteContinueChallenge");
    }
    var e = ModelManager_1.ModelManager.OnlineModel.ChallengeApplyPlayerId;
    var t = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e);
    if (t) {
      this.GetText(1).SetText(t.Name);
      this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi));
      this.pNi.SetFillAmount(this.SNi / this.yNi);
      if (i = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(t.HeadId, false)) {
        this.SetTextureByPath(i.GetRoleHeadIconCircle(), this.GetTexture(0));
      }
      this.Nxa(t.PlayerDetails.Qxa, t.PlayerDetails.Jxa);
      this.sPa(t.PlayerDetails.Qxa);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiPlayerTeam", 5, "未找到发起邀请的玩家", ["playerId：", e]);
    }
  }
  Nxa(e, t) {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      t = t !== undefined && t !== "";
      this.GetItem(16)?.SetUIActive(t);
      if (t) {
        t = e ?? "";
        this.GetText(17)?.SetText(t);
      }
    } else {
      this.GetItem(16)?.SetUIActive(false);
    }
  }
  sPa(e) {
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = e !== undefined && e !== "";
      this.GetItem(15)?.SetUIActive(!e);
    } else {
      this.GetItem(15)?.SetUIActive(false);
    }
  }
  TNi() {
    var e = this.GetItem(3);
    var t = this.GetItem(4);
    e.SetUIActive(true);
    t.SetUIActive(false);
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(e, "TeamLeaderInviteToInstance");
    var t = this.GetText(7);
    var e = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId();
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).MapName) ?? "";
    t.SetText(e);
    var t = ModelManager_1.ModelManager.OnlineModel.OwnerId;
    var e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(t);
    if (e) {
      this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi));
      this.pNi.SetFillAmount(this.SNi / this.yNi);
      if (e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e.HeadId, false)) {
        this.SetTextureByPath(e.GetRoleHeadIconCircle(), this.GetTexture(0));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MultiPlayerTeam", 5, "未找到发起邀请的玩家", ["playerId：", t]);
    }
    this.GetItem(16)?.SetUIActive(false);
    this.GetItem(15)?.SetUIActive(false);
  }
}
exports.OnlineChallengeApplyView = OnlineChallengeApplyView;
//# sourceMappingURL=OnlineChallengeApplyView.js.map