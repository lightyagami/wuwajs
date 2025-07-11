"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
class TsAnimNotifyDestroySpecBullet extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.bulletName = undefined;
    this.是否召唤子子弹 = false;
    this.角色拥有标签执行判定 = undefined;
  }
  Constructor() {}
  K2_Notify(e, r) {
    e = e.GetOwner();
    if (e instanceof TsBaseCharacter_1.default) {
      if (this.角色拥有标签执行判定.GameplayTags.Num() > 0) {
        var t = e.GetComponentByClass(UE.BaseAbilitySystemComponent.StaticClass());
        if (!t || !t.HasAnyGameplayTag(this.角色拥有标签执行判定)) {
          return false;
        }
      }
      t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(e.EntityId);
      const o = [];
      const s = this.bulletName.toString();
      t?.forEach(e => {
        if (s === e.GetBulletInfo()?.BulletDataMain.BulletName) {
          o.push(e.Id);
        }
      });
      if (o.length === 0) {
        return false;
      }
      for (let e = o.length - 1; e >= 0; e--) {
        ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(o[e], this.是否召唤子子弹);
      }
    }
    return true;
  }
  GetNotifyName() {
    return "销毁子弹";
  }
}
exports.default = TsAnimNotifyDestroySpecBullet;
//# sourceMappingURL=TsAnimNotifyDestroySpecBullet.js.map