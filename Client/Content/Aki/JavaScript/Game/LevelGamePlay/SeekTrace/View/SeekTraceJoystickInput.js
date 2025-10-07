"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceJoystickInput = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const PRESS_THRESHOLD = 0.7;
const RELEASE_THRESHOLD = 0.2;
const FIRST_PRESS_INTERVAL = 500;
const REPEAT_PRESS_INTERVAL = 100;
const RELEASE_INTERVAL = 100;
class SeekTraceJoystickInput {
  constructor() {
    this.Udd = 0;
    this.Bdd = 0;
    this.kdd = 0;
    this.bwo = 0;
    this.Bwo = 0;
    this.Gwo = undefined;
    this.cz = Vector_1.Vector.Create();
    this.wut = false;
    this.Odd = 0;
    this.cd_ = false;
    this.qdd = undefined;
  }
  RegisterMovePress(t) {
    this.qdd = t;
  }
  MoveAxisInput(t, s) {
    if (t === 1 || t === 2) {
      this.Bdd = s;
    } else {
      this.Udd = s;
    }
  }
  Tick(t) {
    this._d_(t);
    if (this.cd_) {
      this.Dwo(this.Odd, t);
    }
  }
  _d_(t) {
    var s;
    var i;
    if (!this.cd_ && !(s = this.Bdd, i = this.Udd, this.Mwo(i) && this.Mwo(s) && !this.wut)) {
      if (this.Swo(i) && this.Swo(s) && this.wut) {
        this.wut = false;
        this.kdd = 0;
        this.Bwo = 0;
      } else {
        this.Lwo(i, s);
        this.Dwo(this.kdd, t);
        this.wut = true;
      }
    }
  }
  Lwo(s, i) {
    var h = this.Mwo(s);
    var e = this.Mwo(i);
    if (!h || !e) {
      let t = 3;
      this.cz.Set(h ? 0 : s, e ? 0 : i, 0);
      h = Vector_1.Vector.GetAngleByVector2D(this.cz);
      if (h >= -143 && h < -37) {
        t = 2;
      } else if (h >= -37 && h < 37) {
        t = 4;
      } else if (h >= 37 && h < 143) {
        t = 1;
      }
      if (t !== this.kdd) {
        this.kdd = t;
        this.Bwo = 0;
        this.bwo = FIRST_PRESS_INTERVAL;
        this.Gwo = 1;
        this.qdd?.(t);
      }
    }
  }
  Mwo(t) {
    return Math.abs(t) < PRESS_THRESHOLD;
  }
  Swo(t) {
    return Math.abs(t) < RELEASE_THRESHOLD;
  }
  Dwo(t, s) {
    if (t !== 0) {
      this.Bwo += s;
      if (this.Gwo === 0) {
        if (this.Bwo > RELEASE_INTERVAL) {
          this.Bwo -= RELEASE_INTERVAL;
          this.bwo = REPEAT_PRESS_INTERVAL;
          this.Gwo = 1;
          this.qdd?.(t);
        }
      } else if (this.Gwo === 1 && this.Bwo > this.bwo) {
        this.Bwo -= this.bwo;
        this.Gwo = 0;
      }
    }
  }
  MoveActionInput(t, s) {
    if (!this.wut && (this.Odd === 0 || this.Odd === t)) {
      if (s) {
        this.Odd = t;
        this.cd_ = true;
        this.Gwo = 1;
        this.Bwo = 0;
        this.bwo = FIRST_PRESS_INTERVAL;
        this.qdd?.(t);
      } else {
        this.Odd = 0;
        this.cd_ = false;
        this.Gwo = 0;
      }
    }
  }
  ResetMoveActionInput() {
    if (this.Odd !== 0) {
      this.Odd = 0;
      this.cd_ = false;
      this.Gwo = 0;
    }
  }
}
exports.SeekTraceJoystickInput = SeekTraceJoystickInput;
//# sourceMappingURL=SeekTraceJoystickInput.js.map