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
    this.TLf = undefined;
    this.CJm = undefined;
    this.bLf = undefined;
    this.RLf = undefined;
    this.LLf = () => {
      this.wLf();
    };
    this.PLf = (t, e) => {
      var i = this.IsEnable();
      if (e) {
        this.ALf();
      } else {
        this.DLf();
      }
      if (i !== this.IsEnable()) {
        this.RLf?.();
      }
    };
  }
  Init(t, e) {
    this.sit = t;
    this.RLf = e;
    this.wLf();
  }
  IsEnable() {
    return this.TLf !== undefined;
  }
  Destroy() {
    this.ULf();
    this.DLf();
    this.CJm = undefined;
  }
  Tick(t) {
    this.TLf?.Tick(t);
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.LLf);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.LLf);
  }
  wLf() {
    var t = this.IsEnable();
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
      this.CJm = ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.MotorcycleEntityHandle;
      this.xLf(this.CJm.Entity);
    } else {
      this.ULf();
      this.DLf();
      this.CJm = undefined;
    }
    if (t !== this.IsEnable()) {
      this.RLf?.();
    }
  }
  xLf(t) {
    t = t.GetComponent(215);
    this.bLf = t.ListenForTagAddOrRemove(923901365, this.PLf);
    if (t.HasTag(923901365)) {
      this.ALf();
    }
  }
  ULf() {
    this.bLf?.EndTask();
    this.bLf = undefined;
  }
  ALf() {
    if (this.TLf) {
      this.DLf();
    }
    this.BLf(this.CJm);
  }
  async BLf(t) {
    this.EntityId = t.Id;
    var e = ModelManager_1.ModelManager.BattleUiModel.SpecialEnergyBarData.GetSpecialEnergyBarInfo(101);
    if (e) {
      this.TLf = new SpecialEnergyBarMotorcycle_1.SpecialEnergyBarMotorcycle();
      this.TLf.InitMotorcycleData(t, e);
      await this.TLf.InitByPathAsync(this.sit, e.PrefabPath);
    }
  }
  DLf() {
    if (this.TLf) {
      this.TLf.Destroy();
      this.TLf = undefined;
    }
  }
}
exports.MotorcycleSpecialEnergyBar = MotorcycleSpecialEnergyBar;
//# sourceMappingURL=MotorcycleSpecialEnergyBar.js.map