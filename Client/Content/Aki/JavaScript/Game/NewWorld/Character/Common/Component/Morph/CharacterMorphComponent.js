"use strict";

var CharacterMorphComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var h = arguments.length;
  var s = h < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, o);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        s = (h < 3 ? r(s) : h > 3 ? r(e, i, s) : r(e, i)) || s;
      }
    }
  }
  if (h > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterMorphComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelUtil_1 = require("../../../../../../Core/Utils/ModelUtil");
const CameraController_1 = require("../../../../../Camera/CameraController");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const CharacterNameDefines_1 = require("../../CharacterNameDefines");
const CAPSULE_COMPONENT = "胶囊体组件";
const CAPSULE_HALF_HEIGHT = "胶囊体半高";
const CAPSULE_RADIUS = "胶囊体半径";
const MESH_COMPONENT = "网格体";
const MESH_LOCATION = "位置";
const MOVE_COMPONENT = "角色移动";
const MOVE_MAX_STEP_HEIGHT = "最大步高";
const MOVE_WALKABLE_FLOOR_ANGLE = "可行走地面角度";
const MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY = "维持水平地面速度";
const MOVE_DEFAULT_WATER_MOVEMENT_MODE = "默认水中运动模式";
const IS_ENABLE_OPTIMIZE = true;
let CharacterMorphComponent = CharacterMorphComponent_1 = class CharacterMorphComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.m6_ = 0;
    this.CW_ = undefined;
    this.qQ_ = false;
    this.f6_ = undefined;
    this.g6_ = undefined;
    this.gRc = undefined;
    this.CRc = undefined;
    this.pRc = undefined;
    this.vRc = undefined;
    this.EIe = undefined;
    this.C6_ = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.Lie = undefined;
    this.HIu = undefined;
    this.$Iu = false;
    this.WIu = undefined;
    this.Aia = undefined;
    this.JFu = false;
    this.cz = undefined;
    this.D3u = 0;
    this.U3u = 0;
    this.QIu = (t, e) => {
      if (e) {
        this.SetMorphType(1);
      } else {
        this.SetMorphType(0);
      }
    };
  }
  OnInitData() {
    return true;
  }
  OnStart() {
    this.EIe = this.Entity.GetComponent(0);
    this.C6_ = this.Entity.GetComponent(220);
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(179);
    this.Lie = this.Entity.GetComponent(206);
    this.p6_();
    if (this.qQ_) {
      if (this.Lie) {
        this.HIu = this.Lie.ListenForTagAddOrRemove(-1867735064, this.QIu);
      }
      if (this.Hte?.IsRoleAndCtrlByMe) {
        this.ZFu();
      }
      this.cz = Vector_1.Vector.Create();
    }
    return true;
  }
  OnEnd() {
    var t;
    if (this.qQ_) {
      if (this.m6_ !== 0 && (t = this.GetMorphCameraConfig())) {
        CameraController_1.CameraController.UnloadCharacterCameraConfig(t);
      }
      this.HIu?.EndTask();
      this.HIu = undefined;
      this.f6_ = undefined;
      this.g6_ = undefined;
      this.gRc = undefined;
      this.CRc = undefined;
      this.pRc = undefined;
      this.vRc = undefined;
      this.Aia = undefined;
      this.JFu = false;
      this.cz = undefined;
      this.qQ_ = false;
    }
    return true;
  }
  p6_() {
    this.dZ_();
    if (this.g6_) {
      var t;
      var e;
      var i;
      var o;
      var r;
      var h = this.C6_?.GetFightInfo()?.MorphModelInfoMap;
      var s = new Map();
      for ([t, e] of this.g6_.entries()) {
        if (e === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 67, "[CharacterMorphComponent]初始化获取ModelId有误", ["ModelId", e], ["MorphType", t]);
          }
          s.set(t, {
            ModelId: 0
          });
        } else {
          i = ModelUtil_1.ModelUtil.GetModelConfig(e);
          o = h?.Get(t);
          r = {
            ModelId: e,
            SkeletalMesh: ResourceSystem_1.ResourceSystem.GetLoadedAsset(i.网格体.ToAssetPathName(), UE.SkeletalMesh),
            AnimClass: ResourceSystem_1.ResourceSystem.GetLoadedAsset(i.动画蓝图.ToAssetPathName(), UE.Class),
            ComponentFloatParams: new Map(),
            ComponentVectorParams: new Map()
          };
          if (t === 1) {
            r.DtBaseMovementSetting = o?.DtBaseMovementSetting;
            r.DtCameraConfig = o?.DtCameraConfig;
            r.InputComponentClass = o?.InputComponentClass;
            this.mZ_(r, o?.ComponentFloatParams);
            this.fZ_(r, o?.ComponentVectorParams);
          }
          if (!r.SkeletalMesh) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 67, "[CharacterMorphComponent]初始化资源有误", ["ModelId", e], ["MorphType", t], ["SkeletalMeshPath", i.网格体.ToAssetPathName()]);
            }
          }
          if (!r.AnimClass) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 67, "[CharacterMorphComponent]初始化资源有误", ["ModelId", e], ["MorphType", t], ["AnimClassPath", i.动画蓝图.ToAssetPathName()]);
            }
          }
          s.set(t, r);
        }
      }
      this.f6_ = s;
      this.qQ_ = s.size !== 0;
    }
  }
  dZ_() {
    if (!this.g6_) {
      var e = this.C6_?.GetFightInfo()?.MorphModelInfoMap;
      if (e && e.Num() > 0) {
        var t;
        var i = new Map();
        for (let t = 0; t < e.Num(); t++) {
          var o;
          var r = e.GetKey(t);
          if (r === 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]不需要配置默认形态");
            }
          } else if (o = e.Get(r)) {
            if (o.ModelId !== 0) {
              i.set(r, o.ModelId);
            } else if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]多形态配置的模型Id为0", ["MorphType", r]);
            }
          }
        }
        if (i.size > 0 && (t = this.EIe?.GetModelId() ?? 0) !== 0) {
          i.set(0, t);
          this.g6_ = i;
        }
      }
    }
  }
  mZ_(t, e) {
    if (e) {
      var i = t.ComponentFloatParams;
      for (let t = 0; t < e.Num(); t++) {
        var o = e.GetKey(t);
        var r = e.Get(o);
        var o = o.split(".");
        if (r !== undefined && !(o.length < 2)) {
          var h = o[0];
          var o = o[1];
          let t = i.get(h);
          if (!t) {
            t = new Map();
            i.set(h, t);
          }
          t.set(o, r);
        }
      }
    }
  }
  fZ_(t, e) {
    if (e) {
      var i = t.ComponentVectorParams;
      for (let t = 0; t < e.Num(); t++) {
        var o = e.GetKey(t);
        var r = e.Get(o);
        var o = o.split(".");
        if (r !== undefined && !(o.length < 2)) {
          var h = o[0];
          var o = o[1];
          let t = i.get(h);
          if (!t) {
            t = new Map();
            i.set(h, t);
          }
          h = Vector_1.Vector.Create();
          h.FromUeVector(r);
          t.set(o, h);
        }
      }
    }
  }
  GetMorphType() {
    return this.m6_;
  }
  GetMorphData(t = undefined) {
    if (t !== undefined) {
      return this.f6_?.get(t);
    } else {
      return this.CW_;
    }
  }
  GetMorphCameraConfig(t = undefined) {
    t = t ?? this.m6_;
    t = this.GetMorphData(t)?.DtCameraConfig?.ToAssetPathName() ?? "";
    let e = undefined;
    if (!t || t === "None" || (e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable))?.IsValid()) {
      return e;
    }
  }
  GetMorphBpInputComp() {
    return this.Aia;
  }
  v6_(t) {
    return t < 2;
  }
  IsEnableMorph() {
    return this.qQ_;
  }
  IsMorphing() {
    return this.m6_ !== 0;
  }
  HasComponentFloatParam(t, e, i) {
    t = this.GetMorphData(t);
    return !!t && t.ComponentFloatParams?.get(e)?.get(i) !== undefined;
  }
  SetComponentFloatParam(e, i, o, r) {
    e = this.GetMorphData(e);
    if (e) {
      e = e.ComponentFloatParams;
      let t = e?.get(i);
      if (t === undefined) {
        t = new Map();
        e?.set(i, t);
      }
      t.set(o, r);
    }
  }
  HasComponentVectorParam(t, e, i) {
    t = this.GetMorphData(t);
    return !!t && t.ComponentVectorParams?.get(e)?.get(i) !== undefined;
  }
  SetComponentVectorParam(e, i, o, r) {
    e = this.GetMorphData(e);
    if (e) {
      e = e.ComponentVectorParams;
      let t = e?.get(i);
      if (t === undefined) {
        t = new Map();
        e?.set(i, t);
      }
      t.set(o, r);
    }
  }
  SetAssetElement(t, e) {
    if (this.gRc === undefined) {
      this.gRc = new Map();
    }
    this.gRc.set(t, e);
  }
  AddMontage(i, o, r) {
    var h = this.vRc?.get(r);
    if (h) {
      if (this.CRc === undefined) {
        this.CRc = new Map();
      }
      let t = this.CRc.get(h);
      if (!t) {
        t = new Map();
        this.CRc.set(h, t);
      }
      t.set(i, o);
      if (this.pRc === undefined) {
        this.pRc = new Map();
      }
      let e = this.pRc.get(h);
      if (!e) {
        e = new Map();
        this.pRc.set(h, e);
      }
      e.set(i, r);
    }
  }
  AddMorphMontagePath(t, e) {
    if (this.vRc === undefined) {
      this.vRc = new Map();
    }
    this.vRc.set(t, e);
  }
  IsMorphMontage(t) {
    return !!this.vRc?.has(t);
  }
  GetMontageByName(t) {
    return this.CRc?.get(this.m6_)?.get(t);
  }
  GetMontagePathByName(t) {
    return this.pRc?.get(this.m6_)?.get(t);
  }
  GetCenterActorLocationOffset() {
    if (this.IsMorphing() && this.WIu) {
      return this.WIu.ToUeVector();
    }
  }
  SetMorphType(t) {
    var e;
    var i;
    if (t !== this.m6_) {
      if (this.v6_(t)) {
        if (e = this.f6_?.get(t)) {
          if (e.SkeletalMesh && e.AnimClass) {
            CharacterMorphComponent_1.KIu.Start();
            this.XIu();
            CombatLog_1.CombatLog.Info("Skill", this.Entity, "设置形态成功, 开始切换", ["MorphType", t]);
            i = this.m6_;
            this.m6_ = t;
            this.CW_ = e;
            EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.Entity, t, i);
            this.Hte?.ChangeMeshAnim(e.SkeletalMesh, e.AnimClass);
            this.EIe?.SetModelConfig(e.ModelId);
            this.Hte?.UpdateModelResPath();
            this.pW_();
            this.YIu();
            this.vW_();
            this.OQ_();
            this.gZ_();
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this.Entity, t, i);
            EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this.Entity, t, i);
            CharacterMorphComponent_1.KIu.Stop();
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Battle", 67, "[CharacterMorphComponent]设置形态失败, 对应形态数据有误", ["MorphType", t], ["SkeletalMesh", e.SkeletalMesh], ["AnimClass", e.AnimClass]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 67, "[CharacterMorphComponent]设置形态失败, 无对应形态数据", ["MorphType", t]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 67, "[CharacterMorphComponent]设置了无效的形态类型", ["MorphType", t]);
      }
    }
  }
  pW_() {
    if (this.Gce) {
      let t = undefined;
      var e;
      if ((t = this.m6_ === 0 ? this.Hte?.Actor.DtBaseMovementSetting : this.CW_?.DtBaseMovementSetting?.Get()) && (e = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString()))) {
        this.Gce.SetMovementData(e, true);
      }
    }
  }
  YIu() {
    var t;
    var e;
    var i;
    var o;
    var r = this.Gce;
    if (r && (o = (i = this.CW_?.ComponentFloatParams?.get(MOVE_COMPONENT))?.get(MOVE_MAX_STEP_HEIGHT), t = i?.get(MOVE_WALKABLE_FLOOR_ANGLE), e = i?.get(MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY), i = i?.get(MOVE_DEFAULT_WATER_MOVEMENT_MODE), this.m6_ !== 0 ? (o !== undefined && r.SetStepHeight(o), t !== undefined && r.SetWalkableFloorAngle(t)) : (r.ResetStepHeight(), r.ResetWalkableFloorAngle()), o = r.CharacterMovement) && (e !== undefined && (o.bMaintainHorizontalGroundVelocity = Boolean(e)), i !== undefined)) {
      o.DefaultWaterMovementMode = i;
    }
  }
  gZ_() {
    var t;
    var e = this.Hte?.Actor.Mesh;
    if (e && (t = this.CW_?.ComponentVectorParams?.get(MESH_COMPONENT)?.get(MESH_LOCATION))) {
      e.K2_SetRelativeLocation(t.ToUeVectorOld(), false, undefined, false);
    }
  }
  vW_() {
    var e = this.Hte;
    if (e) {
      let t = 0;
      var i;
      var o;
      var r;
      var h;
      var s = e.IsRoleAndCtrlByMe;
      if (this.m6_ === 0) {
        t = this.U3u - e.HalfHeight;
        e.SetDefaultRadiusAndHalfHeight(this.D3u, this.U3u);
        if (IS_ENABLE_OPTIMIZE) {
          e.SetRadiusAndHalfHeight(this.D3u, this.U3u, false, false);
        } else {
          e.ResetCapsuleRadiusAndHeight(true);
        }
        if (s) {
          ControllerHolder_1.ControllerHolder.GameBudgetInterfaceController.SetCenterActorLocationOffset(Vector_1.Vector.ZeroVectorDouble);
        }
      } else {
        o = (r = this.CW_?.ComponentFloatParams?.get(CAPSULE_COMPONENT))?.get(CAPSULE_HALF_HEIGHT);
        r = r?.get(CAPSULE_RADIUS);
        if (o !== undefined || r !== undefined) {
          o = o ?? e.HalfHeight;
          r = r ?? e.Radius;
          if (o > 0 && r > 0) {
            if (IS_ENABLE_OPTIMIZE) {
              e.SetRadiusAndHalfHeight(r, o, false, false);
              t = o - e.DefaultHalfHeight;
            } else {
              e.SetRadiusAndHalfHeight(r, o, true, true);
            }
            if (s && (h = e.DefaultHalfHeight, i = e.DefaultRadius, h > 0) && i > 0) {
              this.WIu ||= Vector_1.Vector.Create(0, 0, -(o + r - h - i));
              ControllerHolder_1.ControllerHolder.GameBudgetInterfaceController.SetCenterActorLocationOffset(this.WIu.ToUeVector());
            }
            this.U3u = e.DefaultHalfHeight;
            this.D3u = e.DefaultRadius;
            e.SetDefaultRadiusAndHalfHeight(r, o);
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]更新胶囊体失败, 参数非法", ["Radius", r], ["HalfHeight", o]);
          }
        }
      }
      if (IS_ENABLE_OPTIMIZE && s && t !== 0 && ((h = e.Actor.CharacterMovement?.MovementMode) === 1 || h === 2 || h === 0)) {
        this.cz ||= Vector_1.Vector.Create();
        this.cz.FromUeVector(e.ActorLocation);
        this.cz.Z += t;
        e.SetActorLocation(this.cz.ToUeVector(), "角色形态改变修改胶囊体的位置修正优化");
      }
    }
  }
  OQ_() {
    var t;
    var e;
    if (this.Hte?.IsRoleAndCtrlByMe && (t = this.Hte?.Actor.DtCameraConfig) && (e = this.GetMorphCameraConfig())) {
      if (this.m6_ === 0) {
        CameraController_1.CameraController.UnloadCharacterCameraConfig(e);
        CameraController_1.CameraController.LoadCharacterCameraConfig(t);
      } else {
        CameraController_1.CameraController.UnloadCharacterCameraConfig(t);
        CameraController_1.CameraController.LoadCharacterCameraConfig(e);
      }
    }
  }
  XIu() {
    var t;
    var e;
    if (this.m6_ === 0 && !this.$Iu) {
      this.$Iu = true;
      if ((t = this.Gce?.CharacterMovement) && (this.HasComponentFloatParam(1, MOVE_COMPONENT, MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY) && this.SetComponentFloatParam(0, MOVE_COMPONENT, MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY, Number(t.bMaintainHorizontalGroundVelocity)), this.HasComponentFloatParam(1, MOVE_COMPONENT, MOVE_DEFAULT_WATER_MOVEMENT_MODE))) {
        this.SetComponentFloatParam(0, MOVE_COMPONENT, MOVE_DEFAULT_WATER_MOVEMENT_MODE, Number(t.DefaultWaterMovementMode));
      }
      if ((t = this.Hte?.Actor.Mesh) && this.HasComponentVectorParam(1, MESH_COMPONENT, MESH_LOCATION)) {
        (e = Vector_1.Vector.Create()).FromUeVector(t.RelativeLocation);
        this.SetComponentVectorParam(0, MESH_COMPONENT, MESH_LOCATION, e);
      }
    }
  }
  ZFu() {
    var t;
    if (!this.Aia && !this.JFu) {
      if (t = this.GetMorphData(1)?.InputComponentClass?.AssetPathName.toString()) {
        this.JFu = true;
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
          var e = this.Hte?.Actor;
          if (e && ((t = e.AddComponentByClass(t, false, MathUtils_1.MathUtils.DefaultTransform, false)).OwnerActor = e, this.Aia = t, this.m6_ === 1) && this.Entity.GetComponent(62)) {
            ControllerHolder_1.ControllerHolder.InputController.GetInputLayer(this.Entity.Id, 1)?.SetBpInputComp(t);
          }
          this.JFu = false;
        });
      }
    }
  }
};
CharacterMorphComponent.KIu = Stats_1.Stat.Create("[CharacterMorphComponent]SetMorphType");
CharacterMorphComponent = CharacterMorphComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(283)], CharacterMorphComponent);
exports.CharacterMorphComponent = CharacterMorphComponent; //# sourceMappingURL=CharacterMorphComponent.js.map