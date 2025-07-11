"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeIngredientsVerticalView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MediumItemGrid_1 = require("../../../Common/MediumItemGrid/MediumItemGrid");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const CommonManager_1 = require("../../Common/CommonManager");
const ManufactureMaterialItem_1 = require("../../Common/Item/ManufactureMaterialItem");
const ComposeController_1 = require("../ComposeController");
class ProficiencyView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.dGt = undefined;
    this.$pt = undefined;
    this.OnChangeRoleClick = () => {
      if (this.dGt) {
        this.dGt();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIButtonComponent], [3, UE.UIText]];
    this.BtnBindInfo = [[2, this.OnChangeRoleClick]];
  }
  OnStart() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetButton(2).RootUIComp);
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  BindChangeRoleClick(e) {
    this.dGt = e;
  }
  SetExpNum(e, i, t, s) {
    var t = i * t;
    var e = e * i;
    var r = t - e;
    var e = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("CumulativeProficiency"), e.toString(), t.toString());
    if (r > 0) {
      t = Math.min(r, i * s);
      i = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("AddProficiency"), "+" + Math.min(t, r)).concat(" ", "(", e, ")");
      this.GetText(0).SetText(i);
    } else {
      s = StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("AddProficiency"), "").concat(" ", "(", e, ")");
      this.GetText(0).SetText(s);
    }
  }
  SetExpVisible(e) {
    this.GetText(0).SetUIActive(e);
  }
  SetRoleTexture(e, i) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    this.SetRoleIcon(t.GetRoleConfig().RoleHeadIconLarge, this.GetTexture(1), e);
    if (CommonManager_1.CommonManager.CheckIsBuffEx(e, i)) {
      if (this.$pt.GetCurrentSequence()) {
        this.$pt.ReplaySequenceByKey("Show");
      } else {
        this.$pt.PlayLevelSequenceByName("Show");
      }
    } else {
      this.$pt?.StopCurrentSequence(false, true);
    }
  }
  SetTypeContent(e = undefined) {
    var i = this.GetText(3);
    if (e) {
      i.SetUIActive(true);
      i.SetText(e);
    } else {
      i.SetUIActive(false);
    }
  }
}
class SvInfo extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIVerticalLayout]];
    this.BtnBindInfo = [];
  }
  OnStart() {
    this.GetItem(1).SetUIActive(false);
  }
  SetTypeName(e = undefined) {
    var i = this.GetText(0);
    if (e) {
      i.SetUIActive(true);
      i.SetText(e);
    } else {
      i.SetUIActive(false);
    }
  }
  SetDescVisible(e) {
    this.GetText(3).SetUIActive(e);
  }
  SetDescBgVisible(e) {
    this.GetText(5).SetUIActive(e);
  }
  SetDesc(e) {
    this.GetText(3).SetText(e);
  }
  SetDescBg(e) {
    this.GetText(5).SetText(e);
  }
}
class ComposeIngredientsVerticalView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.MGt = undefined;
    this.fGt = undefined;
    this.t6 = 1;
    this.WGe = undefined;
    this.vTi = undefined;
    this.EGt = undefined;
    this.SGt = false;
    this.yGt = 0;
    this.IGt = undefined;
    this.gGt = undefined;
    this.LGt = e => {
      var i;
      this.t6 = e;
      this.DGt();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "Text_ItemSelectSynthesisQuantityTip_text", this.t6);
      if (this.fGt && this.fGt) {
        i = ComposeController_1.ComposeController.GetMaxCreateCount(this.fGt.ConfigId);
        this.WGe.SetAddButtonInteractive(e < i);
        this.WGe.SetReduceButtonInteractive(e > 1);
        this.MTi(this.fGt);
      }
    };
    this.I7e = () => {
      if (this.vTi) {
        this.vTi();
      }
    };
    this.TGt = () => {
      var e = new ManufactureMaterialItem_1.ManufactureMaterialItem();
      e.BindOnCanExecuteChange(() => false);
      e.BindOnExtendToggleClicked(e => {
        e = e.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.L8n);
      });
      return e;
    };
  }
  GetManufactureCount() {
    return this.t6;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [19, UE.UIScrollViewWithScrollbarComponent], [17, UE.UIText], [18, UE.UIItem], [20, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [21, UE.UIItem], [8, UE.UIItem], [16, UE.UIItem], [22, UE.UIItem], [23, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [24, UE.UIItem], [25, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UITexture], [26, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    this.EGt = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(19), this.TGt);
    this.MGt = new SvInfo();
    await this.MGt.CreateByActorAsync(this.GetItem(0).GetOwner());
    this.gGt = new ProficiencyView();
    await this.gGt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner());
    this.gGt.BindChangeRoleClick(this.I7e);
  }
  OnStart() {
    this.MGt.SetActive(true);
    this.GetItem(1).SetUIActive(false);
    this.GetItem(9).SetUIActive(true);
    this.GetItem(22).SetUIActive(false);
    this.GetItem(16).SetUIActive(true);
    this.GetText(23).ShowTextNew("NeedMaterialTitleText");
    this.GetText(17).ShowTextNew("PrefabTextItem_MaterialChoose_Text");
    this.GetItem(18).SetUIActive(true);
    var e = this.GetItem(8);
    this.WGe = new NumberSelectComponent_1.NumberSelectComponent(e);
    var e = {
      MaxNumber: 0,
      ValueChangeFunction: this.LGt
    };
    this.WGe.Init(e);
    this.WGe.SetUiActive(true);
    this.WGe.SetNumberSelectTipsVisible(false);
    this.WGe.SetAddReduceButtonActive(true);
    this.GetText(12).SetUIActive(false);
    this.IGt = new MediumItemGrid_1.MediumItemGrid();
    this.IGt.Initialize(this.GetItem(21).GetOwner());
    this.IGt.BindOnCanExecuteChange(() => false);
    this.IGt.BindOnExtendToggleClicked(e => {
      e = e.Data;
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e);
    });
  }
  DGt() {
    this.RGt(this.SGt, this.yGt * this.t6);
    var e = this.EGt?.GetScrollItemList();
    if (e) {
      for (const i of e) {
        i.SetTimes(this.t6);
      }
    }
  }
  OnBeforeDestroy() {
    this.MGt = undefined;
  }
  UGt(e) {
    e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
    this.MGt.SetTypeName();
    this.gGt.SetTypeContent(e);
  }
  ETi(e, i, t, s) {
    this.gGt.SetExpNum(e, i, t, s);
  }
  vGt(e) {
    return !!e || (Log_1.Log.CheckError() && Log_1.Log.Error("Compose", 49, "缺少itemData数据"), false);
  }
  Z2n(e) {
    var i = CommonManager_1.CommonManager.GetCurrentRoleId();
    if (i) {
      this.gGt.SetRoleTexture(i, e);
    }
  }
  STi(i) {
    if (this.vGt(i)) {
      let e = CommonManager_1.CommonManager.GetCurrentRoleId();
      if (!e) {
        e = CommonManager_1.CommonManager.GetManufactureRoleId(i.ConfigId);
        CommonManager_1.CommonManager.SetCurrentRoleId(e);
      }
      if (!e) {
        e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
        CommonManager_1.CommonManager.SetCurrentRoleId(e);
      }
      if (e) {
        this.gGt.SetRoleTexture(e, i.ConfigId);
      }
    }
  }
  xGt(e) {
    let i = false;
    let t = 0;
    e = e.filter(e => e.L8n !== ComposeController_1.ComposeController.ComposeCoinId || (i = true, t = e.UVn, false));
    return [i, t, e];
  }
  tkt(e) {
    if (this.fGt && this.fGt.ConfigId !== e.ConfigId) {
      ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = 0;
    }
    this.fGt = e;
    this.t6 = 1;
    var i = ComposeController_1.ComposeController.GetMaxCreateCount(this.fGt.ConfigId);
    this.WGe.Refresh(i);
    this.WGe.SetAddReduceButtonActive(true);
    this.WGe.SetReduceButtonInteractive(false);
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
    this.MGt.SetDescVisible(true);
    this.MGt.SetDescBgVisible(false);
    var t = ConfigManager_1.ConfigManager.ItemConfig?.GetItemAttributeDesc(i.ItemId);
    var i = StringUtils_1.StringUtils.IsEmpty(i.ComposeBackground) ? "" : ConfigManager_1.ConfigManager.CookConfig.GetLocalText(i.ComposeBackground);
    this.MGt.SetDesc(t);
    this.MGt.SetDescBg(i);
    this.WGe.SetUiActive(e.IsUnlock > 0);
    this.GetItem(9).SetUIActive(e.IsUnlock > 0);
    if (e.IsUnlock) {
      this.GetItem(20).SetUIActive(false);
      this.GetItem(18).SetUIActive(true);
      t = ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(e.ConfigId);
      [this.SGt, this.yGt, t] = this.xGt(t);
      this.EGt.RefreshByData(t, () => {
        this.DGt();
      });
    } else {
      this.GetItem(20).SetUIActive(true);
      this.GetItem(18).SetUIActive(false);
      i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(this.fGt.ConfigId);
      if (e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(i.FormulaItemId)) {
        t = {
          Type: 4,
          Data: i.FormulaItemId,
          ItemConfigId: i.FormulaItemId,
          BottomTextId: e.Name,
          IsProhibit: true,
          IsOmitBottomText: true
        };
        this.IGt.Apply(t);
      }
    }
  }
  BindChangeClickCall(e) {
    this.vTi = e;
  }
  MTi(e) {
    var i = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e.ConfigId);
    var t = i.Proficiency;
    var i = i.MaxProficiencyCount;
    this.ETi(e.ComposeCount, t, i, this.t6);
  }
  OnSecondTimerRefresh() {
    if (this.fGt) {
      this.AGt(this.fGt);
    }
  }
  RefreshProficiencyAndHelpRole(e) {
    this.MTi(e);
    this.Z2n(e.ConfigId);
  }
  RefreshHelpRole() {
    this.Z2n(this.fGt.ConfigId);
  }
  AGt(e) {
    if (e.ExistEndTime <= 0) {
      this.GetItem(24).SetUIActive(false);
      this.WGe.ResetLimitMaxValue();
    } else {
      this.GetItem(24).SetUIActive(true);
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e.ExistEndTime - TimeUtil_1.TimeUtil.GetServerTime());
      this.GetText(25).SetText(e.CountDownText);
    }
  }
  PGt(i) {
    if (i.TotalMakeCountInLimitTime <= 0) {
      this.GetItem(3).SetUIActive(false);
      this.WGe.ResetLimitMaxValue();
    } else {
      var t = i.TotalMakeCountInLimitTime - i.MadeCountInLimitTime;
      this.WGe.SetLimitMaxValue(Math.max(1, t));
      let e = t.toString();
      if (t === 0) {
        e = StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", t.toString());
      }
      this.GetItem(3).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "MakeLimit", e, i.TotalMakeCountInLimitTime);
    }
  }
  RGt(e, i) {
    var t;
    this.GetText(12).GetParentAsUIItem().SetUIActive(e);
    if (e) {
      e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(ComposeController_1.ComposeController.ComposeCoinId);
      t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(ComposeController_1.ComposeController.ComposeCoinId);
      if (e < i) {
        this.GetText(11).SetText(StringUtils_1.StringUtils.Format("<color=#c25757>{0}</color>", i.toString()));
      } else {
        this.GetText(11).SetText(i.toString());
      }
      this.SetTextureByPath(t.IconSmall, this.GetTexture(13));
    }
  }
  eNn(e, i = false) {
    if (i) {
      this.gGt.SetExpVisible(e);
    } else {
      this.gGt.SetActive(e);
    }
  }
  RefreshReagentProduction(e) {
    this.AGt(e);
    this.PGt(e);
    this.tkt(e);
    this.eNn(true, true);
    this.UGt("Material");
    this.MTi(e);
    this.STi(e);
  }
  RefreshStructure(e) {
    this.AGt(e);
    this.PGt(e);
    this.tkt(e);
    this.UGt("Prop");
    this.eNn(false, true);
    this.STi(e);
  }
  RefreshPurification(e) {
    this.AGt(e);
    this.PGt(e);
    this.tkt(e);
    this.UGt("Material");
    this.eNn(false, true);
    this.STi(e);
    if (e.IsUnlock <= 0) {
      this.WGe.Refresh(0);
    }
  }
}
exports.ComposeIngredientsVerticalView = ComposeIngredientsVerticalView;
//# sourceMappingURL=ComposeIngerdientsVerticalView.js.map