"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MascotCollectBookMascotToggle = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
class MascotCollectBookMascotToggle extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.B5d = undefined;
    this.w5d = undefined;
    this.yvm = undefined;
    this.$An = e => {
      if (e === "Bozai_Unlock") {
        this.sbi();
      }
    };
    this.Cke = () => {
      this.w5d?.(this);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UITexture]];
    this.BtnBindInfo = [[0, this.Cke]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnBeforeCreateImplement() {
    this.yvm = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.yvm);
  }
  get Data() {
    return this.B5d;
  }
  Refresh(e, t, i) {
    this.B5d = e;
    var o = (LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.HonamiStoryMascotUnlockSet) ?? new Set()).has(e.Id);
    if (e.State === 1 && o) {
      this.yvm?.PlaySequence("PnlHead_Unlock");
    } else {
      this.sbi();
    }
  }
  sbi() {
    this.GetTexture(2).SetUIActive(this.B5d.State === 1);
    let e = this.B5d.Config.TogglePicture;
    if (this.B5d.State === 0) {
      e = HonamiStoryDefine_1.HONAMI_MASCOT_EMPTY_PATH;
    }
    this.SetTextureByPath(e, this.GetTexture(1));
  }
  BindMascotToggleClick(e) {
    this.w5d = e;
  }
  OnSelected() {
    this.GetExtendToggle(0).SetToggleStateForce(1);
  }
  OnDeselected() {
    this.GetExtendToggle(0).SetToggleStateForce(0);
  }
}
exports.MascotCollectBookMascotToggle = MascotCollectBookMascotToggle;
//# sourceMappingURL=MascotCollectBookMascotToggle.js.map