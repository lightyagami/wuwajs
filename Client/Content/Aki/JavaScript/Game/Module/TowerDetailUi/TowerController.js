"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation");
const UiManager_1 = require("../../Ui/UiManager");
const BlackScreenController_1 = require("../BlackScreen/BlackScreenController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController");
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const TowerData_1 = require("./TowerData");
const TowerModel_1 = require("./TowerModel");
const TOWER_SUCCESS_NO_REWARD = 3008;
const TOWER_FAIL = 3009;
class TowerController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.$5e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.$5e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(21717, this.wLo);
    Net_1.Net.Register(27092, this.BLo);
    Net_1.Net.Register(19984, this.bLo);
    Net_1.Net.Register(16622, this.qLo);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21717);
    Net_1.Net.UnRegister(27092);
    Net_1.Net.UnRegister(19984);
    Net_1.Net.UnRegister(16622);
  }
  static async RefreshTower() {
    var e = Protocol_1.Aki.Protocol.JCs.create({});
    var e = await Net_1.Net.CallAsync(21823, e);
    if (e?.wGs) {
      ModelManager_1.ModelManager.TowerModel.MaxUnlockDifficulty = e.wGs;
      if (e.wGs === TowerData_1.OVERLOCK_RISK_DIFFICULTY) {
        UiManager_1.UiManager.OpenView("TowerOverLockUnlockView", e.wGs);
      } else {
        UiManager_1.UiManager.OpenView("TowerUnlockView", e.wGs);
      }
    }
    if (e.UGs?.EGs && e.UGs.EGs > 0) {
      ModelManager_1.ModelManager.TowerModel.SaveHandleData();
      ModelManager_1.ModelManager.TowerModel.NeedOpenReviveView = true;
      ModelManager_1.ModelManager.TowerModel.DeleteVariationTowerInfo();
      ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.UGs);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefreshStars);
    }
  }
  static async TowerStartRequest(e, o, r = true) {
    var t = new Protocol_1.Aki.Protocol.r0s();
    var n = [];
    for (const i of o) {
      if (r && !ModelManager_1.ModelManager.TowerModel.IsRoleCostEnough(i)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamCant");
        return;
      }
      var a = {
        Q6n: i,
        sjn: 0
      };
      n.push(a);
    }
    BlackScreenController_1.BlackScreenController.AddBlackScreen("None", "TowerStartRequest");
    t.ajn = n;
    t.hjn = e;
    t = await Net_1.Net.CallAsync(15622, t).finally(() => {
      BlackScreenController_1.BlackScreenController.RemoveBlackScreen("None", "TowerStartRequest");
    });
    if (t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (t.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate) {
        this.OpenSeasonUpdateConfirm();
        return;
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 26649);
        return;
      }
    }
    ModelManager_1.ModelManager.TowerModel.CurrentTowerId = e;
    ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation = o;
    ModelManager_1.ModelManager.TowerModel.CurrentSelectFloor = -1;
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
  }
  static TowerResetRequest(e) {
    var o = new Protocol_1.Aki.Protocol.n0s();
    o.hjn = e;
    Net_1.Net.Call(20148, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate) {
          this.OpenSeasonUpdateConfirm();
          return;
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27715);
          return;
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh);
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("ResetConfirm");
    });
  }
  static TowerRewardRequest(o, e, r) {
    var t = new Protocol_1.Aki.Protocol.t0s();
    t.ljn = o;
    t.I9n = e;
    t.Xhc = r;
    Net_1.Net.Call(19126, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate) {
          this.OpenSeasonUpdateConfirm();
          return;
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20811);
          return;
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRewardReceived);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotTowerReward);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotTowerRewardByDifficulties, o);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotTowerRewardByDifficulties, 5);
    });
  }
  static async TowerFormationRecommendRequest(e) {
    var o = new Protocol_1.Aki.Protocol.ZCs();
    o.hjn = e;
    var e = await Net_1.Net.CallAsync(26287, o);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate) {
        this.OpenSeasonUpdateConfirm();
        return;
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19669);
        return;
      }
    }
    if (e.kVn?.length > 0) {
      ModelManager_1.ModelManager.TowerModel.RecommendFormation = e.kVn;
    } else {
      ModelManager_1.ModelManager.TowerModel.RecommendFormation = undefined;
    }
  }
  static TowerApplyFloorDataRequest(e) {
    var o = new Protocol_1.Aki.Protocol.a0s();
    o._jn = e;
    Net_1.Net.Call(24027, o, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerSeasonUpdate) {
          this.OpenSeasonUpdateConfirm();
          return;
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18778);
          return;
        }
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRefresh);
    });
  }
  static GLo() {
    var e = Protocol_1.Aki.Protocol.XCs.create({});
    Net_1.Net.Call(23982, e, e => {
      ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.UGs);
    });
  }
  static OpenTowerSettlementView(e) {
    const o = ModelManager_1.ModelManager.TowerModel;
    var r = o.CurrentTowerId;
    var t = o.GetHaveChallengeFloorAndFormation(r);
    const n = [];
    const a = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNextFloorInArea(r);
    n.push({
      ButtonTextId: "Text_BackToTower_Text",
      DescriptionTextId: undefined,
      IsTimeDownCloseView: false,
      IsClickedCloseView: true,
      OnClickedCallback: () => {
        this.BackToTowerView();
      }
    });
    let i = undefined;
    if (e && t) {
      n.pop();
      n.push({
        ButtonTextId: "Text_ButtonTextConfirmResult_Text",
        DescriptionTextId: undefined,
        IsTimeDownCloseView: false,
        IsClickedCloseView: true,
        OnClickedCallback: () => {
          this.NLo(false, e);
        }
      });
    } else if (e && a && !t) {
      t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(a);
      c = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerAreaName(a);
      n.push({
        ButtonTextId: "Text_ButtonTextContinue_Text",
        DescriptionTextId: "Text_ButtonTextGoOnTower_Text",
        DescriptionArgs: [c, t.Floor],
        IsTimeDownCloseView: false,
        IsClickedCloseView: true,
        OnClickedCallback: () => {
          this.OLo(a);
        }
      });
    } else if (!e || !a) {
      o.NeedChangeFormation = false;
      n.push({
        ButtonTextId: "Text_ButtonTextChallengeOneMore_Text",
        DescriptionTextId: undefined,
        IsTimeDownCloseView: false,
        IsClickedCloseView: true,
        OnClickedCallback: () => {
          if (ModelManager_1.ModelManager.TowerModel.NeedChangeFormation) {
            this.OLo();
          } else {
            this.ReChallengeTower();
          }
        }
      });
      i = {
        DescriptionTextId: "Text_ChangeFormation_Text",
        OnToggleClick: e => {
          o.NeedChangeFormation = e === 1;
        }
      };
    }
    if (e) {
      const g = [];
      var l = ConfigManager_1.ConfigManager.TowerClimbConfig.GetFloorTarget(r);
      var _ = ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor.StarIndex;
      for (let e = 0; e < TowerModel_1.FLOOR_STAR; e++) {
        var s = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTargetConfig(l[e]);
        var d = [];
        for (const C of s.Params) {
          d.push(C.toString());
        }
        var M = _.includes(e);
        var s = {
          Target: d,
          DescriptionTextId: s.DesText,
          IsReached: M
        };
        g.push(s);
      }
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(TOWER_SUCCESS_NO_REWARD, e, undefined, undefined, undefined, n, g, i);
      }, ModelManager_1.ModelManager.TowerModel.TowerSettlementDelayTime);
    } else {
      const w = [];
      var c = ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
      if (c) {
        for (const v of c) {
          var T = {
            TrainingData: v
          };
          w.push(T);
        }
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          ItemRewardController_1.ItemRewardController.OpenExploreRewardView(TOWER_FAIL, e, undefined, undefined, w, n, undefined, i);
        }, ModelManager_1.ModelManager.TowerModel.TowerSettlementDelayTime);
      }
    }
  }
  static kLo() {
    UiManager_1.UiManager.ResetToBattleView(() => {
      if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
        this.LeaveTower();
      }
    });
  }
  static async LeaveTower() {
    ModelManager_1.ModelManager.TowerModel.CurrentTowerId = -1;
    await InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
  }
  static OLo(e) {
    ModelManager_1.ModelManager.TowerModel.OpenTowerFormationView(e ?? ModelManager_1.ModelManager.TowerModel.CurrentTowerId);
  }
  static ReChallengeTower() {
    ModelManager_1.ModelManager.TowerModel.IsWaitTowerStart = true;
    this.TowerStartRequest(ModelManager_1.ModelManager.TowerModel.CurrentTowerId, ModelManager_1.ModelManager.TowerModel.CurrentTowerFormation, false);
  }
  static NLo(e, o) {
    if (o) {
      ModelManager_1.ModelManager.TowerModel.SaveNeedOpenConfirmView();
    }
    if (!e) {
      o = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmViewTowerId);
      UiManager_1.UiManager.OpenView("TowerFloorView", o.AreaNum);
    }
  }
  static BackToTowerView(e) {
    this.OpenTowerView(true).finally(e);
  }
  static async OpenTowerView(e = false) {
    await this.RefreshTower();
    return this.FLo(e);
  }
  static async FLo(e = false) {
    let o = 1;
    o = e ? ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(ModelManager_1.ModelManager.TowerModel.CurrentTowerId).Difficulty : ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
    const r = new CustomPromise_1.CustomPromise();
    if (o === TowerData_1.VARIATION_RISK_DIFFICULTY) {
      UiManager_1.UiManager.OpenView("TowerVariationView", undefined, e => {
        ModelManager_1.ModelManager.TowerModel.OpenReviewView();
        r.SetResult(e);
      });
    } else {
      UiManager_1.UiManager.OpenView("TowerNormalView", undefined, e => {
        ModelManager_1.ModelManager.TowerModel.OpenReviewView();
        r.SetResult(e);
      });
    }
    return r.Promise;
  }
  static OpenSeasonUpdateConfirm() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(99);
    var o = () => {
      this.kLo();
    };
    e.FunctionMap.set(1, o);
    e.FunctionMap.set(2, o);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static OpenTowerGuide() {
    UiManager_1.UiManager.OpenView("TowerGuideView");
  }
  static ClearAllHatredInTower() {
    for (const o of ModelManager_1.ModelManager.FormationDataModel.PlayerAggroSet) {
      var e = EntitySystem_1.EntitySystem.Get(o)?.GetComponent(50)?.AiController?.AiHateList;
      if (e) {
        e.ClearHatred(0);
      }
    }
  }
}
exports.TowerController = TowerController;
(_a = TowerController).RQe = (e, o) => {
  if (e === 10055 && o) {
    _a.GLo();
  }
};
TowerController.$5e = () => {
  var e;
  ModelManager_1.ModelManager.TowerModel.IsWaitTowerStart = false;
  ModelManager_1.ModelManager.TowerModel.IsWaitTowerSettlement = false;
  _a.GLo();
  if (ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmView) {
    e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(ModelManager_1.ModelManager.TowerModel.NeedOpenConfirmViewTowerId);
    UiManager_1.UiManager.OpenView("TowerFloorView", e.AreaNum);
  }
  if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
    UiTimeDilation_1.UiTimeDilation.AddWaitSetTimeDilationTag("TowerGuide");
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      _a.OpenTowerGuide();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnShowTowerGuideButton);
    }, ModelManager_1.ModelManager.TowerModel.TowerGuideDelayTime);
  }
};
TowerController.wLo = e => {
  ModelManager_1.ModelManager.TowerModel.RefreshTowerInfo(e.UGs);
};
TowerController.bLo = e => {
  ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByFloor(e.DGs);
};
TowerController.BLo = e => {
  ModelManager_1.ModelManager.TowerModel.RefreshTowerInfoByDifficulty(e.IGs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, TowerModel_1.TOWER_LOOP_ACTIVITY_ID);
};
TowerController.qLo = e => {
  var o;
  if (e.xGs && !ModelManager_1.ModelManager.TowerModel.GetIsInOnceTower()) {
    _a.OpenSeasonUpdateConfirm();
  } else if (!ModelManager_1.ModelManager.TowerModel.IsWaitTowerStart) {
    ModelManager_1.ModelManager.TowerModel.IsWaitTowerSettlement = true;
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    if (e.KRs) {
      o = e.bGs;
      ModelManager_1.ModelManager.TowerModel.CurrentNotConfirmedFloor = new TowerData_1.TowerFloorInfo(o.hjn, o.rxs, o.ajn, o.AGs, o.zWc);
    }
    UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("TowerGuide");
    _a.ClearAllHatredInTower();
    _a.OpenTowerSettlementView(e.KRs);
  }
}; //# sourceMappingURL=TowerController.js.map