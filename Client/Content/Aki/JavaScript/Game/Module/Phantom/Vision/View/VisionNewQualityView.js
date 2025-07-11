"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionNewQualityView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase");
const GameModeController_1 = require("../../../../World/Controller/GameModeController");
const CalabashController_1 = require("../../../Calabash/CalabashController");
const SmallItemGrid_1 = require("../../../Common/SmallItemGrid/SmallItemGrid");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class VisionNewQualityView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.GMt = 0;
    this.NMt = undefined;
    this.sft = undefined;
    this.eGe = undefined;
    this.jji = undefined;
    this.sGe = () => new QualityStarItem();
    this.FMt = () => {
      var e;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Calabash", 27, "跳转到鸣域终端收集页签", ["目标幻象Id", this.NMt.PhantomItem.MonsterId]);
      }
      this.CloseViewOrShowNextData();
      if (this.jji.SkinId === 0) {
        CalabashController_1.CalabashController.JumpToCalabashCollectTabView(this.NMt.PhantomItem.MonsterId);
      } else {
        e = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinMonsterIdMapByMonsterId(this.NMt.PhantomItem.MonsterId);
        CalabashController_1.CalabashController.JumpToCalabashCollectTabView(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIHorizontalLayout], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [8, UE.UIItem], [9, UE.UIText]];
    this.BtnBindInfo = [[2, this.FMt]];
  }
  OnBeforeCreate() {
    this.jji = this.OpenParam;
    this.NMt = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(this.jji.MonsterItemId);
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.sGe);
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(1).GetOwner());
    this.GetText(4).SetUIActive(!GameModeController_1.GameModeController.IsInInstance());
    this.GetButton(2).RootUIComp.SetRaycastTarget(!GameModeController_1.GameModeController.IsInInstance());
    this.kJs();
  }
  OnBeforeShow() {
    this.Og();
  }
  Refresh() {
    this.jji = ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.shift();
    this.NMt = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(this.jji.MonsterItemId);
    this.Og();
  }
  kJs() {
    this.GetText(0)?.SetUIActive(false);
    this.GetText(9)?.SetUIActive(false);
  }
  Og() {
    this.kJs();
    this.FJs()?.SetUIActive(true);
    var e = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(this.NMt.PhantomItem.MonsterId);
    var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(e.MonsterInfoId);
    this.GMt = ConfigManager_1.ConfigManager.CalabashConfig.MaxTipCd;
    this.FJs().ShowTextNew(e.Name);
    var e = {
      Data: this.NMt.PhantomItem.ItemId,
      Type: 4,
      ItemConfigId: this.NMt.PhantomItem.ItemId,
      IconPath: e.Icon
    };
    this.sft.Apply(e);
    this.aqe();
    this.HMt();
    this.GJs();
    this.VJs();
    this.HJs();
  }
  FJs() {
    var e = this.jji.SkinId === 0 ? 0 : 9;
    return this.GetText(e);
  }
  HJs() {
    var e = this.jji.SkinId === 0;
    this.GetItem(7)?.SetUIActive(e);
  }
  VJs() {
    var e = this.jji.SkinId !== 0;
    this.GetItem(8)?.SetUIActive(e);
  }
  HMt() {
    var e;
    if (this.jji.SkinId === 0) {
      e = this.jji.UnlockQuality;
      e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(e).DropColor;
      this.FJs().SetColor(UE.Color.FromHex(e));
    }
  }
  aqe() {
    var e = this.jji.SkinId === 0;
    this.eGe?.SetActive(e);
    this.GetItem(5)?.SetUIActive(e);
    var i = this.jji.UnlockQuality;
    var t = new Array();
    for (let e = 0; e < i - 1; e++) {
      t.push(e);
    }
    this.eGe?.RefreshByData(t);
  }
  GJs() {
    var e = this.jji.SkinId === 0 ? "UnLockNewVisionQuality" : "UnLockNewVisionSkin";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e);
  }
  CloseViewOrShowNextData() {
    if (ModelManager_1.ModelManager.PhantomBattleModel.QualityUnlockTipsList.length > 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Calabash", 27, "刷新下个声骸数据");
      }
      this.Refresh();
      this.UiViewSequence?.PlaySequence("Start");
    } else {
      this.CloseMe();
    }
  }
  OnTick(e) {
    if (!(this.GMt <= 0)) {
      this.GMt -= e;
      if (this.GMt <= 0) {
        this.CloseViewOrShowNextData();
      }
    }
  }
}
exports.VisionNewQualityView = VisionNewQualityView;
class QualityStarItem extends GridProxyAbstract_1.GridProxyAbstract {
  Refresh(e, i, t) {}
}
//# sourceMappingURL=VisionNewQualityView.js.map