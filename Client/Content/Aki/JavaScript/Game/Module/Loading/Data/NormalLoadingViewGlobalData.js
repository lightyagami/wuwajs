"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormalLoadingViewGlobalData = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
class NormalLoadingViewGlobalData {
  static CreateFirstProgressPromise() {
    this.vvi = new CustomPromise_1.CustomPromise();
  }
  static FinishFirstProgressPromise() {
    this.vvi.SetResult(undefined);
    this.vvi = undefined;
  }
  static get FirstProgressPromise() {
    return this.vvi;
  }
  static get FinishPromise() {
    return this.Mvi;
  }
  static CreateFinishPromisePromise() {
    this.Mvi = new CustomPromise_1.CustomPromise();
  }
  static FinishEndPromise() {
    this.Mvi?.SetResult(undefined);
    this.Mvi = undefined;
  }
  static get IsNotifyCloseView() {
    return this.Evi;
  }
  static ResetNotifyCloseView() {
    this.Evi = false;
  }
}
(exports.NormalLoadingViewGlobalData = NormalLoadingViewGlobalData).vvi = undefined;
NormalLoadingViewGlobalData.Mvi = undefined;
NormalLoadingViewGlobalData.Evi = false; //# sourceMappingURL=NormalLoadingViewGlobalData.js.map