"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LaHaiLuoCollectView = undefined;
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
class LaHaiLuoCollectView extends CollectItemViewBase_1.CollectItemViewBase {
  constructor() {
    super(...arguments);
    this.aPi = 0;
    this.Nbi = undefined;
    this.GAr = undefined;
    this.Kbi = false;
    this.b7m = undefined;
    this.R7m = new Map([[MingSuDefine_1.LAHAILUOSHENGXIA_POOL_CONFIG_ID, "NpcSystemBackground_10132_Title"], [MingSuDefine_1.RILINGCOLLECT_POOL_CONFIG_ID, "NpcSystemBackground_10133_Title"]]);
    this.d2t = () => {
      var i = new CollectSmallItemGrid_1.CollectSmallItemGrid();
      i.BindOnExtendToggleRelease(this.Qbi);
      i.BindOnCanExecuteChange(() => false);
      return i;
    };
    this.Qbi = i => {
      if (i.MediumItemGrid.IsHover) {
        i = i.Data;
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(i.ItemInfo.Id);
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
      var i;
      if (this.Kbi) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]当点击交付按钮时，在播放等级提升动画，不做任何响应", ["PoolConfigId", this.PoolConfigId]);
        }
      } else {
        i = this.b7m.GetTargetDragonPoolLevelById(this.PoolConfigId);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("NPC", 58, "[CollectionItemDisplay]当点击交付按钮时", ["CurrentShowLevel", this.CurrentShowLevel], ["dragonPoolLevel", i], ["PoolConfigId", this.PoolConfigId]);
        }
        if (this.CurrentShowLevel === i + 1) {
          if (this.b7m.CheckUp(this.PoolConfigId)) {
            this.b7m.MingSuLastLevel = this.b7m.GetTargetDragonPoolLevelById(this.PoolConfigId);
            if (this.b7m.CanLevelUp(this.PoolConfigId)) {
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
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIItem], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UIText], [17, UE.UISprite], [18, UE.UISprite], [19, UE.UIItem], [20, UE.UIItem]];
    this.BtnBindInfo = [[0, this.EVt], [1, this.IVt], [7, this.ZWi], [11, this.tqi], [12, this.Vgt]];
  }
  OnBegined() {
    this.Nbi = new GenericLayout_1.GenericLayout(this.GetItem(5).GetOwner().GetComponentByClass(UE.UILayoutBase.StaticClass()), this.d2t);
    this.GAr = this.GetSprite(2);
    this.b7m = ModelManager_1.ModelManager.MingSuModel;
    var i = this.GetText(16);
    var t = this.R7m.get(this.PoolConfigId);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
    }
    this.GetItem(19).SetUIActive(this.PoolConfigId === MingSuDefine_1.LAHAILUOSHENGXIA_POOL_CONFIG_ID);
    this.GetItem(20).SetUIActive(this.PoolConfigId === MingSuDefine_1.RILINGCOLLECT_POOL_CONFIG_ID);
    let e = "";
    let s = "";
    if (this.PoolConfigId === MingSuDefine_1.LAHAILUOSHENGXIA_POOL_CONFIG_ID) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ShengXiaIcon");
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("ShengXiaIcon2");
    } else if (this.PoolConfigId === MingSuDefine_1.RILINGCOLLECT_POOL_CONFIG_ID) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("RiLingIcon");
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("RiLingIcon2");
    }
    this.SetSpriteByPath(e, this.GetSprite(17), false);
    this.SetSpriteByPath(s, this.GetSprite(18), false);
    this.bl();
  }
  OnEnded() {
    this.Nbi = undefined;
    this.GAr = undefined;
    this.b7m = undefined;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExitNpcInteract);
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
  OnCollectItemCountChanged(i) {
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
    var i = this.b7m.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    var t = this.b7m.GetTargetDragonPoolLevelById(this.PoolConfigId);
    this.CurrentShowLevel = Math.min(i, t + 1);
    this.bl();
  }
  bl() {
    this.oqi(this.CurrentShowLevel);
    this.rqi();
    this.K0i();
    this.jqe();
    this.B5t();
    this.M3e();
    this.Jbi();
    this.BOt();
  }
  BOt() {
    var i = this.GetTexture(14);
    var t = this.GetTexture(15);
    var e = ConfigManager_1.ConfigManager.CollectItemConfig.GetDragonPoolConfigById(this.PoolConfigId);
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.CoreId);
    if (e) {
      this.SetTextureShowUntilLoaded(e.IconSmall, i);
      this.SetTextureShowUntilLoaded(e.IconSmall, t);
    }
  }
  oqi(i) {
    var t = this.GetText(3);
    var e = this.b7m.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    var e = Math.min(e, i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "PupuVillage_LevelText", e - 1, e);
    this.CurrentShowLevel = e;
    this.b7m.CurrentPreviewLevel = this.CurrentShowLevel;
  }
  rqi() {
    var i = this.GetButton(0).RootUIComp;
    var t = this.GetButton(1).RootUIComp;
    i.SetUIActive(this.CurrentShowLevel !== 1);
    t.SetUIActive(this.CurrentShowLevel !== this.b7m.GetTargetDragonPoolMaxLevelById(this.PoolConfigId));
  }
  K0i() {
    var e = this.b7m.GetTargetDragonPoolLevelById(this.PoolConfigId);
    var s = this.b7m.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    var h = this.GetText(4);
    var n = this.b7m.GetTargetDragonPoolActiveById(this.PoolConfigId);
    if (this.CurrentShowLevel === e + 1 || this.CurrentShowLevel === e && this.CurrentShowLevel === s) {
      let i = e;
      this.aPi = 1;
      if (n === 2) {
        this.aPi = 0;
      }
      if (e === s) {
        --i;
      }
      var s = this.b7m.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, i);
      let t = 0;
      var n = (t = n === 2 ? s : this.b7m.GetTargetDragonPoolCoreCountById(this.PoolConfigId)) / s;
      this.GAr.SetFillAmount(n);
      h.SetText(t + "/" + s);
    } else if (this.CurrentShowLevel <= e) {
      this.aPi = 0;
      n = this.b7m.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, this.CurrentShowLevel - 1);
      h.SetText(n + "/" + n);
      this.GAr.SetFillAmount(1);
    } else if (this.CurrentShowLevel > e + 1) {
      this.aPi = 2;
      s = this.b7m.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, this.CurrentShowLevel - 1);
      h.SetText("0/" + s);
      this.GAr.SetFillAmount(0);
    }
  }
  jqe() {
    var i = this.b7m.GetTargetDragonPoolLevelRewardById(this.PoolConfigId, this.CurrentShowLevel - 1);
    this.Nbi.RefreshByData(i);
  }
  B5t() {
    var i = this.GetText(6);
    if (this.b7m.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2) {
      this.aPi = 3;
    }
    if (this.aPi === 1) {
      i.SetUIActive(false);
    } else if (this.aPi === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, "MingSuDoneTips");
      i.SetUIActive(true);
    } else if (this.aPi === 2) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, "MingSuNotDoneTips");
      i.SetUIActive(true);
    } else if (this.aPi === 3) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, "MingSuDoneTips");
      i.SetUIActive(false);
    }
  }
  M3e() {
    var i = this.GetText(8);
    var t = this.b7m.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2;
    this.GetItem(9).SetUIActive(!t);
    this.GetItem(13).SetUIActive(t);
    if (!t) {
      t = this.b7m.GetTargetDragonPoolLevelById(this.PoolConfigId);
      if (this.CurrentShowLevel === t + 1) {
        LguiUtil_1.LguiUtil.SetLocalText(i, "MingSuTi_Text3");
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(i, "MingSuTi_Text4");
      }
    }
  }
  Jbi() {
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.CollectItemConfigId);
    this.GetText(10).SetText(i.toString());
  }
}
exports.LaHaiLuoCollectView = LaHaiLuoCollectView;
//# sourceMappingURL=LaHaiLuoCollectView.js.map