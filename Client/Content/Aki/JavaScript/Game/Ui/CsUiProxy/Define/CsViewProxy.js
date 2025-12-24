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
  Lbm() {
    this.CsUiLife.OnCreateAsyncPromise ||= new CustomPromise_1.CustomPromise();
  }
  async OnCreateAsync() {
    this.Lbm();
    await this.CsUiLife.OnCreateAsyncPromise.Promise;
    this.CsUiLife.OnCreateAsyncPromise = undefined;
  }
  Pbm() {
    this.CsUiLife.OnBeforeStartAsyncPromise ||= new CustomPromise_1.CustomPromise();
  }
  async OnBeforeStartAsync() {
    this.Pbm();
    await this.CsUiLife.OnBeforeStartAsyncPromise.Promise;
    this.CsUiLife.OnBeforeStartAsyncPromise = undefined;
  }
  Abm() {
    this.CsUiLife.OnBeforeHideAsyncPromise ||= new CustomPromise_1.CustomPromise();
  }
  async OnBeforeHideAsync() {
    this.Abm();
    await this.CsUiLife.OnBeforeHideAsyncPromise.Promise;
    this.CsUiLife.OnBeforeHideAsyncPromise = undefined;
  }
  Dbm() {
    this.CsUiLife.OnBeforeShowAsyncImplementImplementPromise ||= new CustomPromise_1.CustomPromise();
  }
  async OnBeforeShowAsyncImplementImplement() {
    this.Dbm();
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