"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletHitCountUtil = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const BulletConstant_1 = require("../BulletConstant");
class BulletHitCountUtil {
  static HitCountCondition(t, i) {
    if (t.CountByParent && t.ParentBulletInfo) {
      return BulletHitCountUtil.HitCountCondition(t.ParentBulletInfo, i);
    }
    if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "HitCountCondition", ["EntityHitSet", t.EntityHitSet.size], ["EntityHitSet", Array.from(t.EntityHitSet.values())]);
    }
    let e = i;
    if (!e) {
      return false;
    }
    e = e.GetComponent(61)?.GetAttributeHolderExceptVisionSummon() ?? e;
    i = t.BulletDataMain;
    if (i.Base.VictimCount >= 0 && t.EntityHitSet.size >= i.Base.VictimCount && !t.EntityHitSet.has(e.Id)) {
      return false;
    }
    if (i.Base.HitCountMax >= 0 && t.HitNumberAll >= i.Base.HitCountMax) {
      return false;
    }
    var n = t.EntityHitCount.get(e.Id);
    if (n) {
      if (i.Base.HitCountPerVictim > 0 && n >= i.Base.HitCountPerVictim) {
        return false;
      }
      t.EntityHitCount.set(e.Id, n + 1);
    } else {
      t.EntityHitCount.set(e.Id, 1);
    }
    t.EntityHitSet.add(e.Id);
    t.HitNumberAll++;
    return true;
  }
  static AddHitCount(t, i) {
    var e;
    if (t.CountByParent && t.ParentBulletInfo) {
      BulletHitCountUtil.AddHitCount(t.ParentBulletInfo, i);
    } else {
      e = t.EntityHitCount.get(i.Id) ?? 0;
      t.EntityHitCount.set(i.Id, e + 1);
      t.EntityHitSet.add(i.Id);
      t.HitNumberAll++;
    }
  }
  static CheckHitCountPerVictim(t, i) {
    var e;
    var n;
    if (t.CountByParent && t.ParentBulletInfo) {
      return BulletHitCountUtil.CheckHitCountPerVictim(t.ParentBulletInfo, i);
    } else {
      n = t.EntityHitSet.size;
      if (BulletConstant_1.BulletConstant.OpenHitActorLog && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 20, "CheckHitCountPerVictim", ["EntityHitSet.Size", n], ["EntityHitSet", Array.from(t.EntityHitSet.values())]);
      }
      return (!((e = t.BulletDataMain).Base.VictimCount >= 0) || !(n >= e.Base.VictimCount) || !!t.EntityHitSet.has(i.Id)) && !(n = t.EntityHitCount.get(i.Id) ?? 0, e.Base.HitCountPerVictim >= 0 && n >= e.Base.HitCountPerVictim) && (!(e.Base.HitCountMax > 0) || !(t.HitNumberAll >= e.Base.HitCountMax));
    }
  }
  static CheckHitCountTotal(t) {
    var i;
    if (t.CountByParent && t.ParentBulletInfo) {
      return BulletHitCountUtil.CheckHitCountTotal(t.ParentBulletInfo);
    } else {
      return (i = t.BulletDataMain).Logic.DestroyOnCountZero && i.Base.HitCountMax > 0 && t.HitNumberAll >= i.Base.HitCountMax;
    }
  }
  static GetHitCountByVictim(t, i) {
    if (t.CountByParent && t.ParentBulletInfo) {
      return BulletHitCountUtil.GetHitCountByVictim(t.ParentBulletInfo, i);
    } else {
      return t.EntityHitCount.get(i) ?? 0;
    }
  }
}
exports.BulletHitCountUtil = BulletHitCountUtil;
//# sourceMappingURL=BulletHitCountUtil.js.map