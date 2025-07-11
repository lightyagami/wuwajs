"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationScrollbarData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiNavigationViewManager_1 = require("./UiNavigationViewManager");
class NavigationScrollbarData {
  constructor() {
    this.Wwo = [];
    this.Kwo = undefined;
    this.Qwo = undefined;
    this.Xwo = undefined;
  }
  $wo() {
    if (!this.Kwo?.IsListenerActive()) {
      let i = undefined;
      for (const t of this.Wwo) {
        if (t.IsListenerActive()) {
          i = t;
          break;
        }
      }
      this.Ywo(i);
    }
  }
  Ywo(i) {
    if (this.Kwo) {
      this.Kwo.IsFocusScrollbar = false;
    }
    if (i) {
      i.IsFocusScrollbar = true;
    }
    this.Xwo = this.Kwo;
    this.Kwo = i;
    this.Qwo = i?.GetBehaviorComponent();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiNavigation", 10, "设置当前的滚动区域对象", ["名字", i?.RootUIComp.displayName]);
    }
  }
  AddScrollbar(r) {
    this.Wwo = [];
    for (let i = 0, t = r.length; i < t; ++i) {
      var s = r[i].ListenerList;
      for (let i = 0, t = s.length; i < t; ++i) {
        var e = s[i];
        this.Wwo.push(e);
      }
    }
    this.Wwo.sort((i, t) => i.ScrollbarIndex - t.ScrollbarIndex);
    this.$wo();
  }
  DeleteScrollbar(i) {
    var r = i.ListenerList;
    if (r) {
      for (let i = 0, t = r.length; i < t; ++i) {
        var s = r[i];
        var e = this.Wwo.indexOf(s);
        this.Wwo.splice(e, 1);
        if (this.Kwo === s) {
          this.Ywo(undefined);
        }
      }
      this.$wo();
    }
  }
  ResumeLastListener() {
    if (this.Xwo?.IsValid() && this.Xwo.IsListenerActive()) {
      this.Ywo(this.Xwo);
    } else {
      this.$wo();
    }
  }
  GetCurrentListener() {
    return this.Kwo;
  }
  GetCurrentScrollbar() {
    return this.Qwo;
  }
  HasActiveScrollbarList() {
    return this.Wwo.filter(i => i.IsListenerActive()).length > 1;
  }
  FindNextScrollbar() {
    if (this.Kwo) {
      var t = this.Wwo.length;
      if (t === 1) {
        this.Ywo(undefined);
        return;
      }
      var r = this.Wwo.indexOf(this.Kwo);
      let i = r + 1 < t ? r + 1 : 0;
      while (r !== i) {
        if (this.Wwo[i].IsListenerActive()) {
          this.Ywo(this.Wwo[i]);
          break;
        }
        i = i + 1 < t ? i + 1 : 0;
      }
    } else {
      this.$wo();
    }
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
  }
  FindPrevScrollbar() {
    if (this.Kwo) {
      var t = this.Wwo.length;
      if (t === 1) {
        return;
      }
      var r = this.Wwo.indexOf(this.Kwo);
      let i = r - 1 >= 0 ? r - 1 : t - 1;
      while (r !== i) {
        if (this.Wwo[i].IsListenerActive()) {
          this.Ywo(this.Wwo[i]);
          break;
        }
        i = i - 1 >= 0 ? i - 1 : t - 1;
      }
    } else {
      this.$wo();
    }
    UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
  }
  TryFindScrollbar() {
    this.$wo();
  }
}
exports.NavigationScrollbarData = NavigationScrollbarData;
//# sourceMappingURL=NavigationScrollbarData.js.map