"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowEnterVehicleNpc = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
class LevelFlowEnterVehicleNpc extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
    this.M6l = e => {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.OPt.Target)?.Entity;
      if (e.VehicleEntity && e.VehicleEntity.Id === t?.Id) {
        this.FinishExecute(true);
      }
    };
  }
  Init(e) {
    this.OPt = e;
    return this;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
  }
  OnExecute() {
    if (this.OPt && this.OPt.Target) {
      this.CreateWaitEntityTask(this.OPt.Target);
    } else {
      this.FinishExecute(false);
    }
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
  }
  ExecuteWhenEntitiesReady() {
    var e;
    var t;
    var i;
    if (this.OPt) {
      e = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.OPt.Target)?.Entity;
      if (e) {
        if (t) {
          if ((t = t.GetComponent(246)) && (i = e.GetComponent(242))) {
            if (i.IsOnVehicle) {
              this.FinishExecute(true);
            } else if (!t.TryEnter(e, this.OPt.Seat)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelFlow", 58, "进入载具NPC时尝试进入载具失败", ["TargetVehicle", this.OPt.Target]);
              }
              this.FinishExecute(false);
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelFlow", 58, "进入载具NPC时获取目标载具实体失败", ["TargetVehicle", this.OPt.Target]);
            }
            this.FinishExecute(false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelFlow", 58, "进入载具NPC时无法获取目标载具");
          }
          this.FinishExecute(false);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelFlow", 58, "进入载具NPC时无法获取目标乘客");
        }
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelFlowEnterVehicleNpc = LevelFlowEnterVehicleNpc;
//# sourceMappingURL=LevelFlowEnterVehicleNpc.js.map