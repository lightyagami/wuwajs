"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaChildViewBase = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer");
class PhantomArenaChildViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.RootView = void 0, this.ViewModel = void 0, this.ViewName = void 0, this.SequencePlayer = void 0, this.Hur = !0, this.GetViewName = () => this.ViewName ?? ""
  }
  OnAddEventListener() {}
  async OnPlayingStartSequenceAsync() {}
  async OnPlayingShowSequenceAsync() {}
  async OnPlayingHideSequenceAsync() {}
  async OnPlayingCloseSequenceAsync() {}
  OnRemoveEventListener() {}
  OnStartImplement() {
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Hur = !0, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChildViewOpen, this.GetViewName())
  }
  OnBeforeShowImplement() {
    this.OnAddEventListener()
  }
  async OnShowAsyncImplementImplement() {
    var e;
    this.Hur ? (e = new CustomPromise_1.CustomPromise, await Promise.all([this.SequencePlayer.PlaySequenceAsync("Start", e), this.OnPlayingStartSequenceAsync()]), this.Hur = !1) : (e = new CustomPromise_1.CustomPromise, await Promise.all([this.SequencePlayer.PlaySequenceAsync("ShowView", e), this.OnPlayingShowSequenceAsync()]))
  }
  async OnHideAsyncImplementImplement() {
    var e;
    this.WaitToDestroy ? (e = new CustomPromise_1.CustomPromise, await Promise.all([this.SequencePlayer.PlaySequenceAsync("Close", e), this.OnPlayingCloseSequenceAsync()])) : (e = new CustomPromise_1.CustomPromise, await Promise.all([this.SequencePlayer.PlaySequenceAsync("HideView", e), this.OnPlayingHideSequenceAsync()]))
  }
  OnAfterHideImplement() {
    this.OnRemoveEventListener()
  }
  OpenChildView(e) {
    this.RootView.OpenChildView(e)
  }
  async OpenChildViewAsync(e) {
    return this.RootView.OpenChildViewAsync(e)
  }
  async CloseMeAsync() {
    return this.RootView.CloseCurChildViewAsync()
  }
  CloseMe() {
    this.RootView.CloseCurChildView()
  }
}
exports.PhantomArenaChildViewBase = PhantomArenaChildViewBase;
//# sourceMappingURL=PhantomArenaChildViewBase.js.map