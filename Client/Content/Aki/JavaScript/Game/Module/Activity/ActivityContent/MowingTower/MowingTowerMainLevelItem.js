"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MowingTowerMainLevelItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MowingTowerData_1 = require("./MowingTowerData");
class MowingTowerMainLevelItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.nqe = () => {
      if (this.$8i?.GetUnLockState()) {
        ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectLevelDetailData = this.$8i;
        ModelManager_1.ModelManager.MowingTowerModel.CurrentTeamInfo = ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectLevelDetailData.ConvertToTeamInfo();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeMowingTowerMainView, 1);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BossRushLevelLock");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIText]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  Refresh(e, t, i) {
    this.$8i = e;
    this.wke(e);
    this.l3e(e);
    this.vyn(e);
    this.Aqe(e);
    this.BLl(e);
  }
  Aqe(e) {
    var t = e.GetUnLockState();
    var i = this.GetTexture(2);
    i?.SetUIActive(t);
    this.SetTextureByPath(e.GetNormalTexturePath(), i);
    var i = this.GetTexture(3);
    i.SetUIActive(!t);
    this.SetTextureByPath(e.GetLockTexturePath(), i);
    var i = e.GetIsInfinite();
    if (e.GetId() % 2 == 0 || i) {
      this.GetItem(4)?.SetUIActive(false);
      this.GetItem(5)?.SetUIActive(true);
    } else {
      this.GetItem(4)?.SetUIActive(true);
      this.GetItem(5)?.SetUIActive(false);
    }
    if (t) {
      if (i) {
        this.GetItem(1)?.SetColor(MowingTowerData_1.bgInfiniteMowingTowerColor);
        this.GetText(6)?.SetColor(MowingTowerData_1.infiniteMowingTowerColor);
        this.GetItem(4)?.SetColor(MowingTowerData_1.infiniteMowingTowerColor);
        this.GetItem(5)?.SetColor(MowingTowerData_1.infiniteMowingTowerColor);
      } else {
        this.GetItem(1)?.SetColor(MowingTowerData_1.bgNormalMowingTowerColor);
        this.GetText(6)?.SetColor(MowingTowerData_1.normalMowingTowerColor);
        this.GetItem(4)?.SetColor(MowingTowerData_1.normalMowingTowerColor);
        this.GetItem(5)?.SetColor(MowingTowerData_1.normalMowingTowerColor);
      }
    } else {
      this.GetItem(1)?.SetColor(MowingTowerData_1.bgLockMowingTowerColor);
      this.GetText(6)?.SetColor(MowingTowerData_1.lockMowingTowerColor);
      this.GetItem(5)?.SetColor(MowingTowerData_1.lockMowingTowerColor);
      this.GetItem(4)?.SetColor(MowingTowerData_1.lockMowingTowerColor);
    }
  }
  wke(e) {
    e = e.GetUnLockState();
    this.GetItem(10).SetUIActive(!e);
    this.GetItem(7).SetUIActive(e);
  }
  l3e(e) {
    var t;
    var i;
    if (e.GetUnLockState()) {
      t = (e = e.GetScore()) > 0;
      (i = this.GetText(8)).SetUIActive(t);
      i.SetText(e.toString());
      this.GetItem(9).SetUIActive(!t);
      this.GetItem(7).SetUIActive(t);
    }
  }
  vyn(e) {
    if (!e.GetUnLockState()) {
      if (TimeUtil_1.TimeUtil.GetServerTime() < e.GetUnLockTime()) {
        this.GetText(11).SetText(e.GetUnlockTimeText());
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "MowingTowerUnlockCondition", e.GetConfig().PassScore);
      }
    }
  }
  BLl(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.GetLevelDesc());
  }
  GetCurrentIsFinish() {
    return !!this.$8i && this.$8i.GetScore() > 0;
  }
}
exports.MowingTowerMainLevelItem = MowingTowerMainLevelItem;
//# sourceMappingURL=MowingTowerMainLevelItem.js.map