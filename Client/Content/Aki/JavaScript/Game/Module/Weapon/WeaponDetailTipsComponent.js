"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponDetailTipsComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const AttributeItem_1 = require("../Common/AttributeItem");
const ButtonItem_1 = require("../Common/Button/ButtonItem");
const CommonEquippedItem_1 = require("../Common/CommonEquippedItem");
const StarItem_1 = require("../RoleUi/View/StarItem");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const WeaponInstance_1 = require("./WeaponInstance");
class WeaponDetailTipsComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.WeaponData = undefined;
    this.ReplaceButtonItem = undefined;
    this.CultureButtonItem = undefined;
    this.CanShowEquip = false;
    this.Mko = undefined;
    this.CanShowLock = true;
    this.StarLayout = undefined;
    this.AttributeLayout = undefined;
    this.Eko = t => {
      var t = t !== 1;
      var e = this.GetWeaponIncId();
      if (!(e <= 0)) {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(e, t);
      }
    };
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
    this.G1o = () => new AttributeItem_1.AttributeItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UIExtendToggle], [4, UE.UIHorizontalLayout], [5, UE.UIVerticalLayout], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[3, this.Eko]];
  }
  OnStart() {
    this.ReplaceButtonItem = new ButtonItem_1.ButtonItem(this.GetItem(11));
    this.CultureButtonItem = new ButtonItem_1.ButtonItem(this.GetItem(12));
    this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.vke);
    this.AttributeLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.G1o);
    this.Mko = new CommonEquippedItem_1.CommonEquippedItem();
    this.Mko.CreateThenShowByActor(this.GetItem(10).GetOwner());
  }
  SetCanShowEquip(t = false) {
    this.CanShowEquip = t;
    if (!this.CanShowEquip) {
      this.Mko?.SetIconRootItemState(false);
    }
  }
  SetCanShowLock(t) {
    this.CanShowLock = t;
  }
  k1o(t) {
    var t = [{
      PropId: t.FirstPropId,
      CurveId: t.FirstCurve
    }, {
      PropId: t.SecondPropId,
      CurveId: t.SecondCurve
    }];
    var e = this.WeaponData.GetLevel();
    var i = this.WeaponData.GetBreachLevel();
    var o = [];
    for (const s of t) {
      var a = s.PropId;
      var n = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(s.CurveId, a.Value, e, i);
      var a = {
        Id: a.Id,
        IsRatio: a.IsRatio,
        CurValue: n,
        BgActive: true
      };
      o.push(a);
    }
    this.AttributeLayout.RefreshByData(o);
  }
  jxt(e, i) {
    var o = new Array(i);
    for (let t = 0; t < i; ++t) {
      var a = {
        StarOnActive: t < e,
        StarOffActive: t >= e,
        StarNextActive: false,
        StarLoopActive: false,
        PlayLoopSequence: false,
        PlayActivateSequence: false
      };
      o[t] = a;
    }
    this.StarLayout.RefreshByData(o);
  }
  vWt(t) {
    for (const e of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList()) {
      if (t === e.Value) {
        this.SetSpriteByPath(e.Icon, this.GetSprite(0), false);
        break;
      }
    }
  }
  UpdateComponent(t) {
    var e = (this.WeaponData = t).GetWeaponConfig();
    var i = t.GetLevel();
    var o = t.GetBreachLevel();
    var a = e.WeaponName;
    var n = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(e.BreachId);
    var s = t.GetBreachConfig();
    var r = t.GetResonanceLevel();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "LevelRichText", i, s.LevelLimit);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(e.QualityId);
    var s = UE.Color.FromHex(i.DropColor);
    this.GetText(1).SetColor(s);
    this.GetText(1).ShowTextNew(a);
    this.vWt(e.WeaponType);
    this.k1o(e);
    this.jxt(o, n);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "WeaponResonanceItemLevelText", r);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), e.BgDescription);
    var i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(e.ResonId, r);
    if (i) {
      this.GetText(7).SetUIActive(true);
      this.GetText(8).SetUIActive(true);
      this.GetText(7).SetText(ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(i.Name));
      s = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(e, r);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.Desc, ...s);
    } else {
      this.GetText(7).SetUIActive(false);
      this.GetText(8).SetUIActive(false);
    }
    var a = t;
    if (a instanceof WeaponInstance_1.WeaponInstance) {
      this.Sko(true);
      this.yko(true);
      o = a.GetIncId();
      this.ReplaceButtonItem.SetData(o);
      this.CultureButtonItem.SetData(o);
      this.UpdateWeaponLock(a.IsLock());
    } else {
      this.Sko(false);
      this.yko(false);
    }
  }
  UpdateWeaponLock(t) {
    t = t ? 0 : 1;
    this.GetExtendToggle(3).SetToggleState(t, false);
  }
  UpdateWeaponBreachRedDot(t) {
    this.CultureButtonItem.SetRedDotVisible(t);
  }
  SetReplaceFunction(t) {
    this.ReplaceButtonItem.SetFunction(t);
  }
  SetReplaceEnableClick(t) {
    this.ReplaceButtonItem.SetEnableClick(t);
  }
  SetCultureFunction(t) {
    this.CultureButtonItem.SetFunction(t);
  }
  UpdateEquip(t) {
    var e;
    if (this.CanShowEquip && (e = this.WeaponData) instanceof WeaponInstance_1.WeaponInstance) {
      if ((e = e.GetRoleId()) === 0) {
        this.Mko.SetCurrentEquippedState(false);
        this.Mko.SetIconRootItemState(false);
        this.ReplaceButtonItem.SetEnableClick(true);
      } else {
        this.ReplaceButtonItem.SetEnableClick(e !== t);
        this.Mko.SetCurrentEquippedState(true);
        this.Mko.SetIconRootItemState(true);
        t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
        e = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t.GetRoleSkinId());
        this.Mko.SetEquipIcon(e.GetRoleSkinConfig().RoleHeadIcon);
        this.Mko.SetEquipText("WeaponTipsRoleText", new LguiUtil_1.TableTextArgNew(e.GetName()));
      }
    }
  }
  GetWeaponIncId() {
    var t = this.WeaponData;
    if (t instanceof WeaponInstance_1.WeaponInstance) {
      return t.GetIncId() ?? 0;
    } else {
      return 0;
    }
  }
  Sko(t) {
    this.GetExtendToggle(3).RootUIComp.SetUIActive(t && this.CanShowLock);
  }
  yko(t) {
    this.ReplaceButtonItem.SetActive(t);
    this.CultureButtonItem.SetActive(t);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (!(t.length < 1)) {
      var e = this.GetGuideUiItem(t[1]);
      if (e) {
        return [e, e];
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Guide", 16, "武器详情界面聚焦引导的额外参数配置错误", ["configParams", t]);
    }
  }
}
exports.WeaponDetailTipsComponent = WeaponDetailTipsComponent;
//# sourceMappingURL=WeaponDetailTipsComponent.js.map