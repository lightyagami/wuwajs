"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoveryResultView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const ItemController_1 = require("../../../Item/ItemController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem");
const VisionRecoverySlotPanel_1 = require("./VisionRecoverySlotPanel");
class VisionRecoveryResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Xvt = undefined;
    this.$vt = undefined;
    this.Yvt = [];
    this.Jvt = () => {
      this.CloseMe();
    };
    this.zvt = (e, i) => {
      if (i !== undefined) {
        ItemController_1.ItemController.OpenItemTipsByItemUid(i.GetUniqueId(), i.GetConfigId());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e === undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Calabash", 58, "VisionRecoveryResultView responseData为空");
      }
    } else {
      this.Xvt = new VisionRecoverySlotPanel_1.VisionRecoverySlotPanel(undefined, false);
      await this.Xvt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
      this.$vt = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(this.zvt, false);
      await this.$vt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
      this.Zvt(e.OBs);
      this.eMt(e.bMs);
      if (e instanceof Protocol_1.Aki.Protocol.Ols) {
        await this.tMt(e.GBs);
        this.iMt(e.GBs);
      } else {
        this.GetItem(2).SetUIActive(false);
      }
    }
  }
  Zvt(e) {
    e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByPhantomItem(e);
    this.Xvt.RefreshUi(e);
  }
  eMt(e) {
    e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(e);
    if (e.length <= 0) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Calabash", 58, "VisionRecoveryResultView 主奖励为空");
      }
    } else {
      this.$vt.RefreshUi(e[0]);
    }
  }
  async tMt(e) {
    var i = this.GetItem(2);
    if (e.length <= 0) {
      i.SetUIActive(false);
    } else {
      const t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataListByAddCountItemInfo(e);
      if (t.length <= 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Calabash", 58, "VisionRecoveryResultView 次奖励转换失败，返回空");
        }
        i.SetUIActive(false);
      } else {
        i.SetUIActive(true);
        const o = this.GetItem(3);
        const r = this.GetItem(4);
        const s = new Array();
        t.forEach(() => {
          var e = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(this.zvt, false);
          var i = LguiUtil_1.LguiUtil.CopyItem(r, o);
          s.push(e.CreateThenShowByActorAsync(i.GetOwner()));
          this.Yvt.push(e);
        });
        await Promise.all(s);
        this.Yvt.forEach((e, i) => {
          e.RefreshUi(t[i]);
        });
        r.SetUIActive(false);
      }
    }
  }
  iMt(e) {
    if (!(e.length <= 0)) {
      this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
        ControllerHolder_1.ControllerHolder.UiNavigationNewController.RepeatCursorMove();
        switch (e.length) {
          case 1:
            this.UiViewSequence.PlaySequence("RewardA");
            break;
          case 2:
            this.UiViewSequence.PlaySequence("RewardB");
            break;
          case 3:
            this.UiViewSequence.PlaySequence("RewardC");
            break;
          default:
            this.UiViewSequence.PlaySequence("RewardD");
        }
      });
    }
  }
}
exports.VisionRecoveryResultView = VisionRecoveryResultView;
//# sourceMappingURL=VisionRecoveryResultView.js.map