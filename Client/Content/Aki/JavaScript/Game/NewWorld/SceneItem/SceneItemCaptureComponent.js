"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (s = t[a]) {
        n = (r < 3 ? s(n) : r > 3 ? s(e, i, n) : s(e, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemCaptureComponent = exports.SceneItemCaptureUtility = exports.ABSORB_PAWN_NAME_KEY = exports.VISION_CAPTURE_WITH_RANGE = exports.SPECIAL_CAPTURE_CHECK_TAG = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const SkeletalMeshEffectContext_1 = require("../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const CodeDefineLevelConditionInfo_1 = require("../../LevelGamePlay/LevelConditions/CodeDefineLevelConditionInfo");
const LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RenderModuleController_1 = require("../../Render/Manager/RenderModuleController");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const BlackboardController_1 = require("../../World/Controller/BlackboardController");
exports.SPECIAL_CAPTURE_CHECK_TAG = 1278397537;
exports.VISION_CAPTURE_WITH_RANGE = true;
const SpecialDropEntityConfigId = 310000000;
const TempRotator = new Rotator_1.Rotator(0, -90, 0);
const CHECK_WATER_OFFSET_Z = 10000;
const CHECK_GROUND_OFFSET_Z = 10000;
const CHECK_WATER_PROFILE_KEY = "SceneItemCaptureComponent_CheckWaterHit";
const CHECK_GROUND_PROFILE_KEY = "SceneItemCaptureComponent_CheckGroundHit";
const MAX_LOD = 99;
const AbsorbedStateEffectPath = "/Game/Aki/Effect/MaterialController/Absorbed/DA_Fx_Group_Huanxiangshoufu.DA_Fx_Group_Huanxiangshoufu";
const AbsorbedStartEffectPath = "/Game/Aki/Effect/EffectGroup/Common/Fight/DA_Fx_Group_Shoufu_Start.DA_Fx_Group_Shoufu_Start";
exports.ABSORB_PAWN_NAME_KEY = "Absorb";
class SceneItemCaptureUtility {
  static AU() {
    if (!this.IC) {
      this.IC = true;
      this.pwm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureCommonInteractoinRadius") ?? this.pwm;
      this.vwm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureCommonActionId") ?? this.vwm;
      this.ywm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureCommonAbsorbRadius") ?? this.ywm;
      this.Swm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureSpecialActionId") ?? this.Swm;
      this.Mwm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureSpecialAbsorbRadius") ?? this.Mwm;
      this.Ewm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureHuluDistanceMin") ?? this.Ewm;
      this.Iwm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureHuluDistanceMax") ?? this.Iwm;
      this.Twm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureHuluAltitude") ?? this.Twm;
      this.rLm = CommonParamById_1.configCommonParamById.GetIntConfig("VisionCaptureHuluOffsetOnHit") ?? this.rLm;
    }
  }
  static get HuluDistanceMin() {
    this.AU();
    return this.Ewm;
  }
  static get HuluDistanceMax() {
    this.AU();
    return this.Iwm;
  }
  static get HuluAltitude() {
    this.AU();
    return this.Twm;
  }
  static get HuluOffsetOnHit() {
    this.AU();
    return this.rLm;
  }
  static PlayerHasTagId(t) {
    var e;
    return !!Global_1.Global.BaseCharacter.IsValid() && !!(e = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(209)) && e.HasTag(t);
  }
  static IsUsageSpecialCapture() {
    return !!exports.VISION_CAPTURE_WITH_RANGE && this.PlayerHasTagId(exports.SPECIAL_CAPTURE_CHECK_TAG);
  }
  static GetCaptureInteractionRadius() {
    this.AU();
    return this.pwm;
  }
  static GetAbsorbRadius() {
    this.AU();
    if (this.IsUsageSpecialCapture()) {
      return this.Mwm;
    } else {
      return this.ywm;
    }
  }
  static GetAbsorbRadiusByBool(t) {
    this.AU();
    if (t) {
      return this.Mwm;
    } else {
      return this.ywm;
    }
  }
  static GetActionId() {
    this.AU();
    if (this.IsUsageSpecialCapture()) {
      return this.Swm;
    } else {
      return this.vwm;
    }
  }
}
(exports.SceneItemCaptureUtility = SceneItemCaptureUtility).pwm = 200;
SceneItemCaptureUtility.vwm = 220004;
SceneItemCaptureUtility.ywm = 800;
SceneItemCaptureUtility.Swm = 220005;
SceneItemCaptureUtility.Mwm = 5000;
SceneItemCaptureUtility.Ewm = 350;
SceneItemCaptureUtility.Iwm = 750;
SceneItemCaptureUtility.Twm = 300;
SceneItemCaptureUtility.rLm = 50;
SceneItemCaptureUtility.IC = false;
let SceneItemCaptureComponent = class SceneItemCaptureComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ydn = 3000;
    this.Idn = 500;
    this.rvi = 0;
    this.Lz = Vector_1.Vector.Create();
    this.az = Quat_1.Quat.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.l9e = undefined;
    this._9e = 0;
    this.Tdn = "";
    this.Ldn = 0;
    this.vzi = undefined;
    this.Mao = undefined;
    this.vao = undefined;
    this.Ddn = Vector_1.Vector.Create();
    this.Rdn = Vector_1.Vector.Create();
    this.i4o = undefined;
    this.Ora = false;
    this.Ad_ = false;
    this.OBu = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "停止声骸掉落物材质控制器的Tick ");
      }
      this.qBu = undefined;
      this.l9e.SetEffectGroupProgress(this.GOu, this._9e);
      this.l9e.UpdateMaterialEffectsOnly();
      if (this.l9e) {
        RenderModuleController_1.RenderModuleController.RemoveCharRenderShell(this.l9e);
      }
    };
    this.qBu = undefined;
    this.GOu = 0;
    this.GBu = undefined;
    this.Udn = () => {
      this.GBu = undefined;
      this.l9e.RemoveMaterialControllerDataGroupWithEnding(this._9e);
    };
    this.FBu = undefined;
    this.Adn = () => {
      this.FBu = undefined;
      this.Entity.Disable("[SceneItemCaptureComponent.OnCaptureFinished] 捕获隐藏实体");
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    };
  }
  OnActivate() {
    var t;
    this.i4o = this.Entity.GetComponent(201);
    if (this.i4o && (this.vzi = this.i4o.GetInteractController(), this.vzi) && (t = this.Entity.GetComponent(121))) {
      t.SetPawnNameKey(exports.ABSORB_PAWN_NAME_KEY);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 4, "开始生成抓取幻象Item", ["EntityId", this.Entity.Id]);
      }
      this.Cmn();
    }
  }
  OnDisable(t) {
    if (!this.Ora) {
      EffectSystem_1.EffectSystem.SetEffectHidden(this.rvi, true);
    }
  }
  OnClear() {
    if (this.qBu) {
      TimerSystem_1.TimerSystem.Remove(this.qBu);
      this.qBu = undefined;
    }
    if (this.GBu) {
      TimerSystem_1.TimerSystem.Remove(this.GBu);
      this.GBu = undefined;
    }
    if (this.FBu) {
      TimerSystem_1.TimerSystem.Remove(this.FBu);
      this.FBu = undefined;
    }
    return true;
  }
  OnEnable() {
    if (!this.Ora) {
      EffectSystem_1.EffectSystem.SetEffectHidden(this.rvi, false);
    }
  }
  OnTick(t) {
    this.i4o?.ForceUpdate();
  }
  koe() {
    this.vao = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.vao.WorldContextObject = GlobalData_1.GlobalData.World;
    this.vao.bIsSingle = true;
    this.vao.bIgnoreSelf = true;
    this.vao.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
    this.Mao = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Mao.WorldContextObject = GlobalData_1.GlobalData.World;
    this.Mao.bIsSingle = true;
    this.Mao.bIgnoreSelf = true;
    this.Mao.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Water);
  }
  Cmn() {
    let e = 0;
    const i = this.Entity.GetComponent(206);
    let t = SceneItemCaptureUtility.GetCaptureInteractionRadius();
    var o = i.CreatureData.GetPbEntityInitData();
    if ((0, IComponent_1.getComponent)(o.ComponentsData, "VisionItemComponent")) {
      o = i.CreatureData.ComponentDataMap.get("Sys")?.Sys;
      if (!o) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 4, "无法找到monsterCaptureComponent数据");
        }
        return;
      }
      var s = o.IIs;
      this.Ldn = o.F4n;
      if (o.TIs > 0 && (t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(o.TIs).InteractionRadius, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Battle", 4, "服务器下发掉落幻象设置交互范围", ["MonsterId", o.TIs], ["半径", t]);
      }
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(s);
      if (!o) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 4, "模板ID不存在", ["TemplateId", s]);
        }
        return;
      }
      s = ModelManager_1.ModelManager.CreatureModel.GetEntityModel(o.BlueprintType);
      if (!s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 4, "无法找到EntityModel", ["BlueprintType", o.BlueprintType]);
        }
        return;
      }
      e = s.ModelId;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "无法找到EComponent.VisionItemComponent");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.Ldn, this.Entity.Id);
    var r;
    var o = new LevelGameplayActionsDefine_1.ActionSendGameplayEvent();
    o.Tag = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(447475264);
    o.Both = true;
    var s = new LevelGameplayActionsDefine_1.ActionCaptureRequest();
    s.SuccessEvent = o;
    var o = new CodeDefineLevelConditionInfo_1.LevelConditionGroup();
    o.Type = 0;
    var n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName("行为状态.位置状态.空中");
    if (n) {
      (r = new CodeDefineLevelConditionInfo_1.LevelConditionCheckCharacterTagInfo()).TagId = n;
      r.IsContain = false;
      o.Conditions.push(r);
    }
    this.vzi.AddClientInteractOption(s, o, "Direct", t, undefined, 0, Vector_1.Vector.Create(0, 0, t > 100 ? 100 : t));
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "最终掉落幻象设置交互范围", ["半径", t]);
    }
    this.Ifr();
    MathUtils_1.MathUtils.ComposeRotator(TempRotator, i.ActorRotationProxy, this.Gue);
    i.SetActorRotation(this.Gue.ToUeRotator(), this.constructor.name, false);
    const a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, e.toString());
    if (a) {
      i.InitSkeletalMeshComponent();
      this.Tdn = a.蓝图.ToAssetPathName();
      this.Tdn = this.Tdn.substr(0, this.Tdn.lastIndexOf("/"));
      this.Tdn = this.Tdn.concat("/CommonAnim/Death_Shoufu.Death_Shoufu");
      this.l9e ||= i.Owner.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      if (this.l9e) {
        let t = a.声骸掉落替换模型.ToAssetPathName();
        if (t !== "") {
          this.Ad_ = true;
        } else {
          t = a.网格体.ToAssetPathName();
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.SkeletalMesh, t => {
          this.Pdn(t, i, e, a);
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "渲染组件添加失败");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 36, "模型设置为空", ["modelId", e]);
    }
  }
  Ifr() {
    if (!this.Mao || !this.vao) {
      this.koe();
    }
    var t = this.Entity.GetComponent(206);
    var e = t.ActorLocation;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, e);
    this.Lz.DeepCopy(e);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, -CHECK_WATER_OFFSET_Z);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, this.Lz);
    var i = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Mao, CHECK_WATER_PROFILE_KEY);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.vao, e);
    this.Lz.DeepCopy(e);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(t, this.Lz, -CHECK_GROUND_OFFSET_Z);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.vao, this.Lz);
    var e = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.vao, CHECK_GROUND_PROFILE_KEY);
    if (i && e) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Mao.HitResult, 0, this.Rdn);
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.vao.HitResult, 0, this.Ddn);
      t.SetActorLocation((GravityUtils_1.GravityUtils.GetZnInGravityForActor(t, this.Ddn) > GravityUtils_1.GravityUtils.GetZnInGravityForActor(t, this.Rdn) ? this.Ddn : this.Rdn).ToUeVector(), "SceneItemCaptureFixBornLocation", false);
    } else if (i) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Mao.HitResult, 0, this.Rdn);
      t.SetActorLocation(this.Rdn.ToUeVector(), "SceneItemCaptureFixBornLocation", false);
    } else if (e) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.vao.HitResult, 0, this.Ddn);
      t.SetActorLocation(this.Ddn.ToUeVector(), "SceneItemCaptureFixBornLocation", false);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "掉落幻象修正坐标", ["Pos", this.Ddn]);
    }
  }
  Pdn(t, i, e, o) {
    if (this.Entity.Valid) {
      if (t instanceof UE.SkeletalMesh) {
        if (!i?.Valid) {
          return;
        }
        if (!this.l9e?.IsValid()) {
          return;
        }
        i.SkeletalMesh.SetSkeletalMesh(t);
        this.l9e.Init(2);
        this.l9e.AddComponentByCase(0, i.SkeletalMesh);
        i.SkeletalMesh.SetHiddenInGame(true);
        i.SkeletalMesh.SetForcedLOD(MAX_LOD);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "模型加载失败！", ["ModelConfigId", e]);
      }
      t = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
      t.SkeletalMeshComp = i.SkeletalMesh;
      this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i.Owner.D_GetTransform(), AbsorbedStartEffectPath, "[SceneItemCapture.OnLoadAnimFinish]", t);
      if (o.子网格体.Num() > 0) {
        ResourceSystem_1.ResourceSystem.LoadAsync(o.子网格体.Get(0).ToAssetPathName(), UE.SkeletalMesh, t => {
          var e;
          if (t instanceof UE.SkeletalMesh) {
            (e = i.Owner.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)).SetSkeletalMesh(t);
            this.l9e.AddComponentByCase(7, e);
            e.SetMasterPoseComponent(i.SkeletalMesh);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 4, "子模型加载失败！", ["子网格体", o.子网格体]);
          }
          ResourceSystem_1.ResourceSystem.LoadAsync(AbsorbedStateEffectPath, UE.PD_CharacterControllerDataGroup_C, t => {
            this.xdn(t);
          });
        });
      } else {
        ResourceSystem_1.ResourceSystem.LoadAsync(AbsorbedStateEffectPath, UE.PD_CharacterControllerDataGroup_C, t => {
          this.xdn(t);
        });
      }
    }
  }
  xdn(t) {
    if (this.Entity.Valid) {
      if (t) {
        this._9e = this.l9e.AddMaterialControllerDataGroup(t);
        t = t.DataMap.GetKey(0);
        this.GOu = t.LoopTime.Start;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 4, "开始倒计时关闭Rendering.Tick", ["EntityId", this.Entity.Id], ["Delay", this.GOu]);
        }
        this.qBu = TimerSystem_1.TimerSystem.Delay(this.OBu, this.GOu * 1000, undefined, "SceneItemCapture Disable Tick");
        if (this.Ad_) {
          this.Entity.GetComponent(206).SkeletalMesh.SetHiddenInGame(false);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 4, "生成抓取幻象Item结束", ["EntityId", this.Entity.Id]);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemVisionCaptureAddFinish, this.Ldn, this.Entity.Id);
        } else {
          ResourceSystem_1.ResourceSystem.LoadAsync(this.Tdn, UE.AnimationAsset, t => {
            this.wdn(t);
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "无法找到收服材质效果", ["AbsorbedStateEffectPath", AbsorbedStateEffectPath]);
      }
    }
  }
  wdn(t) {
    if (this.Entity.Valid) {
      if (t) {
        const e = this.Entity.GetComponent(206).SkeletalMesh;
        e.PlayAnimation(t, false);
        e.SetPosition(0);
        e.SetPlayRate(0);
        e.SetHiddenInGame(false);
        TimerSystem_1.TimerSystem.Next(() => {
          e.SetComponentTickEnabled(false);
        });
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 4, "生成抓取幻象Item结束", ["EntityId", this.Entity.Id]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemVisionCaptureAddFinish, this.Ldn, this.Entity.Id);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "无法找到收服动画Death_Shoufu", ["path", this.Tdn]);
      }
    }
  }
  ExecuteCapture(t, e) {
    let i = e;
    if (!i) {
      o = this.Entity.GetComponent(206);
      i = o.ActorLocationProxy;
    }
    var o = Global_1.Global.BaseCharacter.CharacterActorComponent;
    var s = Vector_1.Vector.Create(i);
    s.SubtractionEqual(o.ActorLocationProxy);
    MathUtils_1.MathUtils.LookRotationUpFirst(s, o.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, this.az);
    this.az.Rotator(this.Gue);
    o.Entity.GetComponent(45)?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
    o.SetActorRotation(this.Gue.ToUeRotator(), this.constructor.name, false);
    if (this.Ldn !== SpecialDropEntityConfigId) {
      if (s = o.Entity.GetComponent(40)) {
        s.BeginSkillAsync(SceneItemCaptureUtility.GetActionId(), {
          Target: this.Entity,
          Reason: "SceneItemCaptureComponent.ExecuteCapture",
          ExtraTargetLocation: e?.ToUeVector()
        });
      }
      s = o.Entity.Id;
      BlackboardController_1.BlackboardController.SetVectorValueByEntity(s, "ShoufuLocation", i.X, i.Y, i.Z);
    }
    this.AfterCapture();
  }
  AfterCapture() {
    this.Ora = true;
    var t = this.Entity.GetComponent(122);
    if (t) {
      t.CloseInteract("触发收复后关闭交互");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.Ldn, this.Entity.Id);
    this.GBu = TimerSystem_1.TimerSystem.Delay(this.Udn, this.Idn);
    this.FBu = TimerSystem_1.TimerSystem.Delay(this.Adn, this.ydn);
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "开始收服，关闭特效", false);
    }
    RenderModuleController_1.RenderModuleController.AddCharRenderShell(this.l9e);
  }
};
SceneItemCaptureComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(150)], SceneItemCaptureComponent);
exports.SceneItemCaptureComponent = SceneItemCaptureComponent; //# sourceMappingURL=SceneItemCaptureComponent.js.map