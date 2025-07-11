"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const QueryTypeDefine_1 = require("../../../../../Core/Define/QueryTypeDefine");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const CollisionUtils_1 = require("../../../../../Core/Utils/CollisionUtils");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const GameSettingsDeviceRender_1 = require("../../../../GameSettings/GameSettingsDeviceRender");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const CombineMeshTool_1 = require("../../Common/Blueprint/Utils/CombineMeshTool");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
const CharacterDitherEffectController_1 = require("../../Common/Component/Effect/CharacterDitherEffectController");
const SimpleNpcController_1 = require("../Logics/SimpleNpcController");
const SimpleNpcFlowLogic_1 = require("../Logics/SimpleNpcFlowLogic");
const SimpleNpcLoadController_1 = require("../Logics/SimpleNpcLoadController");
const PROFILE_KEY = "SimpleNpc_FindFloor";
const DEFAULT_HALF_HEIGHT = 85;
const DEFAULT_RADIUS = 25;
const DEFAULT_MESH_YAW = -90;
const FIND_FLOOR_RAY_LENGTH = 500;
const MIN_EDITOR_MOVE_CHANGED = 900;
const LOGIC_TICK_INTERVAL = 100;
class TsSimpleNpc extends UE.KuroEffectActor {
  constructor() {
    super(...arguments);
    this.CapsuleCollision = undefined;
    this.Mesh = undefined;
    this.CharRenderingComponent = undefined;
    this.DA = undefined;
    this.DisappearOnSunny = false;
    this.DisappearOnCloudy = false;
    this.DisappearOnRainy = false;
    this.DisappearOnThunderRain = false;
    this.DisappearOnSnowy = false;
    this.LodLevel = 0;
    this.DebugDitherValue = -0;
    this.TempDistanceSquared = -0;
    this.CurDither = -0;
    this.IsNotUnload = false;
    this.FlowLogic = undefined;
    this.TempLocation = undefined;
    this.CachedLocation = undefined;
    this.TempAnimInstance = undefined;
    this.TempAnimAsset = undefined;
    this.TempDaPath = undefined;
    this.NeedResetCollision = false;
    this.IsDirty = false;
    this.StartLocation = undefined;
    this.StartLocationProxy = undefined;
    this.InstanceId = 0;
    this.DitherEffectControllerInternal = undefined;
    this.IsInLogicRangeInternal = undefined;
    this.RegisterLoopTimerId = undefined;
    this.LastGameSeconds = -0;
    this.IsModelLoadedInternal = false;
    this.IsShowShadow = undefined;
    this.IsTickEnabled = undefined;
    this.CachedComponents = undefined;
  }
  Constructor() {
    this.TempDistanceSquared = -0;
    this.CurDither = -0;
    this.IsNotUnload = false;
    this.FlowLogic = undefined;
    this.TempLocation = undefined;
    this.CachedLocation = undefined;
    this.TempAnimInstance = undefined;
    this.TempAnimAsset = undefined;
    this.TempDaPath = undefined;
    this.NeedResetCollision = false;
    this.IsDirty = false;
    this.StartLocation = undefined;
    this.StartLocationProxy = undefined;
    this.InstanceId = 0;
    this.DitherEffectControllerInternal = undefined;
    this.IsInLogicRangeInternal = undefined;
    this.RegisterLoopTimerId = undefined;
    this.LastGameSeconds = -0;
    this.IsModelLoadedInternal = false;
    this.IsShowShadow = undefined;
    this.IsTickEnabled = undefined;
    this.CachedComponents = undefined;
  }
  get DitherEffectController() {
    this.DitherEffectControllerInternal ||= new CharacterDitherEffectController_1.CharacterDitherEffectController(this, this.CharRenderingComponent);
    return this.DitherEffectControllerInternal;
  }
  EditorInit() {
    super.EditorInit();
    this.bEditorTickBySelected = true;
    this.CachedLocation = Vector_1.Vector.Create();
    this.TempLocation = Vector_1.Vector.Create();
    this.CachedLocation.FromUeVector(this.D_K2_GetActorLocation());
    if (this.Mesh) {
      this.TempAnimInstance = this.Mesh.AnimScriptInstance;
      this.TempAnimAsset = this.Mesh.AnimationData.AnimToPlay;
    }
    this.TempDaPath = this.DA.AssetPathName?.toString();
    this.LoadModel();
    if (!this.Tags.Contains(CharacterNameDefines_1.CharacterNameDefines.PFT_NO_SPAWN)) {
      this.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.PFT_NO_SPAWN);
    }
    this.bSetActorComponentTickEnabledByFocus = true;
    this.EditorSetActorComponentsTickEnabled(false);
  }
  EditorTick(i) {
    if (this.TempLocation) {
      this.TempLocation.FromUeVector(this.D_K2_GetActorLocation());
      if (Vector_1.Vector.DistSquared(this.CachedLocation, this.TempLocation) > MIN_EDITOR_MOVE_CHANGED) {
        this.CachedLocation.DeepCopy(this.TempLocation);
        this.IsDirty = true;
      } else {
        if (this.Mesh) {
          if (this.Mesh.AnimationMode === 0) {
            this.TempAnimAsset = undefined;
            if (this.Mesh.AnimScriptInstance !== this.TempAnimInstance) {
              this.TempAnimInstance = this.Mesh.AnimScriptInstance;
              this.IsDirty = true;
              return;
            }
          } else if (this.Mesh.AnimationMode === 1 && (this.TempAnimInstance = undefined, this.Mesh.AnimationData.AnimToPlay !== this.TempAnimAsset)) {
            this.TempAnimAsset = this.Mesh.AnimationData.AnimToPlay;
            this.IsDirty = true;
            return;
          }
        }
        if (this.TempDaPath !== this.DA.AssetPathName?.toString()) {
          this.TempDaPath = this.DA.AssetPathName.toString();
          this.IsDirty = true;
        } else if (this.IsDirty) {
          this.IsDirty = false;
          this.LoadModel();
          UE.KuroStaticLibrary.SetActorModify(this);
        } else if (this.NeedResetCollision) {
          this.NeedResetCollision = false;
          this.SetDefaultCollision();
          this.ResetMeshLocation();
        }
      }
    } else {
      this.EditorInit();
    }
  }
  ReceiveBeginPlay() {
    this.InitData();
  }
  InitData() {
    this.FindComponents();
    this.InitCollisionInfo();
    this.InitBaseInfo();
    this.InitRenderInfo();
    this.InitDaInfo();
    this.SetTickEnabled(false);
    this.SetMainShadowEnabled(false);
    SimpleNpcController_1.SimpleNpcController.Add(this);
    this.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE);
  }
  InitCollisionInfo() {
    this.CapsuleCollision.bCanCharacterStandOn = false;
    this.CapsuleCollision.CanCharacterStepUpOn = 0;
    this.CapsuleCollision.SetCollisionObjectType(0);
    this.CapsuleCollision.SetCollisionResponseToAllChannels(0);
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(this.CapsuleCollision, 0, 2);
  }
  InitBaseInfo() {
    this.FlowLogic = new SimpleNpcFlowLogic_1.SimpleNpcFlowLogic(this);
    this.StartLocation = this.D_K2_GetActorLocation();
    this.StartLocationProxy = Vector_1.Vector.Create(this.StartLocation);
    this.IsInLogicRangeInternal = false;
    this.RegisterLoopTimerId = undefined;
    var i = Global_1.Global.BaseCharacter;
    if (i) {
      i = i.CharacterActorComponent.ActorLocationProxy;
      this.TempDistanceSquared = Vector_1.Vector.DistSquared(this.StartLocationProxy, i);
    }
    this.InstanceId = ++TsSimpleNpc.InstanceCount;
    if (GlobalData_1.GlobalData.IsPlayInEditor && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 29, "创建SimpleNpc", ["Id", this.InstanceId]);
    }
  }
  InitRenderInfo() {
    this.CharRenderingComponent.Init(3);
    this.SetPrimitiveEntityType(2);
    this.SetAnimUROParams();
  }
  InitDaInfo() {
    if (ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(this.DA)) {
      this.IsNotUnload = true;
      this.IsModelLoadedInternal = false;
    } else {
      this.IsModelLoadedInternal = true;
      if (!GlobalData_1.GlobalData.IsPlayInEditor) {
        this.CacheComponents();
        this.CloseSkeletalMeshShadow();
      }
      this.CharRenderingComponent.UpdateNpcDitherComponent();
      SimpleNpcController_1.SimpleNpcController.CheckNpcShowState(this, true);
    }
  }
  ReceiveEndPlay() {
    SimpleNpcController_1.SimpleNpcController.Remove(this);
    if (this.RegisterLoopTimerId !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.RegisterLoopTimerId);
      this.RegisterLoopTimerId = undefined;
    }
    if (this.FlowLogic) {
      this.FlowLogic.Dispose();
      this.FlowLogic = undefined;
    }
    this.DA = undefined;
    this.DitherEffectControllerInternal = undefined;
    this.CachedComponents = undefined;
    if (GlobalData_1.GlobalData.IsPlayInEditor && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("World", 29, "销毁SimpleNpc", ["Id", this.InstanceId], ["DeleteCount", ++TsSimpleNpc.DeleteCount]);
    }
  }
  FindComponents() {
    if (!this.CapsuleCollision || !this.CapsuleCollision.IsValid()) {
      this.CapsuleCollision = this.GetComponentByClass(UE.CapsuleComponent.StaticClass());
    }
    if (!this.Mesh || !this.Mesh.IsValid()) {
      this.Mesh = this.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
    }
    if (!this.CharRenderingComponent || !this.CharRenderingComponent.IsValid()) {
      this.CharRenderingComponent = this.GetComponentByClass(UE.CharRenderingComponent_C.StaticClass());
    }
  }
  LoadModel() {
    this.FindComponents();
    this.IsNotUnload = true;
    this.LoadModelByDA();
  }
  DebugSetNpcDitherValue(i) {
    this.SetDitherEffect(i, 1);
  }
  SetDefaultCollision() {
    var i;
    if (this.Mesh?.SkeletalMesh) {
      i = this.Mesh.SkeletalMesh.GetBounds();
      this.CapsuleCollision.CapsuleHalfHeight = i ? i.BoxExtent.GetMax() : DEFAULT_HALF_HEIGHT;
    } else {
      this.CapsuleCollision.CapsuleHalfHeight = DEFAULT_HALF_HEIGHT;
    }
    this.CapsuleCollision.CapsuleRadius = DEFAULT_RADIUS;
  }
  ResetMeshLocation() {
    this.Mesh.D_K2_SetRelativeTransform(new UE.TransformDouble(new UE.Rotator(0, DEFAULT_MESH_YAW, 0), new UE.VectorDouble(0, 0, -this.CapsuleCollision.CapsuleHalfHeight), Vector_1.Vector.OneVectorDouble), false, undefined, false);
  }
  FindFloor() {
    this.FindComponents();
    var i = this.CapsuleCollision.GetScaledCapsuleHalfHeight();
    var t = this.CapsuleCollision.GetScaledCapsuleRadius();
    var s = this.D_K2_GetActorLocation();
    var e = new UE.Vector(s.X, s.Y, s.Z - FIND_FLOOR_RAY_LENGTH - (i - t));
    if (!TsSimpleNpc.SphereTrace) {
      TsSimpleNpc.SphereTrace = UE.NewObject(UE.TraceSphereElement.StaticClass());
      TsSimpleNpc.SphereTrace.bIsSingle = true;
      TsSimpleNpc.SphereTrace.bIgnoreSelf = true;
      TsSimpleNpc.SphereTrace.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    }
    var h = TsSimpleNpc.SphereTrace;
    h.WorldContextObject = this;
    h.Radius = t;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(h, s);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(h, e);
    var s = TraceElementCommon_1.TraceElementCommon.SphereTrace(h, PROFILE_KEY);
    var e = h.HitResult;
    if (s && e.bBlockingHit) {
      h = new UE.VectorDouble();
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(e, 0, h);
      h.Z += i - t;
      this.D_K2_SetActorLocation(h, false, undefined, false);
    }
  }
  LoadModelByDA() {
    var i;
    return !!this.CapsuleCollision && !!this.Mesh && !!ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(this.DA) && !!(i = this.DA.AssetPathName?.toString()) && !(ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.PD_NpcSetupData_C, i => {
      if (this.IsNotUnload) {
        this.HandleLoadedDaConfig(i);
      }
      this.SetTickEnabled(this.IsInLogicRangeInternal);
      this.SetMainShadowEnabled(this.IsInLogicRangeInternal);
    }), 0);
  }
  HandleLoadedDaConfig(i, t = false) {
    if (i) {
      if (this.CapsuleCollision && this.Mesh) {
        CombineMeshTool_1.CombineMeshTool.LoadDaConfig(this, this.CapsuleCollision.GetRelativeTransform(), this.Mesh, i);
        if (!t) {
          this.CharRenderingComponent.UpdateNpcDitherComponent();
          SimpleNpcController_1.SimpleNpcController.CheckNpcShowState(this, true);
        }
        if (!GlobalData_1.GlobalData.IsPlayInEditor) {
          this.CacheComponents();
          this.CloseSkeletalMeshShadow();
        }
        this.NeedResetCollision = true;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 29, "[TsSimpleNpc.HandleLoadedDaConfig] DA资源类型错误");
    }
  }
  StartFlowLogic() {
    if (this.FlowLogic) {
      this.FlowLogic.StartFlowLogic();
    }
  }
  SetDitherEffect(i, t = 3) {
    this.DitherEffectController.SetDitherEffect(i, t);
  }
  ShowDialog(i, t = -1) {
    if (this.FlowLogic) {
      this.FlowLogic.AddHeadView().then(() => {
        this.FlowLogic.ShowDialog(i, t);
      });
    }
  }
  HideDialog() {
    if (this.FlowLogic) {
      this.FlowLogic.HideDialog();
    }
  }
  TryPlayMontage(i) {
    return !!this.FlowLogic && this.FlowLogic.TryPlayMontage(i);
  }
  StopMontage() {
    if (this.FlowLogic) {
      this.FlowLogic.StopMontage();
    }
  }
  FilterFlowWorldState() {
    this.FlowLogic?.FilterFlowWorldState();
  }
  get IsHiding() {
    return !this.IsNotUnload;
  }
  get SelfLocation() {
    return this.StartLocation;
  }
  get SelfLocationProxy() {
    return this.StartLocationProxy;
  }
  get IsInLogicRange() {
    return this.IsInLogicRangeInternal;
  }
  ChangeLogicRangeState(i) {
    if (this.IsInLogicRangeInternal !== i) {
      if (i) {
        if (!this.IsModelLoadedInternal) {
          SimpleNpcLoadController_1.SimpleNpcLoadController.AddSimpleNpc(this);
          this.IsModelLoadedInternal = true;
        }
        this.SetLogicTickRunning(true);
      } else {
        this.SetLogicTickRunning(false);
      }
    }
    this.IsInLogicRangeInternal = i;
  }
  SetLogicTickRunning(i) {
    if (i) {
      if (this.RegisterLoopTimerId === undefined) {
        this.LastGameSeconds = Time_1.Time.WorldTimeSeconds;
        this.RegisterLoopTimerId = TimerSystem_1.TimerSystem.Forever(() => {
          this.OnLogicTick();
        }, LOGIC_TICK_INTERVAL);
      }
    } else if (this.RegisterLoopTimerId !== undefined && (TimerSystem_1.TimerSystem.Has(this.RegisterLoopTimerId) && TimerSystem_1.TimerSystem.Remove(this.RegisterLoopTimerId), this.RegisterLoopTimerId = undefined, this.FlowLogic)) {
      this.FlowLogic.ForceStopFlow();
    }
  }
  OnLogicTick() {
    var i = Time_1.Time.WorldTimeSeconds;
    var t = i - this.LastGameSeconds;
    this.LastGameSeconds = i;
    if (this.FlowLogic) {
      this.FlowLogic.Tick(t);
    }
  }
  CacheComponents() {
    this.CachedComponents = this.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
  }
  SetTickEnabled(s) {
    if (s !== this.IsTickEnabled) {
      this.IsTickEnabled = s;
      var e = this.CachedComponents || this.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
      for (let i = 0, t = e.Num(); i < t; i++) {
        var h = e.Get(i);
        if (h) {
          h.SetComponentTickEnabled(s);
        }
      }
    }
  }
  CloseSkeletalMeshShadow() {
    if (this.CachedComponents) {
      for (let i = 0, t = this.CachedComponents.Num(); i < t; i++) {
        var s = this.CachedComponents.Get(i);
        if (s && s instanceof UE.SkeletalMeshComponent) {
          s.SetCastShadow(false);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("NPC", 24, "You must call CloseSkeletalMeshShadow after CacheComponents");
    }
  }
  SetMainShadowEnabled(s) {
    if (s === this.IsShowShadow) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 24, "SetShadowEnabled, value === this.IsShowShadow", ["Value", s], ["IsShowShadow", this.IsShowShadow]);
      }
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Entity", 24, "SetShadowEnabled, value !== this.IsShowShadow", ["Value", s], ["IsShowShadow", this.IsShowShadow]);
      }
      this.IsShowShadow = s;
      var e = this.CachedComponents || this.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
      if (e) {
        for (let i = 0, t = e.Num(); i < t; i++) {
          var h = e.Get(i);
          if (h && h instanceof UE.SkinnedMeshComponent && !(h instanceof UE.SkeletalMeshComponent) && (h.SetCastShadow(s), Log_1.Log.CheckInfo())) {
            Log_1.Log.Info("Entity", 24, "SetShadowEnabled, SetCastShadow", ["Value", s]);
          }
        }
      }
    }
  }
  get IsLodShow() {
    return !Info_1.Info.IsGameRunning() || !(GameSettingsDeviceRender_1.GameSettingsDeviceRender.GameQualitySettingLevel < this.LodLevel);
  }
  SetAnimUROParams() {
    var t = new UE.AnimUpdateRateParameters();
    t.bShouldUseLodMap = true;
    var s = this.Mesh.LODInfo.Num();
    t.LODToFrameSkipMap.Empty();
    for (let i = 0; i < s; i++) {
      t.LODToFrameSkipMap.Add(i, i < 2 ? 0 : i - 1);
    }
    t.BaseNonRenderedUpdateRate = 8;
    t.MaxEvalRateForInterpolation = s;
    var e = (0, puerts_1.$ref)(t);
    var h = this.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
    for (let i = 0; i < h.Num(); i++) {
      var o = h.Get(i);
      o.bEnableUpdateRateOptimizations = true;
      o.SetAnimUpdateRateParameters(e);
      o.VisibilityBasedAnimTickOption = 3;
    }
    (0, puerts_1.$unref)(e);
  }
}
TsSimpleNpc.InstanceCount = 0;
TsSimpleNpc.DeleteCount = 0;
TsSimpleNpc.SphereTrace = undefined;
exports.default = TsSimpleNpc; //# sourceMappingURL=TsSimpleNpc.js.map