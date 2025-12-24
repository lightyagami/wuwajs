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
    this.rtf = undefined;
    this.otf = 0;
    this.iMf = undefined;
    this.BXd = 0;
    this.xXd = undefined;
    this.aRf = false;
    this.tTm = new Set();
    this.lZf = undefined;
    this.kXd = (e, t) => {
      if (t) {
        if (e.SectionId !== this.xXd.SectionId) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "section回调异常");
          }
        } else {
          this.xXd.Exit();
          this.BXd++;
          if (this.BXd < this.iMf.GetCapacity()) {
            const e = this.iMf.GetSection(this.BXd);
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
      if (this.aRf) {
        this.wXt();
        this.lZf?.(t);
        this.lZf = undefined;
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
    this.iTm = (e, t) => {
      if (t) {
        this.tTm.delete(e);
      }
    };
  }
  InitTaskTreeInfo(e, t) {
    this.rtf = e;
    this.otf = t;
  }
  InitTiTanLevelFlowInfo() {
    this.iMf = new LevelFlowTiTanData_1.LevelFlowTiTanData();
    this.iMf.Init();
  }
  StartLevelFlow(e) {
    if (!(this.iMf.GetCapacity() <= 0)) {
      this.aRf = false;
      this.BXd = e;
      if (e = this.iMf.GetSection(this.BXd)) {
        this.xXd = e;
        this.OXd(e);
      }
    }
  }
  OnTick(e) {
    if (this.xXd) {
      this.xXd.Tick(e);
      for (const t of this.tTm) {
        t.Tick(e);
      }
    }
  }
  OXd(e) {
    e.BindCompleteCallBack(this.kXd);
    e.Enter();
  }
  ResetLevelFlow(e = false) {
    this.aRf = e;
    if (this.xXd) {
      this.xXd.BindResetCompleteCallBack(this.Lrm);
      this.xXd.Reset();
    }
    for (const t of this.tTm) {
      t.Reset();
    }
    this.tTm.clear();
  }
  RollBackLevelFlow(e) {
    this.lZf = e;
    this.ResetLevelFlow(true);
  }
  PushDynamicAction(e) {
    if (!this.IsEnd) {
      if (this.xXd) {
        this.tTm.add(e);
        e.BindCompleteCallBack(this.iTm);
        e.Execute();
      }
    }
  }
  wXt() {
    this.xXd = undefined;
    LevelFlowResourceManager_1.LevelFlowResourceManager.Release();
  }
  get TreeIncId() {
    return this.rtf;
  }
  get TreeNodeId() {
    return this.otf;
  }
  get IsEnd() {
    return this.aRf;
  }
}
exports.LevelFlowModel = LevelFlowModel;
//# sourceMappingURL=LevelFlowModel.js.map