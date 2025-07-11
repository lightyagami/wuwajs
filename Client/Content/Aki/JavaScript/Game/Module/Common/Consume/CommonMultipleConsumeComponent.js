"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonMultipleConsumeFunction = exports.CommonMultipleConsumeComponent = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const UiComponentUtil_1 = require("../../Util/UiComponentUtil");
const ButtonItem_1 = require("../Button/ButtonItem");
const CommonConditionFilterComponent_1 = require("./CommonConditionFilterComponent");
const ConsumeItem_1 = require("./ConsumeItem");
class CommonMultipleConsumeComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, e = true, s = undefined) {
    super();
    this.ConsumeFunction = i;
    this.NeedConditionFilter = e;
    this.BelongView = s;
    this.StrengthItem = undefined;
    this.LoopScrollView = undefined;
    this.ConsumeList = [];
    this.CommonConditionFilterComponent = undefined;
    this.MaxCount = 0;
    this.EnoughMoney = true;
    this.QualityId = 0;
    this.zTt = true;
    this.ZTt = "WeaponLevelUpText";
    this.eLt = undefined;
    this.tLt = () => {
      if (this.ConsumeFunction.AutoFunction) {
        this.ConsumeFunction.AutoFunction(this.QualityId);
      }
    };
    this.iLt = () => {
      this.CommonConditionFilterComponent.UpdateComponent(this.QualityId);
    };
    this.oLt = (t, i) => {
      this.QualityId = t;
      this.GetText(10).ShowTextNew(i);
      if (this.eLt) {
        this.eLt(t);
      }
    };
    this.sGe = () => {
      var t = new ConsumeItem_1.ConsumeItem(undefined, this.BelongView);
      t.SetButtonFunction(this.ConsumeFunction.MaterialItemFunction);
      return t;
    };
    this.Xqe = t => this.ConsumeList[t];
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIText], [4, UE.UILoopScrollViewComponent], [5, UE.UIButtonComponent], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem]];
    this.BtnBindInfo = [[5, this.tLt], [9, this.iLt]];
  }
  OnStart() {
    this.StrengthItem = new ButtonItem_1.ButtonItem(this.GetItem(7));
    this.StrengthItem.SetFunction(this.ConsumeFunction.StrengthFunction);
    var t = this.GetLoopScrollViewComponent(4);
    var i = this.GetItem(8).GetOwner();
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(t, i, this.sGe);
    this.GetButton(9).RootUIComp.SetUIActive(this.NeedConditionFilter);
    if (this.NeedConditionFilter) {
      this.CommonConditionFilterComponent = new CommonConditionFilterComponent_1.CommonConditionFilterComponent(this.GetItem(11), this.oLt);
      this.CommonConditionFilterComponent.RefreshQualityList(ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList());
      this.CommonConditionFilterComponent.SetActive(false);
    }
    this.MaxCount = ConfigManager_1.ConfigManager.WeaponConfig.GetMaterialItemMaxCount();
  }
  RefreshConditionFilter(t, i) {
    this.QualityId = t;
    this.GetText(10).ShowTextNew(i);
  }
  OnBeforeDestroy() {
    if (this.StrengthItem) {
      this.StrengthItem.Destroy();
      this.StrengthItem = undefined;
    }
    if (this.CommonConditionFilterComponent) {
      this.CommonConditionFilterComponent.Destroy();
      this.CommonConditionFilterComponent = undefined;
    }
  }
  UpdateComponent(t, i, e) {
    this.SetMaxState(false);
    this.ConsumeList = e;
    this.LoopScrollView.ReloadProxyData(this.Xqe, this.MaxCount);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "WeaponMaterialLengthText", e.length, this.MaxCount);
    var e = this.GetText(1);
    var s = this.GetText(3);
    var t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(t);
    this.EnoughMoney = UiComponentUtil_1.UiComponentUtil.SetMoneyState(e, s, i, t);
  }
  SetMaxState(t) {
    this.GetItem(12).SetUIActive(!t);
    if (this.zTt) {
      this.GetItem(13).SetUIActive(!t);
    }
    this.SetStrengthItemEnable(!t);
    if (t) {
      this.SetStrengthItemText("LevelUpMax");
    } else {
      this.SetStrengthItemText(this.ZTt);
    }
  }
  SetStrengthItemText(t) {
    this.StrengthItem.SetLocalText(t);
  }
  SetStrengthTextCode(t) {
    this.ZTt = t;
  }
  SetStrengthItemEnable(t) {
    this.StrengthItem.SetEnableClick(t);
  }
  GetConsumeListSize() {
    return this.ConsumeList.length;
  }
  GetEnoughMoney() {
    return this.EnoughMoney;
  }
  SetIsNeedShowMaterial(t) {
    this.zTt = t;
  }
  ShowMaterialItem(t) {
    this.GetItem(13).SetUIActive(t);
  }
  ShowConditionViewItem(t) {
    this.GetItem(11).SetUIActive(t);
  }
  SetIsNeedShowTitleLayout(t) {
    this.GetItem(14).SetUIActive(t);
  }
  SetMaxCount(t) {
    this.MaxCount = t;
  }
  SetConsumeTexture(t) {
    this.SetItemIcon(this.GetTexture(0), t);
    this.SetItemIcon(this.GetTexture(2), t);
  }
  GetSelfLoopScroll() {
    return this.LoopScrollView;
  }
  SetConditionFilterFunction(t) {
    this.eLt = t;
  }
}
exports.CommonMultipleConsumeComponent = CommonMultipleConsumeComponent;
class CommonMultipleConsumeFunction {
  constructor() {
    this.AutoFunction = undefined;
    this.DeleteSelectFunction = undefined;
    this.MaterialItemFunction = undefined;
    this.StrengthFunction = undefined;
    this.ReduceItemFunction = undefined;
    this.ItemClickFunction = undefined;
  }
}
exports.CommonMultipleConsumeFunction = CommonMultipleConsumeFunction;
//# sourceMappingURL=CommonMultipleConsumeComponent.js.map