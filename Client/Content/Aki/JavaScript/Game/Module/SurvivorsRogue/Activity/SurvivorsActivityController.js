"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsActivityController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../Activity/ActivityControllerBase");
const SurvivorsActivityData_1 = require("./SurvivorsActivityData");
const SurvivorsActivitySubView_1 = require("./SurvivorsActivitySubView");
class SurvivorsActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.yUd = e => {
      var r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
      if (r) {
        for (const t of e.rUd) {
          r.RoleMap.set(t, true);
        }
        for (const o of e.iUd) {
          r.WeaponMap.set(o, true);
        }
        for (const i of e.oUd) {
          r.ItemMap.set(i, true);
        }
      }
    };
    this.hBd = e => {
      var r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
      if (r) {
        for (const t of e.L$s.E$s) {
          r.RefreshRewardTaskData(t);
        }
        if (r.GetRewardRedDotState()) {
          r.RefreshActivityRedDot();
        }
      }
    };
    this.lBd = e => {
      var r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
      if (r) {
        for (const t of e.nUd) {
          r.LevelMap.set(t.gG_, t);
        }
        r.RefreshActivityRedDot();
      }
    };
    this.sGd = e => {
      var r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
      if (r) {
        r.RefreshTalentTreeNode(e.r5n, 0);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueTalentNodeUpdate, e.r5n);
      }
    };
    this.DSe = (e, r) => {
      var t = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
      if (t) {
        t.OnQuestStateChange(e, r);
      }
    };
    this.qdi = (e, r) => {
      var t = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRogueActivityConfig();
      if (t && e === t.ScoreItemId) {
        ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.RefreshActivityRedDot();
      }
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_SurvivorsActivity";
  }
  OnCreateSubPageComponent(e) {
    return new SurvivorsActivitySubView_1.SurvivorsActivitySubView();
  }
  OnCreateActivityData(e) {
    return new SurvivorsActivityData_1.SurvivorsActivityData();
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21173, this.yUd);
    Net_1.Net.Register(23191, this.hBd);
    Net_1.Net.Register(16470, this.lBd);
    Net_1.Net.Register(26937, this.sGd);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21173);
    Net_1.Net.UnRegister(23191);
    Net_1.Net.UnRegister(16470);
    Net_1.Net.UnRegister(26937);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnQuestStateChange, this.DSe);
  }
  static RequestGetRewardTask(o) {
    var e = new Protocol_1.Aki.Protocol.TLd();
    e.Pb_ = o;
    Net_1.Net.Call(22217, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21848);
        } else {
          var r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
          if (r) {
            for (const t of o) {
              r.SetRewardTaskDataDone(t);
            }
            r.RefreshActivityRedDot();
          }
        }
      }
    });
  }
  static RequestGetRewardScore(o) {
    var e = new Protocol_1.Aki.Protocol.RLd();
    e.Pb_ = o;
    Net_1.Net.Call(16882, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22874);
        } else {
          var r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
          if (r) {
            for (const t of o) {
              r.RefreshGotMilestoneReward(t);
            }
            r.RefreshActivityRedDot();
          }
        }
      }
    });
  }
  static SurvivorsTalentLevelUpRequest(t, o) {
    var e = new Protocol_1.Aki.Protocol.PLd();
    e.r5n = t;
    Net_1.Net.Call(27147, e, e => {
      var r;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19614);
        } else if (r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData) {
          r.RefreshTalentTreeNode(t, e.F6n);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SurvivorsRogueTalentNodeUpdate, t);
          o();
        }
      }
    });
  }
  static CheckIsActivityClose() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    if (e && e.CheckIfClose()) {
      ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
    }
  }
  async OnOpenSubView(e) {
    var r = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    if (r && e === "SurvivorsRogueMainView") {
      if (r.GetPreGuideQuestFinishState()) {
        UiManager_1.UiManager.OpenView("SurvivorsRogueMainView");
        return Promise.resolve(true);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SurvivorsEnterUnFinishedPreQuestTips");
        return Promise.resolve(false);
      }
    } else {
      return Promise.resolve(false);
    }
  }
  OnGetIsOpeningActivityRelativeView() {
    if (ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData) {
      for (const e of ["SurvivorsRogueMainView", "SurvivorsTeamEditView", "SurvivorsRogueSettleExternalView", "SurvivorsTalentTreeView", "SurvivorsHandbookView"]) {
        if (UiManager_1.UiManager.IsViewOpen(e)) {
          return true;
        }
      }
    }
    return false;
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("SurvivorsRogueActivityUnlockView");
  }
}
exports.SurvivorsActivityController = SurvivorsActivityController;
//# sourceMappingURL=SurvivorsActivityController.js.map