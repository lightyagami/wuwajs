"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ModelManager_1 = require("../Manager/ModelManager");
const BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
const BaseSkillComponent_1 = require("../NewWorld/Character/Common/Component/Skill/BaseSkillComponent");
class TsAnimNotifyReSkillEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.子弹数据名 = undefined;
    this.子弹出生位置偏移 = undefined;
    this.子弹初速度偏移 = undefined;
    this.子弹id数组 = undefined;
    this.子弹出生位置偏移数组 = undefined;
    this.子弹初速度偏移数组 = undefined;
    this.使用子弹id数组 = false;
    this.使用召唤者子弹 = false;
    this.随机子弹权重数组 = undefined;
    this.传入当前实体位置 = false;
    this.骨骼名字 = undefined;
  }
  Constructor() {}
  K2_Notify(r, s) {
    let o = r.GetOwner();
    let e = undefined;
    if (o instanceof TsBaseCharacter_1.default) {
      if (!(e = o.CharacterActorComponent?.Entity)?.Valid) {
        return false;
      }
      var l = e.GetComponent(213)?.CreateAnimNotifyContent(s.GetName(), this.exportIndex);
      var h = this.GetInitTransform(o);
      if (this.使用召唤者子弹) {
        var t = e.GetComponent(0).GetSummonerId();
        if (!(t > 0)) {
          return false;
        }
        e = ModelManager_1.ModelManager.CreatureModel.GetEntity(t)?.Entity;
        o = e.GetComponent(3).Actor;
        if (!e?.Valid) {
          return false;
        }
        if (!(o instanceof TsBaseCharacter_1.default)) {
          return false;
        }
      }
      t = e.GetComponent(40);
      if (!t?.Valid) {
        return false;
      }
      var i = t.GetCurrentMontageCorrespondingSkillId();
      var n = i !== 0 ? i : t.GetSkillIdWithGroupId(BaseSkillComponent_1.SKILL_GROUP_MAIN);
      var a = t.GetExtraTargetLocation(n);
      if (this.使用子弹id数组) {
        var u = this.子弹id数组.Num();
        var i = this.GetRandomIndex();
        var f = this.子弹出生位置偏移数组.Num();
        var v = this.子弹初速度偏移数组.Num();
        if (i >= 0 && i < u) {
          if (!this.CanCreateBullet(o, s, i)) {
            return false;
          }
          let e = undefined;
          let t = undefined;
          if (i < f) {
            e = this.子弹出生位置偏移数组.Get(i);
          }
          if (i < v) {
            t = this.子弹初速度偏移数组.Get(i);
          }
          BulletUtil_1.BulletUtil.CreateBulletFromAN(o, this.子弹id数组.Get(i), h, n, false, l, a, e, t);
        } else {
          for (let i = 0; i < u; i++) {
            if (this.CanCreateBullet(o, s, i)) {
              let e = undefined;
              let t = undefined;
              if (f > i) {
                e = this.子弹出生位置偏移数组.Get(i);
              }
              if (v > i) {
                t = this.子弹初速度偏移数组.Get(i);
              }
              BulletUtil_1.BulletUtil.CreateBulletFromAN(o, this.子弹id数组.Get(i), h, n, false, l, a, e, t);
            }
          }
        }
      } else {
        if (!this.CanCreateBullet(o, s, 0)) {
          return false;
        }
        BulletUtil_1.BulletUtil.CreateBulletFromAN(o, this.子弹数据名.toString(), h, n, false, l, a, this.子弹出生位置偏移, this.子弹初速度偏移);
      }
      return true;
    }
    if (!(this.使用子弹id数组 ? this.子弹id数组.Num() <= 0 : FNameUtil_1.FNameUtil.IsNothing(this.子弹数据名))) {
      t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(o.GetWorld());
      if (t === 2 || t === 4) {
        i = UE.KismetSystemLibrary.GetOuterObject(this);
        const d = UE.KismetSystemLibrary.GetPathName(i);
        ResourceSystem_1.ResourceSystem.LoadTypeAsync("BPL_BulletPreview_C", () => {
          if (this.使用子弹id数组) {
            var t = this.子弹id数组;
            var i = t.Num();
            var e = this.GetRandomIndex();
            if (e >= 0 && e < i) {
              UE.BPL_BulletPreview_C.ShowBulletPreview(d, new UE.FName(t.Get(e)), o, r, o.GetWorld(), undefined);
            } else {
              for (let e = 0; e < i; e++) {
                UE.BPL_BulletPreview_C.ShowBulletPreview(d, new UE.FName(t.Get(e)), o, r, o.GetWorld(), undefined);
              }
            }
          } else {
            UE.BPL_BulletPreview_C.ShowBulletPreview(d, this.子弹数据名, o, r, o.GetWorld(), undefined);
          }
        });
      }
    }
    return false;
  }
  GetNotifyName() {
    return "添加子弹";
  }
  GetInitTransform(e) {
    if (!this.传入当前实体位置) {
      return new UE.TransformDouble();
    }
    if (!FNameUtil_1.FNameUtil.IsNothing(this.骨骼名字) && e.Mesh.DoesSocketExist(this.骨骼名字)) {
      return e.Mesh.D_GetSocketTransform(this.骨骼名字, 0);
    }
    return e.D_GetTransform();
  }
  GetRandomIndex() {
    var r = this.随机子弹权重数组.Num();
    if (!(r <= 0)) {
      if (r !== this.子弹id数组.Num()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 28, "随机子弹权重数量对不上！");
        }
      } else {
        let t = 0;
        for (let e = 0; e < r; e++) {
          var s = this.随机子弹权重数组.Get(e);
          if (s > 0) {
            t += s;
          }
        }
        let i = Math.random() * t;
        for (let e = 0; e < r; e++) {
          var o = this.随机子弹权重数组.Get(e);
          if (!(o <= 0) && (i -= o) <= 0) {
            return e;
          }
        }
      }
    }
    return -1;
  }
  CanCreateBullet(e, t, i) {
    return true;
  }
}
exports.default = TsAnimNotifyReSkillEvent;
//# sourceMappingURL=TsAnimNotifyReSkillEvent.js.map