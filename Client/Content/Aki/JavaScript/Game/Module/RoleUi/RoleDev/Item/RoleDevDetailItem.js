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
const InstanceDungeonController_1 = require("../../../InstanceDungeon/InstanceDungeonController");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapController_1 = require("../../../WorldMap/WorldMapController");
const RoleDevUtils_1 = require("../RoleDevUtils");
const RoleDevDetailSubItemList_1 = require("./RoleDevDetailSubItemList");
class RoleDevDetailItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.bad = undefined;
    this.Pe = undefined;
    this.DLu = undefined;
    this.Xqd = false;
    this.Rad = () => new RoleDevDetailSubItemList_1.RoleDevDetailSubItemList();
    this.OnBtnTrack = () => {
      var e = ConfigManager_1.ConfigManager.RoleDevConfig?.GetItemJumpGroupConfig(this.Pe?.ItemGroup[0].ItemId ?? 0);
      var t = e?.SpecialJumpGroup ?? 0;
      if (t > 0) {
        this.oql(t);
      } else {
        t = e?.JumpGroup ?? [];
        e = RoleDevUtils_1.RoleDevUtils.GetFirstUnlockedTeleportId(t);
        this.VPd(e);
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
    this.bad = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.Rad);
  }
  Refresh(e) {
    this.Pe = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.Title);
    var t = e.ItemGroup.map(e => RoleDevDetailSubItemList_1.RoleDevDetailSubItemList.CreateMaterialData(e.ItemId, e.RequiredCount));
    this.bad?.RefreshByData(t);
    var t = t.every(e => e.RequiredCount <= (ModelManager_1.ModelManager.InventoryModel?.GetItemCountByConfigId(e.ItemId) ?? 0));
    this.Xqd = e.ItemGroup.some(e => e.ItemId === ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevStaticConfig()?.UnknownItemId);
    this.GetItem(6)?.SetUIActive(t && !this.Xqd);
    this.DLu.SetUiActive(!this.Xqd);
    this.DLu.SetLocalTextNew(this.Xqd ? "RoleProject_Access_None" : "RoleProject_Button03");
    this.DLu?.SetFunction(this.OnBtnTrack);
    this.DLu?.SetEnableClick(this.Yqd());
    this.GetItem(5)?.SetUIActive(this.Xqd);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "RoleProject_Access_None");
    this.e6d(e);
  }
  e6d(e) {
    const t = ConfigManager_1.ConfigManager.RoleDevConfig;
    if (t) {
      const o = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevStaticConfig()?.UnknownItemId;
      var r;
      var e = e.ItemGroup.some(e => {
        return e.ItemId !== o && t.GetItemJumpGroupConfig(e.ItemId)?.ItemType === 5;
      });
      var i = this.GetText(1);
      if (e) {
        i?.SetUIActive(true);
        e = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeShareConfig(1);
        r = ModelManager_1.ModelManager.ExchangeRewardModel.GetExchangeRewardShareCount(1);
        r = (e = e.MaxCount) - r;
        LguiUtil_1.LguiUtil.SetLocalText(i, AdventureGuideController_1.RECEIVED_COUNT, r + "/" + e);
      } else {
        i?.SetUIActive(false);
      }
    }
  }
  Yqd() {
    if (this.Pe?.ItemGroup) {
      const t = ConfigManager_1.ConfigManager.RoleDevConfig.GetRoleDevStaticConfig()?.UnknownItemId;
      return !this.Pe.ItemGroup.some(e => e.ItemId === t);
    }
    return true;
  }
  VPd(e) {
    SkipTaskManager_1.SkipTaskManager.RunByConfigId(e, this.Pe?.ItemGroup[0].ItemId ?? 0);
  }
  oql(n) {
    if (ModelManager_1.ModelManager.OnlineModel.GetIsTeamModel()) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("CantUseInMultiplayerMode");
    } else {
      let o = false;
      var a = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetPreOpenDetectionConfById(n);
      if (a !== undefined) {
        let e = undefined;
        let t = 0;
        let r = 0;
        let i = 0;
        i = (a.SoundAreaType === 0 ? (a = ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(n), t = a.Conf.Id, r = 0, a) : (a = ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(n), t = a.Conf.Id, r = 1, a)).Conf.PreOpenId;
        e = ModelManager_1.ModelManager.AdventureGuideModel.GetPreOpenDetectionConf(t, r, i);
        if (o = e ? e.Spoiler : o) {
          (n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(380)).FunctionMap.set(2, () => {
            this.nql(t, r, i);
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(n);
        } else {
          this.nql(t, r, i);
        }
      }
    }
  }
  nql(e, t, r) {
    e = ModelManager_1.ModelManager.AdventureGuideModel.GetPreOpenDetectionConf(e, t, r);
    t = e.TeleportEntityId;
    if (t) {
      WorldMapController_1.WorldMapController.TryTeleport(t);
    } else {
      r = e.DungeonEntranceId;
      if (r) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(r);
      } else {
        t = e.InstanceID;
        if (t) {
          var r = {
            v9n: e.Id
          };
          ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.m1c = r;
          var i = [];
          for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
            i.push(o.GetConfigId);
          }
          InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(t, i, 0, 0);
        }
      }
    }
  }
}
exports.RoleDevDetailItem = RoleDevDetailItem;
//# sourceMappingURL=RoleDevDetailItem.js.map