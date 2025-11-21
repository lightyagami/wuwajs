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
    this.qIm = 0;
    this.JTm = 0;
    this.ZTm = true;
    this.ebm = false;
    this.tbm = false;
    this.OIm = Vector_1.Vector.Create();
    this.GIm = Vector_1.Vector.Create();
    this.FIm = 0;
    this.KYd = 0;
  }
  RefreshBarPercent(t = false) {
    var i = this.PercentMachine.GetCurPercent();
    var s = this.ac === 0 && this.FullEffectEnable && this.GetKeyEnable();
    var h = this.SlotItemList[0];
    this.KeyItem?.RefreshKeyEnable(s, t);
    var e = i * END_LOCATION_X + (1 - i) * START_LOCATION_X;
    this.OIm.X = e;
    this.PointItem?.SetUIRelativeLocation(this.OIm.ToUeVectorOld());
    var r = this.ebm || this.tbm;
    if (this.ebm) {
      this.ebm = false;
      h.UpdatePercent(0, false, true);
    } else if (this.tbm) {
      this.tbm = false;
      h.UpdatePercent(1, false, true);
      h.SetFullEffectVisible(false);
    }
    if (this.ac !== 1 && s && this.ZTm) {
      this.ZTm = false;
      h.PlayChangeEffectWithPercent(1);
    }
    if (this.ac === 1) {
      h.UpdatePercentWithFullEffect(i, i > 0 ? 1 : 0, t);
      this.GIm.X = e;
      this.GearItem?.SetUIRelativeLocation(this.GIm.ToUeVectorOld());
    } else if (s) {
      h.UpdatePercentWithFullEffect(i, i > 0 ? 1 : 0, t);
    } else if (!r) {
      h.UpdatePercent(i, false, t);
    }
    if (this.ac === 0 && this.KYd === 1 && i === 0) {
      h.PlayUseEffectWithPercent(this.KYd);
    }
    this.KYd = i;
  }
  Tick(t) {
    super.Tick(t);
    if (this.ac === 2) {
      this.qIm += t;
      if (this.qIm >= GEAR_ROLLBACK_DURATION) {
        this.GIm.X = END_LOCATION_X;
        this.GearItem?.SetUIRelativeLocation(this.GIm.ToUeVectorOld());
        this.SetState(0);
      } else if (this.GearRollbackCurve) {
        t = this.GearRollbackCurve.GetFloatValue(this.qIm * TimeUtil_1.TimeUtil.Millisecond);
        this.GIm.X = t * END_LOCATION_X + (1 - t) * this.FIm;
        this.GearItem?.SetUIRelativeLocation(this.GIm.ToUeVectorOld());
      }
    }
    if (this.JTm > 0 && this.JTm <= Time_1.Time.Now) {
      this.GlowItem?.SetUIActive(false);
      this.JTm = 0;
    }
  }
  SetState(t) {
    if (this.ac !== t) {
      if ((this.ac = t) === 0) {
        this.ZTm = true;
      } else if (t === 1) {
        this.GIm.X = END_LOCATION_X;
        this.GearItem?.SetUIRelativeLocation(this.GIm.ToUeVectorOld());
        this.GlowItem?.SetUIActive(false);
        this.ebm = true;
        this.RefreshBarPercent();
      } else {
        if ((t = this.PercentMachine.GetCurPercent()) > 0) {
          this.GlowSlider?.SetValue(t);
          this.GlowItem?.SetUIActive(true);
        }
        this.qIm = 0;
        this.FIm = this.GearItem.RelativeLocation.X;
        this.JTm = GLOW_EFFECT_DURATION + Time_1.Time.Now;
        this.ZTm = true;
      }
    }
  }
  SetFullEffectEnable(t) {
    if (this.FullEffectEnable !== t) {
      if (!(this.FullEffectEnable = t) && this.ac !== 2 && this.GetKeyEnable()) {
        this.tbm = true;
      }
      this.RefreshBarPercent();
    }
  }
  SetPointItem(t) {
    this.PointItem = t;
    this.OIm.FromUeVector(t.RelativeLocation);
  }
  SetGearItem(t) {
    this.GearItem = t;
    this.GIm.FromUeVector(t.RelativeLocation);
  }
  SetGearRollbackCurve(t) {
    this.GearRollbackCurve = t;
  }
  StopCoolDownState() {
    if (this.ac === 2) {
      this.GIm.X = END_LOCATION_X;
      this.GearItem?.SetUIRelativeLocation(this.GIm.ToUeVectorOld());
      this.SetState(0);
    }
    if (this.JTm > 0) {
      this.JTm = 0;
      this.GlowItem?.SetUIActive(false);
    }
  }
  IsInSlotState(t) {
    return this.ac === t;
  }
}
exports.SpecialEnergyBarQianXiaoSlot = SpecialEnergyBarQianXiaoSlot;
//# sourceMappingURL=SpecialEnergyBarQianXiaoSlot.js.map