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
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const sprintTagId = -245961927;
const rotateTagId = 1645802634;
const JUMP_PLATFORM_BLUEPRINT_TYPE = "branch3.0_135_Gameplay129_1_3";
class LevelEventDriveMotorInSpecConfig extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.u8f = undefined;
    this.c8f = undefined;
    this.jgl = [];
    this.Xte = undefined;
    this.hic = undefined;
    this.E8f = e => {
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
    this.I8f = (e, t) => {
      this.Interrupt(`失败: OnCharBeforeSkillWithTarget: ${e}, IsAutonomousProxy: ${t}`);
    };
  }
  Interrupt(e) {
    if (this.u8f && TimerSystem_1.TimerSystem.Has(this.u8f)) {
      TimerSystem_1.TimerSystem.Remove(this.u8f);
    }
    this.u8f = undefined;
    this.c8f?.SetResult(e);
    this.c8f = undefined;
  }
  OnFailure() {
    this.ClearAndLogReport(0);
  }
  OnFinish() {
    this.ClearAndLogReport(1);
  }
  ClearAndLogReport(e) {
    if (this.Xte?.Valid) {
      for (const i of this.jgl) {
        this.Xte.RemoveTag(i);
      }
    }
    var t;
    this.Xte = undefined;
    this.jgl.length = 0;
    if (this.hic && (EventSystem_1.EventSystem.HasWithTarget(this.hic, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f) && EventSystem_1.EventSystem.RemoveWithTarget(this.hic, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f), EventSystem_1.EventSystem.HasWithTarget(this.hic, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.I8f) && EventSystem_1.EventSystem.RemoveWithTarget(this.hic, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.I8f), LevelEventDriveMotorInSpecConfig.w6f.has(this.hic.Id))) {
      LevelEventDriveMotorInSpecConfig.w6f.delete(this.hic.Id);
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
    if (this.BaseContext?.Type === 1 || this.BaseContext?.Type === 5) {
      if ((t = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, this.BaseContext)?.Entity?.CheckGetComponent(0))?.GetPbEntityInitData()?.BlueprintType === JUMP_PLATFORM_BLUEPRINT_TYPE) {
        ControllerHolder_1.ControllerHolder.LevelPlayController.LogReportMotorcycleLevelPlay(t.GetPbDataId(), 1, true, e);
      }
    }
  }
  async uQf(e, t) {
    if (this.hic?.Valid) {
      var i = this.hic.CheckGetComponent(247);
      this.Xte = this.hic.CheckGetComponent(217);
      if (i && this.Xte) {
        var o = e;
        if (o.Duration < MathCommon_1.MathCommon.KindaSmallNumber) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 72, "[DriveMotorInSpecConfig] params 配置问题", ["Duration", o.Duration]);
          }
          this.FinishExecute(false);
        } else {
          if (o.DisableInput) {
            for (const s of o.DisableInput) {
              switch (s) {
                case "Left":
                case "Right":
                  this.jgl.push(rotateTagId);
              }
            }
          }
          switch (o.MotorParamsChangeConfig.Type) {
            case "SpeedUp":
              this.jgl.push(o.MotorParamsChangeConfig.SpeedUpTagId);
              this.jgl.push(sprintTagId);
              break;
            case "SpeedDown":
              this.jgl.push(o.MotorParamsChangeConfig.SpeedDownTagId);
          }
          LevelEventDriveMotorInSpecConfig.w6f.add(this.hic.Id);
          for (const n of this.jgl) {
            this.Xte.AddTag(n);
          }
          this.c8f = new CustomPromise_1.CustomPromise();
          EventSystem_1.EventSystem.AddWithTarget(this.hic, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
          EventSystem_1.EventSystem.AddWithTarget(this.hic, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.I8f);
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TeleportStart, this.bpr);
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnStartFlow, this.$an);
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
          this.u8f = TimerSystem_1.TimerSystem.Delay(e => {
            this.c8f?.SetResult(`成功: 时间${e}ms`);
          }, o.Duration * CommonDefine_1.MILLIONSECOND_PER_SECOND);
          i = await this.c8f.Promise;
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("LevelEvent", 72, "[DriveMotorInSpecConfig] 完成: " + i);
          }
          this.FinishExecute(true);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ExecuteNew(e, t) {
    var i;
    var o = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (o) {
      if ((i = o.Entity.CheckGetComponent(242)) && i.VehicleEntity?.Valid) {
        if (i.VehicleType !== "Motorcycle") {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 72, `[DriveMotorInSpecConfig] EVehicleType ${i.VehicleType}不是Motorcycle`, ["context", t], ["param", e]);
          }
          this.FinishExecute(false);
        } else if (LevelEventDriveMotorInSpecConfig.w6f.has(i.VehicleEntity.Id)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 72, `[DriveMotorInSpecConfig] 摩托实体${i.VehicleEntity.Id}正在执行行为中`, ["context", t], ["param", e]);
          }
          this.FinishExecute(false);
        } else {
          this.hic = i.VehicleEntity;
          this.uQf(e, t);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 72, "[DriveMotorInSpecConfig] driveComp或者VehicleEntity 无效", ["driveComp", i], ["vehicleEntity", i?.VehicleEntity], ["context", t], ["param", e]);
        }
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 72, "[DriveMotorInSpecConfig] playerActorComp 无效", ["characterActorComp", o], ["context", t], ["param", e]);
      }
      this.FinishExecute(false);
    }
  }
}
(exports.LevelEventDriveMotorInSpecConfig = LevelEventDriveMotorInSpecConfig).w6f = new Set();
//# sourceMappingURL=LevelEventDriveMotorInSpecConfig.js.map