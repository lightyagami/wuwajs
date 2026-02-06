"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleShieldItem = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const MotorcycleShieldPercentMachine_1 = require("./MotorcycleShieldPercentMachine");
const BREAK_ANIM_TIME = 900;
class MotorcycleShieldItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pst = undefined;
    this.Zcf = undefined;
    this.edf = false;
    this.tdf = undefined;
    this.idf = new MotorcycleShieldPercentMachine_1.MotorcycleShieldPercentMachine();
    this.ExistShield = false;
    this.ExistShieldChanged = undefined;
    this.Hhf = (t, e, i) => {
      this.n4l();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UINiagara]];
  }
  OnStart() {
    this.idf.Duration = 200;
    this.Pst = this.GetSprite(0);
    this.Zcf = this.GetUiNiagara(1);
    this.Zcf.SetUIActive(false);
    this.n4l(true);
    this.Ore();
  }
  OnAfterHide() {
    super.OnAfterHide();
    this.rdf();
  }
  OnBeforeDestroy() {
    this.kre();
    this.MIf(false);
    this.ExistShieldChanged = undefined;
  }
  Ore() {
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(16, this.Hhf);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddMaxListener(16, this.Hhf);
  }
  kre() {
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(16, this.Hhf);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveMaxListener(16, this.Hhf);
  }
  n4l(t = false) {
    var e = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(16);
    var i = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(16);
    var e = i > 0 ? e / i : 0;
    if (t) {
      this.idf.Init(e);
      this.odf(this.idf.GetCurPercent());
    } else {
      if (this.idf.GetTargetPercent() === 0 && this.idf.GetCurPercent() !== 0 && e > 0) {
        this.idf.Init(0);
        this.ndf();
      }
      this.idf.SetTargetPercent(e);
    }
    this.MIf(e > 0);
  }
  MIf(t) {
    if (this.ExistShield !== t) {
      this.ExistShield = t;
      this.ExistShieldChanged?.();
    }
  }
  odf(t) {
    this.Pst?.SetFillAmount(t);
  }
  ndf() {
    if (!this.edf) {
      this.edf = true;
      this.Zcf?.SetUIActive(true);
      this.tdf = TimerSystem_1.TimerSystem.Delay(() => {
        this.tdf = undefined;
        this.edf = false;
        this.Zcf?.SetUIActive(false);
      }, BREAK_ANIM_TIME);
    }
  }
  rdf() {
    if (this.edf) {
      this.edf = false;
      if (this.tdf) {
        TimerSystem_1.TimerSystem.Remove(this.tdf);
        this.tdf = undefined;
      }
      this.Zcf?.SetUIActive(false);
    }
  }
  Tick(t) {
    if (this.idf.Update(t) && (t = this.idf.GetCurPercent(), this.odf(t), t === 0)) {
      this.ndf();
    }
  }
}
exports.MotorcycleShieldItem = MotorcycleShieldItem;
//# sourceMappingURL=MotorcycleShieldItem.js.map