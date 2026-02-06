"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerRoleInfoPanel = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const RoleTagMediumIconItem_1 = require("../../../../../RoleUi/RoleTag/RoleTagMediumIconItem");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class WheelTowerRoleInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OnClickConfirm = undefined;
    this.ESc = undefined;
    this.jlo = undefined;
    this.jdf = undefined;
    this.dFe = 0;
    this.mqu = () => {
      var e = new RoleSkillItem();
      e.SetToggleCallback(this.Rrf);
      return e;
    };
    this.Rrf = e => {
      this.jlo?.SelectGridProxyByKey(e);
      var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e);
      this.GetText(5)?.ShowTextNew(i.SkillName);
      var t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillTypeNameLocalText(i.SkillType);
      this.GetText(6)?.SetText(t);
      var t = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(this.dFe);
      var a = ModelManager_1.ModelManager.WheelTowerModel.IsEnhanceSkill(t, e);
      this.GetText(12)?.SetUIActive(a);
      this.GetItem(11)?.SetUIActive(a);
      this.GetItem(8)?.SetUIActive(a);
      if (a) {
        a = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t).Name;
        a = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(a);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "WheelBattleRoleInfo_StrTips", a);
        a = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e).SkillType;
        [e, t] = ModelManager_1.ModelManager.WheelTowerModel.GetRoleSkillEnhanceDescAndParam(t, a);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e, ...t);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), i.SkillDescribe, ...i.SkillDetailNum);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), i.SkillDescribe, ...i.SkillDetailNum);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIMultiTemplateLayout], [2, UE.UIItem], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIScrollViewWithScrollbarComponent], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UIItem]];
    this.BtnBindInfo = [[17, () => this.OnClickConfirm?.()]];
  }
  async OnBeforeStartAsync() {
    this.ESc = new GenericLayout_1.GenericLayout(this.GetMultiTemplateLayout(1), () => new RoleTagMediumIconItem_1.RoleTagMediumIconItem());
    this.jlo = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.mqu);
    this.jdf = new WarningTips();
    await this.jdf.CreateByActorAsync(this.GetItem(19).GetOwner());
  }
  OnStart() {
    this.GetItem(18)?.SetUIActive(false);
    this.GetItem(16)?.SetUIActive(false);
  }
  Refresh(e) {
    var i;
    if (e !== 0) {
      this.dFe = e;
      ModelManager_1.ModelManager.WheelTowerModel.TmpSelectRoleId = e;
      i = ModelManager_1.ModelManager.WheelTowerModel.TryGetRealRoleId(e);
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i);
      this.GetText(0)?.ShowTextNew(i.Name);
      this.qSo(i);
      this.Twc(i);
      this.Prf(e);
      this.Arf(e);
    }
  }
  Prf(e) {
    var i = ModelManager_1.ModelManager.WheelTowerModel.IsTemplateRole(e);
    this.GetItem(13)?.SetUIActive(i);
    if (i) {
      i = ModelManager_1.ModelManager.WheelTowerModel.GetTemplateRoleDesc(e);
      this.GetText(14)?.ShowTextNew(i);
    }
  }
  Arf(e) {
    var i = ModelManager_1.ModelManager.WheelTowerModel.IsTemplateRole(e);
    if (i) {
      this.jdf?.SetUiActive(false);
    } else if (ModelManager_1.ModelManager.WheelTowerModel.SelectedEnergyInfo.GetRoleEnergy(e) > 0) {
      i = ModelManager_1.ModelManager.WheelTowerModel.CheckConflict(e);
      this.jdf?.SetUiActive(i !== undefined);
      if (i !== undefined) {
        let e = "";
        if (i.WeaponConflict && i.PhantomConflict) {
          e = "WheelBattleRoleInfo_WeaponAndPhantomConflict";
        } else if (i.WeaponConflict) {
          e = "WheelBattleRoleInfo_WeaponConflict";
        } else if (i.PhantomConflict) {
          e = "WheelBattleRoleInfo_PhantomConflict";
        }
        this.jdf?.SetTextById(e);
      }
    } else {
      this.jdf?.SetUiActive(false);
    }
  }
  qSo(e) {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(e);
    var i = e !== undefined && e.length > 0;
    this.ESc?.RefreshByData(e);
    this.ESc?.GetRootUiItem()?.SetUIActive(i);
  }
  Twc(e) {
    var i = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(e.SkillId);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.Id);
    let t = undefined;
    if (e) {
      var a = e.GetSkillData();
      if (a && a.HasAnySkillUpgrade()) {
        t = Array.from(i);
        for (let e = 0; e < t.length; e++) {
          var s = t[e].Id;
          var s = a.GetSkillIdAfterUpgrade(s);
          if (s > 0) {
            t[e] = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(s);
          }
        }
      }
    }
    t = t || i;
    const r = [];
    for (const o of CommonParamById_1.configCommonParamById.GetIntArrayConfig("DisplaySkillTypes")) {
      for (const n of t) {
        if (n.SkillType === o) {
          r.push(n.Id);
          break;
        }
      }
    }
    this.jlo?.RefreshByData(r, () => {
      this.jlo.GetLayoutItemByIndex(0)?.SetSelected(true, true);
      this.Rrf(r[0]);
    });
  }
}
exports.WheelTowerRoleInfoPanel = WheelTowerRoleInfoPanel;
class RoleSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.wmo = 0;
    this.WYl = undefined;
    this.Bke = () => {
      this.WYl?.(this.wmo);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  Refresh(e, i, t) {
    this.wmo = e;
    var a = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(e);
    const s = this.GetSprite(1);
    s.SetUIActive(false);
    this.SetSpriteByPath(a.Icon, s, false, undefined, () => {
      s.SetUIActive(true);
    });
    var a = ModelManager_1.ModelManager.WheelTowerModel;
    var r = a.TryGetRealRoleId(a.TmpSelectRoleId);
    var a = a.IsEnhanceSkill(r, e);
    this.GetItem(2)?.SetUIActive(a);
    this.SetSelected(i, true);
  }
  SetToggleCallback(e) {
    this.WYl = e;
  }
  GetKey(e, i) {
    return e;
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
  SetSelected(e, i = false) {
    this.GetExtendToggle(0)?.SetToggleStateForce(e ? 1 : 0, false, false, i);
  }
}
class WarningTips extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(0)?.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(false);
  }
  SetTextById(e) {
    this.GetText(1).ShowTextNew(e);
  }
  SetText(e) {
    this.GetText(1).SetText(e);
  }
}
//# sourceMappingURL=WheelTowerRoleInfoPanel.js.map