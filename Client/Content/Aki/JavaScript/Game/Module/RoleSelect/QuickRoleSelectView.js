"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuickRoleSelectView = exports.QuickRoleSelectViewData = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../Ui/Base/UiSequencePlayer");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const FilterSortEntrance_1 = require("../Common/FilterSort/FilterSortEntrance");
const EditFormationDefine_1 = require("../EditFormation/EditFormationDefine");
const RoleDefine_1 = require("../RoleUi/RoleDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const TeamRoleGrid_1 = require("./TeamRoleGrid");
class QuickRoleSelectViewData {
  constructor(e, i, t) {
    this.UseWay = undefined;
    this.SelectedRoleList = undefined;
    this.RoleList = undefined;
    this.CanConfirm = undefined;
    this.OnConfirm = undefined;
    this.OnWaitLoadingConfirm = undefined;
    this.OnBack = undefined;
    this.OnHideFinish = undefined;
    this.OnRoleSelectFull = undefined;
    this.UseWay = e;
    this.SelectedRoleList = i;
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
      var i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var t = new Array();
      for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
        var r = i.get(e);
        if (r) {
          t.push(r.GetDataId());
        }
      }
      var e = this.Data?.CanConfirm;
      if (!e || !!e(t)) {
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
    this.$lo = () => {
      let e = 0;
      var i = Array.from(ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet);
      var i = (e = i.length > 0 ? i[i.length - 1] : e) >= RoleDefine_1.ROBOT_DATA_MIN_ID ? [e] : ModelManager_1.ModelManager.RoleModel.GetRoleIdList();
      ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainView(0, e, i, undefined, e => {
        if (e) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
        }
      });
    };
    this.$Ge = e => {
      if (e === "RoleRootView" && (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CloseView, this.$Ge) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge), EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo))) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleChangeEnd, this.Ylo);
      }
    };
    this.Ylo = () => {
      this.CloseMe();
    };
    this.cHe = () => {
      var e = new TeamRoleGrid_1.TeamRoleGrid();
      e.BindOnExtendToggleStateChanged(this.ToggleFunction);
      e.BindOnCanExecuteChange(this.CanExecuteChange);
      return e;
    };
    this.ToggleFunction = e => {
      var i = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var t = ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet;
      var r = e.Data;
      if (e.State === 0) {
        for (const s of i) {
          if (s[1] === r) {
            i.delete(s[0]);
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
      e = this.RoleList.indexOf(r);
      this.RoleScrollView.RefreshGridProxy(e);
    };
    this.CanExecuteChange = (e, i, t) => {
      return t !== 0 || (t = e.GetRoleId(), ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList?.includes(t) ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("EditBattleTeamCannotSwitchOtherArea"), false) : ((e = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap.size >= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM) && (this.Data?.OnRoleSelectFull ? this.Data?.OnRoleSelectFull() : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("EditBattleTeamRoleFull")), !e));
    };
    this.Hlo = (e, i) => {
      var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
      var r = new Array();
      for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
        if (t.has(e)) {
          r.push(t.get(e));
        }
      }
      for (const h of e) {
        if (!r.includes(h)) {
          r.push(h);
        }
      }
      e = r.length > 0;
      this.GetItem(11).SetUIActive(!e);
      this.GetButton(3).RootUIComp.SetUIActive(e);
      this.GetLoopScrollViewComponent(1).RootUIComp.SetUIActive(e);
      if (e) {
        this.RoleScrollView.RefreshByData(r);
        for (const a of t.values()) {
          var s = this.RoleList.indexOf(a);
          var o = r.indexOf(a);
          if (this.RoleScrollView.Iei >= 0 && s !== o && s < this.RoleScrollView.GetDisplayGridEndIndex()) {
            ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.delete(a.GetDataId());
            this.RoleScrollView.UnsafeGetGridProxy(s)?.OnDeselected(false);
          }
        }
        for (const l of t.values()) {
          var n = r.indexOf(l);
          ModelManager_1.ModelManager.RoleSelectModel.SelectedRoleSet.add(l.GetDataId());
          this.RoleScrollView.UnsafeGetGridProxy(n)?.OnForceSelected();
        }
        this.RoleList = r;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIInteractionGroup], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [1, UE.UILoopScrollViewComponent], [2, UE.UIText], [5, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText]];
    this.BtnBindInfo = [[3, this.qAt], [4, this.W7t], [12, this.$lo]];
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
    var e = ModelManager_1.ModelManager.MowingTowerModel.AddLevel[0];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "MowTower_LevelTips", e, e);
    this.GetButton(12).RootUIComp.SetUIActive(true);
    this.RefreshRoleList();
  }
  RefreshRoleList() {
    this.RoleList = this.Data?.RoleList;
    var i = this.Data?.SelectedRoleList;
    ModelManager_1.ModelManager.RoleSelectModel.ClearData();
    var t = ModelManager_1.ModelManager.RoleSelectModel.RoleIndexMap;
    if (i) {
      for (let e = 1; e <= EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM && !(e > i.length); e++) {
        var r = i[e - 1];
        for (const s of this.RoleList) {
          if (s.GetDataId() === r) {
            t.set(e, s);
            break;
          }
        }
      }
    }
    var e = this.GetItem(8);
    this.FilterSortEntrance = new FilterSortEntrance_1.FilterSortEntrance(e, this.Hlo);
    this.RoleList.sort((e, i) => i.GetRoleConfig().Priority - e.GetRoleConfig().Priority);
    this.FilterSortEntrance.UpdateData(this.Data.UseWay, this.RoleList);
    this.GetItem(5).SetUIActive(false);
    this.GetText(9).SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "FastFormation_Finish");
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
}
exports.QuickRoleSelectView = QuickRoleSelectView;
//# sourceMappingURL=QuickRoleSelectView.js.map