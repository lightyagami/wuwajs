"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleArrowBattleSkillData = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputEnums_1 = require("../../../../Input/InputEnums");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const BattleSkillDataBase_1 = require("../../Data/BattleSkillDataBase");
class MotorcycleArrowBattleSkillData extends BattleSkillDataBase_1.BattleSkillDataBase {
  constructor(t) {
    super();
    this.bSo = false;
    this.wmo = undefined;
    this.FUd = undefined;
    this.VNd = undefined;
    this.OBg = undefined;
    this.GBg = 211;
    this.FBg = 210;
    this.Aot = undefined;
    this.xSo = undefined;
    this.wSo = "";
    this.Xjg = "";
    this.DelegateAttrChange = undefined;
    this.DelegateMaxAttrChange = undefined;
    this.NBg = (t, i) => {
      this.UpdateAttrChange();
    };
    this.VBg = (t, i) => {
      this.UpdateAttrChange();
    };
    this.wmo = t;
    this.IsVisibleInternal = false;
    t = CommonParamById_1.configCommonParamById.GetStringConfig("MotorArrowSkillColor");
    if (t) {
      this.Aot = UE.Color.FromHex(t);
    }
    t = CommonParamById_1.configCommonParamById.GetStringConfig("MotorArrowSkillEffectColor");
    if (t) {
      this.xSo = new UE.LinearColor(UE.Color.FromHex(t));
    }
    t = CommonParamById_1.configCommonParamById.GetStringConfig("MotorArrowSkillEffectPath");
    if (t) {
      this.wSo = t;
    }
    t = CommonParamById_1.configCommonParamById.GetStringConfig("MotorArrowSkillEffectPathPC");
    if (t) {
      this.Xjg = t;
    }
  }
  OnInitData() {
    if (this.wmo) {
      this.FUd = this.VUd();
    }
  }
  VUd() {
    var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSkillButtonConfigByType(5);
    if (t) {
      for (const i of t) {
        if (i.ActionName === this.GetActionName()) {
          return i;
        }
      }
    }
  }
  GetSkillId() {
    return this.wmo;
  }
  GetSkillTexturePath() {
    return this.FUd?.SkillIcon;
  }
  GetActionType() {
    if (this.FUd) {
      return this.FUd.ButtonType;
    } else {
      return InputEnums_1.EInputAction.None;
    }
  }
  GetButtonType() {
    if (this.FUd) {
      return this.FUd.ButtonType;
    } else {
      return InputEnums_1.EInputAction.None;
    }
  }
  GetFrameSpriteColor() {
    return this.Aot;
  }
  GetMaxAttributeColor() {
    return this.xSo;
  }
  GetMaxAttributeEffectPath() {
    if (Info_1.Info.IsInTouch()) {
      return this.wSo;
    } else {
      return this.Xjg;
    }
  }
  RefreshIsEnable() {
    var t = this.GetAttribute();
    var i = this.GetMaxAttribute();
    this.bSo = i <= t && t > 0;
  }
  IsEnable() {
    return this.bSo;
  }
  GetAttribute() {
    return this.VNd?.Get(this.GBg) ?? 0;
  }
  GetMaxAttribute() {
    return this.VNd?.Get(this.FBg) ?? 0;
  }
  HasAttribute() {
    return true;
  }
  InitAttrData(t) {
    var t = t?.GetSkillComp()?.AttrSet_;
    var i = t?.Attrs_;
    if (i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("UiComponent", 85, "[摩托战斗]技能按钮获取属性成功");
      }
      this.VNd = i;
      this.OBg = t;
      this.DelegateAttrChange = (0, puerts_1.toManualReleaseDelegate)(this.NBg);
      t.AssignAttrListen(this.GBg, this.DelegateAttrChange);
      this.DelegateMaxAttrChange = (0, puerts_1.toManualReleaseDelegate)(this.VBg);
      t.AssignAttrListen(this.FBg, this.DelegateMaxAttrChange);
      this.RefreshIsEnable();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("UiComponent", 85, "[摩托战斗]技能按钮获取属性失败");
    }
  }
  UpdateAttrChange() {
    this.RefreshIsEnable();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonAttributeRefresh, this.GetButtonType());
  }
  SetVisible(t) {
    this.IsVisibleInternal = t;
  }
  Clear() {
    if (this.OBg) {
      if (this.DelegateAttrChange) {
        this.OBg.RemoveAttrListen(this.GBg, this.DelegateAttrChange);
        this.DelegateAttrChange = undefined;
      }
      if (this.DelegateMaxAttrChange) {
        this.OBg.RemoveAttrListen(this.FBg, this.DelegateMaxAttrChange);
        this.DelegateMaxAttrChange = undefined;
      }
      this.OBg = undefined;
    }
    (0, puerts_1.releaseManualReleaseDelegate)(this.NBg);
    (0, puerts_1.releaseManualReleaseDelegate)(this.VBg);
  }
}
exports.MotorcycleArrowBattleSkillData = MotorcycleArrowBattleSkillData;
//# sourceMappingURL=MotorcycleArrowBattleSkillData.js.map