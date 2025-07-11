"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericLayout = undefined;
const UE = require("ue");
const Queue_1 = require("../../../../Core/Container/Queue");
const InTurnGridAppearAnimation_1 = require("../Grid/GridAnimation/InTurnGridAppearAnimation");
const LguiUtil_1 = require("../LguiUtil");
const ScrollViewDelegate_1 = require("../ScrollView/ScrollViewDelegate");
class OperationParam {
  constructor(t = undefined, i = undefined, s = false) {
    this.Data = t;
    this.CallBack = i;
    this.PlayGridAnim = s;
  }
}
class GenericLayout {
  constructor(t, i, s = undefined, e = false, r = true) {
    this.eGe = undefined;
    this.uGo = undefined;
    this.cGo = undefined;
    this.AnimControllerComponent = undefined;
    this.mGo = [];
    this.dGo = [];
    this.CGo = [];
    this.gGo = new Map();
    this.fGo = undefined;
    this.gWt = new Queue_1.Queue();
    this.pjt = false;
    this.IsRefreshAsync = false;
    this.IsGridShowWhenCreate = true;
    this.pGo = () => {
      this.UnBindLateUpdate();
    };
    this.IsRefreshAsync = e;
    this.IsGridShowWhenCreate = r;
    this.eGe = t;
    this.eGe.GetOwner().OnDestroyed.Add(this.pGo);
    this.fGo = s || t.RootUIComp.GetAttachUIChild(0)?.GetOwner();
    if (this.fGo) {
      this.fGo.GetUIItem().SetUIActive(false);
      this.uGo = new ScrollViewDelegate_1.ScrollViewDelegate(i);
      this.cGo = new InTurnGridAppearAnimation_1.InTurnGridAppearAnimation(this);
      this.cGo.RegisterAnimController();
    }
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = true;
  }
  Jft() {
    var t;
    this.pjt = false;
    if (!this.gWt.Empty) {
      t = this.gWt.Pop();
      this.RefreshByData(t.Data, t.CallBack, t.PlayGridAnim);
    }
  }
  GetRootUiItem() {
    return this.eGe?.RootUIComp;
  }
  V2e() {
    return LguiUtil_1.LguiUtil.CopyItem(this.fGo.GetUIItem(), this.GetRootUiItem());
  }
  GetKey(t) {
    if (!(t < 0) && !(t >= this.CGo.length)) {
      var i = this.CGo[t];
      if (i) {
        var s = this.uGo.GetDatas()[t];
        if (s !== undefined) {
          return i.GetKey(s, t);
        }
      }
    }
  }
  GetGridIndexByKey(t) {
    return this.gGo.get(t)?.GridIndex;
  }
  ClearChildren() {
    for (const i of this.mGo) {
      var t = i.GetOwner();
      if (t?.IsValid()) {
        t.K2_DestroyActor();
      }
    }
    this.mGo.length = 0;
    this.dGo.length = 0;
    this.CGo.length = 0;
    this.gGo.clear();
  }
  async LoadGrid(i, s = true) {
    var e = [];
    for (let t = this.mGo.length; t < i; t++) {
      var r = this.V2e();
      e.push(this.uGo.CreateGridProxyAsync(t, r.GetOwner(), s));
      this.mGo.push(r);
    }
    await Promise.all(e);
  }
  async RefreshByDataDirectly(t) {
    var i = t.length;
    if (i > this.mGo.length) {
      return false;
    }
    this.uGo.SetData(t);
    this.uGo.ClearSelectInfo();
    this.gGo.clear();
    for (let t = this.dGo.length; t < i; t++) {
      var s = this.mGo[t];
      s.SetUIActive(true);
      this.dGo.push(s);
      this.CGo.push(this.uGo.GetGridProxy(t));
    }
    if (this.IsRefreshAsync) {
      await this.F6_();
    } else {
      this.N6_();
    }
    return true;
  }
  RefreshByData(t, i, s = false) {
    var e;
    if (this.Rjt) {
      e = new OperationParam(t, i, s);
      this.gWt.Push(e);
    } else {
      this.Ujt();
      this.RefreshByDataAsync(t, s).finally(() => {
        i?.();
        this.Jft();
      });
    }
  }
  async RefreshByDataAsync(t, i = false, s = t.length) {
    await this.MGo(t, s);
    if (i && this.cGo) {
      this.cGo.PlayGridAnim(this.GetDisplayGridNum());
    }
  }
  RefreshWithoutDataSync() {
    this.N6_();
  }
  N6_() {
    if (this.dGo.length !== 0) {
      for (let t = 0; t < this.dGo.length; t++) {
        this.V6_(t);
      }
    }
  }
  async F6_() {
    var i = this.dGo.length;
    if (i !== 0) {
      var s = new Array(i);
      for (let t = 0; t < i; t++) {
        s[t] = this.j6_(t);
      }
      await Promise.all(s);
    }
  }
  V6_(t) {
    this.uGo.RefreshGridProxy(t, t);
    var i = this.CGo[t];
    this.gGo.set(this.GetKey(t), i);
  }
  async j6_(t) {
    await this.uGo.RefreshGridProxyAsync(t, t);
    var i = this.CGo[t];
    this.gGo.set(this.GetKey(t), i);
  }
  async MGo(t, i) {
    var s = i;
    this.uGo.SetData(t);
    this.uGo.ClearSelectInfo();
    this.gGo.clear();
    var e = this.dGo.length;
    if (s <= e) {
      for (let t = s; t < e; t++) {
        this.mGo[t].SetUIActive(false);
      }
      this.dGo.length = s;
      this.CGo.length = s;
      if (this.IsRefreshAsync) {
        await this.F6_();
      } else {
        this.N6_();
      }
    } else if (this.mGo.length >= s) {
      for (let t = e; t < s; t++) {
        var r = this.mGo[t];
        r.SetUIActive(true);
        this.dGo.push(r);
        this.CGo.push(this.uGo.GetGridProxy(t));
      }
      if (this.IsRefreshAsync) {
        await this.F6_();
      } else {
        this.N6_();
      }
    } else {
      var h = this.mGo.length;
      for (let t = e; t < h; t++) {
        var a = this.mGo[t];
        a.SetUIActive(true);
        this.dGo.push(a);
        this.CGo.push(this.uGo.GetGridProxy(t));
      }
      if (this.IsRefreshAsync) {
        await this.F6_();
      } else {
        this.N6_();
      }
      await this.LoadGrid(s, this.IsGridShowWhenCreate);
      var n = this.IsRefreshAsync ? [] : undefined;
      for (let t = h; t < this.mGo.length; t++) {
        var o = this.mGo[t];
        o.SetUIActive(true);
        this.dGo.push(o);
        this.CGo.push(this.uGo.GetGridProxy(t));
        if (this.IsRefreshAsync) {
          n.push(this.j6_(t));
        } else {
          this.V6_(t);
        }
      }
      if (this.IsRefreshAsync && n && n.length > 0) {
        await Promise.all(n);
      }
    }
  }
  GetItemByIndex(t) {
    return this.dGo[t];
  }
  GetItemByKey(t) {
    t = this.GetLayoutItemByKey(t);
    return this.dGo[t.GridIndex];
  }
  GetLayoutItemByKey(t) {
    return this.gGo.get(t);
  }
  GetLayoutItemMap() {
    return this.gGo;
  }
  GetLayoutItemList() {
    return this.CGo;
  }
  GetLayoutItemByIndex(t) {
    var i = this.uGo.IsProxyValid(t);
    if (i && !(t >= this.CGo.length)) {
      return this.CGo[t];
    }
  }
  GetDatas() {
    return this.uGo.GetDatas();
  }
  SelectGridProxy(t, i = false) {
    this.uGo.SelectGridProxy(t, t, i);
  }
  SelectGridProxyByKey(t, i = false) {
    t = this.GetGridIndexByKey(t);
    if (t !== undefined) {
      this.SelectGridProxy(t, i);
    }
  }
  DeselectCurrentGridProxy() {
    this.uGo.DeselectCurrentGridProxy(false);
  }
  GetSelectedGridIndex() {
    return this.uGo.GetSelectedGridIndex();
  }
  GetSelectedProxy() {
    return this.uGo.GetSelectedProxy();
  }
  BindLateUpdate(t) {
    this.eGe.OnLateUpdate.Bind(t);
  }
  UnBindLateUpdate() {
    this.eGe.OnLateUpdate.Unbind();
  }
  SetActive(t) {
    this.eGe?.RootUIComp.SetUIActive(t);
  }
  GetDisplayGridNum() {
    return this.CGo.length;
  }
  GetPreservedGridNum() {
    return this.mGo.length;
  }
  GetDisplayGridStartIndex() {
    return 0;
  }
  GetDisplayGridEndIndex() {
    return this.GetDisplayGridNum() - 1;
  }
  GetGrid(t) {
    return this.dGo[t];
  }
  GetGridByDisplayIndex(t) {
    return this.dGo[t];
  }
  GetGridAnimationInterval() {
    return this.eGe.GetGridAnimationInterval();
  }
  GetGridAnimationStartTime() {
    return this.eGe.GetGridAnimationStartTime();
  }
  NotifyAnimationStart() {
    this.eGe.SetInAnimation(true);
  }
  NotifyAnimationEnd() {
    this.eGe.SetInAnimation(false);
  }
  GetUiAnimController() {
    this.AnimControllerComponent ||= this.eGe?.GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    return this.AnimControllerComponent;
  }
  PlayGridAnim() {
    if (this.cGo) {
      this.cGo.PlayGridAnim(this.GetDisplayGridNum());
    }
  }
}
exports.GenericLayout = GenericLayout;
//# sourceMappingURL=GenericLayout.js.map