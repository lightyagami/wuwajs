"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueCharacterRoomItem = exports.RogueCharacterRoomSelectView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const CommonSelectItem_1 = require("./CommonSelectItem");
const TopPanel_1 = require("./TopPanel");
class RogueCharacterRoomSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Era = undefined;
    this.Sui = undefined;
    this.yra = -1;
    this.Ira = () => {
      var e = this.OpenParam;
      ControllerHolder_1.ControllerHolder.RoguelikeController.RoguelikeRoleRoomSelectRequest(this.yra, e.Index).then(() => {
        this.CloseMe();
      });
    };
    this.Tra = (e, t, i) => {
      if (t) {
        this.Sui?.DeselectCurrentGridProxy();
        this.Sui?.SelectGridProxy(e);
        this.yra = i;
      } else {
        this.Sui?.DeselectCurrentGridProxy();
      }
      this.GetButton(3).SetSelfInteractive(t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.Ira]];
  }
  async OnBeforeStartAsync() {
    this.Era = new TopPanel_1.TopPanel();
    await this.Era.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.Era.CloseCallback = () => {
      this.CloseMe();
    };
    this.Sui = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), () => {
      var e = new RogueCharacterRoomItem();
      e.ClickCallback = this.Tra;
      return e;
    });
    var e = this.OpenParam;
    await this.Sui.RefreshByDataAsync(e.RoomIdList);
    this.GetButton(3).SetSelfInteractive(false);
  }
}
exports.RogueCharacterRoomSelectView = RogueCharacterRoomSelectView;
class RogueCharacterRoomItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ClickCallback = undefined;
    this.RoomId = -1;
    this.Sui = undefined;
    this.Fao = () => {
      return new CommonSelectItem_1.CommonElementItem();
    };
    this.cFe = () => {
      if (this.ClickCallback) {
        this.ClickCallback(this.GridIndex, this.IsSelectRoom(), this.RoomId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIExtendToggle], [4, UE.UIHorizontalLayout]];
    this.BtnBindInfo = [[3, this.cFe]];
  }
  async OnBeforeStartAsync() {
    this.Sui = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.Fao);
  }
  SetItemToggleState(e) {
    this.GetExtendToggle(3).SetToggleState(e, false);
  }
  OnDeselected(e) {
    this.SetItemToggleState(0);
  }
  OnSelected(e) {
    this.SetItemToggleState(1);
  }
  IsSelectRoom() {
    return this.GetExtendToggle(3).GetToggleState() === 1;
  }
  Refresh(e, t, i) {
    this.RoomId = e;
    e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueRoomShowConfig(e);
    if (e) {
      var r = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueBuffConfig(e.BuffId);
      if (r) {
        let i = undefined;
        r.BuffElement.forEach((e, t) => {
          i = new Array(e).fill(t);
        });
        if (i) {
          this.Sui?.RefreshByData(i);
        }
        this.SetTextureByPath(e.Icon, this.GetTexture(0));
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Desc);
      }
    }
  }
}
exports.RogueCharacterRoomItem = RogueCharacterRoomItem;
//# sourceMappingURL=RogueCharacterRoomSelectView.js.map