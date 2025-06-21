"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueResEndingView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RogueEndingCollectionItem_1 = require("./RogueEndingCollectionItem"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem"),
  ROTATION_PARAM = 9,
  REDDOT_TOLERANCE = .1;
class RogueResEndingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lqe = void 0, this.ds1 = void 0, this.c_1 = void 0, this.Y5c = 0, this.cs1 = [], this.u_1 = [], this.gs1 = [], this.d_1 = !1, this.ps1 = () => {
      var t = new RogueEndingCollectionItem_1.RogueEndingCollectionItem;
      return t.OnItemClickCall = this.jbe, t
    }, this._5e = () => {
      this.CloseMe()
    }, this.jbe = t => {
      var e = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(t);
      e ? (e && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(t) && ModelManager_1.ModelManager.ActivityPermanentRogueModel.SetCacheEndingOpen(t), UiManager_1.UiManager.OpenView("RogueResEndingSubView", t)) : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Rogue_End_S1_Lock")
    }, this.Z6c = () => {
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardViewData(this.Y5c), (t, e) => {
        t && this.AddChildViewById(e)
      })
    }, this.G5c = () => {}, this.qLn = () => {
      var e = this.u_1.length;
      for (let t = e - 1; 0 <= t; t--) {
        var i = this.c_1.GetItemByIndex(this.u_1[t]);
        if (1 === this.c_1.IsItemInViewport(i, REDDOT_TOLERANCE)) {
          const s = this.c_1.GetItemByIndex(this.u_1[t]);
          return void this.c_1.ScrollTo(s)
        }
      }
      const s = this.c_1.GetItemByIndex(this.u_1[e - 1]);
      this.c_1.ScrollTo(s)
    }, this.GLn = () => {
      var e = this.u_1.length;
      for (let t = 0; t <= e - 2; t++) {
        var i = this.c_1.GetItemByIndex(this.u_1[t]);
        if (2 === this.c_1.IsItemInViewport(i, REDDOT_TOLERANCE)) {
          const s = this.c_1.GetItemByIndex(this.u_1[t]);
          return void this.c_1.ScrollTo(s)
        }
      }
      const s = this.c_1.GetItemByIndex(this.u_1[e - 1]);
      this.c_1.ScrollTo(s)
    }, this.qgt = t => {
      this.GetScrollViewWithScrollbar(8)?.SetScrollProgress(1 - t), this.d_1 = !0
    }, this.m_1 = t => {
      var t = t.X,
        e = this.GetSlider(5);
      this.d_1 || e?.SetValue(1 - t, !1), this.d_1 = !1, this.f_1()
    }, this.g_1 = () => {
      for (let t = this.u_1.length = 0; t < this.cs1.length; t++) {
        var e = this.cs1[t];
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(e) && !ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCacheEndingOpen(e) && this.u_1.push(t)
      }
      this.f_1()
    }, this.C_1 = t => {
      var t = this.cs1.indexOf(t); - 1 !== t && (t = this.c_1.GetItemByIndex(t), this.c_1.ScrollTo(t))
    }, this.x41 = t => {
      this.p_1()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UISliderComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIScrollViewWithScrollbarComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem]
    ], this.BtnBindInfo = [
      [6, this.qLn],
      [7, this.GLn]
    ]
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.lqe.SetHelpBtnActive(!1), this.lqe.SetHelpBtnActive(!1), this.lqe.SetCloseCallBack(this._5e), this.GetText(1)?.SetUIActive(!1), this.ds1 = new RogueOutButtonItem_1.RogueButtonItemA, this.ds1.SetOnClickCall(this.Z6c), await this.ds1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.c_1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(8), this.ps1)
  }
  OnStart() {
    this.Y5c = this.OpenParam
  }
  OnBeforeShow() {
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingAwardCount(this.Y5c),
      t = (this.ds1.SetNum(t[0] + "/" + t[1]), this.ds1?.BindRedDot("RogueResEnding", this.Y5c), this.cs1 = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingListBySeasonId(this.Y5c), ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingCount(this.Y5c));
    this.GetItem(9)?.SetUIActive(0 === t[0]), this.GetItem(10)?.SetUIActive(0 !== t[0]), this.GetItem(11)?.SetUIActive(0 !== t[0])
  }
  OnBeforeHide() {
    this.ds1?.UnBindRedDot()
  }
  OnBeforeDestroy() {
    this.lqe = void 0, this.ds1 = void 0
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.G5c), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResEndingRedDotUpdate, this.g_1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResEndingSwitch, this.C_1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.x41), this.GetSlider(5).OnValueChangeCb.Bind(this.qgt), this.GetScrollViewWithScrollbar(8).OnScrollValueChange.Bind(this.m_1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.G5c), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResEndingRedDotUpdate, this.g_1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResEndingSwitch, this.C_1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.x41), this.GetSlider(5).OnValueChangeCb.Unbind(), this.GetScrollViewWithScrollbar(8).OnScrollValueChange.Unbind()
  }
  p_1() {
    for (let t = 0; t < this.cs1.length; t++) {
      var e = {
        ConfigId: this.cs1[t],
        Index: t + 1,
        IsSubView: !1,
        IsUnlock: ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetEndingIsUnlock(this.cs1[t]),
        Rotation: t % 2 == 0 ? ROTATION_PARAM : -1 * ROTATION_PARAM
      };
      this.gs1.push(e)
    }
    this.c_1?.RefreshByData(this.gs1, this.g_1, !0)
  }
  f_1() {
    var t, e;
    0 === this.u_1.length ? (this.GetButton(6)?.RootUIComp.SetUIActive(!1), this.GetButton(7)?.RootUIComp.SetUIActive(!1)) : (e = this.c_1.GetItemByIndex(this.u_1[0]), t = this.c_1.GetItemByIndex(this.u_1[this.u_1.length - 1]), e = this.c_1.IsItemInViewport(e, REDDOT_TOLERANCE), this.GetButton(6)?.RootUIComp.SetUIActive(1 === e), e = this.c_1.IsItemInViewport(t, REDDOT_TOLERANCE), this.GetButton(7)?.RootUIComp.SetUIActive(2 === e))
  }
}
exports.RogueResEndingView = RogueResEndingView;
//# sourceMappingURL=RogueEndingCollectionView.js.map