"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneGameplayPanel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById");
const ExchangeRewardById_1 = require("../../../../../Core/Define/ConfigQuery/ExchangeRewardById");
const MapMarkByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkByMarkId");
const MapMarkPhantomGroupByMarkId_1 = require("../../../../../Core/Define/ConfigQuery/MapMarkPhantomGroupByMarkId");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const HelpController_1 = require("../../../Help/HelpController");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const LevelPlay_1 = require("../../../LevelPlay/LevelPlay");
const MapHelper_1 = require("../../../Map/MapHelper");
const MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const SceneGameplayTipGrid_1 = require("./SceneGameplayTipGrid");
const HELP_ID = 88;
const HELP_ID_2 = 348;
const POWER_COST_KEY = "power";
const REBORN_TIME_KEY = "reborn";
const REWARD_SHARE_COUNT = "reward";
const TARGET_ITEM_SHOW_TYPE = 41;
class SceneGameplayPanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.Ymt = undefined;
    this.u2o = undefined;
    this.O2o = undefined;
    this.k2o = undefined;
    this.F2o = undefined;
    this.V2o = undefined;
    this.IRe = undefined;
    this.U2o = undefined;
    this.rFo = undefined;
    this.nFo = false;
    this.Jsd = false;
    this.mji = () => {
      HelpController_1.HelpController.OpenHelpById(HELP_ID);
    };
    this.XDu = () => {
      HelpController_1.HelpController.OpenHelpById(HELP_ID_2);
    };
    this.OnDetailBtnClick = () => {
      var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(this.Ymt.Id);
      if (e.IsOccupied) {
        e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e.QuestId);
        UiManager_1.UiManager.OpenView("QuestView", e.TreeConfigId);
      }
    };
    this.OnStripBtnClick = () => {
      ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab = true;
      ModelManager_1.ModelManager.CalabashModel.OnlyMonsterCostShowMaxLevel = 3;
      var e = MapMarkPhantomGroupByMarkId_1.configMapMarkPhantomGroupByMarkId.GetConfig(this.u2o.MarkId);
      ModelManager_1.ModelManager.CalabashModel.OnlyShowPhantomFetterGroupIdList = e.ShowRange;
      UiManager_1.UiManager.OpenView("CalabashRootView");
    };
    this.aFo = () => {
      UiManager_1.UiManager.OpenView("SilentAreaRewardPreviewPopView", this.Ymt.RewardId);
    };
    this.OnConfirmBtnClick = () => {
      this.HandleTeleport();
    };
  }
  GetResourceId() {
    return "UiView_InstanceEntranceTip_Prefab_2";
  }
  OnStart() {
    this.U2o = new TipsListView_1.TipsListView();
    this.U2o.Initialize(this.GetVerticalLayout(5));
    super.OnStart();
  }
  OnBeforeDestroy() {
    this.U2o.Clear();
    this.rFo = undefined;
    if (this.O2o) {
      this.AddChild(this.O2o);
      this.O2o = undefined;
    }
    if (this.k2o) {
      this.AddChild(this.k2o);
      this.k2o = undefined;
    }
    this.F2o = undefined;
    this.V2o = undefined;
    this.cG();
    ModelManager_1.ModelManager.CalabashModel.ClearOnlyShowData();
    super.OnBeforeDestroy();
  }
  OnShowWorldMapSecondaryUi(e) {
    if (e) {
      this.u2o = e;
      this.LayoutContext.MarkItem = e;
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), false);
      this.Ymt = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(e.MarkConfig.RelativeId);
      if (!this.Ymt) {
        this.Ymt = new LevelPlay_1.LevelPlayInfo(e.MarkConfig.RelativeId);
        this.Ymt.InitConfig();
      }
      this.IRe = undefined;
      this.nFo = this.u2o?.MarkConfig?.RelativeSubType === 1 || this.u2o?.MarkConfig?.RelativeSubType === 2;
      this.SHe();
      this.l_i();
      this.hFo();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 17, "玩法弹窗打开错误，地图标记不存在");
    }
  }
  OnCloseWorldMapSecondaryUi() {
    this.U2o.Clear();
    if (this.IRe) {
      TimerSystem_1.TimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
    this.rFo = undefined;
    ModelManager_1.ModelManager.CalabashModel.ClearOnlyShowData();
  }
  SHe() {
    var e;
    var i;
    var t = this.u2o?.MarkConfig?.RelativeSubType === 9;
    this.F2o = t ? this.u2o?.MarkConfig?.Reward ? ExchangeRewardById_1.configExchangeRewardById.GetConfig(this.u2o.MarkConfig.Reward) : undefined : this.Ymt.RewardId ? ExchangeRewardById_1.configExchangeRewardById.GetConfig(this.Ymt.RewardId) : undefined;
    this.V2o = this.Ymt.FirstRewardId ? ExchangeRewardById_1.configExchangeRewardById.GetConfig(this.Ymt.FirstRewardId) : undefined;
    var t = this.u2o.MarkConfigId;
    var r = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(t);
    if (r) {
      e = (i = this.u2o.IsRelativeFunctionOpen()) ? r.MarkTitle : "UnknownPlace";
      this.GetText(1).ShowTextNew(e);
      e = i ? r.MarkDesc : "UnknownPlaceContent";
      this.GetText(4).ShowTextNew(e);
      this.lFo();
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
      this.GetButton(18).RootUIComp?.SetUIActive(this.u2o.MarkConfig.RelativeSubType === 1 || this.u2o.MarkConfig.RelativeSubType === 9);
      r = !(i = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(this.Ymt.Id)).IsOccupied && MarkUiUtils_1.MarkUiUtils.IsShowGoto(this.u2o);
      if (i.IsOccupied) {
        this.ConfirmButton.SetActive(false);
      } else {
        this.ConfirmButton.SetActive(!r);
      }
      this.UpdateMarkItemRelativeLayout();
      this.UpdateQuickGotoActive(r);
      this.InitRewards();
      this.W2o();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneGameplay", 17, "缺少标记配置", ["MarkId", t]);
    }
  }
  lFo() {
    let e = 0;
    if ((e = this.F2o?.Cost.has(ItemDefines_1.EItemId.Power) ? this.F2o.Cost.get(ItemDefines_1.EItemId.Power) : e) > 0) {
      (r = this.U2o.AddItemByKey(POWER_COST_KEY)).SetIconByItemId(ItemDefines_1.EItemId.Power);
      r.SetClickHelpFunc(this.mji);
      r.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ?? "");
      r.SetRightText("x" + e.toString());
    }
    this.rFo = this.U2o.AddItemByKey(REBORN_TIME_KEY);
    this.rFo?.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("LastTimeToRefresh") ?? "");
    this.rFo?.SetHelpButtonVisible(false);
    this.rFo?.SetActive(false);
    var i;
    var t;
    var r = this.u2o?.MarkConfig?.RelativeSubType === 9;
    if (r && (r = this.u2o?.MarkConfig?.MapId, i = this.u2o?.MarkConfig?.RelativeId, ModelManager_1.ModelManager.AdventureGuideModel.IsNightMareHaveConfig(r, i))) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestLevelPlayVarAsync(r, i).then(() => {
        var e;
        var i = ModelManager_1.ModelManager.AdventureGuideModel.GetNightMareTarget(this.u2o.MarkConfig.MapId, this.u2o.MarkConfig.RelativeId);
        if (!(i[1] <= 0)) {
          this.Jsd = i[0] > 0;
          this.hFo();
          (e = this.U2o.AddItemByKey(REWARD_SHARE_COUNT)).SetClickHelpFunc(this.XDu);
          e.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("NightMareSceneGameplayPanelTips") ?? "");
          e.SetRightText(StringUtils_1.StringUtils.Format("{0}/{1}", i[0].toString(), i[1].toString()));
        }
      });
    }
    var r = this.F2o?.SharedId ?? 0;
    if (r > 0 && (i = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetShareMaxCount(this.F2o.SharedId)) > 0) {
      r = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(r);
      (t = this.U2o.AddItemByKey(REWARD_SHARE_COUNT)).SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RemainingCollectTimes") ?? "");
      t.SetRightText(StringUtils_1.StringUtils.Format("{0}/{1}", (i - r).toString(), i.toString()));
      t.SetHelpButtonVisible(false);
    }
  }
  W2o() {
    var e = ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(this.Ymt.Id);
    this.GetItem(12).SetUIActive(e.IsOccupied);
    if (e.IsOccupied) {
      e = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(e.QuestId);
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.TreeConfigId);
      e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Quest_Require_Note") ?? "", e.Name);
      this.GetText(13).SetText(e);
    }
    this.GetItem(17).SetUIActive(this.u2o.MarkConfig.RelativeSubType === 1 || this.u2o.MarkConfig.RelativeSubType === 9);
  }
  InitRewards() {
    var [e, i, t, r, a] = MapHelper_1.MapHelper.GetDoubleRestAndMaxTimes(this.u2o);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), r, i, t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(42), a);
      this.GetText(42).SetUIActive(e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(42), "Double_reward_tips_02");
    }
    this.GetItem(19).SetUIActive(e);
    if (!this.O2o) {
      r = this.GetItem(8).GetOwner();
      i = this.GetVerticalLayout(7).RootUIComp;
      this.k2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid();
      this.k2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, i));
      this.O2o = new SceneGameplayTipGrid_1.SceneGameplayTipGrid();
      this.O2o.Initialize(LguiUtil_1.LguiUtil.DuplicateActor(r, i));
      this.O2o.OnClickPreviewCall = this.aFo;
    }
    var t = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    this.k2o?.SetBtnPreviewVisible(false);
    this.O2o.SetBtnPreviewVisible(this.nFo);
    var a = this.Ymt.IsFirstPass;
    if (a) {
      this.K2o(this.k2o, undefined, 0, "");
    } else {
      this.K2o(this.k2o, this.V2o, t, "FirstReward");
    }
    this.K2o(this.O2o, this.F2o, t, "ProbReward", e);
  }
  K2o(e, r, a, i, s = false) {
    if (r) {
      var h = r.PreviewReward;
      let t = undefined;
      for (let e = a; e >= 0; e--) {
        if (h.has(e)) {
          t = h.get(e).MapIntInt;
          break;
        }
      }
      if (!t) {
        var o = r.RewardId;
        let i = 0;
        for (let e = a; e >= 0; e--) {
          if (o.has(e)) {
            i = o.get(e);
            break;
          }
        }
        if (i && i > 0) {
          if (M = DropPackageById_1.configDropPackageById.GetConfig(i)) {
            t = M.DropPreview;
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneGameplay", 17, "兑换奖励表配置的掉落ID读取不到掉落奖励", ["兑换奖励ID", r.Id]);
          }
        }
      }
      if (this.u2o.MarkConfig.RelativeSubType === 1) {
        var n;
        var _;
        var l;
        var M = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
        var d = ConfigManager_1.ConfigManager.CalabashConfig?.GetCalabashConfigByLevel(M);
        var g = [];
        for ([n] of t) {
          if (this._Fo(n) && (_ = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(n), l = d.QualityDropWeight.get(_.QualityId) ?? 0, _.ShowTypes.includes(TARGET_ITEM_SHOW_TYPE)) && l <= 0 && _) {
            g.push(n);
          }
        }
        g.forEach(e => {
          t.delete(e);
        });
      } else if (this.u2o.MarkConfig.RelativeSubType === 9) {
        t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetNightMareShowReward(r.RewardIdCalabash);
      }
      if (t) {
        e.Refresh(t, i, false, false, s);
        e.SetUiActive(true);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneGameplay", 17, "读取不到奖励配置", ["兑换奖励ID", r.Id], ["WorldLevel", a]);
        }
        e.SetUiActive(false);
      }
    } else {
      e.SetUiActive(false);
    }
  }
  _Fo(e) {
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e);
    return e === 7 || e === 0;
  }
  l_i() {
    let e = "";
    var i = !ModelManager_1.ModelManager.MapModel.IsLevelPlayOccupied(this.Ymt.Id).IsOccupied && MarkUiUtils_1.MarkUiUtils.IsShowGoto(this.u2o);
    e = i ? this.u2o.IsTracked ? "InstanceDungeonEntranceCancelTrack" : "InstanceDungeonEntranceTrack" : "TeleportFastMove";
    this.ConfirmButton.SetLocalText(e);
    this.TrackBtn.SetLocalText(e);
  }
  hFo() {
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    var t = this.Ymt.RefreshTime;
    if (t < i) {
      this.cG();
    } else if (this.u2o?.MarkConfig?.RelativeSubType === 9 && !this.Jsd) {
      this.cG();
    } else {
      t = t - i;
      let e = undefined;
      e = t < TimeUtil_1.TimeUtil.Minute ? "" + Math.floor(t) + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second") : t < TimeUtil_1.TimeUtil.Hour ? "" + Math.floor(t / TimeUtil_1.TimeUtil.Minute) + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Minute") : "" + Math.floor(t / TimeUtil_1.TimeUtil.Hour) + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Hour");
      this.rFo?.SetRightText(e);
      if (this.IRe === undefined) {
        this.tGo();
      }
    }
  }
  tGo() {
    this.rFo?.SetActive(true);
    this.IRe = TimerSystem_1.TimerSystem.Forever(() => {
      this.hFo();
    }, TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  cG() {
    if (this.IRe !== undefined && TimerSystem_1.TimerSystem.Has(this.IRe)) {
      TimerSystem_1.TimerSystem.Remove(this.IRe);
      this.IRe = undefined;
      this.rFo?.SetActive(false);
    }
  }
}
exports.SceneGameplayPanel = SceneGameplayPanel;
//# sourceMappingURL=SceneGameplayPanel.js.map