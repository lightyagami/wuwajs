"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemGridConsumeComponent = undefined;
const UE = require("ue");
const QualityInfoAll_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoAll");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ButtonItem_1 = require("../Button/ButtonItem");
const CommonDropDown_1 = require("../DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../DropDown/Item/OneText/OneTextTitleItem");
const ConsumeMediumItemGrid_1 = require("./ConsumeMediumItemGrid");
class ItemGridConsumeComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i = undefined, s = false) {
    super();
    this.ConsumeFunction = e;
    this.BelongView = i;
    this.NeedSettingComponent = s;
    this.StrengthItem = undefined;
    this.ScrollView = undefined;
    this.ConsumeList = [];
    this.rLt = 3;
    this.MaxCount = 0;
    this.EnoughMoney = true;
    this.CurrentCostCount = 0;
    this.SelectTextId = "AutoSelect";
    this.SettingRedDotName = undefined;
    this.h8e = undefined;
    this.d8e = undefined;
    this.nLt = undefined;
    this.wqe = undefined;
    this.l1l = undefined;
    this.m8e = t => new OneTextDropDownItem_1.OneTextDropDownItem(t);
    this.c8e = t => new OneTextTitleItem_1.OneTextTitleItem(t);
    this.g8e = t => {
      return new LguiUtil_1.TableTextArgNew(t.ConsumeFilterText);
    };
    this.tLt = () => {
      if (this.HasSelect()) {
        this.ConsumeFunction.DeleteSelectFunction?.();
      } else if (this.ConsumeFunction.AutoFunction) {
        this.ConsumeFunction.AutoFunction(this.rLt);
      }
    };
    this.h1l = () => {
      this.l1l?.();
    };
    this.C8e = t => {
      this.rLt = t;
      var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown) ?? new Map();
      e.set(this.nLt, t);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown, e);
      this.d8e?.(t);
    };
    this.sGe = () => {
      var t = new ConsumeMediumItemGrid_1.ConsumeMediumItemGrid();
      this.sLt(t);
      return t;
    };
    this.wqe = t;
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[7, UE.UITexture], [1, UE.UIItem], [8, UE.UIText], [4, UE.UIItem], [5, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIButtonComponent], [0, UE.UIText], [2, UE.UIItem], [9, UE.UIText], [6, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [15, UE.UIText], [20, UE.UIText]];
    this.BtnBindInfo = [[3, this.tLt]];
    if (this.NeedSettingComponent) {
      this.ComponentRegisterInfos.push([18, UE.UIButtonComponent]);
      this.ComponentRegisterInfos.push([19, UE.UIItem]);
      this.BtnBindInfo.push([18, this.h1l]);
    }
  }
  async OnBeforeStartAsync() {
    this.h8e = new CommonDropDown_1.CommonDropDown(this.GetItem(2), this.m8e, this.c8e);
    await this.h8e.Init();
  }
  InitFilter(t, e) {
    this.d8e = e;
    this.nLt = t;
    e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ItemGridDropDown) ?? new Map();
    if (e.has(t)) {
      this.rLt = e.get(t);
    }
    e = QualityInfoAll_1.configQualityInfoAll.GetConfigList();
    this.h8e.SetOnSelectCall(this.C8e);
    this.h8e.SetShowType(1);
    this.h8e.InitScroll(e, this.g8e, this.rLt);
    this.d8e(this.rLt);
    this.GetItem(2).SetUIActive(true);
  }
  HasSelect() {
    return this.GetSelectedGridCount() > 0;
  }
  GetSelectedGridCount() {
    let t = 0;
    if (this.ConsumeList && this.ConsumeList.length !== 0) {
      for (const e of this.ConsumeList) {
        if (e[0].ItemId === 0) {
          break;
        }
        t++;
      }
    }
    return t;
  }
  aLt() {
    if (this.HasSelect()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "DeleteSelect");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), this.SelectTextId);
    }
  }
  UpdateAutoSelectTextByTextId(t) {
    this.SelectTextId = t;
    this.aLt();
  }
  OnStart() {
    this.StrengthItem = new ButtonItem_1.ButtonItem(this.GetItem(11));
    this.StrengthItem.SetFunction(this.ConsumeFunction.StrengthFunction);
    var t = this.GetScrollViewWithScrollbar(5);
    this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.sGe);
    this.GetItem(2).SetUIActive(false);
    this.MaxCount = ConfigManager_1.ConfigManager.WeaponConfig.GetMaterialItemMaxCount();
    this.SetSettingButtonVisible(false);
  }
  GetCurrentDropDownSelectIndex() {
    return this.rLt;
  }
  sLt(t) {
    t.BindReduceLongPress((t, e, i) => {
      if (i !== undefined) {
        this.ConsumeFunction.ReduceItemFunction(i[0].IncId, i[0].ItemId);
      }
    });
    t.BindOnExtendToggleClicked(t => {
      t = t.Data;
      this.ConsumeFunction.MaterialItemFunction(t[0].IncId, t[0].ItemId);
    });
    t.BindEmptySlotButtonCallback(t => {
      this.ConsumeFunction.ItemClickFunction();
    });
    t.BindOnCanExecuteChange(() => false);
  }
  OnBeforeDestroy() {
    if (this.StrengthItem) {
      this.StrengthItem.Destroy();
      this.StrengthItem = undefined;
    }
    this.h8e?.Destroy();
    if (this.SettingRedDotName) {
      RedDotController_1.RedDotController.UnBindGivenUi(this.SettingRedDotName, this.GetItem(19));
    }
  }
  UpdateComponent(t, e, i) {
    this.ConsumeList = i;
    this.ScrollView.RefreshByData(this.ConsumeList);
    i = this.GetSelectedGridCount();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "WeaponMaterialLengthText", i, this.MaxCount);
    i = this.GetText(8);
    t = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerMoney(t);
    this.CurrentCostCount = e;
    i.SetText(e.toString());
    this.EnoughMoney = e <= t;
    i.SetChangeColor(!(e <= t), i.changeColor);
    this.aLt();
  }
  SetMaxState(t) {
    this.SetCostRootItemState(!t);
    this.SetStrengthItemEnable(!t);
    this.SetMaxItemEnable(t);
    this.SetMaterialRootItemEnable(!t);
  }
  SetCostRootItemState(t) {
    this.GetItem(6).SetUIActive(t);
  }
  SetStrengthItemText(t) {
    this.StrengthItem.SetLocalTextNew(t);
  }
  SetStrengthItemEnable(t) {
    this.StrengthItem.SetEnableClick(t);
    this.StrengthItem.SetActive(t);
  }
  SetMaxItemEnable(t) {
    this.GetItem(12).SetUIActive(t);
  }
  SetMaterialRootItemEnable(t) {
    this.GetItem(10).SetUIActive(t);
  }
  SetConsumeListEnable(t) {
    this.GetScrollViewWithScrollbar(5)?.RootUIComp.SetUIActive(t);
  }
  GetEnoughMoney() {
    return this.EnoughMoney;
  }
  SetMaxCount(t) {
    this.MaxCount = t;
  }
  GetMaxCount() {
    return this.MaxCount;
  }
  RefreshConditionText(t) {
    this.GetText(9).ShowTextNew(t);
  }
  SetConsumeTexture(t) {
    this.SetItemIcon(this.GetTexture(7), t);
  }
  SetSettingButtonVisible(t) {
    if (this.NeedSettingComponent) {
      this.GetButton(18)?.RootUIComp.SetUIActive(t);
    }
  }
  SetSettingButtonClickCallBack(t) {
    this.l1l = t;
  }
  BindSettingButtonRedDot(t) {
    if (this.NeedSettingComponent) {
      this.SettingRedDotName = t;
      RedDotController_1.RedDotController.BindRedDot(t, this.GetItem(19));
    }
  }
  SetMaxItemText(t) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(20), t);
  }
  GetCurrentCostCount() {
    return this.CurrentCostCount;
  }
}
exports.ItemGridConsumeComponent = ItemGridConsumeComponent;
//# sourceMappingURL=ItemGridConsumeComponent.js.map