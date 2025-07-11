"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManipulateConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const DataTableUtil_1 = require("../../../../Core/Utils/DataTableUtil");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const SECOND_TO_MICROSECOND = 1000;
class ManipulateConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this._nr = undefined;
    this.unr = -0;
    this.cnr = -0;
    this.mnr = undefined;
    this.gnr = [];
    this.fnr = [];
    this.pnr = -0;
    this.vnr = -0;
    this.Mnr = "";
    this.Enr = "";
    this.Snr = "";
    this.Qsl = "";
    this.Inr = -0;
    this.Tnr = -0;
    this.Lnr = -0;
  }
  OnInit() {
    this._nr = new Array("Manipulate_Precast_Line_L", "Manipulate_Precast_Line_R", "Manipulate_Precast_Line_F", "Manipulate_Precast_Line_B");
    this.unr = CommonParamById_1.configCommonParamById.GetIntConfig("ManipulatableItemDisconnectDistance");
    this.cnr = CommonParamById_1.configCommonParamById.GetIntConfig("ManipulatableItemSearchRange");
    this.mnr = CommonParamById_1.configCommonParamById.GetStringConfig("ManipulatableItemPushFXAsset");
    this.gnr = new Array();
    CommonParamById_1.configCommonParamById.GetIntArrayConfig("ManipulatebleItemSearchAngle").forEach(t => {
      this.gnr.push(t);
    });
    this.fnr = new Array();
    CommonParamById_1.configCommonParamById.GetIntArrayConfig("ManipulatebleItemSearchAngleWeight").forEach(t => {
      this.fnr.push(t);
    });
    this.pnr = CommonParamById_1.configCommonParamById.GetFloatConfig("ManipulatePrecastTime") * SECOND_TO_MICROSECOND;
    this.vnr = CommonParamById_1.configCommonParamById.GetIntConfig("ManipulateDontUseLineDistance");
    this.Mnr = CommonParamById_1.configCommonParamById.GetStringConfig("ManipulateItemLine_Common");
    this.Enr = CommonParamById_1.configCommonParamById.GetStringConfig("ManipulatableItemLineNiagaraSystemAssetPath");
    this.Snr = CommonParamById_1.configCommonParamById.GetStringConfig("ManipulatableItemHandFXAssetPath");
    this.Qsl = CommonParamById_1.configCommonParamById.GetStringConfig("MatControllerDAPath");
    this.Inr = CommonParamById_1.configCommonParamById.GetFloatConfig("ManipulatableItemMass");
    this.Tnr = CommonParamById_1.configCommonParamById.GetFloatConfig("ManipulatableItemLinearDamping");
    this.Lnr = CommonParamById_1.configCommonParamById.GetFloatConfig("ManipulatableItemAngularDamping");
    return true;
  }
  get ManipulatePrecastLines() {
    return this._nr;
  }
  get DisconnectDistance() {
    return this.unr;
  }
  get SearchRange() {
    return this.cnr;
  }
  get PushEffectPath() {
    return this.mnr;
  }
  get SearchAnglesCos() {
    return this.gnr;
  }
  get SearchAnglesWeight() {
    return this.fnr;
  }
  get PrecastTime() {
    return this.pnr;
  }
  get DontUseLineDistance() {
    return this.vnr;
  }
  get CommonItemLine() {
    return this.Mnr;
  }
  get LineFxNsPath() {
    return this.Enr;
  }
  get MatControllerDaPath() {
    return this.Qsl;
  }
  get HandFxPath() {
    return this.Snr;
  }
  get ItemMass() {
    return this.Inr;
  }
  get ItemLinearDamping() {
    return this.Tnr;
  }
  get ItemAngularDampling() {
    return this.Lnr;
  }
  GetPrecastLineValue(t, e) {
    var a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(10, t);
    if (a) {
      return this.Dnr(a.ManipulatePoints, a.Duration, e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 31, "加载失败，Manipulate Precast表中没有该项", ["Row Name", t]);
    }
  }
  GetItemLineValue(t, e) {
    var a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(9, t);
    if (a) {
      return this.Dnr(a.ManipulatePoints, a.Duration, e);
    }
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 31, "加载失败，Manipulate Item表中没有该项", ["Row Name", t]);
    }
  }
  Dnr(t, e, a) {
    var i = t.Num();
    var e = (i - 1) / e;
    if (a <= 0) {
      return t.Get(0).Location;
    } else if (a >= 1) {
      return t.Get(i - 1).Location;
    } else {
      i = a * e;
      a = Math.floor(i);
      e = t.Get(a);
      t = t.Get(a + 1);
      if (e.PointType !== 2) {
        i = i - a;
        if (e.PointType === 0) {
          return MathUtils_1.MathUtils.LerpVectorOld(e.Location, t.Location, i);
        } else {
          return this.Rnr(e.Location, e.LeaveTangent, t.Location, t.ArriveTangent, i);
        }
      } else {
        return e.Location;
      }
    }
  }
  OnClear() {
    this._nr = undefined;
    return !(this.mnr = undefined);
  }
  Rnr(t, e, a, i, r) {
    var n = r * r;
    var s = n * r;
    var o = s * 2 - n * 3 + 1;
    var r = s - n * 2 + r;
    var m = s - n;
    var s = s * -2 + n * 3;
    var n = Vector_1.Vector.Create(t).MultiplyEqual(o);
    var t = Vector_1.Vector.Create(e).MultiplyEqual(r);
    var o = Vector_1.Vector.Create(i).MultiplyEqual(m);
    var e = Vector_1.Vector.Create(a).MultiplyEqual(s);
    n.AdditionEqual(t).AdditionEqual(o).AdditionEqual(e);
    return n.ToUeVectorOld();
  }
}
exports.ManipulateConfig = ManipulateConfig;
//# sourceMappingURL=ManipulateConfig.js.map