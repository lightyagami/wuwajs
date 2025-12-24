"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CumulativeShopSubView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const PayShopItem_1 = require("../../../PayShop/PayShopTab/TabItem/PayShopItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const TIMEGAP = 1000;
const REWARD_ITEM_ID = 46;
class CumulativeShopSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.Oy1 = undefined;
    this.LNe = undefined;
    this.uxl = undefined;
    this.vVt = undefined;
    this.PayShopGoodsList = [];
    this.TDe = undefined;
    this.Ftl = "";
    this.CF1 = "";
    this.qy1 = () => {
      UiManager_1.UiManager.OpenView("CumulativeShopTaskView");
    };
    this.sGe = () => {
      return new PayShopItem_1.PayShopItem();
    };
    this.GetProxyData = e => this.PayShopGoodsList[e];
    this.t3i = (e, i, t) => {
      if (i === 215) {
        this.vVt.RefreshAllGridProxies();
      }
    };
    this.i3i = e => {
      this.RefreshLoopScroll();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnSetData() {
    this.Oy1 = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(4);
    this.uxl = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.Oy1);
    await this.uxl.CreateThenShowByActorAsync(e.GetOwner());
    this.uxl.FunctionButton.SetFunction(this.qy1);
    this.uxl.FunctionButton.SetLocalTextNew("LeiXiao_GetScore");
    var e = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(e.GetOwner());
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.sGe);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GoodsSoldOut, this.i3i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshGoods, this.t3i);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GoodsSoldOut, this.i3i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshGoods, this.t3i);
  }
  OnStart() {
    this.Ftl = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("LeiXiao_GetScore_prompt") ?? "";
    this.CF1 = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("ActivityRemainingTime") ?? "";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "keyActivity_105100001_Desc");
    this.LNe.SetActivityBaseData(this.Oy1);
    this.LNe.SetTitleByText(this.Oy1.GetTitle());
    this.LNe.SetTimeTextVisible(true);
    var e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.Oy1.EndShowTime, this.CF1) ?? "";
    this.LNe.SetTimeTextByText(e);
    this.RefreshLoopScroll();
    this.FG1();
  }
  OnRefreshView() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetActivityViewCurrency, [REWARD_ITEM_ID]);
    this.BNe();
  }
  OnAfterShow() {
    this.kot();
  }
  RefreshLoopScroll() {
    this.PayShopGoodsList = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(215);
    this.vVt.ReloadProxyData(this.GetProxyData, this.PayShopGoodsList.length, false);
    this.vVt.GetUiAnimController().Play();
  }
  kot() {
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.o3i();
      this.FG1();
    }, TIMEGAP);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  OnBeforeHide() {
    this.xHe();
  }
  o3i() {
    this.LNe.SetTimeTextVisible(true);
    var e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.Oy1.EndShowTime, this.CF1) ?? "";
    this.LNe.SetTimeTextByText(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.DiscountShopTimerRefresh);
  }
  FG1() {
    var e = this.Oy1.EndOpenTime;
    if (e <= TimeUtil_1.TimeUtil.GetServerTime()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "CumulativeShopOpenTimeEnd");
      this.uxl.FunctionButton.SetEnableClick(false);
    } else {
      e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(e, this.Ftl);
      this.GetText(5).SetText(e);
    }
  }
  BNe() {
    var e = this.Oy1.GetAnyTaskRedDot();
    this.uxl.SetFunctionRedDotVisible(e);
  }
}
exports.CumulativeShopSubView = CumulativeShopSubView;
//# sourceMappingURL=CumulativeShopSubView.js.map