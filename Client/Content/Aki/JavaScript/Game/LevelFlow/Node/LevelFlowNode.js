"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowNode = undefined;
class LevelFlowNode {
  constructor(t, s) {
    this.NodeId = 0;
    this.qXd = 0;
    this.d_u = undefined;
    this.lNe = undefined;
    this.y5o = [];
    this.GXd = new Set();
    this.FXd = t => {
      if (t) {
        this.qXd = 2;
        this.NXd();
      } else {
        this.qXd = 4;
        this.d_u(this, false);
      }
    };
    this.AXd = (t, s) => {
      if (s) {
        this.GXd.delete(t);
        if (this.GXd.size === 0) {
          this.qXd = 3;
          this.d_u(this, true);
        }
      } else {
        this.qXd = 4;
        this.d_u(this, false);
      }
    };
    this.NodeId = LevelFlowNode.f_r++;
    this.lNe = t;
    this.y5o = s;
  }
  BindCompleteCallBack(t) {
    this.d_u = t;
  }
  Enter() {
    if (this.lNe) {
      this.qXd = 1;
      this.lNe.BindCompleteCallBack(this.FXd);
      this.lNe.Enter();
    } else {
      this.qXd = 2;
      this.NXd();
    }
  }
  Exit() {
    this.d_u = undefined;
  }
  Tick(t) {
    if (this.NodeState === 1) {
      this.lNe.Tick(t);
    } else if (this.NodeState === 2) {
      for (const s of this.GXd) {
        s.Tick(t);
      }
    }
  }
  Reset() {
    if (this.NodeState !== 0) {
      if (this.NodeState === 1) {
        this.lNe?.Reset();
      } else {
        this.lNe?.Reset();
        for (const t of this.y5o) {
          t.Reset();
        }
      }
    }
  }
  NXd() {
    this.GXd.clear();
    for (const t of this.y5o) {
      this.GXd.add(t);
      t.BindCompleteCallBack(this.AXd);
    }
    for (const s of this.y5o) {
      s.Execute();
    }
  }
  get NodeState() {
    return this.qXd;
  }
}
(exports.LevelFlowNode = LevelFlowNode).f_r = 0;
//# sourceMappingURL=LevelFlowNode.js.map