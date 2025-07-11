"use strict";

var SceneItemReferenceComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var n = arguments.length;
  var r = n < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, s);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (o = e[a]) {
        r = (n < 3 ? o(r) : n > 3 ? o(t, i, r) : o(t, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemReferenceComponent = exports.PlayRateStruct = exports.TransitStruct = exports.AIR_WALL = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const EffectContext_1 = require("../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const GlobalData_1 = require("../../GlobalData");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const SimpleLevelSequenceActor_1 = require("../../LevelGamePlay/StaticScene/SimpleLevelSequenceActor");
const StaticSceneUtils_1 = require("../../LevelGamePlay/StaticScene/StaticSceneUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines");
const ReferenceTriggerVolumeLogic_1 = require("../TriggerItems/ReferenceTriggerVolumeLogic");
const DEBUG_DETAIL_KEY_PREFIX = "SceneItemReferenceComponent";
const WALL_COMMON_COLLISION_NAME = new UE.FName("InvisibleWallCommon");
const WALL_HUGE_BOSS_COLLISION_NAME = new UE.FName("InvisibleWallHugeBoss");
const WALL_ONLY_BULLET_COLLISION_NAME = new UE.FName("InvisibleWallBulletOnly");
const WALL_ONLY_MONSTER_COLLISION_NAME = new UE.FName("InvisibleWallMonsterOnly");
const WALL_ONLY_BLOCK_PLAYER_COLLISION_NAME = new UE.FName("InvisibleWallBlockPlayer");
exports.AIR_WALL = new UE.FName("AirWall");
const PLANEWIDTH = new UE.FName("PlaneWidth");
const CIRCLERADIUS = new UE.FName("CircleRadius");
const PLANEHEIGHT = new UE.FName("PlaneHeight");
const DEFAULT_HIT_CD = 1;
const DEFAULT_THICKNESS = 100;
const PATH_LENGTH = 3;
class TransitStruct {
  constructor(e = 0, t = undefined, i = undefined, s = undefined, o = false, n = undefined) {
    this.TransitType = 0;
    this.Duration = undefined;
    this.TransitFadeIn = undefined;
    this.TransitFadeOut = undefined;
    this.IsValid = undefined;
    this.Mask = undefined;
    this.TransitType = e;
    this.Duration = t;
    this.TransitFadeIn = i;
    this.TransitFadeOut = s;
    this.IsValid = o;
    this.Mask = n;
  }
}
exports.TransitStruct = TransitStruct;
class PlayRateStruct {
  constructor(e = 1, t = 0, i = 0, s = 0) {
    this.PlayRateAbs = e;
    this.EaseType = t;
    this.EaseDuration = i;
    this.EaseExponent = s;
  }
}
exports.PlayRateStruct = PlayRateStruct;
class ResourceLoadCallbackHandle {
  constructor(e, t) {
    this.Path = e;
    this.Callback = t;
    this.ResourceSystemId = ResourceSystem_1.ResourceSystem.InvalidId;
    this.Asset = undefined;
    this.LoadAsyncFinished = false;
  }
}
let SceneItemReferenceComponent = SceneItemReferenceComponent_1 = class SceneItemReferenceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.mBe = undefined;
    this.Xte = undefined;
    this.aRl = undefined;
    this.Lo = undefined;
    this.Qvn = undefined;
    this.Xvn = undefined;
    this.Uai = false;
    this.aln = undefined;
    this.O2_ = undefined;
    this.$vn = undefined;
    this.Ye_ = true;
    this.wWa = false;
    this.BWa = undefined;
    this.Yvn = undefined;
    this.Jvn = undefined;
    this.zvn = new Map();
    this.Zvn = new Map();
    this.eMn = new Map();
    this.gme = undefined;
    this.tMn = undefined;
    this.iMn = undefined;
    this.oMn = undefined;
    this.rMn = undefined;
    this.ze_ = new Queue_1.Queue();
    this.yxn = false;
    this.Ixn = undefined;
    this.Txn = undefined;
    this.Lxn = undefined;
    this.bWa = e => {
      this.Ye_ = false;
      this.wWa = true;
      this.yxn = false;
      this.iMn?.clear();
      this.aMn(1);
    };
    this.sMn = e => {
      this.Ye_ = false;
      this.iMn?.clear();
      this.Dxn();
    };
    this.Dxn = () => {
      var e;
      var t;
      if (this.Txn) {
        if (this.Lxn === this.Ixn) {
          this.Txn = undefined;
          this.Lxn = undefined;
          this.Ixn = undefined;
          this.yxn = false;
        } else {
          e = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
          t = this.Txn;
          this.Ixn = this.Lxn;
          this.Txn = undefined;
          this.Lxn = undefined;
          ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(t, e, this.Dxn);
        }
      } else {
        this.yxn = false;
      }
    };
    this.den = () => {
      var e;
      if (this.Uai) {
        this.aMn(2);
      } else {
        e = this.EIe.GetPbDataId();
        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY_PREFIX + "_" + e) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[RefComp] [疑难杂症] 实体状态改变，引用的actor未全部加载，继续等待", ["PbDataId", this.EIe?.GetPbDataId()], ["IsReady", this.Uai]);
        }
      }
    };
    this.Je_ = () => {
      if (this.Uai) {
        this.aMn(3, true);
      } else {
        for (const i of this.Lo.ActorRefGroups) {
          var e;
          if (i.Actions?.length !== 0 && (e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.EntityState)) && this.Xte.HasTag(e)) {
            this.ze_.Push(e);
          }
        }
        var t = this.EIe.GetPbDataId();
        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY_PREFIX + "_" + t) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[RefComp] 实体状态预改变，引用的actor未全部加载，继续等待", ["PbDataId", this.EIe?.GetPbDataId()], ["IsReady", this.Uai]);
        }
      }
    };
    this.hMn = e => {
      var t = this.Qvn.indexOf(e.toString());
      if (!(t < 0)) {
        this.Qvn.splice(t, 1);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 18, "[RefComp] OnActorAdd", ["PbDataId", this.EIe?.GetPbDataId()], ["actorKey", e], ["CurRefActorList.Length", this.Qvn.length]);
        }
        if (this.Qvn.length <= 0) {
          this.Uai = true;
          this.aMn(4);
        }
        t = this.aln.GetActor(e);
        if (this.rMn && t instanceof UE.Volume) {
          this.rMn.AddVolume(e.toString(), t);
        }
        if (t instanceof UE.StaticMeshActor) {
          t.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.INVALID_POS);
        }
      }
    };
    this.lMn = e => {
      if (this.Xvn.has(e.toString())) {
        this.Qvn.push(e.toString());
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 18, "[RefComp] OnActorRemove", ["PbDataId", this.EIe?.GetPbDataId()], ["actorKey", e], ["CurRefActorList.Length", this.Qvn.length]);
        }
        this.Uai = false;
        this.Ye_ = true;
        this.$vn?.Clear();
        this.$vn = undefined;
        this.rMn?.RemoveVolume(e.toString());
      }
    };
    this.PKs = (e, t, i) => {
      var s;
      var o;
      var n = this.zvn.get(e.GetName());
      if (n !== undefined) {
        if (n <= 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 7, "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行");
          }
        } else {
          s = TimeUtil_1.TimeUtil.GetServerTime();
          if ((o = this.eMn.get(e.GetName())) === undefined || !(s < o)) {
            this.eMn.set(e.GetName(), s + n);
            this.gme ||= Vector_1.Vector.Create(0, 0, 0);
            this.tMn ||= Quat_1.Quat.Create(0, 0, 0, 1);
            Vector_1.Vector.CrossProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(i), this.gme);
            this.gme.Normalize();
            o = Math.acos(Vector_1.Vector.DotProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(i)));
            Quat_1.Quat.ConstructorByAxisAngle(this.gme, o, this.tMn);
            this.gMn(e, this.tMn.ToUeQuat(), t.ToUeVector());
          }
        }
      }
    };
  }
  static get Dependencies() {
    return [202, 196];
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemReferenceComponent_1)[0];
    this.Lo = e;
    this.mBe = this.Entity.CheckGetComponent(133);
    this.BWa = this.mBe.StateTagId;
    return true;
  }
  OnInit() {
    if (this.Lo.VolumesRef?.length) {
      this.rMn = new ReferenceTriggerVolumeLogic_1.ReferenceTriggerVolumeLogic(this.Lo.VolumesRef);
    }
    return true;
  }
  OnStart() {
    this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
    this.Hte = this.Entity.GetComponent(202);
    this.Xte = this.Entity.GetComponent(196);
    this.EIe = this.Entity.GetComponent(0);
    this.aRl = this.Entity.GetComponent(164);
    this.wWa = this.mBe.StateTagId === this.BWa;
    this._Mn();
    this.uMn();
    this.aln.OnAddToSubsystem.Add(this.hMn);
    this.aln.OnRemoveFromSubsystem.Add(this.lMn);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.den);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.Je_);
    return true;
  }
  OnEnd() {
    while (this.O2_ && !this.O2_.Empty) {
      var e = this.O2_.Pop();
      if (e && !e.LoadAsyncFinished && e.ResourceSystemId !== ResourceSystem_1.ResourceSystem.InvalidId) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] OnEnd时清理仍在等待的资源加载", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["ResourceId", e.ResourceSystemId], ["ResourcePath", e.Path]);
        }
        ResourceSystem_1.ResourceSystem.CancelAsyncLoad(e.ResourceSystemId);
      }
    }
    return true;
  }
  G2_(e, t, i, s = 100) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：开始加载", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Path", e]);
    }
    this.O2_ ||= new Queue_1.Queue();
    const o = new ResourceLoadCallbackHandle(e, i);
    this.O2_.Push(o);
    o.ResourceSystemId = ResourceSystem_1.ResourceSystem.LoadAsync(e, t, e => {
      this.F2_(o, e);
    }, s);
    return o.ResourceSystemId;
  }
  F2_(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：加载完成", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Path", e.Path]);
    }
    e.Asset = t;
    e.LoadAsyncFinished = true;
    while (this.O2_ && !this.O2_.Empty && this.O2_.Front?.LoadAsyncFinished) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "[SceneItemReference] 通过保序回调的方式异步加载资源：执行回调", ["PbDataId", this.Hte?.CreatureData.GetPbDataId()], ["Path", e.Path]);
      }
      var i = this.O2_.Pop();
      i?.Callback?.(i.Asset, i.Path);
    }
  }
  ResetToInitState(t, e) {
    var i;
    var s;
    if (GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t) && (i = this.Lo.ActorRefGroups.find(e => e.EntityState === t))) {
      if (i.Actions.length === 0) {
        e(1);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 7, "[SceneItemReference]执行初始状态的action", ["entityId", this.Entity.Id], ["state", i.EntityState]);
        }
        this.Ye_ = true;
        s = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(i.Actions, s, e);
      }
    }
  }
  _Mn() {
    this.Qvn = [];
    this.Xvn = new Set();
    if (this.Lo.ActorRefGroups.length || this.Lo.VolumesRef?.length) {
      var e = this.Hte.CreatureData.GetPbDataId();
      var t = StaticSceneUtils_1.StaticSceneUtils.GetActorRefByPbDataId(e);
      if (t) {
        for (const i of t) {
          this.Qvn.push(i.PathName.split(".")[1] + "." + i.ActorName);
          this.Xvn.add(i.PathName.split(".")[1] + "." + i.ActorName);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 33, "实体引用actor路径", ["pbDataId", e], ["actorList", this.Qvn]);
        }
      }
    }
  }
  uMn() {
    var e = [];
    for (const i of this.Qvn) {
      var t = this.aln.GetActor(new UE.FName(i));
      if (t) {
        if (this.rMn && t instanceof UE.Volume) {
          this.rMn.AddVolume(i, t);
        } else if (t instanceof UE.StaticMeshActor) {
          t.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.INVALID_POS);
        }
      } else {
        e.push(i);
      }
    }
    this.Qvn = e;
    if (this.Qvn.length <= 0) {
      this.Uai = true;
      this.aMn(0);
    }
  }
  TryReInitRefActor() {
    if (this.Uai) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "尝试重新InitRefActor: 已初始化过，不执行", ["pbDataId", this.Hte.CreatureData.GetPbDataId()]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "尝试重新InitRefActor: 开始", ["pbDataId", this.Hte.CreatureData.GetPbDataId()], ["IsReady", this.Uai], ["actorList", this.Qvn]);
      }
      this.uMn();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "尝试重新InitRefActor: 结束", ["pbDataId", this.Hte.CreatureData.GetPbDataId()], ["IsReady", this.Uai], ["actorList", this.Qvn]);
      }
    }
  }
  aMn(e, t = 0) {
    var i;
    var s;
    if (!this.wWa) {
      if (this.yxn) {
        return undefined;
      } else if (i = this.Lo.ActorRefGroups.find(e => {
        e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.EntityState);
        return e && e === this.BWa;
      })) {
        s = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
        this.yxn = true;
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(i.Actions, s, this.bWa);
        return;
      } else {
        this.wWa = true;
        return;
      }
    }
    for (const r of this.Lo.ActorRefGroups) {
      if (r.Actions?.length !== 0) {
        var o;
        var n = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(r.EntityState);
        if (n && this.Xte.HasTag(n)) {
          const t = e === 3;
          if (!t && this.ze_.Size > 0 && this.ze_.Front === n && e !== 4) {
            this.ze_.Pop();
          } else {
            o = this.EIe.GetPbDataId();
            if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY_PREFIX + "_" + o) && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 39, "[RefComp] [疑难杂症] 执行对应状态的action", ["PbDataId", o], ["CreatureDataId", this.EIe?.GetCreatureDataId()], ["EntityId", this.Entity.Id], ["State", r.EntityState], ["IsPreChange", t], ["Actions", r.Actions]);
            }
            if (t) {
              this.ze_.Push(n);
            }
            o = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
            if (this.yxn) {
              this.Txn = r.Actions;
              this.Lxn = n;
            } else {
              this.Ixn = n;
              this.yxn = true;
              ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(r.Actions, o, this.sMn);
            }
          }
        }
      }
    }
  }
  OnClear() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.den)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.den);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.Je_)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.Je_);
    }
    this.$vn?.Clear();
    if (this.Yvn) {
      for (const e of this.Yvn.values()) {
        if (EffectSystem_1.EffectSystem.IsValid(e)) {
          EffectSystem_1.EffectSystem.StopEffectById(e, "[SceneItemReferenceComponent.OnClear]", false);
        }
      }
    }
    this.cMn();
    if (this.rMn) {
      this.rMn.Destroy();
      this.rMn = undefined;
    }
    if (this.aln?.IsValid()) {
      this.aln.OnAddToSubsystem.Remove(this.hMn);
      this.aln.OnRemoveFromSubsystem.Remove(this.lMn);
    }
    return true;
  }
  HandleActorMaterial(e) {
    switch (e.Config.Type) {
      case "ChangeMaterialData":
        this.mMn(e.Config.MaterialData, e.Config.ActorRefs.map(e => e.PathName));
        break;
      case "ChangeMPC":
        this.dMn(e.Config.MpcData);
    }
  }
  mMn(e, r) {
    if (e && e !== "None") {
      if (r.length) {
        this.iMn ||= new Map();
        this.oMn ||= new Map();
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.ItemMaterialControllerActorData_C, t => {
          if (t?.IsValid()) {
            for (const o of r) {
              var i = o.split(".");
              if (i.length < PATH_LENGTH) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("LevelEvent", 7, "[ReferenceComponent:ChangeMaterial]actor路径错误", ["RefPath", o]);
                }
              } else {
                i = new UE.FName(i[1] + "." + i[2]);
                i = this.aln.GetActor(i);
                if (i?.IsValid()) {
                  if (!this.iMn.get(o)) {
                    this.iMn.set(o, true);
                    var s = this.oMn.get(o);
                    if (s && s.length) {
                      for (const n of s) {
                        ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(n);
                      }
                      s.length = 0;
                      this.oMn.set(o, s);
                    }
                  }
                  s = ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(t, i);
                  let e = this.oMn.get(o);
                  (e = e || new Array()).push(s);
                  this.oMn.set(o, e);
                }
              }
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
          }
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]目标actor未配置");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]未配置对应MaterialData");
    }
  }
  dMn(e) {
    if (e && e !== "None") {
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.ItemMaterialControllerMPCData_C, e => {
        if (!e?.IsValid()) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
          }
        }
        ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(e);
      });
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "[ReferenceComponent]未配置对应MPCData");
    }
  }
  HandleSequence(t) {
    if (!t.LevelSequencePath || t.LevelSequencePath === "None") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Interaction", 7, "LevelSequence");
      }
    }
    const i = this.Ye_;
    let e = undefined;
    let s = undefined;
    let o = undefined;
    s = t.Intro ? t.Intro?.Type === 0 ? (e = t.Intro, new TransitStruct(0, e.Duration && e.Duration > 0 ? e.Duration : 0, 0, 0, true)) : (e = t.Intro, new TransitStruct(1, e.Duration && e.Duration > 0 ? e.Duration : 0, e.FadeIn && e.FadeIn.Duration > 0 ? e.FadeIn.Duration : 1, e.FadeOut && e.FadeOut.Duration > 0 ? e.FadeOut.Duration : 1, true, e.Mask)) : new TransitStruct(0, 0, 0, 0, false);
    o = t.Outro ? t.Outro?.Type === 0 ? (e = t.Outro, new TransitStruct(0, e.Duration && e.Duration > 0 ? e.Duration : 0, 0, 0, true)) : (e = t.Outro, new TransitStruct(1, e.Duration && e.Duration > 0 ? e.Duration : 0, e.FadeIn && e.FadeIn.Duration > 0 ? e.FadeIn.Duration : 1, e.FadeOut && e.FadeOut.Duration > 0 ? e.FadeOut.Duration : 1, true, e.Mask)) : new TransitStruct(0, 0, 0, 0, false);
    const n = new PlayRateStruct(Math.abs(t.Rate ?? 1), 0, t.RateEase?.Duration);
    switch (t.RateEase?.Type) {
      case IAction_1.EEaseType.Transient:
        n.EaseType = 0;
        n.EaseDuration = 0;
        break;
      case IAction_1.EEaseType.InOutCubic:
        n.EaseType = 3;
        n.EaseExponent = 3;
        break;
      case IAction_1.EEaseType.OutQuart:
        n.EaseType = 2;
        n.EaseExponent = 4;
        break;
      case IAction_1.EEaseType.OutSine:
        n.EaseType = 5;
        break;
      default:
        IAction_1.EEaseType.Linear;
        n.EaseType = 0;
    }
    this.G2_(t.LevelSequencePath, UE.LevelSequence, e => {
      if (e?.IsValid()) {
        if (this.$vn) {
          this.$vn.SetSequenceData(e);
        } else {
          this.$vn = new SimpleLevelSequenceActor_1.default(e);
        }
        this.$vn.UpdateSettings(t.KeepUI);
        if (t.Mark && t.Mark.length > 0) {
          this.aRl?.OnSequencePlayToMark(t.Mark, this.$vn.GetCurrentFrame(), i);
          this.$vn.AddOnPauseCallback(this.aRl?.OnSequencePaused);
        }
        switch (t.PlayMode) {
          case "shortestPath":
            this.$vn.PlayToMarkByCheckWay(t.Mark, s, o, n, i);
            break;
          case "instant":
            this.$vn.PlayToMark(t.Mark, s, o, n, true);
            break;
          case "loop":
            this.$vn.PlayLoop((t.Rate ?? 1) < 0, -1, s, o, n);
            break;
          default:
            this.$vn.PlayToMark(t.Mark, s, o, n, i);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
      }
    });
  }
  ForceEnterSeqCamera() {
    if (this.$vn) {
      return this.$vn.ForceSwitchSceneCamera(true);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneGameplay", 45, "时间控制装置启动请求:失败，SimpleSequenceActor为空");
      }
      return false;
    }
  }
  ForceExitSeqCamera() {
    return !!this.$vn && this.$vn.ForceSwitchSceneCamera(false);
  }
  HandleAirWall(e) {
    let t = false;
    let i = undefined;
    this.Yvn ||= new Map();
    switch (e.Option.Type) {
      case IAction_1.EToggleAirWall.Open:
        t = true;
        i = e.Option;
        break;
      case IAction_1.EToggleAirWall.Close:
    }
    for (const a of e.ActorRefs) {
      var s = a.PathName.split(".");
      if (s.length < PATH_LENGTH) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "[ReferenceComponent:ChangeMaterial]actor路径错误", ["RefPath", a]);
        }
      } else {
        var s = s[1] + "." + s[2];
        var o = new UE.FName(s);
        var n = this.aln.GetActor(o);
        if (n?.IsValid() && n instanceof UE.Brush) {
          var r = n.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
          switch (i?.CollisionPreset) {
            case IAction_1.EAirWallCollisionPreset.HugeBoss:
              r.SetCollisionProfileName(WALL_HUGE_BOSS_COLLISION_NAME);
              break;
            case IAction_1.EAirWallCollisionPreset.OnlyBullet:
              r.SetCollisionProfileName(WALL_ONLY_BULLET_COLLISION_NAME);
              break;
            case IAction_1.EAirWallCollisionPreset.OnlyMonster:
              r.SetCollisionProfileName(WALL_ONLY_MONSTER_COLLISION_NAME);
              break;
            case IAction_1.EAirWallCollisionPreset.OnlyBlockPlayer:
              r.SetCollisionProfileName(WALL_ONLY_BLOCK_PLAYER_COLLISION_NAME);
              break;
            default:
              r.SetCollisionProfileName(WALL_COMMON_COLLISION_NAME);
          }
          n.Tags.Add(exports.AIR_WALL);
          n.SetActorEnableCollision(t);
          if (i) {
            this.Jvn ||= new Array();
            if (!this.Jvn.includes(o)) {
              this.Jvn.push(o);
            }
            this.CMn(s, n, i);
          } else if (!t) {
            this.Ivl(n, s, o);
          }
        }
      }
    }
  }
  Ivl(t, e, i) {
    t.OnActorHit.Clear();
    var s = this.Yvn?.get(e);
    if (EffectSystem_1.EffectSystem.IsValid(s ?? 0)) {
      EffectSystem_1.EffectSystem.StopEffectById(s, "[SceneItemReferenceComponent.HandleAirWall]", false);
    }
    if (this.Jvn) {
      for (let e = 0; e < this.Jvn.length; e++) {
        if (this.Jvn[e].op_Equality(i)) {
          this.Jvn.splice(e, 1);
          if (EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.BulletHitAirWall, this.PKs)) {
            EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.BulletHitAirWall, this.PKs);
          }
          break;
        }
      }
    }
    this.zvn.delete(t.GetName());
    this.Zvn.delete(t.GetName());
    this.eMn.delete(t.GetName());
    this.Yvn?.delete(e);
  }
  cMn() {
    if (this.Jvn?.length) {
      for (const t of this.Jvn) {
        var e = this.aln.GetActor(t);
        if (e?.IsValid() && (e.OnActorHit.Clear(), e.SetActorEnableCollision(false), EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.BulletHitAirWall, this.PKs))) {
          EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.BulletHitAirWall, this.PKs);
        }
      }
      this.Jvn.length = 0;
      this.zvn.clear();
      this.Zvn.clear();
      this.eMn.clear();
    }
  }
  CMn(a, h, c) {
    var e = c.AirWallEffectData ?? "";
    if (e && this.Yvn?.get(a) === undefined) {
      const _ = h.D_GetTransform();
      _.SetScale3D(Vector_1.Vector.OneVectorDouble);
      e = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, _, e, "[SceneItemReferenceComponent.SpawnAirWallEffect]", new EffectContext_1.EffectContext(this.Entity.Id), 3, undefined, (e, t) => {
        switch (e) {
          case 1:
          case 4:
          case 0:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 7, "[ReferenceComponent:SpawnAirWallEffect]生成空气墙特效失败", ["Result", e], ["PbDataId", this.EIe?.GetPbDataId()]);
            }
            return;
          case 5:
            break;
          default:
            return;
        }
        var i;
        var s;
        var o;
        var n;
        var r;
        if (!this.Jvn?.length || !h?.IsValid() || this.Jvn.findIndex(e => e.op_Equality(FNameUtil_1.FNameUtil.GetDynamicFName(a))) < 0) {
          EffectSystem_1.EffectSystem.StopEffectById(t, "[SceneItemReferenceComponent.SpawnAirWallEffect] 空气墙已经被关闭", true);
        } else {
          i = EffectSystem_1.EffectSystem.GetNiagaraComponent(t);
          h.SetActorEnableCollision(false);
          h.RootComponent.SetMobility(2);
          h.K2_SetActorRotation(Rotator_1.Rotator.ZeroRotator, true);
          s = h.BrushComponent.D_GetComponentBounds();
          o = new Rotator_1.Rotator(_.Rotator().Pitch, _.Rotator().Yaw, _.Rotator().Roll);
          r = c.AirWallEffectThickness ?? DEFAULT_THICKNESS;
          r = s?.BoxExtent.X - r / 2;
          n = c.AirWallEffectHeight ?? 0;
          i?.SetFloatParameter(PLANEWIDTH, s?.BoxExtent.X * 2);
          i?.SetFloatParameter(CIRCLERADIUS, r);
          if (n) {
            i?.SetFloatParameter(PLANEHEIGHT, n);
          }
          if (s?.BoxExtent.Z) {
            r = Vector_1.Vector.Create(0, 0, -s?.BoxExtent.Z);
            o.Quaternion().RotateVector(r, r);
            EffectSystem_1.EffectSystem.GetEffectActor(t)?.D_K2_AddActorWorldOffset(r.ToUeVector(), false, undefined, true);
          }
          h.K2_SetActorRotation(o.ToUeRotator(), true);
          h.RootComponent.SetMobility(0);
          h.SetActorEnableCollision(true);
        }
      }, undefined, false, true);
      this.Yvn.set(a, e);
    }
    e = c.HitEffectData ?? "";
    if (e) {
      this.Zvn.set(h.GetName(), e);
      this.zvn.set(h.GetName(), c.HitCd || DEFAULT_HIT_CD);
      h.OnActorHit.Add((e, t, i, s) => {
        this.ExecuteHitWall(e, t, i, s);
      });
      if (!EventSystem_1.EventSystem.HasWithTarget(h, EventDefine_1.EEventName.BulletHitAirWall, this.PKs)) {
        EventSystem_1.EventSystem.AddWithTarget(h, EventDefine_1.EEventName.BulletHitAirWall, this.PKs);
      }
    }
  }
  ExecuteHitWall(e, t, i, s) {
    var o;
    var n;
    if (t?.IsValid() && t instanceof TsBaseCharacter_1.default && (o = this.zvn.get(e.GetName())) !== undefined) {
      if (o <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("SceneItem", 7, "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行");
        }
      } else if (s.bBlockingHit && (t = t.CharacterActorComponent) && t.CreatureData.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && t.IsWorldOwner()) {
        t = TimeUtil_1.TimeUtil.GetServerTime();
        if ((n = this.eMn.get(e.GetName())) === undefined || !(t < n)) {
          this.eMn.set(e.GetName(), t + o);
          this.gme ||= Vector_1.Vector.Create(0, 0, 0);
          this.tMn ||= Quat_1.Quat.Create(0, 0, 0, 1);
          Vector_1.Vector.CrossProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(s.Normal), this.gme);
          this.gme.Normalize();
          n = Math.acos(Vector_1.Vector.DotProduct(Vector_1.Vector.ForwardVectorProxy, Vector_1.Vector.Create(s.Normal)));
          Quat_1.Quat.ConstructorByAxisAngle(this.gme, n, this.tMn);
          t = UE.KismetMathLibrary.WD_LocalToWorld(GlobalData_1.GlobalData.World, s.ImpactPoint);
          this.gMn(e, this.tMn.ToUeQuat(), t);
        }
      }
    }
  }
  gMn(e, t, i) {
    t = new UE.TransformDouble(t, i, Vector_1.Vector.OneVectorDouble);
    i = this.Zvn.get(e.GetName());
    EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, t, i, "[SceneItemReferenceComponent.ExecuteHitWall]");
  }
  AddOnPlayerOverlapCallback(e, t = false) {
    this.rMn?.AddOnPlayerOverlapCallback(e, t);
  }
  RemoveOnPlayerOverlapCallback(e) {
    this.rMn?.RemoveOnPlayerOverlapCallback(e);
  }
  IsPlayerOverlappedRefVolume() {
    return !!this.rMn?.IsPlayerOverlapped();
  }
  OnChangeTimeDilation(e) {
    var t = this.Entity.GetComponent(122)?.CurrentTimeScale ?? 1;
    this.$vn?.SetTimeDilation(e * t);
  }
  IsValidPlatFormPath(e) {
    return this.Xvn.has(e);
  }
};
SceneItemReferenceComponent = SceneItemReferenceComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(163)], SceneItemReferenceComponent);
exports.SceneItemReferenceComponent = SceneItemReferenceComponent; //# sourceMappingURL=SceneItemReferenceComponent.js.map