"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposePopupGridItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const CostMediumItemGrid_1 = require("../../../RoleUi/RoleBreach/CostMediumItemGrid");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ITEM_INVALID_ID = -1;
class ComposePopupGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.sft = undefined;
    this.G_m = undefined;
    this.F_m = undefined;
    this.N_m = undefined;
    this.mlm = undefined;
    this.V_m = 0;
    this.BelongView = undefined;
    this.j_m = () => {
      var e = new ComposePopupScrollItemGrid();
      e.OnToggleCallback = e => {
        this.H_m(e);
      };
      return e;
    };
    this.p5t = () => {
      if (this.mlm) {
        switch (this.mlm.State) {
          case 0:
            {
              const t = [];
              this.mlm.ComposeList?.forEach(e => {
                t.push({
                  L8n: e.ItemId,
                  UVn: e.Count
                });
              });
              var e = this.mlm.Item.Count - this.mlm.Item.SelectedCount;
              ControllerHolder_1.ControllerHolder.ComposeController.SendSynthesisItemRequestNew(this.mlm.Item.ItemId, e, t, () => {
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("AutoSynthesis_PurificationFinish_Tips");
              });
              this.Kym();
              break;
            }
          case 1:
            e = this.mlm.ComposeList?.[0];
            if (!e) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Compose", 90, "置换材料列表为空，请检查数据！");
              }
              return;
            }
            ControllerHolder_1.ControllerHolder.ComposeController.SendExchangeRequest(this.mlm.Item.ItemId, e.ItemId, e.Count, () => {
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("AutoSynthesis_SynthesizeFinish_Tips");
            });
            this.Kym();
            break;
          case 3:
            if (this.V_m === 0) {
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SkipTask_Prevent");
            } else {
              SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.V_m, this.mlm.Item.ItemId);
            }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UINiagara]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.sft = new ComposePopupMediumItemGrid();
    e.push(this.sft.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()));
    this.F_m = new ButtonItem_1.ButtonItem();
    e.push(this.F_m.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    this.N_m = new ButtonItem_1.ButtonItem();
    e.push(this.N_m.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    await Promise.all(e);
    this.G_m = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.j_m);
  }
  OnStart() {
    this.sft?.BindOnCanExecuteChange(() => false);
    this.sft.UseSelectedCoin = false;
    this.F_m?.SetFunction(this.p5t);
    this.N_m?.SetFunction(this.p5t);
  }
  Refresh(e, t, i) {
    if (this.mlm?.Item.ItemId !== e.Item.ItemId) {
      this.StopNiagara();
    }
    this.mlm = e;
    this.$8d(e.State);
    this.$_m(e.Item);
    if (e.ComposeList) {
      let t = undefined;
      if (e.Item.ItemId === ItemDefines_1.EItemId.Gold) {
        (t = []).push(e.Item);
        e.ComposeList.forEach(e => {
          t?.push(e);
        });
      } else {
        t = e.ComposeList;
      }
      if (e.State === 0) {
        this.W_m(t);
      } else {
        this.G_m?.RefreshByData(t);
      }
    }
  }
  $8d(t) {
    var e = t === 2;
    var i = t !== 2 && t !== 3;
    var s = t === 3 || t === 1;
    var r = t === 0 || t === 1 || t === 3;
    var o = t === 0;
    this.GetItem(0)?.SetUIActive(e);
    this.GetItem(11)?.SetUIActive(e);
    this.GetItem(6)?.SetUIActive(i);
    this.GetItem(12)?.SetUIActive(r);
    this.GetItem(13)?.SetUIActive(t === 3 && this.mlm.Item.ItemId !== ItemDefines_1.EItemId.Gold);
    this.F_m?.SetUiActive(o);
    this.N_m?.SetUiActive(r && !o);
    if (o) {
      let e = undefined;
      e = this.mlm.Item.ItemId === ItemDefines_1.EItemId.Gold ? "AutoSynthesis_GetCellCreditBtn_Text" : "PrefabTextItem_4115765186_Text";
      this.F_m?.SetShowText(e);
    } else if (r) {
      let e = undefined;
      e = t === 1 ? "AutoSynthesis_ConversionBtn_Text" : "AutoSynthesis_TrackBtn_Text";
      this.N_m?.SetShowText(e);
    }
    let n = i;
    e = this.GetText(5);
    e?.SetUIActive(s);
    if (t === 1) {
      e?.ShowTextNew("AutoSynthesis_Conversion_Tips");
    } else if (t === 3) {
      o = this.Q_m(this.mlm.Item.ItemId);
      if (!o) {
        e?.ShowTextNew("AutoSynthesis_Track_Tips");
        this.V_m = 0;
        return;
      }
      if (this.mlm.Item.ItemId === ItemDefines_1.EItemId.Gold) {
        e?.ShowTextNew("AutoSynthesis_CellCreditMissing_Tips");
        n = true;
        this.G_m?.RefreshByData([this.mlm.Item]);
      } else {
        e?.ShowTextNew(o.Description);
      }
      this.V_m = o.Id;
    }
    this.GetScrollViewWithScrollbar(2)?.RootUIComp.SetUIActive(n);
  }
  Q_m(e) {
    e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e)?.ItemAccess;
    if (e && !(e.length <= 0)) {
      var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("ComposePopupSkipBlackList");
      for (const s of e) {
        if (t.find(e => e === s) === undefined) {
          if (ModelManager_1.ModelManager.SkipInterfaceModel.CheckAccessPathCondition(s)) {
            var i = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(s);
            if (i && i.Type !== 1) {
              return i;
            }
          }
        }
      }
    }
  }
  $_m(e) {
    this.sft?.Refresh(e, false, 0);
    this.sft?.BindOnExtendToggleClicked(() => {
      this.H_m(e);
    });
  }
  W_m(t) {
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("CraftingMaterialTypeMax");
    var s = [...t];
    for (let e = t.length; e < i; e++) {
      s.push({
        ItemId: ITEM_INVALID_ID,
        IncId: 0,
        Count: 0,
        SelectedCount: 0
      });
    }
    this.G_m?.RefreshByData(s);
  }
  H_m(e) {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemId, true);
    ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = e;
    ModelManager_1.ModelManager.ComposeModel.ComposeSkipSourceView = this.BelongView;
    ModelManager_1.ModelManager.InventoryModel.SetItemNeedCount(e.Count - e.SelectedCount);
  }
  Kym() {
    this.GetUiNiagara(14)?.SetUIActive(true);
  }
  StopNiagara() {
    this.GetUiNiagara(14)?.SetUIActive(false);
  }
}
exports.ComposePopupGridItem = ComposePopupGridItem;
class ComposePopupScrollItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.K_m = undefined;
    this.OnToggleCallback = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.K_m = new ComposePopupMediumItemGrid();
    await this.K_m.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnStart() {
    this.K_m?.BindOnCanExecuteChange(() => false);
  }
  Refresh(e, t, i) {
    if (e.ItemId === ITEM_INVALID_ID) {
      this.GetItem(1)?.SetUIActive(true);
      this.GetItem(0)?.SetUIActive(false);
    } else {
      this.GetItem(1)?.SetUIActive(false);
      this.GetItem(0)?.SetUIActive(true);
      this.K_m?.Refresh(e, t, i);
      this.K_m?.BindOnExtendToggleClicked(() => {
        this.OnToggleCallback?.(e);
      });
    }
  }
}
class ComposePopupMediumItemGrid extends CostMediumItemGrid_1.CostMediumItemGrid {
  constructor() {
    super(...arguments);
    this.UseSelectedCoin = true;
  }
  OnRefresh(e, t, i) {
    if (e.ItemId === ItemDefines_1.EItemId.Gold) {
      this.X_m(e);
    } else {
      super.OnRefresh(e, t, i);
    }
  }
  X_m(e) {
    var t = e.ItemId;
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    if (i) {
      t = {
        Type: 4,
        Data: e,
        ItemConfigId: t,
        StarLevel: i.QualityId,
        IsOmitBottomText: false
      };
      i = e.SelectedCount >= e.Count;
      if (this.UseSelectedCoin) {
        t.BottomTextId = i ? "AutoSynthesis_CellCreditEnough_Num" : "AutoSynthesis_CellCreditLack_Num";
        t.BottomTextParameter = [e.SelectedCount.toString()];
      } else if (i) {
        t.BottomTextId = "AutoSynthesis_CellCreditEnough_Num";
        t.BottomTextParameter = [e.Count.toString()];
      } else {
        t.BottomText = e.Count.toString();
      }
      this.Apply(t);
    }
  }
}
//# sourceMappingURL=ComposePopupGridItem.js.map