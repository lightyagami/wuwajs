"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const FightPhotoTaskItem_1 = require("./Item/FightPhotoTaskItem");
const FightPhotoTaskTabItem_1 = require("./Item/FightPhotoTaskTabItem");
class FightPhotoRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.hT = 0;
    this.B7t = undefined;
    this.qoh = undefined;
    this.wNe = t => {
      if (t === this.CNe.Id) {
        this.B7t.RefreshWithoutDataSync();
        this.Ooh(true);
      }
    };
    this.Hwn = () => {
      var t = new FightPhotoTaskTabItem_1.FightPhotoTaskTabItem();
      t.activityData = this.CNe;
      t.OnToggleClickCallBack = this.HEu;
      return t;
    };
    this.HEu = t => {
      this.hT = t;
      this.B7t.SelectGridProxyByKey(t);
      this.PlaySequence("Switch");
      this.Ooh();
    };
    this.VOe = () => {
      var t = new FightPhotoTaskItem_1.FightPhotoTaskItem();
      t.OnRewardBtnClick = this.g6e;
      return t;
    };
    this.g6e = () => {
      this.CNe.RequestTaskReward(this.hT);
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.$An = t => {
      if (t === "ListAnim") {
        this.GetUiInturnAnimController(5)?.Play();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIInturnAnimController]];
  }
  async OnBeforeStartAsync() {
    this.CNe = this.OpenParam;
    var t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    t.SetTitle(this.CNe.GetTitle());
    t.SetHelpBtnActive(false);
    t.SetCloseCallBack(this.AMo);
    this.B7t = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Hwn);
    this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.VOe);
    var t = this.CNe.GetFightPhotoTaskTabList();
    await this.B7t.RefreshByDataAsync(t, true);
    this.HEu(t[0].TabId);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.wNe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  Ooh(t = false) {
    this.qoh.RefreshByData(this.CNe.GetTaskDataList(this.hT), () => {
      this.qoh.LateScrollTo(this.qoh.GetItemByIndex(0));
    }, t);
  }
}
exports.FightPhotoRewardView = FightPhotoRewardView;
//# sourceMappingURL=FightPhotoRewardView.js.map