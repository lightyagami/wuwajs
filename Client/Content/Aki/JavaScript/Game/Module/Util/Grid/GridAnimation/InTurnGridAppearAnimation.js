"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InTurnGridAppearAnimation = undefined;
const ue_1 = require("ue");
const GridAppearAnimationBase_1 = require("./GridAppearAnimationBase");
const GlobalData_1 = require("../../../../GlobalData");
class InTurnGridAppearAnimation extends GridAppearAnimationBase_1.GridAppearAnimationBase {
  constructor() {
    super(...arguments);
    this.iGo = -0;
    this.oGo = -0;
    this.rGo = 0;
    this.nGo = (t, i) => {
      i.SetUIActive(false);
    };
    this.sGo = 1000;
  }
  OnStart() {
    if (!this.IsInGridAppearAnimation) {
      this.aGo();
    }
  }
  OnEnd() {
    this.IsInGridAppearAnimation = false;
    this.iGo = 0;
    this.oGo = 0;
    this.rGo = 0;
  }
  OnInterrupt() {
    super.OnInterrupt();
    this.IsInGridAppearAnimation = false;
    this.iGo = 0;
    this.oGo = 0;
    this.rGo = 0;
  }
  OnUpdate(t) {
    if (this.IsInGridAppearAnimation) {
      this.hGo(t);
    }
  }
  aGo() {
    if (this.GridPreserver.GetGridAnimationInterval() <= 0 && this.GridPreserver.GetGridAnimationStartTime() <= 0 || this.DisplayGridNum <= 0) {
      this.RemoveTimer();
    } else {
      this.GridPreserver.NotifyAnimationStart();
      this.IsInGridAppearAnimation = true;
      this.iGo = 0;
      this.oGo = 0;
      this.HasShowFirstGrid = false;
      this.rGo = this.GridPreserver.GetDisplayGridStartIndex();
      this.GridsForEach(this.nGo);
    }
  }
  lGo() {
    this.iGo = 0;
    this.oGo = 0;
    this.HasShowFirstGrid = false;
    this.rGo = this.GridPreserver.GetDisplayGridStartIndex();
  }
  hGo(t) {
    var i = ue_1.LGUIManagerActor.GetSequencerManager(GlobalData_1.GlobalData.World)?.GetGlobalPlayRate();
    if (i) {
      t *= i;
    }
    this.oGo += t / this.sGo;
    if ((!!this.HasShowFirstGrid || !(this.oGo < this.GridPreserver.GetGridAnimationStartTime())) && (!this.HasShowFirstGrid || !(this.oGo - this.iGo < this.GridPreserver.GetGridAnimationInterval()))) {
      this.HasShowFirstGrid = true;
      this.iGo = this.oGo;
      this._Go();
    }
  }
  _Go() {
    var t;
    if (this.rGo < this.GridPreserver.GetDisplayGridStartIndex() || this.rGo > this.GridPreserver.GetDisplayGridEndIndex()) {
      this.lGo();
    } else if ((t = this.GridPreserver.GetGrid(this.rGo)) && t.IsValid()) {
      this.ShowGrid(t, this.rGo);
      this.rGo++;
      if (this.rGo > this.GridPreserver.GetDisplayGridEndIndex()) {
        this.End();
        this.GridPreserver.NotifyAnimationEnd();
      }
    } else {
      this.End();
    }
  }
}
exports.InTurnGridAppearAnimation = InTurnGridAppearAnimation;
//# sourceMappingURL=InTurnGridAppearAnimation.js.map