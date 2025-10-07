"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerBurningTideItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
class ShipTowerBurningTideItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Nll = undefined;
    this.xvi = undefined;
    this.SPe = undefined;
    this.yct = e => {
      if (e === "Start") {
        this.jpu("Loop2");
      } else if (e === "Start2") {
        this.jpu("Loop1");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem]];
  }
  OnStart() {
    this.Nll = new UE.Rotator(0, 0, 0);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.yct);
    this.xvi = this.GetText(2);
    this.xvi.SetText("0%");
  }
  UpdateValue(e, t) {
    var i = e / t;
    this.GetSprite(0)?.SetFillAmount(i);
    this.Nll.Yaw = i * -360;
    this.GetItem(4)?.SetUIRelativeRotation(this.Nll);
    var s = Math.floor(i * 100);
    this.xvi.SetText(s + "%");
    this.xvi.useChangeColor = t <= e;
    if (i >= 1) {
      this.jpu("Start");
    } else {
      this.jpu("Start2");
    }
  }
  jpu(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ShipTower", 78, "ShipTowerBurningTideItem 播放序列", ["sequenceName", e]);
    }
    this.SPe?.StopCurrentSequence();
    this.SPe?.PlaySequencePurely(e);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
  }
}
exports.ShipTowerBurningTideItem = ShipTowerBurningTideItem;
//# sourceMappingURL=ShipTowerBurningTideItem.js.map