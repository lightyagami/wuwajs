"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PupuVillageItemView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MingSuController_1 = require("../MingSuController");
const MingSuDefine_1 = require("../MingSuDefine");
const CollectItemViewBase_1 = require("./CollectItemViewBase");
const CollectSmallItemGrid_1 = require("./CollectSmallItemGrid");
class PupuVillageItemView extends CollectItemViewBase_1.CollectItemViewBase {
  constructor() {
    super(...arguments);
    this.aPi = 0;
    this.Nbi = undefined;
    this.GAr = undefined;
    this.Kbi = false;
    this.d2t = () => {
      var e = new CollectSmallItemGrid_1.CollectSmallItemGrid();
      e.BindOnExtendToggleRelease(this.Qbi);
      e.BindOnCanExecuteChange(() => false);
      return e;
    };
    this.Qbi = e => {
      if (e.MediumItemGrid.IsHover) {
        e = e.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(e.ItemInfo.Id);
      }
    };
    this.EVt = () => {
      this.CurrentShowLevel--;
      this.bl();
    };
    this.IVt = () => {
      this.CurrentShowLevel++;
      this.bl();
    };
    this.ZWi = () => {
      var e;
      var t;
      if (this.Kbi) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]当点击交付按钮时，在播放等级提升动画，不做任何响应", ["PoolConfigId", this.PoolConfigId]);
        }
      } else {
        t = (e = ModelManager_1.ModelManager.MingSuModel).GetTargetDragonPoolLevelById(this.PoolConfigId);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]当点击交付按钮时", ["CurrentShowLevel", this.CurrentShowLevel], ["dragonPoolLevel", t], ["PoolConfigId", this.PoolConfigId]);
        }
        if (this.CurrentShowLevel === t + 1) {
          if (e.CheckUp(this.PoolConfigId)) {
            e.MingSuLastLevel = e.GetTargetDragonPoolLevelById(this.PoolConfigId);
            if (e.CanLevelUp(this.PoolConfigId)) {
              if (Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]提交声匣之后，等级提升会播放等级提升Sequence，IsInLevelUpDisplay设置为true");
              }
              this.Kbi = true;
            }
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]提交声匣之后，隐藏界面并发送给服务端", ["PoolConfigId", this.PoolConfigId]);
            }
            MingSuController_1.MingSuController.SendHandInMingSuRequest(this.PoolConfigId);
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]当点击交付按钮时,当前经验无法升级，不会播放提交道具表现");
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubmitItemFail);
          }
        } else {
          this.NAr();
        }
      }
    };
    this.tqi = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.CollectItemConfigId);
    };
    this.Vgt = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExitNpcInteract);
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UIText]];
    this.BtnBindInfo = [[0, this.EVt], [1, this.IVt], [7, this.ZWi], [11, this.tqi], [12, this.Vgt]];
  }
  OnBegined() {
    var e = this.GetItem(5);
    this.Nbi = new GenericLayout_1.GenericLayout(e.GetOwner().GetComponentByClass(UE.UILayoutBase.StaticClass()), this.d2t);
    this.GAr = this.GetSprite(2);
    if (this.PoolConfigId === MingSuDefine_1.PUPU_VILLAGE_QIQIU_POOL_CONFIG_ID) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), "NpcSystemBackground_1010_Title");
    }
    this.bl();
  }
  OnEnded() {
    this.Nbi = undefined;
    this.GAr = undefined;
  }
  OnUpdateDragonPoolView() {
    this.NAr();
  }
  OnSubmitItemLevelUp() {
    this.SetActive(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, true);
  }
  OnSubmitItemLevelMax() {
    this.SetActive(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, true);
  }
  OnLevelUpSequenceFinished() {
    this.SetActive(true);
    this.Kbi = false;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
  }
  OnLevelMaxSequenceFinished() {
    this.CloseMe();
  }
  OnSubmitItemLevelUpSequencePlayFail() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]当交付等级提升Sequence播放失败时，重新显示提交道具界面");
    }
    this.Kbi = false;
    this.SetActive(true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
  }
  OnCollectItemCountChanged(e) {
    this.Jbi();
  }
  OnCloseRewardView() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]当关闭了交付奖励结算界面时，重新显示提交道具界面");
    }
    this.Kbi = false;
    this.SetActive(true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
  }
  NAr() {
    var e = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    var t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(this.PoolConfigId);
    this.CurrentShowLevel = Math.min(e, t + 1);
    this.bl();
  }
  bl() {
    this.oqi(this.CurrentShowLevel);
    this.rqi();
    this.K0i();
    this.jqe();
    this.sqi();
    this.M3e();
    this.Jbi();
    this.BOt();
  }
  BOt() {
    var e = this.GetTexture(14);
    var t = this.GetTexture(15);
    var i = ConfigManager_1.ConfigManager.CollectItemConfig.GetDragonPoolConfigById(this.PoolConfigId);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(i.CoreId);
    if (i) {
      this.SetTextureShowUntilLoaded(i.IconSmall, e);
      this.SetTextureShowUntilLoaded(i.IconSmall, t);
    }
  }
  oqi(e) {
    var t = this.GetText(3);
    var i = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    var i = Math.min(i, e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "PupuVillage_LevelText", i - 1, i);
    this.CurrentShowLevel = i;
    ModelManager_1.ModelManager.MingSuModel.CurrentPreviewLevel = this.CurrentShowLevel;
  }
  rqi() {
    var e = this.GetButton(0);
    var t = this.GetButton(1);
    (this.CurrentShowLevel === 1 ? (e.RootUIComp.SetUIActive(false), t) : (this.CurrentShowLevel === ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.PoolConfigId) ? t.RootUIComp.SetUIActive(false) : t.RootUIComp.SetUIActive(true), e)).RootUIComp.SetUIActive(true);
  }
  K0i() {
    var i = ModelManager_1.ModelManager.MingSuModel;
    var s = i.GetTargetDragonPoolLevelById(this.PoolConfigId);
    var h = i.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    var n = this.GetText(4);
    var o = i.GetTargetDragonPoolActiveById(this.PoolConfigId);
    if (this.CurrentShowLevel === s + 1 || this.CurrentShowLevel === s && this.CurrentShowLevel === h) {
      let e = s;
      this.aPi = 1;
      if (o === 2) {
        this.aPi = 0;
      }
      if (s === h) {
        --e;
      }
      var h = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, e);
      let t = 0;
      var o = (t = o === 2 ? h : i.GetTargetDragonPoolCoreCountById(this.PoolConfigId)) / h;
      this.GAr.SetFillAmount(o);
      n.SetText(t + "/" + h);
    } else if (this.CurrentShowLevel <= s) {
      this.aPi = 0;
      o = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, this.CurrentShowLevel - 1);
      n.SetText(o + "/" + o);
      this.GAr.SetFillAmount(1);
    } else if (this.CurrentShowLevel > s + 1) {
      this.aPi = 2;
      h = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, this.CurrentShowLevel - 1);
      n.SetText("0/" + h);
      this.GAr.SetFillAmount(0);
    }
  }
  jqe() {
    var e = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelRewardById(this.PoolConfigId, this.CurrentShowLevel - 1);
    this.Nbi.RefreshByData(e);
  }
  sqi() {
    var e = this.GetText(6);
    if (ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2) {
      this.aPi = 3;
    }
    if (this.aPi === 1) {
      e.SetUIActive(false);
    } else if (this.aPi === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips");
      e.SetUIActive(true);
    } else if (this.aPi === 2) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuNotDoneTips");
      e.SetUIActive(true);
    } else if (this.aPi === 3) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips");
      e.SetUIActive(false);
    }
  }
  M3e() {
    var e = this.GetText(8);
    var t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2;
    this.GetItem(9).SetUIActive(!t);
    this.GetItem(13).SetUIActive(t);
    if (!t) {
      t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(this.PoolConfigId);
      if (this.CurrentShowLevel === t + 1) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "MingSuTi_Text3");
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(e, "MingSuTi_Text4");
      }
    }
  }
  Jbi() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.CollectItemConfigId);
    this.GetText(10).SetText(e.toString());
  }
}
exports.PupuVillageItemView = PupuVillageItemView;
//# sourceMappingURL=PupuVillageCollectView.js.map