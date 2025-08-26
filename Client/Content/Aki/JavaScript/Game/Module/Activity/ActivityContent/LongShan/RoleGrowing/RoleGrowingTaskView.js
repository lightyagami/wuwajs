"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleGrowingTaskView = undefined;
const UE = require("ue");
const LongShanStageById_1 = require("../../../../../../Core/Define/ConfigQuery/LongShanStageById");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const PageDot_1 = require("../../../../Common/PageDot");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityLongShanController_1 = require("../ActivityLongShanController");
const LongShanTaskItem_1 = require("../LongShanTaskItem");
class RoleGrowingTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CurrentIndex = 0;
    this.CaptionItem = undefined;
    this.PageDotLayout = undefined;
    this.TaskScroll = undefined;
    this.WOe = () => {
      var e = this.ActivityBaseData;
      var i = e.StageIds[this.CurrentIndex];
      var t = e.GetProgress(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "LongShanStage_ProgressPercentage", t);
      var t = e.GetStageInfoById(i).cMs;
      t.sort(this.ActivityBaseData.TaskSort);
      this.TaskScroll.RefreshByData(t, undefined, true);
    };
    this.VOe = () => new LongShanTaskItem_1.LongShanTaskItem();
    this.HOe = () => new PageDot_1.PageDot();
    this.KOe = () => {
      this.RefreshView(this.CurrentIndex - 1);
    };
    this.QOe = () => {
      var e = this.ActivityBaseData.StageIds[this.CurrentIndex + 1];
      if (this.ActivityBaseData.GetStageInfoById(e)) {
        this.RefreshView(this.CurrentIndex + 1);
      } else {
        ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIHorizontalLayout], [8, UE.UISprite]];
    this.BtnBindInfo = [[5, this.KOe], [6, this.QOe]];
  }
  async OnBeforeStartAsync() {
    var [e, i] = this.OpenParam;
    if (e && i) {
      this.ActivityBaseData = e;
      this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.CaptionItem.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.CaptionItem.SetTitle(this.ActivityBaseData.GetTitle());
      e = this.ActivityBaseData.StageIds;
      this.CurrentIndex = e.indexOf(i);
      this.PageDotLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.HOe);
      await this.PageDotLayout.RefreshByDataAsync(e);
      this.TaskScroll = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.VOe);
    }
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(undefined, this.ActivityBaseData.Id);
    this.RefreshView(this.CurrentIndex);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LongShanUpdate, this.WOe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LongShanUpdate, this.WOe);
  }
  RefreshView(e) {
    this.PageDotLayout.GetLayoutItemByIndex(this.CurrentIndex).UpdateShow(false);
    this.CurrentIndex = e;
    this.PageDotLayout.GetLayoutItemByIndex(this.CurrentIndex).UpdateShow(true);
    var e = this.ActivityBaseData.StageIds[this.CurrentIndex];
    var i = LongShanStageById_1.configLongShanStageById.GetConfig(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), i.TitleDetail);
    this.SetSpriteByPath(i.Picture, this.GetSprite(8), false);
    this.GetButton(5).RootUIComp.SetUIActive(this.CurrentIndex > 0);
    this.GetButton(6).RootUIComp.SetUIActive(this.CurrentIndex < this.ActivityBaseData.StageIds.length - 1);
    this.WOe();
    this.ActivityBaseData.SaveNewStageFlag(e);
  }
}
exports.RoleGrowingTaskView = RoleGrowingTaskView;
//# sourceMappingURL=RoleGrowingTaskView.js.map