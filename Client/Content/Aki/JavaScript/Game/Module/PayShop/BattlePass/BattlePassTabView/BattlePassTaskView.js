"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassTaskView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const BattlePassBackgroundPanel_1 = require("./BattlePassBackgroundPanel");
const BattlePassTaskLoopItem_1 = require("./BattlePassTaskLoopItem");
const BattlePassTaskTabItem_1 = require("./BattlePassTaskTabItem");
class BattlePassTaskView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.NOe = CommonDefine_1.INVALID_VALUE;
    this.M2i = undefined;
    this.A2i = undefined;
    this.M2t = undefined;
    this.P2i = [];
    this.s8e = [1, 2, 0];
    this.x2i = () => {
      this.w2i();
    };
    this.B2i = e => {
      if (this.NOe !== CommonDefine_1.INVALID_VALUE) {
        if (this.s8e[this.NOe] === 1 || this.s8e[this.NOe] === 2 && e) {
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(new ConfirmBoxDefine_1.ConfirmBoxDataNew(146));
        }
        this.w2i();
      }
    };
    this.I2i = () => new BattlePassTaskLoopItem_1.BattlePassTaskLoopItem();
    this.hPe = () => {
      var e = new BattlePassTaskTabItem_1.BattlePassTaskTabItem();
      e.SetSelectedCallBack(this.b2i);
      e.SetCanExecuteChange(this.gke);
      return e;
    };
    this.b2i = e => {
      var t;
      if (e !== this.NOe) {
        t = this.NOe;
        this.NOe = e;
        if (t !== CommonDefine_1.INVALID_VALUE && (e = this.A2i.GetLayoutItemByIndex(t))) {
          e.SetForceSwitch(0);
        }
        this.w2i();
      }
    };
    this.gke = e => this.NOe !== e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem]];
  }
  async wRn() {
    this.M2i = new BattlePassBackgroundPanel_1.BattlePassBackgroundPanel();
    var e = {
      IsRewardPanel: false,
      WeaponObservers: this.ExtraParams
    };
    await this.M2i.OnlyCreateByActorAsync(this.GetItem(0).GetOwner(), e);
    this.AddChild(this.M2i);
  }
  async BRn() {
    this.NOe = CommonDefine_1.INVALID_VALUE;
    this.A2i = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.hPe);
    await this.A2i.RefreshByDataAsync(this.s8e);
    this.M2t = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetItem(3).GetOwner(), this.I2i);
    this.SelectToggleByIndex(0, true);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.wRn(), this.BRn()]);
  }
  OnAfterShow() {
    this.UiViewSequence?.PlaySequence("Switch");
    this.w2i();
  }
  SelectToggleByIndex(e, t = false) {
    if (t) {
      const i = this.A2i.GetLayoutItemByIndex(this.NOe);
      if (i) {
        i.SetForceSwitch(0);
      }
      this.NOe = CommonDefine_1.INVALID_VALUE;
    }
    const i = this.A2i.GetLayoutItemByIndex(e);
    if (i) {
      i.SetForceSwitch(1, true);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateBattlePassTaskEvent, this.x2i);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ReceiveBattlePassTaskEvent, this.B2i);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateBattlePassTaskEvent, this.x2i);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ReceiveBattlePassTaskEvent, this.B2i);
  }
  w2i() {
    if (this.NOe !== CommonDefine_1.INVALID_VALUE) {
      ModelManager_1.ModelManager.BattlePassModel.GetTaskList(this.s8e[this.NOe], this.P2i);
      this.M2t.RefreshByData(this.P2i, false, undefined, true);
    }
  }
  OnBeforeDestroy() {
    if (this.M2t) {
      this.M2t.ClearGridProxies();
      this.M2t = undefined;
    }
    this.P2i = [];
  }
}
exports.BattlePassTaskView = BattlePassTaskView;
//# sourceMappingURL=BattlePassTaskView.js.map