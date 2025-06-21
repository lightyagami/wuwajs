"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelGeneralModel = void 0;
const ModelBase_1 = require("../../Core/Framework/ModelBase"),
  IUtil_1 = require("../../UniverseEditor/Interface/IUtil"),
  GuaranteeActionCenter_1 = require("./Guarantee/GuaranteeActionCenter"),
  LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter"),
  LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter");
class LevelGeneralModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), this.CreatureGenAddTagList = void 0, this.InteractionDebug = !1, this.KUe = void 0, this.gdc = -1
  }
  OnInit() {
    return this.CreatureGenAddTagList = new Map, this.InteractionDebug = !1, this.KUe = new Array, LevelEventCenter_1.LevelEventCenter.RegistEvents(), LevelConditionCenter_1.LevelConditionCenter.RegistConditions(), GuaranteeActionCenter_1.GuaranteeActionCenter.RegGuaranteeActions(), !0
  }
  OnClear() {
    return this.CreatureGenAddTagList = void 0, this.InteractionDebug = !1, !(this.KUe = void 0)
  }
  AddSceneGuaranteeActionInfo(e) {
    this.KUe.push(e)
  }
  PopSceneGuaranteeActionInfo(t) {
    var n = this.KUe;
    for (let e = n.length - 1; 0 <= e; e--) {
      var r = n[e];
      if (r.Name === t.Name && (0, IUtil_1.deepEquals)(r, t)) return n.splice(e, 1), r
    }
  }
  HasSceneGuaranteeActionInfo(t, n) {
    return 0 !== n && this.KUe.some(e => 1 === n ? e.Name === t.Name : e.Name === t.Name && (0, IUtil_1.deepEquals)(e, t))
  }
  RemoveSceneGuaranteeActionInfos() {
    var e = this.KUe;
    return this.KUe = new Array, e
  }
  MakeConditionGroupIncId() {
    return this.gdc += 1, this.gdc
  }
}
exports.LevelGeneralModel = LevelGeneralModel;
//# sourceMappingURL=LevelGeneralModel.js.map