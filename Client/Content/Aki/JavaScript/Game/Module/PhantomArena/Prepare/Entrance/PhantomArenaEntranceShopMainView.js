"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaEntranceShopMainView = exports.PhantomArenaEntranceShopTabItem = exports.PhantomArenaEntranceShopTabData = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItemBase_1 = require("../../../Common/TabComponent/TabItem/CommonTabItemBase");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
const HelpController_1 = require("../../../Help/HelpController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
class PhantomArenaEntranceShopTabData extends CommonTabData_1.CommonTabData {
  constructor(e, t, i, n) {
    super(e, t);
    this.Mhu = i;
    this._ur = n;
  }
  GetRealTitle() {
    return this.Mhu;
  }
  GetTabViewName() {
    return this._ur;
  }
}
exports.PhantomArenaEntranceShopTabData = PhantomArenaEntranceShopTabData;
class PhantomArenaEntranceShopTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.kbt = undefined;
    this.RedDotName = undefined;
    this.Bke = e => {
      if (e === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
    this.SetOnUndeterminedClick = e => {
      this.kbt = e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIExtendToggleSpriteTransition], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Bke]];
  }
  OnStart() {
    super.OnStart();
    this.GetExtendToggle(0).SetToggleState(0);
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(() => {
      this.kbt?.();
    });
    this.GetItem(3).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  OnRefresh(e, t, i) {
    var n = e.Data;
    this.UpdateIcon(n);
    this.UpdateTabTitle(n.GetRealTitle());
    this.UnBindRedDot();
    if (e.RedDotName) {
      this.BindRedDot(e.RedDotName, e.RedDotUid);
    }
  }
  OnSelected(e) {
    this.SelectedCallBack(this.GridIndex);
  }
  OnUpdateTabIcon(e) {}
  UpdateIcon(e) {
    var t;
    var e = e.GetTabViewName();
    var e = PhantomArenaDefine_1.phantomArenaEntranceShopTabIconMap.get(e);
    if (e) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e[0]);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e[1]);
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LGUISpriteData_BaseObject, e => {
        if (e) {
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(0, e);
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(1, e);
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(2, e);
        }
      }, 100, this.MemoryTag);
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, e => {
        if (e) {
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(3, e);
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(4, e);
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(5, e);
        }
      }, 100, this.MemoryTag);
    }
  }
  UpdateTabTitle(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
  SetToggleStateForce(e, t) {
    this.GetExtendToggle(0).SetToggleStateForce(e, t);
  }
  SetCanClickWhenDisable(e) {
    this.GetExtendToggle(0).SetCanClickWhenDisable(e);
  }
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  BindRedDot(e, t = 0) {
    this.RedDotName = e;
    if (this.RedDotName) {
      RedDotController_1.RedDotController.BindRedDot(e, this.GetItem(3), undefined, t);
    }
  }
  UnBindRedDot() {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindRedDot(this.RedDotName);
      this.RedDotName = undefined;
    }
  }
  UnBindGivenUid(e = 0) {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.RedDotName, this.GetItem(3), e);
      this.RedDotName = undefined;
    }
  }
  SetRedDotState(e) {
    this.GetItem(3)?.SetUIActive(e);
  }
  GetIconSprite() {
    return this.GetSprite(2);
  }
  OnClear() {
    this.UnBindRedDot();
  }
}
exports.PhantomArenaEntranceShopTabItem = PhantomArenaEntranceShopTabItem;
class PhantomArenaEntranceShopMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.TabComponent = undefined;
    this.TabViewComponent = undefined;
    this.L6e = undefined;
    this.TabDataList = [];
    this.rmo = undefined;
    this.kA1 = 0;
    this.Ftl = "";
    this.TIc = () => {
      this.CloseMe();
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new PhantomArenaEntranceShopTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(PhantomArenaDefine_1.ENTRANCE_MAINSHOP_ID), e.TabName, e.ChildViewName);
    };
    this.CanToggleChange = e => {
      var t;
      return !!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t;
    };
    this.R6e = (e, t) => {
      return new PhantomArenaEntranceShopTabItem();
    };
    this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      var t = this.TabDataList[e];
      var i = t.ChildViewName;
      var e = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, e);
      this.rmo = i;
    };
    this.XL1 = () => {
      HelpController_1.HelpController.OpenHelpById(PhantomArenaDefine_1.HELP_ID_SHOP);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.rmo = this.OpenParam;
    this.GetText(2)?.SetUIActive(true);
    this.InitTabComponent();
    this.kA1 = ModelManager_1.ModelManager.PhantomArenaModel.GetCurrencyId();
    if (this.kA1) {
      this.TabComponent?.SetCurrencyItemList([this.kA1]);
    }
    this.Ftl = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("ActivityRemainingTime") ?? "";
    this.u3e();
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.RIc();
  }
  OnTick(e) {
    this.u3e();
  }
  OnBeforeDestroy() {
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.TIc);
    this.TabComponent.SetHelpButtonShowState(true);
    this.TabComponent.SetHelpButtonCallBack(this.XL1);
    this.L6e = undefined;
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  async RIc() {
    var e = [];
    for (const n of ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("PhantomArenaEntranceShopMainView")) {
      if (n.ChildViewName !== "PhantomArenaEntranceShopTabView" || !!ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime()) {
        e.push(n);
      }
    }
    var t = this.TabDataList.toString() !== e.toString();
    this.TabDataList = e;
    var i = this.TabDataList.length;
    var i = this.TabComponent.CreateTabItemDataByLength(i);
    for (const o of i) {
      o.RedDotName = this.xou(this.TabDataList[o.Index].ChildViewName);
    }
    await this.TabComponent.RefreshTabItemAsync(i, t);
    if (t) {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++) {
        if (this.TabDataList[e].ChildViewName === this.rmo) {
          t = e;
          break;
        }
      }
      this.TabComponent.SelectToggleByIndex(t, true);
    }
  }
  xou(e) {
    let t = undefined;
    switch (e) {
      case "PhantomArenaEntranceTaskTabView":
        t = "RedDotPhantomArenaTaskReward";
        break;
      case "PhantomArenaEntranceShopTabView":
        t = "RedDotPhantomArenaShopUpdate";
    }
    return t;
  }
  u3e() {
    var [e, t] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime(this.Ftl);
    this.GetText(2)?.SetUIActive(e);
    this.GetText(2)?.SetText(t);
  }
}
exports.PhantomArenaEntranceShopMainView = PhantomArenaEntranceShopMainView;
//# sourceMappingURL=PhantomArenaEntranceShopMainView.js.map