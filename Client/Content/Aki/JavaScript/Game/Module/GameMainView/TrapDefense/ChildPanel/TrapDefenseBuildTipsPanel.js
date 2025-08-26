"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBuildTipsPanel = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const TrapDefenseRecyclePriceItem_1 = require("../ChildItem/TrapDefenseRecyclePriceItem");
const TrapDefenseBattleDefine_1 = require("../TrapDefenseBattleDefine");
const cannotPlaceTextMap = {
  [1]: "TowerDefense_Battle_Groundonly",
  2: "TowerDefense_Battle_Wallonly",
  4: "TowerDefense_Battle_Toponly"
};
class TrapDefenseBuildTipsPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.IsInSelectBuild = false;
    this.NeedShowBtnSequence = false;
    this.E9 = 0;
    this.SXu = false;
    this.nYc = undefined;
    this.sYc = undefined;
    this.aYc = 0;
    this.fud = undefined;
    this.Sequence = undefined;
    this.CostNumText = undefined;
    this.EnoughItem = undefined;
    this.NotEnoughItem = undefined;
    this.vK1 = e => {
      if (e === "CloseTip") {
        this.GetItem(4)?.SetUIActive(false);
      } else if (e === "CloseDisable") {
        this.GetItem(3)?.SetUIActive(false);
      } else if (e === "CloseWarn") {
        this.nYc?.SetUIActive(false);
      }
    };
    this.MXu = (e, t) => {
      if (this.EXu && t === 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("TowerDefenseBattle", 10, "触发旋转机关");
        }
        ControllerHolder_1.ControllerHolder.TowerDefenseEventController.ExecuteRotateTrap();
      }
    };
    this.IXu = (e, t) => {
      if (this.TXu && t === 0) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("TowerDefenseBattle", 10, "触发回收机关");
        }
        ControllerHolder_1.ControllerHolder.TowerDefenseEventController.ExecuteUnOccupyTrap();
      }
    };
  }
  get bXu() {
    return (this.E9 & 1) > 0 && this.IsInSelectBuild;
  }
  get TXu() {
    return (this.E9 & 4) > 0;
  }
  get RXu() {
    return (this.E9 & 8) > 0 && this.IsInSelectBuild;
  }
  get EXu() {
    return (this.E9 & 2) > 0 && this.bXu;
  }
  get wXu() {
    return (this.E9 & 16) > 0 && this.IsInSelectBuild;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UITexture], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText]];
  }
  async InitializeAsync() {
    var e;
    if (!Info_1.Info.IsInTouch()) {
      e = this.GetItem(2);
      this.fud = new TrapDefenseRecyclePriceItem_1.TrapDefenseRecyclePriceItem();
      await this.fud.CreateThenShowByResourceIdAsync("UiItem_CoinItem", e);
    }
    this.CostNumText = this.GetText(5);
    this.EnoughItem = this.GetItem(7);
    this.NotEnoughItem = this.GetItem(8);
  }
  InitializeTemp() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.vK1);
    this.E9 = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.BuildTipsType;
    this.nYc = this.GetItem(9);
    this.sYc = this.GetText(10);
    this._Oe();
    this.LXu();
    this.GetItem(4)?.SetUIActive(false);
  }
  OnShowBattleChildViewPanel(e) {
    this.HQa();
  }
  OnHideBattleChildViewPanel() {
    this.jQa();
  }
  OnTickBattleChildViewPanel(e) {
    if (this.hYc()) {
      this.LXu();
    }
    this.Omd();
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  HQa() {
    if (!this.SXu) {
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.塔防旋转, this.MXu);
      ControllerHolder_1.ControllerHolder.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.塔防回收机关, this.IXu);
      this.SXu = true;
    }
  }
  jQa() {
    if (this.SXu) {
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.塔防旋转, this.MXu);
      ControllerHolder_1.ControllerHolder.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.塔防回收机关, this.IXu);
      this.SXu = false;
    }
  }
  _Oe() {
    var e;
    this.Rtd();
    this.AXu();
    if (Info_1.Info.IsInTouch()) {
      this.GetItem(1)?.SetUIActive(false);
      this.GetItem(2)?.SetUIActive(false);
      this.GetItem(0)?.SetUIActive(false);
      this.NeedShowBtnSequence = false;
    } else {
      e = this.xod();
      this.GetItem(1)?.SetUIActive(this.EXu);
      this.GetItem(2)?.SetUIActive(this.TXu);
      this.GetItem(0)?.SetUIActive(e);
      if ((e = this.EXu || this.TXu || e) !== this.NeedShowBtnSequence) {
        this.NeedShowBtnSequence = e;
        this.Uod(e);
      }
    }
  }
  DXu(e) {
    if (this.E9 !== e) {
      this.E9 = e;
      this._Oe();
    }
  }
  xod() {
    return !Info_1.Info.IsInTouch() && !!this.bXu && (!this.RXu || ModelManager_1.ModelManager.TrapDefenseModel.BattleData.IsPurificationItemEnough);
  }
  Uod(e) {
    if (e) {
      this.Sequence.StopSequenceByKey("CloseBtn", false, true);
      this.Sequence.PlaySequencePurely("StartBtn");
    } else {
      this.Sequence.StopSequenceByKey("StartBtn", false, true);
      this.Sequence.PlaySequencePurely("CloseBtn");
    }
  }
  AXu() {
    var e;
    var t = this.GetItem(4);
    var i = this.GetTexture(6);
    if (this.RXu) {
      this.Omd();
      if ((e = ModelManager_1.ModelManager.TrapDefenseModel?.BattleInventoryData.GetItemData(TrapDefenseBattleDefine_1.TRAPDEFENSE_PURIFICATION_ID)) && e.Icon) {
        this.SetTextureByPath(e.Icon, i);
      }
      this.Sequence.StopSequenceByKey("CloseTip", false, true);
      this.Sequence.PlayOrReplaySequenceByName("StartTip");
      t?.SetUIActive(true);
    } else {
      this.Sequence.StopSequenceByKey("StartTip", false, true);
      this.Sequence.PlayOrReplaySequenceByName("CloseTip");
    }
  }
  Omd() {
    var e;
    var t;
    var i;
    if (this.RXu) {
      e = (i = ModelManager_1.ModelManager.TrapDefenseModel.BattleData).IsPurificationItemEnough;
      t = i.GetCurrentPurificationItemCount();
      i = i.GetPurificationItemConsume();
      this.EnoughItem.SetUIActive(e);
      this.NotEnoughItem.SetUIActive(!e);
      if (e) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.CostNumText, "TowerDefense_Main_BdCostGreen_Text", t, i);
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.CostNumText, "TowerDefense_Main_BdCostRed_Text", t, i);
      }
    }
  }
  Rtd() {
    var e = this.GetItem(3);
    if (this.wXu) {
      e?.SetUIActive(true);
      this.Sequence.StopSequenceByKey("CloseDisable", false, true);
      this.Sequence.PlaySequencePurely("StartDisable");
    } else {
      this.Sequence.StopSequenceByKey("StartDisable", false, true);
      this.Sequence.PlaySequencePurely("CloseDisable");
    }
  }
  LXu() {
    var e;
    if (this.aYc === 1 || this.aYc === 0 || this.aYc === 7) {
      this.Sequence.StopSequenceByKey("StartWarn", false, true);
      this.Sequence.PlaySequencePurely("CloseWarn");
    } else {
      if (this.aYc === 2 || this.aYc === 3 || this.aYc === 4) {
        e = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.RaycastResult;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.sYc, cannotPlaceTextMap[e.PlacementType]);
      } else if (this.aYc === 5) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.sYc, "TowerDefense_Battle_Numlimit");
      } else if (this.aYc === 6) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.sYc, "TowerDefense_Battle_Coinlimit");
      }
      this.nYc?.SetUIActive(true);
      this.Sequence.StopSequenceByKey("CloseWarn", false, true);
      this.Sequence.PlaySequencePurely("StartWarn");
    }
  }
  hYc() {
    let e = 0;
    var t;
    if (this.wXu) {
      if ((t = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.RaycastResult).IsInvalidPlacement) {
        if (t.PlacementType === 1) {
          e = 2;
        } else if (t.PlacementType === 2) {
          e = 3;
        } else if (t.PlacementType === 4) {
          e = 4;
        }
      } else {
        e = ModelManager_1.ModelManager.TowerDefenseEventModel.HasPlaceToBuildTrap() ? ControllerHolder_1.ControllerHolder.TowerDefenseEventController.IsEnoughGoldToBuildTrap() ? 1 : 6 : 5;
      }
    } else if (!this.IsInSelectBuild) {
      e = 7;
    }
    return e !== this.aYc && (this.aYc = e, true);
  }
  SetRecyclePrice(e) {
    if (this.fud) {
      this.fud.UpdatePrice(e);
    }
  }
  SetTipsType(e) {
    this.DXu(e);
  }
  ResetCannotMode() {
    this.aYc = 0;
  }
  SetIsInSelectBuild(e) {
    this.IsInSelectBuild = e;
    this._Oe();
  }
}
exports.TrapDefenseBuildTipsPanel = TrapDefenseBuildTipsPanel;
//# sourceMappingURL=TrapDefenseBuildTipsPanel.js.map