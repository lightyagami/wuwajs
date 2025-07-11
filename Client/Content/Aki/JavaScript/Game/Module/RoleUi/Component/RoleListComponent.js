"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleListComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RoleController_1 = require("../RoleController");
const RoleListItem_1 = require("./RoleListItem");
class RoleListComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollView = undefined;
    this.RoleViewAgent = undefined;
    this.DataList = undefined;
    this.RoleSystemUiParams = undefined;
    this.nFe = () => {
      var e = new RoleListItem_1.RoleListItem();
      e.ToggleCallBack = this.n1o;
      e.CanToggleExecuteChange = this.A5e;
      return e;
    };
    this.A5e = e => this.ScrollView.GetGenericLayout().GetSelectedGridIndex() !== e && !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingAnimation();
    this.n1o = e => {
      this.ScrollView.GetGenericLayout().SelectGridProxy(e);
      this.RoleViewAgent.SetCurSelectRoleId(this.CurSelectDataId);
      e = this.RoleViewAgent.GetCurSelectRoleData();
      RoleController_1.RoleController.OnSelectedRoleChange(this.CurSelectDataId, e.GetRoleSkinId());
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSystemChangeRole, this.CurSelectDataId);
    };
  }
  get CurSelectDataId() {
    var e = this.ScrollView.GetGenericLayout().GetSelectedGridIndex();
    if (!this.DataList || e < 0 || e >= this.DataList.length) {
      return 0;
    } else {
      return this.DataList[e].RoleDataId;
    }
  }
  GetSelfScrollView() {
    return this.ScrollView;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    this.RoleViewAgent = this.OpenParam;
    if (this.RoleViewAgent === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleListComponent"]);
      }
    } else {
      this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.nFe);
    }
  }
  UnBindRedDot() {
    RedDotController_1.RedDotController.UnBindRedDot("RoleSystemRoleList");
  }
  SetRoleSystemUiParams(e) {
    this.RoleSystemUiParams = e;
  }
  async UpdateComponent(e) {
    var t = [];
    for (const o of e) {
      var i = new RoleListItem_1.RoleListItemData();
      i.RoleDataId = o;
      i.NeedShowTrial = this.RoleSystemUiParams?.RoleListNeedTrial ?? true;
      i.NeedRedDot = this.RoleSystemUiParams?.RoleListRedDot ?? false;
      i.TeamPositionType = this.RoleViewAgent?.TeamPositionType ?? 0;
      t.push(i);
    }
    this.DataList = t;
    await this.ScrollView.RefreshByDataAsync(t);
  }
  SetCurSelection(t) {
    var e = this.DataList.findIndex(e => e.RoleDataId === t);
    if (!(e < 0) && !(e >= this.DataList.length)) {
      this.n1o(e);
      if (e = this.ScrollView.GetItemByIndex(e)) {
        this.ScrollView.ScrollTo(e);
      }
    }
  }
}
exports.RoleListComponent = RoleListComponent;
//# sourceMappingURL=RoleListComponent.js.map