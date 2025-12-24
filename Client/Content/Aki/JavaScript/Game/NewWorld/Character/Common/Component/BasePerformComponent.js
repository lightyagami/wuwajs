"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var i = arguments.length;
  var s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, r);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (n = e[a]) {
        s = (i < 3 ? n(s) : i > 3 ? n(t, o, s) : n(t, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePerformComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PerformMachine_1 = require("./Performance/PerformMachine");
let BasePerformComponent = class BasePerformComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.AnimComp = undefined;
    this.IsInPlotInternal = false;
    this.gj_ = undefined;
    this.InLevelAiControl = () => true;
    this.Cj_ = -1;
    this.pj_ = -1;
    this.vj_ = -1;
  }
  get IsInPlot() {
    return this.IsInPlotInternal;
  }
  OnStart() {
    this.AnimComp = this.Entity.GetComponent(45);
    this.gj_ = new PerformMachine_1.PerformMachine(this);
    this.gj_.Init();
    return true;
  }
  OnClear() {
    this.gj_.Clear();
    return !(this.gj_ = undefined);
  }
  IsMontagePlaying() {
    return this.AnimComp.MontageManager.IsMontagePlaying();
  }
  OnNpcInPlot(e) {
    this.IsInPlotInternal = e;
    this.gj_.Update();
  }
  GetMontagePath(e) {
    let t = undefined;
    if (t = e.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(e.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(e.MontageId)) {
      return t.ActionMontage;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("NPC", 42, "当前MontageId无效,找不到相关蒙太奇配置,请检查注册蒙太奇csv表格", ["EntityId", this.AnimComp.Actor.EntityId], ["MontageId", e.MontageId], ["IsABP", e.IsAbp]);
    }
  }
  GetMontageStateParam(t) {
    if (t) {
      let e = undefined;
      if (e = t.IsAbp ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(t.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(t.MontageId)) {
        return {
          InitStateName: e.InitState,
          EndStateName: e.EndState
        };
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 42, "当前MontageId无效,找不到相关蒙太奇配置,请检查注册蒙太奇csv表格", ["EntityId", this.AnimComp.Actor.EntityId], ["MontageId", t.MontageId], ["IsABP", t.IsAbp]);
      }
    }
  }
  VolatileMontagePlayByLoad(t, e, o, r, n, i = 0, s = 0, a = false) {
    this.pj_ = -1;
    this.Cj_ = ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimMontage, e => {
      this.VolatileMontagePlay(t, e, r, n, o, i, s, a);
    });
    return this.Cj_;
  }
  VolatileMontagePlay(e, t, o, r, n, i = 0, s = 0, a = false) {
    var h = t.CompositeSections.Num();
    let l = 0;
    let m = true;
    if (h === 1) {
      if (s > 0) {
        l = s * t.SequenceLength * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      } else if (s === 0) {
        m = false;
      }
    } else if (h === 3) {
      if (i > 0) {
        l = i * CommonDefine_1.MILLIONSECOND_PER_SECOND;
      } else if (i === 0) {
        m = false;
      }
    }
    this.vj_ = -1;
    this.pj_ = this.PlayPerformMontage(e, {
      MontageAsset: t,
      IsLoop: m,
      OnStartCallback: e => {
        this.vj_ = e;
      },
      OnPlayCallback: o,
      OnEndCallback: r,
      Duration: l > 0 ? l : undefined,
      AnimStateParam: n
    }, undefined, undefined, a);
    return this.pj_;
  }
  VolatileMontageStopByLoad(e, t, o) {
    if (this.Cj_ === t) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
      this.VolatileMontageStop(e, this.pj_, o);
    }
  }
  VolatileMontageStop(e, t, o) {
    if (this.pj_ === t) {
      this.EnableAction(t, false);
      this.StopPerformMontage(e, {
        HandleId: this.vj_,
        Method: o,
        BlendOutTime: 0
      });
      this.AnimComp?.MontageManager.ClearCallback(this.vj_);
      this.Cj_ = -1;
      this.vj_ = -1;
      this.pj_ = -1;
    }
  }
  GetCurrentPerformMode() {
    return this.gj_.GetCurrentMode();
  }
  PlayPerformMontage(e, t, o, r, n = false) {
    var i = t.MontagePath ?? t.MontageAsset?.GetName();
    this.gj_.DoAction(e, 3, {
      TargetStateName: t.AnimStateParam?.InitStateName,
      Context: i
    });
    return this.gj_.DoAction(e, 0, t, o, r, n);
  }
  StopPerformMontage(e, t, o, r) {
    return this.gj_.DoAction(e, 1, t, o, r);
  }
  PerformTurn(e, t, o, r) {
    return this.gj_.DoAction(e, 2, t, o, r);
  }
  PerformSwitchState(e, t, o, r) {
    return this.gj_.DoAction(e, 3, t, o, r);
  }
  EnableAction(e, t) {
    return this.gj_.EnableAction(e, t);
  }
  ClearAction() {
    this.gj_?.CleanAction();
  }
};
BasePerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(47)], BasePerformComponent);
exports.BasePerformComponent = BasePerformComponent; //# sourceMappingURL=BasePerformComponent.js.map