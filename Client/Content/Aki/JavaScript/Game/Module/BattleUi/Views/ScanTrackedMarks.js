"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScanTrackedMarks = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapDefine_1 = require("../../Map/MapDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PROFILE_KEY = "ScanTrackedMarks_CreateTrackEffect";
const CENTER_Y = 62.5;
const center = new UE.Vector2D(0, CENTER_Y);
const MAX_A = 1176;
const MARGIN_A = 1008;
const MAX_B = 712.5;
const MARGIN_B = 495;
const OFFSET_Z = 1000;
const MIN_SHOW_DISTANCE = 3;
const MARK_CASE_NAME = new UE.FName("MarkCase");
const spriteColors = ["FF5252FF", "FF5A5FCC", "FFB137FF", "FFC954FF", "BC6AFEFF", "C67FFFFF", "85A3FFFF", "8AA7FFFF", "90B99AFF", "AAD3B3FF", "A5A5A5FF", "D1D1D1FF"];
class ScanTrackedMarks extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, i, s, r, a, h, o, _, n) {
    super();
    this.M$e = undefined;
    this.E$e = undefined;
    this.S$e = (0, puerts_1.$ref)(undefined);
    this.RYe = (0, puerts_1.$ref)(0);
    this.UYe = (0, puerts_1.$ref)(0);
    this.PYe = new UE.Vector2D(0, 0);
    this.A$e = new UE.Vector2D(1, -1);
    this.Smt = 0;
    this.ymt = 0;
    this.yB = undefined;
    this.B8 = 0;
    this.Imt = false;
    this.nr1 = false;
    this.Tmt = 0;
    this.Lmt = 0;
    this.Dmt = undefined;
    this.tat = "";
    this.Wse = Vector_1.Vector.Create();
    this.SPe = undefined;
    this.y$e = 0;
    this.I$e = 0;
    this.Mxe = e => {
      if (e === "Start") {
        this.SPe.PlaySequencePurely("Loop");
      } else if (e === "Close") {
        this.Destroy();
      }
    };
    if (GlobalData_1.GlobalData.World) {
      if (!ScanTrackedMarks.uoe) {
        ScanTrackedMarks.Rmt();
      }
      this.Dmt = t;
      this.tat = s;
      this.yB = h;
      this.Smt = i;
      this.B8 = o;
      this.Imt = _ ?? false;
      this.nr1 = n ?? false;
      this.CreateThenShowByResourceIdAsync("UiItem_Scanning_Prefab", e);
      this.M$e = r || new UE.VectorDouble();
      this.E$e = a;
      t = UiLayer_1.UiLayer.UiRootItem;
      this.y$e = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2);
      this.I$e = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2);
    }
  }
  get Umt() {
    if (this.E$e?.IsValid()) {
      var e = Vector_1.Vector.Create();
      var i = Vector_1.Vector.Create();
      if (this.E$e instanceof TsBaseCharacter_1.default) {
        let t = false;
        var s = this.E$e.Mesh.GetAllSocketNames();
        var r = s.Num();
        for (let e = 0; e < r; e++) {
          if (s.Get(e).op_Equality(MARK_CASE_NAME)) {
            t = true;
            break;
          }
        }
        if (t) {
          i.FromUeVector(this.E$e.Mesh.D_GetSocketLocation(MARK_CASE_NAME));
        } else {
          i.FromUeVector(this.E$e.Mesh.D_K2_GetComponentLocation());
        }
      } else {
        i.FromUeVector(this.E$e.D_K2_GetActorLocation());
      }
      i.Addition(this.yB, e);
      return e.ToUeVector();
    }
    return this.M$e;
  }
  static Rmt() {
    var e = UE.NewObject(UE.TraceLineElement.StaticClass());
    e.WorldContextObject = GlobalData_1.GlobalData.World;
    e.bIsSingle = true;
    e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  Amt(e) {
    var t = this.GetSprite(0);
    var i = this.GetSprite(1);
    var s = this.GetSprite(2);
    var r = this.GetSprite(4);
    t.SetColor(UE.Color.FromHex(spriteColors[this.B8 * 2]));
    i.SetColor(UE.Color.FromHex(spriteColors[this.B8 * 2 + 1]));
    s.SetSprite(e);
    r.SetUIActive(false);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UISprite]];
  }
  OnStart() {
    this.GetText(3)?.SetUIActive(this.Imt);
    this.Amt(this.Dmt);
    var e = UiLayer_1.UiLayer.UiRootItem;
    this.Tmt = e?.GetWidth();
    this.Lmt = e?.GetHeight();
    if (this.tat && this.tat.length > 0) {
      this.ymt = this.Pmt(this.tat);
    }
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.Mxe);
    this.SPe.PlayLevelSequenceByName("Start");
    this.RootItem.SetUIActive(false);
    this.xmt(true);
  }
  Update() {
    if (GlobalData_1.GlobalData.World && this.RootItem && this.E$e?.IsValid()) {
      var t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
      var t = UE.KismetMathLibrary.D_Vector_Distance(t.ToUeVector(), this.Umt) * MapDefine_1.FLOAT_0_01;
      if (t <= this.Smt) {
        this.RootItem.SetUIActive(false);
        this.xmt(true);
      } else {
        var i = Global_1.Global.CharacterController;
        var s = UE.GameplayStatics.D_ProjectWorldToScreen(i, this.Umt, this.S$e);
        if (!s) {
          if (!this.nr1) {
            this.RootItem.SetUIActive(false);
            this.xmt(true);
            return;
          }
          var r = ModelManager_1.ModelManager.CameraModel.CameraTransform;
          var a = r.InverseTransformPositionNoScale(this.Umt);
          a.X = -a.X;
          var r = r.TransformPositionNoScale(a);
          UE.GameplayStatics.D_ProjectWorldToScreen(i, r, this.S$e);
        }
        let e = (0, puerts_1.$unref)(this.S$e);
        i.GetViewportSize(this.RYe, this.UYe);
        var a = (0, puerts_1.$unref)(this.RYe);
        var r = UiLayer_1.UiLayer.UiRootItem;
        if (r) {
          this.PYe.X = r.GetWidth();
          this.PYe.Y = r.GetHeight();
          e = e.op_Multiply(r.GetWidth() / a).op_Subtraction(this.PYe.op_Multiply(0.5)).op_Multiply(this.A$e);
          i = false;
          [e, i] = this.H$e(e, s, this.nr1);
          if (i || this.nr1) {
            r = e.op_Addition(center);
            this.RootItem.SetAnchorOffset(r);
            if (this.nr1) {
              a = this.GetSprite(4);
              if (i) {
                a.SetUIActive(false);
              } else {
                s = Rotator_1.Rotator.Create(0, Math.atan2(e.Y, e.X) * (180 / Math.PI), 0);
                a.SetUIRelativeRotation(s.ToUeRotator());
                a.SetUIActive(true);
              }
            }
            if (this.Imt && (r = Math.round(t), i = this.GetText(3), (s = !Number.isNaN(r) && Number.isFinite(r) && r >= MIN_SHOW_DISTANCE) && LguiUtil_1.LguiUtil.SetLocalText(i, "Meter", r), i.IsUIActiveSelf() !== s)) {
              i.SetUIActive(s);
            }
            this.RootItem.SetUIActive(true);
            this.xmt(false);
          } else {
            this.RootItem.SetUIActive(false);
            this.xmt(true);
          }
        }
      }
    }
  }
  H$e(e, t, i) {
    var s = e.X;
    var r = e.Y;
    var a = this.y$e;
    var h = this.I$e;
    if (i) {
      if (t && s * s / (a * a) + r * r / (h * h) <= 1) {
        return [e, true];
      } else {
        i = a * h / Math.sqrt(h * h * s * s + a * a * r * r);
        return [new UE.Vector2D(s * i, r * i), false];
      }
    } else {
      t = this.Tmt + 10;
      h = this.Lmt + 10;
      if (s < -t || t < s || r < -h || h < r) {
        return [e, false];
      } else {
        return [e, true];
      }
    }
  }
  Pmt(e) {
    var t = ScanTrackedMarks.uoe;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(t, this.M$e);
    t.SetEndLocation(this.M$e.X, this.M$e.Y, this.M$e.Z + OFFSET_Z);
    this.Wse.FromUeVector(this.M$e);
    var i = TraceElementCommon_1.TraceElementCommon.LineTrace(t, PROFILE_KEY);
    var t = t.HitResult;
    if (i && t.bBlockingHit) {
      this.Wse.Z = t.LocationZ_Array.Get(0);
    }
    this.Wse.Z -= 5;
    var i = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, new UE.TransformDouble(), e, "[ScanTrackedMarks.CreateTrackEffect]");
    if (EffectSystem_1.EffectSystem.IsValid(i) && (t = EffectSystem_1.EffectSystem.GetEffectActor(i))?.IsValid()) {
      t.D_K2_SetActorLocationAndRotation(this.Wse.ToUeVector(), Rotator_1.Rotator.ZeroRotator, false, undefined, false);
    }
    return i;
  }
  xmt(e) {
    EffectSystem_1.EffectSystem.SetEffectHidden(this.ymt, e);
  }
  ToClose() {
    if (this.RootItem) {
      if (this.RootItem.bIsUIActive) {
        this.SPe.StopCurrentSequence();
        this.SPe.PlayLevelSequenceByName("Close");
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 31, "[ScanTrackedMarks.ToClose] RootItem is null");
      }
      this.Destroy();
    }
  }
  OnBeforeDestroy() {
    if (this.ymt) {
      EffectSystem_1.EffectSystem.StopEffectById(this.ymt, "[ScanTrackedMarks.Destroy]", true);
      this.ymt = 0;
    }
    this.SPe?.Clear();
  }
  OnBeforeShow() {
    if (!this.E$e || !this.E$e.IsValid()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 31, "[ScanTrackedMarks.OnBeforeShow] TrackingActor is null");
      }
      this.Destroy();
    }
  }
}
exports.ScanTrackedMarks = ScanTrackedMarks;
//# sourceMappingURL=ScanTrackedMarks.js.map