"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiViewContainer = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const UiConfig_1 = require("../Define/UiConfig");
const UiLayerType_1 = require("../Define/UiLayerType");
const UiPopViewData_1 = require("../Define/UiPopViewData");
const UiMask_1 = require("../UiMask");
const UiModel_1 = require("../UiModel");
class UiViewContainer {
  constructor() {
    this.OpenViewMask = new UiMask_1.UiMask();
  }
  async OpenViewImplementAsync(i) {
    if (!this.IsIgnoreOpenViewMask(i)) {
      this.OpenViewMask.SetMask(i.MaskTag, true);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiViewContainer", 16, "OpenViewImplement 界面打开开始", ["ViewName", i.Info?.Name], ["path", i.Info.UiPath]);
    }
    this.OnContainerOpenView(i);
    if (await i.CreateAsync()) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenView, i.Info.Name, i.GetViewId());
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiViewContainer", 16, "OpenViewImplement 界面Start", ["ViewName", i.Info?.Name]);
      }
      await i.StartAsync();
      let e = true;
      if (i.ClosePromise || i.IsDestroy) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiViewContainer", 37, "[OpenViewImplement] 界面打开中断显示,界面已开始关闭流程", ["ViewName", i.Info.Name], ["Id", i.GetViewId()]);
        }
        e = false;
      } else if (i.Parent && i.Parent.GetClosePromiseImplement()) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiViewContainer", 37, "[OpenViewImplement] 界面打开中断显示,父界面已开始关闭流程", ["ViewName", i.Info.Name], ["Id", i.GetViewId()]);
        }
        e = false;
      }
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiViewContainer", 16, "OpenViewImplement 界面Show", ["ViewName", i.Info?.Name]);
        }
        await i.ShowAsync();
      }
      if (!this.IsIgnoreOpenViewMask(i)) {
        this.OpenViewMask.SetMask(i.MaskTag, false);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiViewContainer", 16, "OpenViewImplement 界面打开完成", ["ViewName", i.Info?.Name], ["path", i.Info.UiPath]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiViewContainer", 16, "[OpenViewImplement] CreateAsync failed", ["ViewName", i.Info.Name]);
    }
  }
  async CloseViewImplementAsync(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiViewContainer", 16, "CloseViewImplement 界面关闭开始", ["ViewName", e.Info?.Name], ["path", e.Info.UiPath]);
    }
    if (e.IsShowOrShowing) {
      e.LastHide = true;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiViewContainer", 16, "CloseViewImplement 界面Hide", ["ViewName", e.Info?.Name]);
      }
      await e.HideAsync();
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiViewContainer", 16, "CloseViewImplement 界面Destroy", ["ViewName", e.Info?.Name]);
    }
    await e.DestroyAsync();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiViewContainer", 16, "CloseViewImplement 界面关闭完成", ["ViewName", e.Info?.Name], ["path", e.Info.UiPath]);
    }
    return true;
  }
  IsIgnoreOpenViewMask(e) {
    return (UiConfig_1.UiConfig.TryGetViewInfo(e.Info.Name).Type & UiLayerType_1.IGNORE_MASK_TYPE) != 0;
  }
  OnContainerOpenView(e) {
    var i = e.OpenParam;
    if (i instanceof UiPopViewData_1.UiPopViewData) {
      if (!i.NotAddChildToTopStackView) {
        if (i = UiModel_1.UiModel.NormalStack.Peek()) {
          i.AddChild(e);
        }
      }
    }
  }
  TryCatchViewDestroyCompatible(e) {
    try {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiViewContainer", 10, "[Clear] 尝试执行销毁的界面", ["Name", e.constructor.name], ["ComponentId", e.ComponentId]);
      }
      e.ClearAsync();
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("UiViewContainer", 10, "界面同步关闭异常,业务变量可能未初始化完成,需要关注", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiViewContainer", 10, "界面同步关闭异常,业务变量可能未初始化完成,需要关注", ["error", e]);
      }
    }
  }
  async BeforeClearContainerAsync(e) {}
}
exports.UiViewContainer = UiViewContainer;
//# sourceMappingURL=UiViewContainer.js.map