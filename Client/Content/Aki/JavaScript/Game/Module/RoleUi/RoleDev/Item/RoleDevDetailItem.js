"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevDetailItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AdventureGuideController_1 = require("../../../AdventureGuide/AdventureGuideController");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDevDetailSubItemList_1 = require("./RoleDevDetailSubItemList");
class RoleDevDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.gnd = undefined;
    this.Pe = undefined;
    this.DLu = undefined;
    this.z4d = false;
    this.Nhd = () => new RoleDevDetailSubItemList_1.RoleDevDetailSubItemList();
    this.OnBtnTrack = () => {
      var e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetItemJumpGroupConfig(this.Pe?.ItemGroup[0].ItemId ?? 0);
      var t = e?.SpecialJumpGroup ?? 0;
      if (t > 0 && ModelManager_1.ModelManager.AdventureGuideModel.GetIsDetectionPreOpenByPreOpenId(t)) {
        this.oql(t);
      } else {
        t = e?.JumpGroup ?? [];
        e = RoleDevUtils_1.RoleDevUtils.GetFirstUnlockedTeleportId(t);
        this._xd(e);
        t = this.Pe?.ButtonType ?? -1;
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.Pe?.RoleId ?? 0, this.Pe?.MainPage ?? 0, t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    this.DLu = new ButtonItem_1.ButtonItem();
    await this.DLu.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  OnStart() {
    this.gnd = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.Nhd);
  }
  Refresh(e) {
    this.Pe = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title);
    var t = e.ItemGroup.map(e => RoleDevDetailSubItemList_1.RoleDevDetailSubItemList.CreateMaterialData(e.ItemId, e.RequiredCount));
    this.gnd?.RefreshByData(t);
    var t = t.every(e => e.RequiredCount <= (ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(e.ItemId) ?? 0));
    this.z4d = e.ItemGroup.some(e => e.ItemId === ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevStaticConfig()?.UnknownItemId);
    this.GetItem(6)?.SetUIActive(t && !this.z4d);
    this.DLu.SetUiActive(!this.z4d);
    this.DLu.SetLocalTextNew(this.z4d ? "RoleProject_Access_None" : "RoleProject_Button03");
    this.DLu?.SetFunction(this.OnBtnTrack);
    this.DLu?.SetEnableClick(this.J4d());
    this.GetItem(5)?.SetUIActive(this.z4d);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "RoleProject_Access_None");
    this.oKd(e);
  }
  oKd(e) {
    const t = ConfigManager_1.ConfigManager.RoleDevConfig;
    if (t) {
      const o = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevStaticConfig()?.UnknownItemId;
      var i;
      var e = e.ItemGroup.some(e => {
        return e.ItemId !== o && t.GetItemJumpGroupConfig(e.ItemId)?.ItemType === 5;
      });
      var r = this.GetText(1);
      if (e) {
        r?.SetUIActive(true);
        e = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(1);
        i = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(1);
        i = (e = e.MaxCount) - i;
        LguiUtil_1.LguiUtil.SetLocalText(r, AdventureGuideController_1.RECEIVED_COUNT, i + "/" + e);
      } else {
        r?.SetUIActive(false);
      }
    }
  }
  J4d() {
    if (this.Pe?.ItemGroup) {
      const t = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevStaticConfig()?.UnknownItemId;
      return !this.Pe.ItemGroup.some(e => e.ItemId === t);
    }
    return true;
  }
  _xd(e) {
    SkipTaskManager_1.SkipTaskManager.RunByConfigId(e, this.Pe?.ItemGroup[0].ItemId ?? 0);
  }
  oql(e) {
    var t;
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("CantUseInMultiplayerMode");
    } else if ((t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetPreOpenDetectionConfById(e)) !== undefined) {
      if (t.Spoiler) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(380)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.AdventureGuideController.HandlePreOpenDetectionByPreOpenId(e);
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        ControllerHolder_1.ControllerHolder.AdventureGuideController.HandlePreOpenDetectionByPreOpenId(e);
      }
    }
  }
}
exports.RoleDevDetailItem = RoleDevDetailItem;
//# sourceMappingURL=RoleDevDetailItem.js.map