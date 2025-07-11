"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefensePhantomLockItem = exports.TowerDefensePhantomView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const TowerDefenceController_1 = require("../TowerDefenceController");
const TowerDefenceDefine_1 = require("../TowerDefenceDefine");
class TowerDefensePhantomView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.PZs = undefined;
    this.wZs = undefined;
    this.p9t = undefined;
    this.hca = undefined;
    this.BZs = undefined;
    this.I5t = () => {
      this.CloseMe();
    };
    this.bZs = e => {
      TowerDefenceController_1.TowerDefenseController.SetCurrentTowerDefensePhantomIdInUiTemp(e);
      this.qZs(false);
      this.GZs();
      this.OZs();
    };
    this.NZs = () => {
      var e = this.BZs.RoleCfgId;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm, e);
      this.CloseMe();
    };
    this.rth = () => {
      var e = this.BZs.RoleCfgId;
      TowerDefenceController_1.TowerDefenseController.SetCurrentTowerDefensePhantomIdInUiTemp(TowerDefenceDefine_1.DEFAULT_ID);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm, e);
      this.CloseMe();
    };
    this.lca = () => {
      this.CloseMe();
    };
    this.tsh = () => {
      this.qZs(false);
      this.OZs();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIText], [6, UE.UIVerticalLayout], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.I5t]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefenseOnClickOnePhantom, this.bZs);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.DissolvePrewar, this.lca);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TowerDefensePhantomChanged, this.tsh);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefenseOnClickOnePhantom, this.bZs);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.DissolvePrewar, this.lca);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TowerDefensePhantomChanged, this.tsh);
  }
  async B1h() {
    var e = new TowerDefensePhantomLockItem();
    await e.CreateByActorAsync(this.GetItem(10).GetOwner());
    e.SetText("TowerDefence_lock");
    this.hca = e;
  }
  async b1h() {
    this.PZs = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), TowerDefenceController_1.TowerDefenseController.BuildPhantomIconItem, true);
    await this.qZs(true);
  }
  async OnBeforeStartAsync() {
    this.BZs = this.OpenParam;
    TowerDefenceController_1.TowerDefenseController.ResetCurrentTowerDefensePhantomIdInUiTemp();
    await Promise.all([this.B1h(), this.b1h()]);
    this.GetItem(9).SetUIActive(true);
    this.wZs = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(6), TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillItem);
    this.GZs();
    this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(8));
    this.OZs();
    TowerDefenceController_1.TowerDefenseController.SetPhantomViewOpened(true);
  }
  OnBeforeDestroy() {
    this.BZs = undefined;
  }
  async qZs(e) {
    var t = TowerDefenceController_1.TowerDefenseController.BuildPhantomIconScrollData();
    TowerDefenceController_1.TowerDefenseController.MarkPhantomIconScrollDataChosen(t, e, this.BZs.RoleCfgId);
    await this.PZs.RefreshByDataAsync(t);
  }
  GZs() {
    var e = TowerDefenceController_1.TowerDefenseController.BuildPhantomSkillLayoutData();
    this.wZs.RefreshByData(e);
  }
  M3e(e) {
    if (e) {
      this.p9t.SetUiActive(false);
      this.p9t.SetLocalTextNew("TowerDefence_lock");
    } else if (TowerDefenceController_1.TowerDefenseController.CheckCurrentPhantomIsOccupiedInUi()) {
      if (TowerDefenceController_1.TowerDefenseController.CheckSelfPhantomCancelAble(this.BZs.RoleCfgId)) {
        this.p9t.SetUiActive(true);
        this.p9t.SetEnableClick(true);
        this.p9t.SetLocalTextNew("Text_GoDownText_Text");
        this.p9t.SetFunction(this.rth);
      } else {
        this.p9t.SetUiActive(true);
        this.p9t.SetEnableClick(false);
        this.p9t.SetLocalTextNew("PrefabTextItem_266690258_Text");
      }
    } else {
      this.p9t.SetUiActive(true);
      this.p9t.SetEnableClick(true);
      this.p9t.SetFunction(this.NZs);
      this.p9t.SetLocalTextNew("TowerDefence_confirm");
    }
  }
  OZs() {
    var e;
    var t = TowerDefenceController_1.TowerDefenseController.BuildPhantomOtherData();
    if (t) {
      e = t.IsLocked;
      this.p9t.SetUiActive(!e);
      this.M3e(e);
      this.hca.SetUiActive(e);
      this.SetSpriteByPath(t.TypeIconPath, this.GetSprite(4), false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.TypeTextId);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.NameTextId);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (this.PZs) {
      var t = this.PZs.GetGrid(0);
      if (t) {
        return [t, t];
      }
    }
  }
}
exports.TowerDefensePhantomView = TowerDefensePhantomView;
class TowerDefensePhantomLockItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
  }
  SetText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e);
  }
}
exports.TowerDefensePhantomLockItem = TowerDefensePhantomLockItem;
//# sourceMappingURL=TowerDefencePhantomView.js.map