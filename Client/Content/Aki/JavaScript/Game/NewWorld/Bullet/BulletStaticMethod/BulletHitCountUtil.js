"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletHitCountUtil = undefined;
class BulletHitCountUtil {
  static HitCountCondition(t, i) {
    if (t.CountByParent && t.ParentBulletInfo) {
      return BulletHitCountUtil.HitCountCondition(t.ParentBulletInfo, i);
    }
    let e = i;
    if (!e) {
      return false;
    }
    e = e.GetComponent(59)?.GetAttributeHolderExceptVisionSummon() ?? e;
    i = t.BulletDataMain;
    if (i.Base.VictimCount >= 0 && t.EntityHitCount.size >= i.Base.VictimCount && !t.EntityHitCount.has(e.Id)) {
      return false;
    }
    if (i.Base.HitCountMax >= 0 && t.HitNumberAll >= i.Base.HitCountMax) {
      return false;
    }
    var u = t.EntityHitCount.get(e.Id);
    if (u) {
      if (i.Base.HitCountPerVictim > 0 && u >= i.Base.HitCountPerVictim) {
        return false;
      }
      t.EntityHitCount.set(e.Id, u + 1);
    } else {
      t.EntityHitCount.set(e.Id, 1);
    }
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
      t.HitNumberAll++;
    }
  }
  static CheckHitCountPerVictim(t, i) {
    var e;
    var u;
    if (t.CountByParent && t.ParentBulletInfo) {
      return BulletHitCountUtil.CheckHitCountPerVictim(t.ParentBulletInfo, i);
    } else {
      u = t.EntityHitCount.size;
      return (!((e = t.BulletDataMain).Base.VictimCount >= 0) || !(u >= e.Base.VictimCount) || !!t.EntityHitCount.has(i.Id)) && !(u = t.EntityHitCount.get(i.Id) ?? 0, e.Base.HitCountPerVictim >= 0 && u >= e.Base.HitCountPerVictim) && (!(e.Base.HitCountMax > 0) || !(t.HitNumberAll >= e.Base.HitCountMax));
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