"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteGridBase = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiNavigationNewController_1 = require("../../UiNavigation/New/UiNavigationNewController");
class RouletteGridBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Toggle = undefined;
    this.IsIconTexture = false;
    this.l4e = undefined;
    this.W5e = undefined;
    this.A5e = () => !this.W5e || this.W5e(this.Data, this.Toggle.GetToggleState());
    this.A0o = t => {
      if (t === 1) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRouletteItemSelect, this.Data);
      }
    };
    this.P0o = t => {
      this.SetGridEquipped(t === 1);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIExtendToggleSpriteTransition], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIItem]];
  }
  OnStart() {
    this.IsIconTexture = false;
    var t = this.GetUiExtendToggleSpriteTransition(5);
    var i = this.GetTexture(2);
    t.RootUIComp.SetUIActive(false);
    i.SetUIActive(false);
    this.Toggle = this.GetExtendToggle(0);
    this.Toggle.SetToggleState(0);
    this.Toggle.CanExecuteChange.Bind(this.A5e);
    this.SetGridEquipped(false);
    this.SetRedDotVisible(false);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
    this.Data = undefined;
    this.Toggle?.CanExecuteChange.Unbind();
    this.Toggle = undefined;
  }
  async Init() {}
  IsDataValid() {
    return this.Data.Id !== undefined && this.Data.Id !== 0;
  }
  RefreshGrid(t) {
    this.Data = t;
    this.WH_();
    t = new UiAsyncTask_1.UiAsyncTask("RouletteGridBase.RefreshGrid", async () => {
      await this.Init();
      this.x0o();
    });
    this.RunAsyncTask(t);
  }
  BindRedDot(t, i = 0) {
    var e = this.GetItem(11);
    if (e && (this.UnBindRedDot(), this.l4e = t, this.l4e)) {
      RedDotController_1.RedDotController.BindRedDot(t, e, undefined, i);
    }
  }
  UnBindRedDot() {
    var t;
    if (this.l4e) {
      t = this.GetItem(11);
      RedDotController_1.RedDotController.UnBindGivenUi(this.l4e, t);
      this.l4e = undefined;
    }
  }
  SetRedDotVisible(t) {
    this.GetItem(11).SetUIActive(t);
  }
  GetIconItem(t = this.IsIconTexture) {
    if (t) {
      return this.GetTexture(2);
    } else {
      return this.GetUiExtendToggleSpriteTransition(5).RootUIComp;
    }
  }
  async LoadSpriteIcon(t) {
    const i = this.GetUiExtendToggleSpriteTransition(5);
    const e = this.GetSprite(6);
    const s = new CustomPromise_1.CustomPromise();
    this.SetSpriteByPath(t, e, true, undefined, () => {
      i.SetAllStateSprite(e.GetSprite());
      s.SetResult();
    });
    await s.Promise;
  }
  async LoadTextureIcon(t) {
    var i = this.GetTexture(2);
    await this.SetTextureAsync(t, i);
  }
  async LoadIconByItemId(t) {
    var i = this.GetTexture(2);
    await this.SetItemIconAsync(i, t);
  }
  WH_() {
    this.GetItem(1).SetUIActive(false);
    this.GetItem(4).SetUIActive(false);
    this.GetItem(8).SetUIActive(false);
    this.GetText(10).SetUIActive(false);
    this.GetIconItem(true).SetUIActive(false);
    this.GetIconItem(false).SetUIActive(false);
  }
  x0o() {
    var t;
    var i = this.Data.State;
    if (i === 4) {
      this.SetActive(false);
    } else {
      this.GetItem(1).SetUIActive(i === 2);
      this.GetItem(4).SetUIActive(i === 0);
      t = this.Data.ShowIndex;
      this.GetItem(8).SetUIActive(t);
      if (t) {
        t = (this.Data.GridIndex + 1).toString();
        this.GetText(9).SetText(t);
      }
      this.GetText(10).SetUIActive(this.Data.ShowNum);
      if (this.Data.ShowNum) {
        this.GetText(10).SetText(this.Data.DataNum.toString());
      }
      this.GetIconItem(!this.IsIconTexture).SetUIActive(false);
      this.GetIconItem(this.IsIconTexture).SetUIActive(i === 1 || i === 0 || i === 5);
    }
  }
  SetGridEquipped(t) {
    this.GetItem(3).SetUIActive(t);
  }
  BindOnCanToggleExecuteChange(t) {
    this.W5e = t;
  }
  AddToggleStateChangeEvent(t) {
    this.Toggle.OnStateChange.Add(t);
  }
  RemoveToggleStateChangeEvent(t) {
    this.Toggle.OnStateChange.Remove(t);
  }
  SetGridToggleChangeEvent() {
    this.AddToggleStateChangeEvent(this.A0o);
    this.AddToggleStateChangeEvent(this.P0o);
  }
  RemoveGridToggleChangeEvent() {
    this.RemoveToggleStateChangeEvent(this.A0o);
    this.RemoveToggleStateChangeEvent(this.P0o);
  }
  SetToggleSelfInteractive(t) {
    this.Toggle.SetSelfInteractive(t);
  }
  SetGridToggleState(t, i = true) {
    this.Toggle.SetToggleState(t ? 1 : 0, i);
  }
  SetGridToggleNavigation(t) {
    if (t) {
      UiNavigationNewController_1.UiNavigationNewController.SetNavigationFocusForView(this.RootItem);
    }
  }
  SelectOnGrid(t) {
    this.OnSelect(t);
  }
  OnSelect(t) {}
}
exports.RouletteGridBase = RouletteGridBase;
//# sourceMappingURL=RouletteGridBase.js.map