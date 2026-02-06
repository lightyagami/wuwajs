"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowModel = undefined;
const Log_1 = require("../../Core/Common/Log");
const ModelBase_1 = require("../../Core/Framework/ModelBase");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const LevelFlowResourceManager_1 = require("./LevelFlowResourceManager");
const LevelFlowTiTanData_1 = require("./LevelFlowTiTanData");
class LevelFlowModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsDebug = false;
    this.IsIgnoreForceMove = false;
    this._rf = undefined;
    this.urf = 0;
    this.rTf = undefined;
    this.BXd = 0;
    this.xXd = undefined;
    this.DUf = false;
    this.dTm = new Set();
    this.qvg = undefined;
    this.kXd = (e, t) => {
      if (t) {
        if (e.SectionId !== this.xXd.SectionId) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "section回调异常");
          }
        } else {
          this.xXd.Exit();
          this.BXd++;
          if (this.BXd < this.rTf.GetCapacity()) {
            const e = this.rTf.GetSection(this.BXd);
            if (e) {
              this.xXd = e;
              this.OXd(e);
            }
          } else {
            this.wXt();
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelFlowFinished);
          }
        }
      } else {
        this.ResetLevelFlow();
      }
    };
    this.Lrm = (e, t) => {
      if (this.DUf) {
        this.wXt();
        this.qvg?.(t);
        this.qvg = undefined;
      } else if (t) {
        if (e.SectionId !== this.xXd.SectionId) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "section回调异常");
          }
        } else {
          this.xXd.Enter();
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelFlow", 58, "回退都失败了，怎么能成功呢");
      }
    };
    this.mTm = (e, t) => {
      if (t) {
        this.dTm.delete(e);
      }
    };
  }
  InitTaskTreeInfo(e, t) {
    this._rf = e;
    this.urf = t;
  }
  InitTiTanLevelFlowInfo() {
    this.rTf = new LevelFlowTiTanData_1.LevelFlowTiTanData();
    this.rTf.Init();
  }
  StartLevelFlow(e) {
    if (!(this.rTf.GetCapacity() <= 0)) {
      this.DUf = false;
      this.BXd = e;
      if (e = this.rTf.GetSection(this.BXd)) {
        this.xXd = e;
        this.OXd(e);
      }
    }
  }
  OnTick(e) {
    if (this.xXd) {
      this.xXd.Tick(e);
      for (const t of this.dTm) {
        t.Tick(e);
      }
    }
  }
  OXd(e) {
    e.BindCompleteCallBack(this.kXd);
    e.Enter();
  }
  ResetLevelFlow(e = false) {
    this.DUf = e;
    if (this.xXd) {
      this.xXd.BindResetCompleteCallBack(this.Lrm);
      this.xXd.Reset();
    }
    for (const t of this.dTm) {
      t.Reset();
    }
    this.dTm.clear();
  }
  RollBackLevelFlow(e) {
    if (this.xXd) {
      this.qvg = e;
      this.ResetLevelFlow(true);
    } else {
      e(true);
    }
  }
  PushDynamicAction(e) {
    if (!this.IsEnd) {
      if (this.xXd) {
        this.dTm.add(e);
        e.BindCompleteCallBack(this.mTm);
        e.Execute();
      }
    }
  }
  wXt() {
    this.xXd = undefined;
    LevelFlowResourceManager_1.LevelFlowResourceManager.Release();
  }
  get TreeIncId() {
    return this._rf;
  }
  get TreeNodeId() {
    return this.urf;
  }
  get IsEnd() {
    return this.DUf;
  }
}
exports.LevelFlowModel = LevelFlowModel;
//# sourceMappingURL=LevelFlowModel.js.map