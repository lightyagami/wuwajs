"use strict";

var CharacterMorphComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, i) {
  var r;
  var h = arguments.length;
  var s = h < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, i);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        s = (h < 3 ? r(s) : h > 3 ? r(e, o, s) : r(e, o)) || s;
      }
    }
  }
  if (h > 3 && s) {
    Object.defineProperty(e, o, s);
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
const CustomMovementDefine_1 = require("../Move/CustomMovementDefine");
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
    this.xYm = undefined;
    this.EIe = undefined;
    this.C6_ = undefined;
    this.Hte = undefined;
    this.Gce = undefined;
    this.Lie = undefined;
    this.nnf = undefined;
    this.CBg = undefined;
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
    this.C6_ = this.Entity.GetComponent(232);
    this.Hte = this.Entity.GetComponent(3);
    this.Gce = this.Entity.GetComponent(189);
    this.Lie = this.Entity.GetComponent(217);
    this.nnf = this.Entity.GetComponent(188);
    this.CBg = this.Entity.GetComponent(39);
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
      var o;
      var i;
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
          o = ModelUtil_1.ModelUtil.GetModelConfig(e);
          i = h?.Get(t);
          r = {
            ModelId: e,
            SkeletalMesh: ResourceSystem_1.ResourceSystem.GetLoadedAsset(o.网格体.ToAssetPathName(), UE.SkeletalMesh),
            AnimClass: ResourceSystem_1.ResourceSystem.GetLoadedAsset(o.动画蓝图.ToAssetPathName(), UE.Class),
            ComponentFloatParams: new Map(),
            ComponentVectorParams: new Map()
          };
          if (t === 1) {
            r.DtBaseMovementSetting = i?.DtBaseMovementSetting;
            r.DtCameraConfig = i?.DtCameraConfig;
            r.InputComponentClass = i?.InputComponentClass;
            this.mZ_(r, i?.ComponentFloatParams);
            this.fZ_(r, i?.ComponentVectorParams);
          }
          if (!r.SkeletalMesh) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 67, "[CharacterMorphComponent]初始化资源有误", ["ModelId", e], ["MorphType", t], ["SkeletalMeshPath", o.网格体.ToAssetPathName()]);
            }
          }
          if (!r.AnimClass) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Battle", 67, "[CharacterMorphComponent]初始化资源有误", ["ModelId", e], ["MorphType", t], ["AnimClassPath", o.动画蓝图.ToAssetPathName()]);
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
        var o = new Map();
        for (let t = 0; t < e.Num(); t++) {
          var i;
          var r = e.GetKey(t);
          if (r === 0) {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]不需要配置默认形态");
            }
          } else if (i = e.Get(r)) {
            if (i.ModelId !== 0) {
              o.set(r, i.ModelId);
            } else if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]多形态配置的模型Id为0", ["MorphType", r]);
            }
          }
        }
        if (o.size > 0 && (t = this.EIe?.GetModelId() ?? 0) !== 0) {
          o.set(0, t);
          this.g6_ = o;
        }
      }
    }
  }
  mZ_(t, e) {
    if (e) {
      var o = t.ComponentFloatParams;
      for (let t = 0; t < e.Num(); t++) {
        var i = e.GetKey(t);
        var r = e.Get(i);
        var i = i.split(".");
        if (r !== undefined && !(i.length < 2)) {
          var h = i[0];
          var i = i[1];
          let t = o.get(h);
          if (!t) {
            t = new Map();
            o.set(h, t);
          }
          t.set(i, r);
        }
      }
    }
  }
  fZ_(t, e) {
    if (e) {
      var o = t.ComponentVectorParams;
      for (let t = 0; t < e.Num(); t++) {
        var i = e.GetKey(t);
        var r = e.Get(i);
        var i = i.split(".");
        if (r !== undefined && !(i.length < 2)) {
          var h = i[0];
          var i = i[1];
          let t = o.get(h);
          if (!t) {
            t = new Map();
            o.set(h, t);
          }
          h = Vector_1.Vector.Create();
          h.FromUeVector(r);
          t.set(i, h);
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
  HasComponentFloatParam(t, e, o) {
    t = this.GetMorphData(t);
    return !!t && t.ComponentFloatParams?.get(e)?.get(o) !== undefined;
  }
  SetComponentFloatParam(e, o, i, r) {
    e = this.GetMorphData(e);
    if (e) {
      e = e.ComponentFloatParams;
      let t = e?.get(o);
      if (t === undefined) {
        t = new Map();
        e?.set(o, t);
      }
      t.set(i, r);
    }
  }
  HasComponentVectorParam(t, e, o) {
    t = this.GetMorphData(t);
    return !!t && t.ComponentVectorParams?.get(e)?.get(o) !== undefined;
  }
  SetComponentVectorParam(e, o, i, r) {
    e = this.GetMorphData(e);
    if (e) {
      e = e.ComponentVectorParams;
      let t = e?.get(o);
      if (t === undefined) {
        t = new Map();
        e?.set(o, t);
      }
      t.set(i, r);
    }
  }
  SetAssetElement(t, e) {
    if (this.gRc === undefined) {
      this.gRc = new Map();
    }
    this.gRc.set(t, e);
  }
  AddMontage(o, i, r) {
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
      t.set(o, i);
      if (this.pRc === undefined) {
        this.pRc = new Map();
      }
      let e = this.pRc.get(h);
      if (!e) {
        e = new Map();
        this.pRc.set(h, e);
      }
      e.set(o, r);
    }
  }
  AddMorphMontagePath(t, e) {
    if (this.vRc === undefined) {
      this.vRc = new Map();
    }
    this.vRc.set(t, e);
  }
  SetMontageSubPathMorphType(t, e) {
    this.xYm ||= new Map();
    this.xYm.set(t, e);
  }
  GetMontagePathMorphType(t) {
    if (this.xYm) {
      for (var [e, o] of this.xYm.entries()) {
        if (t.includes(e)) {
          return o;
        }
      }
    }
    return 0;
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
    var o;
    if (t !== this.m6_) {
      if (this.v6_(t)) {
        if (e = this.f6_?.get(t)) {
          if (e.SkeletalMesh && e.AnimClass) {
            CharacterMorphComponent_1.KIu.Start();
            this.XIu();
            CombatLog_1.CombatLog.Info("Skill", this.Entity, "设置形态成功, 开始切换", ["MorphType", t]);
            o = this.m6_;
            this.m6_ = t;
            this.CW_ = e;
            EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.Entity, t, o);
            CharacterMorphComponent_1.A4g.Start();
            this.Hte?.ChangeMeshAnim(e.SkeletalMesh, e.AnimClass);
            this.EIe?.SetModelConfig(e.ModelId);
            this.Hte?.UpdateModelResPath();
            CharacterMorphComponent_1.A4g.Stop();
            CharacterMorphComponent_1.D4g.Start();
            this.pW_();
            this.YIu();
            CharacterMorphComponent_1.D4g.Stop();
            CharacterMorphComponent_1.U4g.Start();
            this.vW_();
            this.OQ_();
            this.gZ_();
            CharacterMorphComponent_1.U4g.Stop();
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this.Entity, t, o);
            EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this.Entity, t, o);
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
    var o;
    var i;
    var r = this.Gce;
    if (r && (i = (o = this.CW_?.ComponentFloatParams?.get(MOVE_COMPONENT))?.get(MOVE_MAX_STEP_HEIGHT), t = o?.get(MOVE_WALKABLE_FLOOR_ANGLE), e = o?.get(MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY), o = o?.get(MOVE_DEFAULT_WATER_MOVEMENT_MODE), this.m6_ !== 0 ? (i !== undefined && r.SetStepHeight(i), t !== undefined && r.SetWalkableFloorAngle(t)) : (r.ResetStepHeight(), r.ResetWalkableFloorAngle()), i = r.CharacterMovement) && (e !== undefined && (i.bMaintainHorizontalGroundVelocity = Boolean(e)), o !== undefined)) {
      i.DefaultWaterMovementMode = o;
    }
  }
  gZ_() {
    var t;
    if (this.Hte?.Actor.Mesh && (t = this.CW_?.ComponentVectorParams?.get(MESH_COMPONENT)?.get(MESH_LOCATION))) {
      this.nnf?.SetOriginLocation(t);
    }
  }
  vW_() {
    var e = this.Hte;
    if (e) {
      let t = 0;
      var o;
      var i;
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
          ControllerHolder_1.ControllerHolder.GameBudgetCenterRoleController.SetCenterOffset(Vector_1.Vector.ZeroVectorDouble);
        }
      } else {
        o = (h = this.CW_?.ComponentFloatParams?.get(CAPSULE_COMPONENT))?.get(CAPSULE_HALF_HEIGHT);
        h = h?.get(CAPSULE_RADIUS);
        if (o !== undefined || h !== undefined) {
          o = o ?? e.HalfHeight;
          h = h ?? e.Radius;
          if (o > 0 && h > 0) {
            if (IS_ENABLE_OPTIMIZE) {
              e.SetRadiusAndHalfHeight(h, o, false, false);
              t = o - e.DefaultHalfHeight;
            } else {
              e.SetRadiusAndHalfHeight(h, o, true, true);
            }
            if (s && (i = e.DefaultHalfHeight, r = e.DefaultRadius, i > 0) && r > 0) {
              this.WIu ||= Vector_1.Vector.Create(0, 0, -(o + h - i - r));
              ControllerHolder_1.ControllerHolder.GameBudgetCenterRoleController.SetCenterOffset(this.WIu.ToUeVector());
            }
            this.U3u = e.DefaultHalfHeight;
            this.D3u = e.DefaultRadius;
            e.SetDefaultRadiusAndHalfHeight(h, o);
          } else if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]更新胶囊体失败, 参数非法", ["Radius", h], ["HalfHeight", o]);
          }
        }
      }
      if (IS_ENABLE_OPTIMIZE && s && (i = this.CBg.IsNearGround ? t - this.CBg.NearGroundDist : t) !== 0 && (r = e.Actor.CharacterMovement?.MovementMode, h = e.Actor.CharacterMovement?.CustomMovementMode, r === 1 || r === 2 || r === 0 || h === CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_FLOATING && this.CBg.IsNearGround)) {
        this.cz ||= Vector_1.Vector.Create();
        this.cz.FromUeVector(e.ActorLocation);
        this.cz.Z += i;
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
          if (e && ((t = e.AddComponentByClass(t, false, MathUtils_1.MathUtils.DefaultTransform, false)).OwnerActor = e, this.Aia = t, this.m6_ === 1) && this.Entity.GetComponent(67)) {
            ControllerHolder_1.ControllerHolder.InputController.GetInputLayer(this.Entity.Id, 1)?.SetBpInputComp(t);
          }
          this.JFu = false;
        });
      }
    }
  }
};
CharacterMorphComponent.KIu = Stats_1.Stat.Create("[CharacterMorphComponent]SetMorphType");
CharacterMorphComponent.A4g = Stats_1.Stat.Create("[CharacterMorphComponent]UpdateModel");
CharacterMorphComponent.D4g = Stats_1.Stat.Create("[CharacterMorphComponent]UpdateMovement");
CharacterMorphComponent.U4g = Stats_1.Stat.Create("[CharacterMorphComponent]UpdateComponents");
CharacterMorphComponent = CharacterMorphComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(308)], CharacterMorphComponent);
exports.CharacterMorphComponent = CharacterMorphComponent; //# sourceMappingURL=CharacterMorphComponent.js.map