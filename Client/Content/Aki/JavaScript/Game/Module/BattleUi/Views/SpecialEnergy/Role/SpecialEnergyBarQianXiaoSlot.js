"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarQianXiaoSlot = undefined;
const Time_1 = require("../../../../../../Core/Common/Time");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const SpecialEnergyBarSlot_1 = require("../SpecialEnergyBarSlot");
const START_LOCATION_X = -181;
const END_LOCATION_X = 187;
const GEAR_ROLLBACK_DURATION = 300;
const GLOW_EFFECT_DURATION = 1000;
class SpecialEnergyBarQianXiaoSlot extends SpecialEnergyBarSlot_1.SpecialEnergyBarSlot {
  constructor() {
    super(...arguments);
    this.PointItem = undefined;
    this.GearItem = undefined;
    this.GlowItem = undefined;
    this.GlowSlider = undefined;
    this.GearRollbackCurve = undefined;
    this.FullEffectEnable = false;
    this.ac = 0;
    this.Rqm = 0;
    this.gFm = 0;
    this.CFm = true;
    this.pFm = false;
    this.vFm = false;
    this.wqm = Vector_1.Vector.Create();
    this.Lqm = Vector_1.Vector.Create();
    this.Pqm = 0;
    this.wzd = 0;
  }
  RefreshBarPercent(t = false) {
    var i = this.PercentMachine.GetCurPercent();
    var s = this.ac === 0 && this.FullEffectEnable && this.GetKeyEnable();
    var h = this.SlotItemList[0];
    this.KeyItem?.RefreshKeyEnable(s, t);
    var e = i * END_LOCATION_X + (1 - i) * START_LOCATION_X;
    this.wqm.X = e;
    this.PointItem?.SetUIRelativeLocation(this.wqm.ToUeVectorOld());
    var r = this.pFm || this.vFm;
    if (this.pFm) {
      this.pFm = false;
      h.UpdatePercent(0, false, true);
    } else if (this.vFm) {
      this.vFm = false;
      h.UpdatePercent(1, false, true);
      h.SetFullEffectVisible(false);
    }
    if (this.ac !== 1 && s && this.CFm) {
      this.CFm = false;
      h.PlayChangeEffectWithPercent(1);
    }
    if (this.ac === 1) {
      h.UpdatePercentWithFullEffect(i, i > 0 ? 1 : 0, t);
      this.Lqm.X = e;
      this.GearItem?.SetUIRelativeLocation(this.Lqm.ToUeVectorOld());
    } else if (s) {
      h.UpdatePercentWithFullEffect(i, i > 0 ? 1 : 0, t);
    } else if (!r) {
      h.UpdatePercent(i, false, t);
    }
    if (this.ac === 0 && this.wzd === 1 && i === 0) {
      h.PlayUseEffectWithPercent(this.wzd);
    }
    this.wzd = i;
  }
  Tick(t) {
    super.Tick(t);
    if (this.ac === 2) {
      this.Rqm += t;
      if (this.Rqm >= GEAR_ROLLBACK_DURATION) {
        this.Lqm.X = END_LOCATION_X;
        this.GearItem?.SetUIRelativeLocation(this.Lqm.ToUeVectorOld());
        this.SetState(0);
      } else if (this.GearRollbackCurve) {
        t = this.GearRollbackCurve.GetFloatValue(this.Rqm * TimeUtil_1.TimeUtil.Millisecond);
        this.Lqm.X = t * END_LOCATION_X + (1 - t) * this.Pqm;
        this.GearItem?.SetUIRelativeLocation(this.Lqm.ToUeVectorOld());
      }
    }
    if (this.gFm > 0 && this.gFm <= Time_1.Time.Now) {
      this.GlowItem?.SetUIActive(false);
      this.gFm = 0;
    }
  }
  SetState(t) {
    if (this.ac !== t) {
      if ((this.ac = t) === 0) {
        this.CFm = true;
      } else if (t === 1) {
        this.Lqm.X = END_LOCATION_X;
        this.GearItem?.SetUIRelativeLocation(this.Lqm.ToUeVectorOld());
        this.GlowItem?.SetUIActive(false);
        this.pFm = true;
        this.RefreshBarPercent();
      } else {
        if ((t = this.PercentMachine.GetCurPercent()) > 0) {
          this.GlowSlider?.SetValue(t);
          this.GlowItem?.SetUIActive(true);
        }
        this.Rqm = 0;
        this.Pqm = this.GearItem.RelativeLocation.X;
        this.gFm = GLOW_EFFECT_DURATION + Time_1.Time.Now;
        this.CFm = true;
      }
    }
  }
  SetFullEffectEnable(t) {
    if (this.FullEffectEnable !== t) {
      if (!(this.FullEffectEnable = t) && this.ac !== 2 && this.GetKeyEnable()) {
        this.vFm = true;
      }
      this.RefreshBarPercent();
    }
  }
  SetPointItem(t) {
    this.PointItem = t;
    this.wqm.FromUeVector(t.RelativeLocation);
  }
  SetGearItem(t) {
    this.GearItem = t;
    this.Lqm.FromUeVector(t.RelativeLocation);
  }
  SetGearRollbackCurve(t) {
    this.GearRollbackCurve = t;
  }
  StopCoolDownState() {
    if (this.ac === 2) {
      this.Lqm.X = END_LOCATION_X;
      this.GearItem?.SetUIRelativeLocation(this.Lqm.ToUeVectorOld());
      this.SetState(0);
    }
    if (this.gFm > 0) {
      this.gFm = 0;
      this.GlowItem?.SetUIActive(false);
    }
  }
  IsInSlotState(t) {
    return this.ac === t;
  }
}
exports.SpecialEnergyBarQianXiaoSlot = SpecialEnergyBarQianXiaoSlot;
//# sourceMappingURL=SpecialEnergyBarQianXiaoSlot.js.map