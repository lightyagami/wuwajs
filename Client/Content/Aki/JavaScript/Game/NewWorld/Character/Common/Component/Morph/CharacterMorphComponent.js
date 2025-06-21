"use strict";
var CharacterMorphComponent_1, __decorate = this && this.__decorate || function(t, e, i, o) {
  var r, h = arguments.length,
    s = h < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, o);
  else
    for (var a = t.length - 1; 0 <= a; a--)(r = t[a]) && (s = (h < 3 ? r(s) : 3 < h ? r(e, i, s) : r(e, i)) || s);
  return 3 < h && s && Object.defineProperty(e, i, s), s
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CharacterMorphComponent = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../../Core/Common/Stats"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  ModelUtil_1 = require("../../../../../../Core/Utils/ModelUtil"),
  CameraController_1 = require("../../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  CharacterNameDefines_1 = require("../../CharacterNameDefines"),
  CAPSULE_COMPONENT = "胶囊体组件",
  CAPSULE_HALF_HEIGHT = "胶囊体半高",
  CAPSULE_RADIUS = "胶囊体半径",
  MESH_COMPONENT = "网格体",
  MESH_LOCATION = "位置",
  MOVE_COMPONENT = "角色移动",
  MOVE_MAX_STEP_HEIGHT = "最大步高",
  MOVE_WALKABLE_FLOOR_ANGLE = "可行走地面角度",
  MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY = "维持水平地面速度",
  MOVE_DEFAULT_WATER_MOVEMENT_MODE = "默认水中运动模式",
  IS_ENABLE_OPTIMIZE = !0;
let CharacterMorphComponent = CharacterMorphComponent_1 = class CharacterMorphComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.m6_ = 0, this.CW_ = void 0, this.qQ_ = !1, this.f6_ = void 0, this.g6_ = void 0, this.gRc = void 0, this.CRc = void 0, this.pRc = void 0, this.vRc = void 0, this.EIe = void 0, this.C6_ = void 0, this.Hte = void 0, this.Gce = void 0, this.Lie = void 0, this.mcu = void 0, this.fcu = !1, this.gcu = void 0, this.Aia = void 0, this.egu = !1, this.cz = void 0, this._gu = 0, this.ugu = 0, this.Ccu = (t, e) => {
      e ? this.SetMorphType(1) : this.SetMorphType(0)
    }
  }
  OnInitData() {
    return !0
  }
  OnStart() {
    return this.EIe = this.Entity.GetComponent(0), this.C6_ = this.Entity.GetComponent(219), this.Hte = this.Entity.GetComponent(3), this.Gce = this.Entity.GetComponent(178), this.Lie = this.Entity.GetComponent(205), this.p6_(), this.qQ_ && (this.Lie && (this.mcu = this.Lie.ListenForTagAddOrRemove(-1867735064, this.Ccu)), this.Hte?.IsRoleAndCtrlByMe && this.tgu(), this.cz = Vector_1.Vector.Create()), !0
  }
  OnEnd() {
    var t;
    return this.qQ_ && (0 !== this.m6_ && (t = this.GetMorphCameraConfig()) && CameraController_1.CameraController.UnloadCharacterCameraConfig(t), this.mcu?.EndTask(), this.mcu = void 0, this.f6_ = void 0, this.g6_ = void 0, this.gRc = void 0, this.CRc = void 0, this.pRc = void 0, this.vRc = void 0, this.Aia = void 0, this.egu = !1, this.cz = void 0, this.qQ_ = !1), !0
  }
  p6_() {
    if (this.dZ_(), this.g6_) {
      var t, e, i, o, r, h = this.C6_?.GetFightInfo()?.MorphModelInfoMap,
        s = new Map;
      for ([t, e] of this.g6_.entries()) 0 === e ? (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[CharacterMorphComponent]初始化获取ModelId有误", ["ModelId", e], ["MorphType", t]), s.set(t, {
        ModelId: 0
      })) : (i = ModelUtil_1.ModelUtil.GetModelConfig(e), o = h?.Get(t), r = {
        ModelId: e,
        SkeletalMesh: ResourceSystem_1.ResourceSystem.GetLoadedAsset(i.网格体.ToAssetPathName(), UE.SkeletalMesh),
        AnimClass: ResourceSystem_1.ResourceSystem.GetLoadedAsset(i.动画蓝图.ToAssetPathName(), UE.Class),
        ComponentFloatParams: new Map,
        ComponentVectorParams: new Map
      }, 1 === t && (r.DtBaseMovementSetting = o?.DtBaseMovementSetting, r.DtCameraConfig = o?.DtCameraConfig, r.InputComponentClass = o?.InputComponentClass, this.mZ_(r, o?.ComponentFloatParams), this.fZ_(r, o?.ComponentVectorParams)), r.SkeletalMesh || Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[CharacterMorphComponent]初始化资源有误", ["ModelId", e], ["MorphType", t], ["SkeletalMeshPath", i.网格体.ToAssetPathName()]), r.AnimClass || Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 67, "[CharacterMorphComponent]初始化资源有误", ["ModelId", e], ["MorphType", t], ["AnimClassPath", i.动画蓝图.ToAssetPathName()]), s.set(t, r));
      this.f6_ = s, this.qQ_ = 0 !== s.size
    }
  }
  dZ_() {
    if (!this.g6_) {
      var e = this.C6_?.GetFightInfo()?.MorphModelInfoMap;
      if (e && 0 < e.Num()) {
        var t, i = new Map;
        for (let t = 0; t < e.Num(); t++) {
          var o, r = e.GetKey(t);
          0 === r ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]不需要配置默认形态") : (o = e.Get(r)) && (0 !== o.ModelId ? i.set(r, o.ModelId) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]多形态配置的模型Id为0", ["MorphType", r]))
        }
        0 < i.size && 0 !== (t = this.EIe?.GetModelId() ?? 0) && (i.set(0, t), this.g6_ = i)
      }
    }
  }
  mZ_(t, e) {
    if (e) {
      var i = t.ComponentFloatParams;
      for (let t = 0; t < e.Num(); t++) {
        var o = e.GetKey(t),
          r = e.Get(o),
          o = o.split(".");
        if (!(void 0 === r || o.length < 2)) {
          var h = o[0],
            o = o[1];
          let t = i.get(h);
          t || (t = new Map, i.set(h, t)), t.set(o, r)
        }
      }
    }
  }
  fZ_(t, e) {
    if (e) {
      var i = t.ComponentVectorParams;
      for (let t = 0; t < e.Num(); t++) {
        var o = e.GetKey(t),
          r = e.Get(o),
          o = o.split(".");
        if (!(void 0 === r || o.length < 2)) {
          var h = o[0],
            o = o[1];
          let t = i.get(h);
          t || (t = new Map, i.set(h, t));
          h = Vector_1.Vector.Create();
          h.FromUeVector(r), t.set(o, h)
        }
      }
    }
  }
  GetMorphType() {
    return this.m6_
  }
  GetMorphData(t = void 0) {
    return void 0 !== t ? this.f6_?.get(t) : this.CW_
  }
  GetMorphCameraConfig(t = void 0) {
    t = t ?? this.m6_, t = this.GetMorphData(t)?.DtCameraConfig?.ToAssetPathName() ?? "";
    let e = void 0;
    if (!t || "None" === t || (e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable))?.IsValid()) return e
  }
  GetMorphBpInputComp() {
    return this.Aia
  }
  v6_(t) {
    return t < 2
  }
  IsEnableMorph() {
    return this.qQ_
  }
  IsMorphing() {
    return 0 !== this.m6_
  }
  HasComponentFloatParam(t, e, i) {
    t = this.GetMorphData(t);
    return !!t && void 0 !== t.ComponentFloatParams?.get(e)?.get(i)
  }
  SetComponentFloatParam(e, i, o, r) {
    e = this.GetMorphData(e);
    if (e) {
      e = e.ComponentFloatParams;
      let t = e?.get(i);
      void 0 === t && (t = new Map, e?.set(i, t)), t.set(o, r)
    }
  }
  HasComponentVectorParam(t, e, i) {
    t = this.GetMorphData(t);
    return !!t && void 0 !== t.ComponentVectorParams?.get(e)?.get(i)
  }
  SetComponentVectorParam(e, i, o, r) {
    e = this.GetMorphData(e);
    if (e) {
      e = e.ComponentVectorParams;
      let t = e?.get(i);
      void 0 === t && (t = new Map, e?.set(i, t)), t.set(o, r)
    }
  }
  SetAssetElement(t, e) {
    void 0 === this.gRc && (this.gRc = new Map), this.gRc.set(t, e)
  }
  AddMontage(i, o, r) {
    var h = this.vRc?.get(r);
    if (h) {
      void 0 === this.CRc && (this.CRc = new Map);
      let t = this.CRc.get(h),
        e = (t || (t = new Map, this.CRc.set(h, t)), t.set(i, o), void 0 === this.pRc && (this.pRc = new Map), this.pRc.get(h));
      e || (e = new Map, this.pRc.set(h, e)), e.set(i, r)
    }
  }
  AddMorphMontagePath(t, e) {
    void 0 === this.vRc && (this.vRc = new Map), this.vRc.set(t, e)
  }
  IsMorphMontage(t) {
    return !!this.vRc?.has(t)
  }
  GetMontageByName(t) {
    return this.CRc?.get(this.m6_)?.get(t)
  }
  GetMontagePathByName(t) {
    return this.pRc?.get(this.m6_)?.get(t)
  }
  GetCenterActorLocationOffset() {
    if (this.IsMorphing() && this.gcu) return this.gcu.ToUeVector()
  }
  SetMorphType(t) {
    var e, i;
    t !== this.m6_ && (this.v6_(t) ? (e = this.f6_?.get(t)) ? e.SkeletalMesh && e.AnimClass ? (CharacterMorphComponent_1.pcu.Start(), this.vcu(), CombatLog_1.CombatLog.Info("Skill", this.Entity, "设置形态成功, 开始切换", ["MorphType", t]), i = this.m6_, this.m6_ = t, this.CW_ = e, EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.Entity, t, i), this.Hte?.ChangeMeshAnim(e.SkeletalMesh, e.AnimClass), this.EIe?.SetModelConfig(e.ModelId), this.Hte?.UpdateModelResPath(), this.pW_(), this.ycu(), this.vW_(), this.OQ_(), this.gZ_(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this.Entity, t, i), EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnCharacterMorphTypeChanged, this.Entity, t, i), CharacterMorphComponent_1.pcu.Stop()) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 67, "[CharacterMorphComponent]设置形态失败, 对应形态数据有误", ["MorphType", t], ["SkeletalMesh", e.SkeletalMesh], ["AnimClass", e.AnimClass]) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 67, "[CharacterMorphComponent]设置形态失败, 无对应形态数据", ["MorphType", t]) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 67, "[CharacterMorphComponent]设置了无效的形态类型", ["MorphType", t]))
  }
  pW_() {
    if (this.Gce) {
      let t = void 0;
      var e;
      (t = 0 === this.m6_ ? this.Hte?.Actor.DtBaseMovementSetting : this.CW_?.DtBaseMovementSetting?.Get()) && (e = DataTableUtil_1.DataTableUtil.GetDataTableRow(t, CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString())) && this.Gce.SetMovementData(e, !0)
    }
  }
  ycu() {
    var t, e, i, o, r = this.Gce;
    r && (o = (i = this.CW_?.ComponentFloatParams?.get(MOVE_COMPONENT))?.get(MOVE_MAX_STEP_HEIGHT), t = i?.get(MOVE_WALKABLE_FLOOR_ANGLE), e = i?.get(MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY), i = i?.get(MOVE_DEFAULT_WATER_MOVEMENT_MODE), 0 !== this.m6_ ? (void 0 !== o && r.SetStepHeight(o), void 0 !== t && r.SetWalkableFloorAngle(t)) : (r.ResetStepHeight(), r.ResetWalkableFloorAngle()), o = r.CharacterMovement) && (void 0 !== e && (o.bMaintainHorizontalGroundVelocity = Boolean(e)), void 0 !== i) && (o.DefaultWaterMovementMode = i)
  }
  gZ_() {
    var t, e = this.Hte?.Actor.Mesh;
    e && (t = (this.CW_?.ComponentVectorParams?.get(MESH_COMPONENT))?.get(MESH_LOCATION)) && e.K2_SetRelativeLocation(t.ToUeVectorOld(), !1, void 0, !1)
  }
  vW_() {
    var e = this.Hte;
    if (e) {
      let t = 0;
      var i, o, r, h, s = e.IsRoleAndCtrlByMe;
      0 === this.m6_ ? (t = this.ugu - e.HalfHeight, e.SetDefaultRadiusAndHalfHeight(this._gu, this.ugu), IS_ENABLE_OPTIMIZE ? e.SetRadiusAndHalfHeight(this._gu, this.ugu, !1, !1) : e.ResetCapsuleRadiusAndHeight(!0), s && ControllerHolder_1.ControllerHolder.GameBudgetInterfaceController.SetCenterActorLocationOffset(Vector_1.Vector.ZeroVectorDouble)) : (o = (r = this.CW_?.ComponentFloatParams?.get(CAPSULE_COMPONENT))?.get(CAPSULE_HALF_HEIGHT), r = r?.get(CAPSULE_RADIUS), void 0 === o && void 0 === r || (o = o ?? e.HalfHeight, r = r ?? e.Radius, 0 < o && 0 < r ? (IS_ENABLE_OPTIMIZE ? (e.SetRadiusAndHalfHeight(r, o, !1, !1), t = o - e.DefaultHalfHeight) : e.SetRadiusAndHalfHeight(r, o, !0, !0), s && (h = e.DefaultHalfHeight, i = e.DefaultRadius, 0 < h) && 0 < i && (this.gcu || (this.gcu = Vector_1.Vector.Create(0, 0, -(o + r - h - i))), ControllerHolder_1.ControllerHolder.GameBudgetInterfaceController.SetCenterActorLocationOffset(this.gcu.ToUeVector())), this.ugu = e.DefaultHalfHeight, this._gu = e.DefaultRadius, e.SetDefaultRadiusAndHalfHeight(r, o)) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[CharacterMorphComponent]更新胶囊体失败, 参数非法", ["Radius", r], ["HalfHeight", o]))), IS_ENABLE_OPTIMIZE && s && 0 !== t && (1 === (h = e.Actor.CharacterMovement?.MovementMode) || 2 === h || 0 === h) && (this.cz || (this.cz = Vector_1.Vector.Create()), this.cz.FromUeVector(e.ActorLocation), this.cz.Z += t, e.SetActorLocation(this.cz.ToUeVector(), "角色形态改变修改胶囊体的位置修正优化"))
    }
  }
  OQ_() {
    var t, e;
    this.Hte?.IsRoleAndCtrlByMe && (t = this.Hte?.Actor.DtCameraConfig) && (e = this.GetMorphCameraConfig()) && (0 === this.m6_ ? (CameraController_1.CameraController.UnloadCharacterCameraConfig(e), CameraController_1.CameraController.LoadCharacterCameraConfig(t)) : (CameraController_1.CameraController.UnloadCharacterCameraConfig(t), CameraController_1.CameraController.LoadCharacterCameraConfig(e)))
  }
  vcu() {
    var t, e;
    0 !== this.m6_ || this.fcu || (this.fcu = !0, (t = this.Gce?.CharacterMovement) && (this.HasComponentFloatParam(1, MOVE_COMPONENT, MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY) && this.SetComponentFloatParam(0, MOVE_COMPONENT, MOVE_MAINTAIN_HORIZONTAL_GROUND_VELOCITY, Number(t.bMaintainHorizontalGroundVelocity)), this.HasComponentFloatParam(1, MOVE_COMPONENT, MOVE_DEFAULT_WATER_MOVEMENT_MODE)) && this.SetComponentFloatParam(0, MOVE_COMPONENT, MOVE_DEFAULT_WATER_MOVEMENT_MODE, Number(t.DefaultWaterMovementMode)), (t = this.Hte?.Actor.Mesh) && this.HasComponentVectorParam(1, MESH_COMPONENT, MESH_LOCATION) && ((e = Vector_1.Vector.Create()).FromUeVector(t.RelativeLocation), this.SetComponentVectorParam(0, MESH_COMPONENT, MESH_LOCATION, e)))
  }
  tgu() {
    var t;
    this.Aia || this.egu || (t = this.GetMorphData(1)?.InputComponentClass?.AssetPathName.toString()) && (this.egu = !0, ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Class, t => {
      var e = this.Hte?.Actor;
      e && ((t = e.AddComponentByClass(t, !1, MathUtils_1.MathUtils.DefaultTransform, !1)).OwnerActor = e, this.Aia = t, 1 === this.m6_) && this.Entity.GetComponent(62) && ControllerHolder_1.ControllerHolder.InputController.GetInputLayer(this.Entity.Id, 1)?.SetBpInputComp(t), this.egu = !1
    }))
  }
};
CharacterMorphComponent.pcu = Stats_1.Stat.Create("[CharacterMorphComponent]SetMorphType"), CharacterMorphComponent = CharacterMorphComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(279)], CharacterMorphComponent), exports.CharacterMorphComponent = CharacterMorphComponent;
//# sourceMappingURL=CharacterMorphComponent.js.map