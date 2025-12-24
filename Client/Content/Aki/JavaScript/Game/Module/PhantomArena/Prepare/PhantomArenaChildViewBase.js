"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChildViewBase = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer");
class PhantomArenaChildViewBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RootView = undefined;
    this.ViewModel = undefined;
    this.ViewName = undefined;
    this.ActivityId = 0;
    this.SequencePlayer = undefined;
    this.Hur = true;
    this.GetViewName = () => this.ViewName ?? "";
  }
  OnAddEventListener() {}
  async OnPlayingStartSequenceAsync() {}
  async OnPlayingShowSequenceAsync() {}
  async OnPlayingHideSequenceAsync() {}
  async OnPlayingCloseSequenceAsync() {}
  OnRemoveEventListener() {}
  OnStartImplement() {
    this.SequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Hur = true;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPhantomArenaChildViewOpen, this.GetViewName());
  }
  OnBeforeShowImplement() {
    this.OnAddEventListener();
  }
  async OnShowAsyncImplementImplement() {
    var e;
    if (this.Hur) {
      e = new CustomPromise_1.CustomPromise();
      await Promise.all([this.SequencePlayer.PlaySequenceAsync("Start", e), this.OnPlayingStartSequenceAsync()]);
      this.Hur = false;
    } else {
      e = new CustomPromise_1.CustomPromise();
      await Promise.all([this.SequencePlayer.PlaySequenceAsync("ShowView", e), this.OnPlayingShowSequenceAsync()]);
    }
  }
  async OnHideAsyncImplementImplement() {
    var e;
    if (this.WaitToDestroy) {
      e = new CustomPromise_1.CustomPromise();
      await Promise.all([this.SequencePlayer.PlaySequenceAsync("Close", e), this.OnPlayingCloseSequenceAsync()]);
    } else {
      e = new CustomPromise_1.CustomPromise();
      await Promise.all([this.SequencePlayer.PlaySequenceAsync("HideView", e), this.OnPlayingHideSequenceAsync()]);
    }
  }
  OnAfterHideImplement() {
    this.OnRemoveEventListener();
  }
  OpenChildView(e) {
    this.RootView.OpenChildView(e);
  }
  async OpenChildViewAsync(e) {
    return this.RootView.OpenChildViewAsync(e);
  }
  async CloseMeAsync() {
    return this.RootView.CloseCurChildViewAsync();
  }
  CloseMe() {
    this.RootView.CloseCurChildView();
  }
  BackToLastView() {
    this.RootView.Back();
  }
}
exports.PhantomArenaChildViewBase = PhantomArenaChildViewBase;
//# sourceMappingURL=PhantomArenaChildViewBase.js.map