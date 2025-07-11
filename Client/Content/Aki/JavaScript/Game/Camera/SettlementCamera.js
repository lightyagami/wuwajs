"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettlementCamera = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const Macro_1 = require("../../Core/Preprocessor/Macro");
const DataTableUtil_1 = require("../../Core/Utils/DataTableUtil");
const MathCommon_1 = require("../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ColorUtils_1 = require("../Utils/ColorUtils");
const CameraUtility_1 = require("./CameraUtility");
const MIN_CAMERA_DISTANCE = 100;
const TARGET_PITCH_MIN = -5;
const TARGET_PITCH_MAX = -8;
const TRACE_TOP_ADDITION_Z = 50;
const TRACE_BOTTOM_ADDITION_Z = 50;
const LEFT_YAW_RANGE_MIN = -180;
const LEFT_YAW_RANGE_MAX = 0;
const RIGHT_YAW_RANGE_MIN = 0;
const RIGHT_YAW_RANGE_MAX = 180;
const MIN_VALID_YAW_RANGE = 0;
const MIN_SHAPE_RADUIS = 30;
const MAX_CACHE_CAPSULE_COUNT = 4;
const PTICH_MAX = 90;
const PITCH_MIN = -90;
const MINUS_FLAT_ANGLE = -180;
const FLAT_ANGLE = 180;
const PROFILE_KEY = "FightCameraLogicComponent_TraceValidRange_Camera";
const DEBUG_DRAW_DURATION = 10;
const DEBUG_DRAW_RADIUS = 10;
const DEBUG_DRAW_SEGMENTS = 12;
const THICKNESS = 5;
class YawRange {
  constructor(t, i) {
    this.Min = 0;
    this.Max = 0;
    this.Min = t;
    this.Max = i;
  }
}
class SettlementCamera {
  constructor() {
    this.Hh = undefined;
    this.Ime = MIN_CAMERA_DISTANCE;
    this.Fse = undefined;
    this.Tme = undefined;
    this.Lme = undefined;
    this.Dme = MIN_CAMERA_DISTANCE;
    this.Rme = TARGET_PITCH_MIN;
    this.Ume = TARGET_PITCH_MAX;
    this.Ame = TRACE_TOP_ADDITION_Z;
    this.Pme = TRACE_BOTTOM_ADDITION_Z;
    this.xme = LEFT_YAW_RANGE_MIN;
    this.wme = LEFT_YAW_RANGE_MAX;
    this.Bme = RIGHT_YAW_RANGE_MIN;
    this.bme = RIGHT_YAW_RANGE_MAX;
    this.qme = MIN_VALID_YAW_RANGE;
    this.xea = Vector_1.Vector.Create();
    this.Gme = 0;
    this.Nme = undefined;
    this.Ome = Rotator_1.Rotator.Create();
    this.kme = new Map();
    this.Fme = new Map();
    this.Vme = new Map();
    this.Hme = (0, puerts_1.$ref)(undefined);
    this.jme = [];
    this.Wme = [];
    this.Kme = [];
    this.Lz = Vector_1.Vector.Create();
    this.Tz = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.Qme = [];
    this.EnableDebugDraw = false;
  }
  Init(t) {
    this.Hh = t;
    this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Fse.bIsSingle = false;
    this.Fse.bTraceComplex = false;
    this.Fse.bIgnoreSelf = true;
  }
  E5l(t) {
    t = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(22, t);
    if (t && t.CameraModifier) {
      this.Tme = t;
      this.Lme = t.CameraModifier;
      this.Dme = this.Lme.Settings.ArmLength;
      if (this.Dme < MIN_CAMERA_DISTANCE) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】臂长配置过小:${this.Dme},将自动修正为:${MIN_CAMERA_DISTANCE}`);
        }
        this.Dme = MIN_CAMERA_DISTANCE;
      }
      this.Rme = this.Tme.MinRandomPitch;
      if (this.Rme > PTICH_MAX || this.Rme < PITCH_MIN) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】最小Pitch配置不正确:${this.Rme},合理区间为(${PITCH_MIN},${PTICH_MAX}),将自动修正为:${TARGET_PITCH_MIN}`);
        }
        this.Rme = TARGET_PITCH_MIN;
      }
      this.Ume = this.Tme.MaxRandomPitch;
      if (this.Ume > PTICH_MAX || this.Ume < PITCH_MIN) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】最大Pitch配置不正确:${this.Ume},合理区间为(${PITCH_MIN},${PTICH_MAX}),将自动修正为:${TARGET_PITCH_MAX}`);
        }
        this.Ume = TARGET_PITCH_MAX;
      }
      this.Ame = this.Tme.TopAdditionZ;
      if (this.Ame < TRACE_TOP_ADDITION_Z) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】探测合法值上限叠加值过小:${this.Ame},将自动修正为:${TRACE_TOP_ADDITION_Z}`);
        }
        this.Ame = TRACE_TOP_ADDITION_Z;
      }
      this.Pme = this.Tme.BottomAdditionZ;
      if (this.Pme < TRACE_BOTTOM_ADDITION_Z) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】探测合法值下限叠加值过小:${this.Pme},将自动修正为:${TRACE_BOTTOM_ADDITION_Z}`);
        }
        this.Pme = TRACE_BOTTOM_ADDITION_Z;
      }
      this.xme = this.Tme.LeftMinYawRange;
      this.wme = this.Tme.LeftMaxYawRange;
      if (this.xme < LEFT_YAW_RANGE_MIN) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】左侧Yaw区间合法值最小值过小:${this.xme},将自动修正为:${LEFT_YAW_RANGE_MIN}`);
        }
        this.xme = LEFT_YAW_RANGE_MIN;
      }
      if (this.wme > LEFT_YAW_RANGE_MAX) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】左侧Yaw区间合法值最大值过大:${this.wme},将自动修正为:${LEFT_YAW_RANGE_MAX}`);
        }
        this.wme = LEFT_YAW_RANGE_MAX;
      }
      if (this.wme < this.xme) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】左侧Yaw区间合法值最小值大于最大值,最小值:${this.xme},最大值:${this.wme},将自动修正为,最小值:${LEFT_YAW_RANGE_MIN},最大值:${LEFT_YAW_RANGE_MAX}`);
        }
        this.xme = LEFT_YAW_RANGE_MIN;
        this.wme = LEFT_YAW_RANGE_MAX;
      }
      this.Bme = this.Tme.RightMinYawRange;
      this.bme = this.Tme.RightMaxYawRange;
      if (this.Bme < RIGHT_YAW_RANGE_MIN) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】右侧Yaw区间合法值最小值过小:${this.Bme},将自动修正为:${RIGHT_YAW_RANGE_MIN}`);
        }
        this.Bme = RIGHT_YAW_RANGE_MIN;
      }
      if (this.bme > RIGHT_YAW_RANGE_MAX) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】右侧Yaw区间合法值最大值过大:${this.bme},将自动修正为:${RIGHT_YAW_RANGE_MAX}`);
        }
        this.bme = RIGHT_YAW_RANGE_MAX;
      }
      if (this.bme < this.Bme) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】右侧Yaw区间合法值最小值大于最大值,最小值:${this.Bme},最大值:${this.bme},将自动修正为,最小值:${RIGHT_YAW_RANGE_MIN},最大值:${RIGHT_YAW_RANGE_MAX}`);
        }
        this.Bme = RIGHT_YAW_RANGE_MIN;
        this.bme = RIGHT_YAW_RANGE_MAX;
      }
      this.qme = this.Tme.MinValidYawRange;
      if (this.qme < MIN_VALID_YAW_RANGE) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, `【结算镜头】最小合法区间过小:${this.qme},将自动修正为:${MIN_VALID_YAW_RANGE}`);
        }
        this.qme = MIN_VALID_YAW_RANGE;
      }
      if (StringUtils_1.StringUtils.IsEmpty(this.Lme.Settings.ModifySettingsAdditional.Name)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 57, "【结算镜头】没有配置CameraModifier名称，将自动修正为 SettlementCamera");
        }
        this.Lme.Settings.ModifySettingsAdditional.Name = "SettlementCamera";
      }
      this.xea.DeepCopy(this.Tme.CharacterOffset);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Camera", 57, "无结算镜头配置数据");
    }
  }
  PlaySettlementCamera(t) {
    if (!ControllerHolder_1.ControllerHolder.CameraController.IsSequenceCameraInCinematic()) {
      this.E5l(t);
      if (this.Tme && this.Tme.CameraModifier) {
        this.Gme = this.Hh.PlayerRotatorInGravity.Yaw;
        this.Nme = this.Hh.PlayerLocation;
        this.Ime = Math.max(this.Hh.FinalCameraDistance, this.Dme);
        this.Fse.bTraceComplex = false;
        this.Fse.HitResult?.Clear();
        this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
        this.Fse.Radius = this.Ime;
        this.Fse.ActorsToIgnore.Add(this.Hh.Character);
        this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
        this.Fse.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
        this.Fse.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
        this.Fse.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, this.Hh.PlayerLocation);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, this.Hh.PlayerLocation);
        TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY);
        this.UpdateRotator(this.Fse.HitResult);
        this.PlaySettlementCameraInternal();
      }
    }
  }
  UpdateRotator(t) {
    this.Jme(t);
    this.zme(t);
    this.Zme();
    this.UpdateFinalRotator();
  }
  UpdateFinalRotator() {
    this.Qme.length = 0;
    for (const i of this.Wme) {
      if (i.Max - i.Min > this.qme) {
        this.Qme.push(i);
      }
    }
    for (const s of this.Kme) {
      if (s.Max - s.Min > this.qme) {
        this.Qme.push(s);
      }
    }
    var t;
    if (this.Qme.length > 0) {
      t = ObjectUtils_1.ObjectUtils.GetRandomArrayItem(this.Qme);
      t = MathUtils_1.MathUtils.Lerp(t.Min, t.Max, Math.random()) + this.Gme;
      this.Ome.Pitch = MathUtils_1.MathUtils.Lerp(this.Rme, this.Ume, Math.random());
      this.Ome.Yaw = MathCommon_1.MathCommon.WrapAngle(t + FLAT_ANGLE);
      this.Ome.Roll = 0;
    } else if (this.Hh.IsInNormalGravityMode()) {
      this.Hh.CameraForward.ToOrientationRotator(this.Ome);
    } else {
      CameraUtility_1.CameraUtility.GetVectorInGravity(this.Hh.CameraForward, this.Lz);
      this.Lz.Rotation(this.Ome);
    }
  }
  PlaySettlementCameraInternal() {
    ControllerHolder_1.ControllerHolder.CameraController.StopAllCameraShakes();
    this.Ome.SubtractionEqual(this.Hh.PlayerRotatorInGravity);
    this.Lme.Settings.ArmRotation = new UE.Rotator(this.Ome.Pitch, this.Ome.Yaw, this.Ome.Roll);
    this.Lme.Settings.ModifySettingsAdditional.ArmOffset.X = this.xea.X;
    this.Lme.Settings.ModifySettingsAdditional.ArmOffset.Y = this.xea.Y;
    this.Lme.Settings.ModifySettingsAdditional.ArmOffset.Z = this.xea.Z;
    this.Hh.CameraModifyController.ApplyCameraModify(undefined, this.Lme.Duration, this.Lme.BlendInTime, this.Lme.BlendOutTime, this.Lme.BreakBlendOutTime, this.Lme.Settings, undefined, this.Lme.BlendInCurve, this.Lme.BlendOutCurve, this.Hh.Character, "HitCase", undefined);
  }
  IsPlayingSettlementCamera() {
    return !!this.Hh.CameraModifyController.IsModified && !!this.Lme && this.Hh.CameraModifyController.ModifySettings.Name === this.Lme.Settings.ModifySettingsAdditional.Name;
  }
  Jme(i) {
    this.kme.clear();
    this.Fme.clear();
    this.Vme.clear();
    if (i) {
      var s = i.GetHitCount();
      var h = this.Hh.PlayerLocationInGravity.Z + this.Ame;
      var _ = this.Hh.PlayerLocationInGravity.Z - this.Pme;
      for (let t = 0; t < s; ++t) {
        var e;
        var a;
        var r = i.Actors.Get(t);
        if (r && (e = i.Components?.Get(t))) {
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(this.Fse.HitResult, t, this.Lz);
          if (!((a = CameraUtility_1.CameraUtility.GetZnInGravity(this.Lz)) < _) && !(h < a)) {
            if (e instanceof UE.StaticMeshComponent) {
              if (!this.kme.has(r) || (a = this.kme.get(r), TraceElementCommon_1.TraceElementCommon.GetImpactPoint(this.Fse.HitResult, a, this.Tz), a = Vector_1.Vector.DistSquared(this.Lz, this.Hh.PlayerLocation), Vector_1.Vector.DistSquared(this.Tz, this.Hh.PlayerLocation) < a)) {
                this.kme.set(r, t);
              }
            } else if (e instanceof UE.ShapeComponent && this.ede(e) > MIN_SHAPE_RADUIS) {
              if (this.Fme.has(r)) {
                this.Fme.get(r).push(t);
              } else {
                this.Fme.set(r, [t]);
              }
            }
          }
        }
      }
    }
  }
  tde(t, i) {
    i.GetLocalBounds(undefined, this.Hme);
    return [(0, puerts_1.$unref)(this.Hme).X * t.GetScale3D().X, (0, puerts_1.$unref)(this.Hme).Y * t.GetScale3D().Y];
  }
  zme(_) {
    this.jme.length = 0;
    for (var [t, i] of this.kme) {
      var s = _.Components?.Get(i);
      if (s) {
        TraceElementCommon_1.TraceElementCommon.GetImpactPoint(_, i, this.Lz);
        this.jme.push(this.ide(t.D_GetTransform(), s, this.Lz));
      }
    }
    for (var [, h] of this.Fme) {
      h.sort((t, i) => {
        var s = _.Components?.Get(t);
        var h = _.Components?.Get(i);
        if (h) {
          if (s) {
            s = this.ode(s, t);
            return this.ode(h, i) - s;
          } else {
            return 1;
          }
        } else {
          return -1;
        }
      });
      for (let t = 0; t < h.length && t < MAX_CACHE_CAPSULE_COUNT; ++t) {
        var e = _.Components?.Get(h[t]);
        if (e) {
          this.jme.push(this.rde(e, h[t]));
        }
      }
    }
  }
  rde(t, i) {
    let s = 0;
    this.Lz.DeepCopy(t.D_K2_GetComponentLocation());
    var h = this.Ime;
    var t = this.ode(t, i);
    var i = Vector_1.Vector.Dist2D(this.Hh.PlayerLocation, this.Lz);
    var _ = this.nde(this.Lz);
    s = i < h ? Math.atan(t / i) : MathUtils_1.MathUtils.GetObliqueTriangleAngle(h, i, t);
    s *= MathUtils_1.MathUtils.RadToDeg;
    return new YawRange(_ - s, _ + s);
  }
  ide(t, i, s) {
    var h = t.InverseTransformPositionNoScale(this.Nme.ToUeVector());
    var s = t.InverseTransformPositionNoScale(s.ToUeVector());
    var _ = this.Ime;
    var [i, e] = this.tde(t, i);
    let a = 0;
    let r = 0;
    var A;
    var o;
    var T = Vector_1.Vector.Create();
    var M = Vector_1.Vector.Create();
    if (h.Y >= -e && h.Y <= e) {
      C = e + h.Y;
      A = e - h.Y;
      o = s.X - h.X;
      a = _ * _ < C * C + o * o ? h.Y - Math.sqrt(_ * _ - o * o) : h.Y - C;
      r = _ * _ < A * A + o * o ? h.Y + Math.sqrt(_ * _ - o * o) : h.Y + A;
      T.X = s.X;
      T.Y = h.X <= 0 ? a : r;
      T.Z = s.Z;
      M.X = s.X;
      M.Y = h.X > 0 ? a : r;
      M.Z = s.Z;
    } else if (h.X >= -i && h.X <= i) {
      C = i - h.X;
      o = i + h.X;
      A = s.Y - h.Y;
      a = _ * _ < C * C + A * A ? h.X + Math.sqrt(_ * _ - A * A) : h.X + C;
      r = _ * _ < o * o + A * A ? h.X - Math.sqrt(_ * _ - A * A) : h.X - o;
      T.X = h.Y <= 0 ? a : r;
      T.Y = s.Y;
      T.Z = s.Z;
      M.X = h.Y > 0 ? a : r;
      M.Y = s.Y;
      M.Z = s.Z;
    } else if (h.Y < -e && h.X < -i) {
      C = i - h.X;
      A = e - h.Y;
      o = s.X - h.X;
      E = s.Y - h.Y;
      a = _ * _ < C * C + E * E ? h.X + Math.sqrt(_ * _ - E * E) : h.X + C;
      r = _ * _ < A * A + o * o ? h.Y + Math.sqrt(_ * _ - o * o) : h.Y + A;
      T.X = a;
      T.Y = s.Y;
      T.Z = s.Z;
      M.X = s.X;
      M.Y = r;
      M.Z = s.Z;
    } else if (h.Y > e && h.X < -i) {
      E = i - h.X;
      C = e + h.Y;
      o = s.X - h.X;
      A = s.Y - h.Y;
      a = _ * _ < E * E + A * A ? h.X + Math.sqrt(_ * _ - A * A) : h.X + E;
      r = _ * _ < C * C + o * o ? h.Y - Math.sqrt(_ * _ - o * o) : h.Y - C;
      M.X = a;
      M.Y = s.Y;
      M.Z = s.Z;
      T.X = s.X;
      T.Y = r;
      T.Z = s.Z;
    } else if (h.Y < -e && h.X > i) {
      A = i + h.X;
      E = e - h.Y;
      o = s.X - h.X;
      C = s.Y - h.Y;
      a = _ * _ < A * A + C * C ? h.X - Math.sqrt(_ * _ - C * C) : h.X - A;
      r = _ * _ < E * E + o * o ? h.Y + Math.sqrt(_ * _ - o * o) : h.Y + E;
      T.X = s.X;
      T.Y = r;
      T.Z = s.Z;
      M.X = a;
      M.Y = s.Y;
      M.Z = s.Z;
    } else if (h.Y > e && h.X > i) {
      C = i + h.X;
      A = e + h.Y;
      o = s.X - h.X;
      E = s.Y - h.Y;
      a = _ * _ < C * C + E * E ? h.X - Math.sqrt(_ * _ - E * E) : h.X - C;
      r = _ * _ < A * A + o * o ? h.Y - Math.sqrt(_ * _ - o * o) : h.Y - A;
      T.X = a;
      T.Y = s.Y;
      T.Z = s.Z;
      M.X = s.X;
      M.Y = r;
      M.Z = s.Z;
    }
    var i = t.TransformPositionNoScale(T.ToUeVector());
    var e = t.TransformPositionNoScale(M.ToUeVector());
    var E = this.sde(i);
    var C = this.sde(e);
    if (this.Hh.IsInNormalGravityMode()) {
      return new YawRange(E, C);
    } else {
      _ = Math.abs(E - C);
      o = MathUtils_1.MathUtils.WrapAngle((E + C) * 0.5);
      return new YawRange(MathUtils_1.MathUtils.WrapAngle(o - _ / 2), MathUtils_1.MathUtils.WrapAngle(o + _ / 2));
    }
  }
  Zme() {
    this.Wme.length = 0;
    this.Kme.length = 0;
    this.Wme.push(new YawRange(this.xme, this.wme));
    this.Kme.push(new YawRange(this.Bme, this.bme));
    for (const l of this.jme) {
      var t = MathCommon_1.MathCommon.WrapAngle(l.Max - this.Gme);
      var i = MathCommon_1.MathCommon.WrapAngle(l.Min - this.Gme);
      let s = 0;
      let h = 0;
      let _ = 0;
      let e = 0;
      let a = 0;
      let r = 0;
      let A = 0;
      let o = 0;
      let T = 0;
      let M = 0;
      if (t < 0 && i < 0) {
        if (t < i) {
          T = 1;
          s = t;
          h = i;
        } else {
          T = 2;
          s = MINUS_FLAT_ANGLE;
          h = i;
          _ = t;
          e = 0;
          M = 1;
          a = 0;
          r = FLAT_ANGLE;
        }
      } else if (t > 0 && i > 0) {
        if (t < i) {
          M = 1;
          a = t;
          r = i;
        } else {
          M = 2;
          a = 0;
          r = i;
          A = t;
          o = FLAT_ANGLE;
          T = 1;
          s = MINUS_FLAT_ANGLE;
          h = 0;
        }
      } else if (t < 0 && i > 0) {
        T = 1;
        M = 1;
        s = t;
        h = 0;
        a = 0;
        r = i;
      } else if (t > 0 && i < 0) {
        T = 1;
        M = 1;
        s = MINUS_FLAT_ANGLE;
        h = i;
        a = t;
        r = FLAT_ANGLE;
      }
      for (let i = this.Wme.length - 1; i >= 0; --i) {
        let t = true;
        var E;
        var C;
        var I = this.Wme[i];
        if (T >= 2) {
          if (!(I.Min > e) && !(I.Max < _)) {
            E = Math.max(I.Min, _);
            C = Math.min(I.Max, e);
            this.Wme.push(new YawRange(E, C));
          }
        }
        if (T >= 1) {
          if (!(I.Min > h) && !(I.Max < s)) {
            t = false;
            I.Min = Math.max(I.Min, s);
            I.Max = Math.min(I.Max, h);
          }
        }
        if (t) {
          this.Wme.splice(i, 1);
        }
      }
      for (let i = this.Kme.length - 1; i >= 0; --i) {
        let t = true;
        var n;
        var R;
        var N = this.Kme[i];
        if (M >= 2) {
          if (!(N.Min > o) && !(N.Max < A)) {
            n = Math.max(N.Min, A);
            R = Math.min(N.Max, o);
            this.Kme.push(new YawRange(n, R));
          }
        }
        if (M >= 1) {
          if (!(N.Min > r) && !(N.Max < a)) {
            t = false;
            N.Min = Math.max(N.Min, a);
            N.Max = Math.min(N.Max, r);
          }
        }
        if (t) {
          this.Kme.splice(i, 1);
        }
      }
    }
  }
  ode(t, i) {
    if (!this.Vme.has(i)) {
      this.Vme.set(i, this.ede(t));
    }
    return this.Vme.get(i);
  }
  ede(t) {
    if (t) {
      if (t instanceof UE.CapsuleComponent) {
        return t.CapsuleRadius;
      } else if (t instanceof UE.BoxComponent) {
        return Math.max(t.BoxExtent.X, t.BoxExtent.Y);
      } else if (t instanceof UE.SphereComponent) {
        return t.SphereRadius;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
  sde(t) {
    this.Lz.Set(t.X, t.Y, t.Z);
    return this.nde(this.Lz);
  }
  nde(t) {
    t.Subtraction(this.Nme, this.Lz);
    if (this.Hh.IsInNormalGravityMode()) {
      return this.Lz.HeadingAngle() * MathUtils_1.MathUtils.RadToDeg;
    } else {
      CameraUtility_1.CameraUtility.GetVectorInGravity(this.Lz, this.Lz);
      this.Lz.Rotation(this.Gue);
      return MathUtils_1.MathUtils.WrapAngle(this.Gue.Yaw);
    }
  }
  Pea() {
    var t = this.Hh.Character.CharacterActorComponent.ActorTransform.TransformPositionNoScale(this.xea.ToUeVector());
    UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, t, DEBUG_DRAW_RADIUS, DEBUG_DRAW_SEGMENTS, undefined, DEBUG_DRAW_DURATION);
  }
  Clear() {
    if (this.Fse) {
      this.Fse.Dispose();
      this.Fse = undefined;
    }
    this.Hh = undefined;
    this.kme.clear();
    this.Fme.clear();
    this.Vme.clear();
    this.jme.length = 0;
    this.Wme.length = 0;
    this.Kme.length = 0;
  }
}
exports.SettlementCamera = SettlementCamera;
//# sourceMappingURL=SettlementCamera.js.map