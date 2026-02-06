"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringMonorRewardView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
const SpringManorDefine_1 = require("../../SpringManorDefine");
const SpringManorRewardBottomItem_1 = require("./SpringManorRewardBottomItem");
const SpringManorRewardQuestItem_1 = require("./SpringManorRewardQuestItem");
class SpringMonorRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.B7t = undefined;
    this.opg = undefined;
    this.fVl = -1;
    this.A4c = undefined;
    this.fDm = undefined;
    this.npg = undefined;
    this.Og = () => {
      this.B7t?.RefreshWithoutDataSync();
      this.spg();
      this.A4c?.Refresh();
    };
    this.Hwn = () => {
      var e = new TabItem();
      e.SetTabClickCallback(this.l6c);
      return e;
    };
    this.l6c = e => {
      this.fVl = e;
      this.B7t?.SelectGridProxy(e);
      this.spg(false);
    };
    this.Ffm = () => {
      var e = new SpringManorRewardQuestItem_1.SpringManorRewardQuestItem();
      e.SetReceiveClickCallback(this.apg);
      e.OnSkipClick = this.O3g;
      return e;
    };
    this.O3g = e => {
      if (e === 2) {
        this.CloseMe();
      }
    };
    this.apg = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController.RequestTaskRewardReceive(this.fVl, this.Og);
    };
    this.I5t = () => {
      this.CloseMe();
    };
    this.aFo = () => {
      var e = ModelManager_1.ModelManager.SpringManorModel?.GetActivityConfig().VisionSkinItemId;
      ControllerHolder_1.ControllerHolder.CalabashController.JumpToCalabashCollectTabViewOnlyShow(e, true);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UILayoutBase], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIText]];
    this.BtnBindInfo = [[6, this.aFo]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.A4c = new SpringManorRewardBottomItem_1.SpringManorRewardBottomItem();
    e.push(this.A4c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(e);
  }
  OnStart() {
    this.zDn();
    this.hpg();
    this.wsc();
    this.A4c?.Refresh();
    this.fDm = this.GetText(7);
    this.npg = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
  }
  OnTick(e) {
    var t = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(ModelManager_1.ModelManager.SpringManorModel.ActivityData.EndShowTime, this.npg);
    this.fDm?.SetText(t);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SpringManorTaskUpdateNotify, this.Og);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SpringManorTaskUpdateNotify, this.Og);
  }
  zDn() {
    this.lqe.SetCloseCallBack(this.I5t);
    this.lqe?.SetHelpCallBack(() => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(SpringManorDefine_1.LIMIT_TIME_REWARD_HELP_ID);
    });
  }
  wsc() {
    this.B7t = new GenericLayout_1.GenericLayout(this.GetLayoutBase(3), this.Hwn, this.GetItem(4).GetOwner());
    var e = ModelManager_1.ModelManager.SpringManorModel.GetRewardTaskTabList();
    this.B7t.RefreshByData(e, () => {
      this.B7t?.GetLayoutItemByIndex(0)?.SetToggleSelect(true, true);
    });
  }
  hpg() {
    this.opg = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Ffm, undefined);
  }
  spg(e = true) {
    var t = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetRewardTaskListByTabId(this.fVl);
    t.sort((e, t) => {
      var e = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetRewardTaskData(e);
      var t = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetRewardTaskData(t);
      var i = e.Status;
      var t = t.Status;
      if (i !== t) {
        return i - t;
      } else {
        return e.Sort - e.Sort;
      }
    });
    let i = e ? undefined : () => {
      this.opg?.ScrollToTop(0);
    };
    this.opg?.RefreshByData(t, i, true);
  }
}
exports.SpringMonorRewardView = SpringMonorRewardView;
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.vua = -1;
    this.HEu = undefined;
    this.kqe = () => {
      this.HEu?.(this.vua);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.kqe]];
  }
  Refresh(e, t, i) {
    this.vua = e;
    var r = ConfigManager_1.ConfigManager.SpringManorConfig.GetRewardTabConfigById(e);
    this.GetText(0)?.ShowTextNew(r.Name);
    this.GetItem(2)?.SetUIActive(ModelManager_1.ModelManager.SpringManorModel.ActivityData.IsTabHasAnyClaimable(e));
  }
  SetTabClickCallback(e) {
    this.HEu = e;
  }
  OnDeselected(e) {
    this.SetToggleSelect(false, false);
  }
  SetToggleSelect(e, t) {
    this.GetExtendToggle(1)?.SetToggleStateForce(e ? 1 : 0, t);
  }
}
//# sourceMappingURL=SpringMonorRewardView.js.map