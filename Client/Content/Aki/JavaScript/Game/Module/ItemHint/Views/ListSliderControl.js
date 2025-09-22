"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSliderControl = exports.LIST_SLIDER_ITEM_SHOW_TIME = exports.LIST_SLIDER_ITEM_SLIDER_TIME = exports.LIST_SLIDER_ITEM_ADD_TIME = exports.LIST_SLIDER_MAX_SHOW_COUNT = exports.SliderItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiActorPool_1 = require("../../../Ui/UiActorPool");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LOAD_LIMIT_TIME = 2000;
class SliderItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.AddShowTimeInternal = 0;
    this.h0i = 0;
    this.FinishPlayStart = () => {
      this.h0i = 2;
      this.PlayHalfway();
    };
    this.FinishPlayHalfway = () => {};
    this.FinishPlayEnd = () => {
      this.h0i = 4;
    };
  }
  get AddShowTime() {
    return this.AddShowTimeInternal;
  }
  set AddShowTime(t) {
    this.AddShowTimeInternal = t;
  }
  get Status() {
    return this.h0i;
  }
  set Status(t) {
    this.h0i = t;
  }
  async AsyncLoadUiResource() {}
  InitData() {}
  Play() {
    this.h0i = 1;
    this.AddShowTime = 0;
    this.PlayStart();
  }
  PlayStart() {}
  PlayHalfway() {}
  PlayEnd() {}
  Tick(t) {
    this.OnTick(t);
  }
  ActiveStatusChange(t) {
    this.OnActiveStatusChange(t);
  }
  OnActiveStatusChange(t) {}
  OnTick(t) {}
  ShowTimeIsEnough(t) {
    return this.AddShowTime >= t;
  }
}
exports.SliderItem = SliderItem;
exports.LIST_SLIDER_MAX_SHOW_COUNT = 8;
exports.LIST_SLIDER_ITEM_ADD_TIME = 100;
exports.LIST_SLIDER_ITEM_SLIDER_TIME = 100;
exports.LIST_SLIDER_ITEM_SHOW_TIME = 2000;
class ListSliderControl {
  constructor(t) {
    this.Pe = undefined;
    this._0i = undefined;
    this.eGe = undefined;
    this.u0i = undefined;
    this.c0i = 0;
    this.M0i = 0;
    this.p0i = 0;
    this.E0i = false;
    this.IsFinish = false;
    this.hn = 0;
    this.S0i = 0;
    this.y0i = 0;
    this.v0i = 0;
    this.f0i = undefined;
    this.zi_ = undefined;
    this.T0i = undefined;
    this.NPt = undefined;
    this.m0i = new Array();
    this.d0i = new Array();
    this.HG1 = [];
    if (this.Pe = t) {
      this._0i = t.ParentUi;
      if (t.ChildResourceId) {
        this.NPt = t.ChildResourceId;
      } else if (t.ChildTemplate) {
        this.u0i = t.ChildTemplate;
      } else {
        this.u0i = t.ParentUi.GetAttachUIChild(0);
      }
      if (this.u0i) {
        this.u0i?.SetUIActive(false);
        this.c0i = this.u0i.GetHeight();
      }
      this.E0i = t.ParentUi.IsUIActiveInHierarchy();
      this.eGe = t.ParentUi.GetOwner().GetComponentByClass(UE.UIVerticalLayout.StaticClass());
      this.f0i = t.SliderMode ?? 1;
      this.zi_ = t.TickMode ?? 0;
      this.y0i = t.MaxShowCount ?? exports.LIST_SLIDER_MAX_SHOW_COUNT;
      this.p0i = 0;
    }
  }
  SetDynamicLoadResourceId(t) {
    this.NPt = t;
  }
  DisEnableParentLayout() {
    if (this._0i) {
      if (this.eGe) {
        this.eGe.SetEnable(false);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ItemHint", 8, "ListSliderControl错误, 父节点不包含UIVerticalLayout组件");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ItemHint", 8, "ListSliderControl错误, ParentUiItem为undefined");
    }
  }
  Tick(t) {
    this.L0i();
    this.D0i();
    if (this.E0i) {
      if (this.m0i.length <= 0 && !this.r0i()) {
        if (this.IsFinish) {
          return undefined;
        } else {
          this.IsFinish = true;
          this.Pe?.FinishCallback?.();
          return;
        }
      }
      this.IsFinish &&= false;
      let s = t;
      if (s > TimerSystem_1.MIN_TIME) {
        s = TimerSystem_1.MIN_TIME;
      }
      let h = 0;
      this.m0i.forEach((t, i) => {
        this.R0i(t, i);
        this.SliderItemTick(t, s, i);
        if (this.f0i !== 0 || t.Status < 3) {
          h++;
        }
      });
      this.U0i(s);
      this.A0i();
      if (!(h > this.y0i)) {
        if (this.S0i !== h) {
          this.S0i = h;
          this.P0i();
        }
        if (this.hn === 1 && this.v0i > LOAD_LIMIT_TIME) {
          this.T0i.Status = 5;
          this.T0i = undefined;
          this.hn = 0;
          this.v0i = 0;
        }
        if (!this.r0i()) {
          if (this.hn === 1) {
            this.v0i += s;
            return;
          } else {
            if (this.hn === 2) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("ItemHint", 10, "[ListSliderControl::Tick]检查不到下个对象,执行缓存对象逻辑,到None");
              }
              this.T0i.SetActive(true);
              this.T0i.Play();
              this.T0i = undefined;
              this.hn = 0;
              this.v0i = 0;
            }
            return;
          }
        }
        t = this.XSd();
        if (this.v0i >= t && this.hn === 2) {
          if (this.T0i) {
            this.T0i.SetActive(true);
            this.T0i.Play();
            this.T0i = undefined;
          }
          this.v0i = 0;
          this.hn = 0;
        }
        if (this.hn === 0) {
          this.hn = 1;
          this.x0i().then(t => {
            this.T0i = t;
            this.T0i.AsyncLoadUiResource().then(() => {
              if (this.T0i) {
                this.T0i.InitData();
                this.T0i.SetActive(false);
                this.hn = 2;
              }
            }, () => {
              this.T0i.Status = 5;
              this.T0i = undefined;
              this.hn = 0;
              this.v0i = 0;
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("ItemHint", 10, "[ListSliderControl::Tick]异步加载格子失败,到None");
              }
            });
          });
        }
        this.v0i += s;
      }
    }
  }
  L0i() {
    var t = this._0i.IsUIActiveInHierarchy();
    if (t !== this.E0i) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ItemHint", 8, "滑动状态变化", ["activeStatus", t]);
      }
      this.E0i = t;
      for (const i of this.m0i) {
        i.ActiveStatusChange(t);
      }
    }
  }
  D0i() {
    var t = this.YSd();
    if (t !== this.y0i && (Log_1.Log.CheckInfo() && Log_1.Log.Info("ItemHint", 10, "[ListSliderControl::Tick]最大数量发生变化"), this.y0i = t, this.XSd() === 0)) {
      for (const i of this.m0i) {
        i.AddShowTime = 0;
      }
    }
  }
  R0i(t, i) {
    t = t.GetRootItem();
    i = -this.M0i - this.eGe.Padding.Top - this.c0i * 0.5 - (i + this.p0i) * (this.c0i + this.eGe.Spacing);
    t.SetAnchorOffsetY(i);
  }
  SliderItemTick(t, i, s) {
    t.Tick(i);
    if ((this.zi_ !== 1 || s === 0) && !(t.Status === 2 && (t.AddShowTime += i), this.f0i !== 0 && s !== 0)) {
      if (t.Status === 4) {
        t.Status = 5;
      } else if (t.Status === 2 && t.AddShowTime >= this.C_d() && (t.Status = 3, t.PlayEnd(), this.f0i === 0)) {
        this.p0i--;
        this.w0i();
      }
    }
  }
  async x0i() {
    let i = undefined;
    if (this.d0i.length > 0) {
      i = this.d0i.shift();
    } else {
      let t = undefined;
      var s;
      if (this.NPt === undefined) {
        t = LguiUtil_1.LguiUtil.CopyItem(this.u0i, this._0i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ItemHint", 10, "测试代码,拷贝Item", ["length", this.m0i.length + 1]);
        }
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("ItemHint", 10, "测试代码,池子拿Item", ["length", this.m0i.length + 1], ["ResourceId", this.NPt]);
        }
        s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.NPt);
        (s = await UiActorPool_1.UiActorPool.GetAsync(s, this._0i)).UiItem.SetAnchorHAlign(1);
        s.UiItem.SetAnchorVAlign(1);
        s.UiItem.SetUIActive(false);
        this.HG1.push(s);
        t = s.UiItem;
        if (this.c0i === 0) {
          this.c0i = t.GetHeight();
        }
      }
      await (i = this.d_d()).CreateByActorAsync(t.GetOwner());
    }
    this.m0i.push(i);
    return i;
  }
  U0i(t) {
    if (!(this.M0i <= 0) && !(this.M0i -= this.c0i / this.g_d() * t, this.M0i > 0)) {
      this.M0i = 0;
    }
  }
  A0i() {
    for (var t = this.m0i; !(t.length <= 0);) {
      var i = t[0];
      if (i.Status !== 5) {
        return;
      }
      i.Status = 0;
      t.shift();
      i.SetActive(false);
      this.d0i.push(i);
      if (this.f0i === 1) {
        this.w0i();
      } else if (this.f0i === 0) {
        this.p0i++;
      }
    }
  }
  w0i() {
    this.M0i += this.c0i + this.eGe.Spacing;
  }
  DestroyMe() {
    if (this.eGe) {
      this.eGe.SetEnable(true);
    }
    for (const t of this.HG1) {
      UiActorPool_1.UiActorPool.RecycleAsync(t, t.Path);
    }
    this.d0i = undefined;
  }
  P0i() {
    this._0i.SetHeight(this.S0i * this.c0i);
  }
  d_d() {
    return this.Pe.CreateProxyFunction();
  }
  r0i() {
    return this.Pe.CheckNext();
  }
  YSd() {
    return this.Pe?.MaxShowCount ?? exports.LIST_SLIDER_MAX_SHOW_COUNT;
  }
  XSd() {
    return this.Pe?.AddItemTime ?? exports.LIST_SLIDER_ITEM_ADD_TIME;
  }
  g_d() {
    return this.Pe?.ItemSliderTime ?? exports.LIST_SLIDER_ITEM_SLIDER_TIME;
  }
  C_d() {
    return this.Pe?.ItemShowTime ?? exports.LIST_SLIDER_ITEM_SHOW_TIME;
  }
}
exports.ListSliderControl = ListSliderControl;
//# sourceMappingURL=ListSliderControl.js.map