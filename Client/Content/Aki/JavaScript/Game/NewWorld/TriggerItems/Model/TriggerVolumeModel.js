"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggerVolumeModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class TriggerVolumeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Ksr = undefined;
  }
  OnInit() {
    this.Ksr = new Map();
    return true;
  }
  AddTriggerVolume(e, r, o) {
    let t = this.Ksr.get(e);
    if (!t) {
      t = new Map();
      this.Ksr.set(e, t);
    }
    t.set(r, o);
  }
  RemoveTriggerVolume(e, r) {
    e = this.Ksr.get(e);
    if (e) {
      e.delete(r);
    }
  }
  GetTriggerVolume(e, r) {
    e = this.Ksr.get(e);
    if (e) {
      return e.get(r);
    }
  }
  OnClear() {
    return !(this.Ksr = undefined);
  }
}
exports.TriggerVolumeModel = TriggerVolumeModel;
//# sourceMappingURL=TriggerVolumeModel.js.map