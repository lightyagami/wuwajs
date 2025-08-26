"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueRoleDynamicContainer = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeeklyRogueRoleGridItem_1 = require("./WeeklyRogueRoleGridItem");
class WeeklyRogueRoleDynamicContainer extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.RefreshRole = undefined;
    this.tFe = undefined;
    this.Pe = undefined;
    this.m0o = [];
    this.T3u = () => {
      var e = new WeeklyRogueRoleGridItem_1.WeeklyRogueRoleGridItem();
      e.BindOnExtendToggleStateChanged(this.ToggleFunction);
      e.BindOnCanExecuteChange(this.CanExecuteChangeFunction);
      return e;
    };
    this.ToggleFunction = e => {
      var i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet;
      var r = e.Data;
      if (e.State === 0) {
        for (const o of i) {
          if (o[1] === r) {
            i.delete(o[0]);
            t.delete(r.GetDataId());
            break;
          }
        }
      } else if (e.State === 1) {
        for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
          if (!i.has(e)) {
            i.set(e, r);
            t.add(r.GetDataId());
            break;
          }
        }
      }
      this.tFe?.RefreshWithoutDataSync();
      this.RefreshRole?.(r);
    };
    this.CanExecuteChangeFunction = (e, i, t) => {
      return !e.IsTrialRole() && (t !== 0 || !(ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) || !(ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("EditBattleTeamRoleFull"), 1));
    };
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), undefined, true);
  }
  ClearItem() {}
  GetUsingItem(e) {
    return (e.IsTitleType ? this.GetItem(2) : this.GetGridLayout(0)).GetOwner();
  }
  Update(e, i) {
    if ((this.Pe = e).IsTitleType) {
      this.mGe(this.Pe);
    } else {
      this.HLu(this.Pe);
    }
  }
  InitData(e) {
    this.Pe = e;
  }
  Refresh() {
    if (this.Pe.IsTitleType) {
      this.mGe(this.Pe);
    } else {
      this.tFe?.RefreshWithoutDataSync();
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem]];
  }
  OnStart() {
    this.GetItem(2).SetUIActive(false);
    this.GetGridLayout(0).RootUIComp.SetUIActive(false);
  }
  mGe(e) {
    this.GetGridLayout(0).RootUIComp.SetUIActive(false);
    e = e.TitleInfo;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.TitleId);
    this.GetItem(4).SetUIActive(e.IsUp);
    if (e.IsUp) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "WeRougeFormationIntegralMultiplier", e.ScoreRate);
    }
    this.GetItem(6).SetUIActive(e.IsEmpty);
    this.GetItem(2).SetUIActive(true);
  }
  HLu(e) {
    this.GetItem(2).SetUIActive(false);
    this.tFe ||= new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.T3u);
    const r = e.DataList;
    var e = () => {
      var e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      for (const i of e.values()) {
        if (this.m0o.indexOf(i) !== r.indexOf(i)) {
          ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(i.GetDataId());
          this.tFe.GetLayoutItemByKey(i.GetDataId())?.OnDeselected(false);
        }
      }
      for (const t of e.values()) {
        ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(t.GetDataId());
        this.tFe.GetLayoutItemByKey(t.GetDataId())?.OnForceSelected(true);
      }
      this.m0o = r;
    };
    var i = r.length > 0;
    this.tFe.GetRootUiItem().SetUIActive(i);
    if (i) {
      this.tFe.RefreshByData(r, e, true);
    }
  }
}
exports.WeeklyRogueRoleDynamicContainer = WeeklyRogueRoleDynamicContainer;
//# sourceMappingURL=WeeklyRogueRoleDynamicContainer.js.map