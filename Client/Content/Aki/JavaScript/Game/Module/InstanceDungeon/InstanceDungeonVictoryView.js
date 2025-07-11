"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonVictoryView = undefined;
const ue_1 = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const CommonResultButtonData_1 = require("../Common/ResultView/CommonResultButtonData");
const CommonResultView_1 = require("../Common/ResultView/CommonResultView");
const ItemDefines_1 = require("../Item/Data/ItemDefines");
const OnlineController_1 = require("../Online/OnlineController");
const OnlineModel_1 = require("../Online/OnlineModel");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonVictoryView extends CommonResultView_1.CommonResultView {
  constructor() {
    super(...arguments);
    this.NUe = 0;
    this.X1i = new Map();
    this.sOe = undefined;
    this.zFe = () => {
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(() => {
        if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
          this.CloseMe();
        }
      });
    };
    this.n1i = () => {
      var e;
      var n;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        if (ModelManager_1.ModelManager.OnlineModel.AllowInitiate) {
          e = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
          if ((n = ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime) > 0) {
            if (e) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NextInviteTime", TimeUtil_1.TimeUtil.GetCoolDown(n));
            } else {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NextSuggestTime", TimeUtil_1.TimeUtil.GetCoolDown(n));
            }
          } else if (ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(ModelManager_1.ModelManager.PlayerInfoModel.GetId()) !== 2 && e) {
            OnlineController_1.OnlineController.InviteRechallengeRequest();
          } else {
            OnlineController_1.OnlineController.ApplyRechallengeRequest(Protocol_1.Aki.Protocol.o8s.Rru);
          }
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CannotInvite");
        }
      } else {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(() => {
          if (UiManager_1.UiManager.IsViewShow(this.Info.Name)) {
            this.CloseMe();
          }
        });
      }
    };
    this.$1i = (e, n) => {
      e = this.X1i.get(e);
      if (e) {
        this.Y1i(n, e);
      }
    };
  }
  get Kli() {
    if (this.NUe) {
      return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe);
    } else {
      return undefined;
    }
  }
  OnRegisterComponent() {
    super.OnRegisterComponent();
  }
  OnStart() {
    this.NUe = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    super.OnStart();
    if (UiManager_1.UiManager.IsViewShow("ReviveView")) {
      UiManager_1.UiManager.CloseView("ReviveView");
    }
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      this.J1i();
    }
  }
  z1i() {
    var e = new Array();
    e.push(this.Z1i());
    e.push(this.e_i());
    return e;
  }
  Z1i() {
    var e = new CommonResultButtonData_1.CommonResultButtonData();
    e.SetRefreshCallBack(e => {
      e.SetBtnText("ButtonTextExit");
      var n = this.Kli.AutoLeaveTime;
      e.SetFloatTextWithTimer(n, true, "InstanceDungeonLeftTimeToAutoLeave");
    });
    e.SetClickCallBack(this.zFe);
    return e;
  }
  e_i() {
    var e = new CommonResultButtonData_1.CommonResultButtonData();
    e.SetRefreshCallBack(e => {
      e.SetBtnText("ButtonTextRetry");
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        if (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
          e.SetBtnText("ContinueChallenge");
        } else {
          e.SetBtnText("SuggestContinueChallenge");
        }
      }
      this.t_i(e);
    });
    e.SetClickCallBack(this.n1i);
    return e;
  }
  t_i(e) {
    var n;
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(this.NUe);
    if (!!t && !(t <= 0)) {
      n = ModelManager_1.ModelManager.PowerModel.PowerCount;
      e.SetTipsItem(ItemDefines_1.EItemId.Power, n.toString());
      if (t <= n) {
        e.SetTipsItemTextColor(InstanceDungeonVictoryView.i_i);
      } else {
        e.SetTipsItemTextColor(InstanceDungeonVictoryView.o_i);
      }
    }
  }
  OnAfterShow() {
    this.FTt();
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemHintModel.CleanItemRewardList();
    if (this.X1i) {
      this.X1i.clear();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayerChallengeStateChange, this.$1i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayerChallengeStateChange, this.$1i);
  }
  FTt() {
    this.Yli();
  }
  Yli() {
    this.sOe = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SettleRewardItemList;
    this.RewardLayout.RebuildLayoutByDataNew(this.sOe);
  }
  SetupButtonFormat() {
    var e = this.z1i();
    this.RefreshButtonList(e);
  }
  J1i() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    if (e.length <= 1) {
      this.GetItem(5).SetUIActive(false);
    } else {
      this.GetItem(5).SetUIActive(true);
      var n = this.GetSprite(6);
      var t = this.GetSprite(7);
      n.SetUIActive(false);
      t.SetUIActive(false);
      var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const a of e) {
        var i;
        var o = a.GetPlayerId();
        if (o !== r) {
          i = ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(o);
          if (n.bIsUIActive) {
            if (!t.bIsUIActive) {
              t.SetUIActive(true);
              this.Y1i(i, t);
              this.X1i.set(o, t);
            }
          } else {
            n.SetUIActive(true);
            this.Y1i(i, n);
            this.X1i.set(o, n);
          }
        }
      }
    }
  }
  Y1i(e, n) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(OnlineModel_1.onlineContinuingChallengeIcon[e]);
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      this.SetSpriteByPath(e, n, false);
    }
  }
}
(exports.InstanceDungeonVictoryView = InstanceDungeonVictoryView).o_i = new ue_1.Color(246, 93, 88, 255);
InstanceDungeonVictoryView.i_i = new ue_1.Color(255, 255, 255, 255); //# sourceMappingURL=InstanceDungeonVictoryView.js.map