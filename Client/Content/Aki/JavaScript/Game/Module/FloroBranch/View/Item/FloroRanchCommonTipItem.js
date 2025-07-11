"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCommonTipItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const FloroRanchCurrencyData_1 = require("../../Data/FloroRanchCurrencyData");
const FloroRanchController_1 = require("../../FloroRanchController");
const FloroRanchBuffItem_1 = require("./FloroRanchBuffItem");
class FloroRanchCommonTipItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.OVc = undefined;
    this.bOl = undefined;
    this.LGu = 0;
    this.gDo = () => {
      return new FloroRanchBuffItem_1.FloroRanchBuffItem();
    };
    this.c_u = () => {
      if (this.bOl && this.bOl.TipType === 0) {
        const r = this.bOl.EntityData;
        var t;
        var i;
        var e;
        if (r) {
          if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.DiamondData.GetAmount() < this.LGu) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_MoneyNotEnough");
          } else {
            t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
            e = r.EntityId;
            FloroRanchController_1.FloroRanchController.SendFloroRanchPlayRemoveUnitRequest(t.Id, i, e, () => {
              this.bOl.RemoveCallback?.(r);
            });
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "删除按钮点击 entityData为空");
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIText], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIItem], [8, UE.UITexture], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIVerticalLayout], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UITexture], [16, UE.UIText], [17, UE.UIText], [18, UE.UITexture], [19, UE.UITexture], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UITexture]];
    this.BtnBindInfo = [[14, this.c_u]];
  }
  OnStart() {
    this.OVc = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(12), this.gDo);
    this.V2u();
  }
  OnBeforeDestroy() {
    this.j2u();
  }
  RefreshInfoTipByParam(t) {
    this.bOl = t;
    this.Tfl();
    switch (t.TipType) {
      case 0:
        this.dOu();
        break;
      case 1:
        this.mOu();
        break;
      case 2:
        this.DRu(t.ToyData);
        break;
      case 3:
        this.m_u(t.CardData, undefined);
    }
    this.GetRootItem()?.SetUIActive(true);
  }
  Tfl() {
    this.GetText(2)?.SetUIActive(false);
    this.GetButton(14).RootUIComp.SetUIActive(false);
    this.GetItem(11)?.SetUIActive(false);
    this.GetItem(7)?.SetUIActive(false);
    this.GetItem(4)?.SetUIActive(false);
    this.GetItem(20)?.SetUIActive(false);
    this.GetItem(21)?.SetUIActive(false);
  }
  mOu() {
    var t = this.bOl.CurrencyData;
    if (t) {
      this.GetText(1)?.ShowTextNew(t.ConfigData.GetName());
      this.GetText(10)?.ShowTextNew(t.ConfigData.GetDesc());
      this.SetTextureShowUntilLoaded(t.ConfigData.GetIcon(), this.GetTexture(3));
      t = t.ConfigData.GetQualityData();
      this.SetTextureShowUntilLoaded(t.GetRarityDetailCardBigBg(), this.GetTexture(18));
      this.SetTextureShowUntilLoaded(t.GetRarityDetailCardSmallBg(), this.GetTexture(19));
      this.LGu = 0;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "currencyData为空");
    }
  }
  dOu() {
    var t;
    var i;
    var e;
    var r = this.bOl.EntityData;
    if (r) {
      t = r.EntityType;
      i = r.CheckGetComponent(0);
      if (t === 1) {
        e = r.CheckGetComponent(1);
        this.m_u(e.CardData, i.DailySaleData);
      } else if (t === 2) {
        e = r.CheckGetComponent(3);
        this.DRu(e.ToyData);
      }
      this.qSo(i.TagData);
      this.f_u(r);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 78, "cardEntity为空");
    }
  }
  m_u(t, i) {
    this.GetText(2)?.ShowTextNew("Farm_CardType1");
    this.GetText(2)?.SetUIActive(true);
    this.GetText(1)?.ShowTextNew(t.GetName());
    this.qSo(t.TagData);
    this.SetTextureShowUntilLoaded(t.GetIcon(), this.GetTexture(3));
    this.GetText(6)?.ShowTextNew(t.GetRaceName());
    let e = i;
    if (!e) {
      (e = new FloroRanchCurrencyData_1.FloroRanchCurrencyData(3)).SetAmount(t.GetBasicSalary());
    }
    i = e.GetAmount();
    this.GetText(9)?.SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(i));
    this.SetTextureShowUntilLoaded(e.ConfigData.GetSmallIcon(), this.GetTexture(8));
    this.GetItem(7).SetUIActive(true);
    this.GetItem(4)?.SetUIActive(true);
    i = t.GetCardQualityData();
    this.SetTextureShowUntilLoaded(i.GetRarityDetailCardBigBg(), this.GetTexture(18));
    this.SetTextureShowUntilLoaded(i.GetRarityDetailCardSmallBg(), this.GetTexture(19));
    i = t.GetDeleteCost();
    this.LGu = i;
    this.GetText(16)?.SetText("-" + i);
    i = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(2);
    this.SetTextureShowUntilLoaded(i.GetSmallIcon(), this.GetTexture(15));
    this.GetText(17)?.ShowTextNew("Farm_Edit3");
    this.GetButton(14).RootUIComp.SetUIActive(true);
    this.GetItem(20)?.SetUIActive(t.IsSpecialPhantom);
  }
  DRu(t) {
    this.GetText(2)?.ShowTextNew("Farm_CardType2");
    this.GetText(2)?.SetUIActive(true);
    this.GetText(1)?.ShowTextNew(t.GetName());
    this.qSo(t.TagData);
    this.SetTextureShowUntilLoaded(t.GetIcon(), this.GetTexture(3));
    var i = t.GetToyQualityData();
    this.SetTextureShowUntilLoaded(i.GetRarityDetailCardBigBg(), this.GetTexture(18));
    this.SetTextureShowUntilLoaded(i.GetRarityDetailCardSmallBg(), this.GetTexture(19));
    var i = t.GetDeleteEarn();
    this.GetText(16)?.SetText("+" + i);
    var i = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(2);
    this.SetTextureShowUntilLoaded(i.GetSmallIcon(), this.GetTexture(15));
    this.GetText(17)?.ShowTextNew("Farm_Edit2");
    this.GetButton(14).RootUIComp.SetUIActive(true);
    var i = t.GetToyRaceData();
    if (i) {
      this.GetItem(21)?.SetUIActive(true);
      this.SetTextureShowUntilLoaded(i.SmallIcon, this.GetTexture(22));
    }
    this.LGu = 0;
  }
  qSo(t) {
    if (t.TagId <= 0) {
      this.GetText(10)?.SetUIActive(false);
    } else {
      this.GetText(10)?.SetText(t.Desc);
      this.GetText(10)?.SetUIActive(true);
    }
  }
  f_u(t) {
    var t = t.CheckGetComponent(0);
    if (!!t && !((t = t.TipShowBuffList)?.length <= 0)) {
      this.OVc?.RefreshByData(t);
      this.GetItem(11)?.SetUIActive(true);
    }
  }
  V2u() {
    var t = {
      UiText: this.GetText(10),
      ViewType: 0,
      Style: 2,
      ReportType: 8
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(t);
  }
  j2u() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(10));
  }
}
exports.FloroRanchCommonTipItem = FloroRanchCommonTipItem;
//# sourceMappingURL=FloroRanchCommonTipItem.js.map