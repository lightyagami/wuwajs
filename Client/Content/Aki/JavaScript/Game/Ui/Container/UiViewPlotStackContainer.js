"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiViewPlotContainer = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiViewPending_1 = require("../Base/UiViewPending");
const UiManager_1 = require("../UiManager");
const UiModel_1 = require("../UiModel");
const UiViewContainer_1 = require("./UiViewContainer");
class UiViewPlotContainer extends UiViewContainer_1.UiViewContainer {
  constructor(e) {
    super();
    this.v9 = undefined;
    this.QRl = undefined;
    this.pjt = false;
    this.Ocr = new Array();
    this.v9 = e;
  }
  Hcr(e) {
    this.v9.Push(e);
  }
  jcr() {
    var e = this.v9.Pop();
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PlotContainer", 10, "PlotContainer_PopView 出栈失败");
    }
  }
  Mcr(e) {
    var i = this.v9.Delete(e);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PlotContainer", 10, "PlotContainer_DeleteView删除界面不在栈内", ["ViewName", e.Info.Name]);
      }
    }
    return i;
  }
  get Rjt() {
    return this.pjt;
  }
  Ujt() {
    this.pjt = true;
    this.QRl = new CustomPromise_1.CustomPromise();
  }
  Jft(e = true) {
    this.pjt = false;
    this.QRl?.SetResult(undefined);
    this.QRl = undefined;
    if (e) {
      this.Vcr();
    }
  }
  Wcr(e, i) {
    var t = new UiViewPending_1.UiViewPending(e, i);
    if (this.Ocr.length > 0) {
      var o = this.Ocr[this.Ocr.length - 1];
      if (o.Equal(t)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("PlotContainer", 10, "界面缓存操做重复", ["ViewName", e.Info.Name]);
        }
        t.ExecutePromise?.SetResult(true);
        return t;
      }
      if (o.IsPairWith(t)) {
        this.Ocr.pop();
        UiManager_1.UiManager.RemoveView(e.GetViewId());
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("PlotContainer", 10, "界面缓存操作成对, 自动移除上一个", ["ViewName", e.Info.Name]);
        }
        t.ExecutePromise?.SetResult(true);
        return t;
      }
    }
    this.Ocr.push(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PlotContainer", 10, "缓存界面操作", ["界面", e.Info.Name], ["操作类型", i]);
    }
    return t;
  }
  async Vcr() {
    if (this.Ocr.length) {
      var e = this.Ocr.shift();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PlotContainer", 10, "[ProcessViewPending]执行已缓存的界面操作", ["界面", e.View.Info.Name], ["操作类型", e.PendingType]);
      }
      switch (e.PendingType) {
        case 1:
          await this.OpenViewAsync(e.View);
          break;
        case 2:
          await this.CloseViewAsync(e.View);
          break;
        case 3:
          this.Ujt();
          await this.gpi(e.View, undefined);
          this.Jft();
      }
      e.ExecutePromise?.SetResult(true);
    }
  }
  async Qcr(e, i) {
    var t = async () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PlotContainer", 10, "OpenViewImplement 界面打开开始", ["ViewName", e.Info?.Name], ["path", e.Info.UiPath]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenView, e.Info.Name, e.GetViewId());
      if (await e.CreateAsync()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PlotContainer", 10, "OpenViewImplement 界面Start", ["ViewName", e.Info?.Name]);
        }
        await e.StartAsync();
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("PlotContainer", 10, "[OpenStackViewAsync] CreateAsync failed", ["ViewName", e.Info.Name]);
      }
    };
    if (i) {
      await t();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PlotContainer", 10, "OpenViewImplement 界面Show,上个界面Hide", ["ViewName", e.Info?.Name], ["LastViewName", i?.Info?.Name]);
      }
      await Promise.all([i?.HideAsync(), e.ShowAsync()]);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PlotContainer", 10, "OpenViewImplement 界面Show,栈容器界面Hide", ["ViewName", e.Info?.Name]);
      }
      await UiManager_1.UiManager.PauseNormalContainer(t, async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PlotContainer", 10, "OpenViewImplement 界面Show", ["ViewName", e.Info?.Name]);
        }
        await e.ShowAsync();
      });
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PlotContainer", 10, "界面打开完成", ["path", e.Info.UiPath]);
    }
  }
  async gpi(i, e) {
    var t = this.Ocr.findIndex(e => e.View === i && e.PendingType === 1);
    if (t >= 0) {
      this.Ocr.splice(t, 1);
    }
    if (e !== undefined) {
      const o = async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PlotContainer", 10, "CloseViewImplement 界面Destroy", ["ViewName", i.Info?.Name]);
        }
        await i.DestroyAsync();
      };
      const a = async () => {
        if (i.IsShowOrShowing) {
          i.LastHide = true;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PlotContainer", 10, "CloseViewImplement 界面Hide", ["ViewName", i.Info?.Name]);
          }
          await i.HideAsync();
        }
      };
      await Promise.all([(async () => {
        await a();
        await o();
      })(), (async () => {
        if (!e.IsShowOrShowing) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PlotContainer", 10, "CloseViewImplement 下个界面Show", ["NextViewName", e.Info?.Name]);
          }
          await e.ShowAsync();
        }
      })()]);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PlotContainer", 10, "CloseViewImplement 界面关闭完成", ["ViewName", i.Info?.Name], ["path", i.Info.UiPath], ["NextViewName", e.Info?.Name]);
      }
    } else {
      const n = async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PlotContainer", 10, "CloseViewImplement 界面Destroy", ["ViewName", i.Info?.Name]);
        }
        await i.DestroyAsync();
      };
      const s = async () => {
        if (i.IsShowOrShowing) {
          i.LastHide = true;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("PlotContainer", 10, "CloseViewImplement 界面Hide", ["ViewName", i.Info?.Name]);
          }
          await i.HideAsync();
        }
      };
      t = async () => {
        await s();
        await n();
      };
      if (this.v9.Empty) {
        await UiManager_1.UiManager.ResumeNormalContainer(t);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PlotContainer", 10, "CloseViewImplement 界面关闭完成,栈容器界面Show", ["ViewName", i.Info?.Name], ["path", i.Info.UiPath]);
        }
      } else {
        await t();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PlotContainer", 10, "CloseViewImplement 界面关闭完成", ["ViewName", i.Info?.Name], ["path", i.Info.UiPath]);
        }
      }
    }
  }
  async OpenViewAsync(e) {
    var i;
    if (this.Rjt) {
      this.Wcr(e, 1);
    } else {
      i = this.v9.Peek();
      this.Ujt();
      this.OpenViewMask.SetMask(e.MaskTag, true);
      this.Hcr(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PlotContainer", 10, "OpenViewAsync 入栈", ["ViewName", e.Info.Name]);
      }
      await this.Qcr(e, i);
      this.OpenViewMask.SetMask(e.MaskTag, false);
      this.Jft();
    }
  }
  async PreOpenViewAsync(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 10, "此类型容器不支持预打开界面", ["name", e.Info.Name], ["type", e.Info.Type]);
    }
    return Promise.resolve();
  }
  async OpenViewAfterPreOpenedAsync(e) {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 10, "此类型容器不支持预打开界面", ["name", e.Info.Name], ["type", e.Info.Type]);
    }
    return Promise.reject(TypeError("此类型容器不支持预打开界面"));
  }
  async CloseViewAsync(e) {
    if (this.Rjt) {
      this.Wcr(e, 2);
    } else {
      this.Ujt();
      if (this.v9.Peek() === e) {
        this.jcr();
        await this.gpi(e, this.v9.Peek());
      } else if (this.Mcr(e)) {
        await this.gpi(e, undefined);
      }
      this.Jft();
    }
  }
  ClearContainer(e) {
    var i = [];
    for (let e = this.Ocr.length - 1; e >= 0; --e) {
      var t = this.Ocr[e].View;
      t.IsExistInLeaveLevel = true;
      if (!t.Info.IsPermanent) {
        t.OpenPromise?.SetResult(false);
        UiManager_1.UiManager.RemoveView(t.GetViewId());
        this.Ocr.pop();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PlotContainer", 10, "[Clear] 清理缓存的界面数据", ["Name", t.constructor.name], ["ComponentId", t.ComponentId]);
        }
      }
    }
    i.length = 0;
    for (const o of this.v9) {
      o.IsExistInLeaveLevel = true;
      if (!o.Info.IsPermanent && (!e || !UiModel_1.UiModel.SeamlessStackWhileList.has(o.Info.Name))) {
        this.TryCatchViewDestroyCompatible(o);
        i.push(o);
      }
    }
    for (const a of i) {
      this.Mcr(a);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PlotContainer", 10, "ClearContainer 清栈");
    }
  }
}
exports.UiViewPlotContainer = UiViewPlotContainer;
//# sourceMappingURL=UiViewPlotStackContainer.js.map