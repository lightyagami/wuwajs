"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaNormalLogic = undefined;
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaCardLogic_1 = require("./PhantomArenaCardLogic");
class PhantomArenaNormalLogic extends PhantomArenaCardLogic_1.PhantomArenaCardLogic {
  CheckFunctionalSettingCondition(t) {
    if (t) {
      return [false, ""];
    }
    if (this.Card.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint);
      var e = this.Card.Data.HasActiveSkill;
      if (e) {
        if (t - ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleSkillConfig(this.Card.Data.ActiveSkillId).CostConsume < 0) {
          return [false, "PhantomBattle_1051"];
        }
      }
    }
    if (this.Card.Data.CanUse) {
      if (this.Card.Data.HasActiveSkill) {
        return [true, ""];
      } else {
        return [false, "PhantomBattle_1064"];
      }
    } else {
      return [false, ""];
    }
  }
  cD1(t) {
    if (this.Card.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.CanEvolveNum <= 0) {
        return [false, "PhantomBattle_1049"];
      }
      t = t.Data.IsOtherCardCanEvolve(this.Card.Data);
      if (!t[0]) {
        return [false, t[1]];
      }
    }
    return [true, ""];
  }
  dD1() {
    if (this.Card.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.MonsterCardLength >= PhantomArenaDefine_1.LIMIT_BATTLE_CARD_NUM) {
        return [false, "PhantomBattle_1048"];
      }
      if (this.Card.Data.ConfigCost === PhantomArenaDefine_1.COST_THREE) {
        return [false, "PhantomBattle_1066"];
      }
    }
    return [true, ""];
  }
  CheckMonsterSettingCondition(t) {
    if (this.Card.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX && ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.qC1.Proto_PhantomBattleCostPoint) - this.Card.Data.UseCost < 0) {
      return [false, "PhantomBattle_1051"];
    }
    if (this.Card.Data.CanUse) {
      if (t) {
        if (ModelManager_1.ModelManager.PhantomArenaBattleModel.CanSetSlotIndex(t.Data.Index)) {
          return this.cD1(t);
        } else {
          return [false, ""];
        }
      } else if (ModelManager_1.ModelManager.PhantomArenaBattleModel.CanSetSlotIndex(this.Card.Data.Index)) {
        return this.dD1();
      } else {
        return [false, ""];
      }
    } else {
      return [false, ""];
    }
  }
  OnCheckRecycleSettingConditionFromHead() {
    if (this.Card.Data.UseCost === 0) {
      return [false, "PhantomBattle_1047"];
    } else {
      return [true, ""];
    }
  }
  OnCheckRecycleSettingConditionFromFunctional() {
    if (this.Card.Data.UseCost === 0) {
      return [false, "PhantomBattle_1047"];
    } else {
      return [true, ""];
    }
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
    var t = {
      SkillCd: this.Card.Data.SkillCd,
      InSelect: false,
      InFight: this.Card.Data.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
    };
    this.Card.GetComponent(12)?.Refresh(t);
    var t = {
      EffectCount: this.Card.Data.CurEffectCount,
      EffectCountMax: this.Card.Data.MaxEffectCount,
      InFight: this.Card.Data.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
    };
    this.Card.GetComponent(13)?.Refresh(t);
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
exports.PhantomArenaNormalLogic = PhantomArenaNormalLogic;
//# sourceMappingURL=PhantomArenaNormalLogic.js.map