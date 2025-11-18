"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelGeneralModel = undefined;
const ModelBase_1 = require("../../Core/Framework/ModelBase");
const IUtil_1 = require("../../UniverseEditor/Interface/IUtil");
const ModelManager_1 = require("../Manager/ModelManager");
const GuaranteeActionCenter_1 = require("./Guarantee/GuaranteeActionCenter");
const LevelConditionCenter_1 = require("./LevelConditions/LevelConditionCenter");
const LevelEventCenter_1 = require("./LevelEvents/LevelEventCenter");
const LevelListenerCenter_1 = require("./LevelListeners/LevelListenerCenter");
class LevelGeneralModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CreatureGenAddTagList = undefined;
    this.InteractionDebug = false;
    this.KUe = undefined;
    this.uFd = new Map();
    this.gdc = -1;
  }
  OnInit() {
    this.CreatureGenAddTagList = new Map();
    this.InteractionDebug = false;
    this.KUe = new Array();
    LevelEventCenter_1.LevelEventCenter.RegistEvents();
    LevelConditionCenter_1.LevelConditionCenter.RegistConditions();
    GuaranteeActionCenter_1.GuaranteeActionCenter.RegGuaranteeActions();
    LevelListenerCenter_1.LevelListenerCenter.Init();
    return true;
  }
  OnClear() {
    this.CreatureGenAddTagList = undefined;
    this.InteractionDebug = false;
    this.KUe = undefined;
    this.uFd.clear();
    LevelListenerCenter_1.LevelListenerCenter.Clear();
    return true;
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
  AddEntityGuaranteeActionInfo(e, t) {
    if (e && (e = ModelManager_1.ModelManager.CharacterModel.GetHandle(e))?.Valid) {
      if (!this.uFd.has(e)) {
        this.uFd.set(e, new Array());
      }
      this.uFd.get(e).push(t);
    }
  }
  PopEntityGuaranteeActionInfo(e, t) {
    if (e) {
      var n = ModelManager_1.ModelManager.CharacterModel.GetHandle(e);
      if (n?.Valid && this.uFd.has(n)) {
        var r = this.uFd.get(n);
        for (let e = r.length - 1; e >= 0; e--) {
          var i = r[e];
          if (i.Name === t.Name) {
            r.splice(e, 1);
            if (r.length === 0) {
              this.uFd.delete(n);
            } else {
              this.uFd.set(n, r);
            }
            return i;
          }
        }
      }
    }
  }
  HasEntityGuaranteeActionInfo(e, t, n) {
    return !!e && n !== 0 && !!(e = ModelManager_1.ModelManager.CharacterModel.GetHandle(e))?.Valid && !!this.uFd.has(e) && this.uFd.get(e).some(e => n === 1 ? e.Name === t.Name : e.Name === t.Name && (0, IUtil_1.deepEquals)(e, t));
  }
  RemoveEntityGuaranteeActionInfos(t) {
    if (this.uFd.has(t)) {
      let e = undefined;
      if (t?.Valid) {
        e = this.uFd.get(t);
      }
      this.uFd.delete(t);
      return e;
    }
  }
  GetEntityGuaranteeActionInfos() {
    return this.uFd;
  }
  ClearEntityGuaranteeActionInfos() {
    this.uFd.clear();
  }
}
exports.LevelGeneralModel = LevelGeneralModel;
//# sourceMappingURL=LevelGeneralModel.js.map