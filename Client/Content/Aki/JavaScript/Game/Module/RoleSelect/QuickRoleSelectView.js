"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickRoleSelectView = exports.QuickRoleSelectViewData = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const TeamRoleGrid_1 = require("./TeamRoleGrid");
class QuickRoleSelectViewData {
  constructor(i, e, t) {
    this.UseWay = undefined;
    this.SelectedRoleList = undefined;
    this.RoleList = undefined;
    this.CanConfirm = undefined;
    this.OnConfirm = undefined;
    this.OnWaitLoadingConfirm = undefined;
    this.OnBack = undefined;
    this.OnHideFinish = undefined;
    this.OnRoleSelectFull = undefined;
    this.UseWay = i;
    this.SelectedRoleList = e;
    this.RoleList = t;
  }
}
exports.QuickRoleSelectViewData = QuickRoleSelectViewData;
class QuickRoleSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.FilterSortEntrance = undefined;
    this.RoleScrollView = undefined;
    this.RoleList = undefined;
    this.DelayLoadingTimer = undefined;
    this.AutoCloseTimer = undefined;
    this.LoadingSequencePlayer = undefined;
    this.qAt = () => {
      var e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var t = new Array();
      for (let i = 1; i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; i++) {
        var r = e.get(i);
        if (r) {
          t.push(r.GetDataId());
        }
      }
      var i = this.Data?.CanConfirm;
      if (!i || !!i(t)) {
        if (this.Data?.OnWaitLoadingConfirm) {
          this.E5t();
          this.Data?.OnWaitLoadingConfirm(t).finally(() => {
            this.CloseMe();
          });
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseBeforeConfirmQuickRoleSelect);
          this.Data?.OnConfirm?.(t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TowerDefenseBeforeConfirmQuickRoleSelect);
          UiManager_1.UiManager.CloseView(this.Info.Name);
        }
      }
    };
    this.W7t = () => {
      this.Data?.OnBack?.();
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
    this.cHe = () => {
      var i = new TeamRoleGrid_1.TeamRoleGrid();
      i.BindOnExtendToggleStateChanged(this.ToggleFunction);
      i.BindOnCanExecuteChange(this.CanExecuteChange);
      return i;
    };
    this.ToggleFunction = i => {
      var e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet;
      var r = i.Data;
      if (i.State === 0) {
        for (const s of e) {
          if (s[1] === r) {
            e.delete(s[0]);
            t.delete(r.GetDataId());
            break;
          }
        }
      } else if (i.State === 1) {
        for (let i = 1; i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; i++) {
          if (!e.has(i)) {
            e.set(i, r);
            t.add(r.GetDataId());
            break;
          }
        }
      }
      i = this.RoleList.indexOf(r);
      this.RoleScrollView.RefreshGridProxy(i);
    };
    this.CanExecuteChange = (i, e, t) => {
      return t !== 0 || (t = i.GetRoleId(), ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(t) ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("EditBattleTeamCannotSwitchOtherArea"), false) : ((i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) && (this.Data?.OnRoleSelectFull ? this.Data?.OnRoleSelectFull() : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamRoleFull")), !i));
    };
    this.Hlo = (i, e) => {
      var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var r = new Array();
      for (let i = 1; i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; i++) {
        if (t.has(i)) {
          r.push(t.get(i));
        }
      }
      for (const n of i) {
        if (!r.includes(n)) {
          r.push(n);
        }
      }
      i = r.length > 0;
      this.GetItem(11).SetUIActive(!i);
      this.GetButton(3).RootUIComp.SetUIActive(i);
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(i);
      if (i) {
        this.RoleScrollView.RefreshByData(r);
        for (const a of t.values()) {
          var s = this.RoleList.indexOf(a);
          var o = r.indexOf(a);
          if (this.RoleScrollView.Iei >= 0 && s !== o) {
            ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(a.GetDataId());
            this.RoleScrollView.UnsafeGetGridProxy(s)?.OnDeselected(false);
          }
        }
        for (const l of t.values()) {
          var h = r.indexOf(l);
          ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(l.GetDataId());
          this.RoleScrollView.UnsafeGetGridProxy(h)?.OnForceSelected();
        }
        this.RoleList = r;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIInteractionGroup], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIText], [5, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText]];
    this.BtnBindInfo = [[3, this.qAt], [4, this.W7t]];
  }
  E5t() {
    if (!this.DelayLoadingTimer) {
      this.GetItem(14).SetUIActive(true);
      this.DelayLoadingTimer = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        this.GetButton(4)?.RootUIComp.SetUIActive(false);
        this.GetItem(13)?.SetUIActive(true);
        this.LoadingSequencePlayer?.PlaySequence("Progressing");
      }, EditFormationDefine_1.DELAY_SHOW_LOADING);
    }
    this.AutoCloseTimer ||= TimerSystem_1.GameplayTimerSystem.Delay(() => {
      UiManager_1.UiManager.ResetToBattleView();
    }, EditFormationDefine_1.AUTO_CLOSE_EDIT_FORMATION);
  }
  OnStart() {
    this.Data = this.OpenParam;
    this.RoleScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(10).GetOwner(), this.cHe);
    this.LoadingSequencePlayer = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(13));
    this.GetText(15)?.SetUIActive(ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea !== -1);
    var i = ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "MowTower_LevelTips", i, i);
  }
  OnBeforeDestroy() {
    this.Data?.OnHideFinish?.();
    this.Data = undefined;
    this.FilterSortEntrance?.Destroy();
    this.FilterSortEntrance = undefined;
    this.RoleScrollView?.ClearGridProxies();
    this.RoleScrollView = undefined;
    this.RoleList?.splice(0, this.RoleList.length);
    this.RoleList = undefined;
    if (this.DelayLoadingTimer) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.DelayLoadingTimer)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.DelayLoadingTimer);
      }
      this.DelayLoadingTimer = undefined;
    }
    if (this.AutoCloseTimer) {
      if (TimerSystem_1.GameplayTimerSystem.Has(this.AutoCloseTimer)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.AutoCloseTimer);
      }
      this.AutoCloseTimer = undefined;
    }
  }
  OnBeforeShow() {
    this.RoleList = this.Data?.RoleList;
    var e = this.Data?.SelectedRoleList;
    ModelManager_1.ModelManager.RoleSelectModel.ClearData();
    var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    if (e) {
      for (let i = 1; i <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(i > e.length); i++) {
        var r = e[i - 1];
        for (const s of this.RoleList) {
          if (s.GetDataId() === r) {
            t.set(i, s);
            break;
          }
        }
      }
    }
    var i = this.GetItem(8);
    this.FilterSortEntrance = new FilterSortEntrance_1.FilterSortEntrance(i, this.Hlo);
    this.RoleList.sort((i, e) => e.GetRoleConfig().Priority - i.GetRoleConfig().Priority);
    this.FilterSortEntrance.UpdateData(this.Data.UseWay, this.RoleList);
    this.GetItem(5).SetUIActive(false);
    this.GetText(9).SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "FastFormation_Finish");
  }
}
exports.QuickRoleSelectView = QuickRoleSelectView;
//# sourceMappingURL=QuickRoleSelectView.js.map