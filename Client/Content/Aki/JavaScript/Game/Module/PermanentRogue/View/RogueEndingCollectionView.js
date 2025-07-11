"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResEndingView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueEndingCollectionItem_1 = require("./RogueEndingCollectionItem");
const RogueOutButtonItem_1 = require("./RogueOutButtonItem");
const ROTATION_PARAM = 9;
const REDDOT_TOLERANCE = 0.1;
class RogueResEndingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Bs1 = undefined;
    this.z_1 = undefined;
    this.Y5c = 0;
    this.Ds1 = [];
    this.J_1 = [];
    this.qs1 = [];
    this.Z_1 = false;
    this.Fs1 = () => {
      var t = new RogueEndingCollectionItem_1.RogueEndingCollectionItem();
      t.OnItemClickCall = this.jbe;
      return t;
    };
    this._5e = () => {
      this.CloseMe();
    };
    this.jbe = t => {
      var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(t);
      if (e) {
        if (e && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(t)) {
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheEndingOpen(t);
        }
        UiManager_1.UiManager.OpenView("RogueResEndingSubView", t);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Rogue_End_S1_Lock");
      }
    };
    this.Z6c = () => {
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardViewData(this.Y5c), (t, e) => {
        if (t) {
          this.AddChildViewById(e);
        }
      });
    };
    this.G5c = () => {};
    this.qLn = () => {
      var e = this.J_1.length;
      for (let t = e - 1; t >= 0; t--) {
        var i = this.z_1.GetItemByIndex(this.J_1[t]);
        if (this.z_1.IsItemInViewport(i, REDDOT_TOLERANCE) === 1) {
          const s = this.z_1.GetItemByIndex(this.J_1[t]);
          this.z_1.ScrollTo(s);
          return;
        }
      }
      const s = this.z_1.GetItemByIndex(this.J_1[e - 1]);
      this.z_1.ScrollTo(s);
    };
    this.GLn = () => {
      var e = this.J_1.length;
      for (let t = 0; t <= e - 2; t++) {
        var i = this.z_1.GetItemByIndex(this.J_1[t]);
        if (this.z_1.IsItemInViewport(i, REDDOT_TOLERANCE) === 2) {
          const s = this.z_1.GetItemByIndex(this.J_1[t]);
          this.z_1.ScrollTo(s);
          return;
        }
      }
      const s = this.z_1.GetItemByIndex(this.J_1[e - 1]);
      this.z_1.ScrollTo(s);
    };
    this.qgt = t => {
      this.GetScrollViewWithScrollbar(8)?.SetScrollProgress(1 - t);
      this.Z_1 = true;
    };
    this.e11 = t => {
      var t = t.X;
      var e = this.GetSlider(5);
      if (!this.Z_1) {
        e?.SetValue(1 - t, false);
      }
      this.Z_1 = false;
      this.t11();
    };
    this.i11 = () => {
      for (let t = this.J_1.length = 0; t < this.Ds1.length; t++) {
        var e = this.Ds1[t];
        if (ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(e) && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(e)) {
          this.J_1.push(t);
        }
      }
      this.t11();
    };
    this.r11 = t => {
      var t = this.Ds1.indexOf(t);
      if (t !== -1) {
        t = this.z_1.GetItemByIndex(t);
        this.z_1.ScrollTo(t);
      }
    };
    this.lV1 = t => {
      this.o11();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISliderComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIScrollViewWithScrollbarComponent], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[6, this.qLn], [7, this.GLn]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseCallBack(this._5e);
    this.GetText(1)?.SetUIActive(false);
    this.Bs1 = new RogueOutButtonItem_1.RogueButtonItemA();
    this.Bs1.SetOnClickCall(this.Z6c);
    await this.Bs1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
    this.z_1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.Fs1);
  }
  OnStart() {
    this.Y5c = this.OpenParam;
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardCount(this.Y5c);
    this.Bs1.SetNum(t[0] + "/" + t[1]);
    this.Bs1?.BindRedDot("RogueResEnding", this.Y5c);
    this.Ds1 = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(this.Y5c);
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingCount(this.Y5c);
    this.GetItem(9)?.SetUIActive(t[0] === 0);
    this.GetItem(10)?.SetUIActive(t[0] !== 0);
    this.GetItem(11)?.SetUIActive(t[0] !== 0);
  }
  OnBeforeHide() {
    this.Bs1?.UnBindRedDot();
  }
  OnBeforeDestroy() {
    this.lqe = undefined;
    this.Bs1 = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.G5c);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResEndingRedDotUpdate, this.i11);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResEndingSwitch, this.r11);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.lV1);
    this.GetSlider(5).OnValueChangeCb.Bind(this.qgt);
    this.GetScrollViewWithScrollbar(8).OnScrollValueChange.Bind(this.e11);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.G5c);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResEndingRedDotUpdate, this.i11);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResEndingSwitch, this.r11);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.lV1);
    this.GetSlider(5).OnValueChangeCb.Unbind();
    this.GetScrollViewWithScrollbar(8).OnScrollValueChange.Unbind();
  }
  o11() {
    for (let t = 0; t < this.Ds1.length; t++) {
      var e = {
        ConfigId: this.Ds1[t],
        Index: t + 1,
        IsSubView: false,
        IsUnlock: ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(this.Ds1[t]),
        Rotation: t % 2 == 0 ? ROTATION_PARAM : ROTATION_PARAM * -1
      };
      this.qs1.push(e);
    }
    this.z_1?.RefreshByData(this.qs1, this.i11, true);
  }
  t11() {
    var t;
    var e;
    if (this.J_1.length === 0) {
      this.GetButton(6)?.RootUIComp.SetUIActive(false);
      this.GetButton(7)?.RootUIComp.SetUIActive(false);
    } else {
      e = this.z_1.GetItemByIndex(this.J_1[0]);
      t = this.z_1.GetItemByIndex(this.J_1[this.J_1.length - 1]);
      e = this.z_1.IsItemInViewport(e, REDDOT_TOLERANCE);
      this.GetButton(6)?.RootUIComp.SetUIActive(e === 1);
      e = this.z_1.IsItemInViewport(t, REDDOT_TOLERANCE);
      this.GetButton(7)?.RootUIComp.SetUIActive(e === 2);
    }
  }
}
exports.RogueResEndingView = RogueResEndingView;
//# sourceMappingURL=RogueEndingCollectionView.js.map