"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonEntrancePanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityDoubleRewardController_1 = require("../../../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController");
const HelpController_1 = require("../../../Help/HelpController");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const InstanceTipGrid_1 = require("../../../InstanceDungeon/InstanceTipGrid");
const MapHelper_1 = require("../../../Map/MapHelper");
const GenericLayoutAdd_1 = require("../../../Util/GenericLayoutAdd");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TipsListView_1 = require("../TipsListView");
const WorldMapSecondaryUiLayoutA_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutA");
const WorldMapSecondaryUiLayoutHelper_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutHelper");
const HELP_ID = 89;
const POWER_COST_KEY = "power";
const COUNT_LIMMIT_KEY = "countLimit";
class InstanceDungeonEntrancePanel extends WorldMapSecondaryUiLayoutA_1.WorldMapSecondaryUiLayoutA {
  constructor() {
    super(...arguments);
    this.tli = 0;
    this.rli = [];
    this.u2o = undefined;
    this.U2o = undefined;
    this.A2o = undefined;
    this.OnInstanceRefresh = (e, t, i, r) => {
      var n = new TipsListView_1.InstanceDungeonCostTip();
      n.SetRootActor(t.GetOwner(), true);
      return {
        Key: e,
        Value: n
      };
    };
    this.mji = () => {
      HelpController_1.HelpController.OpenHelpById(HELP_ID);
    };
    this.sGe = () => {
      return new InstanceTipGrid_1.InstanceTipGrid();
    };
  }
  get P2o() {
    if (this.tli) {
      return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(this.tli);
    } else {
      return undefined;
    }
  }
  GetResourceId() {
    return "UiView_InstanceEntranceTip_Prefab";
  }
  OnStart() {
    this.GetVerticalLayout(5)?.RootUIComp.SetUIActive(true);
    this.U2o = new GenericLayoutAdd_1.GenericLayoutAdd(this.GetVerticalLayout(5), this.OnInstanceRefresh);
    this.A2o = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.sGe);
    super.OnStart();
  }
  OnBeforeDestroy() {
    this.U2o.ClearChildren();
    super.OnBeforeDestroy();
  }
  SetupWorldMapSecondaryUiLayout() {
    super.SetupWorldMapSecondaryUiLayout();
    this.GetItem(32).SetUIActive(false);
  }
  OnShowWorldMapSecondaryUi(e) {
    this.u2o = e;
    var t = (this.LayoutContext.MarkItem = e).MarkConfig.RelativeId;
    var e = e.MarkConfigId;
    this.tli = t !== 0 ? t : ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetEntranceIdByMarkId(e);
    if (this.tli) {
      this.SHe();
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.InstEntranceDetailRequest(this.tli).finally(() => {
        this.x2o();
        this.w2o();
      });
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateConfirmButtonTextWithFastMoveStyle(this.LayoutContext);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateTrackButtonTextWithTrackStyle(this.LayoutContext);
      if ((t = this.P2o.UnLockCondition) && !ModelManager_1.ModelManager.FunctionModel.IsOpen(t)) {
        t = ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(t);
        t = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(t.OpenConditionId);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), t.HintText);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("InstanceDungeon", 16, "副本入口弹窗打开错误，副本入口表中找不到对应的地图标记Id！", ["MarkId", e]);
    }
  }
  GetMaxUnlockInstanceList() {
    let e = new Array();
    let t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(this.rli[0], ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
    for (const n of this.rli) {
      var i;
      if (!!ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(n) && !((i = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(n, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel)) < t)) {
        if (i > t) {
          e = [];
          t = i;
        }
        e.push(n);
      }
    }
    if (e.length === 0) {
      for (const a of this.rli) {
        var r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(a, ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
        if (!(r > t)) {
          if (r < t) {
            e = [];
            t = r;
          }
          e.push(a);
        }
      }
    }
    e.sort((e, t) => (ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(e) ? 0 : 1) - (ModelManager_1.ModelManager.ExchangeRewardModel.GetInstanceDungeonIfCanExchange(t) ? 0 : 1));
    return e;
  }
  SHe() {
    var e = this.P2o;
    if (e) {
      this.GetText(4).ShowTextNew(e.Description);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateIcon(this.LayoutContext);
      this.GetText(1).ShowTextNew(e.Name);
      WorldMapSecondaryUiLayoutHelper_1.WorldMapSecondaryUiLayoutHelper.UpdateAreaTxtByConfigMarkItem(this.LayoutContext);
      this.GetItem(9).SetUIActive(!this.u2o.IsFogUnlock);
      this.GetText(10).ShowTextNew("Instance_Dungeon_Rcommand_Text");
      e = this.UpdateQuickGoto();
      this.ConfirmButton.SetActive(!e);
    }
  }
  x2o() {
    this.rli.length = 0;
    var e;
    var t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(this.tli);
    for ([e] of Array.from(t).sort((e, t) => e[1] - t[1])) {
      this.rli.push(e);
    }
    this.rli = this.GetMaxUnlockInstanceList();
    var t = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.rli[0]);
    var i = ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivity(t.CustomTypes);
    this.GetItem(19).SetUIActive(i !== undefined);
    if (i) {
      n = i.GetNumTxtAndParam();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), n[0], n[1], n[2]);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(42), "Double_reward_tips_02");
    }
    var [r, n, a, o, s] = MapHelper_1.MapHelper.GetDoubleRestAndMaxTimes(this.u2o);
    if (r) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), o, n, a);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(42), s);
      this.GetText(42).SetUIActive(r);
    }
    this.GetItem(19).SetUIActive(r || i !== undefined);
    var _ = [];
    for (const l of this.rli) {
      _.push({
        InstanceId: l,
        IsDouble: r
      });
    }
    this.A2o.RefreshByData(_);
    var o = t.RewardId;
    var n = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardConfig(o)?.SharedId;
    if (n) {
      this.U2o.AddItemToLayout([COUNT_LIMMIT_KEY]);
      (a = this.U2o.GetLayoutItemByKey(COUNT_LIMMIT_KEY)).SetIconVisible(false);
      a.SetStarVisible(false);
      s = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_CanReceivedCount_Text") ?? "", "");
      a.SetLeftText(s);
      i = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(n);
      t = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(n);
      s = (o = i.MaxCount) - t;
      a.SetRightText(StringUtils_1.StringUtils.Format("{0}/{1}", "" + s, "" + o));
      a.SetHelpButtonVisible(false);
    }
  }
  w2o() {
    var e;
    var t;
    var i = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeNormalConsume(this.rli[0]);
    if (i && i[0]) {
      this.U2o.AddItemToLayout([POWER_COST_KEY]);
      (e = this.U2o.GetLayoutItemByKey(POWER_COST_KEY)).SetStarVisible(false);
      t = i[0][0].ItemId;
      e.SetIconByItemId(t);
      e.SetLeftText(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("CostStamina") ?? "");
      e.SetHelpButtonVisible(true);
      e.SetRightText(i[0][1].toString());
      e.SetClickHelpFunc(this.mji);
    }
  }
  OnCloseWorldMapSecondaryUi() {
    this?.U2o?.ClearChildren();
  }
  GetGuideFocusUiItem() {
    return this.GetButton(11).GetOwner().GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.InstanceDungeonEntrancePanel = InstanceDungeonEntrancePanel;
//# sourceMappingURL=InstanceDungeonEntrancePanel.js.map