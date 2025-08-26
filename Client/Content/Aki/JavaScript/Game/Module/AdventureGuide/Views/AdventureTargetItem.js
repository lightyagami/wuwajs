"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventureTargetItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const RoleController_1 = require("../../RoleUi/RoleController");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
class AdventureTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.eGe = undefined;
    this.AdventureId = 0;
    this.Pe = undefined;
    this.$Ve = undefined;
    this._Qu = undefined;
    this.YVe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.qOe = () => {
      if (this.Pe.Status === Protocol_1.Aki.Protocol.Aks.a3_) {
        this._Qu?.(this.AdventureId);
      }
    };
    this.JVe = false;
    this.zVe = () => {
      if (!this.JVe) {
        this.JVe = true;
        if (this.Pe.Status === Protocol_1.Aki.Protocol.Aks.Proto_UnFinish) {
          this.Ju();
          this.JVe = false;
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[2, this.zVe], [9, this.qOe]];
  }
  OnStart() {
    this.eGe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.YVe);
    this.$Ve = this.GetItem(1).GetOwner().GetComponentByClass(UE.UIExtendToggle.StaticClass());
    this.$Ve.OnPostAudioEvent.Bind(e => {
      if (e) {
        this.PostClickAudioEvent(e);
      }
    });
    this.$Ve.OnPostAudioStateEvent.Bind((e, t) => {
      if (t) {
        this.PostClickAudioEvent(t);
      }
    });
  }
  OnBeforeDestroy() {
    this.$Ve.OnPostAudioEvent.Unbind();
    this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Refresh(t, e, r) {
    this.JVe = false;
    var i = (this.Pe = t).AdventureTaskBase;
    this.AdventureId = t.AdventureTaskBase.Id;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TaskText);
    this.GetItem(1).SetUIActive(false);
    var o = t.GetTotalNum();
    var s = ModelManager_1.ModelManager.AdventureGuideModel.GetRewardChaptersList().includes(t.AdventureTaskBase.ChapterId) ? o : t.Progress;
    var a = this.GetText(5);
    if (o !== 0) {
      a.SetUIActive(true);
      a.SetText(`(${s}/${o})`);
    } else {
      a.SetUIActive(false);
    }
    var n = new Array();
    var l = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(i.DropIds);
    for (const _ of l.keys()) {
      var h = [{
        IncId: 0,
        ItemId: _
      }, l.get(_)];
      n.push(h);
    }
    this.eGe.RefreshByDataAsync(n).then(() => {
      for (const e of this.eGe.GetLayoutItemList()) {
        e.SetReceivedVisible(t.Status === Protocol_1.Aki.Protocol.Aks.Proto_Received);
      }
      this.GetScrollViewWithScrollbar(6).ScrollTo(this.eGe.GetGrid(0));
    });
    this.RootItem.SetUIActive(true);
    this.ZVe(t.Status, !this.Pe.AdventureTaskBase.JumpTo || t.AdventureTaskBase.JumpTo?.size !== 0);
  }
  SetClickGetButtonCb(e) {
    this._Qu = e;
  }
  ZVe(e, t) {
    this.e6e(e);
    this.t6e(e);
    this.i6e(e, t);
    this.o6e(e);
    this.r6e(e, t);
  }
  r6e(e, t) {
    this.GetItem(7).SetUIActive(e === Protocol_1.Aki.Protocol.Aks.Proto_UnFinish && !t);
  }
  e6e(e) {
    this.GetItem(8).SetUIActive(e === Protocol_1.Aki.Protocol.Aks.Proto_Received);
  }
  t6e(e) {
    this.GetButton(9).RootUIComp.SetUIActive(e === Protocol_1.Aki.Protocol.Aks.a3_);
  }
  i6e(e, t) {
    this.GetButton(2).RootUIComp.SetUIActive(e === Protocol_1.Aki.Protocol.Aks.Proto_UnFinish && t);
  }
  o6e(e) {
    this.GetItem(4).SetUIActive(e === Protocol_1.Aki.Protocol.Aks.a3_);
  }
  Ju() {
    if (this.Pe?.AdventureTaskBase.JumpTo) {
      let e = undefined;
      let t = undefined;
      for (var [r, i] of this.Pe.AdventureTaskBase.JumpTo) {
        e = r;
        t = i;
      }
      if (e && t) {
        switch (e - 1) {
          case 0:
            UiManager_1.UiManager.OpenView("QuestView", Number(t));
            break;
          case 1:
            var o = ConfigManager_1.ConfigManager.MapConfig?.GetConfigMark(Number(t));
            if (o) {
              o = {
                MarkType: o.ObjectType,
                MarkId: o.MarkId,
                OpenFogId: 0
              };
              WorldMapController_1.WorldMapController.OpenView(1, false, o);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AdventureGuide", 5, "配置了错误的开拓任务跳转参数", ["Id: ", this.Pe.AdventureTaskBase.Id], ["Parma: ", t]);
            }
            break;
          case 2:
            if (t === "RoleRootView") {
              RoleController_1.RoleController.OpenRoleMainView(0);
            } else {
              UiManager_1.UiManager.OpenView(t);
            }
            break;
          case 3:
            o = t;
            RoleController_1.RoleController.OpenRoleMainView(0, 0, [], o);
            break;
          case 4:
            o = {
              TabViewName: t,
              Param: undefined
            };
            UiManager_1.UiManager.OpenView("CalabashRootView", o);
            break;
          case 8:
            this.l7c(Number(t));
            break;
          default:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AdventureGuide", 5, "配置了错误的开拓任务跳转类型", ["Id: ", this.Pe.AdventureTaskBase.Id], ["type: ", e]);
            }
        }
      }
    }
  }
  l7c(e) {
    var t = e;
    if (ModelManager_1.ModelManager.AdventureGuideModel.CheckTargetDungeonTypeCanShow(t)) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView("DisposableChallengeView", Number(e));
    } else if ((e = ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetSecondaryGuideDataConf(t)?.ConditionGroupId ?? 0) > 0 && (t = ConditionGroupById_1.configConditionGroupById.GetConfig(e)?.HintText) && !StringUtils_1.StringUtils.IsEmpty(t)) {
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t) ?? "";
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("UnlockCondition", e);
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotOpen");
    }
  }
}
exports.AdventureTargetItem = AdventureTargetItem;
//# sourceMappingURL=AdventureTargetItem.js.map