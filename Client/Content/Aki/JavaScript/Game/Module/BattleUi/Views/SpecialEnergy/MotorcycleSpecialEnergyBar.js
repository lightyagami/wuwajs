"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleSpecialEnergyBar = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SpecialEnergyBarMotorcycle_1 = require("./Motorcycle/SpecialEnergyBarMotorcycle");
class MotorcycleSpecialEnergyBar {
  constructor() {
    this.sit = undefined;
    this.EntityId = 0;
    this.kBf = undefined;
    this.rtf = undefined;
    this.qBf = undefined;
    this.OBf = undefined;
    this.GBf = () => {
      this.FBf();
    };
    this.NBf = (t, e) => {
      var i = this.IsEnable();
      if (e) {
        this.VBf();
      } else {
        this.HBf();
      }
      if (i !== this.IsEnable()) {
        this.OBf?.();
      }
    };
  }
  Init(t, e) {
    this.sit = t;
    this.OBf = e;
    this.FBf();
  }
  IsEnable() {
    return this.kBf !== undefined;
  }
  Destroy() {
    this.jBf();
    this.HBf();
    this.rtf = undefined;
  }
  Tick(t) {
    this.kBf?.Tick(t);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.GBf);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.GBf);
  }
  FBf() {
    var t = this.IsEnable();
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
      this.rtf = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.MotorcycleEntityHandle;
      this.$Bf(this.rtf.Entity);
    } else {
      this.jBf();
      this.HBf();
      this.rtf = undefined;
    }
    if (t !== this.IsEnable()) {
      this.OBf?.();
    }
  }
  $Bf(t) {
    t = t.GetComponent(217);
    this.qBf = t.ListenForTagAddOrRemove(923901365, this.NBf);
    if (t.HasTag(923901365)) {
      this.VBf();
    }
  }
  jBf() {
    this.qBf?.EndTask();
    this.qBf = undefined;
  }
  VBf() {
    if (this.kBf) {
      this.HBf();
    }
    this.WBf(this.rtf);
  }
  async WBf(t) {
    this.EntityId = t.Id;
    var e = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(101);
    if (e) {
      this.kBf = new SpecialEnergyBarMotorcycle_1.SpecialEnergyBarMotorcycle();
      this.kBf.InitMotorcycleData(t, e);
      await this.kBf.InitByPathAsync(this.sit, e.PrefabPath);
    }
  }
  HBf() {
    if (this.kBf) {
      this.kBf.Destroy();
      this.kBf = undefined;
    }
  }
}
exports.MotorcycleSpecialEnergyBar = MotorcycleSpecialEnergyBar;
//# sourceMappingURL=MotorcycleSpecialEnergyBar.js.map