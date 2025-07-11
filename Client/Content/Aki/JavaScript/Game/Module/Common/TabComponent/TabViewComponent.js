"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabViewComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiTabViewStorage_1 = require("../../../Ui/UiTabViewStorage");
class TabViewComponent {
  constructor(i, e = 0) {
    this.Hbt = i;
    this.Cq1 = 0;
    this.pq1 = undefined;
    this.y9 = undefined;
    this.jbt = new Map();
    this.Wbt = (i, e) => {
      var t = this.pq1 ?? this.y9;
      if (e.DynamicTabName === t && (e = this.jbt.get(t))) {
        i.ViewData.SetAttachedView(e);
      }
    };
    this.Cq1 = e;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this.Wbt);
  }
  Kbt(i, e) {
    i?.RegisterViewModule?.(e);
  }
  Qbt() {
    for (const i of this.jbt.values()) {
      i.Destroy();
    }
    this.jbt.clear();
  }
  HideCurrentTabView() {
    var i = this.jbt.get(this.pq1);
    if (i) {
      if (i.IsCreateOrCreating || i.IsStarting) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiTabModule", 10, "异步加载中,不执行页签隐藏", ["TabViewName", this.pq1]);
        }
      } else {
        i.HideUiTabView(true);
        this.pq1 = undefined;
      }
    }
  }
  ToggleCallBack(i, e, t = undefined, o = undefined, s = undefined) {
    const r = this.vq1(e, s);
    if (this.pq1 !== undefined) {
      this.HideCurrentTabView();
    }
    this.pq1 = r;
    let h = this.jbt.get(r);
    if (h) {
      h.SetParams(i);
      h.SetExtraParams(o);
    } else {
      s = UiTabViewStorage_1.UiTabViewStorage.GetUiTabViewBase(e);
      (h = new s.CreateUiTabView()).SetTabViewName(e);
      h.SetParams(i);
      h.SetExtraParams(o);
      this.Kbt(t, h);
      this.jbt.set(r, h);
      h.CreateByResourceIdAsync(s.ResourceId, this.Hbt).then(() => {
        if (this.pq1 === r) {
          h?.ShowUiTabViewFromToggle();
        } else {
          h?.HideUiTabView(true);
        }
      });
    }
    if (!h.IsCreateOrCreating && !h.IsStarting) {
      h.ShowUiTabViewFromToggle();
    }
  }
  vq1(i, e = undefined) {
    if (this.Cq1 === 1 && e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiTabModule", 27, "索引模式下必须传入索引");
      }
      return "";
    } else if (this.Cq1 === 1) {
      return StringUtils_1.StringUtils.Format("{0}_{1}", i, e.toString());
    } else {
      return i;
    }
  }
  GetCurrentTabViewName(i = undefined) {
    var e;
    if (this.Cq1 !== 1 || i !== undefined) {
      if (this.Cq1 === 1) {
        if ((e = this.pq1?.split("_"))?.length !== 2) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiTabModule", 27, "索引模式下Key不符合规范");
          }
          return;
        } else if (e[1] !== i?.toString()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("UiTabModule", 27, "索引模式下Key索引不一致");
          }
          return;
        } else {
          return e[0];
        }
      } else {
        return this.pq1;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiTabModule", 27, "索引模式下必须传入索引");
    }
  }
  GetCurrentTabView() {
    return this.jbt.get(this.pq1);
  }
  GetTabViewByTabKey(i, e = undefined) {
    return this.jbt.get(this.vq1(i, e));
  }
  SetCurrentTabViewState(i) {
    var e;
    if (this.pq1 && (e = this.jbt.get(this.pq1))) {
      if (i && e.IsHideOrHiding) {
        e.ShowUiTabViewFromView();
      } else if (!i && !e.IsHideOrHiding) {
        e.HideUiTabView(false);
      }
    }
  }
  DestroyTabViewComponent() {
    this.Qbt();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideFocusNeedUiTabView, this.Wbt);
  }
}
exports.TabViewComponent = TabViewComponent;
//# sourceMappingURL=TabViewComponent.js.map