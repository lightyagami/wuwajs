"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScrollViewDelegate = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class ScrollViewDelegate {
  constructor(i) {
    this.Pe = [];
    this.RKe = 0;
    this.INo = [];
    this.TNo = [];
    this.oOi = undefined;
    this.LNo = undefined;
    this.DNo = false;
    this.RNo = -1;
    this.UNo = undefined;
    this.oOi = i;
  }
  SetData(i) {
    this.ClearData();
    this.Pe = this.Pe.concat(i);
    this.RKe = this.Pe.length;
  }
  GetDatas() {
    return this.Pe;
  }
  SetDataProxy(i, t, s = true) {
    this.ClearData();
    this.LNo = i;
    this.RKe = t;
    this.DNo = s;
  }
  OnGridsUpdate(i, t, s, e) {
    if (i >= this.RKe || t >= this.INo.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 43, `参数值非法 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.RKe} Proxies.length: ${this.INo.length}`);
      }
    } else {
      if (this.RNo !== -1 && (this.RNo < s || this.RNo > e)) {
        this.UNo = undefined;
      }
      this.TNo[t] = true;
      this.RefreshGridProxy(i, t);
    }
  }
  RefreshGridProxy(i, t) {
    var s;
    var e;
    var r;
    if (i >= this.RKe || t >= this.INo.length) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ScrollViewGrid", 43, `参数值非法 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.RKe} Proxies.length: ${this.INo.length}`);
      }
    } else if (s = this.GetGridProxy(t)) {
      if (s.Refresh) {
        if ((e = i !== -1 && i === this.RNo) && !this.UNo) {
          this.UNo = s;
        }
        r = this.ANo(i, t);
        s.GridIndex = i;
        s.DisplayIndex = t;
        s.Refresh(r, e, i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 43, "Proxy没有实现同步刷新方法Refresh");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScrollViewGrid", 43, `Proxy获取异常 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.RKe} Proxies.length: ${this.INo.length}`);
    }
  }
  async RefreshGridProxyAsync(i, t) {
    var s;
    var e;
    var r;
    if (i >= this.RKe || t >= this.INo.length) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("ScrollViewGrid", 43, `参数值非法 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.RKe} Proxies.length: ${this.INo.length}`);
      }
    } else if (s = this.GetGridProxy(t)) {
      if (s.RefreshAsync) {
        if ((e = i !== -1 && i === this.RNo) && !this.UNo) {
          this.UNo = s;
        }
        r = this.ANo(i, t);
        s.GridIndex = i;
        s.DisplayIndex = t;
        await s.RefreshAsync(r, e, i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 43, "Proxy没有实现异步刷新方法RefreshAsync");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ScrollViewGrid", 43, `Proxy获取异常 gridIndex: ${i} displayIndex: ${t} Data.length: ${this.RKe} Proxies.length: ${this.INo.length}`);
    }
  }
  ANo(i, t) {
    let s = undefined;
    if (!(s = this.Pe.length > i ? this.Pe[i] : s) && this.LNo && (s = this.LNo(i), this.DNo)) {
      this.Pe[i] = s;
    }
    return s;
  }
  TryGetCachedData(i) {
    if (this.Pe.length > i) {
      return this.Pe[i];
    }
  }
  CreateGridProxy(i, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ScrollViewGrid", 43, `CreateProxy displayIndex: ${i}, Proxies.length: ${this.INo.length}`);
    }
    var s = this.INo[i];
    if (s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 43, "Proxy已经存在", ["DisplayIndex", i]);
      }
    } else {
      (s = this.oOi()).CreateThenShowByActor(t);
      this.INo[i] = s;
      this.TNo[i] = false;
      s.ScrollViewDelegate = this;
    }
    return s;
  }
  async CreateGridProxyAsync(i, t, s = true) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ScrollViewGrid", 43, `CreateProxy displayIndex: ${i}, Proxies.length: ${this.INo.length}`);
    }
    var e = this.INo[i];
    if (e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 43, "Proxy已经存在 displayIndex: ", ["displayIndex", i]);
      }
    } else {
      ((e = this.oOi()).ScrollViewDelegate = this).INo[i] = e;
      this.TNo[i] = false;
      if (s) {
        await e.CreateThenShowByActorAsync(t);
      } else {
        await e.CreateByActorAsync(t);
      }
      this.TNo[i] = true;
    }
    return e;
  }
  GetGridProxy(i) {
    if (this.TNo.length < i || !this.TNo[i]) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ScrollViewGrid", 43, "获取Proxy非法，请检查初始动画是否尚未播放完成。displayIndex: " + i);
      }
    } else {
      var t = this.INo[i];
      if (t) {
        return t;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ScrollViewGrid", 43, "无法获取Proxy", ["DisplayIndex", i]);
      }
    }
  }
  ClearGridProxy(i, t) {
    t = this.GetGridProxy(t);
    if (t) {
      t.Clear();
    }
  }
  SelectGridProxy(i, t, s) {
    if (this.RNo !== i) {
      this.DeselectCurrentGridProxy(s);
      if (t = this.GetGridProxy(t)) {
        t.OnSelected(s);
        this.UNo = t;
      }
      this.RNo = i;
    }
  }
  DeselectCurrentGridProxy(i) {
    this.RNo = -1;
    if (this.UNo) {
      this.UNo.OnDeselected(i);
      this.UNo = undefined;
    }
  }
  ClearSelectInfo() {
    this.RNo = -1;
    this.UNo = undefined;
  }
  GetSelectedProxy() {
    return this.UNo;
  }
  GetSelectedGridIndex() {
    return this.RNo;
  }
  GetDataLength() {
    return this.RKe;
  }
  IsProxyValid(i) {
    return i < this.TNo.length && this.TNo[i];
  }
  ClearData() {
    if (this.Pe.length > 0) {
      this.Pe.length = 0;
    }
    this.RKe = 0;
  }
  Destroy() {
    this.ClearData();
    this.INo.forEach(i => {
      i.ScrollViewDelegate = undefined;
    });
    this.INo.length = 0;
    this.TNo.length = 0;
    this.oOi = undefined;
    this.LNo = undefined;
  }
}
exports.ScrollViewDelegate = ScrollViewDelegate;
//# sourceMappingURL=ScrollViewDelegate.js.map