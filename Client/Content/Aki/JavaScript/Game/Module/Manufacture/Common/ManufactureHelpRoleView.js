"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManufactureHelpRoleView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const SmallItemGrid_1 = require("../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const CommonManager_1 = require("./CommonManager");
class ManufactureHelpRoleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.hNt = undefined;
    this.lNt = undefined;
    this.ETt = 0;
    this.GIi = 0;
    this.cHe = () => {
      var e = new HelpRoleItem();
      e.BindOnClickedCallback(this.Tke);
      return e;
    };
    this.xIi = () => {
      this.lNt = CommonManager_1.CommonManager.GetHelpRoleItemDataList(this.ETt);
      this.hNt.ReloadData(this.lNt);
      this.wIi();
    };
    this.Tke = e => {
      this.GIi = e;
      let t = 0;
      for (this.hNt.DeselectCurrentGridProxy(); t < this.lNt.length && e !== this.lNt[t].RoleId; t++);
      if (this.hNt.IsGridDisplaying(t)) {
        this.hNt.SelectGridProxy(t);
        this.hNt.RefreshGridProxy(t);
      }
    };
    this.Mke = () => {
      CommonManager_1.CommonManager.SetCurrentRoleId(this.GIi);
      UiManager_1.UiManager.CloseView("ManufactureHelpRoleView");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseHelpRole);
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
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ComposeSelectRoleButtonText");
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchViewType, 0);
    this.ETt = this.OpenParam;
    this.GIi = CommonManager_1.CommonManager.GetCurrentRoleId();
    this.xIi();
  }
  OnBeforeShow() {
    this.ChildPopView?.PopItem?.SetTexBgVisible(false);
  }
  wIi() {
    let e = 0;
    for (this.hNt.DeselectCurrentGridProxy(); e < this.lNt.length && this.GIi !== this.lNt[e].RoleId; e++);
    this.hNt.ScrollToGridIndex(e);
    this.hNt.SelectGridProxy(e);
  }
}
exports.ManufactureHelpRoleView = ManufactureHelpRoleView;
class HelpRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.sft = undefined;
    this.oft = undefined;
    this.eTt = e => {
      if (this.oft) {
        this.oft(this.fGt.RoleId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.eTt]];
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(3).GetOwner());
  }
  Refresh(e, t, i) {
    e = {
      Type: 2,
      Data: this.fGt = e,
      ItemConfigId: e.RoleId,
      IsCookUp: e.IsBuff,
      IsReceivedVisible: ModelManager_1.ModelManager.CookModel.CurrentCookRoleId === e.RoleId
    };
    this.sft.Apply(e);
    this.qWe();
    this.rNt();
    this.N6e(t, false);
    this.GetText(2).OnSelfLanguageChange.Bind(() => {
      this.rNt();
    });
  }
  Clear() {
    this.GetText(2).OnSelfLanguageChange.Unbind();
  }
  OnBeforeDestroy() {
    this.sft = undefined;
  }
  qWe() {
    this.GetText(1).SetText(this.fGt.RoleName);
  }
  rNt() {
    var e;
    if (CommonManager_1.CommonManager.CheckIsBuff(this.fGt.RoleId, this.fGt.ItemId)) {
      e = CommonManager_1.CommonManager.GetInfoText(this.fGt.RoleId);
      this.GetText(2).SetText(e);
    } else {
      e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(CommonManager_1.CommonManager.GetDefaultRoleText());
      this.GetText(2).SetText(e);
    }
  }
  BindOnClickedCallback(e) {
    this.oft = e;
  }
  OnSelected(e) {
    this.N6e(true);
  }
  OnDeselected(e) {
    this.N6e(false);
  }
  N6e(e, t = true) {
    var i = this.GetExtendToggle(0);
    if (e) {
      i.SetToggleState(1, t);
    } else {
      i.SetToggleState(0, false);
    }
  }
}
//# sourceMappingURL=ManufactureHelpRoleView.js.map