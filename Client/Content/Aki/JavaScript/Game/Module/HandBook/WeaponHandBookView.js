"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponHandBookView = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const AttributeItem_1 = require("../Common/AttributeItem");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const StarItem_1 = require("../RoleUi/View/StarItem");
const WeaponSkinDefine_1 = require("../Skin/Tab/Weapon/WeaponSkinDefine");
const UiSceneManager_1 = require("../UiComponent/UiSceneManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const DynScrollView_1 = require("../Util/ScrollView/DynScrollView");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
const WeaponTrialData_1 = require("../Weapon/Data/WeaponTrialData");
const WeaponController_1 = require("../Weapon/WeaponController");
const HandBookDefine_1 = require("./HandBookDefine");
const WeaponHandBookDynamicItem_1 = require("./WeaponHandBookDynamicItem");
const WeaponHandBookItem_1 = require("./WeaponHandBookItem");
class WeaponHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.Ihd = undefined;
    this.Thd = undefined;
    this.bhd = undefined;
    this.V6e = undefined;
    this.Rhd = [];
    this.whd = [];
    this.Lhd = undefined;
    this.Phd = undefined;
    this.BO_ = 0;
    this.N2i = undefined;
    this.O2i = undefined;
    this.NHe = 0;
    this.Vjs = false;
    this.StarLayout = undefined;
    this.AttributeLayout = undefined;
    this.NPn = (i, e, t) => {
      var a = new WeaponHandBookItem_1.WeaponHandBookItem();
      a.OnClickCallBack = this.Ahd;
      return a;
    };
    this.C5e = () => {
      var i = new HandBookTab();
      i.OnClickCallBack = this.Dhd;
      return i;
    };
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
    this.G1o = () => new AttributeItem_1.AttributeItem();
    this.Z6e = i => {
      if (!i || i.length <= 0) {
        this.GetUIDynScrollViewComponent(6).RootUIComp.SetUIActive(false);
      } else {
        this.GetUIDynScrollViewComponent(6).RootUIComp.SetUIActive(true);
        var e = new Map();
        if (this.BO_ === 0) {
          for (const l of i) {
            var t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(l);
            if (t) {
              let i = e.get(t.WeaponType);
              (i = i || []).push(t.ItemId);
              e.set(t.WeaponType, i);
            }
          }
        }
        if (this.BO_ === 1) {
          for (const d of i) {
            var a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinConfig(d);
            if (a) {
              let i = e.get(a.WeaponSkinType);
              (i = i || []).push(a.Id);
              e.set(a.WeaponSkinType, i);
            }
          }
        }
        var s = [];
        var o = this.BO_ === 1;
        var i = Array.from(e.keys());
        i.sort((i, e) => i - e);
        for (const g of i) {
          var r = e.get(g);
          var n = new HandBookDefine_1.WeaponHandBookDynamicData();
          s.push(n);
          n.TitleId = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(g) ?? "";
          var n = new HandBookDefine_1.WeaponHandBookDynamicData();
          var h = [];
          for (const p of r) {
            var _ = new HandBookDefine_1.WeaponHandBookDynamicLayoutItemData();
            _.IsSkin = o;
            _.ItemId = p;
            h.push(_);
          }
          n.ItemData = h;
          s.push(n);
        }
        if (s.length <= 0) {
          this.vhd();
        } else {
          ModelManager_1.ModelManager.HandBookModel.CurrentSelectWeaponHandBookId = s[1]?.ItemData?.[0].ItemId ?? 0;
          this.Ihd?.RefreshByData(s);
        }
      }
    };
    this.xhd = new WeaponTrialData_1.WeaponTrialData();
    this.Ahd = (i, e) => {
      if (this.Phd !== i) {
        this.Phd?.SetToggleStateForce(0);
      }
      this.Phd = i;
      if (this.NHe !== e && (this.Uhd(e), ModelManager_1.ModelManager.HandBookModel.CurrentSelectWeaponHandBookId = e, this.NHe = e, this.vhd(), this.Bhd(e), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("HandBook", 5, "点击武器图鉴：" + ["WeaponId:", e]);
      }
    };
    this.Dhd = (i, e) => {
      this.Lhd?.SetToggleStateForce(0);
      this.Lhd = i;
      if ((this.BO_ = e) === 0) {
        this.V6e?.ClearData(46);
        this.V6e?.UpdateData(45, this.Rhd);
      }
      if (e === 1) {
        this.V6e?.ClearData(45);
        this.V6e?.UpdateData(46, this.whd);
      }
    };
    this.Apt = false;
    this.Npt = () => {
      if (this.Apt) {
        this.UiViewSequence?.PlaySequence("Off");
        this.GetItem(26).SetUIActive(true);
        this.GetItem(2).SetUIActive(true);
        this.lqe?.SetUiActive(true);
        this.vhd();
        this.Apt = false;
      } else {
        this.UiViewSequence?.PlaySequence("On");
        this.GetItem(26).SetUIActive(false);
        this.GetItem(2).SetUIActive(false);
        this.GetItem(9).SetUIActive(false);
        this.GetItem(21).SetUIActive(false);
        this.lqe?.SetUiActive(false);
        this.Apt = true;
      }
    };
    this.khd = () => {
      this.Uhd();
      this.vhd();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIDynScrollViewComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UISprite], [11, UE.UIText], [12, UE.UIText], [13, UE.UIHorizontalLayout], [14, UE.UIItem], [15, UE.UIVerticalLayout], [16, UE.UIItem], [17, UE.UIText], [18, UE.UIText], [19, UE.UIText], [20, UE.UIText], [21, UE.UIItem], [22, UE.UIText], [23, UE.UIText], [24, UE.UIExtendToggle], [25, UE.UIExtendToggle], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem]];
    this.BtnBindInfo = [[24, this.Npt], [25, this.khd]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetTitleByTextIdAndArgNew("HandBookEntrance_3_Name");
    this.lqe.SetHelpBtnActive(false);
    this.Thd = new WeaponHandBookDynamicItem_1.WeaponHandBookDynamicItem();
    this.Ihd = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(6), this.GetItem(7), this.Thd, this.NPn);
    await this.Ihd.Init();
    this.V6e = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(8), this.Z6e);
    this.bhd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.C5e);
    this.StarLayout = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(13), this.vke);
    this.AttributeLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(15), this.G1o);
    this.N2i = UiSceneManager_1.UiSceneManager.InitWeaponObserver(this.Vjs);
    this.O2i = UiSceneManager_1.UiSceneManager.InitWeaponScabbardObserver();
  }
  OnStart() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(2);
    this.Rhd = ModelManager_1.ModelManager.HandBookModel.GetAllHandBookWeaponIdList();
    this.whd = ModelManager_1.ModelManager.HandBookModel.GetAllHandBookWeaponSkinIdList();
    this.bhd?.RefreshByData([0, 1], () => {
      this.bhd?.GetScrollItemByIndex(0)?.SelectToggle();
    });
  }
  vhd() {
    if (this.BO_ === 0) {
      this.GetItem(9).SetUIActive(true);
      this.GetItem(21).SetUIActive(false);
      this.Ohd();
    }
    if (this.BO_ === 1) {
      this.GetItem(9).SetUIActive(false);
      this.GetItem(21).SetUIActive(true);
      this.qhd();
    }
  }
  Ohd() {
    var i;
    var e;
    var t;
    var a;
    if (this.NHe && (i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(this.NHe))) {
      this.GetItem(28).SetUIActive(true);
      t = this.BO_ === 0 && this.GetExtendToggle(25).GetToggleState() === 1 ? this.xhd.GetFullLevelWeaponData() : this.xhd;
      e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i.QualityId);
      e = UE.Color.FromHex(e.DropColor);
      this.GetText(11).SetColor(e);
      this.GetText(11).ShowTextNew(i.WeaponName);
      this.vWt(i.WeaponType);
      this.k1o(t, i);
      e = t.GetBreachLevel();
      a = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(i.BreachId);
      this.jxt(e, a);
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "LevelRichText", t.GetLevel(), t.GetBreachConfig().LevelLimit);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), i.BgDescription);
      e = t.GetResonanceLevel();
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(17), "WeaponResonanceItemLevelText", e);
      if (a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(i.ResonId, e)) {
        this.GetText(18).SetUIActive(true);
        this.GetText(19).SetUIActive(true);
        this.GetText(18).SetText(ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceDesc(a.Name));
        t = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(i, e);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(19), i.Desc, ...t);
      } else {
        this.GetText(18).SetUIActive(false);
        this.GetText(19).SetUIActive(false);
      }
      a = ModelManager_1.ModelManager.HandBookModel.GetAllHandBookWeaponIdList().length;
      this.GetText(5)?.SetText(a.toString());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "WeaponHandBook_Weapon_Name");
    }
  }
  k1o(i, e) {
    var e = [{
      PropId: e.FirstPropId,
      CurveId: e.FirstCurve
    }, {
      PropId: e.SecondPropId,
      CurveId: e.SecondCurve
    }];
    var t = i.GetLevel();
    var a = i.GetBreachLevel();
    var s = [];
    for (const n of e) {
      var o = n.PropId;
      var r = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(n.CurveId, o.Value, t, a);
      var o = {
        Id: o.Id,
        IsRatio: o.IsRatio,
        CurValue: r,
        BgActive: true
      };
      s.push(o);
    }
    this.AttributeLayout.RefreshByData(s);
  }
  jxt(e, t) {
    var a = new Array(t);
    for (let i = 0; i < t; ++i) {
      var s = {
        StarOnActive: i < e,
        StarOffActive: i >= e,
        StarNextActive: false,
        StarLoopActive: false,
        PlayLoopSequence: false,
        PlayActivateSequence: false
      };
      a[i] = s;
    }
    this.StarLayout.RefreshByData(a);
  }
  vWt(i) {
    for (const e of ConfigManager_1.ConfigManager.MappingConfig.GetWeaponConfList()) {
      if (i === e.Value) {
        this.SetSpriteByPath(e.Icon, this.GetSprite(10), false);
        break;
      }
    }
  }
  qhd() {
    var i;
    if (this.NHe && (i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinConfig(this.NHe))) {
      this.GetItem(28).SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(22), i.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(23), i.BgDescription);
      i = ModelManager_1.ModelManager.HandBookModel.GetAllHandBookWeaponSkinIdList().length;
      this.GetText(5)?.SetText(i.toString());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "WeaponHandBook_WeaponSkin_Name");
    }
  }
  Uhd(i) {
    let e = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
    if (this.BO_ === 0 && i) {
      t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(i);
      this.xhd.SetTrialId(t.HandBookTrialId);
    }
    if (this.BO_ === 1 && i) {
      t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponSkinConfig(i);
      this.xhd.SetTrialId(t.HandBookTrialId);
      e = i;
    }
    var t = this.BO_ === 0 && this.GetExtendToggle(25).GetToggleState() === 1;
    var i = t ? this.xhd.GetFullLevelWeaponData() : this.xhd;
    WeaponController_1.WeaponController.OnSelectedWeaponChange(i, this.N2i, this.O2i, e, this.Vjs);
  }
  OnBeforeDestroy() {
    UiSceneManager_1.UiSceneManager.DestroyWeaponObserver(this.N2i);
    this.N2i = undefined;
    UiSceneManager_1.UiSceneManager.DestroyWeaponScabbardObserver(this.O2i);
    this.O2i = undefined;
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(0);
    this.V6e?.ClearData(45);
    this.V6e?.ClearData(46);
  }
  Bhd(i) {
    var e = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(3, i);
    if (e && !e.IsRead) {
      ControllerHolder_1.ControllerHolder.HandBookController.SendIllustratedReadRequest(3, i);
    }
  }
}
exports.WeaponHandBookView = WeaponHandBookView;
class HandBookTab extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.a8e = 0;
    this.OnClickCallBack = undefined;
    this.N8e = () => {
      this.OnClickCallBack?.(this.GetExtendToggle(1), this.a8e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem]];
    this.BtnBindInfo = [[1, this.N8e]];
  }
  Refresh(i, e, t) {
    var a;
    if (i === 0) {
      a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("WeaponHandBookTabSprite");
      this.SetSpriteByPath(a, this.GetSprite(0), false, undefined, () => {
        this.GetSprite(0).GetOwner().GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass()).SetAllStateSprite(this.GetSprite(0).GetSprite());
      });
    }
    if (i === 1) {
      a = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("WeaponSkinHandBookTabSprite");
      this.SetSpriteByPath(a, this.GetSprite(0), false, undefined, () => {
        this.GetSprite(0).GetOwner().GetComponentByClass(UE.UIExtendToggleSpriteTransition.StaticClass()).SetAllStateSprite(this.GetSprite(0).GetSprite());
      });
    }
    this.a8e = i;
  }
  SelectToggle() {
    this.GetExtendToggle(1).SetToggleState(1, true);
  }
}
//# sourceMappingURL=WeaponHandBookView.js.map