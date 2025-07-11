"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DarkCoastDeliveryMainView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const HelpController_1 = require("../../Help/HelpController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const DarkCoastDeliveryLevelUpViewData_1 = require("../DarkCoastDeliveryLevelUpViewData");
const MingSuController_1 = require("../MingSuController");
const MingSuDefine_1 = require("../MingSuDefine");
const DarkCoastDeliveryLevelItem_1 = require("./DarkCoastDeliveryLevelItem");
const DarkCoastDeliveryTipPanel_1 = require("./DarkCoastDeliveryTipPanel");
const LINE_START_INDEX = 1;
const LINE_COUNT = 6;
const ITEM_START_INDEX = 13;
const ITEM_COUNT = 5;
const LEVEL_ITEM_SHOW_DELAY = 300;
class DarkCoastDeliveryMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.TQa = undefined;
    this.LQa = undefined;
    this.AQa = [];
    this.DQa = [];
    this.RQa = [];
    this.lqe = undefined;
    this.eho = undefined;
    this.UQa = 0;
    this.Jvt = () => {
      this.CloseMe();
    };
    this.pcr = () => {
      HelpController_1.HelpController.OpenHelpById(MingSuDefine_1.DARK_COAST_HELP_ID);
    };
    this.xQa = (e, i) => {
      this.dah(e, i);
    };
    this.YDo = () => {
      var e = this.Pe.GetActivityRewardViewData();
      UiManager_1.UiManager.OpenView("ActivityRewardPopUpView", e, (e, i) => {
        if (e) {
          this.AddChildViewById(i);
        }
      });
    };
    this.PQa = () => {
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.Pe.GetCoreId()) <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("DarkCoastDelivery_Item_0");
      } else {
        this.UQa = this.Pe.GetDragonPoolLevel();
        MingSuController_1.MingSuController.SendHandInMingSuRequest(this.Pe.DragonPoolId);
      }
    };
    this.wQa = () => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(this.Pe.GetCoreId());
    };
    this.BQa = () => {
      const i = this.Pe.GetDragonPoolLevel();
      var e;
      if (i > this.UQa) {
        e = new DarkCoastDeliveryLevelUpViewData_1.DarkCoastDeliveryLevelUpViewData(this.UQa, i);
        UiManager_1.UiManager.OpenView("DarkCoastDeliveryLevelUpView", e, () => {
          var e = this.Cah(i);
          if (e !== undefined) {
            this.dah(e.LevelData, e);
          }
        });
      } else {
        this.UiViewSequence.PlaySequence("Sweep");
        this.Hqe();
      }
    };
    this.pXa = () => {
      this.Hqe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [3, UE.UIItem], [5, UE.UIItem], [7, UE.UIItem], [9, UE.UIItem], [11, UE.UIItem], [2, UE.UIItem], [4, UE.UIItem], [6, UE.UIItem], [8, UE.UIItem], [10, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIButtonComponent], [20, UE.UIText], [21, UE.UIText], [22, UE.UIButtonComponent], [23, UE.UIItem], [24, UE.UIButtonComponent], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UITexture]];
    this.BtnBindInfo = [[19, this.YDo], [22, this.PQa], [24, this.wQa]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    if (this.Pe === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("MingSuTi", 58, "DarkCoastDeliveryMainView无效输入！");
      }
    } else {
      this.UQa = this.Pe.GetDragonPoolLevel();
      this.OQa();
      await this.GQa();
      this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(23));
      this.lqe.SetCloseCallBack(this.Jvt);
      this.lqe.SetHelpCallBack(this.pcr);
      this.lqe.SetHelpBtnActive(true);
      this.eho = new DarkCoastDeliveryTipPanel_1.DarkCoastDeliveryTipPanel();
      await this.eho.CreateThenShowByActorAsync(this.GetItem(18).GetOwner());
    }
  }
  OQa() {
    this.AQa = [];
    this.DQa = [];
    for (let e = LINE_START_INDEX; e < LINE_START_INDEX + LINE_COUNT * 2; e++) {
      (e % 2 != 0 ? this.AQa : this.DQa).push(this.GetItem(e));
    }
  }
  async GQa() {
    var i = this.Pe.GetLevelDataList();
    var t = Math.min(i.length, ITEM_COUNT);
    var s = new Array();
    for (let e = 0; e < t; e++) {
      var r = new DarkCoastDeliveryLevelItem_1.DarkCoastDeliveryLevelItem(i[e]);
      r.SetClickToggleCallback(this.xQa);
      this.RQa.push(r);
      var h = this.GetItem(e + ITEM_START_INDEX);
      s.push(this.j1a(r, h));
      if (e === 0 || !!i[e].GetIsUnLock()) {
        this.TQa = i[e];
        this.LQa = r;
      }
    }
    await Promise.all(s);
    this.LQa?.SetSelect(true);
  }
  async j1a(e, i) {
    await e.CreateThenShowByActorAsync(i.GetOwner());
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.MingSuModel.CurrentInteractCreatureDataLongId = ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId;
    this.Hqe();
    this.qQa();
    if (this.TQa) {
      this.eho.RefreshUi(this.TQa);
    }
    this.hth();
  }
  Hqe() {
    var e = this.Pe.GetCurLevelTexturePath();
    this.SetTextureShowUntilLoaded(e, this.GetTexture(0));
    this.SetTextureShowUntilLoaded(e, this.GetTexture(29));
    var e = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelById(this.Pe.DragonPoolId);
    var i = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolMaxLevelById(this.Pe.DragonPoolId);
    if (i <= e) {
      t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelNeedCoreById(this.Pe.DragonPoolId, e - 1);
      this.GetText(20).SetText(t + "/" + t);
      this.GetItem(27).SetUIActive(false);
      this.GetItem(28).SetUIActive(true);
    } else {
      t = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolCoreCountById(this.Pe.DragonPoolId);
      s = ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolLevelNeedCoreById(this.Pe.DragonPoolId, e);
      this.GetText(20).SetText(t + "/" + s);
      this.GetItem(27).SetUIActive(true);
      this.GetItem(28).SetUIActive(false);
    }
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.Pe.GetCoreId());
    var s = this.GetText(21);
    s.SetText(t.toString());
    s.SetChangeColor(t <= 0 && e < i, s.changeColor);
    var t = ModelManager_1.ModelManager.MingSuModel.CheckUp(this.Pe.DragonPoolId);
    this.GetItem(25).SetUIActive(t);
    var e = this.Pe.GetRewardRedDotState();
    this.GetItem(26)?.SetUIActive(e);
  }
  hth() {
    var i = this.Pe.GetDragonPoolLevel();
    if (!(this.UQa >= i)) {
      let e = this.UQa + 1;
      var t = i - e + 1;
      if (!(t <= 0)) {
        if (t == 1) {
          TimerSystem_1.TimerSystem.Delay(() => {
            this.J1l(e);
          }, LEVEL_ITEM_SHOW_DELAY);
        } else {
          TimerSystem_1.TimerSystem.Loop(() => {
            this.J1l(e);
            e++;
          }, LEVEL_ITEM_SHOW_DELAY, t);
        }
        this.UQa = i;
      }
    }
  }
  J1l(e) {
    e = this.Cah(e);
    if (e) {
      e.RefreshUi();
      e.PlaySequence(false);
    }
  }
  Cah(e) {
    for (const i of this.RQa) {
      if (i.LevelData.Id === e) {
        return i;
      }
    }
  }
  qQa() {
    var i = this.Pe.GetDragonPoolLevel();
    for (let e = 0; e < this.DQa.length; e++) {
      this.DQa[e].SetUIActive(i >= e);
      this.AQa[e].SetUIActive(i < e);
    }
  }
  dah(e, i) {
    if (this.TQa !== e) {
      if (this.LQa !== undefined) {
        this.LQa.SetSelect(false);
      }
      this.TQa = e;
      this.LQa = i;
      this.LQa.SetSelect(true);
      this.eho.RefreshUi(e);
      this.eho.SetUiActive(true);
      this.UiViewSequence.StopPrevSequence(false);
      this.UiViewSequence.PlaySequence("Switch");
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateDragonPoolView, this.BQa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.pXa);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateDragonPoolView, this.BQa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView, this.pXa);
  }
}
exports.DarkCoastDeliveryMainView = DarkCoastDeliveryMainView;
//# sourceMappingURL=DarkCoastDeliveryMainView.js.map