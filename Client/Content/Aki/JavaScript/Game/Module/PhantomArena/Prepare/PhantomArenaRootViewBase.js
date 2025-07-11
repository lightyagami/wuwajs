"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaRootViewBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stack_1 = require("../../../../Core/Container/Stack");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiMask_1 = require("../../../Ui/UiMask");
const PhantomArenaViewManager_1 = require("../PhantomArenaViewManager");
class PhantomArenaRootViewBase extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ViewModel = undefined;
    this.ContentItem = undefined;
    this.DefaultChildViewName = undefined;
    this.Ggu = new Stack_1.Stack();
    this.ViewMask = new UiMask_1.UiMask();
  }
  OnBeforeCreate() {
    this.OnRegisterViewData();
    this.OnRegisterDefaultChildView();
  }
  async OnBeforeStartAsync() {
    var e;
    this.OnRegisterContentItem();
    if (this.DefaultChildViewName) {
      if (this.ContentItem) {
        e = await this.Fgu(this.DefaultChildViewName);
        this.Ggu.Push(e);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "未注册内容节点");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 43, "未注册默认界面");
    }
  }
  async OnShowAsyncImplementImplement() {
    await Promise.all([super.OnShowAsyncImplementImplement(), this.Ggu.Peek().ShowAsync()]);
  }
  async OnHideAsyncImplementImplement() {
    await Promise.all([super.OnHideAsyncImplementImplement(), this.Ggu.Peek().HideAsync()]);
  }
  async OnDestroyAsyncImplementImplement() {
    var e = [];
    for (; this.Ggu.Size > 0;) {
      e.push(this.Ggu.Pop().DestroyAsync());
    }
    await Promise.all(e);
    await super.OnDestroyAsyncImplementImplement();
  }
  async Fgu(e) {
    var i = PhantomArenaViewManager_1.phantomArenaChildViewCreateInfo[e];
    var s = new i[0]();
    s.ViewModel = this.ViewModel;
    s.RootView = this;
    s.ViewName = e;
    await s.CreateByResourceIdAsync(i[1], this.ContentItem);
    return s;
  }
  OpenChildView(e) {
    var i = new UiAsyncTask_1.UiAsyncTask("PhantomArenaRootViewBase", async () => {
      await this.OpenChildViewAsync(e);
    });
    this.RunAsyncTask(i);
  }
  async OpenChildViewAsync(e) {
    for (const t of this.Ggu) {
      if (t.ViewName === e) {
        return;
      }
    }
    this.ViewMask.SetMask("PhantomArenaOpenChildView", true);
    var i = this.Ggu.Peek();
    var s = await this.Fgu(e);
    this.Ggu.Push(s);
    await Promise.all([s.ShowAsync(), i?.HideAsync()]).finally(() => {
      this.ViewMask.SetMask("PhantomArenaOpenChildView", false);
    });
  }
  CloseCurChildView() {
    var e = new UiAsyncTask_1.UiAsyncTask("PhantomArenaRootViewBase", async () => {
      await this.CloseCurChildViewAsync();
    });
    this.RunAsyncTask(e);
  }
  async CloseCurChildViewAsync() {
    if (this.Ggu.Size < 2) {
      return false;
    }
    this.ViewMask.SetMask("PhantomArenaCloseChildView", true);
    var e = this.Ggu.Pop();
    var i = this.Ggu.Peek();
    await Promise.all([e.DestroyAsync(), i.ShowAsync()]).finally(() => {
      this.ViewMask.SetMask("PhantomArenaCloseChildView", false);
    });
    return true;
  }
  CloseChildView(e) {
    var i = new UiAsyncTask_1.UiAsyncTask("PhantomArenaRootViewBase", async () => {
      await this.CloseChildViewAsync(e);
    });
    this.RunAsyncTask(i);
  }
  async CloseChildViewAsync(e) {
    if (e !== this.Ggu.Peek()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PhantomArena", 43, "要关闭的界面不是当前界面");
      }
      return false;
    } else {
      return this.CloseCurChildViewAsync();
    }
  }
  GetCurChildView() {
    return this.Ggu.Peek();
  }
  Back() {
    if (this.Ggu.Size > 1) {
      this.CloseCurChildView();
    } else {
      this.CloseMe();
    }
  }
}
exports.PhantomArenaRootViewBase = PhantomArenaRootViewBase;
//# sourceMappingURL=PhantomArenaRootViewBase.js.map