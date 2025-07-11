"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapExploreStoryView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const MapAreaOnlyShowItem_1 = require("./MapAreaOnlyShowItem");
const MapExploreStoryItem_1 = require("./MapExploreStoryItem");
class MapExploreStoryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.DNl = undefined;
    this.zJa = undefined;
    this.xqe = undefined;
    this.RNl = undefined;
    this.xnl = -1;
    this.U8l = [];
    this.hNl = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.DNl = this.OpenParam;
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.zJa.SetCloseCallBack(this.hNl);
    this.zJa.SetHelpBtnActive(false);
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), () => new MapExploreStoryItem_1.MapExploreStoryItem());
    this.U8l = this.DNl.AreaData.GetStoryList();
    await this.xqe.RefreshByDataAsync(this.U8l, true);
    this.xnl = this.U8l.findIndex(i => !!i.IsNewOpen);
    this.xqe.LateScrollTo(this.xqe.GetItemByIndex(this.xnl));
    this.RNl = new MapAreaOnlyShowItem_1.MapAreaOnlyShowItem();
    var i = this.GetItem(3).GetOwner();
    await this.RNl.CreateThenShowByActorAsync(i);
  }
  OnBeforeShow() {
    var i = this.DNl.AreaData;
    var t = i.GetStoryViewTitle();
    this.GetText(5)?.SetText(t);
    var t = i.GetProgress();
    this.GetText(4)?.SetText(t + "%");
    this.RNl?.Refresh(i.GetIconPercentDataAreaStory());
  }
  OnAfterPlayStartSequence() {
    if (this.xnl >= 0) {
      for (let i = this.xnl; i < this.U8l.length; i++) {
        if (this.U8l[i].IsNewOpen) {
          this.xqe.GetScrollItemByIndex(i)?.PlayNewOpenAnim();
        }
      }
    }
  }
  OnBeforeDestroy() {
    this.DNl?.AreaData.SaveLocalAreaStoryProgress();
    this.DNl?.AreaData.SaveLocalIconPercentAreaStory();
    this.zJa = undefined;
    this.xqe = undefined;
    this.RNl = undefined;
  }
}
exports.MapExploreStoryView = MapExploreStoryView;
//# sourceMappingURL=MapExploreStoryView.js.map