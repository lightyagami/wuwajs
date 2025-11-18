"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseModel = undefined;
const Info_1 = require("../../../Core/Common/Info");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../Activity/ActivityControllerHolder");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const TowerDefenseEventController_1 = require("../TowerDefenseEvent/TowerDefenseEventController");
const TrapDefenseBattleInventoryData_1 = require("./Data/BattleItem/TrapDefenseBattleInventoryData");
const TrapDefenseRewardData_1 = require("./Data/Reward/TrapDefenseRewardData");
const TrapDefenseShopData_1 = require("./Data/Shop/TrapDefenseShopData");
const TrapDefenseTalentTreeData_1 = require("./Data/TalentTree/TrapDefenseTalentTreeData");
const TrapDefenseBattleData_1 = require("./Data/TrapDefenseBattleData");
const TrapDefenseLevelModeData_1 = require("./Data/TrapDefenseLevelModeData");
const TrapDefenseRougeModeData_1 = require("./Data/TrapDefenseRougeModeData");
const TrapDefenseMapModel_1 = require("./Map/TrapDefenseMapModel");
const TrapDefenseBdBuffSelectViewModel_1 = require("./ViewModel/TrapDefenseBdBuffSelectViewModel");
const TrapDefenseBdQualityViewModel_1 = require("./ViewModel/TrapDefenseBdQualityViewModel");
const TrapDefenseBdSumViewModel_1 = require("./ViewModel/TrapDefenseBdSumViewModel");
const TrapDefenseBuildingDevelopViewModel_1 = require("./ViewModel/TrapDefenseBuildingDevelopViewModel");
const TrapDefenseFixedRewardViewModel_1 = require("./ViewModel/TrapDefenseFixedRewardViewModel");
const TrapDefenseMainLevelViewModel_1 = require("./ViewModel/TrapDefenseMainLevelViewModel");
const TrapDefenseMonsterViewModel_1 = require("./ViewModel/TrapDefenseMonsterViewModel");
const TrapDefenseRewardViewModel_1 = require("./ViewModel/TrapDefenseRewardViewModel");
const TrapDefenseRougeLevelViewModel_1 = require("./ViewModel/TrapDefenseRougeLevelViewModel");
const TrapDefenseShopViewModel_1 = require("./ViewModel/TrapDefenseShopViewModel");
const TrapDefenseTalentTreeViewModel_1 = require("./ViewModel/TrapDefenseTalentTreeViewModel");
class TrapDefenseModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LevelModeData = undefined;
    this.RougeModeData = undefined;
    this.RewardData = undefined;
    this.TalentTreeData = undefined;
    this.LevelDataFromInstIdMap = new Map();
    this.LevelDataFromIdMap = new Map();
    this.CheckCanOpenViewMap = new Map();
    this.ViewModelBdSum = TrapDefenseBdSumViewModel_1.TrapDefenseBdSumViewModel.Create(this);
    this.ViewModelBdQuality = TrapDefenseBdQualityViewModel_1.TrapDefenseBdQualityViewModel.Create(this);
    this.ViewModeBdBuffSelect = TrapDefenseBdBuffSelectViewModel_1.TrapDefenseBdBuffSelectViewModel.Create(this);
    this.ViewModelReward = TrapDefenseRewardViewModel_1.TrapDefenseRewardViewModel.Create();
    this.ViewModelMonster = TrapDefenseMonsterViewModel_1.TrapDefenseMonsterViewModel.Create(this);
    this.ViewModelTalentTree = TrapDefenseTalentTreeViewModel_1.TrapDefenseTalentTreeViewModel.Create();
    this.ViewModelFixedReward = TrapDefenseFixedRewardViewModel_1.TrapDefenseFixedRewardViewModel.Create(this);
    this.ViewModelMainLevel = TrapDefenseMainLevelViewModel_1.TrapDefenseMainLevelViewModel.Create(this);
    this.ViewModelRougeLevel = TrapDefenseRougeLevelViewModel_1.TrapDefenseRougeLevelViewModel.Create(this);
    this.ViewModelShop = TrapDefenseShopViewModel_1.TrapDefenseShopViewModel.Create();
    this.BattleData = TrapDefenseBattleData_1.TrapDefenseBattleData.Create();
    this.MapData = TrapDefenseMapModel_1.TrapDefenseMapModel.Create();
    this.ShopData = TrapDefenseShopData_1.TrapDefenseShopData.Create();
    this.BattleInventoryData = TrapDefenseBattleInventoryData_1.TrapDefenseBattleInventoryData.Create();
    this.ViewModelBuildingDevelop = TrapDefenseBuildingDevelopViewModel_1.TrapDefenseBuildingDevelopViewModel.Create(this);
    this.NeedOpenMainView = false;
    this.IsSkipMachineFullCheck = false;
    this.vwd = undefined;
    this.qto = () => !!this.LevelModeData || (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("ErrorCode_2500068_Text"), false);
    this.Vod = () => !!this.qto() && (!!this.RougeModeData.CanEnterRougeMode() || !(ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefenseRougeModeNotOpen"), 1));
  }
  OnInit() {
    this.vJc("TrapDefenseMainLevelView");
    this.vJc("TrapDefenseRougeLevelView", this.Vod);
    this.vJc("TrapDefenseFixedRewardView");
    this.vJc("TrapDefenseBdSumView");
    this.vJc("TrapDefenseBdQualityView");
    this.vJc("TrapDefenseBdBuffSelectView");
    this.vJc("TrapDefenseBdBuffGetView");
    this.vJc("TrapDefenseBdBuffStrengthenView");
    return true;
  }
  OnClear() {
    this.CheckCanOpenViewMap.forEach((e, t) => {
      UiManager_1.UiManager.RemoveOpenViewCheckFunction(t, e);
    });
    this.BattleData.Clear();
    return true;
  }
  OnLeaveLevel() {
    this.BattleData.Clear();
    return true;
  }
  vJc(e, t = this.qto) {
    UiManager_1.UiManager.AddOpenViewCheckFunction(e, t, e + ".CheckCanOpen");
    this.CheckCanOpenViewMap.set(e, t);
  }
  get NeedOpenActivityMainView() {
    var e = this.NeedOpenMainView;
    this.NeedOpenMainView = false;
    return e;
  }
  InitData(e) {
    e = e ?? this.GetActivityId();
    if (this.LevelModeData?.ActivityId !== e) {
      this.LevelModeData = TrapDefenseLevelModeData_1.TrapDefenseLevelModeData.Create(e);
      this.RougeModeData = TrapDefenseRougeModeData_1.TrapDefenseRougeModeData.Create(e);
      this.RewardData = TrapDefenseRewardData_1.TrapDefenseRewardData.Create(e);
      this.TalentTreeData = TrapDefenseTalentTreeData_1.TrapDefenseTalentTreeData.Create(e);
      this.LevelModeData.LevelDataList.length = 0;
      this.RougeModeData.LevelDataList.length = 0;
      this.LevelDataFromInstIdMap.clear();
      this.LevelDataFromIdMap.clear();
      ConfigManager_1.ConfigManager.TrapDefenseConfig.GetLevelListByActivityId(e).forEach(e => {
        e = this.e8u(e);
        this.LevelDataFromInstIdMap.set(e.Config.InstId, e);
        this.LevelDataFromIdMap.set(e.Config.Id, e);
      });
      this.LevelModeData.SortLevelDataList();
      this.RougeModeData.SortLevelDataList();
    }
  }
  UpdateActivityData(e) {
    e.mps.forEach(e => {
      this.LevelDataFromIdMap.get(e.e8n)?.ProtoUpdateData(e);
    });
    e.pHc.forEach(e => {
      this.RougeModeData.BdDataMap.get(e)?.SetUnlock(true);
    });
    e.gbd.forEach(e => {
      this.RougeModeData.BdBuffDataMap.get(e)?.SetUnlock(true);
    });
    this.ViewModelBuildingDevelop.InitDevelopInfo(e);
    this.ViewModelBuildingDevelop.SetRemainPoints(e.Bdd);
    this.RewardData?.UpdateRewardsByServerData(e.nBs);
    this.RewardData.SetLimitTime(e.CPs, e.gPs);
    this.RewardData.SpecialRewardData?.UpdateByServerData(e.CHc[0]);
    e.gHc.forEach(e => {
      this.TalentTreeData?.NodeIdMap.get(e)?.SetUnlock();
    });
    this.TalentTreeData?.SetRemainPoints(e.MKc);
    this.TalentTreeData?.SetMaxPoints(e.SKc);
    this.TalentTreeData?.RefreshLineTypeMap();
    this.MapData.InitMapData();
    this.ShopData.TryUpdateData();
    this.ywd();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate);
  }
  e8u(e) {
    switch (e.ModeType) {
      case 1:
        return this.LevelModeData.AddLevelConfig(e);
      case 2:
      case 3:
        return this.RougeModeData.AddLevelConfig(e);
      default:
        return this.LevelModeData.AddLevelConfig(e);
    }
  }
  DecomposeMachineId(e) {
    var t = e % 100;
    var i = Math.floor(e / 100) % 100;
    var r = Math.floor(e / 10000) % 100;
    return {
      MachineType: Math.floor(e / 1000000) % 100,
      DataType: r,
      Level: i,
      Branch: t
    };
  }
  ComposeMachineId(e) {
    return e.MachineType * 1000000 + e.DataType * 10000 + e.Level * 100 + e.Branch;
  }
  GetActivityId() {
    return ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.Data?.Id ?? 0;
  }
  GetCurInstToLevelData() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return this.LevelDataFromInstIdMap.get(e);
  }
  GetNextLevelData(e) {
    if (e.Config.NextId) {
      return this.LevelDataFromIdMap.get(e.Config.NextId);
    }
  }
  GetCurrentBatchData() {
    var e;
    var t = this.GetCurInstToLevelData();
    if (t) {
      e = this.BattleData.GetBatch();
      t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseWavesByLevelId(t.Id);
      if (e > 0 && e <= t.length) {
        return t[e - 1];
      } else {
        return t[0];
      }
    }
  }
  GetCurInstIsRogue() {
    var e = this.GetCurInstToLevelData();
    return !!e && e.Config.ModeType !== 1;
  }
  IsInMainline() {
    var e = this.GetCurInstToLevelData();
    return !!e && e.Config.ModeType === 1;
  }
  GetCurInstToLevelDataHasShop() {
    var e = this.GetCurInstToLevelData();
    return !!e && e.HasShop;
  }
  BdBuffSelectProcessFinish() {
    this.ViewModeBdBuffSelect.ViewProcessFinish();
    this.CheckIsNeedOpenBdBuffSelectView();
  }
  CheckIsNeedOpenBdBuffSelectView() {
    if (!this.ViewModeBdBuffSelect.ShowingViewProcess && !(this.ViewModeBdBuffSelect.BackupIdList.length <= 0)) {
      this.OpenViewBdBuffSelect(this.ViewModeBdBuffSelect.BackupIdList.shift());
    }
  }
  GetAllGetStarByLevel() {
    return this.LevelModeData.LevelDataList.reduce((e, t) => t.ReachTargetIndexList.length + e, 0) + this.RougeModeData.LevelDataList.reduce((e, t) => t.ReachTargetIndexList.length + e, 0);
  }
  OpenViewBdSum(e, t, i) {
    e = e ?? TowerDefenseEventController_1.TowerDefenseEventController.IsTowerDefenseEventInstance();
    this.ViewModelBdSum.SetIsInstance(e);
    this.ViewModelBdSum.SetJumpTabType(t);
    this.ViewModelBdSum.SetJumpBdId(i);
    UiManager_1.UiManager.OpenView("TrapDefenseBdSumView");
  }
  OpenViewBdQuality(e, t, i, r) {
    e = this.RougeModeData.BdDataMap.get(e) ?? this.RougeModeData.BdDataList[0];
    r = r ? this.RougeModeData.BdBuffDataMap.get(r) : undefined;
    this.ViewModelBdQuality.SetCurSelectBdData(e);
    this.ViewModelBdQuality.SetCurSelectBdBuffData(r);
    this.ViewModelBdQuality.SetNewQualityMode(!!i);
    this.ViewModelBdQuality.SetShowQuality(t);
    UiManager_1.UiManager.OpenView("TrapDefenseBdQualityView");
  }
  OpenViewBdBuffSelect(e, t) {
    return !(e.length <= 0) && !(this.ViewModeBdBuffSelect.SetBuffList(e, t), this.ViewModeBdBuffSelect.OnOpenView(), UiManager_1.UiManager.OpenView("TrapDefenseBdBuffSelectView"), 0);
  }
  OpenViewBdBuffNewGet(e, t = true) {
    e = this.RougeModeData.BdBuffDataMap.get(e) ?? this.RougeModeData.BdBuffDataList[0];
    this.RougeModeData.SetLastGetBdBuffData(e);
    this.RougeModeData.SetIsCheckBdProgress(t);
    UiManager_1.UiManager.OpenView("TrapDefenseBdBuffGetView");
  }
  OpenViewBdBuffStrengthen(e, t = true) {
    e = this.RougeModeData.BdBuffDataMap.get(e) ?? this.RougeModeData.BdBuffDataList[0];
    this.RougeModeData.SetLastGetBdBuffData(e);
    this.RougeModeData.SetIsCheckBdProgress(t);
    UiManager_1.UiManager.OpenView("TrapDefenseBdBuffStrengthenView");
  }
  OpenViewMonster(e, t, i) {
    e = e ? this.LevelDataFromInstIdMap.get(e) : this.GetCurInstToLevelData();
    i = i ?? TowerDefenseEventController_1.TowerDefenseEventController.IsTowerDefenseEventInstance();
    this.ViewModelMonster.SetSelectLevelData(e);
    this.ViewModelMonster.SetJumpTabType(t);
    this.ViewModelMonster.SetIsInstance(i);
    UiManager_1.UiManager.OpenView("TrapDefenseMonsterView");
  }
  OpenViewKeySetting() {
    if (Info_1.Info.IsInTouch()) {
      ControllerHolder_1.ControllerHolder.TouchUiEditController.OpenCommonTouchUiEditView(1);
    } else {
      UiManager_1.UiManager.OpenView("CommonKeySettingView", 1);
    }
  }
  OpenViewLimitReward() {
    UiManager_1.UiManager.OpenView("TrapDefenseRewardView");
  }
  OpenViewTalentTree(e) {
    UiManager_1.UiManager.OpenView("TrapDefenseTalentTreeView", e);
  }
  OpenMainEntryView() {
    UiManager_1.UiManager.OpenView("TrapDefenseMainView");
  }
  OpenViewFixedReward() {
    UiManager_1.UiManager.OpenView("TrapDefenseFixedRewardView");
  }
  OpenViewMainLevelMode(e, t, i) {
    i = i ?? ControllerHolder_1.ControllerHolder.TowerDefenseEventController.IsTowerDefenseEventInstance();
    this.ViewModelMainLevel.SetJumpLevelData(e);
    this.ViewModelMainLevel.SetJumpDifficulty(t);
    this.ViewModelMainLevel.SetIsInstance(i);
    UiManager_1.UiManager.OpenView("TrapDefenseMainLevelView");
  }
  OpenViewRougeLevelMode(e, t) {
    t = t ?? ControllerHolder_1.ControllerHolder.TowerDefenseEventController.IsTowerDefenseEventInstance();
    this.ViewModelRougeLevel.SetJumpLevelData(e);
    this.ViewModelRougeLevel.SetIsInstance(t);
    UiManager_1.UiManager.OpenView("TrapDefenseRougeLevelView");
  }
  OpenViewShop() {
    UiManager_1.UiManager.OpenView("TrapDefenseShopView");
  }
  CheckNextLevelThreshold(e, t, i) {
    var r = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetNextLevelCostThreshold();
    return !(ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.RemainPoints < r) && !((r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(377)).IsEscViewTriggerCallBack = false, r.FunctionMap.set(1, () => {
      t();
    }), r.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenOrganDevelop(false, i, undefined, e);
    }), ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r), 0);
  }
  ProtoBdBuffAllUpdateNotify(e) {
    if (this.RougeModeData) {
      const i = new Map();
      e.x7u.forEach(e => {
        i.set(e.S9n, e);
      });
      this.RougeModeData.BdBuffDataList.forEach(e => {
        var t = i.get(e.Id);
        e.SetActive(!!t);
        e.SetLevel(t?.gG_ ?? 1);
      });
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBdBuffAllUpdate);
    } else {
      this.vwd = e;
    }
  }
  ywd() {
    if (this.vwd) {
      this.ProtoBdBuffAllUpdateNotify(this.vwd);
      this.vwd = undefined;
    }
  }
  ProtoBdBuffSelectUpdateNotify(e) {
    e = e.ob_;
    if (e) {
      if (e.D7u.length <= 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefenseBdBuffSelectEmptyListTips");
      } else {
        this.ViewModeBdBuffSelect.SetRemainRefreshCount(e.U7u);
        this.ViewModeBdBuffSelect.SetMaxRefreshCount(e.B7u);
        this.ViewModeBdBuffSelect.SetRefreshBuffCostNum(e.fm1);
        if (this.ViewModeBdBuffSelect.ShowingViewProcess) {
          this.ViewModeBdBuffSelect.BackupIdList.push(e.D7u);
        } else {
          this.ViewModeBdBuffSelect.OnOpenView();
          this.OpenViewBdBuffSelect(e.D7u);
        }
      }
    }
  }
  ProtoBdBuffGetUpdateNotify(e) {
    var t = e.Hud;
    if (t && e.x9n !== Protocol_1.Aki.Protocol.$ud.Proto_RewardSelect) {
      this.RougeModeData.CheckBdBuffGetUpdate(t.S9n, t.gG_);
    }
  }
  ProtoBdBuffRefreshResponse(e) {
    e = e.A7u;
    if (e && e.D7u.length > 0) {
      this.ViewModeBdBuffSelect.SetBuffList(e.D7u);
      this.ViewModeBdBuffSelect.SetRemainRefreshCount(e.U7u);
      this.ViewModeBdBuffSelect.SetMaxRefreshCount(e.B7u);
      this.ViewModeBdBuffSelect.SetRefreshBuffCostNum(e.fm1);
    }
  }
  async RequestBdBuffSelect(e) {
    if ((await ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestBdBuffSelect(e)) && (e = this.RougeModeData.BdBuffDataMap.get(e))) {
      e.ActiveAddBuff();
    }
  }
  ProtoChallengeUpdateNotify(e) {
    e.mPc.forEach(e => {
      this.LevelDataFromIdMap.get(e.e8n)?.ProtoUpdateData(e);
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseLevelDataListUpdate);
  }
  ProtoRewardUpdateNotify(e) {
    this.RewardData?.UpdateRewardsByServerData(e.nBs);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseRewardUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseLimitReward);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseFixedReward);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.RefreshActivityRedDot();
  }
  ProtoSpecialRewardUpdateNotify(e) {
    this.RewardData?.SpecialRewardData?.UpdateByServerData(e.CHc[0]);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseRewardUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseLimitReward);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.RefreshActivityRedDot();
  }
  ProtoTechUpdateNotify(e) {
    e.gHc.forEach(e => {
      this.TalentTreeData?.NodeIdMap.get(e)?.SetUnlock();
    });
    this.TalentTreeData?.RefreshLineTypeMap();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseTalentTreeUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseTalentTree);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.RefreshActivityRedDot();
  }
  ProtoBdUpdateNotify(e) {
    e.pHc.forEach(e => {
      this.RougeModeData.BdDataMap.get(e)?.SetUnlock(true);
    });
  }
  ProtoBdBuffUpdateNotify(e) {
    e.gbd.forEach(e => {
      this.RougeModeData.BdBuffDataMap.get(e)?.SetUnlock(true);
    });
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseBdBuffListUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseBdBuffNewUnlock);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.RefreshActivityRedDot();
  }
  ProtoTechPointUpdateNotify(e) {
    this.TalentTreeData?.SetRemainPoints(e.MKc);
    this.TalentTreeData?.SetMaxPoints(e.SKc);
    this.ViewModelBuildingDevelop.SetRemainPoints(e.Bdd);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseTalentTreeUpdate);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseTalentTree);
    ActivityControllerHolder_1.ActivityControllerHolder.ActivityTrapDefenseController?.RefreshActivityRedDot();
  }
  ProtoShopRefreshResponse(e) {
    if (e.Azc) {
      this.ShopData?.UpdateByServerData(e.Azc);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseShopRefresh);
    }
  }
  ProtoShopInitNotify(e) {
    this.ShopData?.UpdateByServerData(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseShopRefresh);
  }
  ProtoShopPurchaseResponse(e, t) {
    this.ShopData?.UpdateByServerData(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TrapDefenseShopRefresh);
  }
  RequestStartChallenge(e) {
    var t;
    if (e.IsLeaved) {
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(360)).IsEscViewTriggerCallBack = false;
      t.FunctionMap.set(1, () => {
        ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestChallenge(e, false);
      });
      t.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestChallenge(e, true);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
    } else {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestChallenge(e, false);
    }
    return true;
  }
}
exports.TrapDefenseModel = TrapDefenseModel;
//# sourceMappingURL=TrapDefenseModel.js.map