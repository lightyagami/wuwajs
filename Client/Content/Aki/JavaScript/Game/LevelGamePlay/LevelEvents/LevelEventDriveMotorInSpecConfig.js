"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventDriveMotorInSpecConfig = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const sprintTagId = -245961927;
const rotateTagId = 1645802634;
class LevelEventDriveMotorInSpecConfig extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.iOf = undefined;
    this.rOf = undefined;
    this.jgl = [];
    this.Xte = undefined;
    this.hic = undefined;
    this.mOf = e => {
      this.Interrupt("失败: OnVehicleBeenLeaved, " + e.ExitType);
    };
    this.bpr = e => {
      this.Interrupt("失败: OnTeleportStart: " + e);
    };
    this.zpe = (e, t) => {
      if (t.Id === this.hic?.Id) {
        this.Interrupt("失败: OnRemoveEntity: " + e);
      }
    };
    this.$an = () => {
      this.Interrupt("失败: OnStartFlow");
    };
    this.fOf = (e, t) => {
      this.Interrupt(`失败: OnCharBeforeSkillWithTarget: ${e}, IsAutonomousProxy: ${t}`);
    };
  }
  Interrupt(e) {
    if (this.iOf && TimerSystem_1.TimerSystem.Has(this.iOf)) {
      TimerSystem_1.TimerSystem.Remove(this.iOf);
    }
    this.iOf = undefined;
    this.rOf?.SetResult(e);
    this.rOf = undefined;
  }
  OnFinish() {
    if (this.Xte?.Valid) {
      for (const e of this.jgl) {
        this.Xte.RemoveTag(e);
      }
    }
    this.Xte = undefined;
    this.jgl.length = 0;
    if (this.hic && (EventSystem_1.EventSystem.HasWithTarget(this.hic, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.mOf) && EventSystem_1.EventSystem.RemoveWithTarget(this.hic, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.mOf), EventSystem_1.EventSystem.HasWithTarget(this.hic, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.fOf) && EventSystem_1.EventSystem.RemoveWithTarget(this.hic, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.fOf), LevelEventDriveMotorInSpecConfig.fGf.has(this.hic.Id))) {
      LevelEventDriveMotorInSpecConfig.fGf.delete(this.hic.Id);
    }
    this.hic = undefined;
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.TeleportStart, this.bpr)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TeleportStart, this.bpr);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnStartFlow, this.$an)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnStartFlow, this.$an);
    }
  }
  async k5f(e, t) {
    if (this.hic?.Valid) {
      var i = this.hic.CheckGetComponent(247);
      this.Xte = this.hic.CheckGetComponent(215);
      if (i && this.Xte) {
        var n = e;
        if (n.Duration < MathCommon_1.MathCommon.KindaSmallNumber) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 72, "[DriveMotorInSpecConfig] params 配置问题", ["Duration", n.Duration]);
          }
        } else {
          if (n.DisableInput) {
            for (const s of n.DisableInput) {
              switch (s) {
                case "Left":
                case "Right":
                  this.jgl.push(rotateTagId);
              }
            }
          }
          switch (n.MotorParamsChangeConfig.Type) {
            case "SpeedUp":
              this.jgl.push(n.MotorParamsChangeConfig.SpeedUpTagId);
              this.jgl.push(sprintTagId);
              break;
            case "SpeedDown":
              this.jgl.push(n.MotorParamsChangeConfig.SpeedDownTagId);
          }
          LevelEventDriveMotorInSpecConfig.fGf.add(this.hic.Id);
          for (const o of this.jgl) {
            this.Xte.AddTag(o);
          }
          this.rOf = new CustomPromise_1.CustomPromise();
          EventSystem_1.EventSystem.AddWithTarget(this.hic, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.mOf);
          EventSystem_1.EventSystem.AddWithTarget(this.hic, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.fOf);
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartFlow, this.$an);
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
          this.iOf = TimerSystem_1.TimerSystem.Delay(e => {
            this.rOf?.SetResult(`成功: 时间${e}ms`);
          }, n.Duration * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          i = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, t));
          if (i) {
            ControllerHolder_1.ControllerHolder.LevelPlayController.LogReportMotorcycleLevelPlay(i, 1, true, 1);
          }
          e = await this.rOf.Promise;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 72, "[DriveMotorInSpecConfig] 完成: " + e);
          }
          this.FinishExecute(true);
        }
      }
    }
  }
  ExecuteNew(e, t) {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if ((i &&= i.Entity.CheckGetComponent(242)) && i.VehicleEntity?.Valid) {
      if (i.VehicleType !== "Motorcycle") {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 72, `[DriveMotorInSpecConfig] EVehicleType ${i.VehicleType}不是Motorcycle`, ["context", t], ["param", e]);
        }
      } else if (LevelEventDriveMotorInSpecConfig.fGf.has(i.VehicleEntity.Id)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 72, `[DriveMotorInSpecConfig] 摩托实体${i.VehicleEntity.Id}正在执行行为中`, ["context", t], ["param", e]);
        }
      } else {
        this.hic = i.VehicleEntity;
        this.k5f(e, t);
      }
    }
  }
}
(exports.LevelEventDriveMotorInSpecConfig = LevelEventDriveMotorInSpecConfig).fGf = new Set();
//# sourceMappingURL=LevelEventDriveMotorInSpecConfig.js.map