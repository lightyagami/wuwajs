"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletEntity = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const Entity_1 = require("../../../../Core/Entity/Entity");
const GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator");
const BulletActionLogicComponent_1 = require("../../Bullet/Component/BulletActionLogicComponent");
const BulletActorComponent_1 = require("../Component/BulletActorComponent");
const BulletInfo_1 = require("../Model/BulletInfo");
class BulletEntity extends Entity_1.Entity {
  constructor() {
    super(...arguments);
    this.UsePool = true;
    this.LAe = new BulletInfo_1.BulletInfo();
  }
  static StaticGameBudgetConfig() {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsAlwaysTickConfig;
  }
  GetBulletInfo() {
    return this.LAe;
  }
  get Data() {
    return this.LAe.BulletDataMain;
  }
  get BulletOwner() {
    return this.LAe.BulletInitParams.Owner;
  }
  get NeedDestroy() {
    return this.LAe.NeedDestroy;
  }
  OnCreate() {
    return !!this.AddComponent(BulletActorComponent_1.BulletActorComponent) && !!this.AddComponent(BulletActionLogicComponent_1.BulletActionLogicComponent) && (this.RegisterToGameBudgetController(undefined), true);
  }
  OnStart() {
    this.SetTimeDilation(Time_1.Time.TimeDilation);
    return true;
  }
  OnClear() {
    this.LAe.Clear();
    return true;
  }
  Respawn() {
    this.RegisterToGameBudgetController(undefined);
    return super.Respawn();
  }
}
exports.BulletEntity = BulletEntity;
//# sourceMappingURL=BulletEntity.js.map