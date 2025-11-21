"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsWeaponTabView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const SurvivorsWeaponDetailItem_1 = require("../../Detail/SurvivorsWeaponDetailItem");
const SurvivorsTabViewBase_1 = require("./SurvivorsTabViewBase");
class SurvivorsWeaponTabView extends SurvivorsTabViewBase_1.SurvivorsTabViewBase {
  constructor() {
    super(...arguments);
    this.eGd = undefined;
    this.tGd = () => new SurvivorsWeaponDetailItem_1.SurvivorsWeaponDetailItem();
    this.CreateLoopItem = () => {
      var e = new SurvivorWeaponTabItem();
      e.OnClickToggleCallBack = this.OnItemClick;
      e.OnCanToggleClicked = this.OnCanClickItem;
      return e;
    };
  }
  get ItemType() {
    return 1;
  }
  GetLoopItemIndex() {
    return 3;
  }
  GetLoopScrollComponentIndex() {
    return 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText]];
    this.BtnBindInfo = [];
  }
  async InitSubComponents() {
    this.eGd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.tGd, this.GetItem(6).GetOwner());
  }
  OnTriggerSequenceStartEvent() {
    this.eGd?.GetGenericLayout().PlayGridAnim();
  }
  OnSelectItem(e, t = true) {
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e.Id);
    this.GetText(8)?.ShowTextNew(e.LockState ? "Text_Unknown_Text" : i.Name);
    this.eGd.RefreshByData(this.iGd(e), () => {
      for (const e of this.eGd.GetScrollItemList()) {
        e.SetIsCurrentState(false);
        e.SetIsLocked(false);
      }
    }, t);
  }
  GenerateItemUiDataList() {
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData.ActId;
    var e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetAllSurvivorsWeaponByActId(e).map(e => {
      var t = ModelManager_1.ModelManager.SurvivorsRogueModel.GetItemIsLock(this.ItemType, e.Id);
      return {
        Id: e.Id,
        LockState: t,
        IsNew: ModelManager_1.ModelManager.SurvivorsRogueModel.GetItemIsNew(this.ItemType, e.Id),
        SortId: e.SortId
      };
    });
    this.i0m(e);
    return e;
  }
  i0m(e) {
    e.sort((e, t) => e.LockState !== t.LockState ? e.LockState ? 1 : -1 : e.SortId !== t.SortId ? e.SortId - t.SortId : e.Id - t.Id);
  }
  iGd(e) {
    var t = e.Id;
    var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(t);
    var e = !e.LockState;
    let r = [];
    return r = e ? [...i.EvolveIds.keys()] : [ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeaponDefaultEvolve(t).Id];
  }
}
exports.SurvivorsWeaponTabView = SurvivorsWeaponTabView;
class SurvivorWeaponTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnCanToggleClicked = undefined;
    this.OnClickToggleCallBack = undefined;
    this.Pe = undefined;
    this.A5e = () => !this.OnCanToggleClicked || this.OnCanToggleClicked(this.Pe, false, this.GetExtendToggle(0).ToggleState);
    this.kqe = () => {
      this.OnClickToggleCallBack?.(this.Pe, this);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.A5e);
  }
  OnSelected(e) {
    if (e) {
      this.kqe();
    }
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
  Refresh(e, t, i) {
    this.Pe = e;
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsWeapon(e.Id);
    if (t) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
    if (e.LockState) {
      this.GetText(3)?.ShowTextNew("Text_Unknown_Text");
      this.SetTextureByPath(r.Icon, this.GetTexture(2));
      this.GetTexture(2)?.SetUIActive(true);
    } else {
      this.GetText(3)?.ShowTextNew(r.Name);
      this.GetTexture(2)?.SetUIActive(false);
    }
    this.GetItem(5)?.SetUIActive(e.IsNew ?? false);
    this.GetItem(4)?.SetUIActive(e.LockState ?? false);
    this.SetTextureByPath(r.Icon, this.GetTexture(1));
  }
}
//# sourceMappingURL=SurvivorsWeaponTabView.js.map