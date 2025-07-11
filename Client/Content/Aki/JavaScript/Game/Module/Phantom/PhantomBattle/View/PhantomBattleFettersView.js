"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleFettersView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const PhantomBattleFettersViewItem_1 = require("./PhantomBattleFettersViewItem");
class PhantomBattleFettersView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.kvt = undefined;
    this.n6t = undefined;
    this.dFe = 0;
    this._Dt = 0;
    this.z6i = () => {
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectFetterGroupId = this.kvt.GetCurrentSelectGroupId();
      var e = UiManager_1.UiManager.GetViewByName("VisionEquipmentView");
      if (e) {
        UiManager_1.UiManager.CloseView(this.Info.Name);
        e.SetActive(true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionFilterMonster);
      } else {
        UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "VisionEquipmentView", this.dFe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 58, "PhantomBattleFettersView无效输入");
      }
    } else {
      this._Dt = e[0];
      this.dFe = e[1];
      this.kvt = new PhantomBattleFettersViewItem_1.PhantomBattleFettersViewItem();
      this.kvt.SetSelectRoleId(this.dFe);
      this.kvt.OnFastFilter = this.z6i;
      await this.kvt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
      this.n6t = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
      this.n6t.SetCloseCallBack(() => {
        this.CloseMe();
      });
    }
  }
  OnBeforeShow() {
    if (this._Dt > 0) {
      this.kvt.SelectByFetterId(this._Dt);
      this._Dt = 0;
    }
  }
  async OnPlayingStartSequenceAsync() {
    await this.kvt?.PlayStartSequence();
  }
  async OnPlayingCloseSequenceAsync() {
    await this.kvt?.PlayHideSequence();
  }
}
exports.PhantomBattleFettersView = PhantomBattleFettersView;
//# sourceMappingURL=PhantomBattleFettersView.js.map