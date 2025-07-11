"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ShareRewardById_1 = require("../../../../Core/Define/ConfigQuery/ShareRewardById");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const BlackScreenController_1 = require("../../BlackScreen/BlackScreenController");
const ChannelController_1 = require("../../Channel/ChannelController");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const ShareRewardInfo_1 = require("../../Photograph/View/ShareRewardInfo");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GachaSceneView_1 = require("../GachaUiSceneManager/GachaSceneView");
const GachaMultipleResultItem_1 = require("./GachaMultipleResultItem");
const GachaResultItemNew_1 = require("./GachaResultItemNew");
class GachaResultView extends GachaSceneView_1.GachaSceneView {
  constructor() {
    super(...arguments);
    this.wWt = false;
    this.BWt = undefined;
    this.bWt = undefined;
    this.qWt = undefined;
    this.GWt = undefined;
    this.NWt = undefined;
    this.OWt = () => {
      if (ChannelController_1.ChannelController.CouldShare()) {
        var a = ModelManager_1.ModelManager.GachaModel.CurGachaResult;
        let e = 0;
        if (a.length === 1) {
          if (this.GetItemQuality(a[0].e9n.L8n) < 5) {
            return;
          }
          e = ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(a[0].e9n.L8n) === 2 ? 4 : 3;
        } else {
          e = 5;
        }
        this.GetButton(6).RootUIComp.SetUIActive(true);
        var a = ShareRewardById_1.configShareRewardById.GetConfig(e);
        var t = ModelManager_1.ModelManager.ChannelModel.CouldGetShareReward(e);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Gacha", 27, "刷新分享按钮", ["showShareReward", t]);
        }
        this.GetItem(7).SetUIActive(t);
        if (t) {
          t = [...a.Reward][0];
          this.NWt?.SetItemInfo(t[0], t[1]);
        }
      }
    };
    this.kWt = () => {
      if (UiManager_1.UiManager.IsViewHide("GachaScanView") || UiManager_1.UiManager.IsViewHide("DrawMainView")) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Gacha", 34, "点击过快，之前界面仍未关闭");
        }
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CloseGachaSceneView);
      }
    };
    this.FWt = () => {
      ChannelController_1.ChannelController.ShareGacha(ModelManager_1.ModelManager.GachaModel.CurGachaResult);
    };
    this.VWt = (e, a) => {
      var e = e[0].ItemId;
      var a = a[0].ItemId;
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e)?.QualityId;
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(a)?.QualityId;
      if (t === r) {
        return e - a;
      } else {
        return r - t;
      }
    };
    this.HWt = () => new GachaResultItemNew_1.GachaResultItemNew();
    this.jWt = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [4, UE.UIButtonComponent], [1, UE.UIGridLayout], [5, UE.UIItem], [2, UE.UIItem], [3, UE.UIGridLayout], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[4, this.kWt], [6, this.FWt]];
  }
  OnAfterInitComponentsData() {
    var e = this.OpenParam;
    this.wWt = e?.ResultViewHideExtraReward;
  }
  async OnBeforeStartAsync() {
    var e;
    var a = ModelManager_1.ModelManager.GachaModel.CurGachaResult;
    if (a && a.length !== 0) {
      this.qWt = new GenericLayout_1.GenericLayout(this.GetGridLayout(1), this.jWt);
      this.GWt = new GenericLayout_1.GenericLayout(this.GetGridLayout(3), this.jWt);
      this.NWt = new ShareRewardInfo_1.ShareRewardInfo();
      e = [this.NWt.OnlyCreateByActorAsync(this.GetItem(8).GetOwner())];
      if (a.length === 1) {
        e.push(this.WWt(a[0]));
      } else {
        e.push(this.HandleMultiGacha(a));
      }
      await Promise.all(e);
      this.AddChild(this.NWt);
      this.GetButton(6)?.RootUIComp.SetUIActive(false);
      this.GetItem(7)?.SetUIActive(false);
    }
  }
  OnBeforeShow() {
    BlackScreenController_1.BlackScreenController.RemoveBlackScreen("Close", "GachaSkip");
    this.OWt();
  }
  OnAfterShow() {
    ControllerHolder_1.ControllerHolder.KuroSdkController.TryOpenReview();
  }
  OnBeforeDestroy() {
    CameraController_1.CameraController.SetViewTarget(UiCameraAnimationManager_1.UiCameraAnimationManager.UiCamera?.GetCameraActor(), "GachaResultView.OnBeforeDestroy");
  }
  AfterAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFirstShare, this.OWt);
  }
  AfterRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFirstShare, this.OWt);
  }
  KWt(e) {
    if (e && e.length > 0 && !this.wWt) {
      this.GetItem(0).SetUIActive(true);
      this.qWt.RefreshByData(e);
    } else {
      this.GetItem(0).SetUIActive(false);
    }
  }
  QWt(e) {
    if (e && e.length > 0 && !this.wWt) {
      this.GetItem(2).SetUIActive(true);
      this.GWt.RefreshByData(e);
    } else {
      this.GetItem(2).SetUIActive(false);
    }
  }
  async HandleMultiGacha(e) {
    var a = new GachaMultipleResultItem_1.GachaMultipleResultItem();
    await a.CreateThenShowByResourceIdAsync("UiItem_MultiGacha", this.GetItem(5));
    var a = a.GetGachaResultItemLayout();
    this.bWt = new GenericLayout_1.GenericLayout(a, this.HWt);
    var t = new Map();
    var r = new Map();
    for (const o of e) {
      if (o.a9n) {
        this.XWt(o.a9n, t);
      }
      var i = o.l9n;
      if (i && i.L8n > 0 && i.n9n > 0) {
        this.$Wt(i, r);
      }
    }
    a = this.YWt(t);
    this.KWt(a);
    a = this.YWt(r);
    this.QWt(a);
    const n = e => {
      switch (e) {
        case 1:
          return 2;
        case 2:
          return 1;
        default:
          return 0;
      }
    };
    a = [...e];
    a.sort((e, a) => {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e.e9n.L8n)?.QualityId ?? 0;
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(a.e9n.L8n)?.QualityId ?? 0;
      if (t === r) {
        e = n(ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e.e9n.L8n));
        return n(ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(a.e9n.L8n)) - e;
      } else {
        return r - t;
      }
    });
    await this.bWt.RefreshByDataAsync(a);
  }
  async WWt(e) {
    var a = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_SingleGacha", this.GetItem(5));
    this.BWt = new GachaResultItemNew_1.GachaResultItemNew();
    await this.BWt.CreateThenShowByActorAsync(a);
    this.BWt.Update(e);
    var a = new Map();
    var t = new Map();
    if (e.a9n) {
      this.XWt(e.a9n, a);
    }
    var e = e.l9n;
    if (e && e.L8n > 0 && e.n9n > 0) {
      this.$Wt(e, t);
    }
    var e = this.YWt(a);
    this.KWt(e);
    var a = this.YWt(t);
    this.QWt(a);
  }
  XWt(e, a) {
    for (const t of e) {
      this.$Wt(t, a);
    }
  }
  $Wt(e, a) {
    a.set(e.L8n, (e.n9n ?? 0) + (a.get(e.L8n) ?? 0));
  }
  YWt(e) {
    if (e && e.size !== 0) {
      const t = new Array();
      e.forEach((e, a) => {
        a = [{
          IncId: 0,
          ItemId: a
        }, e];
        t.push(a);
      });
      t.sort(this.VWt);
      return t;
    }
  }
  GetItemQuality(e) {
    let a = 0;
    switch (ConfigManager_1.ConfigManager.GachaConfig.GetItemIdType(e)) {
      case 1:
        a = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e).QualityId;
        break;
      case 2:
        a = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e)?.QualityId;
    }
    return a;
  }
}
exports.GachaResultView = GachaResultView;
//# sourceMappingURL=GachaResultView.js.map