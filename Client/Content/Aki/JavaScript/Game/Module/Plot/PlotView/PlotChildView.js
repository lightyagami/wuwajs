"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotChildView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class PlotChildView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.PlaySpineAnimation = (i, t = true) => {
      var e = (0, puerts_1.$ref)(undefined);
      if (i !== "") {
        this.RootItem?.GetAllAttachUIChildren(e);
        var s = (0, puerts_1.$unref)(e);
        for (let e = 0; e < s.Num(); e++) {
          var o = s.Get(e);
          if (o.IsA(UE.UISpineRenderable.StaticClass())) {
            o = o.GetOwner()?.GetComponentByClass(UE.SpineSkeletonAnimationComponent.StaticClass());
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Plot", 45, "Ui预览图:播放Spine动画", ["spineName", i], ["isLoop", t]);
            }
            o.SetAnimation(0, i, t);
          }
        }
      }
    };
    this.CloseSpineAnimation = i => {
      var e = (0, puerts_1.$ref)(undefined);
      if (!i && i !== "") {
        this.RootItem?.GetAllAttachUIChildren(e);
        var t = (0, puerts_1.$unref)(e);
        for (let e = 0; e < t.Num(); e++) {
          var s = t.Get(e);
          if (s.IsA(UE.UISpineRenderable.StaticClass()) && (s = s.GetOwner()?.GetComponentByClass(UE.SpineSkeletonAnimationComponent.StaticClass()), Log_1.Log.CheckInfo() && Log_1.Log.Info("Plot", 45, "Ui预览图:关闭Spine动画", ["spineName", i]), s.HasAnimation(i))) {
            s.ClearTrack(0);
          }
        }
      }
    };
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayPlotSpine, this.PlaySpineAnimation);
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayPlotSpine, this.PlaySpineAnimation);
  }
  OnBeforeDestroy() {
    this.LevelSequencePlayer?.Clear();
  }
  async PreOpenAsync(e, i) {
    if (i) {
      await this.CreateByResourceIdAsync(i, e, false);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 45, "Ui预览图:预加载Ui预览图，但Ui预制体名称为空", ["uiName", i]);
    }
  }
  async OpenAsync(e, i, t, s = true, o = false) {
    if (i) {
      if (o) {
        await this.ShowAsync();
      } else {
        await this.CreateThenShowByResourceIdAsync(i, e, false);
      }
      this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Start", false);
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop", false);
      this.PlaySpineAnimation(t, s);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 45, "Ui预览图:打开Ui预览图，但Ui预制体名称为空", ["uiName", i]);
    }
  }
  async OpenAsyncInArray(e, i, t, s = false) {
    if (i) {
      if (s) {
        await this.ShowAsync();
      } else {
        await this.CreateThenShowByResourceIdAsync(i, e, false);
      }
      await this.CreateThenShowByResourceIdAsync(i, e, false);
      this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Start", false);
      this.LevelSequencePlayer?.PlayLevelSequenceByName("Loop", false);
      for (let e = 0; e < t.Num(); e++) {
        this.PlaySpineAnimation(t.Get(e).Name, t.Get(e).NeedLoop);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Plot", 45, "Ui预览图:打开Ui预览图，但Ui预制体名称为空", ["uiName", i]);
    }
  }
  async PlayUiLevelSequence(e) {
    var i = new CustomPromise_1.CustomPromise();
    this.LevelSequencePlayer?.StopCurrentSequence(false, true);
    this.LevelSequencePlayer?.PlaySequencePurely(e, false, false, i);
    return i.Promise;
  }
  async CloseAsync() {
    await this.LevelSequencePlayer?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
    await this.HideAsync();
    await this.DestroyAsync();
  }
}
exports.PlotChildView = PlotChildView;
//# sourceMappingURL=PlotChildView.js.map