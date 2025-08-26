"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicScrollView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation");
class DynamicScrollView {
  constructor(t, i, s, e) {
    this.QGo = undefined;
    this.XGo = undefined;
    this.$Go = undefined;
    this.YGo = new Map();
    this.Vfa = new Map();
    this.r7 = undefined;
    this.JGo = undefined;
    this.cGo = undefined;
    this.zGo = new Map();
    this.LateUpdateCallBack = undefined;
    this.ZGo = new Map();
    this.eNo = false;
    this.tNo = (i, s) => {
      const e = this.r7[i];
      var t = this.zGo.get(s);
      let h = undefined;
      if (t) {
        h = t;
        this.iNo(e, i, s);
      } else {
        h = this.QGo(e, s.GetUIItem(), i);
        t = new Promise(t => {
          h.Init(s.GetUIItem()).finally(() => {
            h.Update(e, i);
            if (this.XGo && this.XGo.IsValid()) {
              this.XGo.SetScrollItemState(i, 2);
            }
            t();
          });
        });
        this.zGo.set(s, h);
        this.ZGo.set(s, t);
      }
      this.oNo(h, i);
      h.SkipDestroyActor = true;
      this.YGo.set(i, h);
      return h.GetUsingItem(e);
    };
    this.rNo = (t, i) => {
      this.YGo.delete(t);
      var s = this.Vfa.get(t);
      if (s) {
        s();
        this.Vfa.delete(t);
      }
    };
    this.nNo = () => {
      this.sNo();
    };
    this.aNo = t => {
      t = this.r7[t];
      return this.$Go.GetItemSize(t);
    };
    this.$wi = t => {
      this.LateUpdateCallBack?.(t);
      this.hNo();
    };
    this.QGo = e;
    this.$Go = s;
    i.SetUIParent(t.RootUIComp);
    this.zGo.clear();
    this.JGo = i;
    this.XGo = t;
    this.XGo.OnItemUpdate.Bind(this.tNo);
    this.XGo.OnItemClear.Bind(this.rNo);
    this.XGo.ItemSizeDelegate.Bind(this.aNo);
    this.XGo.OnDestroyCallBack.Bind(this.nNo);
    this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(this);
    this.cGo.RegisterAnimController();
  }
  async Init() {
    await this.$Go.Init(this.JGo);
  }
  GetDisplayGridNum() {
    return this.XGo.DisplayItemArray.Num();
  }
  GetPreservedGridNum() {
    return this.XGo.DisplayItemArray.Num() + this.XGo.IdleItemArray.Num();
  }
  GetDisplayGridStartIndex() {
    var t = (0, puerts_1.$ref)(0);
    this.XGo.GetItemIndex(0, t);
    return (0, puerts_1.$unref)(t);
  }
  GetDisplayGridEndIndex() {
    var t;
    var i = this.XGo.DisplayItemArray.Num() - 1;
    if (i < 0) {
      return 0;
    } else {
      t = (0, puerts_1.$ref)(0);
      this.XGo.GetItemIndex(i, t);
      return (0, puerts_1.$unref)(t);
    }
  }
  GetGrid(t) {
    return this.XGo.GetItem(t)?.GetUIItem();
  }
  GetGridByDisplayIndex(t) {
    var i = (0, puerts_1.$ref)(0);
    this.XGo.GetItemDisplayIndex(t, i);
    var t = (0, puerts_1.$unref)(i);
    return this.XGo.DisplayItemArray.Get(t)?.GetUIItem();
  }
  GetGridAnimationInterval() {
    return this.XGo.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.XGo.GetGridAnimationStartTime();
  }
  NotifyAnimationStart() {
    this.XGo.SetInAnimation(true);
  }
  NotifyAnimationEnd() {
    this.XGo.SetInAnimation(false);
  }
  RefreshByData(t, i = false, s = false) {
    this.r7 = t;
    this.YGo.clear();
    this.Vfa.clear();
    var e = this.JGo.GetOwner();
    this.JGo.SetUIActive(true);
    this.XGo.RefreshByData(e, t.length, i);
    this.JGo.SetUIActive(false);
    this.XGo.SetInAnimation(true);
    if (!s) {
      this.lNo();
    }
  }
  sNo() {
    if (this.eNo) {
      this.XGo.OnLateUpdate.Unbind();
      this.eNo = false;
    }
  }
  _No() {
    if (!this.eNo) {
      this.XGo.OnLateUpdate.Bind(this.$wi);
      this.eNo = true;
    }
  }
  async iNo(t, i, s) {
    var e = this.ZGo.get(s);
    if (e && (await e, this.zGo.get(s)?.Update(t, i), this.XGo) && this.XGo.IsValid()) {
      this.XGo.SetScrollItemState(i, 2);
    }
  }
  oNo(t, i) {
    t.SetUiActive(true);
  }
  GetScrollItemFromIndex(t) {
    t = this.YGo.get(t);
    if (t) {
      return t;
    }
  }
  GetScrollItemCount() {
    return this.YGo.size;
  }
  GetScrollItemItems() {
    return Array.from(this.YGo.values());
  }
  lNo() {
    if (this.cGo) {
      this.cGo.PlayGridAnim(this.XGo.DisplayItemArray.Num(), true);
    }
  }
  hNo() {
    if (!this.LateUpdateCallBack) {
      this.sNo();
    }
  }
  BindLateUpdate(t) {
    this.LateUpdateCallBack = t;
    this._No();
  }
  UnBindLateUpdate() {
    this.LateUpdateCallBack = undefined;
  }
  AddListenerOnItemClear(t, i) {
    if (this.YGo.has(t)) {
      this.Vfa.set(t, i);
    }
  }
  ClearChildren() {
    for (const t of this.YGo.values()) {
      t.ClearItem();
    }
    this.YGo.clear();
    this.Vfa.clear();
    this.cGo?.Clear();
  }
  async ScrollToItemIndex(t, i = true, s = false) {
    await this.uNo(t, i, s);
  }
  async WaitForInit() {
    await Promise.all(this.ZGo.values());
  }
  ScrollToBottom(t) {
    this.XGo.ScrollToBottom((0, puerts_1.$ref)(new UE.Vector2D(this.XGo.ContentUIItem.RelativeLocation)), t);
  }
  async uNo(t, i = true, s = false) {
    await Promise.all(this.ZGo.values());
    if (s) {
      var e = (this.XGo?.GetContent()?.GetComponentByClass(UE.UIItem.StaticClass())).GetAttachUIChildren();
      for (let t = 0; t < e.Num(); t++) {
        var h = e.Get(t);
        if (h.IsValid()) {
          h.SetAlpha(1);
        }
      }
    }
    this.XGo.ScrollToItemIndex(t);
    if (i) {
      this.ResetGridController();
    }
  }
  ResetGridController() {
    if (this.cGo) {
      this.cGo.PlayGridAnim(this.GetDisplayGridNum(), true);
    }
  }
  GetUiAnimController() {
    return this.XGo?.GetContent()?.GetComponentByClass(UE.UIInturnAnimController.StaticClass());
  }
}
exports.DynamicScrollView = DynamicScrollView;
//# sourceMappingURL=DynScrollView.js.map