"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionContainer = exports.BulletActionCenter = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const BulletConstant_1 = require("../BulletConstant");
const BulletActionAfterInit_1 = require("./BulletActionAfterInit");
const BulletActionAttachActor_1 = require("./BulletActionAttachActor");
const BulletActionAttachParentEffect_1 = require("./BulletActionAttachParentEffect");
const BulletActionBase_1 = require("./BulletActionBase");
const BulletActionChild_1 = require("./BulletActionChild");
const BulletActionDelayDestroyBullet_1 = require("./BulletActionDelayDestroyBullet");
const BulletActionDestroyBullet_1 = require("./BulletActionDestroyBullet");
const BulletActionInfo_1 = require("./BulletActionInfo");
const BulletActionInitBullet_1 = require("./BulletActionInitBullet");
const BulletActionInitCollision_1 = require("./BulletActionInitCollision");
const BulletActionInitHit_1 = require("./BulletActionInitHit");
const BulletActionInitMove_1 = require("./BulletActionInitMove");
const BulletActionInitRender_1 = require("./BulletActionInitRender");
const BulletActionSceneInteract_1 = require("./BulletActionSceneInteract");
const BulletActionSummonBullet_1 = require("./BulletActionSummonBullet");
const BulletActionSummonEntity_1 = require("./BulletActionSummonEntity");
const BulletActionTimeScale_1 = require("./BulletActionTimeScale");
const BulletActionUpdateAttackerFrozen_1 = require("./BulletActionUpdateAttackerFrozen");
const BulletActionUpdateEffect_1 = require("./BulletActionUpdateEffect");
const BulletActionUpdateLiveTime_1 = require("./BulletActionUpdateLiveTime");
class BulletActionCenter {
  constructor() {
    this.f5o = undefined;
  }
  Init() {
    this.LTe();
  }
  Clear() {
    this.f5o = undefined;
  }
  LTe() {
    this.f5o = new Array(19);
    this.SXi(0, BulletActionInfo_1.BulletActionInfoSimple, BulletActionBase_1.BulletActionTest);
    this.SXi(1, BulletActionInfo_1.BulletActionInfoSimple, BulletActionInitBullet_1.BulletActionInitBullet);
    this.SXi(2, BulletActionInfo_1.BulletActionInfoSimple, BulletActionInitHit_1.BulletActionInitHit);
    this.SXi(3, BulletActionInfo_1.BulletActionInfoSimple, BulletActionInitMove_1.BulletActionInitMove);
    this.SXi(4, BulletActionInfo_1.BulletActionInfoSimple, BulletActionInitRender_1.BulletActionInitRender, true);
    this.SXi(5, BulletActionInfo_1.BulletActionInfoSimple, BulletActionTimeScale_1.BulletActionTimeScale, true);
    this.SXi(9, BulletActionInfo_1.BulletActionInfoSimple, BulletActionAfterInit_1.BulletActionAfterInit);
    this.SXi(6, BulletActionInfo_1.BulletActionInfoSimple, BulletActionInitCollision_1.BulletActionInitCollision);
    this.SXi(7, BulletActionInfo_1.BulletActionInfoSimple, BulletActionUpdateEffect_1.BulletActionUpdateEffect, true);
    this.SXi(15, BulletActionInfo_1.BulletActionInfoSimple, BulletActionUpdateAttackerFrozen_1.BulletActionUpdateAttackerFrozen, true);
    this.SXi(8, BulletActionInfo_1.BulletActionInfoSimple, BulletActionUpdateLiveTime_1.BulletActionUpdateLiveTime, true);
    this.SXi(10, BulletActionInfo_1.BulletActionInfoSimple, BulletActionChild_1.BulletActionChild, true);
    this.SXi(11, BulletActionInfo_1.BulletActionInfoSummonBullet, BulletActionSummonBullet_1.BulletActionSummonBullet);
    this.SXi(12, BulletActionInfo_1.BulletActionInfoSimple, BulletActionSummonEntity_1.BulletActionSummonEntity);
    this.SXi(13, BulletActionInfo_1.BulletActionInfoDestroyBullet, BulletActionDestroyBullet_1.BulletActionDestroyBullet);
    this.SXi(14, BulletActionInfo_1.BulletActionInfoAttachActor, BulletActionAttachActor_1.BulletActionAttachActor);
    this.SXi(16, BulletActionInfo_1.BulletActionInfoSimple, BulletActionAttachParentEffect_1.BulletActionAttachParentEffect, true);
    this.SXi(17, BulletActionInfo_1.BulletActionInfoDestroyBullet, BulletActionDelayDestroyBullet_1.BulletActionDelayDestroyBullet, true);
    this.SXi(18, BulletActionInfo_1.BulletActionInfoSimple, BulletActionSceneInteract_1.BulletActionSceneInteract, true);
  }
  SXi(t, e, i, l = false) {
    var n;
    if (!this.f5o[t]) {
      (n = new BulletActionContainer()).Init(t, e, i, l);
      this.f5o[t] = n;
    }
  }
  GetBulletActionContainer(t) {
    return this.f5o[t];
  }
  CreateBulletActionInfo(t) {
    return this.GetBulletActionContainer(t).GetActionInfo();
  }
  RecycleBulletActionInfo(t) {
    this.GetBulletActionContainer(t.Type).RecycleActionInfo(t);
  }
  CreateBulletAction(t) {
    return this.GetBulletActionContainer(t).GetAction();
  }
  RecycleBulletAction(t) {
    this.GetBulletActionContainer(t.Type).RecycleAction(t);
  }
}
exports.BulletActionCenter = BulletActionCenter;
class BulletActionContainer {
  constructor() {
    this.E9 = 0;
    this.p5o = undefined;
    this.v5o = undefined;
    this.M5o = false;
    this.E5o = undefined;
    this.TXi = undefined;
    this.S5o = undefined;
    this.y5o = undefined;
    this.I5o = false;
  }
  Init(t, e, i, l = false) {
    this.E9 = t;
    this.p5o = e;
    this.v5o = i;
    this.M5o = l;
    this.I5o = this.p5o === BulletActionInfo_1.BulletActionInfoSimple;
    this.E5o = new Array();
    this.TXi = new Array();
    t = this.T5o();
    t.IsInPool = true;
    this.TXi.push(t);
    this.S5o = new Array();
    this.y5o = new Array();
    e = this.dZ();
    e.IsInPool = true;
    this.y5o.push(e);
  }
  get ActionType() {
    return this.E9;
  }
  T5o() {
    var t = new this.p5o(this.E9);
    t.Index = this.E5o.length;
    this.E5o.push(t);
    return t;
  }
  GetActionInfo() {
    var t;
    if (this.I5o) {
      return this.TXi[0];
    } else if (this.TXi.length <= 0) {
      return this.T5o();
    } else {
      (t = this.TXi.pop()).IsInPool = false;
      return t;
    }
  }
  dZ() {
    var t = new this.v5o(this.E9);
    t.Index = this.S5o.length;
    this.S5o.push(t);
    return t;
  }
  GetAction() {
    var t;
    if (this.M5o) {
      if (this.y5o.length <= 0) {
        return this.dZ();
      } else {
        (t = this.y5o.pop()).IsInPool = false;
        return t;
      }
    } else {
      return this.y5o[0];
    }
  }
  RecycleActionInfo(t) {
    if (!this.I5o) {
      if (t.IsInPool) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "BulletActionInfo重复入池");
        }
      } else {
        t.Clear();
        t.IsInPool = true;
        this.TXi.push(this.E5o[t.Index]);
      }
    }
  }
  RecycleAction(t) {
    var e = t.GetActionInfo();
    this.RecycleActionInfo(e);
    t.Clear();
    if (BulletConstant_1.BulletConstant.OpenClearCheck) {
      for (const u in e) {
        var i = e[u];
        var l = typeof i;
        if ((l != "number" || i !== 0) && (l != "boolean" || i !== false)) {
          if (i !== undefined && u !== "Type" && u !== "Index" && u !== "IsInPool" && l != "function" && Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 17, "BulletActionInfo回收时，该变量不为undefined", ["type", e.Type], ["key", u]);
          }
        }
      }
      for (const c in t) {
        var n = t[c];
        var o = typeof n;
        if ((o != "number" || n !== 0) && (o != "boolean" || n !== false)) {
          if (n !== undefined && c !== "Type" && c !== "Index" && c !== "IsInPool" && c !== "Stat" && c !== "TickStat" && o != "function" && Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 17, "BulletAction回收时，该变量不为undefined", ["type", t.Type], ["key", c]);
          }
        }
      }
    }
    if (this.M5o) {
      if (t.IsInPool) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "BulletAction重复入池");
        }
      } else {
        t.IsInPool = true;
        this.y5o.push(this.S5o[t.Index]);
      }
    }
  }
}
exports.BulletActionContainer = BulletActionContainer;
//# sourceMappingURL=BulletActionCenter.js.map