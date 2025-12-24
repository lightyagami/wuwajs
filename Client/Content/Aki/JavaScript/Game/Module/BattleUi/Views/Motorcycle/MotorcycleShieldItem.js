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
    this.tuf = undefined;
    this.iuf = false;
    this.ruf = undefined;
    this.ouf = new MotorcycleShieldPercentMachine_1.MotorcycleShieldPercentMachine();
    this.ExistShield = false;
    this.ExistShieldChanged = undefined;
    this.gsf = (t, e, i) => {
      this.n4l();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UINiagara]];
  }
  OnStart() {
    this.ouf.Duration = 200;
    this.Pst = this.GetSprite(0);
    this.tuf = this.GetUiNiagara(1);
    this.tuf.SetUIActive(false);
    this.n4l(true);
    this.Ore();
  }
  OnAfterHide() {
    super.OnAfterHide();
    this.nuf();
  }
  OnBeforeDestroy() {
    this.kre();
    this.xSf(false);
    this.ExistShieldChanged = undefined;
  }
  Ore() {
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddValueListener(16, this.gsf);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.AddMaxListener(16, this.gsf);
  }
  kre() {
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveValueListener(16, this.gsf);
    ControllerHolder_1.ControllerHolder.FormationAttributeController.RemoveMaxListener(16, this.gsf);
  }
  n4l(t = false) {
    var e = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetValue(16);
    var i = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(16);
    var e = i > 0 ? e / i : 0;
    if (t) {
      this.ouf.Init(e);
      this.suf(this.ouf.GetCurPercent());
    } else {
      if (this.ouf.GetTargetPercent() === 0 && this.ouf.GetCurPercent() !== 0 && e > 0) {
        this.ouf.Init(0);
        this.auf();
      }
      this.ouf.SetTargetPercent(e);
    }
    this.xSf(e > 0);
  }
  xSf(t) {
    if (this.ExistShield !== t) {
      this.ExistShield = t;
      this.ExistShieldChanged?.();
    }
  }
  suf(t) {
    this.Pst?.SetFillAmount(t);
  }
  auf() {
    if (!this.iuf) {
      this.iuf = true;
      this.tuf?.SetUIActive(true);
      this.ruf = TimerSystem_1.TimerSystem.Delay(() => {
        this.ruf = undefined;
        this.iuf = false;
        this.tuf?.SetUIActive(false);
      }, BREAK_ANIM_TIME);
    }
  }
  nuf() {
    if (this.iuf) {
      this.iuf = false;
      if (this.ruf) {
        TimerSystem_1.TimerSystem.Remove(this.ruf);
        this.ruf = undefined;
      }
      this.tuf?.SetUIActive(false);
    }
  }
  Tick(t) {
    if (this.ouf.Update(t) && (t = this.ouf.GetCurPercent(), this.suf(t), t === 0)) {
      this.auf();
    }
  }
}
exports.MotorcycleShieldItem = MotorcycleShieldItem;
//# sourceMappingURL=MotorcycleShieldItem.js.map