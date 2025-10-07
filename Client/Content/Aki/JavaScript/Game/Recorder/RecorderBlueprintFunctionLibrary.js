"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BpFxEffectRecorderObject = exports.EFFECT_CREATE_ADVANCE = exports.RECORDER_MAX_EFFECT_SPEED = exports.RECORDER_MAX_SPEED = exports.RECORD_INTERVAL = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const Time_1 = require("../../Core/Common/Time");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const CameraController_1 = require("../Camera/CameraController");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const EffectSystem_1 = require("../Effect/EffectSystem");
const Global_1 = require("../Global");
const ModelManager_1 = require("../Manager/ModelManager");
const GameplayCueHookCommonItem_1 = require("../NewWorld/Character/Common/Component/Abilities/GameplayCueSFX/CommonItem/GameplayCueHookCommonItem");
const CharacterActorComponent_1 = require("../NewWorld/Character/Common/Component/CharacterActorComponent");
const VehicleActorComponent_1 = require("../NewWorld/Vehicle/Common/VehicleActorComponent");
const SceneInteractionManager_1 = require("../Render/Scene/Interaction/SceneInteractionManager");
const GameplayCueRecorder_1 = require("./GameplayCueRecorder");
const RecordCurveObject_1 = require("./RecordCurveObject");
exports.RECORD_INTERVAL = 0.016667;
exports.RECORDER_MAX_SPEED = 3000;
exports.RECORDER_MAX_EFFECT_SPEED = 100000;
exports.EFFECT_CREATE_ADVANCE = 0.1;
class MaterialControllerParam {
  constructor(r, e, t) {
    this.Data = r;
    this.UserData = e;
    this.StartTime = t;
  }
}
class CameraRecorderObject {
  constructor(r, e, t) {
    this.OC = r;
    this.Recorder = undefined;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Start Camera Recorder", ["Actor", r.GetName()], ["Time", t]);
    }
    this.Recorder = UE.NewObject(UE.KuroCameraRecorder.StaticClass());
    this.Recorder.SetRecordActor(r, exports.RECORD_INTERVAL, exports.RECORDER_MAX_SPEED);
    this.Recorder.StartRecorder(e, t);
  }
  TickRecorder(r) {
    this.Recorder.TickRecorder(r);
  }
  StopRecorder() {
    var r = RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Stop Camera Recorder", ["Actor", this.OC?.GetName()], ["Time", r]);
    }
    this.Recorder.StopRecorder();
  }
}
class CharacterRecorderObject {
  constructor(r, e, t, i) {
    this.Tae = r;
    this.GQu = e;
    this.ae = t;
    this.n8 = i;
    this.E0 = 0;
    this.Recorder = undefined;
    this.far = new Map();
    this.tfe = undefined;
    this.FQu = r => {};
    this.par = (r, e, t) => {
      this.far.set(t, new MaterialControllerParam(r, e, RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint()));
    };
    this.var = r => {
      var e;
      var t = this.far.get(r);
      if (t) {
        if (RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint() < t.StartTime && Log_1.Log.CheckError()) {
          Log_1.Log.Error("Test", 6, `Remove MaterialController: ${r} at ${RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint()}`);
        }
        if (e = this.Recorder.AddNotify(UE.TsAnimNotifyStateAddMaterialController_C.StaticClass(), FNameUtil_1.FNameUtil.EMPTY, t.StartTime, RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint() - t.StartTime)) {
          e.ControllerData = t.Data;
          e.UserData = t.UserData;
        }
        this.far.delete(r);
      }
    };
    this.G5u = () => {
      var r = this.Tae.GetEntityNoBlueprint();
      var e = r.GetComponent(123);
      this.Recorder.TickRecorder(Time_1.Time.DeltaTimeSeconds * r.TimeDilation * (e ? e.CurrentTimeScale : 1));
    };
    this.E0 = r.GetEntityIdNoBlueprint();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Start Character Recorder", ["Actor", r.GetName()], ["EntityId", this.E0], ["Time", t]);
    }
    e = r => {
      var e;
      this.tfe = this.Tae.Mesh?.SkeletalMesh;
      this.Recorder = UE.NewObject(UE.KuroCharacterRecorder.StaticClass());
      this.Recorder.bUseClone = !CharacterRecorderObject.NotUseCloneType.has(this.Tae.GetEntityNoBlueprint().GetComponent(1).CreatureData.GetEntityType());
      if (!this.Recorder.bUseClone) {
        e = (0, puerts_1.$ref)(undefined);
        UE.KuroAnimEdLibrary.CreateNewBlueprint(this.n8 + this.Tae.GetName(), this.Tae, e, undefined);
        this.Recorder.BaseBlueprint = (0, puerts_1.$unref)(e);
      }
      this.Recorder.SetRecordActor(this.Tae, exports.RECORD_INTERVAL, exports.RECORDER_MAX_SPEED);
      this.Recorder.StartRecorder(this.GQu, r);
      this.Recorder.SetNotifiesRecordConfigs(RecorderBlueprintFunctionLibrary.RecordNotifies, RecorderBlueprintFunctionLibrary.ReplaceNotifies);
    };
    e(t);
    this.FQu = e;
    EventSystem_1.EventSystem.AddWithTarget(r.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par);
    EventSystem_1.EventSystem.AddWithTarget(r.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.var);
    EventSystem_1.EventSystem.AddWithTarget(r.GetEntityNoBlueprint(), EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.G5u);
  }
  static get NotUseCloneType() {
    this.gAr ||= new Set([Protocol_1.Aki.Protocol.kks.Proto_Player]);
    return this.gAr;
  }
  TickRecorder(r) {
    var e;
    var t;
    var i;
    if (this.tfe !== this.Tae.Mesh?.SkeletalMesh) {
      e = RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 6, "Change Character Mesh Recorder", ["Actor", this.Tae?.GetName()], ["EntityId", this.E0], ["Time", e]);
      }
      if (t = this.Recorder.AddNotify(UE.TsAnimNotifyStateAddCharRendering_C.StaticClass(), FNameUtil_1.FNameUtil.EMPTY, this.ae, e - this.ae)) {
        t.RenderType = this.Tae.RenderType;
      }
      this.Recorder.StopRecorder();
      t = this.Recorder.GetMainGuid();
      this.FQu(e);
      i = this.Recorder.GetMainGuid();
      UE.KuroRecorderLibrary.ChangeAttachTrack(this.GQu, t, i, e);
    } else {
      this.Recorder.TickRecorder(r);
    }
  }
  StopRecorder() {
    var r;
    var e = RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Stop Character Recorder", ["Actor", this.Tae?.GetName()], ["EntityId", this.E0], ["Time", e]);
    }
    var e = this.Recorder.AddNotify(UE.TsAnimNotifyStateAddCharRendering_C.StaticClass(), FNameUtil_1.FNameUtil.EMPTY, this.ae, RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint() - this.ae);
    if (e) {
      e.RenderType = this.Tae.RenderType;
    }
    if (EntitySystem_1.EntitySystem.Get(this.E0)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Tae.CharRenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Tae.CharRenderingComponent, EventDefine_1.EEventName.OnRemoveMaterialController, this.var);
      EventSystem_1.EventSystem.RemoveWithTarget(this.Tae.GetEntityNoBlueprint(), EventDefine_1.EEventName.OnBeforeCharacterMorphTypeChanged, this.G5u);
    }
    for ([r] of this.far) {
      this.var(r);
    }
    this.Recorder.StopRecorder();
  }
}
CharacterRecorderObject.gAr = undefined;
class SceneItemRecorderObject {
  constructor(r, t, i) {
    this.Ear = r;
    this.Sar = new Array();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Start SceneItem Recorder", ["Name", r.Owner.GetName()], ["Path", SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionLevelName(r.GetSceneInteractionLevelHandleId())], ["EntityId", r.Entity.Id], ["Time", i]);
    }
    var e = r.Owner;
    const n = UE.NewObject(UE.KuroMeshRecorder.StaticClass());
    this.Sar.push(n);
    n.SetRecordActor(e, exports.RECORD_INTERVAL, exports.RECORDER_MAX_EFFECT_SPEED);
    n.StartRecorder(t, i);
    var o = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionAllActorsInLevel(r.GetSceneInteractionLevelHandleId());
    if (o) {
      var c = new Set();
      for (let r = 0, e = o.Num(); r < e; r++) {
        var u = o.Get(r);
        if (c.has(u)) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Test", 6, "Recorder Repetitive SceneItemActor", ["Actor", u.GetName()]);
          }
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Test", 6, "  SceneItem Child", ["Name", u.GetName()]);
          }
          c.add(u);
          if (!!u.RootComponent && !(u instanceof UE.Brush) && !(u instanceof UE.LevelSequenceActor)) {
            const n = UE.NewObject(UE.KuroMeshRecorder.StaticClass());
            this.Sar.push(n);
            n.SetRecordActor(u, exports.RECORD_INTERVAL, exports.RECORDER_MAX_SPEED);
            n.StartRecorder(t, i);
          }
        }
      }
    }
  }
  TickRecorder(r) {
    for (const e of this.Sar) {
      e.TickRecorder(r);
    }
  }
  StopRecorder() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Stop SceneItem Recorder", ["LevelName", SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionLevelName(this.Ear.GetSceneInteractionLevelHandleId())], ["EntityId", this.Ear?.Entity?.Id], ["Time", RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint()]);
    }
    for (const r of this.Sar) {
      r.StopRecorder();
    }
  }
}
class EffectRecorderObject {
  constructor(r, e, t, i) {
    this.OC = r;
    this.m$o = e;
    this.yar = -1;
    this.Iar = -1;
    this.Playing = false;
    this.iy = undefined;
    this.n8 = "";
    this.klh = undefined;
    this.Cce = 0;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Start Effect Recorder", ["Actor", r.GetName()], ["Time", i]);
    }
    this.Cce = i;
    this.iy = UE.NewObject(UE.KuroEffectRecorder.StaticClass());
    this.iy.SetEffectClass(UE.TsRecordEffect_C.StaticClass(), EffectSystem_1.EffectSystem.GetEffectModel(e).GetName());
    this.iy.SetRecordActor(r, exports.RECORD_INTERVAL, exports.RECORDER_MAX_SPEED);
    this.iy.StartRecorder(t, i);
    var n;
    var t = this.iy.GetShadow();
    this.n8 = UE.KismetSystemLibrary.GetPathName(EffectSystem_1.EffectSystem.GetEffectModel(e));
    this.iy.RecordStringValue(r, new UE.FName("EffectModelDataPath"), i - exports.EFFECT_CREATE_ADVANCE, this.n8);
    if (EffectSystem_1.EffectSystem.IsHandleFreeze(e)) {
      t.LifeTimeType = 3;
      if (!this.klh) {
        n = EffectSystem_1.EffectSystem.GetSeekToTargetTime(this.m$o);
        this.klh = new RecordCurveObject_1.RecordFloatCurveObject(r, "ManualProcessTime", i, n);
      }
      this.iy.AddAutoFloatPropertyTrack(t, new UE.FName("ManualProcessTime"), i);
    }
    t.EffectModelDataPath = this.n8;
    t.EffectModelData = EffectSystem_1.EffectSystem.GetEffectModel(e);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Record Effect", ["EffectModel", EffectSystem_1.EffectSystem.GetEffectModel(e)?.GetName()], ["Path", t.EffectModelDataPath]);
    }
  }
  TickRecorder(r) {
    let e = false;
    var t;
    var i = EffectSystem_1.EffectSystem.GetLastPlayTime(this.m$o);
    var n = EffectSystem_1.EffectSystem.GetLastStopTime(this.m$o);
    if (EffectSystem_1.EffectSystem.IsHandleFreeze(this.m$o) && (t = EffectSystem_1.EffectSystem.GetSeekToTargetTime(this.m$o)) > -1) {
      if (this.klh) {
        this.klh.RecordTick(r, t);
      } else {
        this.klh = new RecordCurveObject_1.RecordFloatCurveObject(this.OC, "ManualProcessTime", this.Cce, t);
      }
    }
    if (i > 0 && i !== this.yar) {
      this.yar = i;
      e = true;
      this.Playing = true;
    }
    if (n > 0 && n !== this.Iar) {
      this.Iar = n;
      e = true;
      this.Playing = false;
    }
    if (e) {
      if (this.yar > this.Iar) {
        this.iy.PlayCommand();
      } else {
        this.iy.StopCommand();
      }
    }
    if (this.iy.TickRecorder(r)) {
      this.Cce += r;
    }
  }
  StopRecorder() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Stop Effect Recorder");
    }
    if (this.klh) {
      this.klh.RecordStop(this.Cce, this.iy, 1);
      this.klh = undefined;
    }
    if (this.yar > this.Iar) {
      this.iy.StopCommand();
    }
    this.iy.RecordStringValue(this.OC, new UE.FName("EffectModelDataPath"), RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint(), this.n8);
    this.iy.StopRecorder();
  }
}
class BpFxEffectRecorderObject {
  constructor(r, e, t) {
    this.OC = r;
    this.ae = t;
    this.Recorder = undefined;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Start TsBpFxEffect Recorder", ["Actor", r.GetName()], ["Time", t]);
    }
    this.Recorder = UE.NewObject(UE.KuroTrackRecorder.StaticClass());
    this.Recorder.SetRecordActor(r, exports.RECORD_INTERVAL, exports.RECORDER_MAX_SPEED);
    this.Recorder.StartRecorder(e, t);
    (this.OC.Recorder = this).OC.RecorderShadow = this.Shadow;
    this.Shadow.IsRecorderActor = true;
    this.OC.OnRecordStart();
  }
  get Shadow() {
    return this.Recorder.GetShadow();
  }
  TickRecorder(r) {
    this.OC.OnRecordTick(r);
    this.Recorder.TickRecorder(r);
  }
  StopRecorder(r) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Stop TsBpFxEffect Recorder", ["Actor", this.OC.GetName()], ["Time", RecorderBlueprintFunctionLibrary.RecordingTimeNoBlueprint()]);
    }
    this.OC.OnRecordStop();
    this.Recorder.AddStaticBoolPropertyTrack(this.OC, new UE.FName("IsRecorderActor"), true, this.ae, r);
    this.Recorder.StopRecorder();
    this.OC.ClearRecorder();
  }
}
exports.BpFxEffectRecorderObject = BpFxEffectRecorderObject;
class RecorderBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static get CharacterTypes() {
    RecorderBlueprintFunctionLibrary.CharacterTypesInternal ||= new Set([Protocol_1.Aki.Protocol.kks.Proto_Animal, Protocol_1.Aki.Protocol.kks.Proto_Monster, Protocol_1.Aki.Protocol.kks.Proto_Npc, Protocol_1.Aki.Protocol.kks.Proto_Player, Protocol_1.Aki.Protocol.kks.Proto_Vision, Protocol_1.Aki.Protocol.kks.HI_]);
    return RecorderBlueprintFunctionLibrary.CharacterTypesInternal;
  }
  static get SceneItemTypes() {
    RecorderBlueprintFunctionLibrary.SceneItemTypesInternal ||= new Set([Protocol_1.Aki.Protocol.kks.Proto_SceneItem]);
    return RecorderBlueprintFunctionLibrary.SceneItemTypesInternal;
  }
  static FindCenterLocation() {
    var r = RecorderBlueprintFunctionLibrary.CenterLocation;
    r.DeepCopy(RecorderBlueprintFunctionLibrary.CenterActor ? RecorderBlueprintFunctionLibrary.CenterActor.D_K2_GetActorLocation() : Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxyNoUpdate);
    return r;
  }
  static Init() {
    RecorderBlueprintFunctionLibrary.RecordNotifies = UE.NewArray(UE.Class);
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyEffect_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyStateEffect_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyStateGhost_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyAddMaterialControllerData_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyAddMaterialControllerDataGroup_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyAddMeshMaterialControllerData_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyAddMeshMaterialControllerDataGroup_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyAddMotionVertexOffset_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyAddTransferEffect_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyStateAddMaterialControllerData_C.StaticClass());
    RecorderBlueprintFunctionLibrary.RecordNotifies.Add(UE.AnimNotifyStateAddMaterialControllerDataGroup_C.StaticClass());
    RecorderBlueprintFunctionLibrary.ReplaceNotifies = UE.NewArray(UE.Class);
    RecorderBlueprintFunctionLibrary.CenterLocation = Vector_1.Vector.Create();
    RecorderBlueprintFunctionLibrary.EffectLocation = Vector_1.Vector.Create();
    RecorderBlueprintFunctionLibrary.OverrideAttached = UE.NewMap(UE.BuiltinName, UE.Guid);
    RecorderBlueprintFunctionLibrary.IgnoreClasses = UE.NewSet(UE.Class);
    RecorderBlueprintFunctionLibrary.IgnoreClasses.Add(UE.BP_Cinematics_Tick_C.StaticClass());
    RecorderBlueprintFunctionLibrary.Stat1 = Stats_1.Stat.Create("RecorderStat1");
    RecorderBlueprintFunctionLibrary.Stat2 = Stats_1.Stat.Create("RecorderStat2");
    RecorderBlueprintFunctionLibrary.Stat3 = Stats_1.Stat.Create("RecorderStat3");
  }
  static StartRecord(r, e, t, i, n, o) {
    if ((RecorderBlueprintFunctionLibrary.Init(), !RecorderBlueprintFunctionLibrary.Recording) && (r || Global_1.Global.BaseCharacter)) {
      RecorderBlueprintFunctionLibrary.EnableCharacterRecord = i;
      RecorderBlueprintFunctionLibrary.EnableSceneItemRecord = n;
      RecorderBlueprintFunctionLibrary.EnableEffectRecord = o;
      RecorderBlueprintFunctionLibrary.Recording = true;
      RecorderBlueprintFunctionLibrary.RecordingTimeInternal = 0;
      RecorderBlueprintFunctionLibrary.CenterActor = r;
      RecorderBlueprintFunctionLibrary.RecordDist = e;
      RecorderBlueprintFunctionLibrary.RecordDistSquared = e * e;
      RecorderBlueprintFunctionLibrary.CharacterRecorders = new Map();
      RecorderBlueprintFunctionLibrary.SceneItemRecorders = new Map();
      RecorderBlueprintFunctionLibrary.EffectRecorders = new Map();
      RecorderBlueprintFunctionLibrary.BpFxEffectRecorders = new Map();
      RecorderBlueprintFunctionLibrary.GameplayCueRecorders = new Map();
      i = (0, puerts_1.$ref)(undefined);
      RecorderBlueprintFunctionLibrary.OutPath = t;
      UE.KuroAnimEdLibrary.CreateNewLevelSequence(t + "RecordSequence", i, undefined, r ?? Global_1.Global.BaseCharacter);
      RecorderBlueprintFunctionLibrary.OutputSequence = (0, puerts_1.$unref)(i);
      UE.KuroDataHelperLibrary.SaveObject(RecorderBlueprintFunctionLibrary.OutputSequence);
      RecorderBlueprintFunctionLibrary.FightCameraRecorder = new CameraRecorderObject(CameraController_1.CameraController.FightCamera.LogicComponent.CameraActor, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      RecorderBlueprintFunctionLibrary.SequenceCameraRecorder = new CameraRecorderObject(CameraController_1.CameraController.SequenceCamera.DisplayComponent.CineCamera, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      RecorderBlueprintFunctionLibrary.WidgetCameraRecorder = new CameraRecorderObject(CameraController_1.CameraController.WidgetCamera.DisplayComponent.CineCamera, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      RecorderBlueprintFunctionLibrary.OverrideAttached.Empty();
      RecorderBlueprintFunctionLibrary.OverrideAttached.Set(new UE.FName("SequenceCamera"), RecorderBlueprintFunctionLibrary.SequenceCameraRecorder.Recorder.GetMainGuid());
      RecorderBlueprintFunctionLibrary.StartRecordersWhenUpdate();
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateEntity, RecorderBlueprintFunctionLibrary.OnCreateEntity);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlayCameraLevelSequence, RecorderBlueprintFunctionLibrary.OnPlayCameraLevelSequence);
      return RecorderBlueprintFunctionLibrary.OutputSequence;
    }
  }
  static TickRecord(r) {
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Test", 6, "TickRecord");
    }
    if (RecorderBlueprintFunctionLibrary.Recording && (RecorderBlueprintFunctionLibrary.CenterActor || Global_1.Global.BaseCharacter)) {
      var e;
      var t;
      var i;
      var n;
      var o;
      var c = Time_1.Time.DeltaTimeSeconds;
      RecorderBlueprintFunctionLibrary.RecordingTimeInternal += c;
      RecorderBlueprintFunctionLibrary.Stat3.Start();
      RecorderBlueprintFunctionLibrary.StopRecordersWhenUpdate();
      RecorderBlueprintFunctionLibrary.FightCameraRecorder?.TickRecorder(c);
      RecorderBlueprintFunctionLibrary.SequenceCameraRecorder?.TickRecorder(c);
      RecorderBlueprintFunctionLibrary.WidgetCameraRecorder?.TickRecorder(c);
      for ([, e] of RecorderBlueprintFunctionLibrary.CharacterRecorders) {
        e.TickRecorder(c);
      }
      for ([, t] of RecorderBlueprintFunctionLibrary.SceneItemRecorders) {
        t.TickRecorder(c);
      }
      for ([, i] of RecorderBlueprintFunctionLibrary.EffectRecorders) {
        i.TickRecorder(c);
      }
      for ([, n] of RecorderBlueprintFunctionLibrary.BpFxEffectRecorders) {
        n.TickRecorder(c);
      }
      for ([, o] of RecorderBlueprintFunctionLibrary.GameplayCueRecorders) {
        o.TickRecorder(c);
      }
      RecorderBlueprintFunctionLibrary.StartRecordersWhenUpdate();
      RecorderBlueprintFunctionLibrary.Stat3.Stop();
    }
  }
  static StopRecord() {
    if (RecorderBlueprintFunctionLibrary.Recording) {
      RecorderBlueprintFunctionLibrary.FightCameraRecorder?.StopRecorder();
      RecorderBlueprintFunctionLibrary.SequenceCameraRecorder?.StopRecorder();
      RecorderBlueprintFunctionLibrary.WidgetCameraRecorder?.StopRecorder();
      for (var [, r] of RecorderBlueprintFunctionLibrary.CharacterRecorders) {
        r.StopRecorder();
      }
      RecorderBlueprintFunctionLibrary.CharacterRecorders.clear();
      for (var [, e] of RecorderBlueprintFunctionLibrary.SceneItemRecorders) {
        e.StopRecorder();
      }
      RecorderBlueprintFunctionLibrary.SceneItemRecorders.clear();
      for (var [, t] of RecorderBlueprintFunctionLibrary.EffectRecorders) {
        t.StopRecorder();
      }
      RecorderBlueprintFunctionLibrary.EffectRecorders.clear();
      for (var [, i] of RecorderBlueprintFunctionLibrary.BpFxEffectRecorders) {
        i.StopRecorder(RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      }
      RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.clear();
      for (var [, n] of RecorderBlueprintFunctionLibrary.GameplayCueRecorders) {
        n.StopRecorder(RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      }
      RecorderBlueprintFunctionLibrary.GameplayCueRecorders.clear();
      RecorderBlueprintFunctionLibrary.Recording = false;
      RecorderBlueprintFunctionLibrary.RecordingTimeInternal = 0;
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntity, RecorderBlueprintFunctionLibrary.OnCreateEntity);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlayCameraLevelSequence, RecorderBlueprintFunctionLibrary.OnPlayCameraLevelSequence);
    }
  }
  static IsPlaying() {
    return RecorderBlueprintFunctionLibrary.Playing;
  }
  static SetPlaying(r) {
    RecorderBlueprintFunctionLibrary.Playing = r;
  }
  static GetPlayingLevelSequence(r) {
    if (!RecorderBlueprintFunctionLibrary.LevelSequencePlayer?.IsValid()) {
      var e = (0, puerts_1.$ref)(undefined);
      UE.GameplayStatics.GetAllActorsOfClass(r, UE.LevelSequenceActor.StaticClass(), e);
      var t = (0, puerts_1.$unref)(e);
      for (let r = t.Num() - 1; r >= 0; --r) {
        var i = t.Get(r);
        if (i.IsValid()) {
          RecorderBlueprintFunctionLibrary.LevelSequencePlayer = i.SequencePlayer;
          break;
        }
      }
    }
    return RecorderBlueprintFunctionLibrary.LevelSequencePlayer;
  }
  static IsRecording() {
    return RecorderBlueprintFunctionLibrary.Recording;
  }
  static RecordingTime() {
    return RecorderBlueprintFunctionLibrary.RecordingTimeInternal || 0;
  }
  static CreateNewDataAsset(r, e) {
    return RecorderBlueprintFunctionLibrary.CreateNewDataAssetNoBlueprint(r, e);
  }
  static CreateNewDataAssetNoBlueprint(r, e) {
    var t = (0, puerts_1.$ref)(undefined);
    UE.KuroAnimEdLibrary.CreateNewDataAsset(RecorderBlueprintFunctionLibrary.OutPath + r, e, t, undefined);
    return (0, puerts_1.$unref)(t);
  }
  static SaveObject(r) {
    UE.KuroDataHelperLibrary.SaveObject(r);
  }
  static RecordingTimeNoBlueprint() {
    return RecorderBlueprintFunctionLibrary.RecordingTimeInternal || 0;
  }
  static GetRecordingsText() {
    return RecorderBlueprintFunctionLibrary.RecordingsText;
  }
  static StopRecordersWhenUpdate() {
    let r = false;
    for (var [e, t] of RecorderBlueprintFunctionLibrary.CharacterRecorders) {
      if (!EntitySystem_1.EntitySystem.Get(e)) {
        t.StopRecorder();
        RecorderBlueprintFunctionLibrary.CharacterRecorders.delete(e);
        r = true;
      }
    }
    for (var [i, n] of RecorderBlueprintFunctionLibrary.SceneItemRecorders) {
      if (!EntitySystem_1.EntitySystem.Get(i)) {
        n.StopRecorder();
        RecorderBlueprintFunctionLibrary.SceneItemRecorders.delete(i);
        r = true;
      }
    }
    for (var [o, c] of RecorderBlueprintFunctionLibrary.EffectRecorders) {
      if (!EffectSystem_1.EffectSystem.IsValid(o)) {
        c.StopRecorder();
        RecorderBlueprintFunctionLibrary.EffectRecorders.delete(o);
      }
    }
    return r;
  }
  static StartRecordersWhenUpdate() {
    var r = this.FindCenterLocation();
    RecorderBlueprintFunctionLibrary.Stat1.Start();
    let e = RecorderBlueprintFunctionLibrary.StartEntityRecorders(r);
    RecorderBlueprintFunctionLibrary.Stat1.Stop();
    RecorderBlueprintFunctionLibrary.Stat2.Start();
    if (RecorderBlueprintFunctionLibrary.StartEffectRecorders(r)) {
      e = true;
    }
    RecorderBlueprintFunctionLibrary.Stat2.Stop();
    e;
  }
  static StartEntityRecorders(r) {
    let e = false;
    var t;
    var i;
    if (RecorderBlueprintFunctionLibrary.EnableCharacterRecord) {
      for (const u of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        if (u.Valid && u.Entity) {
          var n = u.Entity;
          if (n.Active && !RecorderBlueprintFunctionLibrary.CharacterRecorders.has(u.Entity.Id)) {
            var o = n.GetComponent(0);
            if (o && RecorderBlueprintFunctionLibrary.CharacterTypes.has(o.GetEntityType())) {
              o = n.GetComponent(1);
              if (o && !(Vector_1.Vector.DistSquared(o.ActorLocationProxy, r) > RecorderBlueprintFunctionLibrary.RecordDistSquared)) {
                if (o instanceof CharacterActorComponent_1.CharacterActorComponent) {
                  var c = new CharacterRecorderObject(o.Actor, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal, RecorderBlueprintFunctionLibrary.OutPath);
                  RecorderBlueprintFunctionLibrary.CharacterRecorders.set(n.Id, c);
                } else {
                  if (!(o instanceof VehicleActorComponent_1.VehicleActorComponent)) {
                    continue;
                  }
                  c = new CharacterRecorderObject(o.Actor, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal, RecorderBlueprintFunctionLibrary.OutPath);
                  RecorderBlueprintFunctionLibrary.CharacterRecorders.set(n.Id, c);
                }
                e = true;
              }
            }
          }
        }
      }
    }
    if (RecorderBlueprintFunctionLibrary.EnableSceneItemRecord) {
      for (const a of ModelManager_1.ModelManager.CreatureModel.GetAllEntities()) {
        if (a.Valid && a.Entity && (t = a.Entity).Active && !RecorderBlueprintFunctionLibrary.SceneItemRecorders.has(a.Entity.Id) && (i = t.GetComponent(0)) && RecorderBlueprintFunctionLibrary.SceneItemTypes.has(i.GetEntityType())) {
          if (!!(i = t.GetComponent(203)).GetIsSceneInteractionLoadCompleted() && !(Vector_1.Vector.DistSquared(i.ActorLocationProxy, r) > RecorderBlueprintFunctionLibrary.RecordDistSquared)) {
            i = new SceneItemRecorderObject(i, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
            RecorderBlueprintFunctionLibrary.SceneItemRecorders.set(t.Id, i);
            e = true;
          }
        }
      }
    }
    return e;
  }
  static StartEffectRecorders(r) {
    RecorderBlueprintFunctionLibrary.EffectLocation ||= Vector_1.Vector.Create();
    if (RecorderBlueprintFunctionLibrary.EnableEffectRecord) {
      EffectSystem_1.EffectSystem.SetEffectStartRecording(RecorderBlueprintFunctionLibrary.EffectLocation, r, RecorderBlueprintFunctionLibrary.RecordDistSquared, this.OnEffectRecorded);
    }
    return false;
  }
  static StartRecordTsBpFxEffect(r) {
    var e;
    var t;
    var i;
    if (RecorderBlueprintFunctionLibrary.EnableEffectRecord) {
      return (e = RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.get(r)) || (t = this.FindCenterLocation(), (i = RecorderBlueprintFunctionLibrary.EffectLocation).FromUeVector(r.D_K2_GetActorLocation()), Vector_1.Vector.DistSquared(t, i) > RecorderBlueprintFunctionLibrary.RecordDistSquared ? void (Log_1.Log.CheckInfo() && Log_1.Log.Info("Test", 6, "Record TsBpFxEffect TooFar", ["Name", r.GetName()], ["effectLocation", i], ["centerLocation", t])) : (e = new BpFxEffectRecorderObject(r, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal), RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.set(r, e), e));
    }
  }
  static StopRecordTsBpFxEffect(r) {
    var e = RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.get(r);
    if (e) {
      e.StopRecorder(RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      RecorderBlueprintFunctionLibrary.BpFxEffectRecorders.delete(r);
    }
  }
  static StartRecordGameplayCueHook(e, t) {
    if (RecorderBlueprintFunctionLibrary.EnableEffectRecord) {
      let r = RecorderBlueprintFunctionLibrary.GameplayCueRecorders.get(t);
      var i;
      var n;
      if (r) {
        return r;
      } else {
        i = this.FindCenterLocation();
        (n = RecorderBlueprintFunctionLibrary.EffectLocation).FromUeVector(e.D_K2_GetActorLocation());
        if (Vector_1.Vector.DistSquared(i, n) > RecorderBlueprintFunctionLibrary.RecordDistSquared) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Test", 6, "Record GameplayCue TooFar", ["Name", e.GetName()], ["actorLocation", n], ["centerLocation", i]);
          }
          return;
        } else {
          (r = new (t instanceof GameplayCueHookCommonItem_1.GameplayCueHookCommonItem ? GameplayCueRecorder_1.GameplayCueRecorderHook : GameplayCueRecorder_1.GameplayCueRecorderBeam)(e, t, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal)).Start();
          RecorderBlueprintFunctionLibrary.GameplayCueRecorders.set(t, r);
          return r;
        }
      }
    }
  }
  static StopRecordGameplayCueHook(r) {
    var e = RecorderBlueprintFunctionLibrary.GameplayCueRecorders.get(r);
    if (e) {
      e.StopRecorder(RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
      RecorderBlueprintFunctionLibrary.GameplayCueRecorders.delete(r);
    }
  }
  static RecorderPlayerInitialize() {
    RecorderBlueprintFunctionLibrary.RecorderPlayerInitializeTs();
  }
  static RecorderPlayerInitializeTs() {
    if (!RecorderBlueprintFunctionLibrary.RecorderPlayerInitialized) {
      RecorderBlueprintFunctionLibrary.RecorderPlayerInitialized = true;
      EffectSystem_1.EffectSystem.Initialize();
    }
  }
  static FindCharacterRecorder(r) {
    if (r) {
      return RecorderBlueprintFunctionLibrary.CharacterRecorders.get(r.GetEntityIdNoBlueprint())?.Recorder;
    }
  }
}
RecorderBlueprintFunctionLibrary.CharacterTypesInternal = undefined;
RecorderBlueprintFunctionLibrary.SceneItemTypesInternal = undefined;
RecorderBlueprintFunctionLibrary.Playing = false;
RecorderBlueprintFunctionLibrary.LevelSequencePlayer = undefined;
RecorderBlueprintFunctionLibrary.Recording = false;
RecorderBlueprintFunctionLibrary.RecordingTimeInternal = 0;
RecorderBlueprintFunctionLibrary.OutPath = "";
RecorderBlueprintFunctionLibrary.OutputSequence = undefined;
RecorderBlueprintFunctionLibrary.CenterActor = undefined;
RecorderBlueprintFunctionLibrary.RecordDist = 0;
RecorderBlueprintFunctionLibrary.RecordDistSquared = 0;
RecorderBlueprintFunctionLibrary.FightCameraRecorder = undefined;
RecorderBlueprintFunctionLibrary.SequenceCameraRecorder = undefined;
RecorderBlueprintFunctionLibrary.WidgetCameraRecorder = undefined;
RecorderBlueprintFunctionLibrary.CharacterRecorders = new Map();
RecorderBlueprintFunctionLibrary.SceneItemRecorders = new Map();
RecorderBlueprintFunctionLibrary.EffectRecorders = new Map();
RecorderBlueprintFunctionLibrary.BpFxEffectRecorders = new Map();
RecorderBlueprintFunctionLibrary.GameplayCueRecorders = new Map();
RecorderBlueprintFunctionLibrary.RecordingsText = "";
RecorderBlueprintFunctionLibrary.RecordNotifies = UE.NewArray(UE.Class);
RecorderBlueprintFunctionLibrary.ReplaceNotifies = UE.NewArray(UE.Class);
RecorderBlueprintFunctionLibrary.EnableCharacterRecord = false;
RecorderBlueprintFunctionLibrary.EnableSceneItemRecord = false;
RecorderBlueprintFunctionLibrary.EnableEffectRecord = false;
RecorderBlueprintFunctionLibrary.CenterLocation = Vector_1.Vector.Create();
RecorderBlueprintFunctionLibrary.OverrideAttached = UE.NewMap(UE.BuiltinName, UE.Guid);
RecorderBlueprintFunctionLibrary.IgnoreClasses = UE.NewSet(UE.Class);
RecorderBlueprintFunctionLibrary.EffectLocation = undefined;
RecorderBlueprintFunctionLibrary.Stat1 = undefined;
RecorderBlueprintFunctionLibrary.Stat2 = undefined;
RecorderBlueprintFunctionLibrary.Stat3 = undefined;
RecorderBlueprintFunctionLibrary.OnEffectRecorded = (r, e) => {
  if (!RecorderBlueprintFunctionLibrary.EffectRecorders.has(r)) {
    e = new EffectRecorderObject(e, r, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal);
    RecorderBlueprintFunctionLibrary.EffectRecorders.set(r, e);
  }
};
RecorderBlueprintFunctionLibrary.RecorderPlayerInitialized = false;
RecorderBlueprintFunctionLibrary.OnCreateEntity = (r, e) => {
  var t;
  var i;
  if (!RecorderBlueprintFunctionLibrary.CharacterRecorders.has(e.Id)) {
    if ((i = e.Entity.GetComponent(3))?.Valid) {
      t = RecorderBlueprintFunctionLibrary.FindCenterLocation();
      if (!(Vector_1.Vector.DistSquared(i.ActorLocationProxyNoUpdate, t) > RecorderBlueprintFunctionLibrary.RecordDistSquared)) {
        i = new CharacterRecorderObject(e.Entity.GetComponent(3).Actor, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal, RecorderBlueprintFunctionLibrary.OutPath);
        RecorderBlueprintFunctionLibrary.CharacterRecorders.set(e.Id, i);
      }
    }
  }
};
RecorderBlueprintFunctionLibrary.OnPlayCameraLevelSequence = (r, e, t, i) => {
  e = RecorderBlueprintFunctionLibrary.FindCharacterRecorder(e);
  if (e) {
    RecorderBlueprintFunctionLibrary.OverrideAttached.Set(new UE.FName("Role"), e.GetMainGuid());
  }
  if (RecorderBlueprintFunctionLibrary.SequenceCameraRecorder?.Recorder) {
    RecorderBlueprintFunctionLibrary.OverrideAttached.Set(new UE.FName("SequenceCamera"), RecorderBlueprintFunctionLibrary.SequenceCameraRecorder.Recorder.GetMainGuid());
  }
  e = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(i);
  UE.KuroRecorderLibrary.CopyLevelSequence(r, RecorderBlueprintFunctionLibrary.OutputSequence, RecorderBlueprintFunctionLibrary.RecordingTimeInternal, RecorderBlueprintFunctionLibrary.OverrideAttached, RecorderBlueprintFunctionLibrary.IgnoreClasses, e);
};
exports.default = RecorderBlueprintFunctionLibrary; //# sourceMappingURL=RecorderBlueprintFunctionLibrary.js.map