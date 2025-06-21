"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsDangoOddsItem = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsDangoOddsItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Oxc = void 0, this.qxc = void 0, this.kqe = () => {
      this.qxc(this.Oxc)
    }, this.A5e = () => 1 !== this.GetExtendToggle(0)?.GetToggleState(), this.Ne1 = () => {
      this.GetText(1).SetText((this.Oxc.Odds / 100).toString())
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem]
    ], this.BtnBindInfo = [
      [0, this.kqe]
    ]
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(this.A5e)
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate, this.Ne1)
  }
  Refresh(e, t, s) {
    this.Oxc = e;
    e = DangoManager_1.DangoManager.GetDangoData(this.Oxc.DangoId);
    this.GetText(1).SetText((this.Oxc.Odds / 100).toString()), this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(2)), this.Gxc(t)
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRacingBetsDangoOddsUpdate, this.Ne1)
  }
  RefreshOddsDango(e) {
    this.GetItem(3).SetUIActive(e === this.Oxc.DangoId)
  }
  OnSelected(e) {
    this.Gxc(!0)
  }
  OnDeselected(e) {
    this.Gxc(!1)
  }
  Gxc(e) {
    this.GetExtendToggle(0).SetToggleStateForce(e ? 1 : 0)
  }
  BindClickGearItemCallBack(e) {
    this.qxc = e
  }
}
exports.RacingBetsDangoOddsItem = RacingBetsDangoOddsItem;
//# sourceMappingURL=RacingBetsDangoOddsItem.js.map