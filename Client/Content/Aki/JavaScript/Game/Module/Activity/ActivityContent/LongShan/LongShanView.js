"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongShanView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const LongShanStageById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanStageById");
const LongShanTaskById_1 = require("../../../../../Core/Define/ConfigQuery/LongShanTaskById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const PageDot_1 = require("../../../Common/PageDot");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const HelpController_1 = require("../../../Help/HelpController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityLongShanController_1 = require("./ActivityLongShanController");
const LongShanTaskItem_1 = require("./LongShanTaskItem");
class LongShanView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.GOe = undefined;
    this.NOe = 0;
    this.lqe = undefined;
    this.tPe = undefined;
    this.OOe = undefined;
    this.kOe = () => {
      var e;
      var i = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
      if (i.CheckIfInOpenTime) {
        e = TimeUtil_1.TimeUtil.GetServerTime();
        i = Math.max(i.EndOpenTime - e, 1);
        e = this.FOe(i);
        i = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(i, e[0], e[1]).CountDownText ?? "";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "ActivityRemainingTime", i);
      } else {
        this.CloseMe();
      }
    };
    this.VOe = () => new LongShanTaskItem_1.LongShanTaskItem();
    this.HOe = () => new PageDot_1.PageDot();
    this.jOe = (e, i) => {
      var t;
      var n;
      if (e.mMs !== i.mMs) {
        if (e.mMs) {
          return 1;
        } else {
          return -1;
        }
      } else if (e.dMs !== i.dMs) {
        if (e.dMs) {
          return -1;
        } else {
          return 1;
        }
      } else if ((t = LongShanTaskById_1.configLongShanTaskById.GetConfig(e.s5n).SortId) !== (n = LongShanTaskById_1.configLongShanTaskById.GetConfig(i.s5n).SortId)) {
        return t - n;
      } else {
        return e.s5n - i.s5n;
      }
    };
    this.WOe = () => {
      var e = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
      var i = e.StageIds[this.NOe];
      var t = e.GetProgress(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "LongShanStage_ProgressPercentage", t);
      var t = e.GetStageInfoById(i).cMs;
      t.sort(this.jOe);
      this.OOe?.RefreshByData(t, undefined, true);
    };
    this.KOe = () => {
      this.RefreshView(this.NOe - 1);
    };
    this.QOe = () => {
      var e = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
      var i = e.StageIds[this.NOe + 1];
      if (e.GetStageInfoById(i)) {
        this.RefreshView(this.NOe + 1);
      } else {
        ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(i);
      }
    };
    this.XOe = () => {
      var e = ActivityLongShanController_1.ActivityLongShanController.GetActivityData().GetHelpId();
      HelpController_1.HelpController.OpenHelpById(e);
    };
    this.$Oe = () => {
      this.CloseMe();
    };
    this.g3e = e => {
      var i = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
      if (e.has(i.Id)) {
        e = () => {
          this.CloseMe();
        };
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(1, e);
        i.FunctionMap.set(0, e);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIHorizontalLayout], [8, UE.UIText], [9, UE.UITexture]];
    this.BtnBindInfo = [[5, this.KOe], [6, this.QOe]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LongShanUpdate, this.WOe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LongShanUpdate, this.WOe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivityClose, this.g3e);
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpCallBack(this.XOe);
    this.lqe.SetCloseCallBack(this.$Oe);
    var e = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
    this.lqe.SetTitle(e.GetTitle());
    var e = e.StageIds;
    this.NOe = e.indexOf(this.OpenParam);
    this.tPe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.HOe);
    await this.tPe.RefreshByDataAsync(e);
    this.OOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.VOe);
  }
  OnBeforeShow() {
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.kOe, TimeUtil_1.TimeUtil.InverseMillisecond);
    this.RefreshView(this.NOe);
    this.kOe();
  }
  OnBeforeHide() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.GOe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  FOe(e) {
    if (e > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (e > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 1];
    } else if (e > CommonDefine_1.SECOND_PER_MINUTE) {
      return [1, 0];
    } else {
      return [0, 0];
    }
  }
  RefreshView(e) {
    this.tPe.GetLayoutItemByIndex(this.NOe).UpdateShow(false);
    this.NOe = e;
    this.tPe.GetLayoutItemByIndex(this.NOe).UpdateShow(true);
    var e = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
    var i = e.StageIds[this.NOe];
    e.SaveNewStageFlag(i);
    var i = LongShanStageById_1.configLongShanStageById.GetConfig(i);
    this.SetTextureByPath(i.Picture, this.GetTexture(9));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TitleDetail);
    this.WOe();
    this.GetButton(5).RootUIComp.SetUIActive(this.NOe > 0);
    this.GetButton(6).RootUIComp.SetUIActive(this.NOe < e.StageIds.length - 1);
  }
}
exports.LongShanView = LongShanView;
//# sourceMappingURL=LongShanView.js.map