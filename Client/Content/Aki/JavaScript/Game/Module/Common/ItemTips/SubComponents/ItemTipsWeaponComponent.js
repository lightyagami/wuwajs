"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsWeaponComponent = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const StarItem_1 = require("../../../RoleUi/View/StarItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ItemTipsAttribute_1 = require("./ItemTipsAttribute");
const ItemTipsBaseSubComponent_1 = require("./ItemTipsBaseSubComponent");
const ItemTipsGetWay_1 = require("./ItemTipsGetWay");
const ItemTipsLockButton_1 = require("./ItemTipsLockButton");
class TipsWeaponComponent extends ItemTipsBaseSubComponent_1.TipsBaseSubComponent {
  constructor(t) {
    super(t);
    this.Pe = undefined;
    this.wxt = undefined;
    this.Axt = undefined;
    this.Bxt = undefined;
    this.StarLayout = undefined;
    this.mvt = (t, e, i) => {
      return {
        Key: i,
        Value: new ItemTipsAttribute_1.TipsAttributeItem(e, t)
      };
    };
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
    this.CreateThenShowByResourceIdAsync("UiItem_TipsWeapon", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIVerticalLayout], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIText], [15, UE.UIItem], [16, UE.UITexture], [17, UE.UIText]];
  }
  OnStart() {
    var t = this.GetItem(5);
    this.wxt = new ItemTipsLockButton_1.TipsLockButton(t);
    this.Bxt = new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(6), this.mvt);
    var t = this.GetItem(12);
    this.Axt = new ItemTipsGetWay_1.TipsGetWayPanel(t);
    this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.vke);
  }
  OnBeforeDestroy() {
    if (this.Pe) {
      this.Pe = undefined;
      ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(undefined);
    }
  }
  Refresh(t) {
    var e = () => {
      var t = this.Pe;
      this.GetText(0).SetText(t.WeaponType);
      this.GetText(1).SetText(t.WeaponLevel.toString() + "/");
      this.GetText(2).SetText(t.WeaponLimitLevel.toString());
      this.jxt(t.BreachLevel, t.BreachMaxLevel);
      if (t.IncId) {
        this.wxt.Refresh(t.IncId, t.CanClickLockButton);
        this.wxt.SetDeprecateToggleVisible(t.CanDeprecate());
      }
      this.wxt.SetUiActive(t.IncId > 0);
      this.Bxt.RebuildLayoutByDataNew(t.AttributeData);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Text_WeaponResonanceItemLevelText_Text", t.WeaponStage);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.WeaponSkillName);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), t.WeaponEffect, ...t.WeaponEffectParam);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), t.WeaponDescription);
      this.Pxt(t.GetWayData);
      this.xxt(t.LimitTimeTxt);
      this.Nxt(t.IsEquip, t.EquippedId);
    };
    this.Pe = t;
    ModelManager_1.ModelManager.ItemTipsModel.SetCurrentItemTipsData(t);
    if (this.InAsyncLoading()) {
      this.OperationMap.set("Refresh", e);
    } else {
      e();
    }
  }
  jxt(e, i) {
    var s = new Array(i);
    for (let t = 0; t < i; ++t) {
      var r = {
        StarOnActive: t < e,
        StarOffActive: t >= e,
        StarNextActive: false,
        StarLoopActive: false,
        PlayLoopSequence: false,
        PlayActivateSequence: false
      };
      s[t] = r;
    }
    this.StarLayout.RefreshByData(s);
  }
  Pxt(t) {
    this.GetItem(12).SetUIActive(t.length !== 0);
    if (t) {
      this.Axt.Refresh(t);
    }
  }
  xxt(t) {
    this.GetItem(13).SetUIActive(t !== undefined);
    if (t) {
      this.GetText(14).ShowTextNew(t);
    }
  }
  Nxt(t, e = undefined) {
    this.GetItem(15).SetUIActive(t);
    if (t && e !== undefined) {
      t = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinDataByRoleId(e);
      this.SetRoleSkinIcon(t.GetRoleSkinConfig().RoleHeadIcon, this.GetTexture(16), t.GetItemId());
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.GetName());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "VisionEquipping", e);
    }
  }
  SetLockButtonShow(t) {
    var e = () => {
      this.GetItem(5).SetUIActive(t);
    };
    if (this.InAsyncLoading()) {
      this.OperationMap.set("SetLockButtonShow", e);
    } else {
      e();
    }
  }
}
exports.TipsWeaponComponent = TipsWeaponComponent;
//# sourceMappingURL=ItemTipsWeaponComponent.js.map