"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaToolLogic = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaCardLogic_1 = require("./PhantomArenaCardLogic");
class PhantomArenaToolLogic extends PhantomArenaCardLogic_1.PhantomArenaCardLogic {
  CheckFunctionalSettingCondition(t) {
    return [false, "PhantomBattle_1180"];
  }
  CheckMonsterSettingCondition(t) {
    if (this.Card.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      if (t) {
        return [false, ""];
      }
      if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) - this.Card.Data.UseCost < 0) {
        return [false, "PhantomBattle_1051"];
      }
    }
    if (this.Card.Data.CanUse && (!t || ModelManager_1.ModelManager.PhantomArenaBattleModel.CanSetSlotIndex(t.Data.Index)) && ModelManager_1.ModelManager.PhantomArenaBattleModel.CanSetSlotIndex(this.Card.Data.Index)) {
      return [true, ""];
    } else {
      return [false, ""];
    }
  }
  OnCheckRecycleSettingConditionFromHead() {
    return [true, ""];
  }
  OnCheckRecycleSettingConditionFromFunctional() {
    return [true, ""];
  }
  OnBeforeStart() {
    var t = this.Card.GetComponent(12);
    if (t) {
      t.SkillBtnClick = this.SkillBtnClick;
    }
  }
  GetComponentsDataList() {
    var t = [];
    if (this.Card.Data.HasClickActiveSkill) {
      t.push([12, "UiItem_ActiveSkill", this.Card.GetPhantomArenaCardSpineRootItem()]);
    }
    if (this.Card.Data.HasCountSkill) {
      t.push([13, "UiItem_CardCount", this.Card.GetPhantomArenaCardSpineRootItem()]);
    }
    return t;
  }
  OnRefresh() {
    var t = this.Card.Data.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    var e = {
      SkillCd: this.Card.Data.SkillCd,
      InSelect: false,
      InFight: t
    };
    this.Card.GetComponent(12)?.Refresh(e);
    var e = {
      EffectCount: this.Card.Data.CurEffectCount,
      EffectCountMax: this.Card.Data.MaxEffectCount,
      InFight: t
    };
    this.Card.GetComponent(13)?.Refresh(e);
  }
  OnSetSelectedState(t) {
    t = {
      SkillCd: this.Card.Data.SkillCd,
      InSelect: t && !this.Card.Data.IsNpcCard,
      InFight: this.Card.Data.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
    };
    this.Card.GetComponent(12)?.Refresh(t);
  }
  async OnRefreshEffect(t) {
    t = {
      EffectCount: t,
      EffectCountMax: this.Card.Data.MaxEffectCount,
      InFight: true
    };
    await this.Card.GetComponent(13)?.RefreshEffect(t);
  }
}
exports.PhantomArenaToolLogic = PhantomArenaToolLogic;
//# sourceMappingURL=PhantomArenaToolLogic.js.map