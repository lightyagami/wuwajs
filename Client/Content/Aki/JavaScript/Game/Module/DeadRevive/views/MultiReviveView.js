"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiReviveView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const OnlineModel_1 = require("../../Online/OnlineModel");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const TIME_SECOND = 1000;
const AUTO_REVIVE_TIME = 60;
class MultiReviveView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.X1i = new Map();
    this.xUn = "";
    this.wUn = "";
    this.WFt = -1;
    this.BUn = 0;
    this.bUn = undefined;
    this.qUn = undefined;
    this.GUn = () => {
      if (this.WFt === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CannotRevive");
      } else {
        this.NUn(false);
      }
    };
    this.OUn = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(98);
      e.SetTextArgs(this.xUn, this.wUn);
      e.FunctionMap.set(2, () => {
        this.NUn(true);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.YNi = () => {
      var e;
      if (ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()) {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(108)).FunctionMap.set(2, () => {
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.JNi = () => {
      var e;
      var i;
      if (ModelManager_1.ModelManager.SceneTeamModel.IsAllDid()) {
        if (ModelManager_1.ModelManager.OnlineModel.AllowInitiate) {
          e = ModelManager_1.ModelManager.CreatureModel.IsMyWorld();
          if ((i = ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime) > 0) {
            if (e) {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NextInviteTime", TimeUtil_1.TimeUtil.GetCoolDown(i));
            } else {
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NextSuggestTime", TimeUtil_1.TimeUtil.GetCoolDown(i));
            }
          } else if (ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(ModelManager_1.ModelManager.PlayerInfoModel.GetId()) !== 2 && e) {
            ControllerHolder_1.ControllerHolder.OnlineController.InviteRechallengeRequest();
          } else {
            ControllerHolder_1.ControllerHolder.OnlineController.ApplyRechallengeRequest(Protocol_1.Aki.Protocol.o8s.Proto_Dead);
          }
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CannotInvite");
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NeedAllDeadToChallengeAgain");
      }
    };
    this.$1i = (e, i) => {
      e = this.X1i.get(e);
      if (e) {
        this.Y1i(i, e);
      }
    };
    this.t$s = () => {
      this.J1i();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIButtonComponent], [10, UE.UITexture], [11, UE.UIText]];
    this.BtnBindInfo = [[1, this.YNi], [2, this.JNi], [7, this.GUn], [9, this.OUn]];
  }
  OnAddEventListener() {
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayerChallengeStateChange, this.$1i);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s);
    }
  }
  OnRemoveEventListener() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.PlayerChallengeStateChange, this.$1i)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayerChallengeStateChange, this.$1i);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnTeamLivingStateChange, this.t$s);
    }
  }
  OnBeforeShow() {
    var e = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    this.GetButton(1).RootUIComp.SetUIActive(e);
    this.GetButton(2).RootUIComp.SetUIActive(e);
    this.GetButton(7).RootUIComp.SetUIActive(!e);
    if (e) {
      this.J1i();
      this.ZNi();
    } else {
      this.GetItem(3).SetUIActive(false);
      this.kUn();
    }
  }
  OnBeforeDestroy() {
    this.LWs();
  }
  LWs() {
    this.WFt = -1;
    this.BUn = 0;
    this.qUn = undefined;
    this.xUn = "";
    this.wUn = "";
    if (this.bUn) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.bUn);
      this.bUn = undefined;
    }
    if (this.X1i) {
      this.X1i.clear();
    }
  }
  kUn() {
    var e = ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig;
    if (e) {
      this.WFt = e.ReviveTimes;
    }
    this.BUn = AUTO_REVIVE_TIME;
    this.qUn = this.GetText(8);
    LguiUtil_1.LguiUtil.SetLocalText(this.qUn, "ReviveItemTips", this.BUn);
    this.bUn = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (this.BUn <= 0) {
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        this.GUn();
        if (this.bUn) {
          TimerSystem_1.GameplayTimerSystem.Remove(this.bUn);
          this.bUn = undefined;
        }
      } else {
        --this.BUn;
        LguiUtil_1.LguiUtil.SetLocalText(this.qUn, "ReviveItemTips", this.BUn);
      }
    }, TIME_SECOND);
    let i = -1;
    var t;
    var n;
    var r;
    var e = ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig;
    if (e) {
      i = e.UseItemId;
    }
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
    if (!(e <= 0)) {
      this.GetButton(9).RootUIComp.SetUIActive(true);
      r = this.GetTexture(10);
      t = this.GetText(11);
      n = ModelManager_1.ModelManager.BuffItemModel;
      this.SetItemIcon(r, i);
      this.xUn = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i);
      if ((r = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(i)) < TimeUtil_1.TimeUtil.Minute) {
        this.wUn = r + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second");
      } else {
        this.wUn = Math.floor(r / TimeUtil_1.TimeUtil.Minute) + ConfigManager_1.ConfigManager.TextConfig.GetTextById("MinuteText");
        if ((r = r % TimeUtil_1.TimeUtil.Minute) > 0) {
          this.wUn += r + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second");
        }
      }
      if (n.GetBuffItemRemainCdTime(i) > 0) {
        LguiUtil_1.LguiUtil.SetLocalText(t, "ReviveItemCd");
        this.GetButton(9).GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass()).SetInteractable(false);
      } else {
        t.SetText(e.toString());
      }
    }
  }
  NUn(e) {
    ControllerHolder_1.ControllerHolder.DeadReviveController.ReviveRequest(e, e => {
      if (e) {
        this.LWs();
      }
    });
  }
  J1i() {
    var e = this.GetText(0);
    var i = this.GetItem(3);
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
    let n = true;
    for (const _ of t) {
      if (ModelManager_1.ModelManager.SceneTeamModel.GetGroupLivingState(_.GetPlayerId(), 1) === 1) {
        n = false;
        break;
      }
    }
    if (t.length <= 1 || !n) {
      e.SetUIActive(true);
      i.SetUIActive(false);
    } else {
      e.SetUIActive(false);
      i.SetUIActive(true);
      var r = this.GetSprite(4);
      var o = this.GetSprite(5);
      r.SetUIActive(false);
      o.SetUIActive(false);
      var s = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const h of t) {
        var l;
        var a = h.GetPlayerId();
        if (a !== s) {
          l = ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(a);
          if (r.bIsUIActive) {
            if (!o.bIsUIActive) {
              o.SetUIActive(true);
              this.Y1i(l, o);
              this.X1i.set(a, o);
            }
          } else {
            r.SetUIActive(true);
            this.Y1i(l, r);
            this.X1i.set(a, r);
          }
        }
      }
    }
  }
  ZNi() {
    if (ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "ChallengeAgain");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "SuggestChallengeAgain");
    }
  }
  Y1i(e, i) {
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(OnlineModel_1.onlineContinuingChallengeIcon[e]);
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      this.SetSpriteByPath(e, i, false);
    }
  }
}
exports.MultiReviveView = MultiReviveView;
//# sourceMappingURL=MultiReviveView.js.map