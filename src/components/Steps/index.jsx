import { Completed } from "../Completed";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Password } from "../Password";
import React from "react";
import { STEPS } from "../../constants";
import { SecretRecoveryPhase } from "../SecretRecoveryPhase";

const Stepper = ({ steps, activeTill, goBack }) => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-3 border-b border-b-gray-700">
      <div className="cursor-pointer">
        <IoMdArrowRoundBack
          hidden={activeTill === steps.length - 1}
          onClick={goBack}
          className="text-gray-600 font-bold"
          size={24}
        />
      </div>
      <div className="flex gap-2 items-center ">
        {steps.map((step, index) => (
          <span
            className={`w-3 h-3 rounded-[50%]  ${
              activeTill >= index ? "bg-[#e2dffe]" : "bg-gray-600"
            }  `}
          ></span>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export const Steps = ({ step, goBack, nextStep }) => {
  const steps = [STEPS.PASSWORD, STEPS.SECRET_RECOVERY_PHRASE, STEPS.COMPLETED];
  const activeTill = steps.indexOf(step);
  return (
    <div className="flex flex-col items-center h-full">
      <Stepper steps={steps} goBack={goBack} activeTill={activeTill} />

      {step === STEPS.PASSWORD && <Password nextStep={nextStep} />}

      {step === STEPS.SECRET_RECOVERY_PHRASE && (
        <SecretRecoveryPhase nextStep={nextStep} />
      )}

      {step === STEPS.COMPLETED && <Completed />}
    </div>
  );
};
