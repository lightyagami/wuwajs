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
    this.dmo = undefined;
    this.W7t = () => {
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.RoleDataId).GetRoleId();
      var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e);
      var e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(e);
      this.dmo.Model?.CheckGetComponent(17)?.SetWeaponByWeaponData(i, e);
      this.CloseMe();
    };
    this.hko = () => {
      this.SetContrast();
    };
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
    this.Lke = (e, i) => {
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
      var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
      var e = {
        WeaponIncId: e,
        WeaponSkinId: ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(i.GetRoleId()),
        IsFromRoleRootView: true
      };
      UiManager_1.UiManager.OpenView("WeaponRootView", e);
      WeaponController_1.WeaponController.RoleFadeIn(UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor());
    };
    this.cko = e => {
      var i;
      var t = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(this.RoleDataId);
      var r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
      const n = t.GetRoleId();
      if (r.HasRole()) {
        t = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponName(r.GetWeaponConfig().WeaponName);
        r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r.GetRoleId()).GetName();
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(22)).SetTextArgs(t, r);
        i.FunctionMap.set(2, () => {
          WeaponController_1.WeaponController.SendPbEquipTakeOnRequest(n, WeaponDefine_1.WEAPON_EQUIPTYPE, e);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else {
        t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(206);
        if (ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem?.GetConfigId === n && t?.Valid && t.HasTag(202314845)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TagCantSwitchWeapon");
        } else {
          WeaponController_1.WeaponController.SendPbEquipTakeOnRequest(n, WeaponDefine_1.WEAPON_EQUIPTYPE, e);
        }
      }
    };
    this.mko = () => {
      this.UpdateCurrentTips();
      this.UpdateSelectedTips(this.SelectedIncId);
      this.RefreshPropItem();
    };
    this.dko = (e, i) => {
      if (this.sko.GetWeaponIncId() === e) {
        this.sko.UpdateWeaponLock(i);
      }
      if (this.nko.GetWeaponIncId() === e) {
        this.nko.UpdateWeaponLock(i);
      }
      this.RefreshPropItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[1, this.W7t], [4, this.hko]];
  }
  async OnBeforeStartAsync() {
    this.nko = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent();
    await this.nko.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.sko = new WeaponDetailTipsComponent_1.WeaponDetailTipsComponent();
    await this.sko.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    var e = this.OpenParam;
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 58, "WeaponReplaceView界面输入为空");
      }
    } else {
      this.SelectedIncId = e.WeaponIncId;
      this.RoleDataId = e.RoleId;
      this.dmo = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      e = this.GetItem(6).GetOwner();
      this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), e, this._ko);
      this.nko.SetReplaceFunction(this.cko);
      this.nko.SetCultureFunction(this.uko);
      this.nko.SetCanShowEquip(true);
      this.sko.SetCanShowEquip(true);
      this.sko.SetCanShowLock(false);
      this.SortComponent = new SortEntrance_1.SortEntrance(this.GetItem(5), this.UpdateList);
    }
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
    var i = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.SelectedIncId);
    if (i !== undefined) {
      e = i.GetWeaponConfig();
      this.ItemDataList = ModelManager_1.ModelManager.WeaponModel.GetWeaponListFromReplace(e.WeaponType);
      this.SortComponent.UpdateData(3, this.ItemDataList);
      this.SelectedIncId = 0;
      this.SelectedWeaponHandle(i.GetIncId(), true);
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
  OnBeforeDestroy() {
    this.nko.Destroy();
    this.sko.Destroy();
    this.SortComponent.Destroy();
  }
  RefreshPropItem() {
    this.LoopScrollView.RefreshAllGridProxies();
  }
  SetWeaponTipsRootItemState(e) {
    this.UiViewSequence.StopSequenceByKey("TipStart");
    this.UiViewSequence.StopSequenceByKey("TipClose");
    this.UiViewSequence.PlaySequence(e ? "TipStart" : "TipClose");
  }
  SelectedWeaponHandle(i, t = false) {
    if (this.SelectedIncId !== i) {
      this.UpdateSelectedTips(i);
      var r = this.GetWeaponItemIndex(i);
      if (!(r < 0)) {
        this.LoopScrollView.SelectGridProxy(r, t);
        this.SelectedIncId = i;
        r = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(i);
        let e = WeaponSkinDefine_1.WEAPON_SKIN_DEFAULT_ID;
        if (r.GetRoleId() === this.RoleDataId) {
          e = ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(this.RoleDataId);
        }
        this.dmo.Model?.CheckGetComponent(17)?.SetWeaponByWeaponData(r, e);
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
  GetWeaponItemIndex(i) {
    for (let e = 0; e < this.ItemDataList.length; e++) {
      if (this.ItemDataList[e].GetUniqueId() === i) {
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
      var t = Number(e[0]);
      let i = undefined;
      for (let e = 0; e < this.ItemDataList.length; e++) {
        var r = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(this.ItemDataList[e]);
        if (r.ItemId === t && (i = e, r.RoleId !== this.RoleDataId)) {
          break;
        }
      }
      if (this.LoopScrollView.Iei !== -1) {
        this.LoopScrollView.ScrollToGridIndex(i);
      }
      e = this.LoopScrollView.GetGrid(i);
      if (e && i !== undefined) {
        return [e, e];
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "武器替换界面聚焦引导ExtraParam参数配置错误, 找不到道具", ["itemId", t]);
      }
    }
  }
}
exports.WeaponReplaceView = WeaponReplaceView;
//# sourceMappingURL=WeaponReplaceView.js.map