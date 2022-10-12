import { createMachine } from "xstate";
import {
  createModifierFactory,
  ModifierFactory,
} from "~src/factories/Modifier";
import { ALLOWED_MODIFIERS } from "~src/lib/modifiers";
import { createMoney } from "@easymoney/money";
import { IModifierData } from "~src/@types/IModifier";

type TContext = {
  modifierFactoryData: IModifierData | undefined;
  allowedModifiers: ModifierFactory<{}>[];
  finalBasePrice: string | undefined;
  finalBillingHours: number | undefined;
  rentTotal: string | undefined;
  basePriceUpdatesReady: boolean;
  billingHoursUpdatesReady: boolean;
  totalPriceComputeReady: boolean;
  modifierDataReady: boolean;
};

type TEvent =
  | {
      type: "DATE_RANGE_CHANGE";
      modifierFactoryData: IModifierData;
    }
  | { type: "RESET" };

const rideRentCalculation =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOinQBdswAnAqAQQBsmB7Ad0gFlWJcAzXLVgBiRKAAOrWLgq5W+cSAAeiAEwAOACwkNATgAMAVj0B2IwYCMAZjOWANCACeiS1qMkLBg1oPXTAGxalnoaAL5hjmhYeISk5FS0zGycEDx8gsIAIgpgYkggUjJyCkqqCIEGJAEGetYGGgF6alr6Go4uCJbGnt5+3aZ6WqaBWhFRGDgExCSYrKgSAK5y+FAAQuiwYAAKdJhgAKoSEJRw+ZLSsvKKBeU2PiSmWqEaRgGNamoBph2u7r3eXz+IIhcKREDRKZxEgAI02Oz2h2Op1gOUI50KlxKN1Ad0Cal0Tw0lXcNQCal+XR6Xn6BkGw1G4whk1iMzmC2W9DWuBY9AAEqxFjRYEcThQzkoildSrd1NZ6iRWlo1EZ5cEyZS3B4aUDRqCmZDWaQYTymPzBcLRSi0XlJVjrmV1BpLAESNY1INTGoQp9DFpNdS+tYBkMRkEDSzpqR2UsVlAACqsCjoJi7XD7DFS7GOhDylrVFoaawaDTezRGTX-HV+PWhCMxKMkChJlNp-YAYXmsbANsz9pluMQ-msHhqeksztaHpsAe1QZDDPDTPwvDgSkNjYS1Doq2SHG4vAEQmFduKDtlCGVmpMJD6BjUzQZRbBEwb0K3SRY+7Sh8ywptp7SjiKiIBYBIGOS7j4mo-Quteei3n0Jg1kYbzEvWUJsl2nKrBsWxtkiYprgUWbnoOVL-Ho7xBI0zo+MM8GId4D4tCMz4YUasLwgRVriqiuSAdmF6WEYWjWG6hhGDB7oPk0FLOK4N53sh-ioe8pgcY2MY4esprmkKIrInxglkSBCAwW8JDNJYTyDKW5gjoxd4sU+xaadCJq8qsAoGbxcAASR-bAeUKqlre5LWK0lgiaE1hOX0LlsW54IbtC2lxomyapoiJkDmZwYqiQNk2Z87rKt0-oKV0SkJY+SUvsyb4zM2WUEZ2HLigFFxnnl5QjtFbomDZphWOOxLxd4Jb2fK7kzPw6A8rlwWIHoHhDKqNk1mYGi1JShhMfe9RemotjoSlkbQmA+AQEtOZAjoYmmAV3gTkYE7XhoAI1k0AQ2DZASzUQt3Ce0VUTgdd6Q24EQREAA */
  createMachine(
    {
      context: {
        modifierFactoryData: undefined,
        allowedModifiers: [],
        basePriceUpdatesReady: false,
        billingHoursUpdatesReady: false,
        totalPriceComputeReady: false,
        modifierDataReady: false,
        finalBasePrice: undefined,
        finalBillingHours: undefined,
        rentTotal: undefined,
      },
      tsTypes: {} as import("./rideRentCalculation.typegen").Typegen0,
      schema: { context: {} as TContext, events: {} as TEvent },
      predictableActionArguments: true,
      id: "(machine)",
      initial: "idle",
      states: {
        idle: {
          on: {
            DATE_RANGE_CHANGE: {
              target: "gatheringAllowedModifiers",
              actions: "collectModifierData",
            },
          },
        },
        gatheringAllowedModifiers: {
          always: {
            actions: "gatherAllowedModifiers",
            target: "gatherAllowedModifiersDone",
          },
        },
        gatherAllowedModifiersDone: {
          always: [
            {
              cond: "allowedModifiersReady",
              target: "computingBasePriceUpdates",
            },
            {
              target: "fail",
            },
          ],
        },
        computingBasePriceUpdates: {
          always: {
            actions: "computeBasePriceUpdates",
            target: "basePriceUpdatesDone",
          },
        },
        basePriceUpdatesDone: {
          always: [
            {
              cond: "basePriceUpdatesReady",
              target: "computingBillingHoursUpdates",
            },
            {
              target: "fail",
            },
          ],
        },
        computingBillingHoursUpdates: {
          always: {
            actions: "computeBillingHoursUpdates",
            target: "billingHoursUpdatesDone",
          },
        },
        billingHoursUpdatesDone: {
          always: [
            {
              cond: "billingHoursUpdatesReady",
              target: "computingTotalPrice",
            },
            {
              target: "fail",
            },
          ],
        },
        computingTotalPrice: {
          always: {
            actions: "computeTotalPrice",
            target: "totalPriceComputeDone",
          },
        },
        totalPriceComputeDone: {
          always: [
            {
              cond: "totalPriceComputeReady",
              target: "end",
            },
            {
              target: "fail",
            },
          ],
        },
        fail: {
          type: "final",
        },
        end: {
          entry: "reset",
          on: {
            DATE_RANGE_CHANGE: {
              target: "gatheringAllowedModifiers",
              actions: "collectModifierData",
            },
          },
        },
      },
    },
    {
      actions: {
        collectModifierData: (ctx, event) => {
          ctx.modifierFactoryData = event.modifierFactoryData;
          ctx.modifierDataReady = true;
        },
        gatherAllowedModifiers: (ctx: TContext) => {
          for (const allowedModifier of ALLOWED_MODIFIERS) {
            const modifierFactory = createModifierFactory(
              ctx.modifierFactoryData,
              allowedModifier
            );
            ctx.allowedModifiers.push(modifierFactory);
          }
        },
        computeBasePriceUpdates: (ctx: TContext) => {
          if (typeof ctx.modifierFactoryData === "undefined") {
            throw Error("modifierFactoryData cannot be undefined.");
          }
          const finalBasePrice = ctx.allowedModifiers.reduce(
            (previous, current) => {
              const moneyPrev = createMoney({
                amount: previous,
                currency: "USD",
              });
              const moneyCurr = createMoney({
                amount: current.getBasePriceModifierValue(),
                currency: "USD",
              });
              return moneyPrev.add(moneyCurr).getAmount();
            },
            "0.00"
          );
          const moneyFinalbasePrice = createMoney({
            amount: finalBasePrice,
            currency: "USD",
          });
          const basePrice = createMoney({
            amount: ctx.modifierFactoryData.ride.basePrice,
            currency: "USD",
          });
          ctx.finalBasePrice = basePrice.add(moneyFinalbasePrice).getAmount();
          ctx.basePriceUpdatesReady = true;
        },
        computeBillingHoursUpdates: (ctx: TContext) => {
          if (typeof ctx.modifierFactoryData === "undefined") {
            throw Error("modifierFactoryData cannot be undefined.");
          }
          const freeOfChargeHours = ctx.allowedModifiers.reduce(
            (previous, current) =>
              previous + current.getBillingHoursModifierValue(),
            0
          );
          ctx.finalBillingHours =
            ctx.modifierFactoryData.selectedHours + freeOfChargeHours;
          ctx.billingHoursUpdatesReady = true;
        },
        computeTotalPrice: (ctx: TContext) => {
          if (!(ctx.finalBasePrice && ctx.finalBillingHours)) {
            throw Error(
              "Final best price and final billing hours should be defined."
            );
          }

          const finalBestPrice = createMoney({
            amount: ctx.finalBasePrice,
            currency: "USD",
          });
          ctx.rentTotal = finalBestPrice
            .multiply(ctx.finalBillingHours / 24)
            .getAmount();
          ctx.totalPriceComputeReady = true;
        },
        reset: (ctx: TContext) => {
          ctx.allowedModifiers = [];
          ctx.basePriceUpdatesReady = false;
          ctx.billingHoursUpdatesReady = false;
          ctx.totalPriceComputeReady = false;
          ctx.finalBasePrice = undefined;
          ctx.finalBillingHours = undefined;
        },
      },
      guards: {
        allowedModifiersReady: (ctx: TContext) =>
          Boolean(ctx.allowedModifiers.length),
        basePriceUpdatesReady: (ctx: TContext) => ctx.basePriceUpdatesReady,
        billingHoursUpdatesReady: (ctx: TContext) =>
          ctx.billingHoursUpdatesReady,
        totalPriceComputeReady: (ctx: TContext) => ctx.totalPriceComputeReady,
      },
    }
  );

export default rideRentCalculation;
