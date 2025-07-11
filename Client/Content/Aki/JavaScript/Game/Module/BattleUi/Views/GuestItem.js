"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuestItem = undefined;
const UE = require("ue");
const PlotGuestByGuestID_1 = require("../../../../Core/Define/ConfigQuery/PlotGuestByGuestID");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BattleChildView_1 = require("./BattleChildView/BattleChildView");
class GuestItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Qmc = undefined;
    this.Kmc = false;
    this.Xmc = (e, t) => {
      if (t) {
        if (e.WhoId && this.Qmc?.has(e.WhoId)) {
          if (!this.Kmc) {
            this.Kmc = true;
            var i = this.GetItem(1).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
            for (let e = 0; e < i.Num(); e++) {
              i.Get(e).Play();
            }
          }
        } else {
          this.Ymc();
        }
      }
    };
    this.Ymc = () => {
      if (this.Kmc) {
        this.Kmc = false;
        var t = this.GetItem(2).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
        for (let e = 0; e < t.Num(); e++) {
          t.Get(e).Play();
        }
      }
    };
    this.pNc = e => {
      var t = this.GetItem(e ? 3 : 4).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
      for (let e = 0; e < t.Num(); e++) {
        t.Get(e).Play();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnShowBattleChildView() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotShowTalk, this.Xmc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotEndShowTalk, this.Ymc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowGuestEffect, this.pNc);
  }
  OnHideBattleChildView() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotShowTalk, this.Xmc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotEndShowTalk, this.Ymc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowGuestEffect, this.pNc);
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.BattleUiModel.GuestId;
    if (e !== 0) {
      await this.SetGuest(e);
    }
  }
  OnAfterShow() {
    if (ModelManager_1.ModelManager.BattleUiModel.GuestEffect) {
      this.pNc(true);
    }
  }
  async SetGuest(e) {
    var e = PlotGuestByGuestID_1.configPlotGuestByGuestID.GetConfig(e);
    var t = e.HeadIconPath;
    this.Qmc = new Set(e.SpeakerID);
    await this.SetTextureAsync(t, this.GetTexture(0));
  }
}
exports.GuestItem = GuestItem;
//# sourceMappingURL=GuestItem.js.map