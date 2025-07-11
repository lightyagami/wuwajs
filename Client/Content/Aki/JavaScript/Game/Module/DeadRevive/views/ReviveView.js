"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviveView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const TrainingView_1 = require("../../TrainingDegree/TrainingView");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DeadReviveController_1 = require("../DeadReviveController");
const TIME_SECOND = 1000;
const AUTO_REVIVE_TIME = 60;
class ReviveView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.HFt = 0;
    this.jFt = 0;
    this.WFt = -1;
    this.KFt = 0;
    this.QFt = false;
    this.XFt = undefined;
    this.$Ft = undefined;
    this.YFt = undefined;
    this.JFt = undefined;
    this.zFt = undefined;
    this.ZFt = false;
    this.e3t = undefined;
    this.t3t = false;
    this.Ltu = false;
    this.i3t = () => {
      if (this.WFt === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CannotRevive");
      } else if (this.ZFt) {
        DeadReviveController_1.DeadReviveController.ReviveRequest(false, this.wtu);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 4, "Time Or Times Limit!!!");
      }
    };
    this.wtu = i => {
      if (i && this.Ltu) {
        ControllerHolder_1.ControllerHolder.MoraleBattleController.SetReviveFromMoraleBattle(true);
      }
    };
    this.o3t = () => {
      this.CloseMe();
      if (ModelManager_1.ModelManager.DeadReviveModel.HandleOnClickGiveUpExternal) {
        ModelManager_1.ModelManager.DeadReviveModel.HandleOnClickGiveUpExternal();
      } else {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      }
    };
    this.r3t = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(98);
      i.SetTextArgs(this.JFt, this.zFt);
      i.FunctionMap.set(2, () => {
        if (this.ZFt) {
          DeadReviveController_1.DeadReviveController.ReviveRequest(true);
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 4, "Time Or Times Limit!!!");
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIHorizontalLayout], [8, UE.UIButtonComponent], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIText], [12, UE.UIText]];
    this.BtnBindInfo = [[2, this.i3t], [3, this.o3t], [8, this.r3t]];
  }
  OnStart() {
    this.XFt = this.GetText(4);
    this.$Ft = this.GetText(9);
    this.Ltu = ModelManager_1.ModelManager.MoraleBattleModel.IsMoraleActive();
    var i = this.GetItem(0);
    var e = this.GetItem(1);
    var t = this.GetButton(3);
    var s = this.GetButton(2);
    this.YFt = s.GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass());
    this.t3t = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    if (this.t3t) {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        this.GetButton(2).GetRootComponent().SetUIActive(false);
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(12), "ExitInstance");
        LguiUtil_1.LguiUtil.SetLocalText(this.GetText(6), "MatchInstanceDead");
      }
    } else {
      s.GetRootComponent().SetAnchorOffset(t.GetRootComponent().GetAnchorOffset());
      t.GetRootComponent().SetUIActive(false);
      this.n3t();
    }
    var s = ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig;
    if (s) {
      this.WFt = s.ReviveTimes;
    }
    e.SetUIActive(true);
    i.SetUIActive(false);
    this.jFt = ModelManager_1.ModelManager.DeadReviveModel.ReviveLimitTime;
    let r = !(this.ZFt = false);
    if (this.jFt > 0) {
      this.XFt.SetText(this.jFt.toString() + "s");
      this.YFt.SetInteractable(false);
    } else if (this.jFt <= 0) {
      r = false;
      this.ZFt = true;
      this.KFt = AUTO_REVIVE_TIME;
      if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        this.$Ft.SetUIActive(true);
      }
      LguiUtil_1.LguiUtil.SetLocalText(this.$Ft, "ReviveItemTips", this.KFt);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.XFt, "ReachReviveCount");
      this.YFt.SetInteractable(false);
    }
    this.XFt.SetUIActive(r);
    this.GetText(5).ShowTextNew(ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig?.ReviveTitle ?? "");
    t = this.GetText(6);
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      t.ShowTextNew(this.Atu());
    }
    this.e3t = new TrainingView_1.TrainingView();
    this.e3t.Show(this.GetHorizontalLayout(7), this.Ptu());
  }
  Ptu() {
    if (this.Ltu) {
      return ModelManager_1.ModelManager.MoraleModel.GetMoraleBuffDataList();
    }
  }
  Atu() {
    if (this.Ltu) {
      return "Morale_title_29";
    } else {
      return ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig?.ReviveContent ?? "";
    }
  }
  n3t() {
    let i = -1;
    var e;
    var t;
    var s;
    var r;
    var n = ModelManager_1.ModelManager.DeadReviveModel.ReviveConfig;
    if (n) {
      i = n.UseItemId;
    }
    var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i);
    if (!(n <= 0)) {
      (e = this.GetButton(8)).GetRootComponent().SetUIActive(true);
      r = this.GetTexture(10);
      t = this.GetText(11);
      s = ModelManager_1.ModelManager.BuffItemModel;
      this.SetItemIcon(r, i);
      this.JFt = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(i);
      if ((r = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(i)) < TimeUtil_1.TimeUtil.Minute) {
        this.zFt = r + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second");
      } else {
        this.zFt = Math.floor(r / TimeUtil_1.TimeUtil.Minute) + ConfigManager_1.ConfigManager.TextConfig.GetTextById("MinuteText");
        if ((r = r % TimeUtil_1.TimeUtil.Minute) > 0) {
          this.zFt += r + ConfigManager_1.ConfigManager.TextConfig.GetTextById("Second");
        }
      }
      if (s.GetBuffItemRemainCdTime(i) > 0) {
        LguiUtil_1.LguiUtil.SetLocalText(t, "ReviveItemCd");
        e.GetOwner().GetComponentByClass(UE.UIInteractionGroup.StaticClass()).SetInteractable(false);
      } else {
        t.SetText(n.toString());
      }
    }
  }
  OnTick(i) {
    if (!this.ZFt && !(this.jFt < 0) || !this.QFt) {
      this.HFt += i;
      if (this.HFt >= TIME_SECOND) {
        this.HFt = 0;
        this.s3t();
        this.a3t();
      }
    }
  }
  s3t() {
    if (!this.t3t && !this.QFt) {
      if (this.KFt <= 0) {
        this.QFt = true;
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
        this.i3t();
      } else {
        --this.KFt;
        LguiUtil_1.LguiUtil.SetLocalText(this.$Ft, "ReviveItemTips", this.KFt);
      }
    }
  }
  a3t() {
    if (this.jFt <= 0) {
      this.ZFt = true;
      this.XFt.SetUIActive(false);
      this.YFt.SetInteractable(true);
    } else {
      --this.jFt;
      this.XFt.SetText(this.jFt.toString() + "s");
    }
  }
  OnBeforeDestroy() {
    if (this.e3t) {
      this.e3t.Clear();
    }
    this.e3t = undefined;
    this.XFt = undefined;
    this.$Ft = undefined;
    this.YFt = undefined;
    this.JFt = undefined;
    this.zFt = undefined;
    this.WFt = -1;
    this.HFt = 0;
    this.jFt = 0;
    this.KFt = 0;
    this.ZFt = false;
    this.t3t = false;
    this.QFt = false;
    ModelManager_1.ModelManager.DeadReviveModel.ClearExternalHandles();
  }
}
exports.ReviveView = ReviveView;
//# sourceMappingURL=ReviveView.js.map