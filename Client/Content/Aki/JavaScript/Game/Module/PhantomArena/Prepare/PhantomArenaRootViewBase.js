"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaRootViewBase = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  Stack_1 = require("../../../../Core/Container/Stack"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiMask_1 = require("../../../Ui/UiMask"),
  PhantomArenaViewManager_1 = require("../PhantomArenaViewManager");
class PhantomArenaRootViewBase extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.ViewModel = void 0, this.ContentItem = void 0, this.DefaultChildViewName = void 0, this.Slu = new Stack_1.Stack, this.ViewMask = new UiMask_1.UiMask
  }
  OnBeforeCreate() {
    this.OnRegisterViewData(), this.OnRegisterDefaultChildView()
  }
  async OnBeforeStartAsync() {
    var e;
    this.OnRegisterContentItem(), this.DefaultChildViewName ? this.ContentItem ? (e = await this.Mlu(this.DefaultChildViewName), this.Slu.Push(e)) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "未注册内容节点") : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "未注册默认界面")
  }
  async OnShowAsyncImplementImplement() {
    await Promise.all([super.OnShowAsyncImplementImplement(), this.Slu.Peek().ShowAsync()])
  }
  async OnHideAsyncImplementImplement() {
    await Promise.all([super.OnHideAsyncImplementImplement(), this.Slu.Peek().HideAsync()])
  }
  async OnDestroyAsyncImplementImplement() {
    for (var e = []; 0 < this.Slu.Size;) e.push(this.Slu.Pop().DestroyAsync());
    await Promise.all(e), await super.OnDestroyAsyncImplementImplement()
  }
  async Mlu(e) {
    var i = PhantomArenaViewManager_1.phantomArenaChildViewCreateInfo[e],
      s = new i[0];
    return s.ViewModel = this.ViewModel, s.RootView = this, s.ViewName = e, await s.CreateByResourceIdAsync(i[1], this.ContentItem), s
  }
  OpenChildView(e) {
    var i = new UiAsyncTask_1.UiAsyncTask("PhantomArenaRootViewBase", async () => {
      await this.OpenChildViewAsync(e)
    });
    this.RunAsyncTask(i)
  }
  async OpenChildViewAsync(e) {
    for (const t of this.Slu)
      if (t.ViewName === e) return;
    this.ViewMask.SetMask("PhantomArenaOpenChildView", !0);
    var i = this.Slu.Peek(),
      s = await this.Mlu(e);
    this.Slu.Push(s), await Promise.all([s.ShowAsync(), i?.HideAsync()]).finally(() => {
      this.ViewMask.SetMask("PhantomArenaOpenChildView", !1)
    })
  }
  CloseCurChildView() {
    var e = new UiAsyncTask_1.UiAsyncTask("PhantomArenaRootViewBase", async () => {
      await this.CloseCurChildViewAsync()
    });
    this.RunAsyncTask(e)
  }
  async CloseCurChildViewAsync() {
    if (this.Slu.Size < 2) return !1;
    this.ViewMask.SetMask("PhantomArenaCloseChildView", !0);
    var e = this.Slu.Pop(),
      i = this.Slu.Peek();
    return await Promise.all([e.DestroyAsync(), i.ShowAsync()]).finally(() => {
      this.ViewMask.SetMask("PhantomArenaCloseChildView", !1)
    }), !0
  }
  CloseChildView(e) {
    var i = new UiAsyncTask_1.UiAsyncTask("PhantomArenaRootViewBase", async () => {
      await this.CloseChildViewAsync(e)
    });
    this.RunAsyncTask(i)
  }
  async CloseChildViewAsync(e) {
    return e !== this.Slu.Peek() ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("PhantomArena", 43, "要关闭的界面不是当前界面"), !1) : this.CloseCurChildViewAsync()
  }
  GetCurChildView() {
    return this.Slu.Peek()
  }
  Back() {
    1 < this.Slu.Size ? this.CloseCurChildView() : this.CloseMe()
  }
}
exports.PhantomArenaRootViewBase = PhantomArenaRootViewBase;
//# sourceMappingURL=PhantomArenaRootViewBase.js.map