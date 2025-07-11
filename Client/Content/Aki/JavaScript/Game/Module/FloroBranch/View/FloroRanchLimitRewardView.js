"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchLimitRewardView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchMilestoneItem_1 = require("./Item/FloroRanchMilestoneItem");
const FloroRanchTaskItem_1 = require("./Item/FloroRanchTaskItem");
const FloroRanchTaskTabItem_1 = require("./Item/FloroRanchTaskTabItem");
class FloroRanchLimitRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.AEu = 1;
    this.B7t = undefined;
    this.qoh = undefined;
    this.TDe = undefined;
    this.hfl = undefined;
    this.dx_ = () => {
      var e = this.CNe.GetFloroRanchMilestoneDataList();
      var t = this.CNe.GetMilestoneItemCount();
      this.hfl.RefreshProgressItem(t, e);
    };
    this.JSi = e => {
      if (this.CNe.Id === e) {
        this.B7t.RefreshWithoutDataSync();
        this.Ooh();
        this.dx_();
      }
    };
    this.PEu = (e, t) => {
      this.B7t.SelectGridProxy(e);
      this.AEu = t;
      this.Ooh();
    };
    this.C9c = () => {
      var e = this.CNe.GetFloroRanchReceivableTaskIds(true, this.AEu);
      FloroRanchController_1.FloroRanchController.RequestTaskReward(e);
    };
    this.mx_ = () => {
      var e = this.CNe.GetFloroRanchReceivableMilestoneIds();
      if (e.length > 0) {
        FloroRanchController_1.FloroRanchController.RequestMilestoneReward(e);
      }
    };
    this.Hwn = () => {
      var e = new FloroRanchTaskTabItem_1.FloroRanchTaskTabItem();
      e.OnToggleCallBack = this.PEu;
      return e;
    };
    this.VOe = () => {
      var e = new FloroRanchTaskItem_1.FloroRanchTaskItem();
      e.OnGetBtnClick = this.C9c;
      return e;
    };
    this.xEu = () => {
      var e = this.CNe.GetFloroRanchParamConfig().CardItemId;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIHorizontalLayout], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText]];
    this.BtnBindInfo = [[5, this.xEu]];
  }
  async OnBeforeStartAsync() {
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var e = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    e.SetTitle(this.CNe.GetTitle());
    e.SetHelpBtnActive(false);
    e.SetCloseCallBack(this.AMo);
    this.B7t = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(6), this.Hwn);
    this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.VOe);
    var e = [];
    this.hfl = new FloroRanchMilestoneItem_1.FloroRanchMilestoneItem();
    e.push(this.hfl.CreateByActorAsync(this.GetItem(8).GetOwner()));
    this.hfl.OnClickToGet = this.mx_;
    this.AddChild(this.hfl);
    var t = ModelManager_1.ModelManager.FloroRanchModel.GetTaskTabList();
    e.push(this.B7t.RefreshByDataAsync(t));
    await Promise.all(e);
    this.Ooh();
    this.dx_();
    this.B7t.SelectGridProxy(0);
    this.sSt();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.sSt();
    }, 1000);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.JSi);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.JSi);
  }
  Ooh() {
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetTaskDataByTabType(this.AEu);
    this.qoh.RefreshByData(e, () => {
      this.qoh.ScrollToTop(0);
    }, true);
  }
  sSt() {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    var e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.CNe.GetLimitTimeActivityEndTime(), e);
    this.GetText(9)?.SetText(e);
  }
  OnBeforeDestroy() {
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
}
exports.FloroRanchLimitRewardView = FloroRanchLimitRewardView;
//# sourceMappingURL=FloroRanchLimitRewardView.js.map