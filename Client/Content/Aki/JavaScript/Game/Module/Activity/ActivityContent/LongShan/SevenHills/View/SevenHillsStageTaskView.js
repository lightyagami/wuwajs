"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SevenHillsStageTaskView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const LongShanStageById_1 = require("../../../../../../../Core/Define/ConfigQuery/LongShanStageById");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const PageDot_1 = require("../../../../../Common/PageDot");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const ActivityLongShanController_1 = require("../../ActivityLongShanController");
const LongShanTaskItem_1 = require("../../LongShanTaskItem");
class SevenHillsStageTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.TaskLayout = undefined;
    this.PageDotLayout = undefined;
    this.CaptionItem = undefined;
    this.CurrentIndex = 0;
    this.NextSelectedIndex = 0;
    this.IsRefreshNow = true;
    this.WOe = () => {
      var t = this.ActivityBaseData;
      var i = t.StageIds[this.CurrentIndex];
      var e = t.GetProgress(i);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "LongShanStage_ProgressPercentage", e);
      var e = t.GetStageInfoByIdIncludeLock(i).cMs;
      e.sort(this.ActivityBaseData.TaskSort);
      this.TaskLayout.RefreshByData(e, undefined, true);
    };
    this.yz1 = t => {
      if (t === this.ActivityBaseData?.Id) {
        this.WOe();
      }
    };
    this.KOe = () => {
      this.NextSelectedIndex = this.CurrentIndex - 1;
      this.PlaySequence("SwitchLeft");
      if (this.IsRefreshNow) {
        this.RefreshView();
      }
    };
    this.QOe = () => {
      var t = this.ActivityBaseData.StageIds[this.CurrentIndex + 1];
      if (this.ActivityBaseData.IsStageUnlock(t)) {
        this.NextSelectedIndex = this.CurrentIndex + 1;
        this.PlaySequence("SwitchRight");
        if (this.IsRefreshNow) {
          this.RefreshView();
        }
      } else {
        ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(t);
      }
    };
    this.VOe = () => new LongShanTaskItem_1.LongShanTaskItem();
    this.HOe = () => new PageDot_1.PageDot();
    this.$An = t => {
      if (t === "Enter" && !this.IsRefreshNow) {
        this.RefreshView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIHorizontalLayout], [10, UE.UIItem]];
    this.BtnBindInfo = [[8, this.KOe], [7, this.QOe]];
  }
  async OnBeforeStartAsync() {
    var [t, i] = this.OpenParam;
    if (t && i) {
      this.ActivityBaseData = t;
      this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.CaptionItem.SetCloseCallBack(() => {
        this.CloseMe();
      });
      this.CaptionItem.SetTitle(this.ActivityBaseData.GetTitle());
      this.RefreshTitleIcon();
      t = this.ActivityBaseData.StageIds;
      this.CurrentIndex = t.indexOf(i);
      this.NextSelectedIndex = this.CurrentIndex;
      this.PageDotLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(9), this.HOe);
      await this.PageDotLayout.RefreshByDataAsync(t);
      this.TaskLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.VOe);
    }
  }
  RefreshTitleIcon() {
    var t = CommonParamById_1.configCommonParamById.GetStringConfig("SevenHillsIconPath");
    if (t) {
      this.CaptionItem?.SetTitleIcon(t);
    }
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(undefined, this.ActivityBaseData.Id);
    this.RefreshView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.yz1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  RefreshView() {
    this.PageDotLayout.GetLayoutItemByIndex(this.CurrentIndex).UpdateShow(false);
    this.CurrentIndex = this.NextSelectedIndex;
    this.PageDotLayout.GetLayoutItemByIndex(this.CurrentIndex).UpdateShow(true);
    var t = this.ActivityBaseData.StageIds[this.CurrentIndex];
    var i = LongShanStageById_1.configLongShanStageById.GetConfig(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.TitleDetail);
    this.SetSpriteByPath(i.RomeNumSprite, this.GetSprite(2), false);
    this.SetTextureByPath(i.Picture, this.GetTexture(1));
    this.GetButton(8).RootUIComp.SetUIActive(this.CurrentIndex > 0);
    this.GetButton(7).RootUIComp.SetUIActive(this.CurrentIndex < this.ActivityBaseData.StageIds.length - 1);
    this.WOe();
    this.ActivityBaseData.SaveNewStageFlag(t);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.yz1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
}
exports.SevenHillsStageTaskView = SevenHillsStageTaskView;
//# sourceMappingURL=SevenHillsStageTaskView.js.map