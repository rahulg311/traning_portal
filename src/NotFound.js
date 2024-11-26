// NotFound.js
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigation = useNavigate();
  const BACK = () => {
    navigation("/");
  };
  return (
    <div>
      <section class="page_404">
        <div class="">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h1 class="text-center ">404</h1>
                </div>

                <div className="text-center mt-8">
                  <h3 className="text-2xl font-semibold">
                    Look like you're lost
                  </h3>

                  <p className="mt-4 text-gray-600">
                    The page you are looking for is not available!
                  </p>

                  <button
                    onClick={BACK}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Go to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
