"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PeriodicityChallengeTypeItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const TowerData_1 = require("../../TowerDetailUi/TowerData");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class PeriodicityChallengeTypeItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.q8e = 4;
    this.G8e = undefined;
    this.W5e = undefined;
    this.H5e = undefined;
    this.A5e = () => !this.W5e || this.W5e(this.q8e);
    this.N8e = e => {
      if (e === 1) {
        this.G8e(this.q8e, this.H5e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[4, UE.UIText], [8, UE.UIText], [3, UE.UISprite], [0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [7, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.H5e = this.GetExtendToggle(0);
    this.H5e?.CanExecuteChange.Bind(this.A5e);
    this.GetItem(2).SetUIActive(false);
    this.GetItem(12).SetUIActive(false);
    this.GetText(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
  }
  BindOnToggleFunc(i) {
    this.G8e = (e, t) => {
      i(e, t);
      this.BNe();
    };
  }
  BindCanToggleExecuteChange(e) {
    this.W5e = e;
  }
  Refresh(e, t, i) {
    this.q8e = e;
    var e = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(this.q8e);
    var r = this.GetText(4);
    LguiUtil_1.LguiUtil.SetLocalTextNew(r, e.Text);
    this.SetSpriteByPath(e.Icon, this.GetSprite(3), false);
    this.H5e.SetToggleState(0, false);
    this.RefreshSubText();
    this.RefreshDoubleIcon();
  }
  RefreshSubText() {
    let e = undefined;
    var t;
    if (this.q8e === 5) {
      e = this.oMd();
    } else if (this.q8e === 28) {
      e = this.nMd();
    } else if (this.q8e === 29) {
      e = this.rMd();
    }
    if (e && (this.GetItem(7).SetUIActive(e.IsFinish), this.GetItem(2).SetUIActive(e.RedPoint), this.GetText(8).SetText(e.SubText), (t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetSecondaryGuideDataConf(this.q8e))?.TimeOutDay) && this.IsTimeOutType()) {
      t = e.LeftTime <= t.TimeOutDay * TimeUtil_1.TimeUtil.OneDaySeconds;
      this.GetItem(12).SetUIActive(t);
    }
  }
  oMd() {
    var e;
    var t;
    var i;
    var r;
    var a;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10055)) {
      r = ModelManager_1.ModelManager.TowerModel;
      e = MathUtils_1.MathUtils.LongToNumber(r.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
      t = r.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
      i = r.GetDifficultyAllStars(TowerData_1.VARIATION_RISK_DIFFICULTY);
      r = r.GetDifficultyRewardProgress(TowerData_1.VARIATION_RISK_DIFFICULTY);
      a = ModelManager_1.ModelManager.TowerModel.GetMaxDifficulty();
      a = ConfigManager_1.ConfigManager.TowerClimbConfig.GetNewTowerDifficultTitle(a);
      return {
        LeftTime: e > 0 ? e : 0,
        CurrentNum: t,
        TotalNum: i,
        IsFinish: r === 1,
        RedPoint: ModelManager_1.ModelManager.AdventureGuideModel.GetPeriodicityRedDot(3, ModelManager_1.ModelManager.TowerModel.CurrentSeason),
        SubText: a
      };
    }
  }
  nMd() {
    var e;
    var t;
    var i = ActivityControllerHolder_1.ActivityControllerHolder.ActivityShipTowerController?.Data;
    if (i && i.IsUnLock()) {
      [e, t] = (i = ModelManager_1.ModelManager.ShipTowerModel).GetEndlessRewardProgressNumData();
      return {
        LeftTime: i.GetRemainTime(),
        CurrentNum: e,
        TotalNum: t,
        IsFinish: e === t && e !== 0,
        RedPoint: ModelManager_1.ModelManager.AdventureGuideModel.GetPeriodicityRedDot(6, ModelManager_1.ModelManager.ShipTowerModel.CurSeason),
        SubText: i.GetCurrentStageSeasonName2()
      };
    }
  }
  rMd() {
    var e;
    var t;
    var i;
    var r = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew;
    if (r && r.IsUnLock()) {
      e = r.Score ?? 0;
      t = r.GetCycleConfig()?.MaxScore ?? 0;
      i = ModelManager_1.ModelManager.WeeklyRogueModel?.ActivityData?.GetCycleConfig()?.CycleName ?? "";
      return {
        LeftTime: r.GetCycleRemainTime() ?? 0,
        CurrentNum: e,
        TotalNum: t,
        IsFinish: r.IsScoreRewardAllReceive(),
        RedPoint: ModelManager_1.ModelManager.AdventureGuideModel.GetPeriodicityRedDot(7, ModelManager_1.ModelManager.WeeklyRogueModel.CycleId),
        SubText: ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(i) ?? ""
      };
    }
  }
  RefreshDoubleIcon() {
    var e = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetAdventureUpActivity(this.q8e);
    var t = ModelManager_1.ModelManager.ActivityRegressModel.IsHasDoubleDrop(this.q8e);
    var e = e !== undefined || t;
    this.GetItem(1).SetUIActive(e);
  }
  BNe() {
    if (this.GetItem(2).IsUIActiveSelf()) {
      this.GetItem(2).SetUIActive(false);
      if (this.q8e === 5) {
        ModelManager_1.ModelManager.AdventureGuideModel.SetPeriodicityRedDot(3, ModelManager_1.ModelManager.TowerModel.CurrentSeason);
      } else if (this.q8e === 28) {
        ModelManager_1.ModelManager.AdventureGuideModel.SetPeriodicityRedDot(6, ModelManager_1.ModelManager.ShipTowerModel.CurSeason);
      } else if (this.q8e === 29) {
        ModelManager_1.ModelManager.AdventureGuideModel.SetPeriodicityRedDot(7, ModelManager_1.ModelManager.WeeklyRogueModel.CycleId);
      }
    }
  }
  OnSelected(e) {
    if (e) {
      this.SetSelectToggle(1);
    }
  }
  SetSelectToggle(e = 1) {
    this.GetExtendToggle(0).SetToggleStateForce(e, false, true);
    this.G8e(this.q8e, this.H5e);
  }
  GetSelfToggle() {
    return this.GetExtendToggle(0);
  }
  GetButtonItem() {
    return this.GetExtendToggle(0)?.RootUIComp;
  }
  IsTimeOutType() {
    return this.q8e === 5 || this.q8e === 28 || this.q8e === 29;
  }
}
exports.PeriodicityChallengeTypeItem = PeriodicityChallengeTypeItem;
//# sourceMappingURL=PeriodicityChallengeTypeItem.js.map