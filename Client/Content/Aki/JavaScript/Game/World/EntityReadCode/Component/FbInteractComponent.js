"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteractComponent = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbInteractOption_1 = require("../Action/FbInteractOption");
const FbPlayFlow_1 = require("../Action/FbPlayFlow");
const FbInteractPointIconConfig_1 = require("./FbInteractPointIconConfig");
const FbInteractSectorRange_1 = require("./FbInteractSectorRange");
const FbRandomInteract_1 = require("./FbRandomInteract");
const UnionInteractAdditionalInfoHelper_1 = require("./UnionInteractAdditionalInfoHelper");
const UnionInteractPlayerDiractionOptionHelper_1 = require("./UnionInteractPlayerDiractionOptionHelper");
const UnionMatchRoleOptionHelper_1 = require("../Match/UnionMatchRoleOptionHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbInteractComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.uDh = false;
    this.dDh = undefined;
    this.M_h = false;
    this.E_h = 0;
    this.mDh = false;
    this.CDh = 0;
    this.y_h = false;
    this.S_h = undefined;
    this.gDh = false;
    this.fDh = undefined;
    this.pDh = false;
    this.vDh = undefined;
    this.ugh = false;
    this.dgh = undefined;
    this.yDh = false;
    this.SDh = undefined;
    this.MDh = false;
    this.EDh = undefined;
    this.IDh = false;
    this.TDh = undefined;
    this.bDh = false;
    this.LDh = undefined;
    this.ADh = false;
    this.xDh = false;
    this.RDh = false;
    this.wDh = false;
    this.PDh = false;
    this.UDh = undefined;
    this.C_h = false;
    this.g_h = undefined;
    this.DDh = false;
    this.BDh = undefined;
    this.qDh = false;
    this.PAe = undefined;
    this.LJl = false;
    this.AJl = undefined;
    this.ak1 = false;
    this.hk1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInteractComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get QuestIds() {
    if (!this.uDh) {
      this.uDh = true;
      this.dDh = new Array();
      var i = this.FbDataInternal.questIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.dDh.push(this.FbDataInternal.questIds(t));
        }
      }
    }
    return this.dDh;
  }
  get Range() {
    if (!this.M_h) {
      this.M_h = true;
      this.E_h = this.FbDataInternal.range();
    }
    return this.E_h;
  }
  get ExitRange() {
    if (!this.mDh) {
      this.mDh = true;
      this.CDh = this.FbDataInternal.exitRange();
    }
    return this.CDh;
  }
  get DoIntactType() {
    if (!this.y_h) {
      this.y_h = true;
      this.S_h = this.FbDataInternal.doIntactType();
    }
    return this.S_h;
  }
  get SectorRange() {
    if (!this.gDh) {
      this.gDh = true;
      this.fDh = FbInteractSectorRange_1.FbInteractSectorRange.Create(this.FbDataInternal.sectorRange());
    }
    return this.fDh;
  }
  get SectorRangeFromPlayerToEntity() {
    var t;
    var i;
    if (!this.pDh && (this.pDh = true, t = this.FbDataInternal.sectorRangeFromPlayerToEntityType(), i = UnionInteractPlayerDiractionOptionHelper_1.UnionInteractPlayerDiractionOptionHelper.GetUnionInteractPlayerDiractionOptionObject(t))) {
      this.vDh = UnionInteractPlayerDiractionOptionHelper_1.UnionInteractPlayerDiractionOptionHelper.ReadUnionInteractPlayerDiractionOption(t, this.FbDataInternal.sectorRangeFromPlayerToEntity(i));
    }
    return this.vDh;
  }
  get Options() {
    if (!this.ugh) {
      this.ugh = true;
      this.dgh = new Array();
      var i = this.FbDataInternal.optionsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.options(t, new fb_action_1.InteractOption());
          this.dgh.push(FbInteractOption_1.FbInteractOption.Create(e));
        }
      }
    }
    return this.dgh;
  }
  get RandomInteract() {
    if (!this.yDh) {
      this.yDh = true;
      this.SDh = FbRandomInteract_1.FbRandomInteract.Create(this.FbDataInternal.randomInteract());
    }
    return this.SDh;
  }
  get InteractDefaultIcon() {
    if (!this.MDh) {
      this.MDh = true;
      this.EDh = this.FbDataInternal.interactDefaultIcon();
    }
    return this.EDh;
  }
  get InteractIcon() {
    if (!this.IDh) {
      this.IDh = true;
      this.TDh = this.FbDataInternal.interactIcon();
    }
    return this.TDh;
  }
  get TurnAroundType() {
    if (!this.bDh) {
      this.bDh = true;
      this.LDh = this.FbDataInternal.turnAroundType();
    }
    return this.LDh;
  }
  get IsWaitForTurnAroundComplete() {
    if (!this.ADh) {
      this.ADh = true;
      this.xDh = this.FbDataInternal.isWaitForTurnAroundComplete();
    }
    return this.xDh;
  }
  get IsWaitForInteractComplete() {
    if (!this.RDh) {
      this.RDh = true;
      this.wDh = this.FbDataInternal.isWaitForInteractComplete();
    }
    return this.wDh;
  }
  get PreFlow() {
    if (!this.PDh) {
      this.PDh = true;
      this.UDh = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.preFlow());
    }
    return this.UDh;
  }
  get TidContent() {
    if (!this.C_h) {
      this.C_h = true;
      this.g_h = this.FbDataInternal.tidContent();
    }
    return this.g_h;
  }
  get InteractPointOffset() {
    if (!this.DDh) {
      this.DDh = true;
      this.BDh = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.interactPointOffset());
    }
    return this.BDh;
  }
  get MatchRoleOption() {
    if (!this.qDh) {
      this.qDh = true;
      this.PAe = new Array();
      var i = this.FbDataInternal.matchRoleOptionLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.matchRoleOptionType(t);
          var s = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.GetUnionMatchRoleOptionObject(e);
          if (s && (e = UnionMatchRoleOptionHelper_1.UnionMatchRoleOptionHelper.ReadUnionMatchRoleOption(e, this.FbDataInternal.matchRoleOption(t, s))) !== undefined) {
            this.PAe.push(e);
          }
        }
      }
    }
    return this.PAe;
  }
  get InteractAdditionalInfo() {
    var t;
    var i;
    if (!this.LJl && (this.LJl = true, t = this.FbDataInternal.interactAdditionalInfoType(), i = UnionInteractAdditionalInfoHelper_1.UnionInteractAdditionalInfoHelper.GetUnionInteractAdditionalInfoObject(t))) {
      this.AJl = UnionInteractAdditionalInfoHelper_1.UnionInteractAdditionalInfoHelper.ReadUnionInteractAdditionalInfo(t, this.FbDataInternal.interactAdditionalInfo(i));
    }
    return this.AJl;
  }
  get PointIconConfig() {
    if (!this.ak1) {
      this.ak1 = true;
      this.hk1 = FbInteractPointIconConfig_1.FbInteractPointIconConfig.Create(this.FbDataInternal.pointIconConfig());
    }
    return this.hk1;
  }
}
exports.FbInteractComponent = FbInteractComponent;
//# sourceMappingURL=FbInteractComponent.js.map