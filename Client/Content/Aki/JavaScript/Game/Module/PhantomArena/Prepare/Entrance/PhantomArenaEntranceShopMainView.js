"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaEntranceShopMainView = exports.PhantomArenaEntranceShopTabItem = exports.PhantomArenaEntranceShopTabData = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent"),
  HelpController_1 = require("../../../Help/HelpController"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaEntranceShopTabData extends CommonTabData_1.CommonTabData {
  constructor(e, t, i, n) {
    super(e, t), this.aou = i, this._ur = n
  }
  GetRealTitle() {
    return this.aou
  }
  GetTabViewName() {
    return this._ur
  }
}
exports.PhantomArenaEntranceShopTabData = PhantomArenaEntranceShopTabData;
class PhantomArenaEntranceShopTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments), this.kbt = void 0, this.RedDotName = void 0, this.Bke = e => {
      1 === e && this.SelectedCallBack(this.GridIndex)
    }, this.SetOnUndeterminedClick = e => {
      this.kbt = e
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIExtendToggleSpriteTransition],
      [3, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.Bke]
    ]
  }
  OnStart() {
    super.OnStart(), this.GetExtendToggle(0).SetToggleState(0);
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(() => {
      this.kbt?.()
    }), this.GetItem(3).SetUIActive(!1)
  }
  OnBeforeDestroy() {
    this.UnBindRedDot()
  }
  OnRefresh(e, t, i) {
    var n = e.Data;
    this.UpdateIcon(n), this.UpdateTabTitle(n.GetRealTitle()), this.UnBindRedDot(), e.RedDotName && this.BindRedDot(e.RedDotName, e.RedDotUid)
  }
  OnSelected(e) {
    this.SelectedCallBack(this.GridIndex)
  }
  OnUpdateTabIcon(e) {}
  UpdateIcon(e) {
    var t, e = e.GetTabViewName(),
      e = PhantomArenaDefine_1.phantomArenaEntranceShopTabIconMap.get(e);
    e && (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e[0]), e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e[1]), ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LGUISpriteData_BaseObject, e => {
      e && (this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(0, e), this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(1, e), this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(2, e))
    }), ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, e => {
      e && (this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(3, e), this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(4, e), this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(5, e))
    }))
  }
  UpdateTabTitle(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e)
  }
  SetToggleStateForce(e, t) {
    this.GetExtendToggle(0).SetToggleStateForce(e, t)
  }
  SetCanClickWhenDisable(e) {
    this.GetExtendToggle(0).SetCanClickWhenDisable(e)
  }
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t)
  }
  GetTabToggle() {
    return this.GetExtendToggle(0)
  }
  BindRedDot(e, t = 0) {
    this.RedDotName = e, this.RedDotName && RedDotController_1.RedDotController.BindRedDot(e, this.GetItem(3), void 0, t)
  }
  UnBindRedDot() {
    this.RedDotName && (RedDotController_1.RedDotController.UnBindRedDot(this.RedDotName), this.RedDotName = void 0)
  }
  UnBindGivenUid(e = 0) {
    this.RedDotName && (RedDotController_1.RedDotController.UnBindGivenUi(this.RedDotName, this.GetItem(3), e), this.RedDotName = void 0)
  }
  SetRedDotState(e) {
    this.GetItem(3)?.SetUIActive(e)
  }
  GetIconSprite() {
    return this.GetSprite(2)
  }
  OnClear() {
    this.UnBindRedDot()
  }
}
exports.PhantomArenaEntranceShopTabItem = PhantomArenaEntranceShopTabItem;
class PhantomArenaEntranceShopMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), this.TabComponent = void 0, this.TabViewComponent = void 0, this.L6e = void 0, this.TabDataList = [], this.rmo = void 0, this.hA1 = 0, this.Ftl = "", this.TIc = () => {
      this.CloseMe()
    }, this.yqe = e => {
      e = this.TabDataList[e];
      return new PhantomArenaEntranceShopTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(PhantomArenaDefine_1.ENTRANCE_MAINSHOP_ID), e.TabName, e.ChildViewName)
    }, this.CanToggleChange = e => {
      var t;
      return !!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t
    }, this.R6e = (e, t) => {
      return new PhantomArenaEntranceShopTabItem
    }, this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      var t = this.TabDataList[e],
        i = t.ChildViewName,
        e = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, e), this.rmo = i
    }, this.EL1 = () => {
      HelpController_1.HelpController.OpenHelpById(PhantomArenaDefine_1.HELP_ID_SHOP)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIText]
    ]
  }
  OnStart() {
    this.rmo = this.OpenParam, this.GetText(2)?.SetUIActive(!0), this.InitTabComponent(), this.hA1 = ModelManager_1.ModelManager.PhantomArenaModel.GetCurrencyId(), this.hA1 && this.TabComponent?.SetCurrencyItemList([this.hA1]), this.Ftl = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("ActivityRemainingTime") ?? "", this.u3e()
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.RIc()
  }
  OnTick(e) {
    this.u3e()
  }
  OnBeforeDestroy() {
    this.TabComponent && (this.TabComponent.Destroy(), this.TabComponent = void 0)
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.TIc), this.TabComponent.SetHelpButtonShowState(!0), this.TabComponent.SetHelpButtonCallBack(this.EL1), this.L6e = void 0, this.TabComponent.SetCanChange(this.CanToggleChange), this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1))
  }
  async RIc() {
    var e = [];
    for (const n of ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("PhantomArenaEntranceShopMainView")) "PhantomArenaEntranceShopTabView" === n.ChildViewName && !ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime() || e.push(n);
    var t = this.TabDataList.toString() !== e.toString(),
      i = (this.TabDataList = e, this.TabDataList.length),
      i = this.TabComponent.CreateTabItemDataByLength(i);
    for (const o of i) o.RedDotName = this.ytu(this.TabDataList[o.Index].ChildViewName);
    if (await this.TabComponent.RefreshTabItemAsync(i, t), t) {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++)
        if (this.TabDataList[e].ChildViewName === this.rmo) {
          t = e;
          break
        } this.TabComponent.SelectToggleByIndex(t, !0)
    }
  }
  ytu(e) {
    let t = void 0;
    switch (e) {
      case "PhantomArenaEntranceTaskTabView":
        t = "RedDotPhantomArenaTaskReward";
        break;
      case "PhantomArenaEntranceShopTabView":
        t = "RedDotPhantomArenaShopUpdate"
    }
    return t
  }
  u3e() {
    var [e, t] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime(this.Ftl);
    this.GetText(2)?.SetUIActive(e), this.GetText(2)?.SetText(t)
  }
}
exports.PhantomArenaEntranceShopMainView = PhantomArenaEntranceShopMainView;
//# sourceMappingURL=PhantomArenaEntranceShopMainView.js.map