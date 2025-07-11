"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGeneralModel = undefined;
const ModelBase_1 = require("../../Core/Framework/ModelBase");
const IUtil_1 = require("../../UniverseEditor/Interface/IUtil");
const GuaranteeActionCenter_1 = require("./Guarantee/GuaranteeActionCenter");
const LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter");
const LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter");
class LevelGeneralModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CreatureGenAddTagList = undefined;
    this.InteractionDebug = false;
    this.KUe = undefined;
    this.gdc = -1;
  }
  OnInit() {
    this.CreatureGenAddTagList = new Map();
    this.InteractionDebug = false;
    this.KUe = new Array();
    LevelEventCenter_1.LevelEventCenter.RegistEvents();
    LevelConditionCenter_1.LevelConditionCenter.RegistConditions();
    GuaranteeActionCenter_1.GuaranteeActionCenter.RegGuaranteeActions();
    return true;
  }
  OnClear() {
    this.CreatureGenAddTagList = undefined;
    this.InteractionDebug = false;
    return !(this.KUe = undefined);
  }
  AddSceneGuaranteeActionInfo(e) {
    this.KUe.push(e);
  }
  PopSceneGuaranteeActionInfo(t) {
    var n = this.KUe;
    for (let e = n.length - 1; e >= 0; e--) {
      var r = n[e];
      if (r.Name === t.Name && (0, IUtil_1.deepEquals)(r, t)) {
        n.splice(e, 1);
        return r;
      }
    }
  }
  HasSceneGuaranteeActionInfo(t, n) {
    return n !== 0 && this.KUe.some(e => n === 1 ? e.Name === t.Name : e.Name === t.Name && (0, IUtil_1.deepEquals)(e, t));
  }
  RemoveSceneGuaranteeActionInfos() {
    var e = this.KUe;
    this.KUe = new Array();
    return e;
  }
  MakeConditionGroupIncId() {
    this.gdc += 1;
    return this.gdc;
  }
}
exports.LevelGeneralModel = LevelGeneralModel;
//# sourceMappingURL=LevelGeneralModel.js.map