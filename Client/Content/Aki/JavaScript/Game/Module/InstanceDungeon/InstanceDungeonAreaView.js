"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonAreaView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const SHOW_TIME = 3000;
class InstanceDungeonAreaView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.qWe = () => {
      var e;
      if (this.GetText(0) && (e = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonName())) {
        this.GetText(0).SetText(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.CloseMe();
      }, SHOW_TIME);
    });
  }
  OnBeforeShow() {
    this.qWe();
  }
}
exports.InstanceDungeonAreaView = InstanceDungeonAreaView;
//# sourceMappingURL=InstanceDungeonAreaView.js.map