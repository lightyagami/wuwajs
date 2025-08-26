"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputModel = exports.INPUT_COMMAND_TRANSFORM_DT_PATH = undefined;
const ModelBase_1 = require("../../Core/Framework/ModelBase");
const DataTableUtil_1 = require("../../Core/Utils/DataTableUtil");
const Switcher_1 = require("../Utils/Switcher");
const NormalWorldInputData_1 = require("./BattleInputData/NormalWorldInputData");
const TrapDefenseInputData_1 = require("./BattleInputData/TrapDefenseInputData");
const InputLayer_1 = require("./InputLayer");
exports.INPUT_COMMAND_TRANSFORM_DT_PATH = "/Game/Aki/Data/Fight/DT_InputCommandTransform.DT_InputCommandTransform";
class InputModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.jMe = new Map([[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0]]);
    this.WMe = new Array();
    this.KMe = new Map();
    this.ZPu = new Map();
    this.QMe = new Map();
    this.whh = new Map();
    this.OnlyMoveForward = new Switcher_1.Switcher(false);
    this.IsOpenInputAxisLog = false;
    this.Ze_ = undefined;
    this.et_ = false;
    this.z9u = new Map();
    this.J9u = 0;
    this.eKa = false;
  }
  OnInit() {
    this.z9u.set(0, new NormalWorldInputData_1.NormalWorldInputData(0));
    this.z9u.set(1, new TrapDefenseInputData_1.TrapDefenseInputData(1));
    return true;
  }
  SetCurrentInputDataType(t) {
    this.J9u = t;
  }
  GetCurrentInputData() {
    return this.z9u.get(this.J9u);
  }
  GetInputData(t) {
    return this.z9u.get(t);
  }
  GetHandlers() {
    return this.WMe;
  }
  GetPressTimes() {
    return this.KMe;
  }
  GetHoldTimes() {
    return this.ZPu;
  }
  GetHoldTime(t) {
    if (this.ZPu.has(t)) {
      return this.ZPu.get(t);
    }
  }
  SetHoldTime(t, e) {
    this.ZPu.set(t, e ?? 0);
  }
  GetAxisValues() {
    return this.QMe;
  }
  get LastClearAxisValue() {
    return this.eKa;
  }
  ResetLastTemporaryClearAxisValues() {
    this.eKa = false;
  }
  TemporaryClearAxisValues() {
    this.eKa = true;
    this.QMe.clear();
  }
  NextFrameRefreshAxisValues() {
    this.eKa = true;
  }
  QueryCommandPriority(t) {
    return this.jMe.get(t);
  }
  AddInputHandler(t) {
    if (!this.WMe.includes(t)) {
      this.WMe.push(t);
      this.WMe.sort((t, e) => e.GetPriority() - t.GetPriority());
    }
  }
  IsAxisBlock(t) {
    for (const e of this.WMe) {
      if (e.GetInputFilter().BlockAxis(t)) {
        return true;
      }
    }
    return false;
  }
  RemoveInputHandler(t) {
    t = this.WMe.indexOf(t);
    if (t !== -1) {
      this.WMe.splice(t, 1);
    }
  }
  OnClear() {
    this.WMe.splice(0, this.WMe.length);
    this.KMe.clear();
    this.ZPu.clear();
    this.QMe.clear();
    for (const t of this.whh.values()) {
      t.Clear();
    }
    this.whh.clear();
    return true;
  }
  AddInputLayer(t, e) {
    let r = this.whh.get(t);
    if (!r) {
      r = new InputLayer_1.InputLayerUnit();
      this.whh.set(t, r);
    }
    r.Add(e);
  }
  RemoveInputLayer(t) {
    var e = this.whh.get(t.UnitId);
    if (e && (e.Remove(t), e.LayerMap.size === 0)) {
      this.whh.delete(t.UnitId);
    }
  }
  GetInputLayer(t, e) {
    return this.whh.get(t)?.LayerMap.get(e);
  }
  GetInputLayers(t) {
    return this.whh.get(t)?.GetLayerList();
  }
  GetInputCommandTransformData(t, e) {
    if (!this.et_) {
      this.InitInputCommandTransformMap();
    }
    if (this.Ze_) {
      return this.Ze_.get(t)?.get(e);
    }
  }
  InitInputCommandTransformMap() {
    if (!this.et_) {
      this.et_ = true;
      var t;
      var e = new Map();
      for (const r of DataTableUtil_1.DataTableUtil.GetDataTableAllRow(23)) {
        if (r.Action !== 0 && r.State !== 0 && r.Tag.TagName !== "None") {
          if (!e.has(r.Action)) {
            e.set(r.Action, new Map());
          }
          if ((t = e.get(r.Action)).has(r.State)) {
            t.get(r.State).push(r);
          } else {
            t.set(r.State, [r]);
          }
        }
      }
      this.Ze_ = e;
    }
  }
}
exports.InputModel = InputModel;
//# sourceMappingURL=InputModel.js.map