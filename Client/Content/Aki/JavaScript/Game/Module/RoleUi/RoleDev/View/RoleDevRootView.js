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
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevMediumItemGrid_1 = require("../Item/RoleDevMediumItemGrid");
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
    this.WEd = undefined;
    this.cyd = undefined;
    this.Tnd = undefined;
    this.J1d = undefined;
    this.Z1d = undefined;
    this.eud = undefined;
    this.tud = undefined;
    this.dqc = undefined;
    this.adi = undefined;
    this.yvt = undefined;
    this.GEo = [];
    this.Pnd = new RoleDevViewModel_1.RoleDevViewModel();
    this.oTd = undefined;
    this.Hsd = undefined;
    this.sud = 0;
    this.dLd = 0;
    this.Ryd = 0;
    this.mLd = true;
    this.AWd = 0;
    this.gpm = false;
    this.S9d = () => {
      var e = ModelManager_1.ModelManager.RoleDevModel.DevTargetRoleId;
      var t = this.TempRoleMarkRoleId;
      if (e !== 0 && t !== e) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RoleProject_Tips11");
      } else if (e === 0 && t !== 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("RoleProject_Tips13");
      }
      this.DWd(e);
      this.eVd(this.CurSelectRoleId);
      this.WEd.RefreshWithoutDataSync();
    };
    this.OnRoleSelect = () => {
      this.Iyd();
    };
    this.TTt = () => {
      this.p2d();
      this.Iyd();
    };
    this.cHe = () => {
      var e = new RoleDevMediumItemGrid_1.RoleDevMediumItemGrid();
      e.BindOnExtendToggleStateChanged(e => {
        var t = e.State;
        var e = e.Data;
        this.xnd(t, e);
      });
      e.BindOnCanExecuteChange(this.dyd);
      return e;
    };
    this.jbm = (e, t) => {
      this.Pnd.RoleDevPhantomViewItemData?.RefreshSuitDataList();
      this.Iyd();
    };
    this.myd = () => {
      var e = new RoleDevSelectionMediumItemGrid_1.RoleDevSelectionMediumItemGrid();
      e.BindOnExtendToggleStateChanged(e => {
        var t = e.State;
        var e = e.Data;
        this.fyd(t, e);
      });
      e.BindOnCanExecuteChange(this.gyd);
      return e;
    };
    this.nMm = e => {
      this.p2d();
    };
    this.C0o = (e, t, i) => {
      e = this.lKd(e);
      this.Pnd.SetRoleDataList(e);
      this.Cyd(e, t, i);
    };
    this.xnd = (e, t) => {
      if (e === 1) {
        e = t.GetRoleConfig().Id;
        this.cyd?.DeselectCurrentGridProxy();
        this.WEd?.DeselectCurrentGridProxy();
        this.pyd(e, 0);
        this.Cxd(this.CurSelectTab);
        this.UiViewSequence.PlayOrReplaySequenceByName("Switch");
      }
    };
    this.fyd = (e, t) => {
      if (e === 1) {
        e = t.Id;
        this.cyd?.DeselectCurrentGridProxy();
        this.WEd?.DeselectCurrentGridProxy();
        this.pyd(e, 1);
        this.Cxd(this.CurSelectTab);
        this.UiViewSequence.PlayOrReplaySequenceByName("Switch");
      }
    };
    this.dyd = (e, t, i) => {
      e = e.GetRoleConfig().Id;
      return i !== 1 || this.CurSelectRoleListType !== 0 || this.CurSelectRoleId !== e;
    };
    this.gyd = (e, t, i) => {
      e = e.Id;
      return i !== 1 || this.CurSelectRoleListType !== 1 || this.CurSelectRoleId !== e;
    };
    this.C5e = () => {
      var e = new RoleDevRootTabItem_1.RoleDevRootTabItem();
      e.OnClickToggleCallBack = this.etc;
      this.GEo.push(e);
      return e;
    };
    this.etc = e => {
      this._Mm(e);
      this.Cxd(e);
    };
    this.Z4d = () => {
      var t = this.CurSelectRoleId;
      if (ModelManager_1.ModelManager.RoleModel.IsRoleOwned(t)) {
        var i = this.TempRoleMarkRoleId;
        let e = 0;
        e = i === t ? 0 : t;
        RoleDevController_1.RoleDevController.RequestRecordRoleMarkOperation(e);
        this.UWd(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIGridLayout], [2, UE.UIGridLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIHorizontalLayout], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIExtendToggle]];
    this.BtnBindInfo = [[22, this.Z4d]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleDevTargetRoleIdChange, this.S9d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.OnRoleSelect);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.OnRoleSelect);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleDevTargetRoleIdChange, this.S9d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemList, this.TTt);
  }
  async OnBeforeStartAsync() {
    this.Tnd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(11), this.C5e);
    var e = this.GetItem(3).GetOwner();
    this.cyd = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.myd, e);
    this.WEd = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.cHe, e);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(4), this.C0o);
    await Promise.all([this.jnd(), this.Hnd(), this.nTd(), this.sTd(), this.Cpm(), ControllerHolder_1.ControllerHolder.HandBookController.SendIllustratedInfoRequestAsync([1])]);
  }
  OnStart() {
    this.fLd();
  }
  async OnBeforeShowAsyncImplementImplement() {
    var e = this.OpenParam;
    this.Pnd.InitHotRoleDataList();
    var t = ModelManager_1.ModelManager.RoleModel.GetAllConfigRoleDataList();
    this.DWd(ModelManager_1.ModelManager.RoleDevModel.DevTargetRoleId);
    if (this.IsFirstEnter) {
      this.SetIsFirstEnter(false);
      this.SetCurSelectRoleId(e);
      e = this.iud();
      this.SetCurSelectTab(e);
    }
    if (t.length > 0) {
      this.Pnd.InitAllDevItemDataByRoleId(this.CurSelectRoleId);
    }
    this.gpm = true;
    this.adi.UpdateData(47, t);
    await Promise.all([this.cyd.RefreshByDataAsync(this.Pnd.HotRoleDataList, false), this.WEd.RefreshByDataAsync(this.Pnd.RoleDataList, false)]);
    this.gpm = false;
    this.GetGridLayout(1).RootUIComp.SetUIActive(this.Pnd.HotRoleDataList.length > 0);
    this.pyd(this.CurSelectRoleId, this.CurSelectRoleListType);
    this.Cxd(this.CurSelectTab);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleDevViewOpen);
  }
  gLd() {
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      UiModelUtil_1.UiModelUtil.SetVisible(e.Model, true);
      UiModelUtil_1.UiModelUtil.ModelFadeOut(e.Model, "TerminalSkinRoleFadeOutCurve");
    }
  }
  fLd() {
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    if (e) {
      UiModelUtil_1.UiModelUtil.SetDitherEffect(e.Model, 0);
      UiModelUtil_1.UiModelUtil.SetVisible(e.Model, false);
    }
  }
  async nTd() {
    var e = this.GetItem(8);
    if (e && !this.oTd) {
      this.oTd = new RoleDevTagItem_1.RoleDevTagItem();
      await this.oTd.CreateByActorAsync(e.GetOwner());
    }
  }
  async sTd() {
    var e = this.GetItem(10);
    if (e) {
      this.Hsd = new CommonSelectItem_1.CommonElementItem();
      await this.Hsd.CreateByActorAsync(e.GetOwner());
      e.SetUIActive(true);
    }
  }
  async Hnd() {
    this.dqc = new PopupCaptionItem_1.PopupCaptionItem();
    this.dqc.SetCloseCallBack(() => {
      this.xpt();
    });
    await this.dqc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.dqc.SetTitleByTextIdAndArgNew("RoleProject_Name");
  }
  xpt() {
    this.CloseMe();
  }
  async jnd() {
    this.J1d = new RoleDevRoleViewItem_1.RoleDevRoleViewItem();
    this.Z1d = new RoleDevWeaponViewItem_1.RoleDevWeaponViewItem();
    this.eud = new RoleDevPhantomViewItem_1.RoleDevPhantomViewItem();
    this.tud = new RoleDevSkillViewItem_1.RoleDevSkillViewItem();
    this.tud.OnPlanChangeCallback = this.nMm;
    await Promise.all([this.J1d.CreateByResourceIdAsync("UiItem_PlanRole", this.GetItem(13), false), this.Z1d.CreateByResourceIdAsync("UiItem_PlanWeapon", this.GetItem(17), false), this.eud.CreateByResourceIdAsync("UiItem_PlanVision", this.GetItem(19), false), this.tud.CreateByResourceIdAsync("UiItem_PlanRoleSkill", this.GetItem(15), false)]);
    this.eud.OnChangeFetterGroupSuccessCallBack = this.jbm;
  }
  async Cpm() {
    this.yvt = [{
      TabIndex: 0,
      TabName: "RoleProject_Role",
      TabIsUpgrade: false,
      TabIsFinish: false
    }, {
      TabIndex: 1,
      TabName: "RoleProject_Weapon",
      TabIsUpgrade: false,
      TabIsFinish: false
    }, {
      TabIndex: 2,
      TabName: "RoleProject_Phantom",
      TabIsUpgrade: false,
      TabIsFinish: false
    }, {
      TabIndex: 3,
      TabName: "RoleProject_Skill",
      TabIsUpgrade: false,
      TabIsFinish: false
    }];
    await this.Tnd.RefreshByDataAsync(this.yvt);
  }
  p2d() {
    var e = this.Pnd.RoleDevRoleViewItemData;
    var t = this.Pnd.RoleDevWeaponViewItemData;
    var i = this.Pnd.RoleDevSkillViewItemData;
    var s = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(this.CurSelectRoleId) === 0;
    var r = ModelManager_1.ModelManager.RoleModel.IsRoleOwned(this.CurSelectRoleId);
    var h = s || !r;
    for (const a of this.yvt) {
      switch (a.TabIndex) {
        case 0:
          a.TabIsUpgrade = !h && e.IsAllMaterialEnough;
          a.TabIsFinish = !h && e.IsFinish;
          break;
        case 1:
          a.TabIsUpgrade = !h && t.DevItemData.IsAllMaterialEnough && t.IsWeaponHighQuality;
          a.TabIsFinish = !h && t.DevItemData.IsFinish;
          break;
        case 2:
          a.TabIsUpgrade = false;
          a.TabIsFinish = false;
          break;
        case 3:
          a.TabIsUpgrade = !h && i.IsCurrentPlanAllMaterialEnough;
          a.TabIsFinish = !h && i.IsPerfectPlanFinished;
      }
    }
    this.Tnd.RefreshWithoutDataSync();
  }
  lKd(e) {
    var t = ModelManager_1.ModelManager.RoleDevModel.DevTargetRoleId;
    if (t === 0) {
      return e;
    }
    var i = [];
    var s = [];
    for (const r of e) {
      (r.GetRoleId() === t ? i : s).push(r);
    }
    return [...i, ...s];
  }
  Cyd(e, t, i) {
    if (!this.gpm) {
      this.WEd.RefreshByData(e, () => {
        if (this.CurSelectRoleListType === 0) {
          this.WEd.SelectGridProxyByKey(this.CurSelectRoleId, false);
        }
      }, true);
    }
  }
  iud() {
    if (ModelManager_1.ModelManager.RoleModel.IsRoleOwned(this.CurSelectRoleId) && this.Pnd.RoleDevRoleViewItemData && this.Pnd.RoleDevRoleViewItemData.RoleLevelIsMax) {
      if (this.Pnd.RoleDevWeaponViewItemData && this.Pnd.RoleDevWeaponViewItemData.DevItemData.WeaponIsMaxLevel) {
        return 2;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
  rud(e) {
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
  NPd(e) {
    this.slo(e.GetRoleConfig().Id, 0);
  }
  Syd(e) {
    this.slo(e.Id, 1);
  }
  slo(t, e) {
    if (e === 0) {
      this.WEd.SelectGridProxyByKey(t, false);
    } else if (this.Pnd.HotRoleDataList.findIndex(e => e.Id === t) !== -1) {
      this.cyd.SelectGridProxyByKey(t, false);
    }
    this.Myd(t, e);
    this.p2d();
    this.Fnd(this.CurSelectTab);
    this._Mm(this.CurSelectTab);
  }
  CLd(t, i) {
    if (this.oTd) {
      let e = 3;
      e = i === 0 ? RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(t) : this.Pnd.HotRoleDataList.find(e => e.Id === t)?.TypeTag ?? 3;
      this.oTd.SetData(e);
    }
  }
  Myd(e, t) {
    this.Eyd(e, t);
    this.tje(e);
    this.Zke(e);
    this.Wsd(e);
    this.CLd(e, t);
    this.rud(e);
    this.eVd(e);
    this.Iyd();
  }
  eVd(e) {
    this.tVd(e);
    this.UWd();
  }
  Iyd() {
    switch (this.CurSelectTab) {
      case 0:
        var e = this.Pnd.RoleDevRoleViewItemData;
        if (e) {
          this.J1d?.Refresh(e);
        }
        break;
      case 1:
        e = this.Pnd.RoleDevWeaponViewItemData;
        if (e) {
          this.Z1d?.RefreshByData(e);
        }
        break;
      case 2:
        e = this.Pnd.RoleDevPhantomViewItemData;
        if (e) {
          this.eud?.Refresh(e);
        }
        break;
      case 3:
        e = this.Pnd.RoleDevSkillViewItemData;
        if (e) {
          this.tud?.Refresh(e);
        }
    }
  }
  Eyd(e, t) {
    this.SetCurSelectRoleId(e);
    this.Pnd.InitAllDevItemDataByRoleId(e);
  }
  pyd(t, e) {
    this.SetCurSelectRoleId(t);
    this.SetCurSelectRoleListType(e);
    if (e === 0) {
      if (e = this.Pnd.RoleDataList.find(e => e.GetRoleConfig().Id === t)) {
        this.NPd(e);
      }
    } else if (e = this.Pnd.HotRoleDataList.find(e => e.Id === t)) {
      this.Syd(e);
    }
  }
  _Mm(e) {
    this.SetCurSelectTab(e);
    this.vyd(e);
    e = RoleDevDefine_1.tabTypeToMainPageMap[e];
    RoleDevController_1.RoleDevController.LogRoleDevPageClick(this.CurSelectRoleId, e);
  }
  Cxd(e) {
    switch (e) {
      case 0:
        this.ghm();
        break;
      case 1:
        this.Chm();
        break;
      case 2:
        this.phm();
        break;
      case 3:
        this.vhm();
    }
  }
  ghm() {
    this.J1d?.UiViewSequence?.PlayOrReplaySequenceByName("Start");
  }
  Chm() {
    this.Z1d?.UiViewSequence?.PlayOrReplaySequenceByName("Start");
  }
  phm() {
    this.eud?.UiViewSequence?.PlayOrReplaySequenceByName("Start");
  }
  vhm() {
    this.tud?.UiViewSequence?.PlayOrReplaySequenceByName("Start");
  }
  vyd(e) {
    this.Fnd(e);
    this.Nnd();
  }
  Fnd(e) {
    this.Tnd?.SelectGridProxy(e, false);
  }
  Nnd() {
    var e = RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(this.CurSelectRoleId) === 0;
    this.GetItem(21).SetUIActive(!e);
    var t = this.CurSelectTab;
    var i = t === 0;
    this.GetItem(13).SetUIActive(i);
    this.GetItem(14).SetUIActive(i);
    this.J1d?.SetUiActive(i);
    var i = t === 1;
    this.GetItem(17).SetUIActive(i);
    this.GetItem(18).SetUIActive(i);
    this.Z1d?.SetUiActive(i);
    var i = t === 2;
    if (e && i) {
      this.GetItem(19).SetUIActive(false);
      this.GetItem(20).SetUIActive(false);
      this.eud?.SetUiActive(false);
      this.GetItem(21).SetUIActive(true);
    } else {
      this.GetItem(19).SetUIActive(i);
      this.GetItem(20).SetUIActive(i);
      this.eud?.SetUiActive(i);
      this.GetItem(21).SetUIActive(false);
    }
    var e = t === 3;
    this.GetItem(15).SetUIActive(e);
    this.GetItem(16).SetUIActive(e);
    this.tud?.SetUiActive(e);
    this.Iyd();
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
    var t;
    var i;
    var s = this.GetTexture(5);
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e) === 0) {
      t = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e).RoleHeadIconSmall;
      this.SetTextureByPath(t, s);
    } else {
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
      i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)?.GetRoleSkinId() ?? 0;
      this.SetRoleIconByRoleIdOrSkinId(t.RoleHeadIcon, s, e, i, undefined);
    }
  }
  tVd(e) {
    e = ModelManager_1.ModelManager.RoleModel.IsRoleOwned(e);
    this.GetExtendToggle(22).RootUIComp.SetUIActive(e);
  }
  DWd(e) {
    this.AWd = e;
  }
  UWd(e) {
    var t = this.CurSelectRoleId;
    var e = e ?? this.TempRoleMarkRoleId;
    this.rVd(e === t ? 1 : 0);
  }
  rVd(e) {
    this.GetExtendToggle(22)?.SetToggleState(e);
  }
  Wsd(e) {
    var t;
    if (RoleDevUtils_1.RoleDevUtils.GetRoleTypeTagByRoleId(e) === 0) {
      t = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevProsProjectConfig(e).ElementId;
      this.Hsd?.Refresh(t, false, 0);
    } else {
      t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e).ElementId;
      this.Hsd?.Refresh(t, false, 0);
    }
  }
  SetCurSelectRoleId(e) {
    this.sud = e;
  }
  SetCurSelectTab(e) {
    this.dLd = e;
  }
  SetCurSelectRoleListType(e) {
    this.Ryd = e;
  }
  SetIsFirstEnter(e) {
    this.mLd = e;
  }
  get CurSelectTab() {
    return this.dLd;
  }
  get CurSelectRoleId() {
    return this.sud;
  }
  get CurSelectRoleListType() {
    return this.Ryd;
  }
  get IsFirstEnter() {
    return this.mLd;
  }
  get TempRoleMarkRoleId() {
    return this.AWd;
  }
  ClearCache() {
    this.sud = 0;
    this.dLd = 0;
    this.AWd = 0;
  }
  OnBeforeDestroy() {
    this.gLd();
    this.ClearCache();
  }
}
exports.RoleDevRootView = RoleDevRootView;
//# sourceMappingURL=RoleDevRootView.js.map