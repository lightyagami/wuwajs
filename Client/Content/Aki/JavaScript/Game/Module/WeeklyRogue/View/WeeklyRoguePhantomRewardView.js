"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRoguePhantomRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const HelpController_1 = require("../../Help/HelpController");
const PowerRewardButtonItem_1 = require("../../InstanceDungeon/PowerRewardButtonItem");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PowerController_1 = require("../../Power/PowerController");
const PowerCurrencyItem_1 = require("../../Power/SubViews/PowerCurrencyItem");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const WeeklyRoguePhantomRewardItem_1 = require("../Components/WeeklyRoguePhantomRewardItem");
const HELP_ID = 463;
class WeeklyRoguePhantomRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NXs = undefined;
    this.fea = undefined;
    this.PhantomLoopScrollView = undefined;
    this.InfoData = undefined;
    this.gal = undefined;
    this.pal = undefined;
    this.mDf = -1;
    this.jWt = () => {
      var e = new WeeklyRoguePhantomRewardItem_1.WeeklyRoguePhantomRewardItem();
      e.IsSelectOnCb = this.fDf;
      e.OnToggleStateChangeFunction = this.Yai;
      return e;
    };
    this.pqt = () => {
      this.gal?.RefreshPowerState();
      this.pal?.RefreshPowerState();
    };
    this.lil = () => {
      HelpController_1.HelpController.OpenHelpById(HELP_ID);
    };
    this.fDf = e => this.mDf === e;
    this.Yai = (e, t, i, r) => {
      this.mDf = r ? i : -1;
      this.RefreshState();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.lil]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPowerChanged, this.pqt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPowerChanged, this.pqt);
  }
  async OnBeforeStartAsync() {
    this.gal = new PowerRewardButtonItem_1.PowerRewardButtonItem();
    this.pal = new PowerRewardButtonItem_1.PowerRewardButtonItem();
    await Promise.all([this.fal(), this.gal.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.pal.CreateThenShowByActorAsync(this.GetItem(5).GetOwner())]);
    this.InfoData = this.OpenParam;
    this.gal.SetUiActive(this.InfoData.SinglePowerCost !== 0);
    if (this.InfoData.SinglePowerCost !== 0) {
      e = {
        PowerNum: this.InfoData.SinglePowerCost,
        RewardTextId: "Magnification_normol",
        RewardCallBack: () => {
          this.val(1);
        }
      };
      this.gal.Update(e);
    }
    const t = this.InfoData.SinglePowerCost * 2;
    var e = this.InfoData.SinglePowerCost === 0 ? "Text_WeeklyRogue_FreeLoot" : "Magnification_double";
    var i = this.InfoData.SinglePowerCost !== 0 ? [] : [String(this.InfoData.FreeCount), String(this.InfoData.FreeMax)];
    var e = {
      PowerNum: t,
      RewardTextId: e,
      RewardCallBack: () => {
        var e = t == 0 ? 1 : 2;
        this.val(e);
      },
      RewardTextArgs: i
    };
    this.pal.Update(e);
  }
  OnStart() {
    this.PhantomLoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.jWt);
    this.RefreshLayout();
    this.RefreshState();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "WeeklyRouge_BonusWindow_Title");
  }
  OnBeforeShow() {
    this.fea?.GetOriginalItem()?.SetUIParent(this.ChildPopView?.PopItem?.GetCostParent());
    this.NXs?.GetOriginalItem()?.SetUIParent(this.ChildPopView?.PopItem?.GetCostParent());
    this.NXs.ShowWithoutText(ItemDefines_1.EItemId.Power);
    this.NXs?.SetButtonFunction(() => {
      PowerController_1.PowerController.OpenPowerView();
    });
    this.RefreshState();
  }
  OnBeforeDestroy() {
    this.InfoData?.CloseCallBack?.();
  }
  val(e) {
    var t;
    return this.mDf !== -1 && (t = e * this.InfoData.SinglePowerCost, ModelManager_1.ModelManager.PowerModel.IsPowerEnough(t) ? (this.InfoData.RewardCallBack(e, this.mDf), this.CloseMe(), true) : (e = ConfigManager_1.ConfigManager.TextConfig.GetTextById("ReceiveLevelPlayPowerNotEnough"), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e), ControllerHolder_1.ControllerHolder.PowerController.OpenPowerView(2, ModelManager_1.ModelManager.PowerModel.GetCurrentNeedPower(t)), false));
  }
  async fal() {
    this.fea = new PowerCurrencyItem_1.PowerCurrencyItem();
    this.NXs = new PowerCurrencyItem_1.PowerCurrencyItem();
    await Promise.all([this.fea.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem"), this.NXs.CreateThenShowByResourceIdAsync("UIItem_CommonCurrencyItem")]);
    this.fea.ShowWithoutText(ItemDefines_1.EItemId.OverPower);
    this.fea.RefreshAddButtonActive();
    this.fea.SetActive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10066));
  }
  RefreshLayout() {
    var e = this.InfoData.AvailableSilentArea;
    var t = [];
    for (const r of ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetBlackFlowerConfigAll()) {
      var i = {
        IsActive: e.includes(r.Id),
        AreaAwardId: r.Id,
        SortId: r.SortId
      };
      t.push(i);
    }
    t.sort((e, t) => e.IsActive === t.IsActive ? t.SortId - e.SortId : e.IsActive ? -1 : 1);
    this.PhantomLoopScrollView.RefreshByData(t);
  }
  RefreshState() {
    this.RefreshStateTxt();
    var e = this.mDf !== -1;
    this.gal?.SetIsEnable(e);
    this.pal?.SetIsEnable(e);
    this.PhantomLoopScrollView.RefreshAllGridProxies();
  }
  RefreshStateTxt() {
    var e = [1, this.mDf === -1 ? 0 : 1, 1];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Text_SelectRewardFromPool_Text", ...e);
  }
}
exports.WeeklyRoguePhantomRewardView = WeeklyRoguePhantomRewardView;
//# sourceMappingURL=WeeklyRoguePhantomRewardView.js.map