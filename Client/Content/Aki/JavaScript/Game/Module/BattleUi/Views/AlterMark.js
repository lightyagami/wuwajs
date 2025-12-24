"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterMark = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const CENTER_Y = 62.5;
const MAX_A = 1176;
const MARGIN_A = 1008;
const MAX_B = 712.5;
const MARGIN_B = 495;
const center = Vector2D_1.Vector2D.Create(0, CENTER_Y);
const RAD_2_DEG = 180 / Math.PI;
const MAX_ALERT = 100;
const START_FILL_AMOUNT = 0.5;
const NORMAL_COLOR = "B7E6E7FF";
const WARNING_COLOR = "EDDC4DFF";
const ERROR_COLOR = "F01D1BFF";
class AlterMark extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s) {
    super();
    this.M$e = undefined;
    this.E$e = undefined;
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.y$e = 0;
    this.I$e = 0;
    this.T$e = Vector_1.Vector.Create();
    this.L$e = undefined;
    this.D$e = undefined;
    this.$Pe = undefined;
    this.R$e = undefined;
    this.U$e = new UE.Vector2D(0, 0);
    this.A$e = new UE.Vector2D(1, -1);
    this.DXe = (0, puerts_1.$ref)(0);
    this.Due = Vector_1.Vector.Create();
    this.Nme = Vector_1.Vector.Create();
    this.P$e = Vector_1.Vector.Create();
    this.x$e = undefined;
    this.w$e = Vector_1.Vector.Create();
    this.B$e = 0;
    if (GlobalData_1.GlobalData.World) {
      this.CreateThenShowByResourceIdAsync("UiItem_SneakItem_Prefab", t);
      this.M$e = i ? i.ToUeVector() : new UE.VectorDouble();
      this.E$e = s;
      t = UiLayer_1.UiLayer.UiRootItem;
      this.y$e = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2);
      this.I$e = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2);
      this.R$e = Global_1.Global.CharacterController;
      this.x$e = Global_1.Global.CharacterCameraManager;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite]];
  }
  OnStart() {
    this.$Pe = this.GetItem(0);
    this.L$e = this.GetSprite(1);
    this.D$e = this.GetSprite(2);
    this.D$e.SetFillAmount(0);
    this.L$e.SetFillAmount(0);
    this.D$e.SetColor(UE.Color.FromHex(NORMAL_COLOR));
    this.L$e.SetColor(UE.Color.FromHex(NORMAL_COLOR));
    this.GetItem(0).SetUIActive(false);
    this.GetSprite(1).SetUIActive(false);
    this.GetSprite(2).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.M$e = undefined;
    this.E$e = undefined;
    this.S$e = undefined;
    this.T$e = undefined;
    this.L$e = undefined;
    this.D$e = undefined;
    this.$Pe = undefined;
    this.R$e = undefined;
    this.U$e = undefined;
    this.A$e = undefined;
    this.DXe = undefined;
    this.Due = undefined;
    this.Nme = undefined;
    this.P$e = undefined;
    this.x$e = undefined;
    this.w$e = undefined;
  }
  Update() {
    var t;
    if (GlobalData_1.GlobalData.World && this.RootItem) {
      if (!GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()) {
        this.RootItem.SetUIActive(false);
      }
      t = this.b$e();
      this.T$e.Set(t.X, t.Y, t.Z);
      this.RootItem.SetUIActive(true);
      this.$Pe.SetUIActive(true);
      this.L$e.SetUIActive(true);
      this.D$e.SetUIActive(true);
      t = this.q$e(this.E$e);
      t = this.G$e(t);
      this.RootItem.SetUIRelativeRotation(new UE.Rotator(0, Math.atan2(t.Y, t.X) * RAD_2_DEG - 90, 0));
      this.N$e();
    }
  }
  b$e() {
    if (ObjectUtils_1.ObjectUtils.IsValid(this.E$e)) {
      return this.E$e.D_K2_GetActorLocation();
    } else {
      return this.M$e;
    }
  }
  q$e(t) {
    return t.D_K2_GetActorLocation();
  }
  G$e(t) {
    if (UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, t, this.S$e)) {
      const i = (0, puerts_1.$unref)(this.S$e);
      return this.O$e(i, true);
    }
    t = this.k$e(t);
    UE.GameplayStatics.D_ProjectWorldToScreen(this.R$e, t.ToUeVector(), this.S$e);
    const i = (0, puerts_1.$unref)(this.S$e);
    return this.O$e(i, false);
  }
  O$e(t, i) {
    var s = this.F$e();
    var e = this.V$e();
    var t = t.op_Multiply(e.X / s).op_Subtraction(e.op_Multiply(0.5)).op_Multiply(this.A$e);
    return this.H$e(t, this.y$e, this.I$e, i).op_Addition(center.ToUeVector2D());
  }
  F$e() {
    this.R$e.GetViewportSize(this.DXe, undefined);
    return (0, puerts_1.$unref)(this.DXe);
  }
  V$e() {
    var t = UiLayer_1.UiLayer.UiRootItem;
    this.U$e.X = t.GetWidth();
    this.U$e.Y = t.GetHeight();
    return this.U$e;
  }
  H$e(t, i, s, e) {
    var r = t.X;
    var h = t.Y;
    if (e && r * r / (i * i) + h * h / (s * s) <= 1) {
      return t;
    } else {
      e = i * s / Math.sqrt(s * s * r * r + i * i * h * h);
      return t.op_Multiply(e);
    }
  }
  k$e(t) {
    this.Due.Set(t.X, t.Y, t.Z);
    var t = this.j$e();
    var i = this.W$e(this.Due);
    var s = this.K$e();
    var s = UE.KismetMathLibrary.D_ProjectVectorOnToVector(i.ToUeVector(), s).op_Multiply(2);
    this.w$e.Set(s.X, s.Y, s.Z);
    i.SubtractionEqual(this.w$e);
    t.Addition(i, this.Due);
    return this.Due;
  }
  j$e() {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity.GetComponent(1).ActorLocation;
    this.Nme.Set(t.X, t.Y, t.Z);
    return this.Nme;
  }
  W$e(t) {
    var i = this.j$e();
    t.Subtraction(i, this.P$e);
    return this.P$e;
  }
  K$e() {
    return this.x$e.GetCameraRotation().VectorDouble();
  }
  N$e() {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(this.E$e).Entity.GetComponent(48).AiController.AiAlert.AlertValue;
    this.D$e.SetFillAmount(START_FILL_AMOUNT + t / MAX_ALERT / 2);
    this.L$e.SetFillAmount(START_FILL_AMOUNT + t / MAX_ALERT / 2);
    if (t < 50) {
      if (this.B$e !== 0) {
        this.B$e = 0;
        this.D$e.SetColor(UE.Color.FromHex(NORMAL_COLOR));
        this.L$e.SetColor(UE.Color.FromHex(NORMAL_COLOR));
      }
    } else if (t < 80) {
      if (this.B$e !== 50) {
        this.B$e = 50;
        this.D$e.SetColor(UE.Color.FromHex(WARNING_COLOR));
        this.L$e.SetColor(UE.Color.FromHex(WARNING_COLOR));
      }
    } else if (this.B$e !== 80) {
      this.B$e = 80;
      this.D$e.SetColor(UE.Color.FromHex(ERROR_COLOR));
      this.L$e.SetColor(UE.Color.FromHex(ERROR_COLOR));
    }
  }
}
exports.AlterMark = AlterMark;
//# sourceMappingURL=AlterMark.js.map