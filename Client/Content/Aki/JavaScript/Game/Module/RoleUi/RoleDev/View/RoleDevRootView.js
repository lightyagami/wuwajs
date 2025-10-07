"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevRootView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const FilterSortEntrance_1 = require("../../../Common/FilterSort/FilterSortEntrance");
const CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleSelectionMediumItemGrid_1 = require("../../View/RoleSelectionMediumItemGrid");
const RoleDevRootTabItem_1 = require("../Item/RoleDevRootTabItem");
const RoleDevTagItem_1 = require("../Item/RoleDevTagItem");
const RoleDevPhantomViewItem_1 = require("../PhantomPage/RoleDevPhantomViewItem");
const RoleDevController_1 = require("../RoleDevController");
const RoleDevDefine_1 = require("../RoleDevDefine");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDevRoleViewItem_1 = require("../RolePage/RoleDevRoleViewItem");
const RoleDevSkillViewItem_1 = require("../SkillPage/RoleDevSkillViewItem");
const RoleDevWeaponViewItem_1 = require("../WeaponPage/RoleDevWeaponViewItem");
const RoleDevSelectionMediumItemGrid_1 = require("./RoleDevSelectionMediumItemGrid");
const RoleDevViewModel_1 = require("./RoleDevViewModel");
class RoleDevRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TSd = undefined;
    this.K9d = undefined;
    this.$Cd = undefined;
    this.phd = undefined;
    this.W1d = undefined;
    this.Q1d = undefined;
    this.K1d = undefined;
    this.X1d = undefined;
    this.dqc = undefined;
    this.adi = undefined;
    this.GEo = [];
    this.Ehd = new RoleDevViewModel_1.RoleDevViewModel();
    this.DMd = undefined;
    this.Uad = undefined;
    this.eud = 0;
    this.oRd = 0;
    this.spd = 0;
    this.nRd = true;
    this.qVd = 0;
    this.bSd = e => {
      this.RSd(e);
      this.rpd();
    };
    this.C3d = () => {
      var e = ModelManager_1.ModelManager.RoleDevModel.DevTargetRoleId;
      var t = this.TempRoleMarkRoleId;
      if (e !== 0 && t !== e) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RoleProject_Tips11");
      } else if (e === 0 && t !== 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RoleProject_Tips13");
      }
      this.GVd(e);
      this.Jqd(e);
      this.TSd.RefreshByData(this.Ehd.RoleDataList, () => {
        this.TSd.SelectGridProxyByKey(this.CurSelectRoleId, false);
        this.zCd(this.CurSelectRoleId, 0, false, true);
      });
    };
    this.OnRoleSelect = () => {
      this.rpd();
    };
    this.cHe = () => {
      var e = new RoleSelectionMediumItemGrid_1.RoleSelectionMediumItemGrid();
      e.BindOnExtendToggleStateChanged(e => {
        var t = e.State;
        var e = e.Data;
        this.Thd(t, e);
      });
      e.BindOnCanExecuteChange(this.WCd);
      return e;
    };
    this.QCd = () => {
      var e = new RoleDevSelectionMediumItemGrid_1.RoleDevSelectionMediumItemGrid();
      e.BindOnExtendToggleStateChanged(e => {
        var t = e.State;
        var e = e.Data;
        this.KCd(t, e);
      });
      e.BindOnCanExecuteChange(this.XCd);
      return e;
    };
    this.C0o = (e, t, i) => {
      e = this.t6d(e);
      this.Ehd.SetRoleDataList(e);
      this.YCd(e, t, i);
    };
    this.Thd = (e, t) => {
      if (e === 1) {
        e = t.GetRoleConfig().Id;
        this.$Cd?.DeselectCurrentGridProxy();
        this.TSd?.DeselectCurrentGridProxy();
        this.zCd(e, 0);
        this.UiViewSequence?.StopSequenceByKey("Switch", false, true);
        this.UiViewSequence.PlaySequence("Switch");
      }
    };
    this.KCd = (e, t) => {
      if (e === 1) {
        e = t.Id;
        this.$Cd?.DeselectCurrentGridProxy();
        this.TSd?.DeselectCurrentGridProxy();
        this.zCd(e, 1);
        this.UiViewSequence?.StopSequenceByKey("Switch", false, true);
        this.UiViewSequence.PlaySequence("Switch");
      }
    };
    this.WCd = (e, t, i) => {
      e = e.GetRoleConfig().Id;
      return i !== 1 || this.CurSelectRoleListType !== 0 || this.CurSelectRoleId !== e;
    };
    this.XCd = (e, t, i) => {
      e = e.Id;
      return i !== 1 || this.CurSelectRoleListType !== 1 || this.CurSelectRoleId !== e;
    };
    this.C5e = () => {
      var e = new RoleDevRootTabItem_1.RoleDevRootTabItem();
      e.OnClickToggleCallBack = this.etc;
      this.GEo.push(e);
      return e;
    };
    this.etc = (e, t = false, i = false) => {
      this.SetCurSelectTab(e);
      this.JCd(e);
      if (!i) {
        if (t) {
          this.gxd(e);
        } else {
          this.XPd(e);
          i = RoleDevDefine_1.tabTypeToMainPageMap[e];
          RoleDevController_1.RoleDevController.LogRoleDevPageClick(this.CurSelectRoleId, i);
        }
      }
    };
    this.zqd = () => {
      var t = this.CurSelectRoleId;
      if (ModelManager_1.ModelManager.RoleModel.IsRoleOwned(t)) {
        var i = this.TempRoleMarkRoleId;
        let e = 0;
        e = i === t ? 0 : t;
        RoleDevController_1.RoleDevController.RequestRecordRoleMarkOperation(e);
        this.FVd(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIGridLayout], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIHorizontalLayout], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIExtendToggle]];
    this.BtnBindInfo = [[22, this.zqd]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRecommendFetterGroupSelected, this.bSd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleDevTargetRoleIdChange, this.C3d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.OnRoleSelect);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRecommendFetterGroupSelected, this.bSd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.OnRoleSelect);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleDevTargetRoleIdChange, this.C3d);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.Bhd(), this.khd(), this.xMd(), this.UMd()]);
  }
  OnStart() {
    this.phd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(11), this.C5e);
    var e = this.GetItem(3).GetOwner();
    this.$Cd = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.QCd, e);
    this.TSd = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.cHe, e);
    this.K9d = this.TSd.GetUiAnimController();
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(4), this.C0o);
  }
  OnBeforeShow() {
    var e = this.OpenParam;
    this.sRd();
    this.Ehd.InitHotRoleDataList();
    this.$Cd.RefreshByData(this.Ehd.HotRoleDataList);
    var t = ModelManager_1.ModelManager.RoleModel.GetAllConfigRoleDataList();
    this.GVd(ModelManager_1.ModelManager.RoleDevModel.DevTargetRoleId);
    if (this.IsFirstEnter) {
      this.SetIsFirstEnter(false);
      this.SetCurSelectRoleId(e);
      e = this.Y1d();
      this.SetCurSelectTab(e);
    }
    if (t.length > 0) {
      this.Ehd.InitAllDevItemDataByRoleId(this.CurSelectRoleId);
    }
    this.TSd.RefreshByData(t, () => {
      this.TSd.SelectGridProxyByKey(this.CurSelectRoleId, false);
      this.zCd(this.CurSelectRoleId, 0, this.IsFirstEnter);
      this.X9d();
    });
    this.adi.UpdateData(47, t);
    this.Cxd();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleDevViewOpen);
  }
  aRd() {
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
  }
  sRd() {
    UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
  }
  async xMd() {
    var e = this.GetItem(8);
    if (e && !this.DMd) {
      this.DMd = new RoleDevTagItem_1.RoleDevTagItem();
      await this.DMd.CreateByActorAsync(e.GetOwner());
    }
  }
  async UMd() {
    var e = this.GetItem(10);
    if (e) {
      this.Uad = new CommonSelectItem_1.CommonElementItem();
      await this.Uad.CreateByActorAsync(e.GetOwner());
      e.SetUIActive(true);
    }
  }
  RSd(e) {
    var t;
    var i = this.CurSelectRoleId;
    if (i !== 0 && (this.Ehd.InitAllDevItemDataByRoleId(i), this.CurSelectTab === 2) && (t = this.Ehd.RoleDevPhantomViewItemData)) {
      t.RefreshByFetterGroupId(e);
      this.K1d?.Refresh(t);
    }
  }
  async khd() {
    this.dqc = new PopupCaptionItem_1.PopupCaptionItem();
    this.dqc.SetCloseCallBack(() => {
      this.xpt();
    });
    await this.dqc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.dqc.SetTitleByTextIdAndArgNew("RoleProject_Name");
  }
  xpt() {
    this.aRd();
    this.CloseMe();
  }
  async Bhd() {
    this.W1d = new RoleDevRoleViewItem_1.RoleDevRoleViewItem();
    this.Q1d = new RoleDevWeaponViewItem_1.RoleDevWeaponViewItem();
    this.K1d = new RoleDevPhantomViewItem_1.RoleDevPhantomViewItem();
    this.X1d = new RoleDevSkillViewItem_1.RoleDevSkillViewItem();
    await Promise.all([this.W1d.CreateByResourceIdAsync("UiItem_PlanRole", this.GetItem(13), false), this.Q1d.CreateByResourceIdAsync("UiItem_PlanWeapon", this.GetItem(17), false), this.K1d.CreateByResourceIdAsync("UiItem_PlanVision", this.GetItem(19), false), this.X1d.CreateByResourceIdAsync("UiItem_PlanRoleSkill", this.GetItem(15), false)]);
  }
  Cxd() {
    var e = this.Ehd.RoleDevRoleViewItemData;
    var t = this.Ehd.RoleDevWeaponViewItemData;
    var i = this.Ehd.RoleDevSkillViewItemData;
    var s = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(this.CurSelectRoleId) === 0;
    var h = ModelManager_1.ModelManager.RoleModel.IsRoleOwned(this.CurSelectRoleId);
    var s = s || !h;
    var h = [{
      TabIndex: 0,
      TabName: "RoleProject_Role",
      TabIsUpgrade: !s && (e?.IsAllMaterialEnough ?? false),
      TabIsFinish: !s && (e?.IsFinish ?? false)
    }, {
      TabIndex: 1,
      TabName: "RoleProject_Weapon",
      TabIsUpgrade: !s && (t?.DevItemData.IsAllMaterialEnough ?? false),
      TabIsFinish: !s && (t?.DevItemData.IsFinish ?? false)
    }, {
      TabIndex: 2,
      TabName: "RoleProject_Phantom",
      TabIsUpgrade: false,
      TabIsFinish: false
    }, {
      TabIndex: 3,
      TabName: "RoleProject_Skill",
      TabIsUpgrade: !s && (i?.IsAllMaterialEnough ?? false),
      TabIsFinish: !s && (i?.IsPerfectPlanFinished ?? false)
    }];
    this.phd.RefreshByData(h, () => {
      this.GEo.find(e => e.TabIndex === this.CurSelectTab)?.SetToggleState(1);
    });
  }
  t6d(e) {
    var t = ModelManager_1.ModelManager.RoleDevModel.DevTargetRoleId;
    if (t === 0) {
      return e;
    }
    var i = [];
    var s = [];
    for (const h of e) {
      (h.GetRoleId() === t ? i : s).push(h);
    }
    return [...i, ...s];
  }
  YCd(e, t, i) {
    if (this.CurSelectRoleId !== 0 && !(e.length <= 0)) {
      this.TSd.RefreshByData(e, () => {
        if (this.CurSelectRoleListType === 0) {
          this.TSd.SelectGridProxyByKey(this.CurSelectRoleId, false);
          this.SetCurSelectRoleId(this.CurSelectRoleId);
          this.SetCurSelectRoleListType(0);
        }
        this.X9d();
      });
    }
  }
  Y1d() {
    if (ModelManager_1.ModelManager.RoleModel.IsRoleOwned(this.CurSelectRoleId) && this.Ehd.RoleDevRoleViewItemData && this.Ehd.RoleDevRoleViewItemData.RoleLevelIsMax) {
      if (this.Ehd.RoleDevWeaponViewItemData && this.Ehd.RoleDevWeaponViewItemData.DevItemData.WeaponIsMaxLevel) {
        return 2;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
  z1d(e) {
    var t;
    var i = this.GetText(9);
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e) === 0 || (e = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProjectConfig(e)).KeyProperty === 0) {
      i?.SetUIActive(false);
    } else {
      t = ConfigManager_1.ConfigManager.RoleDevConfig.GetPropertyIndexConfigByIndex(e.KeyProperty);
      i?.SetUIActive(true);
      e = e.PropertyValue[0] === 1 ? e.PropertyValue[1].toString() : (e.PropertyValue[1] / 100).toFixed(1) + "%";
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Name) + " " + e;
      e = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RoleProject_TargetProperty"), t);
      i?.SetText(e);
    }
  }
  dwd(e, t = false, i = false) {
    this.slo(e.GetRoleConfig().Id, 0, t, i);
  }
  epd(e, t = false, i = false) {
    this.slo(e.Id, 1, t, i);
  }
  slo(t, e, i = false, s = false) {
    if (e === 0) {
      this.TSd.SelectGridProxyByKey(t, false);
    } else if (this.Ehd.HotRoleDataList.findIndex(e => e.Id === t) !== -1) {
      this.$Cd.SelectGridProxyByKey(t, false);
    }
    this.tpd(t, e);
    this.Cxd();
    if (i) {
      this.SetCurSelectTab(this.Y1d());
    }
    this.Dhd(this.CurSelectTab);
    e = RoleDevDefine_1.tabTypeToMainPageMap[this.CurSelectTab];
    RoleDevController_1.RoleDevController.LogRoleDevRoleButtonClick(t, e);
    this.etc(this.CurSelectTab, true, s);
  }
  hRd(t, i) {
    if (this.DMd) {
      let e = 3;
      e = i === 0 ? RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(t) : this.Ehd.HotRoleDataList.find(e => e.Id === t)?.TypeTag ?? 3;
      this.DMd.SetData(e);
    }
  }
  tpd(e, t) {
    this.ipd(e, t);
    this.tje(e);
    this.Zke(e);
    this.kad(e);
    this.hRd(e, t);
    this.z1d(e);
    this.Jqd(e);
    this.rpd();
  }
  Jqd(e) {
    this.Zqd(e);
    this.FVd();
  }
  rpd() {
    var e;
    var t = this.CurSelectTab;
    if (t === 0) {
      if (e = this.Ehd.RoleDevRoleViewItemData) {
        this.W1d?.Refresh(e);
      }
    } else if (t === 1) {
      if (e = this.Ehd.RoleDevWeaponViewItemData) {
        this.Q1d?.Refresh(e);
      }
    } else if (t === 2) {
      if (e = this.Ehd.RoleDevPhantomViewItemData) {
        this.K1d?.Refresh(e);
      }
    } else if (t === 3 && (e = this.Ehd.RoleDevSkillViewItemData)) {
      this.X1d?.Refresh(e);
    }
  }
  ipd(e, t) {
    this.SetCurSelectRoleId(e);
    this.Ehd.InitAllDevItemDataByRoleId(e);
  }
  zCd(t, e, i = false, s = false) {
    this.SetCurSelectRoleId(t);
    this.SetCurSelectRoleListType(e);
    if (e === 0) {
      if (e = this.Ehd.RoleDataList.find(e => e.GetRoleConfig().Id === t)) {
        this.dwd(e, i, s);
      }
    } else if (e = this.Ehd.HotRoleDataList.find(e => e.Id === t)) {
      this.epd(e, i, s);
    }
  }
  XPd(e) {
    this.O$d(e, false);
  }
  gxd(e) {
    this.O$d(e, true);
  }
  O$d(e, t) {
    switch (e) {
      case 0:
        this.q$d(t);
        break;
      case 1:
        this.G$d(t);
        break;
      case 2:
        this.F$d(t);
        break;
      case 3:
        this.N$d(t);
    }
  }
  q$d(e) {
    this.W1d?.UiViewSequence?.StopSequenceByKey("Start", false, true);
    if (e) {
      this.W1d?.UiViewSequence?.ReplaySequence("Start");
    } else {
      this.W1d?.UiViewSequence?.PlaySequence("Start");
    }
  }
  G$d(e) {
    this.Q1d?.UiViewSequence?.StopSequenceByKey("Start", false, true);
    if (e) {
      this.Q1d?.UiViewSequence?.ReplaySequence("Start");
    } else {
      this.Q1d?.UiViewSequence?.PlaySequence("Start");
    }
  }
  F$d(e) {
    this.K1d?.UiViewSequence?.StopSequenceByKey("Start", false, true);
    if (e) {
      this.K1d?.UiViewSequence?.ReplaySequence("Start");
    } else {
      this.K1d?.UiViewSequence?.PlaySequence("Start");
    }
  }
  N$d(e) {
    this.X1d?.UiViewSequence?.StopSequenceByKey("Start", false, true);
    if (e) {
      this.X1d?.UiViewSequence?.ReplaySequence("Start");
    } else {
      this.X1d?.UiViewSequence?.PlaySequence("Start");
    }
  }
  JCd(e) {
    this.Dhd(e);
    this.xhd();
  }
  Dhd(e) {
    for (const t of this.GEo) {
      t.SetToggleState(t.TabIndex === e ? 1 : 0);
    }
  }
  xhd() {
    var e = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(this.CurSelectRoleId) === 0;
    this.GetItem(21).SetUIActive(!e);
    var t = this.CurSelectTab;
    var i = t === 0;
    this.GetItem(13).SetUIActive(i);
    this.GetItem(14).SetUIActive(i);
    this.W1d?.SetUiActive(i);
    var i = t === 1;
    this.GetItem(17).SetUIActive(i);
    this.GetItem(18).SetUIActive(i);
    this.Q1d?.SetUiActive(i);
    var i = t === 2;
    if (e && i) {
      this.GetItem(19).SetUIActive(false);
      this.GetItem(20).SetUIActive(false);
      this.K1d?.SetUiActive(false);
      this.GetItem(21).SetUIActive(true);
    } else {
      this.GetItem(19).SetUIActive(i);
      this.GetItem(20).SetUIActive(i);
      this.K1d?.SetUiActive(i);
      this.GetItem(21).SetUIActive(false);
    }
    var e = t === 3;
    this.GetItem(15).SetUIActive(e);
    this.GetItem(16).SetUIActive(e);
    this.X1d?.SetUiActive(e);
    this.opd();
  }
  opd() {
    switch (this.CurSelectTab) {
      case 0:
        var e = this.Ehd.RoleDevRoleViewItemData;
        if (e) {
          this.W1d?.Refresh(e);
        }
        break;
      case 1:
        e = this.Ehd.RoleDevWeaponViewItemData;
        if (e) {
          this.Q1d?.Refresh(e);
        }
        break;
      case 2:
        e = this.Ehd.RoleDevPhantomViewItemData;
        if (e) {
          this.K1d?.Refresh(e);
        }
        break;
      case 3:
        e = this.Ehd.RoleDevSkillViewItemData;
        if (e) {
          this.X1d?.Refresh(e);
        }
    }
  }
  tje(e) {
    var t;
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e) === 0) {
      t = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.RoleName);
    } else {
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), t.Name);
    }
  }
  Zke(e) {
    const t = this.GetTexture(5);
    var i;
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e) === 0) {
      i = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e).RoleHeadIcon;
      this.SetTextureByPath(i, t);
    } else {
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      this.SetTextureShowUntilLoaded(i.RoleHeadIconCircle, t, () => {
        t.SetUIActive(true);
      });
    }
  }
  Zqd(e) {
    e = ModelManager_1.ModelManager.RoleModel.IsRoleOwned(e);
    this.GetExtendToggle(22).RootUIComp.SetUIActive(e);
  }
  GVd(e) {
    this.qVd = e;
  }
  FVd(e) {
    var t = this.CurSelectRoleId;
    var e = e ?? this.TempRoleMarkRoleId;
    this.tGd(e === t ? 1 : 0);
  }
  tGd(e) {
    this.GetExtendToggle(22)?.SetToggleState(e);
  }
  kad(e) {
    var t;
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e) === 0) {
      t = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e).ElementId;
      this.Uad?.Refresh(t, false, 0);
    } else {
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).ElementId;
      this.Uad?.Refresh(t, false, 0);
    }
  }
  SetCurSelectRoleId(e) {
    this.eud = e;
  }
  SetCurSelectTab(e) {
    this.oRd = e;
  }
  SetCurSelectRoleListType(e) {
    this.spd = e;
  }
  SetIsFirstEnter(e) {
    this.nRd = e;
  }
  get CurSelectTab() {
    return this.oRd;
  }
  get CurSelectRoleId() {
    return this.eud;
  }
  get CurSelectRoleListType() {
    return this.spd;
  }
  get IsFirstEnter() {
    return this.nRd;
  }
  get TempRoleMarkRoleId() {
    return this.qVd;
  }
  ClearCache() {
    this.eud = 0;
    this.oRd = 0;
    this.qVd = 0;
  }
  X9d() {
    if (this.K9d) {
      this.K9d.Play("Start");
    }
  }
  OnBeforeDestroy() {
    this.ClearCache();
  }
}
exports.RoleDevRootView = RoleDevRootView;
//# sourceMappingURL=RoleDevRootView.js.map