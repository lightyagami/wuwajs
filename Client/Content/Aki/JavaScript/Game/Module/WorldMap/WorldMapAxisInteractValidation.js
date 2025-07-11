"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapAxisInteractValidation = undefined;
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
class WorldMapAxisInteractValidation {
  constructor() {
    this.kpl = false;
    this.Opl = new Map();
    this.Npl = () => {
      this.kpl = true;
    };
  }
  Reset() {
    this.kpl = false;
    for (const t of this.Opl.keys()) {
      this.InitAxisLock(t);
    }
  }
  InitAxisLock(t) {
    var e = ModelManager_1.ModelManager.InputDistributeModel.GetAxisValue(t);
    this.Opl.set(t, e !== 0);
  }
  Init() {
    this.dde();
  }
  Clear() {
    this.Cde();
    this.Opl.clear();
    this.kpl = false;
  }
  dde() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapViewOpened, this.Npl);
  }
  Cde() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapViewOpened, this.Npl);
  }
  InputAxis(t, e) {
    if (this.IsAxisInValid(t) && this.kpl && e === 0) {
      for (const t of this.Opl.keys()) {
        this.Opl.set(t, false);
      }
    }
  }
  get IsInValid() {
    for (const t of this.Opl.values()) {
      if (t) {
        return true;
      }
    }
    return false;
  }
  IsAxisInValid(t) {
    return this.Opl.get(t) ?? false;
  }
}
exports.WorldMapAxisInteractValidation = WorldMapAxisInteractValidation;
//# sourceMappingURL=WorldMapAxisInteractValidation.js.map