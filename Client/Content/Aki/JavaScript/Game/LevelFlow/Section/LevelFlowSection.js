"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSection = undefined;
class LevelFlowSection {
  constructor(t, s) {
    this.SectionId = 0;
    this.XIt = [];
    this.Arm = [];
    this.VXd = new Set();
    this.d_u = undefined;
    this.Drm = undefined;
    this.jXd = (t, s) => {
      if (s) {
        t.Exit();
        this.VXd.delete(t);
        if (this.VXd.size === 0) {
          this.d_u(this, true);
        }
      } else {
        this.d_u(this, false);
      }
    };
    this.Urm = (t, s) => {
      if (s) {
        t.Exit();
        this.VXd.delete(t);
        if (this.VXd.size === 0) {
          for (const t of this.Arm) {
            t.Reset();
          }
          this.Drm(this, true);
        }
      } else {
        this.Drm(this, false);
      }
    };
    this.Arm = s;
    this.SectionId = LevelFlowSection.f_r++;
    this.XIt = t;
  }
  BindCompleteCallBack(t) {
    this.d_u = t;
  }
  BindResetCompleteCallBack(t) {
    this.Drm = t;
  }
  Enter() {
    this.VXd.clear();
    for (const t of this.XIt) {
      this.VXd.add(t);
      t.BindCompleteCallBack(this.jXd);
    }
    for (const s of this.VXd) {
      s.Enter();
    }
  }
  Tick(t) {
    for (const s of this.VXd) {
      s.Tick(t);
    }
  }
  Exit() {
    for (const t of this.XIt) {
      t.Exit();
    }
    this.VXd.clear();
    this.XIt.length = 0;
    this.d_u = undefined;
  }
  Reset() {
    for (const t of this.XIt) {
      t.Reset();
    }
    this.VXd.clear();
    for (const s of this.Arm) {
      this.VXd.add(s);
    }
    for (const i of this.Arm) {
      i.BindCompleteCallBack(this.Urm);
      i.Enter();
    }
  }
}
(exports.LevelFlowSection = LevelFlowSection).f_r = 0;
//# sourceMappingURL=LevelFlowSection.js.map