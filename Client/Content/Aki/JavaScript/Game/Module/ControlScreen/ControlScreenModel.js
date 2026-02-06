"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlScreenModel = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const ControlScreenDefine_1 = require("./ControlScreenDefine");
class ControlScreenModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Dqt = ControlScreenDefine_1.DEFAULT_COMMON_ROTATION_RATE;
    this.Rqt = ControlScreenDefine_1.DEFAULT_ARM_ROTATION_RATE;
    this.Uqt = ControlScreenDefine_1.DEFAULT_COMMON_ROTATION_RATE;
    this.MinTouchMoveDifference = 0;
    this.MaxTouchMoveDifference = 0;
    this.MaxTouchMoveValue = 0;
    this.MinTouchMoveValue = 0;
    this.Aqt = 0;
    this.Pqt = 0;
    this.xqt = -0;
    this.wqt = new Map();
    this.Bqt = undefined;
    this.bqt = undefined;
  }
  OnInit() {
    this.MinTouchMoveDifference = CommonParamById_1.configCommonParamById.GetIntConfig("MinTouchMoveDifference");
    this.MaxTouchMoveDifference = CommonParamById_1.configCommonParamById.GetIntConfig("MaxTouchMoveDifference");
    this.MaxTouchMoveValue = CommonParamById_1.configCommonParamById.GetFloatConfig("MaxTouchMoveValue");
    this.MinTouchMoveValue = CommonParamById_1.configCommonParamById.GetFloatConfig("MinTouchMoveValue");
    this.Dqt = CommonParamById_1.configCommonParamById.GetFloatConfig("CommonRotationRate");
    this.Rqt = CommonParamById_1.configCommonParamById.GetFloatConfig("ArmRotationRate");
    this.xqt = CommonParamById_1.configCommonParamById.GetIntConfig("DoubleTouchTime");
    return true;
  }
  SetCurrentTouchTimeStamp(e) {
    this.Aqt = e;
  }
  SetCurrentTouchId(e) {
    this.Pqt = e;
  }
  SetCurrentEnterComponent(e) {
    this.Bqt = e;
  }
  SetCurrentPressComponent(e) {
    this.bqt = e;
  }
  IsDoubleTouch(e) {
    return this.GetTouchEmptyFingerDataCount() === 1 && e === this.Pqt && TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.Aqt <= this.xqt;
  }
  IsDoubleTouchResetCameraComponent(e, t) {
    return !!this.Bqt?.IsValid() && !!this.bqt?.IsValid() && (!!this.Bqt.ComponentHasTag(t) || !!this.bqt.ComponentHasTag(t)) && e.IsTouchComponentContainTag(t);
  }
  AddTouchEmptyFingerData(e) {
    var t = e.GetFingerIndex();
    this.wqt.set(t, e);
  }
  RemoveTouchEmptyFingerData(e) {
    e = e.GetFingerIndex();
    this.wqt.delete(e);
  }
  GetTouchEmptyFingerDataCount() {
    return this.wqt.size;
  }
  get IsTouching() {
    return this.wqt.size > 0;
  }
  IsTouchEmpty(e) {
    return this.wqt.has(e);
  }
  GetTouchEmptyFingerDataByCount(e) {
    var t = [];
    for (const o of this.wqt.values()) {
      if (e <= t.length) {
        break;
      }
      t.push(o);
    }
    return t;
  }
  SetCommonRotationScreenRate(e) {
    this.Dqt = e;
  }
  SetArmRotationScreenRate(e) {
    this.Rqt = e;
  }
  RefreshRotationScreenRate() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e && e.Entity.GetComponent(186).DirectionState === CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection) {
      this.Uqt = this.Rqt;
    } else {
      this.Uqt = this.Dqt;
    }
  }
  GetRotationScreenRate() {
    return this.Uqt;
  }
}
exports.ControlScreenModel = ControlScreenModel;
//# sourceMappingURL=ControlScreenModel.js.map