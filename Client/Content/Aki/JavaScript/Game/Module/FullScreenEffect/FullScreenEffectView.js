"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullScreenEffectView = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const UiLayerType_1 = require("../../Ui/Define/UiLayerType");
const LguiResourceManager_1 = require("../../Ui/LguiResourceManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const DELAY_TIME = 100;
class FullScreenEffectView {
  constructor() {
    this.RootItem = undefined;
    this.RootActor = undefined;
    this.Priority = 0;
    this.Path = "";
    this.O9t = true;
    this.k9t = undefined;
    this.F9t = new Set();
    this.hJ = 0;
    this.V9t = () => {
      this.F9t.clear();
    };
  }
  async Init(e, i) {
    const t = new CustomPromise_1.CustomPromise();
    this.hJ = LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId(this.Path, UiLayer_1.UiLayer.GetLayerRootUiItem(UiLayerType_1.ELayerType.Pop), e => {
      this.H9t(e);
      t.SetResult(undefined);
    });
    this.Priority = i;
    this.Path = e;
    return t.Promise;
  }
  SetEffectVisibility(e, i) {
    if (i) {
      if (e) {
        this.k9t = TimerSystem_1.TimerSystem.Delay(this.V9t, DELAY_TIME);
      } else {
        this.j9t();
      }
    }
    if (this.O9t !== e) {
      this.RootItem.SetIsUIActive(e);
      this.O9t = e;
    }
  }
  H9t(e) {
    var i = e.GetComponentByClass(UE.UIItem.StaticClass());
    this.RootActor = e;
    this.RootItem = i;
  }
  Destroy() {
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.hJ);
    this.F9t.clear();
    ActorSystem_1.ActorSystem.Put("FullScreenEffectView.Destroy", this.RootActor);
  }
  j9t() {
    if (TimerSystem_1.TimerSystem.Has(this.k9t)) {
      TimerSystem_1.TimerSystem.Remove(this.k9t);
    }
    this.F9t.clear();
    this.k9t = undefined;
  }
  DeActive() {
    var i = UE.LGUIBPLibrary.GetComponentsInChildren(this.RootActor, UE.UINiagara.StaticClass(), false);
    for (let e = 0; e < i.Num(); e++) {
      var t = i.Get(e);
      if (t) {
        t.DeactivateSystem();
      }
    }
  }
  IsEffectPlay() {
    var i = UE.LGUIBPLibrary.GetComponentsInChildren(this.RootActor, UE.UINiagara.StaticClass(), false);
    for (let e = 0; e < i.Num(); e++) {
      if (i.Get(e)) {
        return true;
      }
    }
    return false;
  }
}
(exports.FullScreenEffectView = FullScreenEffectView).Compare = (e, i) => i.Priority - e.Priority;
//# sourceMappingURL=FullScreenEffectView.js.map