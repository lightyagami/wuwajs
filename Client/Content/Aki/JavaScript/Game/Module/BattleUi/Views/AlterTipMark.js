"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterTipMark = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const CENTER_Y = 62.5;
const center = Vector2D_1.Vector2D.Create(0, CENTER_Y);
class AlterTipMark extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, e) {
    super();
    this.E$e = undefined;
    this.T$e = Vector_1.Vector.Create();
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.yB = Vector_1.Vector.Create();
    this.LYe = Vector_1.Vector.Create();
    this.DYe = Vector_1.Vector.Create();
    this.RYe = (0, puerts_1.$ref)(0);
    this.UYe = (0, puerts_1.$ref)(0);
    this.AYe = Vector2D_1.Vector2D.Create();
    this.PYe = Vector2D_1.Vector2D.Create();
    this.A$e = Vector2D_1.Vector2D.Create(1, -1);
    this.B$e = 0;
    this.xYe = undefined;
    this.wYe = undefined;
    this.BYe = false;
    this.bYe = t => t * 0.00006 * t - t * 0.2 + 275;
    if (GlobalData_1.GlobalData.World) {
      this.CreateThenShowByResourceIdAsync("UiItem_SneakTip", t);
      this.E$e = i;
      this.BYe = e;
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.wYe = this.GetItem(0);
    this.xYe = this.GetItem(1);
    this.GetItem(0).SetUIActive(false);
    this.GetItem(1).SetUIActive(false);
  }
  Update() {
    if (GlobalData_1.GlobalData.World && this.RootItem) {
      this.qYe();
      if (!this.BYe) {
        this.N$e();
      }
    }
  }
  qYe() {
    var t = UiLayer_1.UiLayer.UiRootItem;
    var i = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    var e = Global_1.Global.CharacterController;
    this.T$e = Vector_1.Vector.Create(this.E$e.D_K2_GetActorLocation());
    var s = UE.GameplayStatics.D_ProjectWorldToScreen(e, this.T$e.ToUeVector(), this.S$e);
    if (!s) {
      this.T$e.Subtraction(i, this.yB);
      s = Global_1.Global.CharacterCameraManager;
      Rotator_1.Rotator.Create(s.GetCameraRotation()).Vector(this.LYe);
      s = UE.KismetMathLibrary.D_ProjectVectorOnToVector(this.yB.ToUeVector(), this.LYe.ToUeVector()).op_Multiply(2);
      this.DYe.Set(s.X, s.Y, s.Z);
      this.yB.SubtractionEqual(this.DYe);
      i.Addition(this.yB, this.T$e);
      UE.GameplayStatics.D_ProjectWorldToScreen(e, this.T$e.ToUeVector(), this.S$e);
    }
    var s = (0, puerts_1.$unref)(this.S$e);
    e.GetViewportSize(this.RYe, this.UYe);
    var e = (0, puerts_1.$unref)(this.RYe);
    this.AYe.Set(s.X, s.Y);
    this.PYe.Set(t.GetWidth() * 0.5, t.GetHeight() * 0.5);
    this.AYe.MultiplyEqual(t.GetWidth() / e).SubtractionEqual(this.PYe).MultiplyEqual(this.A$e);
    var s = this.AYe.AdditionEqual(center);
    var t = Vector_1.Vector.Distance(i, this.T$e);
    s.AdditionEqual(Vector2D_1.Vector2D.Create(0, this.bYe(t)));
    this.RootItem.SetAnchorOffset(s.ToUeVector2D());
  }
  N$e() {
    var t = ActorUtils_1.ActorUtils.GetEntityByActor(this.E$e).Entity.GetComponent(47).AiController.AiAlert.AlertValue;
    if (t > 0) {
      if (this.B$e > 0) {
        return;
      }
      this.wYe.SetUIActive(true);
    } else {
      this.wYe.SetUIActive(false);
    }
    this.xYe.SetUIActive(false);
    this.B$e = t;
  }
  ChangeToError() {
    this.wYe?.SetUIActive(false);
    this.xYe?.SetUIActive(true);
  }
}
exports.AlterTipMark = AlterTipMark;
//# sourceMappingURL=AlterTipMark.js.map