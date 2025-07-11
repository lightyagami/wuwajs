"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HudUnitHandleBase = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Global_1 = require("../../../Global");
const UiLayer_1 = require("../../../Ui/UiLayer");
const HudEntitySet_1 = require("../HudUnitEntity/HudEntitySet");
const CENTER_Y = 62.5;
class HudUnitHandleBase {
  constructor() {
    this.Ioi = new Set();
    this.HudEntitySet = undefined;
    this.R$e = undefined;
    this.x$e = undefined;
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.Toi = undefined;
    this.Due = Vector_1.Vector.Create();
    this.DXe = (0, puerts_1.$ref)(0);
    this.U$e = new UE.Vector2D(0, 0);
    this.A$e = new UE.Vector2D(1, -1);
    this.Loi = -0;
    this.Doi = -0;
    this.bG = new UE.Vector2D(0, CENTER_Y);
    this.Roi = Vector_1.Vector.Create();
    this.w$e = Vector_1.Vector.Create();
    this.IsHudVisible = false;
    this.IsDestroyed = false;
  }
  Initialize() {
    this.R$e = Global_1.Global.CharacterController;
    this.x$e = Global_1.Global.CharacterCameraManager;
    this.Toi = UiLayer_1.UiLayer.GetBattleViewUnit(1);
    this.OnAddEvents();
    this.OnInitialize();
  }
  InitCursorAxis() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorWidthToScreenPercent") / CommonDefine_1.PERCENTAGE_FACTOR;
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("MonsterCursorHeightToScreenPercent") / CommonDefine_1.PERCENTAGE_FACTOR;
    this.Loi = this.Toi.GetWidth() * t;
    this.Doi = this.Toi.GetHeight() * i;
  }
  Destroy() {
    this.OnDestroyed();
    this.OnRemoveEvents();
    this.DestroyAllHudUnit();
    this.IsDestroyed = true;
    this.HudEntitySet?.Clear();
    this.HudEntitySet = undefined;
  }
  Tick(t) {
    this.OnTick(t);
    for (const i of this.Ioi) {
      i.Tick(t);
    }
  }
  AfterTick(t) {
    this.OnAfterTick(t);
    for (const i of this.Ioi) {
      i.AfterTick(t);
    }
  }
  OnInitialize() {}
  OnDestroyed() {}
  OnTick(t) {}
  OnAfterTick(t) {}
  OnShowHud() {
    this.IsHudVisible = true;
  }
  OnHideHud() {
    this.IsHudVisible = false;
  }
  OnInputControllerChanged(t, i) {}
  async NewHudUnit(t, i, e = true, s = false) {
    t = new t();
    await t.Initialize(i, e, s);
    if (!this.IsDestroyed) {
      this.Ioi.add(t);
      return t;
    }
    t.Destroy();
  }
  NewHudUnitWithReturn(t, i, e = true, s, r = false) {
    t = new t();
    const o = t;
    t.Initialize(i, e, r).then(() => {
      if (s) {
        s(o);
      }
    }, () => {});
    this.Ioi.add(t);
    return o;
  }
  DestroyHudUnit(t) {
    if (t) {
      t.Destroy();
      this.Ioi.delete(t);
    }
  }
  DestroyAllHudUnit() {
    for (const t of this.Ioi) {
      t.Destroy();
    }
    this.Ioi.clear();
  }
  NewHudEntitySet() {
    this.HudEntitySet = new HudEntitySet_1.HudEntitySet();
    this.HudEntitySet.Initialize();
  }
  F$e() {
    this.R$e.GetViewportSize(this.DXe, undefined);
    return (0, puerts_1.$unref)(this.DXe);
  }
  V$e() {
    this.U$e.X = this.Toi.GetWidth();
    this.U$e.Y = this.Toi.GetHeight();
    return this.U$e;
  }
  H$e(t, i, e, s) {
    var r = t.X;
    var o = t.Y;
    if (s && r * r / (i * i) + o * o / (e * e) <= 1) {
      return t;
    } else {
      s = i * e / Math.sqrt(e * e * r * r + i * i * o * o);
      return t.op_Multiply(s);
    }
  }
  ScreenPositionToEllipsePosition(t, i) {
    var e = this.F$e();
    var s = this.V$e();
    var t = t.op_Multiply(s.X / e).op_Subtraction(s.op_Multiply(0.5)).op_Multiply(this.A$e);
    return this.H$e(t, this.Loi, this.Doi, i).op_Addition(this.bG);
  }
  Uoi(t, i) {
    i.Subtraction(t, this.Roi);
    return this.Roi;
  }
  K$e() {
    return this.x$e.GetCameraRotation().VectorDouble();
  }
  GetProjectionToFrontPosition(t, i) {
    this.Due.Set(i.X, i.Y, i.Z);
    var i = this.Uoi(t, this.Due);
    var e = this.K$e();
    var e = UE.KismetMathLibrary.D_ProjectVectorOnToVector(i.ToUeVector(), e).op_Multiply(2);
    this.w$e.Set(e.X, e.Y, e.Z);
    i.SubtractionEqual(this.w$e);
    t.Addition(i, this.Due);
    return this.Due;
  }
  ProjectWorldToScreen(t) {
    if (UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, t, this.S$e)) {
      t = (0, puerts_1.$unref)(this.S$e);
      return this.Toi.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t);
    }
  }
  GetInEllipsePosition(t, i) {
    var e = UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, i, this.S$e);
    var s = (0, puerts_1.$unref)(this.S$e);
    if (e) {
      return [this.ScreenPositionToEllipsePosition(s, true), s];
    } else {
      e = this.GetProjectionToFrontPosition(t, i);
      UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, e.ToUeVector(), this.S$e);
      return [this.ScreenPositionToEllipsePosition(s, false), undefined];
    }
  }
}
exports.HudUnitHandleBase = HudUnitHandleBase;
//# sourceMappingURL=HudUnitHandleBase.js.map