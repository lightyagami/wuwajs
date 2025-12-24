"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrengthUnit = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const HudUnitBase_1 = require("../HudUnitBase");
const HudUnitUtils_1 = require("../Utils/HudUnitUtils");
const FlyStrengthItem_1 = require("./Strength/FlyStrengthItem");
const MotorcycleStrengthItem_1 = require("./Strength/MotorcycleStrengthItem");
const StrengthItem_1 = require("./Strength/StrengthItem");
const strengthItemConfigMap = new Map([[1, StrengthItem_1.StrengthItem], [2, FlyStrengthItem_1.FlyStrengthItem], [3, MotorcycleStrengthItem_1.MotorcycleStrengthItem]]);
const MAX_DELTA_TIME = 200;
const MIN_DELTA_OFFSET = 0.5;
const MAX_POS_OFFSET = 500;
const ITEM_OFFSET_X_BASE = 157;
const ITEM_OFFSET_X_INTERVAL = 105;
const normalIndex = [0, 1];
const swapIndex = [1, 0];
class StrengthUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.jma = new Vector2D_1.Vector2D();
    this.Wst = undefined;
    this.n$t = undefined;
    this.Rii = 0;
    this.Uii = 0;
    this.Aii = 0;
    this.Pii = 0;
    this.x5e = [];
    this.NRl = new Map();
    this.FRl = false;
    this.VRl = [0, 0];
    this.HRl = t => {
      this.jRl();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  OnStart() {
    super.OnStart();
    this.x5e.push(this.GetItem(0));
    this.x5e.push(this.GetItem(1));
    this.InitTweenAnim(2);
    this.InitTweenAnim(3);
    this.AddStrengthItem(1, 0);
  }
  OnBeforeDestroy() {
    this.Wst = undefined;
    this.n$t = undefined;
    super.OnBeforeDestroy();
  }
  RefreshRoleData(t) {
    if (this.Wst !== t) {
      if (this.Wst = t) {
        this.n$t = t.EntityHandle.Entity.GetComponent(3);
        for (const e of this.NRl.values()) {
          e.RefreshRoleData(t);
        }
      } else {
        this.n$t = undefined;
      }
    }
  }
  AddStrengthItem(t, e) {
    if (this.NRl.has(t)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("HudUnit", 17, "已经添加过该类型的体力条", ["strengthItemType", t]);
      }
    } else if (e < 0 || e > 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HudUnit", 17, "体力条位置参数非法", ["index", e]);
      }
    } else {
      if (this.VRl[e] !== 0) {
        if (e === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("HudUnit", 17, "该位置已有其他体力条", ["oldStrengthItemType", this.VRl[e]], ["newStrengthItemType", t]);
          }
          return;
        }
        var i = this.NRl.get(this.VRl[e]);
        if (i) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("HudUnit", 17, "该位置已有其他体力条, 销毁旧体力条", ["oldStrengthItemType", this.VRl[e]], ["newStrengthItemType", t]);
          }
          i.Destroy();
          this.NRl.delete(this.VRl[e]);
        }
      }
      var i = strengthItemConfigMap.get(t);
      if (i) {
        this.VRl[e] = t;
        e = this.x5e[e];
        (i = new i()).Init(e, this.Wst, this.HRl);
        this.NRl.set(t, i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HudUnit", 17, "体力条类型没有对应的实现", ["strengthItemType", t]);
      }
    }
  }
  SwapPlace(t) {
    if (this.FRl !== t) {
      this.FRl = t;
      this.jRl();
    }
  }
  jRl() {
    let t = true;
    for (const e of this.VRl) {
      if (!this.NRl.get(e)?.GetUiVisible()) {
        t = false;
      }
    }
    if (t) {
      if (this.FRl) {
        this.StopTweenAnim(2);
        this.PlayTweenAnim(3);
      } else {
        this.StopTweenAnim(3);
        this.PlayTweenAnim(2);
      }
    } else {
      let t = 0;
      let e = true;
      for (const h of this.FRl ? swapIndex : normalIndex) {
        var i = this.x5e[h];
        var s = this.VRl[h];
        if (this.NRl.get(s)?.GetUiVisible()) {
          i.SetAnchorOffsetX(ITEM_OFFSET_X_BASE + ITEM_OFFSET_X_INTERVAL * t);
          i.SetAlpha(e ? 1 : 0.3);
          i.SetUIItemScale(Vector_1.Vector.OneVector);
          t++;
        }
        e = false;
      }
    }
  }
  Tick(t) {
    this.WRl(t);
    for (const e of this.NRl.values()) {
      e.Tick(t);
    }
  }
  WRl(t) {
    var e;
    var i;
    if (this.GetActive() && this.n$t && this.n$t.Actor?.IsValid() && (e = this.n$t.ActorLocation, HudUnitUtils_1.HudUnitUtils.PositionUtil.ProjectWorldToScreen(e, this.jma))) {
      e = this.jma.X;
      i = this.jma.Y;
      if (Math.abs(e - this.Rii) > MAX_POS_OFFSET || Math.abs(i - this.Uii) > MAX_POS_OFFSET) {
        this.Rii = e;
        this.Uii = i;
        this.SetAnchorOffset(this.Rii, this.Uii);
      } else {
        this.Aii = this.jii(t, e, this.Rii, this.Aii);
        this.Pii = this.jii(t, i, this.Uii, this.Pii);
        e = this.Aii * t;
        i = this.Pii * t;
        if (!(e < MIN_DELTA_OFFSET) || !(e > -MIN_DELTA_OFFSET) || !(i < MIN_DELTA_OFFSET) || !(i > -MIN_DELTA_OFFSET)) {
          this.Rii += e;
          this.Uii += i;
          this.SetAnchorOffset(this.Rii, this.Uii);
        }
      }
    }
  }
  jii(t, e, i, s) {
    let h = e - i;
    let r = false;
    if (h < 0) {
      h = -h;
      r = true;
    }
    if (h < 1) {
      return 0;
    }
    let o = 0;
    o = t >= MAX_DELTA_TIME ? h / t : h / MAX_DELTA_TIME;
    if (r) {
      o = -o;
    }
    return MathUtils_1.MathUtils.Lerp(s, o, 0.5);
  }
}
exports.StrengthUnit = StrengthUnit;
//# sourceMappingURL=StrengthUnit.js.map