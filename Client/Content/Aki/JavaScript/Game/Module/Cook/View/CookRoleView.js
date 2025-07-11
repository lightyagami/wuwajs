"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookRoleView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const CookRoleItem_1 = require("./CookRoleItem");
class CookRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.hNt = undefined;
    this.lNt = undefined;
    this.ETt = 0;
    this._Nt = 0;
    this.cHe = () => {
      var e = new CookRoleItem_1.CookRoleItem();
      e.BindOnClickedCallback(this.Tke);
      return e;
    };
    this.uNt = () => {
      this.lNt = ModelManager_1.ModelManager.CookModel.GetCookRoleItemDataList(this.ETt);
      this.hNt.ReloadData(this.lNt);
      this.cNt();
    };
    this.Tke = e => {
      this._Nt = e;
      let t = 0;
      for (this.hNt.DeselectCurrentGridProxy(); t < this.lNt.length && e !== this.lNt[t].RoleId; t++);
      this.hNt.SelectGridProxy(t);
      this.hNt.RefreshGridProxy(t);
    };
    this.Mke = () => {
      ModelManager_1.ModelManager.CookModel.CurrentCookRoleId = this._Nt;
      this.CloseMe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseCookRole);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIText]];
    this.BtnBindInfo = [[2, this.Mke]];
  }
  OnBeforeDestroy() {
    if (this.hNt) {
      this.hNt.ClearGridProxies();
      this.hNt = undefined;
    }
  }
  OnStart() {
    this.hNt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.cHe);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "CookSelectRoleButtonText");
    var e = this.OpenParam;
    this.ShowView(e);
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem?.SetTexBgVisible(false);
  }
  HideView(e) {
    this.SetActive(!e);
  }
  ShowView(e) {
    this.SetActive(true);
    ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 2;
    this.ETt = e;
    this._Nt = ModelManager_1.ModelManager.CookModel.CurrentCookRoleId;
    this.uNt();
  }
  cNt() {
    let e = 0;
    for (this.hNt.DeselectCurrentGridProxy(); e < this.lNt.length && this._Nt !== this.lNt[e].RoleId; e++);
    this.hNt.ScrollToGridIndex(e);
    this.hNt.SelectGridProxy(e);
  }
}
exports.CookRoleView = CookRoleView;
//# sourceMappingURL=CookRoleView.js.map