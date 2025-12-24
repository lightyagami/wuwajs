"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaFieldData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class PhantomArenaFieldData {
  constructor() {
    this.CardData = undefined;
    this.Z$m = 0;
  }
  get CardConfigId() {
    return this.CardData?.ConfigId ?? 0;
  }
  get IsOwn() {
    return !!this.CardData && !this.CardData.IsNpcCard;
  }
  get ClickActiveSkillId() {
    return this.CardData?.ClickActiveSkillId ?? 0;
  }
  get CurrentCd() {
    return this.CardData?.SkillCd ?? 0;
  }
  get MaxCd() {
    return this.CardData?.SkillCdMax ?? 0;
  }
  get CurEffectCount() {
    return this.CardData?.CurEffectCount ?? 0;
  }
  get MaxEffectCount() {
    return this.CardData?.MaxEffectCount ?? 0;
  }
  get HasClickActiveSkill() {
    return this.ClickActiveSkillId > 0;
  }
  get HasCountSkill() {
    return this.CardData?.HasCountSkill ?? false;
  }
  get IsCanInteractive() {
    return !!this.HasClickActiveSkill && !this.IsInSkillCd;
  }
  get FieldName() {
    if (this.CardData) {
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId).Name;
    } else {
      return "";
    }
  }
  get FieldEffectResource() {
    var e;
    if (this.CardData) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e.Element).FieldActivateUi;
    } else {
      return "";
    }
  }
  get FieldActivateMaterial() {
    var e;
    if (this.CardData) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e.Element).FieldActivateMaterial;
    } else {
      return "";
    }
  }
  get FieldBg() {
    if (this.CardData) {
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId).FieldBg;
    } else {
      return "";
    }
  }
  get FieldElementNiagara() {
    var e;
    if (this.CardData) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e.Element).FieldElementNiagara;
    } else {
      return "";
    }
  }
  get FieldActivateElementNiagara() {
    var e;
    if (this.CardData) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e.Element).FieldActivateElementNiagara;
    } else {
      return "";
    }
  }
  get FieldAudio() {
    var e;
    if (this.CardData) {
      e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      return ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(e.Element).FieldAudio;
    } else {
      return "";
    }
  }
  get BaseColor() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.BaseColor;
      }
    }
    return "";
  }
  get BackGroundColor() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.BackGroundColor;
      }
    }
    return "";
  }
  get FieldIcon() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldIcon;
      }
    }
    return "";
  }
  get FieldRing() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldRing;
      }
    }
    return "";
  }
  get FieldActivateIcon() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldActivateIcon;
      }
    }
    return "";
  }
  get FieldActivateRing() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldActivateRing;
      }
    }
    return "";
  }
  get FieldButtonColor() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldButtonColor;
      }
    }
    return "";
  }
  get FieldNorColor() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldNorColor;
      }
    }
    return "";
  }
  get FieldActivateColor() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldActivateColor;
      }
    }
    return "";
  }
  get FieldLightColor() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldLightColor;
      }
    }
    return "";
  }
  get FieldReleaseColor() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldReleaseColor;
      }
    }
    return "";
  }
  get FieldSkillTexRelease() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldSkillTexRelease;
      }
    }
    return "";
  }
  get FieldSkillTexBg() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldSkillTexBg;
      }
    }
    return "";
  }
  get FieldSkillTexIcon() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldSkillTexIcon;
      }
    }
    return "";
  }
  get FieldTexSmokeColor() {
    if (this.CardData) {
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(this.CardData.ConfigId);
      var e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleEffectConfig(e.EffectId);
      if (e) {
        return e.FieldTexSmokeColor;
      }
    }
    return "";
  }
  get IsInSkillCd() {
    return this.CurrentCd > 0;
  }
  get SealRemainRound() {
    return this.Z$m;
  }
  get IsInSeal() {
    return this.Z$m > 0;
  }
  SetSealRemainRound(e) {
    if (this.CardData !== undefined) {
      this.Z$m = e;
    }
  }
  SetCardData(e) {
    this.CardData = e;
  }
}
exports.PhantomArenaFieldData = PhantomArenaFieldData;
//# sourceMappingURL=PhantomArenaFieldData.js.map