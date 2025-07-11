"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkWorldRunView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const DreamLinkController_1 = require("../DreamLinkController");
const DreamLinkScoreRewardItem_1 = require("./DreamLinkScoreRewardItem");
const DreamLinkWorldRunTaskItem_1 = require("./DreamLinkWorldRunTaskItem");
const LAYOUT_ANIMATION_START = "InturnAnimation";
class DreamLinkWorldRunView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.boh = undefined;
    this.lqe = undefined;
    this.qsi = undefined;
    this.qoh = undefined;
    this.VOe = () => new DreamLinkWorldRunTaskItem_1.DreamLinkWorldRunTaskItem();
    this.$An = e => {
      if (LAYOUT_ANIMATION_START === e) {
        this.Ooh();
      }
    };
    this.Ooh = () => {
      if (this.boh) {
        this.qoh.RefreshByData(this.boh.GetDreamLinkRunTaskDataList(), undefined, true);
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.SpineSkeletonAnimationComponent], [4, UE.SpineSkeletonAnimationComponent], [5, UE.SpineSkeletonAnimationComponent]];
  }
  async OnBeforeStartAsync() {
    var e;
    this.boh = DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
    if (this.boh) {
      e = [];
      this.qsi = new DreamLinkScoreRewardItem_1.DreamLinkScoreRewardItem(this.boh);
      e.push(this.qsi.CreateByActorAsync(this.GetItem(2).GetOwner()));
      this.AddChild(this.qsi);
      await Promise.all(e);
    }
  }
  OnStart() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    this.lqe.SetCloseCallBack(this.AMo);
    this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.VOe);
    this.RAr();
  }
  OnBeforeShow() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DreamLinkRewardRefresh, this.Ooh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DreamLinkRewardRefresh, this.Ooh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnTick(e) {
    if (this.qoh) {
      for (const i of this.qoh.GetScrollItemList()) {
        i.RefreshLockText();
      }
    }
  }
  RAr() {
    this.GetSpine(3).SetAnimation(0, "idle", true);
    this.GetSpine(4).SetAnimation(0, "idle", true);
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0 ? "nvzhu" : "nanzhu";
    this.GetSpine(5).SetAnimation(0, e, true);
  }
}
exports.DreamLinkWorldRunView = DreamLinkWorldRunView;
//# sourceMappingURL=DreamLinkWorldRunView.js.map