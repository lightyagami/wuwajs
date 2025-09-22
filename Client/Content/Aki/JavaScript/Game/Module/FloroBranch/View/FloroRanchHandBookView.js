"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchHandBookView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FloroRanchCardItem_1 = require("./Item/FloroRanchCardItem");
const FloroRanchHandBookItem_1 = require("./Item/FloroRanchHandBookItem");
class FloroRanchHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.a8e = 0;
    this.UVi = undefined;
    this.c4u = undefined;
    this.eVi = undefined;
    this.aPu = () => this.UVi !== undefined;
    this.Bco = i => {
      this.UVi?.OnDeselected();
      (this.UVi = i).OnSelected();
      this.NOu();
      this.hPu(i.Data);
    };
    this.hPu = i => {
      this.eVi.CardType = this.a8e;
      this.eVi.Refresh(i.Id, false, 0);
      this.eVi.SetItemAlpha(1);
      this.eVi.HideNewLabel();
      if (!i.IsUnLock) {
        this.eVi.SetLock();
      }
    };
    this.VOu = () => this.a8e !== 0;
    this.jOu = () => this.a8e !== 1;
    this.vG1 = () => {
      this.a8e = 0;
      this.GetExtendToggle(3)?.SetToggleStateForce(0);
      this.Og();
    };
    this.lPu = () => {
      this.a8e = 1;
      this.GetExtendToggle(2)?.SetToggleStateForce(0);
      this.Og();
    };
    this.AMo = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchDataRedDot);
      this.CloseMe();
    };
    this._Pu = () => {
      var i = new FloroRanchHandBookItem_1.FloroRanchHandBookItem();
      i.OnClickCallback = this.Bco;
      i.IsSelectedItem = this.aPu;
      return i;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIVerticalLayout], [2, UE.UIExtendToggle], [3, UE.UIExtendToggle], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[0, this.AMo], [2, this.vG1], [3, this.lPu]];
  }
  async OnBeforeStartAsync() {
    this.GetExtendToggle(2)?.CanExecuteChange.Bind(this.VOu);
    this.GetExtendToggle(3)?.CanExecuteChange.Bind(this.jOu);
    this.eVi = new FloroRanchCardItem_1.FloroRanchCardItem();
    this.eVi.OverrideTermViewType = 1;
    await this.eVi.CreateThenShowByActorAsync(this.GetItem(7).GetOwner());
    this.eVi.SetInteractive(false);
    this.c4u = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this._Pu, undefined, true);
    await this.Og();
    this.NOu();
  }
  async Og() {
    this.UVi?.OnDeselected();
    this.UVi = undefined;
    var i = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var t = i.GetUnlockNum(this.a8e);
    var e = i.GetTotalNum(this.a8e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "FloroRanchHandBookProgress", t, e);
    let s = [0];
    if (this.a8e === 0) {
      s = i.GetFloroRanchRaceDataList(true).map(i => i.Id);
    }
    await this.c4u.RefreshByDataAsync(s);
    this.c4u.ScrollToTop(0);
  }
  NOu() {
    var i = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.GetItem(9)?.SetUIActive(i.IsCardHasRedDot());
    this.GetItem(10)?.SetUIActive(i.IsToyHasRedDot());
  }
}
exports.FloroRanchHandBookView = FloroRanchHandBookView;
//# sourceMappingURL=FloroRanchHandBookView.js.map