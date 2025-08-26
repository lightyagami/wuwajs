"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAbilityVisionPresent = undefined;
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
const GameplayAbilityVisionMorph_1 = require("./GameplayAbilityVisionMorph");
class GameplayAbilityVisionPresent extends GameplayAbilityVisionMorph_1.GameplayAbilityVisionMorph {
  constructor() {
    super(...arguments);
    this.Yd1 = Vector_1.Vector.Create();
    this.zd1 = Rotator_1.Rotator.Create();
    this.jY1 = false;
  }
  SetVisionEnable(i) {
    if (i) {
      this.jY1 = true;
      this.Yd1.DeepCopy(this.VisionActorComponent.ActorLocationProxy);
      this.zd1.DeepCopy(this.VisionActorComponent.ActorRotationProxy);
      PhantomUtil_1.PhantomUtil.SetVisionEnable(this.VisionComponent.Entity, i, "GameplayAbilityVisionPresent.SetVisionEnable");
    } else {
      this.VisionSkillComponent.StopGroup1Skill("驻场声骸技能结束");
      if (this.jY1) {
        this.VisionActorComponent.SetActorLocationAndRotation(this.Yd1.ToUeVector(), this.zd1.ToUeRotator(), "驻场声骸消失时恢复原来的位置", false);
      }
      this.jY1 = true;
      this.VisionBuffComponent.AddBuff(GameplayAbilityVisionMisc_1.VISION_APPEAR_BUFF_ID, {
        InstigatorId: this.VisionBuffComponent.CreatureDataId,
        Reason: "驻场声骸归位时的材质和粒子"
      });
    }
  }
  NeedNoAi() {
    return false;
  }
  NeedNoActive() {
    return false;
  }
  OnTeleportStart() {
    this.jY1 = false;
  }
}
exports.GameplayAbilityVisionPresent = GameplayAbilityVisionPresent;
//# sourceMappingURL=GameplayAbilityVisionPresent.js.map