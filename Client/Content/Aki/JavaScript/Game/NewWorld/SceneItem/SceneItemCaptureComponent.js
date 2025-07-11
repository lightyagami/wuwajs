"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var s;
  var r = arguments.length;
  var n = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, o);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (s = e[a]) {
        n = (r < 3 ? s(n) : r > 3 ? s(t, i, n) : s(t, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemCaptureComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
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
const CommonCaptureActionId = 220002;
const SpecialDropEntityConfigId = 310000000;
const TempRotator = new Rotator_1.Rotator(0, -90, 0);
const CHECK_WATER_OFFSET_Z = 10000;
const CHECK_GROUND_OFFSET_Z = 10000;
const CHECK_WATER_PROFILE_KEY = "SceneItemCaptureComponent_CheckWaterHit";
const CHECK_GROUND_PROFILE_KEY = "SceneItemCaptureComponent_CheckGroundHit";
const MAX_LOD = 99;
const AbsorbedStateEffectPath = "/Game/Aki/Effect/MaterialController/Absorbed/DA_Fx_Group_Huanxiangshoufu.DA_Fx_Group_Huanxiangshoufu";
const AbsorbedStartEffectPath = "/Game/Aki/Effect/EffectGroup/Common/Fight/DA_Fx_Group_Shoufu_Start.DA_Fx_Group_Shoufu_Start";
const ABSORB_PAWN_NAME_KEY = "Absorb";
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
    this.uBu = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 20, "停止声骸掉落物材质控制器的Tick ");
      }
      this.l9e.SetEffectGroupProgress(this.gOu, this._9e);
      this.l9e.UpdateMaterialEffectsOnly();
      if (this.l9e) {
        RenderModuleController_1.RenderModuleController.RemoveCharRenderShell(this.l9e);
      }
    };
    this.cBu = undefined;
    this.gOu = 0;
    this.dBu = undefined;
    this.Udn = () => {
      this.l9e.RemoveMaterialControllerDataGroupWithEnding(this._9e);
    };
    this.mBu = undefined;
    this.Adn = () => {
      this.Entity.Disable("[SceneItemCaptureComponent.OnCaptureFinished] 捕获隐藏实体");
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    };
  }
  OnActivate() {
    var e;
    this.i4o = this.Entity.GetComponent(197);
    if (this.i4o && (this.vzi = this.i4o.GetInteractController(), this.vzi) && (e = this.Entity.GetComponent(117))) {
      e.SetPawnNameKey(ABSORB_PAWN_NAME_KEY);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 4, "开始生成抓取幻象Item", ["EntityId", this.Entity.Id]);
      }
      this.Cmn();
    }
  }
  OnDisable(e) {
    if (!this.Ora) {
      EffectSystem_1.EffectSystem.SetEffectHidden(this.rvi, true);
    }
  }
  OnClear() {
    if (this.cBu) {
      TimerSystem_1.TimerSystem.Remove(this.cBu);
      this.cBu = undefined;
    }
    if (this.dBu) {
      TimerSystem_1.TimerSystem.Remove(this.dBu);
      this.dBu = undefined;
    }
    if (this.mBu) {
      TimerSystem_1.TimerSystem.Remove(this.mBu);
      this.mBu = undefined;
    }
    return true;
  }
  OnEnable() {
    if (!this.Ora) {
      EffectSystem_1.EffectSystem.SetEffectHidden(this.rvi, false);
    }
  }
  OnTick(e) {
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
    let t = 0;
    const i = this.Entity.GetComponent(202);
    let e = 100;
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
      if (o.TIs > 0 && (e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(o.TIs).InteractionRadius, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Battle", 4, "服务器下发掉落幻象设置交互范围", ["MonsterId", o.TIs], ["半径", e]);
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
      t = s.ModelId;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Battle", 4, "无法找到EComponent.VisionItemComponent");
    }
    if (this.Ldn) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemVisionCaptureAdd, this.Ldn, this.Entity.Id);
    }
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
    this.vzi.AddClientInteractOption(s, o, "Direct", e, undefined, 0, Vector_1.Vector.Create(0, 0, e > 100 ? 100 : e));
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "最终掉落幻象设置交互范围", ["半径", e]);
    }
    this.Ifr();
    MathUtils_1.MathUtils.ComposeRotator(TempRotator, i.ActorRotationProxy, this.Gue);
    i.SetActorRotation(this.Gue.ToUeRotator(), this.constructor.name, false);
    const a = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, t.toString());
    if (a) {
      i.InitSkeletalMeshComponent();
      this.Tdn = a.蓝图.ToAssetPathName();
      this.Tdn = this.Tdn.substr(0, this.Tdn.lastIndexOf("/"));
      this.Tdn = this.Tdn.concat("/CommonAnim/Death_Shoufu.Death_Shoufu");
      this.l9e ||= i.Owner.AddComponentByClass(UE.CharRenderingComponent_C.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
      if (this.l9e) {
        let e = a.声骸掉落替换模型.ToAssetPathName();
        if (e !== "") {
          this.Ad_ = true;
        } else {
          e = a.网格体.ToAssetPathName();
        }
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.SkeletalMesh, e => {
          this.Pdn(e, i, t, a);
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "渲染组件添加失败");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 36, "模型设置为空", ["modelId", t]);
    }
  }
  Ifr() {
    if (!this.Mao || !this.vao) {
      this.koe();
    }
    var e = this.Entity.GetComponent(202);
    var t = e.ActorLocation;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Mao, t);
    this.Lz.DeepCopy(t);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(e, this.Lz, -CHECK_WATER_OFFSET_Z);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Mao, this.Lz);
    var i = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Mao, CHECK_WATER_PROFILE_KEY);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.vao, t);
    this.Lz.DeepCopy(t);
    GravityUtils_1.GravityUtils.AddZnInGravityForActor(e, this.Lz, -CHECK_GROUND_OFFSET_Z);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.vao, this.Lz);
    var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.vao, CHECK_GROUND_PROFILE_KEY);
    if (i && t) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Mao.HitResult, 0, this.Rdn);
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.vao.HitResult, 0, this.Ddn);
      e.SetActorLocation((GravityUtils_1.GravityUtils.GetZnInGravityForActor(e, this.Ddn) > GravityUtils_1.GravityUtils.GetZnInGravityForActor(e, this.Rdn) ? this.Ddn : this.Rdn).ToUeVector(), "SceneItemCaptureFixBornLocation", false);
    } else if (i) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Mao.HitResult, 0, this.Rdn);
      e.SetActorLocation(this.Rdn.ToUeVector(), "SceneItemCaptureFixBornLocation", false);
    } else if (t) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.vao.HitResult, 0, this.Ddn);
      e.SetActorLocation(this.Ddn.ToUeVector(), "SceneItemCaptureFixBornLocation", false);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 4, "掉落幻象修正坐标", ["Pos", this.Ddn]);
    }
  }
  Pdn(e, i, t, o) {
    if (this.Entity.Valid) {
      if (e instanceof UE.SkeletalMesh) {
        if (!i?.Valid) {
          return;
        }
        if (!this.l9e?.IsValid()) {
          return;
        }
        i.SkeletalMesh.SetSkeletalMesh(e);
        this.l9e.Init(2);
        this.l9e.AddComponentByCase(0, i.SkeletalMesh);
        i.SkeletalMesh.SetHiddenInGame(true);
        i.SkeletalMesh.SetForcedLOD(MAX_LOD);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "模型加载失败！", ["ModelConfigId", t]);
      }
      e = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
      e.SkeletalMeshComp = i.SkeletalMesh;
      this.rvi = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, i.Owner.D_GetTransform(), AbsorbedStartEffectPath, "[SceneItemCapture.OnLoadAnimFinish]", e);
      if (o.子网格体.Num() > 0) {
        ResourceSystem_1.ResourceSystem.LoadAsync(o.子网格体.Get(0).ToAssetPathName(), UE.SkeletalMesh, e => {
          var t;
          if (e instanceof UE.SkeletalMesh) {
            (t = i.Owner.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false)).SetSkeletalMesh(e);
            this.l9e.AddComponentByCase(7, t);
            t.SetMasterPoseComponent(i.SkeletalMesh);
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Battle", 4, "子模型加载失败！", ["子网格体", o.子网格体]);
          }
          ResourceSystem_1.ResourceSystem.LoadAsync(AbsorbedStateEffectPath, UE.PD_CharacterControllerDataGroup_C, e => {
            this.xdn(e);
          });
        });
      } else {
        ResourceSystem_1.ResourceSystem.LoadAsync(AbsorbedStateEffectPath, UE.PD_CharacterControllerDataGroup_C, e => {
          this.xdn(e);
        });
      }
    }
  }
  xdn(e) {
    if (this.Entity.Valid) {
      if (e) {
        this._9e = this.l9e.AddMaterialControllerDataGroup(e);
        e = e.DataMap.GetKey(0);
        this.gOu = e.LoopTime.Start;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 4, "开始倒计时关闭Rendering.Tick", ["EntityId", this.Entity.Id], ["Delay", this.gOu]);
        }
        this.cBu = TimerSystem_1.TimerSystem.Delay(this.uBu, this.gOu * 1000, undefined, "SceneItemCapture Disable Tick");
        if (this.Ad_) {
          this.Entity.GetComponent(202).SkeletalMesh.SetHiddenInGame(false);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 4, "生成抓取幻象Item结束", ["EntityId", this.Entity.Id]);
          }
          if (this.Ldn) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemVisionCaptureAddFinish, this.Ldn, this.Entity.Id);
          }
        } else {
          ResourceSystem_1.ResourceSystem.LoadAsync(this.Tdn, UE.AnimationAsset, e => {
            this.wdn(e);
          });
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "无法找到收服材质效果", ["AbsorbedStateEffectPath", AbsorbedStateEffectPath]);
      }
    }
  }
  wdn(e) {
    if (this.Entity.Valid) {
      if (e) {
        const t = this.Entity.GetComponent(202).SkeletalMesh;
        t.PlayAnimation(e, false);
        t.SetPosition(0);
        t.SetPlayRate(0);
        t.SetHiddenInGame(false);
        TimerSystem_1.TimerSystem.Next(() => {
          t.SetComponentTickEnabled(false);
        });
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 4, "生成抓取幻象Item结束", ["EntityId", this.Entity.Id]);
        }
        if (this.Ldn) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemVisionCaptureAddFinish, this.Ldn, this.Entity.Id);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 4, "无法找到收服动画Death_Shoufu", ["path", this.Tdn]);
      }
    }
  }
  ExecuteCapture(e) {
    var t = this.Entity.GetComponent(202).ActorLocationProxy;
    var i = Global_1.Global.BaseCharacter.CharacterActorComponent;
    var o = Vector_1.Vector.Create(t);
    o.SubtractionEqual(i.ActorLocationProxy);
    MathUtils_1.MathUtils.LookRotationUpFirst(o, i.MoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy, this.az);
    this.az.Rotator(this.Gue);
    i.Entity.GetComponent(45)?.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
    i.SetActorRotation(this.Gue.ToUeRotator(), this.constructor.name, false);
    if (this.Ldn !== SpecialDropEntityConfigId) {
      if (o = i.Entity.GetComponent(40)) {
        o.BeginSkill(CommonCaptureActionId, {
          Target: this.Entity,
          Reason: "SceneItemCaptureComponent.ExecuteCapture"
        });
      }
      o = i.Entity.Id;
      BlackboardController_1.BlackboardController.SetVectorValueByEntity(o, "ShoufuLocation", t.X, t.Y, t.Z);
    }
    this.AfterCapture();
  }
  AfterCapture() {
    this.Ora = true;
    var e = this.Entity.GetComponent(118);
    if (e) {
      e.CloseInteract("触发收复后关闭交互");
    }
    if (this.Ldn) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSceneItemVisionCaptureRemove, this.Ldn);
    }
    this.dBu = TimerSystem_1.TimerSystem.Delay(this.Udn, this.Idn);
    this.mBu = TimerSystem_1.TimerSystem.Delay(this.Adn, this.ydn);
    if (EffectSystem_1.EffectSystem.IsValid(this.rvi)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.rvi, "开始收服，关闭特效", false);
    }
    RenderModuleController_1.RenderModuleController.AddCharRenderShell(this.l9e);
  }
};
SceneItemCaptureComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(146)], SceneItemCaptureComponent);
exports.SceneItemCaptureComponent = SceneItemCaptureComponent; //# sourceMappingURL=SceneItemCaptureComponent.js.map