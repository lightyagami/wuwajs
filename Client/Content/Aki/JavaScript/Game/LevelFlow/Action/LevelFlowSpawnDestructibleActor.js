"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowSpawnDestructibleActor = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const Global_1 = require("../../Global");
const LevelGameplayActionsDefine_1 = require("../../LevelGamePlay/LevelGameplayActionsDefine");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowResourceManager_1 = require("../LevelFlowResourceManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowSpawnDestructibleActor extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.F$m = [];
    this.cTm = false;
    this.E0 = 0;
  }
  Init(e, t, o) {
    this.F$m = e;
    this.cTm = t;
    this.E0 = o;
    return this;
  }
  OnExecute() {
    if (this.cTm) {
      for (const a of this.F$m) {
        LevelFlowResourceManager_1.LevelFlowResourceManager.ReleaseDestructibleActor(a);
      }
      this.FinishExecute(true);
    } else {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.E0);
      if (e) {
        var t = e.Entity.GetComponent(1);
        if (t) {
          for (const s of this.F$m) {
            var o = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(27, s.toString());
            if (o === undefined) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelFlow", 58, "DestructibleId not found in DestructibleTable");
              }
              this.FinishExecute(false);
              return;
            }
            var i = Global_1.Global.BaseCharacter?.D_GetTransform();
            var r = i?.GetTranslation();
            if (o.IsRelativePosition) {
              r = r?.op_Addition(o.Position);
              i?.SetTranslation(r);
            } else {
              i?.SetLocation(o.Position);
            }
            var r = new LevelGameplayActionsDefine_1.ActionSpawnDestructibleActorWithTrackCapability({
              KuroDestructibleAsset: o.DestructibleAsset.ToAssetPathName(),
              KuroDestructibleDestructionAsset: o.DestructibleDestructionAsset.ToAssetPathName(),
              StartTransform: i,
              TargetToTrack: t.Owner,
              TrackSpeed: o.TraceSpeed,
              TrackMethod: o.TrackMethod,
              TrackPredictionFactor: o.TrackPredictionFactor,
              StopTrackTargetDistance: o.StopTrackTargetDistance,
              ModelTransform: o.ModelTransform,
              RotateParam: {
                Type: 0,
                LocalRotationAxis: o.LocalRotationAxis,
                AngularImpulseRadians: o.AngularImpulseRadians
              },
              DamageAmount: 20,
              HitBuff: o.HitBuff,
              RevertMaxHp: o.RevertMaximumHP
            });
            LevelFlowResourceManager_1.LevelFlowResourceManager.LoadDestructibleActor(s, r);
          }
          this.FinishExecute(true);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "Entity没有ActorComponent", ["EntityId", this.E0]);
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "Entity加载超时或已被移除", ["EntityId", this.E0]);
        }
        this.FinishExecute(false);
      }
    }
  }
  LogExecuteInfo() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelFlow", 58, "执行行为", ["ActionId", this.ActionId], ["ActionName", this.constructor.name], ["EntityId", this.E0], ["DestructibleIdList", this.F$m.toString()]);
    }
  }
}
exports.LevelFlowSpawnDestructibleActor = LevelFlowSpawnDestructibleActor;
//# sourceMappingURL=LevelFlowSpawnDestructibleActor.js.map