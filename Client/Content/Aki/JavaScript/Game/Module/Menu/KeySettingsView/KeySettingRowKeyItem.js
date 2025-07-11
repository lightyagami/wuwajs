"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingRowKeyItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const InputSettings_1 = require("../../../InputSettings/InputSettings");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
class KeySettingRowKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.uPi = undefined;
    this.oxi = 0;
    this.SPi = undefined;
    this.c2n = undefined;
    this.rxi = i => {
      if (i === 1 && this.uPi && this.SPi) {
        this.SPi(this.uPi, this);
      }
    };
    this.AWa = () => {
      if (!!this.uPi && !this.uPi.IsBothAction()) {
        if (this.uPi.OpenViewType === 0) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("InputSettings", 10, "按下清空按键按钮，清空此输入按键", ["ActionOrAxisName", this.uPi.GetActionOrAxisName()]);
          }
          this.uPi.DisableKey(this.oxi);
          this.nxi();
          InputSettings_1.InputSettings.SaveKeyMappings();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIExtendToggle], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.rxi], [9, this.AWa]];
  }
  OnStart() {
    this.c2n = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetItem(8));
  }
  OnBeforeDestroy() {
    this.ClearData();
    this.SPi = undefined;
    this.c2n?.Clear();
    this.c2n = undefined;
  }
  ClearData() {
    this.uPi = undefined;
    this.oxi = 0;
  }
  BindOnWaitInput(i) {
    this.SPi = i;
  }
  Refresh(i, t) {
    if (i.GetRowType() === 2) {
      this.uPi = i;
      this.oxi = t;
      this.Nft();
      this.nxi();
      this.sxi();
      this.Rxt();
      this.MOt();
      this.DWa();
    }
  }
  Nft() {
    var i = this.GetText(0);
    var t = this.uPi.GetSettingName();
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      i.SetText(this.uPi.GetActionOrAxisName());
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, t);
    }
  }
  nxi() {
    var t = this.uPi.ButtonTextId;
    if (t && !StringUtils_1.StringUtils.IsBlank(t)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t);
    } else {
      let i = "+";
      var s;
      var e;
      var h;
      var n;
      var r;
      var t = this.uPi.BothActionName;
      if (t && t.length > 1) {
        i = "/";
      }
      var t = this.uPi.GetCurrentKeyNameRichText(this.oxi, i);
      if (t.length <= 0) {
        r = this.uPi.FindCombinationActionBinding();
        s = this.uPi.CombinationAxisBinding;
        e = this.uPi.ActionBinding;
        h = this.uPi.AxisBinding;
        e?.GetKeyNameList(e = []);
        h?.GetKeyNameList(h = []);
        n = new Map();
        r?.GetKeyMap(n);
        r = new Map();
        s?.GetKeyMap(r);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("InputSettings", 10, "刷新按键设置项时，按键名称为空", ["ActionOrAxisName", this.uPi.GetActionOrAxisName()], ["IsActionOrAxis", this.uPi.IsActionOrAxis], ["ActionBindingKeys", e], ["AxisBindingKeys", h], ["combinationActionBindingKeyMap", n], ["combinationAxisBindingKeyMap", n]);
        }
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "NoneText");
      } else {
        this.GetText(2)?.SetText(t);
      }
    }
  }
  sxi() {
    var i;
    if (this.uPi.CanDisable || (i = this.uPi.DetailTextId, StringUtils_1.StringUtils.IsEmpty(i))) {
      this.GetSprite(5)?.SetUIActive(false);
    } else {
      this.GetSprite(5)?.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), i);
    }
  }
  Rxt() {
    var i = this.uPi.IsLock;
    this.GetSprite(6)?.SetUIActive(i);
    this.GetButton(1)?.SetSelfInteractive(!i);
  }
  MOt() {
    var i;
    if (this.uPi && (i = this.GetButton(9)?.GetOwner()?.GetUIItem())) {
      if (!this.uPi.CanDisable || this.uPi.IsLock || this.uPi.IsBothAction() || this.uPi.OpenViewType !== 0) {
        i.SetUIActive(false);
      } else {
        i.SetUIActive(true);
      }
    }
  }
  DWa() {
    if (this.uPi) {
      this.SetDetailItemVisible(this.uPi.IsExpandDetail);
    } else {
      this.SetDetailItemVisible(false);
    }
  }
  SetSelected(i) {
    this.GetSprite(7)?.SetUIActive(i);
    this.GetExtendToggle(1)?.SetToggleState(i ? 1 : 0, false);
    this.GetText(2)?.SetUIActive(!i);
    this.GetItem(8)?.SetUIActive(i);
    if (i) {
      this.c2n.PlayLevelSequenceByName("Loop");
    } else {
      this.c2n.StopCurrentSequence();
    }
  }
  SetDetailItemVisible(i) {
    var t;
    var s = this.GetItem(3);
    if (!this.uPi || (t = this.uPi.DetailTextId, StringUtils_1.StringUtils.IsEmpty(t))) {
      s.SetUIActive(false);
    } else {
      s.SetUIActive(i);
      this.uPi.IsExpandDetail = i;
    }
  }
}
exports.KeySettingRowKeyItem = KeySettingRowKeyItem;
//# sourceMappingURL=KeySettingRowKeyItem.js.map