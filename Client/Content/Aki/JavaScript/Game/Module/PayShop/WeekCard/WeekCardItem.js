"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeekCardItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WeekCardRewardGrid_1 = require("./WeekCardRewardGrid");
class WeekCardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.lLg = 0;
    this.DIe = 0;
    this._Lg = 0;
    this.Tqm = 0;
    this.uLg = [];
    this.cLg = false;
    this.ZAt = new ButtonItem_1.ButtonItem();
    this.H3e = undefined;
    this.p5t = () => {
      if (this.DIe === 1) {
        ControllerHolder_1.ControllerHolder.WeekCardController.RequestWeekCardReward(this.lLg);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.p5t]];
  }
  OnStart() {
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), () => new WeekCardRewardGrid_1.WeekCardRewardGrid());
  }
  Refresh(e) {
    this.lLg = e.dkf;
    this.DIe = e.H6n;
    this._Lg = e.mkf;
    this.Tqm = Number(MathUtils_1.MathUtils.LongToBigInt(e.fkf));
    this.uLg = Object.entries(e.fRf).map(([e, t]) => [Number(e), t]);
    this.cLg = ModelManager_1.ModelManager.WeekCardModel.GetHasBuyWeekCard();
    this.RefreshView();
  }
  RefreshView() {
    this.H3e.RefreshByData(this.uLg.map(([e, t]) => ({
      ItemId: e,
      Count: t
    })));
    this.GetItem(3).SetUIActive(this.DIe !== 2);
    this.GetItem(5).SetUIActive(this.cLg && this.DIe === 1);
    this.GetItem(6).SetUIActive(this.cLg && this.DIe === 2);
    this.GetItem(8).SetAlpha(this.DIe === 2 ? 0.5 : 1);
    this.ZAt.SetUiActive(this.cLg && this.DIe === 1);
    this.GetItem(7).SetUIActive(this.DIe === 1);
    this.RefreshTime();
  }
  RefreshTime() {
    var e;
    this.GetText(4).SetUIActive(this.DIe === 0);
    if (this.cLg) {
      e = TimeUtil_1.TimeUtil.SetTimeSecond(this.Tqm - TimeUtil_1.TimeUtil.GetServerTimeStamp());
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e > 0 ? e : 0.1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "WeekCard_1002", e.CountDownText ?? "");
    } else if (this._Lg === 1) {
      this.GetText(4).ShowTextNew("WeekCard_1001");
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "WeekCard_1006", this._Lg);
    }
  }
}
exports.WeekCardItem = WeekCardItem;
//# sourceMappingURL=WeekCardItem.js.map