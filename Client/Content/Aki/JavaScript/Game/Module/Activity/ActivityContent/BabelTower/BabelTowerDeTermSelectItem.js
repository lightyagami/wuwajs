"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BabelTowerDeTermSelectItem = void 0;
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class BabelTowerDeTermSelectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.woc = void 0, this.Roc = void 0, this.zji = void 0, this.Aoc = !1, this.Poc = 0, this.sGe = () => {
      var e = new DeTermItem;
      return e.OnClickToggleCallBack = this.ZBl, e.CanClickCallBack = this.xoc, e
    }, this.ZBl = (e, t) => {
      this.zji?.SetToggleState(0), this.zji = t, 0 === e ? (t = {
        State: 0,
        SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
      }, ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(this.Poc, t)) : (t = {
        State: 0,
        SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
      }, ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(this.Poc, t), t = {
        State: 2,
        SelectIndex: ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectIndex++
      }, ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.set(e, t)), this.xMc(), this.Poc = e, this.woc?.(e)
    }, this.xoc = () => {
      var e = !this.Aoc;
      return e || ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BabelTowerNecessaryDeTerm"), e
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIGridLayout],
      [3, UE.UIItem]
    ]
  }
  OnStart() {
    this.Roc = new GenericLayout_1.GenericLayout(this.GetGridLayout(2), this.sGe)
  }
  Refresh(i, e, t) {
    this.Aoc = i.IsNecessary, this.GetItem(1).SetUIActive(i.IsNecessary), this.woc = i.OnChangeSelectDeTerm, this.Roc?.RefreshByData(i.AllDeTerm, () => {
      for (const t of this.Roc.GetLayoutItemList()) {
        var e = ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.get(t.DeTermId);
        1 === e?.State && t.SetToggleState(2), 2 !== e?.State && 3 !== e?.State || (this.Poc = t.DeTermId, this.zji = t.GetDeTermToggle(), t.SetToggleState(1)), 0 === e?.State && t.SetToggleState(0), t.SetDailyQuestItem(0 !== t.DeTermId && i.DailyDeTerm.includes(t.DeTermId))
      }
      this.zji && this.xMc()
    })
  }
  PlayPositionSequence(e) {
    for (const t of this.Roc.GetLayoutItemList()) t.DeTermId === e && t.PlayPositionSequence()
  }
  xMc() {
    for (const t of this.Roc.GetLayoutItemList()) {
      var e = ModelManager_1.ModelManager.BabelTowerModel.DeTermSelectInfo.get(t.DeTermId);
      t.UseChangeColor(0 === e?.State && void 0 !== this.zji)
    }
  }
  ClearSelect() {
    this.zji = void 0, this.Poc = 0, this.xMc()
  }
}
exports.BabelTowerDeTermSelectItem = BabelTowerDeTermSelectItem;
class DeTermItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.DeTermId = 0, this.OnClickToggleCallBack = void 0, this.CanClickCallBack = void 0, this.SPe = void 0, this.LRc = void 0, this.kqe = e => {
      1 === e ? this.OnClickToggleCallBack?.(this.DeTermId, this.GetExtendToggle(2)) : this.OnClickToggleCallBack?.(0, void 0)
    }, this.yMa = () => {
      var e = {
        IsDeTerm: !0,
        ConfigId: this.DeTermId,
        ShowWays: !0
      };
      UiManager_1.UiManager.OpenView("BabelTowerItemInfoView", e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UIExtendToggle],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.kqe]
    ]
  }
  async OnBeforeStartAsync() {
    this.LRc = new DeTermDailyQuestItem, await this.LRc.CreateByActorAsync(this.GetItem(4).GetOwner())
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.GetExtendToggle(2).CanExecuteChange.Bind(() => !this.CanClickCallBack || this.CanClickCallBack()), this.GetExtendToggle(2).OnUndeterminedClicked.Add(this.yMa)
  }
  Refresh(e, t, i) {
    e <= 0 ? this.GetExtendToggle(2).RootUIComp.SetUIActive(!1) : (this.DeTermId = e, this.GetExtendToggle(2).RootUIComp.SetUIActive(!0), e = ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerDeTerm(e).Texture, this.SetTextureByPath(e, this.GetTexture(0)))
  }
  SetToggleState(e) {
    this.GetExtendToggle(2).SetToggleStateForce(e)
  }
  UseChangeColor(e) {
    this.GetSprite(1).SetChangeColor(e, this.GetSprite(1).changeColor), this.GetTexture(0).SetChangeColor(e, this.GetTexture(0).changeColor)
  }
  PlayPositionSequence() {
    this.SPe?.StopCurrentSequence(), this.SPe?.PlayLevelSequenceByName("Once_ComBuff")
  }
  SetDailyQuestItem(e) {
    this.LRc.SetUiActive(e)
  }
  GetDeTermToggle() {
    return this.GetExtendToggle(2)
  }
}
class DeTermDailyQuestItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [0, UE.UISprite]
    ]
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "ScratchCard_TaskType_01")
  }
}
//# sourceMappingURL=BabelTowerDeTermSelectItem.js.map