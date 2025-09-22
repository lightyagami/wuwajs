"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiViewStackContainer = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const DoublyList_1 = require("../../../Core/Container/DoublyList");
const Stack_1 = require("../../../Core/Container/Stack");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const BlackScreenController_1 = require("../../Module/BlackScreen/BlackScreenController");
const UiCameraAnimationController_1 = require("../../Module/UiCameraAnimation/UiCameraAnimationController");
const UiViewPending_1 = require("../Base/UiViewPending");
const UiManager_1 = require("../UiManager");
const UiModel_1 = require("../UiModel");
const UiViewContainer_1 = require("./UiViewContainer");
class UiViewStackContainer extends UiViewContainer_1.UiViewContainer {
  constructor(e) {
    super();
    this.v9 = undefined;
    this.Ncr = new Map();
    this.pjt = false;
    this.tza = undefined;
    this.QRl = undefined;
    this.Ocr = new Array();
    this.kcr = new DoublyList_1.default(undefined);
    this.Fcr = new Map();
    this.v9 = e;
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
  Hcr(e) {
    this.v9.Push(e);
    var i = e.Info.Name;
    let t = this.Ncr.get(i);
    if (!t) {
      t = new Set();
      this.Ncr.set(i, t);
    }
    t.add(e);
  }
  jcr() {
    var e;
    var i;
    var t = this.v9.Pop();
    if (t !== undefined) {
      e = t.Info.Name;
      if ((i = this.Ncr.get(e)) && (i.delete(t), i.size <= 0)) {
        this.Ncr.delete(e);
      }
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiCore", 16, "StackContainer_PopView 出栈失败");
    }
  }
  Mcr(e) {
    var i = e.Info.Name;
    var t = this.Ncr.get(i);
    if (t && (t.delete(e), t.size <= 0)) {
      this.Ncr.delete(i);
    }
    var t = this.v9.Delete(e);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiCore", 16, "StackContainer_DeleteView删除界面不在栈内", ["ViewName", e.Info.Name]);
      }
    }
    return t;
  }
  async Vcr() {
    if (this.Ocr.length) {
      var e = this.Ocr.shift();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "[ProcessViewPending]执行已缓存的界面操作", ["界面", e.View.Info.Name], ["操作类型", e.PendingType]);
      }
      switch (e.PendingType) {
        case 0:
          await this.OpenViewAfterPreOpenedAsync(e.View);
          break;
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
          break;
        case 4:
          await this.ResetToViewAsync(e.View);
          break;
        case 6:
          await this.CloseAndOpenNewAsync(e.View, e.NextView);
      }
      e.ExecutePromise?.SetResult(true);
    }
  }
  async OpenViewAsync(e) {
    if (this.Rjt) {
      this.Wcr(e, 1);
    } else {
      var i = this.v9.Peek();
      if (e.IsQueueView) {
        if (i?.IsQueueView) {
          this.Kcr(e);
          this.Vcr();
          return;
        }
        if (UiModel_1.UiModel.InNormalQueue) {
          this.Kcr(e);
          this.Vcr();
          return;
        }
      }
      this.Ujt();
      if (!this.IsIgnoreOpenViewMask(e)) {
        this.OpenViewMask.SetMask(e.MaskTag, true);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StackPreOpenView, e.Info.Name);
      this.Hcr(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "OpenViewAsync 入栈", ["ViewName", e.Info.Name]);
      }
      await this.Qcr(e, i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StackOpenView, e.GetViewId(), i?.Info);
      if (!this.IsIgnoreOpenViewMask(e)) {
        this.OpenViewMask.SetMask(e.MaskTag, false);
      }
      this.Jft();
    }
  }
  async PreOpenViewAsync(e) {
    if (!(await e.CreateAsync())) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("UiCore", 16, "[PreOpenViewAsync] CreateAsync failed", ["ViewName", e.Info.Name]);
      }
    }
  }
  async OpenViewAfterPreOpenedAsync(e) {
    if (this.Rjt) {
      this.Wcr(e, 0);
    } else {
      var i = this.v9.Peek();
      if (e.IsQueueView) {
        if (i?.IsQueueView) {
          this.Kcr(e);
          return;
        }
        if (UiModel_1.UiModel.InNormalQueue) {
          this.Kcr(e);
          return;
        }
      }
      this.Ujt();
      if (!this.IsIgnoreOpenViewMask(e)) {
        this.OpenViewMask.SetMask(e.MaskTag, true);
      }
      e.OnOpenAfterPreOpened();
      this.Hcr(e);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "OpenViewAfterPreOpenedAsync 入栈", ["ViewName", e.Info.Name]);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenView, e.Info.Name, e.GetViewId());
      await e.StartAsync();
      i?.Hide();
      await e.ShowAsync();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StackOpenView, e.GetViewId(), i?.Info);
      if (!this.IsIgnoreOpenViewMask(e)) {
        this.OpenViewMask.SetMask(e.MaskTag, false);
      }
      this.Jft();
    }
  }
  async Qcr(e, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 10, "OpenViewImplement 界面打开开始", ["ViewName", e.Info?.Name], ["path", e.Info.UiPath]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenView, e.Info.Name, e.GetViewId());
    var t = i?.Info.ScenePath;
    if (t && e.Info.ScenePath === t) {
      e.SkipLoadScene = true;
      e.SceneLoaded = true;
      i.SkipReleaseScene = true;
    }
    var t = e.WillLoadScene();
    if (t) {
      await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", e.Info.Name);
    }
    var o = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(e.Info.Name);
    if (o.StartBlackScreen && !StringUtils_1.StringUtils.IsBlank(o.StartBlackScreen.ShowAnimName)) {
      await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(o.StartBlackScreen.ShowAnimName, e.Info.Name);
    }
    if (await e.CreateAsync()) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "OpenViewImplement 界面Start", ["ViewName", e.Info?.Name]);
      }
      await e.StartAsync();
      if (o.StartBlackScreen && !StringUtils_1.StringUtils.IsBlank(o.StartBlackScreen.HideAnimName)) {
        BlackScreenController_1.BlackScreenController.RemoveBlackScreen(o.StartBlackScreen.HideAnimName, e.Info.Name);
      }
      if (i?.WillReleaseScene() || t) {
        await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", e.Info.Name);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "OpenViewImplement 上个界面Hide", ["LastViewName", i?.Info?.Name]);
        }
        await i.HideAsync();
        BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", e.Info.Name);
        this.LDc(e, false);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "OpenViewImplement 界面Show", ["ViewName", e.Info?.Name]);
        }
        await e.ShowAsync();
      } else {
        this.LDc(e, true);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "OpenViewImplement 界面Show,上个界面Hide", ["ViewName", e.Info?.Name], ["LastViewName", i?.Info?.Name]);
        }
        await Promise.all([i?.HideAsync(), e.ShowAsync()]);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 10, "界面打开完成", ["path", e.Info.UiPath]);
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("UiCore", 10, "[OpenStackViewAsync] CreateAsync failed", ["ViewName", e.Info.Name]);
    }
  }
  async CloseViewAsync(i) {
    if (this.Rjt) {
      this.Wcr(i, 2);
    } else if (UiModel_1.UiModel.InNormalQueue) {
      this.Ujt();
      const i = this.v9.Peek();
      this.jcr();
      let e = this.v9.Peek();
      if (this.Fcr.size > 0) {
        var t = this.kcr.GetHeadNode().Next;
        e = t.Element;
        this.Hcr(e);
        this.$cr(t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenView, e.Info.Name, e.GetViewId());
        if (!(await e.CreateAsync())) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("UiCore", 10, "[CloseViewAsync] CreateAsync failed", ["ViewName", e.Info.Name]);
          }
          this.Jft();
          return;
        }
        await e.StartAsync();
      }
      await this.gpi(i, e);
      this.Jft();
    } else {
      this.Ujt();
      if (this.v9.Peek() === i) {
        this.jcr();
        await this.gpi(i, this.v9.Peek());
      } else if (this.Mcr(i)) {
        await this.gpi(i, undefined);
      }
      this.Jft();
    }
  }
  async CloseAndOpenNewAsync(e, i) {
    if (this.Rjt) {
      this.Wcr(e, 6, i);
    } else {
      this.Ujt();
      if (e === this.v9.Peek()) {
        this.jcr();
        this.Hcr(i);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "CloseAndOpenNewAsync 入栈", ["ViewName", i.Info.Name]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OpenView, i.Info.Name, i.GetViewId());
        var t = e?.Info.ScenePath;
        if (t && i.Info.ScenePath === t) {
          i.SkipLoadScene = true;
          i.SceneLoaded = true;
          e.SkipReleaseScene = true;
        }
        if (!(await i.CreateAsync())) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("UiCore", 10, "[CloseAndOpenNewAsync] CreateAsync failed", ["ViewName", i.Info.Name]);
          }
          return;
        }
        await i.StartAsync();
        await this.gpi(e, i);
      } else {
        if (this.Mcr(e)) {
          await this.gpi(e, undefined);
        }
        this.Hcr(i);
        await this.Qcr(i, undefined);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "CloseAndOpenNewAsync 入栈", ["ViewName", i.Info.Name]);
        }
      }
      this.Jft();
    }
  }
  async ResetToViewAsync(e) {
    if (this.Rjt) {
      await this.Wcr(e, 4)?.ExecutePromise?.Promise;
    } else {
      var i = new Array();
      for (const a of this.Ocr) {
        if (UiModel_1.UiModel.ResetToViewWhiteSet.has(a.View.Info.Name) || a.PendingType === 5) {
          i.push(a);
        } else {
          if (a.PendingType === 1) {
            a.View.Destroy();
          }
          if (a.PendingType === 6) {
            a.NextView.Destroy();
          }
        }
      }
      this.Ocr = i;
      if (UiModel_1.UiModel.InNormalQueue) {
        this.Wcr(e, 4);
      } else if (!this.v9.Empty) {
        this.Ujt();
        this.tza = new CustomPromise_1.CustomPromise();
        var t = e.Info.Name;
        const s = this.v9.Peek();
        if (s.Info.Name !== t) {
          this.jcr();
          let e = undefined;
          var o = new Stack_1.Stack();
          for (; this.v9.Size > 0 && t !== (e = this.v9.Peek()).Info.Name;) {
            if (UiModel_1.UiModel.ResetToViewWhiteSet.has(e.Info.Name)) {
              o.Push(e);
              this.jcr();
            } else {
              this.jcr();
              await this.gpi(e, undefined);
            }
          }
          while (o.Size > 0) {
            const s = o.Pop();
            this.Hcr(s);
          }
          if ((e = this.v9.Peek()).Info.Name === UiModel_1.UiModel.MainViewName) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetModuleByResetToBattleView);
          }
          await this.gpi(s, e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 16, "重置回到界面成功", ["ViewName", e.Info.Name]);
          }
          if (e.Info.Name === UiModel_1.UiModel.MainViewName) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetModuleAfterResetToBattleView);
          }
        } else {
          e = this.v9.Peek();
          if (e.Info.Name === UiModel_1.UiModel.MainViewName) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetModuleByResetToBattleView);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ResetModuleAfterResetToBattleView);
          }
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 16, "重置回到界面成功", ["ViewName", e.Info.Name]);
          }
        }
        this.tza.SetResult();
        this.tza = undefined;
        this.Jft();
      }
    }
  }
  async gpi(i, e) {
    var t = this.Fcr.get(i);
    if (t) {
      this.$cr(t);
    }
    var t = this.Ocr.findIndex(e => e.View === i && e.PendingType === 1);
    if (t >= 0) {
      this.Ocr.splice(t, 1);
    }
    if (e !== undefined) {
      t = e?.Info.ScenePath;
      if (t && i.Info.ScenePath === t) {
        i.SkipReleaseScene = true;
        e.SkipLoadScene = true;
      }
      const a = ConfigManager_1.ConfigManager.UiViewConfig.GetUiShowConfig(i.Info.Name);
      const s = e?.WillLoadScene();
      const r = i.WillReleaseScene();
      const n = a.CloseBlackScreen && !StringUtils_1.StringUtils.IsBlank(a.CloseBlackScreen.ShowAnimName);
      const _ = async () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面Destroy", ["ViewName", i.Info?.Name]);
        }
        await i.DestroyAsync();
      };
      const h = async () => {
        if (i.IsShowOrShowing) {
          i.LastHide = true;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面Hide", ["ViewName", i.Info?.Name]);
          }
          await i.HideAsync();
        }
      };
      var t = async () => {
        await h();
        await _();
      };
      var o = async () => {
        if (!e.IsShowOrShowing) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("UiCore", 16, "CloseViewImplement 下个界面Show", ["NextViewName", e.Info?.Name]);
          }
          await e.ShowAsync();
        }
      };
      if (s || r || n) {
        await Promise.all([(async () => {
          if (n) {
            await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync(a.CloseBlackScreen.ShowAnimName, i.Info.Name);
          } else if (r) {
            await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", i.Info.Name);
          } else if (s) {
            await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", e.Info.Name);
          }
        })(), t()]);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 16, "#######黑屏+销毁", ["ViewName", i.Info.Name]);
        }
        this.wDc(i, undefined);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 16, "#######镜头Pop", ["ViewName", i.Info.Name]);
        }
        this.LDc(e, false);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 16, "#######镜头Push", ["ViewName", i.Info.Name]);
        }
        if (e && (e.ShowPromise = new CustomPromise_1.CustomPromise(), s && (e.LoadScenePromise = new CustomPromise_1.CustomPromise(), e.SkipRemoveBlackScreen = true), o(), await e?.LoadScenePromise?.Promise, e.SkipRemoveBlackScreen = false, Log_1.Log.CheckDebug() && Log_1.Log.Debug("UiCore", 16, "#######加载场景", ["ViewName", i.Info.Name]), n ? BlackScreenController_1.BlackScreenController.RemoveBlackScreen(a.CloseBlackScreen.HideAnimName, i.Info.Name) : r ? BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", i.Info.Name) : s && BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", e.Info.Name), Log_1.Log.CheckDebug() && Log_1.Log.Debug("UiCore", 16, "#######黑屏移除", ["ViewName", i.Info.Name]), await e.ShowPromise?.Promise, e.ShowPromise = undefined, Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("UiCore", 16, "#######界面显示", ["ViewName", e?.Info.Name]);
        }
      } else {
        this.wDc(i, e?.Info);
        this.LDc(e);
        await Promise.all([t(), o()]);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面关闭完成", ["ViewName", i.Info?.Name], ["path", i.Info.UiPath], ["NextViewName", e.Info?.Name]);
      }
    } else {
      t = this.v9.Size <= 0;
      this.wDc(i, undefined, t);
      if (i.IsShowOrShowing && (i.LastHide = true, await i.HideAsync(), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面Hide", ["ViewName", i.Info?.Name]);
      }
      await i.DestroyAsync();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面Destroy", ["ViewName", i.Info?.Name]);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiCore", 16, "CloseViewImplement 界面关闭完成", ["ViewName", i.Info?.Name], ["path", i.Info.UiPath]);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StackCloseView, i.GetViewId(), i.Info.Name, this.v9.Peek()?.Info);
  }
  async CloseHistoryRingViewAsync(e) {
    if (this.Ycr(e)) {
      var i = new Array();
      let e = 0;
      var t = [];
      for (const o of this.v9) {
        if (e !== 0 && e !== this.v9.Size - 1) {
          t.push(o);
        }
        e++;
      }
      for (const a of t) {
        i.push(this.CloseViewAsync(a));
      }
      await Promise.all(i);
    }
  }
  LDc(e, i = true) {
    if (!this.ExecuteInterfaceMethod(e, "PushCameraHandle", e.Info.Name, e.GetViewId(), i)) {
      UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(e.Info.Name, e.GetViewId(), i);
    }
  }
  wDc(e, i, t = true) {
    if (!this.ExecuteInterfaceMethod(e, "PopCameraHandle", e.Info.Name, i, e.GetViewId(), t)) {
      UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(e.Info.Name, i, e.GetViewId(), t);
    }
  }
  ExecuteInterfaceMethod(e, i, ...t) {
    return i in e && typeof e[i] == "function" && (e[i](...t), true);
  }
  Ycr(e) {
    return this.Ncr.has(e);
  }
  ClearContainer(e) {
    var i = [];
    for (const t of this.v9) {
      t.IsExistInLeaveLevel = true;
      if (!t.Info.IsPermanent && (!e || !UiModel_1.UiModel.SeamlessStackWhileList.has(t.Info.Name))) {
        this.TryCatchViewDestroyCompatible(t);
        i.push(t);
      }
    }
    for (const o of i) {
      this.Mcr(o);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "ClearContainer 清栈");
    }
  }
  async BeforeClearContainerAsync(e) {
    var i = [];
    for (const a of this.Fcr.values()) {
      var t = a.Element;
      t.IsExistInLeaveLevel = true;
      if (!t.Info.IsPermanent && (!e || !UiModel_1.UiModel.SeamlessStackWhileList.has(t.Info.Name))) {
        this.TryCatchViewDestroyCompatible(t);
        this.kcr.Remove(a);
        i.push(t);
      }
    }
    for (const s of i) {
      this.Fcr.delete(s);
      UiManager_1.UiManager.RemoveView(s.GetViewId());
    }
    for (let e = this.Ocr.length - 1; e >= 0; --e) {
      var o = this.Ocr[e].View;
      o.IsExistInLeaveLevel = true;
      if (!o.Info.IsPermanent) {
        o.OpenPromise?.SetResult(false);
        UiManager_1.UiManager.RemoveView(o.GetViewId());
        this.Ocr.pop();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "[Clear] 清理缓存的界面数据", ["Name", o.constructor.name], ["ComponentId", o.ComponentId]);
        }
      }
    }
    if (this.tza) {
      await this.tza.Promise;
    }
    if (this.QRl) {
      await this.QRl.Promise;
    }
  }
  async HideViewByPlot() {
    var e = this.v9.Peek();
    if (e) {
      this.Ujt();
      if (e.WillReleaseScene()) {
        await BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("Start", e.Info.Name);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "隐藏界面", ["ViewName", e.Info.Name]);
        }
        await e.HideAsync();
        BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", e.Info.Name);
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("UiCore", 10, "隐藏界面", ["ViewName", e.Info.Name]);
        }
        await e.HideAsync();
      }
    }
  }
  async ShowViewByPlot(e) {
    var i = this.v9.Peek();
    if (i) {
      if (i?.WillLoadScene()) {
        await Promise.all([BlackScreenController_1.BlackScreenController.AddBlackScreenAsync("None", i.Info.Name), e?.()]);
        i.ShowPromise = new CustomPromise_1.CustomPromise();
        i.LoadScenePromise = new CustomPromise_1.CustomPromise();
        i.SkipRemoveBlackScreen = true;
        i.ShowAsync();
        this.LDc(i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 10, "#######加载场景", ["ViewName", i.Info.Name]);
        }
        await i.LoadScenePromise.Promise;
        i.SkipRemoveBlackScreen = false;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 10, "#######黑屏移除", ["ViewName", i.Info.Name]);
        }
        BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", i.Info.Name);
        await i.ShowPromise.Promise;
        i.ShowPromise = undefined;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("UiCore", 16, "#######界面显示", ["ViewName", i?.Info.Name]);
        }
      } else {
        this.LDc(i);
        await Promise.all([e?.(), i.ShowAsync()]);
      }
      this.Jft();
    }
  }
  async WaitSwitchToPlotPending() {
    var e;
    if (this.Rjt) {
      e = this.v9.Peek();
      await this.Wcr(e, 5)?.ExecutePromise?.Promise;
    }
  }
  TryUnlock() {
    if (this.pjt) {
      this.Jft();
    }
  }
  Wcr(e, i, t) {
    t = new UiViewPending_1.UiViewPending(e, i, t);
    if (this.Ocr.length > 0) {
      var o = this.Ocr[this.Ocr.length - 1];
      if (o.Equal(t)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiCore", 16, "界面缓存操做重复", ["ViewName", e.Info.Name]);
        }
        t.ExecutePromise?.SetResult(true);
        return t;
      }
      if (o.IsPairWith(t)) {
        this.Ocr.pop();
        UiManager_1.UiManager.RemoveView(e.GetViewId());
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("UiCore", 16, "界面缓存操作成对, 自动移除上一个", ["ViewName", e.Info.Name]);
        }
        t.ExecutePromise?.SetResult(true);
        return t;
      }
    }
    this.Ocr.push(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "缓存界面操作", ["界面", e.Info.Name], ["操作类型", i]);
    }
    return t;
  }
  $cr(e) {
    if (e && (this.kcr.Remove(e), this.Fcr.delete(e.Element), this.Fcr.size === 0)) {
      UiModel_1.UiModel.InNormalQueue = false;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ExitNormalQueueState);
    }
  }
  Kcr(i) {
    let e = undefined;
    var t = this.kcr.Find(e => !e.Element || i.Info.SortIndex < e.Element.Info.SortIndex);
    e = t.Pre ? this.kcr.Insert(i, t.Pre) : this.kcr.AddTail(i);
    this.Fcr.set(i, e);
    UiModel_1.UiModel.InNormalQueue = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("UiCore", 16, "缓存界面进入等待队列", ["ViewName", i.Info.Name]);
    }
  }
  IsViewPendingListEmpty() {
    return this.Ocr.length === 0;
  }
}
exports.UiViewStackContainer = UiViewStackContainer;
//# sourceMappingURL=UiViewStackContainer.js.map