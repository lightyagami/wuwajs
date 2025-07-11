"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingBuffGridItem = exports.MowingBuffGridGroup = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class MowingBuffGridGroup extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Tei = undefined;
    this.l9a = () => new MowingBuffGridItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.Tei = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.l9a, undefined);
  }
  OnBeforeDestroy() {
    this.Tei.UnBindLateUpdate();
  }
  async RefreshAsync(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.GroupNameTextId);
    await this.Tei.RefreshByDataAsync(e.BuffItemList);
  }
  GetBuffGridItemLayout() {
    return this.Tei;
  }
}
exports.MowingBuffGridGroup = MowingBuffGridGroup;
class MowingBuffGridItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this._9a = undefined;
    this.BZa = undefined;
    this.Ouo = undefined;
    this.eTt = () => {
      ModelManager_1.ModelManager.MowingRiskModel.CurrentChosenOverviewBuffId = this._9a.BuffId;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MowingBasicBuffGridItemClick);
    };
    this.$$a = () => !this._9a.IsChosen;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIExtendToggle], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[6, this.eTt]];
  }
  async OnBeforeStartAsync() {
    var e = new UiPanelBase_1.UiPanelBase();
    var t = new MowingBuffLevelPanel();
    var i = e.CreateByResourceIdAsync("UiItem_ItemLock", this.GetItem(4), true);
    var s = t.CreateByResourceIdAsync("UiItem_ItemState", this.GetItem(4), true);
    await Promise.all([i, s]);
    e.SetUiActive(false);
    t.SetUiActive(false);
    this.BZa = e;
    this.Ouo = t;
    this.GetText(2)?.SetUIActive(false);
  }
  OnStart() {
    this.GetExtendToggle(6).CanExecuteChange.Bind(this.$$a);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(6).CanExecuteChange.Unbind();
  }
  Refresh(e, t, i) {
    this._9a = e;
    this.SetSpriteByPath(e.QualityPath, this.GetSprite(0), false);
    var s = this.GetTexture(1);
    s?.SetUIActive(e.IconPath !== undefined);
    if (e.IconPath) {
      this.SetTextureByPath(e.IconPath, s);
    }
    this.GetText(2)?.SetUIActive(true);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.NameTextId);
    this.GetSprite(3).SetUIActive(e.IsShowBackground);
    this.GetItem(5).SetUIActive(false);
    this.GetExtendToggle(6).SetToggleStateForce(e.IsChosen ? 1 : 0);
    this.GetItem(4).SetUIActive(true);
    this.BZa?.SetUiActive(!e.IsUnlock);
    this.Ouo?.SetUiActive(e.LevelContent !== undefined);
    this.Ouo?.RefreshByLevelContent(e.LevelContent);
    this.GetItem(7).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetItem(9).SetUIActive(false);
  }
  CheckNeedPlayUnlockSequence() {
    return !ModelManager_1.ModelManager.MowingRiskModel.HasBuffIdRecord(this._9a.BuffId);
  }
  PlayUnlockEffect() {
    var e = ModelManager_1.ModelManager.MowingRiskModel;
    e.RecordBuffId(this._9a.BuffId);
    var e = e.GetBuffTypeByBuffId(this._9a.BuffId);
    let t = undefined;
    switch (e) {
      case 1:
        t = 7;
        break;
      case 2:
        t = 8;
        break;
      case 3:
        t = 9;
    }
    if (t) {
      this.GetItem(t).SetUIActive(true);
    }
  }
}
exports.MowingBuffGridItem = MowingBuffGridItem;
class MowingBuffLevelPanel extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite]];
  }
  OnStart() {
    this.GetSprite(0)?.SetUIActive(false);
    this.GetSprite(5)?.SetUIActive(false);
    this.GetItem(3)?.SetUIActive(false);
  }
  RefreshByLevelContent(e) {
    var t = this.GetItem(1);
    if (e === undefined) {
      t?.SetUIActive(false);
    } else {
      t?.SetUIActive(true);
      this.GetText(2)?.SetText(e);
    }
  }
}
//# sourceMappingURL=MowingBuffGridGroup.js.map