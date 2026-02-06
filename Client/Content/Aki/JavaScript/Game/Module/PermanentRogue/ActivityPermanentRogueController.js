"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPermanentRogueController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const RogueResCollectionByIdKey_1 = require("../../../Core/Define/ConfigQuery/RogueResCollectionByIdKey");
const RogueResDungeonConfigById_1 = require("../../../Core/Define/ConfigQuery/RogueResDungeonConfigById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const ActivityPermanentRogueData_1 = require("./ActivityPermanentRogueData");
const PermanentRogueSubView_1 = require("./View/PermanentRogueSubView");
class ActivityPermanentRogueController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.wGi = () => {
      var e;
      if (ActivityPermanentRogueController.pO1 && (ActivityPermanentRogueController.pO1 = false, e = RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(ActivityPermanentRogueController.vrh))) {
        e = e.SeasonId;
        UiManager_1.UiManager.OpenView("RogueSeasonEntranceView", e);
      }
    };
    this.RequestEnterDungeon = e => {
      var t = new Protocol_1.Aki.Protocol.EEc();
      t.r6n = e;
      Net_1.Net.Call(26931, t, e => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25350);
        }
      });
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityRogue23Main";
  }
  async OnOpenSubView(e) {
    return await ActivityPermanentRogueController.OpenSeasonMainView();
  }
  OnCreateSubPageComponent(e) {
    return new PermanentRogueSubView_1.ActivitySubViewPermanentRogue();
  }
  OnCreateActivityData(e) {
    ActivityPermanentRogueController.ActivityId = e.s5n;
    this.CNe = new ActivityPermanentRogueData_1.ActivityPermanentRogueData();
    return this.CNe;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(15725, ActivityPermanentRogueController.R6c);
    Net_1.Net.Register(26602, ActivityPermanentRogueController.A6c);
    Net_1.Net.Register(22541, ActivityPermanentRogueController.P6c);
    Net_1.Net.Register(18299, ActivityPermanentRogueController.Is1);
    Net_1.Net.Register(24529, ActivityPermanentRogueController.x6c);
    Net_1.Net.Register(24963, ActivityPermanentRogueController.em1);
    Net_1.Net.Register(19556, ActivityPermanentRogueController.Fw1);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15725);
    Net_1.Net.UnRegister(26602);
    Net_1.Net.UnRegister(22541);
    Net_1.Net.UnRegister(18299);
    Net_1.Net.UnRegister(24529);
    Net_1.Net.UnRegister(24963);
    Net_1.Net.UnRegister(19556);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseLoadingView, this.wGi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseLoadingView, this.wGi);
  }
  OnShowActivityFirstUnlockView(e) {
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(30);
  }
  static SetReturnToWorld(e) {
    if (RogueResDungeonConfigById_1.configRogueResDungeonConfigById.GetConfig(e)) {
      ActivityPermanentRogueController.vrh = e;
      ActivityPermanentRogueController.pO1 = true;
    }
  }
  static GetCurrentActivityData() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityPermanentRogueController.ActivityId);
    if (e) {
      return e;
    }
  }
  RequestIllustrationAward(l) {
    var e = new Protocol_1.Aki.Protocol.khc();
    e.GNc = l;
    Net_1.Net.Call(25351, e, t => {
      if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 29852);
      } else {
        if (t.wQ1) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Text_EchoLimit_Text");
        }
        this.CNe.SetIllustratedRewardGot(l);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate);
        var o = new Set();
        let e = [];
        for (const r of l) {
          var n = RogueResCollectionByIdKey_1.configRogueResCollectionByIdKey.GetConfig(r);
          for (const i of e = n.Type === 0 ? this.CNe.GetTokenInSeason(r) : n.Type === 1 ? this.CNe.GetEventNormalInSeason(r) : this.CNe.GetEventMapInSeason(r)) {
            o.add(i);
          }
        }
        for (const a of e) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, a);
        }
      }
    });
  }
  static async RequestRogueResTalentSkillLevel(e) {
    var t = new Protocol_1.Aki.Protocol.Mhc();
    t.r5n = e;
    var t = await Net_1.Net.CallAsync(18456, t);
    if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 15729);
    } else {
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpgradeSkill(e, t.F6n);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResTalentLevelUp, e);
    }
  }
  static async RequestRogueResLastInstInfo() {
    var e = new Protocol_1.Aki.Protocol.bEc();
    var e = await Net_1.Net.CallAsync(20032, e);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18465);
    }
    return e;
  }
  static RequestRogueResEndingReward(t, o, e) {
    var n = new Protocol_1.Aki.Protocol.bhc();
    n.UHn = t;
    n.c5n = e;
    Net_1.Net.Call(20579, n, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22134);
      } else {
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetEndingAwardData(o);
        e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardViewData(t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, t);
      }
    });
  }
  static async OpenSeasonMainView() {
    var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetNewSeasonId();
    return !!UiManager_1.UiManager.IsViewOpen("RogueSeasonEntranceView") || (Log_1.Log.CheckInfo() && Log_1.Log.Info("RogueBattle", 77, "肉鸽赛季界面数据:", ["seasonId:", e]), (await UiManager_1.UiManager.OpenViewAsync("RogueSeasonEntranceView", e)) !== undefined);
  }
}
(exports.ActivityPermanentRogueController = ActivityPermanentRogueController).ActivityId = 0;
ActivityPermanentRogueController.vrh = 0;
ActivityPermanentRogueController.pO1 = false;
ActivityPermanentRogueController.R6c = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateIllustrateState(e);
};
ActivityPermanentRogueController.RequestTaskAward = t => {
  var e = new Protocol_1.Aki.Protocol.Uhc();
  e.v9n = t;
  Net_1.Net.Call(17613, e, e => {
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23573);
    } else {
      ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().SetTaskRewardGot(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PermanentRogueRewardUpdate);
    }
  });
};
ActivityPermanentRogueController.A6c = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateTaskNotify(e);
};
ActivityPermanentRogueController.P6c = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.InitCurrency(e.V2s);
};
ActivityPermanentRogueController.x6c = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateCurrency(e.$2s, e.sps);
};
ActivityPermanentRogueController.em1 = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateTotalShopItem(e.UHn, e.Cd1);
};
ActivityPermanentRogueController.Fw1 = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.UpdateSkillTreeUnlockState(e.r5n);
};
ActivityPermanentRogueController.Is1 = e => {
  ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetActivityData().UpdateEndingNotify(e);
}; //# sourceMappingURL=ActivityPermanentRogueController.js.map