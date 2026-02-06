"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritOccupiedByGearState = undefined;
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SunSpiritCrowdPerform_1 = require("../SunSpiritPerform/SunSpiritCrowdPerform");
const SunSpiritNonePerform_1 = require("../SunSpiritPerform/SunSpiritNonePerform");
const SunSpiritBaseState_1 = require("./SunSpiritBaseState");
class SunSpiritOccupiedByGearState extends SunSpiritBaseState_1.SunSpiritBaseState {
  constructor(e, r, t) {
    super(3, e);
    this.GearConfigId = r;
    this.GearSocketIndex = t;
  }
  IsSameState(e) {
    return super.IsSameState(e) && e instanceof SunSpiritOccupiedByGearState && this.GearConfigId === e.GearConfigId && this.GearSocketIndex === e.GearSocketIndex;
  }
  OnEnter() {
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.GearConfigId)?.Entity;
    var r = e?.GetComponent(336);
    var t = Transform_1.Transform.Create();
    r?.GetSunSpiritSocketTransform(this.GearSocketIndex, t);
    var i = this.SunSpiritData.GetSunSpiritPerform();
    if (r?.GetSunSpiritPerformType() === "ToGearRelativePos") {
      if (i instanceof SunSpiritCrowdPerform_1.SunSpiritCrowdPerform) {
        i.UpdateCtrlByCrowdAi(false);
        i.UpdateForceSpawn(true);
      } else {
        this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritCrowdPerform_1.SunSpiritCrowdPerform(this.SunSpiritData, t, false, true));
      }
    } else if (!(i instanceof SunSpiritNonePerform_1.SunSpiritNonePerform)) {
      this.SunSpiritData.ChangeSunSpiritPerform(new SunSpiritNonePerform_1.SunSpiritNonePerform(this.SunSpiritData, t));
    }
    if (e && r) {
      r.OnSunSpiritTakeUp(this.SunSpiritData, this.GearSocketIndex);
      EventSystem_1.EventSystem.EmitWithTarget(e, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged);
    }
    return true;
  }
  OnExit() {
    var e;
    var r = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.GearConfigId)?.Entity;
    var t = r?.GetComponent(336);
    if (r && t) {
      if (t.GetSunSpiritPerformType() === "ScaleUp") {
        e = Transform_1.Transform.Create();
        t.GetSunSpiritSocketTransform(this.GearSocketIndex, e);
        this.SunSpiritData.SetTransform(e);
      }
      t?.OnSunSpiritRelease(this.SunSpiritData, this.GearSocketIndex);
      EventSystem_1.EventSystem.EmitWithTarget(r, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged);
    }
  }
}
exports.SunSpiritOccupiedByGearState = SunSpiritOccupiedByGearState;
//# sourceMappingURL=SunSpiritOccupiedByGearState.js.map