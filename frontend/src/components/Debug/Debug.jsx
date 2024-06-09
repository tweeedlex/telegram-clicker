import React from 'react';
import { createCard } from "../../http/card";

const Debug = ({isVisible}) => {
  const testRequests = async () => {
  }

  return (
    <>
      {
        isVisible &&
        (
          <div>
            <button
              onClick={() => testRequests()}
              className={"button-default"}
            >
              Test request
            </button>
          </div>
        )
      }
    </>
  );
};

export default Debug;