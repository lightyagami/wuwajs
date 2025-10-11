"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponReplaceView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance");
const SelectablePropDataUtil_1 = require("../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const RoleController_1 = require("../../RoleUi/RoleController");
const WeaponSkinDefine_1 = require("../../Skin/Tab/Weapon/WeaponSkinDefine");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const WeaponController_1 = require("../WeaponController");
const WeaponDefine_1 = require("../WeaponDefine");
const WeaponDetailTipsComponent_1 = require("../WeaponDetailTipsComponent");
const WeaponReplaceMediumItemGrid_1 = require("./WeaponReplaceMediumItemGrid");
class WeaponReplaceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.SelectedIncId = 0;
    this.RoleDataId = 0;
    this.nko = undefined;
    this.sko = undefined;
    this.ako = false;
    this.SortComponent = undefined;
    this.LoopScrollView = undefined;
    this.ItemDataList = undefined;
    this.yil = undefined;
    this.lko = e => {
      e = this.ItemDataList[e];
      return SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(e);
    };
    this._ko = () => {
      var e = new WeaponReplaceMediumItemGrid_1.WeaponReplaceMediumItemGrid();
      e.BindOnExtendToggleStateChanged(this.j5e);
      e.BindOnCanExecuteChange(this.Lke);
      return e;
    };
    this.j5e = e => {
      e = e.Data.IncId;
      this.SelectedWeaponHandle(e);
    };
    this.Lke = (e, t) => {
      return this.SelectedIncId !== e.IncId;
    };
    this.UpdateList = e => {
      this.LoopScrollView.DeselectCurrentGridProxy(true);
      this.LoopScrollView.ReloadProxyData(this.lko, e.length, false);
      if (!(e.length <= 0) && !this.IsShow) {
        this.LoopScrollView.ScrollToGridIndex(0);
        this.LoopScrollView.SelectGridProxy(0, true);
        e = e[0];
        this.SelectedWeaponHandle(e.GetUniqueId());
      }
    };
    this.uko = e => {
      var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
      var e = {
        WeaponIncId: e,
        WeaponSkinId: ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(t.GetRoleId()),
        IsFromRoleRootView: true
      };
      UiManager_1.UiManager.OpenView("WeaponRootView", e);
      WeaponController_1.WeaponController.RoleFadeIn(UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor());
    };
    this.cko = e => {
      var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(this.RoleDataId);
      var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
      const r = t.GetRoleId();
      var o;
      var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(206);
      if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem?.GetConfigId === r && t?.Valid && t.HasTag(202314845)) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TagCantSwitchWeapon");
      } else if (i.HasRole()) {
        t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponName(i.GetWeaponConfig().WeaponName);
        i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i.GetRoleId()).GetName();
        (o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(22)).SetTextArgs(t, i);
        o.FunctionMap.set(2, () => {
          WeaponController_1.WeaponController.SendPbEquipTakeOnRequest(r, WeaponDefine_1.WEAPON_EQUIPTYPE, e);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
      } else {
        WeaponController_1.WeaponController.SendPbEquipTakeOnRequest(r, WeaponDefine_1.WEAPON_EQUIPTYPE, e);
      }
    };
    this.mko = () => {
      this.UpdateCurrentTips();
      this.UpdateSelectedTips(this.SelectedIncId);
      this.RefreshPropItem();
    };
    this.dko = (e, t) => {
      if (this.sko.GetWeaponIncId() === e) {
        this.sko.UpdateWeaponLock(t);
      }
      if (this.nko.GetWeaponIncId() === e) {
        this.nko.UpdateWeaponLock(t);
      }
      this.RefreshPropItem();
    };
    this.W7t = () => {
      this.CloseMe();
    };
    this.hko = () => {
      this.SetContrast();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[1, this.W7t], [4, this.hko]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 58, "WeaponReplaceView界面输入为空");
      }
    } else {
      this.yil = e;
      this.SelectedIncId = e.WeaponIncId;
      this.RoleDataId = e.RoleId;
      this.nko = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent();
      await this.nko.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
      this.sko = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent();
      await this.sko.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
      await this.yil?.InitRoleActor();
    }
  }
  OnStart() {
    var e = this.GetItem(6).GetOwner();
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), e, this._ko);
    this.nko.SetReplaceFunction(this.cko);
    this.nko.SetCultureFunction(this.uko);
    this.nko.SetCanShowEquip(true);
    this.sko.SetCanShowEquip(true);
    this.sko.SetCanShowLock(false);
    this.SortComponent = new SortEntrance_1.SortEntrance(this.GetItem(5), this.UpdateList);
  }
  SetContrast() {
    var e;
    this.ako = !this.ako;
    if (this.sko && (e = this.ako, this.SetWeaponTipsRootItemState(e), e)) {
      this.UpdateCurrentTips();
    }
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.WeaponModel.SetCurSelectViewName(4);
    var e;
    var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.SelectedIncId);
    if (t !== undefined) {
      e = t.GetWeaponConfig();
      this.ItemDataList = ModelManager_1.ModelManager.WeaponModel.GetWeaponListFromReplace(e.WeaponType);
      this.SortComponent.UpdateData(3, this.ItemDataList);
      this.SelectedIncId = 0;
      this.SelectedWeaponHandle(t.GetIncId(), true);
    }
  }
  async OnPlayingStartSequenceAsync() {
    if (this.yil?.NeedShowOnViewPlayingStartSequence) {
      this.yil.ShowActor();
    }
    return Promise.resolve();
  }
  async OnPlayingCloseSequenceAsync() {
    if (this.yil?.NeedHideOnViewPlayingCloseSequence) {
      this.yil.HideActor();
    }
    return Promise.resolve();
  }
  OnBeforeDestroy() {
    this.Jkd();
    this.nko.Destroy();
    this.sko.Destroy();
    this.SortComponent.Destroy();
  }
  OnHandleLoadScene() {
    this.yil.HandleLoadScene(() => {
      RoleController_1.RoleController.PlayRoleMontage(6, true);
    });
  }
  OnHandleReleaseScene() {
    this.yil.HandleReleaseScene();
  }
  Jkd() {
    try {
      var e;
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.RoleDataId).GetRoleId();
      var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(t);
      var r = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(t);
      var o = this.yil?.TsUiSceneRoleActor?.Model;
      if (o && (e = o.CheckGetComponent(17))) {
        e.SetWeaponByWeaponData(i, r);
      }
    } catch (e) {
      if (e instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Character", 88, "还原角色武器失败", e, ["error", e.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 88, "还原角色武器失败", ["error", e]);
      }
    }
  }
  OnAfterHide() {
    if (this.ako) {
      this.SetContrast();
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EquipWeapon, this.mko);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemLock, this.dko);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EquipWeapon, this.mko);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemLock, this.dko);
  }
  RefreshPropItem() {
    this.LoopScrollView.RefreshAllGridProxies();
  }
  SetWeaponTipsRootItemState(e) {
    this.UiViewSequence.StopSequenceByKey("TipStart");
    this.UiViewSequence.StopSequenceByKey("TipClose");
    this.UiViewSequence.PlaySequence(e ? "TipStart" : "TipClose");
  }
  SelectedWeaponHandle(t, i = false) {
    if (this.SelectedIncId !== t) {
      if (ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(t) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Role", 58, "选中武器失败，背包不存在该武器", ["incId", t]);
        }
      } else {
        this.UpdateSelectedTips(t);
        var r = this.GetWeaponItemIndex(t);
        if (!(r < 0)) {
          this.LoopScrollView.SelectGridProxy(r, i);
          this.SelectedIncId = t;
          r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(t);
          let e = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
          if (r.GetRoleId() === this.RoleDataId) {
            e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(this.RoleDataId);
          }
          this.yil.TsUiSceneRoleActor.Model?.CheckGetComponent(17)?.SetWeaponByWeaponData(r, e);
        }
      }
    }
  }
  UpdateSelectedTips(e) {
    e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    this.nko.UpdateComponent(e);
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.RoleDataId);
    this.nko.UpdateEquip(e.GetRoleId());
  }
  UpdateCurrentTips() {
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(this.RoleDataId);
    this.sko.UpdateComponent(e);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.RoleDataId);
    this.sko.UpdateEquip(e.GetRoleId());
  }
  GetWeaponItemIndex(t) {
    for (let e = 0; e < this.ItemDataList.length; e++) {
      if (this.ItemDataList[e].GetUniqueId() === t) {
        return e;
      }
    }
    return -1;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 1 || isNaN(Number(e[0]))) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "武器替换界面聚焦引导ExtraParam参数配置错误", ["configParams", e]);
      }
    } else {
      var i = Number(e[0]);
      let t = undefined;
      for (let e = 0; e < this.ItemDataList.length; e++) {
        var r = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(this.ItemDataList[e]);
        if (r.ItemId === i && (t = e, r.RoleId !== this.RoleDataId)) {
          break;
        }
      }
      if (this.LoopScrollView.Iei !== -1) {
        this.LoopScrollView.ScrollToGridIndex(t);
      }
      e = this.LoopScrollView.GetGrid(t);
      if (e && t !== undefined) {
        return [e, e];
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "武器替换界面聚焦引导ExtraParam参数配置错误, 找不到道具", ["itemId", i]);
      }
    }
  }
}
exports.WeaponReplaceView = WeaponReplaceView;
//# sourceMappingURL=WeaponReplaceView.js.map