"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSliderControl = exports.SliderItem = undefined;
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
class ListSliderControl {
  constructor(t, i, s, h, e, o, r = 1, a = undefined, n = undefined, d = 0) {
    this.l0i = undefined;
    this._0i = undefined;
    this.eGe = undefined;
    this.u0i = undefined;
    this.c0i = 0;
    this.m0i = new Array();
    this.d0i = new Array();
    this.C0i = 0;
    this.g0i = 0;
    this.f0i = undefined;
    this.zi_ = undefined;
    this.p0i = 0;
    this.v0i = 0;
    this.M0i = 0;
    this.E0i = false;
    this.S0i = 0;
    this.y0i = 0;
    this.IsFinish = false;
    this.wOt = undefined;
    this.r0i = undefined;
    this.s0i = undefined;
    this.I0i = undefined;
    this.T0i = undefined;
    this.hn = 0;
    this.NPt = undefined;
    this.HG1 = [];
    this.l0i = t;
    this.u0i = i;
    this.c0i = this.u0i.GetHeight();
    this.u0i.SetUIActive(false);
    this._0i = this.u0i.GetParentAsUIItem();
    this.E0i = this._0i.IsUIActiveInHierarchy();
    this.eGe = this._0i.GetOwner().GetComponentByClass(UE.UIVerticalLayout.StaticClass());
    if (s === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ItemHint", 8, "ListSliderControl错误, getMaxCount回调不能为undefined");
      }
    } else {
      this.wOt = s;
      this.r0i = h;
      this.s0i = e;
      this.I0i = o;
      this.f0i = r;
      this.zi_ = d;
      this.p0i = 0;
      this.C0i = a ?? ConfigManager_1.ConfigManager.RewardConfig.GetShowTime();
      this.g0i = n ?? ConfigManager_1.ConfigManager.RewardConfig.GetSliderTime();
      this.y0i = s();
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
  Tick(h) {
    this.L0i();
    this.D0i();
    if (this.E0i) {
      if (this.m0i.length <= 0 && !this.r0i()) {
        if (this.IsFinish) {
          return undefined;
        } else {
          this.IsFinish = true;
          this.I0i();
          return;
        }
      }
      this.IsFinish &&= false;
      let t = h;
      if (t > TimerSystem_1.MIN_TIME) {
        t = TimerSystem_1.MIN_TIME;
      }
      let i = 0;
      let s = 0;
      for (const e of this.m0i) {
        this.R0i(e, i);
        this.SliderItemTick(e, t, i);
        i++;
        if (this.f0i !== 0 || e.Status < 3) {
          s++;
        }
      }
      this.U0i(t);
      this.A0i();
      if (!(s > this.y0i)) {
        if (this.S0i !== s) {
          this.S0i = s;
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
            this.v0i += t;
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
        h = this.s0i();
        if (this.v0i >= h && this.hn === 2) {
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
        this.v0i += t;
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
    var t = this.wOt();
    if (t !== this.y0i && (Log_1.Log.CheckInfo() && Log_1.Log.Info("ItemHint", 10, "[ListSliderControl::Tick]最大数量发生变化"), this.y0i = t, this.s0i() === 0)) {
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
      } else if (t.Status === 2 && t.AddShowTime >= this.C0i && (t.Status = 3, t.PlayEnd(), this.f0i === 0)) {
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
      }
      await (i = new this.l0i()).CreateByActorAsync(t.GetOwner());
    }
    this.m0i.push(i);
    return i;
  }
  U0i(t) {
    if (!(this.M0i <= 0) && !(this.M0i -= this.c0i / this.g0i * t, this.M0i > 0)) {
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
}
exports.ListSliderControl = ListSliderControl;
//# sourceMappingURL=ListSliderControl.js.map