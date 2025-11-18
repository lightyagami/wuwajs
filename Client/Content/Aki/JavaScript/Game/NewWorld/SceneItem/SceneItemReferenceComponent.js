"use strict";

var SceneItemReferenceComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, s) {
  var r;
  var o = arguments.length;
  var n = o < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, s);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (r = e[h]) {
        n = (o < 3 ? r(n) : o > 3 ? r(t, i, n) : r(t, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemReferenceComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Queue_1 = require("../../../Core/Container/Queue");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine");
const StaticSceneUtils_1 = require("../../LevelGamePlay/StaticScene/StaticSceneUtils");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines");
const ReferenceTriggerVolumeLogic_1 = require("../TriggerItems/ReferenceTriggerVolumeLogic");
const RefCompAirWallController_1 = require("./RefCompController/RefCompAirWallController");
const RefCompLevelSequenceController_1 = require("./RefCompController/RefCompLevelSequenceController");
const RefCompModifyActorMaterial_1 = require("./RefCompController/RefCompModifyActorMaterial");
const DEBUG_DETAIL_KEY_PREFIX = "SceneItemReferenceComponent";
let SceneItemReferenceComponent = SceneItemReferenceComponent_1 = class SceneItemReferenceComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.mBe = undefined;
    this.Xte = undefined;
    this.Lo = undefined;
    this.aln = undefined;
    this.ILr = new Map();
    this.rMn = undefined;
    this.Xvn = new Set();
    this.MTd = [];
    this.wWa = false;
    this.BWa = undefined;
    this.ze_ = new Queue_1.Queue();
    this.yxn = false;
    this.Ixn = undefined;
    this.Txn = undefined;
    this.Lxn = undefined;
    this.bWa = e => {
      this.UU_(0).NextSequenceJumpToEnd = false;
      this.wWa = true;
      this.yxn = false;
      this.UU_(2).ResetActorMaterialClearMap();
      this.aMn(1);
    };
    this.sMn = e => {
      this.UU_(0).NextSequenceJumpToEnd = false;
      this.UU_(2).ResetActorMaterialClearMap();
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
      if (this.NQc) {
        this.aMn(2);
      } else {
        e = this.EIe.GetPbDataId();
        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY_PREFIX + "_" + e) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("SceneItem", 39, "[RefComp] [疑难杂症] 实体状态改变，引用的actor未全部加载，继续等待", ["PbDataId", this.EIe?.GetPbDataId()], ["IsReady", this.NQc]);
        }
      }
    };
    this.Je_ = () => {
      if (this.NQc) {
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
          Log_1.Log.Info("SceneItem", 39, "[RefComp] 实体状态预改变，引用的actor未全部加载，继续等待", ["PbDataId", this.EIe?.GetPbDataId()], ["IsReady", this.NQc]);
        }
      }
    };
    this.hMn = e => {
      var t = this.MTd.indexOf(e.toString());
      if (!(t < 0)) {
        this.MTd.splice(t, 1);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 18, "[RefComp] OnActorAdd", ["PbDataId", this.EIe?.GetPbDataId()], ["actorKey", e], ["CurStreamingOutActorCount", this.MTd.length]);
        }
        if (this.MTd.length <= 0) {
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
        this.MTd.push(e.toString());
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 18, "[RefComp] OnActorRemove", ["PbDataId", this.EIe?.GetPbDataId()], ["actorKey", e], ["CurStreamingOutActorCount", this.MTd.length]);
        }
        this.UU_(0).OnActorRemove();
        this.rMn?.RemoveVolume(e.toString());
      }
    };
  }
  get NQc() {
    return this.MTd.length === 0;
  }
  static get Dependencies() {
    return [206, 200];
  }
  OnInitData(e) {
    e = e.GetParam(SceneItemReferenceComponent_1)[0];
    this.Lo = e;
    this.mBe = this.Entity.CheckGetComponent(137);
    this.BWa = this.mBe.StateTagId;
    return true;
  }
  OnStart() {
    this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
    this.Hte = this.Entity.GetComponent(206);
    this.Xte = this.Entity.GetComponent(200);
    this.EIe = this.Entity.GetComponent(0);
    this.wWa = this.mBe.StateTagId === this.BWa;
    this.VQc();
    for (var [, e] of this.ILr) {
      e.OnStart();
    }
    this._Mn();
    this.uMn();
    this.aln.OnAddToSubsystem.Add(this.hMn);
    this.aln.OnRemoveFromSubsystem.Add(this.lMn);
    this.aln.RecordEntityModifiedActor(this.EIe.GetPbDataId());
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.den);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.Je_);
    return true;
  }
  OnEnd() {
    for (var [, e] of this.ILr) {
      e.OnEnd();
    }
    return true;
  }
  OnClear() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.den)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.den);
    }
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.Je_)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStatePreChangeInSequence, this.Je_);
    }
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
  VQc() {
    this.ILr.clear();
    var e = this.EIe.GetPbDataId();
    var t = this.EIe.GetCreatureDataId();
    var i = new RefCompLevelSequenceController_1.RefCompLevelSequenceController(this.Entity, t, e);
    this.ILr.set(0, i);
    var i = new RefCompAirWallController_1.RefCompAirWallController(this.Entity, t, e);
    this.ILr.set(1, i);
    var i = new RefCompModifyActorMaterial_1.RefCompModifyActorMaterial(this.Entity, t, e);
    this.ILr.set(2, i);
    if (this.Lo.VolumesRef?.length) {
      this.rMn = new ReferenceTriggerVolumeLogic_1.ReferenceTriggerVolumeLogic(this.Lo.VolumesRef);
    }
  }
  _Mn() {
    this.Xvn.clear();
    if (this.Lo.ActorRefGroups.length || this.Lo.VolumesRef?.length) {
      var e = this.Hte.CreatureData.GetPbDataId();
      var t = StaticSceneUtils_1.StaticSceneUtils.GetActorRefByPbDataId(e);
      if (t) {
        for (const i of t) {
          this.Xvn.add(i.PathName.split(".")[1] + "." + i.ActorName);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("SceneItem", 33, "实体引用actor路径", ["pbDataId", e], ["actorList", this.Xvn]);
        }
      }
    }
  }
  uMn() {
    this.MTd.length = 0;
    for (const t of this.Xvn) {
      var e = this.aln.GetActor(new UE.FName(t));
      if (e) {
        if (this.rMn && e instanceof UE.Volume) {
          this.rMn.AddVolume(t, e);
        } else if (e instanceof UE.StaticMeshActor) {
          e.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.INVALID_POS);
        }
      } else {
        this.MTd.push(t);
      }
    }
    if (this.MTd.length <= 0) {
      this.aMn(0);
    }
  }
  UU_(e) {
    return this.ILr.get(e);
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
        this.UU_(0).NextSequenceJumpToEnd = true;
        s = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
        ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(i.Actions, s, e);
      }
    }
  }
  TryReInitRefActor() {
    if (this.NQc) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "尝试重新InitRefActor: 已初始化过，不执行", ["pbDataId", this.Hte.CreatureData.GetPbDataId()]);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "尝试重新InitRefActor: 开始", ["pbDataId", this.Hte.CreatureData.GetPbDataId()], ["IsReady", this.NQc], ["actorList", this.MTd]);
      }
      this.uMn();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "尝试重新InitRefActor: 结束", ["pbDataId", this.Hte.CreatureData.GetPbDataId()], ["IsReady", this.NQc], ["actorList", this.MTd]);
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
    for (const n of this.Lo.ActorRefGroups) {
      if (n.Actions?.length !== 0) {
        var r;
        var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(n.EntityState);
        if (o && this.Xte.HasTag(o)) {
          const t = e === 3;
          if (!t && this.ze_.Size > 0 && this.ze_.Front === o && e !== 4) {
            this.ze_.Pop();
          } else {
            r = this.EIe.GetPbDataId();
            if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(DEBUG_DETAIL_KEY_PREFIX + "_" + r) && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("SceneItem", 39, "[RefComp] [疑难杂症] 执行对应状态的action", ["PbDataId", r], ["CreatureDataId", this.EIe?.GetCreatureDataId()], ["EntityId", this.Entity.Id], ["State", n.EntityState], ["IsPreChange", t], ["Actions", n.Actions]);
            }
            if (t) {
              this.ze_.Push(o);
            }
            r = LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id);
            if (this.yxn) {
              this.Txn = n.Actions;
              this.Lxn = o;
            } else {
              this.Ixn = o;
              this.yxn = true;
              ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(n.Actions, r, this.sMn);
            }
          }
        }
      }
    }
  }
  HandleSequence(e) {
    this.UU_(0).HandleSequence(e);
  }
  ForceEnterSeqCamera() {
    return this.UU_(0).ForceSwitchSceneCamera(true);
  }
  ForceExitSeqCamera() {
    return this.UU_(0).ForceSwitchSceneCamera(false);
  }
  IsPlaying() {
    return this.UU_(0).IsPlaying();
  }
  IsPlayToMarkFinished(e) {
    return this.UU_(0).IsPlayToMarkFinished(e);
  }
  HandleAirWall(e, t) {
    this.UU_(1).HandleAirWall(e, t);
  }
  GetAirWallActors() {
    return this.UU_(1).GetAirWallActors();
  }
  HandleActorMaterial(e) {
    this.UU_(2).HandleActorMaterial(e);
  }
  GetRefVolumes() {
    return this.rMn?.GetVolumes();
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
    e *= this.Entity.GetComponent(126)?.CurrentTimeScale ?? 1;
    this.UU_(0).OnChangeTimeDilation(e);
  }
  IsValidPlatFormPath(e) {
    return this.Xvn.has(e);
  }
};
SceneItemReferenceComponent = SceneItemReferenceComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(167)], SceneItemReferenceComponent);
exports.SceneItemReferenceComponent = SceneItemReferenceComponent; //# sourceMappingURL=SceneItemReferenceComponent.js.map