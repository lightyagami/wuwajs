"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../../Camera/CameraController");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const Global_1 = require("../../../../../Global");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const CharacterUtils_1 = require("../../../CharacterUtils");
const CharacterGasDebugComponent_1 = require("../../Component/Abilities/CharacterGasDebugComponent");
const CharacterStatisticsComponent_1 = require("../../Component/Abilities/CharacterStatisticsComponent");
const SAVE_PATH = "Statistics/FightDataRecord/";
class CharacterBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static SetPartCollisionSwitch(t, e, r, a, i) {
    if (t?.IsValid() && t.CharacterActorComponent?.Valid) {
      t.CharacterActorComponent.SetPartCollisionSwitch(e, r, a, i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 20, "传入的character为空");
    }
  }
  static ResetPartCollisionSwitch(t, e) {
    var t = t.CharacterActorComponent;
    var r = t.GetPartConf(e);
    if (r) {
      t.SetPartCollisionSwitch(e, r.IsBlockPawn, r.IsBulletDetect, r.IsBlockCamera);
    }
  }
  static GetCharacterActorByEntityId(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) {
      return t.GetComponent(3)?.Owner;
    }
  }
  static CharacterOperationRecord(t) {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.OperationRecord(t);
    if (t) {
      CharacterGasDebugComponent_1.CharacterGasDebugComponent.BeginRecord();
    } else {
      CharacterGasDebugComponent_1.CharacterGasDebugComponent.EndRecord();
    }
  }
  static GetStatisticsOpen() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.OpenOperationRecord;
  }
  static SaveCharacterOperationRecord() {
    CharacterGasDebugComponent_1.CharacterGasDebugComponent.EndRecord();
    var t = CharacterStatisticsComponent_1.CharacterStatisticsComponent.ExportRecord();
    if (t) {
      if (UE.KuroStaticLibrary.SaveStringToFile(t, UE.BlueprintPathsLibrary.ProjectSavedDir() + SAVE_PATH + "OperationRecord.csv", true) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Test", 20, "OperationRecord写入完成"), CharacterBlueprintFunctionLibrary.SaveCharacterStatisticsData())) {
        return true;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 20, "OperationRecord写入失败");
      }
    }
    return false;
  }
  static SaveCharacterStatisticsData() {
    var t = CharacterStatisticsComponent_1.CharacterStatisticsComponent.ExportStatisticsByAttackType();
    var e = CharacterStatisticsComponent_1.CharacterStatisticsComponent.ExportStatisticsBySkillType();
    var r = !t;
    var a = !e;
    if (r || a) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 20, "读取数据为空", ["A表为空", a], ["B表为空", r]);
      }
    } else {
      a = UE.BlueprintPathsLibrary.ProjectSavedDir();
      r = UE.KuroStaticLibrary.SaveStringToFile(t, a + SAVE_PATH + "DamageStatisticsRecord_B.csv", true);
      t = UE.KuroStaticLibrary.SaveStringToFile(e, a + SAVE_PATH + "DamageStatisticsRecord_A.csv", true);
      if (r && t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Test", 20, "DamageRecord_B写入完成");
        }
        return true;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Test", 20, "DamageRecord_B写入失败", ["A", t], ["B", r]);
      }
    }
    return false;
  }
  static GetOperationRecordCount() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.OperationRecordCount();
  }
  static CleanupOperationRecord() {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.CleanupOperationRecord();
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.CleanupRecordData();
    CharacterGasDebugComponent_1.CharacterGasDebugComponent.CleanupRecord();
  }
  static SetHalfLengthRecord(t) {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.HalfLengthRecordSquared = Math.pow(t, 2);
  }
  static SetCombatStarted(t, e, r, a, i, n, o, c, s) {
    var l = new Array();
    if (a) {
      l.push(0);
    }
    if (i) {
      l.push(1);
    }
    if (n) {
      l.push(2);
    }
    if (o) {
      l.push(3);
    }
    if (c) {
      l.push(4);
    }
    if (s) {
      l.push(5);
    }
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.SetCombatStarted(t, l, e, r);
  }
  static SetTypeOpen(t, e, r, a, i, n) {
    var o = new Array();
    if (t) {
      o.push(0);
    }
    if (e) {
      o.push(1);
    }
    if (r) {
      o.push(2);
    }
    if (a) {
      o.push(3);
    }
    if (i) {
      o.push(4);
    }
    if (n) {
      o.push(5);
    }
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.SetTypeOpen(o);
  }
  static GetAttackerCombatEntities() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.GetAttackerCombatEntities();
  }
  static GetTargetCombatEntities() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.GetTargetCombatEntities();
  }
  static SetCurrentAttacker(t) {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.SetCurrentAttacker(t);
  }
  static SetCurrentTarget(t) {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.SetCurrentTarget(t);
  }
  static GetItemsReset() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.ItemReset;
  }
  static OnItemsResetFinished() {
    CharacterStatisticsComponent_1.CharacterStatisticsComponent.OnItemsResetFinished();
  }
  static GetSubItemsListView(t, e) {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.GetSubItemsListView(t, e);
  }
  static GetItemListViewCount() {
    return CharacterStatisticsComponent_1.CharacterStatisticsComponent.GetItemListViewCount();
  }
  static TestLeaveSplineMove(t) {
    t.GetEntityNoBlueprint().GetComponent(111).EndSplineMove(1);
    CameraController_1.CameraController.FightCamera.LogicComponent.ExitCameraSpline();
  }
  static GetBaseCharacterTransform() {
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (t) {
      return t.ActorTransform;
    } else {
      return MathUtils_1.MathUtils.DefaultTransformDouble;
    }
  }
  static SetActorExtraSkeletalMeshComponent(t, e) {
    var t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
    if (t &&= t.Entity?.GetComponent(3)) {
      t.AddExtraSkeletalMeshComponent(e);
    }
  }
  static CanCharacterMonsterOrSummonedDisplayEffect(t) {
    return !t || !(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId))?.Valid || !!CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(t);
  }
  static DetachFromHost(t, e, r) {
    var t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid && (t = t.GetComponent(184))?.Valid) {
      t.DetachFromHost(e, r, true);
    }
  }
  static GetCharacterGravityDirect() {
    return GravityUtils_1.GravityUtils.GetGravityDirectForActor(Global_1.Global.BaseCharacter?.CharacterActorComponent).ToUeVector();
  }
  static GetCharacterGravityUp() {
    return GravityUtils_1.GravityUtils.GetGravityUpForActor(Global_1.Global.BaseCharacter?.CharacterActorComponent).ToUeVector();
  }
  static SetGravityDirect(t, e) {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t);
    if (t?.Valid && (t = t.Entity.GetComponent(182))?.Valid) {
      t.SetGravityDirectByNumber(e.X, e.Y, e.Z);
    }
  }
  static EnableSelfCentered(t, e, r) {
    if (CharacterBlueprintFunctionLibrary.ResumeTimeHandle?.Valid()) {
      CharacterBlueprintFunctionLibrary.ResumeTimeHandle.Remove();
      CharacterBlueprintFunctionLibrary.ResumeTimeHandle = undefined;
    }
    const a = r * TimeUtil_1.TimeUtil.InverseMillisecond * e;
    ControllerHolder_1.ControllerHolder.CharacterController.EnterSelfCenteredMode(t, e, r);
    if (a > 0 && (CharacterBlueprintFunctionLibrary.ResumeTimeHandle = TimerSystem_1.TimerSystem.Delay(() => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("TimeDilation", 57, "EnableSelfCentered StopTimerSystem", ["selfCenteredMode", t], ["timeDilation", e], ["interval(ms)", a], ["timerHandle.Id", CharacterBlueprintFunctionLibrary.ResumeTimeHandle?.Id]);
      }
      if (t === 5) {
        ControllerHolder_1.ControllerHolder.CharacterController.ExitSkillSelfCenteredMode();
      } else {
        ControllerHolder_1.ControllerHolder.CharacterController.ExitSelfCenteredMode(t);
      }
      if (CharacterBlueprintFunctionLibrary.ResumeTimeHandle?.Valid()) {
        CharacterBlueprintFunctionLibrary.ResumeTimeHandle.Remove();
        CharacterBlueprintFunctionLibrary.ResumeTimeHandle = undefined;
      }
    }, a), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("TimeDilation", 57, "EnableSelfCentered EnableTimerSystem", ["timeDilation", e], ["selfCenteredMode", t], ["interval(ms)", a], ["timerHandle.Id", CharacterBlueprintFunctionLibrary.ResumeTimeHandle?.Id]);
    }
  }
  static DisableSelfCentered(t) {
    ControllerHolder_1.ControllerHolder.CharacterController.ExitSelfCenteredMode(t);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("TimeDilation", 57, "DisableSelfCentered", ["selfCenteredMode", t]);
    }
  }
  static IsAnySelfCenteredModeEnabled() {
    return ModelManager_1.ModelManager.CharacterModel?.EnabledSelfCentered ?? false;
  }
  static IsSelfCenteredModeEnabled(t) {
    return ControllerHolder_1.ControllerHolder.CharacterController.IsSelfCenteredModeEnabled(t);
  }
  static GetEntityForeverTimeDilation(t) {
    CharacterBlueprintFunctionLibrary.EntityTimeDilation ||= new UE.SEntityTimeDilation();
    CharacterBlueprintFunctionLibrary.EntityTimeDilation.SourceType = -1;
    var t = EntitySystem_1.EntitySystem.GetComponent(t, 126);
    if (t?.Valid && (t = t.GetTopForeverTimeScaleConfig())) {
      CharacterBlueprintFunctionLibrary.EntityTimeDilation.SourceType = t.SourceType;
      CharacterBlueprintFunctionLibrary.EntityTimeDilation.TimeDilation = t.TimeDilation;
    }
    return CharacterBlueprintFunctionLibrary.EntityTimeDilation;
  }
  static GetSelfCenteredMode() {
    return ModelManager_1.ModelManager.CharacterModel.SelfCenteredMode;
  }
  static GetSelfCenteredTimeDilation() {
    return ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation;
  }
  static GetInverseSelfCenteredTimeDilation() {
    return ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation;
  }
  static SetPlanarReflectionShowPlayers(t) {
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      var e = r.EntityHandle?.Entity?.GetComponent(3)?.Owner;
      if (e) {
        t.ShowOnlyActors.Add(e);
      }
    }
  }
}
CharacterBlueprintFunctionLibrary.ResumeTimeHandle = undefined;
CharacterBlueprintFunctionLibrary.EntityTimeDilation = undefined;
exports.default = CharacterBlueprintFunctionLibrary; //# sourceMappingURL=CharacterBlueprintFunctionLibrary.js.map