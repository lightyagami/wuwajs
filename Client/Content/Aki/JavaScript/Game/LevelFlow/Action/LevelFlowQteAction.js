"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowQteAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowQteAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.EXd = 0;
    this.IXd = false;
    this.TXd = false;
    this.Bxl = undefined;
    this.bXd = undefined;
    this.RXd = undefined;
    this.$El = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelFlow", 58, "Qte成功");
      }
      this.IXd = true;
      this.TXd = true;
      this.Bxl = undefined;
      if (this.bXd) {
        this.bXd.BindCompleteCallBack(this.wXd);
        this.bXd.Execute();
      } else {
        this.FinishExecute(true);
      }
    };
    this.bxl = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelFlow", 58, "Qte失败");
      }
      this.IXd = true;
      this.TXd = false;
      this.Bxl = undefined;
      if (this.RXd) {
        this.RXd.BindCompleteCallBack(this.LXd);
        this.RXd.Execute();
      } else {
        this.FinishExecute(true);
      }
    };
    this.wXd = (t, i) => {
      this.FinishExecute(i);
    };
    this.LXd = (t, i) => {
      this.FinishExecute(i);
    };
  }
  Init(t, i, s) {
    this.EXd = t;
    this.bXd = i;
    this.RXd = s;
    return this;
  }
  OnExecute() {
    if (this.Bxl?.IsActive()) {
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.Bxl.HandleId);
    }
    this.IXd = false;
    this.TXd = false;
    this.Bxl = ControllerHolder_1.ControllerHolder.CommonQteController.StartQte(this.EXd, this.$El, this.bxl, 1);
  }
  OnTick(t) {
    if (this.IXd) {
      if (this.TXd) {
        if (this.bXd) {
          this.bXd.Tick(t);
        }
      } else if (this.RXd) {
        this.RXd.Tick(t);
      }
    }
  }
  OnComplete(t) {
    this.IXd = false;
    this.TXd = false;
    this.Bxl = undefined;
  }
  OnReset() {
    this.bXd?.Reset();
    this.RXd?.Reset();
  }
}
exports.LevelFlowQteAction = LevelFlowQteAction;
//# sourceMappingURL=LevelFlowQteAction.js.map