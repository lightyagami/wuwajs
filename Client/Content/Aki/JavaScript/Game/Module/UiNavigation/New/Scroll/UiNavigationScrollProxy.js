"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiNavigationScrollProxy = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
class UiNavigationScrollProxy {
  constructor() {
    this.ScrollView = undefined;
    this.RootUiComp = undefined;
  }
  wUf(t) {
    var i;
    var r = this.RootUiComp.RelativeScale3D;
    let s = MathUtils_1.MathUtils.KindaSmallNumber * 2;
    if (t && r.Y > 1) {
      i = r.Y - 1;
      s += i * this.RootUiComp.Height / 2;
    } else if (!t && r.X > 1) {
      i = r.X - 1;
      s += i * this.RootUiComp.Width / 2;
    }
    return s;
  }
  InitScrollView(t, i) {
    this.RootUiComp = i;
    this.ScrollView = t.GetComponentByClass(UE.UIScrollViewWithScrollbarComponent.StaticClass());
  }
  IsScrollViewActive() {
    return !!this.ScrollView && this.ScrollView.RootUIComp.IsUIActiveInHierarchy();
  }
  GetInturnAnimController() {
    if (this.ScrollView) {
      return this.ScrollView.GetContent()?.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    }
  }
  get IsVertical() {
    return !!this.ScrollView && this.ScrollView.Vertical;
  }
  HasNormalScrollView() {
    return !!this.ScrollView && !this.HasLoopScrollView() && !this.HasMultiTemplateScrollView() && !this.HasDynamicScrollView();
  }
  IsInNormalScrollDisplayByGridActor(t) {
    var i = (0, puerts_1.$ref)(3);
    var r = (0, puerts_1.$ref)(3);
    this.ScrollView.GetOutOfBottomBoundsType(t.GetUIItem(), i, r);
    if (this.ScrollView.Vertical) {
      return (0, puerts_1.$unref)(i) === 0;
    } else {
      return (0, puerts_1.$unref)(r) === 0;
    }
  }
  BindScrollView(t) {
    if (this.HasLoopScrollView() || this.HasMultiTemplateScrollView()) {
      this.ScrollView.BindParentUIItem(t);
    }
  }
  UnBindScrollView(t) {
    if ((this.HasLoopScrollView() || this.HasMultiTemplateScrollView()) && this.ScrollView.IsValid()) {
      this.ScrollView.UnBindParentUIItem(t);
    }
  }
  HasLoopScrollView() {
    return !!this.ScrollView && this.ScrollView instanceof UE.UILoopScrollViewComponent;
  }
  SetLoopScrollViewNavigationIndex(t) {
    if (this.HasLoopScrollView()) {
      this.ScrollView.SetNavigationIndex(t);
    }
  }
  GetLoopScrollViewNavigationIndex() {
    if (this.HasLoopScrollView()) {
      return this.ScrollView.NavigationIndex;
    } else {
      return -1;
    }
  }
  CheckLoopScrollChangeNavigation() {
    return !!this.ScrollView && !!this.ScrollView.IsChangeNavigation && (this.ScrollView.ResetIsChangeNavigation(), true);
  }
  IsInLoopScrollDisplay(t) {
    var i;
    return !this.HasLoopScrollView() || (i = this.ScrollView).NavigationIndex === -1 || i.NavigationIndex === t;
  }
  IsInLoopScrollDisplayByGridActor(t) {
    if (!this.HasLoopScrollView()) {
      return true;
    }
    var i = this.ScrollView;
    var r = (0, puerts_1.$ref)(3);
    var s = (0, puerts_1.$ref)(3);
    var e = this.wUf(i.Vertical);
    let o = undefined;
    o = t ? t.GetUIItem() : this.RootUiComp;
    i.GetOutOfBottomBoundsType(o, r, s, e);
    if (i.Vertical) {
      return (0, puerts_1.$unref)(r) === 0;
    } else {
      return (0, puerts_1.$unref)(s) === 0;
    }
  }
  IsScrollDisplayByGridActor(t) {
    if (!this.ScrollView) {
      return true;
    }
    var i = (0, puerts_1.$ref)(3);
    var r = (0, puerts_1.$ref)(3);
    var s = this.wUf(this.ScrollView.Vertical);
    let e = undefined;
    e = t ? t.GetUIItem() : this.RootUiComp;
    this.ScrollView.GetOutOfBottomBoundsType(e, i, r, s);
    if (this.ScrollView.Vertical) {
      return (0, puerts_1.$unref)(i) === 0;
    } else {
      return (0, puerts_1.$unref)(r) === 0;
    }
  }
  GetDynamicGridActor() {
    if (this.HasDynamicScrollView()) {
      var r = this.ScrollView?.GetContent();
      if (r) {
        let t = this.RootUiComp.GetOwner();
        let i = false;
        while (t && t.IsValid() && t !== r) {
          if (t.GetAttachParentActor() === r) {
            i = true;
            break;
          }
          t = t.GetAttachParentActor();
        }
        if (i) {
          return t;
        } else {
          return undefined;
        }
      }
    }
  }
  HasDynamicScrollView() {
    return !!this.ScrollView && this.ScrollView instanceof UE.UIDynScrollViewComponent;
  }
  IsInDynScrollDisplay(t) {
    if (!this.HasDynamicScrollView()) {
      return true;
    }
    var i = this.ScrollView;
    var r = (0, puerts_1.$ref)(3);
    var s = (0, puerts_1.$ref)(3);
    var e = this.wUf(i.Vertical);
    let o = undefined;
    o = t ? t.GetUIItem() : this.RootUiComp;
    i.GetOutOfBottomBoundsType(o, r, s, e);
    if (i.Vertical) {
      return (0, puerts_1.$unref)(r) === 0;
    } else {
      return (0, puerts_1.$unref)(s) === 0;
    }
  }
  GetMultiTemplateScrollPositiveFind(t, i, r) {
    return !this.ScrollView || (this.ScrollView.Vertical ? t.Z !== 0 ? t.Z > 0 ? r < i : i < r : t.X > 0 ? i < r : r < i : t.X !== 0 ? t.X > 0 ? i < r : r < i : t.Z > 0 ? r < i : i < r);
  }
  TryMultiTemplateScrollToGridIndex(t, i) {
    var r;
    if (this.ScrollView) {
      r = this.ScrollView;
      if (t < i) {
        r.TryScrollToGridIndex(i, false);
      } else {
        r.TryScrollToGridIndex(i, true);
      }
    }
  }
  HasMultiTemplateScrollView() {
    return !!this.ScrollView && this.ScrollView instanceof UE.UIMultiTemplateScrollViewComponent;
  }
}
exports.UiNavigationScrollProxy = UiNavigationScrollProxy;
//# sourceMappingURL=UiNavigationScrollProxy.js.map