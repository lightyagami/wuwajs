"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MingSuView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MingSuController_1 = require("../MingSuController");
const MingSuDefine_1 = require("../MingSuDefine");
const CollectItemViewBase_1 = require("./CollectItemViewBase");
const CollectSmallItemGrid_1 = require("./CollectSmallItemGrid");
class MingSuView extends CollectItemViewBase_1.CollectItemViewBase {
  constructor() {
    super(...arguments);
    this.Nbi = undefined;
    this.kbi = 0;
    this.Fbi = undefined;
    this.Vbi = undefined;
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
    this.zbi = () => {
      --this.CurrentShowLevel;
      this.pO();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MingSuTi", 58, "当前等级: " + this.CurrentShowLevel.toString() + " left " + ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.PoolConfigId).toString());
      }
    };
    this.Zbi = () => {
      this.CurrentShowLevel += 1;
      this.pO();
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MingSuTi", 58, "当前等级: " + this.CurrentShowLevel.toString() + " right " + ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.PoolConfigId).toString());
      }
    };
    this.eqi = () => {
      var e;
      var t;
      if (!this.Kbi) {
        t = (e = ModelManager_1.ModelManager.MingSuModel).GetTargetDragonPoolLevelById(this.PoolConfigId);
        if (this.CurrentShowLevel === t + 1) {
          if (e.CheckUp(this.PoolConfigId)) {
            e.MingSuLastLevel = e.GetTargetDragonPoolLevelById(this.PoolConfigId);
            if (e.CanLevelUp(this.PoolConfigId)) {
              this.Kbi = true;
            }
            MingSuController_1.MingSuController.SendHandInMingSuRequest(this.PoolConfigId);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("MingSuTi", 58, "可以升级");
            }
          } else {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSubmitItemFail);
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("MingSuTi", 58, "不可升级!!!!");
            }
          }
        } else {
          this.$bi();
        }
      }
    };
    this.tqi = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(MingSuDefine_1.MING_SU_ITEM_CONFIG_ID);
    };
    this.Vgt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MingSuTi", 58, "创建鸣素体界面!!!!");
    }
    this.iqi();
  }
  OnBegined() {
    this.ChildPopView?.PopItem.OverrideBackBtnCallBack(() => {});
    this.SHe();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequencePurely("Show");
  }
  OnEnded() {
    if (this.Fbi) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Fbi);
      this.Fbi = undefined;
    }
    this.Vbi = undefined;
  }
  iqi() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIButtonComponent], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIText], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.zbi], [1, this.Zbi], [8, this.eqi], [12, this.tqi], [13, this.Vgt]];
  }
  SHe() {
    this.Vbi = this.GetSprite(2);
    this.pO();
  }
  oqi(e) {
    var t = this.GetText(3);
    var i = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    let s = e;
    if (s > i) {
      s = i;
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "MingSuLevelText", s);
    this.CurrentShowLevel = s;
    ModelManager_1.ModelManager.MingSuModel.CurrentPreviewLevel = this.CurrentShowLevel;
  }
  rqi() {
    var e = this.GetButton(0).RootUIComp;
    var t = this.GetButton(1).RootUIComp;
    (this.CurrentShowLevel === 1 ? (e.SetUIActive(false), t) : (this.CurrentShowLevel === ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.PoolConfigId) ? t.SetUIActive(false) : t.SetUIActive(true), e)).SetUIActive(true);
  }
  nqi() {
    var i = ModelManager_1.ModelManager.MingSuModel;
    var s = i.GetTargetDragonPoolLevelById(this.PoolConfigId);
    var h = i.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    var n = this.GetText(4);
    if (this.CurrentShowLevel === s + 1 || this.CurrentShowLevel === s && this.CurrentShowLevel === h) {
      let e = s;
      this.kbi = 1;
      if (i.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2) {
        this.kbi = 0;
      }
      if (s === h) {
        --e;
      }
      var h = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, e);
      let t = 0;
      var r = i.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2;
      var r = (t = r ? h : i.GetTargetDragonPoolCoreCountById(this.PoolConfigId)) / h;
      this.Vbi.SetFillAmount(r);
      n.SetText(t + "/" + h);
    } else if (this.CurrentShowLevel <= s) {
      this.kbi = 0;
      r = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, this.CurrentShowLevel - 1);
      n.SetText(r + "/" + r);
      this.Vbi.SetFillAmount(1);
    } else if (this.CurrentShowLevel > s + 1) {
      this.kbi = 2;
      h = i.GetTargetDragonPoolLevelNeedCoreById(this.PoolConfigId, this.CurrentShowLevel - 1);
      n.SetText("0/" + h);
      this.Vbi.SetFillAmount(0);
    }
  }
  jqe() {
    var e = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelRewardById(this.PoolConfigId, this.CurrentShowLevel - 1);
    var t = this.GetScrollViewWithScrollbar(5);
    this.Nbi ||= new GenericLayout_1.GenericLayout(t.GetContent().GetComponentByClass(UE.UILayoutBase.StaticClass()), this.d2t);
    this.Nbi.RefreshByData(e);
  }
  sqi() {
    var e = this.GetText(7);
    if (ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2) {
      this.kbi = 3;
    }
    if (this.kbi === 1) {
      e.SetUIActive(false);
    } else if (this.kbi === 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips");
      e.SetUIActive(true);
    } else if (this.kbi === 2) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuNotDoneTips");
      e.SetUIActive(true);
    } else if (this.kbi === 3) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "MingSuDoneTips");
      e.SetUIActive(true);
    }
  }
  aqi() {
    var e = this.GetText(9);
    var t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(this.PoolConfigId) === 2;
    this.GetItem(10).SetUIActive(!t);
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
    var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(MingSuDefine_1.MING_SU_ITEM_CONFIG_ID);
    this.GetText(11).SetText(e.toString());
  }
  $bi() {
    var e = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.PoolConfigId);
    var t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(this.PoolConfigId);
    this.CurrentShowLevel = t === e ? t : t + 1;
    this.pO();
  }
  pO() {
    this.oqi(this.CurrentShowLevel);
    this.rqi();
    this.nqi();
    this.jqe();
    this.sqi();
    this.aqi();
    this.Jbi();
  }
  OnUpdateDragonPoolView() {
    this.$bi();
  }
  OnSubmitItemLevelUp() {
    this.SetActive(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, true);
  }
  OnSubmitItemLevelMax() {
    this.SetActive(false);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, true);
  }
  OnSubmitItemLevelUpSequencePlayFail() {
    this.Kbi = false;
    this.SetActive(true);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
  }
  OnCollectItemCountChanged(e) {
    this.Jbi();
  }
  OnLevelMaxSequenceFinished() {
    this.SetActive(true);
    this.Kbi = false;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
  }
  OnLevelUpSequenceFinished() {
    this.SetActive(true);
    this.Kbi = false;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
  }
}
exports.MingSuView = MingSuView;
//# sourceMappingURL=MingSuView.js.map