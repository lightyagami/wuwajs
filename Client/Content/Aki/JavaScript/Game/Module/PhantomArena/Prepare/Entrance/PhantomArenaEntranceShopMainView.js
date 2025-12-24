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
  constructor(t, e, i, n) {
    super(t, e);
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
    this.Bke = t => {
      if (t === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
    this.SetOnUndeterminedClick = t => {
      this.kbt = t;
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
  OnRefresh(t, e, i) {
    var n = t.Data;
    this.UpdateIcon(n);
    this.UpdateTabTitle(n.GetRealTitle());
    this.UnBindRedDot();
    if (t.RedDotName) {
      this.BindRedDot(t.RedDotName, t.RedDotUid);
    }
  }
  OnSelected(t) {
    this.SelectedCallBack(this.GridIndex);
  }
  OnUpdateTabIcon(t) {}
  UpdateIcon(t) {
    var e;
    var t = t.GetTabViewName();
    var t = PhantomArenaDefine_1.phantomArenaEntranceShopTabIconMap.get(t);
    if (t) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t[0]);
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t[1]);
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.LGUISpriteData_BaseObject, t => {
        if (t) {
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(0, t);
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(1, t);
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(2, t);
        }
      }, 100, this.MemoryTag);
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.LGUISpriteData_BaseObject, t => {
        if (t) {
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(3, t);
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(4, t);
          this.GetUiExtendToggleSpriteTransition(2)?.SetStateSprite(5, t);
        }
      }, 100, this.MemoryTag);
    }
  }
  UpdateTabTitle(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t);
  }
  SetToggleStateForce(t, e) {
    this.GetExtendToggle(0).SetToggleStateForce(t, e);
  }
  SetCanClickWhenDisable(t) {
    this.GetExtendToggle(0).SetCanClickWhenDisable(t);
  }
  OnSetToggleState(t, e) {
    this.GetExtendToggle(0).SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  BindRedDot(t, e = 0) {
    this.RedDotName = t;
    if (this.RedDotName) {
      RedDotController_1.RedDotController.BindRedDot(t, this.GetItem(3), undefined, e);
    }
  }
  UnBindRedDot() {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindRedDot(this.RedDotName);
      this.RedDotName = undefined;
    }
  }
  UnBindGivenUid(t = 0) {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.RedDotName, this.GetItem(3), t);
      this.RedDotName = undefined;
    }
  }
  SetRedDotState(t) {
    this.GetItem(3)?.SetUIActive(t);
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
    this.ActivityId = 0;
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
    this.yqe = t => {
      t = this.TabDataList[t];
      return new PhantomArenaEntranceShopTabData(t.Icon, new CommonTabTitleData_1.CommonTabTitleData(PhantomArenaDefine_1.ENTRANCE_MAINSHOP_ID), t.TabName, t.ChildViewName);
    };
    this.CanToggleChange = t => {
      var e;
      return !!Info_1.Info.IsInGamepad() || (e = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= e;
    };
    this.R6e = (t, e) => {
      return new PhantomArenaEntranceShopTabItem();
    };
    this.pqe = t => {
      this.L6e = Time_1.Time.Now;
      var e = this.TabDataList[t];
      var i = e.ChildViewName;
      var t = this.TabComponent.GetTabItemByIndex(t);
      this.TabViewComponent.ToggleCallBack(e, i, t, this.ActivityId);
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
    var t = this.OpenParam;
    this.rmo = t.TabViewName;
    this.ActivityId = t.ActivityId;
    this.GetText(2)?.SetUIActive(true);
    this.InitTabComponent();
    this.kA1 = ModelManager_1.ModelManager.PhantomArenaModel.GetCurrencyId(this.ActivityId);
    if (this.kA1) {
      this.TabComponent?.SetCurrencyItemList([this.kA1]);
    }
    this.Ftl = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("ActivityRemainingTime") ?? "";
    this.u3e();
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.RIc();
  }
  OnTick(t) {
    this.u3e();
  }
  OnBeforeDestroy() {
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
  }
  InitTabComponent() {
    var t = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), t, this.TIc);
    this.TabComponent.SetHelpButtonShowState(true);
    this.TabComponent.SetHelpButtonCallBack(this.XL1);
    this.L6e = undefined;
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  async RIc() {
    var t = [];
    for (const n of ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("PhantomArenaEntranceShopMainView")) {
      if (n.ChildViewName !== "PhantomArenaEntranceShopTabView" || !!ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime(this.ActivityId)) {
        t.push(n);
      }
    }
    var e = this.TabDataList.toString() !== t.toString();
    this.TabDataList = t;
    var i = this.TabDataList.length;
    var i = this.TabComponent.CreateTabItemDataByLength(i);
    for (const o of i) {
      o.RedDotName = this.xou(this.TabDataList[o.Index].ChildViewName);
      o.RedDotUid = this.ActivityId;
    }
    await this.TabComponent.RefreshTabItemAsync(i, e);
    if (e) {
      let e = 0;
      for (let t = 0; t < this.TabDataList.length; t++) {
        if (this.TabDataList[t].ChildViewName === this.rmo) {
          e = t;
          break;
        }
      }
      this.TabComponent.SelectToggleByIndex(e, true);
    }
  }
  xou(t) {
    let e = undefined;
    switch (t) {
      case "PhantomArenaEntranceTaskTabView":
        e = "RedDotPhantomArenaTaskReward";
        break;
      case "PhantomArenaEntranceShopTabView":
        e = "RedDotPhantomArenaShopUpdate";
    }
    return e;
  }
  u3e() {
    var [t, e] = ModelManager_1.ModelManager.PhantomArenaModel.IsInLimitTime(this.ActivityId, this.Ftl);
    this.GetText(2)?.SetUIActive(t);
    this.GetText(2)?.SetText(e);
  }
}
exports.PhantomArenaEntranceShopMainView = PhantomArenaEntranceShopMainView;
//# sourceMappingURL=PhantomArenaEntranceShopMainView.js.map