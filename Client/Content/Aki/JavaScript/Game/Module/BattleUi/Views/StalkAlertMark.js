"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StalkAlertMark = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const AiAlertClass_1 = require("../../../AI/Controller/AiAlertClass");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const EntityHeadIconItem_1 = require("./EntityHeadIconItem");
const CENTER_Y = 62.5;
const MAX_A = 1176;
const MARGIN_A = 1008;
const MAX_B = 712.5;
const MARGIN_B = 495;
const center = Vector2D_1.Vector2D.Create(0, CENTER_Y);
const ADD_AUDIO_ID = "play_ui_fb_warn";
class StalkAlertMark extends EntityHeadIconItem_1.EntityHeadIconItem {
  constructor(t, i) {
    super();
    this.E$e = undefined;
    this.eCt = undefined;
    this.tCt = undefined;
    this.iCt = undefined;
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.AYe = Vector2D_1.Vector2D.Create();
    this.RYe = (0, puerts_1.$ref)(0);
    this.PYe = Vector2D_1.Vector2D.Create();
    this.A$e = Vector2D_1.Vector2D.Create(1, -1);
    this.oCt = Vector_1.Vector.Create();
    this.rCt = Vector_1.Vector.Create();
    this.nCt = Vector_1.Vector.Create();
    this.DYe = Vector_1.Vector.Create();
    this.sCt = (0, puerts_1.$ref)(0);
    this.aCt = false;
    this.SPe = undefined;
    this.bre = undefined;
    this.y$e = 0;
    this.I$e = 0;
    this.hCt = 0;
    this.lCt = undefined;
    this.bYe = t => {
      var i = 7.776280778151;
      return 367.327774667328 / (1 + Math.pow(t / 537.430940553175, 1.11393060779131)) + i;
    };
    if (GlobalData_1.GlobalData.World) {
      this.CreateThenShowByResourceIdAsync("UiItem_Alert", t);
      this.E$e = i;
      t = UiLayer_1.UiLayer.UiRootItem;
      this.y$e = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2);
      this.I$e = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIItem]];
  }
  OnStart() {
    this.eCt = this.GetSprite(0);
    this.tCt = this.GetSprite(1);
    this.iCt = this.GetItem(2);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SetActive(false);
  }
  Update() {
    if (GlobalData_1.GlobalData.World && this.RootItem) {
      this.qYe();
      if (!this.aCt) {
        this.N$e();
      }
      super.Update();
    }
  }
  qYe() {
    var t;
    var i;
    var e;
    var s = UiLayer_1.UiLayer.UiRootItem;
    var r = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    if (r) {
      e = Global_1.Global.CharacterController;
      if (this.bre?.AiController.CharActorComp?.SkeletalMesh) {
        this.oCt.DeepCopy(this.bre.AiController.CharActorComp.SkeletalMesh.D_K2_GetComponentLocation());
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(this.bre.AiController.CharActorComp, this.oCt, this.bre.AiController.CharActorComp.HalfHeight);
      } else {
        this.oCt.DeepCopy(this.E$e.D_K2_GetActorLocation());
      }
      if (!(t = UE.GameplayStatics.D_ProjectWorldToScreen(e, this.oCt.ToUeVector(), this.S$e))) {
        this.oCt.Subtraction(r, this.rCt);
        i = Global_1.Global.CharacterCameraManager;
        Rotator_1.Rotator.Create(i.GetCameraRotation()).Vector(this.nCt);
        i = UE.KismetMathLibrary.D_ProjectVectorOnToVector(this.rCt.ToUeVector(), this.nCt.ToUeVector()).op_Multiply(2);
        this.DYe.Set(i.X, i.Y, i.Z);
        this.rCt.SubtractionEqual(this.DYe);
        r.Addition(this.rCt, this.oCt);
        UE.GameplayStatics.D_ProjectWorldToScreen(e, this.oCt.ToUeVector(), this.S$e);
      }
      i = (0, puerts_1.$unref)(this.S$e);
      e.GetViewportSize(this.RYe, this.sCt);
      e = (0, puerts_1.$unref)(this.RYe);
      this.AYe.Set(i.X, i.Y);
      this.PYe.Set(s.GetWidth() * 0.5, s.GetHeight() * 0.5);
      this.AYe.MultiplyEqual(s.GetWidth() / e).SubtractionEqual(this.PYe).MultiplyEqual(this.A$e);
      i = this.H$e(this.AYe, t);
      s = this.AYe.AdditionEqual(center);
      if (i) {
        e = Vector_1.Vector.Distance(r, this.oCt);
        s.AdditionEqual(Vector2D_1.Vector2D.Create(0, this.bYe(e)));
      }
      this.RootItem.SetAnchorOffset(s.ToUeVector2D());
      this.iCt?.SetUIActive(!i);
      this.iCt?.SetUIRelativeRotation(new UE.Rotator(0, Math.atan2(s.Y, s.X) * 180 / Math.PI, 0));
    }
  }
  H$e(t, i) {
    var e = t.X;
    var s = t.Y;
    var r = this.y$e;
    var h = this.I$e;
    return !!i && !!(e * e / (r * r) + s * s / (h * h) <= 1) || (i = r * h / Math.sqrt(h * h * e * e + r * r * s * s), t.MultiplyEqual(i), false);
  }
  N$e() {
    var t = this.AiComponent?.AiController.AiAlert.AlertValue ?? 0;
    this.eCt.SetFillAmount(MathUtils_1.MathUtils.Clamp(t, 0, AiAlertClass_1.MAX_ALERT) / AiAlertClass_1.MAX_ALERT);
    if (this.hCt === 0 && t > 0 && (this.lCt === undefined && (this.lCt = ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(ADD_AUDIO_ID)?.Path), this.lCt)) {
      AudioController_1.AudioController.PostEvent(this.lCt, undefined);
    }
    this.hCt = t;
  }
  SetAlertIcon(t) {
    ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LGUISpriteData_BaseObject, t => {
      if (t && t.IsValid() && this && this.RootItem?.IsValid() && this.tCt?.IsValid()) {
        this.tCt.SetSprite(t);
      }
    });
  }
  StopUpdateAlertValue() {
    this.aCt = true;
  }
  ActivateAlertEffect() {
    this.SPe?.PlaySequencePurely("Show");
    this.qYe();
  }
  CheckShowUiCondition() {
    var t;
    if (this.AiComponent) {
      if ((t = this.E$e.WasRecentlyRenderedOnScreen() || this.AiComponent.AiController.AiAlert.CheckInAlertRange() || this.AiComponent.AiController.AiAlert.AlertValue > 0) && !this.GetActive()) {
        this.SetActive(true);
        this.SPe?.PlaySequencePurely("Start");
      }
      if (!t && this.GetActive()) {
        this.SetActive(false);
      }
      return t;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("AI", 42, "警戒NPC不能正常获取AiComponent");
      }
      return false;
    }
  }
  get AiComponent() {
    var t;
    if (!this.bre) {
      t = ActorUtils_1.ActorUtils.GetEntityByActor(this.E$e);
      this.bre = t.Entity.GetComponent(48);
    }
    return this.bre;
  }
}
exports.StalkAlertMark = StalkAlertMark;
//# sourceMappingURL=StalkAlertMark.js.map