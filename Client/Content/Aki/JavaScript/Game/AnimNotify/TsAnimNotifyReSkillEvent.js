"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const ModelManager_1 = require("../Manager/ModelManager");
const BulletUtil_1 = require("../NewWorld/Bullet/BulletUtil");
const BaseSkillComponent_1 = require("../NewWorld/Character/Common/Component/Skill/BaseSkillComponent");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
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
    this.指定Tag的Component = undefined;
    this.通知实体子弹动画帧事件 = false;
  }
  Constructor() {}
  K2_Notify(s, r) {
    let n = s.GetOwner();
    if (n instanceof TsBaseCharacter_1.default || n instanceof TsBaseVehicle_1.default) {
      let s = n.GetEntityNoBlueprint();
      if (!s?.Valid) {
        return false;
      }
      var o = s.GetComponent(220)?.CreateAnimNotifyContent(r.GetName(), this.exportIndex);
      var l = this.GetInitTransform(n);
      if (this.使用召唤者子弹) {
        var i = s.GetComponent(0).GetSummonerId();
        if (!(i > 0)) {
          return false;
        }
        s = ModelManager_1.ModelManager.CreatureModel.GetEntity(i)?.Entity;
        n = s.GetComponent(3).Actor;
        if (!s?.Valid) {
          return false;
        }
        if (!(n instanceof TsBaseCharacter_1.default)) {
          return false;
        }
      }
      i = s.GetComponent(40);
      if (!i?.Valid) {
        return false;
      }
      var h = i.GetCurrentMontageCorrespondingSkillId();
      var a = h !== 0 ? h : i.GetSkillIdWithGroupId(BaseSkillComponent_1.SKILL_GROUP_MAIN);
      var v = i.GetExtraTargetLocation(a);
      if (this.使用子弹id数组) {
        var e = this.子弹id数组.Num();
        var h = this.GetRandomIndex();
        var u = this.子弹出生位置偏移数组.Num();
        var f = this.子弹初速度偏移数组.Num();
        if (h >= 0 && h < e) {
          if (!this.CanCreateBullet(n, r, h)) {
            return false;
          }
          let e = undefined;
          let t = undefined;
          if (h < u) {
            e = this.子弹出生位置偏移数组.Get(h);
          }
          if (h < f) {
            t = this.子弹初速度偏移数组.Get(h);
          }
          if (this.通知实体子弹动画帧事件) {
            EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.PreBulletCreateFromAnimNotify);
          }
          i = BulletUtil_1.BulletUtil.CreateBulletFromAN(s, this.子弹id数组.Get(h), l, a, false, o, v, e, t);
          if (this.通知实体子弹动画帧事件) {
            EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.PostBulletCreateFromAnimNotify, i);
          }
        } else {
          for (let i = 0; i < e; i++) {
            if (this.CanCreateBullet(n, r, i)) {
              let e = undefined;
              let t = undefined;
              if (u > i) {
                e = this.子弹出生位置偏移数组.Get(i);
              }
              if (f > i) {
                t = this.子弹初速度偏移数组.Get(i);
              }
              if (this.通知实体子弹动画帧事件) {
                EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.PreBulletCreateFromAnimNotify);
              }
              var _ = BulletUtil_1.BulletUtil.CreateBulletFromAN(s, this.子弹id数组.Get(i), l, a, false, o, v, e, t);
              if (this.通知实体子弹动画帧事件) {
                EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.PostBulletCreateFromAnimNotify, _);
              }
            }
          }
        }
      } else {
        if (!this.CanCreateBullet(n, r, 0)) {
          return false;
        }
        if (this.通知实体子弹动画帧事件) {
          EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.PreBulletCreateFromAnimNotify);
        }
        h = BulletUtil_1.BulletUtil.CreateBulletFromAN(s, this.子弹数据名.toString(), l, a, false, o, v, this.子弹出生位置偏移, this.子弹初速度偏移);
        if (this.通知实体子弹动画帧事件) {
          EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.PostBulletCreateFromAnimNotify, h);
        }
      }
      return true;
    }
    if (!(this.使用子弹id数组 ? this.子弹id数组.Num() <= 0 : FNameUtil_1.FNameUtil.IsNothing(this.子弹数据名))) {
      i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(n.GetWorld());
      if (i === 2 || i === 4) {
        h = UE.KismetSystemLibrary.GetOuterObject(this);
        const m = UE.KismetSystemLibrary.GetPathName(h);
        ResourceSystem_1.ResourceSystem.LoadTypeAsync("BPL_BulletPreview_C", () => {
          if (this.使用子弹id数组) {
            var t = this.子弹id数组;
            var i = t.Num();
            var e = this.GetRandomIndex();
            if (e >= 0 && e < i) {
              UE.BPL_BulletPreview_C.ShowBulletPreview(m, new UE.FName(t.Get(e)), n, s, n.GetWorld(), undefined);
            } else {
              for (let e = 0; e < i; e++) {
                UE.BPL_BulletPreview_C.ShowBulletPreview(m, new UE.FName(t.Get(e)), n, s, n.GetWorld(), undefined);
              }
            }
          } else {
            UE.BPL_BulletPreview_C.ShowBulletPreview(m, this.子弹数据名, n, s, n.GetWorld(), undefined);
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
    let t = undefined;
    var i;
    if (FNameUtil_1.FNameUtil.IsNothing(this.指定Tag的Component)) {
      t = e.Mesh;
    } else if ((i = e.GetComponentsByTag(UE.SceneComponent.StaticClass(), this.指定Tag的Component)).Num() > 0) {
      t = i.Get(0);
    }
    if (t?.IsValid()) {
      if (FNameUtil_1.FNameUtil.IsNothing(this.骨骼名字)) {
        return t.D_K2_GetComponentToWorld();
      }
      if (t.DoesSocketExist(this.骨骼名字)) {
        return t.D_GetSocketTransform(this.骨骼名字, 0);
      }
    }
    return e.D_GetTransform();
  }
  GetRandomIndex() {
    var s = this.随机子弹权重数组.Num();
    if (!(s <= 0)) {
      if (s !== this.子弹id数组.Num()) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 28, "随机子弹权重数量对不上！");
        }
      } else {
        let t = 0;
        for (let e = 0; e < s; e++) {
          var r = this.随机子弹权重数组.Get(e);
          if (r > 0) {
            t += r;
          }
        }
        let i = Math.random() * t;
        for (let e = 0; e < s; e++) {
          var n = this.随机子弹权重数组.Get(e);
          if (!(n <= 0) && (i -= n) <= 0) {
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