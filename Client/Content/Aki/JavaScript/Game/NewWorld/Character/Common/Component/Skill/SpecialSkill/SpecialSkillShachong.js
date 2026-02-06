"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillShachong = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../../../Core/Actor/ActorSystem");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const GameModeModel_1 = require("../../../../../../World/Model/GameModeModel");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const LOADINGRANGE = 10000;
class SpecialSkillShachong extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.pGg = undefined;
    this.Hte = undefined;
    this.pZo = undefined;
    this.Qor = 0;
    this.OnEvent = (i, e) => {
      if (this.Hte) {
        this.pGg?.D_K2_SetActorLocation(this.Hte.GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName("Root")), false, undefined, true);
      }
    };
  }
  OnStart() {
    this.pGg = GameModeModel_1.GameModeModel.CreateIndependentStreamingSource([FNameUtil_1.FNameUtil.GetDynamicFName("Grid_Navigation")], LOADINGRANGE, 0);
    this.Hte = this.SpecialSkillComponent.Entity.GetComponent(3);
    this.pGg?.D_K2_SetActorLocation(this.Hte.GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName("Root")), false, undefined, true);
    this.pZo = this.SpecialSkillComponent.Entity.GetComponent(18);
    this.Qor = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName("怪物.ML1WeiZuoShenWangMd00601.功能标签.变招点");
    this.pZo?.AddGameplayEventListener(this.Qor, this.OnEvent);
  }
  OnEnd() {
    var i;
    if (this.pGg?.IsValid()) {
      if ((i = this.pGg.GetComponentByClass(UE.WorldPartitionStreamingSourceComponent.StaticClass()))?.IsValid()) {
        i.DisableStreamingSource();
      }
      ActorSystem_1.ActorSystem.Put("SpecialSkillShachong.OnEnd", this.pGg);
      this.pGg = undefined;
    }
    this.Hte = undefined;
    this.pZo?.RemoveGameplayEventListener(this.Qor, this.OnEvent);
    this.pZo = undefined;
  }
}
exports.SpecialSkillShachong = SpecialSkillShachong;
//# sourceMappingURL=SpecialSkillShachong.js.map