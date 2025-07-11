"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtraEffectDestroyBullet = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ExtraEffectBase_1 = require("./ExtraEffectBase");
class ExtraEffectDestroyBullet extends ExtraEffectBase_1.BuffEffect {
  constructor() {
    super(...arguments);
    this.XDl = undefined;
    this.YDl = 0;
    this.zDl = false;
    this.e6c = 0;
    this.Tq_ = 0;
  }
  CheckExecutable() {
    return this.OwnerBuffComponent?.HasBuffAuthority() ?? false;
  }
  InitParameters(t) {
    var e;
    if (t.ExtraEffectParameters === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 20, "销毁子弹额外效果参数为空", ["Buff", this.BuffId]);
      }
    } else if (!(e = Number(t.ExtraEffectParameters[0])) || isNaN(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 20, "第一个参数错误", ["Buff", this.BuffId], ["Param", e]);
      }
    } else if (StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[1])) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 20, "第二个参数为空", ["Buff", this.BuffId]);
      }
    } else {
      this.YDl = Number(t.ExtraEffectParameters[0]);
      this.XDl = t.ExtraEffectParameters[1].split("#");
      if (!StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[2])) {
        this.zDl = Number(t.ExtraEffectParameters[2]) === 1;
      }
      if (!StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[3])) {
        e = Number(t.ExtraEffectParameters[3]);
        this.Tq_ = e * e;
      }
      if (!StringUtils_1.StringUtils.IsEmpty(t.ExtraEffectParameters[4])) {
        this.e6c = Number(t.ExtraEffectParameters[4]);
      }
    }
  }
  OnExecute() {}
  OnRemoved() {
    if (this.YDl !== 0 && this.XDl) {
      var t = this.YDl === 1 ? this.InstigatorEntity?.Entity : this.OwnerEntity;
      var e = t?.Id;
      if (e) {
        var s = ModelManager_1.ModelManager.BulletModel;
        var e = s.GetBulletSetByAttacker(e);
        if (e) {
          var i;
          var r = (this.e6c === 0 ? t.GetComponent(1) : ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(1))?.ActorLocationProxy;
          if (this.Tq_ <= 0 || !r) {
            for (const o of e) {
              if (o?.Valid && this.XDl.includes(o.GetBulletInfo().BulletRowName)) {
                s.DestroyBullet(o.Id, this.zDl, 4);
              }
            }
          } else {
            for (const a of e) {
              if (a?.Valid && this.XDl.includes(a.GetBulletInfo().BulletRowName) && (i = a.GetComponent(1)?.ActorLocationProxy) && Vector_1.Vector.DistSquared(i, r) <= this.Tq_) {
                s.DestroyBullet(a.Id, this.zDl, 4);
              }
            }
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 20, "无法获取子弹集合", ["Buff", this.BuffId]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 20, "无法获取子弹拥有者", ["Buff", this.BuffId]);
      }
    }
  }
}
exports.ExtraEffectDestroyBullet = ExtraEffectDestroyBullet;
//# sourceMappingURL=ExtraEffectDestroyBullet.js.map