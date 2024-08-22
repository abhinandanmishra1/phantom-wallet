import React, { useState } from "react";

import { Logo } from "../../blocks";
import { STEPS } from "../../constants";
import { Steps } from "../Steps";

export const Home = () => {
  const [step, setStep] = useState(STEPS.HOME);

  const nextStep = () => {
    if (step === STEPS.HOME) {
      setStep(STEPS.PASSWORD);
    }

    if (step === STEPS.PASSWORD) {
      setStep(STEPS.SECRET_RECOVERY_PHRASE);
    }

    if (step === STEPS.SECRET_RECOVERY_PHRASE) {
      setStep(STEPS.COMPLETED);
    }
  };

  const goBack = () => {
    if (step === STEPS.PASSWORD) {
      setStep(STEPS.HOME);
    }

    if (step === STEPS.SECRET_RECOVERY_PHRASE) {
      setStep(STEPS.PASSWORD);
    }
  };
  return (
    <>
      {step === STEPS.HOME && (
        <div className="text-white h-full flex flex-col-reverse items-center  w-full text-lg">
          <div className="h-[70%] w-[91%]">
            <div className="flex flex-col h-full gap-20">
              <div className="">
                <div className="flex flex-col items-center gap-4 justify-center ">
                  <Logo />
                  <span className="text-center font-bol text-gray-400 text-lg p-1">
                    To get started, create a new wallet or import an existing
                    one.
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-end">
                <button onClick={nextStep} className="w-full bg-[#ab9ff2] text-black rounded-lg hover: px-4 py-3">
                  <span className="">Create a new wallet</span>
                </button>
                <button className="w-full bg-[#333333] rounded-lg hover: px-4 py-3">
                  <span className="">Import an existing wallet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step !== STEPS.HOME && (
        <Steps step={step} nextStep={nextStep} goBack={goBack} />
      )}
    </>
  );
};
