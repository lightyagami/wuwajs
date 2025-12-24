"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletLogicEffectSave = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EffectSaveController_1 = require("../../../Module/EffectSave/EffectSaveController");
const BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicEffectSave extends BulletLogicController_1.BulletLogicController {
  constructor(e, t) {
    super(e, t);
  }
  BulletLogicAction(e) {
    if (ObjectUtils_1.ObjectUtils.SoftObjectReferenceValid(this.LogicController.Effect)) {
      EffectSaveController_1.EffectSaveController.MarkEffectSave(this.LogicController.Effect.ToAssetPathName(), this.Bullet.GetBulletInfo().GetActorLocation(), this.Bullet.GetBulletInfo().GetActorRotation());
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Bullet", 20, "配置路径错了", ["子弹ID", this.Bullet.GetBulletInfo().BulletRowName]);
    }
  }
}
exports.BulletLogicEffectSave = BulletLogicEffectSave;
//# sourceMappingURL=BulletLogicEffectSave.js.map