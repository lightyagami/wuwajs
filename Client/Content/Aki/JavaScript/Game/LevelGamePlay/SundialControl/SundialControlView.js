"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SundialControlView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const TIPS_TEXT = "PrefabTextItem_2335089801_Text";
const RESET_TEXT = "PrefabTextItem_2335089802_Text";
const SWITCH_TEXT = "PrefabTextItem_2335089799_Text";
const ROTATE_TEXT = "PrefabTextItem_2335089800_Text";
const ringOneTips = ["PrefabTextItem_2335089803_Text", "PrefabTextItem_2335089814_Text", "PrefabTextItem_2335089813_Text", "PrefabTextItem_2335089812_Text", "PrefabTextItem_2335089811_Text", "PrefabTextItem_2335089810_Text", "PrefabTextItem_2335089809_Text", "PrefabTextItem_2335089808_Text", "PrefabTextItem_2335089807_Text", "PrefabTextItem_2335089806_Text", "PrefabTextItem_2335089805_Text", "PrefabTextItem_2335089804_Text"];
const ringTwoTips = ["PrefabTextItem_2335089818_Text", "PrefabTextItem_2335089817_Text", "PrefabTextItem_2335089815_Text", "PrefabTextItem_2335089816_Text"];
class SundialControlView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Fxe = undefined;
    this.Vxe = undefined;
    this.Hxe = undefined;
    this.jxe = undefined;
    this.DPe = () => {
      this.Wxe();
    };
    this.Kxe = () => {
      ControllerHolder_1.ControllerHolder.SundialControlController.SwitchCurrentRing();
    };
    this.Qxe = () => {
      this.Xxe(false);
      ControllerHolder_1.ControllerHolder.SundialControlController.StartRotate(() => {
        this.Xxe(true);
      });
    };
    this.LPe = () => {
      this.CloseMe();
    };
    this.$xe = (e, t) => {
      e = e === 0 ? ringOneTips : ringTwoTips;
      t = e[t % e.length];
      e = this.GetText(4);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText]];
    this.BtnBindInfo = [[0, this.DPe], [1, this.Kxe], [3, this.LPe], [2, this.Qxe]];
  }
  OnStart() {
    this.Fxe = this.GetButton(0);
    this.Vxe = this.GetButton(1);
    this.Hxe = this.GetButton(2);
    this.jxe = this.GetButton(3);
    this.jxe.RootUIComp.SetUIActive(false);
    this.Fxe.RootUIComp.SetUIActive(false);
    var e = this.GetText(4);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, TIPS_TEXT);
    var e = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, RESET_TEXT);
    var e = this.GetText(6);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, SWITCH_TEXT);
    var e = this.GetText(7);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, ROTATE_TEXT);
    ControllerHolder_1.ControllerHolder.SundialControlController.SetOnFinishCallback(() => {
      this.Fxe.RootUIComp.SetUIActive(false);
      this.Vxe.RootUIComp.SetUIActive(false);
      this.Hxe.RootUIComp.SetUIActive(false);
      this.jxe.RootUIComp.SetUIActive(false);
    });
    this.Yxe();
    TimerSystem_1.TimerSystem.Delay(() => {
      ControllerHolder_1.ControllerHolder.SundialControlController.GenerateModel(() => {
        this.Jxe();
      });
    }, 100);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNeedUpdateSundialTips, this.$xe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNeedUpdateSundialTips, this.$xe);
  }
  async Yxe() {
    this.Xxe(false);
    await this.HideAsync();
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(5, 3);
  }
  async Jxe() {
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(5);
    await this.ShowAsync();
    this.Xxe(true);
    ControllerHolder_1.ControllerHolder.SundialControlController.UpdateViewTips();
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.SundialControlController.SetOnFinishCallback(undefined);
    ControllerHolder_1.ControllerHolder.SundialControlController.DestroyModel();
  }
  async Wxe() {
    this.Xxe(false);
    await this.HideAsync();
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitOpenLoading(5, 3);
    ControllerHolder_1.ControllerHolder.SundialControlController.ResetAll();
    await ControllerHolder_1.ControllerHolder.LevelLoadingController.WaitCloseLoading(5);
    await this.ShowAsync();
    ControllerHolder_1.ControllerHolder.SundialControlController.UpdateViewTips();
    this.Xxe(true);
  }
  Xxe(e) {
    this.Fxe.SetSelfInteractive(e);
    this.Vxe.SetSelfInteractive(e);
    this.Hxe.SetSelfInteractive(e);
    this.jxe.SetSelfInteractive(e);
  }
}
exports.SundialControlView = SundialControlView;
//# sourceMappingURL=SundialControlView.js.map