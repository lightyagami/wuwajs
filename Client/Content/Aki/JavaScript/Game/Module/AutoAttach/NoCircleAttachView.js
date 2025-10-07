"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoCircleAttachView = undefined;
const Log_1 = require("../../../Core/Common/Log");
const LguiUtil_1 = require("../Util/LguiUtil");
const AutoAttachBaseView_1 = require("./AutoAttachBaseView");
const FLOATDURABLENUM = 0.01;
class NoCircleAttachView extends AutoAttachBaseView_1.AutoAttachBaseView {
  constructor() {
    super(...arguments);
    this.NKe = undefined;
    this.U1e = undefined;
    this.OKe = false;
    this.p5l = new Array();
  }
  SetIfNeedFakeItem(t) {
    this.OKe = t;
  }
  SetControllerItem(t) {
    this.ControllerItem = t;
    this.ControllerWidth = t.GetWidth();
    this.ControllerHeight = t.GetHeight();
  }
  FindAutoAttachItem() {
    return this.kKe();
  }
  kKe() {
    let i = undefined;
    let s = 10000000;
    var e = this.Items.length;
    for (let t = 0; t < e; t++) {
      var h = Math.abs(this.Items[t].GetCurrentPosition());
      var r = this.Items[t].GetCurrentShowItemIndex() >= 0 && this.Items[t].GetCurrentShowItemIndex() < this.DataLength;
      if (h < s && r) {
        i = this.Items[t];
        s = h;
      }
    }
    if (i === undefined) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("UiCommon", 27, "找不到可附着物体，拿第一个做保底");
      }
      i = this.Items[0];
    }
    return i;
  }
  GetTrueBoundary() {
    if (this.NKe === undefined) {
      let i = 0;
      for (let t = 0; t < 1; t += FLOATDURABLENUM) {
        var s = this.GetCurveValue(this.BoundaryCurve, t);
        i += FLOATDURABLENUM * s * this.MoveBoundary;
      }
      this.NKe = i;
    }
    return this.NKe;
  }
  RecalculateMoveOffset(t) {
    t = this.VKe(t);
    if (this.AttachDirection === 0) {
      if (!this.HKe(t)) {
        return 0;
      }
    } else if (!this.jKe(t)) {
      return 0;
    }
    return t;
  }
  WKe(t) {
    var i = this.FindNearestMiddleItem();
    var s = i.GetCurrentPosition();
    let e = 0;
    return e = t > 0 ? this.GetCurrentMoveDirection() === 0 ? i.GetCurrentShowItemIndex() * (this.GetItemSize() + this.Gap) + s : (this.DataLength - 1 - i.GetCurrentShowItemIndex()) * (this.GetItemSize() + this.Gap) * -1 + s : this.GetCurrentMoveDirection() === 0 ? (this.DataLength - 1 - i.GetCurrentShowItemIndex()) * (this.GetItemSize() + this.Gap) * -1 + s : i.GetCurrentShowItemIndex() * (this.GetItemSize() + this.Gap) + s;
  }
  VKe(t) {
    let i = t > 0 ? 0 : this.DataLength - 1;
    if (this.AttachDirection !== 0) {
      i = t > 0 ? this.DataLength - 1 : 0;
    }
    var s;
    var e = this.GetShowIndexItem(i);
    if (!e) {
      s = this.WKe(t);
      if (Math.abs(s) < Math.abs(t)) {
        return s;
      } else {
        return t;
      }
    }
    let h = e.GetCurrentPosition();
    let r = (h = -FLOATDURABLENUM < h && h < FLOATDURABLENUM ? 0 : h) + t;
    if (this.AttachDirection !== 0) {
      r = h - t;
    }
    if (t > 0) {
      if (r < 0) {
        return t;
      }
    } else if (r > 0) {
      return t;
    }
    return this.KKe(t, h);
  }
  KKe(t, i) {
    let s = 0;
    let e = 0;
    if (t > 0) {
      if (i < 0) {
        e = 0 - i;
      }
    } else if (i > 0) {
      e = 0 - i;
    }
    var h = t - (s = 0 + e);
    var r = this.QKe(t, i);
    var h = s + h * r;
    var r = i + h;
    return s = t > 0 ? r >= this.XKe() ? e > 0 ? e + this.XKe() : this.XKe() - i : h : r <= this.XKe() * -1 ? e < 0 ? e + this.XKe() * -1 : (this.XKe() + i) * -1 : h;
  }
  XKe() {
    if (this.U1e === undefined) {
      let i = 0;
      for (let t = 0; t < this.MoveBoundary; t += 1) {
        var s = this.QKe(1, t);
        i += +s;
      }
      this.U1e = i;
    }
    return this.U1e;
  }
  QKe(t, i) {
    if (this.GetTrueBoundary() <= 0) {
      return 0;
    } else {
      i = Math.abs(i) / this.GetTrueBoundary();
      return this.GetCurveValue(this.BoundaryCurve, i = i > 1 ? 1 : i);
    }
  }
  HKe(i) {
    let s = undefined;
    var e = this.Items.length;
    for (let t = 0; t < e - 1; t++) {
      if (this.Items[t].GetCurrentShowItemIndex() === 0) {
        s = this.Items[t];
        break;
      }
    }
    if (s && i > 0) {
      var t = s.GetCurrentPosition() + i;
      var h = Math.abs(s.GetCurrentPosition()) + this.GetTrueBoundary();
      if (Math.abs(t) > Math.abs(h)) {
        return false;
      }
    } else if (i < 0) {
      for (let t = 0; t < e; t++) {
        if (this.Items[t].GetCurrentShowItemIndex() === this.DataLength - 1) {
          if (this.Items[t].GetCurrentPosition() + i < 0 - this.Items[t].GetCurrentPosition() - this.GetTrueBoundary()) {
            return false;
          }
        }
      }
    }
    return true;
  }
  jKe(i) {
    let s = undefined;
    var e = this.Items.length;
    for (let t = 0; t < e - 1; t++) {
      if (this.Items[t].GetCurrentShowItemIndex() === 0) {
        s = this.Items[t];
        break;
      }
    }
    if (i > 0) {
      for (let t = 0; t < e; t++) {
        if (this.Items[t].GetCurrentShowItemIndex() === this.DataLength - 1) {
          var h = this.Items[t].GetCurrentPosition() + i;
          if (0 - this.Items[t].GetCurrentPosition() + this.GetTrueBoundary() < h) {
            return false;
          }
        }
      }
    } else if (s && i < 0) {
      var t = s.GetCurrentPosition() + i;
      var r = s.GetCurrentPosition() + this.GetTrueBoundary();
      if (Math.abs(t) > Math.abs(r)) {
        return false;
      }
    }
    return true;
  }
  FindNextDirectionItem(t) {
    let i = 0;
    var s = this.FindNearestMiddleItem().GetCurrentShowItemIndex();
    i = t > 0 ? s + t < this.DataLength ? s + t : this.DataLength - 1 : s + t > 0 ? s + t : 0;
    return this.GetShowIndexItem(i);
  }
  ReloadItems(i, s, t = 0) {
    var e;
    var h = i > this.ShowItemNum || this.OKe ? this.ShowItemNum + 1 : i;
    for (let t = i; t < this.p5l.length; t++) {
      this.p5l[t].SetUiActive(false);
    }
    this.Items = [];
    for (let t = 0; t < h; t++) {
      if (t >= this.p5l.length) {
        e = LguiUtil_1.LguiUtil.DuplicateActor(this.SourceActor, this.ControllerItem);
        (e = this.CreateItemFunction(e, t, this.ShowItemNum)).SetSourceView(this);
        this.Items.push(e);
        this.p5l.push(e);
      } else {
        this.Items.push(this.p5l[t]);
      }
      this.Items[t].SetIfNeedShowFakeItem(this.OKe);
      this.Items[t].SetItemIndex(t);
      this.Items[t].SetUiActive(true);
      this.Items[t].SetData(s);
      this.Items[t].InitItem();
    }
    this.RefreshItems();
    this.ForceUnSelectItems();
    this.AttachToIndex(t, true);
  }
  GetIfCircle() {
    return false;
  }
}
exports.NoCircleAttachView = NoCircleAttachView;
//# sourceMappingURL=NoCircleAttachView.js.map