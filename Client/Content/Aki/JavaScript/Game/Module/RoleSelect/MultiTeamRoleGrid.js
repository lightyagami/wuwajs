"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiTeamRoleGrid = exports.MultiTeamRoleGridContentData = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const MediumItemGrid_1 = require("../Common/MediumItemGrid/MediumItemGrid");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
class MultiTeamRoleGridContentData {
  constructor() {
    this.ShowGridAnimation = false;
    this.Data = undefined;
    this.CurrentSelectedRoleList = [];
    this.OnToggleCallBack = () => {};
    this.CanExecuteChangeCallBack = () => true;
  }
}
exports.MultiTeamRoleGridContentData = MultiTeamRoleGridContentData;
class MultiTeamRoleGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.Bqe = () => {
      return new RoleGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIGridLayout], [2, UE.UIItem]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.Bqe);
    this.eGe.GetUiAnimController().PlayFromIndex = 1;
  }
  Refresh(t, e, i) {
    this.GetText(0).ShowTextNew(t.Data.GetTitle());
    var s = [];
    for (const o of t.Data.GetShowMultiTeamRoleGridDataList()) {
      var r = new RoleGridContentData();
      r.Data = o;
      r.CurrentSelectedRoleList = t.CurrentSelectedRoleList;
      r.OnToggleCallBack = t.OnToggleCallBack;
      r.CanExecuteChangeCallBack = t.CanExecuteChangeCallBack;
      s.push(r);
    }
    this.eGe.RefreshByData(s, undefined, t.ShowGridAnimation);
  }
}
exports.MultiTeamRoleGrid = MultiTeamRoleGrid;
class RoleGridContentData {
  constructor() {
    this.Data = undefined;
    this.CurrentSelectedRoleList = [];
    this.OnToggleCallBack = () => {};
    this.CanExecuteChangeCallBack = () => true;
  }
}
class RoleGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.TBt = undefined;
    this.UB_ = undefined;
  }
  OnStart() {}
  Refresh(t, e, i) {
    this.DB_(t);
  }
  async DB_(t) {
    if (this.TBt) {
      await this.TBt.Promise;
    } else {
      this.TBt = new CustomPromise_1.CustomPromise();
      this.UB_ = new MediumItemGrid_1.MediumItemGrid();
      await this.UB_.CreateByActorAsync(this.GetRootItem().GetOwner());
      this.TBt.SetResult();
    }
    this.UB_.SetActive(true);
    var e = t.Data.GetRole();
    var i = e.GetLevelData();
    var s = e.GetDataId();
    var r = e.IsTrialRole();
    var o = t.Data.GetIsHighlight();
    var d = t.Data.GetIsRecommend();
    var a = t.CurrentSelectedRoleList.indexOf(s);
    var h = t.Data.GetIsLock();
    var s = {
      Type: 2,
      ItemConfigId: s,
      SkinId: e.GetRoleSkinId(),
      IsTrialRoleVisible: r,
      BottomTextId: "Text_LevelShow_Text",
      BottomTextParameter: [i.GetLevel()],
      HighlightIndex: o,
      ElementId: e.GetRoleConfig().ElementId,
      Data: t.Data,
      IsRecommendVisible: d,
      Index: a >= 0 ? a + 1 : undefined,
      IsShowLock: h,
      IsUnRecommendVisible: t.Data?.GetIsUnRecommend()
    };
    this.UB_.Apply(s);
    this.UB_.BindOnExtendToggleStateChanged(t.OnToggleCallBack);
    this.UB_.UnBindOnCanExecuteChange();
    this.UB_.SetSelected(a >= 0);
    this.UB_.BindOnCanExecuteChange(t.CanExecuteChangeCallBack);
  }
}
//# sourceMappingURL=MultiTeamRoleGrid.js.map