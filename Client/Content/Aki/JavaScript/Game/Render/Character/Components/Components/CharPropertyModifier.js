"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharPropertyModifier = exports.PropertyTimeCounter = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const RenderUtil_1 = require("../../../Utils/RenderUtil");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
const CharMaterialContainer_1 = require("../MaterialContainer/CharMaterialContainer");
const CharMaterialContainerV2_1 = require("./CharMaterialContainerV2");
class PropertyTimeCounter {
  constructor() {
    this.Id = 0;
    this.Factor = -0;
    this.WholeTime = -0;
    this.Counter = -0;
    this.BodyType = 0;
    this.SectionIndex = 0;
    this.SlotType = 0;
    this.PropertyName = undefined;
    this.CurveFloatData = undefined;
    this.CurveColorData = undefined;
    this.DataType = 0;
  }
  Init(t, e, i, r, o, s, n, a, h) {
    this.Id = t;
    this.BodyType = e;
    this.SectionIndex = i;
    this.SlotType = r;
    this.PropertyName = o;
    this.WholeTime = a;
    this.DataType = h;
    this.Counter = 0;
    switch (this.DataType) {
      case 0:
        this.CurveFloatData = s;
        this.CurveColorData = undefined;
        break;
      case 1:
        this.CurveColorData = n;
        this.CurveFloatData = undefined;
    }
  }
}
exports.PropertyTimeCounter = PropertyTimeCounter;
class CharPropertyModifier extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.Uhr = undefined;
    this.Ahr = undefined;
    this.Phr = 0;
    this.xhr = undefined;
  }
  Start() {
    this.Phr = 0;
    this.Ahr = new Map();
    this.xhr = [];
    if (this.RenderComponent.UseMaterialContainerV2) {
      this.Uhr = this.RenderComponent.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    } else {
      this.Uhr = this.RenderComponent.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer);
    }
    if (this.Uhr) {
      this.OnInitSuccess();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RenderCharacter", 25, "材质属性编辑器初始化失败，不存在CharMaterialContainer", ["Actor", this.GetRenderingComponent().GetOwner().GetName()]);
    }
  }
  UpdateCurveData(t, e) {
    var i;
    e.Factor = e.Counter / e.WholeTime;
    if (e.DataType === 0) {
      i = RenderUtil_1.RenderUtil.GetFloat(e.CurveFloatData, e.Factor);
      this.SetPropertyFloat(e.BodyType, e.SectionIndex, e.SlotType, e.PropertyName, i);
    } else {
      i = RenderUtil_1.RenderUtil.GetColor(e.CurveColorData, e.Factor);
      this.SetPropertyColor(e.BodyType, e.SectionIndex, e.SlotType, e.PropertyName, i);
    }
    e.Counter += t;
  }
  Update() {
    var t = this.GetDeltaTime();
    for (const e of this.Ahr.values()) {
      this.UpdateCurveData(t, e);
    }
    for (const i of this.Ahr.values()) {
      if (i.Counter >= i.WholeTime) {
        this.xhr.push(i.Id);
      }
    }
    if (this.xhr.length > 0) {
      for (const r of this.xhr) {
        this.Ahr.delete(r);
      }
      this.xhr = [];
    }
  }
  SetPropertyFloat(t, e, i, r, o) {
    return !!r && (e >= 0 && Log_1.Log.CheckError() && Log_1.Log.Error("RenderCharacter", 25, "SetColor: 不支持指定SectionIndex"), this.Uhr instanceof CharMaterialContainer_1.CharMaterialContainer ? (this.Uhr.SetFloat(r, o, t, i), true) : this.Uhr instanceof CharMaterialContainerV2_1.CharMaterialContainerV2 && (this.Uhr.SetFloatUpdateParamPermanent(r, o, t, i), true));
  }
  SetPropertyColor(t, e, i, r, o) {
    return !!r && (e >= 0 && Log_1.Log.CheckError() && Log_1.Log.Error("RenderCharacter", 25, "SetColor: 不支持指定SectionIndex"), this.Uhr instanceof CharMaterialContainer_1.CharMaterialContainer ? (this.Uhr.SetColor(r, o, t, i), true) : this.Uhr instanceof CharMaterialContainerV2_1.CharMaterialContainerV2 && (this.Uhr.SetColorUpdateParamPermanent(r, o, t, i), true));
  }
  SetPropertyLinearFloat(t, e, i, r, o, s = -1) {
    if (this.Uhr !== undefined) {
      if (!(s < 0)) {
        if (e >= 0 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 25, "SetPropertyLinearFloat: 不支持指定SectionIndex");
        }
        s = RenderUtil_1.RenderUtil.GetFloat(o.FloatData, s);
        if (this.Uhr instanceof CharMaterialContainer_1.CharMaterialContainer) {
          this.Uhr.SetFloat(r, s, t, i);
        } else if (this.Uhr instanceof CharMaterialContainerV2_1.CharMaterialContainerV2) {
          this.Uhr.SetFloatUpdateParamPermanent(r, s, t, i);
        }
        return true;
      }
      this.Phr++;
      (s = new PropertyTimeCounter()).Init(this.Phr, t, e, i, r, o.FloatData, undefined, o.Time, 0);
      this.Ahr.set(this.Phr, s);
    }
    return false;
  }
  SetPropertyLinearColor(t, e, i, r, o, s = -1) {
    if (this.Uhr !== undefined) {
      if (!(s < 0)) {
        if (e >= 0 && Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderCharacter", 25, "SetPropertyLinearColor: 不支持指定SectionIndex");
        }
        s = RenderUtil_1.RenderUtil.GetColor(o.LinearColor, s);
        if (this.Uhr instanceof CharMaterialContainer_1.CharMaterialContainer) {
          this.Uhr.SetColor(r, s, t, i);
        } else if (this.Uhr instanceof CharMaterialContainerV2_1.CharMaterialContainerV2) {
          this.Uhr.SetColorUpdateParamPermanent(r, s, t, i);
        }
        return true;
      }
      this.Phr++;
      (s = new PropertyTimeCounter()).Init(this.Phr, t, e, i, r, undefined, o.LinearColor, o.Time, 1);
      this.Ahr.set(this.Phr, s);
    }
    return false;
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdPropertyModifier;
  }
  GetStatName() {
    return "CharPropertyModifier";
  }
}
exports.CharPropertyModifier = CharPropertyModifier;
//# sourceMappingURL=CharPropertyModifier.js.map