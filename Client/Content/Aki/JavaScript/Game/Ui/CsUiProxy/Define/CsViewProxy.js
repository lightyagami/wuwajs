"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CsViewProxy = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../Base/UiViewBase");
class CsViewProxy extends UiViewBase_1.UiViewBase {
  Nbm() {
    this.CsUiLife.OnCreateAsyncPromise ||= new CustomPromise_1.CustomPromise();
  }
  async OnCreateAsync() {
    this.Nbm();
    await this.CsUiLife.OnCreateAsyncPromise.Promise;
    this.CsUiLife.OnCreateAsyncPromise = undefined;
  }
  Vbm() {
    this.CsUiLife.OnBeforeStartAsyncPromise ||= new CustomPromise_1.CustomPromise();
  }
  async OnBeforeStartAsync() {
    this.Vbm();
    await this.CsUiLife.OnBeforeStartAsyncPromise.Promise;
    this.CsUiLife.OnBeforeStartAsyncPromise = undefined;
  }
  jbm() {
    this.CsUiLife.OnBeforeHideAsyncPromise ||= new CustomPromise_1.CustomPromise();
  }
  async OnBeforeHideAsync() {
    this.jbm();
    await this.CsUiLife.OnBeforeHideAsyncPromise.Promise;
    this.CsUiLife.OnBeforeHideAsyncPromise = undefined;
  }
  Hbm() {
    this.CsUiLife.OnBeforeShowAsyncImplementImplementPromise ||= new CustomPromise_1.CustomPromise();
  }
  async OnBeforeShowAsyncImplementImplement() {
    this.Hbm();
    await this.CsUiLife.OnBeforeShowAsyncImplementImplementPromise.Promise;
    this.CsUiLife.OnBeforeShowAsyncImplementImplementPromise = undefined;
  }
  async OnCreateAsyncImplement() {
    await this.OnCreateAsync();
    return true;
  }
  OnAfterCreateImplement() {}
  async OnCreateAsyncImplementImplement() {
    return Promise.resolve();
  }
  async OnShowAsyncImplementImplement() {
    return Promise.resolve();
  }
  async OnHideAsyncImplementImplement() {
    await this.ReleaseScene();
    return Promise.resolve();
  }
  OnStartImplementImplement() {}
  OnStartImplement() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnViewLoadCompleted, this.Info.Name);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnViewDone, this.Info.Name, this);
  }
  OnBeforeShowImplementImplement() {}
  OnBeforeShowImplement() {}
  OnShowAsyncImplementImplementCompatible() {}
  OnAfterShowImplement() {
    this.OpenPromise?.SetResult(true);
    this.ShowPromise?.SetResult(undefined);
  }
  HandleCacheShowActionFailIfIsPair() {}
  OnHideAsyncImplementImplementCompatible() {}
  OnAfterHideImplementImplement() {}
  OnAfterHideImplement() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnViewHidden, this.Info.Name);
  }
  OnDestroyAsyncImplementImplementCompatible() {}
  OnAfterDestroyImplement() {
    this.ClosePromise?.SetResult(undefined);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseView, this.Info.Name, this.GetViewId());
  }
}
exports.CsViewProxy = CsViewProxy;
//# sourceMappingURL=CsViewProxy.js.map