"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleNpcController = undefined;
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PC_CHECK_RANGE = 6000;
const PC_CHECK_RANGE_SQUARED = PC_CHECK_RANGE * PC_CHECK_RANGE;
const MOBILE_CHECK_RANGE = 3000;
const MOBILE_CHECK_RANGE_SQUARED = MOBILE_CHECK_RANGE * MOBILE_CHECK_RANGE;
const DITHER_STEP = 0.33;
const DITHER_MAX = 1;
const DITHER_MIN = 0;
const MILLISECOND_TO_SECOND = 0.001;
class SimpleNpcController extends ControllerBase_1.ControllerBase {
  static get wir() {
    return this.Bir.size > 0;
  }
  static OnInit() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("UiCommon", 27, "初始化SimpleNpcController");
    }
    this.OnAddEvents();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnReceivePlayerVar, SimpleNpcController.bir);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WeatherChange, SimpleNpcController.dIe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetImageQuality, SimpleNpcController.qir);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WeatherChange, SimpleNpcController.dIe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetImageQuality, SimpleNpcController.qir);
  }
  static OnLeaveLevel() {
    this.Gir.clear();
    this.Nir.clear();
    this.Oir.clear();
    this.kir.clear();
    return true;
  }
  static Add(t) {
    this.Gir.add(t);
    var e = Global_1.Global.BaseCharacter;
    if (e) {
      this.Fir(t, e.CharacterActorComponent.ActorLocationProxy, false);
    }
    this.CheckNpcShowState(t, true);
    this.Vir(t);
  }
  static Remove(t) {
    this.Gir.delete(t);
    this.Nir.delete(t);
    this.Oir.delete(t);
    this.kir.delete(t);
  }
  static SetClearOutState(t, e) {
    let i = false;
    if (e && !this.Bir.has(t)) {
      this.Bir.add(t);
      i = true;
    } else if (!e && this.Bir.has(t)) {
      this.Bir.delete(t);
      i = true;
    }
    if (i) {
      for (const o of this.Nir) {
        this.CheckNpcShowState(o, true, false);
        o.ChangeLogicRangeState(false);
      }
    }
  }
  static OnTick(t) {
    this.Hir(t);
    this.jir(t);
  }
  static GetSimpleNpcListByRange(t) {
    var e = new Array();
    var i = Global_1.Global.BaseCharacter;
    if (i) {
      var o = t * t;
      var r = i.CharacterActorComponent.ActorLocationProxy;
      for (const n of this.Gir) {
        var s = n.SelfLocationProxy;
        if (!(o < Vector_1.Vector.DistSquared(r, s))) {
          e.push(n);
        }
      }
    }
    return e;
  }
  static Wir() {
    if (Info_1.Info.IsPcOrGamepadPlatform()) {
      this.Kir = PC_CHECK_RANGE_SQUARED;
    } else {
      this.Kir = MOBILE_CHECK_RANGE_SQUARED;
    }
    this.Qir();
  }
  static UpdateDistanceLogic() {
    var t = Global_1.Global.BaseCharacter;
    if (t) {
      if (!this.gU) {
        this.Wir();
        this.gU = true;
      }
      var e = t.CharacterActorComponent.ActorLocationProxy;
      for (const i of this.Gir) {
        this.Fir(i, e);
      }
    }
  }
  static Fir(t, e, i = true) {
    var o;
    if (t.IsNotUnload) {
      o = t.SelfLocationProxy;
      if ((e = Vector_1.Vector.DistSquared(e, o)) > this.Kir) {
        this.Xir(t, false, i);
      } else {
        this.Xir(t, true, i);
      }
      t.TempDistanceSquared = e;
    }
  }
  static Xir(t, e, i = true) {
    var o = t.IsInLogicRange;
    t.ChangeLogicRangeState(e);
    if (o !== e) {
      t.SetTickEnabled(e);
      t.SetMainShadowEnabled(e);
      if (!o && e) {
        this.Nir.add(t);
        if (i) {
          this.CheckNpcShowState(t, false);
        }
      } else if (o && !e) {
        this.Nir.delete(t);
      }
    }
  }
  static $ir(t) {
    t.CurDither = DITHER_MIN;
    t.IsNotUnload = true;
    t.SetDitherEffect(DITHER_MIN, 1);
    this.Oir.add(t);
    this.kir.delete(t);
  }
  static Yir(t) {
    t.CurDither = DITHER_MAX;
    t.IsNotUnload = false;
    t.SetDitherEffect(DITHER_MAX, 1);
    this.kir.add(t);
    this.Oir.delete(t);
  }
  static Hir(e) {
    if (!(this.Oir.size <= 0)) {
      let t = undefined;
      for (const i of this.Oir) {
        i.CurDither += DITHER_STEP * e * MILLISECOND_TO_SECOND;
        i.CurDither = MathUtils_1.MathUtils.Clamp(i.CurDither, DITHER_MIN, DITHER_MAX);
        i.SetDitherEffect(i.CurDither, 1);
        if (MathUtils_1.MathUtils.IsNearlyEqual(i.CurDither, DITHER_MAX)) {
          (t = t === undefined ? [] : t).push(i);
        }
      }
      if (t !== undefined) {
        for (const o of t) {
          this.Oir.delete(o);
        }
      }
    }
  }
  static jir(e) {
    if (!(this.kir.size <= 0)) {
      let t = undefined;
      for (const i of this.kir) {
        i.CurDither -= DITHER_STEP * e * MILLISECOND_TO_SECOND;
        i.CurDither = MathUtils_1.MathUtils.Clamp(i.CurDither, DITHER_MIN, DITHER_MAX);
        i.SetDitherEffect(i.CurDither, 1);
        if (MathUtils_1.MathUtils.IsNearlyEqual(i.CurDither, DITHER_MIN)) {
          (t = t === undefined ? [] : t).push(i);
        }
      }
      if (t !== undefined) {
        for (const o of t) {
          this.kir.delete(o);
        }
      }
    }
  }
  static Jir(t, e) {
    t.CurDither = e ? DITHER_MAX : DITHER_MIN;
    t.IsNotUnload = e;
    t.SetDitherEffect(t.CurDither, 1);
    this.Oir.delete(t);
    this.kir.delete(t);
  }
  static CheckNpcShowState(t, e, i = true) {
    var o = !this.wir && this.zir(t);
    if (!o || !!t.IsLodShow) {
      if (i) {
        if (e) {
          if (o) {
            this.$ir(t);
          } else {
            this.Jir(t, o);
          }
        } else if (t.IsNotUnload && !o) {
          this.Yir(t);
        } else if (!t.IsNotUnload && o) {
          this.$ir(t);
        }
      } else {
        this.Jir(t, o);
      }
    }
  }
  static zir(t) {
    var e = ModelManager_1.ModelManager.WeatherModel;
    if (!e) {
      return true;
    }
    let i = true;
    switch (e.CurrentWeatherId) {
      case 1:
        if (t.DisappearOnSunny) {
          i = false;
        }
        break;
      case 2:
        if (t.DisappearOnCloudy) {
          i = false;
        }
        break;
      case 3:
        if (t.DisappearOnRainy) {
          i = false;
        }
        break;
      case 4:
        if (t.DisappearOnThunderRain) {
          i = false;
        }
        break;
      case 5:
        if (t.DisappearOnSnowy) {
          i = false;
        }
    }
    return i;
  }
  static Zir() {
    for (const t of this.Gir) {
      t.FilterFlowWorldState();
    }
  }
  static Qir() {
    for (const t of this.Gir) {
      this.Vir(t);
    }
  }
  static Vir(t) {
    if (t.IsLodShow) {
      if (!t.IsNotUnload) {
        this.$ir(t);
      }
    } else if (t.IsNotUnload) {
      this.Yir(t);
      t.ChangeLogicRangeState(false);
    }
  }
}
(exports.SimpleNpcController = SimpleNpcController).Gir = new Set();
SimpleNpcController.Nir = new Set();
SimpleNpcController.Oir = new Set();
SimpleNpcController.kir = new Set();
SimpleNpcController.Bir = new Set();
SimpleNpcController.Kir = 0;
SimpleNpcController.gU = false;
SimpleNpcController.dIe = () => {
  for (const t of SimpleNpcController.Nir) {
    SimpleNpcController.CheckNpcShowState(t, false);
  }
};
SimpleNpcController.bir = () => {
  SimpleNpcController.Zir();
};
SimpleNpcController.qir = () => {
  SimpleNpcController.Qir();
}; //# sourceMappingURL=SimpleNpcController.js.map