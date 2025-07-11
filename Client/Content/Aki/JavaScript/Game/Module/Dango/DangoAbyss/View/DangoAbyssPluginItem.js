"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssPluginItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const DangoAbyssDefine_1 = require("../DangoAbyssDefine");
class DangoAbyssPluginItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, i) {
    super();
    this.Xy = -1;
    this.Ou1 = true;
    this.$8i = undefined;
    this.ViewModel = undefined;
    this.Sequence = undefined;
    this.N8e = () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 75, "OnToggleClick, " + this.Xy);
      }
      var e = this.ViewModel.GetDangoId();
      if (!ModelManager_1.ModelManager.DangoAbyssModel.GetDangoIfLock(e)) {
        if (ModelManager_1.ModelManager.DangoAbyssModel.GetSlotLockState(e, this.Xy)) {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(305)).FunctionMap.set(2, this.SR1);
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        } else {
          this.ViewModel.SetSlotIndex(this.Xy);
          if (!this.Ou1) {
            UiManager_1.UiManager.OpenView("DangoAbyssPluginEquipView", this.ViewModel);
          }
        }
      }
    };
    this.SR1 = () => {
      var e = this.ViewModel.GetDangoId();
      UiManager_1.UiManager.OpenView("DangoAbyssLevelUpView", e);
    };
    this.Xy = e;
    this.Ou1 = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UITexture]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  OnStart() {
    this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetExtendToggle(0).OnUndeterminedClicked.Add(this.N8e);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(0).OnUndeterminedClicked.Clear();
  }
  Refresh(e) {
    if (e) {
      this.pB1(this.$8i, e);
      this.$8i = e;
      this._Oe();
      this.Aqe();
      this.qwt(false);
    } else {
      this.Vx1();
    }
  }
  Vx1() {
    var e = this.ViewModel.GetDangoId();
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotUnlockLevel(e, this.Xy);
    this.GetExtendToggle(0).SetToggleState(2);
    this.GetText(2).SetText(StringUtils_1.StringUtils.Format("Lv.{0}", e.toString()));
    this.GetText(2).SetUIActive(true);
    this.GetTexture(1).SetUIActive(false);
    this.GetTexture(5).SetUIActive(false);
    this.GetSprite(3).SetUIActive(true);
    this.GetSprite(4).SetUIActive(false);
  }
  pB1(e, i) {
    var s = i?.GetDangoId() ?? 0;
    var s = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotLockState(s, this.Xy);
    if (!s) {
      switch (ModelManager_1.ModelManager.DangoAbyssModel.GetSlotSwitchTypeByData(e, i)) {
        case 3:
          this.PlaySequence("DropIn");
          break;
        case 2:
          this.PlaySequence("Replace");
          break;
        case 1:
          this.PlaySequence("MoveAway");
      }
    }
  }
  async PlaySequence(e) {
    var i = new CustomPromise_1.CustomPromise();
    await this.Sequence?.PlaySequenceAsync(e, i);
  }
  _Oe() {
    var e = this.$8i.GetDangoId();
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotUnlockLevel(e, this.Xy);
    var s = this.GetExtendToggle(0);
    var t = this.ViewModel.GetSlotIndex();
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotLockState(e, this.Xy);
    var t = t === this.Xy;
    this.GetText(2).SetText(StringUtils_1.StringUtils.Format("Lv.{0}", i.toString()));
    this.GetText(2).SetUIActive(e);
    if (t && !e && this.Ou1) {
      s.SetToggleState(1);
    } else if (e) {
      s.SetToggleState(2);
    } else {
      s.SetToggleState(0);
    }
  }
  Aqe() {
    var e = this.$8i.GetEquipId();
    var i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(e);
    if (e <= 0 || !i || i.IconMiddle === "") {
      this.GetTexture(1).SetUIActive(false);
      this.GetTexture(5).SetUIActive(false);
    } else {
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemQualityIcon(e);
      this.SetTextureByPath(i.IconMiddle, this.GetTexture(1));
      this.SetTextureByPath(e, this.GetTexture(5));
      this.GetTexture(1).SetUIActive(true);
      this.GetTexture(5).SetUIActive(true);
      i = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetSlotTypeByIndex(this.Xy);
      e = this.GetTexture(1);
      i = DangoAbyssDefine_1.iconSizeBySlotType.get(i);
      e.SetWidth(i);
      e.SetHeight(i);
    }
  }
  qwt(e) {
    var i = this.$8i;
    var s = ConfigManager_1.ConfigManager.DangoAbyssConfig.GetDangoItemById(i.GetEquipId());
    var i = i.GetEquipId() !== 0 && !!s && s.Icon !== "" || !e;
    this.GetSprite(3).SetUIActive(i);
    this.GetSprite(4).SetUIActive(!i);
  }
}
exports.DangoAbyssPluginItem = DangoAbyssPluginItem;
//# sourceMappingURL=DangoAbyssPluginItem.js.map