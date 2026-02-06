"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PilotThrowModel = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const SETTING_DA_PATH = "/Game/Aki/Data/Gameplay/PilotThrow/DA_PilotThrowSetting.DA_PilotThrowSetting";
class PilotThrowModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.yZd = 0;
    this.SZd = 0;
    this.MZd = [];
    this.kKm = undefined;
    this.CurrentInRangePoint = undefined;
    this.LaunchDirection = Vector_1.Vector.Create(0, 0, 0);
    this.LaunchSpeed = 0;
    this.LaunchGravity = 0;
    this.NeedMotorRide = false;
    this.DisableInterrupt = false;
    this.ForceLookDir = undefined;
    this.CameraRot = Rotator_1.Rotator.Create(0, 0, 0);
    this.CameraLoc = Vector_1.Vector.Create(0, 0, 0);
    this.ProjectileSplineLastPoint = Vector_1.Vector.Create(0, 0, 0);
  }
  get Setting() {
    if (this.kKm) {
      return this.kKm;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PilotThrow", 31, "[PilotThrowModel] SettingDataAsset is undefined");
    }
  }
  get AimPointInRangeDist() {
    return this.Setting.目标点高亮距离 * this.Setting.目标点高亮距离;
  }
  InitInteractInfo(t, e, o) {
    this.yZd = t;
    this.SZd = e;
    this.MZd = o;
  }
  GetCurrentInteractHookPoint() {
    return this.yZd;
  }
  GetCurrentTitanEntityId() {
    return this.SZd;
  }
  GetPilotThrowTargets() {
    return this.MZd;
  }
  GetSwitchAimTargetTime() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig("PilotThrowSwitchTargetTime");
  }
  IsInProjectileSplineLastPointRange(t) {
    var e = ControllerHolder_1.ControllerHolder.PilotThrowController.ProjectileSpline;
    return !!e && (e = Vector_1.Vector.Create(e.D_FindLocationClosestToWorldLocation(t.ToUeVector(), 1)), Vector_1.Vector.DistSquared(t, e) <= this.AimPointInRangeDist);
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_PilotThrowGameplaySetting_C", () => {
      ResourceSystem_1.ResourceSystem.LoadAsync(SETTING_DA_PATH, UE.BP_PilotThrowGameplaySetting_C, t => {
        if (t) {
          this.kKm = t;
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PilotThrow", 31, "[PilotThrowModel] Load DA_PilotThrowSetting Failed", ["Path", SETTING_DA_PATH]);
        }
      });
    });
    return true;
  }
}
exports.PilotThrowModel = PilotThrowModel;
//# sourceMappingURL=PilotThrowModel.js.map