"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterWaveItem = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const TrapDefenseMonsterEndlessWaveItem_1 = require("./TrapDefenseMonsterEndlessWaveItem");
const TrapDefenseMonsterItem_1 = require("./TrapDefenseMonsterItem");
class TrapDefenseMonsterWaveItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
    this.OnSelectMonsterCallBack = undefined;
    this.LayoutMonster = undefined;
    this.EndlessItem = undefined;
    this.LastSelectMonsterIndex = CommonDefine_1.INVALID_VALUE;
    this.IsFireForBuffClick = false;
    this.CreateItemMonster = () => {
      var t = new TrapDefenseMonsterItem_1.TrapDefenseMonsterItem(true);
      t.OnSelectMonsterItemCallback = this.vHc;
      t.OnShowNumCallback = this.GetMonsterInTheWaveShowNum;
      return t;
    };
    this.vHc = t => {
      this.IsFireForBuffClick = true;
      this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      this.OnSelectMonsterCallBack?.(t, this.ItemData);
      this.IsFireForBuffClick = false;
    };
    this.GetMonsterInTheWaveShowNum = t => {
      t = this.ItemData.GetMonsterNum(t);
      if (t > 1) {
        return ConfigManager_1.ConfigManager.TextConfig.GetMultiText("XValueShow", t) || t.toString();
      } else {
        return "";
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIArtText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UILayoutBase], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UILayoutBase]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    var t = this.GetLayoutBase(7);
    var e = this.GetItem(8)?.GetOwner();
    this.LayoutMonster = new GenericLayout_1.GenericLayout(t, this.CreateItemMonster, e);
    var t = this.GetItem(9);
    this.EndlessItem = new TrapDefenseMonsterEndlessWaveItem_1.TrapDefenseMonsterEndlessWaveItem();
    await this.EndlessItem.Init(t);
  }
  async RefreshAsync(t) {
    var e = (this.ItemData = t).IsInTheCurrentWave();
    var s = t.IsFinish();
    var i = this.GetArtText(2);
    var r = this.GetText(3);
    i?.SetText(t.GetWaveFormat());
    i?.SetChangeColor(e, i.changeColor);
    r?.SetChangeColor(e, r.changeColor);
    this.GetItem(10)?.SetAlpha(s ? 0.5 : 1);
    this.GetItem(4)?.SetUIActive(s);
    this.GetItem(0)?.SetUIActive(!e);
    this.GetItem(1)?.SetUIActive(e);
    var i = t.GetEnhanceTipsInfoKey();
    this.GetItem(5)?.SetUIActive(!!i);
    if (i) {
      this.GetText(6)?.ShowTextNew(i);
    }
    this.EndlessItem.SetActive(t.IsEndlessStart);
    if (t.IsEndlessStart) {
      this.EndlessItem.UpdateDescKey(t.EndlessWaveDesc ?? t.Wave.toString());
    }
    this.LastSelectMonsterIndex = this.LayoutMonster.GetSelectedGridIndex();
    await this.LayoutMonster.RefreshByDataAsync(t.GetMonsterDataList(), true);
  }
  OnSelected() {
    if (!this.IsFireForBuffClick) {
      this.LayoutMonster.SelectGridProxy(Math.max(this.LastSelectMonsterIndex, 0));
    }
  }
  OnDeselected() {
    this.LayoutMonster.DeselectCurrentGridProxy();
  }
  GetUsingItem(t) {
    return this.GetItem(10)?.GetOwner();
  }
  Update(t, e) {
    var s;
    var i;
    var r;
    var h;
    if (this.ItemData === t) {
      this.UpdateSelectState();
    } else {
      s = (this.ItemData = t).IsInTheCurrentWave();
      i = t.IsFinish();
      r = this.GetArtText(2);
      h = this.GetText(3);
      r?.SetText(t.GetWaveFormat());
      r?.SetChangeColor(s, r.changeColor);
      h?.SetChangeColor(s, h.changeColor);
      this.GetItem(10)?.SetAlpha(i ? 0.5 : 1);
      this.GetItem(4)?.SetUIActive(i);
      this.GetItem(0)?.SetUIActive(!s);
      this.GetItem(1)?.SetUIActive(s);
      r = t.GetEnhanceTipsInfoKey();
      this.GetItem(5)?.SetUIActive(!!r);
      if (r) {
        this.GetText(6)?.ShowTextNew(r);
      }
      this.EndlessItem.SetActive(t.IsEndlessStart);
      if (t.IsEndlessStart) {
        this.EndlessItem.UpdateDescKey(t.EndlessWaveDesc ?? t.Wave.toString());
      }
      h = t.GetMonsterDataList();
      this.LayoutMonster.RefreshByData(h, this.UpdateSelectState.bind(this), true);
    }
  }
  UpdateSelectState() {
    this.LayoutMonster?.GetLayoutItemList().forEach(t => {
      t.CheckWaveUpdate(this.ItemData);
    });
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner());
  }
  ClearItem() {}
}
exports.TrapDefenseMonsterWaveItem = TrapDefenseMonsterWaveItem;
//# sourceMappingURL=TrapDefenseMonsterWaveItem.js.map