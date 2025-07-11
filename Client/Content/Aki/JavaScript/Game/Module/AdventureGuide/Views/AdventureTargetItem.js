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
    this.YVe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.qOe = () => {
      if (!this.JVe) {
        this.JVe = true;
        if (this.Pe.Status === Protocol_1.Aki.Protocol.Aks.a3_) {
          ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForAdventureReward(this.AdventureId).finally(() => {
            this.JVe = false;
          });
        }
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
    this.$Ve.OnPostAudioStateEvent.Bind((e, r) => {
      if (r) {
        this.PostClickAudioEvent(r);
      }
    });
  }
  OnBeforeDestroy() {
    this.$Ve.OnPostAudioEvent.Unbind();
    this.$Ve.OnPostAudioStateEvent.Unbind();
  }
  Refresh(r, e, t) {
    this.JVe = false;
    var i = (this.Pe = r).AdventureTaskBase;
    this.AdventureId = r.AdventureTaskBase.Id;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.TaskText);
    this.GetItem(1).SetUIActive(false);
    var o = r.GetTotalNum();
    var s = ModelManager_1.ModelManager.AdventureGuideModel.GetRewardChaptersList().includes(r.AdventureTaskBase.ChapterId) ? o : r.Progress;
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
        e.SetReceivedVisible(r.Status === Protocol_1.Aki.Protocol.Aks.Proto_Received);
      }
      this.GetScrollViewWithScrollbar(6).ScrollTo(this.eGe.GetGrid(0));
    });
    this.RootItem.SetUIActive(true);
    this.ZVe(r.Status, !this.Pe.AdventureTaskBase.JumpTo || r.AdventureTaskBase.JumpTo?.size !== 0);
  }
  ZVe(e, r) {
    this.e6e(e);
    this.t6e(e);
    this.i6e(e, r);
    this.o6e(e);
    this.r6e(e, r);
  }
  r6e(e, r) {
    this.GetItem(7).SetUIActive(e === Protocol_1.Aki.Protocol.Aks.Proto_UnFinish && !r);
  }
  e6e(e) {
    this.GetItem(8).SetUIActive(e === Protocol_1.Aki.Protocol.Aks.Proto_Received);
  }
  t6e(e) {
    this.GetButton(9).RootUIComp.SetUIActive(e === Protocol_1.Aki.Protocol.Aks.a3_);
  }
  i6e(e, r) {
    this.GetButton(2).RootUIComp.SetUIActive(e === Protocol_1.Aki.Protocol.Aks.Proto_UnFinish && r);
  }
  o6e(e) {
    this.GetItem(4).SetUIActive(e === Protocol_1.Aki.Protocol.Aks.a3_);
  }
  Ju() {
    if (this.Pe?.AdventureTaskBase.JumpTo) {
      let e = undefined;
      let r = undefined;
      for (var [t, i] of this.Pe.AdventureTaskBase.JumpTo) {
        e = t;
        r = i;
      }
      if (e && r) {
        switch (e - 1) {
          case 0:
            UiManager_1.UiManager.OpenView("QuestView", Number(r));
            break;
          case 1:
            var o = ConfigManager_1.ConfigManager.MapConfig?.GetConfigMark(Number(r));
            if (o) {
              o = {
                MarkType: o.ObjectType,
                MarkId: o.MarkId,
                OpenFogId: 0
              };
              WorldMapController_1.WorldMapController.OpenView(1, false, o);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AdventureGuide", 5, "配置了错误的开拓任务跳转参数", ["Id: ", this.Pe.AdventureTaskBase.Id], ["Parma: ", r]);
            }
            break;
          case 2:
            if (r === "RoleRootView") {
              RoleController_1.RoleController.OpenRoleMainView(0);
            } else {
              UiManager_1.UiManager.OpenView(r);
            }
            break;
          case 3:
            o = r;
            RoleController_1.RoleController.OpenRoleMainView(0, 0, [], o);
            break;
          case 4:
            o = {
              TabViewName: r,
              Param: undefined
            };
            UiManager_1.UiManager.OpenView("CalabashRootView", o);
            break;
          case 8:
            this.hSu(Number(r));
            break;
          default:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("AdventureGuide", 5, "配置了错误的开拓任务跳转类型", ["Id: ", this.Pe.AdventureTaskBase.Id], ["type: ", e]);
            }
        }
      }
    }
  }
  hSu(e) {
    var r = e;
    if (ModelManager_1.ModelManager.AdventureGuideModel.CheckTargetDungeonTypeCanShow(r)) {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView("DisposableChallengeView", Number(e));
    } else if ((e = ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetSecondaryGuideDataConf(r)?.ConditionGroupId ?? 0) > 0 && (r = ConditionGroupById_1.configConditionGroupById.GetConfig(e)?.HintText) && !StringUtils_1.StringUtils.IsEmpty(r)) {
      e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r) ?? "";
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("UnlockCondition", e);
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotOpen");
    }
  }
}
exports.AdventureTargetItem = AdventureTargetItem;
//# sourceMappingURL=AdventureTargetItem.js.map