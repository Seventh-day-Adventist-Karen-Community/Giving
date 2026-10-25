import React, { useState } from "react";
import "./stepper.css";
import { TiTick } from "react-icons/ti";
import { PrimarySubmitButton, TextFormButton } from "@components/buttons";

export type StepperType = {
  name:string,
  content:string|React.ReactNode,
  buttonName?:string
}

const Stepper = ({steps}:{steps:StepperType[]}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const increaseStep = () =>{
    setCurrentStep((prev) => prev + 1)
  }
  const decreaseStep = () =>{
    setCurrentStep((prev) => prev + 1)
  }


  return (
    <>
      <div className="flex justify-between flex-col">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step.name}</p>
          </div>
        ))}
      </div>
      <div>
        {!complete && steps[currentStep-1].content}
      </div>
      
      <div className="flex flex-row gap-3 justify-start py-4">
        
      {currentStep > 1 && 
              <TextFormButton
              type="button"
              text={"Previous"}
                onClick={() => {
                  currentStep > 1 && setCurrentStep((next) => next - 1);
                }}
              />
      }

      {!complete && (
        <PrimarySubmitButton
        type="button"
        text={currentStep === steps.length ? "Finish" : steps[currentStep-1].buttonName?`${steps[currentStep-1].buttonName}`:"Next"}
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        />
      )}
      </div>
    </>
  );
};

export default Stepper;
