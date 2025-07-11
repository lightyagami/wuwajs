"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisibleAnimMachine = undefined;
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
class VisibleAnimMachine {
  constructor() {
    this.State = 0;
    this.Visible = false;
    this.VisibleCallback = undefined;
    this.PlayAnimCallback = undefined;
    this.StopAnimCallback = undefined;
    this._Ct = undefined;
    this.uCt = () => {
      this._Ct = undefined;
      if (this.State === 3) {
        this.State = 0;
        this.VisibleCallback(false);
      } else if (this.State === 2) {
        this.State = 1;
      }
    };
  }
  InitCallback(i, t, s) {
    this.VisibleCallback = i;
    this.PlayAnimCallback = t;
    this.StopAnimCallback = s;
  }
  InitVisible(i) {
    this.Visible = i;
    this.State = i ? 1 : 0;
  }
  SetVisible(i, t) {
    if (this.Visible !== i) {
      this.Visible = i;
      this.StopAnimCallback(!i);
      if (t > 0) {
        if (i) {
          this.VisibleCallback(true);
          this.State = 2;
        } else {
          this.State = 3;
        }
        this.PlayAnimCallback(i);
        this.BCe();
        this._Ct = TimerSystem_1.TimerSystem.Delay(this.uCt, t);
      } else {
        this.State = i ? 1 : 0;
        this.VisibleCallback(i);
      }
    }
  }
  ForcePlayShowAnim(i) {
    if (this.State !== 2) {
      if (this.State === 3) {
        this.StopAnimCallback(false);
      }
      this.State = 2;
      this.PlayAnimCallback(true);
      this.BCe();
      this._Ct = TimerSystem_1.TimerSystem.Delay(this.uCt, i);
    }
  }
  Reset() {
    this.BCe();
  }
  Deactivate() {
    this.BCe();
    if (this.State === 3) {
      this.StopAnimCallback(false);
    } else if (this.State === 2) {
      this.StopAnimCallback(true);
    }
  }
  BCe() {
    if (this._Ct) {
      TimerSystem_1.TimerSystem.Remove(this._Ct);
      this._Ct = undefined;
    }
  }
}
exports.VisibleAnimMachine = VisibleAnimMachine;
//# sourceMappingURL=VisibleAnimMachine.js.map