"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerController = undefined;
const BabelTowerLevelById_1 = require("../../../../../Core/Define/ConfigQuery/BabelTowerLevelById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ItemRewardController_1 = require("../../../ItemReward/ItemRewardController");
const ItemRewardDefine_1 = require("../../../ItemReward/ItemRewardDefine");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const BabelTowerData_1 = require("./BabelTowerData");
const BabelTowerSubView_1 = require("./BabelTowerSubView");
class BabelTowerController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Gec = e => {
      var t = BabelTowerController.GetBabelTowerData();
      for (const r of e.QX_) {
        (ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(r.ELl).IsDifficult ? t.HardLevelDataMap : t.NormalLevelDataMap).set(r.ELl, r);
        t.RoleLockData.set(r.ELl, r.FX_);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BabelTowerRefreshLevelInfo);
    };
    this.Nec = e => {
      var t = BabelTowerController.GetBabelTowerData();
      for (const r of e.KX_) {
        t.DeTermUnlock.set(r.HX_, r.$X_);
      }
    };
    this.Vec = e => {
      var t = BabelTowerController.GetBabelTowerData();
      for (const r of e.XX_) {
        t.BuffUnlock.set(r.WX_, r.$X_);
      }
    };
    this.jec = e => {
      var t = BabelTowerController.GetBabelTowerData();
      for (const r of e.E$s) {
        t.NormalQuest.set(r.s5n, r);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BabelTowerRefreshQuestState);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
    };
    this.Hec = e => {
      var t = BabelTowerController.GetBabelTowerData();
      for (const r of e.E$s) {
        t.DailyQuest.set(r.s5n, r);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BabelTowerRefreshQuestState);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
    };
    this.$ec = t => {
      const a = ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData;
      if (a) {
        const c = a.LevelId;
        var r = a.CurStarNum;
        const v = BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(c);
        const w = v.InstId;
        var o = v.PassStar;
        var n = o <= r;
        var l = t.JX_;
        const T = v.IsDifficult;
        if (l && T) {
          i = {
            LevelId: c,
            StarNum: r,
            PassDate: Number(MathUtils_1.MathUtils.LongToBigInt(t.Qxs)),
            PassTime: t.Y2s,
            TeamRoleIdList: ModelManager_1.ModelManager.SceneTeamModel.GetTeamRoleConfigIdList(),
            BuffIdList: a.BuffSelection,
            DeTermIdList: a.DeTermIdList
          };
          UiManager_1.UiManager.OpenView("BabelTowerSettlementView", i);
        } else {
          let e = undefined;
          var i = l ? ItemRewardDefine_1.BABEL_TOWER_SUCCESS : ItemRewardDefine_1.BABEL_TOWER_FAIL;
          if (l) {
            l = {
              NewBabelBuffIds: t.ylc,
              NewBabelDeTermIds: t.Slc,
              StarTextParam: {
                Params: [r, o],
                TextKey: n ? "Text_BabelResultOverStarNum_Text" : "Text_BabelResultUnderStarNum_Text"
              },
              TipTextId: n ? "Text_BabelResultOverStarTip_Text" : "Text_BabelResultUnderStarTip_Text"
            };
            e = {
              ConfigId: i,
              IsSuccess: true,
              BabelTowerSuccessData: l
            };
          } else {
            var s = [];
            var r = ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
            if (r) {
              for (const e of r) {
                var _ = {
                  TrainingData: e
                };
                s.push(_);
              }
            }
            e = {
              ConfigId: i,
              IsSuccess: false,
              ExploreBarDataList: s
            };
          }
          o = [];
          o.push({
            ButtonTextId: "Text_ButtonTextExit_Text",
            DescriptionTextId: undefined,
            IsTimeDownCloseView: false,
            IsClickedCloseView: false,
            OnClickedCallback: e => {
              var t;
              if (T) {
                t = {
                  IfReturnToBabelTowerMainView: true,
                  IfLeaveInstanceDungeonWhenMainViewClose: true
                };
                UiManager_1.UiManager.OpenView("BabelTowerHardLevelChoseView", t);
              } else {
                t = {
                  IfReturnToBabelTowerMainView: true,
                  IfLeaveInstanceDungeonWhenMainViewClose: true
                };
                UiManager_1.UiManager.OpenView("BabelTowerNormalLevelChoseView", t);
              }
            }
          });
          l = !t.JX_ || !n;
          if (l) {
            o.push({
              ButtonTextId: "Text_ChallengeAgain_Text",
              DescriptionTextId: undefined,
              IsTimeDownCloseView: false,
              IsClickedCloseView: false,
              OnClickedCallback: () => {
                var t = UiManager_1.UiManager.GetViewByName("ExploreRewardView").GetBottomToggleState();
                if (t && t === 1) {
                  let e = 0;
                  t = a.DeTermIdList;
                  if (t) {
                    for (const o of t) {
                      var r = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(o);
                      e += r.Star;
                    }
                  }
                  t = {
                    BabelTowerLevelId: c,
                    InstanceId: w,
                    RoleList: BabelTowerController.GetTeamRoleConfigIdListWithFill(),
                    BuffList: a?.BuffSelection ?? [-1, -1],
                    BuffCount: v.OptionalBabelBuffNum,
                    StarNumber: e
                  };
                  if (v.IsDifficult) {
                    UiManager_1.UiManager.OpenView("BabelTowerHardLevelInfoView", t);
                  } else {
                    UiManager_1.UiManager.OpenView("BabelTowerLevelInfoView", t);
                  }
                } else {
                  BabelTowerController.ReChallengeBabelTower();
                }
              }
            });
            e.StateToggle = {
              DescriptionTextId: "Text_ChangeFormation_Text"
            };
          }
          e.ButtonInfoList = o;
          ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(e);
        }
      }
    };
    this.p_c = e => {
      ModelManager_1.ModelManager.BabelTowerModel.UpdateCurrentChallengeInstDataByNotify(e);
    };
    this.mbc = e => {
      BabelTowerController.GetBabelTowerData().CurrentItemCount = e.lbc;
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityBabel";
  }
  OnCreateSubPageComponent(e) {
    return new BabelTowerSubView_1.BabelTowerSubView();
  }
  OnCreateActivityData(e) {
    BabelTowerController.ActivityId = e.s5n;
    return new BabelTowerData_1.BabelTowerData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(16044, this.Gec);
    Net_1.Net.Register(26994, this.Nec);
    Net_1.Net.Register(20499, this.Vec);
    Net_1.Net.Register(16516, this.jec);
    Net_1.Net.Register(18385, this.Hec);
    Net_1.Net.Register(20346, this.$ec);
    Net_1.Net.Register(15080, this.p_c);
    Net_1.Net.Register(28972, this.mbc);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16044);
    Net_1.Net.UnRegister(26994);
    Net_1.Net.UnRegister(20499);
    Net_1.Net.UnRegister(16516);
    Net_1.Net.UnRegister(18385);
    Net_1.Net.UnRegister(20346);
    Net_1.Net.UnRegister(15080);
    Net_1.Net.UnRegister(28972);
  }
  OnAddEvents() {}
  OnRemoveEvents() {}
  static async SelectBabelActivityDeTermRequest(e, t) {
    var r = Protocol_1.Aki.Protocol.BX_.create();
    r.eY_ = e;
    r.GX_ = t;
    var e = await Net_1.Net.CallAsync(25215, r);
    return !!e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs || !(ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27203), 1));
  }
  static BabelTowerTaskRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.TX_.create();
    t.gps = e;
    Net_1.Net.Call(26988, t, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23948);
      }
    });
  }
  static BabelTowerDailyTaskRewardRequest(e) {
    var t = Protocol_1.Aki.Protocol.LX_.create();
    t.gps = e;
    Net_1.Net.Call(21957, t, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25636);
      }
    });
  }
  static ResetBabelTowerLevelRequest(e) {
    var t = Protocol_1.Aki.Protocol.RX_.create();
    t.eY_ = e;
    Net_1.Net.Call(26893, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22148);
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerResetLevelTips");
        }
      }
    });
  }
  static BabelTowerSettlementRequest() {
    var e = Protocol_1.Aki.Protocol.xX_.create();
    Net_1.Net.Call(27850, e, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17751);
      }
    });
  }
  static ReChallengeBabelTower() {
    var e = ModelManager_1.ModelManager.BabelTowerModel.CurrentChallengeInstData;
    var t = e.LevelId;
    var r = BabelTowerLevelById_1.configBabelTowerLevelById.GetConfig(t).InstId;
    var o = this.GetTeamRoleConfigIdListWithFill();
    this.BabelTowerStartRequest(r, o, t, e.BuffSelection ?? []);
  }
  static GetTeamRoleConfigIdListWithFill() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamRoleConfigIdList();
    for (let e = t.length; e < 3; e++) {
      t.push(0);
    }
    return t;
  }
  static BabelTowerStartRequest(e, t, r, o) {
    r = {
      ELl: r,
      TLl: o
    };
    ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.iY_ = r;
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(e, t, 0, 0).then(e => {
      if (e) {
        ModelManager_1.ModelManager.BabelTowerModel.CurrentSelectLevel = 0;
      }
    });
  }
  static GetBabelTowerData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(BabelTowerController.ActivityId);
  }
  static OnClickInstanceDungeonExitButton() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentGroupLivingState(e) !== 2) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(276)).IsEscViewTriggerCallBack = false;
      e.FunctionMap.set(1, () => {
        UiManager_1.UiManager.OpenView("BabelTowerMainView", {
          IfLeaveInstanceDungeonWhenClose: true
        });
      });
      e.FunctionMap.set(2, () => {
        this.ReChallengeBabelTower();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    }
  }
  static SaveNewLevelData(e) {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevel) ?? new Map();
    t.set(e, true);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevel, t);
  }
  static SaveNewLevelClickData(e, t) {
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevelHasClick) ?? new Map();
    r.set(e, true);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevelHasClick, r);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BabelTowerLevelClick, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BabelTowerDifficultyLevelClick, t);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityId);
  }
}
(exports.BabelTowerController = BabelTowerController).ActivityId = 0;
//# sourceMappingURL=BabelTowerController.js.map